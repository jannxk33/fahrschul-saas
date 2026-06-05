"use client";
import { useState } from "react";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "fahrstunden", label: "Fahrstunden", icon: "🚗" },
  { id: "nachrichten", label: "Nachrichten", icon: "💬" },
  { id: "dokumente", label: "Dokumente", icon: "📄" },
  { id: "finanzen", label: "Finanzen", icon: "💶" },
];

const kommendeFahrstunden = [
  { datum: "Mo 09.06.2026", zeit: "09:00", lehrer: "Herr Koch", klasse: "B", typ: "Normal" },
  { datum: "Mi 11.06.2026", zeit: "14:00", lehrer: "Herr Koch", klasse: "B", typ: "Überlandfahrt" },
  { datum: "Fr 13.06.2026", zeit: "10:00", lehrer: "Frau Bauer", klasse: "B", typ: "Normal" },
];

const vergangeneFahrstunden = [
  { datum: "Fr 30.05.2026", zeit: "09:00", lehrer: "Herr Koch", klasse: "B", bewertung: "Gut" },
  { datum: "Mi 28.05.2026", zeit: "14:00", lehrer: "Herr Koch", klasse: "B", bewertung: "Sehr gut" },
  { datum: "Mo 26.05.2026", zeit: "10:00", lehrer: "Frau Bauer", klasse: "B", bewertung: "Befriedigend" },
];

const nachrichten = [
  { von: "Fahrschule DriveOS", text: "Dein Termin am Montag wurde bestätigt.", zeit: "Heute 09:14", neu: true },
  { von: "Herr Koch", text: "Bitte bring deinen Personalausweis zur nächsten Stunde mit.", zeit: "Gestern 14:30", neu: true },
  { von: "Fahrschule DriveOS", text: "Deine Rechnung für Mai ist verfügbar.", zeit: "02.06.2026", neu: false },
];

const dokumente = [
  { name: "Ausbildungsnachweis Mai 2026", typ: "PDF", datum: "01.06.2026" },
  { name: "Rechnung Mai 2026", typ: "PDF", datum: "01.06.2026" },
  { name: "Anmeldebestätigung", typ: "PDF", datum: "15.03.2026" },
  { name: "Datenschutzerklärung", typ: "PDF", datum: "15.03.2026" },
];

const zahlungen = [
  { beschreibung: "Fahrstunden Mai 2026", betrag: "480 €", datum: "01.06.2026", status: "Bezahlt" },
  { beschreibung: "Fahrstunden April 2026", betrag: "320 €", datum: "01.05.2026", status: "Bezahlt" },
  { beschreibung: "Anmeldegebühr", betrag: "150 €", datum: "15.03.2026", status: "Bezahlt" },
  { beschreibung: "Fahrstunden Juni 2026", betrag: "160 €", datum: "01.06.2026", status: "Offen" },
];

