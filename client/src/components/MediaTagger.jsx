import { useState, useEffect, useRef } from "react";
import { theme } from "../theme.js";
import { KINDS, BRANDS, SYSTEMS, FAILURE_TYPES } from "../data/taxonomy.js";
import { fetchMedia, uploadMedia, updateMedia, deleteMedia } from "../lib/api.js";

export default function MediaTagger() {
  const [view, setView] = useState("library");
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 0, tagged: 0, withParts: 0 });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [pending, setPending] = useState([]);
  const [filter, setFilter] = useState({ kind: "", brand: "", system: "", q: "" });
  const [lightbox, setLightbox] = useState(null);
  const [editing, setEditing] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const fileRef = useRef(null);

  const loadLibrary = async () => {
    try {
      const data = await fetchMedia(filter);
      setItems(data.items);
      setStats(data.stats);
    } catch (e) {
      console.error("Failed to load library:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadLibrary(); }, [filter.kind, filter.brand, filter.system]);

  useEffect(() => {
    if (!filter.q) { loadLibrary(); return; }
    const t = setTimeout(loadLibrary, 300);
    return () => clearTimeout(t);
  }, [filter.q]);

  const handleFiles = (fileList) => {
    const files = Array.from(fileList).slice(0, 20);
    const built = files.map((f) => ({
      id: `pending-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      file: f,
      preview: URL.createObjectURL(f),
      name: f.name,
      brand: "", model: "", system: "", component: "",
      failure_type: "", part_number: "", hours: "", notes: "",
    }));
    setPending(built);
    setView("tag");
  };

  const updatePending = (id, field, value) => {
    setPending((p) => p.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const savePending = async () => {
    setUploading(true);
    try {
      for (const item of pending) {
        await uploadMedia(item.file, {
          brand: item.brand,
          model: item.model,
          system: item.system,
          component: item.component,
          failure_type: item.failure_type,
          part_number: item.part_number,
          hours: item.hours,
          notes: item.notes,
        });
      }
      pending.forEach((p) => URL.revokeObjectURL(p.preview));
      setPending([]);
      setView("library");
      loadLibrary();
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMedia(id);
      loadLibrary();
    } catch (e) {
      console.error("Delete failed:", e);
    }
  };

  const openEdit = (item) => {
    setEditing({
      id: item.id,
      thumbUrl: item.thumbUrl,
      imageUrl: item.imageUrl,
      originalName: item.originalName,
      kind: item.kind || "",
      brand: item.brand || "",
      model: item.model || "",
      system: item.system || "",
      component: item.component || "",
      failure_type: item.failureType || "",
      part_number: item.partNumber || "",
      hours: item.hours || "",
      notes: item.notes || "",
    });
  };

  const updateEditing = (field, value) => {
    setEditing((e) => ({ ...e, [field]: value }));
  };

  const closeEdit = () => setEditing(null);

  const saveEdit = async () => {
    setSavingEdit(true);
    try {
      const isForklift = editing.kind === "forklift";
      await updateMedia(editing.id, {
        kind: editing.kind,
        brand: isForklift ? editing.brand : "",
        model: isForklift ? editing.model : "",
        system: isForklift ? editing.system : "",
        component: editing.component,
        failure_type: isForklift ? editing.failure_type : "",
        part_number: editing.part_number,
        hours: isForklift ? editing.hours : "",
        notes: editing.notes,
      });
      closeEdit();
      loadLibrary();
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setSavingEdit(false);
    }
  };

  const deleteFromEdit = async () => {
    if (!editing) return;
    if (!confirm("Delete this photo permanently?")) return;
    const id = editing.id;
    closeEdit();
    await handleDelete(id);
  };

  const selectStyle = {
    width: "100%", background: theme.bgInput, border: `1px solid ${theme.border}`,
    borderRadius: 6, padding: "9px 10px", color: theme.text, fontSize: 13,
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* Sub-header */}
      <div style={{
        padding: "12px 20px",
        borderBottom: `1px solid ${theme.border}`,
        background: theme.bgCard,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{
            fontSize: 10, color: theme.textMuted, letterSpacing: "0.15em",
            textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace",
          }}>
            Field Reference Library
          </div>
          {view === "library" && (
            <button
              onClick={() => fileRef.current?.click()}
              style={{
                background: theme.accent, border: "none", color: "#fff",
                borderRadius: 6, padding: "7px 14px", cursor: "pointer",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.05em",
              }}
            >
              + UPLOAD
            </button>
          )}
        </div>
        <input
          ref={fileRef} type="file" accept="image/*" multiple
          style={{ display: "none" }}
          onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ""; }}
        />

        {view === "library" && (
          <div style={{ display: "flex", gap: 16 }}>
            {[["Total", stats.total], ["Tagged", stats.tagged], ["With Part #", stats.withParts]].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 18, fontWeight: 700, color: theme.text, fontFamily: "'JetBrains Mono', monospace" }}>{val}</div>
                <div style={{ fontSize: 10, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {/* ── LIBRARY VIEW ── */}
        {view === "library" && (
          <>
            <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
              {[
                { value: "", label: "All" },
                { value: "unsorted", label: `Unsorted${stats.byKind?.unsorted ? ` · ${stats.byKind.unsorted}` : ""}` },
                ...KINDS.map((k) => ({
                  value: k.value,
                  label: `${k.label}${stats.byKind?.[k.value] ? ` · ${stats.byKind[k.value]}` : ""}`,
                })),
              ].map((chip) => {
                const active = filter.kind === chip.value;
                return (
                  <button
                    key={chip.value || "all"}
                    onClick={() => setFilter({ ...filter, kind: chip.value })}
                    style={{
                      background: active ? theme.accent : theme.bgCard,
                      color: active ? "#fff" : theme.textDim,
                      border: `1px solid ${active ? theme.accent : theme.border}`,
                      borderRadius: 999, padding: "5px 11px", fontSize: 11,
                      fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer",
                    }}
                  >{chip.label}</button>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <select
                value={filter.brand}
                onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
                style={selectStyle}
                disabled={filter.kind && filter.kind !== "forklift" && filter.kind !== ""}
              >
                <option value="">All Brands</option>
                {Object.keys(BRANDS).map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <select
                value={filter.system}
                onChange={(e) => setFilter({ ...filter, system: e.target.value })}
                style={selectStyle}
                disabled={filter.kind && filter.kind !== "forklift" && filter.kind !== ""}
              >
                <option value="">All Systems</option>
                {SYSTEMS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <input
                placeholder="Search part #, notes..."
                value={filter.q}
                onChange={(e) => setFilter({ ...filter, q: e.target.value })}
                style={{ ...selectStyle, flex: 1, minWidth: 120 }}
              />
            </div>

            {loading ? (
              <div style={{ color: theme.textMuted, textAlign: "center", padding: 40 }}>Loading library...</div>
            ) : items.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "48px 20px", color: theme.textMuted,
                border: `1px dashed ${theme.border}`, borderRadius: 12,
              }}>
                <div style={{ fontSize: 14, color: theme.textDim, marginBottom: 6 }}>
                  {stats.total === 0 ? "No photos yet" : "No matches for these filters"}
                </div>
                <div style={{ fontSize: 12 }}>
                  {stats.total === 0 ? "Tap UPLOAD to add field photos and start tagging." : "Try clearing a filter."}
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {items.map((it) => (
                  <div key={it.id} style={{
                    background: theme.bgCard, border: `1px solid ${theme.border}`,
                    borderRadius: 10, overflow: "hidden",
                  }}>
                    <div
                      onClick={() => openEdit(it)}
                      style={{ position: "relative", aspectRatio: "4/3", background: "#000", cursor: "pointer" }}
                    >
                      <img src={it.thumbUrl} alt={it.originalName} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      {!it.tagged && (
                        <div style={{
                          position: "absolute", top: 6, right: 6, background: theme.warning,
                          color: "#000", fontSize: 9, fontWeight: 700, padding: "2px 6px",
                          borderRadius: 4, letterSpacing: "0.05em",
                        }}>UNTAGGED</div>
                      )}
                      {it.kind && (
                        <div style={{
                          position: "absolute", top: 6, left: 6,
                          background: kindColor(it.kind, theme), color: "#fff",
                          fontSize: 9, fontWeight: 700, padding: "2px 6px",
                          borderRadius: 4, letterSpacing: "0.05em", textTransform: "uppercase",
                        }}>{it.kind}</div>
                      )}
                    </div>
                    <div style={{ padding: "8px 10px" }}>
                      {it.brand && (
                        <div style={{ fontSize: 11, color: theme.accent, fontWeight: 600 }}>
                          {it.brand}{it.model ? ` · ${it.model}` : ""}
                        </div>
                      )}
                      {it.system && <div style={{ fontSize: 11, color: theme.warning, marginTop: 2 }}>{it.system}</div>}
                      {it.component && <div style={{ fontSize: 11, color: theme.textDim, marginTop: 2 }}>{it.component}</div>}
                      {it.partNumber && (
                        <div style={{ fontSize: 10, color: theme.success, marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                          P/N {it.partNumber}
                        </div>
                      )}
                      <button
                        onClick={() => handleDelete(it.id)}
                        style={{
                          marginTop: 6, background: "none", border: `1px solid ${theme.border}`,
                          color: theme.textMuted, fontSize: 10, borderRadius: 4,
                          padding: "3px 8px", cursor: "pointer", width: "100%",
                        }}
                      >Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── TAGGING VIEW ── */}
        {view === "tag" && (
          <>
            <div style={{ fontSize: 14, color: theme.textDim, marginBottom: 16 }}>
              Tag {pending.length} photo{pending.length !== 1 ? "s" : ""}. Brand + System minimum for diagnostics.
            </div>
            {pending.map((it) => (
              <div key={it.id} style={{
                background: theme.bgCard, border: `1px solid ${theme.border}`,
                borderRadius: 12, padding: 14, marginBottom: 14,
              }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <img src={it.preview} alt={it.name} style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: theme.textMuted, wordBreak: "break-all" }}>{it.name}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Field label="Brand" style={selectStyle}>
                    <select value={it.brand} onChange={(e) => { updatePending(it.id, "brand", e.target.value); updatePending(it.id, "model", ""); }} style={selectStyle}>
                      <option value="">--</option>
                      {Object.keys(BRANDS).map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </Field>
                  <Field label="Model">
                    <select value={it.model} onChange={(e) => updatePending(it.id, "model", e.target.value)} style={selectStyle} disabled={!it.brand}>
                      <option value="">--</option>
                      {(BRANDS[it.brand] || []).map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </Field>
                  <Field label="System">
                    <select value={it.system} onChange={(e) => updatePending(it.id, "system", e.target.value)} style={selectStyle}>
                      <option value="">--</option>
                      {SYSTEMS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Failure Type">
                    <select value={it.failure_type} onChange={(e) => updatePending(it.id, "failure_type", e.target.value)} style={selectStyle}>
                      <option value="">--</option>
                      {FAILURE_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </Field>
                  <Field label="Component">
                    <input value={it.component} onChange={(e) => updatePending(it.id, "component", e.target.value)} placeholder="e.g. tilt cylinder" style={selectStyle} />
                  </Field>
                  <Field label="Part #">
                    <input value={it.part_number} onChange={(e) => updatePending(it.id, "part_number", e.target.value)} placeholder="optional" style={{ ...selectStyle, fontFamily: "'JetBrains Mono', monospace" }} />
                  </Field>
                  <Field label="Hours">
                    <input value={it.hours} onChange={(e) => updatePending(it.id, "hours", e.target.value)} placeholder="optional" style={selectStyle} />
                  </Field>
                  <Field label="Notes">
                    <input value={it.notes} onChange={(e) => updatePending(it.id, "notes", e.target.value)} placeholder="what you saw / did" style={selectStyle} />
                  </Field>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <button
                onClick={() => { pending.forEach((p) => URL.revokeObjectURL(p.preview)); setPending([]); setView("library"); }}
                style={{
                  flex: 1, padding: 14, borderRadius: 8, background: theme.bgCard,
                  border: `1px solid ${theme.border}`, color: theme.text, fontWeight: 700,
                  fontSize: 13, cursor: "pointer",
                }}
              >Cancel</button>
              <button
                onClick={savePending}
                disabled={uploading}
                style={{
                  flex: 2, padding: 14, borderRadius: 8, background: uploading ? theme.textMuted : theme.accent,
                  border: "none", color: "#fff", fontWeight: 700, fontSize: 13,
                  cursor: uploading ? "wait" : "pointer",
                }}
              >{uploading ? "Uploading..." : "Save to Library"}</button>
            </div>
          </>
        )}
      </div>

      {/* Edit modal */}
      {editing && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          display: "flex", justifyContent: "center", zIndex: 50,
        }}>
          <div style={{
            background: theme.bg, width: "100%", maxWidth: 540,
            display: "flex", flexDirection: "column",
            borderLeft: `1px solid ${theme.border}`,
            borderRight: `1px solid ${theme.border}`,
          }}>
            {/* Header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", borderBottom: `1px solid ${theme.border}`,
              background: theme.bgCard,
            }}>
              <button
                onClick={closeEdit}
                style={{
                  background: "none", border: "none", color: theme.textDim,
                  fontSize: 20, cursor: "pointer", padding: 4, lineHeight: 1,
                }}
              >✕</button>
              <div style={{
                fontSize: 10, color: theme.textMuted, letterSpacing: "0.15em",
                textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace",
              }}>
                Edit Tags
              </div>
              <div style={{ width: 28 }} />
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
              <div
                onClick={() => setLightbox({ imageUrl: editing.imageUrl })}
                style={{
                  width: "100%", aspectRatio: "4/3", background: "#000",
                  borderRadius: 8, overflow: "hidden", marginBottom: 8, cursor: "zoom-in",
                  position: "relative",
                }}
              >
                <img src={editing.imageUrl} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                <div style={{
                  position: "absolute", bottom: 6, right: 6, background: "rgba(0,0,0,0.6)",
                  color: theme.textDim, fontSize: 9, padding: "2px 6px", borderRadius: 4,
                  letterSpacing: "0.05em", textTransform: "uppercase",
                }}>tap to zoom</div>
              </div>
              <div style={{ fontSize: 11, color: theme.textMuted, marginBottom: 14, wordBreak: "break-all" }}>
                {editing.originalName}
              </div>

              {/* Kind picker — segmented control */}
              <div style={{ marginBottom: 14 }}>
                <div style={{
                  fontSize: 10, color: theme.textMuted, textTransform: "uppercase",
                  letterSpacing: "0.08em", marginBottom: 6,
                }}>Kind</div>
                <div style={{ display: "flex", gap: 4 }}>
                  {KINDS.map((k) => {
                    const active = editing.kind === k.value;
                    return (
                      <button
                        key={k.value}
                        onClick={() => updateEditing("kind", k.value)}
                        style={{
                          flex: 1, padding: "9px 4px", borderRadius: 6,
                          background: active ? theme.accent : theme.bgInput,
                          border: `1px solid ${active ? theme.accent : theme.border}`,
                          color: active ? "#fff" : theme.textDim,
                          fontSize: 11, fontWeight: 700, cursor: "pointer",
                          letterSpacing: "0.04em",
                        }}
                      >{k.label}</button>
                    );
                  })}
                </div>
              </div>

              {editing.kind === "forklift" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Field label="Brand">
                    <select value={editing.brand} onChange={(e) => { updateEditing("brand", e.target.value); updateEditing("model", ""); }} style={selectStyle}>
                      <option value="">--</option>
                      {Object.keys(BRANDS).map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </Field>
                  <Field label="Model">
                    <select value={editing.model} onChange={(e) => updateEditing("model", e.target.value)} style={selectStyle} disabled={!editing.brand}>
                      <option value="">--</option>
                      {(BRANDS[editing.brand] || []).map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </Field>
                  <Field label="System">
                    <select value={editing.system} onChange={(e) => updateEditing("system", e.target.value)} style={selectStyle}>
                      <option value="">--</option>
                      {SYSTEMS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Failure Type">
                    <select value={editing.failure_type} onChange={(e) => updateEditing("failure_type", e.target.value)} style={selectStyle}>
                      <option value="">--</option>
                      {FAILURE_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </Field>
                  <Field label="Component">
                    <input value={editing.component} onChange={(e) => updateEditing("component", e.target.value)} placeholder="e.g. tilt cylinder" style={selectStyle} />
                  </Field>
                  <Field label="Part #">
                    <input value={editing.part_number} onChange={(e) => updateEditing("part_number", e.target.value)} placeholder="optional" style={{ ...selectStyle, fontFamily: "'JetBrains Mono', monospace" }} />
                  </Field>
                  <Field label="Hours">
                    <input value={editing.hours} onChange={(e) => updateEditing("hours", e.target.value)} placeholder="optional" style={selectStyle} />
                  </Field>
                  <Field label="Notes">
                    <input value={editing.notes} onChange={(e) => updateEditing("notes", e.target.value)} placeholder="what you saw / did" style={selectStyle} />
                  </Field>
                </div>
              )}

              {editing.kind === "tool" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Field label="Tool / Name">
                    <input value={editing.component} onChange={(e) => updateEditing("component", e.target.value)} placeholder="e.g. brake spring pliers" style={selectStyle} />
                  </Field>
                  <Field label="Part / Model #">
                    <input value={editing.part_number} onChange={(e) => updateEditing("part_number", e.target.value)} placeholder="Snap-on #, etc." style={{ ...selectStyle, fontFamily: "'JetBrains Mono', monospace" }} />
                  </Field>
                  <div style={{ gridColumn: "1 / span 2" }}>
                    <Field label="Notes">
                      <input value={editing.notes} onChange={(e) => updateEditing("notes", e.target.value)} placeholder="what it's for / where it lives" style={selectStyle} />
                    </Field>
                  </div>
                </div>
              )}

              {(editing.kind === "reference" || editing.kind === "other") && (
                <Field label="Notes">
                  <input value={editing.notes} onChange={(e) => updateEditing("notes", e.target.value)} placeholder="what this is / why it's here" style={selectStyle} />
                </Field>
              )}

              {!editing.kind && (
                <div style={{
                  textAlign: "center", padding: "20px 12px", color: theme.textMuted,
                  border: `1px dashed ${theme.border}`, borderRadius: 8, fontSize: 12,
                }}>
                  Pick a Kind above to see the relevant tag fields.
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              display: "flex", gap: 8, padding: 12,
              borderTop: `1px solid ${theme.border}`, background: theme.bgCard,
            }}>
              <button
                onClick={deleteFromEdit}
                style={{
                  padding: "12px 14px", borderRadius: 8, background: "transparent",
                  border: `1px solid ${theme.danger}`, color: theme.danger,
                  fontWeight: 700, fontSize: 12, cursor: "pointer",
                }}
              >Delete</button>
              <button
                onClick={closeEdit}
                style={{
                  flex: 1, padding: 12, borderRadius: 8, background: theme.bgCard,
                  border: `1px solid ${theme.border}`, color: theme.text,
                  fontWeight: 700, fontSize: 13, cursor: "pointer",
                }}
              >Cancel</button>
              <button
                onClick={saveEdit}
                disabled={savingEdit}
                style={{
                  flex: 2, padding: 12, borderRadius: 8,
                  background: savingEdit ? theme.textMuted : theme.accent,
                  border: "none", color: "#fff", fontWeight: 700, fontSize: 13,
                  cursor: savingEdit ? "wait" : "pointer",
                }}
              >{savingEdit ? "Saving..." : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100, cursor: "pointer",
          }}
        >
          <img src={lightbox.imageUrl} alt="" style={{ maxWidth: "95vw", maxHeight: "90vh", objectFit: "contain", borderRadius: 8 }} />
        </div>
      )}

      {/* Footer */}
      <div style={{
        padding: "10px 20px", borderTop: `1px solid ${theme.border}`,
        background: theme.bgCard, textAlign: "center",
      }}>
        <span style={{
          fontSize: 10, color: theme.textMuted, letterSpacing: "0.15em",
          textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace",
        }}>
          Tagged photos surface in the matching diagnostic flow
        </span>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div style={{
        fontSize: 10, color: theme.textMuted, textTransform: "uppercase",
        letterSpacing: "0.08em", marginBottom: 4,
      }}>{label}</div>
      {children}
    </div>
  );
}

function kindColor(kind, theme) {
  if (kind === "forklift") return theme.accent;
  if (kind === "tool") return "#22c55e"; // success green
  if (kind === "reference") return "#a855f7"; // purple
  return "#64748b"; // slate for "other"
}
