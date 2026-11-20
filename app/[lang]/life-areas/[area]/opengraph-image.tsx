import { AREA_GUIDES, guidesOf } from "@/lib/guides";
import { OG_SIZE, articleOgImage } from "@/lib/og";
import { paramsLang } from "@/lib/meta";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Elegix life area guide";
export const dynamicParams = false;
export const generateStaticParams = () => AREA_GUIDES.map((g) => ({ area: g.slug }));

/** Share card for a life area page. */
export default async function Image({ params }: { params: Promise<{ lang: string; area: string }> }) {
  const lang = await paramsLang(params);
  const g = guidesOf(lang).areaGuideBySlug((await params).area)!;
  return articleOgImage({ ...g, areas: [g.area], kind: lang === "uk" ? "Сфера життя" : "Life area" }, lang);
}
