import type { Metadata } from "next";
import Link from "@/components/ui/Lang";
import { postHref, postsOf, teamMember } from "@/lib/blog";
import { getLang } from "@/lib/lang";
import { langMeta, pageMeta, paramsLang } from "@/lib/meta";
import type { Lang } from "@/lib/i18n";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import Image from "next/image";
import { Media } from "@/components/ui/Media";
import { Join } from "@/components/sections/Join";
import { SITE_URL } from "@/lib/site";
import { ui } from "@/lib/ui";
import hub from "../guides/hub.module.css";
import styles from "./blog.module.css";

const T = {
  en: {
    title: "Blog: notes from the Elegix team",
    description: "Personal posts from the people building Elegix: how we work, what we try on ourselves and what we learned, in our own words.",
    h1: "Blog",
    tagline: "Notes from the team, in our own words",
    guides: "Looking for how-tos? Read the guides",
  },
  uk: {
    title: "Блог: нотатки команди Elegix",
    description: "Особисті тексти людей, які створюють Elegix: як ми працюємо, що пробуємо на собі і що з цього зрозуміли, нашими словами.",
    h1: "Блог",
    tagline: "Нотатки команди, нашими словами",
    guides: "Шукаєш практичні поради? Читай гайди",
  },
} satisfies Record<Lang, Record<string, string>>;

const formatDate = (iso: string, lang: Lang) =>
  new Intl.DateTimeFormat(lang === "uk" ? "uk-UA" : "en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  return pageMeta(lang, "/blog", { title: T[lang].title, description: T[lang].description });
}

/** The blog: personal posts, newest first. A black top with the newest post large (like the guides hub), then the rest. */
export default async function Blog() {
  const lang = await getLang();
  const t = T[lang];
  const u = ui(lang);
  const { POSTS } = postsOf(lang);
  const [first, ...rest] = POSTS;
  const byline = (p: (typeof POSTS)[number]) => `${teamMember(lang, p.person)?.name ?? ""} · ${formatDate(p.published, lang)} · ${u.minRead(p.minutes)}`;
  return (
    <main>
      <Breadcrumbs name={t.h1} path={langMeta(lang, "/blog").url} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        name: t.title,
        description: t.description,
        inLanguage: lang,
        url: `${SITE_URL}${langMeta(lang, "/blog").url}`,
        publisher: { "@id": `${SITE_URL}/#organization` },
        blogPost: POSTS.map((p) => ({ "@type": "BlogPosting", headline: p.title, datePublished: p.published, url: `${SITE_URL}${langMeta(lang, postHref(p)).url}` })),
      }} />
      <section className={`on-dark ${hub.top}`} data-theme="dark" aria-labelledby="blog-title">
        <div className="container">
          <div className={hub.topBar}>
            <h1 id="blog-title" className={hub.topTitle}>{t.h1}</h1>
            <p className={styles.tagline}>{t.tagline}</p>
          </div>
          {first && (
            <Link href={postHref(first)} className={hub.lead}>
              <span className={hub.leadText}>
                <span className={hub.kicker}>{byline(first)}</span>
                <h2 className={hub.leadTitle}>{first.title}</h2>
                <p>{first.description}</p>
                <span className={styles.read}>{u.readPost}</span>
              </span>
              <span className={hub.leadPhoto}>{first.media.src && <Image src={first.media.src} alt={first.media.alt} fill priority sizes="(max-width: 860px) 100vw, 50vw" style={first.media.position ? { objectPosition: first.media.position } : undefined} />}</span>
            </Link>
          )}
        </div>
      </section>

      <section className={`section ${styles.list}`} aria-label={t.h1}>
        <div className="container">
          {rest.length > 0 && (
            <ul className={styles.posts}>
              {rest.map((p) => (
                <li key={p.slug}>
                  <Link href={postHref(p)} className={styles.post}>
                    <Media media={{ ...p.media, ratio: "16 / 10" }} sizes="(max-width: 860px) 100vw, 50vw" />
                    <span className={styles.postText}>
                      <span className={hub.kicker}>{byline(p)}</span>
                      <h2>{p.title}</h2>
                      <p>{p.description}</p>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <p className={styles.guides}><Link href="/guides">{t.guides}</Link></p>
        </div>
      </section>

      <Join />
    </main>
  );
}
