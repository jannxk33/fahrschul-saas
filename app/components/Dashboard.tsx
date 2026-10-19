"use client";
import { useState } from "react";

const fahrlehrerListe = ["Alle Fahrlehrer", "Herr Koch", "Frau Bauer", "Herr Wendt"];

const tagesablauf = [
  { zeit: "09:00", schueler: "Max Mustermann", lehrer: "Herr Koch", klasse: "B", status: "Bestätigt" },
  { zeit: "10:00", schueler: "Lisa Schmidt", lehrer: "Frau Bauer", klasse: "B", status: "Bestätigt" },
  { zeit: "11:30", schueler: "Tom Braun", lehrer: "Herr Koch", klasse: "A", status: "Läuft" },
  { zeit: "14:00", schueler: "Anna Müller", lehrer: "Herr Wendt", klasse: "B", status: "Ausstehend" },
  { zeit: "15:30", schueler: "Paul Krause", lehrer: "Frau Bauer", klasse: "B", status: "Ausstehend" },
];

const aktivitaeten = [
  { typ: "zahlung", text: "Max Mustermann hat 320 € bezahlt", zeit: "vor 12 Min" },
  { typ: "anmeldung", text: "Neuer Schüler: Paul Krause wurde angelegt", zeit: "vor 47 Min" },
  { typ: "nachricht", text: "Lisa Schmidt hat eine Nachricht geschickt", zeit: "vor 1 Std" },
  { typ: "termin", text: "Tom Braun hat Terminanfrage gesendet", zeit: "vor 2 Std" },
  { typ: "zahlung", text: "Anna Müller Zahlung überfällig (7 Tage)", zeit: "vor 3 Std" },
];

const aktivitaetIcon: Record<string, string> = { zahlung: "€", anmeldung: "＋", nachricht: "◇", termin: "▤" };

// Daten je Zeitraum
const diagrammDaten: Record<string, { labels: string[]; stunden: number[]; schueler: number[]; quote: number[] }> = {
  "1": {
    labels: ["KW 19", "KW 20", "KW 21", "KW 22"],
    stunden: [28, 34, 31, 33],
    schueler: [2, 3, 1, 4],
    quote: [72, 78, 75, 81],
  },
  "3": {
    labels: ["Apr", "Mai", "Jun"],
    stunden: [118, 132, 126],
    schueler: [7, 9, 6],
    quote: [74, 79, 81],
  },
  "6": {
    labels: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun"],
    stunden: [96, 104, 121, 118, 132, 126],
    schueler: [5, 6, 8, 7, 9, 6],
    quote: [68, 71, 76, 74, 79, 81],
  },
  "12": {
    labels: ["Jul", "Aug", "Sep", "Okt", "Nov", "Dez", "Jan", "Feb", "Mär", "Apr", "Mai", "Jun"],
    stunden: [88, 92, 108, 114, 98, 82, 96, 104, 121, 118, 132, 126],
    schueler: [4, 5, 7, 8, 6, 3, 5, 6, 8, 7, 9, 6],
    quote: [64, 66, 70, 69, 72, 70, 68, 71, 76, 74, 79, 81],
  },
};

