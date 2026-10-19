"use client";
import { useState } from "react";

type Einheit = {
  id: number; kurs: string; datum: string; zeit: string; thema: string; themaNr: number;
  lehrer: string; anwesend: number; erwartet: number; status: string;
};

type Kurs = {
  id: string; name: string; zeitraum: string; teilnehmer: number;
  einheitenGesamt: number; einheitenGehalten: number; status: string;
};

const kurse: Kurs[] = [
  { id: "okt26", name: "Kurs Oktober 2026", zeitraum: "05.10. – 27.11.2026", teilnehmer: 12, einheitenGesamt: 14, einheitenGehalten: 6, status: "Laufend" },
  { id: "aug26", name: "Kurs August 2026", zeitraum: "03.08. – 25.09.2026", teilnehmer: 15, einheitenGesamt: 14, einheitenGehalten: 14, status: "Abgeschlossen" },
  { id: "jan27", name: "Kurs Januar 2027", zeitraum: "05.01. – 26.02.2027", teilnehmer: 4, einheitenGesamt: 14, einheitenGehalten: 0, status: "Geplant" },
];

const einheiten: Einheit[] = [
  // Kurs Oktober
  { id: 1, kurs: "okt26", datum: "Heute", zeit: "18:00 – 19:30", thema: "Vorfahrt und Vorrang", themaNr: 6, lehrer: "Herr Koch", anwesend: 9, erwartet: 12, status: "Läuft" },
  { id: 2, kurs: "okt26", datum: "Mi 21.10.", zeit: "18:00 – 19:30", thema: "Geschwindigkeit und Abstand", themaNr: 7, lehrer: "Frau Bauer", anwesend: 0, erwartet: 12, status: "Geplant" },
  { id: 3, kurs: "okt26", datum: "Fr 16.10.", zeit: "18:00 – 19:30", thema: "Verkehrszeichen", themaNr: 5, lehrer: "Herr Koch", anwesend: 11, erwartet: 12, status: "Abgeschlossen" },
  { id: 4, kurs: "okt26", datum: "Mi 14.10.", zeit: "18:00 – 19:30", thema: "Straßenverkehrssystem", themaNr: 4, lehrer: "Herr Wendt", anwesend: 12, erwartet: 12, status: "Abgeschlossen" },
  { id: 5, kurs: "okt26", datum: "Mo 12.10.", zeit: "18:00 – 19:30", thema: "Grundregeln im Verkehr", themaNr: 3, lehrer: "Frau Bauer", anwesend: 10, erwartet: 12, status: "Abgeschlossen" },
  { id: 6, kurs: "okt26", datum: "Fr 09.10.", zeit: "18:00 – 19:30", thema: "Rechtliche Rahmenbedingungen", themaNr: 2, lehrer: "Herr Koch", anwesend: 11, erwartet: 12, status: "Abgeschlossen" },
  { id: 7, kurs: "okt26", datum: "Mo 05.10.", zeit: "18:00 – 19:30", thema: "Persönliche Voraussetzungen", themaNr: 1, lehrer: "Herr Koch", anwesend: 12, erwartet: 12, status: "Abgeschlossen" },
  // Kurs August
  { id: 8, kurs: "aug26", datum: "Do 25.09.", zeit: "18:00 – 19:30", thema: "Zusatzstoff Klasse B II", themaNr: 14, lehrer: "Herr Koch", anwesend: 14, erwartet: 15, status: "Abgeschlossen" },
  { id: 9, kurs: "aug26", datum: "Mo 22.09.", zeit: "18:00 – 19:30", thema: "Zusatzstoff Klasse B I", themaNr: 13, lehrer: "Herr Koch", anwesend: 15, erwartet: 15, status: "Abgeschlossen" },
  { id: 10, kurs: "aug26", datum: "Do 18.09.", zeit: "18:00 – 19:30", thema: "Lebenslanges Lernen", themaNr: 12, lehrer: "Frau Bauer", anwesend: 13, erwartet: 15, status: "Abgeschlossen" },
];

