import { mailgunConfig } from "./mailgun";

/**
 * How many people are on the waitlist: the member count of the Mailgun list, cached for an hour so the
 * home page stays fast. Returns null without Mailgun keys or when Mailgun doesn't answer; the counter is hidden then.
 */
export async function waitlistCount(): Promise<number | null> {
  const cfg = mailgunConfig();
  if (!cfg) return null;
  try {
    const res = await fetch(`${cfg.base}/v3/lists/${cfg.list}`, {
      headers: { Authorization: `Basic ${Buffer.from(`api:${cfg.key}`).toString("base64")}` },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { list?: { members_count?: number } };
    const n = data.list?.members_count;
    return typeof n === "number" ? n : null;
  } catch {
    return null;
  }
}