function LinienDiagramm({ titel, labels, werte, farbe, einheit }: {
  titel: string; labels: string[]; werte: number[]; farbe: string; einheit: string;
}) {
  const max = Math.max(...werte);
  const min = Math.min(...werte);
  const spanne = max - min || 1;
  const breite = 100;
  const hoehe = 100;

  const punkte = werte.map((w, i) => {
    const x = (i / (werte.length - 1)) * breite;
    const y = hoehe - ((w - min) / spanne) * 70 - 15;
    return { x, y, wert: w };
  });

  const linie = punkte.map(p => `${p.x},${p.y}`).join(" ");
  const flaeche = `0,${hoehe} ${linie} ${breite},${hoehe}`;
  const letzter = werte[werte.length - 1];
  const vorletzter = werte[werte.length - 2] ?? letzter;
  const trend = letzter - vorletzter;

  return (
    <div style={{ background: "white", borderRadius: 10, padding: 20, border: "1px solid #EDEDEB", borderLeft: `3px solid ${farbe}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 12.5, color: "#8A8A8D", marginBottom: 4 }}>{titel}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="display" style={{ fontSize: 24, fontWeight: 700, color: "#1C1C1E" }}>
              {letzter}{einheit}
            </span>
            <span style={{
              fontSize: 11.5, fontWeight: 600,
              color: trend > 0 ? "#16A34A" : trend < 0 ? "#DC2626" : "#8A8A8D"
            }}>
              {trend > 0 ? "▲" : trend < 0 ? "▼" : "–"} {Math.abs(trend)}{einheit}
            </span>
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${breite} ${hoehe}`} preserveAspectRatio="none" style={{ width: "100%", height: 90, display: "block" }}>
        <defs>
          <linearGradient id={`grad-${titel.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={farbe} stopOpacity="0.18" />
            <stop offset="100%" stopColor={farbe} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={flaeche} fill={`url(#grad-${titel.replace(/\s/g, "")})`} />
        <polyline
          points={linie}
          fill="none"
          stroke={farbe}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {punkte.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={i === punkte.length - 1 ? 3 : 0}
            fill={farbe}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Zeitachse */}
      <div style={{ marginTop: 6 }}>
        <div style={{ height: 1, background: "#EDEDEB", marginBottom: 6 }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {labels.map((l, i) => (
            <span
              key={i}
              style={{
                fontSize: 10,
                color: i === labels.length - 1 ? "#1C1C1E" : "#B0B0AE",
                fontWeight: i === labels.length - 1 ? 600 : 400,
                flex: 1,
                textAlign: i === 0 ? "left" : i === labels.length - 1 ? "right" : "center",
                whiteSpace: "nowrap",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [lehrerFilter, setLehrerFilter] = useState("Alle Fahrlehrer");
  const [filterOffen, setFilterOffen] = useState(false);
  const [zeitraum, setZeitraum] = useState("6");

  const daten = diagrammDaten[zeitraum];

  const gefilteterAblauf = lehrerFilter === "Alle Fahrlehrer"
    ? tagesablauf
    : tagesablauf.filter(t => t.lehrer === lehrerFilter);

  const statusFarbe = (status: string) => {
    if (status === "Bestätigt") return { bg: "#EAF7EE", color: "#16A34A" };
    if (status === "Läuft") return { bg: "#FDF4E3", color: "#B8860B" };
    return { bg: "#F5F5F4", color: "#8A8A8D" };
  };

  return (
    <div style={{ padding: "36px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, color: "#1C1C1E" }}>Dashboard</h1>
          <p style={{ color: "#8A8A8D", fontSize: 14 }}>Willkommen zurück – hier ist deine Übersicht.</p>
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
            <span style={{ opacity: 0.6, fontSize: 12 }}>◉</span>
            {lehrerFilter}
            <span style={{ fontSize: 10, opacity: 0.5 }}>{filterOffen ? "▲" : "▼"}</span>
          </div>
          {filterOffen && (
            <div style={{
              position: "absolute", top: "110%", right: 0, background: "white",
              border: "1px solid #EDEDEB", borderRadius: 8, minWidth: 180,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 10, overflow: "hidden"
            }}>
              {fahrlehrerListe.map((l) => (
                <div
                  key={l}
                  onClick={() => { setLehrerFilter(l); setFilterOffen(false); }}
                  style={{
                    padding: "10px 16px", fontSize: 13.5, cursor: "pointer",
                    background: lehrerFilter === l ? "#FAFAF9" : "white",
                    color: "#1C1C1E", fontWeight: lehrerFilter === l ? 600 : 400,
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Kennzahlen */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Aktive Schüler", wert: "24" },
          { label: "Stunden heute", wert: "8" },
          { label: "Stunden Woche", wert: "33" },
          { label: "Offene Zahlungen", wert: "3", warn: true },
          { label: "Prüfungen bald", wert: "2" },
          { label: "Neue Anfragen", wert: "5", gold: true },
        ].map((k) => (
          <div key={k.label} style={{
            background: "white", borderRadius: 10, padding: "16px", border: "1px solid #EDEDEB",
            borderLeft: k.gold ? "3px solid #D4AF37" : k.warn ? "3px solid #DC2626" : "3px solid #1C1C1E"
          }}>
            <div className="display" style={{ fontSize: 24, fontWeight: 700, color: k.gold ? "#B8860B" : k.warn ? "#DC2626" : "#1C1C1E" }}>{k.wert}</div>
            <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 4, lineHeight: 1.3 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Diagramme mit Zeitraumwahl */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 className="display" style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E" }}>Entwicklung</h2>
          <div style={{ display: "flex", background: "white", border: "1px solid #EDEDEB", borderRadius: 8, padding: 3 }}>
            {[
              { id: "1", label: "1 Monat" },
              { id: "3", label: "3 Monate" },
              { id: "6", label: "6 Monate" },
              { id: "12", label: "12 Monate" },
            ].map((z) => (
              <div
                key={z.id}
                onClick={() => setZeitraum(z.id)}
                style={{
                  padding: "7px 14px", fontSize: 12.5, fontWeight: 500, cursor: "pointer", borderRadius: 6,
                  background: zeitraum === z.id ? "#1C1C1E" : "transparent",
                  color: zeitraum === z.id ? "white" : "#8A8A8D",
                  transition: "all 0.15s",
                }}
              >{z.label}</div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <LinienDiagramm
            titel="Fahrstunden"
            labels={daten.labels}
            werte={daten.stunden}
            farbe="#1C1C1E"
            einheit=""
          />
          <LinienDiagramm
            titel="Neue Schüler"
            labels={daten.labels}
            werte={daten.schueler}
            farbe="#D4AF37"
            einheit=""
          />
          <LinienDiagramm
            titel="Bestehensquote"
            labels={daten.labels}
            werte={daten.quote}
            farbe="#16A34A"
            einheit="%"
          />
        </div>
      </div>

      {/* Tagesablauf + Aktivitäten */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <div style={{ background: "white", borderRadius: 10, padding: 24, border: "1px solid #EDEDEB" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h2 className="display" style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E" }}>Heutiger Ablauf</h2>
            <span style={{ fontSize: 12, color: "#8A8A8D" }}>{gefilteterAblauf.length} Termine</span>
          </div>
          {gefilteterAblauf.map((t) => {
            const sf = statusFarbe(t.status);
            return (
              <div key={t.zeit + t.schueler} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F2F2F0", gap: 16 }}>
                <div className="display" style={{ width: 50, fontWeight: 600, color: "#1C1C1E", fontSize: 13.5 }}>{t.zeit}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, color: "#1C1C1E", fontWeight: 500 }}>{t.schueler}</div>
                  <div style={{ fontSize: 12, color: "#8A8A8D", marginTop: 1 }}>{t.lehrer} · Klasse {t.klasse}</div>
                </div>
                <span style={{ background: sf.bg, color: sf.color, borderRadius: 6, padding: "3px 10px", fontSize: 11.5, fontWeight: 500 }}>{t.status}</span>
              </div>
            );
          })}
        </div>

        <div style={{ background: "white", borderRadius: 10, padding: 24, border: "1px solid #EDEDEB" }}>
          <h2 className="display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 18, color: "#1C1C1E" }}>Letzte Aktivitäten</h2>
          {aktivitaeten.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < aktivitaeten.length - 1 ? "1px solid #F2F2F0" : "none" }}>
              <div style={{
                width: 28, height: 28, borderRadius: 7, background: "#F5F5F4", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#1C1C1E", fontWeight: 600
              }}>{aktivitaetIcon[a.typ]}</div>
              <div>
                <div style={{ fontSize: 12.5, color: "#1C1C1E", lineHeight: 1.4 }}>{a.text}</div>
                <div style={{ fontSize: 11, color: "#8A8A8D", marginTop: 2 }}>{a.zeit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
