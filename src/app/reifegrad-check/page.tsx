import type { Metadata } from "next";
import Link from "next/link";
import {
  IconArrowRight,
  IconCheck,
  IconTarget,
  IconCycle,
  IconDatabase,
  IconNetwork,
  IconPeople,
  IconShieldCheck,
  IconScale,
  IconLightning,
  IconChart,
  IconUser,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "KI-Reifegrad-Check – OKAI",
  description: "25 Fragen. 5 Minuten. Ein ehrliches Bild davon, wo dein Unternehmen bei KI wirklich steht.",
};

const dimensions = [
  { icon: IconTarget, name: "Strategie & Vision" },
  { icon: IconPeople, name: "Wissen & Kompetenz" },
  { icon: IconCycle, name: "Prozesse & Automatisierung" },
  { icon: IconDatabase, name: "Daten & Infrastruktur" },
  { icon: IconNetwork, name: "Tools & Technologie" },
  { icon: IconShieldCheck, name: "Kultur & Change" },
  { icon: IconScale, name: "Compliance & Recht" },
];

const results = [
  { title: "Gesamtscore mit Ampel-Bewertung", sub: "Einsteiger / Grundlage vorhanden / Vorreiter" },
  { title: "Ampel-Radar über alle 7 Dimensionen", sub: "Auf einen Blick erkennbar, wo Stärken und Lücken liegen" },
  { title: "Detailkarten pro Dimension", sub: "Konkrete Interpretation und Einordnung" },
  { title: "Quick-Win-Checkliste", sub: "5 priorisierte nächste Schritte auf Basis deiner schwächsten Dimensionen" },
  { title: "Produktempfehlung", sub: "Maximal 2 passende OKAI-Angebote – nicht mehr" },
  { title: "PDF-Report (mit E-Mail)", sub: "Inkl. 1-Pager für die Geschäftsführung" },
];

const ways = [
  {
    icon: IconLightning,
    title: "Weg A: Sofortbriefing",
    text: "Automatisch und sofort. Dein Report enthält eine generierte Einschätzung mit priorisierten Quick Wins. Kein Gespräch nötig.",
  },
  {
    icon: IconChart,
    title: "Weg B: KI-Briefing per Telefon-Bot",
    text: "Asynchron und flexibel. Ein strukturiertes 10-Minuten-Gespräch auf Basis deines Check-Ergebnisses. Ohne Terminaufwand.",
  },
  {
    icon: IconUser,
    title: "Weg C: Persönliches Briefing",
    text: "Nur für qualifizierte Leads. Nach abgeschlossenem Check und auf Einladung.",
  },
];

export default function ReifegradCheckPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-mid-gray mb-8">
          <Link href="/" className="hover:text-black">okai.de</Link>
          <span className="mx-2">›</span>
          <span>KI-Reifegrad-Check</span>
        </nav>

        {/* Badge */}
        <span className="inline-block bg-sky text-black text-xs font-semibold px-3 py-1 rounded-full mb-4">
          Lead Magnet · Kostenlos
        </span>

        <h1 className="mb-4">KI-Reifegrad-Check</h1>
        <p className="text-xl text-dark-gray mb-4 max-w-2xl">
          25 Fragen. 5 Minuten. Ein ehrliches Bild davon, wo dein Unternehmen bei KI wirklich steht.
        </p>
        <p className="text-sm text-mid-gray mb-8">
          Kostenlos · Kein Login · Sofortergebnis · 7 Dimensionen
        </p>
        <Link
          href="/reifegrad-check"
          className="inline-flex items-center gap-2 bg-bright-red text-white font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity mb-16"
        >
          Check jetzt starten <IconArrowRight size={16} />
        </Link>

        {/* Was der Check misst */}
        <section className="mb-16">
          <h2 className="mb-4">7 Dimensionen. Eine ehrliche Standortbestimmung.</h2>
          <p className="text-dark-gray mb-8">
            Der Check analysiert dein Unternehmen entlang von 7 Dimensionen. Keine Wissensfragen – sondern konkrete Fragen zu deiner echten Situation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dimensions.map((d) => (
              <div key={d.name} className="bg-off-white okai-shape-md p-4 text-center border border-sand-border">
                <d.icon size={24} className="mx-auto mb-2 text-dark-gray" />
                <p className="text-sm font-medium">{d.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Was du bekommst */}
        <section className="mb-16">
          <h2 className="mb-8">Was du bekommst</h2>
          <div className="space-y-4">
            {results.map((r) => (
              <div key={r.title} className="flex gap-3">
                <IconCheck size={20} className="text-bright-red shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{r.title}</p>
                  <p className="text-sm text-dark-gray">{r.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Die 3 Wege nach dem Check */}
        <section className="mb-16">
          <h2 className="mb-8">Was nach dem Check passiert – du entscheidest.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ways.map((w) => (
              <div key={w.title} className="bg-off-white okai-shape-md p-6 border border-sand-border">
                <w.icon size={24} className="text-dark-gray mb-3" />
                <h3 className="mb-2">{w.title}</h3>
                <p className="text-sm text-dark-gray">{w.text}</p>
              </div>
            ))}
          </div>
          <p className="caption mt-4">
            Das persönliche Briefing-Gespräch ist kein öffentliches Angebot – es wird nur nach abgeschlossenem Check und bei passendem Ergebnis angeboten.
          </p>
        </section>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <Link href="/reifegrad-check/ablauf" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-bright-red transition-colors">
            Wie der Check im Detail abläuft <IconArrowRight size={14} />
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href="/reifegrad-check"
            className="inline-flex items-center gap-2 bg-bright-red text-white font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity"
          >
            Check starten <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
