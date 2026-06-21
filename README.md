# Hooked on AI — Course Landing Page

Waitlist landing page for the Hooked on AI production AI engineering course. Built with Vite, React, TypeScript (strict), Tailwind CSS, and pnpm.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Production deploy (Caddy on `/opt/hooked-on-ai`)

One-time server setup:

```bash
cd /opt/hooked-on-ai
corepack enable && corepack prepare pnpm@9.15.9 --activate
cp .env.production.example .env.production   # set VITE_WAITLIST_ENDPOINT
bash deploy/deploy.sh

# Isolated from content-creator / zuri-caddy (same server IP):
bash deploy/setup-isolated.sh sidecar
```

This starts `hooked-on-ai-web` (internal only) and adds a `joinhookedonai.com`
block to the zuri-caddy config **volume** — it does not change
`content-creator-backend` git. Zuri’s `{$APP_DOMAIN}` routes are untouched.

**Fully separate edge** (optional): assign a second public IP on Hetzner, point
DNS at it, then:

```bash
export HOOKED_ON_AI_IP=your.second.ip
bash deploy/setup-isolated.sh standalone
```

After each pull:

```bash
cd /opt/hooked-on-ai
git pull
bash deploy/deploy.sh
```

Or manually: `pnpm install && pnpm build`, then `sudo systemctl reload caddy`.

DNS: `joinhookedonai.com` A record → server IP. Caddy provisions HTTPS automatically.

## Waitlist integration

The email form works out of the box in demo mode (shows success without persisting). To collect emails, set a backend endpoint:

```bash
# .env.local
VITE_WAITLIST_ENDPOINT=https://your-form-endpoint
```

The form POSTs JSON: `{ "email": "user@example.com" }`.

Compatible options for v1:

- **ConvertKit** — API form endpoint
- **Mailchimp** — audience signup form action URL
- **Formspree** — `https://formspree.io/f/{id}`
- **Buttondown** — newsletter API
- A small serverless function (Vercel/Netlify) that writes to Airtable or Google Sheets

## Project structure

```
src/
  components/
    layout/     Navbar, Footer
    sections/   Hero, Curriculum, Waitlist, FAQ, etc.
    ui/         Button, WaitlistForm, Accordion
  data/
    content.ts  All copy — edit here
public/
  assets/       Brand SVGs from Hooked on AI design system
```

## Brand

Uses the Plasma Core palette: hull black background, reactor green accent (one word per title), warning amber for tags, cream for text. Fonts: Space Grotesk, Inter, JetBrains Mono.
