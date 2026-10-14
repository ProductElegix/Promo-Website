import { AREAS, AREA_ORDER, EMAIL, type AreaKey } from "./content";

/**
 * Mailgun (REST API) for the waitlist: every signup is stored as a member of the mailing list
 * `waitlist@MAILGUN_DOMAIN`, then gets a confirmation email.
 *
 * Env: MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_REGION ("us" or "eu"), MAIL_FROM.
 */

export type Signup = {
  email: string;
  source: string;
  start: string | null;
  scores?: Record<string, number>;
  joinedAt: string;
};

type Config = { key: string; domain: string; base: string; from: string; list: string };

export function mailgunConfig(): Config | null {
  const key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;
  if (!key || !domain) return null;
  const base = process.env.MAILGUN_REGION === "eu" ? "https://api.eu.mailgun.net" : "https://api.mailgun.net";
  return { key, domain, base, from: process.env.MAIL_FROM || `Elegix <hello@${domain}>`, list: `waitlist@${domain}` };
}

async function call(cfg: Config, path: string, form: Record<string, string>) {
  const res = await fetch(`${cfg.base}${path}`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`api:${cfg.key}`).toString("base64")}` },
    body: new URLSearchParams(form),
  });
  return res;
}

/** Adds (or updates) the signup in the waitlist mailing list, creating the list on first use. */
export async function addToWaitlist(cfg: Config, s: Signup): Promise<void> {
  const member = {
    address: s.email,
    subscribed: "yes",
    upsert: "yes",
    vars: JSON.stringify({ source: s.source, start: s.start, scores: s.scores ?? null, joinedAt: s.joinedAt }),
  };
  let res = await call(cfg, `/v3/lists/${cfg.list}/members`, member);
  if (res.status === 404) {
    const created = await call(cfg, "/v3/lists", { address: cfg.list, name: "Elegix waitlist", access_level: "readonly", reply_preference: "sender" });
    if (!created.ok && created.status !== 400) throw new Error(`list create failed: ${created.status}`);
    res = await call(cfg, `/v3/lists/${cfg.list}/members`, member);
  }
  if (!res.ok) throw new Error(`list add failed: ${res.status} ${await res.text()}`);
}

function balance(scores: Record<string, number>) {
  const values = AREA_ORDER.map((a) => scores[a]);
  const average = values.reduce((sum, n) => sum + n, 0) / values.length;
  const lowest = AREA_ORDER.reduce((low, a) => (scores[a] < scores[low] ? a : low), AREA_ORDER[0]) as AreaKey;
  return { average, lowest };
}

const UNSUBSCRIBE = "mailto:hello@elegix.net?subject=Unsubscribe";

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function buildEmail(s: Signup) {
  const isCheck = s.source === "balance-check" && !!s.scores;
  const lines: string[] = [];
  let html = "";

  if (isCheck) {
    const { average, lowest } = balance(s.scores!);
    lines.push(EMAIL.checkIntro, "", `Your balance: ${average.toFixed(1)}/10`, "");
    AREA_ORDER.forEach((a) => lines.push(`${AREAS[a].name}: ${s.scores![a]}/10`));
    lines.push("", `Your weakest area: ${AREAS[lowest].name}`, `${EMAIL.firstStepLabel}: ${EMAIL.firstSteps[lowest]}`, "");
    html += `<p style="margin:0 0 16px">${esc(EMAIL.checkIntro)}</p>
<p style="margin:0 0 4px;color:#6b726e;font-size:14px">Your balance</p>
<p style="margin:0 0 20px;font-size:40px;font-weight:600;letter-spacing:-1px">${average.toFixed(1)}<span style="font-size:16px;color:#6b726e">/10</span></p>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin:0 0 20px;font-size:15px">${AREA_ORDER.map(
      (a) => `<tr><td style="padding:6px 0;border-bottom:1px solid #eceae2">${esc(AREAS[a].name)}</td><td style="padding:6px 0;border-bottom:1px solid #eceae2;text-align:right;font-weight:600">${s.scores![a]}/10</td></tr>`,
    ).join("")}</table>
<div style="background:#f3f2ed;border-radius:14px;padding:16px 18px;margin:0 0 20px">
<p style="margin:0 0 4px;font-size:14px;color:#6b726e">Your weakest area: <b style="color:#111613">${esc(AREAS[lowest].name)}</b></p>
<p style="margin:0;font-size:16px"><b>${esc(EMAIL.firstStepLabel)}:</b> ${esc(EMAIL.firstSteps[lowest])}</p></div>`;
  }

  lines.push(EMAIL.intro, EMAIL.next, "", EMAIL.signoff, "", "--", EMAIL.footer, `Unsubscribe: ${UNSUBSCRIBE}`);
  html += `<p style="margin:0 0 12px">${esc(EMAIL.intro)}</p><p style="margin:0 0 20px">${esc(EMAIL.next)}</p>
<p style="margin:0 0 28px;white-space:pre-line">${esc(EMAIL.signoff)}</p>`;

  const page = `<!doctype html><html><body style="margin:0;background:#f3f2ed;font-family:Helvetica,Arial,sans-serif;color:#111613">
<div style="max-width:520px;margin:0 auto;padding:32px 20px">
<p style="margin:0 0 24px;font-size:20px;font-weight:600;letter-spacing:-0.5px;color:#009a44">elegix</p>
<div style="background:#ffffff;border-radius:20px;padding:28px 24px;font-size:16px;line-height:1.55">${html}</div>
<p style="margin:20px 4px 0;font-size:12px;line-height:1.5;color:#6b726e">${esc(EMAIL.footer)} <a href="${UNSUBSCRIBE}" style="color:#6b726e">Unsubscribe</a></p>
</div></body></html>`;

  return { subject: isCheck ? EMAIL.checkSubject : EMAIL.subject, text: lines.join("\n"), html: page };
}

/** Sends the confirmation (and, for the balance check, the result). Returns true when Mailgun accepted it. */
export async function sendConfirmation(cfg: Config, s: Signup, testMode = false): Promise<boolean> {
  const mail = buildEmail(s);
  const form: Record<string, string> = {
    from: cfg.from,
    to: s.email,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    "h:Reply-To": "hello@elegix.net",
    "h:List-Unsubscribe": `<${UNSUBSCRIBE}>`,
    "o:tag": s.source === "balance-check" ? "balance-check" : "waitlist",
  };
  if (testMode) form["o:testmode"] = "yes";
  const res = await call(cfg, `/v3/${cfg.domain}/messages`, form);
  if (!res.ok) console.error("[waitlist] email failed", res.status, await res.text());
  return res.ok;
}
