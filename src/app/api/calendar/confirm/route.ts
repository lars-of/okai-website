import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { verifyBookingToken } from "@/lib/booking-token";
import { generateICS, getGoogleCalendarLink, getOutlookLink } from "@/lib/ics";
import { BOOKING_EMAIL, SLOT_DURATION_MINUTES } from "@/lib/calendar-config";

/* ============================================
   API-Route: Terminbestätigung

   POST /api/calendar/confirm
   Body: { token: string }

   1. Token prüfen (HMAC-Signatur)
   2. Bestätigungsmail mit ICS an Buchenden senden
   3. Kopie mit ICS an Lars senden
   ============================================ */

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    /* Token prüfen */
    const booking = verifyBookingToken(token);
    if (!booking) {
      return NextResponse.json(
        { error: "Ungültiger oder bereits verwendeter Bestätigungslink." },
        { status: 400 }
      );
    }

    /* Datum-Objekt aus den gespeicherten Strings rekonstruieren */
    const [year, month, day] = booking.date.split("-").map(Number);
    const [hours, minutes] = booking.time.split(":").map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes);

    const title = `Gespräch mit Lars-Oliver Fiëck | OKAI`;
    const description = [
      `Bestätigter Termin mit OKAI – KI-Beratung für KMU.`,
      ``,
      `Bei Fragen: hallo@ok-ai.de`,
      `Telefon: +49 172 292 888 1`,
      `Website: www.ok-ai.de`,
    ].join("\n");

    /* ICS-Datei generieren */
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

    /* Bestätigungsmail an den Buchenden */
    const confirmationText = [
      `Hallo ${booking.name},`,
      ``,
      `dein Termin mit Lars-Oliver Fiëck | OKAI ist bestätigt.`,
      ``,
      `Datum:   ${booking.datum}`,
      `Zeit:    ${booking.zeit}`,
      ``,
      `────────────────────────────────────`,
      `Termin in den Kalender eintragen:`,
      ``,
      `Google Calendar:`,
      googleLink,
      ``,
      `Outlook / Microsoft 365:`,
      outlookLink,
      ``,
      `Apple Kalender & alle anderen:`,
      `Öffne die beigefügte Datei „okai-termin.ics" – sie wird automatisch`,
      `in deinen Kalender eingetragen.`,
      ``,
      `Die Erinnerungen (12 Stunden und 1 Stunde vorher) sind bereits eingebaut.`,
      `────────────────────────────────────`,
      ``,
      `Fragen oder Terminänderung?`,
      `Antworte einfach auf diese Mail oder ruf an: +49 172 292 888 1`,
      ``,
      `Bis bald,`,
      `Lars-Oliver Fiëck`,
      `OKAI – KI-Beratung für KMU`,
      `hallo@ok-ai.de · www.ok-ai.de`,
    ].join("\n");

    const icsAttachment = {
      filename: "okai-termin.ics",
      content: Buffer.from(icsContent),
    };

    if (resend) {
      /* 1. Bestätigung mit ICS an Buchenden */
      await resend.emails.send({
        from: "Lars-Oliver Fiëck | OKAI <hallo@ok-ai.de>",
        to: booking.email,
        subject: `Bestätigt: Dein OKAI-Termin am ${booking.datum}`,
        text: confirmationText,
        attachments: [icsAttachment],
      });

      /* 2. Kopie mit ICS an Lars (für seinen Kalender) */
      await resend.emails.send({
        from: "OKAI System <hallo@ok-ai.de>",
        to: BOOKING_EMAIL,
        subject: `✓ Termin bestätigt: ${booking.name} am ${booking.datum} – ${booking.time} Uhr`,
        text: [
          `Termin bestätigt. Kalendereinladung wurde gesendet.`,
          ``,
          `Name:      ${booking.name}`,
          `E-Mail:    ${booking.email}`,
          `Telefon:   ${booking.phone || "nicht angegeben"}`,
          `Datum:     ${booking.datum}`,
          `Zeit:      ${booking.zeit}`,
          booking.message ? `\nNachricht: ${booking.message}` : ``,
        ].join("\n"),
        attachments: [icsAttachment],
      });

      console.log(`[Confirm] Termin bestätigt: ${booking.name} am ${booking.datum}`);
    } else {
      console.log(`[Confirm] Kein Resend-Key – würde bestätigen: ${booking.name} am ${booking.datum}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Bestätigungsfehler:", error);
    return NextResponse.json(
      { error: "Fehler bei der Bestätigung. Bitte erneut versuchen." },
      { status: 500 }
    );
  }
}
