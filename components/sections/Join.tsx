import { JOIN } from "@/lib/content";
import { Media } from "@/components/ui/Media";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import styles from "./Join.module.css";

/** Early access: a full-bleed photo with one title, one line and the form. */
export function Join() {
  return (
    <section id="join" className={`on-dark ${styles.join}`} data-theme="dark" aria-labelledby="join-title">
      <div className={styles.stage}>
        <div className={styles.photo} data-parallax data-scale-in><Media media={JOIN.media} fill sizes="100vw" /></div>
        <div className={styles.panel} data-reveal>
          <h2 id="join-title" className={`display ${styles.title}`}><Rich text={JOIN.title} /></h2>
          <p className={styles.sub}>{JOIN.sub}</p>
          <div id="join-form" className={styles.form}>
            <WaitlistForm source="join" variant="underline" placeholder="Your email" buttonLabel={JOIN.button} />
          </div>
        </div>
      </div>
    </section>
  );
}
