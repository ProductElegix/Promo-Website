import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AUTHORS, authorBySlug } from "@/lib/authors";
import { TRUST } from "@/lib/content";
import { OG_IMAGE, SITE_URL, founderPerson } from "@/lib/site";
import { Breadcrumbs, JsonLd } from "@/components/ui/JsonLd";
import { GuideCards } from "@/components/ui/GuideCards";
import styles from "@/components/ui/Article.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => AUTHORS.map((a) => ({ slug: a.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = authorBySlug((await params).slug);
  if (!a) return {};
  const title = `${a.name}, ${a.role}`;
  const description = `${a.bio} Guides and stories by ${a.name} on Elegix.`.slice(0, 300);
  return {
    title, description,
    alternates: { canonical: `/authors/${a.slug}` },
    openGraph: { title: `${title} · Elegix`, description, url: `/authors/${a.slug}`, siteName: "Elegix", type: "profile", locale: "en_US", images: a.photo ? [{ url: a.photo, alt: a.name }] : [OG_IMAGE] },
  };
}

/** An author's page: who they are, their links, and everything they wrote on the site. */
export default async function AuthorPage({ params }: Props) {
  const a = authorBySlug((await params).slug);
  if (!a) notFound();
  const path = `/authors/${a.slug}`;
  const isFounder = a.name === TRUST.founder.name;
  const person = isFounder
    ? { ...founderPerson(TRUST.founder), url: `${SITE_URL}${path}`, description: a.bio }
    : { "@type": "Person", name: a.name, jobTitle: a.role, description: a.bio, url: `${SITE_URL}${path}`, ...(a.photo ? { image: `${SITE_URL}${a.photo}` } : {}), ...(a.linkedin ? { sameAs: [a.linkedin] } : {}) };
  return (
    <main>
      <Breadcrumbs name={a.name} path={path} parents={[{ name: "Guides", path: "/guides" }]} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: `${SITE_URL}${path}`,
        mainEntity: person,
        hasPart: a.writes.slice(0, 30).map((w) => ({ "@type": "Article", headline: w.title, url: `${SITE_URL}${w.href}`, dateModified: w.date })),
      }} />
      <section className={`section ${styles.article}`} aria-labelledby="author-title">
        <header className={`container ${styles.head}`}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/">Elegix</Link><span aria-hidden="true">/</span><Link href="/guides">Guides</Link>
          </nav>
          <div className={styles.author} style={{ width: "100%" }}>
            {a.photo && <div className={styles.authorPhoto}><Image src={a.photo} alt={a.name} fill sizes="96px" priority /></div>}
            <div>
              <h1 id="author-title" className={styles.authorName} style={{ fontSize: 28 }}>{a.name}</h1>
              <p className={styles.authorRole}>{a.role}</p>
              <p className={styles.authorBio}>{a.bio}</p>
              {a.linkedin && <a href={a.linkedin} target="_blank" rel="noopener me" className={styles.authorLink}>LinkedIn ↗</a>}
            </div>
          </div>
        </header>
      </section>
      <section className="section" aria-labelledby="author-writes" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 id="author-writes" className={styles.relatedTitle}>{a.writes.length} {a.writes.length === 1 ? "piece" : "pieces"} by {a.name.split(" ")[0]}</h2>
          <GuideCards cards={a.writes.map((w) => ({ href: w.href, title: w.title, text: w.text, media: w.media ?? OG_IMAGE_SLOT, meta: w.label, areas: w.areas }))} />
        </div>
      </section>
    </main>
  );
}

const OG_IMAGE_SLOT = { src: OG_IMAGE.url, alt: "", brief: "", ratio: "16 / 10" };
