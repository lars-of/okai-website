import Image from "next/image";
import Link from "next/link";
import {
  IconStar,
  IconCheck,
  IconArrowRight,
  IconCompass,
  IconLightning,
  IconLayers,
  IconShield,
  IconChart,
  IconUser,
  IconMail,
  IconLinkedIn,
  IconPhone,
} from "@/components/Icons";

/* Trust-Logos der Auftraggeber */
const trustLogos = [
  { src: "/assets/urgh-logo.png", alt: "Urgh" },
  { src: "/assets/innolea-logo.png", alt: "Innolea" },
  { src: "/assets/etv-logo.png", alt: "ETV Hamburg" },
  { src: "/assets/isk-logo.png", alt: "ISK" },
  { src: "/assets/radblitz-logo.png", alt: "Radblitz" },
  { src: "/assets/fonio-logo.png", alt: "Fonio" },
];

/* Qualifikationen */
const qualifications = [
  { icon: IconStar, title: "TÜV-zertifiziert", sub: "Manager KI-Transformation" },
  { icon: IconStar, title: "LETUJA", sub: "Certified AI Consultant" },
  { icon: IconLayers, title: "Innolea Institut", sub: "Mentor" },
  { icon: IconLightning, title: "Koerting Institut", sub: "KI Masterclass · 18 Monate" },
  { icon: IconShield, title: "4× Effie Award", sub: "Gewinner" },
];

/* Problemkarten */
const problems = [
  { text: "\u201eIch wei\u00df nicht, wo ich mit KI anfangen soll.\u201c", href: "/reifegrad-check" },
  { text: "\u201eMein Team nutzt KI \u2013 aber ohne Plan und ohne Ergebnis.\u201c", href: "/ai-license" },
  { text: "\u201eWir verpassen Anrufe nach 17 Uhr \u2013 das kostet uns Auftr\u00e4ge.\u201c", href: "/mastery-roadmap#autopilot" },
  { text: "\u201eWir wissen, dass KI hilft \u2013 aber nicht welcher Prozess zuerst.\u201c", href: "/mastery-roadmap#roadmap" },
  { text: "\u201eIch will KI einsetzen, aber rechtlich auf der sicheren Seite sein.\u201c", href: "/mastery-roadmap#durchblick" },
  { text: "\u201eWir haben eine Idee f\u00fcr KI \u2013 aber keinen Prototyp.\u201c", href: "/mastery-roadmap#loesung" },
];

/* Mastery Roadmap Stufen */
const roadmapStages = [
  {
    stage: "Einstieg",
    title: "Lead Magnete",
    description: "Finde heraus wo du stehst – bevor du einen Euro ausgibst.",
    tags: ["KI-Reifegrad-Check", "KI-Mythen-Serie"],
    color: "bg-sky",
    href: "/reifegrad-check",
  },
  {
    stage: "Stufe 1",
    title: "KI Durchblick",
    description: "Verstehen, was KI für deinen Betrieb bedeutet – bevor du investierst.",
    tags: ["Briefing", "EU-AI Schulung", "AI License"],
    color: "bg-mint",
    href: "/mastery-roadmap#durchblick",
  },
  {
    stage: "Stufe 2",
    title: "KI Roadmap",
    description: "Raus aus dem KI-Chaos. Rein in einen Plan, nach dem man wirklich handeln kann.",
    tags: ["Scope & Discovery", "Gap Check", "AI Roadmap"],
    color: "bg-sand-border",
    href: "/mastery-roadmap#roadmap",
  },
  {
    stage: "Stufe 3",
    title: "KI Lösung",
    description: "Vom Prototyp zur Produktion. KI, die wirklich in deinem Betrieb läuft.",
    tags: ["Process-Check", "Concept Sprint", "Begleitung"],
    color: "bg-bright-red/60",
    href: "/mastery-roadmap#loesung",
  },
  {
    stage: "Stufe 4",
    title: "KI Autopilot",
    description: "24/7 erreichbar. Einschalten und loslassen.",
    tags: ["Instant Bot", "Custom Bot"],
    color: "bg-black",
    textColor: "text-off-white",
    href: "/mastery-roadmap#autopilot",
  },
];

