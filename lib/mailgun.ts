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
  return { key, domain, base, from: process.env.MAIL_FROM || "Edward from Elegix <edward@elegix.net>", list: `waitlist@${domain}` };
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

/**
 * A short personal note in plain text (no HTML part, images, buttons or links),
 * which is what Gmail expects from a 1:1 message rather than a newsletter.
 */
export function buildEmail(s: Signup) {
  const isCheck = s.source === "balance-check" && !!s.scores;
  const paragraphs: string[] = [EMAIL.greeting];
  let subject = EMAIL.subject;

  if (isCheck) {
    const { average, lowest } = balance(s.scores!);
    subject = EMAIL.checkSubject.replace("{score}", average.toFixed(1));
    paragraphs.push(
      EMAIL.checkIntro,
      `${EMAIL.checkScore}: ${average.toFixed(1)}/10`,
      AREA_ORDER.map((a) => `${AREAS[a].name}: ${s.scores![a]}/10`).join("\n"),
      `${EMAIL.checkLowest} ${AREAS[lowest].name}. ${EMAIL.firstStepLabel}: ${EMAIL.firstSteps[lowest]}`,
      EMAIL.checkQuestion,
      EMAIL.checkWaitlist,
    );
  } else {
    paragraphs.push(EMAIL.intro, EMAIL.next, EMAIL.question);
  }
  paragraphs.push(EMAIL.signature, `--\n${EMAIL.footer}`);

  return { subject, text: paragraphs.join("\n\n") };
}

/** Sends the confirmation (and, for the balance check, the result). Returns true when Mailgun accepted it. */
export async function sendConfirmation(cfg: Config, s: Signup, testMode = false): Promise<boolean> {
  const mail = buildEmail(s);
  const form: Record<string, string> = {
    from: cfg.from,
    to: s.email,
    subject: mail.subject,
    // plain text only, like a message typed by a person
    text: mail.text,
    "h:Reply-To": "hello@elegix.net",
    // no open pixel, no rewritten links, no auto unsubscribe footer: all of these read as bulk mail
    "o:tracking": "no",
    "o:tracking-opens": "no",
    "o:tracking-clicks": "no",
    "o:tag": s.source === "balance-check" ? "balance-check" : "waitlist",
  };
  if (testMode) form["o:testmode"] = "yes";
  const res = await call(cfg, `/v3/${cfg.domain}/messages`, form);
  if (!res.ok) console.error("[waitlist] email failed", res.status, await res.text());
  return res.ok;
}
