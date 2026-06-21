#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if docker ps --format '{{.Names}}' 2>/dev/null | grep -qi caddy; then
	exec bash "$REPO_DIR/deploy/setup-docker-caddy.sh"
fi

CADDY_SITE="/etc/caddy/sites/hooked-on-ai.caddy"
MAIN_CADDY="/etc/caddy/Caddyfile"

find_caddy_bin() {
	local candidate
	for candidate in caddy /usr/bin/caddy /usr/local/bin/caddy; do
		if command -v "$candidate" >/dev/null 2>&1; then
			command -v "$candidate"
			return 0
		fi
		if [[ -x "$candidate" ]]; then
			echo "$candidate"
			return 0
		fi
	done
	return 1
}

find_caddy_container() {
	docker ps --format '{{.Names}}' 2>/dev/null | grep -iE 'caddy' | head -1 || true
}

reload_caddy() {
	local caddy_bin="$1"
	local container="$2"

	if [[ -n "$container" ]]; then
		echo "Reloading Docker container: $container"
		docker exec "$container" caddy reload --config /etc/caddy/Caddyfile 2>/dev/null \
			|| docker restart "$container"
		return 0
	fi

	if [[ -n "$caddy_bin" ]] && [[ -f "$MAIN_CADDY" ]]; then
		sudo "$caddy_bin" validate --config "$MAIN_CADDY"
	fi

	if systemctl is-active caddy >/dev/null 2>&1; then
		echo "Restarting caddy systemd service"
		sudo systemctl restart caddy
		return 0
	fi

	echo "Could not reload Caddy automatically."
	return 1
}

if [[ ! -f "$REPO_DIR/dist/index.html" ]]; then
	echo "Build missing. Run first: bash deploy/deploy.sh"
	exit 1
fi

CADDY_BIN="$(find_caddy_bin || true)"
CADDY_CONTAINER="$(find_caddy_container || true)"

if [[ -z "$CADDY_BIN" ]] && [[ -z "$CADDY_CONTAINER" ]] && ! systemctl list-unit-files caddy.service >/dev/null 2>&1; then
	echo "Caddy not found on this host."
	echo ""
	echo "Something is already answering on port 80 as Caddy. Find how it runs:"
	echo "  systemctl status caddy"
	echo "  docker ps | grep -i caddy"
	echo "  ls -la /etc/caddy/"
	echo ""
	echo "Install Caddy if needed:"
	echo "  https://caddyserver.com/docs/install#debian-ubuntu-raspbian"
	exit 1
fi

sudo mkdir -p /etc/caddy/sites
sudo cp "$REPO_DIR/deploy/Caddyfile" "$CADDY_SITE"
echo "Installed $CADDY_SITE"

if [[ -n "$CADDY_CONTAINER" ]]; then
	CONTAINER_CADDYFILE="$(docker exec "$CADDY_CONTAINER" cat /etc/caddy/Caddyfile 2>/dev/null || true)"
	if [[ -n "$CONTAINER_CADDYFILE" ]] && ! grep -qF 'import sites/' <<<"$CONTAINER_CADDYFILE"; then
		echo ""
		echo "Docker Caddy may use its own config path."
		echo "Copy deploy/Caddyfile into the container's Caddy config, then reload:"
		echo "  docker exec -it $CADDY_CONTAINER sh"
		echo ""
	fi
fi

if [[ -f "$MAIN_CADDY" ]]; then
	if ! grep -qF 'import sites/' "$MAIN_CADDY"; then
		echo "Adding import sites/*.caddy to $MAIN_CADDY"
		echo 'import sites/*.caddy' | sudo tee -a "$MAIN_CADDY" >/dev/null
	fi
elif [[ -z "$CADDY_CONTAINER" ]]; then
	echo "Creating $MAIN_CADDY"
	echo 'import sites/*.caddy' | sudo tee "$MAIN_CADDY" >/dev/null
fi

if ! reload_caddy "$CADDY_BIN" "$CADDY_CONTAINER"; then
	echo ""
	echo "Site file is at $CADDY_SITE"
	echo "Reload Caddy manually using your existing setup."
	exit 1
fi

echo ""
echo "Waiting for certificate..."
sleep 5

if curl -sfI --max-time 15 https://joinhookedonai.com/ >/dev/null; then
	echo "OK: https://joinhookedonai.com is live"
else
	echo "Site config installed but HTTPS still failing."
	echo "Run: bash deploy/check.sh"
	echo "Inspect: sudo journalctl -u caddy -n 50 --no-pager"
	echo "Or: docker logs <caddy-container>"
	exit 1
fi
