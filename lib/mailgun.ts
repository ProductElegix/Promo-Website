import { EMAIL_ASSETS } from "./email/assets";
import { buildEmail } from "./email/template";

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
  return { key, domain, base, from: process.env.MAIL_FROM || `Edward from Elegix <edward@${domain}>`, list: `waitlist@${domain}` };
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

/** Marks the person unsubscribed on the waitlist list (kept as a member, so their history stays). */
export async function unsubscribeFromWaitlist(cfg: Config, email: string): Promise<void> {
  const res = await call(cfg, `/v3/lists/${cfg.list}/members`, { address: email, subscribed: "no", upsert: "yes" });
  if (!res.ok) throw new Error(`unsubscribe failed: ${res.status} ${await res.text()}`);
}

/**
 * Sends the confirmation (and, for the balance check, the result) with its images attached inline,
 * so they show without public hosting. Open tracking follows the Mailgun domain settings; click tracking is off (see below).
 * Returns true when Mailgun accepted the message.
 */
export async function sendConfirmation(cfg: Config, s: Signup, testMode = false): Promise<boolean> {
  const mail = buildEmail(s);
  const form = new FormData();
  form.append("from", cfg.from);
  form.append("to", s.email);
  form.append("subject", mail.subject);
  form.append("text", mail.text);
  form.append("html", mail.html);
  form.append("h:Reply-To", "hello@elegix.net");
  form.append("o:tag", s.source === "balance-check" ? "balance-check" : "waitlist");
  // Click tracking off for now: the tracking domain email.mail.elegix.net only serves http, so tracked
  // links fail in Chrome. Remove this line once HTTPS tracking is enabled for mail.elegix.net in Mailgun.
  form.append("o:tracking-clicks", "no");
  if (testMode) form.append("o:testmode", "yes");
  for (const name of mail.inline) {
    form.append("inline", new Blob([Buffer.from(EMAIL_ASSETS[name], "base64")], { type: "image/png" }), name);
  }
  const res = await fetch(`${cfg.base}/v3/${cfg.domain}/messages`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`api:${cfg.key}`).toString("base64")}` },
    body: form,
  });
  if (!res.ok) console.error("[waitlist] email failed", res.status, await res.text());
  return res.ok;
}
