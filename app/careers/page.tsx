import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP, CAREERS as C } from "@/lib/content";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import { Rich } from "@/components/ui/Rich";
import { Phone } from "@/components/ui/Phone";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { StatementSection, StatementStrip } from "@/components/sections/Opening";
import { Faq } from "@/components/sections/Faq";
import { OG_IMAGE } from "@/lib/site";
import styles from "./careers.module.css";

export const metadata: Metadata = {
  title: { absolute: C.meta.title },
  description: C.meta.description,
  alternates: { canonical: "/careers" },
  openGraph: { title: C.meta.title, description: C.meta.description, url: "/careers", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: C.meta.title, description: C.meta.description, images: [OG_IMAGE] },
};

const FAQ_DATA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: C.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

/** Careers: photo hero, why we build it, culture with photos, the product, FAQ, and an honest "no open roles" with one way to get in touch. */
export default function Careers() {
  const mail = `mailto:${C.open.email}?subject=${encodeURIComponent(C.open.subject)}`;
  return (
    <main>
      <Breadcrumbs name="Careers" path="/careers" />
      <JsonLd data={FAQ_DATA} />
      <PhotoHero id="careers-title" media={C.media} eyebrow={C.label} titlePrefix={C.h1Prefix} title={C.title} lede={C.lede}>
        <a href="#open-roles" className="btn lime">{C.cta}</a>
      </PhotoHero>

      <StatementSection>
        <StatementStrip label={C.statement.label} text={C.statement.text} photos={C.statement.strip} />
      </StatementSection>

      <section className="section" aria-labelledby="how-we-work">
        <div className="container">
          <div className={`section-head ${styles.center}`} data-reveal>
            <span className="label">{C.how.label}</span>
            <h2 id="how-we-work" className="display h2"><Rich text={C.how.title} /></h2>
            <p className="lede">{C.how.lede}</p>
          </div>
          <ul className={styles.items}>
            {C.how.items.map((it, i) => (
              <li key={it.title} className={styles.item} data-reveal>
                <div className={styles.photo}>
                  <Image src={it.src} alt={it.alt} fill sizes="(max-width: 860px) 100vw, 25vw" />
                  <span className={`num ${styles.n}`}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="product-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.product} data-reveal>
            <div className={styles.productText}>
              <span className="label">{C.product.label}</span>
              <h2 id="product-title" className="display h2"><Rich text={C.product.title} /></h2>
              <p className="lede">{C.product.text}</p>
              <ul className={styles.points}>{C.product.points.map((p) => <li key={p}><span className={styles.tick} aria-hidden="true">✓</span>{p}</li>)}</ul>
              <Link href={C.product.link.href} className="btn">{C.product.link.label}</Link>
            </div>
            <div className={styles.productVisual}><Phone screen={APP.screens[1].media} className={styles.phone} /></div>
          </div>
        </div>
      </section>

      <Faq items={C.faq.items} title={C.faq.title} />

      <section id="open-roles" className="section" aria-labelledby="open-roles-title" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container">
          <div className={`on-dark ${styles.open}`} data-reveal>
            <span className="label">{C.label}</span>
            <h2 id="open-roles-title" className="display h2"><Rich text={C.open.title} /></h2>
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
