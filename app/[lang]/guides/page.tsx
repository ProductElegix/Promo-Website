import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/Lang";
import { areaGuideHref, areasOf, cardMeta, guideHref, guidesOf } from "@/lib/guides";
import { getLang } from "@/lib/lang";
import { langMeta, pageMeta, paramsLang } from "@/lib/meta";
import type { Lang } from "@/lib/i18n";
import { AreaTags } from "@/components/ui/AreaTags";
import type { AreaKey } from "@/lib/content";
import type { MediaSlot } from "@/lib/content";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import type { Card } from "@/components/ui/GuideCards";
import { GuideFilter } from "@/components/ui/GuideFilter";
import { Rich } from "@/components/ui/Rich";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { Join } from "@/components/sections/Join";
import { SITE_URL } from "@/lib/site";
import { Inline, plainText } from "@/components/ui/Inline";
import { BlockView } from "@/components/ui/Article";
import article from "@/components/ui/Article.module.css";
import { LIFE_AREAS_HUB } from "@/lib/life-areas-hub";
import { LIFE_AREAS_HUB_UK } from "@/lib/uk/life-areas-hub";
import styles from "./hub.module.css";

const T = {
  en: {
    title: "Life balance guides: burnout, goals and balance",
    description: "Free guides from Elegix on the Wheel of Life, the signs of burnout, work-life balance, setting goals for every area of life and a 10-minute weekly review.",
    heroAlt: "A notebook, pen and laptop on a wooden desk",
    crumb: "Guides", eyebrow: "Guides", h1Prefix: "Life balance guides", h1: "Guides to a *balanced* life",
    lede: "Practical guides on the Wheel of Life, burnout, work-life balance and goals, plus a page for each of the 6 areas of life.",
    start: "Start reading", startHere: "Start here", readGuide: "Read the guide",
    allLabel: "Guides", allTitle: "Burnout, balance and *goals*",
    areasLabel: "Life areas", areasTitle: "The 6 areas of a *balanced* life", questions: "Questions people ask", tools: "Free tools", howWe: "How we write and check our guides",
    checkLabel: "Free Life Balance Check", checkTitle: "Find your weakest area in *2 minutes*",
    checkText: "Rate your 6 life areas from 1 to 10. We'll email your Life Balance score and one first step for your lowest area.",
    checkBtn: "Take the free check",
  },
  uk: {
    title: "Гайди про баланс життя: вигорання, цілі та баланс",
    description: "Безкоштовні гайди від Elegix про колесо життя, ознаки вигорання, баланс роботи та життя, цілі для кожної сфери життя й 10-хвилинний щотижневий огляд.",
    heroAlt: "Блокнот, ручка й ноутбук на дерев’яному столі",
    crumb: "Гайди", eyebrow: "Гайди", h1Prefix: "Гайди про баланс життя", h1: "Гайди до *збалансованого* життя",
    lede: "Практичні гайди про колесо життя, вигорання, баланс роботи та життя й цілі, а також сторінка для кожної з 6 сфер життя.",
    start: "Почати читати", startHere: "Почни звідси", readGuide: "Читати гайд",
    allLabel: "Гайди", allTitle: "Вигорання, баланс і *цілі*",
    areasLabel: "Сфери життя", areasTitle: "6 сфер *збалансованого* життя", questions: "Питання, які ставлять люди", tools: "Безкоштовні інструменти", howWe: "Як ми пишемо й перевіряємо гайди",
    checkLabel: "Безкоштовна перевірка балансу", checkTitle: "Знайди свою найслабшу сферу за *2 хвилини*",
    checkText: "Оціни 6 сфер життя від 1 до 10. Ми надішлемо на пошту твою оцінку балансу життя й перший крок для найнижчої сфери.",
    checkBtn: "Пройти безкоштовну перевірку",
  },
} satisfies Record<Lang, Record<string, string>>;

const HERO = (lang: Lang): MediaSlot => ({ src: "/images/how-next.jpg", alt: T[lang].heroAlt, brief: "Guides hero", ratio: "3 / 2" });

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  const m = pageMeta(lang, "/guides", { title: T[lang].title, description: T[lang].description });
  return { ...m, alternates: { ...m.alternates, types: { "application/rss+xml": [{ url: "/guides/feed.xml", title: "Elegix guides" }] } } };
}

