import { SITE_URL } from "@/lib/site";

/** Structured data (schema.org JSON-LD) for search engines and AI answers. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

type Crumb = { name: string; path: string };

/** BreadcrumbList for an inner page: Elegix › (parents ›) name. Google shows it instead of the bare URL. */
export function Breadcrumbs({ name, path, parents = [] }: Crumb & { parents?: Crumb[] }) {
  const trail = [{ name: "Elegix", path: "/" }, ...parents, { name, path }];
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${SITE_URL}${c.path}` })),
    }} />
  );
}
