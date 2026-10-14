import type { Metadata } from "next";
import Link from "next/link";
import { PRIVACY, POLICY_VERSION } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy policy · Elegix" };

export default function Privacy() {
  return (
    <main className="section" style={{ paddingTop: "calc(var(--header-h) + var(--section-y))" }}>
      <article className="container" style={{ maxWidth: 820, display: "grid", gap: 28 }}>
        <Link href="/" className="label" style={{ textDecoration: "none" }}>Back to Elegix</Link>
        <div style={{ display: "grid", gap: 12 }}>
          <h1 className="display h2">{PRIVACY.title}</h1>
          <p className="muted" style={{ fontSize: "0.9rem" }}>{PRIVACY.updated} · Version {POLICY_VERSION}</p>
        </div>
        <p style={{ color: "var(--ink-2)", fontSize: "1.05rem", lineHeight: 1.6 }}>{PRIVACY.intro}</p>
        {PRIVACY.sections.map((s) => (
          <section key={s.title} style={{ display: "grid", gap: 12 }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 500, letterSpacing: "-0.02em" }}>{s.title}</h2>
            <ul style={{ display: "grid", gap: 8, paddingLeft: 20, listStyle: "disc", color: "var(--ink-2)", lineHeight: 1.6 }}>
              {s.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </section>
        ))}
        <p style={{ color: "var(--ink-2)" }}>{PRIVACY.contact}</p>
      </article>
    </main>
  );
}