export default function SchuelerDashboard() {
  const [aktiv, setAktiv] = useState("dashboard");
  const [nachrichtText, setNachrichtText] = useState("");

  const fortschritt = [
    { label: "Fahrstunden", aktuell: 12, gesamt: 25, farbe: "#4f8ef7" },
    { label: "Theorie", aktuell: 100, gesamt: 100, farbe: "#22c55e" },
    { label: "Sonderfahrten", aktuell: 1, gesamt: 3, farbe: "#f59e0b" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#f4f6fb" }}>

      {/* Navigation links */}
      <div style={{ width: 220, background: "#1a1a2e", color: "white", display: "flex", flexDirection: "column", padding: "24px 0" }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #2a2a4a" }}>
          <div style={{ fontSize: 22, fontWeight: "bold", color: "#4f8ef7" }}>DriveOS</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Mein Bereich</div>
        </div>

        {/* Schüler Info */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #2a2a4a", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#4f8ef7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👤</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Max Mustermann</div>
            <div style={{ fontSize: 11, color: "#888" }}>Klasse B</div>
          </div>
        </div>

        <nav style={{ marginTop: 16, flex: 1 }}>
          {nav.map((item) => (
            <div
              key={item.id}
              onClick={() => setAktiv(item.id)}
              style={{
                padding: "12px 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontSize: 14,
                background: aktiv === item.id ? "#2a2a4a" : "transparent",
                borderLeft: aktiv === item.id ? "3px solid #4f8ef7" : "3px solid transparent",
                color: aktiv === item.id ? "#4f8ef7" : "#ccc",
                transition: "all 0.2s",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
              {item.id === "nachrichten" && (
                <span style={{ marginLeft: "auto", background: "#ef4444", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: "bold" }}>2</span>
              )}
            </div>
          ))}
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid #2a2a4a" }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>Fahrschule</div>
          <div style={{ fontSize: 13, color: "#ccc" }}>DriveOS Muster</div>
        </div>
      </div>

      {/* Hauptbereich */}
      <div style={{ flex: 1, overflow: "auto", padding: 32 }}>

        {/* Dashboard */}
        {aktiv === "dashboard" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 4 }}>Hallo, Max! 👋</h1>
            <p style={{ color: "#888", marginBottom: 28 }}>Hier ist dein aktueller Ausbildungsstand.</p>

            {/* Fortschritt Karten */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
              {fortschritt.map((f) => (
                <div key={f.label} style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 14, color: "#888" }}>{f.label}</span>
                    <span style={{ fontSize: 14, fontWeight: "bold", color: f.farbe }}>{f.aktuell}/{f.gesamt}</span>
                  </div>
                  <div style={{ background: "#f0f0f0", borderRadius: 999, height: 8, overflow: "hidden" }}>
                    <div style={{ width: `${(f.aktuell / f.gesamt) * 100}%`, background: f.farbe, height: "100%", borderRadius: 999, transition: "width 0.5s" }} />
                  </div>
                  <div style={{ fontSize: 12, color: "#aaa", marginTop: 8 }}>{Math.round((f.aktuell / f.gesamt) * 100)}% abgeschlossen</div>
                </div>
              ))}
            </div>

            {/* Nächste Fahrstunde */}
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>Nächste Fahrstunde</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 20, background: "#f0f6ff", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 32 }}>🚗</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Montag, 09.06.2026 um 09:00 Uhr</div>
                  <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>mit Herr Koch · Klasse B · Normale Fahrstunde</div>
                </div>
                <div style={{ background: "#4f8ef7", color: "white", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer" }}>
                  Details
                </div>
              </div>
            </div>

            {/* Prüfungsstatus */}
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <h2 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>Prüfungsstatus</h2>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { label: "Theorieprüfung", status: "Bestanden", farbe: "#22c55e", bg: "#dcfce7" },
                  { label: "Praktische Prüfung", status: "Ausstehend", farbe: "#f59e0b", bg: "#fef9c3" },
                ].map((p) => (
                  <div key={p.label} style={{ flex: 1, background: p.bg, borderRadius: 10, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{p.label}</span>
                    <span style={{ fontSize: 13, color: p.farbe, fontWeight: 600 }}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fahrstunden */}
        {aktiv === "fahrstunden" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>Fahrstunden</h1>

            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20 }}>
              <h2 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>Kommende Fahrstunden</h2>
              {kommendeFahrstunden.map((f) => (
                <div key={f.datum + f.zeit} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🚗</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{f.datum} · {f.zeit} Uhr</div>
                    <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{f.lehrer} · Klasse {f.klasse}</div>
                  </div>
                  <span style={{ background: "#e8f0fe", color: "#4f8ef7", borderRadius: 6, padding: "3px 10px", fontSize: 12 }}>{f.typ}</span>
                </div>
              ))}
            </div>

            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <h2 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>Vergangene Fahrstunden</h2>
              {vergangeneFahrstunden.map((f) => (
                <div key={f.datum + f.zeit} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>✅</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{f.datum} · {f.zeit} Uhr</div>
                    <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{f.lehrer} · Klasse {f.klasse}</div>
                  </div>
                  <span style={{ background: "#dcfce7", color: "#16a34a", borderRadius: 6, padding: "3px 10px", fontSize: 12 }}>{f.bewertung}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nachrichten */}
        {aktiv === "nachrichten" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>Nachrichten</h1>
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginBottom: 20 }}>
              {nachrichten.map((n) => (
                <div key={n.zeit} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid #f0f0f0", alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🏫</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{n.von}</span>
                      <span style={{ fontSize: 12, color: "#888" }}>{n.zeit}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>{n.text}</div>
                  </div>
                  {n.neu && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4f8ef7", marginTop: 6, flexShrink: 0 }} />}
                </div>
              ))}
            </div>

            {/* Nachricht schreiben */}
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <h2 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>Nachricht schreiben</h2>
              <textarea
                value={nachrichtText}
                onChange={(e) => setNachrichtText(e.target.value)}
                placeholder="Schreib eine Nachricht an deine Fahrschule..."
                style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #e0e0e0", fontSize: 14, resize: "vertical", minHeight: 100, boxSizing: "border-box", outline: "none", fontFamily: "sans-serif" }}
              />
              <button
                onClick={() => setNachrichtText("")}
                style={{ marginTop: 12, background: "#4f8ef7", color: "white", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, cursor: "pointer", fontWeight: 600 }}>
                Senden
              </button>
            </div>
          </div>
        )}

        {/* Dokumente */}
        {aktiv === "dokumente" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>Dokumente</h1>
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              {dokumente.map((d) => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📄</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{d.datum}</div>
                  </div>
                  <span style={{ background: "#fee2e2", color: "#ef4444", borderRadius: 6, padding: "3px 10px", fontSize: 12, marginRight: 8 }}>{d.typ}</span>
                  <button style={{ background: "#f4f6fb", border: "1px solid #e0e0e0", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#444" }}>
                    ⬇ Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Finanzen */}
        {aktiv === "finanzen" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>Zahlungen & Rechnungen</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Bereits bezahlt", wert: "950 €", farbe: "#22c55e" },
                { label: "Offen", wert: "160 €", farbe: "#f59e0b" },
              ].map((k) => (
                <div key={k.label} style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  <div style={{ fontSize: 28, fontWeight: "bold", color: k.farbe }}>{k.wert}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{k.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <h2 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>Zahlungshistorie</h2>
              {zahlungen.map((z) => (
                <div key={z.beschreibung} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{z.beschreibung}</div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{z.datum}</div>
                  </div>
                  <div style={{ fontWeight: "bold", fontSize: 15 }}>{z.betrag}</div>
                  <span style={{
                    background: z.status === "Bezahlt" ? "#dcfce7" : "#fef9c3",
                    color: z.status === "Bezahlt" ? "#16a34a" : "#92400e",
                    borderRadius: 6, padding: "3px 10px", fontSize: 12
                  }}>{z.status}</span>
                  <button style={{ background: "#f4f6fb", border: "1px solid #e0e0e0", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", color: "#444" }}>
                    📄 Rechnung
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
