import Image from "next/image";
import { PROBLEM } from "@/lib/content";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import styles from "./Problem.module.css";

/** The problem: title and text, then four photo cards for what slips first and the closing line in a wide card. */
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
          {PROBLEM.cards.map((c, i) => (
            <li key={c.text} className={styles.card} style={areaVars(c.area)} data-reveal>
              <div className={`${styles.cardPhoto} zoom`}>
                <Image src={c.src} alt="" fill sizes="(max-width: 860px) 50vw, 25vw" />
                <div className={styles.top}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.icon} aria-hidden="true"><AreaIcon area={c.area} /></span>
                </div>
              </div>
              <p>{c.text}</p>
            </li>
          ))}
        </ul>
        <p className={styles.closing} data-reveal>{PROBLEM.closing}</p>
      </div>
    </section>
  );
}
