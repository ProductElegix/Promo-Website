import type { Metadata } from "next";
import Link from "@/components/ui/Lang";
import type { GuideToolName } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";
import type { Lang } from "@/lib/i18n";
import { langMeta, pageMeta, paramsLang } from "@/lib/meta";
import { getLang } from "@/lib/lang";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import { GuideTool } from "@/components/ui/GuideTool";
import { Join } from "@/components/sections/Join";
import styles from "@/components/ui/Article.module.css";

type Tool = { id: string; name: GuideToolName; h2: string; text: string; guide: { href: string; label: string } };

/** Every interactive tool from the guides on one page, each with a link to the guide that explains it. */
const PAGE: Record<Lang, { title: string; description: string; crumb: string; guides: string; label: string; h1: string; lede: [string, string, string]; tools: Tool[] }> = {
  en: {
    title: "Free life balance tools",
    description: "Free tools to check your life balance: a Wheel of Life calculator and printable template, a 12-sign burnout check and a calculator for your free hours.",
    crumb: "Tools",
    guides: "Guides",
    label: "Free tools",
    h1: "Free tools to check your life balance",
    lede: ["Quick, private check-ins you can do in a few minutes. Nothing you enter here is sent anywhere: the numbers stay in your browser. For a score by email, take the free ", "Life Balance Check", "."],
    tools: [
      { id: "wheel-calculator", name: "wheel-calculator", h2: "Wheel of Life calculator", text: "Score your 6 life areas from 1 to 10 and watch the shape of your wheel draw itself.", guide: { href: "/guides/wheel-of-life", label: "How to read your wheel" } },
      { id: "burnout-check", name: "burnout-check", h2: "Burnout self-check", text: "Tick the warning signs you recognise from the last month. It's a check-in, not a diagnosis.", guide: { href: "/guides/signs-of-burnout", label: "12 signs of burnout, explained" } },
      { id: "hours-calculator", name: "hours-calculator", h2: "Free hours calculator", text: "See how many hours a week you really have left after work, sleep and the basics.", guide: { href: "/guides/work-life-balance", label: "How to improve work-life balance" } },
      { id: "wheel-template", name: "wheel-template", h2: "Printable Wheel of Life template", text: "Prefer paper? Print the blank wheel and fill it in with a pen.", guide: { href: "/guides/wheel-of-life", label: "How to fill in the Wheel of Life" } },
    ],
  },
  uk: {
    title: "Безкоштовні інструменти для балансу життя",
    description: "Безкоштовні інструменти, щоб перевірити баланс життя: калькулятор колеса життя й шаблон для друку, перевірка на 12 ознак вигорання й калькулятор вільних годин.",
    crumb: "Інструменти",
    guides: "Гайди",
    label: "Безкоштовні інструменти",
    h1: "Безкоштовні інструменти, щоб перевірити баланс життя",
    lede: ["Швидкі приватні перевірки на кілька хвилин. Нічого з того, що ти вводиш, нікуди не надсилається: цифри лишаються у твоєму браузері. Щоб отримати оцінку на пошту, пройди безкоштовну ", "перевірку балансу життя", "."],
    tools: [
      { id: "wheel-calculator", name: "wheel-calculator", h2: "Калькулятор колеса життя", text: "Оціни свої 6 сфер життя від 1 до 10 і подивись, як малюється форма твого колеса.", guide: { href: "/guides/wheel-of-life", label: "Як читати своє колесо" } },
      { id: "burnout-check", name: "burnout-check", h2: "Самоперевірка на вигорання", text: "Познач тривожні ознаки, які впізнаєш за останній місяць. Це перевірка, а не діагноз.", guide: { href: "/guides/signs-of-burnout", label: "12 ознак вигорання з поясненнями" } },
      { id: "hours-calculator", name: "hours-calculator", h2: "Калькулятор вільних годин", text: "Подивись, скільки годин на тиждень у тебе справді лишається після роботи, сну й базових справ.", guide: { href: "/guides/work-life-balance", label: "Як покращити баланс роботи й життя" } },
      { id: "wheel-template", name: "wheel-template", h2: "Шаблон колеса життя для друку", text: "Любиш папір? Роздрукуй порожнє колесо й заповни його ручкою.", guide: { href: "/guides/wheel-of-life", label: "Як заповнити колесо життя" } },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  return pageMeta(lang, "/tools", { title: PAGE[lang].title, description: PAGE[lang].description });
}

export default async function Tools() {
  const lang = await getLang();
  const T = PAGE[lang];
  const url = `${SITE_URL}${langMeta(lang, "/tools").url}`;
  return (
    <main>
      <Breadcrumbs name={T.crumb} path={langMeta(lang, "/tools").url} parents={[{ name: T.guides, path: langMeta(lang, "/guides").url }]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: T.title,
        description: T.description,
        url,
        inLanguage: lang,
        mainEntity: { "@type": "ItemList", itemListElement: T.tools.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.h2, url: `${url}#${t.id}` })) },
      }} />
      <article className={`section ${styles.article}`} aria-labelledby="article-title">
        <header className={`container ${styles.head}`}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Elegix</Link><span aria-hidden="true">/</span><Link href="/guides">{T.guides}</Link>
          </nav>
          <span className="label">{T.label}</span>
          <h1 id="article-title" className={`display ${styles.title}`}>{T.h1}</h1>
          <p className={styles.lede}>{T.lede[0]}<Link href="/#check">{T.lede[1]}</Link>{T.lede[2]}</p>
        </header>
        <div className={`container ${styles.head}`} style={{ marginTop: "clamp(32px, 5vw, 56px)", display: "block" }}>
          <div className={styles.body}>
            {T.tools.map((t) => (
              <section key={t.id} id={t.id}>
                <h2>{t.h2}</h2>
                <p>{t.text}</p>
                <div data-tool={t.name}><GuideTool name={t.name} /></div>
                <p><Link href={t.guide.href}>{t.guide.label}</Link></p>
              </section>
            ))}
          </div>
        </div>
      </article>
      <Join />
    </main>
  );
}
