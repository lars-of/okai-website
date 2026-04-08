/* ============================================
   KI-Reifegrad-Check – Fragenkatalog

   25 Fragen in 7 Kategorien, je 4 Antwortoptionen (0-3 Punkte).
   Alle Fragen in neutraler Ansprache (kein du/Sie).
   Maximalpunktzahl: 75

   Anpassungslogik: Fragen können je nach Branche und
   Betriebsgröße in der Formulierung variiert werden.
   Die Basisversion hier ist branchenübergreifend formuliert.
   ============================================ */

/* --------------------------------------------
   Typen
   -------------------------------------------- */

export interface Answer {
  text: string;
  points: number;
}

export interface Question {
  id: number;
  text: string;
  answers: [Answer, Answer, Answer, Answer]; // immer genau 4
}

export interface Category {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export interface ResultLevel {
  id: string;
  name: string;
  range: [number, number]; // [min, max]
  description: string;
  nextSteps: string[];
}

/* Branchen für die Personalisierung der Einstiegsseite */
export type Industry =
  | "handel"
  | "finanzen"
  | "dienstleistung"
  | "handwerk"
  | "marketing"
  | "produktion"
  | "logistik"
  | "andere";

export type CompanySize = "1-10" | "10-50" | "50-250" | "250+";

export const INDUSTRIES: { value: Industry; label: string }[] = [
  { value: "handwerk", label: "Handwerk" },
  { value: "handel", label: "Handel" },
  { value: "dienstleistung", label: "Dienstleistung" },
  { value: "finanzen", label: "Finanzen / Versicherung" },
  { value: "marketing", label: "Marketing / Werbung" },
  { value: "produktion", label: "Produktion / Industrie" },
  { value: "logistik", label: "Logistik / Transport" },
  { value: "andere", label: "Andere Branche" },
];

export const COMPANY_SIZES: { value: CompanySize; label: string }[] = [
  { value: "1-10", label: "1–10 Mitarbeitende" },
  { value: "10-50", label: "10–50 Mitarbeitende" },
  { value: "50-250", label: "50–250 Mitarbeitende" },
  { value: "250+", label: "250+ Mitarbeitende" },
];

/* --------------------------------------------
   Maximale Punktzahl
   -------------------------------------------- */

export const MAX_SCORE = 75;

/* --------------------------------------------
   Ergebnis-Stufen
   -------------------------------------------- */

export const RESULT_LEVELS: ResultLevel[] = [
  {
    id: "startbereit",
    name: "Startbereit",
    range: [0, 18],
    description:
      "Noch ganz am Anfang – aber das ist völlig okay. Die meisten KMU starten hier. Wichtig ist, jetzt mit dem Thema zu beginnen.",
    nextSteps: [
      "Einen ersten Workshop machen: Was ist KI und was kann sie für den Betrieb tun?",
      "Die drei größten Zeitfresser im Alltag identifizieren",
      "Ein einfaches KI-Tool (z.B. ChatGPT) im Team ausprobieren",
    ],
  },
  {
    id: "neugierig",
    name: "Neugierig",
    range: [19, 37],
    description:
      "Erste Schritte sind gemacht, aber es fehlt ein roter Faden. Jetzt braucht es einen konkreten Plan, wo KI den größten Nutzen bringt.",
    nextSteps: [
      "Die Kategorien mit den niedrigsten Punkten gezielt angehen",
      "Einen konkreten Anwendungsfall auswählen und umsetzen",
      "Grundregeln für den KI-Einsatz im Unternehmen festlegen",
    ],
  },
  {
    id: "aufdemweg",
    name: "Auf dem Weg",
    range: [38, 56],
    description:
      "Gute Basis vorhanden. Es wurden bereits Erfahrungen gesammelt – jetzt ist es Zeit für systematisches Vorgehen.",
    nextSteps: [
      "Eine KI-Strategie mit Zielen und Zeitplan erstellen",
      "In Schulungen für das Team investieren",
      "Bestehende KI-Nutzung auswerten und verbessern",
    ],
  },
  {
    id: "fortgeschritten",
    name: "Fortgeschritten",
    range: [57, 75],
    description:
      "Stark aufgestellt. KI wird bereits gezielt genutzt – jetzt geht es um Feinschliff und Skalierung.",
    nextSteps: [
      "KI-Einsatz auf weitere Bereiche ausweiten",
      "Ergebnisse messen und dokumentieren",
      "Wissen intern weitergeben und Prozesse optimieren",
    ],
  },
];

/* --------------------------------------------
   Die 7 Kategorien mit 25 Fragen
   -------------------------------------------- */

export const CATEGORIES: Category[] = [
  {
    id: "strategie",
    name: "Strategie",
    description: "Gibt es im Unternehmen einen Plan für KI?",
    questions: [
      {
        id: 1,
        text: "Gibt es im Unternehmen eine Vorstellung davon, was KI bringen soll?",
        answers: [
          { text: "Nein, darüber wurde noch nicht nachgedacht.", points: 0 },
          { text: "Es wurde mal darüber gesprochen, aber nichts festgehalten.", points: 1 },
          { text: "Es wurden ein paar Ideen gesammelt und aufgeschrieben.", points: 2 },
          { text: "Es gibt klare Ziele, was KI im Unternehmen verbessern soll.", points: 3 },
        ],
      },
      {
        id: 2,
        text: "Wer kümmert sich im Unternehmen um das Thema KI?",
        answers: [
          { text: "Niemand, das Thema ist noch nicht auf dem Tisch.", points: 0 },
          { text: "Einzelne Leute schauen sich das privat an.", points: 1 },
          { text: "Die Geschäftsführung hat das Thema auf dem Schirm.", points: 2 },
          { text: "Es gibt eine Person oder Gruppe, die sich gezielt darum kümmert.", points: 3 },
        ],
      },
      {
        id: 3,
        text: "Wie passt KI in die Planung des Unternehmens für die nächsten Jahre?",
        answers: [
          { text: "KI spielt in der Planung keine Rolle.", points: 0 },
          { text: "Es ist bekannt, dass es wichtig wird, aber es gibt keinen Plan.", points: 1 },
          { text: "KI ist Teil der Überlegungen für die Zukunft.", points: 2 },
          { text: "KI ist fest eingeplant, mit Budget und Zeitrahmen.", points: 3 },
        ],
      },
    ],
  },
  {
    id: "prozesse",
    name: "Prozesse",
    description: "Sind die Arbeitsabläufe bereit für KI?",
    questions: [
      {
        id: 4,
        text: "Wie gut sind die täglichen Arbeitsabläufe beschrieben?",
        answers: [
          { text: "Jeder macht es so, wie er es gelernt hat.", points: 0 },
          { text: "Die wichtigsten Abläufe sind im Kopf der Leute.", points: 1 },
          { text: "Die meisten Abläufe sind irgendwo aufgeschrieben.", points: 2 },
          { text: "Die Abläufe sind dokumentiert und werden regelmäßig geprüft.", points: 3 },
        ],
      },
      {
        id: 5,
        text: "Wo wird im Unternehmen die meiste Zeit mit Wiederholungsaufgaben verbracht?",
        answers: [
          { text: "Das wurde noch nie genau angeschaut.", points: 0 },
          { text: "Es ist ungefähr bekannt, wo es hakt, aber nicht genau.", points: 1 },
          { text: "Die größten Zeitfresser sind ziemlich genau bekannt.", points: 2 },
          { text: "Es wurde gemessen, wo Zeit verloren geht, und es wird nach Lösungen gesucht.", points: 3 },
        ],
      },
      {
        id: 6,
        text: "Wie viel läuft im Unternehmen schon digital statt auf Papier?",
        answers: [
          { text: "Fast alles läuft über Papier, Ordner oder Zettel.", points: 0 },
          { text: "Manches ist digital, aber vieles noch auf Papier.", points: 1 },
          { text: "Das meiste läuft digital, Papier ist die Ausnahme.", points: 2 },
          { text: "Es wird fast komplett digital und papierlos gearbeitet.", points: 3 },
        ],
      },
      {
        id: 7,
        text: "Könnten einzelne Arbeitsschritte leicht geändert werden, wenn es eine bessere Lösung gibt?",
        answers: [
          { text: "Änderungen sind im Unternehmen sehr schwierig umzusetzen.", points: 0 },
          { text: "Kleine Änderungen gehen, größere sind aufwendig.", points: 1 },
          { text: "Das Unternehmen ist offen für Änderungen und setzt sie um.", points: 2 },
          { text: "Die Abläufe werden regelmäßig angepasst, wenn es Sinn macht.", points: 3 },
        ],
      },
    ],
  },
  {
    id: "daten",
    name: "Daten & Systeme",
    description: "Sind die Daten in Ordnung und zugänglich?",
    questions: [
      {
        id: 8,
        text: "Wo liegen die wichtigsten Daten (Kunden, Aufträge, Rechnungen)?",
        answers: [
          { text: "Verstreut: teils Papier, teils Excel, teils im Kopf.", points: 0 },
          { text: "Hauptsächlich in Excel-Listen oder einzelnen Programmen.", points: 1 },
          { text: "In einem zentralen System, aber nicht alles ist gepflegt.", points: 2 },
          { text: "In einem gepflegten System, auf das alle zugreifen können.", points: 3 },
        ],
      },
      {
        id: 9,
        text: "Wie gut ist die Qualität der Daten im Unternehmen?",
        answers: [
          { text: "Keine Ahnung, darauf wurde noch nie geschaut.", points: 0 },
          { text: "Es gibt bestimmt Lücken und doppelte Einträge.", points: 1 },
          { text: "Die wichtigsten Daten sind sauber, manches fehlt aber.", points: 2 },
          { text: "Die Daten werden regelmäßig geprüft und bereinigt.", points: 3 },
        ],
      },
      {
        id: 10,
        text: "Können die verschiedenen Programme im Unternehmen miteinander reden?",
        answers: [
          { text: "Daten werden oft von einem Programm ins andere abgetippt.", points: 0 },
          { text: "Ein paar Programme sind verbunden, vieles ist Handarbeit.", points: 1 },
          { text: "Die meisten wichtigen Systeme tauschen Daten automatisch aus.", points: 2 },
          { text: "Die Systeme sind gut vernetzt und Daten fließen automatisch.", points: 3 },
        ],
      },
      {
        id: 11,
        text: "Wie sicher sind die Daten im Unternehmen?",
        answers: [
          { text: "Darauf wurde bisher nicht besonders geachtet.", points: 0 },
          { text: "Backups werden gemacht, aber unregelmäßig.", points: 1 },
          { text: "Es gibt Backups und Passwörter, aber keinen festen Plan.", points: 2 },
          { text: "Es gibt ein Sicherheitskonzept mit Backups und Zugriffsrechten.", points: 3 },
        ],
      },
    ],
  },
  {
    id: "werkzeuge",
    name: "Werkzeuge & Tools",
    description: "Welche KI-Werkzeuge werden schon genutzt?",
    questions: [
      {
        id: 12,
        text: "Werden im Unternehmen schon KI-Werkzeuge genutzt (z.B. ChatGPT, Copilot, Bildgeneratoren)?",
        answers: [
          { text: "Nein, noch niemand.", points: 0 },
          { text: "Einzelne probieren privat damit rum.", points: 1 },
          { text: "Ein paar Leute nutzen KI-Tools regelmäßig für die Arbeit.", points: 2 },
          { text: "KI-Tools gehören im Unternehmen zum Arbeitsalltag.", points: 3 },
        ],
      },
      {
        id: 13,
        text: "Wie zufrieden ist das Unternehmen mit den aktuellen Software-Lösungen?",
        answers: [
          { text: "Es wird oft mit der Software gekämpft.", points: 0 },
          { text: "Es geht, aber vieles ist umständlich oder veraltet.", points: 1 },
          { text: "Im Großen und Ganzen funktioniert es gut.", points: 2 },
          { text: "Die Tools passen gut zusammen und machen die Arbeit leichter.", points: 3 },
        ],
      },
      {
        id: 14,
        text: "Wurde schon mal ein KI-Werkzeug bewusst getestet oder eingeführt?",
        answers: [
          { text: "Nein, noch gar nicht.", points: 0 },
          { text: "Es wurde mal kurz etwas ausprobiert, aber nicht weiterverfolgt.", points: 1 },
          { text: "Ein KI-Tool wurde getestet und wird jetzt genutzt.", points: 2 },
          { text: "Mehrere KI-Tools wurden gezielt eingeführt und ausgewertet.", points: 3 },
        ],
      },
    ],
  },
  {
    id: "wissen",
    name: "Wissen im Team",
    description: "Wie gut kennt sich das Team mit KI aus?",
    questions: [
      {
        id: 15,
        text: "Wie viele im Team wissen, was KI ungefähr kann?",
        answers: [
          { text: "Fast niemand hat eine Vorstellung davon.", points: 0 },
          { text: "Einzelne haben davon gehört oder gelesen.", points: 1 },
          { text: "Die meisten haben ein Grundverständnis.", points: 2 },
          { text: "Fast alle wissen, was KI kann und wo die Grenzen liegen.", points: 3 },
        ],
      },
      {
        id: 16,
        text: "Gab es im Unternehmen schon Schulungen oder Workshops zum Thema KI?",
        answers: [
          { text: "Nein, noch nie.", points: 0 },
          { text: "Einzelne haben sich selbst etwas beigebracht.", points: 1 },
          { text: "Es gab einen Workshop oder eine Infoveranstaltung.", points: 2 },
          { text: "Es wird regelmäßig im Bereich KI weitergebildet.", points: 3 },
        ],
      },
      {
        id: 17,
        text: "Gibt es im Unternehmen jemanden, der sich richtig gut mit KI auskennt?",
        answers: [
          { text: "Nein, niemand.", points: 0 },
          { text: "Jemand ist interessiert, aber kein Experte.", points: 1 },
          { text: "Eine Person hat gutes Wissen und hilft anderen.", points: 2 },
          { text: "Es gibt mehrere Leute mit fundiertem KI-Wissen.", points: 3 },
        ],
      },
      {
        id: 18,
        text: "Wie leicht fällt es dem Team, neue digitale Werkzeuge zu lernen?",
        answers: [
          { text: "Neue Software sorgt für Frust.", points: 0 },
          { text: "Manche kommen klar, andere tun sich schwer.", points: 1 },
          { text: "Die meisten gewöhnen sich relativ schnell an neue Tools.", points: 2 },
          { text: "Das Team ist neugierig und probiert gerne Neues aus.", points: 3 },
        ],
      },
    ],
  },
  {
    id: "kultur",
    name: "Kultur & Haltung",
    description: "Ist die Unternehmenskultur bereit für KI?",
    questions: [
      {
        id: 19,
        text: "Was denkt die Führung im Unternehmen über KI?",
        answers: [
          { text: "Kein Interesse oder eher Skepsis.", points: 0 },
          { text: "Neugierig, aber noch abwartend.", points: 1 },
          { text: "Positiv eingestellt und offen für Versuche.", points: 2 },
          { text: "Aktiv dabei und treibt das Thema voran.", points: 3 },
        ],
      },
      {
        id: 20,
        text: "Wie reagiert das Team, wenn jemand eine neue Idee einbringt?",
        answers: [
          { text: "Neue Ideen werden eher abgeblockt.", points: 0 },
          { text: "Man hört sich das an, aber es passiert selten etwas.", points: 1 },
          { text: "Gute Ideen werden aufgegriffen und ausprobiert.", points: 2 },
          { text: "Es wird aktiv ermutigt, neue Wege vorzuschlagen.", points: 3 },
        ],
      },
      {
        id: 21,
        text: "Wie wird mit Fehlern umgegangen, wenn etwas Neues ausprobiert wird?",
        answers: [
          { text: "Fehler führen schnell zu Ärger.", points: 0 },
          { text: "Fehler werden toleriert, aber ungern gesehen.", points: 1 },
          { text: "Fehler gelten als normaler Teil beim Ausprobieren.", points: 2 },
          { text: "Fehler sind ausdrücklich erlaubt und es wird daraus gelernt.", points: 3 },
        ],
      },
      {
        id: 22,
        text: "Wie offen wird im Team über Sorgen gesprochen, die KI betreffen (z.B. Jobverlust)?",
        answers: [
          { text: "Darüber redet niemand.", points: 0 },
          { text: "Es gibt Sorgen, aber die werden nicht offen besprochen.", points: 1 },
          { text: "Es wurde darüber gesprochen und Bedenken werden ernst genommen.", points: 2 },
          { text: "Es wird offen darüber geredet und es gibt klare Antworten.", points: 3 },
        ],
      },
    ],
  },
  {
    id: "regeln",
    name: "Regeln & Verantwortung",
    description: "Gibt es Leitplanken für den Umgang mit KI?",
    questions: [
      {
        id: 23,
        text: "Gibt es im Unternehmen Regeln dafür, wie KI-Werkzeuge genutzt werden dürfen?",
        answers: [
          { text: "Nein, jeder macht was er will.", points: 0 },
          { text: "Es gibt unausgesprochene Erwartungen, aber keine Regeln.", points: 1 },
          { text: "Ein paar Grundregeln wurden mündlich vereinbart.", points: 2 },
          { text: "Es gibt klare, schriftliche Regeln für den KI-Einsatz.", points: 3 },
        ],
      },
      {
        id: 24,
        text: "Wer ist verantwortlich, wenn KI im Unternehmen eine falsche Entscheidung trifft?",
        answers: [
          { text: "Darüber wurde noch nie nachgedacht.", points: 0 },
          { text: "Wahrscheinlich der, der das Tool benutzt hat.", points: 1 },
          { text: "Es ist bekannt, dass am Ende ein Mensch prüfen muss.", points: 2 },
          { text: "Es ist klar geregelt, wer KI-Ergebnisse prüfen und freigeben muss.", points: 3 },
        ],
      },
      {
        id: 25,
        text: "Wie wird im Unternehmen mit dem Thema Datenschutz bei KI-Werkzeugen umgegangen?",
        answers: [
          { text: "Darauf wurde bisher nicht geachtet.", points: 0 },
          { text: "Es wird ein bisschen darauf geachtet, aber ohne feste Regeln.", points: 1 },
          { text: "Es wird geprüft, welche Daten in KI-Tools eingegeben werden.", points: 2 },
          { text: "Es gibt klare Vorgaben, was in KI-Tools eingegeben werden darf.", points: 3 },
        ],
      },
    ],
  },
];

/* --------------------------------------------
   Hilfsfunktionen
   -------------------------------------------- */

/** Alle Fragen als flaches Array */
export function getAllQuestions(): Question[] {
  return CATEGORIES.flatMap((c) => c.questions);
}

/** Gesamtanzahl aller Fragen */
export const TOTAL_QUESTIONS = 25;

/** Ergebnis-Stufe anhand der Punktzahl ermitteln */
export function getResultLevel(score: number): ResultLevel {
  return (
    RESULT_LEVELS.find((l) => score >= l.range[0] && score <= l.range[1]) ??
    RESULT_LEVELS[0]
  );
}

/** Punkte pro Kategorie berechnen */
export function getCategoryScores(
  answers: Record<number, number>
): { categoryId: string; name: string; score: number; maxScore: number; percentage: number }[] {
  return CATEGORIES.map((cat) => {
    const maxScore = cat.questions.length * 3;
    const score = cat.questions.reduce(
      (sum, q) => sum + (answers[q.id] ?? 0),
      0
    );
    return {
      categoryId: cat.id,
      name: cat.name,
      score,
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
    };
  });
}
