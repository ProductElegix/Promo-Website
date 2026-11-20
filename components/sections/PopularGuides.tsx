import Link from "@/components/ui/Lang";
import { guidesOf, areasOf, cardMeta, guideHref } from "@/lib/guides";
import { getLang } from "@/lib/lang";
import { ui } from "@/lib/ui";
import { GuideCards } from "@/components/ui/GuideCards";
import { Rich } from "@/components/ui/Rich";

/** The 3 main guides, linked from the home page so they get its weight, not only the menu's. */
const POPULAR = ["wheel-of-life", "signs-of-burnout", "work-life-balance"];

export async function PopularGuides() {
  const lang = await getLang();
  const t = ui(lang);
  const { GUIDES } = guidesOf(lang);
  const guides = POPULAR.map((slug) => GUIDES.find((g) => g.slug === slug)!);
  return (
    <section id="guides" className="section" aria-labelledby="guides-title">
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="label">{t.popularGuides}</span>
          <h2 id="guides-title" className="display h2"><Rich text={t.startWithBasics} /></h2>
        </div>
        <GuideCards cards={guides.map((g) => ({ href: guideHref(g), title: g.title, text: g.description, media: g.media, meta: cardMeta(g, lang), areas: areasOf(g) }))} />
        <p style={{ marginTop: 32, textAlign: "center" }}><Link href="/guides" className="btn">{t.allGuides}</Link></p>
      </div>
    </section>
  );
}
