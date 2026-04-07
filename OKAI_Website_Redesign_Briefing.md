# OKAI Website – Redesign & Reifegrad-Integration
## Briefing für Claude Code

**Stand:** 7. April 2026
**Projekt:** okai-website (Next.js / Tailwind / Vercel)
**Repository:** github.com/lars-of/okai-website
**Live:** www.ok-ai.de

---

## 1. PROJEKTÜBERSICHT

Das bestehende Next.js-Projekt soll grundlegend überarbeitet werden:

1. **Visuelles Redesign** der gesamten Website (Inspiration: weareplai.com – Weißraum, große Typo, klare Sektionen, elegantes UX)
2. **Reifegrad-Check** als vollständig integrierte Seite (bisher standalone HTML unter reifegrad.ok-ai.de)
3. **Unterseiten für alle Produkte** aus der Autonomie-Kette
4. **KI Myth-Busters Sektion** als Lead-Magnet
5. **Umlaute korrigieren** – überall echte ü, ö, ä, ß verwenden

---

## 2. CORPORATE IDENTITY – VERBINDLICH

### 2.1 Logo
**Regel für die Verwendung von „OKAI":**
- **Als Grafik/Logo** (Navigation, Hero, Footer, Favicon, Social): IMMER die offizielle Logo-Bilddatei verwenden (`okai-logo.png`), NIEMALS als gestylter Text nachbauen
- **Im Fließtext** (Absätze, Beschreibungen, Überschriften): Ganz normal „OKAI" als Text schreiben – keine Bild-Einbettung im Fließtext
- Datei: `OAI0425_Logo_RZ.png` (schwarze Wortmarke auf transparent)
- Kopiere die Datei als `okai-logo.png` nach `public/assets/`
- Erstelle auch eine weiße Version (`okai-logo-white.png`) für den dunklen Footer und den Dark-Mode-Bereich des Reifegrad-Checks
- Im Code: `<Image src="/assets/okai-logo.png" alt="OKAI" ... />` – kein Text-Logo

### 2.2 Farben (globals.css)
```css
--color-sand: #EAE6DD;
--color-bright-red: #EF646E;
--color-black: #000000;
--color-mint: #C4DFB6;
--color-sky: #AEC5EB;
--color-berry: #5F113F;
--color-off-white: #FDFCF9;
--color-dark-gray: #3A3A38;
--color-mid-gray: #7A7872;
--color-sand-border: #CEC9BE;
--color-white: #FFFFFF;
```

### 2.3 Schrift
- **Inter** (Google Font) – bereits konfiguriert via next/font
- Headlines: 700–900 weight
- Body: 400–500

### 2.4 Design-Sprache – Formprinzip
**WICHTIG: Alle Kästchen, Rahmen, Karten und Flächen haben links eckige Ecken und rechts abgerundete Ecken.**
```css
border-radius: 0 14px 14px 0; /* links eckig, rechts rund */
```
Varianten:
- Klein (Buttons, Tags): `border-radius: 0 8px 8px 0;`
- Mittel (Karten): `border-radius: 0 14px 14px 0;`
- Groß (Sektionen, Overlays): `border-radius: 0 20px 20px 0;`

### 2.5 Tonalität
- Integer, Smart, Energetisch, Lösungsorientiert
- Du-Ansprache, direkt, kein Buzzword-Theater
- Echte Umlaute (ü, ö, ä, ß) – ÜBERALL

### 2.6 Icons – Eigene OKAI Icon-Kollektion
Entwickle eine umfangreiche, konsistente Icon-Kollektion als SVG-Komponenten:
- Stil: Geometrisch, outline-basiert, strokeWidth 1.8
- Passend zur eckig-links-rund-rechts-Formensprache
- Exportiere als React-Komponenten in `src/components/Icons.tsx`

**Basis-Icons:** Check, Arrow, Star, Shield, Compass, Lightning, Layers, Chart, User, Calendar, Download, Play, Mail, LinkedIn, Telefon, Menu, Close, External

**Dimension-Icons (Reifegrad-Check):** Strategie (Zielscheibe), Prozesse (Kreislauf), Daten (Datenbank/Ellipsen), Technik (Netzwerk/Nodes), Kultur (Menschen), Haltung (Schild+Check), Recht (Waage)

**Spinnennetz/Radar-Icon:** Stilisiertes Spinnennetz-Diagramm für die Reifegrad-Check-Sektion

