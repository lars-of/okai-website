import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { BOOKING_EMAIL, SLOT_DURATION_MINUTES } from "@/lib/calendar-config";
import { createBookingToken, type BookingData } from "@/lib/booking-token";
import { adminNotificationEmail } from "@/lib/email-html";

/* ============================================
   API-Route: Terminanfrage

   POST /api/calendar/book
   Body: { date, time, name, email, phone?, message? }

   Was passiert:
   1. Anfrage validieren
   2. Sicheren Bestätigungslink + Ablehnungslink erstellen
   3. HTML-Benachrichtigung an Lars (mit zwei Buttons)
   4. KEINE sofortige Mail an Buchenden
      → Buchende bekommen erst eine Mail wenn Lars bestätigt oder ablehnt
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

    /* Token für Bestätigung + Ablehnung erstellen */
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
    const declineUrl  = `${BASE_URL}/termin-bestaetigen?token=${token}&action=ablehnen`;

    /* HTML-Mail an Lars */
    const adminHtml = adminNotificationEmail({
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      datum,
      zeit,
      message: body.message || "",
      confirmUrl,
      declineUrl,
    });

    if (resend) {
      await resend.emails.send({
        from: "OKAI Terminbuchung <hallo@ok-ai.de>",
        to: BOOKING_EMAIL,
        subject: `Terminanfrage: ${body.name} – ${datum} ${body.time} Uhr`,
        html: adminHtml,
      });

      console.log(`[Book] Anfrage registriert: ${body.name} am ${datum} ${body.time}`);
    } else {
      console.log(`[Book] Kein Resend-Key – Anfrage: ${body.name} am ${datum}`);
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
