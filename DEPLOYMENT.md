# DEPLOYMENT.md

How to get LiftIQ live on a subdomain like `liftiq.renviasciences.com`.

> **Heads up:** the DNS and hosting-account steps below have to be done by you —
> they need access to wherever `renviasciences.com` is registered and whatever
> host you deploy to. This guide gives you the exact steps; nobody can do the
> DNS part on your behalf without your registrar login.

---

## Step 1 — Pick where it runs

LiftIQ has a frontend (static files) and a backend (Node API + a database +
photo storage). A few realistic options, simplest first:

| Option | Good for | Notes |
|---|---|---|
| **Single VPS** (DigitalOcean, Hetzner, Linode) | Full control, cheapest at scale | You run Node + a reverse proxy (Caddy/Nginx). Photos on local disk to start. |
| **Render / Railway / Fly.io** | Least ops work | Deploy the server as a web service; attach a persistent volume for photos. |
| **Split**: static host (Netlify/Vercel) + API host | Fast frontend | Frontend static, API on Render/Railway/VPS. Two subdomains or a proxy. |

For "live for now" with thousands of photos, a **single small VPS with Caddy**
is the most predictable — one box, automatic HTTPS, photos on disk.

## Step 2 — Build for production

```bash
cd client && npm run build      # outputs client/dist
cd ../server && npm run build   # if using TS; otherwise just run src
```

The server should serve the built `client/dist` as static files and handle
`/api/*` itself, so the whole app is one origin (simplest for the subdomain).

## Step 3 — Run the server

On the VPS:

```bash
# from the repo root
cd server
cp .env.example .env     # then fill in real values
npm ci
npm start                # listens on e.g. :3001
```

Use a process manager so it survives reboots and crashes:

```bash
npm i -g pm2
pm2 start npm --name liftiq -- start
pm2 save && pm2 startup
```

## Step 4 — Point the subdomain at it (your DNS)

In your DNS provider for `renviasciences.com`, add a record for the subdomain:

- **If deploying to a VPS with a fixed IP:** add an `A` record
  - Host/Name: `liftiq`
  - Value: your server's public IP
- **If deploying to a platform (Render/Railway/Netlify/Vercel):** add a `CNAME`
  - Host/Name: `liftiq`
  - Value: the hostname the platform gives you (e.g. `liftiq.onrender.com`)

DNS changes take anywhere from a few minutes to a few hours to propagate.

## Step 5 — HTTPS + reverse proxy (VPS route)

Caddy is the least-effort way — it gets a free certificate automatically. A
minimal `Caddyfile`:

```
liftiq.renviasciences.com {
    reverse_proxy localhost:3001
}
```

```bash
sudo caddy run --config ./Caddyfile
# (or install as a service: sudo caddy start)
```

Once DNS resolves, Caddy provisions the cert and `https://liftiq.renviasciences.com`
is live.

> On a platform host (Render/Railway/etc.), skip Caddy — add the custom domain in
> the platform's dashboard, and it handles the certificate. You'll still add the
> CNAME from Step 4.

---

## Using Claude Code to do the build-out

You can let the Claude Code agent handle most of Steps 1–3 (scaffolding, backend,
build scripts). To install Claude Code:

- **Native installer (recommended, no Node needed for the tool itself):**
  - macOS / Linux: `curl -fsSL https://claude.ai/install.sh | bash`
  - Windows (PowerShell): `irm https://claude.ai/install.ps1 | iex`
- **Or via npm** (legacy, needs Node 18+): `npm install -g @anthropic-ai/claude-code`

Then, from the project folder:

```bash
cd liftiq-project
claude
```

`CLAUDE.md` in this repo briefs the agent on what to build and in what order, so
you can start with something like *"Read CLAUDE.md and scaffold the monorepo, then
build the media API."* Verify Claude Code details at
https://docs.claude.com/en/docs/claude-code/overview — the install methods above
were current as of this writing but the tool updates often.

---

## Don't forget

- **Secrets** live in `server/.env`, never committed. Copy from `.env.example`.
- **Back up** the SQLite DB and the photo directory — that field library is the
  whole point and it's irreplaceable.
- **Strip GPS/EXIF** from uploads server-side (the backend should already do
  this) so customer-site locations aren't retained.
