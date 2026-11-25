import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/Lang";
import { contentOf } from "@/lib/l10n";
import { getContent } from "@/lib/lang";
import { langMeta, pageMeta, paramsLang } from "@/lib/meta";
import { SITE_URL } from "@/lib/site";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import { Rich } from "@/components/ui/Rich";
import { MARK } from "@/components/ui/Logo";
import { CopyText } from "./CopyText";
import styles from "./press.module.css";
import { RollText } from "@/components/ui/RollText";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  const P = contentOf(lang).PRESS;
  return pageMeta(lang, "/press", { title: P.meta.title, description: P.meta.description, absolute: true });
}

/** Press kit: one download for everything, key facts, descriptions in 3 lengths, logos, photos, quotes and a contact. */
/** The logomark with only some of its 4 strokes lit: wind is the top two, water the bottom two. */
const PARTS: number[][] = [[0, 3], [1, 2], [0, 1, 2, 3]];
function ConceptMark({ lit }: { lit: number[] }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true">
      {MARK.map((d, i) => <path key={i} d={d} fill="#d5f45e" fillOpacity={lit.includes(i) ? 1 : 0.25} />)}
    </svg>
  );
}

export default async function Press() {
  const { lang, c: { PRESS: P } } = await getContent();
  const path = langMeta(lang, "/press").url;
  const mail = `mailto:${P.contact.email}?subject=${encodeURIComponent(P.contact.subject)}`;
  return (
    <main>
      <Breadcrumbs name={P.label} path={path} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: P.meta.title,
        description: P.meta.description,
        url: `${SITE_URL}${path}`,
        inLanguage: lang,
        about: { "@id": `${SITE_URL}/#organization` },
      }} />

      <section className={`section ${styles.hero}`} aria-labelledby="press-title">
        <div className="container">
          <div className={styles.heroInner} data-reveal>
            <span className="label">{P.label}</span>
            <h1 id="press-title" className="display h2"><Rich text={P.title} /></h1>
            <p className="lede">{P.lede}</p>
            <div className={styles.actions}>
              <a href={P.download.href} download className="btn"><RollText>{P.download.label}</RollText></a>
              <a href={mail} className="btn ghost"><RollText>{P.contact.label}</RollText></a>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.tight}`} aria-labelledby="press-facts">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{P.facts.label}</span>
            <h2 id="press-facts" className="display h2"><Rich text={P.facts.title} /></h2>
          </div>
          <dl className={styles.facts}>
            {P.facts.items.map((f) => (
              <div key={f.k} className={styles.fact} data-reveal>
                <dt className="caption muted">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={`section ${styles.tight}`} aria-labelledby="press-about">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{P.about.label}</span>
            <h2 id="press-about" className="display h2"><Rich text={P.about.title} /></h2>
            <p className="lede">{P.about.lede}</p>
          </div>
          <ul className={styles.about}>
            {P.about.items.map((a, i) => (
              <li key={a.label} className={styles.aboutItem} data-reveal>
                <div className={styles.aboutHead}>
                  <h3 className="caption">{a.label}</h3>
                  <CopyText text={a.text} label={P.about.copy} done={P.about.copied} id={`description-${i + 1}`} />
                </div>
                {a.text.split("\n\n").map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.tight}`} aria-labelledby="press-logos">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{P.logos.label}</span>
            <h2 id="press-logos" className="display h2"><Rich text={P.logos.title} /></h2>
            <p className="lede">{P.logos.lede}</p>
          </div>
          <ul className={styles.logos}>
            {P.logos.items.map((l) => (
              <li key={l.file} className={styles.logo} data-reveal>
                <div className={`${styles.ground} ${l.ground === "dark" ? styles.dark : ""} ${l.file.includes("-mark-") ? styles.markGround : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/press/${l.file}.svg`} alt={l.name} loading="lazy" />
                </div>
                <div className={styles.fileRow}>
                  <span>{l.name}</span>
                  <span className={styles.formats}>
                    <a href={`/press/${l.file}.svg`} download>SVG</a>
                    <a href={`/press/${l.file}.png`} download>PNG</a>
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <ul className={styles.colours} data-reveal>
            {P.logos.colours.map((c) => (
              <li key={c.hex}>
                <span className={styles.swatch} style={{ background: c.hex }} aria-hidden="true" />
                <span>{c.name}</span>
                <span className="muted">{c.hex}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.tight}`} aria-labelledby="press-concept">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{P.concept.label}</span>
            <h2 id="press-concept" className="display h2"><Rich text={P.concept.title} /></h2>
            <p className="lede">{P.concept.lede}</p>
          </div>
          <div className={`on-dark ${styles.concept}`} data-reveal>
            <ol className={styles.conceptRow}>
              {P.concept.parts.map((part, i) => (
                <li key={part.word} className={styles.conceptPart}>
                  {i > 0 && <span className={styles.conceptOp} aria-hidden="true">{i === 1 ? "+" : "="}</span>}
                  <ConceptMark lit={PARTS[i]} />
                  <span className={styles.conceptWord}>{part.word}<br />{part.meaning}</span>
                </li>
              ))}
            </ol>
          </div>
          <a href={P.concept.download.href} download className={`btn ghost ${styles.conceptBtn}`}><RollText>{P.concept.download.label}</RollText></a>
        </div>
      </section>

      <section className={`section ${styles.tight}`} aria-labelledby="press-photos">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{P.photos.label}</span>
            <h2 id="press-photos" className="display h2"><Rich text={P.photos.title} /></h2>
            <p className="lede">{P.photos.lede}</p>
          </div>
          <ul className={styles.photos}>
            {P.photos.team.map((p) => (
              <li key={p.src} className={styles.photo} data-reveal>
                <div className={styles.portrait} data-wipe><Image src={p.src} alt={p.name} fill sizes="(max-width: 860px) 50vw, 25vw" /></div>
                <div className={styles.photoInfo}>
                  <b>{p.name}</b>
                  <span className="muted">{p.role}</span>
                  <a href={p.src} download>{P.photos.download}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.tight}`} aria-labelledby="press-screens">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{P.screens.label}</span>
            <h2 id="press-screens" className="display h2"><Rich text={P.screens.title} /></h2>
            <p className="lede">{P.screens.lede}</p>
          </div>
          <ul className={styles.screens}>
            {P.screens.items.map((s) => (
              <li key={s.src} className={styles.screenItem} data-reveal>
                <div className={styles.screenShot}><Image src={s.src} alt={s.name} fill sizes="(max-width: 860px) 60vw, 22vw" /></div>
                <div className={styles.photoInfo}>
                  <b>{s.name}</b>
                  <span className="muted">{s.text}</span>
                  <a href={s.src} download>{P.photos.download}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section ${styles.tight}`} aria-labelledby="press-quotes">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{P.quotes.label}</span>
            <h2 id="press-quotes" className="display h2"><Rich text={P.quotes.title} /></h2>
          </div>
          <ul className={styles.quotes}>
            {P.quotes.items.map((q) => (
              <li key={q.text} data-reveal>
                <figure className={styles.quote}>
                  <blockquote>{q.text}</blockquote>
                  <figcaption className="caption"><b>{q.name}</b>, {q.role}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div className={styles.stories} data-reveal>
            <span className="label">{P.stories.label}</span>
            <ul>{P.stories.links.map((l) => <li key={l.href}><Link href={l.href} className="link">{l.label}</Link></li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="press-contact" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={`on-dark ${styles.contact}`} data-reveal>
            <span className="label">{P.label}</span>
            <h2 id="press-contact" className="display h2"><Rich text={P.cta.title} /></h2>
            <p className="lede">{P.cta.text}</p>
            <div className={styles.actions}>
              <a href={mail} className="btn lime"><RollText>{P.contact.label}</RollText></a>
              <a href={P.download.href} download className="btn ghost"><RollText>{P.download.label}</RollText></a>
            </div>
            <p className={`caption ${styles.email}`}>{P.contact.email}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