**Myth-Busters-Icons:** Blitz/Durchstreichen, Lupe, Gehirn/Sandwich (HI→KI→HI), Glühbirne, Fragezeichen-Explosion

**Produkt-Kategorie-Icons (steigende Autonomie):**
- Lead Magnete / Einstieg: Kompass (Orientierung)
- Stufe 1 KI Durchblick: Auge / Fernglas (Verstehen)
- Stufe 2 KI Roadmap: Karte / Route (Planen)
- Stufe 3 KI Lösung: Zahnrad+Blitz / Baustein (Umsetzen)
- Stufe 4 KI Autopilot: Rakete / Play-Button (Loslassen, Autonomie)

Die Icons sollen visuell eine Geschichte erzählen: vom Orientierung-Suchen (Kompass) über Verstehen (Auge) und Planen (Karte) zum Umsetzen (Zahnrad) bis zum autonomen Laufen (Rakete).

---

## 3. SEITENSTRUKTUR

### 3.1 Startseite (page.tsx)

Reihenfolge der Sektionen:

#### S0: Reifegrad-Check Störer (floating)
- **KEIN Balken!** Sondern ein echter Störer: Floating Element (z.B. rechts unten oder rechts mittig)
- Asymmetrische Form passend zum CD (links eckig, rechts rund)
- Leicht animiert (z.B. subtle pulse, sanftes Ein-/Ausblenden beim Scrollen, oder rotate-in)
- Text: „KI-Reifegrad-Check" + Subtext „5 Min. · Kostenlos"
- Button/Klickfläche: → Link auf `/reifegrad-check`
- Hintergrund: bright-red, Text weiß
- Soll Aufmerksamkeit erzeugen ohne zu nerven – eher wie ein smartes Badge als ein Banner
- Verschwindet wenn man auf der Reifegrad-Check-Seite selbst ist

#### S1: Navigation (sticky)
- OKAI-Logo (Bilddatei!) links
- Links: Leistungen, Reifegrad-Check, Werte, Über Lars
- CTA-Button rechts: „Check starten" → `/reifegrad-check`
- Button-Form: links eckig, rechts rund
- Mobile: Hamburger-Menü

#### S2: Hero
- Links: Eyebrow „KI-Beratung für KMU · Hamburg"
- Headline: „KI made simple –\nfür KMU die wirklich\nloslegen wollen."
- Subline: „Kein Hype. Kein Buzzword-Theater. Was KI für deinen Betrieb bedeutet – konkret, verständlich, mit echtem Ergebnis."
- 2 CTAs: „KI-Reifegrad-Check starten →" (bright-red) + „Wie es funktioniert" (Ghost)
- Rechts: Foto von Lars (`Lars_Fieck-c909.png` → kopiere nach `public/assets/lars-hero.png`)
- Darunter: TÜV-Testmark (`TR-Testmark_0217465986_DE_CMYK_with-QR-Code.jpg` → kopiere nach `public/assets/tuev-testmark.jpg`) mit Text: „TÜV-zertifizierter Manager für angewandte KI-Transformation"

#### S3: Trust-Logos (Auftraggeber)
- **Animiertes Carousel** – Logos scrollen automatisch von rechts nach links (infinite loop)
- Logos DEUTLICH GRÖSSER als bisher (ca. 80–100px Höhe)
- Freigestellt bzw. auf weißem Grund (damit sie freigestellt wirken)
- Logos: UWE, Urgh, Innolea, ETV, ISK, Radblitz, Fonio
- CSS: Keine Hover-Effekte nötig, smooth infinite scroll animation

#### S4: Problemkarten
- **Einleitung** mit kurzem Text über der Karten-Sektion: Headline + 2-3 Sätze
- 6 Karten, GRÖSSER als bisher
- Jede Karte zeigt:
  - Das Problem als Zitat (groß)
  - Branche / Kontext als kleinen Tag
  - Kurzer Teaser-Text zur Herausforderung
