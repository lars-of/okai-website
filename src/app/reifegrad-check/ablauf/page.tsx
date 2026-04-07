import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Ablauf des KI-Reifegrad-Checks – OKAI",
  description: "Wie der KI-Reifegrad-Check funktioniert: Schritt für Schritt erklärt.",
};

const steps = [
  {
    step: 1,
    title: "Kontext eingeben",
    time: "1 Minute",
    text: "Branche wählen, Betriebsgröße angeben. So werden die Fragen auf deine Situation zugeschnitten.",
  },
  {
    step: 2,
    title: "25 Fragen beantworten",
    time: "4 Minuten",
    text: "Keine Wissensfragen. Konkrete Szenarien aus dem Arbeitsalltag. Antwortskala: von \u201etrifft gar nicht zu\u201c bis \u201etrifft vollst\u00e4ndig zu\u201c.",
  },
  {
    step: 3,
    title: "Sofortergebnis",
    time: "ohne Login",
    text: "Gesamtscore, Ampel-Radar und erste Einordnung. Direkt im Browser sichtbar.",
  },
  {
    step: 4,
    title: "Detailreport",
    time: "mit E-Mail, optional",
    text: "Vollständiger Report als PDF mit Detailinterpretation, Quick-Win-Checkliste und Produktempfehlung. Dazu ein 1-Pager für die Geschäftsführung.",
  },
  {
    step: 5,
    title: "Nächster Schritt",
    time: "deine Wahl",
    text: "Sofortbriefing aus dem Report, Telefon-Bot oder – bei passendem Ergebnis – persönliches Gespräch.",
  },
];

export default function AblaufPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-mid-gray mb-8">
          <Link href="/" className="hover:text-black">okai.de</Link>
          <span className="mx-2">›</span>
          <Link href="/reifegrad-check" className="hover:text-black">KI-Reifegrad-Check</Link>
          <span className="mx-2">›</span>
          <span>Ablauf</span>
        </nav>

        <h1 className="mb-12">Wie der KI-Reifegrad-Check funktioniert</h1>

        <div className="space-y-8 mb-16">
          {steps.map((s) => (
            <div key={s.step} className="flex gap-6">
              <div className="shrink-0 w-10 h-10 rounded-full bg-bright-red text-white flex items-center justify-center font-bold text-sm">
                {s.step}
              </div>
              <div>
                <h3 className="mb-1">{s.title} <span className="text-sm font-normal text-mid-gray">({s.time})</span></h3>
                <p className="text-dark-gray">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/reifegrad-check"
          className="inline-flex items-center gap-2 bg-bright-red text-white font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity"
        >
          Jetzt starten <IconArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
