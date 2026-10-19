"use client";
import { useState } from "react";

const fahrlehrerListe = ["Alle Fahrlehrer", "Herr Koch", "Frau Bauer", "Herr Wendt"];

const lehrerFarben: Record<string, string> = {
  "Herr Koch": "#1C1C1E",
  "Frau Bauer": "#B8860B",
  "Herr Wendt": "#2563EB",
};

const wochenTermine = [
  { tag: 0, start: 8, dauer: 1, schueler: "Max Mustermann", lehrer: "Herr Koch", typ: "Fahrstunde" },
  { tag: 0, start: 10, dauer: 1, schueler: "Lisa Schmidt", lehrer: "Frau Bauer", typ: "Fahrstunde" },
  { tag: 0, start: 12, dauer: 1, schueler: "Mittagspause", lehrer: "Herr Koch", typ: "Pause" },
  { tag: 0, start: 14, dauer: 2, schueler: "Tom Braun", lehrer: "Herr Wendt", typ: "Überlandfahrt" },
  { tag: 1, start: 9, dauer: 1, schueler: "Anna Müller", lehrer: "Herr Koch", typ: "Fahrstunde" },
  { tag: 1, start: 11, dauer: 1, schueler: "Paul Krause", lehrer: "Frau Bauer", typ: "Fahrstunde" },
  { tag: 1, start: 12, dauer: 1, schueler: "Mittagspause", lehrer: "Frau Bauer", typ: "Pause" },
  { tag: 1, start: 15, dauer: 1, schueler: "Max Mustermann", lehrer: "Herr Koch", typ: "Fahrstunde" },
  { tag: 2, start: 8, dauer: 2, schueler: "Tom Braun", lehrer: "Herr Wendt", typ: "Nachtfahrt" },
  { tag: 2, start: 12, dauer: 1, schueler: "Mittagspause", lehrer: "Herr Koch", typ: "Pause" },
  { tag: 2, start: 13, dauer: 1, schueler: "Lisa Schmidt", lehrer: "Frau Bauer", typ: "Fahrstunde" },
  { tag: 2, start: 15, dauer: 1, schueler: "FREI", lehrer: "Herr Koch", typ: "Lücke" },
  { tag: 3, start: 9, dauer: 1, schueler: "Anna Müller", lehrer: "Herr Koch", typ: "Fahrstunde" },
  { tag: 3, start: 10, dauer: 1, schueler: "Paul Krause", lehrer: "Herr Koch", typ: "Fahrstunde" },
  { tag: 3, start: 14, dauer: 1, schueler: "Max Mustermann", lehrer: "Frau Bauer", typ: "Fahrstunde" },
  { tag: 3, start: 16, dauer: 1, schueler: "Theorieunterricht", lehrer: "Herr Wendt", typ: "Theorie" },
  { tag: 4, start: 8, dauer: 1, schueler: "Lisa Schmidt", lehrer: "Herr Koch", typ: "Fahrstunde" },
  { tag: 4, start: 11, dauer: 1, schueler: "Prüfung: Tom Braun", lehrer: "Herr Wendt", typ: "Prüfung" },
  { tag: 5, start: 9, dauer: 1, schueler: "Anna Müller", lehrer: "Frau Bauer", typ: "Fahrstunde" },
];

const anfragen = [
  { schueler: "Max Mustermann", kundennr: "FS-2026-0142", wunsch: "Do 22.10. · 14:00", lehrer: "Herr Koch", gesendet: "vor 2 Std", score: 5 },
  { schueler: "Lisa Schmidt", kundennr: "FS-2026-0138", wunsch: "Fr 23.10. · 10:00", lehrer: "Frau Bauer", gesendet: "vor 5 Std", score: 4 },
  { schueler: "Jonas Weber", kundennr: "FS-2026-0148", wunsch: "Mi 21.10. · 16:00", lehrer: "Herr Koch", gesendet: "gestern", score: 3 },
];

