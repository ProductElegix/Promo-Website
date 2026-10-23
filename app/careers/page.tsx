import type { Metadata } from "next";
import Link from "next/link";
import { CAREERS as C } from "@/lib/content";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { Rich } from "@/components/ui/Rich";
import { OG_IMAGE } from "@/lib/site";
import styles from "./careers.module.css";

export const metadata: Metadata = {
  title: C.meta.title,
  description: C.meta.description,
  alternates: { canonical: "/careers" },
  openGraph: { title: `${C.meta.title} · Elegix`, description: C.meta.description, url: "/careers", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${C.meta.title} · Elegix`, description: C.meta.description, images: [OG_IMAGE] },
};

/** Careers: who we are, how we work, and an honest "no open roles" with one way to get in touch. */
export default function Careers() {
  const mail = `mailto:${C.open.email}?subject=${encodeURIComponent(C.open.subject)}`;
  return (
    <main>
      <Breadcrumbs name="Careers" path="/careers" />
      <section className={`section ${styles.hero}`} aria-labelledby="careers-title">
        <div className="container">
          <div className={`section-head ${styles.head}`} data-reveal>
            <span className="label">{C.label}</span>
            <h1 id="careers-title" className={`display ${styles.title}`}><Rich text={C.title} /></h1>
            <p className="lede">{C.lede}</p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.how}`} aria-labelledby="how-we-work">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{C.how.label}</span>
            <h2 id="how-we-work" className="display h2"><Rich text={C.how.title} /></h2>
          </div>
          <ul className={styles.items}>
            {C.how.items.map((it, i) => (
              <li key={it.title} className={styles.item} data-reveal>
                <span className={`num ${styles.n}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="open-roles" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={`on-dark grain ${styles.open}`} data-reveal>
            <h2 id="open-roles" className="display h2"><Rich text={C.open.title} /></h2>
            <p className="lede">{C.open.text}</p>
            <div className={styles.actions}>
              <a href={mail} className="btn lime">{C.open.button}</a>
              <Link href={C.open.team.href} className={styles.team}>{C.open.team.label} →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
