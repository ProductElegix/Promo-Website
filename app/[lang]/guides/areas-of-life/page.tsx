import type { Metadata } from "next";
import Link from "@/components/ui/Lang";
import { getLang } from "@/lib/lang";
import { langMeta, pageMeta, paramsLang } from "@/lib/meta";
import { ui } from "@/lib/ui";
import type { Lang } from "@/lib/i18n";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import { BlockView } from "@/components/ui/Article";
import { Inline, plainText } from "@/components/ui/Inline";
import { LIFE_AREAS_HUB } from "@/lib/life-areas-hub";
import { LIFE_AREAS_HUB_UK } from "@/lib/uk/life-areas-hub";
import styles from "@/components/ui/Article.module.css";

const AREAS_OF_LIFE_PATH = "/guides/areas-of-life";

const T = {
  en: {
    title: "Areas of life: what they are, and why 6 and not 8 or 12",
    description: "What the areas of life are, the 6 areas Elegix uses, how they compare with 8- and 12-area Wheel of Life models, and how to use them every week.",
    label: "Life areas",
    lede: "Areas of life are the big parts that together make up your whole life. Here is what they are, why we use 6, and how to use them every week.",
    questions: "Questions people ask",
    back: "Back to all guides",
  },
  uk: {
    title: "Сфери життя: що це таке і чому 6, а не 8 чи 12",
    description: "Що таке сфери життя, які 6 сфер використовує Elegix, як вони співвідносяться з моделями колеса життя на 8 і 12 сфер і як користуватися ними щотижня.",
    label: "Сфери життя",
    lede: "Сфери життя — це великі частини, з яких разом складається все твоє життя. Ось що це таке, чому ми використовуємо 6 і як працювати з ними щотижня.",
    questions: "Питання, які ставлять люди",
    back: "До всіх гайдів",
  },
} satisfies Record<Lang, Record<string, string>>;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  return pageMeta(lang, AREAS_OF_LIFE_PATH, { title: T[lang].title, description: T[lang].description });
}

/** What the areas of life are: the long read that used to sit at the bottom of /guides (and before that on /life-areas). */
export default async function AreasOfLife() {
  const lang = await getLang();
  const t = T[lang];
  const u = ui(lang);
  const HUB = lang === "uk" ? LIFE_AREAS_HUB_UK : LIFE_AREAS_HUB;
  return (
    <main>
      <Breadcrumbs name={t.label} path={langMeta(lang, AREAS_OF_LIFE_PATH).url} parents={[{ name: u.guides, path: langMeta(lang, "/guides").url }]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: HUB.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
      }} />
      <article className={`section ${styles.article}`} aria-labelledby="article-title">
        <header className={`container ${styles.head}`}>
          <nav aria-label={u.breadcrumb} className={styles.crumbs}>
            <Link href="/">Elegix</Link><span aria-hidden="true">/</span><Link href="/guides">{u.guides}</Link>
          </nav>
          <span className="label">{t.label}</span>
          <h1 id="article-title" className={`display ${styles.title}`}>{t.title}</h1>
          <p className={styles.lede}>{t.lede}</p>
        </header>
        <div className={`container ${styles.head}`} style={{ marginTop: "clamp(32px, 5vw, 56px)", display: "block" }}>
          <div className={styles.body}>
            {HUB.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
              </section>
            ))}
            <section id="questions">
              <h2>{t.questions}</h2>
              <div className={styles.faq}>
                {HUB.faq.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}<span className={styles.plus} aria-hidden="true" /></summary>
                    <p><Inline text={f.a} /></p>
                  </details>
                ))}
              </div>
            </section>
            <p><Link href="/guides">{t.back}</Link></p>
          </div>
        </div>
      </article>
    </main>
  );
}
