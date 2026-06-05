"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwort, setPasswort] = useState("");
  const [laden, setLaden] = useState(false);

  const handleLogin = () => {
    setLaden(true);
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      padding: 20,
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "#4f8ef7",
            letterSpacing: -1,
          }}>DriveOS</div>
          <div style={{ color: "#888", fontSize: 14, marginTop: 6 }}>
            Das digitale Fahrschul-System
          </div>
        </div>

        {/* Login Box */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 16,
          padding: 40,
          backdropFilter: "blur(10px)",
        }}>
          <h2 style={{ color: "white", fontSize: 20, fontWeight: 600, marginBottom: 8, marginTop: 0 }}>
            Willkommen zurück
          </h2>
          <p style={{ color: "#888", fontSize: 14, marginBottom: 28, marginTop: 0 }}>
            Melde dich mit deinen Zugangsdaten an.
          </p>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", color: "#ccc", fontSize: 13, marginBottom: 8, fontWeight: 500 }}>
              E-Mail Adresse
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="fahrschule@beispiel.de"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10,
                color: "white",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Passwort */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", color: "#ccc", fontSize: 13, marginBottom: 8, fontWeight: 500 }}>
              Passwort
            </label>
            <input
              type="password"
              value={passwort}
              onChange={(e) => setPasswort(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10,
                color: "white",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "13px",
              background: laden ? "#2a5cd4" : "#4f8ef7",
              color: "white",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 600,
              cursor: laden ? "not-allowed" : "pointer",
              transition: "background 0.2s",
            }}
          >
            {laden ? "Wird angemeldet..." : "Anmelden"}
          </button>

          {/* Passwort vergessen */}
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <span style={{ color: "#4f8ef7", fontSize: 13, cursor: "pointer" }}>
              Passwort vergessen?
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 24, color: "#555", fontSize: 12 }}>
          © 2026 DriveOS · Alle Rechte vorbehalten
        </div>

      </div>
    </div>
  );
}
