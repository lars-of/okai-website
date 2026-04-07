import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum – OKAI",
  description: "Impressum von OKAI – KI-Beratung, Lars Fiëck, Hamburg.",
};

export default function ImpressumPage() {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-sm text-mid-gray mb-8">
          <Link href="/" className="hover:text-black">okai.de</Link>
          <span className="mx-2">›</span>
          <span>Impressum</span>
        </nav>

        <h1 className="mb-8">Impressum</h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-dark-gray">
          <section>
            <h2 className="text-lg font-semibold text-black mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              Lars Fiëck<br />
              OKAI – KI-Beratung<br />
              [Straße und Hausnummer]<br />
              [PLZ] Hamburg
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">Kontakt</h2>
            <p>
              Telefon: <a href="tel:+491722928881" className="text-bright-red hover:underline">+49 172 292 888 1</a><br />
              E-Mail: <a href="mailto:hallo@ok-ai.de" className="text-bright-red hover:underline">hallo@ok-ai.de</a><br />
              LinkedIn: <a href="https://www.linkedin.com/in/lars-fieck" target="_blank" rel="noopener noreferrer" className="text-bright-red hover:underline">linkedin.com/in/lars-fieck</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">Umsatzsteuer-Identifikationsnummer</h2>
            <p>gemäß § 27a UStG: [USt-IdNr.]</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
            <p>
              Unternehmensberater / KI-Consultant<br />
              Bundesrepublik Deutschland
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">Zertifizierungen</h2>
            <p>
              TÜV-zertifizierter Manager für angewandte KI-Transformation<br />
              Certified AI Consultant (CERTQUA/ZFU)
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>Lars Fiëck (Anschrift wie oben)</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black mb-2">Haftungsausschluss</h2>
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt verlinkter Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </section>

          <p className="caption mt-8">
            Stand: April 2026 – Vor Launch mit vollständiger Adresse ergänzen.
          </p>
        </div>
      </div>
    </div>
  );
}
