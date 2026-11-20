import type { Metadata } from "next";
import Link from "@/components/ui/Lang";
import { contentOf } from "@/lib/l10n";
import { authorHref } from "@/lib/authors";
import { getLang } from "@/lib/lang";
import { langMeta, pageMeta, paramsLang } from "@/lib/meta";
import { ui } from "@/lib/ui";
import type { Lang } from "@/lib/i18n";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import styles from "@/components/ui/Article.module.css";

const PATH = "/guides/how-we-write-guides";

type Page = { title: string; description: string; label: string; lede: string; back: string; sections: { h2: string; body: React.ReactNode }[] };

function page(lang: Lang): Page {
  const { TRUST, FOOTER } = contentOf(lang);
  const founder = <Link href={authorHref(TRUST.founder.name)}>{TRUST.founder.name}</Link>;
  const mail = <a href={`mailto:${FOOTER.email}`}>{FOOTER.email}</a>;
  if (lang === "uk") return {
    title: "Як ми пишемо й перевіряємо гайди",
    description: "Хто пише гайди Elegix, як ми обираємо й цитуємо джерела, як працює експертна перевірка і як повідомити про помилку.",
    label: "Редакційна політика",
    lede: "Гайди на цьому сайті мають бути корисними, чесними й легкими для перевірки. Ось як ми їх пишемо.",
    back: "До всіх гайдів",
    sections: [
      { h2: "Хто пише гайди", body: <p>Кожен гайд пише {founder}, засновник Elegix. {TRUST.founder.experience} Під заголовком кожного гайду вказано, хто його написав і коли його востаннє оновили.</p> },
      { h2: "Про що ми пишемо", body: <p>Ми пишемо про питання, які виникають, коли одна частина життя починає витісняти інші: вигорання, баланс роботи й життя, цілі, пріоритети та 6 сфер життя (здоров’я, стосунки, духовність, відпочинок, особистий розвиток, фінанси й кар’єра). Після кожного гайду в тебе має лишитися одна річ, яку можна зробити вже цього тижня.</p> },
      {
        h2: "Як ми працюємо з джерелами",
        body: (
          <>
            <p>Кожна цифра, дослідження чи твердження експерта в гайді має посилання на першоджерело, а в кінці кожного гайду ці посилання ще раз зібрані в розділі «Джерела».</p>
            <ul className={styles.list}>
              <li>Ми надаємо перевагу рецензованим дослідженням, офіційним органам охорони здоров’я (як-от ВООЗ, NHS і CDC) та великим опублікованим опитуванням.</li>
              <li>Де можемо, ми посилаємося на саме дослідження чи звіт, а не на статтю про нього.</li>
              <li>Якщо дані суперечливі, ми так і пишемо, а не обираємо результат, який пасує до історії.</li>
              <li>Особистий досвід позначено як особистий досвід, а не подано як дослідження.</li>
            </ul>
          </>
        ),
      },
      { h2: "Експертна перевірка", body: <p>Найбільше зовнішня перевірка потрібна гайдам про здоров’я: вигорання, сон і стрес. Коли гайд перевірив кваліфікований експерт, його ім’я та кваліфікація з’являються під заголовком у рядку «Перевірено», разом із датою перевірки. Ми показуємо лише того експерта, який справді прочитав і схвалив саме цей гайд.</p> },
      { h2: "Не медична порада", body: <p>Гайди — це загальна інформація, яка допомагає помітити дисбаланс і повернути рівновагу. Це не медична, психологічна чи фінансова порада. Якщо ти більшість днів почуваєшся виснаженим, понад два тижні маєш пригнічений настрій або відчуваєш небезпеку, звернися до лікаря чи ліцензованого терапевта.</p> },
      { h2: "Оновлення та виправлення", body: <p>Ми оновлюємо гайд, коли змінюються його поради чи джерела, а дата «Оновлено» показує останню справжню зміну, а не косметичну. Якщо помітиш помилку чи застаріле джерело, напиши на {mail}, і ми перевіримо та виправимо.</p> },
      { h2: "Про Elegix у гайдах", body: <p>Elegix — наш власний застосунок, і гайди про це прямо кажуть: більшість закінчується короткою приміткою про те, як застосунок допомагає з темою. Ми не беремо гроші за згадки інших продуктів, і в гайдах немає партнерських посилань.</p> },
    ],
  };
  return {
    title: "How we write and check our guides",
    description: "Who writes the Elegix guides, how we pick and cite sources, how expert review works, and how to report a mistake.",
    label: "Editorial policy",
    lede: "The guides on this site are meant to be useful, honest and easy to check. Here is how we write them.",
    back: "Back to all guides",
    sections: [
      { h2: "Who writes the guides", body: <p>Every guide is written by {founder}, founder of Elegix. {TRUST.founder.experience} The byline on each guide says who wrote it and when it was last updated.</p> },
      { h2: "What we write about", body: <p>We write about the questions people ask when one part of life starts taking over the others: burnout, work-life balance, goals, priorities and the 6 areas of life (health, relationships, spirituality, leisure, personal growth, and finance and career). Each guide should leave you with one thing you can do this week.</p> },
      {
        h2: "How we use sources",
        body: (
          <>
            <p>Every number, study or expert claim in a guide links to where it comes from, and each guide lists those links again under &ldquo;Sources&rdquo; at the end.</p>
            <ul className={styles.list}>
              <li>We prefer peer-reviewed research, official health bodies (such as the WHO, NHS and CDC) and large, published surveys.</li>
              <li>We link to the original study or report where we can, not to an article about it.</li>
              <li>When the evidence is mixed, we say so instead of picking the result that fits the story.</li>
              <li>Personal experience is labelled as personal experience, not presented as research.</li>
            </ul>
          </>
        ),
      },
      { h2: "Expert review", body: <p>Guides that touch on health, such as burnout, sleep and stress, are the ones where an outside check matters most. When a qualified expert has reviewed a guide, their name and credentials appear under its title as &ldquo;Reviewed by&rdquo;, with the date of the review. We only show a reviewer who has actually read and approved that guide.</p> },
      { h2: "Not medical advice", body: <p>The guides are general information to help you notice and rebalance your life. They are not medical, psychological or financial advice. If you feel exhausted most days, low for more than two weeks, or unsafe, please talk to a doctor or a licensed therapist.</p> },
      { h2: "Updates and corrections", body: <p>We update a guide when its advice or its sources change, and the &ldquo;Updated&rdquo; date shows the last real change, not a cosmetic one. If you spot a mistake or an outdated source, email {mail} and we will check it and fix it.</p> },
      { h2: "About Elegix in the guides", body: <p>Elegix is our own app, and the guides say so: most end with a short note on how the app helps with the topic. We don&apos;t take payment for mentioning other products, and the guides have no affiliate links.</p> },
    ],
  };
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await paramsLang(params);
  const p = page(lang);
  return pageMeta(lang, PATH, { title: p.title, description: p.description });
}

export default async function HowWeWriteGuides() {
  const lang = await getLang();
  const p = page(lang);
  const t = ui(lang);
  return (
    <main>
      <Breadcrumbs name={p.title} path={langMeta(lang, PATH).url} parents={[{ name: t.guides, path: langMeta(lang, "/guides").url }]} />
      <article className={`section ${styles.article}`} aria-labelledby="article-title">
        <header className={`container ${styles.head}`}>
          <nav aria-label={t.breadcrumb} className={styles.crumbs}>
            <Link href="/">Elegix</Link><span aria-hidden="true">/</span><Link href="/guides">{t.guides}</Link>
          </nav>
          <span className="label">{p.label}</span>
          <h1 id="article-title" className={`display ${styles.title}`}>{p.title}</h1>
          <p className={styles.lede}>{p.lede}</p>
        </header>
        <div className={`container ${styles.head}`} style={{ marginTop: "clamp(32px, 5vw, 56px)", display: "block" }}>
          <div className={styles.body}>
            {p.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.body}
              </section>
            ))}
            <p><Link href="/guides">{p.back}</Link></p>
          </div>
        </div>
      </article>
    </main>
  );
}