- Jede Karte verlinkt auf eine **eigene Unterseite** (z.B. `/herausforderungen/ki-einstieg`)
- Auf der Unterseite: Ausführlichere Beschreibung der Herausforderung + erst dort der Verweis auf das passende OKAI-Produkt
- Die 6 Probleme:
  1. „Ich weiß nicht, wo ich mit KI anfangen soll." → /herausforderungen/ki-einstieg
  2. „Mein Team nutzt KI – aber ohne Plan und ohne Ergebnis." → /herausforderungen/ki-ohne-plan
  3. „Wir verpassen Anrufe nach 17 Uhr – das kostet uns Aufträge." → /herausforderungen/erreichbarkeit
  4. „Wir wissen, dass KI hilft – aber nicht welcher Prozess zuerst." → /herausforderungen/prozess-prio
  5. „Ich will KI einsetzen, aber rechtlich auf der sicheren Seite sein." → /herausforderungen/ki-compliance
  6. „Wir haben eine Idee für KI – aber keinen Prototyp." → /herausforderungen/ki-prototyp

#### S5: Reifegrad-Check (prominent)
- Große Sektion mit Illustration/Grafik
- Headline: „Finde heraus wo du stehst – bevor du einen Euro ausgibst."
- 3 USPs: Kein Login · Sofortergebnis · Kostenlos
- CTA: „Check starten →" → `/reifegrad-check`
- Link: „Mehr über den Ablauf →"

#### S6: Die Autonomie-Kette / Mastery Roadmap
- Einleitungstext: „Erst verstehen. Dann planen. Dann umsetzen. Dann loslassen."
- 5 Karten NEBENEINANDER (horizontal scrollbar auf Mobile):
  - Einstieg: Lead Magnete (sky)
  - Stufe 1: KI Durchblick (mint)
  - Stufe 2: KI Roadmap (sand)
  - Stufe 3: KI Lösung (bright-red/60)
  - Stufe 4: KI Autopilot (black)
- Jede Karte verlinkt auf eine Produkt-Unterseite

#### S7: KI Myth-Busters (Lead-Magnet) – NEUE SEKTION
- **Hintergrund: bright-red** – soll Freude machen, auffallen
- Headline: „KI Myth-Busters"
- Subline: „Die Buzzwords, die im Business klug klingen – aber zu kurz greifen."
- Eigenes Myth-Buster-Icon (z.B. Blitz + Durchstreichen)

**Pilot-Mythos: „Wer heute vorne mitspielen will, muss KI-first denken."**
- Experte für DIESEN Mythos: „Demaskiert von Torsten Koerting, KI-Stratege und Gründer des Koerting Institute."
- WICHTIG: Koerting steht NUR für diesen einen Mythos. Er hat ihn „mitgebracht" und entlarvt ihn. Beim nächsten Mythos kommt ein anderer Experte (z.B. Carsten Wittmann). Das Format lebt davon, dass verschiedene Experten verschiedene Mythen demaskieren.

- Kurze Einordnung in 3 Blöcken:
  - Warum Menschen das glauben (Tempo, Modernität, einfacher als selbst denken)
  - Warum es zu kurz greift (zu früh auslagern, plausible Mittelmäßigkeit)
  - Die differenzierte Sicht: HI → KI → HI (Human Intelligence Sandwich)
- Merksatz: „KI gehört in ein Sandwich. Nicht allein an den Anfang."
- Hinweis: „Nach und nach folgen weitere Mythen – immer von anderen Experten demaskiert."
- CTA: „20 Mythen. 6 Wochen. Kein Newsletter – ein Ende." → E-Mail-Signup
- Hinweis: Befristete E-Mail-Serie, danach automatisch Schluss

#### S8: Arbeitsweise, Haltung & KI-Manifest
- **Einleitungstext:** Kurzer Absatz der erklärt, wie OKAI arbeitet und warum Haltung genauso wichtig ist wie Kompetenz
- 4 Karten: Integer, Smart, Energetisch, Lösungsorientiert

