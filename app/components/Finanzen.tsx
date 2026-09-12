"use client";
import { useState } from "react";

const monatsUmsatz = [
  { monat: "Jan", wert: 8400 }, { monat: "Feb", wert: 9200 }, { monat: "Mär", wert: 11800 },
  { monat: "Apr", wert: 10400 }, { monat: "Mai", wert: 12600 }, { monat: "Jun", wert: 7300 },
];

const offenePosten = [
  { name: "Anna Müller", kundennr: "FS-2026-0156", betrag: 340, faellig: "28.05.2026", tage: 9, mahnstufe: 1 },
  { name: "Lisa Schmidt", kundennr: "FS-2026-0138", betrag: 160, faellig: "04.06.2026", tage: 2, mahnstufe: 0 },
  { name: "Jonas Weber", kundennr: "FS-2026-0148", betrag: 480, faellig: "15.05.2026", tage: 22, mahnstufe: 2 },
];

const zahlungen = [
  { name: "Max Mustermann", kundennr: "FS-2026-0142", betrag: 320, datum: "05.06.2026", art: "Überweisung", zugeordnet: true },
  { name: "Tom Braun", kundennr: "FS-2026-0121", betrag: 480, datum: "04.06.2026", art: "Überweisung", zugeordnet: true },
  { name: "Paul Krause", kundennr: "FS-2026-0129", betrag: 240, datum: "03.06.2026", art: "Bar", zugeordnet: true },
  { name: "Unbekannt", kundennr: "—", betrag: 160, datum: "03.06.2026", art: "Überweisung", zugeordnet: false },
  { name: "Max Mustermann", kundennr: "FS-2026-0142", betrag: 400, datum: "01.06.2026", art: "Überweisung", zugeordnet: true },
];

const rechnungen = [
  { nr: "RE-2026-0231", name: "Max Mustermann", betrag: 320, datum: "01.06.2026", status: "Bezahlt" },
  { nr: "RE-2026-0230", name: "Lisa Schmidt", betrag: 160, datum: "01.06.2026", status: "Offen" },
  { nr: "RE-2026-0229", name: "Anna Müller", betrag: 340, datum: "28.05.2026", status: "Überfällig" },
  { nr: "RE-2026-0228", name: "Tom Braun", betrag: 480, datum: "25.05.2026", status: "Bezahlt" },
  { nr: "RE-2026-0227", name: "Paul Krause", betrag: 240, datum: "22.05.2026", status: "Bezahlt" },
];

