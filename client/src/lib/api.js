const BASE = "/api/media";

export async function fetchMedia(filters = {}) {
  const params = new URLSearchParams();
  if (filters.kind) params.set("kind", filters.kind);
  if (filters.brand) params.set("brand", filters.brand);
  if (filters.model) params.set("model", filters.model);
  if (filters.system) params.set("system", filters.system);
  if (filters.group_id) params.set("group_id", filters.group_id);
  if (filters.ungrouped) params.set("ungrouped", "1");
  if (filters.q) params.set("q", filters.q);
  if (filters.limit != null) params.set("limit", filters.limit);
  if (filters.offset != null) params.set("offset", filters.offset);
  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch media");
  return res.json();
}

export async function uploadMedia(file, tags = {}) {
  const form = new FormData();
  form.append("image", file);
  for (const [k, v] of Object.entries(tags)) {
    if (v) form.append(k, v);
  }
  const res = await fetch(BASE, { method: "POST", body: form });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function updateMedia(id, tags) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tags),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
}

export async function deleteMedia(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Delete failed");
}

// ── Custom taxonomy (media library only) ──

export async function fetchModels() {
  const res = await fetch("/api/models");
  if (!res.ok) throw new Error("Failed to fetch models");
  return res.json();
}

export async function addModel({ brand, model }) {
  const res = await fetch("/api/models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ brand, model }),
  });
  if (!res.ok) throw new Error("Failed to add model");
  return res.json();
}

export async function deleteModel(id) {
  const res = await fetch(`/api/models/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete model");
  return res.json();
}

// ── Units (media groups) ──

const GROUPS = "/api/groups";

export async function fetchGroups(filters = {}) {
  const params = new URLSearchParams();
  if (filters.brand) params.set("brand", filters.brand);
  if (filters.model) params.set("model", filters.model);
  if (filters.system) params.set("system", filters.system);
  if (filters.q) params.set("q", filters.q);
  if (filters.limit != null) params.set("limit", filters.limit);
  if (filters.offset != null) params.set("offset", filters.offset);
  const res = await fetch(`${GROUPS}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch units");
  return res.json();
}

export async function fetchGroup(id) {
  const res = await fetch(`${GROUPS}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch unit");
  return res.json();
}

export async function createGroup(data = {}) {
  const res = await fetch(GROUPS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create unit");
  return res.json();
}

export async function updateGroup(id, data) {
  const res = await fetch(`${GROUPS}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update unit");
  return res.json();
}

export async function deleteGroup(id, { cascade = false } = {}) {
  const res = await fetch(`${GROUPS}/${id}${cascade ? "?cascade=1" : ""}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete unit");
}

export async function runSearch({ query, brand, model }) {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, brand, model }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || "Search failed");
    err.status = res.status;
    throw err;
  }
  return data;
}
