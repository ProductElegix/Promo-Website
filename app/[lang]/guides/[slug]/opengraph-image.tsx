import { AREA_GUIDES, GUIDES, guidesOf } from "@/lib/guides";
import { OG_SIZE, articleOgImage } from "@/lib/og";
import { paramsLang } from "@/lib/meta";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Elegix guide";
export const dynamicParams = false;
export const generateStaticParams = () => [...GUIDES, ...AREA_GUIDES].map((g) => ({ slug: g.slug }));

/** Share card for a guide or a life area page: its photo, title, area and read time. */
export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const lang = await paramsLang(params);
  const { slug } = await params;
  const set = guidesOf(lang);
  const area = set.areaGuideBySlug(slug);
  if (area) return articleOgImage({ ...area, areas: [area.area], kind: lang === "uk" ? "Сфера життя" : "Life area" }, lang);
  const g = set.guideBySlug(slug)!;
  return articleOgImage({ ...g, kind: lang === "uk" ? "Гайд" : "Guide" }, lang);
}
