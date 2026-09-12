"use client";
import { useState } from "react";

type SchuelerTyp = {
  id: number; name: string; klasse: string; lehrer: string;
  stunden: number; sonderfahrten: number; theorie: number;
  status: string; offen: number; bezahlt: number;
  tel: string; email: string; adresse: string; geburt: string;
  kundennr: string; seit: string; theoriePruefung: string; praxisPruefung: string;
};

const schuelerDaten: SchuelerTyp[] = [
  { id: 1, name: "Max Mustermann", klasse: "B", lehrer: "Herr Koch", stunden: 12, sonderfahrten: 1, theorie: 14, status: "Aktiv", offen: 0, bezahlt: 1280, tel: "0170 1234567", email: "max.m@email.de", adresse: "Hauptstr. 12, 17033 Neubrandenburg", geburt: "14.03.2008", kundennr: "FS-2026-0142", seit: "15.03.2026", theoriePruefung: "Bestanden", praxisPruefung: "Ausstehend" },
  { id: 2, name: "Lisa Schmidt", klasse: "B", lehrer: "Frau Bauer", stunden: 8, sonderfahrten: 0, theorie: 14, status: "Aktiv", offen: 160, bezahlt: 840, tel: "0171 2345678", email: "lisa.s@email.de", adresse: "Ringstr. 4, 17033 Neubrandenburg", geburt: "22.07.2008", kundennr: "FS-2026-0138", seit: "02.03.2026", theoriePruefung: "Bestanden", praxisPruefung: "Ausstehend" },
  { id: 3, name: "Tom Braun", klasse: "A", lehrer: "Herr Wendt", stunden: 20, sonderfahrten: 3, theorie: 16, status: "Prüfung bald", offen: 0, bezahlt: 2100, tel: "0172 3456789", email: "tom.b@email.de", adresse: "Am Markt 8, 17034 Neubrandenburg", geburt: "05.11.2007", kundennr: "FS-2026-0121", seit: "10.01.2026", theoriePruefung: "Bestanden", praxisPruefung: "Termin 18.06." },
  { id: 4, name: "Anna Müller", klasse: "B", lehrer: "Herr Koch", stunden: 5, sonderfahrten: 0, theorie: 6, status: "Neu", offen: 340, bezahlt: 150, tel: "0173 4567890", email: "anna.m@email.de", adresse: "Lindenweg 22, 17033 Neubrandenburg", geburt: "30.01.2009", kundennr: "FS-2026-0156", seit: "20.05.2026", theoriePruefung: "Offen", praxisPruefung: "Offen" },
  { id: 5, name: "Paul Krause", klasse: "B", lehrer: "Frau Bauer", stunden: 16, sonderfahrten: 2, theorie: 14, status: "Aktiv", offen: 0, bezahlt: 1720, tel: "0174 5678901", email: "paul.k@email.de", adresse: "Bergstr. 3, 17034 Neubrandenburg", geburt: "18.09.2007", kundennr: "FS-2026-0129", seit: "05.02.2026", theoriePruefung: "Bestanden", praxisPruefung: "Ausstehend" },
];

