import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { BOOKING_EMAIL, SLOT_DURATION_MINUTES } from "@/lib/calendar-config";

/* ============================================
   API-Route: Terminbuchung

   POST /api/calendar/book
   Body: { date, time, name, email, phone?, message? }

   Sendet eine E-Mail-Benachrichtigung über Resend.
   Fallback: Console-Log, falls kein API-Key gesetzt.
   ============================================ */

interface BookingRequest {
  date: string;      // "2026-04-15"
  time: string;      // "10:00"
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

/* Resend-Client – nur initialisieren wenn API-Key vorhanden */
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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

    /* E-Mail-Format prüfen (einfache Validierung) */
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Bitte eine gültige E-Mail-Adresse eingeben." },
        { status: 400 }
      );
    }

    /* Termin-Details zusammenstellen */
    const [year, month, day] = body.date.split("-").map(Number);
    const [hours, minutes] = body.time.split(":").map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(
      startDate.getTime() + SLOT_DURATION_MINUTES * 60 * 1000
    );

    const datum = `${day}.${month}.${year}`;
    const zeit = `${body.time} – ${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")} Uhr`;

    /* E-Mail-Text */
    const emailText = [
      "Neue Terminanfrage über die OKAI Website",
      "",
      `Datum:      ${datum}`,
      `Zeit:       ${zeit}`,
      `Name:       ${body.name}`,
      `E-Mail:     ${body.email}`,
      `Telefon:    ${body.phone || "nicht angegeben"}`,
      `Nachricht:  ${body.message || "keine"}`,
      "",
      "---",
      "Diese E-Mail wurde automatisch von der OKAI Website generiert.",
    ].join("\n");

    /* Bestätigungstext für den Buchenden */
    const confirmationText = [
      `Hallo ${body.name},`,
      "",
      "vielen Dank für deine Terminanfrage. Ich habe sie erhalten und melde mich in Kürze bei dir.",
      "",
      "Dein gebuchter Termin:",
      `Datum:   ${datum}`,
      `Zeit:    ${zeit}`,
      "",
      "Falls du Fragen hast oder den Termin ändern möchtest, antworte einfach auf diese Mail.",
      "",
      "Bis bald,",
      "Lars-Oliver Fiëck",
      "OKAI – KI-Beratung für KMU",
      "hallo@ok-ai.de · www.ok-ai.de",
    ].join("\n");

    /* E-Mail senden (oder Fallback auf Console) */
    if (resend) {
      /* 1. Benachrichtigung an OKAI */
      await resend.emails.send({
        from: "OKAI Terminbuchung <hallo@ok-ai.de>",
        to: BOOKING_EMAIL,
        subject: `Neue Terminanfrage: ${body.name} am ${datum}`,
        text: emailText,
      });

      /* 2. Bestätigung an den Buchenden */
      await resend.emails.send({
        from: "Lars-Oliver Fiëck | OKAI <hallo@ok-ai.de>",
        to: body.email,
        subject: `Deine Terminanfrage bei OKAI – ${datum}`,
        text: confirmationText,
      });

      console.log(`[Booking] E-Mails gesendet: Benachrichtigung an ${BOOKING_EMAIL}, Bestätigung an ${body.email}`);
    } else {
      /* Kein API-Key: Fallback auf Console-Log */
      console.log("=== NEUE TERMINANFRAGE (kein Resend-Key) ===");
      console.log(emailText);
      console.log("=============================================");
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
