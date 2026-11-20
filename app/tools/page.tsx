import type { Metadata } from "next";
import Link from "next/link";
import type { GuideToolName } from "@/lib/guides";
import { OG_IMAGE, SITE_URL } from "@/lib/site";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import { GuideTool } from "@/components/ui/GuideTool";
import { Join } from "@/components/sections/Join";
import styles from "@/components/ui/Article.module.css";

const TITLE = "Free life balance tools";
const DESCRIPTION = "Free tools to check your life balance: a Wheel of Life calculator and printable template, a 12-sign burnout check and a calculator for your free hours.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tools" },
  openGraph: { title: `${TITLE} · Elegix`, description: DESCRIPTION, url: "/tools", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
};

/** Every interactive tool from the guides on one page, each with a link to the guide that explains it. */
const TOOLS: { id: string; name: GuideToolName; h2: string; text: string; guide: { href: string; label: string } }[] = [
  { id: "wheel-calculator", name: "wheel-calculator", h2: "Wheel of Life calculator", text: "Score your 6 life areas from 1 to 10 and watch the shape of your wheel draw itself.", guide: { href: "/guides/wheel-of-life", label: "How to read your wheel" } },
  { id: "burnout-check", name: "burnout-check", h2: "Burnout self-check", text: "Tick the warning signs you recognise from the last month. It's a check-in, not a diagnosis.", guide: { href: "/guides/signs-of-burnout", label: "12 signs of burnout, explained" } },
  { id: "hours-calculator", name: "hours-calculator", h2: "Free hours calculator", text: "See how many hours a week you really have left after work, sleep and the basics.", guide: { href: "/guides/work-life-balance", label: "How to improve work-life balance" } },
  { id: "wheel-template", name: "wheel-template", h2: "Printable Wheel of Life template", text: "Prefer paper? Print the blank wheel and fill it in with a pen.", guide: { href: "/guides/wheel-of-life", label: "How to fill in the Wheel of Life" } },
];

export default function Tools() {
  return (
    <main>
      <Breadcrumbs name="Tools" path="/tools" parents={[{ name: "Guides", path: "/guides" }]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/tools`,
        mainEntity: { "@type": "ItemList", itemListElement: TOOLS.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.h2, url: `${SITE_URL}/tools#${t.id}` })) },
      }} />
      <article className={`section ${styles.article}`} aria-labelledby="article-title">
        <header className={`container ${styles.head}`}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Elegix</Link><span aria-hidden="true">/</span><Link href="/guides">Guides</Link>
          </nav>
          <span className="label">Free tools</span>
          <h1 id="article-title" className={`display ${styles.title}`}>Free tools to check your life balance</h1>
          <p className={styles.lede}>Quick, private check-ins you can do in a few minutes. Nothing you enter here is sent anywhere: the numbers stay in your browser. For a score by email, take the free <Link href="/#check">Life Balance Check</Link>.</p>
        </header>
        <div className={`container ${styles.head}`} style={{ marginTop: "clamp(32px, 5vw, 56px)", display: "block" }}>
          <div className={styles.body}>
            {TOOLS.map((t) => (
              <section key={t.id} id={t.id}>
                <h2>{t.h2}</h2>
                <p>{t.text}</p>
                <div data-tool={t.name}><GuideTool name={t.name} /></div>
                <p><Link href={t.guide.href}>{t.guide.label}</Link></p>
              </section>
            ))}
          </div>
        </div>
      </article>
      <Join />
    </main>
  );
}