- **KI-Manifest Teaser:**
  - Das OKAI KI-Manifest prominent einbinden (Inhalte aus OKAI_KI_Manifest.md)
  - Zeige 2-3 der 9 Punkte als Teaser an (z.B. „KI ist Mittel. Nicht Zweck.", „Menschen zuerst. Immer.", „Ehrlichkeit ist nicht verhandelbar.")
  - Link: „Das vollständige KI-Manifest lesen →" → /werte (dort Manifest vollständig)
  - **Wichtig: Das KI-Manifest ist nicht nur OKAIs Haltung, sondern auch ein erstes Beispiel für KMU-Kunden.** Es zeigt: Ein KI-Manifest – also eine weiche Form einer KI-Richtlinie – muss nicht kompliziert sein. Es ist ein Hinweis, dass die Organisation von KI nicht immer so aufwändig sein muss wie befürchtet.
  - Formulierung z.B.: „Unser KI-Manifest. Und ein Hinweis: So etwas braucht auch dein Unternehmen – und es muss nicht kompliziert sein."

- Link: „Unsere vollständige KI-Policy lesen →" → /werte

#### S9: Qualifikationen & Credentials
- Nicht INQA Coach (weglassen!)
- Zeige:
  - TÜV-zertifiziert: Manager für angewandte KI-Transformation (16 Module) – MIT TÜV-Testmark-Bild
  - Certified AI Consultant (LETUJA, CERTQUA/ZFU) – 500 Unterrichtseinheiten
  - 18 Monate KI-Masterclass am Koerting Institut (Mastery-Level, um immer up-to-date zu bleiben)
  - Mentor am Innolea Institut
  - Fonio Gold Partner (KI-Telefonie)
  - **4× Effie Award Gewinner** (nicht 2×!) – wenn möglich Effie-Logo in Bronze einbinden
  - 20+ Jahre Marke, Strategie & Kommunikation

- **Autorenschaften:**
  - Buch „KI · Mensch · Wandel. Wie wir heute denken müssen, um morgen erfolgreich zu handeln." (Koerting Institute, Vol. 2) – Bild: `buch-ki-mensch-wandel.jpg`
  - Buch „Brand Innovation – Impulse für das Markenmanagement von morgen" (Schäffer-Poeschel) – Bild: `buch-brand-innovation.jpg`
  - Zeige die Buchcover als kleine Thumbnails neben den Titeln

#### S10: Cases & Testimonials
- Cases NEBENEINANDER (nicht untereinander wie bisher)
- 3 Karten: ETV Hamburg, Innolea, Urgh
- Jede Karte: Logo + Name + Branche + Headline + kurzer Teaser
- Jede Karte verlinkt auf eine **eigene Case-Unterseite** (z.B. `/cases/etv-hamburg`)
- Auf der Unterseite: Problem, Lösung, Ergebnis ausführlich

#### S11: Über Lars (kurz)
- Foto + persönlicher Kurztext
- Link: „Mehr über Lars →" → /ueber-lars

#### S12: Kontakt & Kalender
- Headline: „Lass uns reden."
- Links: Calendly-Embed-Platzhalter
- Rechts:
  - Telefon: +49 172 292 888 1 (klickbar: tel:+491722928881)
  - E-Mail: hallo@ok-ai.de (klickbar: mailto:)
  - LinkedIn: linkedin.com/in/lars-fieck

#### S13: Footer
- OKAI-Logo (weiße Version!)
- 3 Spalten: Leistungen, Über OKAI, Rechtliches
- LinkedIn + Copyright
- Echte Umlaute

---

### 3.2 Reifegrad-Check Seite (/reifegrad-check)

**WICHTIG: Diese Seite wird im DARK MODE gehalten (schwarzer Hintergrund).**

Konvertiere die bestehende standalone `index.html` (1042 Zeilen) in eine React/Next.js-Seite. Übernimm die KOMPLETTE Quiz-Logik, Daten (DIMS, PRODUCTS, Fragen, Scoring) und den 3-stufigen Funnel.

#### Design-Anpassungen:
- Hintergrund: Schwarz (#000000) statt Weiß
- Text: Off-White (#FDFCF9) statt Schwarz
- Accent: bright-red (#EF646E) für CTAs und Highlights
- OKAI-Logo: Weiße Version verwenden
- Formprinzip beibehalten: links eckig, rechts rund
- Schrift: Inter (wie Hauptseite)

#### Struktur der Seite:
1. **Landing/Intro** mit Headline, Beschreibung, CTA „Check starten"
2. **Segmentierung** (Branche + Betriebsgröße)
3. **Quiz** (21-28 Fragen, szenariobasiert, Skala 1-5)
4. **E-Mail-Gate** (optional überspringbar)
5. **Ergebnis**

#### Ergebnis – 2 Stufen klar kommunizieren:

**Stufe 1: Dein Basis-Ergebnis** (sofort sichtbar, kein Gate)
- Gesamt-Score als Stufe 1–5 mit Ampel-Farbe
- Spinnennetz-Diagramm (Radar-Chart) über alle 7 Dimensionen – ansprechend gestaltet!
- Ampel-Übersicht aller 7 Dimensionen (🔴🟡🟢)
- Einordnungssatz
- Direkte Produktempfehlung (max. 2 Produkte)
- Visuell ansprechend: Das Spinnennetz-Diagramm soll ein echtes Highlight sein

**Stufe 2: Dein vollständiges KI-Lagebild** (E-Mail-Gate)
- CTA: „Dein vollständiges KI-Lagebild mit allen 7 Dimensionen aufgeschlüsselt und Branchenvergleich – kostenlos per E-Mail."
- Formular: E-Mail, Vorname, Nachname, Firmenname, Rolle
- Branche + Betriebsgröße vorausgefüllt aus dem Check
- Was man bekommt: Detailliertes Radar, Branchenvergleich, Handlungsempfehlungen

**Persönliches Briefing** (nur anteasen auf Stufe 1)
- Zeigen und beschreiben, aber Button noch NICHT klickbar machen
- Text z.B.: „Persönliches Briefing – Besprich dein KI-Lagebild mit einem OKAI-Berater. Kommt bald."
- Visuell ausgegraut / deaktiviert
- NICHT an Lars persönlich binden

#### Vorhandene Seiten anpassen:
- `/reifegrad-check/ablauf` → Behalte als Info-Unterseite

#### Technisch:
- Verwende `recharts` für das Radar-Diagramm (ist als Dependency verfügbar)
- State Management mit React useState/useReducer
- Kein localStorage für den Check-State (Session only)
- Die gesamte Quiz-Logik (DIMS, Fragen, Scoring, Produktempfehlungen) aus der bestehenden HTML übernehmen

---

### 3.3 Produkt-Unterseiten

Erstelle für jedes Produkt eine eigene Seite. Informationen findest du in der Projektdokumentation (OKAI_Produktwissensbasis.md). **Jede Kategorie bekommt ihr eigenes Icon aus der Autonomie-Reihe (siehe 2.6).**

#### /leistungen/ki-durchblick (Stufe 1) – Icon: Auge/Fernglas
- Briefing-Gespräch
- EU-AI & Compliance Schulung
- AI License

#### /leistungen/ki-roadmap (Stufe 2) – Icon: Karte/Route
- Scope & Discovery Workshop
- Gap Check
- AI Roadmap

#### /leistungen/ki-loesung (Stufe 3) – Icon: Zahnrad+Blitz
- KI-Process-Check
- AI Concept Sprint
- Umsetzungsbegleitung

#### /leistungen/ki-autopilot (Stufe 4) – Icon: Rakete
- Instant Telefon-Bot
- Custom Telefon-Bot

#### Jede Produktseite enthält:
- Stufen-Badge (z.B. „Stufe 1 von 4")
- Produktname + Headline
- Beschreibung (lang)
- „Was du bekommst" (Features)
- „Für wen" (Zielgruppe)
- Pricing (wenn vorhanden)
- CTA zum Reifegrad-Check oder Kontakt
- Navigation zur vorherigen/nächsten Stufe

---

### 3.4 Case-Unterseiten

#### /cases/etv-hamburg
- ETV Hamburg – Wasserball Bundesliga
- Branche: Sport / Ehrenamtliche Pressearbeit
- Problem → Lösung → Ergebnis (ausführlich, Texte sind im bestehenden Code)

#### /cases/innolea
- Innolea Institut
- Branche: Digitale Weiterbildung

#### /cases/urgh
- Urgh Elektrolyte Booster
- Branche: FMCG / Consumer Brand

---

### 3.5 Herausforderungen-Unterseiten

6 Seiten unter `/herausforderungen/`:
- `/ki-einstieg` – „Ich weiß nicht, wo ich anfangen soll."
- `/ki-ohne-plan` – „Mein Team nutzt KI ohne Plan."
- `/erreichbarkeit` – „Wir verpassen Anrufe."
- `/prozess-prio` – „Welcher Prozess zuerst?"
- `/ki-compliance` – „Rechtlich auf der sicheren Seite."
- `/ki-prototyp` – „Idee, aber kein Prototyp."

Jede Seite: Ausführliche Beschreibung der Herausforderung → Am Ende: Verweis auf passendes OKAI-Produkt

---

### 3.6 Bestehende Seiten (aktualisieren)

- `/werte` → Umlaute fixen, Logo als Bild
- `/ueber-lars` → Erweitern mit Qualifikationen, Foto, Bücher, Partnerabschnitt
- `/ai-license` → Umlaute fixen, Design anpassen
- `/datenschutz` → Umlaute fixen
- `/impressum` → Umlaute fixen, Telefonnummer ergänzen: +49 172 292 888 1

---

## 4. ASSETS

Folgende Dateien müssen nach `public/assets/` kopiert werden:
- `OAI0425_Logo_RZ.png` → `okai-logo.png`
- Weiße Logo-Version erstellen → `okai-logo-white.png` (CSS filter: invert(1) oder separate Datei)
- `Lars_Fieck-c909.png` → `lars-hero.png`
- `TR-Testmark_0217465986_DE_CMYK_with-QR-Code.jpg` → `tuev-testmark.jpg`
- Bestehende Assets behalten: lars-portrait.jpg, lars-ganzkoerper.jpg, alle Partner-Logos, Buch-Cover etc.

---

## 5. DESIGN-REFERENZ: weareplai.com

Von dieser Seite übernehmen wir das UX-Feeling, NICHT das Design:
- Großzügiger Weißraum zwischen Sektionen
- Starke typografische Kontraste (große Headlines, kleinere Sublines)
- Klare Sektionsstruktur mit nummerierten Elementen
- Eleganter Fullscreen-Hero mit viel Luft
- Clean aufgebaute Karten
- Smooth Scroll-Verhalten
- Professionelles, erwachsenes Feeling

NICHT übernehmen: Farben, Schriften, Logo-Stil, lila Palette, Animations-Overload

---

## 6. TECHNISCHE HINWEISE

- **Framework:** Next.js 15 (App Router) mit TypeScript
- **Styling:** Tailwind CSS 4 (bereits konfiguriert)
- **Schrift:** Inter via next/font/google
- **Charts:** recharts für Radar-Diagramm im Reifegrad-Check
- **Deployment:** Vercel (auto-deploy bei Push auf main)
- **Alle Links intern** – kein check.okai.de mehr, alles unter ok-ai.de
- **SEO:** Jede Seite mit eigenem `<title>` und `<meta description>`

---

## 7. ZUSAMMENFASSUNG DER WICHTIGSTEN REGELN

1. ✅ OKAI-Logo als Bilddatei in Navigation, Hero, Footer – im Fließtext normal als Text „OKAI"
2. ✅ Alle Ecken: links eckig, rechts rund
3. ✅ Echte Umlaute überall (ü, ö, ä, ß)
4. ✅ TÜV-Testmark prominent im ersten Drittel der Seite
5. ✅ Trust-Logos als animiertes Carousel, deutlich größer
6. ✅ Reifegrad-Check komplett integriert (kein externer Link mehr)
7. ✅ Reifegrad-Ergebnis im Dark Mode mit ansprechendem Radar-Chart
8. ✅ Problemkarten mit Unterseiten (Produktverweis erst dort)
9. ✅ Cases nebeneinander mit eigenen Unterseiten
10. ✅ Myth-Busters in bright-red – Koerting steht NUR für den einen Mythos „KI-first"
11. ✅ Kontakt mit Telefonnummer +49 172 292 888 1
12. ✅ Kein INQA Coach bei den Qualifikationen
13. ✅ 4× Effie (nicht 2×!), Autorenschaften mit Buchcovern einbinden
14. ✅ Persönliches Briefing nur anteasen, nicht aktivierbar, nicht an Lars binden
15. ✅ Umfangreiche eigene Icon-Kollektion mit Autonomie-Story
16. ✅ Jede Produktkategorie bekommt ein eigenes Icon (steigende Autonomie)
17. ✅ Reifegrad-Check-Störer als Floating-Element, KEIN Balken
18. ✅ KI-Manifest einbinden als Beispiel für KMU (muss nicht kompliziert sein)
19. ✅ S8 Arbeitsweise mit Einleitungstext

---

*Dieses Briefing enthält alle Informationen die Claude Code braucht, um die Website zu bauen. Die vollständigen Produkttexte, Case-Inhalte und Reifegrad-Check-Logik (Fragen, Dimensionen, Scoring) befinden sich im bestehenden Code und in der Projekt-Wissensbasis.*
