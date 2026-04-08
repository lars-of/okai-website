import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AGB – OKAI",
  description:
    "Allgemeine Geschäftsbedingungen von OKAI – KI-Beratung, Lars Fiëck, Hamburg.",
};

export default function AGBPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb-Navigation */}
        <nav className="text-sm text-mid-gray mb-8">
          <Link href="/" className="hover:text-black">
            okai.de
          </Link>
          <span className="mx-2">&rsaquo;</span>
          <span>AGB</span>
        </nav>

        <h1 className="mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

        {/* Hinweis: Entwurf */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-10 text-sm text-yellow-800">
          Diese AGB dienen als Entwurf und sollten vor Verwendung juristisch
          geprüft werden.
        </div>

        <div className="prose prose-neutral max-w-none space-y-8 text-dark-gray">
          {/* Stand */}
          <p className="text-sm text-mid-gray">Stand: April 2026</p>

          {/* --- 1. Geltungsbereich --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              1. Geltungsbereich
            </h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen (nachfolgend &bdquo;AGB&ldquo;)
              gelten für alle Geschäftsbeziehungen zwischen Lars Fiëck, OKAI –
              KI-Beratung, Hamburg (nachfolgend &bdquo;Auftragnehmer&ldquo;) und
              dem jeweiligen Auftraggeber (nachfolgend &bdquo;Auftraggeber&ldquo;).
            </p>
            <p>
              Die AGB gelten ausschließlich. Abweichende, entgegenstehende oder
              ergänzende Geschäftsbedingungen des Auftraggebers werden nur dann
              Vertragsbestandteil, wenn und soweit der Auftragnehmer ihrer Geltung
              ausdrücklich schriftlich zugestimmt hat.
            </p>
            <p>
              Die AGB gelten insbesondere für folgende Leistungen: KI-Beratung,
              Workshops, Schulungen, KI-Implementierung, Chatbot-Entwicklung und
              verwandte Dienstleistungen.
            </p>
          </section>

          {/* --- 2. Vertragsschluss --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              2. Vertragsschluss
            </h2>
            <p>
              Angebote des Auftragnehmers sind freibleibend und unverbindlich. Ein
              Vertrag kommt erst durch die schriftliche Auftragsbestätigung des
              Auftragnehmers oder durch Beginn der Leistungserbringung zustande.
            </p>
            <p>
              Mündliche Nebenabreden bedürfen der schriftlichen Bestätigung. Die
              Schriftform kann auch durch E-Mail gewahrt werden.
            </p>
          </section>

          {/* --- 3. Leistungen --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              3. Leistungen
            </h2>
            <p>
              Der Umfang der Leistungen ergibt sich aus dem jeweiligen Angebot
              bzw. der Auftragsbestätigung. Der Auftragnehmer erbringt
              insbesondere folgende Leistungen:
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>
                KI-Strategieberatung und Potenzialanalysen für kleine und
                mittlere Unternehmen (KMU)
              </li>
              <li>
                Workshops und Schulungen zum Thema Künstliche Intelligenz
              </li>
              <li>
                Konzeption und Implementierung von KI-Lösungen
              </li>
              <li>
                Entwicklung von Chatbots und automatisierten Assistenzsystemen
              </li>
              <li>
                Begleitung bei der Einführung von KI-Tools in bestehende
                Geschäftsprozesse
              </li>
            </ol>
            <p>
              Änderungen des Leistungsumfangs nach Vertragsschluss bedürfen einer
              gesonderten schriftlichen Vereinbarung. Mehrleistungen werden
              gesondert vergütet.
            </p>
          </section>

          {/* --- 4. Vergütung und Zahlung --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              4. Vergütung und Zahlung
            </h2>
            <p>
              Die Vergütung richtet sich nach dem jeweiligen Angebot. Alle Preise
              verstehen sich in Euro und zuzüglich der gesetzlichen
              Umsatzsteuer, sofern nicht anders angegeben.
            </p>
            <p>
              Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne
              Abzug per Banküberweisung zu begleichen. Bei Zahlungsverzug gelten
              die gesetzlichen Regelungen.
            </p>
            <p>
              Reisekosten und Auslagen werden, sofern vereinbart, gesondert nach
              tatsächlichem Aufwand in Rechnung gestellt.
            </p>
          </section>

          {/* --- 5. Mitwirkungspflichten des Auftraggebers --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              5. Mitwirkungspflichten des Auftraggebers
            </h2>
            <p>
              Der Auftraggeber stellt dem Auftragnehmer alle für die
              Leistungserbringung erforderlichen Informationen, Daten und
              Zugänge rechtzeitig und vollständig zur Verfügung.
            </p>
            <p>Dazu gehören insbesondere:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>
                Benennung eines Ansprechpartners mit Entscheidungsbefugnis
              </li>
              <li>
                Bereitstellung benötigter Daten, Systeme und Zugänge
              </li>
              <li>
                Rechtzeitige Rückmeldungen und Freigaben
              </li>
              <li>
                Sicherstellung, dass bereitgestellte Daten rechtmäßig verwendet
                werden dürfen
              </li>
            </ol>
            <p>
              Verzögerungen, die auf mangelnde Mitwirkung des Auftraggebers
              zurückzuführen sind, gehen nicht zu Lasten des Auftragnehmers.
              Dadurch entstehender Mehraufwand kann gesondert berechnet werden.
            </p>
          </section>

          {/* --- 6. KI-spezifische Klauseln --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              6. KI-spezifische Klauseln
            </h2>

            <h3 className="font-semibold text-black mt-4 mb-1">
              6.1 Keine Garantie auf KI-Ergebnisse
            </h3>
            <p>
              Künstliche Intelligenz basiert auf statistischen Modellen und
              Wahrscheinlichkeiten. Der Auftragnehmer kann daher keine Garantie
              für die Richtigkeit, Vollständigkeit oder Eignung der durch
              KI-Systeme erzeugten Ergebnisse übernehmen. KI-Ergebnisse stellen
              keine verbindliche Fachberatung dar.
            </p>

            <h3 className="font-semibold text-black mt-4 mb-1">
              6.2 Prüfpflicht bei KI-generierten Inhalten
            </h3>
            <p>
              KI-generierte Inhalte (Texte, Analysen, Code, Empfehlungen etc.)
              können Fehler, Ungenauigkeiten oder sogenannte
              &bdquo;Halluzinationen&ldquo; enthalten. Der Auftraggeber ist
              verpflichtet, alle KI-generierten Ergebnisse vor ihrer Verwendung
              eigenverantwortlich auf Richtigkeit, Rechtmäßigkeit und Eignung zu
              prüfen.
            </p>

            <h3 className="font-semibold text-black mt-4 mb-1">
              6.3 Haftungsausschluss für Entscheidungen auf Basis von
              KI-Empfehlungen
            </h3>
            <p>
              Der Auftragnehmer haftet nicht für Schäden, die dem Auftraggeber
              oder Dritten durch Entscheidungen entstehen, die auf Grundlage von
              KI-Empfehlungen, KI-Analysen oder KI-generierten Inhalten getroffen
              werden. Die Entscheidungsverantwortung verbleibt stets beim
              Auftraggeber.
            </p>

            <h3 className="font-semibold text-black mt-4 mb-1">
              6.4 Daten in KI-Tools – Verantwortung und Datenschutz
            </h3>
            <p>
              Werden im Rahmen der Zusammenarbeit Daten in KI-Tools
              (z.&nbsp;B. Sprachmodelle, Analyse-Tools) eingegeben, gelten
              folgende Regelungen:
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>
                Der Auftraggeber stellt sicher, dass er berechtigt ist, die
                jeweiligen Daten in die genutzten KI-Tools einzugeben.
              </li>
              <li>
                Der Auftragnehmer weist darauf hin, dass bei der Nutzung von
                KI-Diensten Dritter (z.&nbsp;B. OpenAI, Anthropic, Google) Daten
                an deren Server übermittelt werden können. Der Auftragnehmer
                achtet auf den Einsatz datenschutzkonformer Lösungen.
              </li>
              <li>
                Personenbezogene Daten oder Geschäftsgeheimnisse sollten nur nach
                ausdrücklicher Abstimmung in KI-Tools eingegeben werden.
              </li>
              <li>
                Der Auftragnehmer informiert den Auftraggeber vorab, welche
                KI-Tools im Projekt eingesetzt werden und welche
                Datenverarbeitungspraktiken damit verbunden sind.
              </li>
            </ol>

            <h3 className="font-semibold text-black mt-4 mb-1">
              6.5 EU AI Act – Compliance-Hinweis
            </h3>
            <p>
              Der Auftragnehmer orientiert sich bei der Auswahl und dem Einsatz
              von KI-Systemen an den Vorgaben der Verordnung (EU) 2024/1689
              (EU AI Act). Der Auftragnehmer berät den Auftraggeber im Rahmen
              seiner Möglichkeiten hinsichtlich der Risikoklassifizierung und der
              sich daraus ergebenden Pflichten. Eine Rechtsberatung im Sinne des
              Rechtsdienstleistungsgesetzes (RDG) erfolgt nicht.
            </p>
          </section>

          {/* --- 7. Urheberrecht und Nutzungsrechte --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              7. Urheberrecht und Nutzungsrechte
            </h2>
            <p>
              Alle im Rahmen des Auftrags erstellten Arbeitsergebnisse
              (Konzepte, Präsentationen, Dokumentationen, Code etc.) sind
              urheberrechtlich geschützt, soweit sie Schöpfungshöhe erreichen.
            </p>
            <p>
              Mit vollständiger Bezahlung der vereinbarten Vergütung erhält der
              Auftraggeber ein einfaches, nicht übertragbares Nutzungsrecht an den
              Arbeitsergebnissen für den vertraglich vereinbarten Zweck.
              Weitergehende Nutzungsrechte bedürfen einer gesonderten
              Vereinbarung.
            </p>
            <p>
              Für KI-generierte Inhalte gilt: Soweit KI-generierte Werke keinen
              urheberrechtlichen Schutz genießen (da sie nicht von einem Menschen
              geschaffen wurden), steht es dem Auftraggeber frei, diese nach
              eigenem Ermessen zu verwenden. Der Auftragnehmer übernimmt keine
              Gewähr dafür, dass KI-generierte Inhalte frei von Rechten Dritter
              sind.
            </p>
            <p>
              Der Auftragnehmer behält das Recht, die Art der erbrachten
              Leistungen (ohne vertrauliche Details) als Referenz zu nutzen,
              sofern der Auftraggeber nicht widerspricht.
            </p>
          </section>

          {/* --- 8. Vertraulichkeit und Datenschutz --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              8. Vertraulichkeit und Datenschutz
            </h2>
            <p>
              Beide Parteien verpflichten sich, alle im Rahmen der
              Zusammenarbeit erlangten vertraulichen Informationen und
              Geschäftsgeheimnisse streng vertraulich zu behandeln und nur für
              die Zwecke des Auftrags zu verwenden. Diese Pflicht besteht auch
              nach Beendigung des Vertragsverhältnisses fort.
            </p>
            <p>
              Soweit personenbezogene Daten verarbeitet werden, geschieht dies
              im Einklang mit der Datenschutz-Grundverordnung (DSGVO) und dem
              Bundesdatenschutzgesetz (BDSG). Sofern erforderlich, schließen die
              Parteien eine gesonderte Vereinbarung zur Auftragsverarbeitung gemäß
              Art.&nbsp;28 DSGVO.
            </p>
            <p>
              Weitere Informationen zum Datenschutz finden Sie in unserer{" "}
              <Link
                href="/datenschutz"
                className="text-bright-red hover:underline"
              >
                Datenschutzerklärung
              </Link>
              .
            </p>
          </section>

          {/* --- 9. Haftungsbeschränkung --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              9. Haftungsbeschränkung
            </h2>
            <p>
              Der Auftragnehmer haftet unbeschränkt für Schäden aus der
              Verletzung des Lebens, des Körpers oder der Gesundheit sowie für
              Schäden, die auf Vorsatz oder grober Fahrlässigkeit beruhen.
            </p>
            <p>
              Bei leichter Fahrlässigkeit haftet der Auftragnehmer nur bei
              Verletzung wesentlicher Vertragspflichten (Kardinalpflichten). In
              diesen Fällen ist die Haftung auf den vertragstypischen,
              vorhersehbaren Schaden begrenzt, maximal jedoch auf die Höhe der
              vereinbarten Nettovergütung des jeweiligen Einzelauftrags.
            </p>
            <p>
              Die Haftung für mittelbare Schäden, Folgeschäden und entgangenen
              Gewinn ist bei leichter Fahrlässigkeit ausgeschlossen.
            </p>
            <p>
              Die vorstehenden Haftungsbeschränkungen gelten auch zugunsten der
              Erfüllungsgehilfen des Auftragnehmers.
            </p>
          </section>

          {/* --- 10. Kündigung und Storno --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              10. Kündigung und Storno
            </h2>
            <p>
              Beratungsverträge können von beiden Seiten mit einer Frist von
              vier Wochen zum Monatsende schriftlich gekündigt werden, sofern
              nicht individuell anders vereinbart.
            </p>
            <p>Für Workshops und Schulungen gelten folgende Stornobedingungen:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>
                Stornierung bis 48 Stunden vor dem vereinbarten Termin:
                kostenfrei
              </li>
              <li>
                Stornierung weniger als 48 Stunden vor dem Termin: 50 % der
                vereinbarten Vergütung
              </li>
              <li>
                Nichterscheinen ohne Absage: 100 % der vereinbarten Vergütung
              </li>
            </ol>
            <p>
              Bei Absage durch den Auftragnehmer wird ein Ersatztermin angeboten
              oder bereits geleistete Zahlungen vollständig erstattet.
            </p>
            <p>
              Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt
              unberührt.
            </p>
          </section>

          {/* --- 11. Schlussbestimmungen --- */}
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">
              11. Schlussbestimmungen
            </h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss
              des UN-Kaufrechts.
            </p>
            <p>
              Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit
              diesen AGB ist Hamburg, sofern der Auftraggeber Kaufmann,
              juristische Person des öffentlichen Rechts oder
              öffentlich-rechtliches Sondervermögen ist.
            </p>
            <p>
              Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise
              unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen
              Bestimmungen unberührt. An die Stelle der unwirksamen Bestimmung
              tritt eine wirksame Regelung, die dem wirtschaftlichen Zweck der
              unwirksamen Bestimmung am nächsten kommt (salvatorische Klausel).
            </p>
            <p>
              Änderungen und Ergänzungen dieser AGB bedürfen der Schriftform.
              Dies gilt auch für die Aufhebung dieses Schriftformerfordernisses.
            </p>
          </section>

          {/* --- Kontakt --- */}
          <section className="border-t border-gray-200 pt-6 mt-10">
            <h2 className="text-lg font-semibold text-black mb-2">
              Kontakt
            </h2>
            <p>
              Lars Fiëck / OKAI – KI-Beratung
              <br />
              Hamburg
              <br />
              E-Mail:{" "}
              <a
                href="mailto:hallo@ok-ai.de"
                className="text-bright-red hover:underline"
              >
                hallo@ok-ai.de
              </a>
              <br />
              Web:{" "}
              <a
                href="https://ok-ai.de"
                className="text-bright-red hover:underline"
              >
                ok-ai.de
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
