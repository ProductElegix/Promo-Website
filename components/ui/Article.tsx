import { Fragment, type ReactNode } from "react";
import Link from "@/components/ui/Lang";
import type { Metadata } from "next";
import Image from "next/image";
import type { AreaKey, MediaSlot } from "@/lib/content";
import { hasUk, sourcesOf, type Block, type Guide } from "@/lib/guides";
import type { Author } from "@/lib/stories";
import { TAKEAWAYS } from "@/lib/guide-takeaways";
import { UK_TAKEAWAYS } from "@/lib/uk/guide-takeaways";
import { contentOf } from "@/lib/l10n";
import { getLang } from "@/lib/lang";
import { langMeta } from "@/lib/meta";
import { ui } from "@/lib/ui";
import type { Lang } from "@/lib/i18n";
import { authorHref } from "@/lib/authors";
import { OG_IMAGE, SITE_URL, founderPerson } from "@/lib/site";
import { Breadcrumbs, JsonLd } from "./JsonLd";
import { Inline, plainText } from "./Inline";
import { Media } from "./Media";
import { AreaTags } from "./AreaTags";
import { Rich } from "./Rich";
import { Toc } from "./Toc";
import { ArticleActions } from "./ArticleActions";
import { GuideAnalytics } from "./GuideAnalytics";
import { WaitlistForm } from "./WaitlistForm";
import { SHOW_DRAFTS } from "@/lib/drafts";
import styles from "./Article.module.css";
import { RollText } from "@/components/ui/RollText";

type Parent = { name: string; path: string };
type Props = {
  guide: Omit<Guide, "related" | "areas"> & { area?: AreaKey; intro?: Block[] };
  path: string;
  parent: Parent;
  related: { href: string; label: string; title: string; media?: MediaSlot; areas?: AreaKey[] }[];
  /** guides: the life areas it is about (empty: all 6), shown as tags over the title */
  areas?: AreaKey[];
  /** who wrote it; defaults to the founder (guides). Personal stories pass their own person. */
  author?: Author;
  /** heading of the table of contents */
  tocTitle?: string;
  /** other people's stories, shown above "Keep reading" */
  stories?: Props["related"];
  /** waitlist source tag, e.g. "story:why-i-built-elegix" (defaults to "guide:<slug>") */
  source?: string;
  /** guides and life area pages: a waitlist form after the second section and an app card under the contents */
  promote?: boolean;
  /** headline of the waitlist box after the second section */
  midTitle?: string;
  /** more rows of cards above "Keep reading", e.g. the guides about a life area */
  lists?: { id: string; title: string; items: Props["related"] }[];
  /** life area pages: the guides about this area, right under the header, so the page is the home of its area */
  hub?: ReactNode;
  /** blog posts: comments from the team, after the last section and before the author card */
  comments?: ReactNode;
  /** blog posts: the comments' heading as one more line of the table of contents */
  commentsToc?: { id: string; label: string };
  /** blog posts: "Was this helpful?" and share buttons at the end, like the guides */
  share?: boolean;
};

/** How the guides are written and checked, linked from every guide's byline and author box. */
export const EDITORIAL_PATH = "/guides/how-we-write-guides";

/** The founder as an article author, used by every guide. */
export function founderAuthor(lang: Lang): Author {
  const { TRUST } = contentOf(lang);
  return {
    name: TRUST.founder.name,
    role: ui(lang).founderOfElegix,
    photo: TRUST.founder.media.src,
    bio: TRUST.founder.experience,
    linkedin: TRUST.founder.profiles[0],
  };
}

/** Metadata for a guide or life area page: its own title, canonical URL and article share card. */
/** `ownImage`: the route has its own opengraph-image (guides, life areas), so the share card comes from there. */
export function articleMetadata(g: Omit<Guide, "related" | "areas">, path: string, ownImage = false, lang: Lang = "en"): Metadata {
  const lm = langMeta(lang, path);
  const photo = g.media.src ? [{ url: g.media.src, alt: g.media.alt }, OG_IMAGE] : [OG_IMAGE];
  return {
    title: g.metaTitle,
    description: g.description,
    ...(lm.robots ? { robots: lm.robots } : {}),
    alternates: { ...lm.alternates, types: { "application/rss+xml": [{ url: "/guides/feed.xml", title: "Elegix guides" }] } },
    openGraph: {
      title: g.metaTitle, description: g.description, url: lm.url, siteName: "Elegix", type: "article", locale: lm.locale,
      publishedTime: g.published, modifiedTime: g.updated, authors: [contentOf(lang).TRUST.founder.name],
      ...(ownImage ? {} : { images: photo }),
    },
    twitter: { card: "summary_large_image", title: g.metaTitle, description: g.description, ...(ownImage ? {} : { images: g.media.src ? [g.media.src] : [OG_IMAGE] }) },
  };
}

