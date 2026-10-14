import type { Metadata } from "next";
import Link from "next/link";
import { verifyUnsubscribe } from "@/lib/unsubscribe";

export const metadata: Metadata = { title: "Unsubscribe · Elegix", robots: { index: false } };

type Search = Promise<{ [key: string]: string | string[] | undefined }>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function Unsubscribe({ searchParams }: { searchParams: Search }) {
  const q = await searchParams;
  const email = one(q.e).trim().toLowerCase();
  const token = one(q.t);
  const state = one(q.state);
  const valid = !!email && verifyUnsubscribe(email, token);

  let title = "Unsubscribe from Elegix emails?";
  let text = `We'll stop sending emails to ${email}. You can join the waitlist again any time.`;
  let showForm = valid;
  if (state === "done") { title = "You're unsubscribed"; text = `We won't email ${email} again. If you change your mind, you can rejoin from the site.`; showForm = false; }
  else if (state === "error") { title = "Something went wrong"; text = "We couldn't unsubscribe you just now. Please try again, or reply to any of our emails and we'll do it by hand."; }
  else if (!valid) { title = "This link doesn't work"; text = "The unsubscribe link is incomplete or expired. Reply to any of our emails and we'll remove you by hand."; showForm = false; }

  return (
    <main className="section" style={{ paddingTop: "calc(var(--header-h) + var(--section-y))" }}>
      <div className="container" style={{ maxWidth: 640, display: "grid", gap: 20, justifyItems: "start" }}>
        <span className="label">Email preferences</span>
        <h1 className="display h2">{title}</h1>
        <p className="lede">{text}</p>
        {showForm && (
          <form method="post" action="/api/unsubscribe">
            <input type="hidden" name="e" value={email} />
            <input type="hidden" name="t" value={token} />
            <button type="submit" className="btn dark">Unsubscribe</button>
          </form>
        )}
        <Link href="/" className="btn ghost">Back to Elegix</Link>
      </div>
    </main>
  );
}
