/**
 * The blog (/blog): personal, first-person posts by people on the team about how we work and what we try.
 * Guides (lib/guides.ts) are the reference library; the blog is the opposite: one person's view, in their
 * own words, no tools or calculators in the middle of the text.
 *
 * English lives here, Ukrainian in lib/uk/blog.ts (same slugs, same order). Each post renders with the
 * Article layout with a real photo as its cover (an <img> search engines and share cards pick up),
 * and optional comments from the team. Only inside the article: never as the background of a card or banner.
 *
 * Drafts: `{ todo }` blocks and comments with `draft: true` are placeholders for the author. They show
 * on previews with a yellow "Draft" mark and are left out in production (lib/drafts.ts), so nothing made
 * up is ever presented on the live site as a real fact or a real quote.
 */
import type { Block, Guide } from "@/lib/guides";
import type { MediaSlot } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { contentOf } from "@/lib/l10n";
import { SHOW_DRAFTS } from "@/lib/drafts";
import { UK_POSTS } from "@/lib/uk/blog";

/** A comment from someone on the team under a post. */
export type TeamComment = {
  /** the person's English name, as in TEAM.members (lib/content.ts) */
  person: string;
  text: string;
  /** TODO placeholder words, not what the person said: shown on previews only, never in production */
  draft?: boolean;
};

