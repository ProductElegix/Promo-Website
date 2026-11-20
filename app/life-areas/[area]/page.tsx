import Link from "next/link";
import { notFound } from "next/navigation";
import { AREA_GUIDES, GUIDES, areaGuideBySlug, areaGuideHref, guideHref, guidesForArea, midCtaTitle, areasOf, cardMeta } from "@/lib/guides";
import { AREAS } from "@/lib/content";
import { Article, articleMetadata } from "@/components/ui/Article";
import { GuideCards } from "@/components/ui/GuideCards";
import styles from "@/app/guides/hub.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => AREA_GUIDES.map((g) => ({ area: g.slug }));

type Props = { params: Promise<{ area: string }> };

export async function generateMetadata({ params }: Props) {
  const g = areaGuideBySlug((await params).area);
  return g ? articleMetadata(g, `/life-areas/${g.slug}`, true) : {};
}

/** The home of one life area: the overview header, every guide about this area right under it, then the full write-up
 *  and "Keep reading" links to the other five areas. */
export default async function AreaPage({ params }: Props) {
  const g = areaGuideBySlug((await params).area);
  if (!g) notFound();
  const name = AREAS[g.area].short;
  const related = AREA_GUIDES.filter((o) => o.slug !== g.slug)
    .map((o) => ({ href: areaGuideHref(o.area), label: cardMeta(o), areas: areasOf(o), title: o.title, media: o.media }));
  const guides = guidesForArea(g.area);
  const whole = GUIDES.filter((o) => !o.areas.length).length;
  const hub = (
    <section className={`container ${styles.areaHub}`} aria-labelledby="area-guides-title">
      <div className={styles.areaHubHead}>
        <h2 id="area-guides-title" className={styles.areaHubTitle}>Guides about {name.toLowerCase()} <span>{guides.length}</span></h2>
        <a href="#article-body" className={styles.areaHubSkip}>Read the {name.toLowerCase()} overview ↓</a>
      </div>
      {guides.length
        ? <GuideCards rows cards={guides.map((o) => ({ href: guideHref(o), title: o.title, text: o.description, media: o.media, meta: cardMeta(o), areas: areasOf(o) }))} />
        : <p className={styles.empty}>Guides about {name.toLowerCase()} are on the way. Until then, the overview below covers the basics.</p>}
      {whole > 0 && <p className={styles.areaHubMore}><Link href="/guides?area=whole">{whole} more guides look at all 6 areas together →</Link></p>}
    </section>
  );
  return <Article guide={g} path={`/life-areas/${g.slug}`} parent={{ name: "Life areas", path: "/life-areas" }} related={related} promote midTitle={midCtaTitle(g)} hub={hub} />;
}
