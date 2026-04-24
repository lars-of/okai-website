import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyBookingToken } from "@/lib/booking-token";
import { bookerDeclineEmail } from "@/lib/email-html";
import { BOOKING_EMAIL } from "@/lib/calendar-config";

/* ============================================
   API-Route: Terminablehnung

   POST /api/calendar/decline
   Body: { token: string, alternative?: string }

   1. Token prüfen
   2. Ablehnungsmail an Buchenden (mit optionalem Alternativtermin)
   3. Bestätigungs-Notiz an Lars
   ============================================ */

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.ok-ai.de";

export async function POST(request: NextRequest) {
  try {
    const { token, alternative } = await request.json();

    /* Token prüfen */
    const booking = verifyBookingToken(token);
    if (!booking) {
      return NextResponse.json(
        { error: "Ungültiger Link." },
        { status: 400 }
      );
    }

    const rebookUrl = `${BASE_URL}/#kalender`;

    /* HTML-Ablehnungsmail an Buchenden */
    const bookerHtml = bookerDeclineEmail({
      name: booking.name,
      datum: booking.datum,
      zeit: booking.zeit,
      alternative: alternative || undefined,
      rebookUrl,
    });

    if (resend) {
      /* 1. Ablehnung an Buchenden */
      await resend.emails.send({
        from: "Lars-Oliver Fiëck | OKAI <hallo@ok-ai.de>",
        to: booking.email,
        subject: `Zu deiner Terminanfrage bei OKAI – ${booking.datum}`,
        html: bookerHtml,
      });

      /* 2. Notiz an Lars */
      await resend.emails.send({
        from: "OKAI System <hallo@ok-ai.de>",
        to: BOOKING_EMAIL,
        subject: `✗ Abgelehnt: ${booking.name} – ${booking.datum} ${booking.time} Uhr`,
        html: `<p style="font-family:Arial,sans-serif;font-size:15px;">Terminanfrage von <strong>${booking.name}</strong> (${booking.email}) am ${booking.datum} um ${booking.time} Uhr wurde abgelehnt.${alternative ? `<br><br>Vorgeschlagener Alternativtermin: <strong>${alternative}</strong>` : ""}</p>`,
      });

      console.log(`[Decline] Abgelehnt: ${booking.name} am ${booking.datum}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ablehnungsfehler:", error);
    return NextResponse.json(
      { error: "Fehler. Bitte erneut versuchen." },
      { status: 500 }
    );
  }
}
