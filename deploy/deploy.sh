#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

if [[ ! -f .env.production ]]; then
	echo "Warning: .env.production not found — waitlist form will run in demo mode."
	echo "Create it from .env.production.example before building for production."
fi

if command -v corepack >/dev/null; then
	corepack enable
	corepack prepare pnpm@9.15.9 --activate
fi

pnpm install
pnpm build

echo "Built static site at $REPO_DIR/dist"
echo "Reload Caddy if needed: sudo systemctl reload caddy"
