import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { BOOKING_EMAIL, SLOT_DURATION_MINUTES } from "@/lib/calendar-config";
import { createBookingToken, type BookingData } from "@/lib/booking-token";

/* ============================================
   API-Route: Terminanfrage

   POST /api/calendar/book
   Body: { date, time, name, email, phone?, message? }

   Ablauf:
   1. Anfrage validieren
   2. Sicheren Bestätigungslink für Lars erstellen
   3. Benachrichtigung an Lars mit Bestätigungs-Button
   4. Eingangsbestätigung an Buchenden (noch kein ICS)
      → ICS kommt nach Lars' Bestätigung via /api/calendar/confirm
   ============================================ */

interface BookingRequest {
  date: string;
  time: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.ok-ai.de";

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();

    /* Pflichtfelder prüfen */
    if (!body.date || !body.time || !body.name || !body.email) {
      return NextResponse.json(
        { error: "Bitte alle Pflichtfelder ausfüllen." },
        { status: 400 }
      );
    }

    /* E-Mail-Format prüfen */
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Bitte eine gültige E-Mail-Adresse eingeben." },
        { status: 400 }
      );
    }

    /* Termin-Details berechnen */
    const [year, month, day] = body.date.split("-").map(Number);
    const [hours, minutes] = body.time.split(":").map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

    const datum = `${day}.${month}.${year}`;
    const zeit = `${body.time} – ${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")} Uhr`;

    /* Sicheren Bestätigungstoken erstellen */
    const bookingData: BookingData = {
      date: body.date,
      time: body.time,
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
      datum,
      zeit,
    };
    const token = createBookingToken(bookingData);
    const confirmUrl = `${BASE_URL}/termin-bestaetigen?token=${token}`;

    /* Mail an Lars – mit Bestätigungs-Button */
    const adminText = [
      `Neue Terminanfrage`,
      ``,
      `Name:       ${body.name}`,
      `E-Mail:     ${body.email}`,
      `Telefon:    ${body.phone || "nicht angegeben"}`,
      `Datum:      ${datum}`,
      `Zeit:       ${zeit}`,
      body.message ? `Nachricht:  ${body.message}` : ``,
      ``,
      `════════════════════════════════════`,
      `Termin bestätigen (Kalendereinladung wird automatisch gesendet):`,
      ``,
      confirmUrl,
      `════════════════════════════════════`,
    ].filter(Boolean).join("\n");

    /* Eingangsbestätigung an Buchenden */
    const bookerText = [
      `Hallo ${body.name},`,
      ``,
      `vielen Dank für deine Terminanfrage. Ich habe sie erhalten und bestätige dir gleich.`,
      ``,
      `Deine Anfrage:`,
      `Datum:   ${datum}`,
      `Zeit:    ${zeit}`,
      ``,
      `Nach der Bestätigung bekommst du automatisch eine Kalendereinladung – `,
      `damit trägst du den Termin mit einem Klick in Apple Kalender, Google Calendar`,
      `oder Outlook ein.`,
      ``,
      `Bis gleich,`,
      `Lars-Oliver Fiëck`,
      `OKAI – KI-Beratung für KMU`,
      `hallo@ok-ai.de · www.ok-ai.de`,
    ].join("\n");

    if (resend) {
      /* 1. Benachrichtigung an Lars */
      await resend.emails.send({
        from: "OKAI Terminbuchung <hallo@ok-ai.de>",
        to: BOOKING_EMAIL,
        subject: `Terminanfrage: ${body.name} – ${datum} ${body.time} Uhr`,
        text: adminText,
      });

      /* 2. Eingangsbestätigung an Buchenden */
      await resend.emails.send({
        from: "Lars-Oliver Fiëck | OKAI <hallo@ok-ai.de>",
        to: body.email,
        subject: `Deine Terminanfrage bei OKAI – ${datum}`,
        text: bookerText,
      });

      console.log(`[Book] Anfrage registriert: ${body.name} am ${datum} ${body.time}`);
    } else {
      console.log("=== TERMINANFRAGE (kein Resend-Key) ===");
      console.log(adminText);
    }

    return NextResponse.json({
      success: true,
      message: "Terminanfrage erfolgreich gesendet.",
      details: { datum, zeit },
    });
  } catch (error) {
    console.error("Buchungsfehler:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
