/**
 * Public URL and indexing switch, used by metadata, robots.txt, sitemap.xml and structured data.
 * NEXT_PUBLIC_SITE_URL wins when set. Otherwise it's the primary domain: elegix.net redirects to www in Vercel,
 * so every canonical URL, the sitemap and structured data point at www.elegix.net.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.elegix.net").replace(/\/$/, "");

/** Only production is indexed; previews (the dev branch) and local builds ask search engines to stay away. */
export const INDEXABLE = process.env.VERCEL_ENV === "production" || process.env.SITE_INDEXABLE === "yes";

/** The share image from app/opengraph-image.jpg, for pages that set their own openGraph (which replaces the inherited one). */
export const OG_IMAGE = { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Elegix, the life balance tracker: Crushing it at work. Losing the rest?" };

/** Stable id of the founder's Person node, shared by the site graph and every article's author. */
export const FOUNDER_ID = `${SITE_URL}/about#edward`;

/** The founder as a schema.org Person, used in the site graph and as every article's author. */
export function founderPerson(f: { name: string; role: string; profiles: string[]; knowsAbout: string[]; media: { src?: string } }) {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: f.name,
    url: `${SITE_URL}/about#story`,
    ...(f.media.src ? { image: `${SITE_URL}${f.media.src}` } : {}),
    jobTitle: f.role,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    knowsAbout: f.knowsAbout,
    ...(f.profiles.length ? { sameAs: f.profiles } : {}),
  };
}
