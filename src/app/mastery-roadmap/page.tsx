import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "OKAI Mastery Roadmap – Alle Stufen im Überblick",
  description: "Fünf Stufen. Jede eigenständig. Alle aufeinander aufbauend. Steig ein wo du stehst.",
};

/* Roadmap-Visualisierung */
const stages = [
  { id: "einstieg", label: "0 Lead Magnete", color: "bg-sky" },
  { id: "durchblick", label: "1 KI Durchblick", color: "bg-mint" },
  { id: "roadmap", label: "2 KI Roadmap", color: "bg-sand-border" },
  { id: "loesung", label: "3 KI Lösung", color: "bg-bright-red/60" },
  { id: "autopilot", label: "4 KI Autopilot", color: "bg-black text-off-white" },
];

export default function MasteryRoadmapPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4">OKAI Mastery Roadmap</h1>
        <p className="text-xl text-dark-gray mb-12 max-w-2xl">
          Fünf Stufen. Jede eigenständig. Alle aufeinander aufbauend. Steig ein wo du stehst – nicht wo du sein solltest.
        </p>

        {/* Visuelle Roadmap Navigation */}
        <div className="flex flex-wrap gap-2 mb-16">
          {stages.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={`px-4 py-2 okai-shape-sm text-sm font-semibold ${s.color} hover:opacity-80 transition-opacity`}>
              {s.label}
            </a>
          ))}
        </div>

        {/* Sektion: Lead Magnete */}
        <section id="einstieg" className="mb-20 scroll-mt-24">
          <span className="inline-block bg-sky text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">Einstieg</span>
          <h2 className="mb-2">Einstieg</h2>
          <p className="text-dark-gray mb-4">Finde heraus wo du stehst – bevor du einen Euro ausgibst.</p>
          <p className="text-dark-gray mb-8">Zwei kostenlose Formate, die dir Orientierung geben – ohne Beratungsgespräch, ohne Verkaufsdruck.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-off-white okai-shape-md p-6 border border-sand-border">
              <h3 className="mb-1">KI-Reifegrad-Check</h3>
              <p className="caption mb-3">Kostenlos · 5 Minuten · Sofortergebnis</p>
              <p className="text-sm text-dark-gray mb-4">25 Fragen. 7 Dimensionen. Kein Login.</p>
              <div className="space-y-2">
                <Link href="/reifegrad-check" className="inline-flex items-center gap-1 text-sm font-semibold text-bright-red">
                  Check starten <IconArrowRight size={14} />
                </Link>
                <Link href="/reifegrad-check" className="block text-sm font-semibold hover:text-bright-red">
                  Mehr erfahren <IconArrowRight size={14} className="inline" />
                </Link>
              </div>
            </div>
            <div className="bg-off-white okai-shape-md p-6 border border-sand-border">
              <h3 className="mb-1">KI-Mythen-Serie</h3>
              <p className="caption mb-3">Kostenlos · 7 Wochen · E-Mail</p>
              <p className="text-sm text-dark-gray mb-4">20 Mythen. 3 pro Woche. Bullshitfrei. Endlich ein Ende.</p>
              <span className="text-sm text-mid-gray">Anmeldung in Kürze verfügbar</span>
            </div>
          </div>
        </section>

        {/* Stufe 1 */}
        <section id="durchblick" className="mb-20 scroll-mt-24">
          <span className="inline-block bg-mint text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">Stufe 1</span>
          <h2 className="mb-2">Stufe 1 – KI Durchblick</h2>
          <p className="text-dark-gray mb-4">Verstehen, was KI für deinen Betrieb bedeutet – bevor du investierst.</p>
          <p className="text-dark-gray mb-8">
            KI Durchblick gibt dir die Grundlage, um KI für dein Unternehmen richtig einzuordnen: nicht als Allheilmittel, nicht als Bedrohung, sondern als Werkzeug mit klaren Stärken und klaren Grenzen.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-off-white okai-shape-md p-6 border border-sand-border">
              <h3 className="mb-1">Das Briefing-Gespräch</h3>
              <p className="caption mb-3">30 Min. · Nur nach Check</p>
              <p className="text-sm text-dark-gray mb-4">Du hast den Check gemacht. Jetzt ordnen wir das Ergebnis gemeinsam ein.</p>
              <span className="text-xs text-mid-gray">Nur nach abgeschlossenem Check verfügbar</span>
            </div>
            <div className="bg-off-white okai-shape-md p-6 border border-sand-border">
              <h3 className="mb-1">EU-AI & Compliance Schulung</h3>
              <p className="caption mb-3">Halbtag · In-Company & E-Learning</p>
              <p className="text-sm text-dark-gray mb-4">Artikel 4 EU AI Act: Du musst schulen. Wir sorgen dafür, dass du nicht leiden musst.</p>
              <span className="text-sm text-mid-gray">Details in Kürze</span>
            </div>
            <div className="bg-off-white okai-shape-md p-6 border border-sand-border">
              <h3 className="mb-1">AI License</h3>
              <p className="caption mb-3">1–2 Tage · Workshop</p>
              <p className="text-sm text-dark-gray mb-4">Prompts schreiben war gestern. Mit einem AI Playbook das am Ende euch gehört.</p>
              <Link href="/ai-license" className="inline-flex items-center gap-1 text-sm font-semibold text-bright-red">
                Mehr erfahren <IconArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Stufe 2 */}
        <section id="roadmap" className="mb-20 scroll-mt-24">
          <span className="inline-block bg-sand-border text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">Stufe 2</span>
          <h2 className="mb-2">Stufe 2 – KI Roadmap</h2>
          <p className="text-dark-gray mb-8">Raus aus dem KI-Chaos. Rein in einen Plan, nach dem man wirklich handeln kann.</p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Scope & Discovery", meta: "Halbtag · Workshop", text: "50 KI-Ideen im Kopf – wir finden die drei, die sich wirklich lohnen." },
              { title: "Strategic Gap Check", meta: "Ganztag · Workshop", text: "Wo steht euer Unternehmen bei KI – wirklich? 7 Dimensionen. Eine ehrliche Heatmap." },
              { title: "AI Roadmap", meta: "Ganztag · Planungstag", text: "Priorisierte 6-Monats-Roadmap mit Quick Wins für die erste Woche." },
              { title: "Scope-Kombi", meta: "2 Tage · Bundle", text: "Tag 1: Möglichkeiten. Tag 2: Plan. Kein Informationsverlust dazwischen." },
            ].map((p) => (
              <div key={p.title} className="bg-off-white okai-shape-md p-6 border border-sand-border">
                <h3 className="mb-1">{p.title}</h3>
                <p className="caption mb-3">{p.meta}</p>
                <p className="text-sm text-dark-gray">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stufe 3 */}
        <section id="loesung" className="mb-20 scroll-mt-24">
          <span className="inline-block bg-bright-red/60 text-black text-xs font-semibold px-3 py-1 rounded-full mb-3">Stufe 3</span>
          <h2 className="mb-2">Stufe 3 – KI Lösung</h2>
          <p className="text-dark-gray mb-8">Vom Prototyp zur Produktion. KI, die wirklich in deinem Betrieb läuft.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "KI-Process-Check", meta: "Ganztag \u00b7 Analyse", text: "Ihr denkt \u201eda m\u00fcsste man was mit KI machen\u201c. Wir sagen euch ob das stimmt." },
              { title: "AI Concept Sprint", meta: "1\u20132 Tage \u00b7 Prototyping", text: "Meetings \u00fcber KI sind billig. Im Sprint baut ihr euren ersten Prototyp." },
              { title: "Umsetzungsbegleitung", meta: "Wochenweise · Retainer", text: "Du brauchst keinen KI-Entwickler. Du brauchst jemanden, der die richtigen Fragen stellt." },
            ].map((p) => (
              <div key={p.title} className="bg-off-white okai-shape-md p-6 border border-sand-border">
                <h3 className="mb-1">{p.title}</h3>
                <p className="caption mb-3">{p.meta}</p>
                <p className="text-sm text-dark-gray">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stufe 4 */}
        <section id="autopilot" className="mb-20 scroll-mt-24">
          <span className="inline-block bg-black text-off-white text-xs font-semibold px-3 py-1 rounded-full mb-3">Stufe 4</span>
          <h2 className="mb-2">Stufe 4 – KI Autopilot</h2>
          <p className="text-dark-gray mb-4">24/7 erreichbar. Einschalten und loslassen.</p>
          <p className="text-dark-gray mb-8">
            Die einzige Stufe, die auch ohne vorherigen Beratungsprozess funktioniert – weil manche Probleme keine Analyse brauchen, sondern eine Lösung.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-off-white okai-shape-md p-6 border border-sand-border">
              <h3 className="mb-1">Instant Telefon-Bot</h3>
              <p className="caption mb-3">Plug and Play · In 2–3 Tagen live</p>
              <p className="text-sm text-dark-gray">24/7 erreichbar. Auch nach 17 Uhr.</p>
            </div>
            <div className="bg-off-white okai-shape-md p-6 border border-sand-border">
              <h3 className="mb-1">Custom Telefon-Bot</h3>
              <p className="caption mb-3">Maßgefertigt · In 3 Wochen live</p>
              <p className="text-sm text-dark-gray">Dein Bot, deine Stimme, deine Prozesse.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-off-white rounded-2xl p-8 text-center border border-sand-border">
          <p className="text-lg font-semibold mb-4">Noch nicht sicher, wo du einsteigst?</p>
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
