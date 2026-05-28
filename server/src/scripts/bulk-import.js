import "dotenv/config";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import { getDb, runNoPersist, get, persist } from "../db/index.js";
import { LocalStorage } from "../storage/local.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(process.env.DB_PATH || path.join(__dirname, "..", "..", "liftiq.db"));
const STORAGE_PATH = path.resolve(process.env.STORAGE_PATH || path.join(__dirname, "..", "..", "storage"));

const SUPPORTED_IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXT = new Set([".mp4", ".mov", ".m4v", ".webm"]);

function parseTimestamp(filename) {
  // YYYYMMDD_HHMMSS pattern (e.g. 20230710_094956.jpg)
  const m = filename.match(/^(\d{4})(\d{2})(\d{2})[_-]?(\d{2})(\d{2})(\d{2})/);
  if (!m) return null;
  const [, y, mo, d, h, mi, s] = m;
  return `${y}-${mo}-${d} ${h}:${mi}:${s}`;
}

async function processOne(filePath, storage) {
  const filename = path.basename(filePath);
  const id = uuid();
  const buffer = await fsp.readFile(filePath);

  const image = sharp(buffer).rotate(); // honors EXIF orientation
  const fullImage = await image.clone().resize(1600, 1600, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
  const thumbnail = await image.clone().resize(480, 480, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 70 }).toBuffer();

  await Promise.all([
    storage.save(id, fullImage, "image"),
    storage.save(id, thumbnail, "thumb"),
  ]);

  const createdAt = parseTimestamp(filename) || new Date().toISOString().replace("T", " ").slice(0, 19);

  runNoPersist(
    `INSERT INTO media (id, filename, original_name, brand, model, system, component, failure_type, part_number, hours, notes, tagged, created_at)
     VALUES (?, ?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, ?)`,
    [id, `${id}.jpg`, filename, createdAt]
  );
}

async function main() {
  const datasetPath = process.argv[2];
  if (!datasetPath) {
    console.error("Usage: node bulk-import.js <path-to-dataset>");
    process.exit(1);
  }

  if (!fs.existsSync(datasetPath)) {
    console.error(`Path not found: ${datasetPath}`);
    process.exit(1);
  }

  await getDb(DB_PATH);
  const storage = new LocalStorage(STORAGE_PATH);

  const entries = await fsp.readdir(datasetPath, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile()).map((e) => path.join(datasetPath, e.name));

  let imported = 0;
  let skippedVideo = 0;
  let skippedExisting = 0;
  let failed = 0;
  const startTime = Date.now();

  console.log(`Found ${files.length} files in ${datasetPath}`);

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i];
    const filename = path.basename(filePath);
    const ext = path.extname(filename).toLowerCase();

    if (VIDEO_EXT.has(ext)) {
      skippedVideo++;
      continue;
    }
    if (!SUPPORTED_IMAGE_EXT.has(ext)) {
      console.log(`  [skip] unsupported: ${filename}`);
      continue;
    }

    const existing = get("SELECT id FROM media WHERE original_name = ?", [filename]);
    if (existing) {
      skippedExisting++;
      continue;
    }

    try {
      await processOne(filePath, storage);
      imported++;
      if (imported % 25 === 0) {
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        const rate = elapsed > 0 ? (imported / elapsed).toFixed(1) : "?";
        const remaining = files.length - i - 1;
        const eta = elapsed > 0 ? Math.round(remaining / (imported / elapsed)) : "?";
        console.log(`  [${imported}/${files.length}] ${rate}/s · ${elapsed}s elapsed · ~${eta}s remaining`);
        persist(); // checkpoint every 25
      }
    } catch (err) {
      console.error(`  [fail] ${filename}: ${err.message}`);
      failed++;
    }
  }

  persist(); // final flush

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  console.log("\n=== Import complete ===");
  console.log(`  Imported:    ${imported}`);
  console.log(`  Skipped (video):    ${skippedVideo}`);
  console.log(`  Skipped (duplicate): ${skippedExisting}`);
  console.log(`  Failed:      ${failed}`);
  console.log(`  Time:        ${elapsed}s`);
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
