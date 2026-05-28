# CLAUDE.md

Context for the Claude Code agent working on this repo.

## What we're building

LiftIQ — a forklift diagnostic + field-reference tool for mechanics at KG Lift.
Read `README.md` first for the full picture. Two halves: a diagnostic funnel and
a tagged media library, sharing one taxonomy.

## Current state

Two working React prototypes exist (dropped in from artifacts):
- `liftiq-diagnostics.jsx` — the diagnostic funnel. Self-contained, in-memory.
  Contains the full taxonomy and diagnostic trees for Toyota, Yale/Hyster, and
  Mitsubishi/Unicarrier across 8 symptom categories. **This is the source of
  truth for the diagnostic data** — lift the `DIAGNOSTIC_DATA`, `BRANDS`, and
  `SYMPTOM_CATEGORIES` objects out into `client/src/data/`.
- `liftiq-media-tagger.jsx` — the media tagging UI. Uses a browser persistence
  shim for the demo; needs to be repointed at the real backend API.

## Build order (suggested)

1. **Scaffold the monorepo** per the structure in `README.md`. Vite + React on
   the client, Express on the server. Keep it boring and dependency-light.
2. **Extract shared data.** Move the taxonomy + diagnostic trees into
   `client/src/data/diagnostics.js` so both UIs and the server import one source.
3. **Backend media API.** `POST /api/media` (multipart upload → object storage,
   tag record → SQLite), `GET /api/media?brand=&system=&q=`, `DELETE /api/media/:id`.
   For v0 store image files on local disk under `server/storage/`; abstract it
   behind a `StorageAdapter` interface so S3/R2 can drop in later.
4. **Repoint the tagger** at the API instead of the browser shim.
5. **Cross-link.** On the diagnostic results screen, query
   `GET /api/media?brand=X&system=Y` and render matching field photos inline.

## Conventions & constraints

- Node 18+. Plain Express, no heavy framework. `better-sqlite3` for the DB is fine.
- Keep the dark industrial aesthetic from the prototypes (CSS variables in
  `theme`). Don't restyle it into generic Material/Bootstrap.
- Image uploads: downscale + strip EXIF GPS on the server before storing. Field
  photos may carry customer-site location data we don't want to retain.
- **Secrets** (API keys, storage creds) go in `server/.env`, never committed.
  There's a `.env.example` to copy.
- The web-search feature in the diagnostic prototype calls an LLM API. In
  production, proxy that through the server so no key ships to the browser.

## Things to confirm with Connor before doing

- Object storage choice (local disk vs. S3 vs. Cloudflare R2) once past v0.
- Whether the library is single-user or shared across the KG Lift team (changes
  auth + data model).
- Bulk-import format from his existing ~3 years of Google Photos.

## Out of scope for the agent

- DNS / domain configuration for renviasciences.com — Connor handles that. See
  `DEPLOYMENT.md`; your job ends at producing a working production build and a
  documented start command.