export function BlockView({ b }: { b: Block }) {
  if ("list" in b) return <ul className={styles.list}>{b.list.map((t) => <li key={t}><Inline text={t} /></li>)}</ul>;
  if ("steps" in b) {
    return (
      <ol className={styles.steps}>
        {b.steps.map((s, i) => (
          <li key={s.title}>
            <span className={styles.n} aria-hidden="true">{i + 1}</span>
            <div><h3>{s.title}</h3><p><Inline text={s.text} /></p></div>
          </li>
        ))}
      </ol>
    );
  }
  if ("tip" in b) return <p className={styles.tip}><Inline text={b.tip} /></p>;
  if ("todo" in b) return SHOW_DRAFTS ? <p className={styles.todo}><strong>TODO</strong> {b.todo}</p> : null;
  return <p><Inline text={b.p} /></p>;
}

/** Anchor id for a section heading, e.g. "How to read your wheel" → "how-to-read-your-wheel". */
const anchor = (h: string) => h.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "");

const dateIn = (lang: Lang) => (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString(lang === "uk" ? "uk-UA" : "en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** A long-form page: breadcrumbs, h1, photo, sections, FAQ, related reading and the waitlist. */
export async function Article({ guide: g, path: plainPath, parent, related, author: ownAuthor, tocTitle: ownToc, source, stories, promote = false, midTitle: ownMid, lists = [], areas, hub, comments, commentsToc, share = false }: Props) {
  const lang = await getLang();
  const t = ui(lang);
  const date = dateIn(lang);
  const { TRUST } = contentOf(lang);
  const author = ownAuthor ?? founderAuthor(lang);
  const tocTitle = ownToc ?? t.inThisGuide;
  const midTitle = ownMid ?? t.trackAllSix;
  const path = langMeta(lang, plainPath).url;
  const url = `${SITE_URL}${path}`;
  const isFounder = author.name === TRUST.founder.name;
  const takeaways = lang === "uk" ? (hasUk(g.slug) ? UK_TAKEAWAYS[g.slug] : TAKEAWAYS[g.slug]) : TAKEAWAYS[g.slug];
  const storyLink = TRUST.founder.storyLink.href !== plainPath ? TRUST.founder.storyLink : null;
  const sources = sourcesOf(g);
  const toc = [
    ...g.sections.map((s) => ({ id: anchor(s.h2), label: s.h2 })),
    ...(commentsToc ? [commentsToc] : []),
    ...(g.faq ? [{ id: "questions", label: t.questionsPeopleAsk }] : []),
    ...(sources.length ? [{ id: "sources", label: t.sources }] : []),
  ];
  const midAfter = promote && g.sections.length >= 4 ? 1 : -1;
  const waitlistSource = (source ?? `guide:${g.slug}`).slice(0, 32);
  return (
    <main>
      <Breadcrumbs name={g.title} path={path} parents={[{ ...parent, path: langMeta(lang, parent.path).url }]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: g.title,
        description: g.description,
        image: g.media.src ? [`${SITE_URL}${g.media.src}`] : [`${SITE_URL}${OG_IMAGE.url}`],
        datePublished: g.published,
        dateModified: g.updated,
        author: isFounder ? founderPerson(contentOf("en").TRUST.founder) : { "@type": "Person", name: author.name, jobTitle: author.role, ...(author.linkedin ? { sameAs: [author.linkedin] } : {}) },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: url,
        inLanguage: lang,
        ...(sources.length ? { citation: sources.map((s) => s.url) } : {}),
        ...(g.area ? { about: { "@type": "Thing", name: g.label.replace(/^(Life area|Сфера життя) · /, "") } } : {}),
      }} />
      {g.reviewer && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          url,
          lastReviewed: g.updated,
          reviewedBy: { "@type": "Person", name: g.reviewer.name, description: g.reviewer.credentials, ...(g.reviewer.url ? { sameAs: [g.reviewer.url] } : {}) },
        }} />
      )}
      {g.faq && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
        }} />
      )}

      {promote && <GuideAnalytics slug={g.slug} bodyId="article-body" />}
      <article className={`section ${styles.article}`} aria-labelledby="article-title">
        <header className={`container ${styles.head}`}>
          <nav aria-label={t.breadcrumb} className={styles.crumbs}>
            <Link href="/">Elegix</Link><span aria-hidden="true">/</span><Link href={parent.path}>{parent.name}</Link>
          </nav>
          <div className={styles.kind}>
            <span className="label">{g.area ? t.lifeArea : g.label}</span>
            {(g.area || areas) && <AreaTags areas={g.area ? [g.area] : areas!} link={!g.area} />}
          </div>
          <h1 id="article-title" className={`display ${styles.title}`}>{g.title}</h1>
          <p className={styles.lede}>{g.lede}</p>
          <p className={styles.meta}>
            {author.photo && <Image src={author.photo} alt="" width={32} height={32} className={styles.metaPhoto} />}
            <span>{t.by} <Link href={authorHref(author.name)} rel="author">{author.name}</Link>, {author.role} · {t.updated} <time dateTime={g.updated}>{date(g.updated)}</time> · {t.minRead(g.minutes)}</span>
          </p>
          {(g.reviewer || (promote && sources.length > 0)) && (
            <p className={styles.trust}>
              {g.reviewer && <span>{t.reviewedBy} {g.reviewer.url ? <a href={g.reviewer.url} target="_blank" rel="noopener">{g.reviewer.name}</a> : g.reviewer.name}, {g.reviewer.credentials}</span>}
              {promote && sources.length > 0 && <a href="#sources">{t.nSources(sources.length)}</a>}
              {promote && <Link href={EDITORIAL_PATH}>{t.howWeWrite}</Link>}
            </p>
          )}
        </header>

        {hub}

        <div className={`container ${styles.photo}`}>
          <Media media={g.media} priority sizes="(max-width: 1100px) 100vw, 1100px" />
        </div>

        <div className={`container ${styles.layout}`}>
          <aside className={styles.side} aria-label={tocTitle}>
            <Toc title={tocTitle} items={toc} bodyId="article-body" />
            {promote && (
              <div className={styles.sideCta}>
                <p className={styles.sideCtaTitle}>{t.sideCtaTitle}</p>
                <p>{t.sideCtaText}</p>
                <a href="#join" className="btn lime" data-cta="side"><RollText>{t.getEarlyAccess}</RollText></a>
              </div>
            )}
          </aside>
          <div id="article-body" className={styles.body}>
          {takeaways && (
            <section className={styles.takeaways} aria-labelledby="takeaways-title">
              <h2 id="takeaways-title">{t.keyTakeaways}</h2>
              <ul className={styles.list}>{takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
            </section>
          )}
          {g.intro?.map((b, i) => <BlockView key={`intro-${i}`} b={b} />)}
          {g.sections.map((s, si) => (
            <Fragment key={s.h2}>
              <section id={anchor(s.h2)}>
                <h2>{s.h2}<a href={`#${anchor(s.h2)}`} className={styles.anchor} aria-label={t.linkTo(s.h2)}>#</a></h2>
                {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
              </section>
              {si === midAfter && (
                <aside className={`on-dark ${styles.midCta}`} aria-labelledby="mid-cta-title">
                  <div>
                    <p id="mid-cta-title" className={styles.midCtaTitle}>{midTitle}</p>
                    <p className={styles.midCtaText}>{t.midCtaText}</p>
                  </div>
                  <div className={styles.midForm}><WaitlistForm source={`mid:${g.slug}`.slice(0, 32)} variant="glass" placeholder={t.yourEmail} buttonLabel={t.join} /></div>
                </aside>
              )}
            </Fragment>
          ))}

          {g.faq && (
            <section id="questions">
              <h2>{t.questionsPeopleAsk}</h2>
              <div className={styles.faq}>
                {g.faq.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}<span className={styles.plus} aria-hidden="true" /></summary>
                    <p><Inline text={f.a} /></p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {sources.length > 0 && (
            <section id="sources" className={styles.sources}>
              <h2>{t.sources}</h2>
              <ol>
                {sources.map((src) => (
                  <li key={src.url}><a href={src.url} target="_blank" rel="noopener">{src.label}</a> <span className={styles.domain}>{new URL(src.url).hostname.replace(/^www\./, "")}</span></li>
                ))}
              </ol>
              {g.changes && g.changes.length > 0 && (
                <>
                  <h3 className={styles.changesTitle}>{t.whatChanged}</h3>
                  <ul className={styles.changes}>
                    {g.changes.map((c) => <li key={c.date + c.text}><time dateTime={c.date}>{date(c.date)}</time>: {c.text}</li>)}
                  </ul>
                </>
              )}
              {promote && <p className={styles.disclaimer}>{t.disclaimer} {t.read} <Link href={EDITORIAL_PATH}>{t.howWeWriteAndCheck}</Link>.</p>}
            </section>
          )}

          {comments}

          {(promote || share) && <ArticleActions slug={g.slug} title={g.title} url={url} kind={promote ? "guide" : "post"} />}

          <div className={styles.authorBlock}>
          <aside className={styles.author} aria-label={t.aboutAuthor}>
            {author.photo && <div className={styles.authorPhoto}><Image src={author.photo} alt={author.name} fill sizes="96px" /></div>}
            <div>
              <p className={styles.authorName}>{author.name}</p>
              <p className={styles.authorRole}>{author.role}</p>
              <p className={styles.authorBio}>{author.bio}</p>
              {isFounder && storyLink && <Link href={storyLink.href} className={styles.authorLink} style={{ marginRight: 20 }}>{storyLink.label}</Link>}
              {author.linkedin && <a href={author.linkedin} target="_blank" rel="noopener me" className={styles.authorLink}>LinkedIn</a>}
            </div>
          </aside>
          <Link href={authorHref(author.name)} className={`btn ghost ${styles.authorAll}`}><RollText>{t.readAllBy(author.name.split(" ")[0])}</RollText></Link>
          </div>
          </div>
        </div>
      </article>

      <section id="join" className={`section ${styles.ctaSection}`} aria-labelledby="cta-title">
        <div className="container">
          <div className={`on-dark grain ${styles.cta}`}>
            <h2 id="cta-title" className="display h2"><Rich text={g.cta.title} /></h2>
            <p className="lede">{g.cta.text}</p>
            <div className={styles.ctaForm}><WaitlistForm source={waitlistSource} variant="glass" placeholder={t.yourEmail} buttonLabel={t.getEarlyAccess} /></div>
          </div>
        </div>
      </section>

      {stories && stories.length > 0 && <ReadingList id="stories-title" title={stories.length > 1 ? t.otherStories : t.anotherStory} items={stories} />}
      {lists.filter((l) => l.items.length > 0).map((l) => <ReadingList key={l.id} id={l.id} title={l.title} items={l.items} />)}
      {related.length > 0 && <ReadingList id="related-title" title={t.keepReading} items={related} />}
    </main>
  );
}

type ReadingItem = Props["related"][number];

/** A row of cards linking other pages, at the end of an article. */
function ReadingList({ id, title, items }: { id: string; title: string; items: ReadingItem[] }) {
  return (
    <nav className={`section ${styles.relatedSection}`} aria-labelledby={id}>
      <div className="container">
        <h2 id={id} className={styles.relatedTitle}>{title}</h2>
        <ul className={styles.related}>
          {items.map((r) => (
            <li key={r.href}>
              <Link href={r.href}>
                {r.media?.src && <span className={styles.relatedPhoto}><Image src={r.media.src} alt="" fill sizes="(max-width: 860px) 100vw, 33vw" style={r.media.position ? { objectPosition: r.media.position } : undefined} /></span>}
                <span className={styles.relatedText}>{r.areas && <AreaTags areas={r.areas} />}<span>{r.title}</span><span className={styles.relatedLabel}>{r.label}</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
