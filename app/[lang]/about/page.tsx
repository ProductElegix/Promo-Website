import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/ui/Lang";
import { AREA_ORDER, type AreaKey } from "@/lib/content";
import { contentOf } from "@/lib/l10n";
import { getContent } from "@/lib/lang";
import { langMeta } from "@/lib/meta";
import { isLang } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { WordCycle } from "./WordCycle";
import { Wheel3D } from "@/components/ui/Wheel3D";
import { Faq } from "@/components/sections/Faq";
import { Avatar } from "@/components/ui/Avatar";
import { Rich } from "@/components/ui/Rich";
import { Media } from "@/components/ui/Media";
import { Join } from "@/components/sections/Join";
import { StatementSection, StatementStrip } from "@/components/sections/Opening";
import { Principles } from "@/components/sections/Trust";
import { PhotoHero } from "@/components/sections/PhotoHero";
import { Breadcrumbs } from "@/components/ui/JsonLd";
import { OG_IMAGE } from "@/lib/site";
import { storyHref } from "@/lib/stories";
import { storiesOf } from "@/lib/stories-l10n";
import styles from "./about.module.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: l } = await params;
  const lang = isLang(l) ? l : "en";
  const A = contentOf(lang).ABOUT_PAGE;
  const lm = langMeta(lang, "/about");
  return {
    title: { absolute: A.meta.title },
    description: A.meta.description,
    alternates: lm.alternates,
    ...(lm.robots ? { robots: lm.robots } : {}),
    openGraph: { title: A.meta.title, description: A.meta.description, url: lm.url, siteName: "Elegix", type: "website", locale: lm.locale, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: A.meta.title, description: A.meta.description, images: [OG_IMAGE] },
  };
}

