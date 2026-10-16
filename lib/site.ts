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
