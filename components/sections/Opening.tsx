import Image from "next/image";
import { HERO, OPENING } from "@/lib/content";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import styles from "./Opening.module.css";

/**
 * Black opening of the home page (Duna style): the headline (the page's h1) at full width, caption row,
 * a cinematic photo band, the statement and the early-access form.
 */
export function Opening() {
  return (
    <section className={`on-dark ${styles.opening}`} data-theme="dark" aria-labelledby="hero-title">
      <div className={styles.titleWrap}>
        <h1 id="hero-title" className={`display ${styles.title}`} data-hero-item>
          <span className="visually-hidden">{HERO.h1Prefix}: </span>
          <Rich text={HERO.title} />
        </h1>
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
        <p className="statement" data-reveal>{HERO.lede}</p>
      </div>

      <div className={styles.facts}>
        <p className="caption">{OPENING.formCaption}</p>
        <div className={styles.form} data-reveal>
          <WaitlistForm source="hero" variant="underline" placeholder="Your email" buttonLabel={HERO.cta} />
          <ul className={`${styles.trust} caption`}>{HERO.trust.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </div>

    </section>
  );
}
