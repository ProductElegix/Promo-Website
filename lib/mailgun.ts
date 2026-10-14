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
  /** what the person agreed to: the consent line under the form links to this policy version */
  consent?: { at: string; page: string; policyVersion: string };
  attribution?: { utm_source?: string; utm_medium?: string; utm_campaign?: string; referrer?: string; landing?: string };
};

/** What we keep per person in the list member's vars. Never overwritten wholesale: see mergeVars. */
type MemberVars = {
  firstJoinedAt?: string;
  lastJoinedAt?: string;
  sources?: string[];
  source?: string;
  start?: string | null;
  scores?: Record<string, number> | null;
  scoresHistory?: { scores: Record<string, number>; at: string }[];
  consentAt?: string;
  consentPage?: string;
  policyVersion?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  landing?: string;
  joinedAt?: string; // older records
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

const auth = (cfg: Config) => ({ Authorization: `Basic ${Buffer.from(`api:${cfg.key}`).toString("base64")}` });

/** Current vars of a list member, or {} for someone new. */
async function readVars(cfg: Config, email: string): Promise<MemberVars> {
  const res = await fetch(`${cfg.base}/v3/lists/${cfg.list}/members/${encodeURIComponent(email)}`, { headers: auth(cfg) });
  if (!res.ok) return {};
  const data = (await res.json().catch(() => ({}))) as { member?: { vars?: MemberVars } };
  return data.member?.vars ?? {};
}

/**
 * Merges a new signup into what we already know, so a second form or a later balance check
 * adds to the record instead of wiping it: first join date, attribution and first consent page stay,
 * sources accumulate, the latest start choice wins only when one was made, scores keep a history (last 10).
 */
export function mergeVars(old: MemberVars, s: Signup): MemberVars {
  const firstJoinedAt = old.firstJoinedAt ?? old.joinedAt ?? s.joinedAt;
  const sources = Array.from(new Set([...(old.sources ?? (old.source ? [old.source] : [])), s.source]));
  const history = old.scoresHistory ?? (old.scores && old.joinedAt ? [{ scores: old.scores, at: old.joinedAt }] : []);
  const scoresHistory = s.scores ? [...history, { scores: s.scores, at: s.joinedAt }].slice(-10) : history;
  const a = s.attribution ?? {};
  return {
    firstJoinedAt,
    lastJoinedAt: s.joinedAt,
    sources,
    source: s.source,
    start: s.start ?? old.start ?? null,
    scores: s.scores ?? old.scores ?? null,
    scoresHistory,
    consentAt: s.consent?.at ?? old.consentAt,
    consentPage: s.consent?.page ?? old.consentPage,
    policyVersion: s.consent?.policyVersion ?? old.policyVersion,
    // first touch wins: keep where the person originally came from
    utm_source: old.utm_source ?? a.utm_source,
    utm_medium: old.utm_medium ?? a.utm_medium,
    utm_campaign: old.utm_campaign ?? a.utm_campaign,
    referrer: old.referrer ?? a.referrer,
    landing: old.landing ?? a.landing,
  };
}

/** Adds the signup to the waitlist mailing list, or updates the existing member, creating the list on first use. */
export async function addToWaitlist(cfg: Config, s: Signup): Promise<void> {
  const vars = mergeVars(await readVars(cfg, s.email), s);
  const member = { address: s.email, subscribed: "yes", upsert: "yes", vars: JSON.stringify(vars) };
  let res = await call(cfg, `/v3/lists/${cfg.list}/members`, member);
  if (res.status === 404) {
    const created = await call(cfg, "/v3/lists", { address: cfg.list, name: "Elegix waitlist", access_level: "readonly", reply_preference: "sender" });
    if (!created.ok && created.status !== 400) throw new Error(`list create failed: ${created.status}`);
    res = await call(cfg, `/v3/lists/${cfg.list}/members`, member);
  }
  // status only: Mailgun's error body can contain the email address
  if (!res.ok) throw new Error(`list add failed: ${res.status}`);
}

/** Marks the person unsubscribed on the waitlist list (kept as a member, so their history stays). */
export async function unsubscribeFromWaitlist(cfg: Config, email: string): Promise<void> {
  const res = await call(cfg, `/v3/lists/${cfg.list}/members`, { address: email, subscribed: "no", upsert: "yes" });
  if (!res.ok) throw new Error(`unsubscribe failed: ${res.status}`);
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
    headers: auth(cfg),
    body: form,
  });
  if (!res.ok) console.error("[waitlist] email failed", res.status);
  return res.ok;
}
