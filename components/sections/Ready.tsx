import Image from "next/image";
import { getContent } from "@/lib/lang";
import { Phone } from "@/components/ui/Phone";
import { Pill } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import styles from "./Ready.module.css";
import { RollText } from "@/components/ui/RollText";

/** Closing block: headline + CTA, then the app surrounded by everyday objects, one per life area. */
export async function Ready() {
  const { c: { APP, AREAS, READY } } = await getContent();
  return (
    <section className={`section ${styles.ready}`} aria-labelledby="ready-title">
      <div className="container">
        <div className={`section-head center ${styles.head}`} data-reveal>
          <span className="label">{READY.label}</span>
          <h2 id="ready-title" className="display h2"><Rich text={READY.title} /></h2>
          <p className={`lede ${styles.lede}`}><Rich text={READY.lede} /></p>
          <a href="#join" className="btn"><RollText>{READY.cta}</RollText></a>
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