const teilnehmerProKurs: Record<string, { name: string; kundennr: string; zeit: string; status: string }[]> = {
  okt26: [
    { name: "Max Mustermann", kundennr: "FS-2026-0142", zeit: "17:54", status: "Anwesend" },
    { name: "Lisa Schmidt", kundennr: "FS-2026-0138", zeit: "17:58", status: "Anwesend" },
    { name: "Tom Braun", kundennr: "FS-2026-0121", zeit: "18:02", status: "Anwesend" },
    { name: "Paul Krause", kundennr: "FS-2026-0129", zeit: "18:04", status: "Anwesend" },
    { name: "Anna Müller", kundennr: "FS-2026-0156", zeit: "—", status: "Fehlt" },
    { name: "Jonas Weber", kundennr: "FS-2026-0148", zeit: "18:11", status: "Verspätet" },
    { name: "Sarah Klein", kundennr: "FS-2026-0151", zeit: "—", status: "Fehlt" },
  ],
  aug26: [
    { name: "Marie Lange", kundennr: "FS-2026-0098", zeit: "17:52", status: "Anwesend" },
    { name: "Nico Hartmann", kundennr: "FS-2026-0101", zeit: "17:56", status: "Anwesend" },
    { name: "Elias Fuchs", kundennr: "FS-2026-0104", zeit: "18:01", status: "Anwesend" },
  ],
  jan27: [],
};

const fortschrittProKurs: Record<string, { name: string; besucht: number[]; zusatz: number; zusatzSoll: number }[]> = {
  okt26: [
    { name: "Max Mustermann", besucht: [1,2,3,4,5,6], zusatz: 0, zusatzSoll: 2 },
    { name: "Lisa Schmidt", besucht: [1,2,3,4,5,6], zusatz: 0, zusatzSoll: 2 },
    { name: "Tom Braun", besucht: [1,2,4,5,6], zusatz: 0, zusatzSoll: 2 },
    { name: "Paul Krause", besucht: [1,3,4,5,6], zusatz: 0, zusatzSoll: 2 },
    { name: "Anna Müller", besucht: [1,2,4], zusatz: 0, zusatzSoll: 2 },
    { name: "Jonas Weber", besucht: [1,2,3,4,6], zusatz: 0, zusatzSoll: 2 },
    { name: "Sarah Klein", besucht: [1,4,5], zusatz: 0, zusatzSoll: 2 },
  ],
  aug26: [
    { name: "Marie Lange", besucht: [1,2,3,4,5,6,7,8,9,10,11,12], zusatz: 2, zusatzSoll: 2 },
    { name: "Nico Hartmann", besucht: [1,2,3,4,5,6,7,8,9,10,11,12], zusatz: 2, zusatzSoll: 2 },
    { name: "Elias Fuchs", besucht: [1,2,3,4,5,6,7,8,9,10,12], zusatz: 2, zusatzSoll: 2 },
  ],
  jan27: [],
};

