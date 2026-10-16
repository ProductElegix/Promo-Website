import { SITE_URL } from "@/lib/site";

/** Structured data (schema.org JSON-LD) for search engines and AI answers. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** BreadcrumbList for an inner page: Elegix › name. Google shows it instead of the bare URL. */
export function Breadcrumbs({ name, path }: { name: string; path: string }) {
  return (
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Elegix", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
      ],
    }} />
  );
}
