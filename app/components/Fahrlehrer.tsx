"use client";
import { useState } from "react";

type FL = {
  id: number; name: string; rolle: string; farbe: string;
  klassen: string[]; schueler: number; stundenWoche: number; stundenMonat: number;
  auslastung: number; tel: string; email: string; seit: string;
  status: string; urlaubTage: number; urlaubGenommen: number;
  fahrzeug: string; naechsterUrlaub: string;
};

const fahrlehrer: FL[] = [
  { id: 1, name: "Herr Koch", rolle: "Fahrlehrer", farbe: "#1C1C1E", klassen: ["B", "BE"], schueler: 11, stundenWoche: 28, stundenMonat: 112, auslastung: 88, tel: "0170 1112223", email: "koch@fahrschule-muster.de", seit: "01.03.2019", status: "Verfügbar", urlaubTage: 30, urlaubGenommen: 12, fahrzeug: "VW Golf · NB-FS 101", naechsterUrlaub: "20.07. – 03.08.2026" },
  { id: 2, name: "Frau Bauer", rolle: "Fahrlehrerin", farbe: "#B8860B", klassen: ["B"], schueler: 9, stundenWoche: 24, stundenMonat: 96, auslastung: 75, tel: "0171 2223334", email: "bauer@fahrschule-muster.de", seit: "15.08.2021", status: "Verfügbar", urlaubTage: 30, urlaubGenommen: 8, fahrzeug: "Skoda Fabia · NB-FS 102", naechsterUrlaub: "—" },
  { id: 3, name: "Herr Wendt", rolle: "Fahrlehrer", farbe: "#2563EB", klassen: ["A", "A1", "B"], schueler: 6, stundenWoche: 18, stundenMonat: 72, auslastung: 56, tel: "0172 3334445", email: "wendt@fahrschule-muster.de", seit: "01.02.2024", status: "Im Urlaub", urlaubTage: 30, urlaubGenommen: 22, fahrzeug: "Honda CB500 · NB-FS 201", naechsterUrlaub: "Aktuell bis 12.06.2026" },
];

const wochenplan = [
  { tag: "Montag", von: "08:00", bis: "17:00", pause: "12:00 – 13:00" },
  { tag: "Dienstag", von: "08:00", bis: "18:00", pause: "12:30 – 13:30" },
  { tag: "Mittwoch", von: "08:00", bis: "14:00", pause: "—" },
  { tag: "Donnerstag", von: "09:00", bis: "18:00", pause: "12:00 – 13:00" },
  { tag: "Freitag", von: "08:00", bis: "14:00", pause: "—" },
  { tag: "Samstag", von: "—", bis: "—", pause: "—" },
  { tag: "Sonntag", von: "—", bis: "—", pause: "—" },
];

const zugewieseneSchueler = [
  { name: "Max Mustermann", klasse: "B", stunden: 12, status: "Aktiv" },
  { name: "Anna Müller", klasse: "B", stunden: 5, status: "Neu" },
  { name: "Paul Krause", klasse: "B", stunden: 16, status: "Aktiv" },
  { name: "Jonas Weber", klasse: "BE", stunden: 9, status: "Aktiv" },
];

