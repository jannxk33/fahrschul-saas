"use client";
import { useState } from "react";

type Fahrzeug = {
  id: number; name: string; kennzeichen: string; klasse: string;
  fahrlehrer: string; km: number; baujahr: number;
  tuev: string; tuevTage: number;
  inspektion: string; inspektionTage: number;
  versicherung: string; versicherungTage: number;
  status: string;
};

const fahrzeuge: Fahrzeug[] = [
  {
    id: 1, name: "VW Golf VIII", kennzeichen: "NB-FS 101", klasse: "B",
    fahrlehrer: "Herr Koch", km: 84200, baujahr: 2022,
    tuev: "03.2027", tuevTage: 148,
    inspektion: "11.2026", inspektionTage: 24,
    versicherung: "01.2027", versicherungTage: 89,
    status: "Im Einsatz",
  },
  {
    id: 2, name: "Skoda Fabia", kennzeichen: "NB-FS 102", klasse: "B",
    fahrlehrer: "Frau Bauer", km: 112800, baujahr: 2021,
    tuev: "11.2026", tuevTage: 17,
    inspektion: "02.2027", inspektionTage: 108,
    versicherung: "01.2027", versicherungTage: 89,
    status: "Im Einsatz",
  },
  {
    id: 3, name: "Honda CB500F", kennzeichen: "NB-FS 201", klasse: "A",
    fahrlehrer: "Herr Wendt", km: 23400, baujahr: 2023,
    tuev: "05.2027", tuevTage: 211,
    inspektion: "12.2026", inspektionTage: 52,
    versicherung: "01.2027", versicherungTage: 89,
    status: "Im Einsatz",
  },
  {
    id: 4, name: "VW Crafter", kennzeichen: "NB-FS 301", klasse: "C",
    fahrlehrer: "Nicht zugewiesen", km: 198600, baujahr: 2019,
    tuev: "10.2026", tuevTage: -4,
    inspektion: "01.2027", inspektionTage: 76,
    versicherung: "01.2027", versicherungTage: 89,
    status: "Werkstatt",
  },
];

