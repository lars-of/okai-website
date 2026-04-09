import { NextResponse } from "next/server";
import {
  ICAL_URL,
  BOOKABLE_DAYS,
  TIME_SLOTS_BY_DAY,
  TIME_SLOTS,
  SLOT_DURATION_MINUTES,
  MIN_LEAD_TIME_HOURS,
  MAX_FUTURE_DAYS,
} from "@/lib/calendar-config";

/* ============================================
   API-Route: Freie Termine aus iCal berechnen

   GET /api/calendar
   Gibt ein Array von Tagen mit freien Slots zurück.
   Nutzt wochentag-spezifische Slot-Zeiten.
   ============================================ */

/* Hilfsfunktion: iCal-Datei abrufen und belegte Zeiten extrahieren */
async function fetchBusyTimes(): Promise<{ start: Date; end: Date }[]> {
  try {
    const response = await fetch(ICAL_URL, {
      next: { revalidate: 300 }, // Cache: 5 Minuten
    });

    if (!response.ok) {
      console.error("iCal fetch fehlgeschlagen:", response.status);
      return [];
    }

    const icsText = await response.text();
    const events: { start: Date; end: Date }[] = [];

    /* Einfacher iCal-Parser: VEVENT-Blöcke mit DTSTART/DTEND extrahieren */
    const eventBlocks = icsText.split("BEGIN:VEVENT");

    for (const block of eventBlocks) {
      const dtStartMatch = block.match(/DTSTART[^:]*:(\d{8}T?\d{0,6}Z?)/);
      const dtEndMatch = block.match(/DTEND[^:]*:(\d{8}T?\d{0,6}Z?)/);

      if (dtStartMatch) {
        const start = parseICalDate(dtStartMatch[1]);
        const end = dtEndMatch
          ? parseICalDate(dtEndMatch[1])
          : new Date(start.getTime() + 24 * 60 * 60 * 1000);

        if (start && end) {
          events.push({ start, end });
        }
      }
    }

    return events;
  } catch (error) {
    console.error("Fehler beim Abrufen des Kalenders:", error);
    return [];
  }
}

/* iCal-Datumsformat parsen: 20260408T140000Z oder 20260408 */
function parseICalDate(dateStr: string): Date {
  const clean = dateStr.replace(/[^0-9TZ]/g, "");

  if (clean.length === 8) {
    const year = parseInt(clean.slice(0, 4));
    const month = parseInt(clean.slice(4, 6)) - 1;
    const day = parseInt(clean.slice(6, 8));
    return new Date(year, month, day);
  }

  const year = parseInt(clean.slice(0, 4));
  const month = parseInt(clean.slice(4, 6)) - 1;
  const day = parseInt(clean.slice(6, 8));
  const hour = parseInt(clean.slice(9, 11)) || 0;
  const minute = parseInt(clean.slice(11, 13)) || 0;

  if (clean.endsWith("Z")) {
    return new Date(Date.UTC(year, month, day, hour, minute));
  }
  return new Date(year, month, day, hour, minute);
}

/* Prüft ob ein Zeitslot mit einem belegten Termin kollidiert */
function isSlotBusy(
  slotStart: Date,
  slotEnd: Date,
  busyTimes: { start: Date; end: Date }[]
): boolean {
  return busyTimes.some(
    (busy) => slotStart < busy.end && slotEnd > busy.start
  );
}

export async function GET() {
  const busyTimes = await fetchBusyTimes();
  const now = new Date();
  const minBookingTime = new Date(
    now.getTime() + MIN_LEAD_TIME_HOURS * 60 * 60 * 1000
  );

  const availableDays: { date: string; label: string; slots: string[] }[] = [];

  for (let d = 0; d < MAX_FUTURE_DAYS; d++) {
    const date = new Date();
    date.setDate(date.getDate() + d);
    date.setHours(0, 0, 0, 0);

    const dayOfWeek = date.getDay(); // 0=So, 1=Mo ... 6=Sa
    if (!BOOKABLE_DAYS.includes(dayOfWeek)) continue;

    const dateStr = date.toISOString().slice(0, 10);
    const freeSlots: string[] = [];

    /* Wochentag-spezifische Slots nutzen, Fallback auf allgemeine Slots */
    const slotsForDay = TIME_SLOTS_BY_DAY[dayOfWeek] ?? TIME_SLOTS;

    for (const timeStr of slotsForDay) {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const slotStart = new Date(date);
      slotStart.setHours(hours, minutes, 0, 0);

      const slotEnd = new Date(
        slotStart.getTime() + SLOT_DURATION_MINUTES * 60 * 1000
      );

      if (slotStart <= minBookingTime) continue;
      if (isSlotBusy(slotStart, slotEnd, busyTimes)) continue;

      freeSlots.push(timeStr);
    }

    if (freeSlots.length > 0) {
      const label = formatGermanDate(date);
      availableDays.push({ date: dateStr, label, slots: freeSlots });
    }
  }

  return NextResponse.json(availableDays);
}

/* Deutsches Datumslabel: "Mi, 10. April" */
function formatGermanDate(date: Date): string {
  const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  const months = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember",
  ];
  return `${days[date.getDay()]}, ${date.getDate()}. ${months[date.getMonth()]}`;
}
