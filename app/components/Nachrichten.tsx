"use client";
import { useState } from "react";

type Msg = { von: "schule" | "schueler"; text: string; zeit: string };
type Konv = {
  id: number; name: string; kundennr: string; klasse: string;
  letzte: string; zeit: string; ungelesen: number; verlauf: Msg[];
};

const konversationen: Konv[] = [
  {
    id: 1, name: "Max Mustermann", kundennr: "FS-2026-0142", klasse: "B",
    letzte: "Kann ich Donnerstag eine Fahrstunde bekommen?", zeit: "09:14", ungelesen: 2,
    verlauf: [
      { von: "schueler", text: "Guten Morgen! Ich wollte fragen ob nächste Woche noch Termine frei sind.", zeit: "Gestern 16:20" },
      { von: "schule", text: "Hallo Max, ja wir haben Dienstag und Donnerstag noch etwas frei.", zeit: "Gestern 17:05" },
      { von: "schueler", text: "Super, danke!", zeit: "09:12" },
      { von: "schueler", text: "Kann ich Donnerstag eine Fahrstunde bekommen?", zeit: "09:14" },
    ],
  },
  {
    id: 2, name: "Lisa Schmidt", kundennr: "FS-2026-0138", klasse: "B",
    letzte: "Ich muss meinen Termin am Freitag verschieben.", zeit: "Gestern", ungelesen: 1,
    verlauf: [
      { von: "schueler", text: "Ich muss meinen Termin am Freitag verschieben. Geht das noch?", zeit: "Gestern 17:32" },
    ],
  },
  {
    id: 3, name: "Tom Braun", kundennr: "FS-2026-0121", klasse: "A",
    letzte: "Alles klar, danke für die Info!", zeit: "Gestern", ungelesen: 0,
    verlauf: [
      { von: "schueler", text: "Wann ist meine Prüfung genau?", zeit: "Gestern 12:00" },
      { von: "schule", text: "Deine praktische Prüfung ist am 18.06. um 09:30 Uhr. Bitte sei 15 Minuten vorher da.", zeit: "Gestern 12:24" },
      { von: "schueler", text: "Alles klar, danke für die Info!", zeit: "Gestern 12:31" },
    ],
  },
  {
    id: 4, name: "Anna Müller", kundennr: "FS-2026-0156", klasse: "B",
    letzte: "Zahlungserinnerung wurde versendet", zeit: "03.06.", ungelesen: 0,
    verlauf: [
      { von: "schule", text: "Hallo Anna, wir möchten dich daran erinnern, dass noch 340 € offen sind. Bitte überweise unter Angabe deiner Kundennummer FS-2026-0156.", zeit: "03.06. 10:15" },
    ],
  },
  {
    id: 5, name: "Paul Krause", kundennr: "FS-2026-0129", klasse: "B",
    letzte: "Perfekt, bis Montag!", zeit: "01.06.", ungelesen: 0,
    verlauf: [
      { von: "schule", text: "Hallo Paul, dein Termin am Montag 10:00 Uhr ist bestätigt.", zeit: "01.06. 14:02" },
      { von: "schueler", text: "Perfekt, bis Montag!", zeit: "01.06. 14:20" },
    ],
  },
];

const alleSchueler = ["Max Mustermann", "Lisa Schmidt", "Tom Braun", "Anna Müller", "Paul Krause"];