/* Arbeitsweise */
const principles = [
  { icon: IconCheck, title: "Integer", text: "Ehrlich, transparent, auf Augenhöhe. Wir versprechen nur, was wir halten können. Keine Blenderei." },
  { icon: IconCompass, title: "Smart", text: "KI gezielt einsetzen, nicht blind. Wir wissen wann Automatisierung hilft und wann menschliche Kompetenz unersetzlich bleibt." },
  { icon: IconLightning, title: "Energetisch", text: "Begeisterung für Fortschritt. Wer mit uns arbeitet spürt: Hier geht es um motiviertes Arbeiten mit echtem Impact." },
  { icon: IconLayers, title: "Lösungsorientiert", text: "Fokus statt Herumprobieren. Testen, justieren, optimieren – immer mit dem Ziel die beste Lösung aufzusetzen." },
];

/* Cases */
const cases = [
  {
    logo: "/assets/etv-logo.png",
    name: "ETV Hamburg",
    branche: "Sport / Ehrenamtliche Pressearbeit",
    headline: "28 Pressemeldungen. Der Rest der Liga: null bis zwei.",
    problem: "Ein ehrenamtliches Team, kein Pressesprecher, kein Budget für eine Agentur – aber der Deutsche Schwimmverband erwartet professionelle Pressearbeit nach jedem Spieltag.",
    loesung: "KI-Workflow auf Basis vorhandener Daten: Spielbogen, Statistiken, Spielerinnen-O-Töne. Die KI transkribiert, recherchiert und schreibt nach einer gemeinsam entwickelten Richtlinie.",
    ergebnis: "28 Pressemeldungen in einer Saison. Der Tabellenführer kommt auf acht. Durchgehende, professionelle Pressearbeit auf der Verbandsplattform, eigenen Kanälen und in der regionalen Presse.",
  },
  {
    logo: "/assets/innolea-logo.png",
    name: "Innolea Institut",
    branche: "Digitale Weiterbildung",
    headline: "Ein Bot, der nach Mentor klingt – nicht nach Callcenter.",
    problem: "Innolea ist ein digitales Boutique-Institut, das sich durch 20 Stunden persönliche Mentorenbetreuung von großen Anbietern unterscheidet. Der alte Telefonauftritt klang wie alle anderen.",
    loesung: "Intensive Markenarbeit vor dem ersten Skript: Welcher Charakter ist Innolea? Wie klingt ein Mentor? Erst aus dieser Arbeit entstand die Stimme des Bots.",
    ergebnis: "Wer bei Innolea anruft, bekommt vom ersten Moment an ein Gefühl für das Institut. Nicht durch einen Flyer – durch ein Gespräch, das das Versprechen der Marke hält.",
  },
  {
    logo: "/assets/urgh-logo.png",
    name: "Urgh Elektrolyte Booster",
    branche: "FMCG / Consumer Brand",
    headline: "Kein Bot, der antwortet. Ein Bot, der fragt.",
    problem: "Urgh ist ein Elektrolyte Booster – und eine völlig verrückte Marke. Die Frage war nicht wie man den Bot nützlich macht, sondern wie man ihn unvergesslich macht.",
    loesung: "Wer anruft, landet in einer Unterhaltung mit dem Monster. Es fragt über Kater, lädt zu einem Battle ein, vergibt Punkte – wer genug sammelt, gewinnt 25% Rabatt.",
    ergebnis: "Markenerlebnis, das kein TV-Spot schafft. Gleichzeitig handfeste Marktforschung: Daten darüber, wie Menschen wirklich über Kater sprechen.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* TÜV-Störer */}
      <div className="bg-black text-off-white flex items-center justify-center gap-2 py-2 px-4">
        <IconStar size={16} className="text-off-white shrink-0" />
        <p className="text-[0.8rem] font-medium tracking-[0.06em] text-center">
          TÜV-zertifizierter Manager für angewandte KI-Transformation · 16 Module · Geprüfte Kompetenz
        </p>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-4">KI-Beratung für KMU · Hamburg</p>
            <h1 className="mb-6">
              KI made simple –<br />
              für KMU die wirklich<br />
              loslegen wollen.
            </h1>
            <p className="text-dark-gray text-lg mb-8 max-w-lg">
              Kein Hype. Kein Buzzword-Theater. Was KI für deinen Betrieb bedeutet – konkret, verständlich, mit echtem Ergebnis.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <Link
                href="/reifegrad-check"
                className="inline-flex items-center gap-2 bg-bright-red text-white font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity"
              >
                KI-Reifegrad-Check starten
                <IconArrowRight size={16} />
              </Link>
              <a
                href="#mastery-roadmap"
                className="inline-flex items-center gap-2 border-2 border-black text-black font-semibold px-6 py-3 okai-shape-sm hover:bg-black hover:text-off-white transition-colors"
              >
                Wie es funktioniert
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-dark-gray">
              <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-bright-red" /> Kostenlos</span>
              <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-bright-red" /> Kein Login</span>
              <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-bright-red" /> Sofortergebnis</span>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/assets/lars-hero.png"
              alt="Lars Fiëck – Strategy Director & AI Consultant"
              width={500}
              height={650}
              className="rounded-2xl object-cover w-full max-w-md mx-auto"
              priority
            />
            <div className="mt-4 flex items-center gap-3 justify-center">
              <Image
                src="/assets/tuev-testmark.jpg"
                alt="TÜV-Testmark"
                width={60}
                height={60}
                className="h-14 w-auto object-contain"
              />
              <p className="caption">TÜV-zertifizierter Manager für<br />angewandte KI-Transformation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust-Logos */}
      <section className="py-10 border-y border-sand-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-center mb-6">Vertrauen von</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={32}
                className="h-8 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust-Merkmale / Qualifikationen */}
      <section className="py-14 bg-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {qualifications.map((q) => (
              <div key={q.title} className="bg-sand okai-shape-md p-4 text-center">
                <q.icon size={24} className="mx-auto mb-2 text-dark-gray" />
                <p className="text-sm font-semibold">{q.title}</p>
                <p className="caption whitespace-pre-line">{q.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problemkarten */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Welche Frage bringt dich hierher?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((p) => (
              <Link
                key={p.text}
                href={p.href}
                className="group block bg-off-white border-l-4 border-bright-red okai-shape-md p-6 hover:translate-x-1 transition-transform"
              >
                <p className="text-dark-gray group-hover:text-black transition-colors">{p.text}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-bright-red">
                  Mehr erfahren <IconArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KI-Reifegrad-Check Sektion */}
      <section className="py-20 bg-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Finde heraus wo du stehst – bevor du einen Euro ausgibst.</h2>
              <p className="text-dark-gray mb-6">
                25 Fragen. 5 Minuten. Ein ehrliches Bild davon, wo dein Unternehmen bei KI wirklich steht – mit konkreter Einschätzung, was als nächstes sinnvoll ist. Kein Login. Kein Verkaufsgespräch.
              </p>
              <div className="flex flex-wrap gap-4 mb-8 text-sm">
                <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-bright-red" /> Kein Login nötig</span>
                <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-bright-red" /> Sofortergebnis</span>
                <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-bright-red" /> Kostenlos</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/reifegrad-check"
                  className="inline-flex items-center gap-2 bg-bright-red text-white font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity"
                >
                  Check starten <IconArrowRight size={16} />
                </Link>
                <Link href="/reifegrad-check/ablauf" className="inline-flex items-center gap-2 text-sm font-semibold text-dark-gray hover:text-black">
                  Mehr über den Ablauf <IconArrowRight size={14} />
                </Link>
              </div>
            </div>
            <div className="bg-sand rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center text-mid-gray">
                <IconChart size={48} className="mx-auto mb-4" />
                <p className="text-sm">Ampel-Radar Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OKAI Mastery Roadmap */}
      <section id="mastery-roadmap" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-3">OKAI Mastery Roadmap</p>
          <h2 className="mb-4">Erst verstehen. Dann planen. Dann umsetzen. Dann loslassen.</h2>
          <p className="text-dark-gray mb-12 max-w-2xl">
            Jede Stufe ist eigenständig buchbar – alle bauen aufeinander auf. Steig ein, wo du stehst. Nicht wo du sein solltest.
          </p>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {roadmapStages.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className={`shrink-0 w-64 okai-shape-md p-6 border border-sand-border hover:shadow-lg transition-shadow snap-start ${
                  s.color === "bg-black" ? "bg-black text-off-white" : "bg-off-white"
                }`}
              >
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${s.color} ${s.textColor || "text-black"}`}>
                  {s.stage}
                </span>
                <h3 className={`mb-2 ${s.color === "bg-black" ? "text-off-white" : ""}`}>{s.title}</h3>
                <p className={`text-sm mb-4 ${s.color === "bg-black" ? "text-sand-border" : "text-dark-gray"}`}>{s.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-full ${
                      s.color === "bg-black" ? "bg-dark-gray text-sand-border" : "bg-sand text-dark-gray"
                    }`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Arbeitsweise & Haltung */}
      <section className="py-20 bg-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12">Wie wir arbeiten.</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="bg-sand okai-shape-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <p.icon size={24} className="text-bright-red shrink-0" />
                  <h3>{p.title}</h3>
                </div>
                <p className="text-dark-gray">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/werte" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-bright-red transition-colors">
              Unsere vollständige KI-Policy lesen <IconArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Cases & Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12">Was dabei rauskommt.</h2>
          <div className="space-y-8">
            {cases.map((c) => (
              <div key={c.name} className="bg-off-white rounded-2xl p-8 border border-sand-border">
                <div className="flex items-center gap-4 mb-6">
                  <Image src={c.logo} alt={c.name} width={48} height={48} className="h-12 w-auto object-contain" />
                  <div>
                    <h3>{c.name}</h3>
                    <p className="caption">{c.branche}</p>
                  </div>
                </div>
                <p className="text-xl font-semibold mb-4">{c.headline}</p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="eyebrow mb-2">Problem</p>
                    <p className="text-sm text-dark-gray">{c.problem}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Lösung</p>
                    <p className="text-sm text-dark-gray">{c.loesung}</p>
                  </div>
                  <div>
                    <p className="eyebrow mb-2">Ergebnis</p>
                    <p className="text-sm text-dark-gray">{c.ergebnis}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section className="py-20 bg-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4">Lass uns reden.</h2>
          <p className="text-dark-gray mb-12 max-w-lg">
            Kein Formular-Ping-Pong. Einfach einen Termin wählen – oder direkt schreiben.
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">Termin buchen</p>
              <div className="bg-sand rounded-xl p-8 min-h-[300px] flex items-center justify-center border border-sand-border">
                <p className="text-mid-gray text-sm text-center">Calendly-Embed wird hier eingebunden sobald die URL vorliegt.</p>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <a href="tel:+491722928881" className="inline-flex items-center gap-3 text-lg font-medium hover:text-bright-red transition-colors">
                <IconPhone size={24} />
                +49 172 292 888 1
              </a>
              <a href="mailto:hallo@ok-ai.de" className="inline-flex items-center gap-3 text-lg font-medium hover:text-bright-red transition-colors">
                <IconMail size={24} />
                hallo@ok-ai.de
              </a>
              <a
                href="https://www.linkedin.com/in/lars-fieck"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-lg font-medium hover:text-bright-red transition-colors"
              >
                <IconLinkedIn size={24} />
                linkedin.com/in/lars-fieck
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
