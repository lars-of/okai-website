/* ============================================
   HTML E-Mail Templates – OKAI Terminbuchung

   Alle Mails sind HTML (kein Plaintext) damit
   URL-Defense-Systeme nur die hrefs umschreiben,
   nicht den sichtbaren Text.

   Regeln:
   - Keine Telefonnummer
   - Keine persönliche E-Mail
   - Footer: nur hallo@ok-ai.de und ok-ai.de (kein http://)
   - Buttons statt roher URLs
   ============================================ */

const BRAND_RED = "#EF646E";
const BRAND_SAND = "#EAE6DD";
const BRAND_DARK = "#3A3A38";
const BRAND_GRAY = "#7A7872";

/* Wiederverwendbarer Wrapper für alle OKAI-Mails */
function wrap(content: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:${BRAND_SAND};font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td style="padding:32px 16px;">
<table width="600" align="center" cellpadding="0" cellspacing="0" border="0"
  style="background:#ffffff;border-radius:0 16px 16px 0;overflow:hidden;max-width:600px;margin:0 auto;">
<tr><td style="padding:40px 40px 32px;">
${content}
</td></tr>
<!-- Footer -->
<tr><td style="padding:20px 40px 28px;border-top:1px solid ${BRAND_SAND};">
<p style="margin:0;font-size:12px;color:${BRAND_GRAY};font-family:Arial,sans-serif;line-height:1.6;">
OKAI – KI-Beratung für KMU<br>
hallo@ok-ai.de &nbsp;·&nbsp; ok-ai.de
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

/* Eyebrow-Label (kleine rote Überschrift) */
function eyebrow(text: string): string {
  return `<p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:${BRAND_RED};font-family:Arial,sans-serif;">${text}</p>`;
}

/* Haupt-Headline */
function headline(text: string): string {
  return `<h1 style="margin:0 0 24px;font-size:22px;font-weight:700;letter-spacing:-0.02em;color:#000;font-family:Arial,sans-serif;">${text}</h1>`;
}

/* Detail-Zeile: Label + Wert */
function row(label: string, value: string): string {
  return `<tr>
<td style="padding:8px 0;font-size:13px;color:${BRAND_GRAY};font-family:Arial,sans-serif;white-space:nowrap;vertical-align:top;padding-right:20px;">${label}</td>
<td style="padding:8px 0;font-size:15px;color:#000;font-family:Arial,sans-serif;font-weight:500;vertical-align:top;">${value}</td>
</tr>`;
}

/* Detail-Tabelle mit Zeilen */
function detailBox(rows: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0"
  style="width:100%;background:#f5f4f0;border-left:3px solid ${BRAND_RED};border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:28px;">
<tr><td><table cellpadding="0" cellspacing="0" border="0" style="width:100%;">
${rows}
</table></td></tr>
</table>`;
}

/* Primär-Button (rot) */
function btnPrimary(text: string, url: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:0 8px 8px 0;background:${BRAND_RED};">
<a href="${url}" style="display:inline-block;padding:14px 26px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;font-family:Arial,sans-serif;border-radius:0 8px 8px 0;">${text}&nbsp;→</a>
</td></tr></table>`;
}

/* Sekundär-Button (grau/outline) */
function btnSecondary(text: string, url: string): string {
  return `<table cellpadding="0" cellspacing="0" border="0"><tr><td style="border-radius:0 8px 8px 0;background:#f0efec;border:1px solid #d0cdc8;">
<a href="${url}" style="display:inline-block;padding:13px 24px;font-size:14px;font-weight:600;color:${BRAND_DARK};text-decoration:none;font-family:Arial,sans-serif;border-radius:0 8px 8px 0;">${text}&nbsp;→</a>
</td></tr></table>`;
}

/* Trennlinie */
function divider(): string {
  return `<div style="border-top:1px solid ${BRAND_SAND};margin:24px 0;"></div>`;
}

/* Fließtext-Absatz */
function para(text: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;color:${BRAND_DARK};font-family:Arial,sans-serif;line-height:1.65;">${text}</p>`;
}

/* Kleine Hinweisbox */
function hint(text: string): string {
  return `<p style="margin:0 0 16px;font-size:13px;color:${BRAND_GRAY};font-family:Arial,sans-serif;line-height:1.6;">${text}</p>`;
}

/* ============================================
   Konkrete Mail-Templates
   ============================================ */

/** Lars bekommt diese Mail bei jeder Terminanfrage */
export function adminNotificationEmail(params: {
  name: string;
  email: string;
  phone: string;
  datum: string;
  zeit: string;
  message: string;
  confirmUrl: string;
  declineUrl: string;
}): string {
  const { name, email, phone, datum, zeit, message, confirmUrl, declineUrl } = params;

  const content = `
${eyebrow("OKAI · Terminanfrage")}
${headline("Neue Buchungsanfrage")}
${detailBox(`
  ${row("Name", name)}
  ${row("E-Mail", `<a href="mailto:${email}" style="color:${BRAND_RED};text-decoration:none;">${email}</a>`)}
  ${phone ? row("Telefon", phone) : ""}
  ${row("Datum", datum)}
  ${row("Zeit", zeit)}
  ${message ? row("Nachricht", message) : ""}
`)}
<table cellpadding="0" cellspacing="0" border="0"><tr>
<td style="padding-right:12px;">${btnPrimary("Termin bestätigen", confirmUrl)}</td>
<td>${btnSecondary("Termin ablehnen", declineUrl)}</td>
</tr></table>
${divider()}
${hint("Nach der Bestätigung bekommt der Buchende automatisch eine Kalendereinladung.")}
`;
  return wrap(content);
}

/** Buchender bekommt diese Mail nach Lars' Bestätigung */
export function bookerConfirmationEmail(params: {
  name: string;
  datum: string;
  zeit: string;
  googleLink: string;
  outlookLink: string;
  cancelUrl: string;
}): string {
  const { name, datum, zeit, googleLink, outlookLink, cancelUrl } = params;

  const content = `
${eyebrow("OKAI · Bestätigung")}
${headline("Dein Termin ist bestätigt.")}
${detailBox(`
  ${row("Datum", datum)}
  ${row("Zeit", zeit)}
`)}
${para("Trag den Termin direkt in deinen Kalender ein – die Erinnerungen (12&nbsp;h und 1&nbsp;h vorher) sind bereits eingebaut:")}
<table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:8px;"><tr>
<td style="padding-right:12px;">${btnPrimary("Google Calendar", googleLink)}</td>
<td>${btnSecondary("Outlook / Microsoft 365", outlookLink)}</td>
</tr></table>
${hint("Apple Kalender & alle anderen: Öffne die beigefügte Datei <strong>okai-termin.ics</strong> – sie wird automatisch eingetragen.")}
${divider()}
${para("Kannst du doch nicht kommen?")}
${btnSecondary("Termin absagen", cancelUrl)}
${divider()}
${hint("Bei Fragen antworte einfach auf diese Mail.")}
`;
  return wrap(content);
}

/** Buchender bekommt diese Mail wenn Lars ablehnt */
export function bookerDeclineEmail(params: {
  name: string;
  datum: string;
  zeit: string;
  alternative?: string;
  rebookUrl: string;
}): string {
  const { name, datum, zeit, alternative, rebookUrl } = params;

  const alternativeSection = alternative
    ? `${divider()}${para(`<strong>Alternativ schlage ich folgenden Termin vor:</strong><br>${alternative}`)}`
    : "";

  const content = `
${eyebrow("OKAI · Terminanfrage")}
${headline("Leider klappt dieser Termin nicht.")}
${detailBox(`
  ${row("Angefragter Termin", `${datum} · ${zeit}`)}
`)}
${para(`Hallo ${name},<br><br>der angefragte Termin lässt sich leider nicht einrichten. Ich entschuldige mich für die Umstände.`)}
${alternativeSection}
${divider()}
${para("Einfach einen neuen Termin aussuchen:")}
${btnPrimary("Neuen Termin buchen", rebookUrl)}
${divider()}
${hint("Bei Fragen antworte einfach auf diese Mail.")}
`;
  return wrap(content);
}

/** Buchender bekommt diese Mail nach eigener Absage */
export function bookerCancellationConfirmEmail(params: {
  name: string;
  datum: string;
  zeit: string;
  rebookUrl: string;
}): string {
  const { name, datum, zeit, rebookUrl } = params;

  const content = `
${eyebrow("OKAI · Terminabsage")}
${headline("Dein Termin wurde abgesagt.")}
${detailBox(`
  ${row("Datum", datum)}
  ${row("Zeit", zeit)}
`)}
${para(`Hallo ${name},<br><br>deine Absage ist bei uns eingegangen. Kein Problem – such dir einfach einen neuen Termin aus, wann es besser passt.`)}
${btnPrimary("Neuen Termin buchen", rebookUrl)}
${divider()}
${hint("Bei Fragen antworte einfach auf diese Mail.")}
`;
  return wrap(content);
}

/** Lars bekommt diese Mail wenn ein Buchender absagt */
export function adminCancellationEmail(params: {
  name: string;
  email: string;
  datum: string;
  zeit: string;
}): string {
  const { name, email, datum, zeit } = params;

  const content = `
${eyebrow("OKAI · Terminabsage")}
${headline("Termin wurde abgesagt.")}
${detailBox(`
  ${row("Name", name)}
  ${row("E-Mail", `<a href="mailto:${email}" style="color:${BRAND_RED};text-decoration:none;">${email}</a>`)}
  ${row("Datum", datum)}
  ${row("Zeit", zeit)}
`)}
${hint("Der Buchende hat den Termin selbst abgesagt.")}
`;
  return wrap(content);
}
