"use client";

import { useState, useEffect, useMemo } from "react";
import { IconArrowRight, IconCheck, IconChevronLeft, IconChevronRight } from "./Icons";

/* ============================================
   OKAI Terminbuchung – Monatskalender

   Zeigt einen klassischen Monatskalender.
   Tage werden farblich markiert:
   - Grün: freie Slots verfügbar
   - Rot: alle Slots belegt
   - Grau: keine Buchung möglich (Wochenende, Vergangenheit)
   ============================================ */

interface AvailableDay {
  date: string;    // "2026-04-15"
  label: string;   // "Di, 15. April"
  slots: string[]; // ["09:15", "13:00", ...]
}

type BookingStep = "calendar" | "select-time" | "form" | "success" | "error";

/* Deutsche Monatsnamen */
const MONTH_NAMES = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

/* Deutsche Wochentagskürzel (Mo-So) */
const WEEKDAY_SHORT = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

/* Hilfsfunktion: Alle Tage eines Monats erzeugen */
function getDaysInMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  /* Wochentag des 1. (Mo=0, So=6) */
  let startWeekday = firstDay.getDay() - 1;
  if (startWeekday < 0) startWeekday = 6;

  const days: (number | null)[] = [];

  /* Leere Felder vor dem 1. */
  for (let i = 0; i < startWeekday; i++) {
    days.push(null);
  }

  /* Tage des Monats */
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(d);
  }

  return days;
}

/* Beispiel-Termine die "belegt" sind (Demo-Daten) */
const BOOKED_EXAMPLES = [
  { day: 10, time: "10:00" },
  { day: 10, time: "14:30" },
  { day: 11, time: "09:15" },
  { day: 14, time: "16:30" },
  { day: 15, time: "09:15" },
  { day: 15, time: "13:00" },
  { day: 17, time: "13:00" },
  { day: 18, time: "09:15" },
  { day: 21, time: "16:30" },
  { day: 22, time: "09:15" },
  { day: 22, time: "13:00" },
  { day: 22, time: "16:30" },
  { day: 23, time: "09:15" },
  { day: 25, time: "13:00" },
];

