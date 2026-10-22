import { notFound } from "next/navigation";
import { AREA_GUIDES, areaGuideBySlug, areaGuideHref } from "@/lib/guides";
import { Article, articleMetadata } from "@/components/ui/Article";

export const dynamicParams = false;
export const generateStaticParams = () => AREA_GUIDES.map((g) => ({ area: g.slug }));

type Props = { params: Promise<{ area: string }> };

export async function generateMetadata({ params }: Props) {
  const g = areaGuideBySlug((await params).area);
  return g ? articleMetadata(g, `/life-areas/${g.slug}`) : {};
}

/** One of the 6 life areas; "Keep reading" links to the other five. */
export default async function AreaPage({ params }: Props) {
  const g = areaGuideBySlug((await params).area);
  if (!g) notFound();
  const related = AREA_GUIDES.filter((o) => o.slug !== g.slug)
    .map((o) => ({ href: areaGuideHref(o.area), label: o.label.replace("Life area · ", "Life area: "), title: o.title }));
  return <Article guide={g} path={`/life-areas/${g.slug}`} parent={{ name: "Life areas", path: "/life-areas" }} related={related} />;
}
