import { useState, useEffect, useRef } from "react";

// ─── Tag Taxonomy ───────────────────────────────────────────────────────────
const BRANDS = {
  "Toyota": ["8FGCU25", "8FGCU30", "8FBE15", "8FBE20", "7FGCU25", "7FGCU30", "6FGCU25", "5FGCU25", "8HBW23", "8HBC30"],
  "Yale / Hyster": ["GLP060VX", "GLP050VX", "ERP040VT", "S50FT", "S60FT", "H50FT", "H60FT", "E50XN", "MPB045VG", "PC4500"],
  "Mitsubishi / Unicarrier": ["FGC25N", "FGC30N", "FB16PN", "FB20PN", "FD25N", "FD30N", "PF50", "1F4A25U", "MPC60", "QX2-25"],
};

const SYSTEMS = [
  "Won't Start", "Steering", "Mast / Hydraulic", "Brakes",
  "Trans / Drivetrain", "Electrical / Controls", "Cooling", "Noise", "Other",
];

const FAILURE_TYPES = [
  "Wear", "Leak", "Corrosion", "Crack / Break", "Electrical fault",
  "Contamination", "Adjustment", "Seized", "Reference / Good Condition",
];

const theme = {
  bg: "#0a0c0f", bgCard: "#12151a", bgCardHover: "#1a1e26", bgInput: "#0d1015",
  border: "#1e2430", borderActive: "#3a7bfd", text: "#e8ecf2", textDim: "#6b7a90",
  textMuted: "#4a566a", accent: "#3a7bfd", accentGlow: "rgba(58,123,253,0.15)",
  warning: "#ff8800", danger: "#ff4444", success: "#22c55e",
};

// Downscale an uploaded image to a thumbnail data URL (keeps storage small)
function fileToThumbnail(file, maxDim = 480) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const STORAGE_KEY = "liftiq:media:index";

