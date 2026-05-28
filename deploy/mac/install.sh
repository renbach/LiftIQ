#!/usr/bin/env bash
# install.sh — first-time setup on the Mac mini
# Run from inside the cloned liftiq-project directory.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$PROJECT_DIR"

echo "==> LiftIQ install — project root: $PROJECT_DIR"

# 1. Sanity checks
command -v node >/dev/null || { echo "node not found. Install with: brew install node"; exit 1; }
NODE_MAJOR=$(node -p "process.versions.node.split('.')[0]")
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "node $NODE_MAJOR is too old. Need 18+."
  exit 1
fi

# 2. Install deps
echo "==> Installing root deps"
npm install

echo "==> Installing client deps"
(cd client && npm install)

echo "==> Installing server deps"
(cd server && npm install)

# 3. Build the client
echo "==> Building production client bundle"
(cd client && npm run build)

# 4. Storage directories
echo "==> Ensuring storage directories exist"
mkdir -p server/storage/images server/storage/thumbs
touch server/storage/images/.gitkeep server/storage/thumbs/.gitkeep

# 5. .env
if [ ! -f server/.env ]; then
  echo "==> Creating server/.env from .env.example"
  cp server/.env.example server/.env
  echo "    Edit server/.env to set ANTHROPIC_API_KEY if you want the web-search feature."
fi

# 6. Smoke test
echo "==> Starting server briefly to verify it runs..."
(cd server && timeout 4 node src/index.js || true) >/tmp/liftiq-smoke.log 2>&1 &
sleep 2
if curl -sf http://localhost:3001/api/media?limit=1 >/dev/null; then
  echo "    OK — API responded."
else
  echo "    WARNING — API did not respond. Check /tmp/liftiq-smoke.log"
fi
pkill -f "node src/index.js" 2>/dev/null || true

echo ""
echo "==> Install complete."
echo ""
echo "Next steps:"
echo "  1. Copy your existing data from the Windows machine (see deploy/mac/README.md)."
echo "  2. Install the launchd service (see deploy/mac/README.md)."
echo "  3. Install and configure cloudflared (see deploy/mac/README.md)."
