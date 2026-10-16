import type { Metadata } from "next";
import { AREAS, AREA_ORDER, WHAT_IS as W, APP } from "@/lib/content";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { Pill, areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { Wheel } from "@/components/ui/Wheel";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Compare } from "@/components/sections/Compare";
import { Faq } from "@/components/sections/Faq";
import { OG_IMAGE } from "@/lib/site";
import styles from "../about/about.module.css";
import own from "./what.module.css";

export const metadata: Metadata = {
  title: { absolute: W.meta.title },
  description: W.meta.description,
  alternates: { canonical: "/what-is-elegix" },
  openGraph: { title: W.meta.title, description: W.meta.description, url: "/what-is-elegix", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: W.meta.title, description: W.meta.description, images: [OG_IMAGE] },
};

/** The product page: what Elegix is, how it works and who it's for. One CTA (the form at the bottom). */
export default function WhatIsElegix() {
  const lifeArea = APP.screens.find((s) => s.label === "Life Area") ?? APP.screens[0];
  return (
    <main>
      <Breadcrumbs name="What is Elegix" path="/what-is-elegix" />
      {/* 1. Hero */}
      <PhotoHero id="what-title" media={W.hero.media} eyebrow={W.hero.label} title={W.hero.title} lede={W.hero.lede} screen={lifeArea.media}>
        <a href="#join" className="btn lime">{W.hero.cta}</a>
      </PhotoHero>
      <section className={styles.factsSection} aria-label="Elegix in numbers">
        <dl className={`container ${styles.facts}`}>
          {W.facts.map((f) => (
            <div key={f.label}><dt className="visually-hidden">{f.label}</dt><dd className={styles.factValue}>{f.value}</dd><dd className={styles.factLabel}>{f.label}</dd></div>
          ))}
        </dl>
      </section>

      {/* 2. The 6 areas */}
      <section className="section" aria-labelledby="areas-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{W.areas.label}</span>
            <h2 id="areas-title" className="display h2"><Rich text={W.areas.title} /></h2>
            <p className="lede">{W.areas.lede}</p>
          </div>
          <ul className={own.areas}>
            {AREA_ORDER.map((a) => (
              <li key={a} className={own.area} style={areaVars(a)} data-reveal>
                <span className={own.areaIcon} aria-hidden="true"><AreaIcon area={a} /></span>
                <h3>{AREAS[a].name}</h3>
                <p>{AREAS[a].description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. How it works (same cards as the home page) */}
      <HowItWorks learnMore={false} chips={false} />

      {/* 4. Who it's for */}
      <section className={`section on-dark ${styles.dark}`} aria-labelledby="audience-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{W.audience.label}</span>
            <h2 id="audience-title" className="display h2"><Rich text={W.audience.title} /></h2>
            <p className="lede">{W.audience.lede}</p>
          </div>
          <ul className={styles.audience}>
            {W.audience.items.map((a, i) => (
              <li key={a.title} className={styles.audienceCard} data-reveal>
                <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. The rhythm */}
      <section className="section" aria-labelledby="modes-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{W.modes.label}</span>
            <h2 id="modes-title" className="display h2"><Rich text={W.modes.title} /></h2>
            <p className="lede">{W.modes.lede}</p>
          </div>
          <div className={styles.modes}>
            {W.modes.items.map((m, i) => (
              <div key={m.title} className={`${styles.mode} ${i === 0 ? styles.modeDark : ""}`} data-reveal>
                <div className={styles.modeHead}><h3>{m.title}</h3><span className={styles.time}>{m.time}</span></div>
                <ul>{m.points.map((p) => <li key={p}><span className={styles.tick} aria-hidden="true">✓</span>{p}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Compared with to-do apps */}
      <Compare />

      {/* 7. The idea behind it */}
      <section className={`section ${styles.ideaSection}`} aria-labelledby="idea-title">
        <div className={`container ${styles.idea}`}>
          <div className={styles.ideaVisual} data-reveal>
            <div className={styles.wheel}><Wheel scores={[7, 6, 5, 6, 7, 8]} size={280} label="A wheel of life with 6 areas" /></div>
            <ul className={styles.chips}>{AREA_ORDER.map((a) => <li key={a}><Pill area={a} strong /></li>)}</ul>
          </div>
          <div className={styles.ideaText} data-reveal>
            <span className="label">{W.idea.label}</span>
            <h2 id="idea-title" className="display h2"><Rich text={W.idea.title} /></h2>
            <p className={styles.ideaP}>{W.idea.text}</p>
            <ul className={styles.points}>{W.idea.points.map((p) => <li key={p}><span className={styles.tick} aria-hidden="true">✓</span>{p}</li>)}</ul>
          </div>
        </div>
      </section>


      {/* 8. What's inside */}
      <section className="section" aria-labelledby="inside-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{W.inside.label}</span>
            <h2 id="inside-title" className="display h2"><Rich text={W.inside.title} /></h2>
          </div>
          <ul className={styles.features}>
            {W.inside.items.map((f) => (
              <li key={f.title} className={styles.feature} style={areaVars(f.icon)} data-reveal>
                <span className={styles.icon} aria-hidden="true"><AreaIcon area={f.icon} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9. Pricing */}
      <section className={`section ${own.pricingSection}`} aria-labelledby="pricing-title">
        <div className="container">
          <div className={own.pricing} data-reveal>
            <span className="label">{W.pricing.label}</span>
            <h2 id="pricing-title" className="display h2"><Rich text={W.pricing.title} /></h2>
            <p className="lede">{W.pricing.text}</p>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <Faq only={W.faq} />

      {/* 11. Early access */}
      <section id="join" className="section" aria-labelledby="cta-title" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container">
          <div className={`on-dark grain ${styles.cta}`} data-reveal>
            <h2 id="cta-title" className="display h2"><Rich text={W.cta.title} /></h2>
            <p className="lede">{W.cta.text}</p>
            <div className={styles.ctaForm}><WaitlistForm source="what-is" variant="glass" placeholder="Your email" buttonLabel={W.hero.cta} /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
