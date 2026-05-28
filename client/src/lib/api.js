const BASE = "/api/media";

export async function fetchMedia(filters = {}) {
  const params = new URLSearchParams();
  if (filters.kind) params.set("kind", filters.kind);
  if (filters.brand) params.set("brand", filters.brand);
  if (filters.system) params.set("system", filters.system);
  if (filters.q) params.set("q", filters.q);
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
