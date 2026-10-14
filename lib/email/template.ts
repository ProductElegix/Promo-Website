import { AREAS, AREA_ORDER, EMAIL, SOCIALS, type AreaKey } from "../content";
import { unsubscribeUrl } from "../unsubscribe";

/**
 * Waitlist emails, after the Figma file "[DS] Foundation Elegix" → Email Template → Welcome eng.
 * Email-client safe: table layout, inline styles, PNG images attached inline (cid:), bulletproof button.
 */

export type EmailInput = { email: string; source: string; scores?: Record<string, number> };
export type BuiltEmail = { subject: string; text: string; html: string; inline: string[] };

// Area colours from the brand book (same as --{area}-s in app/globals.css).
const AREA_COLOR: Record<AreaKey, string> = {
  health: "#009a44", people: "#d50524", career: "#dd4903", growth: "#0f14da",
  hobby: "#ff5e3b", meaning: "#6709c7", home: "#3d5545",
};

const C = { bg: "#f6f8f6", card: "#ffffff", brand: "#009a44", text: "#031c08", muted: "#8a8a8e", track: "#e9ebe9" };
const FONT = "Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fill = (t: string, v: Record<string, string>) => t.replace(/\{(\w+)\}/g, (_, k: string) => v[k] ?? `{${k}}`);
const br = (t: string) => esc(t).replace(/\n/g, "<br>");

const card = (inner: string, bg: string = C.card) =>
  `<tr><td style="padding:0 0 16px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${bg};border-radius:16px;border-collapse:separate"><tr><td style="padding:24px">${inner}</td></tr></table></td></tr>`;

const h = (text: string, size: number, line: number, color: string, align = "center", extra = "") =>
  `<p style="margin:0;font-family:${FONT};font-size:${size}px;line-height:${line}px;font-weight:600;color:${color};text-align:${align};${extra}">${br(text)}</p>`;

const p = (text: string, color: string, align = "center", extra = "") =>
  `<p style="margin:0;font-family:${FONT};font-size:16px;line-height:24px;color:${color};text-align:${align};${extra}">${br(text)}</p>`;

const button = (label: string, href: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px"><tr><td align="center" bgcolor="#ffffff" style="border-radius:9999px;background:#ffffff">` +
  `<a href="${esc(href)}" style="display:block;padding:16px 32px;font-family:${FONT};font-size:16px;line-height:24px;font-weight:600;color:${C.brand};text-decoration:none;border-radius:9999px">${esc(label)}</a></td></tr></table>`;

function header() {
  const [l1, l2] = EMAIL.tagline;
  return card(
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>` +
      `<td valign="middle"><img src="cid:logo-white.png" width="149" height="40" alt="Elegix" style="display:block;border:0"></td>` +
      `<td valign="middle" align="right" style="font-family:${FONT};font-size:16px;line-height:24px;color:#ffffff;text-align:right">${esc(l1)}<br>${esc(l2)}</td>` +
      `</tr></table>`,
    C.brand,
  );
}

function hero(title: string, subtitle: string, withIllustration: boolean) {
  return card(
    h(title, 26, 32, C.brand) +
      p(subtitle, C.muted, "center", "padding-top:16px") +
      (withIllustration
        ? `<table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:24px auto 0"><tr><td><img src="cid:hero.png" width="220" height="220" alt="Illustration: a person checking a smartwatch, with a heart and a pulse line" style="display:block;border:0"></td></tr></table>`
        : ""),
  );
}

function grid() {
  const w = EMAIL.welcome;
  const cell = (i: number) => {
    const g = w.grid[i];
    return `<td width="50%" valign="top" align="center" style="padding:8px">` +
      `<img src="cid:${g.icon}" width="44" height="44" alt="" style="display:block;margin:0 auto 8px;border:0">` +
      h(g.text, 16, 24, C.text) + `</td>`;
  };
  return card(
    h(w.gridTitle, 24, 30, C.brand) +
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px"><tr>${cell(0)}${cell(1)}</tr><tr>${cell(2)}${cell(3)}</tr></table>`,
  );
}

