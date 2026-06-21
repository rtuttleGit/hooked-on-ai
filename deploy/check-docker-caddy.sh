#!/usr/bin/env bash
set -euo pipefail

CONTAINER="${CADDY_CONTAINER:-zuri-caddy}"

echo "=== Docker Caddy diagnostics ==="
echo ""
docker ps --filter "name=$CONTAINER" --format 'Container: {{.Names}} ({{.Image}}) — {{.Status}}'
echo ""

echo "Mounts:"
docker inspect "$CONTAINER" --format '{{range .Mounts}}  {{.Source}} -> {{.Destination}}{{println}}{{end}}' 2>/dev/null || echo "  (container not found)"
echo ""

echo "Caddyfile inside container:"
docker exec "$CONTAINER" cat /etc/caddy/Caddyfile 2>/dev/null || echo "  (could not read)"
echo ""

echo "Recent logs:"
docker logs "$CONTAINER" --tail 30 2>&1 || true
echo ""

echo "Find docker-compose project:"
find /opt -name 'docker-compose*.yml' -exec grep -l -i caddy {} \; 2>/dev/null || true
