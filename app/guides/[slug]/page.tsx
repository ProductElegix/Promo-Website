import { notFound } from "next/navigation";
import { GUIDES, guideBySlug } from "@/lib/guides";
import { Article, articleMetadata } from "@/components/ui/Article";

export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const g = guideBySlug((await params).slug);
  return g ? articleMetadata(g, `/guides/${g.slug}`) : {};
}

export default async function GuidePage({ params }: Props) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();
  const related = g.related.map(guideBySlug).filter((r) => r !== undefined)
    .map((r) => ({ href: `/guides/${r.slug}`, label: `${r.minutes} min read`, title: r.title }));
  return <Article guide={g} path={`/guides/${g.slug}`} parent={{ name: "Guides", path: "/guides" }} related={related} />;
}
