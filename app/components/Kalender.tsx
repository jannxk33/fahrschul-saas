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
  { tag: 3, start: 9, dauer: 1, schueler: "Anna Müller", lehrer: "Herr Koch", typ: "Fahrstunde" },
  { tag: 3, start: 10, dauer: 1, schueler: "Paul Krause", lehrer: "Herr Koch", typ: "Fahrstunde" },
  { tag: 3, start: 14, dauer: 1, schueler: "Max Mustermann", lehrer: "Frau Bauer", typ: "Fahrstunde" },
  { tag: 3, start: 16, dauer: 1, schueler: "Theorieunterricht", lehrer: "Herr Wendt", typ: "Theorie" },
  { tag: 4, start: 8, dauer: 1, schueler: "Lisa Schmidt", lehrer: "Herr Koch", typ: "Fahrstunde" },
  { tag: 4, start: 11, dauer: 1, schueler: "Prüfung: Tom Braun", lehrer: "Herr Wendt", typ: "Prüfung" },
  { tag: 5, start: 9, dauer: 1, schueler: "Anna Müller", lehrer: "Frau Bauer", typ: "Fahrstunde" },
];

const stunden = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const wochenTage = [
  { kurz: "Mo", datum: "08.06" },
  { kurz: "Di", datum: "09.06" },
  { kurz: "Mi", datum: "10.06" },
  { kurz: "Do", datum: "11.06" },
  { kurz: "Fr", datum: "12.06" },
  { kurz: "Sa", datum: "13.06" },
  { kurz: "So", datum: "14.06" },
];

const monatsTage = Array.from({ length: 35 }, (_, i) => {
  const tag = i - 6;
  return {
    nummer: tag > 0 && tag <= 30 ? tag : null,
    termine: tag > 0 && tag <= 30 ? (tag % 7) + 1 : 0,
  };
});

export default function Kalender() {
  const [ansicht, setAnsicht] = useState<"woche" | "monat">("woche");
  const [lehrerFilter, setLehrerFilter] = useState("Alle Fahrlehrer");
  const [filterOffen, setFilterOffen] = useState(false);
  const [gewaehlterTermin, setGewaehlterTermin] = useState<any>(null);

  const gefiltert = lehrerFilter === "Alle Fahrlehrer"
    ? wochenTermine
    : wochenTermine.filter(t => t.lehrer === lehrerFilter);

  const typFarbe = (typ: string, lehrer: string) => {
    if (typ === "Pause") return { bg: "#F5F5F4", border: "#DEDEDC", text: "#8A8A8D" };
    if (typ === "Prüfung") return { bg: "#FEF2F2", border: "#DC2626", text: "#DC2626" };
    if (typ === "Theorie") return { bg: "#EFF6FF", border: "#2563EB", text: "#1E40AF" };
    const farbe = lehrerFarben[lehrer] || "#1C1C1E";
    return { bg: "#FAFAF9", border: farbe, text: "#1C1C1E" };
  };

  return (
    <div style={{ padding: "36px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, color: "#1C1C1E" }}>Kalender</h1>
          <p style={{ color: "#8A8A8D", fontSize: 14 }}>
            {ansicht === "woche" ? "08. – 14. Juni 2026" : "Juni 2026"}
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

      <div style={{ display: "flex", gap: 20, marginBottom: 18, fontSize: 12, color: "#8A8A8D", alignItems: "center" }}>
        {Object.entries(lehrerFarben).map(([name, farbe]) => (
          <div key={name} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: farbe }} />
            {name}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginLeft: "auto" }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: "#DC2626" }} /> Prüfung
        </div>
      </div>

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
              return (
                <div
                  key={i}
                  onClick={() => setGewaehlterTermin(t)}
                  style={{
                    position: "absolute",
                    top: topPx + 2,
                    left: `calc(60px + ${t.tag} * ((100% - 60px) / 7) + 3px)`,
                    width: `calc((100% - 60px) / 7 - 6px)`,
                    height: heightPx,
                    background: f.bg,
                    borderLeft: `3px solid ${f.border}`,
                    borderRadius: 6,
                    padding: "6px 8px",
                    fontSize: 11.5,
                    cursor: "pointer",
                    overflow: "hidden",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ fontWeight: 600, color: f.text, lineHeight: 1.25 }}>{t.schueler}</div>
                  {t.typ !== "Pause" && (
                    <div style={{ color: "#8A8A8D", fontSize: 10.5, marginTop: 2 }}>{t.lehrer}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

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

      {gewaehlterTermin && (
        <div
          onClick={() => setGewaehlterTermin(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(28,28,30,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "white", borderRadius: 12, padding: 28, width: 380, border: "1px solid #EDEDEB" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11.5, color: "#8A8A8D", letterSpacing: 1, fontWeight: 600 }}>
                  {gewaehlterTermin.typ.toUpperCase()}
                </div>
                <h3 className="display" style={{ fontSize: 19, fontWeight: 600, color: "#1C1C1E", marginTop: 4 }}>
                  {gewaehlterTermin.schueler}
                </h3>
              </div>
              <div
                onClick={() => setGewaehlterTermin(null)}
                style={{ cursor: "pointer", color: "#8A8A8D", fontSize: 18, lineHeight: 1 }}
              >×</div>
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

            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button style={{
                flex: 1, background: "#1C1C1E", color: "white", border: "none",
                borderRadius: 8, padding: "11px", fontSize: 13.5, fontWeight: 500, cursor: "pointer"
              }}>Bearbeiten</button>
              <button style={{
                flex: 1, background: "white", color: "#DC2626", border: "1px solid #EDEDEB",
                borderRadius: 8, padding: "11px", fontSize: 13.5, fontWeight: 500, cursor: "pointer"
              }}>Absagen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
