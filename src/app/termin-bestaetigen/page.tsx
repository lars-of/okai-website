"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

/* ============================================
   Bestätigungs- und Ablehnungsseite für Lars

   URL: /termin-bestaetigen?token=...
         /termin-bestaetigen?token=...&action=ablehnen
   ============================================ */

function decodePayload(token: string): Record<string, string> | null {
  try {
    const payload = token.slice(0, token.lastIndexOf("."));
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch { return null; }
}

type Mode = "idle" | "declining" | "loading" | "confirmed" | "declined" | "error";

function BestaetigenContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const startAction = searchParams.get("action") === "ablehnen" ? "declining" : "idle";

  const [mode, setMode] = useState<Mode>(startAction);
  const [alternative, setAlternative] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const booking = token ? decodePayload(token) : null;

  async function handleConfirm() {
    setMode("loading");
    try {
      const res = await fetch("/api/calendar/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) { setMode("confirmed"); }
      else { setErrorMsg(data.error || "Fehler."); setMode("error"); }
    } catch {
      setErrorMsg("Netzwerkfehler. Seite neu laden und erneut versuchen.");
      setMode("error");
    }
  }

  async function handleDecline() {
    setMode("loading");
    try {
      const res = await fetch("/api/calendar/decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, alternative: alternative.trim() || undefined }),
      });
      const data = await res.json();
      if (data.success) { setMode("declined"); }
      else { setErrorMsg(data.error || "Fehler."); setMode("error"); }
    } catch {
      setErrorMsg("Netzwerkfehler. Seite neu laden und erneut versuchen.");
      setMode("error");
    }
  }

  if (!token || !booking) {
    return (
      <div style={s.page}>
        <p style={s.eyebrow}>OKAI · Terminbuchung</p>
        <h1 style={s.h1}>Ungültiger Link</h1>
        <p style={{ color: "#7A7872" }}>Dieser Link ist nicht gültig.</p>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <p style={s.eyebrow}>OKAI · Terminbuchung</p>
      <h1 style={s.h1}>
        {mode === "declining" ? "Termin ablehnen" : "Terminanfrage"}
      </h1>

      {/* Buchungsdetails */}
      <div style={s.card}>
        {[
          ["Name", booking.name],
          ["E-Mail", booking.email],
          ["Datum", booking.datum],
          ["Zeit", booking.zeit],
          booking.phone ? ["Telefon", booking.phone] : null,
          booking.message ? ["Nachricht", booking.message] : null,
        ].filter(Boolean).map(([label, value]) => (
          <div key={label} style={s.row}>
            <span style={s.rowLabel}>{label}</span>
            <span style={s.rowValue}>{value}</span>
          </div>
        ))}
      </div>

      {/* Idle: zwei Buttons */}
      {mode === "idle" && (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button onClick={handleConfirm} style={s.btnPrimary}>
            Termin bestätigen →
          </button>
          <button onClick={() => setMode("declining")} style={s.btnSecondary}>
            Termin ablehnen
          </button>
        </div>
      )}

      {/* Decline-Formular */}
      {mode === "declining" && (
        <div>
          <p style={{ color: "#3A3A38", fontSize: "15px", marginBottom: "16px" }}>
            Optional: Alternativtermin vorschlagen (z.B. „Di 28.4. um 13:00 Uhr")
          </p>
          <input
            type="text"
            placeholder="z.B. Dienstag 28.4.2026, 13:00 Uhr"
            value={alternative}
            onChange={e => setAlternative(e.target.value)}
            style={s.input}
          />
          <p style={{ color: "#7A7872", fontSize: "13px", margin: "8px 0 20px" }}>
            Leer lassen wenn du keinen Alternativtermin anbieten möchtest. Der Buchende bekommt dann nur den Link zum Kalender.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={handleDecline} style={s.btnDanger}>
              Ablehnung absenden →
            </button>
            <button onClick={() => setMode("idle")} style={s.btnSecondary}>
              Zurück
            </button>
          </div>
        </div>
      )}

      {mode === "loading" && (
        <p style={{ color: "#7A7872", fontSize: "15px" }}>Wird gesendet…</p>
      )}

      {mode === "confirmed" && (
        <div style={s.successBox}>
          <strong>Termin bestätigt.</strong><br />
          Kalendereinladung wurde an <strong>{booking.email}</strong> gesendet.
          Du bekommst ebenfalls eine ICS-Kopie.
        </div>
      )}

      {mode === "declined" && (
        <div style={s.warningBox}>
          <strong>Ablehnung gesendet.</strong><br />
          {booking.name} wurde informiert
          {alternative ? ` und dein Alternativtermin (${alternative}) mitgeteilt` : ""}.
        </div>
      )}

      {mode === "error" && (
        <div style={s.errorBox}>
          <strong>Fehler:</strong> {errorMsg}
        </div>
      )}
    </div>
  );
}

const s = {
  page: {
    padding: "64px 32px",
    maxWidth: "640px",
    margin: "0 auto",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, Arial, sans-serif",
    color: "#000",
    WebkitFontSmoothing: "antialiased",
  } as React.CSSProperties,
  eyebrow: {
    margin: "0 0 12px",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.14em",
    color: "#EF646E",
  },
  h1: {
    margin: "0 0 32px",
    fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    lineHeight: 1.15,
  },
  card: {
    background: "#F5F4F0",
    borderLeft: "3px solid #EF646E",
    borderRadius: "0 12px 12px 0",
    padding: "8px 24px",
    marginBottom: "32px",
  },
  row: {
    display: "flex",
    gap: "20px",
    padding: "10px 0",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },
  rowLabel: {
    color: "#7A7872",
    fontSize: "13px",
    minWidth: "80px",
    flexShrink: 0,
  } as React.CSSProperties,
  rowValue: {
    fontWeight: 500,
    fontSize: "15px",
    wordBreak: "break-word",
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "1px solid #CEC9BE",
    borderRadius: "0 8px 8px 0",
    fontFamily: "Inter, Arial, sans-serif",
    color: "#000",
    boxSizing: "border-box",
  } as React.CSSProperties,
  btnPrimary: {
    background: "#EF646E",
    color: "#fff",
    border: "none",
    padding: "15px 28px",
    fontSize: "15px",
    fontWeight: 700,
    borderRadius: "0 10px 10px 0",
    cursor: "pointer",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,
  btnSecondary: {
    background: "#F0EFEC",
    color: "#3A3A38",
    border: "1px solid #CEC9BE",
    padding: "14px 24px",
    fontSize: "14px",
    fontWeight: 600,
    borderRadius: "0 10px 10px 0",
    cursor: "pointer",
  } as React.CSSProperties,
  btnDanger: {
    background: "#3A3A38",
    color: "#fff",
    border: "none",
    padding: "15px 28px",
    fontSize: "15px",
    fontWeight: 700,
    borderRadius: "0 10px 10px 0",
    cursor: "pointer",
  } as React.CSSProperties,
  successBox: {
    background: "#F0FBF0",
    borderLeft: "3px solid #4CAF50",
    borderRadius: "0 12px 12px 0",
    padding: "20px 24px",
    color: "#2E7D32",
    lineHeight: 1.6,
    fontSize: "15px",
  },
  warningBox: {
    background: "#FFF8E1",
    borderLeft: "3px solid #F5C06B",
    borderRadius: "0 12px 12px 0",
    padding: "20px 24px",
    color: "#7A5A00",
    lineHeight: 1.6,
    fontSize: "15px",
  },
  errorBox: {
    background: "#FFF0F0",
    borderLeft: "3px solid #EF646E",
    borderRadius: "0 12px 12px 0",
    padding: "20px 24px",
    color: "#C62828",
    fontSize: "15px",
  },
} as const;

export default function BestaetigenPage() {
  return (
    <Suspense fallback={<div style={{ padding: "64px 32px", fontFamily: "Inter, sans-serif", color: "#7A7872" }}>Laden…</div>}>
      <BestaetigenContent />
    </Suspense>
  );
}
