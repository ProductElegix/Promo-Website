import { GUIDES, guidesOf } from "@/lib/guides";
import { OG_SIZE, articleOgImage } from "@/lib/og";
import { paramsLang } from "@/lib/meta";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Elegix guide";
export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

/** Share card for a guide: its photo, title, area and read time. */
export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const lang = await paramsLang(params);
  const g = guidesOf(lang).guideBySlug((await params).slug)!;
  return articleOgImage({ ...g, kind: lang === "uk" ? "Гайд" : "Guide" }, lang);
}
