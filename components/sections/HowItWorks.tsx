import { AREAS, EXAMPLE_TAG, HOW } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { Pill, areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import { Wheel } from "@/components/ui/Wheel";
import styles from "./HowItWorks.module.css";

function Overlay({ kind }: { kind: (typeof HOW.cards)[number]["kind"] }) {
  if (kind === "score") {
    const sc = HOW.score;
    return (
      <div className={`glass ${styles.panel} ${styles.score}`}>
        <span className={styles.small}>{sc.label}</span>
        <b className={styles.big}>{sc.from} <span className={styles.arrow}>→</span> {sc.to}</b>
        <Wheel scores={sc.scores} size={110} ring="rgba(255,255,255,0.18)" />
      </div>
    );
  }
  if (kind === "areas") {
    return (
      <ul className={`glass ${styles.panel} ${styles.rows}`}>
        {HOW.changes.map((c) => (
          <li key={c.area} style={areaVars(c.area)}>
            <span className={styles.dot} aria-hidden="true" />
            <span>{AREAS[c.area].short}</span>
            <b className={c.change.startsWith("+") ? styles.up : styles.down}>{c.change}</b>
          </li>
        ))}
      </ul>
    );
  }
  const n = HOW.next;
  return (
    <div className={`${styles.panel} ${styles.white}`}>
      <span className={styles.nextLabel}>{n.title}</span>
      <div className={styles.nextItem}><span className={styles.check} aria-hidden="true" /><b>{n.item}</b><Pill area={n.area} strong /></div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className={`section ${styles.how}`} aria-labelledby="how-title">
      <div className="container">
        <div className="section-head split" data-reveal>
          <span className="label">{HOW.label}</span>
          <h2 id="how-title" className="display h2"><Rich text={HOW.title} /></h2>
          <a href="#join" className="btn">{HOW.cta}</a>
        </div>
        <ol className={styles.steps} data-reveal>
          {HOW.steps.map((s, i) => (
            <li key={s.title}>
              <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        {/* one example card under each step: See → score, Act → next step, Reflect → changes by area */}
        <ul className={styles.cards} aria-label="What Elegix shows you">
          {HOW.cards.map((c) => (
            <li key={c.caption} data-reveal>
              <figure className={`grain ${styles.card}`}>
                <Media media={c.media} tone="dark" fill compact sizes="(max-width: 860px) 80vw, 420px" />
                <div className={`${styles.shade} ${c.media.src ? styles.onPhoto : ""}`} aria-hidden="true" />
                <figcaption className={styles.caption}>{c.caption}<span className="example-tag">{EXAMPLE_TAG}</span></figcaption>
                <div className={styles.overlay}><Overlay kind={c.kind} /></div>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
