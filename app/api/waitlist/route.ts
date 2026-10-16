import { NextResponse } from "next/server";
import { addToWaitlist, mailgunConfig, sendConfirmation, type Signup } from "@/lib/mailgun";
import { POLICY_VERSION } from "@/lib/content";
import { communityUrl } from "@/lib/email/template";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STARTS = new Set(["template", "own", "unsure"]);

// The 6 life areas, as in the app (lib/content.ts AREA_ORDER). Older signups stored 7 scores; those stay as they are.
const AREA_KEYS = ["health", "people", "meaning", "hobby", "growth", "career"] as const;

type Body = { email?: unknown; source?: unknown; start?: unknown; company?: unknown; scores?: unknown; consent?: unknown; page?: unknown; attribution?: unknown };

const str = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined);

/** UTM tags and referrer from the browser (lib/attribution.ts), trimmed; anything else is ignored. */
function parseAttribution(v: unknown): Signup["attribution"] {
  if (!v || typeof v !== "object") return undefined;
  const a = v as Record<string, unknown>;
  const out = { utm_source: str(a.utm_source, 100), utm_medium: str(a.utm_medium, 100), utm_campaign: str(a.utm_campaign, 100), referrer: str(a.referrer, 300), landing: str(a.landing, 300) };
  return Object.values(out).some(Boolean) ? out : undefined;
}

/** Balance check: an optional object with all 6 areas rated as whole numbers 1–10. */
function parseScores(value: unknown): Record<string, number> | null | "invalid" {
  if (value === undefined || value === null) return null;
  if (typeof value !== "object" || Array.isArray(value)) return "invalid";
  const input = value as Record<string, unknown>;
  const out: Record<string, number> = {};
  for (const key of AREA_KEYS) {
    const n = input[key];
    if (typeof n !== "number" || !Number.isInteger(n) || n < 1 || n > 10) return "invalid";
    out[key] = n;
  }
  return out;
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Send the form as JSON." }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email, like name@example.com." }, { status: 400 });
  }

  const scores = parseScores(body.scores);
  if (scores === "invalid") {
    return NextResponse.json({ error: "Rate each of the 6 areas from 1 to 10." }, { status: 400 });
  }

  if (rateLimited(request)) {
    return NextResponse.json({ error: "Too many tries. Please wait a minute and try again." }, { status: 429 });
  }

  const now = new Date().toISOString();
  const signup: Signup = {
    email,
    source: typeof body.source === "string" ? body.source.slice(0, 32) : "unknown",
    start: typeof body.start === "string" && STARTS.has(body.start) ? body.start : null,
    ...(scores ? { scores } : {}),
    joinedAt: now,
    // every form shows the consent line, so a signup is consent to the current policy version
    consent: body.consent === true ? { at: now, page: str(body.page, 200) ?? "/", policyVersion: POLICY_VERSION } : undefined,
    attribution: parseAttribution(body.attribution),
  };

  const mailgun = mailgunConfig();
  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!mailgun && !webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[waitlist] neither Mailgun nor WAITLIST_WEBHOOK_URL is set; signup not stored (dev only)", { source: signup.source });
      return NextResponse.json({ ok: true, stored: false, emailed: false });
    }
    return NextResponse.json({ error: "The waitlist is not open yet. Please try again soon." }, { status: 503 });
  }

  // Store: the Mailgun mailing list is the waitlist; the webhook is an optional extra copy.
  let stored = false;
  if (mailgun) {
    try {
      await addToWaitlist(mailgun, signup);
      stored = true;
    } catch (err) {
      console.error("[waitlist] mailgun list failed", err);
    }
  }
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(signup),
      });
      if (!res.ok) throw new Error(`webhook responded ${res.status}`);
      stored = true;
    } catch (err) {
      console.error("[waitlist] forwarding failed", err);
    }
  }
  if (!stored) {
    return NextResponse.json({ error: "We couldn't save your email just now. Please try again." }, { status: 502 });
  }

  // A failed email never fails the signup: the person is already on the list.
  let emailed = false;
  if (mailgun) {
    try {
      emailed = await sendConfirmation(mailgun, signup, process.env.MAILGUN_TEST_MODE === "yes");
    } catch (err) {
      console.error("[waitlist] email failed", err);
    }
  }

  // the invite itself only travels by email; the site just says to check the inbox
  return NextResponse.json({ ok: true, stored: true, emailed, invited: emailed && !!communityUrl() });
}

/** Basic per-IP limit: 5 signups a minute per server instance. Enough to stop accidental loops and simple abuse. */
const hits = new Map<string, number[]>();
function rateLimited(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}
