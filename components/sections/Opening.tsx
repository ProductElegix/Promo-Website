import Image from "next/image";
import { HERO, OPENING } from "@/lib/content";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import styles from "./Opening.module.css";

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

      <div className={styles.statementWrap}>
        <span className="label" data-reveal>{OPENING.statement.label}</span>
        <p className={styles.statement} data-reveal>{OPENING.statement.lead}<span>{OPENING.statement.rest}</span></p>
      </div>
    </section>
  );
}