export default async function About() {
  const { lang, c: { ABOUT_PAGE: A, AREAS, SOCIALS, STORY, TEAM, TRUST } } = await getContent();
  const t = ui(lang);
  return (
    <main>
      <Breadcrumbs name={t.about} path={langMeta(lang, "/about").url} />
      {/* 1. Hero: what Elegix is and who is behind it */}
      <PhotoHero id="about-title" media={A.hero.media} eyebrow={A.hero.label} title={A.hero.title} lede={A.hero.lede}>
        <a href="#join" className="btn lime">{A.hero.cta}</a>
        <p className={styles.who}>{A.hero.who}</p>
      </PhotoHero>

      {/* 2. Mission, revealed word by word, with the photo strip */}
      <StatementSection>
        <StatementStrip label={A.hero.mission.label} text={A.hero.mission.text} photos={A.hero.strip} />
      </StatementSection>

      {/* 3. The founder story: why it exists */}
      <section id={A.story.id} className="section" aria-labelledby="story-title" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className={`container ${styles.story}`}>
          <div className={styles.storyAside} data-reveal>
            <div className={`on-dark ${styles.stat}`}>
              <b className={styles.statValue}><span data-count={A.storyStat.value}>{A.storyStat.value}</span>{A.storyStat.unit}</b>
              <p>{A.storyStat.caption}</p>
            </div>
            <p className={styles.founder}><b>{TRUST.founder.name}</b>, {TRUST.founder.role}</p>
          </div>
          <div className={styles.storyBody}>
            <span className="label">{A.story.label}</span>
            <h2 id="story-title" className="display h2"><Rich text={STORY.title} /></h2>
            {STORY.blocks.map((b, i) => {
              if (b.type === "lines") return <p key={i} className={styles.lines} data-reveal>{b.lines.map((l) => <span key={l}>{l}</span>)}</p>;
              if (b.type === "quote") return <blockquote key={i} className={styles.quote} data-reveal>{b.text}</blockquote>;
              return <p key={i} className={b.type === "lead" ? styles.lead : undefined} data-reveal>{b.text}</p>;
            })}
            <p className={styles.sign}>{STORY.signature}</p>
            <Link href={STORY.more.href} className={`btn ${styles.storyMore}`} data-reveal>{STORY.more.label}</Link>
          </div>
        </div>
      </section>

      {/* 4. How it works: a scroll story, the 3D wheel stays on screen while See, Act and Reflect change it */}
      <section id="how" className={`section ${styles.howSection}`} aria-labelledby="how-title">
        <div className="container">
          <div className={`section-head ${styles.center}`} data-reveal>
            <span className="label">{A.how.label}</span>
            <h2 id="how-title" className="display h2"><Rich text={A.how.title} /></h2>
            <p className="lede">{A.how.lede}</p>
          </div>
          <div className={styles.scrolly}>
            <div className={styles.stage}>
              <Wheel3D scores={A.how.wheel.scores} prev={A.how.wheel.prev} text={A.how.wheel}
                names={Object.fromEntries(AREA_ORDER.map((a) => [a, AREAS[a].short])) as Record<AreaKey, string>} />
            </div>
            <ol className={styles.chapters}>
              {A.how.steps.map((st, i) => (
                <li key={st.title} className={styles.chapter} data-wheel-step={i}>
                  <span className={`num ${styles.stepN}`}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{st.title}</h3>
                  <p>{st.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className={styles.rhythmLine} data-reveal>
            {A.how.rhythm.map((r) => <span key={r.title}><b>{r.time}</b> {r.title.toLowerCase()}</span>)}
          </p>
        </div>
      </section>

      {/* 5. Who it's for */}
      <section className="section" aria-labelledby="audience-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className={`section-head ${styles.center}`} data-reveal>
            <span className="label">{A.audience.label}</span>
            <h2 id="audience-title" className="display h2"><Rich text={A.audience.title} /></h2>
            <p className="lede">{A.audience.lede}</p>
          </div>
          <ul className={styles.audience}>
            {A.audience.items.map((a) => (
              <li key={a.title} className={styles.audienceCard} data-reveal>
                <div className={`zoom ${styles.audiencePhoto}`}>
                  <Image src={a.src} alt={a.alt} fill sizes="(max-width: 860px) 100vw, 33vw" />
                  <blockquote className={styles.audienceQuote}>{a.quote}</blockquote>
                </div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Where we are: the road to launch */}
      <section className={`section on-dark ${styles.dark}`} aria-labelledby="stage-title">
        <div className="container">
          <div className={`section-head ${styles.center}`} data-reveal>
            <span className="label">{A.stage.label}</span>
            <h2 id="stage-title" className="display h2"><Rich text={A.stage.title} /></h2>
            <p className="lede">{A.stage.lede}</p>
          </div>
          <ol className={styles.timeline} data-timeline>
            <span className={styles.timelineTrack} aria-hidden="true"><span className={styles.timelineFill} data-timeline-fill style={{ ["--done" as string]: `${(A.stage.steps.findIndex((x) => x.current) + 0.5) / A.stage.steps.length}` }} /></span>
            {A.stage.steps.map((st) => (
              <li key={st.title} className={`${styles.milestone} ${st.current ? styles.current : ""}`} data-milestone aria-current={st.current ? "step" : undefined}>
                <span className={styles.dot} aria-hidden="true" />
                {st.current && <span className={styles.now}>{A.stage.now}</span>}
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7. Team */}
      <section id="team" className="section" aria-labelledby="team-title" style={{ scrollMarginTop: "var(--header-h)" }}>
        <div className="container">
          <div className={`section-head ${styles.center}`} data-reveal>
            <span className="label">{TEAM.label}</span>
            <h2 id="team-title" className="display h2"><Rich text={TEAM.title} /></h2>
            <ul className={styles.teamFacts}>{A.teamFacts.map((f) => <li key={f}>{f}</li>)}</ul>
          </div>
          <ul className={styles.team}>
            {TEAM.members.map((m) => (
              <li key={m.name} className={styles.member} data-reveal>
                <Avatar name={m.name} photo={m.photo} size={420} className={styles.memberPhoto} />
                <div><h3>{m.name}</h3><p>{m.role}</p>{m.bio && <p className={styles.memberBio}>{m.bio}</p>}</div>
                {(() => {
                  const story = storiesOf(lang).storyByPerson(m.name);
                  if (!story && !m.linkedin) return null;
                  return (
                    <div className={styles.memberLinks}>
                      {story && <Link href={storyHref(story)} className={styles.memberLink}>{t.readStory}<span className="visually-hidden"> ({m.name})</span></Link>}
                      {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener" className={styles.memberLink}>LinkedIn</a>}
                    </div>
                  );
                })()}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. What we believe */}
      <section className={`section ${styles.beliefsSection}`} aria-labelledby="beliefs-title">
        <div className="container">
          <div className={`section-head ${styles.center}`} data-reveal>
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

      {/* 9. Pricing over a full-bleed photo */}
      <section className={`on-dark ${styles.pf}`} data-theme="dark" aria-labelledby="pricing-title">
        <div className={styles.pfStage}>
          <div className={styles.pfPhoto} data-parallax data-scale-in><Media media={A.photo} fill sizes="100vw" /></div>
          <div className={`container ${styles.pfInner}`} data-reveal>
            <span className="label">{A.pricing.label}</span>
            <h2 id="pricing-title" className={`display h2 ${styles.pfTitle}`}><Rich text={A.pricing.title} /></h2>
            <p className={styles.pfText}>{A.pricing.text}</p>
          </div>
        </div>
      </section>

      {/* 10. Why the name: "choose" in other languages, landing on elegix */}
      <section className={`section ${styles.nameSection}`} aria-labelledby="name-title">
        <div className={`container ${styles.name}`}>
          <span className="label" data-reveal>{A.name.label}</span>
          <h2 id="name-title" className="visually-hidden">{A.name.title}</h2>
          <p className={styles.nameLine} data-reveal>
            <WordCycle words={A.name.words} />
            <span className={styles.nameEq} aria-hidden="true">=</span>
            <span className={styles.nameMeaning} aria-hidden="true">{A.name.meaning}</span>
          </p>
          <p className={styles.nameText} data-reveal>{A.name.text[0]}<i lang="ca-valencia">{A.name.text[1]}</i>{A.name.text[2]}</p>
        </div>
      </section>

      {/* 11. Questions about the company */}
      <Faq items={A.faq.items} title={A.faq.title} />

      {/* 12. Early access (same block as the home page) */}
      <Join />
    </main>
  );
}
