import { AREA_GUIDES, GUIDES } from "@/lib/guides";
import { BRAND, META } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt: a short map of the site for AI assistants and AI search (llmstxt.org). */
export function GET() {
  const line = (path: string, title: string, text: string) => `- [${title}](${SITE_URL}${path}): ${text}`;
  const body = [
    "# Elegix",
    "",
    `> ${META.description}`,
    "",
    "Elegix is a free life balance tracker app for iOS and Android, currently in early access (waitlist). It links goals, habits and tasks to 6 life areas (Health, Relationships, Spirituality, Leisure, Personal Growth, Finance & Career), uses a 1-minute weekly check-in and a monthly review, and shows a Life Balance score.",
    "",
    `${BRAND.nameMeaning} Slogan: ${BRAND.slogan}`,
    "",
    "## Pages",
    line("/", "Home", "what Elegix does, the free Life Balance Check and the waitlist"),
    line("/about", "About", "the product, who it's for, pricing, the founder's story and the team"),
    "",
    "## Guides",
    ...GUIDES.map((g) => line(`/guides/${g.slug}`, g.title, g.description)),
    "",
    "## Life areas",
    ...AREA_GUIDES.map((g) => line(`/life-areas/${g.slug}`, g.title, g.description)),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
