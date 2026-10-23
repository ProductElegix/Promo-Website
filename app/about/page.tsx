import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ABOUT_PAGE as A, APP, AREAS, AREA_ORDER, SOCIALS, STORY, TEAM, TRUST } from "@/lib/content";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { Pill, areaVars } from "@/components/ui/Pill";
import { Wheel } from "@/components/ui/Wheel";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Faq } from "@/components/sections/Faq";
import { Avatar } from "@/components/ui/Avatar";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { Principles } from "@/components/sections/Trust";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { OG_IMAGE } from "@/lib/site";
import { areaGuideHref } from "@/lib/guides";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: { absolute: A.meta.title },
  description: A.meta.description,
  alternates: { canonical: "/about" },
  openGraph: { title: A.meta.title, description: A.meta.description, url: "/about", siteName: "Elegix", type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: A.meta.title, description: A.meta.description, images: [OG_IMAGE] },
};

export default function About() {
  const lifeArea = APP.screens.find((s) => s.label === "Life Area") ?? APP.screens[0];
  const photo = TRUST.founder.media;
  return (
    <main>
      <Breadcrumbs name="About" path="/about" />
      {/* 1. Hero: what Elegix is and the mission */}
      <PhotoHero id="about-title" media={A.hero.media} eyebrow={A.hero.label} title={A.hero.title} lede={A.hero.lede} screen={lifeArea.media}>
        <a href="#join" className="btn lime">{A.hero.cta}</a>
      </PhotoHero>
      {/* 2. The 6 areas */}
      <section className="section" aria-labelledby="areas-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{A.areas.label}</span>
            <h2 id="areas-title" className="display h2"><Rich text={A.areas.title} /></h2>
            <p className="lede">{A.areas.lede}</p>
          </div>
          <ul className={styles.areas}>
            {AREA_ORDER.map((a) => (
              <li key={a} className={styles.area} style={areaVars(a)} data-reveal>
                <span className={styles.areaIcon} aria-hidden="true"><AreaIcon area={a} /></span>
                <h3>{AREAS[a].name}</h3>
                <p>{AREAS[a].description}</p>
                <Link href={areaGuideHref(a)} className={styles.areaLink}>Read the guide<span className="visually-hidden"> to {AREAS[a].name}</span> →</Link>
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
            <span className="label">{A.audience.label}</span>
            <h2 id="audience-title" className="display h2"><Rich text={A.audience.title} /></h2>
            <p className="lede">{A.audience.lede}</p>
          </div>
          <ul className={styles.audience}>
            {A.audience.items.map((a, i) => (
              <li key={a.title} className={styles.audienceCard} data-reveal>
                <span className={`num ${styles.n}`}>{String(i + 1).padStart(2, "0")}</span>
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
            <span className="label">{A.modes.label}</span>
            <h2 id="modes-title" className="display h2"><Rich text={A.modes.title} /></h2>
            <p className="lede">{A.modes.lede}</p>
          </div>
          <div className={styles.modes}>
            {A.modes.items.map((m, i) => (
              <div key={m.title} className={`${styles.mode} ${i === 0 ? styles.modeDark : ""}`} data-reveal>
                <div className={styles.modeHead}><h3>{m.title}</h3><span className={styles.time}>{m.time}</span></div>
                <ul>{m.points.map((p) => <li key={p}><span className={styles.tick} aria-hidden="true">✓</span>{p}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. The idea behind it */}
      <section className={`section ${styles.ideaSection}`} aria-labelledby="idea-title">
        <div className={`container ${styles.idea}`}>
          <div className={styles.ideaVisual} data-reveal>
            <div className={styles.wheel}><Wheel scores={[7, 6, 5, 6, 7, 8]} size={280} label="A wheel of life with 6 areas" /></div>
            <ul className={styles.chips}>{AREA_ORDER.map((a) => <li key={a}><Pill area={a} strong /></li>)}</ul>
          </div>
          <div className={styles.ideaText} data-reveal>
            <span className="label">{A.idea.label}</span>
            <h2 id="idea-title" className="display h2"><Rich text={A.idea.title} /></h2>
            <p className={styles.ideaP}>{A.idea.text}</p>
            <ul className={styles.points}>{A.idea.points.map((p) => <li key={p}><span className={styles.tick} aria-hidden="true">✓</span>{p}</li>)}</ul>
          </div>
        </div>
      </section>


      {/* 7. Pricing */}
      <section className={`section ${styles.pricingSection}`} aria-labelledby="pricing-title">
        <div className="container">
          <div className={styles.pricing} data-reveal>
            <span className="label">{A.pricing.label}</span>
            <h2 id="pricing-title" className="display h2"><Rich text={A.pricing.title} /></h2>
            <p className="lede">{A.pricing.text}</p>
          </div>
        </div>
      </section>

      {/* 8. Our story */}
      <section id={A.story.id} className="section" aria-labelledby="story-title" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className={`container ${styles.story}`}>
          <div className={styles.storyAside} data-reveal>
            {photo.src && <div className={styles.photo}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 860px) 100vw, 420px" /></div>}
            <p className={styles.founder}><b>{TRUST.founder.name}</b>, {TRUST.founder.role}</p>
          </div>
          <article className={styles.storyBody}>
            <span className="label">{A.story.label}</span>
            <h2 id="story-title" className="display h2"><Rich text={STORY.title} /></h2>
            {STORY.blocks.map((b, i) => {
              if (b.type === "lines") return <p key={i} className={styles.lines} data-reveal>{b.lines.map((l) => <span key={l}>{l}</span>)}</p>;
              if (b.type === "quote") return <blockquote key={i} className={styles.quote} data-reveal>{b.text}</blockquote>;
              return <p key={i} className={b.type === "lead" ? styles.lead : undefined} data-reveal>{b.text}</p>;
            })}
            <p className={styles.sign}>— {STORY.signature}</p>
          </article>
        </div>
      </section>

      {/* 9. Team */}
      <section id="team" className={`section ${styles.teamSection}`} aria-labelledby="team-title" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{TEAM.label}</span>
            <h2 id="team-title" className="display h2"><Rich text={TEAM.title} /></h2>
          </div>
          <ul className={styles.team}>
            {TEAM.members.map((m) => (
              <li key={m.name} className={styles.member} data-reveal>
                <Avatar name={m.name} photo={m.photo} size={420} className={styles.memberPhoto} />
                <div><h3>{m.name}</h3><p>{m.role}</p></div>
                {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener" className={styles.memberLink}>LinkedIn ↗</a>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. What we believe */}
      <section className={`section ${styles.beliefsSection}`} aria-labelledby="beliefs-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{A.beliefs.label}</span>
            <h2 id="beliefs-title" className="display h2"><Rich text={A.beliefs.title} /></h2>
          </div>
          <Principles className={styles.principles} />
          <div className={styles.public} data-reveal>
            <div><b>{A.publicBuild.title}</b><p>{A.publicBuild.text}</p></div>
            <ul>{SOCIALS.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener">{s.label}</a></li>)}</ul>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <Faq only={A.faq} />

      {/* 12. Early access */}
      <section id="join" className="section" aria-labelledby="cta-title" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container">
          <div className={`on-dark grain ${styles.cta}`} data-reveal>
            <h2 id="cta-title" className="display h2"><Rich text={A.cta.title} /></h2>
            <p className="lede">{A.cta.text}</p>
            <div className={styles.ctaForm}><WaitlistForm source="about" variant="glass" placeholder="Your email" buttonLabel={A.hero.cta} /></div>
          </div>
        </div>
      </section>

    </main>
  );
}
