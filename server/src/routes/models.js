import { Router } from "express";
import { v4 as uuid } from "uuid";
import { run, all } from "../db/index.js";

// User-added taxonomy for the media library. Custom entries are merged with the
// static BRANDS map on the client; diagnostics are unaffected.
export function modelsRoutes() {
  const router = Router();

  // Returns custom additions as { "Crown": ["SC6000", ...], "EPJ": [] }.
  // An empty array means the brand was registered but has no custom models yet.
  router.get("/", (req, res) => {
    res.json(buildCustomMap());
  });

  router.post("/", (req, res) => {
    const brand = (req.body.brand || "").trim();
    const model = (req.body.model || "").trim();
    if (!brand) return res.status(400).json({ error: "Brand is required" });

    run(
      "INSERT OR IGNORE INTO custom_models (id, brand, model) VALUES (?, ?, ?)",
      [uuid(), brand, model]
    );

    res.status(201).json(buildCustomMap());
  });

  router.delete("/:id", (req, res) => {
    run("DELETE FROM custom_models WHERE id = ?", [req.params.id]);
    res.json(buildCustomMap());
  });

  return router;
}

function buildCustomMap() {
  const rows = all("SELECT brand, model FROM custom_models ORDER BY brand, model", []);
  const map = {};
  for (const { brand, model } of rows) {
    if (!map[brand]) map[brand] = [];
    if (model) map[brand].push(model);
  }
  return map;
}