export default function Fahrlehrer() {
  const [detail, setDetail] = useState<FL | null>(null);
  const [detailTab, setDetailTab] = useState<"uebersicht" | "zeiten" | "schueler" | "urlaub">("uebersicht");
  const [neuOffen, setNeuOffen] = useState(false);

  const initialen = (n: string) => n.replace("Herr ", "").replace("Frau ", "").slice(0, 2).toUpperCase();

  return (
    <div style={{ padding: "36px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, color: "#1C1C1E" }}>Fahrlehrer</h1>
          <p style={{ color: "#8A8A8D", fontSize: 14 }}>{fahrlehrer.length} Fahrlehrer · {fahrlehrer.filter(f => f.status === "Verfügbar").length} verfügbar</p>
        </div>
        <button
          onClick={() => setNeuOffen(true)}
          style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "11px 20px", cursor: "pointer", fontSize: 14, fontWeight: 500 }}
        >
          + Fahrlehrer anlegen
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Stunden diese Woche", wert: "70", sub: "über alle Fahrlehrer" },
          { label: "Ø Auslastung", wert: "73%", sub: "Kapazität genutzt", gold: true },
          { label: "Schüler zugewiesen", wert: "26", sub: "Ø 8,7 pro Lehrer" },
          { label: "Urlaubstage offen", wert: "48", sub: "Rest im Jahr" },
        ].map((k) => (
          <div key={k.label} style={{
            background: "white", borderRadius: 10, padding: "20px 22px", border: "1px solid #EDEDEB",
            borderLeft: k.gold ? "3px solid #D4AF37" : "3px solid #1C1C1E"
          }}>
            <div className="display" style={{ fontSize: 26, fontWeight: 700, color: k.gold ? "#B8860B" : "#1C1C1E" }}>{k.wert}</div>
            <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 4 }}>{k.label}</div>
            <div style={{ fontSize: 11.5, color: "#B0B0AE", marginTop: 2 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {fahrlehrer.map((f) => (
          <div
            key={f.id}
            onClick={() => { setDetail(f); setDetailTab("uebersicht"); }}
            style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", borderTop: `3px solid ${f.farbe}`, padding: 22, cursor: "pointer" }}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 18 }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: f.farbe, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600 }}>
                {initialen(f.name)}
              </div>
              <div style={{ flex: 1 }}>
                <div className="display" style={{ fontSize: 16, fontWeight: 600, color: "#1C1C1E" }}>{f.name}</div>
                <div style={{ fontSize: 12, color: "#8A8A8D", marginTop: 2 }}>{f.rolle} · seit {f.seit.slice(-4)}</div>
              </div>
              <span style={{
                background: f.status === "Verfügbar" ? "#EAF7EE" : "#FDF4E3",
                color: f.status === "Verfügbar" ? "#16A34A" : "#B8860B",
                borderRadius: 6, padding: "4px 10px", fontSize: 11.5, fontWeight: 500
              }}>{f.status}</span>
            </div>

            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {f.klassen.map((k) => (
                <span key={k} style={{ background: "#F5F5F4", color: "#1C1C1E", borderRadius: 5, padding: "3px 9px", fontSize: 11.5, fontWeight: 500 }}>
                  Klasse {k}
                </span>
              ))}
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12.5, color: "#8A8A8D" }}>Auslastung</span>
                <span className="display" style={{ fontSize: 12.5, fontWeight: 600, color: f.auslastung > 85 ? "#DC2626" : "#1C1C1E" }}>{f.auslastung}%</span>
              </div>
              <div style={{ background: "#F2F2F0", borderRadius: 999, height: 6, overflow: "hidden" }}>
                <div style={{ width: `${f.auslastung}%`, background: f.auslastung > 85 ? "#DC2626" : f.farbe, height: "100%" }} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid #F2F2F0" }}>
              <div>
                <div className="display" style={{ fontSize: 17, fontWeight: 700, color: "#1C1C1E" }}>{f.schueler}</div>
                <div style={{ fontSize: 11, color: "#8A8A8D" }}>Schüler</div>
              </div>
              <div>
                <div className="display" style={{ fontSize: 17, fontWeight: 700, color: "#1C1C1E" }}>{f.stundenWoche}</div>
                <div style={{ fontSize: 11, color: "#8A8A8D" }}>Std./Woche</div>
              </div>
              <div>
                <div className="display" style={{ fontSize: 17, fontWeight: 700, color: "#1C1C1E" }}>{f.urlaubTage - f.urlaubGenommen}</div>
                <div style={{ fontSize: 11, color: "#8A8A8D" }}>Urlaub übrig</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {detail && (
        <div onClick={() => setDetail(null)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.35)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#FAFAF9", width: 580, height: "100%", overflow: "auto", borderLeft: "1px solid #EDEDEB" }}>

            <div style={{ background: "#1C1C1E", padding: "28px 30px", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: detail.farbe, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 19, fontWeight: 600, color: "white", border: "2px solid rgba(255,255,255,0.15)" }}>
                    {initialen(detail.name)}
                  </div>
                  <div>
                    <h2 className="display" style={{ fontSize: 21, fontWeight: 600 }}>{detail.name}</h2>
                    <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 3 }}>{detail.rolle} · Klassen {detail.klassen.join(", ")} · seit {detail.seit}</div>
                  </div>
                </div>
                <div onClick={() => setDetail(null)} style={{ cursor: "pointer", fontSize: 20, color: "#8A8A8D" }}>×</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 2, padding: "16px 30px 0", background: "white", borderBottom: "1px solid #EDEDEB" }}>
              {([
                { id: "uebersicht", label: "Übersicht" },
                { id: "zeiten", label: "Arbeitszeiten" },
                { id: "schueler", label: "Schüler" },
                { id: "urlaub", label: "Urlaub" },
              ] as const).map((t) => (
                <div
                  key={t.id}
                  onClick={() => setDetailTab(t.id)}
                  style={{
                    padding: "10px 16px", fontSize: 13.5, fontWeight: 500, cursor: "pointer",
                    borderBottom: detailTab === t.id ? "2px solid #1C1C1E" : "2px solid transparent",
                    color: detailTab === t.id ? "#1C1C1E" : "#8A8A8D",
                  }}
                >{t.label}</div>
              ))}
            </div>

            <div style={{ padding: "24px 30px" }}>

              {detailTab === "uebersicht" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
                    {[
                      { label: "Std. Woche", wert: detail.stundenWoche },
                      { label: "Std. Monat", wert: detail.stundenMonat },
                      { label: "Auslastung", wert: `${detail.auslastung}%` },
                    ].map((k) => (
                      <div key={k.label} style={{ background: "white", borderRadius: 9, padding: "16px 18px", border: "1px solid #EDEDEB", borderLeft: `3px solid ${detail.farbe}` }}>
                        <div className="display" style={{ fontSize: 21, fontWeight: 700, color: "#1C1C1E" }}>{k.wert}</div>
                        <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 3 }}>{k.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", marginBottom: 16 }}>
                    <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#1C1C1E" }}>Stammdaten</h3>
                    {[
                      { label: "Telefon", wert: detail.tel },
                      { label: "E-Mail", wert: detail.email },
                      { label: "Beschäftigt seit", wert: detail.seit },
                      { label: "Fahrzeug", wert: detail.fahrzeug },
                      { label: "Führerscheinklassen", wert: detail.klassen.join(", ") },
                      { label: "Status", wert: detail.status },
                    ].map((k) => (
                      <div key={k.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #F2F2F0" }}>
                        <span style={{ fontSize: 13, color: "#8A8A8D" }}>{k.label}</span>
                        <span style={{ fontSize: 13, color: "#1C1C1E", fontWeight: 500, textAlign: "right" }}>{k.wert}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB" }}>
                    <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#1C1C1E" }}>Monatsauswertung</h3>
                    {[
                      { label: "Fahrstunden gehalten", wert: `${detail.stundenMonat} Std.` },
                      { label: "Davon Sonderfahrten", wert: "18 Std." },
                      { label: "Prüfungsbegleitungen", wert: "4" },
                      { label: "Erzielter Umsatz", wert: "3.200 €", gold: true },
                    ].map((k) => (
                      <div key={k.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #F2F2F0" }}>
                        <span style={{ fontSize: 13, color: "#8A8A8D" }}>{k.label}</span>
                        <span className="display" style={{ fontSize: 13.5, color: k.gold ? "#B8860B" : "#1C1C1E", fontWeight: 700 }}>{k.wert}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {detailTab === "zeiten" && (
                <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 className="display" style={{ fontSize: 14, fontWeight: 600, color: "#1C1C1E" }}>Wöchentliche Arbeitszeiten</h3>
                    <span style={{ fontSize: 12.5, color: "#B8860B", cursor: "pointer", fontWeight: 500 }}>Bearbeiten</span>
                  </div>
                  {wochenplan.map((w) => (
                    <div key={w.tag} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F2F2F0", gap: 16 }}>
                      <div style={{ width: 96, fontSize: 13, fontWeight: 500, color: w.von === "—" ? "#B0B0AE" : "#1C1C1E" }}>{w.tag}</div>
                      <div style={{ flex: 1 }}>
                        {w.von === "—" ? (
                          <span style={{ fontSize: 13, color: "#B0B0AE" }}>Frei</span>
                        ) : (
                          <>
                            <span className="display" style={{ fontSize: 13.5, fontWeight: 600, color: "#1C1C1E" }}>{w.von} – {w.bis}</span>
                            {w.pause !== "—" && <span style={{ fontSize: 12, color: "#8A8A8D", marginLeft: 12 }}>Pause {w.pause}</span>}
                          </>
                        )}
                      </div>
                      {w.von !== "—" && (
                        <span style={{ background: "#F5F5F4", color: "#1C1C1E", borderRadius: 5, padding: "3px 9px", fontSize: 11.5, fontWeight: 500 }}>
                          {parseInt(w.bis) - parseInt(w.von)} Std.
                        </span>
                      )}
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, marginTop: 4 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1C1C1E" }}>Wochenarbeitszeit gesamt</span>
                    <span className="display" style={{ fontSize: 15, fontWeight: 700, color: "#1C1C1E" }}>40 Std.</span>
                  </div>
                </div>
              )}

              {detailTab === "schueler" && (
                <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB" }}>
                  <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#1C1C1E" }}>
                    Zugewiesene Schüler ({zugewieseneSchueler.length})
                  </h3>
                  {zugewieseneSchueler.map((s) => (
                    <div key={s.name} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F2F2F0", gap: 14 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#F5F5F4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#1C1C1E" }}>
                        {s.name.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1C1C1E" }}>{s.name}</div>
                        <div style={{ fontSize: 11.5, color: "#8A8A8D" }}>Klasse {s.klasse} · {s.stunden} Fahrstunden</div>
                      </div>
                      <span style={{
                        background: s.status === "Aktiv" ? "#EAF7EE" : "#F5F5F4",
                        color: s.status === "Aktiv" ? "#16A34A" : "#1C1C1E",
                        borderRadius: 6, padding: "4px 10px", fontSize: 11.5, fontWeight: 500
                      }}>{s.status}</span>
                    </div>
                  ))}
                  <button style={{ width: "100%", background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "11px", fontSize: 13.5, fontWeight: 500, cursor: "pointer", marginTop: 16 }}>
                    Schüler zuweisen
                  </button>
                </div>
              )}

              {detailTab === "urlaub" && (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 18 }}>
                    {[
                      { label: "Anspruch", wert: detail.urlaubTage },
                      { label: "Genommen", wert: detail.urlaubGenommen },
                      { label: "Rest", wert: detail.urlaubTage - detail.urlaubGenommen, gold: true },
                    ].map((k) => (
                      <div key={k.label} style={{ background: "white", borderRadius: 9, padding: "16px 18px", border: "1px solid #EDEDEB", borderLeft: `3px solid ${k.gold ? "#D4AF37" : "#1C1C1E"}` }}>
                        <div className="display" style={{ fontSize: 21, fontWeight: 700, color: k.gold ? "#B8860B" : "#1C1C1E" }}>{k.wert}</div>
                        <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 3 }}>{k.label} Tage</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", marginBottom: 16 }}>
                    <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#1C1C1E" }}>Geplante Abwesenheiten</h3>
                    {[
                      { zeitraum: detail.naechsterUrlaub, art: "Urlaub", tage: 14, status: detail.status === "Im Urlaub" ? "Läuft" : "Genehmigt" },
                      { zeitraum: "24.12. – 31.12.2026", art: "Urlaub", tage: 6, status: "Beantragt" },
                    ].filter(a => a.zeitraum !== "—").map((a, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F2F2F0", gap: 14 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1C1C1E" }}>{a.zeitraum}</div>
                          <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>{a.art} · {a.tage} Tage</div>
                        </div>
                        <span style={{
                          background: a.status === "Genehmigt" ? "#EAF7EE" : a.status === "Läuft" ? "#FDF4E3" : "#F5F5F4",
                          color: a.status === "Genehmigt" ? "#16A34A" : a.status === "Läuft" ? "#B8860B" : "#8A8A8D",
                          borderRadius: 6, padding: "4px 10px", fontSize: 11.5, fontWeight: 500
                        }}>{a.status}</span>
                      </div>
                    ))}
                    <button style={{ width: "100%", background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "11px", fontSize: 13.5, fontWeight: 500, cursor: "pointer", marginTop: 16 }}>
                      Abwesenheit eintragen
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {neuOffen && (
        <div onClick={() => setNeuOffen(false)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 12, width: 500, maxHeight: "86vh", overflow: "auto", border: "1px solid #EDEDEB" }}>
            <div style={{ padding: "22px 26px", borderBottom: "1px solid #EDEDEB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="display" style={{ fontSize: 18, fontWeight: 600, color: "#1C1C1E" }}>Fahrlehrer anlegen</h2>
              <div onClick={() => setNeuOffen(false)} style={{ cursor: "pointer", fontSize: 20, color: "#8A8A8D" }}>×</div>
            </div>
            <div style={{ padding: "22px 26px" }}>
              {[
                { label: "Vorname", ph: "Michael" },
                { label: "Nachname", ph: "Koch" },
                { label: "Telefon", ph: "0170 1234567" },
                { label: "E-Mail", ph: "name@fahrschule.de" },
                { label: "Fahrzeug / Kennzeichen", ph: "VW Golf · NB-FS 101" },
              ].map((f) => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                  <input placeholder={f.ph} style={{ width: "100%", padding: "10px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", fontFamily: "inherit", color: "#1C1C1E" }} />
                </div>
              ))}

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 8, fontWeight: 500 }}>Führerscheinklassen</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["A", "A1", "B", "BE", "C", "CE", "D"].map((k) => (
                    <span key={k} style={{ background: "#FAFAF9", border: "1px solid #EDEDEB", borderRadius: 6, padding: "6px 13px", fontSize: 12.5, cursor: "pointer", color: "#1C1C1E" }}>{k}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 12.5, color: "#8A8A8D", marginBottom: 6, fontWeight: 500 }}>Rolle & Rechte</label>
                <select style={{ width: "100%", padding: "10px 14px", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 13.5, outline: "none", fontFamily: "inherit", background: "white", color: "#1C1C1E" }}>
                  <option>Fahrlehrer (kein Zugriff auf Finanzen)</option>
                  <option>Bürokraft (Verwaltung, keine Umsätze)</option>
                  <option>Inhaber (Vollzugriff)</option>
                </select>
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
