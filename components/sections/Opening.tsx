import Image from "next/image";
import { HERO, OPENING } from "@/lib/content";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import styles from "./Opening.module.css";

/** Copy split into word spans for the scroll-scrubbed reveal; *word* becomes a lime accent. */
function Words({ text }: { text: string }) {
  // tokens with their accent flag; punctuation right after an accent stays glued to it (no break before ",")
  const tokens = text.split(/(\*[^*]+\*)/).filter(Boolean).flatMap((part) => {
    const accent = part.startsWith("*") && part.endsWith("*");
    return (accent ? part.slice(1, -1) : part).split(/(\s+)/).filter(Boolean).map((w) => ({ w, accent }));
  });
  const groups: { w: string; accent: boolean }[][] = [];
  tokens.forEach((t, i) => {
    if (/^\s+$/.test(t.w)) groups.push([t]);
    else if (i > 0 && !/^\s+$/.test(tokens[i - 1].w)) groups[groups.length - 1].push(t);
    else groups.push([t]);
  });
  return (
    <>
      {groups.map((g, i) =>
        /^\s+$/.test(g[0].w) ? g[0].w : (
          <span key={i} className={styles.nowrap}>
            {g.map((t, j) => <span key={j} className={t.accent ? styles.accent : undefined} data-word>{t.w}</span>)}
          </span>
        ),
      )}
    </>
  );
}

/** Centred statement revealed word by word, then five photos that open up from the middle one. Sits on a black section. */
export function StatementStrip({ label, text, photos }: { label: string; text: string; photos: { src: string; alt: string }[] }) {
  return (
    <>
      <div className={styles.statementWrap}>
        <span className="label" data-reveal>{label}</span>
        <p className={styles.statement} data-split-words><Words text={text} /></p>
      </div>
      <ul className={styles.strip} data-strip>
        {photos.map((p, i) => (
          <li key={p.src} className={`${styles.stripItem} ${i === 2 ? styles.stripMain : ""}`}>
            <Image src={p.src} alt={p.alt} fill sizes={i === 2 ? "(max-width: 767px) 70vw, 30vw" : "(max-width: 767px) 50vw, 20vw"} />
          </li>
        ))}
      </ul>
    </>
  );
}

/** Black section wrapper for StatementStrip on pages other than home. */
export function StatementSection({ id, children }: { id?: string; children: React.ReactNode }) {
  return <section id={id} className={`on-dark ${styles.opening}`} data-theme="dark">{children}</section>;
}

/**
 * Black opening of the home page (Duna style): a full-screen photo behind the headline (the page's h1) and caption row,
 * the statement and the early-access form.
 */
export function Opening() {
  return (
    <section className={`on-dark ${styles.opening}`} data-theme="dark" aria-labelledby="hero-title">
      {/* first screen: the photo as a full background, a centred headline and the early access card at the bottom */}
      <div className={styles.stage}>
        <div className={styles.bg} data-hero-photo>
          <Image src={HERO.media.src!} alt={HERO.media.alt} fill priority sizes="100vw" className={styles.bgImage} />
        </div>
        <div className={`${styles.captions} caption`} data-hero-item>
          {OPENING.captions.map(([a, b]) => <p key={a}>{a}<br />{b}</p>)}
        </div>
        <h1 id="hero-title" className={styles.title} data-hero-item>
          <span className="visually-hidden">{HERO.h1Prefix}: </span>
          <Rich text={HERO.title} />
        </h1>
        <div className={styles.card} data-hero-item>
          <div className={styles.cardHead}>
            <p className={styles.cardTitle}>{OPENING.card.title}</p>
            <p className={styles.cardText}>{OPENING.card.text}</p>
          </div>
          <WaitlistForm source="hero" variant="bar" placeholder="Your email" buttonLabel={HERO.cta} />
          <ul className={`${styles.trust} caption`}>{HERO.trust.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>

      <StatementStrip label={OPENING.statement.label} text={OPENING.statement.lead + OPENING.statement.rest} photos={OPENING.strip} />
      <div className={styles.about} data-reveal>
        <h2 className={styles.aboutTitle}><Rich text={OPENING.about.title} /></h2>
        <p className={styles.aboutText}>{OPENING.about.text}</p>
      </div>
    </section>
  );
}
