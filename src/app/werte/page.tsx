import type { Metadata } from "next";
import Link from "next/link";
import {
  IconCheck,
  IconCompass,
  IconLightning,
  IconLayers,
  IconUser,
  IconShield,
  IconChevronDown,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Werte & KI-Policy – OKAI",
  description: "Haltung, Werte und KI-Policy von OKAI. Inklusive KI-Manifest und AI Policy als Beispiel für KMU.",
};

const values = [
  { icon: IconCheck, title: "Integer", text: "Ehrlich, transparent, auf Augenhöhe. Wir versprechen nur was wir halten können. Keine Blenderei." },
  { icon: IconCompass, title: "Smart", text: "KI gezielt einsetzen, nicht blind. Wir wissen wann Automatisierung hilft und wann menschliche Kompetenz unersetzlich bleibt." },
  { icon: IconLightning, title: "Energetisch", text: "Begeisterung für Fortschritt. Wer mit uns arbeitet spürt: Hier geht es um motiviertes Arbeiten mit echtem Impact." },
  { icon: IconLayers, title: "Lösungsorientiert", text: "Fokus statt Herumprobieren. Testen, justieren, optimieren – immer mit dem Ziel die beste Lösung aufzusetzen." },
];

const manifest = [
  { nr: 1, title: "KI ist Mittel. Nicht Zweck.", text: "Wir setzen KI ein, wenn sie einen echten Mehrwert bringt – für Menschen, für Prozesse, für Ergebnisse. Nicht weil sie gerade modern ist." },
  { nr: 2, title: "Menschen zuerst. Immer.", text: "HI · KI · HI: Erst analysiert menschliche Intelligenz die Ausgangslage. Dann arbeitet KI. Dann bewertet der Mensch das Ergebnis. Verantwortung bleibt beim Menschen. Immer." },
  { nr: 3, title: "Ehrlichkeit ist nicht verhandelbar.", text: "Wir sagen dir, wenn KI für dein Problem nicht die richtige Antwort ist. Manchmal kostet uns das einen Auftrag. Das ist uns recht." },
  { nr: 4, title: "Transparenz schafft Vertrauen.", text: "Wenn wir KI einsetzen, sagen wir das. Wir kennzeichnen KI-generierte Inhalte. Ohne Kleingedrucktes." },
  { nr: 5, title: "Recht ist Minimum. Nicht Maximum.", text: "Der EU AI Act und die DSGVO setzen Grenzen. Wir halten sie – und gehen darüber hinaus, wo es richtig ist." },
  { nr: 6, title: "Kompetenz ist Pflicht.", text: "Wer KI einsetzt, muss wissen was er tut. Deshalb schulen wir, testen wir, hinterfragen wir." },
  { nr: 7, title: "Fortschritt braucht Neugier – und Geduld.", text: "Wir bleiben neugierig ohne jeden Hype mitzumachen. Wir testen früh, ohne vorschnell zu skalieren." },
  { nr: 8, title: "Einfachheit ist eine Haltung.", text: "Jeder Mensch soll verstehen können, was KI in seinem Betrieb tut. Einfachheit bedeutet nicht Vereinfachung. Es bedeutet Respekt vor dem Gegenüber." },
  { nr: 9, title: "Nachhaltigkeit ist kein Trend.", text: "Wir wählen Werkzeuge und Partner bewusst. Wir nutzen KI gezielt, nicht verschwenderisch." },
];