export default function LiftIQMediaTagger() {
  const [view, setView] = useState("library"); // library | tag
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState([]); // newly uploaded, awaiting tags
  const [filter, setFilter] = useState({ brand: "", system: "", q: "" });
  const fileRef = useRef(null);

  // Load persisted index
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY);
        if (res?.value) setItems(JSON.parse(res.value));
      } catch {
        // no index yet
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = async (next) => {
    setItems(next);
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error("Persist failed (storage limit?)", e);
    }
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList).slice(0, 20);
    const built = [];
    for (const f of files) {
      try {
        const thumb = await fileToThumbnail(f);
        built.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: f.name,
          thumb,
          brand: "", model: "", system: "", component: "",
          failure: "", partNumber: "", hours: "", notes: "",
          tagged: false,
          created: new Date().toISOString(),
        });
      } catch (e) {
        console.error("Thumbnail failed for", f.name, e);
      }
    }
    setPending(built);
    setView("tag");
  };

  const updatePending = (id, field, value) => {
    setPending((p) => p.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const savePending = async () => {
    const tagged = pending.map((it) => ({
      ...it,
      tagged: Boolean(it.brand && it.system),
    }));
    await persist([...tagged, ...items]);
    setPending([]);
    setView("library");
  };

  const deleteItem = async (id) => {
    await persist(items.filter((it) => it.id !== id));
  };

  const filtered = items.filter((it) => {
    if (filter.brand && it.brand !== filter.brand) return false;
    if (filter.system && it.system !== filter.system) return false;
    if (filter.q) {
      const hay = `${it.model} ${it.component} ${it.partNumber} ${it.notes} ${it.failure}`.toLowerCase();
      if (!hay.includes(filter.q.toLowerCase())) return false;
    }
    return true;
  });

  const stats = {
    total: items.length,
    tagged: items.filter((i) => i.tagged).length,
    withParts: items.filter((i) => i.partNumber).length,
  };

  return (
    <div style={{
      background: theme.bg, minHeight: "100vh", color: theme.text,
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      maxWidth: 480, margin: "0 auto", display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px 12px", borderBottom: `1px solid ${theme.border}`,
        background: theme.bgCard, position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{
              fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em",
              fontFamily: "'JetBrains Mono', monospace", color: theme.accent,
            }}>
              LIFT<span style={{ color: theme.text }}>IQ</span>
              <span style={{ color: theme.textMuted, fontWeight: 400 }}> / media</span>
            </div>
            <div style={{ fontSize: 10, color: theme.textMuted, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 1 }}>
              Field Reference Library
            </div>
          </div>
          {view === "library" && (
            <button
              onClick={() => fileRef.current?.click()}
              style={{
                background: theme.accent, border: "none", color: "#fff",
                borderRadius: 6, padding: "8px 16px", cursor: "pointer",
                fontSize: 12, fontWeight: 700, letterSpacing: "0.05em",
              }}
            >
              + UPLOAD
            </button>
          )}
        </div>
        <input
          ref={fileRef} type="file" accept="image/*" multiple
          style={{ display: "none" }}
          onChange={(e) => e.target.files?.length && handleFiles(e.target.files)}
        />

        {/* Stats bar */}
        {view === "library" && (
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            {[
              ["Total", stats.total],
              ["Tagged", stats.tagged],
              ["With Part #", stats.withParts],
            ].map(([label, val]) => (
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
            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <select
                value={filter.brand}
                onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
                style={selectStyle}
              >
                <option value="">All Brands</option>
                {Object.keys(BRANDS).map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <select
                value={filter.system}
                onChange={(e) => setFilter({ ...filter, system: e.target.value })}
                style={selectStyle}
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
              <div style={{ color: theme.textMuted, textAlign: "center", padding: 40 }}>Loading library…</div>
            ) : filtered.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "48px 20px", color: theme.textMuted,
                border: `1px dashed ${theme.border}`, borderRadius: 12,
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📷</div>
                <div style={{ fontSize: 14, color: theme.textDim, marginBottom: 6 }}>
                  {items.length === 0 ? "No photos yet" : "No matches for these filters"}
                </div>
                <div style={{ fontSize: 12 }}>
                  {items.length === 0 ? "Tap UPLOAD to add field photos and start tagging." : "Try clearing a filter."}
                </div>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {filtered.map((it) => (
                  <div key={it.id} style={{
                    background: theme.bgCard, border: `1px solid ${theme.border}`,
                    borderRadius: 10, overflow: "hidden",
                  }}>
                    <div style={{ position: "relative", aspectRatio: "4/3", background: "#000" }}>
                      <img src={it.thumb} alt={it.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      {!it.tagged && (
                        <div style={{
                          position: "absolute", top: 6, right: 6, background: theme.warning,
                          color: "#000", fontSize: 9, fontWeight: 700, padding: "2px 6px",
                          borderRadius: 4, letterSpacing: "0.05em",
                        }}>UNTAGGED</div>
                      )}
                    </div>
                    <div style={{ padding: "8px 10px" }}>
                      {it.brand && (
                        <div style={{ fontSize: 11, color: theme.accent, fontWeight: 600 }}>
                          {it.brand}{it.model ? ` · ${it.model}` : ""}
                        </div>
                      )}
                      {it.system && (
                        <div style={{ fontSize: 11, color: theme.warning, marginTop: 2 }}>{it.system}</div>
                      )}
                      {it.component && (
                        <div style={{ fontSize: 11, color: theme.textDim, marginTop: 2 }}>{it.component}</div>
                      )}
                      {it.partNumber && (
                        <div style={{
                          fontSize: 10, color: theme.success, marginTop: 4,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}>P/N {it.partNumber}</div>
                      )}
                      <button
                        onClick={() => deleteItem(it.id)}
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
              Tag {pending.length} photo{pending.length !== 1 ? "s" : ""}. Brand + System are the minimum for a photo to surface in diagnostics.
            </div>
            {pending.map((it) => (
              <div key={it.id} style={{
                background: theme.bgCard, border: `1px solid ${theme.border}`,
                borderRadius: 12, padding: 14, marginBottom: 14,
              }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <img src={it.thumb} alt={it.name} style={{
                    width: 96, height: 96, objectFit: "cover", borderRadius: 8, flexShrink: 0,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, color: theme.textMuted, wordBreak: "break-all" }}>{it.name}</div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <Field label="Brand">
                    <select value={it.brand} onChange={(e) => { updatePending(it.id, "brand", e.target.value); updatePending(it.id, "model", ""); }} style={selectStyle}>
                      <option value="">—</option>
                      {Object.keys(BRANDS).map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </Field>
                  <Field label="Model">
                    <select value={it.model} onChange={(e) => updatePending(it.id, "model", e.target.value)} style={selectStyle} disabled={!it.brand}>
                      <option value="">—</option>
                      {(BRANDS[it.brand] || []).map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </Field>
                  <Field label="System">
                    <select value={it.system} onChange={(e) => updatePending(it.id, "system", e.target.value)} style={selectStyle}>
                      <option value="">—</option>
                      {SYSTEMS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </Field>
                  <Field label="Failure Type">
                    <select value={it.failure} onChange={(e) => updatePending(it.id, "failure", e.target.value)} style={selectStyle}>
                      <option value="">—</option>
                      {FAILURE_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
                    </select>
                  </Field>
                  <Field label="Component">
                    <input value={it.component} onChange={(e) => updatePending(it.id, "component", e.target.value)} placeholder="e.g. tilt cylinder" style={selectStyle} />
                  </Field>
                  <Field label="Part #">
                    <input value={it.partNumber} onChange={(e) => updatePending(it.id, "partNumber", e.target.value)} placeholder="optional" style={{ ...selectStyle, fontFamily: "'JetBrains Mono', monospace" }} />
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
              <button onClick={() => { setPending([]); setView("library"); }} style={{
                flex: 1, padding: 14, borderRadius: 8, background: theme.bgCard,
                border: `1px solid ${theme.border}`, color: theme.text, fontWeight: 700,
                fontSize: 13, cursor: "pointer",
              }}>Cancel</button>
              <button onClick={savePending} style={{
                flex: 2, padding: 14, borderRadius: 8, background: theme.accent,
                border: "none", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>Save to Library</button>
            </div>
          </>
        )}
      </div>

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
      <div style={{ fontSize: 10, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}

const selectStyle = {
  width: "100%", background: theme.bgInput, border: `1px solid ${theme.border}`,
  borderRadius: 6, padding: "9px 10px", color: theme.text, fontSize: 13,
  outline: "none", fontFamily: "inherit", boxSizing: "border-box",
};
