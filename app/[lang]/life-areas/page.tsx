import { Inline, plainText } from "@/components/ui/Inline";
import type { Metadata } from "next";
import { areasOf, cardMeta, guideHref, guidesOf } from "@/lib/guides";
import { LIFE_AREAS_HUB } from "@/lib/life-areas-hub";
import { LIFE_AREAS_HUB_UK, LIFE_AREAS_PAGE_UK } from "@/lib/uk/life-areas-hub";
import { langMeta, pageMeta, paramsLang } from "@/lib/meta";
import { getLang } from "@/lib/lang";
import type { Lang } from "@/lib/i18n";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import { BlockView } from "@/components/ui/Article";
import article from "@/components/ui/Article.module.css";
import { GuideCards } from "@/components/ui/GuideCards";
import { Rich } from "@/components/ui/Rich";
import styles from "../guides/hub.module.css";

const PAGE_EN = {
  title: "The 6 areas of life and how to balance each",
  description: "What the areas of life are, why Elegix uses 6, how they compare with 8- and 12-area models, and how to balance each one.",
  crumb: "Life areas",
  label: "Life areas",
  h1: "The 6 areas of a *balanced* life",
  lede: "Every goal, habit and task in Elegix belongs to one of these areas. Read what each covers, how to tell it's slipping and what helps.",
  all: "All life areas",
  aboutAreas: "About the areas of life",
  questions: "Questions people ask",
};
const pageOf = (lang: Lang) => (lang === "uk" ? { T: LIFE_AREAS_PAGE_UK, HUB: LIFE_AREAS_HUB_UK } : { T: PAGE_EN, HUB: LIFE_AREAS_HUB });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  const { T } = pageOf(lang);
  return pageMeta(lang, "/life-areas", { title: T.title, description: T.description });
}

export default async function LifeAreas() {
  const lang = await getLang();
  const { T, HUB } = pageOf(lang);
  const { AREA_GUIDES } = guidesOf(lang);
  return (
    <main>
      <Breadcrumbs name={T.crumb} path={langMeta(lang, "/life-areas").url} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: HUB.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
      }} />
      <section className={`section ${styles.hero}`} aria-labelledby="areas-title">
        <div className="container">
          <div className={`section-head ${styles.head}`}>
            <span className="label">{T.label}</span>
            <h1 id="areas-title" className={`display ${styles.title}`}><Rich text={T.h1} /></h1>
            <p className="lede">{T.lede}</p>
          </div>
        </div>
      </section>
      <section className={`section ${styles.list}`} aria-label={T.all}>
        <div className="container">
          <GuideCards cards={AREA_GUIDES.map((g) => ({ href: guideHref(g), title: g.title, text: g.description, media: g.media, meta: cardMeta(g, lang), areas: areasOf(g) }))} />
        </div>
      </section>
      <section className="section" aria-label={T.aboutAreas} style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className={article.body}>
            {HUB.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
              </section>
            ))}
            <section id="questions">
              <h2>{T.questions}</h2>
              <div className={article.faq}>
                {HUB.faq.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}<span className={article.plus} aria-hidden="true" /></summary>
                    <p><Inline text={f.a} /></p>
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
