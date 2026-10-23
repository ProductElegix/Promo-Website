import Image from "next/image";
import Link from "next/link";
import { HERO, OPENING } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import styles from "./Opening.module.css";

/**
 * Black opening of the home page (Duna style): edge-to-edge wordmark, caption row, a cinematic photo band,
 * the statement (the page's h1) and the early-access form, then a highlight card.
 */
export function Opening() {
  return (
    <section className={`on-dark ${styles.opening}`} data-theme="dark" aria-labelledby="hero-title">
      <div className={styles.wordmarkWrap}>
        <span className={styles.wordmark} aria-hidden="true" data-hero-item>elegix</span>
      </div>

      <div className={`${styles.captions} caption`} data-hero-item>
        {OPENING.captions.map(([a, b]) => <p key={a}>{a}<br />{b}</p>)}
        <a href="#statement" className={styles.down} aria-label="Scroll to introduction">↓</a>
      </div>

      <div className={styles.band}>
        <div className={styles.bandMedia} data-hero-photo>
          <Image src={HERO.media.src!} alt={HERO.media.alt} fill priority sizes="100vw" className={styles.bandImage} />
        </div>
      </div>

      <div id="statement" className={styles.statementWrap}>
        <h1 id="hero-title" className="statement" data-reveal>
          <span className="visually-hidden">{HERO.h1Prefix}: </span>
          <span className={styles.lead}><Rich text={HERO.title} /></span> {HERO.lede}
        </h1>
      </div>

      <div className={styles.facts}>
        <p className="caption">{OPENING.formCaption}</p>
        <div className={styles.form} data-reveal>
          <WaitlistForm source="hero" variant="underline" placeholder="Your email" buttonLabel={HERO.cta} />
          <ul className={`${styles.trust} caption`}>{HERO.trust.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>

      <div className={styles.highlights}>
        <div className={`${styles.highlightsHead} caption`}>
          <p>{OPENING.highlights.label}</p>
          <Link href={OPENING.highlights.link.href}>{OPENING.highlights.link.label} <span aria-hidden="true">↗</span></Link>
        </div>
        <Link href={OPENING.highlights.link.href} className={styles.card} aria-label={OPENING.highlights.link.label}>
          <Image src={OPENING.highlight.src} alt={OPENING.highlight.alt} fill sizes="100vw" className={styles.cardImage} />
          <span className={styles.cardMark}><LogoMark /></span>
        </Link>
      </div>
    </section>
  );
}
