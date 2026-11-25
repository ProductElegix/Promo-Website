import Image from "next/image";
import { teamMember, type TeamComment } from "@/lib/blog";
import type { Lang } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import styles from "./TeamComments.module.css";

/**
 * Comments from the team under a blog post: photo, name, role, their words.
 * Pass only the comments this build may show (visibleComments in lib/blog.ts). A draft carries a yellow
 * "Draft" mark, because its words are a placeholder and not what the person said.
 */
export function TeamComments({ comments, lang }: { comments: TeamComment[]; lang: Lang }) {
  const t = ui(lang);
  if (!comments.length) return null;
  return (
    <section id="team-comments" className={styles.wrap} aria-labelledby="team-comments-title">
      <h2 id="team-comments-title">{t.fromTheTeam} <span className={styles.count}>{comments.length}</span></h2>
      <ul className={styles.list}>
        {comments.map((c) => {
          const m = teamMember(lang, c.person);
          if (!m) return null;
          return (
            <li key={c.person} className={`${styles.item} ${c.draft ? styles.draft : ""}`}>
              <div className={styles.photo}>
                {m.photo ? <Image src={m.photo} alt="" fill sizes="48px" /> : <span aria-hidden="true">{m.name.split(" ").map((w) => w[0]).join("")}</span>}
              </div>
              <div className={styles.text}>
                <p className={styles.who}>
                  <span className={styles.name}>{m.name}</span>
                  <span className={styles.role}>{m.role}</span>
                  {c.draft && <span className={styles.badge} title={t.draftNote(m.name.split(" ")[0])}>{t.draft}</span>}
                </p>
                <p className={styles.words}>{c.text}</p>
                {c.draft && <p className={styles.note}>{t.draftNote(m.name.split(" ")[0])}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
