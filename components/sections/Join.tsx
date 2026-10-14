import { HERO, JOIN } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";
import { Rich } from "@/components/ui/Rich";
import { Wheel } from "@/components/ui/Wheel";
import { StartPicker } from "./StartPicker";
import styles from "./Join.module.css";

export function Join() {
  const c = JOIN.card;
  return (
    <section id="join" className="section" aria-labelledby="join-title">
      <div className={`container ${styles.grid}`}>
        <div className={`on-dark grain ${styles.card}`} data-reveal aria-hidden="true">
          <div className={styles.cardTop}><LogoMark className={styles.mark} /><span>{c.code}</span></div>
          <div className={styles.cardWheel}><Wheel scores={HERO.card.scores} size={210} ring="rgba(255,255,255,0.16)" /></div>
          <div className={styles.cardBottom}>
            <b>{c.line}</b>
            <span>{c.spec.join(" · ")}</span>
          </div>
        </div>
        <div className={styles.info} data-reveal>
          <span className="label">{JOIN.eyebrow}</span>
          <h2 id="join-title" className="display h2"><Rich text={JOIN.title} /></h2>
          <ul className={styles.perks}>{JOIN.perks.map((p) => <li key={p}><span className={styles.tick} aria-hidden="true">✓</span>{p}</li>)}</ul>
          <div id="join-form"><StartPicker /></div>
        </div>
      </div>
    </section>
  );
}
