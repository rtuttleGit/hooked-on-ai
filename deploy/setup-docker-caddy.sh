#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CONTAINER="${CADDY_CONTAINER:-zuri-caddy}"
MARKER="# hooked-on-ai"
DIST_HOST="/opt/hooked-on-ai/dist"
DIST_CONTAINER="/srv/hooked-on-ai"

if [[ ! -f "$REPO_DIR/dist/index.html" ]]; then
	echo "Build missing. Run first: bash deploy/deploy.sh"
	exit 1
fi

if ! docker ps --format '{{.Names}}' | grep -qx "$CONTAINER"; then
	echo "Container '$CONTAINER' is not running."
	echo "Set CADDY_CONTAINER if the name differs."
	exit 1
fi

echo "=== Caddy container: $CONTAINER ==="
echo ""
echo "Current mounts:"
docker inspect "$CONTAINER" --format '{{range .Mounts}}  {{.Source}} -> {{.Destination}}{{println}}{{end}}'

echo ""
echo "Current Caddyfile:"
docker exec "$CONTAINER" cat /etc/caddy/Caddyfile 2>/dev/null || {
	echo "Could not read /etc/caddy/Caddyfile inside container."
	exit 1
}

CADDYFILE_HOST=""
while IFS=' ' read -r source dest; do
	if [[ "$dest" == "/etc/caddy/Caddyfile" ]]; then
		CADDYFILE_HOST="$source"
	fi
done < <(docker inspect "$CONTAINER" --format '{{range .Mounts}}{{.Source}} {{.Destination}}{{"\n"}}{{end}}')

if [[ -z "$CADDYFILE_HOST" ]]; then
	echo ""
	echo "Caddyfile is not mounted from the host — config may be baked into the image."
	echo "Find the zuri-web docker-compose project and edit its Caddyfile there."
	echo ""
	echo "Add this block plus a dist volume mount:"
	cat "$REPO_DIR/deploy/Caddyfile.docker"
	echo ""
	echo "Volume to add in docker-compose.yml:"
	echo "  - $DIST_HOST:$DIST_CONTAINER:ro"
	exit 1
fi

echo ""
echo "Host Caddyfile: $CADDYFILE_HOST"

if grep -qF "$MARKER" "$CADDYFILE_HOST"; then
	echo "Site block already present in $CADDYFILE_HOST"
else
	echo "" >> "$CADDYFILE_HOST"
	echo "$MARKER" >> "$CADDYFILE_HOST"
	cat "$REPO_DIR/deploy/Caddyfile.docker" >> "$CADDYFILE_HOST"
	echo "Appended site block to $CADDYFILE_HOST"
fi

if docker inspect "$CONTAINER" --format '{{range .Mounts}}{{.Destination}}{{"\n"}}{{end}}' | grep -qx "$DIST_CONTAINER"; then
	echo "Dist volume mount OK ($DIST_CONTAINER)"
else
	echo ""
	echo "ERROR: $DIST_CONTAINER is not mounted in the container."
	echo "Add this volume to the zuri-web docker-compose.yml for the caddy service:"
	echo "  - $DIST_HOST:$DIST_CONTAINER:ro"
	echo ""
	echo "Then recreate the container:"
	echo "  cd <zuri-web-project> && docker compose up -d caddy"
	echo "And run this script again."
	exit 1
fi

echo "Reloading Caddy..."
docker exec "$CONTAINER" caddy reload --config /etc/caddy/Caddyfile \
	|| docker restart "$CONTAINER"

sleep 5
if curl -sfI --max-time 15 https://joinhookedonai.com/ >/dev/null; then
	echo "OK: https://joinhookedonai.com is live"
else
	echo "Config updated but HTTPS still failing."
	echo "Check: docker logs $CONTAINER --tail 50"
	exit 1
fi