export default function Theorie() {
  const [kursId, setKursId] = useState("okt26");
  const [kursOffen, setKursOffen] = useState(false);
  const [tab, setTab] = useState<"einheiten" | "fortschritt">("einheiten");
  const [qrOffen, setQrOffen] = useState(false);
  const [detail, setDetail] = useState<Einheit | null>(null);

  const kurs = kurse.find(k => k.id === kursId)!;
  const kursEinheiten = einheiten.filter(e => e.kurs === kursId);
  const teilnehmer = teilnehmerProKurs[kursId] || [];
  const fortschritt = fortschrittProKurs[kursId] || [];
  const aktuelle = kursEinheiten.find(e => e.status === "Läuft");

  const gehalteneThemen = kursEinheiten.filter(e => e.status === "Abgeschlossen" || e.status === "Läuft").map(e => e.themaNr);

  const statusStyle = (s: string) => {
    if (s === "Läuft" || s === "Laufend") return { bg: "#FDF4E3", color: "#B8860B" };
    if (s === "Abgeschlossen") return { bg: "#EAF7EE", color: "#16A34A" };
    return { bg: "#F5F5F4", color: "#8A8A8D" };
  };

  const anwesenheitStyle = (s: string) => {
    if (s === "Anwesend") return { bg: "#EAF7EE", color: "#16A34A" };
    if (s === "Verspätet") return { bg: "#FDF4E3", color: "#B8860B" };
    return { bg: "#FEF2F2", color: "#DC2626" };
  };

  return (
    <div style={{ padding: "36px 40px" }}>
      {/* Kopf mit Kursauswahl */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <div>
          <h1 className="display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 10, color: "#1C1C1E" }}>Theorie</h1>

          <div style={{ position: "relative", display: "inline-block" }}>
            <div
              onClick={() => setKursOffen(!kursOffen)}
              style={{
                display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                background: "white", border: "1px solid #EDEDEB", borderRadius: 8,
                padding: "10px 16px",
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: "50%",
                background: kurs.status === "Laufend" ? "#D4AF37" : kurs.status === "Abgeschlossen" ? "#16A34A" : "#B0B0AE"
              }} />
              <div>
                <div className="display" style={{ fontSize: 14.5, fontWeight: 600, color: "#1C1C1E" }}>{kurs.name}</div>
                <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 1 }}>
                  {kurs.zeitraum} · {kurs.teilnehmer} Teilnehmer
                </div>
              </div>
              <span style={{ fontSize: 10, opacity: 0.5, marginLeft: 8 }}>{kursOffen ? "▲" : "▼"}</span>
            </div>

            {kursOffen && (
              <div style={{
                position: "absolute", top: "108%", left: 0, background: "white",
                border: "1px solid #EDEDEB", borderRadius: 8, minWidth: 320,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)", zIndex: 30, overflow: "hidden"
              }}>
                {kurse.map((k) => (
                  <div
                    key={k.id}
                    onClick={() => { setKursId(k.id); setKursOffen(false); setDetail(null); }}
                    style={{
                      padding: "12px 16px", cursor: "pointer",
                      background: kursId === k.id ? "#FAFAF9" : "white",
                      borderBottom: "1px solid #F2F2F0",
                      display: "flex", alignItems: "center", gap: 12,
                    }}
                  >
                    <span style={{
                      width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                      background: k.status === "Laufend" ? "#D4AF37" : k.status === "Abgeschlossen" ? "#16A34A" : "#B0B0AE"
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: kursId === k.id ? 600 : 500, color: "#1C1C1E" }}>{k.name}</div>
                      <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>
                        {k.zeitraum} · {k.teilnehmer} Teilnehmer
                      </div>
                    </div>
                    <span className="display" style={{ fontSize: 12, color: "#8A8A8D" }}>
                      {k.einheitenGehalten}/{k.einheitenGesamt}
                    </span>
                  </div>
                ))}
                <div style={{ padding: "11px 16px", cursor: "pointer", fontSize: 13, color: "#B8860B", fontWeight: 500 }}>
                  + Neuen Kurs anlegen
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {aktuelle && (
            <button
              onClick={() => setQrOffen(true)}
              style={{ background: "#D4AF37", color: "#1C1C1E", border: "none", borderRadius: 8, padding: "11px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}
            >
              QR-Code anzeigen
            </button>
          )}
          <button style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "11px 20px", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
            + Einheit anlegen
          </button>
        </div>
      </div>

      {/* Laufende Einheit */}
      {aktuelle && (
        <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", borderLeft: "3px solid #D4AF37", marginBottom: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11.5, color: "#B8860B", fontWeight: 600, letterSpacing: 1, marginBottom: 5 }}>LÄUFT GERADE</div>
              <div className="display" style={{ fontSize: 17, fontWeight: 600, color: "#1C1C1E" }}>
                Thema {aktuelle.themaNr} · {aktuelle.thema}
              </div>
              <div style={{ fontSize: 13, color: "#8A8A8D", marginTop: 4 }}>
                {aktuelle.zeit} · {aktuelle.lehrer}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ textAlign: "right" }}>
                <div className="display" style={{ fontSize: 28, fontWeight: 700, color: "#1C1C1E" }}>
                  {aktuelle.anwesend}<span style={{ color: "#B0B0AE", fontSize: 20 }}>/{aktuelle.erwartet}</span>
                </div>
                <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>eingecheckt</div>
              </div>
              <button
                onClick={() => setDetail(aktuelle)}
                style={{ background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "11px 18px", cursor: "pointer", fontSize: 13.5, fontWeight: 500 }}
              >
                Teilnehmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kennzahlen des Kurses */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 22 }}>
        {[
          { label: "Einheiten gehalten", wert: `${kurs.einheitenGehalten}/${kurs.einheitenGesamt}` },
          { label: "Teilnehmer", wert: String(kurs.teilnehmer) },
          { label: "Ø Anwesenheit", wert: kurs.einheitenGehalten > 0 ? "89%" : "—", gold: true },
          { label: "Theorie komplett", wert: String(fortschritt.filter(f => f.besucht.length >= 12 && f.zusatz >= f.zusatzSoll).length), sub: `von ${fortschritt.length}` },
        ].map((k) => (
          <div key={k.label} style={{
            background: "white", borderRadius: 10, padding: "20px 22px", border: "1px solid #EDEDEB",
            borderLeft: k.gold ? "3px solid #D4AF37" : "3px solid #1C1C1E"
          }}>
            <div className="display" style={{ fontSize: 26, fontWeight: 700, color: k.gold ? "#B8860B" : "#1C1C1E" }}>{k.wert}</div>
            <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 4 }}>{k.label}</div>
            {k.sub && <div style={{ fontSize: 11.5, color: "#B0B0AE", marginTop: 2 }}>{k.sub}</div>}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 18, background: "white", border: "1px solid #EDEDEB", borderRadius: 8, padding: 4, width: "fit-content" }}>
        {([
          { id: "einheiten", label: "Unterrichtseinheiten" },
          { id: "fortschritt", label: "Fortschritt je Teilnehmer" },
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

      {/* Einheiten */}
      {tab === "einheiten" && (
        kursEinheiten.length === 0 ? (
          <div style={{ background: "white", borderRadius: 10, padding: 50, textAlign: "center", border: "1px solid #EDEDEB" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", letterSpacing: 1, marginBottom: 8 }}>NOCH KEINE EINHEITEN</div>
            <div style={{ fontSize: 14, color: "#8A8A8D" }}>Für diesen Kurs wurden noch keine Termine angelegt.</div>
          </div>
        ) : (
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#FAFAF9", borderBottom: "1px solid #EDEDEB" }}>
                {["Datum", "Thema", "Fahrlehrer", "Anwesenheit", "Status", ""].map((h) => (
                  <th key={h} style={{ padding: "13px 20px", textAlign: "left", fontSize: 11.5, color: "#8A8A8D", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {kursEinheiten.map((e) => {
                const st = statusStyle(e.status);
                const quote = e.erwartet > 0 ? Math.round((e.anwesend / e.erwartet) * 100) : 0;
                return (
                  <tr key={e.id} onClick={() => setDetail(e)} style={{ borderTop: "1px solid #F2F2F0", cursor: "pointer" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1C1C1E" }}>{e.datum}</div>
                      <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>{e.zeit}</div>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontSize: 13.5, color: "#1C1C1E" }}>{e.thema}</div>
                      <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>Thema {e.themaNr}</div>
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#8A8A8D" }}>{e.lehrer}</td>
                    <td style={{ padding: "14px 20px", width: 150 }}>
                      {e.status === "Geplant" ? (
                        <span style={{ fontSize: 13, color: "#B0B0AE" }}>—</span>
                      ) : (
                        <>
                          <div className="display" style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", marginBottom: 5 }}>
                            {e.anwesend} / {e.erwartet} · {quote}%
                          </div>
                          <div style={{ background: "#F2F2F0", borderRadius: 999, height: 5, overflow: "hidden" }}>
                            <div style={{ width: `${quote}%`, background: quote >= 85 ? "#16A34A" : "#D4AF37", height: "100%" }} />
                          </div>
                        </>
                      )}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ background: st.bg, color: st.color, borderRadius: 6, padding: "4px 11px", fontSize: 12, fontWeight: 500 }}>{e.status}</span>
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "right" }}>
                      <span style={{ fontSize: 12.5, color: "#B8860B", cursor: "pointer", fontWeight: 500 }}>Liste öffnen</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        )
      )}

      {/* Fortschritt mit Themenraster */}
      {tab === "fortschritt" && (
        fortschritt.length === 0 ? (
          <div style={{ background: "white", borderRadius: 10, padding: 50, textAlign: "center", border: "1px solid #EDEDEB" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E", letterSpacing: 1, marginBottom: 8 }}>NOCH KEINE TEILNEHMER</div>
            <div style={{ fontSize: 14, color: "#8A8A8D" }}>Diesem Kurs wurden noch keine Schüler zugeordnet.</div>
          </div>
        ) : (
        <div style={{ background: "white", borderRadius: 10, border: "1px solid #EDEDEB", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #EDEDEB", background: "#FAFAF9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11.5, color: "#8A8A8D", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>
              Grundstoff Themen 1–12 · Zusatzstoff
            </span>
            <div style={{ display: "flex", gap: 14, fontSize: 11, color: "#8A8A8D" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, background: "#1C1C1E" }} /> besucht
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, background: "#FEE2E2", border: "1px solid #DC2626" }} /> gefehlt
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, background: "#F2F2F0" }} /> noch offen
              </span>
            </div>
          </div>

          {fortschritt.map((s) => {
            const komplett = s.besucht.length >= 12 && s.zusatz >= s.zusatzSoll;
            const fehlend = gehalteneThemen.filter(t => !s.besucht.includes(t));
            return (
              <div key={s.name} style={{ padding: "16px 20px", borderBottom: "1px solid #F2F2F0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1E" }}>{s.name}</span>
                    {fehlend.length > 0 && (
                      <span style={{ fontSize: 12, color: "#DC2626", marginLeft: 12 }}>
                        fehlt: Thema {fehlend.join(", ")}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span className="display" style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1E" }}>
                      {s.besucht.length}/12 + {s.zusatz}/{s.zusatzSoll}
                    </span>
                    <span style={{
                      background: komplett ? "#EAF7EE" : "#F5F5F4",
                      color: komplett ? "#16A34A" : "#8A8A8D",
                      borderRadius: 6, padding: "4px 11px", fontSize: 11.5, fontWeight: 500
                    }}>
                      {komplett ? "Vollständig" : "Offen"}
                    </span>
                  </div>
                </div>

                {/* Themenraster */}
                <div style={{ display: "flex", gap: 5 }}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((t) => {
                    const besucht = s.besucht.includes(t);
                    const gehalten = gehalteneThemen.includes(t);
                    return (
                      <div
                        key={t}
                        title={`Thema ${t}`}
                        style={{
                          flex: 1, height: 26, borderRadius: 4,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10.5, fontWeight: 600,
                          background: besucht ? "#1C1C1E" : gehalten ? "#FEE2E2" : "#F2F2F0",
                          color: besucht ? "white" : gehalten ? "#DC2626" : "#B0B0AE",
                          border: gehalten && !besucht ? "1px solid #DC2626" : "none",
                        }}
                      >
                        {t}
                      </div>
                    );
                  })}
                  <div style={{ width: 1, background: "#EDEDEB", margin: "0 4px" }} />
                  {Array.from({ length: s.zusatzSoll }, (_, i) => i + 1).map((z) => (
                    <div
                      key={`z${z}`}
                      title={`Zusatzstoff ${z}`}
                      style={{
                        width: 36, height: 26, borderRadius: 4,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10.5, fontWeight: 600,
                        background: s.zusatz >= z ? "#D4AF37" : "#F2F2F0",
                        color: s.zusatz >= z ? "#1C1C1E" : "#B0B0AE",
                      }}
                    >
                      Z{z}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        )
      )}

      {/* QR-Code Modal */}
      {qrOffen && aktuelle && (
        <div onClick={() => setQrOffen(false)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "white", borderRadius: 14, width: 420, padding: 34, textAlign: "center", border: "1px solid #EDEDEB" }}>
            <div style={{ fontSize: 11.5, color: "#8A8A8D", letterSpacing: 1, fontWeight: 600, marginBottom: 8 }}>ANWESENHEIT ERFASSEN</div>
            <h2 className="display" style={{ fontSize: 19, fontWeight: 600, color: "#1C1C1E", marginBottom: 4 }}>
              Thema {aktuelle.themaNr} · {aktuelle.thema}
            </h2>
            <p style={{ fontSize: 12.5, color: "#8A8A8D", marginBottom: 24 }}>
              {kurs.name} · Code erneuert sich alle 2 Minuten
            </p>

            <div style={{
              width: 220, height: 220, margin: "0 auto 24px", background: "#1C1C1E",
              borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
              padding: 18,
            }}>
              <svg viewBox="0 0 29 29" style={{ width: "100%", height: "100%" }} shapeRendering="crispEdges">
                <rect width="29" height="29" fill="#1C1C1E" />
                {[[0,0],[0,22],[22,0]].map(([x,y],i)=>(
                  <g key={i}>
                    <rect x={x} y={y} width="7" height="7" fill="white" />
                    <rect x={x+1} y={y+1} width="5" height="5" fill="#1C1C1E" />
                    <rect x={x+2} y={y+2} width="3" height="3" fill="white" />
                  </g>
                ))}
                {Array.from({length:150}).map((_,i)=>{
                  const x=(i*7+3)%29, y=(i*11+2)%29;
                  const inCorner=(x<8&&y<8)||(x>20&&y<8)||(x<8&&y>20);
                  if(inCorner) return null;
                  return <rect key={i} x={x} y={y} width="1" height="1" fill="white" />;
                })}
              </svg>
            </div>

            <div style={{ background: "#FAFAF9", borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
              <div className="display" style={{ fontSize: 22, fontWeight: 700, color: "#1C1C1E", letterSpacing: 3 }}>4 7 2 9</div>
              <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 3 }}>Alternativ: Code manuell eingeben</div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontSize: 13, color: "#8A8A8D" }}>Bereits eingecheckt</span>
              <span className="display" style={{ fontSize: 16, fontWeight: 700, color: "#16A34A" }}>
                {aktuelle.anwesend} von {aktuelle.erwartet}
              </span>
            </div>

            <button
              onClick={() => setQrOffen(false)}
              style={{ width: "100%", background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
            >
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* Teilnehmerliste */}
      {detail && (
        <div onClick={() => setDetail(null)} style={{ position: "fixed", inset: 0, background: "rgba(28,28,30,0.35)", zIndex: 100, display: "flex", justifyContent: "flex-end" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#FAFAF9", width: 520, height: "100%", overflow: "auto", borderLeft: "1px solid #EDEDEB" }}>

            <div style={{ background: "#1C1C1E", padding: "28px 30px", color: "white" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 11.5, color: "#D4AF37", letterSpacing: 1, fontWeight: 600 }}>THEMA {detail.themaNr}</div>
                  <h2 className="display" style={{ fontSize: 20, fontWeight: 600, marginTop: 5 }}>{detail.thema}</h2>
                  <div style={{ fontSize: 12.5, color: "#8A8A8D", marginTop: 5 }}>
                    {kurs.name} · {detail.datum} · {detail.lehrer}
                  </div>
                </div>
                <div onClick={() => setDetail(null)} style={{ cursor: "pointer", fontSize: 20, color: "#8A8A8D" }}>×</div>
              </div>
            </div>

            <div style={{ padding: "24px 30px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Anwesend", wert: teilnehmer.filter(t => t.status === "Anwesend").length, color: "#16A34A" },
                  { label: "Verspätet", wert: teilnehmer.filter(t => t.status === "Verspätet").length, color: "#B8860B" },
                  { label: "Fehlt", wert: teilnehmer.filter(t => t.status === "Fehlt").length, color: "#DC2626" },
                ].map((k) => (
                  <div key={k.label} style={{ background: "white", borderRadius: 9, padding: "16px 18px", border: "1px solid #EDEDEB", borderLeft: `3px solid ${k.color}` }}>
                    <div className="display" style={{ fontSize: 21, fontWeight: 700, color: k.color }}>{k.wert}</div>
                    <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 3 }}>{k.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: "white", borderRadius: 10, padding: 22, border: "1px solid #EDEDEB", marginBottom: 16 }}>
                <h3 className="display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#1C1C1E" }}>Teilnehmerliste</h3>
                {teilnehmer.map((t) => {
                  const ast = anwesenheitStyle(t.status);
                  return (
                    <div key={t.kundennr} style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F2F2F0", gap: 14 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#F5F5F4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#1C1C1E" }}>
                        {t.name.split(" ").map(w => w[0]).join("")}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: "#1C1C1E" }}>{t.name}</div>
                        <div style={{ fontSize: 11.5, color: "#8A8A8D", marginTop: 2 }}>{t.kundennr}</div>
                      </div>
                      {t.zeit !== "—" && (
                        <span className="display" style={{ fontSize: 12.5, color: "#8A8A8D" }}>{t.zeit}</span>
                      )}
                      <span style={{ background: ast.bg, color: ast.color, borderRadius: 6, padding: "4px 11px", fontSize: 11.5, fontWeight: 500 }}>
                        {t.status}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Bestätigung durch Fahrlehrer */}
              <div style={{ background: "#FDF4E3", borderRadius: 10, padding: "16px 20px", marginBottom: 20, borderLeft: "3px solid #D4AF37" }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#B8860B", marginBottom: 4 }}>Bestätigung ausstehend</div>
                <div style={{ fontSize: 12.5, color: "#1C1C1E", lineHeight: 1.5 }}>
                  Der Fahrlehrer bestätigt die Anwesenheitsliste nach Ende der Einheit. Erst danach gilt der Nachweis als erbracht.
                </div>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button style={{ flex: 1, background: "#1C1C1E", color: "white", border: "none", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Liste bestätigen</button>
                <button style={{ flex: 1, background: "white", color: "#1C1C1E", border: "1px solid #EDEDEB", borderRadius: 8, padding: "12px", fontSize: 13.5, fontWeight: 500, cursor: "pointer" }}>Manuell nachtragen</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}