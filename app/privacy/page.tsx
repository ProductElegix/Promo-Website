import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Privacy policy · Elegix" };

// Placeholder: replace with your real policy before collecting emails from the public.
export default function Privacy() {
  return (
    <main className="section" style={{ paddingTop: "calc(var(--header-h) + var(--section-y))" }}>
      <article className="container" style={{ maxWidth: 820 }}>
        <Link href="/" className="label" style={{ textDecoration: "none" }}>Back to Elegix</Link>
        <h1 className="display h2" style={{ margin: "28px 0 24px" }}>Privacy policy</h1>
        <p style={{ color: "var(--ink-2)", maxWidth: "40rem" }}>
          Placeholder text. Describe what you collect (the waitlist email and the start option a visitor picks), why you collect it
          (to send the invite and product updates), where it is stored, how long you keep it, and how people can ask you to delete it.
        </p>
      </article>
    </main>
  );
}