function areas(scores: Record<string, number>, lowest: AreaKey) {
  const rows = AREA_ORDER.map((a) => {
    const n = scores[a];
    const bar = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>` +
      `<td width="${n * 10}%" height="8" style="background:${AREA_COLOR[a]};border-radius:9999px;font-size:0;line-height:0">&nbsp;</td>` +
      (n < 10 ? `<td width="${100 - n * 10}%" height="8" style="background:${C.track};border-radius:9999px;font-size:0;line-height:0">&nbsp;</td>` : "") +
      `</tr></table>`;
    const weight = a === lowest ? "600" : "400";
    return `<tr><td style="padding:8px 0;font-family:${FONT};font-size:15px;line-height:20px;color:${C.text};font-weight:${weight}" width="44%">${esc(AREAS[a].name)}</td>` +
      `<td style="padding:8px 12px" valign="middle">${bar}</td>` +
      `<td style="padding:8px 0;font-family:${FONT};font-size:15px;line-height:20px;color:${C.text};font-weight:600;text-align:right;white-space:nowrap" width="44">${n}/10</td></tr>`;
  }).join("");
  return card(h(EMAIL.check.areasTitle, 24, 30, C.brand) + `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px">${rows}</table>`);
}

function firstStep(lowest: AreaKey) {
  return card(
    h(fill(EMAIL.check.stepTitle, { area: AREAS[lowest].name }), 20, 28, C.brand, "left") +
      p(EMAIL.firstSteps[lowest], C.text, "left", "padding-top:8px"),
  );
}

function belief(btn: { label: string; href: string }) {
  return card(h(EMAIL.belief.title, 24, 30, "#ffffff") + p(EMAIL.belief.text, "#ffffff", "center", "padding-top:16px") + button(btn.label, btn.href), C.brand);
}

function wait(reply: string) {
  const k = EMAIL.wait;
  return card(
    h(k.title, 20, 28, C.brand, "left", "font-style:italic;font-weight:700") +
      p(reply, C.text, "left", "padding-top:8px") +
      p(`— ${k.name}`, C.muted, "left", "padding-top:8px") +
      `<p style="margin:16px 0 0"><span style="display:inline-block;padding:8px 14px;border-radius:9999px;background:${C.bg};font-family:${FONT};font-size:13px;line-height:18px;color:${C.muted}">${esc(k.note)}</span></p>`,
  );
}

function footer(email: string, unsub: string) {
  const f = EMAIL.footer;
  const [before, after] = fill(f.sent, { email: "\u0000" }).split("\u0000");
  return card(
    `<p style="margin:0;font-family:${FONT};font-size:16px;line-height:24px;color:${C.muted}">${esc(before)}<span style="color:${C.brand}">${esc(email)}</span>${esc(after)} ` +
      `<a href="${esc(unsub)}" style="color:${C.brand};text-decoration:none">${esc(f.unsubscribe)}</a>.</p>` +
      `<p style="margin:16px 0 0;font-family:${FONT};font-size:16px;line-height:24px;color:${C.muted}">${esc(f.copyright)}</p>` +
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px"><tr>` +
      `<td valign="middle"><img src="cid:logo-green.png" width="149" height="40" alt="Elegix" style="display:block;border:0"></td>` +
      `<td valign="middle" align="right" style="font-family:${FONT};font-size:14px;line-height:22px;text-align:right">` +
      SOCIALS.map((x) => `<a href="${esc(x.href)}" style="color:${C.brand};text-decoration:none;white-space:nowrap">${esc(x.label)}</a>`).join(`<span style="color:${C.muted}"> &middot; </span>`) +
      `</td></tr></table>`,
  );
}

function page(subject: string, rows: string) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>${esc(subject)}</title></head>` +
    `<body style="margin:0;padding:0;background:${C.bg}">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.bg}"><tr><td align="center" style="padding:16px">` +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:576px">${rows}</table>` +
    `</td></tr></table></body></html>`;
}

function balance(scores: Record<string, number>) {
  const average = AREA_ORDER.reduce((sum, a) => sum + scores[a], 0) / AREA_ORDER.length;
  const lowest = AREA_ORDER.reduce((low, a) => (scores[a] < scores[low] ? a : low), AREA_ORDER[0]);
  return { average, lowest };
}

export function buildEmail(input: EmailInput): BuiltEmail {
  // our own link when UNSUBSCRIBE_SECRET is set, otherwise Mailgun's tracking link
  const unsub = unsubscribeUrl(input.email) ?? "%unsubscribe_url%";
  const foot = `${fill(EMAIL.footer.sent, { email: input.email })} ${EMAIL.footer.unsubscribe}: ${unsub}\n${EMAIL.footer.copyright}\n${SOCIALS.map((x) => `${x.label}: ${x.href}`).join("\n")}`;
  const waitText = (reply: string) => `${EMAIL.wait.title}\n${reply}\n— ${EMAIL.wait.name}\n${EMAIL.wait.note}`;

  if (input.source === "balance-check" && input.scores) {
    const c = EMAIL.check;
    const { average, lowest } = balance(input.scores);
    const vars = { score: average.toFixed(1), area: AREAS[lowest].name };
    const subject = fill(c.subject, vars);
    const html = page(subject, [
      header(),
      hero(fill(c.title, vars), fill(c.subtitle, vars), false),
      areas(input.scores, lowest),
      firstStep(lowest),
      belief(c.button),
      wait(c.reply),
      footer(input.email, unsub),
    ].join(""));
    const text = [
      fill(c.title, vars),
      fill(c.subtitle, vars),
      `${c.areasTitle}:\n${AREA_ORDER.map((a) => `${AREAS[a].name}: ${input.scores![a]}/10`).join("\n")}`,
      `${fill(c.stepTitle, vars)}: ${EMAIL.firstSteps[lowest]}`,
      `${EMAIL.belief.title}: ${EMAIL.belief.text}`,
      `${c.button.label}: ${c.button.href}`,
      waitText(c.reply),
      `--\n${foot}`,
    ].join("\n\n");
    return { subject, text, html, inline: ["logo-white.png", "logo-green.png"] };
  }

  const w = EMAIL.welcome;
  const html = page(w.subject, [header(), hero(w.title, w.subtitle, true), grid(), belief(w.button), wait(w.reply), footer(input.email, unsub)].join(""));
  const text = [
    w.title,
    w.subtitle,
    `${w.gridTitle}\n${w.grid.map((g) => `- ${g.text}`).join("\n")}`,
    `${EMAIL.belief.title}: ${EMAIL.belief.text}`,
    `${w.button.label}: ${w.button.href}`,
    waitText(w.reply),
    `--\n${foot}`,
  ].join("\n\n");
  return { subject: w.subject, text, html, inline: ["logo-white.png", "logo-green.png", "hero.png", ...w.grid.map((g) => g.icon)] };
}
