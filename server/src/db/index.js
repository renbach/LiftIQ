import initSqlJs from "sql.js";
import fs from "node:fs";
import path from "node:path";

let db;
let dbPath;

export async function getDb(filePath) {
  if (db) return db;
  dbPath = filePath;

  const SQL = await initSqlJs();

  if (fs.existsSync(dbPath)) {
    const buf = fs.readFileSync(dbPath);
    db = new SQL.Database(buf);
  } else {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      original_name TEXT,
      kind TEXT,
      brand TEXT,
      model TEXT,
      system TEXT,
      component TEXT,
      failure_type TEXT,
      part_number TEXT,
      hours TEXT,
      notes TEXT,
      group_id TEXT,
      role TEXT,
      tagged INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // A "unit" = one physical forklift / visit, bundling its data-tag,
  // hour-meter, master-shot and detail photos into one addressable record.
  db.run(`
    CREATE TABLE IF NOT EXISTS groups (
      id TEXT PRIMARY KEY,
      label TEXT,
      brand TEXT,
      model TEXT,
      serial TEXT,
      hours TEXT,
      system TEXT,
      notes TEXT,
      cover_media_id TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // User-added taxonomy. A row (brand, '') registers a new brand with no
  // models yet; (brand, model) adds a model under any brand.
  db.run(`
    CREATE TABLE IF NOT EXISTS custom_models (
      id TEXT PRIMARY KEY,
      brand TEXT NOT NULL,
      model TEXT NOT NULL DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(brand, model)
    )
  `);

  // Migrations: add columns to existing DBs that pre-date them
  const cols = [];
  const colStmt = db.prepare("PRAGMA table_info(media)");
  while (colStmt.step()) {
    cols.push(colStmt.getAsObject().name);
  }
  colStmt.free();
  if (!cols.includes("kind")) {
    db.run("ALTER TABLE media ADD COLUMN kind TEXT");
  }
  if (!cols.includes("group_id")) {
    db.run("ALTER TABLE media ADD COLUMN group_id TEXT");
  }
  if (!cols.includes("role")) {
    db.run("ALTER TABLE media ADD COLUMN role TEXT");
  }

  persist();
  return db;
}

export function persist() {
  if (!db || !dbPath) return;
  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
}

export function run(sql, params = []) {
  db.run(sql, params);
  persist();
}

export function runNoPersist(sql, params = []) {
  db.run(sql, params);
}

export function get(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.free();
    return row;
  }
  stmt.free();
  return null;
}

export function all(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}
