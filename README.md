# LiftIQ

A field diagnostic tool for forklift mechanics. Takes a broad symptom, narrows it
down using model-specific failure tendencies, and surfaces real field photos and
part numbers from a tagged reference library.

Built for KG Lift, covering **Toyota**, **Yale / Hyster**,
**Mitsubishi / Unicarrier**, **Heli**, **Crown**, **Hangcha**, **Doosan**,
**Clark**, **CAT**, **Raymond**, **Linde**, **Jungheinrich**, and **Komatsu**
trucks.

---

## What's in here

LiftIQ has two halves that share one taxonomy (brand → model → system → component):

1. **Diagnostic engine** — a branching funnel. Pick a brand and model, choose a
   symptom category, answer yes/no questions ranked by likelihood for that
   platform, and land on a probable root cause plus the model's known weak points.
   Optional web search pulls in TSBs and repair notes.

2. **Media reference library** — upload field photos, tag them (brand, model,
   system, component, failure type, part number, hours, notes), and have them
   surface inside the matching diagnostic flow. This is the differentiator: a
   corroded ECU connector on an FGC-N becomes a "look for exactly this" reference
   instead of a sentence of text.

The two prototype UIs (`liftiq-diagnostics.jsx` and `liftiq-media-tagger.jsx`)
were built as standalone React components. This project turns them into a real,
deployable app with persistent storage.

---

## Architecture (target)

```
liftiq/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/      # Diagnostic funnel + media tagger UIs
│   │   ├── data/           # Brand/model/symptom taxonomy + diagnostic trees
│   │   └── lib/            # API client
│   └── package.json
├── server/                 # Node + Express API
│   ├── src/
│   │   ├── routes/         # /api/media, /api/diagnostics, /api/search
│   │   ├── db/             # SQLite (metadata) — Prisma or better-sqlite3
│   │   └── storage/        # Object storage adapter for photos
│   └── package.json
├── CLAUDE.md               # Brief for the Claude Code agent
├── DEPLOYMENT.md           # Hosting on a renviasciences.com subdomain
└── README.md
```

**Why a backend?** The artifact prototypes keep everything in the browser. With
thousands of field photos you need real object storage for the images and a
database for the tag metadata so the library is searchable and shared across
devices. Photos go to object storage (local disk for v0, S3/R2/Backblaze later);
tag records and diagnostic data live in SQLite.

---

## Local setup

Prerequisites: Node.js 18+ and npm.

```bash
# install both halves
cd client && npm install && cd ..
cd server && npm install && cd ..

# run them (two terminals, or use the root script once wired up)
cd server && npm run dev      # API on :3001
cd client && npm run dev      # Vite on :5173
```

The client proxies `/api` to the server in dev. See `DEPLOYMENT.md` for the
production build and subdomain hosting.

---

## Roadmap

- [x] Diagnostic funnel prototype (3 brands, 8 symptom categories)
- [x] Media tagging prototype with persistent metadata
- [x] Backend: media upload + tag CRUD + object storage (local disk via
      StorageAdapter, swap-in S3/R2 later)
- [x] Bulk import from Google Photos export (`server/src/scripts/bulk-import.js`)
- [x] Kind taxonomy (forklift / tool / reference / other) and inline tag editor
- [x] Adaptive desktop / ultrawide layout
- [x] Diagnostic funnel wired into DIAG tab with cross-link to matching media
- [x] Web-search proxy through server so no LLM key ships to the browser
- [x] Brand coverage expanded to 13: Toyota, Yale/Hyster, Mitsubishi/Unicarrier,
      Heli, Crown, Hangcha, Doosan, Clark, CAT, Raymond, Linde, Jungheinrich,
      Komatsu
- [x] Mac mini + Cloudflare Tunnel deployment artifacts (`deploy/mac/`)
- [ ] Ship to `liftiq.renviasciences.com` (Cloudflare account + tunnel)
- [ ] AI-assisted tag suggestions (vision model reads data plates, part labels)
- [ ] Mechanic contributions — let the field add failures back into the DB
- [ ] Part-number cross-reference (OEM ↔ aftermarket)
- [ ] Video support in media library (currently skipped at import)
