import { APP, AREAS, EXAMPLE_TAG, HERO } from "@/lib/content";
import { areaVars } from "@/components/ui/Pill";
import { Wheel } from "@/components/ui/Wheel";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { PhotoHero } from "./PhotoHero";
import styles from "./Hero.module.css";

export function Hero() {
  const c = HERO.card;
  const card = (
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
  );
  return (
    <PhotoHero id="hero-title" media={HERO.media} eyebrow={HERO.eyebrow} title={HERO.title} lede={HERO.lede} screen={APP.screens[0].media} card={card}>
      <div className={styles.form}>
        <WaitlistForm source="hero" variant="glass" placeholder="Your email" buttonLabel={HERO.cta} />
      </div>
      <ul className={styles.trust}>{HERO.trust.map((t) => <li key={t}>{t}</li>)}</ul>
    </PhotoHero>
  );
}
