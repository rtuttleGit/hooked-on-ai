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

sudo mkdir -p /etc/caddy/sites
sudo cp "$REPO_DIR/deploy/Caddyfile" "$CADDY_SITE"

if [[ -f "$MAIN_CADDY" ]] && ! grep -qF 'import sites/*.caddy' "$MAIN_CADDY"; then
	echo ""
	echo "Add this line to $MAIN_CADDY (once, alongside your other sites):"
	echo "  import sites/*.caddy"
	echo ""
	exit 1
fi

sudo caddy validate --config "$MAIN_CADDY"
sudo systemctl reload caddy
echo "Caddy configured for https://joinhookedonai.com"
