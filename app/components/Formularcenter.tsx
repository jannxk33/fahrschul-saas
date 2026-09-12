"use client";
import { useState } from "react";

const erzeugteDokumente = [
  { name: "Ausbildungsnachweis Juni", schueler: "Max Mustermann", typ: "Nachweis", datum: "05.06.2026", auto: true },
  { name: "Rechnung RE-2026-0231", schueler: "Max Mustermann", typ: "Rechnung", datum: "01.06.2026", auto: true },
  { name: "Zugangsdaten-Brief", schueler: "Anna Müller", typ: "Zugang", datum: "20.05.2026", auto: true },
  { name: "Anmeldebestätigung", schueler: "Anna Müller", typ: "Anmeldung", datum: "20.05.2026", auto: true },
  { name: "Ausbildungsnachweis Mai", schueler: "Lisa Schmidt", typ: "Nachweis", datum: "31.05.2026", auto: true },
  { name: "Rechnung RE-2026-0229", schueler: "Anna Müller", typ: "Rechnung", datum: "28.05.2026", auto: true },
];

const schuelerUnterlagen = [
  { name: "Max Mustermann", sehtest: true, ersteHilfe: true, passfoto: true, antrag: true, vollstaendig: true, ablauf: "—" },
  { name: "Lisa Schmidt", sehtest: true, ersteHilfe: true, passfoto: true, antrag: true, vollstaendig: true, ablauf: "—" },
  { name: "Tom Braun", sehtest: true, ersteHilfe: true, passfoto: true, antrag: true, vollstaendig: true, ablauf: "—" },
  { name: "Anna Müller", sehtest: false, ersteHilfe: true, passfoto: true, antrag: false, vollstaendig: false, ablauf: "—" },
  { name: "Paul Krause", sehtest: true, ersteHilfe: true, passfoto: false, antrag: true, vollstaendig: false, ablauf: "Sehtest läuft 14.07. ab" },
];

const vorlagen = [
  { name: "Ausbildungsvertrag", info: "Standardvertrag für neue Schüler", verwendet: 24 },
  { name: "AGB der Fahrschule", info: "Allgemeine Geschäftsbedingungen", verwendet: 24 },
  { name: "Datenschutzerklärung", info: "DSGVO-Einwilligung", verwendet: 24 },
  { name: "Preisliste 2026", info: "Aktuelle Preisübersicht", verwendet: 18 },
  { name: "Antrag Führerscheinstelle", info: "Vorausgefülltes Formular", verwendet: 21 },
  { name: "Abmeldeformular", info: "Bei Abbruch der Ausbildung", verwendet: 2 },
];

