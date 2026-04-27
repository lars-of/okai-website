import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyBookingToken } from "@/lib/booking-token";
import { bookerCancellationConfirmEmail, adminCancellationEmail } from "@/lib/email-html";
import { BOOKING_EMAIL } from "@/lib/calendar-config";

/* ============================================
   API-Route: Terminabsage durch Buchenden

   POST /api/calendar/cancel
   Body: { token: string }

   1. Token prüfen
   2. Absage-Bestätigung an Buchenden
   3. Absage-Benachrichtigung an Lars
   ============================================ */

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.ok-ai.de";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    /* Token prüfen */
    const booking = verifyBookingToken(token);
    if (!booking) {
      return NextResponse.json(
        { error: "Ungültiger Absage-Link." },
        { status: 400 }
      );
    }

    const rebookUrl = `${BASE_URL}/#kalender`;

    /* HTML-Mails */
    const bookerHtml = bookerCancellationConfirmEmail({
      name: booking.name,
      datum: booking.datum,
      zeit: booking.zeit,
      rebookUrl,
    });

    const adminHtml = adminCancellationEmail({
      name: booking.name,
      email: booking.email,
      datum: booking.datum,
      zeit: booking.zeit,
    });

    if (resend) {
      /* 1. Bestätigung an Buchenden */
      await resend.emails.send({
        from: "OKAI <hallo@ok-ai.de>",
        to: booking.email,
        subject: `Absage bestaetigt - OKAI-Termin am ${booking.datum}`,
        html: bookerHtml,
      });

      /* 2. Benachrichtigung an Lars */
      await resend.emails.send({
        from: "OKAI System <hallo@ok-ai.de>",
        to: BOOKING_EMAIL,
        subject: `Absage: ${booking.name} - ${booking.datum} ${booking.time} Uhr`,
        html: adminHtml,
      });

      console.log(`[Cancel] Abgesagt: ${booking.name} am ${booking.datum}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Absagefehler:", error);
    return NextResponse.json(
      { error: "Fehler. Bitte erneut versuchen." },
      { status: 500 }
    );
  }
}
