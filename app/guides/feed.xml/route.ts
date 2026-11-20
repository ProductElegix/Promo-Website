import { AREA_GUIDES, GUIDES, guideHref } from "@/lib/guides";
import { TRUST } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (d: string) => new Date(`${d}T12:00:00Z`).toUTCString();

/** RSS 2.0 feed of every guide and life area page, newest first, at /guides/feed.xml. */
export function GET() {
  const items = [...GUIDES, ...AREA_GUIDES].sort((a, b) => b.published.localeCompare(a.published) || b.updated.localeCompare(a.updated));
  const latest = items.reduce((m, g) => (g.updated > m ? g.updated : m), "1970-01-01");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>Elegix guides</title>
  <link>${SITE_URL}/guides</link>
  <atom:link href="${SITE_URL}/guides/feed.xml" rel="self" type="application/rss+xml" />
  <description>Practical guides on burnout, work-life balance, goals and the 6 areas of life, from Elegix.</description>
  <language>en</language>
  <lastBuildDate>${rfc822(latest)}</lastBuildDate>
${items.map((g) => {
    const url = `${SITE_URL}${guideHref(g)}`;
    return `  <item>
    <title>${esc(g.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${rfc822(g.published)}</pubDate>
    <dc:creator>${esc(TRUST.founder.name)}</dc:creator>
    <description>${esc(g.description)}</description>${g.media.src ? `
    <enclosure url="${SITE_URL}${g.media.src}" type="image/jpeg" length="0" />` : ""}
  </item>`;
  }).join("\n")}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
