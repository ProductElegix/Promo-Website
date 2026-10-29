import type { Metadata } from "next";
import { AREA_GUIDES, areaGuideHref } from "@/lib/guides";
import { LIFE_AREAS_HUB } from "@/lib/life-areas-hub";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import { BlockView } from "@/components/ui/Article";
import article from "@/components/ui/Article.module.css";
import { GuideCards } from "@/components/ui/GuideCards";
import { Rich } from "@/components/ui/Rich";
import { OG_IMAGE } from "@/lib/site";
import styles from "../guides/hub.module.css";

const TITLE = "The 6 areas of life and how to balance each";
const DESCRIPTION = "What the areas of life are, why Elegix uses 6, how they compare with 8- and 12-area models, and how to balance each one.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/life-areas" },
  openGraph: { title: `${TITLE} · Elegix`, description: DESCRIPTION, url: "/life-areas", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: `${TITLE} · Elegix`, description: DESCRIPTION, images: [OG_IMAGE] },
};

export default function LifeAreas() {
  return (
    <main>
      <Breadcrumbs name="Life areas" path="/life-areas" />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: LIFE_AREAS_HUB.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }} />
      <section className={`section ${styles.hero}`} aria-labelledby="areas-title">
        <div className="container">
          <div className={`section-head ${styles.head}`}>
            <span className="label">Life areas</span>
            <h1 id="areas-title" className={`display ${styles.title}`}><Rich text="The 6 areas of a *balanced* life" /></h1>
            <p className="lede">Every goal, habit and task in Elegix belongs to one of these areas. Read what each covers, how to tell it's slipping and what helps.</p>
          </div>
        </div>
      </section>
      <section className={`section ${styles.list}`} aria-label="All life areas">
        <div className="container">
          <GuideCards cards={AREA_GUIDES.map((g) => ({ href: areaGuideHref(g.area), title: g.title, text: g.description, media: g.media, meta: `${g.minutes} min read`, area: g.area }))} />
        </div>
      </section>
      <section className="section" aria-label="About the areas of life" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className={article.body}>
            {LIFE_AREAS_HUB.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
              </section>
            ))}
            <section id="questions">
              <h2>Questions people ask</h2>
              <div className={article.faq}>
                {LIFE_AREAS_HUB.faq.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}<span className={article.plus} aria-hidden="true" /></summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