export default function Fahrzeuge() {
  const [detail, setDetail] = useState<Fahrzeug | null>(null);
  const [neuOffen, setNeuOffen] = useState(false);

  const fristFarbe = (tage: number) => {
    if (tage < 0) return { bg: "#FEF2F2", color: "#DC2626", label: "Abgelaufen" };
    if (tage <= 30) return { bg: "#FDF4E3", color: "#B8860B", label: `in ${tage} Tagen` };
    return { bg: "#EAF7EE", color: "#16A34A", label: `in ${tage} Tagen` };
  };

  const kritisch = fahrzeuge.filter(f => f.tuevTage < 0 || f.tuevTage <= 30 || f.inspektionTage <= 30);

  return (
    <div style={{ padding: "36px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, color: "#1C1C1E" }}>Fahrzeuge</h1>
          <p style={{ color: "#8A8A8D", fontSize: 14 }}>
            {fahrzeuge.length} Fahrzeuge · {fahrzeuge.filter(f => f.status === "Im Einsatz").length} im Einsatz
          </p>
        </div>
        <button
          onClick={() => setNeuOffen(true)}
          style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "11px 20px", cursor: "pointer", fontSize: 14, fontWeight: 500 }}
        >
          + Fahrzeug anlegen
        </button>
      </div>

      {/* Fristwarnung */}
      {kritisch.length > 0 && (
        <div style={{ background: "#FEF2F2", borderRadius: 10, padding: "14px 20px", marginBottom: 22, borderLeft: "3px solid #DC2626" }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "#DC2626", marginBottom: 6 }}>
            {kritisch.length} Fahrzeuge mit anstehenden oder abgelaufenen Fristen
          </div>
          {kritisch.map((f) => (
            <div key={f.id} style={{ fontSize: 12.5, color: "#1C1C1E", marginTop: 3 }}>
              <strong>{f.kennzeichen}</strong>
              {f.tuevTage < 0 && " · HU abgelaufen seit " + Math.abs(f.tuevTage) + " Tagen"}
              {f.tuevTage >= 0 && f.tuevTage <= 30 && " · HU fällig in " + f.tuevTage + " Tagen"}
              {f.inspektionTage <= 30 && f.inspektionTage >= 0 && " · Inspektion in " + f.inspektionTage + " Tagen"}
            </div>
          ))}
        </div>
      )}

      {/* Kennzahlen */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Fahrzeuge gesamt", wert: String(fahrzeuge.length) },
          { label: "Im Einsatz", wert: String(fahrzeuge.filter(f => f.status === "Im Einsatz").length) },
          { label: "In der Werkstatt", wert: String(fahrzeuge.filter(f => f.status === "Werkstatt").length), warn: true },
          { label: "Fristen kritisch", wert: String(kritisch.length), warn: kritisch.length > 0 },
        ].map((k) => (
          <div key={k.label} style={{
            background: "white", borderRadius: 10, padding: "20px 22px", border: "1px solid #EDEDEB",
            borderLeft: k.warn ? "3px solid #DC2626" : "3px solid #1C1C1E"
          }}>
            <div className="display" style={{ fontSize: 26, fontWeight: 700, color: k.warn ? "#DC2626" : "#1C1C1E" }}>{k.wert}</div>
            <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 4 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Fahrzeugkarten */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }}>
        {fahrzeuge.map((f) => {
          const tuev = fristFarbe(f.tuevTage);
          const insp = fristFarbe(f.inspektionTage);
          return (
            <div
              key={f.id}
              onClick={() => setDetail(f)}
              style={{
                background: "white", borderRadius: 10, border: "1px solid #EDEDEB",
                borderLeft: f.tuevTage < 0 ? "3px solid #DC2626" : "3px solid #1C1C1E",
                padding: 22, cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <div className="display" style={{ fontSize: 16, fontWeight: 600, color: "#1C1C1E" }}>{f.name}</div>
                  <div className="display" style={{ fontSize: 13, color: "#8A8A8D", marginTop: 3, letterSpacing: 0.5 }}>{f.kennzeichen}</div>
                </div>
                <span style={{
                  background: f.status === "Im Einsatz" ? "#EAF7EE" : "#FDF4E3",
                  color: f.status === "Im Einsatz" ? "#16A34A" : "#B8860B",
                  borderRadius: 6, padding: "4px 10px", fontSize: 11.5, fontWeight: 500
                }}>{f.status}</span>
              </div>

              <div style={{ display: "flex", gap: 20, marginBottom: 18, paddingBottom: 16, borderBottom: "1px solid #F2F2F0" }}>
                <div>
                  <div style={{ fontSize: 11, color: "#8A8A8D" }}>Klasse</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1E", marginTop: 2 }}>{f.klasse}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#8A8A8D" }}>Fahrlehrer</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: f.fahrlehrer === "Nicht zugewiesen" ? "#B0B0AE" : "#1C1C1E", marginTop: 2 }}>{f.fahrlehrer}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#8A8A8D" }}>Kilometerstand</div>
                  <div className="display" style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", marginTop: 2 }}>{f.km.toLocaleString("de-DE")} km</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1, background: tuev.bg, borderRadius: 7, padding: "9px 12px" }}>
                  <div style={{ fontSize: 10.5, color: "#8A8A8D" }}>Hauptuntersuchung</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: tuev.color, marginTop: 2 }}>{f.tuev} · {tuev.label}</div>
                </div>
                <div style={{ flex: 1, background: insp.bg, borderRadius: 7, padding: "9px 12px" }}>
                  <div style={{ fontSize: 10.5, color: "#8A8A8D" }}>Inspektion</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: insp.color, marginTop: 2 }}>{f.inspektion} · {insp.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Panel */}
      {detail && (
        <div onClick={() => setDetail(null)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.35)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#FAFAF9", width: 540, height: "100%", overflow: "auto", borderLeft: "1px solid #EDEDEB" }}>

            <div style={{ background: "#1C1C1E", padding: "28px 30px", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h2 className="display" style={{ fontSize: 21, fontWeight: 600 }}>{detail.name}</h2>
                  <div className="display" style={{ fontSize: 14, color: "#D4AF37", marginTop: 4, letterSpacing: 1 }}>{detail.kennzeichen}</div>
                  <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 6 }}>
                    Baujahr {detail.baujahr} · Klasse {detail.klasse} · {detail.km.toLocaleString("de-DE")} km
                  </div>
                </div>
                <div onClick={() => setDetail(null)} style={{ cursor: "pointer", fontSize: 20, color: "#8A8A8D" }}>×</div>
              </div>
            </div>

            <div style={{ padding: "24px 30px" }}>

              <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", marginBottom: 16 }}>
                <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#1C1C1E" }}>Fristen & Termine</h3>
                {[
                  { label: "Hauptuntersuchung (HU)", datum: detail.tuev, tage: detail.tuevTage },
                  { label: "Inspektion", datum: detail.inspektion, tage: detail.inspektionTage },
                  { label: "Versicherung", datum: detail.versicherung, tage: detail.versicherungTage },
                ].map((f) => {
                  const ff = fristFarbe(f.tage);
                  return (
                    <div key={f.label} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F2F2F0", gap: 14 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1C1C1E" }}>{f.label}</div>
                        <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>Fällig: {f.datum}</div>
                      </div>
                      <span style={{ background: ff.bg, color: ff.color, borderRadius: 6, padding: "4px 11px", fontSize: 12, fontWeight: 500 }}>
                        {ff.label}
                      </span>
                    </div>
                  );
                })}
                <button style={{ width: "100%", background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "11px", fontSize: 13.5, fontWeight: 500, cursor: "pointer", marginTop: 16 }}>
                  Termin eintragen
                </button>
              </div>

              <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", marginBottom: 16 }}>
                <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#1C1C1E" }}>Zuordnung</h3>
                {[
                  { label: "Fahrlehrer", wert: detail.fahrlehrer },
                  { label: "Führerscheinklasse", wert: detail.klasse },
                  { label: "Status", wert: detail.status },
                  { label: "Kilometerstand", wert: `${detail.km.toLocaleString("de-DE")} km` },
                ].map((k) => (
                  <div key={k.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #F2F2F0" }}>
                    <span style={{ fontSize: 13, color: "#8A8A8D" }}>{k.label}</span>
                    <span style={{ fontSize: 13, color: "#1C1C1E", fontWeight: 500 }}>{k.wert}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", marginBottom: 20 }}>
                <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#1C1C1E" }}>Letzte Einträge</h3>
                {[
                  { text: "Reifenwechsel Winterreifen", datum: "12.10.2026" },
                  { text: "Ölwechsel + Filter", datum: "28.08.2026" },
                  { text: "Hauptuntersuchung bestanden", datum: "14.03.2026" },
                ].map((e) => (
                  <div key={e.text} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #F2F2F0" }}>
                    <span style={{ fontSize: 13, color: "#1C1C1E" }}>{e.text}</span>
                    <span style={{ fontSize: 12, color: "#8A8A8D" }}>{e.datum}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ flex: 1, background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Bearbeiten</button>
                <button style={{ flex: 1, background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Wartung eintragen</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Neues Fahrzeug */}
      {neuOffen && (
        <div onClick={() => setNeuOffen(false)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 12, width: 500, maxHeight: "86vh", overflow: "auto", border: "1px solid #EDEDEB" }}>
            <div style={{ padding: "22px 26px", borderBottom: "1px solid #EDEDEB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="display" style={{ fontSize: 18, fontWeight: 600, color: "#1C1C1E" }}>Fahrzeug anlegen</h2>
              <div onClick={() => setNeuOffen(false)} style={{ cursor: "pointer", fontSize: 20, color: "#8A8A8D" }}>×</div>
            </div>
            <div style={{ padding: "22px 26px" }}>
              {[
                { label: "Fahrzeug", ph: "VW Golf VIII" },
                { label: "Kennzeichen", ph: "NB-FS 101" },
                { label: "Baujahr", ph: "2022" },
                { label: "Kilometerstand", ph: "84200" },
              ].map((f) => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                  <input placeholder={f.ph} style={{ width: "100%", padding: "10px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", fontFamily: "inherit", color: "#1C1C1E" }} />
                </div>
              ))}

              <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>Klasse</label>
                  <select style={{ width: "100%", padding: "10px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", fontFamily: "inherit", background: "white", color: "#1C1C1E" }}>
                    <option>B</option><option>A</option><option>BE</option><option>C</option><option>CE</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>Fahrlehrer</label>
                  <select style={{ width: "100%", padding: "10px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", fontFamily: "inherit", background: "white", color: "#1C1C1E" }}>
                    <option>Herr Koch</option><option>Frau Bauer</option><option>Herr Wendt</option><option>Nicht zugewiesen</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
                {[
                  { label: "HU fällig", ph: "MM.JJJJ" },
                  { label: "Inspektion fällig", ph: "MM.JJJJ" },
                ].map((f) => (
                  <div key={f.label} style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                    <input placeholder={f.ph} style={{ width: "100%", padding: "10px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", fontFamily: "inherit", color: "#1C1C1E" }} />
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setNeuOffen(false)} style={{ flex: 1, background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Anlegen</button>
                <button onClick={() => setNeuOffen(false)} style={{ flex: 1, background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Abbrechen</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}