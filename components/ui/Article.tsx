import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { TRUST, type AreaKey, type MediaSlot } from "@/lib/content";
import type { Block, Guide } from "@/lib/guides";
import type { Author } from "@/lib/stories";
import { TAKEAWAYS } from "@/lib/guide-takeaways";
import { OG_IMAGE, SITE_URL, founderPerson } from "@/lib/site";
import { Breadcrumbs, JsonLd } from "./JsonLd";
import { GuideTool } from "./GuideTool";
import { Inline } from "./Inline";
import { Media } from "./Media";
import { Pill } from "./Pill";
import { Rich } from "./Rich";
import { WaitlistForm } from "./WaitlistForm";
import styles from "./Article.module.css";

type Parent = { name: string; path: string };
type Props = {
  guide: Omit<Guide, "related"> & { area?: AreaKey; intro?: Block[] };
  path: string;
  parent: Parent;
  related: { href: string; label: string; title: string; media?: MediaSlot }[];
  /** who wrote it; defaults to the founder (guides). Personal stories pass their own person. */
  author?: Author;
  /** heading of the table of contents */
  tocTitle?: string;
  /** other people's stories, shown above "Keep reading" */
  stories?: Props["related"];
  /** waitlist source tag, e.g. "story:why-i-built-elegix" (defaults to "guide:<slug>") */
  source?: string;
};

/** The founder as an article author, used by every guide. */
const FOUNDER_AUTHOR: Author = {
  name: TRUST.founder.name,
  role: "Founder of Elegix",
  photo: TRUST.founder.media.src,
  bio: TRUST.founder.experience,
  linkedin: TRUST.founder.profiles[0],
};

