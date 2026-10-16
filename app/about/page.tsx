import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ABOUT_PAGE as A, APP, AREAS, AREA_ORDER, SOCIALS, STORY, TRUST } from "@/lib/content";
import { AreaIcon } from "@/components/ui/AreaIcon";
import { Pill, areaVars } from "@/components/ui/Pill";
import { Rich } from "@/components/ui/Rich";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { Wheel } from "@/components/ui/Wheel";
import { Faq } from "@/components/sections/Faq";
import { Principles } from "@/components/sections/Trust";
import { PhotoHero } from "@/components/sections/PhotoHero";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: A.meta.title,
  description: A.meta.description,
  alternates: { canonical: "/about" },
  openGraph: { title: `${A.meta.title} · Elegix`, description: A.meta.description, url: "/about" },
};

export default function About() {
  const lifeArea = APP.screens.find((s) => s.label === "Life Area") ?? APP.screens[0];
  const photo = TRUST.founder.media;
  return (
    <main>
      {/* 1. Hero, same style as the home page */}
      <PhotoHero id="about-title" media={A.hero.media} eyebrow={A.hero.label} title={A.hero.title} lede={A.hero.lede} screen={lifeArea.media}>
        <div className={styles.ctas}>
          <a href="#join" className="btn lime">{A.hero.cta}</a>
          <Link href={A.hero.secondary.href} className="btn ghost">{A.hero.secondary.label}</Link>
        </div>
      </PhotoHero>
      <section className={styles.factsSection} aria-label="Elegix in numbers">
        <dl className={`container ${styles.facts}`}>
          {A.hero.facts.map((f) => (
            <div key={f.label}><dt className="visually-hidden">{f.label}</dt><dd className={styles.factValue}>{f.value}</dd><dd className={styles.factLabel}>{f.label}</dd></div>
          ))}
        </dl>
      </section>

      {/* 2. What you get */}
      <section className="section" aria-labelledby="features-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="label">{A.features.label}</span>
            <h2 id="features-title" className="display h2"><Rich text={A.features.title} /></h2>
          </div>
          <ul className={styles.features}>
            {A.features.items.map((f) => (
              <li key={f.title} className={styles.feature} style={areaVars(f.icon)} data-reveal>
                <span className={styles.icon} aria-hidden="true"><AreaIcon area={f.icon} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Who it's for */}
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
                <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Two ways to use it */}
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

      {/* 5. The idea behind it */}
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

      {/* 6. Our story */}
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

      {/* 7. What we believe */}
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

      {/* 8. Early access */}
      <section id="join" className="section" aria-labelledby="cta-title" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container">
          <div className={`on-dark grain ${styles.cta}`} data-reveal>
            <h2 id="cta-title" className="display h2"><Rich text={A.cta.title} /></h2>
            <p className="lede">{A.cta.text}</p>
            <div className={styles.ctaForm}><WaitlistForm source="about" variant="glass" placeholder="Your email" buttonLabel={A.hero.cta} /></div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <Faq />
    </main>
  );
}
