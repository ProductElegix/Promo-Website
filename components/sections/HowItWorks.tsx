import Link from "@/components/ui/Lang";
import { AREA_ORDER, APP as APP_EN } from "@/lib/content";
import type { Content } from "@/lib/l10n";
import { getContent } from "@/lib/lang";
import { ui } from "@/lib/ui";
import { Phone } from "@/components/ui/Phone";
import { Pill } from "@/components/ui/Pill";
import { areaVars } from "@/components/ui/areaVars";
import { Rich } from "@/components/ui/Rich";
import { Wheel } from "@/components/ui/Wheel";
import styles from "./HowItWorks.module.css";

/** Small floating UI chip over the phone's edge; demo values are labelled as examples. */
function Chip({ kind, c: { HERO, HOW, AREAS } }: { kind: Content["HOW"]["steps"][number]["key"]; c: Content }) {
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
export async function HowItWorks({ learnMore = true, chips = true }: { learnMore?: boolean; chips?: boolean }) {
  const { lang, c } = await getContent();
  const { APP, HOW } = c;
  return (
    <section id="how" className="section" aria-labelledby="how-title">
      <div className="container">
        <div className={`section-head center ${styles.head}`} data-reveal>
          <span className="label">{HOW.label}</span>
          <h2 id="how-title" className="display h2"><Rich text={HOW.title} /></h2>
          <p className="lede">{HOW.lede}</p>
          {chips && (
            <ul className={styles.areas} aria-label={ui(lang).sixAreas}>
              {AREA_ORDER.map((a) => <li key={a}><Pill area={a} /></li>)}
            </ul>
          )}
        </div>
        <ol className={styles.cards}>
          {HOW.steps.map((step, i) => {
            // steps name their screen by the English label; the translated list keeps the same order
            const screen = (APP.screens[APP_EN.screens.findIndex((s) => s.label === step.screen)] ?? APP.screens[0]).media;
            const [a, b] = step.tint;
            return (
              <li key={step.key} className={styles.card} data-reveal
                style={{ ["--a" as string]: `var(--${a}-t)`, ["--b" as string]: `var(--${b}-t)` }}>
                <span className={`num ${styles.n}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.title}>{step.title}</h3>
                <p className={styles.text}>{step.text}</p>
                <div className={styles.device}>
                  <div className={`${styles.phoneWrap} ${step.scroll ? styles.scrolled : ""}`} style={{ ["--scroll" as string]: `-${step.scroll}%` }}>
                    <Phone screen={screen} className={styles.phone} />
                  </div>
                  <div className={styles.chipWrap} aria-hidden="true"><Chip kind={step.key} c={c} /></div>
                </div>
              </li>
            );
          })}
        </ol>
        {learnMore && <p className={styles.more} data-reveal><Link href={HOW.more.href}>{HOW.more.label}</Link></p>}
      </div>
    </section>
  );
}
