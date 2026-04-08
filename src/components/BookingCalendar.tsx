"use client";

import { useState, useEffect } from "react";
import { IconArrowRight, IconCheck } from "./Icons";

/* ============================================
   OKAI Terminbuchung – Kalender-Komponente

   Zeigt freie Termine aus dem iCal-Feed an
   und ermöglicht eine Buchungsanfrage.
   ============================================ */

interface AvailableDay {
  date: string;    // "2026-04-15"
  label: string;   // "Di, 15. April"
  slots: string[]; // ["09:00", "09:30", ...]
}

type BookingStep = "select-day" | "select-time" | "form" | "success" | "error";

export function BookingCalendar() {
  const [days, setDays] = useState<AvailableDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<BookingStep>("select-day");

  /* Ausgewählter Tag und Slot */
  const [selectedDay, setSelectedDay] = useState<AvailableDay | null>(null);
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

  /* Tag auswählen */
  function handleSelectDay(day: AvailableDay) {
    setSelectedDay(day);
    setSelectedTime(null);
    setStep("select-time");
  }

  /* Zeitslot auswählen */
  function handleSelectTime(time: string) {
    setSelectedTime(time);
    setStep("form");
  }

  /* Buchung absenden */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDay || !selectedTime) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDay.date,
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

  /* Zurück-Button */
  function handleBack() {
    if (step === "form") setStep("select-time");
    else if (step === "select-time") setStep("select-day");
  }

  /* Neu starten */
  function handleReset() {
    setStep("select-day");
    setSelectedDay(null);
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
      <div className="bg-off-white okai-shape-md p-8 min-h-[300px] flex items-center justify-center border border-sand-border">
        <p className="text-mid-gray text-sm">Verfügbare Termine werden geladen...</p>
      </div>
    );
  }

  /* Erfolg */
  if (step === "success") {
    return (
      <div className="bg-off-white okai-shape-md p-8 min-h-[300px] flex flex-col items-center justify-center border border-sand-border text-center">
        <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mb-4">
          <IconCheck size={24} className="text-black" />
        </div>
        <h3 className="mb-2">Terminanfrage gesendet</h3>
        <p className="text-sm text-dark-gray mb-1">
          {selectedDay?.label}, {selectedTime} Uhr
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
      <div className="bg-off-white okai-shape-md p-8 min-h-[300px] flex flex-col items-center justify-center border border-sand-border text-center">
        <p className="text-bright-red font-semibold mb-2">Etwas ist schiefgelaufen.</p>
        <p className="text-sm text-dark-gray mb-4">Bitte versuche es erneut oder schreib direkt eine E-Mail.</p>
        <button onClick={handleReset} className="text-sm font-semibold text-bright-red hover:text-black transition-colors">
          Erneut versuchen
        </button>
      </div>
    );
  }

  return (
    <div className="bg-off-white okai-shape-md p-6 border border-sand-border">
      {/* Breadcrumb / Navigation */}
      <div className="flex items-center gap-2 mb-4 text-xs text-mid-gray">
        <button
          onClick={handleReset}
          className={step === "select-day" ? "font-semibold text-black" : "hover:text-black"}
        >
          Tag
        </button>
        <span>/</span>
        <button
          onClick={() => selectedDay && setStep("select-time")}
          className={step === "select-time" ? "font-semibold text-black" : selectedDay ? "hover:text-black" : ""}
          disabled={!selectedDay}
        >
          Uhrzeit
        </button>
        <span>/</span>
        <span className={step === "form" ? "font-semibold text-black" : ""}>
          Kontakt
        </span>
      </div>

      {/* Schritt 1: Tag wählen */}
      {step === "select-day" && (
        <div>
          <p className="text-sm font-semibold mb-3">Wähle einen Tag:</p>
          {days.length === 0 ? (
            <p className="text-sm text-mid-gray">Aktuell keine freien Termine verfügbar.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1">
              {days.map((day) => (
                <button
                  key={day.date}
                  onClick={() => handleSelectDay(day)}
                  className="text-left px-3 py-2.5 text-sm bg-white border border-sand-border okai-shape-sm hover:border-bright-red hover:bg-bright-red/5 transition-colors"
                >
                  <span className="font-semibold">{day.label}</span>
                  <span className="block text-xs text-mid-gray">{day.slots.length} Slots frei</span>
                </button>
              ))}
            </div>
          )}
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
          <div className="grid grid-cols-3 gap-2">
            {selectedDay.slots.map((time) => (
              <button
                key={time}
                onClick={() => handleSelectTime(time)}
                className="px-3 py-2 text-sm font-medium bg-white border border-sand-border okai-shape-sm hover:border-bright-red hover:bg-bright-red/5 transition-colors"
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Schritt 3: Kontaktdaten */}
      {step === "form" && selectedDay && selectedTime && (
        <div>
          <button onClick={handleBack} className="text-xs text-mid-gray hover:text-black mb-3 flex items-center gap-1">
            ← Zurück
          </button>
          <p className="text-sm font-semibold mb-1">{selectedDay.label}, {selectedTime} Uhr</p>
          <p className="text-xs text-mid-gray mb-4">30 Min. Erstgespräch – kostenlos</p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-sand-border okai-shape-sm bg-white focus:border-bright-red focus:outline-none"
            />
            <input
              type="email"
              placeholder="E-Mail *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 text-sm border border-sand-border okai-shape-sm bg-white focus:border-bright-red focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Telefon (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-sand-border okai-shape-sm bg-white focus:border-bright-red focus:outline-none"
            />
            <textarea
              placeholder="Kurze Nachricht (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-sand-border okai-shape-sm bg-white focus:border-bright-red focus:outline-none resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-bright-red text-white font-semibold px-5 py-2.5 okai-shape-sm hover:opacity-90 transition-opacity disabled:opacity-50"
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