export default function Finanzen() {
  const [tab, setTab] = useState<"uebersicht" | "offen" | "zahlungen" | "rechnungen">("uebersicht");
  const maxUmsatz = Math.max(...monatsUmsatz.map(m => m.wert));

  const statusStyle = (s: string) => {
    if (s === "Bezahlt") return { bg: "#EAF7EE", color: "#16A34A" };
    if (s === "Offen") return { bg: "#FDF4E3", color: "#B8860B" };
    return { bg: "#FEF2F2", color: "#DC2626" };
  };

  return (
    <div style={{ padding: "36px 40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, color: "#1C1C1E" }}>Finanzen</h1>
          <p style={{ color: "#8A8A8D", fontSize: 14 }}>Juni 2026 · Nur für Inhaber sichtbar</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "11px 18px", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
            Export
          </button>
          <button style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "11px 20px", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
            + Rechnung erstellen
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Umsatz diesen Monat", wert: "7.300 €", sub: "+12% ggü. Vormonat", gold: true },
          { label: "Offene Beträge", wert: "980 €", sub: "3 Schüler", warn: true },
          { label: "Zahlungseingänge", wert: "1.600 €", sub: "diese Woche" },
          { label: "Durchschnitt / Schüler", wert: "1.418 €", sub: "über alle Aktiven" },
        ].map((k) => (
          <div key={k.label} style={{
            background: "white", borderRadius: 10, padding: "20px 22px", border: "1px solid #EDEDEB",
            borderLeft: k.gold ? "3px solid #D4AF37" : k.warn ? "3px solid #DC2626" : "3px solid #1C1C1E"
          }}>
            <div className="display" style={{ fontSize: 26, fontWeight: 700, color: k.gold ? "#B8860B" : k.warn ? "#DC2626" : "#1C1C1E" }}>{k.wert}</div>
            <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 4 }}>{k.label}</div>
            <div style={{ fontSize: 11.5, color: "#B0B0AE", marginTop: 2 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 18, background: "white", border: "1px solid #EDEDEB", borderRadius: 8, padding: 4, width: "fit-content" }}>
        {([
          { id: "uebersicht", label: "Übersicht" },
          { id: "offen", label: "Offene Posten" },
          { id: "zahlungen", label: "Zahlungseingänge" },
          { id: "rechnungen", label: "Rechnungen" },
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

      {tab === "uebersicht" && (
        <div>
          <div style={{ background: "white", borderRadius: 10, padding: 26, border: "1px solid #EDEDEB", marginBottom: 20 }}>
            <h2 className="display" style={{ fontSize: 15, fontWeight: 600, marginBottom: 24, color: "#1C1C1E" }}>Umsatzentwicklung 2026</h2>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 200, paddingBottom: 8 }}>
              {monatsUmsatz.map((m, i) => (
                <div key={m.monat} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div className="display" style={{ fontSize: 12, fontWeight: 600, color: "#1C1C1E" }}>
                    {(m.wert / 1000).toFixed(1)}k
                  </div>
                  <div style={{
                    width: "100%",
                    height: `${(m.wert / maxUmsatz) * 150}px`,
                    background: i === monatsUmsatz.length - 1 ? "#D4AF37" : "#1C1C1E",
                    borderRadius: "6px 6px 0 0",
                  }} />
                  <div style={{ fontSize: 12, color: "#8A8A8D" }}>{m.monat}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ background: "white", borderRadius: 10, padding: 24, border: "1px solid #EDEDEB" }}>
              <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#1C1C1E" }}>Umsatz nach Fahrlehrer</h3>
              {[
                { name: "Herr Koch", wert: 3200, prozent: 44 },
                { name: "Frau Bauer", wert: 2600, prozent: 36 },
                { name: "Herr Wendt", wert: 1500, prozent: 20 },
              ].map((f) => (
                <div key={f.name} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: "#1C1C1E" }}>{f.name}</span>
                    <span className="display" style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>{f.wert} €</span>
                  </div>
                  <div style={{ background: "#F2F2F0", borderRadius: 999, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${f.prozent}%`, background: "#1C1C1E", height: "100%" }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", borderRadius: 10, padding: 24, border: "1px solid #EDEDEB" }}>
              <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#1C1C1E" }}>Zahlungsarten</h3>
              {[
                { art: "Überweisung", wert: 5800, prozent: 79 },
                { art: "Bar", wert: 1200, prozent: 17 },
                { art: "Sonstige", wert: 300, prozent: 4 },
              ].map((z) => (
                <div key={z.art} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: "#1C1C1E" }}>{z.art}</span>
                    <span className="display" style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>{z.wert} €</span>
                  </div>
                  <div style={{ background: "#F2F2F0", borderRadius: 999, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${z.prozent}%`, background: "#D4AF37", height: "100%" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "offen" && (
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAF9", borderBottom: "1px solid #EDEDEB" }}>
                {["Schüler", "Betrag", "Fällig seit", "Mahnstufe", ""].map((h) => (
                  <th key={h} style={{ padding: "13px 20px", textAlign: "left", fontSize: 11.5, color: "#8A8A8D", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offenePosten.map((p) => (
                <tr key={p.kundennr} style={{ borderTop: "1px solid #F2F2F0" }}>
                  <td style={{ padding: "15px 20px" }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>{p.name}</div>
                    <div style={{ fontSize: 11.5, color: "#8A8A8D" }}>{p.kundennr}</div>
                  </td>
                  <td style={{ padding: "15px 20px" }}>
                    <span className="display" style={{ fontSize: 15, fontWeight: 700, color: "#DC2626" }}>{p.betrag} €</span>
                  </td>
                  <td style={{ padding: "15px 20px" }}>
                    <div style={{ fontSize: 13, color: "#1C1C1E" }}>{p.faellig}</div>
                    <div style={{ fontSize: 11.5, color: p.tage > 14 ? "#DC2626" : "#8A8A8D" }}>{p.tage} Tage überfällig</div>
                  </td>
                  <td style={{ padding: "15px 20px" }}>
                    <span style={{
                      background: p.mahnstufe === 0 ? "#F5F5F4" : p.mahnstufe === 1 ? "#FDF4E3" : "#FEF2F2",
                      color: p.mahnstufe === 0 ? "#8A8A8D" : p.mahnstufe === 1 ? "#B8860B" : "#DC2626",
                      borderRadius: 6, padding: "4px 11px", fontSize: 12, fontWeight: 500
                    }}>
                      {p.mahnstufe === 0 ? "Keine" : `${p.mahnstufe}. Mahnung`}
                    </span>
                  </td>
                  <td style={{ padding: "15px 20px", textAlign: "right" }}>
                    <span style={{ fontSize: 12.5, color: "#B8860B", cursor: "pointer", fontWeight: 500 }}>Erinnerung senden</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "zahlungen" && (
        <div>
          <div style={{ background: "#FDF4E3", borderRadius: 10, padding: "14px 20px", marginBottom: 16, borderLeft: "3px solid #D4AF37", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#B8860B" }}>1 Zahlung nicht zugeordnet</div>
              <div style={{ fontSize: 12.5, color: "#1C1C1E", marginTop: 2 }}>Keine Kundennummer im Verwendungszweck gefunden</div>
            </div>
            <button style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 7, padding: "9px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              Jetzt zuordnen
            </button>
          </div>

          <div style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FAFAF9", borderBottom: "1px solid #EDEDEB" }}>
                  {["Schüler", "Kundennummer", "Betrag", "Datum", "Art", "Status"].map((h) => (
                    <th key={h} style={{ padding: "13px 20px", textAlign: "left", fontSize: 11.5, color: "#8A8A8D", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {zahlungen.map((z, i) => (
                  <tr key={i} style={{ borderTop: "1px solid #F2F2F0", background: z.zugeordnet ? "white" : "#FFFDF7" }}>
                    <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 500, color: z.zugeordnet ? "#1C1C1E" : "#B8860B" }}>{z.name}</td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#8A8A8D" }}>{z.kundennr}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span className="display" style={{ fontSize: 14, fontWeight: 700, color: "#16A34A" }}>+{z.betrag} €</span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#8A8A8D" }}>{z.datum}</td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#8A8A8D" }}>{z.art}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        background: z.zugeordnet ? "#EAF7EE" : "#FDF4E3",
                        color: z.zugeordnet ? "#16A34A" : "#B8860B",
                        borderRadius: 6, padding: "4px 11px", fontSize: 12, fontWeight: 500
                      }}>
                        {z.zugeordnet ? "Zugeordnet" : "Offen"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "rechnungen" && (
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAF9", borderBottom: "1px solid #EDEDEB" }}>
                {["Rechnungsnr.", "Schüler", "Betrag", "Datum", "Status", ""].map((h) => (
                  <th key={h} style={{ padding: "13px 20px", textAlign: "left", fontSize: 11.5, color: "#8A8A8D", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rechnungen.map((r) => {
                const st = statusStyle(r.status);
                return (
                  <tr key={r.nr} style={{ borderTop: "1px solid #F2F2F0" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <span className="display" style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>{r.nr}</span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 14, color: "#1C1C1E" }}>{r.name}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span className="display" style={{ fontSize: 14, fontWeight: 700, color: "#1C1C1E" }}>{r.betrag} €</span>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#8A8A8D" }}>{r.datum}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ background: st.bg, color: st.color, borderRadius: 6, padding: "4px 11px", fontSize: 12, fontWeight: 500 }}>{r.status}</span>
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "right" }}>
                      <span style={{ fontSize: 12.5, color: "#B8860B", cursor: "pointer", fontWeight: 500 }}>PDF öffnen</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
