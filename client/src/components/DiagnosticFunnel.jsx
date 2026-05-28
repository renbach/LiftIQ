import { useState, useEffect, useRef } from "react";
import { theme } from "../theme.js";
import {
  DIAGNOSTIC_BRANDS,
  SYMPTOM_CATEGORIES,
  DIAGNOSTIC_DATA,
  SYMPTOM_TO_SYSTEM,
} from "../data/taxonomy.js";
import { fetchMedia, runSearch } from "../lib/api.js";

export default function DiagnosticFunnel({ isDesktop = false, isUltrawide = false }) {
  const [step, setStep] = useState("brand"); // brand → model → symptom → diagnose → results
  const [selectedBrandKey, setSelectedBrandKey] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedSymptomId, setSelectedSymptomId] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [relatedMedia, setRelatedMedia] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [step]);

  const brand = selectedBrandKey ? DIAGNOSTIC_BRANDS[selectedBrandKey] : null;
  const diagData = selectedBrandKey && selectedSymptomId
    ? DIAGNOSTIC_DATA[selectedBrandKey]?.[selectedSymptomId]
    : null;
  const symptomCat = SYMPTOM_CATEGORIES.find((s) => s.id === selectedSymptomId);
  const symptomLabel = symptomCat?.label || "";

  // Fetch related media when landing on results
  useEffect(() => {
    if (step !== "results" || !brand || !selectedSymptomId) return;
    const systemLabel = SYMPTOM_TO_SYSTEM[selectedSymptomId];
    if (!systemLabel) return;
    fetchMedia({ brand: brand.name, system: systemLabel })
      .then((data) => setRelatedMedia(data.items.slice(0, 12)))
      .catch(() => setRelatedMedia([]));
  }, [step, brand, selectedSymptomId]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, { question: currentQuestion, answer }];
    setAnswers(newAnswers);
    if (diagData && currentQuestion < diagData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("results");
    }
  };

  const handleWebSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setSearchError(null);
    setSearchResults([]);
    try {
      const data = await runSearch({
        query: searchQuery,
        brand: brand?.name || "",
        model: selectedModel || "",
      });
      setSearchResults(data.results || []);
    } catch (err) {
      if (err.status === 503) {
        setSearchError("Web search not configured on the server. Add ANTHROPIC_API_KEY in server/.env.");
      } else {
        setSearchError("Search failed — check connection and try again.");
      }
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const resetAll = () => {
    setStep("brand");
    setSelectedBrandKey(null);
    setSelectedModel(null);
    setSelectedSymptomId(null);
    setAnswers([]);
    setCurrentQuestion(0);
    setSearchResults([]);
    setSearchQuery("");
    setSearchError(null);
    setShowSearch(false);
    setRelatedMedia([]);
  };

  const goBack = () => {
    if (step === "model") { setStep("brand"); setSelectedBrandKey(null); }
    else if (step === "symptom") { setStep("model"); setSelectedModel(null); }
    else if (step === "diagnose") { setStep("symptom"); setSelectedSymptomId(null); setAnswers([]); setCurrentQuestion(0); }
    else if (step === "results") { setStep("diagnose"); setAnswers(answers.slice(0, -1)); setCurrentQuestion(Math.max(0, currentQuestion - 1)); }
  };

  const containerWidth = isUltrawide ? "100%" : isDesktop ? 720 : "100%";

  return (
    <div style={{
      background: theme.bg, color: theme.text, flex: 1,
      display: "flex", flexDirection: "column", minHeight: 0,
    }}>
      {/* Sub-header */}
      <div style={{
        padding: isDesktop ? "14px 24px" : "12px 20px",
        borderBottom: `1px solid ${theme.border}`,
        background: theme.bgCard,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            {step !== "brand" && (
              <button onClick={goBack} style={{
                background: "none", border: "none", color: theme.textDim, cursor: "pointer",
                fontSize: 20, padding: "4px 8px", borderRadius: 4, lineHeight: 1,
              }}>←</button>
            )}
            <div style={{
              fontSize: 10, color: theme.textMuted, letterSpacing: "0.15em",
              textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace",
            }}>
              Diagnostic Engine
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setShowSearch(!showSearch)}
              style={{
                background: showSearch ? theme.accent : theme.bgInput,
                border: `1px solid ${showSearch ? theme.accent : theme.border}`,
                color: showSearch ? "#fff" : theme.textDim,
                borderRadius: 6, padding: "6px 12px", cursor: "pointer",
                fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
              }}
            >
              WEB SEARCH
            </button>
            {step !== "brand" && (
              <button onClick={resetAll} style={{
                background: theme.bgInput, border: `1px solid ${theme.border}`,
                color: theme.textDim, borderRadius: 6, padding: "6px 12px", cursor: "pointer",
                fontSize: 11, fontWeight: 600, letterSpacing: "0.05em",
              }}>
                RESET
              </button>
            )}
          </div>
        </div>

        {/* Breadcrumb */}
        {step !== "brand" && (
          <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
            {brand && <span style={{
              background: theme.accentGlow, color: theme.accent, borderRadius: 4,
              padding: "3px 8px", fontSize: 11, fontWeight: 600,
            }}>{brand.name}</span>}
            {selectedModel && <><span style={{ color: theme.textMuted, fontSize: 11 }}>›</span><span style={{
              background: "rgba(34,197,94,0.1)", color: theme.success, borderRadius: 4,
              padding: "3px 8px", fontSize: 11, fontWeight: 600,
            }}>{selectedModel}</span></>}
            {symptomCat && <><span style={{ color: theme.textMuted, fontSize: 11 }}>›</span><span style={{
              background: "rgba(255,136,0,0.1)", color: theme.warning, borderRadius: 4,
              padding: "3px 8px", fontSize: 11, fontWeight: 600,
            }}>{symptomLabel}</span></>}
          </div>
        )}
      </div>

      {/* Web Search Panel */}
      {showSearch && (
        <div style={{
          padding: isDesktop ? "16px 24px" : "16px 20px",
          background: theme.bgCard,
          borderBottom: `1px solid ${theme.border}`,
        }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder={`Search: ${brand?.name || "forklift"} ${selectedModel || ""} issue...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleWebSearch()}
                style={{
                  flex: 1, background: theme.bgInput,
                  border: `1px solid ${theme.border}`, borderRadius: 6,
                  padding: "10px 14px", color: theme.text, fontSize: 14,
                  outline: "none", fontFamily: "inherit",
                }}
              />
              <button
                onClick={handleWebSearch}
                disabled={isSearching}
                style={{
                  background: theme.accent, border: "none", borderRadius: 6,
                  padding: "10px 18px", color: "#fff", fontWeight: 700,
                  cursor: isSearching ? "wait" : "pointer",
                  fontSize: 13, opacity: isSearching ? 0.6 : 1,
                }}
              >
                {isSearching ? "..." : "GO"}
              </button>
            </div>
            {searchError && (
              <div style={{ color: theme.danger, fontSize: 12, marginTop: 8 }}>{searchError}</div>
            )}
            {searchResults.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{
                  fontSize: 11, color: theme.textMuted, marginBottom: 8,
                  textTransform: "uppercase", letterSpacing: "0.1em",
                }}>
                  Web Results
                </div>
                {searchResults.map((r, i) => (
                  <div key={i} style={{
                    background: theme.bg, border: `1px solid ${theme.border}`,
                    borderRadius: 8, padding: "12px 16px", marginBottom: 8,
                  }}>
                    <div style={{
                      fontSize: 13, color: theme.accent, marginBottom: 4,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}>{r.source}</div>
                    <div style={{ fontSize: 14, color: theme.text, lineHeight: 1.5 }}>{r.content}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: "auto",
        padding: isDesktop ? "24px" : "20px",
      }}>
        <div style={{ maxWidth: containerWidth, margin: "0 auto" }}>

          {/* STEP: Brand Selection */}
          {step === "brand" && (
            <div>
              <div style={{ fontSize: 14, color: theme.textDim, marginBottom: 20 }}>
                Select the manufacturer to begin diagnostics.
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: isDesktop ? "repeat(3, 1fr)" : "1fr",
                gap: isDesktop ? 14 : 10,
              }}>
                {Object.entries(DIAGNOSTIC_BRANDS).map(([key, b]) => (
                  <button
                    key={key}
                    onClick={() => { setSelectedBrandKey(key); setStep("model"); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 16, width: "100%",
                      background: theme.bgCard, border: `1px solid ${theme.border}`,
                      borderRadius: 10, padding: "20px", cursor: "pointer",
                      transition: "all 0.15s", textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme.bgCardHover;
                      e.currentTarget.style.borderColor = theme.borderActive;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = theme.bgCard;
                      e.currentTarget.style.borderColor = theme.border;
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 8, background: theme.accentGlow,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, color: theme.accent, flexShrink: 0,
                    }}>{b.icon}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>{b.name}</div>
                      <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 2 }}>
                        {b.models.length} models loaded
                      </div>
                    </div>
                    <div style={{ marginLeft: "auto", color: theme.textMuted, fontSize: 18 }}>→</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Model Selection */}
          {step === "model" && brand && (
            <div>
              <div style={{ fontSize: 14, color: theme.textDim, marginBottom: 16 }}>
                Select the model.
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: isDesktop ? "repeat(5, 1fr)" : "1fr 1fr",
                gap: 8,
              }}>
                {brand.models.map((m) => (
                  <button
                    key={m}
                    onClick={() => { setSelectedModel(m); setStep("symptom"); }}
                    style={{
                      background: theme.bgCard, border: `1px solid ${theme.border}`,
                      borderRadius: 8, padding: "14px 12px", cursor: "pointer",
                      textAlign: "center", color: theme.text, fontSize: 13,
                      fontWeight: 600, fontFamily: "'JetBrains Mono', monospace",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme.bgCardHover;
                      e.currentTarget.style.borderColor = theme.borderActive;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = theme.bgCard;
                      e.currentTarget.style.borderColor = theme.border;
                    }}
                  >{m}</button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Symptom Selection */}
          {step === "symptom" && (
            <div>
              <div style={{ fontSize: 14, color: theme.textDim, marginBottom: 16 }}>
                What's the primary issue?
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: isDesktop ? "repeat(2, 1fr)" : "1fr",
                gap: 8,
              }}>
                {SYMPTOM_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedSymptomId(cat.id);
                      setCurrentQuestion(0);
                      setAnswers([]);
                      setStep("diagnose");
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: 14, width: "100%",
                      background: theme.bgCard, border: `1px solid ${theme.border}`,
                      borderRadius: 8, padding: "14px 16px", cursor: "pointer",
                      textAlign: "left", transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme.bgCardHover;
                      e.currentTarget.style.borderColor = cat.color + "66";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = theme.bgCard;
                      e.currentTarget.style.borderColor = theme.border;
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 6,
                      background: cat.color + "18",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16, color: cat.color, flexShrink: 0,
                    }}>{cat.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{cat.label}</div>
                    <div style={{ marginLeft: "auto", color: theme.textMuted, fontSize: 16 }}>→</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP: Diagnostic Questions */}
          {step === "diagnose" && diagData && (
            <div style={{
              display: isDesktop ? "grid" : "block",
              gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined,
              gap: isDesktop ? 20 : 0,
            }}>
              {/* Tendencies */}
              <div style={{
                background: theme.bgCard, border: `1px solid ${theme.border}`,
                borderRadius: 10, padding: 16, marginBottom: isDesktop ? 0 : 20,
              }}>
                <div style={{
                  fontSize: 11, color: theme.warning, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10,
                }}>
                  Known Tendencies — {brand.name}
                </div>
                {diagData.tendencies.map((t, i) => (
                  <div key={i} style={{
                    fontSize: 13, color: theme.textDim, lineHeight: 1.6, padding: "6px 0",
                    borderBottom: i < diagData.tendencies.length - 1 ? `1px solid ${theme.border}` : "none",
                  }}>
                    <span style={{ color: theme.accent, marginRight: 8, fontFamily: "monospace" }}>#{i + 1}</span>
                    {t}
                  </div>
                ))}
              </div>

              <div>
                {/* Current Question */}
                <div style={{
                  background: theme.accentGlow, border: `1px solid ${theme.borderActive}`,
                  borderRadius: 10, padding: 20, marginBottom: 16,
                }}>
                  <div style={{
                    fontSize: 11, color: theme.textMuted, marginBottom: 8,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>
                    Question {currentQuestion + 1} of {diagData.questions.length}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: theme.text, lineHeight: 1.5 }}>
                    {diagData.questions[currentQuestion].q}
                  </div>
                </div>

                {/* Answer Buttons */}
                <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                  <button onClick={() => handleAnswer("yes")} style={{
                    flex: 1, padding: 14, borderRadius: 8,
                    background: "rgba(34,197,94,0.1)",
                    border: `1px solid rgba(34,197,94,0.3)`,
                    color: theme.success, fontWeight: 700, fontSize: 14, cursor: "pointer",
                  }}>YES</button>
                  <button onClick={() => handleAnswer("no")} style={{
                    flex: 1, padding: 14, borderRadius: 8,
                    background: "rgba(255,68,68,0.1)",
                    border: `1px solid rgba(255,68,68,0.3)`,
                    color: theme.danger, fontWeight: 700, fontSize: 14, cursor: "pointer",
                  }}>NO</button>
                </div>

                {/* Previous Answers */}
                {answers.length > 0 && (
                  <div>
                    <div style={{
                      fontSize: 11, color: theme.textMuted, marginBottom: 8,
                      textTransform: "uppercase", letterSpacing: "0.1em",
                    }}>
                      Previous Responses
                    </div>
                    {answers.map((a, i) => (
                      <div key={i} style={{
                        background: theme.bgCard, border: `1px solid ${theme.border}`,
                        borderRadius: 6, padding: "10px 14px", marginBottom: 6,
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                      }}>
                        <span style={{ fontSize: 12, color: theme.textDim, flex: 1, marginRight: 10 }}>
                          {diagData.questions[a.question].q}
                        </span>
                        <span style={{
                          fontSize: 11, fontWeight: 700,
                          color: a.answer === "yes" ? theme.success : theme.danger,
                          padding: "2px 8px", borderRadius: 4,
                          background: a.answer === "yes" ? "rgba(34,197,94,0.1)" : "rgba(255,68,68,0.1)",
                        }}>{a.answer.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP: Results */}
          {step === "results" && diagData && (
            <div>
              <div style={{
                background: "rgba(58,123,253,0.08)", border: `1px solid ${theme.borderActive}`,
                borderRadius: 10, padding: 20, marginBottom: 20,
              }}>
                <div style={{
                  fontSize: 11, color: theme.accent, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12,
                }}>
                  Diagnostic Summary — {brand.name} {selectedModel}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: theme.warning }}>
                  {symptomLabel}
                </div>
              </div>

              <div style={{
                display: isDesktop ? "grid" : "block",
                gridTemplateColumns: isDesktop ? "1fr 1fr" : undefined,
                gap: isDesktop ? 16 : 0,
              }}>
                {/* Diagnostic Path */}
                <div style={{
                  background: theme.bgCard, border: `1px solid ${theme.border}`,
                  borderRadius: 10, padding: 16, marginBottom: isDesktop ? 0 : 16,
                }}>
                  <div style={{
                    fontSize: 11, color: theme.success, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12,
                  }}>
                    Diagnostic Path
                  </div>
                  {answers.map((a, i) => {
                    const qData = diagData.questions[a.question];
                    const conclusion = a.answer === "yes" ? qData.yes : qData.no;
                    return (
                      <div key={i} style={{
                        padding: "12px 0",
                        borderBottom: i < answers.length - 1 ? `1px solid ${theme.border}` : "none",
                      }}>
                        <div style={{ fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>
                          Q{i + 1}: {qData.q} → <span style={{
                            color: a.answer === "yes" ? theme.success : theme.danger,
                            fontWeight: 700,
                          }}>{a.answer.toUpperCase()}</span>
                        </div>
                        <div style={{
                          fontSize: 14, color: theme.text, fontWeight: 600,
                          lineHeight: 1.5, paddingLeft: 12,
                          borderLeft: `2px solid ${theme.accent}`,
                        }}>{conclusion}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Failure Points */}
                <div style={{
                  background: theme.bgCard, border: `1px solid ${theme.border}`,
                  borderRadius: 10, padding: 16, marginBottom: isDesktop ? 0 : 16,
                }}>
                  <div style={{
                    fontSize: 11, color: theme.warning, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10,
                  }}>
                    Model-Specific Failure Points
                  </div>
                  {diagData.tendencies.map((t, i) => (
                    <div key={i} style={{
                      fontSize: 13, color: theme.textDim, lineHeight: 1.6, padding: "6px 0",
                      borderBottom: i < diagData.tendencies.length - 1 ? `1px solid ${theme.border}` : "none",
                    }}>
                      <span style={{ color: theme.warning, marginRight: 8, fontFamily: "monospace", fontSize: 11 }}>⚠</span>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Field Photos */}
              {relatedMedia.length > 0 && (
                <div style={{
                  background: theme.bgCard, border: `1px solid ${theme.border}`,
                  borderRadius: 10, padding: 16, marginTop: 16,
                }}>
                  <div style={{
                    fontSize: 11, color: theme.accent, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12,
                  }}>
                    Field Photos — {brand.name} · {SYMPTOM_TO_SYSTEM[selectedSymptomId]} ({relatedMedia.length})
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: isDesktop
                      ? "repeat(auto-fill, minmax(140px, 1fr))"
                      : "repeat(auto-fill, minmax(110px, 1fr))",
                    gap: 8,
                  }}>
                    {relatedMedia.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setLightbox(m)}
                        style={{
                          aspectRatio: "4/3", background: "#000",
                          borderRadius: 6, overflow: "hidden", cursor: "zoom-in",
                          position: "relative",
                        }}
                      >
                        <img src={m.thumbUrl} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        {m.component && (
                          <div style={{
                            position: "absolute", bottom: 0, left: 0, right: 0,
                            background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                            color: theme.text, fontSize: 10, padding: "10px 6px 4px",
                          }}>{m.component}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Research suggestions */}
              <div style={{
                background: theme.bgCard, border: `1px solid ${theme.border}`,
                borderRadius: 10, padding: 16, marginTop: 16,
              }}>
                <div style={{
                  fontSize: 11, color: theme.accent, fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10,
                }}>
                  Research This Issue
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    `${selectedModel} ${symptomLabel} repair`,
                    `${brand.name} ${symptomLabel} TSB`,
                    `${selectedModel} common failures`,
                  ].map((q, i) => (
                    <button
                      key={i}
                      onClick={() => { setSearchQuery(q); setShowSearch(true); }}
                      style={{
                        background: theme.bgInput, border: `1px solid ${theme.border}`,
                        borderRadius: 6, padding: "8px 12px", color: theme.textDim,
                        fontSize: 12, cursor: "pointer", transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = theme.accent; e.currentTarget.style.borderColor = theme.borderActive; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = theme.textDim; e.currentTarget.style.borderColor = theme.border; }}
                    >
                      🔍 {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button
                  onClick={() => {
                    setStep("symptom");
                    setSelectedSymptomId(null);
                    setAnswers([]);
                    setCurrentQuestion(0);
                  }}
                  style={{
                    flex: 1, padding: 14, borderRadius: 8,
                    background: theme.bgCard, border: `1px solid ${theme.border}`,
                    color: theme.text, fontWeight: 700, fontSize: 13, cursor: "pointer",
                  }}
                >Diagnose Another Issue</button>
                <button
                  onClick={resetAll}
                  style={{
                    flex: 1, padding: 14, borderRadius: 8,
                    background: theme.accent, border: "none",
                    color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
                  }}
                >New Truck</button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Lightbox for related field photos */}
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
    </div>
  );
}
