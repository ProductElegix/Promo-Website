import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Our own unsubscribe link for waitlist emails: /unsubscribe?e=<email>&t=<token>.
 * The token is an HMAC of the email with UNSUBSCRIBE_SECRET, so nobody can unsubscribe someone else.
 * The link always points at the public site (dev previews are behind Vercel login).
 */
const BASE = process.env.UNSUBSCRIBE_BASE_URL || "https://www.elegix.net";

export function unsubscribeToken(email: string): string | null {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex").slice(0, 32);
}

export function verifyUnsubscribe(email: string, token: string): boolean {
  const expected = unsubscribeToken(email);
  if (!expected || token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

/** Null when UNSUBSCRIBE_SECRET isn't set; the email then falls back to Mailgun's %unsubscribe_url%. */
export function unsubscribeUrl(email: string): string | null {
  const t = unsubscribeToken(email);
  return t ? `${BASE}/unsubscribe?${new URLSearchParams({ e: email.trim().toLowerCase(), t })}` : null;
}
