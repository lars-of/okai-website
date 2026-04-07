import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight, IconCheck } from "@/components/Icons";

export const metadata: Metadata = {
  title: "AI License – Workshop KI-Arbeitskompetenz – OKAI",
  description: "Die AI License zeigt deinem Team, wie man KI wie einen Kollegen nutzt. Hands-on Workshop mit AI Playbook.",
};

const modules = [
  { nr: "01", title: "KI heute verstehen", label: "Grundlagen", text: "Von Prompting zu Conversational AI: Wie moderne KI-Systeme wirklich funktionieren und was das konkret für den Arbeitsalltag bedeutet. Ohne Buzzwords, mit echten Beispielen." },
  { nr: "02", title: "Tool-Landschaft 2026", label: "Orientierung", text: "Überblick über relevante Werkzeuge – Skills, Konnektoren, Agenten, Automatisierungen. Was wofür, was sich lohnt, was nicht. Ehrlich, ohne Herstellerwerbung." },
  { nr: "03", title: "Praktisches Arbeiten mit KI", label: "Praxis", text: "Live-Labs in Kleingruppen – direkt an echten Aufgaben aus dem eigenen Betrieb. Kein Demo-Modus, echte Arbeit. Der HI · KI · HI Ansatz als Kern." },
  { nr: "04", title: "Das persönliche AI Playbook", label: "Ergebnis", text: "Jeder Workshop ist anders – weil jedes Team andere Aufgaben hat. Das AI Playbook entsteht live: auf Basis der eigenen Erkenntnisse, der eigenen Sprache, der eigenen Praxis." },
];

const deliverables = [
  "Persönliches AI Playbook – Entsteht aus den eigenen Erkenntnissen. Gehört euch.",
  "Tool-Vergleichsmatrix – Welches Werkzeug wofür – ehrlich und auf dem aktuellen Stand.",
  "DSGVO & EU AI Act Guardrails – Klare Leitplanken für den rechtssicheren KI-Einsatz.",
  "NotebookLM-Podcast des Workshops – Das Playbook als Audio-Nachschlagewerk.",
  "4-Wochen Begleit-Serie – Impulse nach dem Workshop, damit das Gelernte bleibt.",
  "Optionale Zertifizierung \u2013 \u201eApplied AI Practitioner\u201c \u2013 nachweisbare Kompetenz.",
];

const formats = [
  { format: "In-Company · 1 Tag", detail: "Kompaktversion. Lars kommt zu euch, Beispiele aus eurem Alltag." },
  { format: "In-Company · 2 Tage", detail: "Empfohlen. Mehr Tiefe, mehr Praxis, vollständiges Playbook." },
  { format: "Online", detail: "Remote-Version für verteilte Teams. Flexibel terminierbar." },
  { format: "Offenes Seminar", detail: "Einzelbuchung möglich. Mit Entscheidern aus anderen Branchen." },
];

