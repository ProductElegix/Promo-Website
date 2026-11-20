import { GUIDES, guideBySlug } from "@/lib/guides";
import { OG_SIZE, articleOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Elegix guide";
export const dynamicParams = false;
export const generateStaticParams = () => GUIDES.map((g) => ({ slug: g.slug }));

/** Share card for a guide: its photo, title, area and read time. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideBySlug((await params).slug)!;
  return articleOgImage({ ...g, kind: "Guide" });
}
