#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
CADDY_SITE="/etc/caddy/sites/hooked-on-ai.caddy"
MAIN_CADDY="/etc/caddy/Caddyfile"

echo "=== hooked-on-ai deploy check ==="

echo ""
echo "DNS:"
dig +short joinhookedonai.com A || true

echo ""
echo "Build output:"
if [[ -f "$REPO_DIR/dist/index.html" ]]; then
	ls -la "$REPO_DIR/dist/index.html"
else
	echo "MISSING: $REPO_DIR/dist/index.html — run: bash deploy/deploy.sh"
fi

echo ""
echo "Caddy site config:"
if [[ -f "$CADDY_SITE" ]]; then
	echo "OK: $CADDY_SITE"
	cat "$CADDY_SITE"
else
	echo "MISSING: $CADDY_SITE — run: sudo bash deploy/setup-caddy.sh"
fi

echo ""
echo "Main Caddyfile imports:"
if [[ -f "$MAIN_CADDY" ]]; then
	grep -n 'import' "$MAIN_CADDY" || echo "No import lines found in $MAIN_CADDY"
else
	echo "MISSING: $MAIN_CADDY"
fi

echo ""
echo "Caddy service:"
systemctl is-active caddy 2>/dev/null || echo "caddy not running"

echo ""
echo "Recent Caddy logs (cert / ACME errors):"
journalctl -u caddy -n 30 --no-pager 2>/dev/null | grep -iE 'error|warn|acme|certificate|joinhookedonai' || journalctl -u caddy -n 15 --no-pager 2>/dev/null || true

echo ""
echo "Local HTTP test:"
curl -sI -H "Host: joinhookedonai.com" http://127.0.0.1/ | head -5 || true

echo ""
echo "HTTPS test:"
curl -sI --max-time 10 https://joinhookedonai.com/ | head -5 || echo "HTTPS failed — site config or TLS cert issue"
