/* ============================================
   Booking Token – sichere Bestätigungslinks

   Erstellt und verifiziert HMAC-signierte Tokens
   für die Terminbestätigung. Kein Datenbank nötig –
   alle Buchungsdaten stecken im Token selbst.
   ============================================ */

import crypto from "crypto";

export interface BookingData {
  date: string;    // "2026-04-27"
  time: string;    // "09:15"
  name: string;
  email: string;
  phone?: string;
  message?: string;
  datum: string;   // "27.4.2026" (formatiert)
  zeit: string;    // "09:15 – 09:45 Uhr" (formatiert)
}

/* Geheimnis für die Signierung – nutzt RESEND_API_KEY als Fallback */
function getSecret(): string {
  return process.env.BOOKING_SECRET || process.env.RESEND_API_KEY || "dev-fallback-secret";
}

/* Token erstellen: Daten base64url-kodiert + HMAC-Signatur */
export function createBookingToken(data: BookingData): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

/* Token prüfen und Daten zurückgeben – null bei ungültigem Token */
export function verifyBookingToken(token: string): BookingData | null {
  try {
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return null;

    const payload = token.slice(0, dotIndex);
    const signature = token.slice(dotIndex + 1);

    const expectedSig = crypto
      .createHmac("sha256", getSecret())
      .update(payload)
      .digest("base64url");

    /* Konstant-Zeit-Vergleich gegen Timing-Angriffe */
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    return JSON.parse(Buffer.from(payload, "base64url").toString()) as BookingData;
  } catch {
    return null;
  }
}