/** Metadata for a guide or life area page: its own title, canonical URL and article share card. */
export function articleMetadata(g: Omit<Guide, "related">, path: string): Metadata {
  return {
    title: g.metaTitle,
    description: g.description,
    alternates: { canonical: path },
    openGraph: {
      title: g.metaTitle, description: g.description, url: path, siteName: "Elegix", type: "article", locale: "en_US",
      publishedTime: g.published, modifiedTime: g.updated, authors: [TRUST.founder.name],
      images: g.media.src ? [{ url: g.media.src, alt: g.media.alt }, OG_IMAGE] : [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: g.metaTitle, description: g.description, images: g.media.src ? [g.media.src] : [OG_IMAGE] },
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
  if ("tool" in b) return <GuideTool name={b.tool} />;
  return <p><Inline text={b.p} /></p>;
}

/** Anchor id for a section heading, e.g. "How to read your wheel" → "how-to-read-your-wheel". */
const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const date = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** A long-form page: breadcrumbs, h1, photo, sections, FAQ, related reading and the waitlist. */
export function Article({ guide: g, path, parent, related, author = FOUNDER_AUTHOR, tocTitle = "In this guide", source, stories }: Props) {
  const url = `${SITE_URL}${path}`;
  const isFounder = author.name === TRUST.founder.name;
  const storyLink = TRUST.founder.storyLink.href !== path ? TRUST.founder.storyLink : null;
  return (
    <main>
      <Breadcrumbs name={g.title} path={path} parents={[parent]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: g.title,
        description: g.description,
        image: g.media.src ? [`${SITE_URL}${g.media.src}`] : [`${SITE_URL}${OG_IMAGE.url}`],
        datePublished: g.published,
        dateModified: g.updated,
        author: isFounder ? founderPerson(TRUST.founder) : { "@type": "Person", name: author.name, jobTitle: author.role, ...(author.linkedin ? { sameAs: [author.linkedin] } : {}) },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: url,
        ...(g.area ? { about: { "@type": "Thing", name: g.label.replace(/^Life area · /, "") } } : {}),
      }} />
      {g.faq && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }} />
      )}

      <article className={`section ${styles.article}`} aria-labelledby="article-title">
        <header className={`container ${styles.head}`}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Elegix</Link><span aria-hidden="true">/</span><Link href={parent.path}>{parent.name}</Link>
          </nav>
          {g.area ? <Pill area={g.area} strong /> : <span className="label">{g.label}</span>}
          <h1 id="article-title" className={`display ${styles.title}`}>{g.title}</h1>
          <p className={styles.lede}>{g.lede}</p>
          <p className={styles.meta}>
            {author.photo && <Image src={author.photo} alt="" width={32} height={32} className={styles.metaPhoto} />}
            <span>By <Link href={isFounder ? "/about#story" : "/about#team"}>{author.name}</Link>, {author.role} · Updated <time dateTime={g.updated}>{date(g.updated)}</time> · {g.minutes} min read</span>
          </p>
        </header>

        <div className={`container ${styles.photo}`}>
          <Media media={g.media} priority sizes="(max-width: 1100px) 100vw, 1100px" />
        </div>

        <div className={`container ${styles.layout}`}>
          <nav className={styles.toc} aria-labelledby="toc-title">
            <p id="toc-title" className={styles.tocTitle}>{tocTitle}</p>
            <ol>
              {g.sections.map((s) => <li key={s.h2}><a href={`#${anchor(s.h2)}`}>{s.h2}</a></li>)}
              {g.faq && <li><a href="#questions">Questions people ask</a></li>}
            </ol>
          </nav>
          <div className={styles.body}>
          {TAKEAWAYS[g.slug] && (
            <section className={styles.takeaways} aria-labelledby="takeaways-title">
              <h2 id="takeaways-title">Key takeaways</h2>
              <ul className={styles.list}>{TAKEAWAYS[g.slug].map((t) => <li key={t}>{t}</li>)}</ul>
            </section>
          )}
          {g.intro?.map((b, i) => <BlockView key={`intro-${i}`} b={b} />)}
          {g.sections.map((s) => (
            <section key={s.h2} id={anchor(s.h2)}>
              <h2>{s.h2}</h2>
              {s.blocks.map((b, i) => <BlockView key={i} b={b} />)}
            </section>
          ))}

          {g.faq && (
            <section id="questions">
              <h2>Questions people ask</h2>
              <div className={styles.faq}>
                {g.faq.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}<span className={styles.plus} aria-hidden="true" /></summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <aside className={styles.author} aria-label="About the author">
            {author.photo && <div className={styles.authorPhoto}><Image src={author.photo} alt={author.name} fill sizes="96px" /></div>}
            <div>
              <p className={styles.authorName}>{author.name}</p>
              <p className={styles.authorRole}>{author.role}</p>
              <p className={styles.authorBio}>{author.bio}</p>
              {isFounder && storyLink && <Link href={storyLink.href} className={styles.authorLink} style={{ marginRight: 20 }}>{storyLink.label} →</Link>}
              {author.linkedin && <a href={author.linkedin} target="_blank" rel="noopener me" className={styles.authorLink}>LinkedIn ↗</a>}
            </div>
          </aside>
          </div>
        </div>
      </article>

      <section id="join" className={`section ${styles.ctaSection}`} aria-labelledby="cta-title">
        <div className="container">
          <div className={`on-dark grain ${styles.cta}`}>
            <h2 id="cta-title" className="display h2"><Rich text={g.cta.title} /></h2>
            <p className="lede">{g.cta.text}</p>
            <div className={styles.ctaForm}><WaitlistForm source={(source ?? `guide:${g.slug}`).slice(0, 32)} variant="glass" placeholder="Your email" buttonLabel="Get early access" /></div>
          </div>
        </div>
      </section>

      {stories && stories.length > 0 && <ReadingList id="stories-title" title={stories.length > 1 ? "Read other founders' stories" : "Read another founder's story"} items={stories} />}
      {related.length > 0 && <ReadingList id="related-title" title="Keep reading" items={related} />}
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
                <span className={styles.relatedText}><span className={styles.relatedLabel}>{r.label}</span><span>{r.title}</span></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
