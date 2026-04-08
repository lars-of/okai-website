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

/* Buchbare Zeitfenster (Mittagspause 12-13 Uhr ausgespart) */
export const TIME_SLOTS = [
  "09:00", "09:30",
  "10:00", "10:30",
  "11:00", "11:30",
  // 12:00-13:00 = Mittagspause
  "13:00", "13:30",
  "14:00", "14:30",
  "15:00", "15:30",
  "16:00", "16:30",
  "17:00", "17:30",
  "18:00", "18:30",
];

/* Dauer eines Termins in Minuten */
export const SLOT_DURATION_MINUTES = 30;

/* Mindest-Vorlaufzeit in Stunden (48h = 2 Tage) */
export const MIN_LEAD_TIME_HOURS = 48;

/* Wie viele Tage in die Zukunft anzeigen */
export const MAX_FUTURE_DAYS = 21;
