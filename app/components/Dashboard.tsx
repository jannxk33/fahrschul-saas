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

const wochenVorschau = [
  { tag: "Mo", datum: "08", stunden: 6 },
  { tag: "Di", datum: "09", stunden: 8 },
  { tag: "Mi", datum: "10", stunden: 5 },
  { tag: "Do", datum: "11", stunden: 7 },
  { tag: "Fr", datum: "12", stunden: 4 },
  { tag: "Sa", datum: "13", stunden: 3 },
  { tag: "So", datum: "14", stunden: 0 },
];

const aktivitaetIcon: Record<string, string> = { zahlung: "€", anmeldung: "＋", nachricht: "◇", termin: "▤" };

export default function Dashboard({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [lehrerFilter, setLehrerFilter] = useState("Alle Fahrlehrer");
  const [filterOffen, setFilterOffen] = useState(false);

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

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 24 }}>
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

      <div style={{ background: "white", borderRadius: 10, padding: 24, border: "1px solid #EDEDEB" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 className="display" style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E" }}>Diese Woche</h2>
          <span
            onClick={() => onNavigate && onNavigate("kalender")}
            style={{ fontSize: 12.5, color: "#B8860B", cursor: "pointer", fontWeight: 500 }}
          >
            Zum Kalender →
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
          {wochenVorschau.map((w) => (
            <div key={w.tag} style={{
              background: "#FAFAF9", border: "1px solid #EDEDEB", borderRadius: 8,
              padding: "14px 8px", textAlign: "center", cursor: "pointer"
            }}>
              <div style={{ fontSize: 11, color: "#8A8A8D", fontWeight: 500 }}>{w.tag}</div>
              <div className="display" style={{ fontSize: 16, fontWeight: 700, color: "#1C1C1E", margin: "4px 0" }}>{w.datum}</div>
              <div style={{ fontSize: 10.5, color: w.stunden === 0 ? "#C4C4C2" : "#B8860B", fontWeight: 500 }}>
                {w.stunden === 0 ? "frei" : `${w.stunden} Std.`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
