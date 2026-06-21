#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CADDY_SITE="/etc/caddy/sites/hooked-on-ai.caddy"
MAIN_CADDY="/etc/caddy/Caddyfile"

if ! command -v caddy >/dev/null; then
	echo "Caddy is not installed. Install it first:"
	echo "  https://caddyserver.com/docs/install#debian-ubuntu-raspbian"
	exit 1
fi

if [[ ! -f "$REPO_DIR/dist/index.html" ]]; then
	echo "Build missing. Run first: bash deploy/deploy.sh"
	exit 1
fi

sudo mkdir -p /etc/caddy/sites
sudo cp "$REPO_DIR/deploy/Caddyfile" "$CADDY_SITE"
echo "Installed $CADDY_SITE"

if [[ ! -f "$MAIN_CADDY" ]]; then
	echo "Creating $MAIN_CADDY"
	echo 'import sites/*.caddy' | sudo tee "$MAIN_CADDY" >/dev/null
elif ! grep -qF 'import sites/' "$MAIN_CADDY"; then
	echo "Adding import sites/*.caddy to $MAIN_CADDY"
	echo 'import sites/*.caddy' | sudo tee -a "$MAIN_CADDY" >/dev/null
fi

sudo caddy validate --config "$MAIN_CADDY"
sudo systemctl restart caddy
echo ""
echo "Caddy restarted. Waiting for certificate..."
sleep 5

if curl -sfI --max-time 15 https://joinhookedonai.com/ >/dev/null; then
	echo "OK: https://joinhookedonai.com is live"
else
	echo "HTTPS still failing. Run: bash deploy/check.sh"
	echo "Then inspect: sudo journalctl -u caddy -n 50 --no-pager"
	exit 1
fi
