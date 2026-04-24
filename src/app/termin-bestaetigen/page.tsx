"use client";

/* ============================================
   Bestätigungsseite für Lars

   URL: /termin-bestaetigen?token=...
   Diese Seite ist nur für Lars – er bekommt
   den Link per E-Mail und bestätigt hier den Termin.
   ============================================ */

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

/* Token-Payload client-seitig dekodieren (nur zur Anzeige, keine Verifikation) */
function decodeTokenPayload(token: string): Record<string, string> | null {
  try {
    const payload = token.slice(0, token.lastIndexOf("."));
    // base64url → base64 → JSON
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

function BestaetigenContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const booking = token ? decodeTokenPayload(token) : null;

  async function handleConfirm() {
    setStatus("loading");
    try {
      const res = await fetch("/api/calendar/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.error || "Unbekannter Fehler.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Netzwerkfehler. Bitte Seite neu laden und erneut versuchen.");
      setStatus("error");
    }
  }

  if (!token || !booking) {
    return (
      <div style={styles.page}>
        <p style={styles.eyebrow}>OKAI · Terminbuchung</p>
        <h1 style={styles.h1}>Ungültiger Link</h1>
        <p style={{ color: "#7A7872" }}>Dieser Bestätigungslink ist nicht gültig oder wurde bereits verwendet.</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <p style={styles.eyebrow}>OKAI · Terminbestätigung</p>
      <h1 style={styles.h1}>Termin bestätigen</h1>
      <p style={{ color: "#7A7872", marginBottom: "40px", fontSize: "16px" }}>
        Nach der Bestätigung bekommt der Buchende automatisch eine Kalendereinladung
        mit Erinnerungen per E-Mail.
      </p>

      {/* Buchungsdetails */}
      <div style={styles.card}>
        <Row label="Name" value={booking.name} />
        <Row label="E-Mail" value={booking.email} />
        <Row label="Datum" value={booking.datum} />
        <Row label="Zeit" value={booking.zeit} />
        {booking.phone && <Row label="Telefon" value={booking.phone} />}
        {booking.message && <Row label="Nachricht" value={booking.message} />}
      </div>

      {/* Aktions-Bereich */}
      {status === "idle" && (
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button onClick={handleConfirm} style={styles.btnPrimary}>
            Termin bestätigen →
          </button>
        </div>
      )}

      {status === "loading" && (
        <p style={{ color: "#7A7872", fontSize: "15px" }}>Wird bestätigt und Einladung wird gesendet…</p>
      )}

      {status === "success" && (
        <div style={styles.success}>
          <strong>Termin bestätigt.</strong>
          <br />
          Kalendereinladung mit Erinnerungen wurde an <strong>{booking.email}</strong> gesendet.
          Du bekommst ebenfalls eine Kopie mit der .ics-Datei.
        </div>
      )}

      {status === "error" && (
        <div style={styles.errorBox}>
          <strong>Fehler:</strong> {errorMsg}
        </div>
      )}
    </div>
  );
}

/* Kleine Hilfs-Komponente für Zeilen in der Detail-Box */
function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: "flex", gap: "20px", padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <span style={{ color: "#7A7872", fontSize: "14px", minWidth: "80px", flexShrink: 0 }}>{label}</span>
      <span style={{ fontWeight: 500, fontSize: "15px", wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

/* Inline-Styles im OKAI Corporate Design */
const styles = {
  page: {
    padding: "64px 32px",
    maxWidth: "640px",
    margin: "0 auto",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#000",
    WebkitFontSmoothing: "antialiased",
  } as React.CSSProperties,

  eyebrow: {
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.14em",
    color: "#EF646E",
    margin: "0 0 16px",
  },

  h1: {
    fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    margin: "0 0 12px",
    lineHeight: 1.15,
  },

  card: {
    background: "#F5F4F0",
    borderLeft: "3px solid #EF646E",
    borderRadius: "0 14px 14px 0",
    padding: "4px 28px 4px",
    marginBottom: "36px",
  },

  btnPrimary: {
    background: "#EF646E",
    color: "#fff",
    border: "none",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: 600,
    borderRadius: "0 10px 10px 0",
    cursor: "pointer",
    letterSpacing: "-0.01em",
  } as React.CSSProperties,

  success: {
    background: "#F0FBF0",
    borderLeft: "3px solid #4CAF50",
    borderRadius: "0 12px 12px 0",
    padding: "20px 24px",
    color: "#2E7D32",
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
    <Suspense fallback={
      <div style={{ padding: "64px 32px", fontFamily: "Inter, sans-serif", color: "#7A7872" }}>
        Laden…
      </div>
    }>
      <BestaetigenContent />
    </Suspense>
  );
}