export function BookingCalendar() {
  const [days, setDays] = useState<AvailableDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<BookingStep>("calendar");

  /* Aktueller Monats-Anzeige-Monat */
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());

  /* Ausgewählter Tag und Slot */
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  /* Formular-Daten */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* Freie Termine vom Server laden */
  useEffect(() => {
    fetch("/api/calendar")
      .then((res) => res.json())
      .then((data: AvailableDay[]) => {
        setDays(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  /* Map: date-string -> AvailableDay für schnellen Zugriff */
  const dayMap = useMemo(() => {
    const map = new Map<string, AvailableDay>();
    days.forEach((d) => map.set(d.date, d));
    return map;
  }, [days]);

  /* Kalender-Tage für aktuellen Monat */
  const calendarDays = useMemo(
    () => getDaysInMonth(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  /* Monat wechseln */
  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  }

  /* Status eines Tages bestimmen */
  function getDayStatus(dayNum: number): "free" | "booked" | "unavailable" {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    const date = new Date(viewYear, viewMonth, dayNum);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    /* Vergangene Tage */
    if (date < today) return "unavailable";

    /* Wochenende */
    const dow = date.getDay();
    if (dow === 0 || dow === 6) return "unavailable";

    /* Freie Slots vorhanden? */
    const available = dayMap.get(dateStr);
    if (available && available.slots.length > 0) return "free";

    /* Werktag ohne freie Slots = belegt */
    if (date >= today) return "booked";

    return "unavailable";
  }

  /* Tag auswählen */
  function handleSelectDay(dayNum: number) {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setSelectedTime(null);
    setStep("select-time");
  }

  /* Ausgewählten Tag als AvailableDay finden */
  const selectedDay = selectedDate ? dayMap.get(selectedDate) : null;

  /* Zeitslot auswählen */
  function handleSelectTime(time: string) {
    setSelectedTime(time);
    setStep("form");
  }

  /* Buchung absenden */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          name,
          email,
          phone,
          message,
        }),
      });

      if (res.ok) {
        setStep("success");
      } else {
        setStep("error");
      }
    } catch {
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  }

  /* Zurück */
  function handleBack() {
    if (step === "form") setStep("select-time");
    else if (step === "select-time") setStep("calendar");
  }

  /* Neu starten */
  function handleReset() {
    setStep("calendar");
    setSelectedDate(null);
    setSelectedTime(null);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  }

  /* ============================================
     Render
     ============================================ */

  if (loading) {
    return (
      <div className="bg-off-white rounded-xl p-8 min-h-[300px] flex items-center justify-center border border-sand-border">
        <p className="text-mid-gray text-sm">Verfügbare Termine werden geladen...</p>
      </div>
    );
  }

  /* Erfolg */
  if (step === "success") {
    return (
      <div className="bg-off-white rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center border border-sand-border text-center">
        <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mb-4">
          <IconCheck size={24} className="text-black" />
        </div>
        <h3 className="mb-2">Terminanfrage gesendet</h3>
        <p className="text-sm text-dark-gray mb-1">
          {selectedDay?.label ?? selectedDate}, {selectedTime} Uhr
        </p>
        <p className="text-sm text-mid-gray mb-6">
          Eine Bestätigung folgt per E-Mail.
        </p>
        <button onClick={handleReset} className="text-sm font-semibold text-bright-red hover:text-black transition-colors">
          Weiteren Termin buchen
        </button>
      </div>
    );
  }

  /* Fehler */
  if (step === "error") {
    return (
      <div className="bg-off-white rounded-xl p-8 min-h-[300px] flex flex-col items-center justify-center border border-sand-border text-center">
        <p className="text-bright-red font-semibold mb-2">Etwas ist schiefgelaufen.</p>
        <p className="text-sm text-dark-gray mb-4">Bitte versuche es erneut oder schreib direkt eine E-Mail.</p>
        <button onClick={handleReset} className="text-sm font-semibold text-bright-red hover:text-black transition-colors">
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="bg-off-white rounded-xl p-5 border border-sand-border">
      {/* Breadcrumb / Navigation */}
      <div className="flex items-center gap-2 mb-4 text-xs text-mid-gray">
        <button
          onClick={handleReset}
          className={step === "calendar" ? "font-semibold text-black" : "hover:text-black"}
        >
          Kalender
        </button>
        <span>/</span>
        <button
          onClick={() => selectedDate && setStep("select-time")}
          className={step === "select-time" ? "font-semibold text-black" : selectedDate ? "hover:text-black" : ""}
          disabled={!selectedDate}
        >
          Uhrzeit
        </button>
        <span>/</span>
        <span className={step === "form" ? "font-semibold text-black" : ""}>
          Kontakt
        </span>
      </div>

      {/* Schritt 1: Monatskalender */}
      {step === "calendar" && (
        <div>
          {/* Monats-Navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-sand rounded transition-colors"
              aria-label="Vorheriger Monat"
            >
              <IconChevronLeft size={20} />
            </button>
            <p className="text-sm font-semibold">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </p>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-sand rounded transition-colors"
              aria-label="Nächster Monat"
            >
              <IconChevronRight size={20} />
            </button>
          </div>

          {/* Wochentags-Header */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAY_SHORT.map((wd) => (
              <div key={wd} className="text-center text-[0.65rem] font-semibold text-mid-gray py-1">
                {wd}
              </div>
            ))}
          </div>

          {/* Kalender-Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dayNum, idx) => {
              if (dayNum === null) {
                return <div key={`empty-${idx}`} className="h-9" />;
              }

              const status = getDayStatus(dayNum);
              const isToday =
                dayNum === now.getDate() &&
                viewMonth === now.getMonth() &&
                viewYear === now.getFullYear();

              /* Farben je nach Status */
              let bgClass = "bg-gray-100 text-mid-gray cursor-default"; // unavailable
              if (status === "free") {
                bgClass = "bg-mint/40 text-black hover:bg-mint/70 cursor-pointer font-semibold";
              } else if (status === "booked") {
                bgClass = "bg-bright-red/20 text-bright-red cursor-default";
              }

              return (
                <button
                  key={`day-${dayNum}`}
                  onClick={() => status === "free" && handleSelectDay(dayNum)}
                  disabled={status !== "free"}
                  className={`h-9 rounded-md text-xs transition-colors ${bgClass} ${
                    isToday ? "ring-2 ring-bright-red ring-offset-1" : ""
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Legende */}
          <div className="flex gap-4 mt-3 text-[0.6rem] text-mid-gray">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-mint/40 inline-block" /> Verfügbar
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-bright-red/20 inline-block" /> Belegt
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-gray-100 inline-block" /> Nicht buchbar
            </span>
          </div>
        </div>
      )}

      {/* Schritt 2: Uhrzeit wählen */}
      {step === "select-time" && selectedDay && (
        <div>
          <button onClick={handleBack} className="text-xs text-mid-gray hover:text-black mb-3 flex items-center gap-1">
            ← Zurück
          </button>
          <p className="text-sm font-semibold mb-1">{selectedDay.label}</p>
          <p className="text-xs text-mid-gray mb-3">30 Minuten Erstgespräch</p>

          {/* Freie Slots */}
          <p className="text-[0.65rem] font-semibold text-mid-gray mb-2 uppercase tracking-wide">Verfügbar</p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {selectedDay.slots.map((time) => (
              <button
                key={time}
                onClick={() => handleSelectTime(time)}
                className="px-3 py-2 text-sm font-medium bg-mint/30 border border-mint rounded-lg hover:bg-mint/60 transition-colors"
              >
                {time}
              </button>
            ))}
          </div>

          {/* Belegte Slots (Demo) */}
          {(() => {
            const dayNum = parseInt(selectedDate?.split("-")[2] ?? "0", 10);
            const booked = BOOKED_EXAMPLES.filter((b) => b.day === dayNum);
            if (booked.length === 0) return null;
            return (
              <>
                <p className="text-[0.65rem] font-semibold text-mid-gray mb-2 uppercase tracking-wide">Belegt</p>
                <div className="grid grid-cols-3 gap-2">
                  {booked.map((b) => (
                    <div
                      key={b.time}
                      className="px-3 py-2 text-sm text-mid-gray bg-bright-red/10 border border-bright-red/20 rounded-lg line-through text-center"
                    >
                      {b.time}
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Schritt 3: Kontaktdaten */}
      {step === "form" && selectedDate && selectedTime && (
        <div>
          <button onClick={handleBack} className="text-xs text-mid-gray hover:text-black mb-3 flex items-center gap-1">
            ← Zurück
          </button>
          <p className="text-sm font-semibold mb-1">{selectedDay?.label ?? selectedDate}, {selectedTime} Uhr</p>
          <p className="text-xs text-mid-gray mb-4">30 Min. Erstgespräch – kostenlos</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-sand-border rounded-lg bg-white focus:border-bright-red focus:outline-none"
            />
            <input
              type="email"
              placeholder="E-Mail *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-sand-border rounded-lg bg-white focus:border-bright-red focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Telefon (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-sand-border rounded-lg bg-white focus:border-bright-red focus:outline-none"
            />
            <textarea
              placeholder="Kurze Nachricht (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-sand-border rounded-lg bg-white focus:border-bright-red focus:outline-none resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-bright-red text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Wird gesendet..." : "Termin anfragen"}
              {!submitting && <IconArrowRight size={14} />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
