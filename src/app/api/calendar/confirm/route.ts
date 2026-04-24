import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyBookingToken } from "@/lib/booking-token";
import { generateICS, getGoogleCalendarLink, getOutlookLink } from "@/lib/ics";
import { bookerConfirmationEmail, adminNotificationEmail } from "@/lib/email-html";
import { BOOKING_EMAIL, SLOT_DURATION_MINUTES } from "@/lib/calendar-config";
import { createBookingToken } from "@/lib/booking-token";

/* ============================================
   API-Route: Terminbestätigung

   POST /api/calendar/confirm
   Body: { token: string }

   1. Token prüfen
   2. ICS-Datei generieren
   3. HTML-Bestätigungsmail + ICS-Anhang an Buchenden
   4. ICS-Kopie an Lars
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
        { error: "Ungültiger Bestätigungslink." },
        { status: 400 }
      );
    }

    /* Datum rekonstruieren */
    const [year, month, day] = booking.date.split("-").map(Number);
    const [hours, minutes] = booking.time.split(":").map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes);

    const title = `Gespräch mit Lars-Oliver Fiëck | OKAI`;
    const description = `Bestätigter Termin mit OKAI – KI-Beratung für KMU.\n\nBei Fragen: hallo@ok-ai.de`;

    /* ICS generieren */
    const icsContent = generateICS({
      title,
      description,
      startDate,
      durationMinutes: SLOT_DURATION_MINUTES,
      organizerName: "Lars-Oliver Fiëck | OKAI",
      organizerEmail: "hallo@ok-ai.de",
      attendeeEmail: booking.email,
      attendeeName: booking.name,
    });

    /* Kalender-Links */
    const googleLink = getGoogleCalendarLink({ title, description, startDate, durationMinutes: SLOT_DURATION_MINUTES });
    const outlookLink = getOutlookLink({ title, description, startDate, durationMinutes: SLOT_DURATION_MINUTES });

    /* Absage-Link für den Buchenden */
    const cancelToken = createBookingToken(booking); // gleicher Token, anderer Endpunkt
    const cancelUrl = `${BASE_URL}/termin-absagen?token=${cancelToken}`;

    /* HTML-Bestätigungsmail */
    const bookerHtml = bookerConfirmationEmail({
      name: booking.name,
      datum: booking.datum,
      zeit: booking.zeit,
      googleLink,
      outlookLink,
      cancelUrl,
    });

    const icsAttachment = {
      filename: "okai-termin.ics",
      content: Buffer.from(icsContent),
    };

    if (resend) {
      /* 1. Bestätigung an Buchenden */
      await resend.emails.send({
        from: "Lars-Oliver Fiëck | OKAI <hallo@ok-ai.de>",
        to: booking.email,
        subject: `Bestätigt: Dein OKAI-Termin am ${booking.datum}`,
        html: bookerHtml,
        attachments: [icsAttachment],
      });

      /* 2. ICS-Kopie an Lars */
      await resend.emails.send({
        from: "OKAI System <hallo@ok-ai.de>",
        to: BOOKING_EMAIL,
        subject: `✓ Bestätigt: ${booking.name} – ${booking.datum} ${booking.time} Uhr`,
        html: adminNotificationEmail({
          name: booking.name,
          email: booking.email,
          phone: booking.phone || "",
          datum: booking.datum,
          zeit: booking.zeit,
          message: booking.message || "",
          confirmUrl: "", // schon bestätigt
          declineUrl: "",
        }).replace("Neue Buchungsanfrage", "Termin bestätigt – Kalendereinladung gesendet")
          .replace(/Termin bestätigen.*?ablehnen.*?<\/table>/s, ""),
        attachments: [icsAttachment],
      });

      console.log(`[Confirm] Bestätigt: ${booking.name} am ${booking.datum}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bestätigungsfehler:", error);
    return NextResponse.json(
      { error: "Fehler bei der Bestätigung." },
      { status: 500 }
    );
  }
}
