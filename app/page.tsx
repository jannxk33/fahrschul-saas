"use client";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Kalender from "./components/Kalender";
import Schueler from "./components/Schueler";
import Nachrichten from "./components/Nachrichten";
import Finanzen from "./components/Finanzen";
import Fahrlehrer from "./components/Fahrlehrer";
import Formularcenter from "./components/Formularcenter";

const nav = [
  { id: "dashboard", label: "Dashboard", icon: "▢" },
  { id: "kalender", label: "Kalender", icon: "▤" },
  { id: "schueler", label: "Schüler", icon: "◐" },
  { id: "fahrlehrer", label: "Fahrlehrer", icon: "◉" },
  { id: "nachrichten", label: "Nachrichten", icon: "◇", badge: 3 },
  { id: "formulare", label: "Formularcenter", icon: "▥" },
  {
    id: "finanzen", label: "Finanzen", icon: "◆",
    unterpunkte: [
      { id: "finanzen-zahlungen", label: "Zahlungen" },
      { id: "finanzen-mahnwesen", label: "Mahnwesen" },
    ]
  },
];

export default function Home() {
  const [aktiv, setAktiv] = useState("dashboard");

  const istFinanzen = aktiv.startsWith("finanzen");

  const finanzenTab =
    aktiv === "finanzen-zahlungen" ? "zahlungen" :
    aktiv === "finanzen-mahnwesen" ? "mahnwesen" : "uebersicht";

  return (
    <div style={{ display: "flex", height: "100vh", background: "#FAFAF9", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .display { font-family: 'Space Grotesk', sans-serif; }
        * { box-sizing: border-box; }
      `}</style>

      {/* Sidebar */}
      <div style={{ width: 240, background: "#1C1C1E", color: "#F5F5F4", display: "flex", flexDirection: "column", padding: "28px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 24px 28px", borderBottom: "1px solid #2E2E30" }}>
          <div className="display" style={{ fontSize: 22, fontWeight: 700, color: "#D4AF37", letterSpacing: -0.5 }}>lenkio</div>
          <div style={{ fontSize: 11, color: "#8A8A8D", marginTop: 4, letterSpacing: 1 }}>FAHRSCHUL-SOFTWARE</div>
        </div>

        <nav style={{ marginTop: 20, flex: 1, padding: "0 12px", overflow: "auto" }}>
          {nav.map((item) => {
            const istAktiv = item.unterpunkte ? istFinanzen : aktiv === item.id;
            return (
              <div key={item.id}>
                <div
                  onClick={() => setAktiv(item.id)}
                  style={{
                    padding: "11px 16px", marginBottom: 2, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12,
                    fontSize: 14, fontWeight: 500, borderRadius: 8,
                    background: aktiv === item.id ? "#F5F5F4" : "transparent",
                    color: aktiv === item.id ? "#1C1C1E" : istAktiv ? "#F5F5F4" : "#B8B8BA",
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ fontSize: 13, opacity: 0.8 }}>{item.icon}</span>
                  {item.label}
                  {item.badge && (
                    <span style={{
                      marginLeft: "auto", background: "#D4AF37", color: "#1C1C1E",
                      borderRadius: 999, minWidth: 18, height: 18, fontSize: 10.5, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px"
                    }}>{item.badge}</span>
                  )}
                  {item.unterpunkte && (
                    <span style={{ marginLeft: "auto", fontSize: 9, opacity: 0.5 }}>
                      {istFinanzen ? "▲" : "▼"}
                    </span>
                  )}
                </div>

                {/* Unterpunkte */}
                {item.unterpunkte && istFinanzen && (
                  <div style={{ marginBottom: 6 }}>
                    {item.unterpunkte.map((u) => (
                      <div
                        key={u.id}
                        onClick={() => setAktiv(u.id)}
                        style={{
                          padding: "9px 16px 9px 42px", marginBottom: 2, cursor: "pointer",
                          fontSize: 13, fontWeight: 500, borderRadius: 8,
                          background: aktiv === u.id ? "#F5F5F4" : "transparent",
                          color: aktiv === u.id ? "#1C1C1E" : "#8A8A8D",
                          transition: "all 0.15s",
                          position: "relative",
                        }}
                      >
                        <span style={{
                          position: "absolute", left: 26, top: "50%", transform: "translateY(-50%)",
                          width: 5, height: 5, borderRadius: "50%",
                          background: aktiv === u.id ? "#D4AF37" : "#4A4A4C"
                        }} />
                        {u.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div style={{ padding: "16px 24px", borderTop: "1px solid #2E2E30", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#D4AF37", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>FM</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}>Fahrschule Muster</div>
            <div style={{ fontSize: 11, color: "#8A8A8D" }}>Inhaber</div>
          </div>
        </div>
      </div>

      {/* Inhalt */}
      <div style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
        {aktiv === "dashboard" && <Dashboard onNavigate={setAktiv} />}
        {aktiv === "kalender" && <Kalender />}
        {aktiv === "schueler" && <Schueler />}
        {aktiv === "fahrlehrer" && <Fahrlehrer />}
        {aktiv === "nachrichten" && <Nachrichten />}
        {aktiv === "formulare" && <Formularcenter />}
        {istFinanzen && <Finanzen bereich={finanzenTab} />}
      </div>
    </div>
  );
}