export default function AiLicensePage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-mid-gray mb-8">
          <Link href="/" className="hover:text-black">okai.de</Link>
          <span className="mx-2">›</span>
          <Link href="/mastery-roadmap" className="hover:text-black">OKAI Mastery Roadmap</Link>
          <span className="mx-2">›</span>
          <Link href="/mastery-roadmap#durchblick" className="hover:text-black">KI Durchblick</Link>
          <span className="mx-2">›</span>
          <span>AI License</span>
        </nav>

        {/* Badge */}
        <span className="inline-block bg-mint text-black text-xs font-semibold px-3 py-1 rounded-full mb-4">
          Stufe 1 · KI Durchblick
        </span>

        <h1 className="mb-2">AI License</h1>
        <p className="text-lg text-dark-gray mb-2">Workshop · KI-Arbeitskompetenz</p>
        <p className="text-xl text-dark-gray mb-8 max-w-2xl">
          Prompts schreiben war gestern. Die AI License zeigt deinem Team, wie man KI wie einen Kollegen nutzt – nicht wie ein Suchfeld. Hands-on, live, mit einem AI Playbook das am Ende euch gehört.
        </p>
        <p className="text-sm text-mid-gray mb-12">
          1–2 Tage · Hands-on Workshop · In-Company & Online · Bis 15 Personen
        </p>

        {/* Warum jetzt */}
        <section className="mb-16">
          <h2 className="mb-4">Warum jetzt</h2>
          <p className="text-dark-gray mb-4">
            KI hat sich in den letzten 12 Monaten fundamental verändert. Wer heute noch nur mit Einzelbefehlen arbeitet, lässt den größten Teil des Potenzials liegen. Die AI License setzt da an, wo die meisten KI-Schulungen aufhören: beim echten Arbeiten mit KI.
          </p>
          <blockquote className="border-l-4 border-bright-red pl-4 text-dark-gray italic">
            „KI ist nicht mehr ein Werkzeug, das man bedient. Sie wird zum Gesprächspartner, der mitdenkt."
          </blockquote>
        </section>

        {/* Was sich verändert hat */}
        <section className="mb-16">
          <h2 className="mb-8">Was sich verändert hat – KI 2.0</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Conversational AI", text: "Von Befehl und Ausführung zum echten Gespräch. KI interpretiert Absichten, nicht nur Anweisungen." },
              { title: "Skills & Konnektoren", text: "KI-Fähigkeiten die sich mit bestehenden Werkzeugen verbinden – ohne Entwickleraufwand." },
              { title: "Agentisches Arbeiten", text: "KI-Agenten übernehmen Aufgaben autonom und im Hintergrund – während du an etwas anderem arbeitest." },
              { title: "Automatisierung ohne Code", text: "Workflows entstehen aus natürlicher Sprache. Die technische Hürde ist niedriger als je zuvor." },
            ].map((item) => (
              <div key={item.title} className="bg-off-white okai-shape-md p-6 border border-sand-border">
                <h3 className="mb-2">{item.title}</h3>
                <p className="text-sm text-dark-gray">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Module */}
        <section className="mb-16">
          <h2 className="mb-8">Inhalt – 4 Module, 1 bis 2 Tage</h2>
          <div className="space-y-6">
            {modules.map((m) => (
              <div key={m.nr} className="bg-off-white okai-shape-md p-6 border border-sand-border">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-bold text-bright-red">{m.nr}</span>
                  <h3>{m.title}</h3>
                  <span className="text-xs bg-sand text-dark-gray px-2 py-0.5 rounded-full">{m.label}</span>
                </div>
                <p className="text-sm text-dark-gray">{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Was du bekommst */}
        <section className="mb-16">
          <h2 className="mb-8">Was du bekommst</h2>
          <div className="space-y-3">
            {deliverables.map((d) => (
              <div key={d} className="flex gap-3">
                <IconCheck size={20} className="text-bright-red shrink-0 mt-0.5" />
                <p className="text-dark-gray">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Formate */}
        <section className="mb-16">
          <h2 className="mb-8">Formate</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {formats.map((f) => (
              <div key={f.format} className="bg-off-white okai-shape-md p-6 border border-sand-border">
                <h3 className="mb-2">{f.format}</h3>
                <p className="text-sm text-dark-gray">{f.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Für wen */}
        <section className="mb-16">
          <h2 className="mb-4">Für wen</h2>
          <p className="text-dark-gray mb-4">
            Für alle, die täglich mit Text, Daten und Kommunikation arbeiten – vom Einsteiger bis zu denen, die bereits erste KI-Erfahrungen haben und jetzt mehr wollen.
          </p>
          <p className="text-sm text-dark-gray mb-4">
            <strong>Zielgruppen:</strong> Marketing-Teams · HR · Vertrieb · Operations · Führungskräfte · Kreativteams
          </p>
          <p className="text-sm text-dark-gray">
            <strong>Direkteinstieg möglich:</strong> Die AI License funktioniert ohne vorherigen Beratungsprozess. Wer den KI-Reifegrad-Check bereits gemacht hat, bekommt einen auf das Ergebnis zugeschnittenen Workshop.
          </p>
        </section>

        {/* Roadmap-Kontext */}
        <div className="bg-off-white okai-shape-md p-6 border border-sand-border mb-8">
          <p className="eyebrow mb-2">OKAI Mastery Roadmap</p>
          <p className="text-sm text-dark-gray">
            0 · Reifegrad-Check → <strong>1 · KI Durchblick</strong> → 2 · KI Roadmap → 3 · KI Lösung → 4 · KI Autopilot
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <Link href="/mastery-roadmap#durchblick" className="inline-flex items-center gap-1 text-sm font-semibold hover:text-bright-red">
            ← Zurück zu KI Durchblick
          </Link>
          <Link href="/mastery-roadmap#roadmap" className="inline-flex items-center gap-1 text-sm font-semibold hover:text-bright-red">
            Weiter zu KI Roadmap <IconArrowRight size={14} />
          </Link>
        </div>

        {/* CTA */}
        <Link
          href="/reifegrad-check"
          className="inline-flex items-center gap-2 bg-bright-red text-white font-semibold px-6 py-3 okai-shape-sm hover:opacity-90 transition-opacity"
        >
          KI-Reifegrad-Check starten <IconArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