export default function Schueler() {
  const [suche, setSuche] = useState("");
  const [statusFilter, setStatusFilter] = useState("Alle");
  const [detail, setDetail] = useState<SchuelerTyp | null>(null);
  const [neuOffen, setNeuOffen] = useState(false);
  const [neuSchritt, setNeuSchritt] = useState(1);

  const gefiltert = schuelerDaten.filter(s => {
    const suchTreffer = s.name.toLowerCase().includes(suche.toLowerCase()) || s.kundennr.toLowerCase().includes(suche.toLowerCase());
    const statusTreffer = statusFilter === "Alle" || s.status === statusFilter;
    return suchTreffer && statusTreffer;
  });

  const statusStyle = (status: string) => {
    if (status === "Aktiv") return { bg: "#EAF7EE", color: "#16A34A" };
    if (status === "Neu") return { bg: "#F5F5F4", color: "#1C1C1E" };
    if (status === "Prüfung bald") return { bg: "#FDF4E3", color: "#B8860B" };
    return { bg: "#F5F5F4", color: "#8A8A8D" };
  };

  const initialen = (name: string) => name.split(" ").map(w => w[0]).join("");

  return (
    <div style={{ padding: "36px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, color: "#1C1C1E" }}>Schüler</h1>
          <p style={{ color: "#8A8A8D", fontSize: 14 }}>{schuelerDaten.length} Fahrschüler · {schuelerDaten.filter(s => s.offen > 0).length} mit offenen Beträgen</p>
        </div>
        <button
          onClick={() => { setNeuOffen(true); setNeuSchritt(1); }}
          style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "11px 20px", cursor: "pointer", fontSize: 14, fontWeight: 500 }}
        >
          + Neuer Schüler
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <input
          value={suche}
          onChange={(e) => setSuche(e.target.value)}
          placeholder="Suche nach Name oder Kundennummer..."
          style={{
            flex: 1, padding: "11px 16px", background: "white", border: "1px solid #EDEDEB",
            borderRadius: 8, fontSize: 14, outline: "none", color: "#1C1C1E", fontFamily: "inherit"
          }}
        />
        <div style={{ display: "flex", background: "white", border: "1px solid #EDEDEB", borderRadius: 8, padding: 3 }}>
          {["Alle", "Aktiv", "Neu", "Prüfung bald"].map((f) => (
            <div
              key={f}
              onClick={() => setStatusFilter(f)}
              style={{
                padding: "7px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer", borderRadius: 6,
                background: statusFilter === f ? "#1C1C1E" : "transparent",
                color: statusFilter === f ? "white" : "#8A8A8D",
              }}
            >{f}</div>
          ))}
        </div>
      </div>

      <div style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#FAFAF9", borderBottom: "1px solid #EDEDEB" }}>
              {["Schüler", "Klasse", "Fahrlehrer", "Fortschritt", "Offen", "Status"].map((h) => (
                <th key={h} style={{ padding: "13px 20px", textAlign: "left", fontSize: 11.5, color: "#8A8A8D", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gefiltert.map((s) => {
              const st = statusStyle(s.status);
              const prozent = Math.round((s.stunden / 25) * 100);
              return (
                <tr key={s.id} onClick={() => setDetail(s)} style={{ borderTop: "1px solid #F2F2F0", cursor: "pointer" }}>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#F5F5F4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>
                        {initialen(s.name)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 14, color: "#1C1C1E" }}>{s.name}</div>
                        <div style={{ fontSize: 11.5, color: "#8A8A8D" }}>{s.kundennr}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px", color: "#8A8A8D", fontSize: 14 }}>{s.klasse}</td>
                  <td style={{ padding: "14px 20px", color: "#8A8A8D", fontSize: 13.5 }}>{s.lehrer}</td>
                  <td style={{ padding: "14px 20px", width: 160 }}>
                    <div style={{ fontSize: 12, color: "#1C1C1E", marginBottom: 5 }}>{s.stunden} Std. · {prozent}%</div>
                    <div style={{ background: "#F2F2F0", borderRadius: 999, height: 5, overflow: "hidden" }}>
                      <div style={{ width: `${Math.min(prozent, 100)}%`, background: "#1C1C1E", height: "100%" }} />
                    </div>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    {s.offen > 0 ? (
                      <span className="display" style={{ color: "#DC2626", fontWeight: 700, fontSize: 14 }}>{s.offen} €</span>
                    ) : (
                      <span style={{ color: "#B0B0AE", fontSize: 13 }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ background: st.bg, color: st.color, borderRadius: 6, padding: "4px 11px", fontSize: 12, fontWeight: 500 }}>{s.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {detail && (
        <div onClick={() => setDetail(null)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.35)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#FAFAF9", width: 560, height: "100%", overflow: "auto", borderLeft: "1px solid #EDEDEB" }}>

            <div style={{ background: "#1C1C1E", padding: "28px 30px", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#D4AF37", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 600, color: "#1C1C1E" }}>
                    {initialen(detail.name)}
                  </div>
                  <div>
                    <h2 className="display" style={{ fontSize: 21, fontWeight: 600 }}>{detail.name}</h2>
                    <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 3 }}>{detail.kundennr} · Klasse {detail.klasse} · seit {detail.seit}</div>
                  </div>
                </div>
                <div onClick={() => setDetail(null)} style={{ cursor: "pointer", fontSize: 20, color: "#8A8A8D" }}>×</div>
              </div>
            </div>

            <div style={{ padding: "24px 30px" }}>
              <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", marginBottom: 16 }}>
                <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#1C1C1E" }}>Ausbildungsfortschritt</h3>
                {[
                  { label: "Fahrstunden", ist: detail.stunden, soll: 25 },
                  { label: "Sonderfahrten", ist: detail.sonderfahrten, soll: 3 },
                  { label: "Theoriestunden", ist: detail.theorie, soll: 14 },
                ].map((f) => (
                  <div key={f.label} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#1C1C1E" }}>{f.label}</span>
                      <span className="display" style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>{f.ist} / {f.soll}</span>
                    </div>
                    <div style={{ background: "#F2F2F0", borderRadius: 999, height: 6, overflow: "hidden" }}>
                      <div style={{ width: `${Math.min((f.ist / f.soll) * 100, 100)}%`, background: f.ist >= f.soll ? "#16A34A" : "#1C1C1E", height: "100%" }} />
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                  {[
                    { label: "Theorieprüfung", wert: detail.theoriePruefung },
                    { label: "Praktische Prüfung", wert: detail.praxisPruefung },
                  ].map((p) => (
                    <div key={p.label} style={{ flex: 1, background: p.wert === "Bestanden" ? "#EAF7EE" : "#FAFAF9", borderRadius: 8, padding: "10px 12px", border: "1px solid #EDEDEB" }}>
                      <div style={{ fontSize: 11, color: "#8A8A8D" }}>{p.label}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: p.wert === "Bestanden" ? "#16A34A" : "#1C1C1E", marginTop: 3 }}>{p.wert}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", marginBottom: 16 }}>
                <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#1C1C1E" }}>Kontaktdaten</h3>
                {[
                  { label: "Telefon", wert: detail.tel },
                  { label: "E-Mail", wert: detail.email },
                  { label: "Adresse", wert: detail.adresse },
                  { label: "Geburtsdatum", wert: detail.geburt },
                  { label: "Fahrlehrer", wert: detail.lehrer },
                ].map((k) => (
                  <div key={k.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #F2F2F0" }}>
                    <span style={{ fontSize: 13, color: "#8A8A8D" }}>{k.label}</span>
                    <span style={{ fontSize: 13, color: "#1C1C1E", fontWeight: 500, textAlign: "right", maxWidth: 260 }}>{k.wert}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", marginBottom: 16 }}>
                <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#1C1C1E" }}>Zahlungen</h3>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ flex: 1, background: "#FAFAF9", borderRadius: 8, padding: "14px 16px", borderLeft: "3px solid #16A34A" }}>
                    <div className="display" style={{ fontSize: 20, fontWeight: 700, color: "#16A34A" }}>{detail.bezahlt} €</div>
                    <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>Bereits bezahlt</div>
                  </div>
                  <div style={{ flex: 1, background: "#FAFAF9", borderRadius: 8, padding: "14px 16px", borderLeft: `3px solid ${detail.offen > 0 ? "#DC2626" : "#EDEDEB"}` }}>
                    <div className="display" style={{ fontSize: 20, fontWeight: 700, color: detail.offen > 0 ? "#DC2626" : "#B0B0AE" }}>{detail.offen} €</div>
                    <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>Offen</div>
                  </div>
                </div>
              </div>

              <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", marginBottom: 20 }}>
                <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#1C1C1E" }}>Dokumente</h3>
                {["Ausbildungsnachweis (aktuell)", "Anmeldebestätigung", "Zugangsdaten-Brief", "Rechnung Mai 2026"].map((d) => (
                  <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #F2F2F0" }}>
                    <span style={{ fontSize: 13, color: "#1C1C1E" }}>{d}</span>
                    <span style={{ fontSize: 12, color: "#B8860B", cursor: "pointer", fontWeight: 500 }}>Öffnen</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ flex: 1, background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Bearbeiten</button>
                <button style={{ flex: 1, background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Nachricht</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {neuOffen && (
        <div onClick={() => setNeuOffen(false)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 12, width: 540, maxHeight: "88vh", overflow: "auto", border: "1px solid #EDEDEB" }}>

            <div style={{ padding: "24px 28px", borderBottom: "1px solid #EDEDEB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 className="display" style={{ fontSize: 19, fontWeight: 600, color: "#1C1C1E" }}>Neuer Schüler</h2>
                <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 3 }}>Schritt {neuSchritt} von 2</div>
              </div>
              <div onClick={() => setNeuOffen(false)} style={{ cursor: "pointer", fontSize: 20, color: "#8A8A8D" }}>×</div>
            </div>

            {neuSchritt === 1 && (
              <div style={{ padding: "24px 28px" }}>
                {[
                  { label: "Vorname", ph: "Max" },
                  { label: "Nachname", ph: "Mustermann" },
                  { label: "Geburtsdatum", ph: "TT.MM.JJJJ" },
                  { label: "Telefon", ph: "0170 1234567" },
                  { label: "E-Mail", ph: "max@email.de" },
                  { label: "Adresse", ph: "Straße, PLZ Ort" },
                  { label: "IBAN", ph: "DE00 0000 0000 0000 0000 00" },
                ].map((f) => (
                  <div key={f.label} style={{ marginBottom: 14 }}>
                    <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                    <input placeholder={f.ph} style={{ width: "100%", padding: "10px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", fontFamily: "inherit", color: "#1C1C1E" }} />
                  </div>
                ))}

                <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>Führerscheinklasse</label>
                    <select style={{ width: "100%", padding: "10px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", fontFamily: "inherit", background: "white", color: "#1C1C1E" }}>
                      <option>Klasse B</option><option>Klasse A</option><option>Klasse BE</option><option>Klasse C</option>
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>Fahrlehrer</label>
                    <select style={{ width: "100%", padding: "10px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", fontFamily: "inherit", background: "white", color: "#1C1C1E" }}>
                      <option>Herr Koch</option><option>Frau Bauer</option><option>Herr Wendt</option>
                    </select>
                  </div>
                </div>

                <button onClick={() => setNeuSchritt(2)} style={{ width: "100%", background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 500, cursor: "pointer", marginTop: 8 }}>
                  Weiter
                </button>
              </div>
            )}

            {neuSchritt === 2 && (
              <div style={{ padding: "24px 28px" }}>
                <div style={{ background: "#EAF7EE", borderRadius: 10, padding: "18px 20px", marginBottom: 20, borderLeft: "3px solid #16A34A" }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#16A34A", marginBottom: 4 }}>Schüler wurde angelegt</div>
                  <div style={{ fontSize: 12.5, color: "#1C1C1E" }}>Kundennummer: <strong>FS-2026-0157</strong></div>
                </div>

                <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#1C1C1E" }}>Automatisch erzeugte Dokumente</h3>

                {[
                  { name: "Zugangsdaten-Brief", info: "Login, Kundennummer & Passwort für den Schüler", gold: true },
                  { name: "Schülerübersicht", info: "Interne Stammdatenübersicht zur Ablage", gold: false },
                  { name: "Anmeldebestätigung", info: "Bestätigung für den Schüler und die Akte", gold: false },
                ].map((d) => (
                  <div key={d.name} style={{ background: "#FAFAF9", borderRadius: 8, padding: "14px 16px", marginBottom: 10, border: "1px solid #EDEDEB", borderLeft: `3px solid ${d.gold ? "#D4AF37" : "#1C1C1E"}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1C1C1E" }}>{d.name}</div>
                      <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>{d.info}</div>
                    </div>
                    <span style={{ fontSize: 12, color: "#B8860B", cursor: "pointer", fontWeight: 500 }}>Drucken</span>
                  </div>
                ))}

                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button onClick={() => setNeuOffen(false)} style={{ flex: 1, background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Fertig</button>
                  <button style={{ flex: 1, background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Alle drucken</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
