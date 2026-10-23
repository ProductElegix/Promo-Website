import Image from "next/image";
import { APP, AREAS, READY } from "@/lib/content";
import { Phone } from "@/components/ui/Phone";
import { Pill } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import styles from "./Ready.module.css";

/** Closing block: headline + CTA, then the app surrounded by everyday objects, one per life area. */
export function Ready() {
  return (
    <section className={`section ${styles.ready}`} aria-labelledby="ready-title">
      <div className="container">
        <div className={`section-head center ${styles.head}`} data-reveal>
          <span className="label">{READY.label}</span>
          <h2 id="ready-title" className="display h2"><Rich text={READY.title} /></h2>
          <p className={`lede ${styles.lede}`}><Rich text={READY.lede} /></p>
          <a href="#join" className="btn">{READY.cta}</a>
        </div>
      </div>
      <div className={styles.table}>
        {READY.objects.map((o, i) => (
          <figure key={o.area} className={`${styles.obj} ${styles[`o${i}`]}`} data-drift>
            <div className={styles.photo}><Image src={o.src} alt={o.alt} fill sizes="240px" /></div>
            <figcaption><Pill area={o.area} label={AREAS[o.area].short} strong /></figcaption>
          </figure>
        ))}
        <div className={styles.phone} data-reveal><Phone screen={APP.screens[0].media} /></div>
      </div>
    </section>
  );
}
