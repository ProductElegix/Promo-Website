import { AREA_GUIDES, areaGuideBySlug } from "@/lib/guides";
import { OG_SIZE, articleOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Elegix life area guide";
export const dynamicParams = false;
export const generateStaticParams = () => AREA_GUIDES.map((g) => ({ area: g.slug }));

/** Share card for a life area page. */
export default async function Image({ params }: { params: Promise<{ area: string }> }) {
  const g = areaGuideBySlug((await params).area)!;
  return articleOgImage({ ...g, kind: "Life area" });
}
