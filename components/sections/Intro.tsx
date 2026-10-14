import { AREAS, AREA_ORDER, EXAMPLE_TAG, INTRO } from "@/lib/content";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { Pill, areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import styles from "./Intro.module.css";

export function Intro() {
  const s = INTRO.sample;
  return (
    <section className="section" aria-labelledby="intro-title">
      <div className={`container ${styles.stage}`}>
        <ul className={styles.list} data-reveal>
          {AREA_ORDER.map((a) => (
            <li key={a} style={areaVars(a)}><span className={styles.icon}><AreaIcon area={a} /></span><span><b>{AREAS[a].name}</b><small>{AREAS[a].description}</small></span></li>
          ))}
        </ul>
        <div className={styles.circle} data-reveal>
          <span className="label">{INTRO.label}</span>
          <h2 id="intro-title" className={`display ${styles.title}`}><Rich text={INTRO.title} /></h2>
          <p className="lede">{INTRO.lede}</p>
          <a href={INTRO.link.href} className={styles.link}>{INTRO.link.label} →</a>
        </div>
        <div className={styles.sample} data-reveal>
          <div className={styles.sampleTop}><Pill area={s.area} strong /><span className="example-tag light">{EXAMPLE_TAG}</span></div>
          <b className={styles.score}>{s.score}</b>
          <p>{s.text}</p>
          <div className={styles.bar} style={areaVars(s.area)}><span style={{ width: "41%" }} /></div>
          <small>{s.streak}</small>
        </div>
      </div>
    </section>
  );
}
