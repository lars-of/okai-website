/* ============================================
   Kalender-Konfiguration für OKAI Terminbuchung

   Hier alles Wichtige zentral ändern:
   - E-Mail-Adresse für Benachrichtigungen
   - Buchbare Zeiten
   - Vorlaufzeit
   ============================================ */

/* E-Mail für Buchungsbenachrichtigungen
   Zum Ändern einfach hier die Adresse austauschen */
export const BOOKING_EMAIL = "lars@fieck.de";
// export const BOOKING_EMAIL = "hallo@ok-ai.de";  // <- später umstellen

/* iCal-URL zum Lesen der belegten Zeiten (aus Umgebungsvariable oder Fallback) */
export const ICAL_URL =
  process.env.ICAL_URL ||
  "https://p34-caldav.icloud.com/published/2/ODQzMzc3MjE4NDMzNzcyMZbMUAFT1C_TG0kHkkDvmFRLHQxtSgp_yqFkHmFtlIVw0AuFFRUHI3pjVWMLp4lqx0gKXNfQWSoK_rm_5aQPhRQ";

/* Buchbare Wochentage: 1=Mo, 2=Di, 3=Mi, 4=Do, 5=Fr */
export const BOOKABLE_DAYS = [1, 2, 3, 4, 5];

/* Buchbare Zeitfenster – 3 feste Termine pro Tag
   Unterschiedliche Kombinationen pro Wochentag für Abwechslung */
export const TIME_SLOTS_BY_DAY: Record<number, string[]> = {
  1: ["09:15", "13:00", "16:30"],  // Montag: alle drei
  2: ["09:15", "16:30"],            // Dienstag: morgens + nachmittags
  3: ["13:00", "16:30"],            // Mittwoch: mittags + nachmittags
  4: ["09:15", "13:00"],            // Donnerstag: morgens + mittags
  5: ["09:15", "13:00", "16:30"],  // Freitag: alle drei
};

/* Fallback für die API-Route (alle möglichen Slots) */
export const TIME_SLOTS = ["09:15", "13:00", "16:30"];

/* Dauer eines Termins in Minuten */
export const SLOT_DURATION_MINUTES = 30;

/* Mindest-Vorlaufzeit in Stunden (48h = 2 Tage) */
export const MIN_LEAD_TIME_HOURS = 48;

/* Wie viele Tage in die Zukunft anzeigen */
export const MAX_FUTURE_DAYS = 21;
