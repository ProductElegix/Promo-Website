import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { GuideCards } from "@/components/ui/GuideCards";
import { Rich } from "@/components/ui/Rich";

/** The 3 main guides, linked from the home page so they get its weight, not only the menu's. */
const POPULAR = ["wheel-of-life", "signs-of-burnout", "work-life-balance"];

export function PopularGuides() {
  const guides = POPULAR.map((slug) => GUIDES.find((g) => g.slug === slug)!);
  return (
    <section id="guides" className="section" aria-labelledby="guides-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="label">Popular guides</span>
          <h2 id="guides-title" className="display h2"><Rich text="Start with the *basics*" /></h2>
        </div>
        <GuideCards cards={guides.map((g) => ({ href: `/guides/${g.slug}`, title: g.title, text: g.description, media: g.media, meta: `${g.minutes} min read` }))} />
        <p style={{ marginTop: 32, textAlign: "center" }}><Link href="/guides" className="btn">All guides</Link></p>
      </div>
    </section>
  );
}