export default function Nachrichten() {
  const [aktivId, setAktivId] = useState(1);
  const [suche, setSuche] = useState("");
  const [entwurf, setEntwurf] = useState("");
  const [neuOffen, setNeuOffen] = useState(false);

  const aktiv = konversationen.find(k => k.id === aktivId)!;
  const gefiltert = konversationen.filter(k => k.name.toLowerCase().includes(suche.toLowerCase()));
  const gesamtUngelesen = konversationen.reduce((s, k) => s + k.ungelesen, 0);
  const initialen = (n: string) => n.split(" ").map(w => w[0]).join("");

  return (
    <div style={{ padding: "36px 40px", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, color: "#1C1C1E" }}>Nachrichten</h1>
          <p style={{ color: "#8A8A8D", fontSize: 14 }}>
            {gesamtUngelesen > 0 ? `${gesamtUngelesen} ungelesene Nachrichten` : "Alle Nachrichten gelesen"}
          </p>
        </div>
        <button
          onClick={() => setNeuOffen(true)}
          style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "11px 20px", cursor: "pointer", fontSize: 14, fontWeight: 500 }}
        >
          + Neue Nachricht
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden", minHeight: 0 }}>

        <div style={{ width: 320, borderRight: "1px solid #EDEDEB", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 14, borderBottom: "1px solid #EDEDEB" }}>
            <input
              value={suche}
              onChange={(e) => setSuche(e.target.value)}
              placeholder="Schüler suchen..."
              style={{ width: "100%", padding: "9px 13px", background: "#FAFAF9", border: "1px solid #EDEDEB", borderRadius: 7, fontSize: 13, outline: "none", fontFamily: "inherit", color: "#1C1C1E" }}
            />
          </div>

          <div style={{ flex: 1, overflow: "auto" }}>
            {gefiltert.map((k) => (
              <div
                key={k.id}
                onClick={() => setAktivId(k.id)}
                style={{
                  padding: "14px 16px", cursor: "pointer", borderBottom: "1px solid #F2F2F0",
                  background: aktivId === k.id ? "#FAFAF9" : "white",
                  borderLeft: aktivId === k.id ? "3px solid #1C1C1E" : "3px solid transparent",
                  display: "flex", gap: 12,
                }}
              >
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: k.ungelesen > 0 ? "#1C1C1E" : "#F5F5F4", color: k.ungelesen > 0 ? "white" : "#1C1C1E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                  {initialen(k.name)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13.5, fontWeight: k.ungelesen > 0 ? 600 : 500, color: "#1C1C1E" }}>{k.name}</span>
                    <span style={{ fontSize: 11, color: "#8A8A8D" }}>{k.zeit}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 3, gap: 8 }}>
                    <span style={{ fontSize: 12, color: k.ungelesen > 0 ? "#1C1C1E" : "#8A8A8D", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {k.letzte}
                    </span>
                    {k.ungelesen > 0 && (
                      <span style={{ background: "#D4AF37", color: "#1C1C1E", borderRadius: 999, minWidth: 18, height: 18, fontSize: 10.5, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px", flexShrink: 0 }}>
                        {k.ungelesen}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ padding: "16px 22px", borderBottom: "1px solid #EDEDEB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F5F5F4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#1C1C1E" }}>
                {initialen(aktiv.name)}
              </div>
              <div>
                <div className="display" style={{ fontSize: 15, fontWeight: 600, color: "#1C1C1E" }}>{aktiv.name}</div>
                <div style={{ fontSize: 11.5, color: "#8A8A8D" }}>{aktiv.kundennr} · Klasse {aktiv.klasse}</div>
              </div>
            </div>
            <span style={{ fontSize: 12.5, color: "#B8860B", cursor: "pointer", fontWeight: 500 }}>Profil öffnen →</span>
          </div>

          <div style={{ flex: 1, overflow: "auto", padding: "22px", background: "#FCFCFB" }}>
            {aktiv.verlauf.map((n, i) => (
              <div key={i} style={{ display: "flex", justifyContent: n.von === "schule" ? "flex-end" : "flex-start", marginBottom: 14 }}>
                <div style={{ maxWidth: "68%" }}>
                  <div style={{
                    background: n.von === "schule" ? "#1C1C1E" : "white",
                    color: n.von === "schule" ? "white" : "#1C1C1E",
                    border: n.von === "schule" ? "none" : "1px solid #EDEDEB",
                    borderRadius: n.von === "schule" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                    padding: "11px 15px", fontSize: 13.5, lineHeight: 1.5,
                  }}>
                    {n.text}
                  </div>
                  <div style={{ fontSize: 10.5, color: "#8A8A8D", marginTop: 4, textAlign: n.von === "schule" ? "right" : "left" }}>
                    {n.zeit}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "14px 18px", borderTop: "1px solid #EDEDEB", display: "flex", gap: 10, alignItems: "flex-end" }}>
            <textarea
              value={entwurf}
              onChange={(e) => setEntwurf(e.target.value)}
              placeholder="Nachricht schreiben..."
              style={{ flex: 1, padding: "11px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", resize: "none", minHeight: 42, maxHeight: 100, fontFamily: "inherit", color: "#1C1C1E" }}
            />
            <button
              onClick={() => setEntwurf("")}
              style={{ background: entwurf ? "#1C1C1E" : "#EDEDEB", color: entwurf ? "white" : "#B0B0AE", border: "none", borderRadius: 8, padding: "12px 22px", fontSize: 13.5, fontWeight: 500, cursor: entwurf ? "pointer" : "default", flexShrink: 0 }}
            >
              Senden
            </button>
          </div>
        </div>
      </div>

      {neuOffen && (
        <div onClick={() => setNeuOffen(false)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 12, width: 460, border: "1px solid #EDEDEB" }}>
            <div style={{ padding: "22px 26px", borderBottom: "1px solid #EDEDEB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="display" style={{ fontSize: 18, fontWeight: 600, color: "#1C1C1E" }}>Neue Nachricht</h2>
              <div onClick={() => setNeuOffen(false)} style={{ cursor: "pointer", fontSize: 20, color: "#8A8A8D" }}>×</div>
            </div>
            <div style={{ padding: "22px 26px" }}>
              <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>Empfänger</label>
              <select style={{ width: "100%", padding: "10px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", fontFamily: "inherit", background: "white", marginBottom: 16, color: "#1C1C1E" }}>
                <option>Schüler auswählen...</option>
                {alleSchueler.map(s => <option key={s}>{s}</option>)}
                <option>— Alle Schüler (Rundnachricht) —</option>
              </select>

              <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>Nachricht</label>
              <textarea
                placeholder="Nachricht eingeben..."
                style={{ width: "100%", padding: "11px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", resize: "vertical", minHeight: 110, fontFamily: "inherit", marginBottom: 18, color: "#1C1C1E" }}
              />

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setNeuOffen(false)} style={{ flex: 1, background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Senden</button>
                <button onClick={() => setNeuOffen(false)} style={{ flex: 1, background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Abbrechen</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
