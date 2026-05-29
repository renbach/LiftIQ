import { Router } from "express";
import { v4 as uuid } from "uuid";
import { run, get, all } from "../db/index.js";
import { formatRow } from "./media.js";

// A "unit" = one physical forklift / visit. It bundles related media (data tag,
// hour meter, master shot, detail shots) into one addressable, indexable record.
export function groupsRoutes(storage) {
  const router = Router();

  router.post("/", (req, res) => {
    const id = uuid();
    const { label, brand, model, serial, hours, system, notes } = req.body;
    run(
      `INSERT INTO groups (id, label, brand, model, serial, hours, system, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, label || null, brand || null, model || null, serial || null, hours || null, system || null, notes || null]
    );
    res.status(201).json(formatGroup(get("SELECT * FROM groups WHERE id = ?", [id])));
  });

  router.get("/", (req, res) => {
    const { brand, model, system, q, limit = "50", offset = "0" } = req.query;
    let sql = "SELECT * FROM groups WHERE 1=1";
    const params = [];

    if (brand) { sql += " AND brand = ?"; params.push(brand); }
    if (model) { sql += " AND model = ?"; params.push(model); }
    if (system) { sql += " AND system = ?"; params.push(system); }
    if (q) {
      sql += " AND (label LIKE ? OR serial LIKE ? OR notes LIKE ? OR model LIKE ?)";
      const like = `%${q}%`;
      params.push(like, like, like, like);
    }

    sql += " ORDER BY updated_at DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    const rows = all(sql, params);
    const totalRow = get("SELECT COUNT(*) as count FROM groups", []);

    res.json({
      items: rows.map((g) => formatGroup(g, withCover(g))),
      stats: { total: totalRow?.count || 0 },
    });
  });

  router.get("/:id", (req, res) => {
    const group = get("SELECT * FROM groups WHERE id = ?", [req.params.id]);
    if (!group) return res.status(404).json({ error: "Not found" });

    // Order members by role (data tag → hour meter → master shot → detail) then age.
    const items = all(
      `SELECT * FROM media WHERE group_id = ?
       ORDER BY CASE role
         WHEN 'data_tag' THEN 0
         WHEN 'hour_meter' THEN 1
         WHEN 'master_shot' THEN 2
         WHEN 'detail' THEN 3
         ELSE 4 END, created_at DESC`,
      [req.params.id]
    );

    res.json({ ...formatGroup(group, withCover(group)), items: items.map(formatRow) });
  });

  router.patch("/:id", (req, res) => {
    const group = get("SELECT * FROM groups WHERE id = ?", [req.params.id]);
    if (!group) return res.status(404).json({ error: "Not found" });

    const fields = ["label", "brand", "model", "serial", "hours", "system", "notes", "cover_media_id"];
    const updates = [];
    const params = [];
    for (const f of fields) {
      if (req.body[f] !== undefined) {
        updates.push(`${f} = ?`);
        params.push(req.body[f] || null);
      }
    }

    if (updates.length === 0) return res.json(formatGroup(group, withCover(group)));

    updates.push("updated_at = datetime('now')");
    params.push(req.params.id);
    run(`UPDATE groups SET ${updates.join(", ")} WHERE id = ?`, params);

    const updated = get("SELECT * FROM groups WHERE id = ?", [req.params.id]);
    res.json(formatGroup(updated, withCover(updated)));
  });

  router.delete("/:id", async (req, res) => {
    const group = get("SELECT * FROM groups WHERE id = ?", [req.params.id]);
    if (!group) return res.status(404).json({ error: "Not found" });

    if (req.query.cascade === "1") {
      // Delete member media + their image files too.
      const members = all("SELECT id FROM media WHERE group_id = ?", [req.params.id]);
      run("DELETE FROM media WHERE group_id = ?", [req.params.id]);
      await Promise.allSettled(members.map((m) => storage.delete(m.id)));
    } else {
      // Default: keep the photos, just release them back to the library.
      run("UPDATE media SET group_id = NULL, role = NULL WHERE group_id = ?", [req.params.id]);
    }

    run("DELETE FROM groups WHERE id = ?", [req.params.id]);
    res.status(204).end();
  });

  return router;
}

// Resolve the cover media id for a group: explicit cover, else newest member.
function withCover(group) {
  if (group.cover_media_id) {
    const exists = get("SELECT id FROM media WHERE id = ? AND group_id = ?", [group.cover_media_id, group.id]);
    if (exists) return group.cover_media_id;
  }
  const newest = get(
    "SELECT id FROM media WHERE group_id = ? ORDER BY created_at DESC LIMIT 1",
    [group.id]
  );
  return newest?.id || null;
}

function formatGroup(group, coverId) {
  const countRow = get("SELECT COUNT(*) as count FROM media WHERE group_id = ?", [group.id]);
  const cover = coverId !== undefined ? coverId : group.cover_media_id || null;
  return {
    id: group.id,
    label: group.label || "",
    brand: group.brand || "",
    model: group.model || "",
    serial: group.serial || "",
    hours: group.hours || "",
    system: group.system || "",
    notes: group.notes || "",
    coverMediaId: cover,
    coverThumbUrl: cover ? `/api/media/${cover}/thumb` : null,
    itemCount: countRow?.count || 0,
    createdAt: group.created_at,
    updatedAt: group.updated_at,
  };
}
