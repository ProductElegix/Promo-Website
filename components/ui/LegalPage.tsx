import Link from "next/link";
import type { LegalDoc, LegalBlock } from "@/lib/legal";

function Block({ b }: { b: LegalBlock }) {
  if (b.type === "list") {
    return <ul style={{ display: "grid", gap: 8, paddingLeft: 20, listStyle: "disc", color: "var(--ink-2)", lineHeight: 1.6 }}>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
  }
  if (b.type === "h3") return <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginTop: 8 }}>{b.text}</h3>;
  return <p style={{ color: "var(--ink-2)", lineHeight: 1.65 }}>{b.text}</p>;
}

/** Renders a legal document from lib/legal.ts. `extra` sections are inserted after the introduction. */
export function LegalPage({ doc, version, extra = [] }: { doc: LegalDoc; version?: string; extra?: LegalDoc["sections"] }) {
  const [intro, ...rest] = doc.sections;
  const sections = intro?.title === "Introduction" ? [intro, ...extra, ...rest] : [...extra, ...doc.sections];
  return (
    <main className="section" style={{ paddingTop: "calc(var(--header-h) + var(--section-y))" }}>
      <div className="container" style={{ maxWidth: 820, display: "grid", gap: 28 }}>
        <Link href="/" className="label" style={{ textDecoration: "none" }}>Back to Elegix</Link>
        <div style={{ display: "grid", gap: 12 }}>
          <h1 className="display h2">{doc.title}</h1>
          <p className="muted" style={{ fontSize: "0.9rem" }}>
            Effective date: {doc.effective}{version ? ` · Version ${version}` : ""} · Contact: <a href={`mailto:${doc.contact}`}>{doc.contact}</a>
          </p>
        </div>
        {sections.map((s) => (
          <section key={s.title} style={{ display: "grid", gap: 12 }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 500, letterSpacing: "-0.02em" }}>{s.title}</h2>
            {s.blocks.map((b, i) => <Block key={i} b={b} />)}
          </section>
        ))}
      </div>
    </main>
  );
}
