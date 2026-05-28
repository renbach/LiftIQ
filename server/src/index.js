import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDb } from "./db/index.js";
import { LocalStorage } from "./storage/local.js";
import { mediaRoutes } from "./routes/media.js";
import { searchRoutes } from "./routes/search.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const DB_PATH = path.resolve(process.env.DB_PATH || path.join(__dirname, "..", "liftiq.db"));
const STORAGE_PATH = path.resolve(process.env.STORAGE_PATH || path.join(__dirname, "..", "storage"));

const app = express();
const storage = new LocalStorage(STORAGE_PATH);

app.use(cors());
app.use(express.json());

async function start() {
  await getDb(DB_PATH);

  app.use("/api/media", mediaRoutes(storage));
  app.use("/api/search", searchRoutes());

  const clientDist = path.join(__dirname, "..", "..", "client", "dist");
  app.use(express.static(clientDist));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(clientDist, "index.html"), (err) => {
      if (err) res.status(404).send("Not found");
    });
  });

  app.listen(PORT, () => {
    console.log(`LiftIQ server running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
