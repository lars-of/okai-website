import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    <>
      {/* Hero-Bereich: schwarzer Hintergrund, passend zur Hauptseite */}
      <section className="bg-black text-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo – 2.5x gross */}
          <div className="mb-8">
            <Image
              src="/assets/okai-logo.png"
              alt="OKAI"
              width={250}
              height={80}
              className="h-20 w-auto invert brightness-200"
            />
          </div>

          {/* Breadcrumb */}
          <nav className="text-sm text-mid-gray mb-8">
            <Link href="/" className="hover:text-white transition-colors">okai.de</Link>
            <span className="mx-2">›</span>
            <span className="text-sand-border">KI-Reifegrad-Check</span>
          </nav>

          {/* Badge */}
          <span className="inline-block bg-sky text-black text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Lead Magnet · Kostenlos
          </span>

          <h1 className="mb-4 text-white">KI-Reifegrad-Check</h1>
          <p className="text-xl text-sand-border mb-4 max-w-2xl">
            25 Fragen. 5 Minuten. Ein ehrliches Bild davon, wo dein Unternehmen bei KI wirklich steht.
          </p>
          <p className="text-sm text-mid-gray mb-8">
            Kostenlos · Kein Login · Sofortergebnis · 7 Dimensionen
          </p>
          <Link
            href="/reifegrad-check/test"
            className="inline-flex items-center gap-2 bg-bright-red text-white font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity"
          >
            Check jetzt starten <IconArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Inhalt */}
      <section className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Was der Check misst */}
          <div className="mb-16">
            <p className="section-label !text-mint mb-3">Dimensionen</p>
            <h2 className="mb-4 text-white">7 Dimensionen. Eine ehrliche Standortbestimmung.</h2>
            <p className="text-sand-border mb-8">
              Der Check analysiert dein Unternehmen entlang von 7 Dimensionen. Keine Wissensfragen – sondern konkrete Fragen zu deiner echten Situation.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dimensions.map((d) => (
                <div key={d.name} className="bg-white/10 rounded-xl p-4 text-center border border-white/10">
                  <d.icon size={24} className="mx-auto mb-2 text-mint" />
                  <p className="text-sm font-medium text-sand-border">{d.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Was du bekommst */}
          <div className="mb-16">
            <p className="section-label !text-mint mb-3">Ergebnisse</p>
            <h2 className="mb-8 text-white">Was du bekommst</h2>
            <div className="space-y-4">
              {results.map((r) => (
                <div key={r.title} className="flex gap-3">
                  <IconCheck size={20} className="text-bright-red shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">{r.title}</p>
                    <p className="text-sm text-sand-border">{r.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Die 3 Wege nach dem Check */}
          <div className="mb-16">
            <p className="section-label !text-mint mb-3">Nach dem Check</p>
            <h2 className="mb-8 text-white">Was nach dem Check passiert – du entscheidest.</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {ways.map((w) => (
                <div key={w.title} className="bg-white/10 rounded-xl p-6 border border-white/10">
                  <w.icon size={24} className="text-mint mb-3" />
                  <h3 className="mb-2 text-white">{w.title}</h3>
                  <p className="text-sm text-sand-border">{w.text}</p>
                </div>
              ))}
            </div>
            <p className="caption mt-4 !text-mid-gray">
              Das persönliche Briefing-Gespräch ist kein öffentliches Angebot – es wird nur nach abgeschlossenem Check und bei passendem Ergebnis angeboten.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/reifegrad-check/ablauf" className="inline-flex items-center gap-2 text-sm font-semibold text-sand-border hover:text-white transition-colors">
              Wie der Check im Detail abläuft <IconArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-6">
            <Link
              href="/reifegrad-check/test"
              className="inline-flex items-center gap-2 bg-bright-red text-white font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity"
            >
              Check starten <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
