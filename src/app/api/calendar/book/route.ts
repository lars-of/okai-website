import { NextRequest, NextResponse } from "next/server";
import { BOOKING_EMAIL, SLOT_DURATION_MINUTES } from "@/lib/calendar-config";

/* ============================================
   API-Route: Terminbuchung

   POST /api/calendar/book
   Body: { date, time, name, email, phone?, message? }

   Aktuell: Speichert die Buchung und gibt eine
   Bestätigung zurück. E-Mail-Versand kann später
   über einen Dienst wie Resend/SendGrid ergänzt werden.
   ============================================ */

interface BookingRequest {
  date: string;      // "2026-04-15"
  time: string;      // "10:00"
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

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
    if (!body.email.includes("@")) {
      return NextResponse.json(
        { error: "Bitte eine gültige E-Mail-Adresse eingeben." },
        { status: 400 }
      );
    }

    /* Termin-Details zusammenstellen */
    const [year, month, day] = body.date.split("-").map(Number);
    const [hours, minutes] = body.time.split(":").map(Number);
    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);

    const bookingDetails = {
      datum: `${day}.${month}.${year}`,
      zeit: `${body.time} – ${endDate.getHours().toString().padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")} Uhr`,
      name: body.name,
      email: body.email,
      telefon: body.phone || "nicht angegeben",
      nachricht: body.message || "keine",
      benachrichtigung_an: BOOKING_EMAIL,
    };

    /* Logging (in Produktion durch E-Mail-Versand ersetzen)
       ---------------------------------------------------
       Um E-Mail-Versand zu aktivieren:
       1. npm install resend
       2. RESEND_API_KEY in .env.local setzen
       3. Den Kommentar unten entfernen

       import { Resend } from 'resend';
       const resend = new Resend(process.env.RESEND_API_KEY);
       await resend.emails.send({
         from: 'OKAI Terminbuchung <noreply@ok-ai.de>',
         to: BOOKING_EMAIL,
         subject: `Neue Terminanfrage: ${bookingDetails.name} am ${bookingDetails.datum}`,
         text: `
           Neue Terminanfrage über die OKAI Website:

           Datum: ${bookingDetails.datum}
           Zeit: ${bookingDetails.zeit}
           Name: ${bookingDetails.name}
           E-Mail: ${bookingDetails.email}
           Telefon: ${bookingDetails.telefon}
           Nachricht: ${bookingDetails.nachricht}
         `,
       });
    */

    console.log("=== NEUE TERMINANFRAGE ===");
    console.log(JSON.stringify(bookingDetails, null, 2));
    console.log("==========================");

    return NextResponse.json({
      success: true,
      message: "Terminanfrage erfolgreich gesendet.",
      details: {
        datum: bookingDetails.datum,
        zeit: bookingDetails.zeit,
      },
    });
  } catch (error) {
    console.error("Buchungsfehler:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}
