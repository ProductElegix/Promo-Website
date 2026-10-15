import { APP, AREAS, FEATURES, HERO, HOW } from "@/lib/content";
import { Phone } from "@/components/ui/Phone";
import { Pill, areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import { Wheel } from "@/components/ui/Wheel";
import styles from "./Features.module.css";

/** Small floating UI chip over the phone's edge; demo values only, marked EXAMPLE. */
function Chip({ kind }: { kind: (typeof FEATURES.cards)[number]["key"] }) {
  if (kind === "balance") {
    const c = HERO.card;
    return (
      <div className={`${styles.chip} ${styles.chipBalance}`}>
        <Wheel scores={c.scores} size={44} ring="#e9ebe9" />
        <div><small>{c.title}</small><b>{c.value}<span>{c.of}</span></b></div>
      </div>
    );
  }
  if (kind === "goals") {
    const n = HOW.next;
    return (
      <div className={`${styles.chip} ${styles.chipNext}`}>
        <small>{n.title}</small>
        <div className={styles.nextRow}><span className={styles.check} aria-hidden="true" /><b>{n.item}</b><Pill area={n.area} strong /></div>
      </div>
    );
  }
  return (
    <ul className={`${styles.chip} ${styles.chipRows}`}>
      {HOW.changes.slice(0, 3).map((c) => (
        <li key={c.area} style={areaVars(c.area)}>
          <span className={styles.dot} aria-hidden="true" />{AREAS[c.area].short}
          <b className={c.change.startsWith("+") ? styles.up : styles.down}>{c.change}</b>
        </li>
      ))}
    </ul>
  );
}

export function Features() {
  return (
    <section id="features" className="section" aria-labelledby="features-title">
      <div className="container">
        <div className={`section-head center ${styles.head}`} data-reveal>
          <h2 id="features-title" className="display h2"><Rich text={FEATURES.title} /></h2>
          <p className="lede">{FEATURES.lede}</p>
        </div>
        <ul className={styles.cards}>
          {FEATURES.cards.map((c) => {
            const screen = (APP.screens.find((s) => s.label === c.screen) ?? APP.screens[0]).media;
            const [a, b] = c.tint;
            return (
              <li key={c.key} className={styles.card} data-reveal
                style={{ ["--a" as string]: `var(--${a}-t)`, ["--b" as string]: `var(--${b}-t)` }}>
                <h3 className={styles.title}>{c.title}</h3>
                <p className={styles.text}>{c.text}</p>
                <div className={styles.device}>
                  <div className={`${styles.phoneWrap} ${c.scroll ? styles.scrolled : ""}`} style={{ ["--scroll" as string]: `-${c.scroll}%` }}>
                    <Phone screen={screen} className={styles.phone} />
                  </div>
                  <div className={styles.chipWrap} aria-hidden="true"><Chip kind={c.key} /></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
