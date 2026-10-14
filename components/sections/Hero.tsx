import { AREAS, EXAMPLE_TAG, HERO } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import { Wheel } from "@/components/ui/Wheel";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import styles from "./Hero.module.css";

export function Hero() {
  const c = HERO.card;
  return (
    <section className={`on-dark ${styles.hero}`} aria-labelledby="hero-title">
      <div className={`grain ${styles.frame}`}>
        <div className={styles.photo}><Media media={HERO.media} tone="dark" fill priority sizes="100vw" /></div>
        <div className={`${styles.atmo} ${HERO.media.src ? styles.onPhoto : ""}`} aria-hidden="true" />
        <div className={styles.content}>
          <span className={`glass ${styles.eyebrow}`}>{HERO.eyebrow}</span>
          <h1 id="hero-title" className={`display ${styles.title}`}><Rich text={HERO.title} /></h1>
          <p className={styles.lede}>{HERO.lede}</p>
          <div className={styles.form}>
            <WaitlistForm source="hero" variant="glass" placeholder="Your email" buttonLabel={HERO.cta} />
          </div>
          <ul className={styles.trust}>{HERO.trust.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <figure className={`glass ${styles.card}`}>
          <div className={styles.cardHead}>
            <Wheel scores={c.scores} size={52} ring="rgba(255,255,255,0.18)" />
            <div>
              <span className={styles.cardTitle}>{c.title}</span>
              <b className={styles.cardValue}>{c.value}<small>{c.of}</small></b>
            </div>
            <span className="example-tag">{EXAMPLE_TAG}</span>
          </div>
          <ul className={styles.rows}>
            {c.rows.map((r) => (
              <li key={r.area} style={areaVars(r.area)}>
                <span className={styles.dot} aria-hidden="true" />{AREAS[r.area].short}
                <b>{r.value} <span className={r.trend === "up" ? styles.up : styles.down}>{r.trend === "up" ? "↑" : "↓"}</span></b>
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}