export type BlogPost = Omit<Guide, "related" | "areas"> & {
  /** the author's English name, as in TEAM.members */
  person: string;
  /** paragraphs between the cover and the first heading */
  intro: Block[];
  comments?: TeamComment[];
  /** slugs of guides to link at the end */
  related: string[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "four-day-week-wednesday-off",
    person: "Edward Korytskyi",
    title: "Why we work four days a week, with Wednesday off",
    metaTitle: "Why Elegix works a four-day week with Wednesday off",
    description: "Elegix founder Edward Korytskyi on why the team has worked four days a week from day one, why the day off is Wednesday and not Friday, and what it changed: less burnout, more done in life and in careers.",
    label: "Blog",
    lede: "Not Friday, Wednesday. And no, it's not because we're lazy.",
    published: "2026-11-25",
    updated: "2026-11-25",
    minutes: 5,
    // TODO(Edward): swap for a real photo of the team or of your own Wednesday (ideally 2400×1600), see the PR.
    media: { src: "/images/area-health.jpg", alt: "A man running on a track at sunrise", brief: "Blog cover · a real midweek morning", ratio: "3 / 2", position: "50% 60%" } satisfies MediaSlot,
    intro: [
      { p: "At Elegix we work four days a week. Our day off isn't Friday, like most people expect, but Wednesday. Whenever I tell someone this, they ask twice: first about the four days, then about Wednesday. So I decided to write it all down once, honestly and in detail." },
    ],
    sections: [
      {
        h2: "I believed in hours for a long time",
        blocks: [
          { p: "For a few years I worked 16, sometimes 20 hours a day. I was sure that more hours meant more results. Once I didn't sleep for 5 days straight because of a deadline, and at 20 I weighed 48 kilograms, about 106 pounds. I wrote about it in detail in [my story](/about/stories/why-i-built-elegix)." },
          { p: "That's when I understood something simple that I still remind myself of: hours and results are not the same thing. Past a certain point, every extra hour takes more than it gives." },
          { p: "So when I started building the team, I knew exactly what I didn't want: for people to repeat my path. The four-day week became a rule from the very first day. I set it myself when I created the company, before anyone joined." },
        ],
      },
      {
        h2: "You can't build a product about balance without balance",
        blocks: [
          { p: "Elegix helps you see the 6 areas of your life: health, relationships, spirituality, leisure, growth, and finance and career. Work is only one of the six. So why should it take five, six, sometimes seven days a week?" },
          { p: "It would feel dishonest to tell people \"don't forget the other areas\" while we ourselves lived from deadline to deadline. So the four-day week isn't a perk for us, and it isn't an experiment for LinkedIn. It's part of what we make." },
          { p: "In Valencian, Elegix means \"choose\". Four working days is probably the most honest choice we've made as a team." },
        ],
      },
      {
        h2: "Why Wednesday",
        blocks: [
          { p: "A four-day week usually means long weekends: Friday, Saturday, Sunday. So the first question I get is why not Friday." },
          { p: "But Friday makes the weekend longer, not the week lighter. Four working days in a row are still a marathon, just a shorter one." },
          { p: "Wednesday cuts the week in half. Two days of work, a day for yourself, two more days of work. There's no \"just make it to Friday\". In the middle of the week there's a day to sleep in, go to the gym while it's empty, take care of the personal things you have no energy for on Saturday, or simply do nothing." },
          { p: "And on Thursday you come back to work not tired after four days, but rested after one. The two days left before the weekend don't look scary at all." },
          { p: "We're not dogmatic about it. There was a time when Wednesday didn't suit one person, and they could move their day off to Friday. But today the whole team really does take Wednesday, simply because it's easier." },
        ],
      },
      {
        h2: "What it gives us",
        blocks: [
          { p: "I won't make up percentages. We're a small team and we haven't run any studies on ourselves. I'll tell you what I see." },
          { p: "**People burn out less.** Nobody reaches the end of the week running on fumes. Wednesday works like a fuse: even a hard week doesn't get the chance to pile up." },
          { p: "**More gets done in personal life.** Everyone on the team now has a day that belongs only to them. And that day started to pay off, in health, in learning, in relationships." },
          { p: "For me, Wednesday is a day for myself. I try not to work at all and to rest from everything: no phone, no laptop, nothing. It's the one day in the week when nobody, me included, expects anything from me." },
          { p: "**And more gets done in our careers.** This surprised me most. With four days, everything unnecessary shows right away: meetings \"just in case\", small tasks nobody needs. What's left is what actually moves the product and each of us forward." },
          { p: "I also started noticing that people work better when they have more drive. And with that drive came more creative ideas. Rested people don't just do the work, they suggest how to do it differently." },
          { p: "But the team will say it better than I can. Their words are below, in “What the team says”." },
        ],
      },
      {
        h2: "What's harder than it looks",
        blocks: [
          { p: "A four-day week isn't magic. Giving people a day off isn't enough, you also have to learn to use it. The first Wednesdays easily turn into \"I'll just check my email\", and then into one more workday from the sofa." },
          { p: "We agreed that Wednesday isn't for work. Not \"if possible\". It's just not for work." },
          { p: "People usually ask two things next. **What if a deadline is on fire on a Wednesday?** We don't have deadlines on Wednesdays, because it's a day off. We plan around it, the same way nobody plans a deadline for Sunday. **Did pay go down?** There was no switch: we've worked four days from the start, so there was nothing to cut." },
        ],
      },
      {
        h2: "If you want to try it",
        blocks: [
          { p: "I don't think a four-day week suits every team. But if you're thinking about it, here's what I'd suggest." },
          { list: [
            "**Try it for a month, not forever.** It's easier to agree on, and easier to look honestly at what happened.",
            "**Choose the day, not just \"less work\".** Think about what's better for your week: a long weekend or a pause in the middle.",
            "**Decide in advance what to do with urgent things.** Then the day off won't get eaten \"just for an hour\".",
            "**Think about what the day is for.** If you don't choose, it quietly turns into errands. We have a separate [guide on the extra day](/guides/four-day-work-week-extra-day) about this.",
          ] },
          { p: "To me, balance isn't about waiting for the weekend. It's about every week having room for life. For us, that room is called Wednesday." },
        ],
      },
    ],
    // approved by each person on 2026-11-25
    comments: [
      { person: "Alina Krupa", text: "Wednesday became my day for myself. I finally stopped putting my life off until \"after the launch\", and honestly, I started working better, not worse." },
      { person: "Maksym Zhuravskyi", text: "For me the biggest difference is in my head: in two days you don't get tired enough for everything to fall apart on Thursday. I like the code I write after Wednesday more." },
      { person: "Yevhenii Bohomol", text: "My Wednesdays are for learning and sport. I don't feel like I'm \"serving out the week\", and it shows at work." },
    ],
    related: ["four-day-work-week-extra-day", "signs-of-burnout", "work-life-balance"],
    cta: {
      title: "See which area is slipping, *before* burnout",
      text: "Elegix links your goals, habits and tasks to 6 areas of life and shows every week what gets your time and what you keep putting off. Free for iOS and Android. Join the waitlist for early access.",
    },
  },
];

export const postHref = (p: Pick<BlogPost, "slug">) => `/blog/${p.slug}`;

/** The posts in a site language, newest first. */
export function postsOf(lang: Lang) {
  const list = [...(lang === "uk" ? UK_POSTS : POSTS)].sort((a, b) => b.published.localeCompare(a.published));
  return { POSTS: list, postBySlug: (slug: string) => list.find((p) => p.slug === slug) };
}

/** Someone on the team in a site language (name, role, photo), from their English name. */
export function teamMember(lang: Lang, person: string) {
  const i = contentOf("en").TEAM.members.findIndex((m) => m.name === person);
  return i < 0 ? undefined : contentOf(lang).TEAM.members[i];
}

/** The comments that may show on this build: real ones always, drafts on previews only. */
export const visibleComments = (p: BlogPost) => (p.comments ?? []).filter((c) => !c.draft || SHOW_DRAFTS);
