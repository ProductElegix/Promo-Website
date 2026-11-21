import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/Lang";
import { areaGuideHref, areasOf, cardMeta, guideHref, guidesOf } from "@/lib/guides";
import { getLang } from "@/lib/lang";
import { langMeta, pageMeta, paramsLang } from "@/lib/meta";
import type { Lang } from "@/lib/i18n";
import { AreaTags } from "@/components/ui/AreaTags";
import type { AreaKey } from "@/lib/content";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import type { Card } from "@/components/ui/GuideCards";
import { GuideFilter } from "@/components/ui/GuideFilter";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { Join } from "@/components/sections/Join";
import { SITE_URL } from "@/lib/site";
import { LIFE_AREAS_HUB } from "@/lib/life-areas-hub";
import { LIFE_AREAS_HUB_UK } from "@/lib/uk/life-areas-hub";
import styles from "./hub.module.css";
import { RollText } from "@/components/ui/RollText";

const T = {
  en: {
    title: "Life balance guides: burnout, goals and balance",
    description: "Free guides from Elegix on the Wheel of Life, the signs of burnout, work-life balance, setting goals for every area of life and a 10-minute weekly review.",
    heroAlt: "A notebook, pen and laptop on a wooden desk",
    crumb: "Guides", eyebrow: "Guides", h1Prefix: "Life balance guides", h1: "Guides to a *balanced* life",
    lede: "Practical guides on the Wheel of Life, burnout, work-life balance and goals, plus a page for each of the 6 areas of life.",
    start: "Start reading", startHere: "Start here", readGuide: "Read the guide",
    areasLabel: "Life areas", areasTitle: "The 6 areas of a *balanced* life", questions: "Questions people ask", tools: "Free tools", howWe: "How we write and check our guides",
    checkLabel: "Free Life Balance Check", checkTitle: "Find your weakest area in *2 minutes*",
    checkText: "Rate your 6 life areas from 1 to 10. We'll email your Life Balance score and one first step for your lowest area.",
    checkBtn: "Take the free check",
    explainKicker: "Long read · 6 min", explainTitle: "Areas of life: what they are, and why 6 and not 8 or 12", explainText: "What counts as an area of life, the 6 areas in Elegix, how they compare with 8- and 12-area Wheel of Life models, and how to use them every week.",
    tabAll: "All guides", tabAreas: "Life areas", tabQuestions: "Questions", tabTools: "Free tools",
    subTitle: "Get new guides first", subText: "One email when a new guide is out, plus early access to Elegix. No spam, unsubscribe any time.", subBtn: "Subscribe", email: "Your email",
  },
  uk: {
    title: "Гайди про баланс життя: вигорання, цілі та баланс",
    description: "Безкоштовні гайди від Elegix про колесо життя, ознаки вигорання, баланс роботи та життя, цілі для кожної сфери життя й 10-хвилинний щотижневий огляд.",
    heroAlt: "Блокнот, ручка й ноутбук на дерев’яному столі",
    crumb: "Гайди", eyebrow: "Гайди", h1Prefix: "Гайди про баланс життя", h1: "Гайди до *збалансованого* життя",
    lede: "Практичні гайди про колесо життя, вигорання, баланс роботи та життя й цілі, а також сторінка для кожної з 6 сфер життя.",
    start: "Почати читати", startHere: "Почни звідси", readGuide: "Читати гайд",
    areasLabel: "Сфери життя", areasTitle: "6 сфер *збалансованого* життя", questions: "Питання, які ставлять люди", tools: "Безкоштовні інструменти", howWe: "Як ми пишемо й перевіряємо гайди",
    checkLabel: "Безкоштовна перевірка балансу", checkTitle: "Знайди свою найслабшу сферу за *2 хвилини*",
    checkText: "Оціни 6 сфер життя від 1 до 10. Ми надішлемо на пошту твою оцінку балансу життя й перший крок для найнижчої сфери.",
    checkBtn: "Пройти безкоштовну перевірку",
    explainKicker: "Довге читання · 6 хв", explainTitle: "Сфери життя: що це таке і чому 6, а не 8 чи 12", explainText: "Що вважати сферою життя, 6 сфер в Elegix, як вони співвідносяться з моделями колеса життя на 8 і 12 сфер і як користуватися ними щотижня.",
    tabAll: "Усі гайди", tabAreas: "Сфери життя", tabQuestions: "Питання", tabTools: "Безкоштовні інструменти",
    subTitle: "Отримуй нові гайди першим", subText: "Один лист, коли виходить новий гайд, і ранній доступ до Elegix. Без спаму, відписатися можна будь-коли.", subBtn: "Підписатися", email: "Твій email",
  },
} satisfies Record<Lang, Record<string, string>>;

