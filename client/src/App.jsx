import { useState } from "react";
import { theme } from "./theme.js";
import { useIsDesktop, useIsUltrawide } from "./lib/useViewport.js";
import MediaTagger from "./components/MediaTagger.jsx";

const TABS = [
  { id: "diagnostics", label: "DIAG" },
  { id: "media", label: "MEDIA" },
];

export default function App() {
  const [tab, setTab] = useState("media");
  const isDesktop = useIsDesktop();
  const isUltrawide = useIsUltrawide();

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.bg,
      color: theme.text,
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      maxWidth: isUltrawide ? 1920 : isDesktop ? 1280 : 540,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      borderLeft: isDesktop ? `1px solid ${theme.border}` : "none",
      borderRight: isDesktop ? `1px solid ${theme.border}` : "none",
    }}>
      {/* Top bar */}
      <div style={{
        padding: isDesktop ? "0 24px" : "14px 20px 0",
        background: theme.bgCard,
        borderBottom: `1px solid ${theme.border}`,
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}>
        {isDesktop ? (
          // Desktop: logo, tabs, status on one row
          <div style={{ display: "flex", alignItems: "stretch", gap: 32, minHeight: 56 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em",
              fontFamily: "'JetBrains Mono', monospace", color: theme.accent,
            }}>
              LIFT<span style={{ color: theme.text }}>IQ</span>
            </div>
            <div style={{ display: "flex", alignItems: "stretch" }}>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    padding: "0 22px",
                    background: "none",
                    border: "none",
                    borderBottom: `2px solid ${tab === t.id ? theme.accent : "transparent"}`,
                    color: tab === t.id ? theme.text : theme.textMuted,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div style={{
              marginLeft: "auto", display: "flex", alignItems: "center",
              fontSize: 11, color: theme.textMuted, letterSpacing: "0.15em",
              textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace",
            }}>
              KG Lift Field Tool
            </div>
          </div>
        ) : (
          // Mobile: stacked
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{
                fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em",
                fontFamily: "'JetBrains Mono', monospace", color: theme.accent,
              }}>
                LIFT<span style={{ color: theme.text }}>IQ</span>
              </div>
              <div style={{ fontSize: 10, color: theme.textMuted, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                KG Lift Field Tool
              </div>
            </div>
            <div style={{ display: "flex", gap: 0 }}>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    flex: 1, padding: "10px 0", background: "none", border: "none",
                    borderBottom: `2px solid ${tab === t.id ? theme.accent : "transparent"}`,
                    color: tab === t.id ? theme.text : theme.textMuted,
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
                    cursor: "pointer", fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {tab === "media" && <MediaTagger isDesktop={isDesktop} isUltrawide={isUltrawide} />}
        {tab === "diagnostics" && (
          <div style={{
            flex: 1, display: "flex", alignItems: "center",
            justifyContent: "center", padding: 40, minHeight: 400,
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: 48, marginBottom: 16, opacity: 0.3,
                fontFamily: "'JetBrains Mono', monospace",
              }}>?</div>
              <div style={{ fontSize: 14, color: theme.textDim, marginBottom: 8 }}>
                Diagnostic Funnel
              </div>
              <div style={{ fontSize: 12, color: theme.textMuted, maxWidth: 320, lineHeight: 1.5 }}>
                The branching diagnostic engine will go here. Drop in the liftiq-diagnostics.jsx prototype to activate.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