export default function Formularcenter() {
  const [tab, setTab] = useState<"erzeugt" | "unterlagen" | "vorlagen">("erzeugt");
  const [suche, setSuche] = useState("");

  const unvollstaendig = schuelerUnterlagen.filter(s => !s.vollstaendig).length;
  const gefiltert = erzeugteDokumente.filter(d =>
    d.name.toLowerCase().includes(suche.toLowerCase()) || d.schueler.toLowerCase().includes(suche.toLowerCase())
  );

  const typFarbe = (typ: string) => {
    if (typ === "Rechnung") return { bg: "#FDF4E3", color: "#B8860B" };
    if (typ === "Nachweis") return { bg: "#EAF7EE", color: "#16A34A" };
    return { bg: "#F5F5F4", color: "#1C1C1E" };
  };

  const Check = ({ ok }: { ok: boolean }) => (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 22, height: 22, borderRadius: "50%",
      background: ok ? "#EAF7EE" : "#FEF2F2",
      color: ok ? "#16A34A" : "#DC2626",
      fontSize: 12, fontWeight: 700,
    }}>{ok ? "✓" : "!"}</span>
  );

  return (
    <div style={{ padding: "36px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, color: "#1C1C1E" }}>Formularcenter</h1>
          <p style={{ color: "#8A8A8D", fontSize: 14 }}>Alle Dokumente, Unterlagen und Vorlagen an einem Ort</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "11px 18px", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
            Hochladen
          </button>
          <button style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "11px 20px", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
            + Dokument erstellen
          </button>
        </div>
      </div>

      {unvollstaendig > 0 && (
        <div style={{ background: "#FEF2F2", borderRadius: 10, padding: "14px 20px", marginBottom: 20, borderLeft: "3px solid #DC2626", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "#DC2626" }}>{unvollstaendig} Schüler mit unvollständigen Unterlagen</div>
            <div style={{ fontSize: 12.5, color: "#1C1C1E", marginTop: 2 }}>Prüfungsanmeldung ist erst nach vollständigen Unterlagen möglich</div>
          </div>
          <button onClick={() => setTab("unterlagen")} style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 7, padding: "9px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
            Ansehen
          </button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 22 }}>
        {[
          { label: "Dokumente gesamt", wert: "184" },
          { label: "Automatisch erzeugt", wert: "142", gold: true },
          { label: "Unterlagen fehlen", wert: String(unvollstaendig), warn: unvollstaendig > 0 },
          { label: "Vorlagen aktiv", wert: String(vorlagen.length) },
        ].map((k) => (
          <div key={k.label} style={{
            background: "white", borderRadius: 10, padding: "20px 22px", border: "1px solid #EDEDEB",
            borderLeft: k.gold ? "3px solid #D4AF37" : k.warn ? "3px solid #DC2626" : "3px solid #1C1C1E"
          }}>
            <div className="display" style={{ fontSize: 26, fontWeight: 700, color: k.gold ? "#B8860B" : k.warn ? "#DC2626" : "#1C1C1E" }}>{k.wert}</div>
            <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 4 }}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 18, background: "white", border: "1px solid #EDEDEB", borderRadius: 8, padding: 4, width: "fit-content" }}>
        {([
          { id: "erzeugt", label: "Erzeugte Dokumente" },
          { id: "unterlagen", label: "Schülerunterlagen" },
          { id: "vorlagen", label: "Vorlagen" },
        ] as const).map((t) => (
          <div
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "8px 18px", fontSize: 13.5, fontWeight: 500, cursor: "pointer", borderRadius: 6,
              background: tab === t.id ? "#1C1C1E" : "transparent",
              color: tab === t.id ? "white" : "#8A8A8D",
            }}
          >{t.label}</div>
        ))}
      </div>

      {tab === "erzeugt" && (
        <div>
          <input
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
            placeholder="Dokument oder Schüler suchen..."
            style={{ width: "100%", padding: "11px 16px", background: "white", border: "1px solid #EDEDEB", borderRadius: 8, fontSize: 14, outline: "none", marginBottom: 16, fontFamily: "inherit", color: "#1C1C1E" }}
          />
          <div style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FAFAF9", borderBottom: "1px solid #EDEDEB" }}>
                  {["Dokument", "Schüler", "Typ", "Erstellt", ""].map((h) => (
                    <th key={h} style={{ padding: "13px 20px", textAlign: "left", fontSize: 11.5, color: "#8A8A8D", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gefiltert.map((d, i) => {
                  const tf = typFarbe(d.typ);
                  return (
                    <tr key={i} style={{ borderTop: "1px solid #F2F2F0" }}>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 7, background: "#F5F5F4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#1C1C1E" }}>PDF</div>
                          <div>
                            <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1C1C1E" }}>{d.name}</div>
                            {d.auto && <div style={{ fontSize: 11, color: "#B8860B" }}>Automatisch erzeugt</div>}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#8A8A8D" }}>{d.schueler}</td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{ background: tf.bg, color: tf.color, borderRadius: 6, padding: "4px 11px", fontSize: 12, fontWeight: 500 }}>{d.typ}</span>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "#8A8A8D" }}>{d.datum}</td>
                      <td style={{ padding: "14px 20px", textAlign: "right" }}>
                        <span style={{ fontSize: 12.5, color: "#B8860B", cursor: "pointer", fontWeight: 500, marginRight: 14 }}>Öffnen</span>
                        <span style={{ fontSize: 12.5, color: "#8A8A8D", cursor: "pointer", fontWeight: 500 }}>Senden</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "unterlagen" && (
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAF9", borderBottom: "1px solid #EDEDEB" }}>
                {["Schüler", "Sehtest", "Erste Hilfe", "Passfoto", "Antrag", "Status", ""].map((h) => (
                  <th key={h} style={{ padding: "13px 18px", textAlign: h === "Schüler" || h === "Status" || h === "" ? "left" : "center", fontSize: 11.5, color: "#8A8A8D", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schuelerUnterlagen.map((s) => (
                <tr key={s.name} style={{ borderTop: "1px solid #F2F2F0", background: s.vollstaendig ? "white" : "#FFFCFC" }}>
                  <td style={{ padding: "14px 18px" }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1C1C1E" }}>{s.name}</div>
                    {s.ablauf !== "—" && <div style={{ fontSize: 11, color: "#B8860B", marginTop: 2 }}>{s.ablauf}</div>}
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "center" }}><Check ok={s.sehtest} /></td>
                  <td style={{ padding: "14px 18px", textAlign: "center" }}><Check ok={s.ersteHilfe} /></td>
                  <td style={{ padding: "14px 18px", textAlign: "center" }}><Check ok={s.passfoto} /></td>
                  <td style={{ padding: "14px 18px", textAlign: "center" }}><Check ok={s.antrag} /></td>
                  <td style={{ padding: "14px 18px" }}>
                    <span style={{
                      background: s.vollstaendig ? "#EAF7EE" : "#FEF2F2",
                      color: s.vollstaendig ? "#16A34A" : "#DC2626",
                      borderRadius: 6, padding: "4px 11px", fontSize: 12, fontWeight: 500
                    }}>
                      {s.vollstaendig ? "Vollständig" : "Unvollständig"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 18px", textAlign: "right" }}>
                    {!s.vollstaendig && (
                      <span style={{ fontSize: 12.5, color: "#B8860B", cursor: "pointer", fontWeight: 500 }}>Erinnerung senden</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "vorlagen" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {vorlagen.map((v) => (
            <div key={v.name} style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", borderLeft: "3px solid #1C1C1E", padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F5F5F4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#1C1C1E" }}>PDF</div>
                <span style={{ fontSize: 11.5, color: "#8A8A8D" }}>{v.verwendet}× verwendet</span>
              </div>
              <div className="display" style={{ fontSize: 14.5, fontWeight: 600, color: "#1C1C1E", marginBottom: 4 }}>{v.name}</div>
              <div style={{ fontSize: 12.5, color: "#8A8A8D", marginBottom: 16, lineHeight: 1.4 }}>{v.info}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ flex: 1, background: "#1C1C1E", color: "white", border: "none", borderRadius: 7, padding: "9px", fontSize: 12.5, fontWeight: 500, cursor: "pointer" }}>Verwenden</button>
                <button style={{ background: "white", color: "#8A8A8D", border: "1px solid #EDEDEB", borderRadius: 7, padding: "9px 14px", fontSize: 12.5, fontWeight: 500, cursor: "pointer" }}>Bearbeiten</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
