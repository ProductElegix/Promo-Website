import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const STARTS = new Set(["template", "own", "unsure"]);

const AREA_KEYS = ["health", "people", "career", "growth", "hobby", "meaning", "home"] as const;

type Body = { email?: unknown; source?: unknown; start?: unknown; company?: unknown; scores?: unknown };

/** Balance check: an optional object with all 7 areas rated as whole numbers 1–10. */
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
    return NextResponse.json({ error: "Rate each of the 7 areas from 1 to 10." }, { status: 400 });
  }

  const signup = {
    email,
    source: typeof body.source === "string" ? body.source.slice(0, 32) : "unknown",
    start: typeof body.start === "string" && STARTS.has(body.start) ? body.start : null,
    ...(scores ? { scores } : {}),
    joinedAt: new Date().toISOString(),
  };

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[waitlist] WAITLIST_WEBHOOK_URL is not set; signup not stored:", signup);
      return NextResponse.json({ ok: true, stored: false });
    }
    return NextResponse.json({ error: "The waitlist is not open yet. Please try again soon." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(signup),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error("[waitlist] forwarding failed", err);
    return NextResponse.json({ error: "We couldn't save your email just now. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, stored: true });
}
