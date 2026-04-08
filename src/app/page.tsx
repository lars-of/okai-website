import Image from "next/image";
import Link from "next/link";
import {
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
import { RadarChart } from "@/components/RadarChart";

/* ============================================
   Daten-Arrays
   ============================================ */

/* Kunden-Logos (Trust-Carousel) – ohne Fonio, ohne ISK */
const kundenLogos = [
  { src: "/assets/etv-logo.png", alt: "ETV Hamburg" },
  { src: "/assets/radblitz-logo.png", alt: "Radblitz" },
  { src: "/assets/urgh-logo.png", alt: "Urgh" },
  { src: "/assets/innolea-logo.png", alt: "Innolea" },
];

/* Partner-Logos */
const partnerLogos = [
  { src: "/assets/isk-logo.png", alt: "ISK – Institut für Strategie & Kommunikation", href: "https://isk-hamburg.de" },
  { src: "/assets/innolea-logo.png", alt: "Innolea Institut", href: "https://innolea-institut.com" },
  { src: "/assets/fonio-logo.png", alt: "Fonio", href: "https://fonio.ai" },
];

/* Zertifikate & Qualifikationen – für den Bereich Über Lars */
const zertifikate = [
  {
    logo: "/assets/tuev-testmark.jpg",
    title: "TÜV-zertifiziert",
    sub: "Manager KI-Transformation",
    href: "/assets/CR_Lars Fieck.pdf",
  },
  {
    logo: "/assets/Koerting_Institute.png",
    title: "Koerting Institut",
    sub: "KI Masterclass · 18 Monate",
    href: "https://koerting-institute.com/angebot/ki-masterclass/",
  },
  {
    logo: "/assets/innolea-logo.png",
    title: "Innolea Institut",
    sub: "Mentor",
    href: "https://innolea-institut.com/mentorinnen/",
  },
  {
    logo: "/assets/OAI0425_Logo_RZ.jpg",
    title: "LETUJA",
    sub: "Certified AI Consultant",
    href: "/assets/Zertifikat AI Consultant Lars Fieck.pdf",
  },
  {
    title: "5\u00d7 Effie Award",
    sub: "Gewinner",
    href: "#effie-awards",
    isEffie: true,
  },
];

/* Effie Award Cases */
const effieAwards = [
  { name: "J\u00e4germeister", href: "https://puk.agency/cases/im-eichenfass-zum-meister-gereift/" },
  { name: "PayOne", href: "https://www.youtube.com/watch?v=eXVwpbRE9QU" },
  { name: "Leica PaperSkin for Fedrigoni", href: "https://www.youtube.com/watch?v=Ip0smfIDQW4" },
];

/* Problemkarten – Platzhalter, Inhalte kommen per MD vom Kunden */
const problems = [
  { text: "\u201eIch wei\u00df nicht, wo ich mit KI anfangen soll.\u201c", headline: "KMU \u00b7 10\u201350 Mitarbeiter", href: "/reifegrad-check" },
  { text: "\u201eMein Team nutzt KI \u2013 aber ohne Plan und ohne Ergebnis.\u201c", headline: "Dienstleistung \u00b7 50\u2013250 MA", href: "/ai-license" },
  { text: "\u201eWir verpassen Anrufe nach 17 Uhr \u2013 das kostet uns Auftr\u00e4ge.\u201c", headline: "Handwerk \u00b7 1\u201310 MA", href: "/mastery-roadmap#autopilot" },
  { text: "\u201eWir wissen, dass KI hilft \u2013 aber nicht welcher Prozess zuerst.\u201c", headline: "Handel \u00b7 50\u2013250 MA", href: "/mastery-roadmap#roadmap" },
  { text: "\u201eIch will KI einsetzen, aber rechtlich auf der sicheren Seite sein.\u201c", headline: "Finanzen \u00b7 250+ MA", href: "/mastery-roadmap#durchblick" },
  { text: "\u201eWir haben eine Idee f\u00fcr KI \u2013 aber keinen Prototyp.\u201c", headline: "Marketing \u00b7 10\u201350 MA", href: "/mastery-roadmap#loesung" },
];

/* Mastery Roadmap Stufen */
const roadmapStages = [
  {
    stage: "Einstieg",
    title: "Lead Magnete",
    description: "Finde heraus wo du stehst \u2013 bevor du einen Euro ausgibst.",
    tags: ["KI-Reifegrad-Check", "KI-Mythen-Serie"],
    color: "bg-sky",
    href: "/reifegrad-check",
  },
  {
    stage: "Stufe 1",
    title: "KI Durchblick",
    description: "Verstehen, was KI f\u00fcr deinen Betrieb bedeutet \u2013 bevor du investierst.",
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
    title: "KI L\u00f6sung",
    description: "Vom Prototyp zur Produktion. KI, die wirklich in deinem Betrieb l\u00e4uft.",
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

/* Arbeitsweise – ohne "Integer" */
const principles = [
  { icon: IconCompass, title: "Smart", text: "KI gezielt einsetzen, nicht blind. Wir wissen wann Automatisierung hilft und wann menschliche Kompetenz unersetzlich bleibt." },
  { icon: IconLightning, title: "Energetisch", text: "Begeisterung f\u00fcr Fortschritt. Wer mit uns arbeitet sp\u00fcrt: Hier geht es um motiviertes Arbeiten mit echtem Impact." },
  { icon: IconLayers, title: "L\u00f6sungsorientiert", text: "Fokus statt Herumprobieren. Testen, justieren, optimieren \u2013 immer mit dem Ziel die beste L\u00f6sung aufzusetzen." },
];

/* Cases */
const cases = [
  {
    logo: "/assets/etv-logo.png",
    name: "ETV Hamburg",
    branche: "Sport / 1. Bundesliga Wasserball Damen",
    headline: "28 Pressemeldungen. Der Rest der Liga: null bis zwei.",
    problem: "Der ETV Hamburg ist mit 20.000 Mitgliedern der zweitgr\u00f6\u00dfte Breitensportverein Deutschlands. Die Wasserballerinnen spielen in der 1. Bundesliga und international in der Nordic League. Aber: Ein ehrenamtliches Team, kein Pressesprecher, kein Budget f\u00fcr eine Agentur.",
    loesung: "KI-Workflow auf Basis vorhandener Daten: Spielbogen, Statistiken, Spielerinnen-O-T\u00f6ne. Die KI transkribiert, recherchiert und schreibt nach einer gemeinsam entwickelten Richtlinie.",
    ergebnis: "28 Pressemeldungen in einer Saison. Der Tabellenf\u00fchrer kommt auf acht. Durchgehende, professionelle Pressearbeit auf der Verbandsplattform, eigenen Kan\u00e4len und in der regionalen Presse.",
    linkedin: "https://www.linkedin.com/company/etv-hamburg-wasserball",
  },
  {
    logo: "/assets/innolea-logo.png",
    name: "Innolea Institut",
    branche: "Digitale Weiterbildung",
    headline: "Ein Bot, der nach Mentor klingt \u2013 nicht nach Callcenter.",
    problem: "Innolea ist ein digitales Boutique-Institut, das sich durch 20 Stunden pers\u00f6nliche Mentorenbetreuung von gro\u00dfen Anbietern unterscheidet. Der alte Telefonauftritt klang wie alle anderen.",
    loesung: "Intensive Markenarbeit vor dem ersten Skript: Welcher Charakter ist Innolea? Wie klingt ein Mentor? Erst aus dieser Arbeit entstand die Stimme des Bots.",
    ergebnis: "Wer bei Innolea anruft, bekommt vom ersten Moment an ein Gef\u00fchl f\u00fcr das Institut. Nicht durch einen Flyer \u2013 durch ein Gespr\u00e4ch, das das Versprechen der Marke h\u00e4lt.",
  },
  {
    logo: "/assets/urgh-logo.png",
    name: "Urgh Elektrolyte Booster",
    branche: "FMCG / Consumer Brand",
    headline: "Kein Bot, der antwortet. Ein Bot, der fragt.",
    problem: "Urgh ist ein Elektrolyte Booster \u2013 und eine v\u00f6llig verr\u00fcckte Marke. Die Frage war nicht wie man den Bot n\u00fctzlich macht, sondern wie man ihn unvergesslich macht.",
    loesung: "Wer anruft, landet in einer Unterhaltung mit dem Monster. Es fragt \u00fcber Kater, l\u00e4dt zu einem Battle ein, vergibt Punkte \u2013 wer genug sammelt, gewinnt 25% Rabatt.",
    ergebnis: "Markenerlebnis, das kein TV-Spot schafft. Gleichzeitig handfeste Marktforschung: Daten dar\u00fcber, wie Menschen wirklich \u00fcber Kater sprechen.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ============================================
          S1: HERO – Schwarzer Hintergrund
          ============================================ */}
      <section className="bg-black text-white min-h-screen flex items-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-28 md:pb-24 w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Links: Text */}
            <div>
              <p className="eyebrow mb-5 !text-sand-border">KI-Beratung für KMU · Hamburg</p>
              <h1 className="mb-6 text-white">
                KI made simple –<br />
                für KMU die wirklich<br />
                loslegen wollen.
              </h1>
              <p className="text-sand-border text-lg leading-relaxed mb-10 max-w-lg">
                Kein Hype. Kein Buzzword-Theater. Was KI für deinen Betrieb bedeutet – konkret, verständlich, mit echtem Ergebnis.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/reifegrad-check"
                  className="inline-flex items-center gap-2 bg-bright-red text-white font-semibold px-7 py-3.5 okai-shape-sm hover:opacity-90 transition-opacity"
                >
                  KI-Reifegrad-Check starten
                  <IconArrowRight size={16} />
                </Link>
              </div>
              <div className="flex flex-wrap gap-5 text-sm text-mid-gray">
                <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-bright-red" /> Kostenlos</span>
                <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-bright-red" /> Kein Login</span>
                <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-bright-red" /> Sofortergebnis</span>
              </div>
            </div>

            {/* Rechts: Portrait – kreativ im Anschnitt, ohne Kasten */}
            <div className="relative flex justify-end">
              <div className="relative w-full max-w-md">
                {/* Foto ragt über den Rand hinaus, kein Kasten */}
                <Image
                  src="/assets/lars-hero.png"
                  alt="Lars Fiëck – Strategy Director & AI Consultant"
                  width={480}
                  height={600}
                  className="object-cover object-top w-full h-[450px] md:h-[560px] okai-shape-lg"
                  priority
                />
                {/* TÜV-Badge als Kreis */}
                <div className="absolute -bottom-6 left-0 bg-white rounded-full w-24 h-24 md:w-28 md:h-28 shadow-xl flex items-center justify-center p-2">
                  <Image
                    src="/assets/tuev-testmark.jpg"
                    alt="TÜV-zertifiziert"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          S2: KUNDEN – Weißer Hintergrund
          ============================================ */}
      <section className="py-12 bg-white overflow-hidden">
        <p className="text-lg font-semibold text-center mb-8 text-dark-gray">Kunden</p>
        <div className="trust-carousel">
          <div className="trust-carousel-track">
            {[...kundenLogos, ...kundenLogos, ...kundenLogos].map((logo, i) => (
              <Image
                key={`${logo.alt}-${i}`}
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={80}
                className="h-16 md:h-20 w-auto object-contain shrink-0 mx-8 md:mx-14"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          S3: PARTNER – Sandfarben
          ============================================ */}
      <section className="py-14 bg-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-center mb-8">OKAI Partner</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center">
            {partnerLogos.map((p) => (
              <a key={p.alt} href={p.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={160}
                  height={60}
                  className="h-12 md:h-16 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          S4: HERAUSFORDERUNGEN – Weißer Hintergrund
          ============================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center mb-12">Vor welcher KI-Herausforderung steht dein Unternehmen?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {problems.map((p) => (
              <Link
                key={p.text}
                href={p.href}
                className="group block bg-off-white border-l-4 border-bright-red okai-shape-md p-6 hover:translate-x-1 transition-transform"
              >
                <p className="eyebrow !text-bright-red mb-2">{p.headline}</p>
                <p className="text-dark-gray group-hover:text-black transition-colors">{p.text}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-bright-red">
                  Mehr erfahren <IconArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          S5: REIFEGRAD-CHECK – Schwarz mit Akzentfarben
          ============================================ */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow !text-mint mb-3">KI-Reifegrad-Check</p>
              <h2 className="mb-6 text-white">Finde heraus wo du stehst – bevor du einen Euro ausgibst.</h2>
              <p className="text-sand-border mb-6">
                25 Fragen. 5 Minuten. Ein ehrliches Bild davon, wo dein Unternehmen bei KI wirklich steht – mit konkreter Einschätzung, was als nächstes sinnvoll ist.
              </p>
              <div className="flex flex-wrap gap-4 mb-8 text-sm text-sand-border">
                <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-mint" /> Kein Login nötig</span>
                <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-mint" /> Sofortergebnis</span>
                <span className="flex items-center gap-1.5"><IconCheck size={16} className="text-mint" /> Kostenlos</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/reifegrad-check"
                  className="inline-flex items-center gap-2 bg-bright-red text-white font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity"
                >
                  Check starten <IconArrowRight size={16} />
                </Link>
                <Link href="/reifegrad-check/ablauf" className="inline-flex items-center gap-2 text-sm font-semibold text-sand-border hover:text-white">
                  Mehr über den Ablauf <IconArrowRight size={14} />
                </Link>
              </div>
            </div>
            {/* Spinnendiagramm */}
            <div className="flex items-center justify-center">
              <RadarChart className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          S6: MASTERY ROADMAP – Sand
          ============================================ */}
      <section id="mastery-roadmap" className="py-20 bg-sand">
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
                  s.color === "bg-black" ? "bg-black text-off-white" : "bg-white"
                }`}
              >
                <span className={`inline-block px-2.5 py-1 okai-shape-sm text-xs font-semibold mb-3 ${s.color} ${s.textColor || "text-black"}`}>
                  {s.stage}
                </span>
                <h3 className={`mb-2 ${s.color === "bg-black" ? "text-off-white" : ""}`}>{s.title}</h3>
                <p className={`text-sm mb-4 ${s.color === "bg-black" ? "text-sand-border" : "text-dark-gray"}`}>{s.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className={`text-xs px-2 py-0.5 okai-shape-sm ${
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

      {/* ============================================
          S7: ARBEITSWEISE – Weiß
          ============================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12">Wie wir arbeiten.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="bg-off-white okai-shape-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <p.icon size={24} className="text-bright-red shrink-0" />
                  <h3>{p.title}</h3>
                </div>
                <p className="text-dark-gray">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          S8: KI-POLICY – Bright Red Akzent
          ============================================ */}
      <section className="py-20 bg-bright-red text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow !text-white/70 mb-3">KI-Policy</p>
              <h2 className="text-white mb-6">Struktur statt Chaos. Ein Manifest statt einer 80-Seiten-Richtlinie.</h2>
              <p className="text-white/85 mb-6">
                KI einzuführen funktioniert nicht mit einem dicken Regelwerk, das niemand liest. Es braucht ein klares, kurzes Manifest – verständlich für alle, umsetzbar ab Tag eins. Nicht perfekt, aber wirksam. Nicht kompliziert, aber verbindlich.
              </p>
              <p className="text-white/85 mb-8">
                Die OKAI Policy ist genau das: Ein Rahmen, der Orientierung gibt, ohne zu bremsen. Weil strukturiertes Handeln nicht schwer sein muss – sondern leicht gemacht werden sollte.
              </p>
              <Link
                href="/werte"
                className="inline-flex items-center gap-2 bg-white text-bright-red font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity"
              >
                KI-Manifest lesen <IconArrowRight size={16} />
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-white/15 backdrop-blur-sm okai-shape-lg p-8 md:p-10 max-w-sm">
                <p className="text-2xl font-bold mb-4">OKAI KI-Manifest</p>
                <ul className="space-y-3 text-white/90">
                  <li className="flex items-start gap-2"><IconCheck size={18} className="text-white shrink-0 mt-0.5" /> Mensch vor Maschine</li>
                  <li className="flex items-start gap-2"><IconCheck size={18} className="text-white shrink-0 mt-0.5" /> Transparenz bei jedem KI-Einsatz</li>
                  <li className="flex items-start gap-2"><IconCheck size={18} className="text-white shrink-0 mt-0.5" /> Daten schützen, Vertrauen aufbauen</li>
                  <li className="flex items-start gap-2"><IconCheck size={18} className="text-white shrink-0 mt-0.5" /> Einfach starten, stetig verbessern</li>
                  <li className="flex items-start gap-2"><IconCheck size={18} className="text-white shrink-0 mt-0.5" /> Verantwortung übernehmen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          S9: CASES – Sand
          ============================================ */}
      <section className="py-20 bg-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12">Was dabei rauskommt.</h2>
          <div className="space-y-8">
            {cases.map((c) => (
              <div key={c.name} className="bg-white okai-shape-md p-8 border border-sand-border">
                <div className="flex items-center gap-4 mb-6">
                  <Image src={c.logo} alt={c.name} width={48} height={48} className="h-12 w-auto object-contain" />
                  <div>
                    <h3>{c.name}</h3>
                    <p className="caption">{c.branche}</p>
                  </div>
                  {c.linkedin && (
                    <a href={c.linkedin} target="_blank" rel="noopener noreferrer" className="ml-auto text-mid-gray hover:text-bright-red transition-colors">
                      <IconLinkedIn size={20} />
                    </a>
                  )}
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

      {/* ============================================
          S10: ÜBER LARS – Schwarz
          ============================================ */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Foto + Zertifikate darunter */}
            <div>
              <div className="overflow-hidden okai-shape-lg h-[400px] md:h-[480px] mb-8">
                <Image
                  src="/assets/lars-ganzkoerper.jpg"
                  alt="Lars Fiëck"
                  width={500}
                  height={650}
                  className="object-cover object-top w-full h-full"
                />
              </div>
              {/* Zertifikate als Logo-Grid unter dem Foto */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {zertifikate.map((z) => (
                  <a
                    key={z.title}
                    href={z.href}
                    target={z.href.startsWith("http") ? "_blank" : "_self"}
                    rel={z.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="bg-white/10 hover:bg-white/20 transition-colors okai-shape-sm p-3 flex flex-col items-center text-center gap-2"
                    title={`${z.title} – ${z.sub}`}
                  >
                    {z.logo ? (
                      <Image src={z.logo} alt={z.title} width={48} height={48} className="h-10 w-auto object-contain" />
                    ) : (
                      <IconShield size={28} className="text-bright-red" />
                    )}
                    <span className="text-[0.65rem] leading-tight text-sand-border">{z.title}</span>
                  </a>
                ))}
              </div>
              {/* Effie Awards Detail */}
              <div id="effie-awards" className="mt-4 flex flex-wrap gap-2">
                {effieAwards.map((e) => (
                  <a
                    key={e.name}
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sand-border hover:text-bright-red transition-colors underline decoration-dotted"
                  >
                    Effie: {e.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="eyebrow !text-bright-red mb-3">Über Lars</p>
              <h2 className="mb-6 text-white">Strategy Director, Mentor und TÜV-zertifizierter Berater für angewandte KI-Transformation.</h2>
              <p className="text-sand-border mb-4">
                Sein Hintergrund reicht von Bankausbildung und BWL bis zu vielen Jahren in Strategie und Beratung mit Einblicken in unterschiedlichste Branchen – von Finanzen, Automobil und Konsumgütern bis zu Industrie, Verbänden und Sport.
              </p>
              <p className="text-sand-border mb-4">
                Heute unterstützt er Unternehmen dabei, KI nicht als Hype zu betrachten, sondern als anwendbaren Hebel für bessere Entscheidungen, wirksamere Prozesse und neue Formen der Zusammenarbeit. Sein Fokus liegt auf verständlicher Vermittlung, praxisnaher Umsetzung und der Frage, wie KI im Alltag wirklich anschlussfähig wird.
              </p>
              <p className="text-sand-border mb-8">
                Denn KI einzuführen bedeutet nicht nur, neue Technologien zu nutzen, sondern Veränderung sinnvoll zu gestalten.
              </p>
              {/* Bücher */}
              <div className="flex gap-4 mb-8">
                <Image src="/assets/buch-brand-innovation.jpg" alt="Brand Innovation (Buch)" width={80} height={110} className="h-28 w-auto object-cover okai-shape-sm shadow-lg" />
                <Image src="/assets/buch-ki-mensch-wandel.jpg" alt="KI, Mensch, Wandel (Buch)" width={80} height={110} className="h-28 w-auto object-cover okai-shape-sm shadow-lg" />
              </div>
              <Link href="/ueber-lars" className="inline-flex items-center gap-2 text-sm font-semibold text-bright-red hover:text-white transition-colors">
                Mehr über Lars <IconArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          S11: KONTAKT – Weiß
          ============================================ */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4">Lass uns reden.</h2>
          <p className="text-dark-gray mb-12 max-w-lg">
            Kein Formular-Ping-Pong. Einfach einen Termin wählen – oder direkt schreiben.
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow mb-4">Termin buchen</p>
              <div className="bg-off-white okai-shape-md p-8 min-h-[300px] flex items-center justify-center border border-sand-border">
                <p className="text-mid-gray text-sm text-center">Kalender-Integration folgt.</p>
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

      {/* ============================================
          S12: BLOG – Sand
          ============================================ */}
      <section className="py-20 bg-sand">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <p className="eyebrow mb-3">Blog</p>
              <h2>Gedanken zu KI, Strategie und Praxis.</h2>
            </div>
            <a
              href="https://innolea-institut.com/insights/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-bright-red hover:text-black transition-colors mt-4 md:mt-0"
            >
              Alle Artikel auf Innolea <IconArrowRight size={14} />
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Blog-Teaser Karten – verlinken auf Innolea Blog */}
            <a
              href="https://innolea-institut.com/insights/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white okai-shape-md p-6 hover:shadow-lg transition-shadow group"
            >
              <p className="eyebrow !text-bright-red mb-2">Insights</p>
              <h3 className="mb-2 group-hover:text-bright-red transition-colors">KI im Mittelstand: Wo anfangen?</h3>
              <p className="text-sm text-dark-gray">Warum die meisten KMU nicht am Wissen scheitern, sondern an der Reihenfolge.</p>
            </a>
            <a
              href="https://innolea-institut.com/insights/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white okai-shape-md p-6 hover:shadow-lg transition-shadow group"
            >
              <p className="eyebrow !text-bright-red mb-2">Praxis</p>
              <h3 className="mb-2 group-hover:text-bright-red transition-colors">KI-Policy: Warum ein Manifest reicht</h3>
              <p className="text-sm text-dark-gray">Statt 80-Seiten-Richtlinien: Wie ein kurzes, klares Dokument mehr bewirkt.</p>
            </a>
            <a
              href="https://innolea-institut.com/insights/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white okai-shape-md p-6 hover:shadow-lg transition-shadow group"
            >
              <p className="eyebrow !text-bright-red mb-2">Strategie</p>
              <h3 className="mb-2 group-hover:text-bright-red transition-colors">Von der KI-Idee zum Prototyp</h3>
              <p className="text-sm text-dark-gray">Der Weg von der ersten Idee zum funktionierenden KI-Werkzeug im Betrieb.</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
