import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – OKAI",
  description: "Datenschutzerklärung von OKAI, Lars Fiëck, Hamburg.",
};

export default function DatenschutzPage() {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-mid-gray mb-8">
          <Link href="/" className="hover:text-black">okai.de</Link>
          <span className="mx-2">›</span>
          <span>Datenschutz</span>
        </nav>

        <h1 className="mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-neutral max-w-none space-y-8 text-dark-gray">
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">Verantwortlicher</h2>
            <p>
              Lars Fiëck / OKAI<br />
              [Adresse]<br />
              Hamburg<br />
              E-Mail: <a href="mailto:hallo@ok-ai.de" className="text-bright-red hover:underline">hallo@ok-ai.de</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">1. Allgemeine Hinweise</h2>
            <p>
              Diese Website erhebt und verarbeitet personenbezogene Daten nur im Rahmen der gesetzlichen Bestimmungen (DSGVO, BDSG). Diese Erklärung informiert über Art, Umfang und Zweck der Datenverarbeitung.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">2. Datenerfassung auf dieser Website</h2>
            <p>
              Beim Besuch der Website werden durch den Hosting-Anbieter automatisch Server-Logfiles erfasst (IP-Adresse, Datum/Uhrzeit, aufgerufene Seite, Browser). Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
            </p>
            <p>
              Hosting: Vercel Inc., San Francisco, USA<br />
              Verarbeitung auf Basis von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">3. Kontaktaufnahme</h2>
            <p>
              Bei Kontaktaufnahme per E-Mail werden die übermittelten Daten zur Bearbeitung der Anfrage gespeichert. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Daten werden nicht an Dritte weitergegeben.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">4. Calendly (Terminbuchung)</h2>
            <p>
              Für Terminbuchungen wird Calendly (Calendly LLC, Atlanta, USA) eingesetzt. Bei Buchung eines Termins werden Name und E-Mail-Adresse an Calendly übermittelt.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">5. KI-Reifegrad-Check</h2>
            <p>
              Der Check läuft auf Vercel. Ohne E-Mail-Eingabe werden keine personenbezogenen Daten gespeichert. Bei freiwilliger E-Mail-Angabe werden diese für die Report-Zustellung und optionale Follow-Up-E-Mails verwendet. Abmeldung jederzeit möglich.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">6. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Beschwerderecht bei der zuständigen Aufsichtsbehörde.
            </p>
            <p>
              Kontakt für Datenschutzanfragen: <a href="mailto:hallo@ok-ai.de" className="text-bright-red hover:underline">hallo@ok-ai.de</a>
            </p>
          </section>

          <p className="caption mt-8">
            Stand: April 2026 – Vor Launch aktualisieren.
          </p>
        </div>
      </div>
    </div>
  );
}
