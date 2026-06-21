#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY_DIR="$REPO_DIR/deploy"
ZURI_CONTAINER="${ZURI_CONTAINER:-zuri-caddy}"
SIDEcar_CONTAINER="hooked-on-ai-web"
MARKER="# hooked-on-ai (isolated sidecar)"

find_zuri_caddyfile() {
	local path
	for path in /etc/caddy/Caddyfile /config/Caddyfile; do
		if docker exec "$ZURI_CONTAINER" test -f "$path" 2>/dev/null; then
			echo "$path"
			return 0
		fi
	done
	return 1
}

append_edge_snippet() {
	local caddyfile="$1"
	if docker exec "$ZURI_CONTAINER" grep -qF "$MARKER" "$caddyfile" 2>/dev/null; then
		echo "Edge snippet already present in $caddyfile"
		return 0
	fi
	{
		echo ""
		echo "$MARKER"
		cat "$DEPLOY_DIR/Caddyfile.edge-snippet"
	} | docker exec -i "$ZURI_CONTAINER" sh -c "cat >> '$caddyfile'"
	echo "Appended joinhookedonai.com block to $caddyfile (inside $ZURI_CONTAINER)"
}

usage() {
	cat <<'EOF'
Isolated deploy for hooked-on-ai (does not modify content-creator-backend git).

Same server IP as zuri (default):
  bash deploy/setup-isolated.sh sidecar

  Starts hooked-on-ai-web on the Docker network only, then appends a
  joinhookedonai.com block to the zuri-caddy config volume. Zuri routes
  for {$APP_DOMAIN} are unchanged — Caddy routes by hostname.

Second public IP on this server (zero touch to zuri):
  export HOOKED_ON_AI_IP=x.x.x.x
  bash deploy/setup-isolated.sh standalone

  Point joinhookedonai.com DNS A record at HOOKED_ON_AI_IP only.

EOF
}

find_zuri_network() {
	docker inspect "$ZURI_CONTAINER" --format '{{range $name, $_ := .NetworkSettings.Networks}}{{$name}}{{"\n"}}{{end}}' \
		| head -1
}

setup_sidecar() {
	if [[ ! -f "$REPO_DIR/dist/index.html" ]]; then
		echo "Build missing. Run: bash deploy/deploy.sh"
		exit 1
	fi

	if ! docker ps --format '{{.Names}}' | grep -qx "$ZURI_CONTAINER"; then
		echo "Expected running container: $ZURI_CONTAINER"
		exit 1
	fi

	ZURI_CADDYFILE="$(find_zuri_caddyfile)" || {
		echo "Could not find Caddyfile inside $ZURI_CONTAINER"
		exit 1
	}
	echo "Using zuri Caddyfile: $ZURI_CADDYFILE"

	echo "Starting hooked-on-ai sidecar (no public ports)..."
	docker compose -f "$DEPLOY_DIR/docker-compose.yml" up -d

	ZURI_NETWORK="$(find_zuri_network)"
	if [[ -z "$ZURI_NETWORK" ]]; then
		echo "Could not detect Docker network for $ZURI_CONTAINER"
		exit 1
	fi

	if ! docker inspect "$SIDEcar_CONTAINER" --format '{{range $name, $_ := .NetworkSettings.Networks}}{{$name}}{{"\n"}}{{end}}' \
		| grep -qx "$ZURI_NETWORK"; then
		echo "Connecting $SIDEcar_CONTAINER to network: $ZURI_NETWORK"
		docker network connect "$ZURI_NETWORK" "$SIDEcar_CONTAINER"
	fi

	append_edge_snippet "$ZURI_CADDYFILE"

	echo "Reloading $ZURI_CONTAINER..."
	docker exec "$ZURI_CONTAINER" caddy reload --config /etc/caddy/Caddyfile \
		|| docker restart "$ZURI_CONTAINER"

	sleep 5
	if curl -sfI --max-time 15 https://joinhookedonai.com/ >/dev/null; then
		echo "OK: https://joinhookedonai.com is live"
	else
		echo "Sidecar is up but HTTPS check failed."
		echo "Logs: docker logs $ZURI_CONTAINER --tail 30"
		echo "       docker logs $SIDEcar_CONTAINER --tail 30"
		exit 1
	fi
}

setup_standalone() {
	if [[ -z "${HOOKED_ON_AI_IP:-}" ]]; then
		echo "Set HOOKED_ON_AI_IP to a second public IP on this server."
		exit 1
	fi

	if [[ ! -f "$REPO_DIR/dist/index.html" ]]; then
		echo "Build missing. Run: bash deploy/deploy.sh"
		exit 1
	fi

	echo "Starting standalone Caddy on $HOOKED_ON_AI_IP (zuri untouched)..."
	docker compose -f "$DEPLOY_DIR/docker-compose.standalone.yml" up -d

	sleep 5
	if curl -sfI --max-time 15 https://joinhookedonai.com/ >/dev/null; then
		echo "OK: https://joinhookedonai.com is live"
	else
		echo "Container started but HTTPS check failed."
		echo "Ensure DNS A record for joinhookedonai.com points to $HOOKED_ON_AI_IP"
		docker logs hooked-on-ai-caddy --tail 30
		exit 1
	fi
}

case "${1:-sidecar}" in
	sidecar) setup_sidecar ;;
	standalone) setup_standalone ;;
	*) usage; exit 1 ;;
esac
