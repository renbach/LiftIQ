import fs from "node:fs/promises";
import path from "node:path";
import { StorageAdapter } from "./adapter.js";

export class LocalStorage extends StorageAdapter {
  constructor(basePath) {
    super();
    this.basePath = basePath;
    this.dirs = {
      image: path.join(basePath, "images"),
      thumb: path.join(basePath, "thumbs"),
    };
  }

  async save(id, buffer, type) {
    const dir = this.dirs[type];
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, `${id}.jpg`);
    await fs.writeFile(filePath, buffer);
    return filePath;
  }

  async get(id, type) {
    const filePath = path.join(this.dirs[type], `${id}.jpg`);
    return fs.readFile(filePath);
  }

  async delete(id) {
    await Promise.allSettled([
      fs.unlink(path.join(this.dirs.image, `${id}.jpg`)),
      fs.unlink(path.join(this.dirs.thumb, `${id}.jpg`)),
    ]);
  }
}
