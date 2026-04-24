/* ============================================
   ICS-Generator – Kalendereinladungen

   Erzeugt .ics-Dateien im iCalendar-Format.
   Funktioniert mit: Apple Kalender, Google Calendar,
   Outlook, Microsoft 365 und allen anderen Apps.

   Enthält automatisch:
   - Erinnerung 12 Stunden vorher
   - Erinnerung 1 Stunde vorher
   ============================================ */

export interface ICSParams {
  title: string;
  description: string;
  startDate: Date;
  durationMinutes: number;
  organizerName: string;
  organizerEmail: string;
  attendeeEmail: string;
  attendeeName: string;
}

/* Datum für ICS formatieren: YYYYMMDDTHHMMSS (ohne Z = lokale Zeit mit TZID) */
function formatICSDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    "T",
    pad(date.getHours()),
    pad(date.getMinutes()),
    "00",
  ].join("");
}

/* Sonderzeichen für ICS escapen */
function esc(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/* Vollständige .ics-Datei erzeugen – inkl. Timezone (Europe/Berlin) */
export function generateICS(params: ICSParams): string {
  const { title, description, startDate, durationMinutes, organizerName, organizerEmail, attendeeEmail, attendeeName } = params;

  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
  const uid = `okai-${Date.now()}-${Math.random().toString(36).slice(2)}@ok-ai.de`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OKAI//Terminbuchung//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "X-WR-CALNAME:OKAI Termin",
    "X-WR-TIMEZONE:Europe/Berlin",
    // Timezone-Definition (Europe/Berlin) für maximale Kompatibilität
    "BEGIN:VTIMEZONE",
    "TZID:Europe/Berlin",
    "BEGIN:DAYLIGHT",
    "TZOFFSETFROM:+0100",
    "TZOFFSETTO:+0200",
    "TZNAME:CEST",
    "DTSTART:19700329T020000",
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "TZOFFSETFROM:+0200",
    "TZOFFSETTO:+0100",
    "TZNAME:CET",
    "DTSTART:19701025T030000",
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10",
    "END:STANDARD",
    "END:VTIMEZONE",
    // Termin
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatICSDate(new Date())}Z`,
    `DTSTART;TZID=Europe/Berlin:${formatICSDate(startDate)}`,
    `DTEND;TZID=Europe/Berlin:${formatICSDate(endDate)}`,
    `SUMMARY:${esc(title)}`,
    `DESCRIPTION:${esc(description)}`,
    `ORGANIZER;CN="${esc(organizerName)}":mailto:${organizerEmail}`,
    `ATTENDEE;CN="${esc(attendeeName)}";RSVP=FALSE:mailto:${attendeeEmail}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    // Erinnerung 12 Stunden vorher
    "BEGIN:VALARM",
    "TRIGGER:-PT12H",
    "ACTION:DISPLAY",
    `DESCRIPTION:Erinnerung: ${esc(title)} – morgen`,
    "END:VALARM",
    // Erinnerung 1 Stunde vorher
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    `DESCRIPTION:Erinnerung: ${esc(title)} – in 1 Stunde`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  // ICS erwartet CRLF (\r\n) als Zeilenumbruch
  return lines.join("\r\n");
}

/* Google Calendar – direkter Link zum Eintragen */
export function getGoogleCalendarLink(params: {
  title: string;
  description: string;
  startDate: Date;
  durationMinutes: number;
}): string {
  const { title, description, startDate, durationMinutes } = params;
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  // Google erwartet UTC in Format YYYYMMDDTHHMMSSZ
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const url = new URL("https://calendar.google.com/calendar/render");
  url.searchParams.set("action", "TEMPLATE");
  url.searchParams.set("text", title);
  url.searchParams.set("dates", `${fmt(startDate)}/${fmt(endDate)}`);
  url.searchParams.set("details", description);
  url.searchParams.set("ctz", "Europe/Berlin");
  return url.toString();
}

/* Outlook / Microsoft 365 – direkter Link */
export function getOutlookLink(params: {
  title: string;
  description: string;
  startDate: Date;
  durationMinutes: number;
}): string {
  const { title, description, startDate, durationMinutes } = params;
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

  const url = new URL("https://outlook.live.com/calendar/0/deeplink/compose");
  url.searchParams.set("rru", "addevent");
  url.searchParams.set("subject", title);
  url.searchParams.set("startdt", startDate.toISOString());
  url.searchParams.set("enddt", endDate.toISOString());
  url.searchParams.set("body", description);
  return url.toString();
}
