"use client";
import { useState } from "react";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "schueler", label: "Schüler", icon: "👤" },
  { id: "termine", label: "Termine", icon: "📅" },
  { id: "nachrichten", label: "Nachrichten", icon: "💬" },
  { id: "dokumente", label: "Dokumente", icon: "📄" },
  { id: "finanzen", label: "Finanzen", icon: "💶" },
  { id: "fahrlehrer", label: "Fahrlehrer", icon: "🧑‍🏫" },
];

const schueler = [
  { name: "Max Mustermann", klasse: "B", stunden: 12, status: "Aktiv" },
  { name: "Lisa Schmidt", klasse: "B", stunden: 8, status: "Aktiv" },
  { name: "Tom Braun", klasse: "A", stunden: 20, status: "Prüfung bald" },
  { name: "Anna Müller", klasse: "B", stunden: 5, status: "Neu" },
];

export default function Home() {
  const [aktiv, setAktiv] = useState("dashboard");

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#f4f6fb" }}>
      
      {/* Linke Navigation */}
      <div style={{ width: 220, background: "#1a1a2e", color: "white", display: "flex", flexDirection: "column", padding: "24px 0" }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #2a2a4a" }}>
          <div style={{ fontSize: 22, fontWeight: "bold", color: "#4f8ef7" }}>DriveOS</div>
          <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>Fahrschul-System</div>
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
            </div>
          ))}
        </nav>
        <div style={{ padding: "16px 20px", borderTop: "1px solid #2a2a4a", fontSize: 13, color: "#888" }}>
          👤 Fahrschule Muster
        </div>
      </div>

      {/* Hauptbereich */}
      <div style={{ flex: 1, overflow: "auto", padding: 32 }}>

        {/* Dashboard */}
        {aktiv === "dashboard" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>Dashboard</h1>
            <p style={{ color: "#888", marginBottom: 24 }}>Willkommen zurück – hier ist deine Übersicht.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Aktive Schüler", wert: "24", farbe: "#4f8ef7" },
                { label: "Fahrstunden heute", wert: "8", farbe: "#22c55e" },
                { label: "Offene Zahlungen", wert: "3", farbe: "#f59e0b" },
                { label: "Prüfungen diese Woche", wert: "2", farbe: "#ef4444" },
              ].map((k) => (
                <div key={k.label} style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  <div style={{ fontSize: 32, fontWeight: "bold", color: k.farbe }}>{k.wert}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{k.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <h2 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>Heutige Fahrstunden</h2>
              {[
                { zeit: "09:00", schueler: "Max Mustermann", lehrer: "Herr Koch", klasse: "B" },
                { zeit: "10:00", schueler: "Lisa Schmidt", lehrer: "Frau Bauer", klasse: "B" },
                { zeit: "11:30", schueler: "Tom Braun", lehrer: "Herr Koch", klasse: "A" },
              ].map((t) => (
                <div key={t.zeit} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0", gap: 16 }}>
                  <div style={{ width: 60, fontWeight: "bold", color: "#4f8ef7" }}>{t.zeit}</div>
                  <div style={{ flex: 1 }}>{t.schueler}</div>
                  <div style={{ color: "#888", fontSize: 13 }}>{t.lehrer}</div>
                  <div style={{ background: "#e8f0fe", color: "#4f8ef7", borderRadius: 6, padding: "2px 10px", fontSize: 12 }}>Klasse {t.klasse}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schüler */}
        {aktiv === "schueler" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Schüler</h1>
              <button style={{ background: "#4f8ef7", color: "white", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 14 }}>
                + Neuer Schüler
              </button>
            </div>
            <div style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.07)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f9ff" }}>
                    {["Name", "Klasse", "Stunden", "Status"].map((h) => (
                      <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: 13, color: "#888", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schueler.map((s) => (
                    <tr key={s.name} style={{ borderTop: "1px solid #f0f0f0", cursor: "pointer" }}>
                      <td style={{ padding: "14px 20px", fontWeight: 500 }}>{s.name}</td>
                      <td style={{ padding: "14px 20px", color: "#888" }}>{s.klasse}</td>
                      <td style={{ padding: "14px 20px", color: "#888" }}>{s.stunden}</td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{
                          background: s.status === "Aktiv" ? "#dcfce7" : s.status === "Neu" ? "#e8f0fe" : "#fef9c3",
                          color: s.status === "Aktiv" ? "#16a34a" : s.status === "Neu" ? "#4f8ef7" : "#92400e",
                          borderRadius: 6, padding: "3px 10px", fontSize: 12
                        }}>{s.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Termine */}
        {aktiv === "termine" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>Termine</h1>
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <p style={{ color: "#888", marginBottom: 16 }}>Kalenderansicht – diese Woche</p>
              {["Mo 02.06", "Di 03.06", "Mi 04.06", "Do 05.06", "Fr 06.06"].map((tag) => (
                <div key={tag} style={{ display: "flex", gap: 16, marginBottom: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 80, fontWeight: "bold", fontSize: 13, paddingTop: 8, color: "#4f8ef7" }}>{tag}</div>
                  <div style={{ flex: 1 }}>
                    {Math.floor(Math.random() * 3 + 1) > 1 ? (
                      <div style={{ background: "#e8f0fe", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "#1a1a2e" }}>
                        Fahrstunden geplant
                      </div>
                    ) : (
                      <div style={{ color: "#ccc", fontSize: 13, padding: "8px 0" }}>Keine Termine</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nachrichten */}
        {aktiv === "nachrichten" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>Nachrichten</h1>
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              {[
                { von: "Max Mustermann", text: "Kann ich Donnerstag eine Fahrstunde bekommen?", zeit: "Heute 09:14", neu: true },
                { von: "Lisa Schmidt", text: "Ich muss meinen Termin am Freitag verschieben.", zeit: "Gestern 17:32", neu: false },
                { von: "Tom Braun", text: "Wann ist meine Prüfung genau?", zeit: "Gestern 12:00", neu: false },
              ].map((n) => (
                <div key={n.von} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #f0f0f0", alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#e8f0fe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>👤</div>
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
          </div>
        )}

        {/* Finanzen */}
        {aktiv === "finanzen" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 24 }}>Finanzen</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
              {[
                { label: "Einnahmen diesen Monat", wert: "4.820 €", farbe: "#22c55e" },
                { label: "Offene Beträge", wert: "640 €", farbe: "#f59e0b" },
                { label: "Rechnungen erstellt", wert: "18", farbe: "#4f8ef7" },
              ].map((k) => (
                <div key={k.label} style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
                  <div style={{ fontSize: 28, fontWeight: "bold", color: k.farbe }}>{k.wert}</div>
                  <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{k.label}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
              <h2 style={{ fontSize: 16, fontWeight: "bold", marginBottom: 16 }}>Letzte Zahlungen</h2>
              {[
                { name: "Max Mustermann", betrag: "320 €", datum: "03.06.2026", status: "Bezahlt" },
                { name: "Lisa Schmidt", betrag: "160 €", datum: "02.06.2026", status: "Offen" },
                { name: "Tom Braun", betrag: "480 €", datum: "01.06.2026", status: "Bezahlt" },
              ].map((z) => (
                <div key={z.name} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f0f0f0", gap: 16 }}>
                  <div style={{ flex: 1, fontWeight: 500 }}>{z.name}</div>
                  <div style={{ color: "#888", fontSize: 13 }}>{z.datum}</div>
                  <div style={{ fontWeight: "bold" }}>{z.betrag}</div>
                  <span style={{
                    background: z.status === "Bezahlt" ? "#dcfce7" : "#fef9c3",
                    color: z.status === "Bezahlt" ? "#16a34a" : "#92400e",
                    borderRadius: 6, padding: "3px 10px", fontSize: 12
                  }}>{z.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Andere Seiten */}
        {(aktiv === "dokumente" || aktiv === "fahrlehrer") && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>
              {nav.find(n => n.id === aktiv)?.label}
            </h1>
            <div style={{ background: "white", borderRadius: 12, padding: 40, textAlign: "center", color: "#888", boxShadow: "0 1px 4px rgba(0,0,0,0.07)", marginTop: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🚧</div>
              <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Wird bald gebaut</div>
              <div style={{ fontSize: 14 }}>Dieser Bereich kommt im nächsten Schritt.</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
