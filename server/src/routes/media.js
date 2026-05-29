import { Router } from "express";
import multer from "multer";
import sharp from "sharp";
import { v4 as uuid } from "uuid";
import { run, get, all, persist } from "../db/index.js";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 25 * 1024 * 1024 } });

export function mediaRoutes(storage) {
  const router = Router();

  router.post("/", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No image provided" });

      const id = uuid();
      const { kind, brand, model, system, component, failure_type, part_number, hours, notes, group_id, role } = req.body;

      const image = sharp(req.file.buffer).rotate();
      const fullImage = await image.clone().resize(1600, 1600, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
      const thumbnail = await image.clone().resize(480, 480, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 70 }).toBuffer();

      await Promise.all([
        storage.save(id, fullImage, "image"),
        storage.save(id, thumbnail, "thumb"),
      ]);

      const tagged = computeTagged(kind, brand, system);

      run(
        `INSERT INTO media (id, filename, original_name, kind, brand, model, system, component, failure_type, part_number, hours, notes, group_id, role, tagged)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, `${id}.jpg`, req.file.originalname, kind || null, brand || null, model || null, system || null, component || null, failure_type || null, part_number || null, hours || null, notes || null, group_id || null, role || null, tagged]
      );

      const row = get("SELECT * FROM media WHERE id = ?", [id]);
      res.status(201).json(formatRow(row));
    } catch (err) {
      console.error("Upload failed:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  });

  router.get("/", (req, res) => {
    const { kind, brand, model, system, failure_type, group_id, ungrouped, q, limit = "50", offset = "0" } = req.query;
    let sql = "SELECT * FROM media WHERE 1=1";
    const params = [];

    if (kind === "unsorted") { sql += " AND kind IS NULL"; }
    else if (kind) { sql += " AND kind = ?"; params.push(kind); }
    if (brand) { sql += " AND brand = ?"; params.push(brand); }
    if (model) { sql += " AND model = ?"; params.push(model); }
    if (system) { sql += " AND system = ?"; params.push(system); }
    if (failure_type) { sql += " AND failure_type = ?"; params.push(failure_type); }
    if (ungrouped === "1") { sql += " AND group_id IS NULL"; }
    else if (group_id) { sql += " AND group_id = ?"; params.push(group_id); }
    if (q) {
      sql += " AND (component LIKE ? OR part_number LIKE ? OR notes LIKE ? OR model LIKE ?)";
      const like = `%${q}%`;
      params.push(like, like, like, like);
    }

    sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const rows = all(sql, params);

    const totalRow = get("SELECT COUNT(*) as count FROM media", []);
    const taggedRow = get("SELECT COUNT(*) as count FROM media WHERE tagged = 1", []);
    const partsRow = get("SELECT COUNT(*) as count FROM media WHERE part_number IS NOT NULL AND part_number != ''", []);

    const kindCounts = all("SELECT COALESCE(kind, 'unsorted') as kind, COUNT(*) as count FROM media GROUP BY kind", []);
    const byKind = Object.fromEntries(kindCounts.map((r) => [r.kind, r.count]));

    res.json({
      items: rows.map(formatRow),
      stats: {
        total: totalRow?.count || 0,
        tagged: taggedRow?.count || 0,
        withParts: partsRow?.count || 0,
        byKind,
      },
    });
  });

  router.get("/:id", (req, res) => {
    const row = get("SELECT * FROM media WHERE id = ?", [req.params.id]);
    if (!row) return res.status(404).json({ error: "Not found" });
    res.json(formatRow(row));
  });

  router.patch("/:id", (req, res) => {
    const row = get("SELECT * FROM media WHERE id = ?", [req.params.id]);
    if (!row) return res.status(404).json({ error: "Not found" });

    const fields = ["kind", "brand", "model", "system", "component", "failure_type", "part_number", "hours", "notes", "group_id", "role"];
    const updates = [];
    const params = [];

    for (const f of fields) {
      if (req.body[f] !== undefined) {
        updates.push(`${f} = ?`);
        params.push(req.body[f] || null);
      }
    }

    if (updates.length === 0) return res.json(formatRow(row));

    const newKind = req.body.kind !== undefined ? req.body.kind : row.kind;
    const newBrand = req.body.brand !== undefined ? req.body.brand : row.brand;
    const newSystem = req.body.system !== undefined ? req.body.system : row.system;
    updates.push("tagged = ?");
    params.push(computeTagged(newKind, newBrand, newSystem));
    updates.push("updated_at = datetime('now')");

    params.push(req.params.id);
    run(`UPDATE media SET ${updates.join(", ")} WHERE id = ?`, params);

    const updated = get("SELECT * FROM media WHERE id = ?", [req.params.id]);
    res.json(formatRow(updated));
  });

  router.delete("/:id", async (req, res) => {
    const row = get("SELECT * FROM media WHERE id = ?", [req.params.id]);
    if (!row) return res.status(404).json({ error: "Not found" });

    run("DELETE FROM media WHERE id = ?", [req.params.id]);
    await storage.delete(req.params.id);
    res.status(204).end();
  });

  router.get("/:id/image", async (req, res) => {
    try {
      const buf = await storage.get(req.params.id, "image");
      res.type("image/jpeg").send(buf);
    } catch {
      res.status(404).json({ error: "Image not found" });
    }
  });

  router.get("/:id/thumb", async (req, res) => {
    try {
      const buf = await storage.get(req.params.id, "thumb");
      res.type("image/jpeg").send(buf);
    } catch {
      res.status(404).json({ error: "Thumbnail not found" });
    }
  });

  return router;
}

export function formatRow(row) {
  return {
    id: row.id,
    originalName: row.original_name,
    kind: row.kind || "",
    brand: row.brand || "",
    model: row.model || "",
    system: row.system || "",
    component: row.component || "",
    failureType: row.failure_type || "",
    partNumber: row.part_number || "",
    hours: row.hours || "",
    notes: row.notes || "",
    groupId: row.group_id || null,
    role: row.role || "",
    tagged: Boolean(row.tagged),
    thumbUrl: `/api/media/${row.id}/thumb`,
    imageUrl: `/api/media/${row.id}/image`,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function computeTagged(kind, brand, system) {
  if (!kind) return 0;
  if (kind === "forklift") return brand && system ? 1 : 0;
  return 1; // tool / reference / other: kind alone is enough
}
