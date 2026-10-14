import { PROBLEM } from "@/lib/content";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import styles from "./Problem.module.css";

export function Problem() {
  return (
    <section className="section" aria-labelledby="problem-title">
      <div className="container">
        <div className={styles.head} data-reveal>
          <span className="label">{PROBLEM.eyebrow}</span>
          <h2 id="problem-title" className="display h2"><Rich text={PROBLEM.title} /></h2>
          <p className={styles.text}><Rich text={PROBLEM.text} /></p>
        </div>
        <ul className={styles.cards}>
          {PROBLEM.cards.map((c) => (
            <li key={c.text} className={styles.card} style={areaVars(c.area)} data-reveal>
              <span className={styles.icon} aria-hidden="true"><AreaIcon area={c.area} /></span>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
        <p className={styles.closing} data-reveal>{PROBLEM.closing}</p>
      </div>
    </section>
  );
}
