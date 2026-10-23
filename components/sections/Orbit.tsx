import Image from "next/image";
import { AREAS, ORBIT } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";
import { areaVars } from "@/components/ui/Pill";
import styles from "./Orbit.module.css";

/** "One picture": a statement title, a big ring with the logo mark and round area photos scattered around it. */
export function Orbit() {
  return (
    <section className={`section ${styles.orbit}`} aria-labelledby="orbit-title">
      <div className="container">
        <span className="label" data-reveal>{ORBIT.label}</span>
        <h2 id="orbit-title" className={`display h2 ${styles.title}`} data-reveal>{ORBIT.title}</h2>
        <div className={styles.stage} data-reveal>
          <span className={styles.ring} aria-hidden="true" />
          <span className={styles.mark} aria-hidden="true"><LogoMark /></span>
          {ORBIT.photos.map((p, i) => (
            <figure key={p.src} className={styles.photo}
              style={{ ...areaVars(p.area), left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}%`, animationDelay: `${-i * 0.9}s` }}>
              <Image src={p.src} alt="" fill sizes="(max-width: 860px) 20vw, 140px" />
              <figcaption className="caption">{AREAS[p.area].short}</figcaption>
            </figure>
          ))}
        </div>
        <p className={styles.caption} data-reveal>{ORBIT.caption}</p>
      </div>
    </section>
  );
}
