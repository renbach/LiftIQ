# Deploying LiftIQ to the Mac mini

This is the runbook for going live on `liftiq.renviasciences.com` from a
Mac mini behind a normal home router. No port forwarding required —
Cloudflare Tunnel makes the connection outbound.

## Architecture

```
liftiq.renviasciences.com (Cloudflare DNS + Access)
            │
            │  TLS terminated at Cloudflare edge
            ▼
   Cloudflare Tunnel (outbound from Mac)
            │
            ▼
   cloudflared (Mac mini)
            │
            ▼
  Node API on localhost:3001  ◄──── photos + SQLite on local disk
```

## Phase 1 — Mac mini prep

### 1.1 Install prerequisites

```bash
# Install Homebrew if not already present
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node 18+ and cloudflared
brew install node cloudflared
```

### 1.2 Clone and install

```bash
cd ~
git clone git@github.com:<YOUR-USER>/liftiq.git liftiq-project
cd liftiq-project
bash deploy/mac/install.sh
```

The install script installs deps for client + server, builds the
production client bundle, creates the storage dirs, copies `.env.example`
to `.env`, and smoke-tests the API.

### 1.3 (Optional) Configure web search

If you want the diagnostic funnel's "WEB SEARCH" button to work, get an
Anthropic API key at <https://console.anthropic.com> and put it in
`server/.env`:

```
ANTHROPIC_API_KEY=sk-ant-...
```

## Phase 2 — Bring your existing data over

The repo has the code; your photos and tagged metadata live on the
Windows machine and aren't in git. Two pieces to transfer:

- `D:\liftiq-project\server\liftiq.db` — the SQLite tag database
  (1001 imported photos + your tagging so far)
- `D:\liftiq-project\server\storage\` — the full + thumbnail JPEGs

### 2.1 From Windows (Git Bash), copy via SCP

Find the Mac mini's local IP (System Settings → Network on the Mac).
Then from Git Bash on Windows:

```bash
# Replace <mac-ip> and <username>
scp /d/liftiq-project/server/liftiq.db \
    <username>@<mac-ip>:~/liftiq-project/server/

rsync -av --progress \
    /d/liftiq-project/server/storage/ \
    <username>@<mac-ip>:~/liftiq-project/server/storage/
```

(If SSH on the Mac is off, turn it on: System Settings → General →
Sharing → Remote Login.)

### 2.2 Verify on the Mac

```bash
cd ~/liftiq-project/server
ls -lh liftiq.db
ls storage/images | wc -l   # should be ~1002
ls storage/thumbs  | wc -l   # should be ~1002
```

## Phase 3 — Cloudflare account + DNS

These steps happen in your browser, not on the Mac.

### 3.1 Sign up for Cloudflare (free)

<https://dash.cloudflare.com/sign-up>

### 3.2 Add renviasciences.com to Cloudflare

- Dashboard → "Add a site" → enter `renviasciences.com` → choose **Free** plan
- Cloudflare scans your existing Namecheap DNS records and imports them.
  Look through the list and confirm everything you currently use (mail,
  any existing subdomains) is there.

### 3.3 Point your nameservers from Namecheap to Cloudflare

Cloudflare gives you two nameservers like:

```
hank.ns.cloudflare.com
ruth.ns.cloudflare.com
```

In Namecheap:

- Domain List → `renviasciences.com` → Manage
- Nameservers → "Custom DNS"
- Replace the existing values with the two Cloudflare ones → save

DNS propagation usually finishes within a few minutes; can take up to a
few hours worst case. Cloudflare emails you when active.

## Phase 4 — Tunnel + Access

### 4.1 Authenticate cloudflared on the Mac mini

```bash
cloudflared tunnel login
```

This opens a browser window. Sign into Cloudflare and authorize
`renviasciences.com`. A certificate file lands at `~/.cloudflared/cert.pem`.

### 4.2 Create the tunnel

```bash
cloudflared tunnel create liftiq
```

Outputs a tunnel UUID like `abc12345-...` and saves a credentials file
at `~/.cloudflared/<UUID>.json`. Copy the UUID — you'll paste it in the
next step.

### 4.3 Write the tunnel config

```bash
cp ~/liftiq-project/deploy/mac/cloudflared-config.example.yml \
   ~/.cloudflared/config.yml

# Edit the file — replace <TUNNEL-UUID> with the UUID from step 4.2
nano ~/.cloudflared/config.yml
```

### 4.4 Route the DNS to the tunnel

```bash
cloudflared tunnel route dns liftiq liftiq.renviasciences.com
```

Cloudflare auto-creates a CNAME for `liftiq.renviasciences.com` pointing
at the tunnel. (You don't have to touch this in the DNS UI.)

### 4.5 Install cloudflared as a service

```bash
sudo cloudflared service install
```

This creates a launchd job that starts cloudflared at boot. Confirm:

```bash
sudo launchctl list | grep cloudflared
```

### 4.6 Add Cloudflare Access (the auth part)

In the Cloudflare dashboard:

- Zero Trust → Access → Applications → "Add an application" → **Self-hosted**
- **Application name**: LiftIQ
- **Subdomain**: `liftiq` / domain: `renviasciences.com`
- **Session duration**: 1 month (or whatever you prefer)
- → Next
- **Policy name**: `KG Lift team`
- **Action**: Allow
- **Include**: Emails — add the addresses for you + the mechanics
- **Identity providers**: keep "One-time PIN" enabled (email link login)
  and optionally add Google by going to Zero Trust → Settings →
  Authentication → "Add new" → Google.

Save the application. From now on, hitting `liftiq.renviasciences.com`
prompts a sign-in before anything from your server is exposed.

## Phase 5 — Boot persistence for the API

The server itself isn't running yet. Install the launchd plist:

```bash
# Adjust paths inside the plist first — the template assumes
#   /Users/connor/liftiq-project
# Edit it to match the actual path on your Mac.
nano ~/liftiq-project/deploy/mac/com.renviasciences.liftiq.plist

cp ~/liftiq-project/deploy/mac/com.renviasciences.liftiq.plist \
   ~/Library/LaunchAgents/

launchctl load ~/Library/LaunchAgents/com.renviasciences.liftiq.plist
```

Verify:

```bash
launchctl list | grep liftiq
# Then test the local API
curl http://localhost:3001/api/media?limit=1
```

Tail logs if something's off:

```bash
tail -f ~/Library/Logs/liftiq.log
tail -f ~/Library/Logs/liftiq.err.log
```

## Done. Visit liftiq.renviasciences.com.

You should hit a Cloudflare Access sign-in, then land on LiftIQ. The
mechanics on the allowlist get the same experience.

## Routine ops

**Deploy a new version**:

```bash
ssh <username>@<mac-ip>
cd ~/liftiq-project
git pull
(cd client && npm install && npm run build)
(cd server && npm install)
launchctl unload ~/Library/LaunchAgents/com.renviasciences.liftiq.plist
launchctl load   ~/Library/LaunchAgents/com.renviasciences.liftiq.plist
```

**Back up the data**:

```bash
# Run this on the Mac periodically — or set up a launchd cron equivalent
DEST=~/Backups/liftiq-$(date +%Y%m%d)
mkdir -p "$DEST"
cp ~/liftiq-project/server/liftiq.db "$DEST/"
rsync -a ~/liftiq-project/server/storage/ "$DEST/storage/"
```

**Add another mechanic**:

- Zero Trust → Access → Applications → LiftIQ → Edit policy → add their email

**See who's hit the site**:

- Zero Trust → Logs → Access
