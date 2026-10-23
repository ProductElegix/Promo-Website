import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { TRUST, type AreaKey, type MediaSlot } from "@/lib/content";
import type { Block, Guide } from "@/lib/guides";
import { OG_IMAGE, SITE_URL } from "@/lib/site";
import { Breadcrumbs, JsonLd } from "./JsonLd";
import { Inline } from "./Inline";
import { Media } from "./Media";
import { Pill } from "./Pill";
import { Rich } from "./Rich";
import { WaitlistForm } from "./WaitlistForm";
import styles from "./Article.module.css";

type Parent = { name: string; path: string };
type Props = {
  guide: Omit<Guide, "related"> & { area?: AreaKey };
  path: string;
  parent: Parent;
  related: { href: string; label: string; title: string; media?: MediaSlot }[];
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

function BlockView({ b }: { b: Block }) {
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
  return <p><Inline text={b.p} /></p>;
}

/** Anchor id for a section heading, e.g. "How to read your wheel" → "how-to-read-your-wheel". */
const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const date = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

/** A long-form page: breadcrumbs, h1, photo, sections, FAQ, related reading and the waitlist. */
export function Article({ guide: g, path, parent, related }: Props) {
  const url = `${SITE_URL}${path}`;
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
        author: { "@type": "Person", name: TRUST.founder.name, url: `${SITE_URL}/about#story` },
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
            {TRUST.founder.media.src && <Image src={TRUST.founder.media.src} alt="" width={32} height={32} className={styles.metaPhoto} />}
            <span>By <Link href="/about#story">{TRUST.founder.name}</Link>, founder of Elegix · Updated <time dateTime={g.updated}>{date(g.updated)}</time> · {g.minutes} min read</span>
          </p>
        </header>

        <div className={`container ${styles.photo}`}>
          <Media media={g.media} priority sizes="(max-width: 1100px) 100vw, 1100px" />
        </div>

        <div className={`container ${styles.body}`}>
          <nav className={styles.toc} aria-labelledby="toc-title">
            <p id="toc-title" className={styles.tocTitle}>In this guide</p>
            <ol>
              {g.sections.map((s) => <li key={s.h2}><a href={`#${anchor(s.h2)}`}>{s.h2}</a></li>)}
              {g.faq && <li><a href="#questions">Questions people ask</a></li>}
            </ol>
          </nav>
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
            {TRUST.founder.media.src && <div className={styles.authorPhoto}><Image src={TRUST.founder.media.src} alt={TRUST.founder.media.alt} fill sizes="96px" /></div>}
            <div>
              <p className={styles.authorName}>{TRUST.founder.name}</p>
              <p className={styles.authorRole}>Founder of Elegix</p>
              <p className={styles.authorBio}>{TRUST.founder.quote}</p>
              <Link href={TRUST.founder.storyLink.href} className={styles.authorLink}>{TRUST.founder.storyLink.label} →</Link>
            </div>
          </aside>
        </div>
      </article>

      <section id="join" className={`section ${styles.ctaSection}`} aria-labelledby="cta-title">
        <div className="container">
          <div className={`on-dark grain ${styles.cta}`}>
            <h2 id="cta-title" className="display h2"><Rich text={g.cta.title} /></h2>
            <p className="lede">{g.cta.text}</p>
            <div className={styles.ctaForm}><WaitlistForm source={`guide:${g.slug}`.slice(0, 32)} variant="glass" placeholder="Your email" buttonLabel="Get early access" /></div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <nav className={`section ${styles.relatedSection}`} aria-labelledby="related-title">
          <div className="container">
            <h2 id="related-title" className={styles.relatedTitle}>Keep reading</h2>
            <ul className={styles.related}>
              {related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href}>
                    {r.media?.src && <span className={styles.relatedPhoto}><Image src={r.media.src} alt="" fill sizes="(max-width: 860px) 100vw, 33vw" /></span>}
                    <span className={styles.relatedText}><span className={styles.relatedLabel}>{r.label}</span><span>{r.title}</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </main>
  );
}
