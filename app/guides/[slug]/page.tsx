import { notFound } from "next/navigation";
import { GUIDES, guideBySlug, guideHref, relatedTo, midCtaTitle, areasOf, cardMeta } from "@/lib/guides";
import { Article, articleMetadata } from "@/components/ui/Article";

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const g = guideBySlug((await params).slug);
  return g ? articleMetadata(g, `/guides/${g.slug}`, true) : {};
}

export default async function GuidePage({ params }: Props) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();
  const related = relatedTo(g)
    .map((r) => ({ href: guideHref(r), label: cardMeta(r), areas: areasOf(r), title: r.title, media: r.media }));
  return <Article guide={g} path={`/guides/${g.slug}`} parent={{ name: "Guides", path: "/guides" }} related={related} areas={g.areas} promote midTitle={midCtaTitle(g)} />;
}