/** Hub for every guide and life area page, so each one is two clicks from the home page. The first guide is the "start here". */
export default async function Guides() {
  const lang = await getLang();
  const t = T[lang];
  const { GUIDES, AREA_GUIDES } = guidesOf(lang);
  const [first] = GUIDES;
  const areaCards: Card[] = AREA_GUIDES.map((g) => ({ href: guideHref(g), title: g.title, text: g.description, media: g.media, meta: cardMeta(g, lang), areas: areasOf(g) }));
  const HUB = lang === "uk" ? LIFE_AREAS_HUB_UK : LIFE_AREAS_HUB;
  const all = [...GUIDES.map((g) => `/guides/${g.slug}`), ...AREA_GUIDES.map((g) => areaGuideHref(g.area))];
  return (
    <main>
      <Breadcrumbs name={t.crumb} path={langMeta(lang, "/guides").url} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: t.title,
        description: t.description,
        inLanguage: lang,
        url: `${SITE_URL}${langMeta(lang, "/guides").url}`,
        mainEntity: { "@type": "ItemList", itemListElement: all.map((href, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}${langMeta(lang, href).url}` })) },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: HUB.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
      }} />
      <PhotoHero id="guides-title" media={HERO(lang)} eyebrow={t.eyebrow} titlePrefix={t.h1Prefix} title={t.h1} lede={t.lede}>
        <a href="#start" className="btn lime">{t.start}</a>
      </PhotoHero>

      {/* start here: the first guide, large */}
      <section id="start" className="section" aria-labelledby="start-title" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container">
          <Link href={`/guides/${first.slug}`} className={styles.featured} data-reveal>
            <span className={styles.featuredPhoto}>{first.media.src && <Image src={first.media.src} alt={first.media.alt} fill sizes="(max-width: 860px) 100vw, 60vw" />}</span>
            <span className={styles.featuredText}>
              <span className="label">{t.startHere}</span>
              <AreaTags areas={first.areas} />
              <h2 id="start-title" className={styles.featuredTitle}>{first.title}</h2>
              <p>{first.description}</p>
              <span className={styles.meta}>{cardMeta(first, lang)}</span>
              <span className="btn">{t.readGuide}</span>
            </span>
          </Link>
        </div>
      </section>

      <section className="section" aria-labelledby="all-guides" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={`section-head ${styles.center}`} data-reveal>
            <span className="label">{t.allLabel}</span>
            <h2 id="all-guides" className="display h2"><Rich text={t.allTitle} /></h2>
          </div>
          <GuideFilter
            guides={GUIDES.map((g) => ({ href: guideHref(g), title: g.title, text: g.description, media: g.media, meta: cardMeta(g, lang), areas: areasOf(g) }))}
            areaPages={Object.fromEntries(AREA_GUIDES.map((g, i) => [g.area, areaCards[i]])) as Partial<Record<AreaKey, Card>>} />
          <p className={styles.policy}><Link href="/tools">{t.tools}</Link> · <Link href="/guides/how-we-write-guides">{t.howWe}</Link> · <a href="/guides/feed.xml">RSS</a></p>
        </div>
      </section>

      {/* what the 6 areas are: the text that used to live on /life-areas, so every area page sits under Guides */}
      <section id="areas" className="section" aria-labelledby="areas-title" style={{ paddingTop: 0, scrollMarginTop: "calc(var(--header-h) + 32px)" }}>
        <div className="container">
          <div className={`section-head ${styles.center}`} data-reveal>
            <span className="label">{t.areasLabel}</span>
            <h2 id="areas-title" className="display h2"><Rich text={t.areasTitle} /></h2>
          </div>
        </div>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className={article.body}>
            {HUB.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
              </section>
            ))}
            <section id="questions">
              <h2>{t.questions}</h2>
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

      {/* a next step for readers: the free check on the home page */}
      <section className="section" aria-labelledby="check-cta" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={styles.check} data-reveal>
            <span className="label">{t.checkLabel}</span>
            <h2 id="check-cta" className="display h2"><Rich text={t.checkTitle} /></h2>
            <p className="lede">{t.checkText}</p>
            <Link href="/#check" className="btn">{t.checkBtn}</Link>
          </div>
        </div>
      </section>

      <Join />
    </main>
  );
}