const kandidaten = [
  { name: "Lisa Schmidt", kundennr: "FS-2026-0138", grund: "Letzte Stunde vor 9 Tagen", score: 4, passt: true },
  { name: "Paul Krause", kundennr: "FS-2026-0129", grund: "Prüfungsvorbereitung läuft", score: 4, passt: true },
  { name: "Max Mustermann", kundennr: "FS-2026-0142", grund: "Hat diese Woche schon 2 Stunden", score: 5, passt: true },
  { name: "Anna Müller", kundennr: "FS-2026-0156", grund: "340 € offen · 2 No-Shows", score: 2, passt: false },
];

const stunden = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const wochenTage = [
  { kurz: "Mo", datum: "19.10" },
  { kurz: "Di", datum: "20.10" },
  { kurz: "Mi", datum: "21.10" },
  { kurz: "Do", datum: "22.10" },
  { kurz: "Fr", datum: "23.10" },
  { kurz: "Sa", datum: "24.10" },
  { kurz: "So", datum: "25.10" },
];

const monatsTage = Array.from({ length: 35 }, (_, i) => {
  const tag = i - 2;
  return {
    nummer: tag > 0 && tag <= 31 ? tag : null,
    termine: tag > 0 && tag <= 31 ? (tag % 7) + 1 : 0,
  };
});

