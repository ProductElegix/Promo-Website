import type { Metadata } from "next";
import Link from "@/components/ui/Lang";
import { FOOTER, TRUST } from "@/lib/content";
import { OG_IMAGE } from "@/lib/site";
import { authorHref } from "@/lib/authors";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import styles from "@/components/ui/Article.module.css";

const TITLE = "How we write and check our guides";
const DESCRIPTION = "Who writes the Elegix guides, how we pick and cite sources, how expert review works, and how to report a mistake.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides/how-we-write-guides" },
  openGraph: { title: `${TITLE} · Elegix`, description: DESCRIPTION, url: "/guides/how-we-write-guides", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
};

const SECTIONS: { h2: string; body: React.ReactNode }[] = [
  {
    h2: "Who writes the guides",
    body: <p>Every guide is written by <Link href={authorHref(TRUST.founder.name)}>{TRUST.founder.name}</Link>, founder of Elegix. {TRUST.founder.experience} The byline on each guide says who wrote it and when it was last updated.</p>,
  },
  {
    h2: "What we write about",
    body: <p>We write about the questions people ask when one part of life starts taking over the others: burnout, work-life balance, goals, priorities and the 6 areas of life (health, relationships, spirituality, leisure, personal growth, and finance and career). Each guide should leave you with one thing you can do this week.</p>,
  },
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
  {
    h2: "Expert review",
    body: <p>Guides that touch on health, such as burnout, sleep and stress, are the ones where an outside check matters most. When a qualified expert has reviewed a guide, their name and credentials appear under its title as &ldquo;Reviewed by&rdquo;, with the date of the review. We only show a reviewer who has actually read and approved that guide.</p>,
  },
  {
    h2: "Not medical advice",
    body: <p>The guides are general information to help you notice and rebalance your life. They are not medical, psychological or financial advice. If you feel exhausted most days, low for more than two weeks, or unsafe, please talk to a doctor or a licensed therapist.</p>,
  },
  {
    h2: "Updates and corrections",
    body: <p>We update a guide when its advice or its sources change, and the &ldquo;Updated&rdquo; date shows the last real change, not a cosmetic one. If you spot a mistake or an outdated source, email <a href={`mailto:${FOOTER.email}`}>{FOOTER.email}</a> and we will check it and fix it.</p>,
  },
  {
    h2: "About Elegix in the guides",
    body: <p>Elegix is our own app, and the guides say so: most end with a short note on how the app helps with the topic. We don&apos;t take payment for mentioning other products, and the guides have no affiliate links.</p>,
  },
];

export default function HowWeWriteGuides() {
  return (
    <main>
      <Breadcrumbs name={TITLE} path="/guides/how-we-write-guides" parents={[{ name: "Guides", path: "/guides" }]} />
      <article className={`section ${styles.article}`} aria-labelledby="article-title">
        <header className={`container ${styles.head}`}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Elegix</Link><span aria-hidden="true">/</span><Link href="/guides">Guides</Link>
          </nav>
          <span className="label">Editorial policy</span>
          <h1 id="article-title" className={`display ${styles.title}`}>{TITLE}</h1>
          <p className={styles.lede}>The guides on this site are meant to be useful, honest and easy to check. Here is how we write them.</p>
        </header>
        <div className={`container ${styles.head}`} style={{ marginTop: "clamp(32px, 5vw, 56px)", display: "block" }}>
          <div className={styles.body}>
            {SECTIONS.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.body}
              </section>
            ))}
            <p><Link href="/guides">Back to all guides</Link></p>
          </div>
        </div>
      </article>
    </main>
  );
}
