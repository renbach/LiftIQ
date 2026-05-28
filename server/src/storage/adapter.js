export class StorageAdapter {
  async save(id, buffer, type) {
    throw new Error("Not implemented");
  }

  async get(id, type) {
    throw new Error("Not implemented");
  }

  async delete(id) {
    throw new Error("Not implemented");
  }

  getUrl(id, type) {
    throw new Error("Not implemented");
  }
}
