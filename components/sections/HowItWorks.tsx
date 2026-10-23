import Link from "next/link";
import { APP, AREAS, AREA_ORDER, HERO, HOW } from "@/lib/content";
import { Phone } from "@/components/ui/Phone";
import { Pill, areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import { Wheel } from "@/components/ui/Wheel";
import styles from "./HowItWorks.module.css";

/** Small floating UI chip over the phone's edge; demo values are labelled as examples. */
function Chip({ kind }: { kind: (typeof HOW.steps)[number]["key"] }) {
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
  const t = HOW.trends;
  return (
    <div className={`${styles.chip} ${styles.chipRows}`}>
      <small>{t.title}</small>
      <ul>
        {t.rows.map((r) => (
          <li key={r.area} style={areaVars(r.area)}>
            <span className={styles.dot} aria-hidden="true" />{AREAS[r.area].short}
            <b className={r.trend === "up" ? styles.up : styles.down}>{r.trend === "up" ? "↑" : "↓"}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** How it works: the 6 areas as chips, then See / Act / Reflect as tall cards with the app peeking up.
 *  On the home page it ends with one "Learn more" link to /about; /about renders it without. */
export function HowItWorks({ learnMore = true, chips = true }: { learnMore?: boolean; chips?: boolean }) {
  return (
    <section id="how" className="section" aria-labelledby="how-title">
      <div className="container">
        <div className={`section-head center ${styles.head}`} data-reveal>
          <span className="label">{HOW.label}</span>
          <h2 id="how-title" className="display h2"><Rich text={HOW.title} /></h2>
          <p className="lede">{HOW.lede}</p>
          {chips && (
            <ul className={styles.areas} aria-label="The 6 life areas">
              {AREA_ORDER.map((a) => <li key={a}><Pill area={a} /></li>)}
            </ul>
          )}
        </div>
        <ol className={styles.cards}>
          {HOW.steps.map((c, i) => {
            const screen = (APP.screens.find((s) => s.label === c.screen) ?? APP.screens[0]).media;
            const [a, b] = c.tint;
            return (
              <li key={c.key} className={styles.card} data-reveal
                style={{ ["--a" as string]: `var(--${a}-t)`, ["--b" as string]: `var(--${b}-t)` }}>
                <span className={`num ${styles.n}`}>{String(i + 1).padStart(2, "0")}</span>
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
        </ol>
        {learnMore && <p className={styles.more} data-reveal><Link href={HOW.more.href}>{HOW.more.label} →</Link></p>}
      </div>
    </section>
  );
}