/** "October 22, 2026" / "22 жовтня 2026 р." */
const formatDate = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(lang === "uk" ? "uk-UA" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  const m = pageMeta(lang, "/guides", { title: T[lang].title, description: T[lang].description });
  return { ...m, alternates: { ...m.alternates, types: { "application/rss+xml": [{ url: "/guides/feed.xml", title: "Elegix guides" }] } } };
}

/** Hub for every guide and life area page, so each one is two clicks from the home page, laid out like a magazine:
 *  a black top with the section tabs and the "start here" guide large, then the guide list with a sidebar (topics, life areas, sign-up). */
export default async function Guides() {
  const lang = await getLang();
  const t = T[lang];
  const { GUIDES, AREA_GUIDES } = guidesOf(lang);
  const [first] = GUIDES;
  const areaCards: Card[] = AREA_GUIDES.map((g) => ({ href: guideHref(g), title: g.title, text: g.description, media: g.media, meta: cardMeta(g, lang), areas: areasOf(g) }));
  // the list: newest first (the hub order breaks ties)
  const recent = GUIDES.map((g, i) => ({ g, i })).sort((a, b) => b.g.published.localeCompare(a.g.published) || a.i - b.i).map(({ g }) => g);
  const tabs = [
    { href: "#library", label: t.tabAll },
  ];
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
      {/* black top: the page title and section tabs, then the "start here" guide large */}
      <section className={`on-dark ${styles.top}`} data-theme="dark" aria-labelledby="guides-title">
        <div className="container">
          <div className={styles.topBar}>
            <h1 id="guides-title" className={styles.topTitle}>{t.h1Prefix}</h1>
            <nav className={styles.tabs} aria-label={t.crumb}>
              {tabs.map((x) => <a key={x.href} href={x.href}>{x.label}</a>)}
              <Link href="/guides/areas-of-life">{t.tabAreas}</Link>
              <Link href="/tools">{t.tabTools}</Link>
            </nav>
          </div>
          <Link href={`/guides/${first.slug}`} className={styles.lead}>
            <span className={styles.leadText}>
              <span className={styles.kicker}>{t.startHere} · {formatDate(first.published, lang)}</span>
              <h2 className={styles.leadTitle}>{first.title}</h2>
              <p>{first.description}</p>
              <AreaTags areas={first.areas} />
            </span>
            <span className={styles.leadPhoto}>{first.media.src && <Image src={first.media.src} alt={first.media.alt} fill priority sizes="(max-width: 860px) 100vw, 50vw" />}</span>
          </Link>
        </div>
      </section>

      <section id="library" className={`section ${styles.librarySection}`} aria-label={t.crumb}>
        <div className="container">
          <GuideFilter
            guides={recent.map((g) => ({ href: guideHref(g), title: g.title, text: g.description, media: g.media, meta: cardMeta(g, lang), date: formatDate(g.published, lang), areas: areasOf(g) }))}
            areaPages={Object.fromEntries(AREA_GUIDES.map((g, i) => [g.area, areaCards[i]])) as Partial<Record<AreaKey, Card>>}
            subscribe={<>
              <h2 className={styles.subTitle}>{t.subTitle}</h2>
              <p>{t.subText}</p>
              <WaitlistForm source="guides" variant="underline" placeholder={t.email} buttonLabel={t.subBtn} />
            </>} />
          <p className={styles.policy}><Link href="/tools">{t.tools}</Link> · <Link href="/guides/how-we-write-guides">{t.howWe}</Link> · <a href="/guides/feed.xml">RSS</a></p>
        </div>
      </section>

      {/* the 6 areas, explained: a short teaser for the long read on its own page */}
      <section id="areas" className={`section ${styles.areasSection}`} aria-labelledby="areas-title">
        <div className="container">
          <div className={styles.colHead}>
            <h2 id="areas-title" className={styles.colTitle}>{t.areasLabel}</h2>
          </div>
          <Link href="/guides/areas-of-life" className={styles.explainCard}>
            <span className={styles.explainText}>
              <span className={styles.kicker}>{t.explainKicker}</span>
              <span className={styles.explainTitle}>{t.explainTitle}</span>
              <span className={styles.explainLede}>{t.explainText}</span>
            </span>
            <ol className={styles.explainList}>
              {HUB.sections.map((s) => <li key={s.h2}>{s.h2}</li>)}
            </ol>
          </Link>
        </div>
      </section>

      {/* a next step for readers: the free check on the home page, as a black band like the top of the page */}
      <section className={`on-dark ${styles.check}`} data-theme="dark" aria-labelledby="check-cta">
        <div className={`container ${styles.checkInner}`}>
          <div className={styles.checkText}>
            <span className={styles.kicker}>{t.checkLabel}</span>
            <h2 id="check-cta" className={styles.checkTitle}><Rich text={t.checkTitle} /></h2>
            <p>{t.checkText}</p>
          </div>
          <Link href="/#check" className="btn lime"><RollText>{t.checkBtn}</RollText></Link>
        </div>
      </section>

      <Join />
    </main>
  );
}