const policyPrinciples = [
  { icon: IconUser, title: "Human Oversight: Menschen entscheiden.", text: "KI empfiehlt, analysiert, unterstützt. Alle relevanten Entscheidungen treffen Menschen. Ohne Ausnahme." },
  { icon: IconCheck, title: "Fairness: Keine Diskriminierung durch KI.", text: "Wir prüfen KI-Systeme auf Bias und diskriminierende Muster. Was wir nicht kontrollieren können, setzen wir nicht ein." },
  { icon: IconShield, title: "Transparenz: Kennzeichnung von KI-Output.", text: "Inhalte, die mit KI-Unterstützung entstanden sind, werden als solche gekennzeichnet. Immer und ohne Ausnahme." },
  { icon: IconShield, title: "Datensparsamkeit: Keine Personendaten in Public-AI.", text: "Personenbezogene Daten werden nicht in öffentlich zugängliche KI-Systeme eingegeben. Wir schulen alle Beteiligten darin aktiv." },
];

export default function WertePage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-mid-gray mb-8">
          <Link href="/" className="hover:text-black">okai.de</Link>
          <span className="mx-2">›</span>
          <span>Werte & KI-Policy</span>
        </nav>

        <h1 className="mb-4">Haltung. Nicht Theorie.</h1>
        <p className="text-xl text-dark-gray mb-16 max-w-2xl">
          KI verändert, wie wir arbeiten. Unsere Haltung dazu ist nicht verhandelbar – sie bestimmt, was wir empfehlen, wie wir arbeiten und was wir ablehnen.
        </p>

        {/* Die 4 Werte */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-off-white okai-shape-md p-6 border border-sand-border">
                <div className="flex items-center gap-3 mb-3">
                  <v.icon size={24} className="text-bright-red shrink-0" />
                  <h3>{v.title}</h3>
                </div>
                <p className="text-dark-gray">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* KI-Manifest */}
        <section id="manifest" className="mb-20">
          <p className="eyebrow mb-3">KI-Manifest</p>
          <h2 className="mb-4">Wie wir mit KI arbeiten – und warum.</h2>
          <p className="text-dark-gray mb-8">
            KI verändert, wie wir arbeiten. Das ist keine Drohung. Das ist eine Tatsache – und je nach Haltung entweder eine Chance oder eine Quelle endloser Ausreden, warum man noch nicht angefangen hat.
          </p>

          <div className="space-y-4">
            {manifest.map((m) => (
              <div key={m.nr} className="bg-off-white okai-shape-md p-6 border border-sand-border">
                <h3 className="mb-2">
                  <span className="text-bright-red font-bold mr-2">{m.nr}.</span>
                  {m.title}
                </h3>
                <p className="text-dark-gray">{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Policy */}
        <section className="mb-16">
          <p className="eyebrow mb-3">AI Policy · Ein Beispiel für KMU</p>
          <h2 className="mb-4">Unsere KI-Policy – und warum du eine brauchst.</h2>
          <p className="text-dark-gray mb-4">
            Eine AI Policy ist kein Bürokratieprojekt. Sie ist die schriftliche Antwort auf die Frage: Wie gehen wir in diesem Unternehmen mit KI um? Wer keine Antwort hat, überlässt diese Entscheidung dem Zufall.
          </p>
          <p className="text-dark-gray mb-8">
            Die OKAI AI Policy ist unser eigenes Beispiel. Sie steht für drei Dinge: Warum wir KI einsetzen, wie wir es tun und wo unsere Grenzen sind.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {policyPrinciples.map((p) => (
              <div key={p.title} className="bg-off-white okai-shape-md p-6 border border-sand-border">
                <p.icon size={24} className="text-dark-gray mb-3" />
                <h3 className="mb-2">{p.title}</h3>
                <p className="text-sm text-dark-gray">{p.text}</p>
              </div>
            ))}
          </div>

          <p className="text-dark-gray">
            Diese Policy ist kein abgeschlossenes Dokument. Sie entwickelt sich weiter – weil KI sich weiterentwickelt. Wer mit uns arbeitet, kann erwarten dass wir sie ernst nehmen und konsequent anwenden.
          </p>
        </section>

        {/* CTA */}
        <a href="#manifest" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-bright-red transition-colors">
          Das vollständige KI-Manifest lesen ↑
        </a>
      </div>
    </div>
  );
}
