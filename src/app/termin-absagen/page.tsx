"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

/* ============================================
   Absage-Seite für Buchende

   URL: /termin-absagen?token=...
   Buchende können ihren bestätigten Termin hier absagen.
   ============================================ */

function decodePayload(token: string): Record<string, string> | null {
  try {
    const payload = token.slice(0, token.lastIndexOf("."));
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch { return null; }
}

function AbsagenContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const booking = token ? decodePayload(token) : null;

  async function handleCancel() {
    setStatus("loading");
    try {
      const res = await fetch("/api/calendar/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) { setStatus("done"); }
      else { setErrorMsg(data.error || "Fehler."); setStatus("error"); }
    } catch {
      setErrorMsg("Netzwerkfehler. Seite neu laden und erneut versuchen.");
      setStatus("error");
    }
  }

  if (!token || !booking) {
    return (
      <div style={s.page}>
        <p style={s.eyebrow}>OKAI · Terminabsage</p>
        <h1 style={s.h1}>Ungültiger Link</h1>
        <p style={{ color: "#7A7872" }}>Dieser Absage-Link ist nicht gültig.</p>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <p style={s.eyebrow}>OKAI · Terminabsage</p>

      {status !== "done" && (
        <>
          <h1 style={s.h1}>Termin absagen</h1>
          <p style={{ color: "#3A3A38", fontSize: "15px", marginBottom: "28px", lineHeight: 1.6 }}>
            Kein Problem – sag einfach kurz ab. Du kannst danach jederzeit einen neuen Termin buchen.
          </p>

          <div style={s.card}>
            {[
              ["Datum", booking.datum],
              ["Zeit", booking.zeit],
            ].map(([label, value]) => (
              <div key={label} style={s.row}>
                <span style={s.rowLabel}>{label}</span>
                <span style={s.rowValue}>{value}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {status === "idle" && (
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button onClick={handleCancel} style={s.btnDanger}>
            Ja, Termin absagen →
          </button>
          <a href="https://www.ok-ai.de" style={s.btnSecondary}>
            Doch nicht absagen
          </a>
        </div>
      )}

      {status === "loading" && (
        <p style={{ color: "#7A7872", fontSize: "15px" }}>Absage wird gesendet…</p>
      )}

      {status === "done" && (
        <div>
          <h1 style={s.h1}>Absage bestätigt.</h1>
          <p style={{ color: "#3A3A38", fontSize: "15px", lineHeight: 1.65, marginBottom: "28px" }}>
            Dein Termin am <strong>{booking.datum}</strong> um <strong>{booking.zeit}</strong> wurde abgesagt.
            Du bekommst gleich eine Bestätigungsmail.
          </p>
          <a href="https://www.ok-ai.de/#kalender" style={s.btnPrimary}>
            Neuen Termin buchen →
          </a>
        </div>
      )}

      {status === "error" && (
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
    maxWidth: "580px",
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
    margin: "0 0 16px",
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
    minWidth: "60px",
    flexShrink: 0,
  } as React.CSSProperties,
  rowValue: {
    fontWeight: 500,
    fontSize: "15px",
  } as React.CSSProperties,
  btnPrimary: {
    display: "inline-block",
    background: "#EF646E",
    color: "#fff",
    textDecoration: "none",
    padding: "15px 28px",
    fontSize: "15px",
    fontWeight: 700,
    borderRadius: "0 10px 10px 0",
    letterSpacing: "-0.01em",
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
  btnSecondary: {
    display: "inline-block",
    background: "#F0EFEC",
    color: "#3A3A38",
    textDecoration: "none",
    border: "1px solid #CEC9BE",
    padding: "14px 24px",
    fontSize: "14px",
    fontWeight: 600,
    borderRadius: "0 10px 10px 0",
  } as React.CSSProperties,
  errorBox: {
    background: "#FFF0F0",
    borderLeft: "3px solid #EF646E",
    borderRadius: "0 12px 12px 0",
    padding: "20px 24px",
    color: "#C62828",
    fontSize: "15px",
  },
} as const;

export default function AbsagenPage() {
  return (
    <Suspense fallback={<div style={{ padding: "64px 32px", fontFamily: "Inter, sans-serif", color: "#7A7872" }}>Laden…</div>}>
      <AbsagenContent />
    </Suspense>
  );
}
