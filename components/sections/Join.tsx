import { getContent } from "@/lib/lang";
import { ui } from "@/lib/ui";
import { Media } from "@/components/ui/Media";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { communityUrl } from "@/lib/email/template";
import styles from "./Join.module.css";

/** Early access: a full-bleed photo with one title, one line, the form and what happens after you join. */
export async function Join() {
  const { lang, c: { JOIN } } = await getContent();
  // the Telegram invite is promised only while it's switched on (TELEGRAM_COMMUNITY_URL)
  const community = Boolean(communityUrl());
  return (
    <section id="join" className={`on-dark ${styles.join}`} data-theme="dark" aria-labelledby="join-title">
      <div className={styles.stage}>
        <div className={styles.photo} data-parallax data-scale-in><Media media={JOIN.media} fill sizes="100vw" /></div>
        <div className={styles.panel} data-reveal>
          <h2 id="join-title" className={`display h2 ${styles.title}`}><Rich text={JOIN.title} /></h2>
          <p className={styles.sub}>{JOIN.sub}</p>
          <div id="join-form" className={styles.form}>
            <WaitlistForm source="join" variant="underline" placeholder={ui(lang).yourEmail} buttonLabel={JOIN.button} />
          </div>
          <div className={styles.after}>
            <p className={`caption ${styles.afterTitle}`}>{JOIN.after.title}</p>
            <ol className={styles.steps}>
              {JOIN.after.steps.map((s, i) => (
                <li key={s.when}>
                  <span className={styles.when}>{String(i + 1).padStart(2, "0")} · {s.when}</span>
                  <span>{community && s.nowCommunity ? s.nowCommunity : s.now}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