export default function Kalender() {
  const [ansicht, setAnsicht] = useState<"woche" | "monat">("woche");
  const [lehrerFilter, setLehrerFilter] = useState("Alle Fahrlehrer");
  const [filterOffen, setFilterOffen] = useState(false);
  const [gewaehlterTermin, setGewaehlterTermin] = useState<any>(null);
  const [luecke, setLuecke] = useState<any>(null);
  const [anfragenOffen, setAnfragenOffen] = useState(false);
  const [gesendet, setGesendet] = useState(false);
  const [autoAn, setAutoAn] = useState(true);

  const gefiltert = lehrerFilter === "Alle Fahrlehrer"
    ? wochenTermine
    : wochenTermine.filter(t => t.lehrer === lehrerFilter);

  const typFarbe = (typ: string, lehrer: string) => {
    if (typ === "Pause") return { bg: "#F5F5F4", border: "#DEDEDC", text: "#8A8A8D" };
    if (typ === "Prüfung") return { bg: "#FEF2F2", border: "#DC2626", text: "#DC2626" };
    if (typ === "Theorie") return { bg: "#EFF6FF", border: "#2563EB", text: "#1E40AF" };
    if (typ === "Lücke") return { bg: "#FDF4E3", border: "#D4AF37", text: "#B8860B" };
    const farbe = lehrerFarben[lehrer] || "#1C1C1E";
    return { bg: "#FAFAF9", border: farbe, text: "#1C1C1E" };
  };

  return (
    <div style={{ padding: "36px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, color: "#1C1C1E" }}>Kalender</h1>
          <p style={{ color: "#8A8A8D", fontSize: 14 }}>
            {ansicht === "woche" ? "19. – 25. Oktober 2026" : "Oktober 2026"}
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ display: "flex", background: "white", border: "1px solid #EDEDEB", borderRadius: 8, padding: 3 }}>
            {(["woche", "monat"] as const).map((a) => (
              <div
                key={a}
                onClick={() => setAnsicht(a)}
                style={{
                  padding: "7px 16px", fontSize: 13.5, fontWeight: 500, cursor: "pointer", borderRadius: 6,
                  background: ansicht === a ? "#1C1C1E" : "transparent",
                  color: ansicht === a ? "white" : "#8A8A8D",
                }}
              >
                {a === "woche" ? "Woche" : "Monat"}
              </div>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <div
              onClick={() => setFilterOffen(!filterOffen)}
              style={{
                display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                background: "white", border: "1px solid #EDEDEB", borderRadius: 8,
                padding: "10px 16px", fontSize: 14, fontWeight: 500, color: "#1C1C1E",
              }}
            >
              {lehrerFilter !== "Alle Fahrlehrer" && (
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: lehrerFarben[lehrerFilter] }} />
              )}
              {lehrerFilter}
              <span style={{ fontSize: 10, opacity: 0.5 }}>{filterOffen ? "▲" : "▼"}</span>
            </div>
            {filterOffen && (
              <div style={{
                position: "absolute", top: "110%", right: 0, background: "white",
                border: "1px solid #EDEDEB", borderRadius: 8, minWidth: 190,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 20, overflow: "hidden"
              }}>
                {fahrlehrerListe.map((l) => (
                  <div
                    key={l}
                    onClick={() => { setLehrerFilter(l); setFilterOffen(false); }}
                    style={{
                      padding: "10px 16px", fontSize: 13.5, cursor: "pointer",
                      background: lehrerFilter === l ? "#FAFAF9" : "white",
                      color: "#1C1C1E", fontWeight: lehrerFilter === l ? 600 : 400,
                      display: "flex", alignItems: "center", gap: 9,
                    }}
                  >
                    {l !== "Alle Fahrlehrer" && (
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: lehrerFarben[l] }} />
                    )}
                    {l}
                  </div>
                ))}
              </div>
            )}
          </div>

          <button style={{
            background: "#1C1C1E", color: "white", border: "none", borderRadius: 8,
            padding: "11px 20px", cursor: "pointer", fontSize: 14, fontWeight: 500
          }}>
            + Termin
          </button>
        </div>
      </div>

      {/* Offene Terminanfragen */}
      <div
        onClick={() => setAnfragenOffen(true)}
        style={{
          background: "white", borderRadius: 10, padding: "14px 20px", marginBottom: 18,
          border: "1px solid #EDEDEB", borderLeft: "3px solid #D4AF37",
          display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"
        }}
      >
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "#B8860B" }}>
            {anfragen.length} offene Terminanfragen von Schülern
          </div>
          <div style={{ fontSize: 12.5, color: "#1C1C1E", marginTop: 2 }}>
            {anfragen.map(a => a.schueler.split(" ")[0]).join(", ")} warten auf Bestätigung
          </div>
        </div>
        <button style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 7, padding: "9px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          Bearbeiten
        </button>
      </div>

      {/* Legende */}
      <div style={{ display: "flex", gap: 20, marginBottom: 18, fontSize: 12, color: "#8A8A8D", alignItems: "center" }}>
        {Object.entries(lehrerFarben).map(([name, farbe]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: farbe }} />
            {name}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginLeft: "auto" }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#D4AF37" }} /> Freie Lücke
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#DC2626" }} /> Prüfung
        </div>
      </div>

      {/* WOCHENANSICHT */}
      {ansicht === "woche" && (
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid #EDEDEB", background: "#FAFAF9" }}>
            <div />
            {wochenTage.map((t) => (
              <div key={t.kurz} style={{ padding: "12px 8px", textAlign: "center", borderLeft: "1px solid #EDEDEB" }}>
                <div style={{ fontSize: 11.5, color: "#8A8A8D", fontWeight: 500 }}>{t.kurz}</div>
                <div className="display" style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1E", marginTop: 2 }}>{t.datum}</div>
              </div>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            {stunden.map((h) => (
              <div key={h} style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", height: 56, borderBottom: "1px solid #F2F2F0" }}>
                <div style={{ fontSize: 11.5, color: "#8A8A8D", padding: "4px 8px", textAlign: "right" }}>{h}:00</div>
                {wochenTage.map((_, tagIdx) => (
                  <div key={tagIdx} style={{ borderLeft: "1px solid #F2F2F0", position: "relative" }} />
                ))}
              </div>
            ))}

            {gefiltert.map((t, i) => {
              const f = typFarbe(t.typ, t.lehrer);
              const topPx = (t.start - 7) * 56;
              const heightPx = t.dauer * 56 - 4;
              const istLuecke = t.typ === "Lücke";
              return (
                <div
                  key={i}
                  onClick={() => istLuecke ? setLuecke(t) : setGewaehlterTermin(t)}
                  style={{
                    position: "absolute",
                    top: topPx + 2,
                    left: `calc(60px + ${t.tag} * ((100% - 60px) / 7) + 3px)`,
                    width: `calc((100% - 60px) / 7 - 6px)`,
                    height: heightPx,
                    background: f.bg,
                    borderLeft: `3px solid ${f.border}`,
                    border: istLuecke ? `1px dashed ${f.border}` : undefined,
                    borderLeftWidth: 3,
                    borderLeftStyle: "solid",
                    borderRadius: 6,
                    padding: "6px 8px",
                    fontSize: 11.5,
                    cursor: "pointer",
                    overflow: "hidden",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ fontWeight: 600, color: f.text, lineHeight: 1.25 }}>
                    {istLuecke ? "Lücke frei" : t.schueler}
                  </div>
                  {t.typ !== "Pause" && (
                    <div style={{ color: "#8A8A8D", fontSize: 10.5, marginTop: 2 }}>
                      {istLuecke ? "neu besetzen" : t.lehrer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MONATSANSICHT */}
      {ansicht === "monat" && (
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", background: "#FAFAF9", borderBottom: "1px solid #EDEDEB" }}>
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
              <div key={d} style={{ padding: "12px 8px", textAlign: "center", fontSize: 12, color: "#8A8A8D", fontWeight: 600, borderLeft: "1px solid #EDEDEB" }}>{d}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}>
            {monatsTage.map((t, i) => (
              <div key={i} style={{
                minHeight: 96, borderLeft: "1px solid #F2F2F0", borderBottom: "1px solid #F2F2F0",
                padding: 10, background: t.nummer ? "white" : "#FCFCFB", cursor: t.nummer ? "pointer" : "default"
              }}>
                {t.nummer && (
                  <>
                    <div className="display" style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", marginBottom: 6 }}>{t.nummer}</div>
                    {t.termine > 0 && (
                      <>
                        <div style={{
                          background: "#FAFAF9", borderLeft: "2px solid #1C1C1E", borderRadius: 4,
                          padding: "3px 6px", fontSize: 10.5, color: "#1C1C1E", marginBottom: 3
                        }}>
                          {t.termine} Termine
                        </div>
                        {t.termine > 5 && (
                          <div style={{
                            background: "#FDF4E3", borderLeft: "2px solid #D4AF37", borderRadius: 4,
                            padding: "3px 6px", fontSize: 10.5, color: "#B8860B"
                          }}>
                            Ausgelastet
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Termin Detail */}
      {gewaehlterTermin && (
        <div
          onClick={() => setGewaehlterTermin(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 12, padding: 28, width: 380, border: "1px solid #EDEDEB" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11.5, color: "#8A8A8D", letterSpacing: 1, fontWeight: 600 }}>
                  {gewaehlterTermin.typ.toUpperCase()}
                </div>
                <h3 className="display" style={{ fontSize: 19, fontWeight: 600, color: "#1C1C1E", marginTop: 4 }}>
                  {gewaehlterTermin.schueler}
                </h3>
              </div>
              <div onClick={() => setGewaehlterTermin(null)} style={{ cursor: "pointer", color: "#8A8A8D", fontSize: 18, lineHeight: 1 }}>×</div>
            </div>

            {[
              { label: "Fahrlehrer", wert: gewaehlterTermin.lehrer },
              { label: "Uhrzeit", wert: `${gewaehlterTermin.start}:00 – ${gewaehlterTermin.start + gewaehlterTermin.dauer}:00` },
              { label: "Dauer", wert: `${gewaehlterTermin.dauer * 45} Minuten` },
            ].map((z) => (
              <div key={z.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F2F2F0" }}>
                <span style={{ fontSize: 13, color: "#8A8A8D" }}>{z.label}</span>
                <span style={{ fontSize: 13, color: "#1C1C1E", fontWeight: 500 }}>{z.wert}</span>
              </div>
            ))}

            {gewaehlterTermin.typ !== "Pause" && (
              <div style={{ background: "#FDF4E3", borderRadius: 8, padding: "12px 14px", marginTop: 16, fontSize: 12.5, color: "#1C1C1E", lineHeight: 1.5 }}>
                Beim Absagen bietet Lenkio die Stunde automatisch passenden Schülern an.
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button style={{ flex: 1, background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "11px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Bearbeiten</button>
              <button
                onClick={() => { setGewaehlterTermin(null); setLuecke({ ...gewaehlterTermin, typ: "Lücke" }); setGesendet(false); }}
                style={{ flex: 1, background: "white", color: "#DC2626", border: "1px solid #EDEDEB", borderRadius: 8, padding: "11px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}
              >Absagen</button>
            </div>
          </div>
        </div>
      )}

      {/* LÜCKENFÜLLER */}
      {luecke && (
        <div onClick={() => setLuecke(null)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 12, width: 540, maxHeight: "88vh", overflow: "auto", border: "1px solid #EDEDEB" }}>

            <div style={{ padding: "24px 28px", borderBottom: "1px solid #EDEDEB", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11.5, color: "#B8860B", letterSpacing: 1, fontWeight: 600 }}>FREIE STUNDE</div>
                <h2 className="display" style={{ fontSize: 19, fontWeight: 600, color: "#1C1C1E", marginTop: 5 }}>
                  Mi 21.10. · {luecke.start}:00 Uhr
                </h2>
                <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 3 }}>
                  {luecke.lehrer} · 45 Minuten
                </div>
              </div>
              <div onClick={() => setLuecke(null)} style={{ cursor: "pointer", fontSize: 20, color: "#8A8A8D" }}>×</div>
            </div>

            <div style={{ padding: "22px 28px" }}>

              {!gesendet ? (
                <>
                  <div style={{ background: "#FAFAF9", borderRadius: 10, padding: "15px 18px", marginBottom: 20 }}>
                    <div style={{ fontSize: 12.5, color: "#1C1C1E", lineHeight: 1.6 }}>
                      Lenkio hat passende Schüler gefunden. Wer zuerst zusagt, bekommt die Stunde – alle anderen werden automatisch informiert.
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <h3 className="display" style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1E" }}>Passende Schüler</h3>
                    <span style={{ fontSize: 12, color: "#8A8A8D" }}>
                      {kandidaten.filter(k => k.passt).length} von {kandidaten.length} werden angefragt
                    </span>
                  </div>

                  {kandidaten.map((k) => (
                    <div key={k.kundennr} style={{
                      background: k.passt ? "white" : "#FCFAFA",
                      border: "1px solid #EDEDEB", borderRadius: 9, padding: "13px 16px", marginBottom: 9,
                      display: "flex", alignItems: "center", gap: 14,
                      opacity: k.passt ? 1 : 0.6,
                    }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                        background: k.passt ? "#1C1C1E" : "#F2F2F0",
                        color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700,
                      }}>{k.passt ? "✓" : ""}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1C1C1E" }}>{k.name}</div>
                        <div style={{ fontSize: 11.5, color: k.passt ? "#8A8A8D" : "#DC2626", marginTop: 2 }}>{k.grund}</div>
                      </div>
                      <span style={{ display: "inline-flex", gap: 2 }}>
                        {[1,2,3,4,5].map(i => (
                          <span key={i} style={{
                            fontSize: 10,
                            color: i <= k.score ? (k.score >= 4 ? "#16A34A" : "#DC2626") : "#E0E0DE",
                          }}>●</span>
                        ))}
                      </span>
                    </div>
                  ))}

                  <div style={{ background: "white", border: "1px solid #EDEDEB", borderRadius: 9, padding: "14px 16px", marginTop: 16, marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E" }}>Automatisch anbieten</div>
                        <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>
                          Ohne Rückfrage versenden, wenn mehr als 3 Stunden Vorlauf
                        </div>
                      </div>
                      <div
                        onClick={() => setAutoAn(!autoAn)}
                        style={{
                          width: 42, height: 24, borderRadius: 999, cursor: "pointer", flexShrink: 0,
                          background: autoAn ? "#16A34A" : "#E0E0DE", position: "relative", transition: "background 0.15s"
                        }}
                      >
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%", background: "white",
                          position: "absolute", top: 3, left: autoAn ? 21 : 3, transition: "left 0.15s"
                        }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      onClick={() => setGesendet(true)}
                      style={{ flex: 1, background: "#D4AF37", color: "#1C1C1E", border: "none", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}
                    >
                      An {kandidaten.filter(k => k.passt).length} Schüler senden
                    </button>
                    <button onClick={() => setLuecke(null)} style={{ flex: 1, background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>
                      Lücke lassen
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ background: "#EAF7EE", borderRadius: 10, padding: "18px 20px", marginBottom: 20, borderLeft: "3px solid #16A34A" }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#16A34A", marginBottom: 4 }}>
                      Angebot an 3 Schüler versendet
                    </div>
                    <div style={{ fontSize: 12.5, color: "#1C1C1E" }}>
                      Benachrichtigung per App und E-Mail · Wer zuerst zusagt, bekommt die Stunde
                    </div>
                  </div>

                  <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#1C1C1E" }}>Status</h3>
                  {kandidaten.filter(k => k.passt).map((k) => (
                    <div key={k.kundennr} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F2F2F0", gap: 14 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#F5F5F4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#1C1C1E" }}>
                        {k.name.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1C1C1E" }}>{k.name}</div>
                        <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>benachrichtigt · gerade eben</div>
                      </div>
                      <span style={{ background: "#F5F5F4", color: "#8A8A8D", borderRadius: 6, padding: "4px 11px", fontSize: 11.5, fontWeight: 500 }}>
                        Wartet
                      </span>
                    </div>
                  ))}

                  <button
                    onClick={() => { setLuecke(null); setGesendet(false); }}
                    style={{ width: "100%", background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer", marginTop: 20 }}
                  >
                    Schließen
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TERMINANFRAGEN */}
      {anfragenOffen && (
        <div onClick={() => setAnfragenOffen(false)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.35)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#FAFAF9", width: 520, height: "100%", overflow: "auto", borderLeft: "1px solid #EDEDEB" }}>

            <div style={{ background: "#1C1C1E", padding: "28px 30px", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h2 className="display" style={{ fontSize: 20, fontWeight: 600 }}>Terminanfragen</h2>
                  <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 4 }}>
                    Schüler haben freie Slots angefragt – Bestätigung nötig
                  </div>
                </div>
                <div onClick={() => setAnfragenOffen(false)} style={{ cursor: "pointer", fontSize: 20, color: "#8A8A8D" }}>×</div>
              </div>
            </div>

            <div style={{ padding: "24px 30px" }}>
              {anfragen.map((a) => (
                <div key={a.kundennr} style={{ background: "white", borderRadius: 10, padding: 20, border: "1px solid #EDEDEB", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#F5F5F4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>
                      {a.schueler.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>{a.schueler}</div>
                      <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>{a.kundennr} · {a.gesendet}</div>
                    </div>
                    <span style={{ display: "inline-flex", gap: 2 }}>
                      {[1,2,3,4,5].map(i => (
                        <span key={i} style={{
                          fontSize: 10,
                          color: i <= a.score ? (a.score >= 4 ? "#16A34A" : "#B8860B") : "#E0E0DE",
                        }}>●</span>
                      ))}
                    </span>
                  </div>

                  <div style={{ background: "#FAFAF9", borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: "#8A8A8D" }}>Wunschtermin</span>
                      <span className="display" style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>{a.wunsch}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 12, color: "#8A8A8D" }}>Fahrlehrer</span>
                      <span style={{ fontSize: 13, color: "#1C1C1E" }}>{a.lehrer}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 9 }}>
                    <button style={{ flex: 1, background: "#1C1C1E", color: "white", border: "none", borderRadius: 7, padding: "10px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Bestätigen</button>
                    <button style={{ flex: 1, background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 7, padding: "10px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Anderen Termin</button>
                    <button style={{ background: "white", color: "#DC2626", border: "1px solid #EDEDEB", borderRadius: 7, padding: "10px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Ablehnen</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}