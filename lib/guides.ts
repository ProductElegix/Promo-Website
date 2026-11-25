/**
 * Guides (/guides/…) and the 6 life area pages (also /guides/…, e.g. /guides/health): long-form pages written for the searches people
 * actually make ("wheel of life", "signs of burnout", "how to improve work life balance"). Each one ends in
 * the waitlist, so search traffic turns into signups.
 *
 * Inline markup in body text (see components/ui/Inline.tsx):
 *   [words](/path)  a link, internal or external
 *   **words**       bold
 */
import { AREAS, AREAS_SECTION, type AreaKey, type MediaSlot } from "@/lib/content";
import { EXTRAS } from "@/lib/guide-extras";
import { UK_GUIDES } from "@/lib/uk/guides";
import { UK_EXTRAS } from "@/lib/uk/guide-extras";
import type { Lang } from "@/lib/i18n";
import { AREA_SLUGS, areaHref } from "@/lib/area-slugs";

export type Block =
  | { p: string }
  | { list: string[] }
  | { steps: { title: string; text: string }[] }
  | { tip: string }
  /** an interactive tool or download, rendered by components/ui/GuideTool.tsx */
  | { tool: GuideToolName }
  /** blog posts: a note for the author where a real fact belongs; shown on previews only (lib/drafts.ts), never in production */
  | { todo: string };

export type GuideToolName = "wheel-calculator" | "wheel-template" | "burnout-check" | "hours-calculator";

/** Extra depth for a guide or life area page, kept in lib/guide-extras/<slug>.ts so each page's long-form
 *  text lives in its own file. Sections go in before a closing section that mentions Elegix. */
export type GuideExtra = {
  /** `before` puts a section in front of the existing section with that h2 */
  sections: { h2: string; blocks: Block[]; before?: string }[];
  faq?: { q: string; a: string }[];
  /** date of the last real update to the page, shown as "Updated" */
  updated?: string;
  /** what changed in each real update, newest first; shown as "What changed" at the end of the page */
  changes?: Change[];
};

export type Change = { date: string; text: string };

export type Guide = {
  slug: string;
  /** the h1 */
  title: string;
  /** the <title> tag, without the " · Elegix" suffix */
  metaTitle: string;
  description: string;
  label: string;
  /** life areas the page is about, main one first; empty means it covers all 6 (the hub's "All 6 areas" filter) */
  areas: AreaKey[];
  /** an expert who checked the page; shown as "Reviewed by" and only set for a real, named reviewer */
  reviewer?: Reviewer;
  /** opening paragraph under the h1 */
  lede: string;
  published: string;
  updated: string;
  minutes: number;
  media: MediaSlot;
  sections: { h2: string; blocks: Block[] }[];
  faq?: { q: string; a: string }[];
  /** slugs of guides to link at the end */
  related: string[];
  /** what changed in each real update (from lib/guide-extras), newest first */
  changes?: Change[];
  cta: { title: string; text: string };
};

/** The words of a guide or life area page, the part that changes between languages. */
export type GuideText = Pick<Guide, "title" | "metaTitle" | "description" | "label" | "lede" | "sections" | "faq" | "cta"> & {
  /** alt text of the page photo */
  alt: string;
  /** what changed in each update, in this language */
  changes?: Change[];
};

export type Reviewer = { name: string; credentials: string; url?: string };

export type AreaGuide = Omit<Guide, "related"> & { area: AreaKey };

const CTA = {
  title: "See all 6 areas of your life in *one place*",
  text: "Elegix tracks your goals, habits and tasks across 6 life areas and shows which one is slipping, before it turns into burnout. Free app for iOS and Android. Join the waitlist for early access.",
};

const PHOTO = (src: string, alt: string): MediaSlot => ({ src, alt, brief: alt, ratio: "16 / 9" });

const BASE_GUIDES: Guide[] = [
  {
    slug: "wheel-of-life",
    areas: [],
    title: "The Wheel of Life: how to fill it in and what to do with your score",
    metaTitle: "Wheel of Life: how to fill it in and read your score",
    description: "What the Wheel of Life is and isn't, how to score your 6 life areas in ten minutes, how to read the shape you get, and how to turn the lowest score into one weekly step.",
    label: "Guide · Wheel of Life",
    lede: "The Wheel of Life is a simple exercise: you rate how satisfied you are with each part of your life and draw it as a circle. It takes ten minutes and a pen. It won't tell you anything you don't already know somewhere, but it puts it on one page, and that is usually enough to show which part of your life you've stopped looking at.",
    published: "2026-10-22",
    updated: "2026-11-25",
    minutes: 7,
    media: PHOTO("/images/area-meaning.jpg", "A woman standing at a tall window at dusk, thinking"),
    sections: [
      {
        h2: "What it is, and what it isn't",
        blocks: [
          { p: "The wheel is a circle cut into slices, one slice per area of life. You score each area from 1 to 10 and shade the slice up to that number. The edge you end up with is bumpy, and the bumps are the point: they show where your life is out of balance." },
          { p: "It is usually credited to Paul J. Meyer, an American self-improvement author who used life-area wheels in his goal-setting programmes from the 1960s. There's no single original version that everyone copies, which is why you'll find wheels with 6, 8 or 12 areas. Coaches have adapted it for decades." },
          { p: "It's also worth being clear about what the wheel is not. It's a reflection exercise, not a validated psychological test. Your 6 and a friend's 6 don't mean the same thing, and the score can't diagnose anything. What it does well is make you look at all of your life at once, instead of only at the part that's shouting loudest." },
        ],
      },
      {
        h2: "The 6 areas we use",
        blocks: [
          { p: "More slices give more detail but make the wheel harder to read and harder to repeat. We use six, because six cover a whole life and take under a minute to score:" },
          { list: [
            "**[Health](/guides/health):** sleep, movement, food and energy.",
            "**[Relationships](/guides/relationships):** family, friends, partner and community.",
            "**[Spirituality](/guides/spirituality):** values, reflection and inner calm.",
            "**[Leisure](/guides/leisure):** rest, play and things you do for fun.",
            "**[Personal growth](/guides/personal-growth):** learning, skills and new challenges.",
            "**[Finance & career](/guides/finance-and-career):** work, income and savings.",
          ] },
          { p: "If something important to you doesn't fit, such as parenting or home, add it. A wheel you believe in is more useful than a perfect template. Just keep the same areas for a few months, or you won't be able to compare one wheel with the next." },
        ],
      },
      {
        h2: "How to fill it in",
        blocks: [
          { steps: [
            { title: "Draw the circle", text: "Split it into six slices and write one area next to each. Mark rings from 1 at the centre to 10 at the edge." },
            { title: "Ask one question per area", text: "“How satisfied am I with this part of my life right now?” Not last year, and not after the next promotion. If a general question is hard to answer, make it concrete: how many nights did I sleep well in the last two weeks? Who did I actually spend time with?" },
            { title: "Score quickly", text: "A few seconds per area. If you spend a minute on one number, you're usually negotiating with yourself. 10 means you wouldn't change anything, 1 means it hurts." },
            { title: "Shade the slices", text: "Colour each slice from the centre out to its score, then look at the shape." },
            { title: "Write one sentence for each low score", text: "For every area under 6, finish the sentence “It's low because…”. A number on its own doesn't tell you what to do. The sentence often does." },
          ] },
          { p: "If you'd rather not draw, there is an online [Wheel of Life calculator](/tools#wheel-calculator) and a [printable template](/tools#wheel-template) on our Tools page. Nothing you enter there leaves your browser." },
        ],
      },
      {
        h2: "How to read the shape",
        blocks: [
          { p: "Look at the shape before the average. A few shapes come up often:" },
          { list: [
            "**One deep dent.** Most areas are fine and one is far behind. The easiest wheel to work with, because you know where to start.",
            "**Lopsided.** One or two areas at 8 to 10, the rest low. Often the high area is taking the time and energy of the others, so the first step is to take something away from it, not to add a new goal somewhere else.",
            "**Small and even.** Everything around 4 or 5. Nothing is on fire and nothing feels good. This shape often points at tiredness rather than at one area. Start with sleep and rest, and if it has lasted for weeks, read about the [signs of burnout](/guides/signs-of-burnout).",
          ] },
          { p: "The average is worth writing down, but the gaps matter more. An average of 7 made of 9s and 3s feels very different from one made of 7s." },
          { p: "And a 10 everywhere is not the goal. A launch month or a new baby will pull the wheel out of shape for a while, and that can be a fine choice. The problem is an area that slides for a year without you looking at it." },
        ],
      },
      {
        h2: "What to do after",
        blocks: [
          { p: "Most people stop at the picture, feel bad for a day and change nothing. The wheel is a diagnosis, so it needs one small next step:" },
          { steps: [
            { title: "Pick one area", text: "The lowest one, or the one where a small change would lift the others. Better sleep often helps health, leisure and work at the same time." },
            { title: "Choose one action for this week", text: "Small enough that you can't really fail: two evening walks, one call to a friend, an hour of reading on Sunday. Give it a day and a time." },
            { title: "Re-score once a week", text: "Rating six areas again takes a minute. It's how you notice an area slipping while it's still easy to fix. Daily is too often: the scores start to follow your mood." },
            { title: "Look back once a month", text: "Did the dent close? Did another area pay for it? Then pick the next area." },
          ] },
          { p: "This weekly loop is what [Elegix](/about) is built around: a short weekly check-in across the same 6 areas, goals and habits tied to each one, and a monthly look back. If you'd rather do it on paper, our [10-minute weekly review](/guides/weekly-review) works the same way." },
        ],
      },
    ],
    faq: [
      { q: "How often should I do the Wheel of Life?", a: "A quick re-score of all areas once a week, and a full wheel with notes once a month. Also redo it after a big change, such as a new job, a move or a new baby." },
      { q: "What is a good Wheel of Life score?", a: "There's no passing grade, and scores aren't comparable between people. What matters is the gap between your highest and lowest areas, and whether the lowest one is moving." },
      { q: "Is the Wheel of Life scientifically validated?", a: "No. It's a coaching and reflection exercise, not a validated psychological test. It's useful for noticing patterns in your own life, not for diagnosing anything." },
      { q: "What if all my scores are low?", a: "A wheel where everything is low often points at exhaustion rather than one problem. Start with sleep and rest, and if you've felt this way for weeks, talk to a doctor or a mental health professional." },
    ],
    related: ["weekly-review", "how-to-choose-priorities-in-life", "signs-of-burnout"],
    changes: [
      { date: "2026-11-25", text: "Rewritten and shortened, with an honest note on what the wheel can't do. The calculator and the printable template moved to the Tools page." },
    ],
    cta: CTA,
  },
  {
    slug: "signs-of-burnout",
    areas: ["health", "career"],
    title: "12 signs of burnout in high achievers, and what to do first",
    metaTitle: "Signs of burnout in high achievers: 12 early warnings",
    description: "How the WHO defines burnout, 12 everyday signs of it in your body, your work and the rest of your life, how it differs from depression, and the first steps that help.",
    label: "Guide · Burnout",
    lede: "People who are good at their jobs rarely burn out in one dramatic day. The work keeps getting done and the results stay fine, so the cost shows up somewhere else first: sleep, patience, friends, the things they used to enjoy. This guide is about noticing it there, early, while it's still easy to turn around.",
    published: "2026-10-22",
    updated: "2026-11-25",
    minutes: 7,
    media: PHOTO("/images/area-career.jpg", "A woman working late on a laptop at a wooden table"),
    sections: [
      {
        h2: "What burnout is, and what it isn't",
        blocks: [
          { p: "The World Health Organization describes burnout as a result of chronic workplace stress that hasn't been successfully managed. It has three parts: exhaustion, growing mental distance or cynicism about your job, and a feeling that you're less effective. The WHO lists it as an occupational phenomenon, not a medical condition, and it refers specifically to work, not to other parts of life ([WHO, 2019](https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases))." },
          { p: "Those three parts come from decades of research by Christina Maslach and colleagues, who also built the questionnaire researchers still use to measure burnout. One of their findings is worth knowing: burnout is less about a weak person than about a poor fit between the person and the job, such as too much work, too little control or too little recognition ([Maslach and Leiter, World Psychiatry, 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC4911781/))." },
          { p: "This guide is not medical advice. If you feel hopeless, can't get through the day or have thoughts of harming yourself, talk to a doctor or a mental health professional today." },
        ],
      },
      {
        h2: "12 signs to watch for",
        blocks: [
          { p: "The list below is not a clinical checklist. It's what the three parts of burnout tend to look like in an ordinary week. One sign on its own means little. Several that have been true most weeks for a month are worth taking seriously." },
          { p: "**In your body**" },
          { list: [
            "**You're tired after a full night's sleep.** Rest stops working the way it used to.",
            "**Sleep is the first thing you cut.** Late nights feel like the only time that's yours.",
            "**You get ill at the start of every holiday.** As if your body waits for permission.",
            "**Exercise quietly disappeared.** Not a decision, just weeks without it.",
          ] },
          { p: "**In your work**" },
          { list: [
            "**Everything is urgent and nothing feels important.** You're busy all day and can't say what moved.",
            "**Small tasks feel heavy.** An email you'd have answered in two minutes sits for three days.",
            "**Cynicism creeps in.** “What's the point” about work you used to care about.",
            "**You can't switch off.** Work follows you into the shower, dinner and bed.",
          ] },
          { p: "**In the rest of your life**" },
          { list: [
            "**Friends stopped asking.** You said no enough times that the invitations dried up.",
            "**Hobbies became “someday”.** You can't remember the last thing you did just for fun.",
            "**You're short with the people closest to you.** Your patience is gone by the time you get home.",
            "**You numb instead of rest.** Scrolling, snacks, another episode: things that pass the time but don't refill you.",
          ] },
          { p: "Most of these don't show up in your work results at first, which is exactly why people who are good at their jobs miss them. If you want to count them, there's a short private [burnout self-check](/tools#burnout-check) on our Tools page. Doing it again in two weeks tells you more than doing it once: the direction matters more than the number." },
        ],
      },
      {
        h2: "Burnout, stress or depression?",
        blocks: [
          { p: "They overlap, and one can lead to another, so this is a rough guide, not a way to label yourself. Stress usually feels like too much. Burnout feels like not enough left, and it's tied to work. Depression affects your whole life, not only work, and needs a professional to assess it." },
          { p: "One question helps: does it lift when work is gone for a while? If a real break helps, burnout is the more likely pattern. If nothing helps, not even the things you used to love, that's a strong reason to see a doctor. The NHS lists the [symptoms of depression](https://www.nhs.uk/mental-health/conditions/depression-in-adults/symptoms/) and advises seeing a GP if you've felt low for most of the day, most days, for more than two weeks." },
        ],
      },
      {
        h2: "Why it happens to people who are doing well",
        blocks: [
          { p: "In a Gallup survey of nearly 7,500 full-time employees, 23% said they felt burned out at work very often or always, and another 44% sometimes. The factors most linked to it were unfair treatment at work, an unmanageable workload, unclear expectations, a lack of support from a manager, and unreasonable time pressure ([Gallup, 2018](https://www.gallup.com/workplace/237059/employee-burnout-part-main-causes.aspx))." },
          { p: "Notice that most of these are about the job, not the person. That matters, because the usual advice, more yoga and a better morning routine, can't fix an impossible workload. It can help you notice it sooner, and give you the energy to change what can be changed." },
          { p: "People who love their work are not protected. If anything, caring about the job makes it easier to give it every hour while the rest of life quietly empties." },
        ],
      },
      {
        h2: "What to do first",
        blocks: [
          { steps: [
            { title: "Make it visible", text: "Score your 6 life areas from 1 to 10 with the [Wheel of Life](/guides/wheel-of-life). “Health 3, Leisure 2” on paper is harder to ignore than a vague feeling of being tired." },
            { title: "Protect sleep first", text: "Pick a fixed time to stop working in the evening and hold it for two weeks. Most other changes work better once you're rested." },
            { title: "Change one thing at work", text: "Look at the causes above. Which one applies to you? Bring one specific request to your manager: a deadline moved, a project handed over, a clearer priority. You don't have to use the word “burnout” or share anything medical." },
            { title: "Add one thing back", text: "Something that used to refill you, a walk, a call, an instrument. Put it in this week's calendar like a meeting." },
            { title: "Check in weekly", text: "Re-score your areas once a week. A [10-minute weekly review](/guides/weekly-review) catches the slide long before it becomes a crash." },
          ] },
          { p: "And talk to someone: a partner, a friend, a doctor. See a professional if the signs have lasted more than a few weeks, if rest no longer helps, or if they affect your health or relationships. A GP can also rule out physical causes, such as thyroid problems or anaemia, that can look similar." },
        ],
      },
    ],
    faq: [
      { q: "Is burnout a medical diagnosis?", a: "Not according to the WHO. In the ICD-11 it is listed as an occupational phenomenon tied to chronic, unmanaged workplace stress, not as a medical condition. Some countries treat it differently for sick leave, so ask your doctor." },
      { q: "How long does it take to recover from burnout?", a: "There's no fixed timeline. Early burnout can ease in a few weeks once the pressure drops and sleep comes back. Long-term burnout can take months and usually goes better with professional support." },
      { q: "Can you burn out from a job you love?", a: "Yes. Caring about the work makes it easy to give it every hour, while health, people and rest quietly lose out." },
    ],
    related: ["work-life-balance", "four-day-work-week-extra-day", "weekly-review"],
    changes: [
      { date: "2026-11-25", text: "Rewritten and shortened, with the causes of burnout from the research and a clearer line between burnout and depression. The self-check moved to the Tools page." },
    ],
    cta: CTA,
  },
  {
    slug: "work-life-balance",
    areas: ["career", "health"],
    title: "How to improve work-life balance when you love your work",
    metaTitle: "How to improve work-life balance if you love your work",
    description: "Work-life balance for people who like their jobs: what long hours actually do to health, how to see what the rest of your life is paying, and boundaries that hold.",
    label: "Guide · Work-life balance",
    lede: "Most advice on work-life balance assumes you'd rather not be at work. If you like your job, “just work less” doesn't land. What helps is seeing what the rest of your life is quietly paying for the work, and making those trades on purpose instead of by default.",
    published: "2026-10-22",
    updated: "2026-11-25",
    minutes: 7,
    media: PHOTO("/images/area-health.jpg", "A man running on a track at sunrise"),
    sections: [
      {
        h2: "Balance isn't equal hours",
        blocks: [
          { p: "Work-life balance doesn't mean eight hours of work, eight of life and eight of sleep. Some seasons are heavy: a launch, exams, a new role, a newborn. That can be a good choice. Balance means no part of your life is neglected for so long that it breaks, and it's measured over months, not days." },
          { p: "“Life” is also too vague to work with. It's your [health](/guides/health), your [relationships](/guides/relationships), your [rest](/guides/leisure), your [growth](/guides/personal-growth) and your [sense of meaning](/guides/spirituality), and each of them can slip on its own while the others look fine." },
        ],
      },
      {
        h2: "What long hours actually cost",
        blocks: [
          { p: "The clearest evidence is about very long weeks. A joint WHO and ILO analysis found that working 55 hours or more a week was linked to an estimated 35% higher risk of stroke and a 17% higher risk of dying from heart disease, compared with a 35 to 40 hour week. They linked about 745,000 deaths in 2016 to long working hours ([WHO, 2021](https://www.who.int/news/item/17-05-2021-long-working-hours-increasing-deaths-from-heart-disease-and-stroke-who-ilo))." },
          { p: "Those are numbers about whole populations, not a forecast for you, and most people's problem isn't a 60-hour week. It's a 45-hour week plus email at night, plus a phone on the table at dinner, until there are no hours left that work doesn't touch." },
          { p: "It helps to count. A week has 168 hours. Take away the hours you really work (not the ones in your contract), commuting, sleep and the basics like cooking and cleaning, and what's left is usually less than people expect. The [free hours calculator](/tools#hours-calculator) on our Tools page does the sum. The point isn't guilt. It's to see the hours you can actually choose." },
        ],
      },
      {
        h2: "Seven things that help",
        blocks: [
          { steps: [
            { title: "Look at the whole picture", text: "Rate your 6 life areas from 1 to 10 with the [Wheel of Life](/guides/wheel-of-life). Usually one or two areas are carrying the cost of the job, and it's easier to act on a number than on a feeling." },
            { title: "Set one end time and keep it", text: "Pick a time when work stops on most days, and tell someone about it. One boundary that holds is worth more than five you ignore." },
            { title: "Plan the week, not just the day", text: "On Sunday, put two or three things that aren't work into the calendar first: a workout, dinner with a friend, an evening off. Work fills the rest." },
            { title: "Write which area each goal serves", text: "If every goal you have sits under work and money, that's your answer. Our guide to [goals for every area of life](/guides/goals-for-every-area-of-life) has examples." },
            { title: "Keep the first and last hour free of work", text: "No email in the first hour after you wake up or the last hour before sleep." },
            { title: "Choose rest that refills you", text: "Scrolling passes the time but rarely leaves you rested. A walk, something with your hands or time with people you like usually do more." },
            { title: "Look back every week", text: "Ten minutes on Sunday with a [weekly review](/guides/weekly-review): what went well, which area slipped, one step for next week." },
          ] },
        ],
      },
      {
        h2: "Boundaries other people will accept",
        blocks: [
          { p: "Boundaries work best when they're specific, said once, and kept. A few lines you can adapt:" },
          { list: [
            "“I'm offline after 7. If it's urgent, call me, otherwise I'll answer first thing tomorrow.”",
            "“I can take this on if we move the deadline on X. Which one matters more right now?”",
            "“I keep Thursday evenings free. Could we do Wednesday or Friday instead?”",
          ] },
          { p: "Expect a little friction the first few times. Most people adjust quickly once a boundary is consistent. If the hours are too many no matter how you arrange them, that's a workload problem, not a time-management one, and it's worth raising with your manager as one specific request: a deadline, a project, a priority." },
        ],
      },
      {
        h2: "Signs your balance is off",
        blocks: [
          { p: "You're productive but not happy. You keep promising yourself things will change “after this project”. Your friends stopped asking. Your body sends small signals: tired mornings, a sore back, a cold at the start of every holiday. If several of these sound familiar, read the [12 signs of burnout](/guides/signs-of-burnout)." },
          { p: "[Elegix](/about) is built to show this early: you see your 6 areas side by side, every week, so the one that's slipping is visible before it becomes a crisis." },
        ],
      },
    ],
    faq: [
      { q: "What is a good work-life balance?", a: "One where no area of your life is neglected for long. You can work hard for a season, as long as your health, relationships and rest aren't quietly falling apart while you do." },
      { q: "How many hours a week is too many?", a: "There's no single number for everyone, but the WHO and ILO found that 55 hours or more a week is linked to a higher risk of stroke and heart disease than a 35 to 40 hour week." },
      { q: "How do I improve work-life balance without working less?", a: "Look at what the other areas of your life are paying, protect a few fixed hours that work doesn't touch, and review once a week. Often the problem is that work leaks into every hour, not the total number of hours." },
    ],
    related: ["signs-of-burnout", "four-day-work-week-extra-day", "weekly-review"],
    changes: [
      { date: "2026-11-25", text: "Rewritten and shortened, with the WHO and ILO research on long hours. The free hours calculator moved to the Tools page." },
    ],
    cta: CTA,
  },
  {
    slug: "goals-for-every-area-of-life",
    areas: [],
    title: "How to set goals for every area of your life",
    metaTitle: "How to set goals for every area of life: examples",
    description: "Set goals for health, relationships, spirituality, leisure, growth and career: one goal per area, a reason why and a weekly habit. With examples.",
    label: "Guide · Goals",
    lede: "Most people set goals for one area of life, usually work or money, and wonder why the rest feels empty. Setting one small goal for each area keeps your ambition and your life pulling in the same direction.",
    published: "2026-10-22",
    updated: "2026-10-22",
    minutes: 6,
    media: PHOTO("/images/area-growth.jpg", "A stack of books on a green armchair next to plants"),
    sections: [
      {
        h2: "Why one goal per area works",
        blocks: [
          { p: "Goals compete for the same hours. When every goal is about your career, your calendar quietly says your health and relationships don't matter. One goal per area forces a choice in each part of your life, and six small goals are easier to keep than one huge one." },
        ],
      },
      {
        h2: "A 4-step method",
        blocks: [
          { steps: [
            { title: "Score your areas", text: "Start with the [Wheel of Life](/guides/wheel-of-life). Your lowest scores are where a goal will change the most." },
            { title: "Write one goal per area", text: "Make it concrete and finite: “Run a 5K by March”, not “be healthier”. If an area is fine, a maintenance goal is enough." },
            { title: "Add your why", text: "One sentence on why the goal matters to you. On tired days the why is what gets you moving, not the goal itself." },
            { title: "Link a weekly habit", text: "Every goal needs one action you repeat weekly. The goal is the direction; the habit is what moves you." },
          ] },
        ],
      },
      {
        h2: "Examples of goals for each area of life",
        blocks: [
          { list: [
            "**[Health](/guides/health):** sleep 7 hours on weeknights for a month. Habit: screens off at 22:30.",
            "**[Relationships](/guides/relationships):** reconnect with three old friends this quarter. Habit: one call every Sunday.",
            "**[Spirituality](/guides/spirituality):** write down my top five values. Habit: ten minutes of journaling on Friday evening.",
            "**[Leisure](/guides/leisure):** learn three songs on the guitar. Habit: two 20-minute practice sessions a week.",
            "**[Personal growth](/guides/personal-growth):** read six books this half-year. Habit: 20 pages before bed.",
            "**[Finance & career](/guides/finance-and-career):** build a three-month emergency fund. Habit: move a fixed amount to savings every payday.",
          ] },
        ],
      },
      {
        h2: "Keep them alive",
        blocks: [
          { p: "Goals die in a notes app. Check them once a week in a [10-minute weekly review](/guides/weekly-review) and re-score your areas once a month. If a goal hasn't moved for a month, make the habit smaller, not the goal bigger." },
          { p: "[Elegix](/about) is built on this method: every goal, habit and task belongs to one of 6 life areas, each goal carries your why, and your Life Balance score shows whether your goals are actually changing your life." },
        ],
      },
    ],
    related: ["wheel-of-life", "plan-next-year-by-area-of-life", "weekly-review"],
    cta: CTA,
  },
  {
    slug: "weekly-review",
    areas: [],
    title: "The 10-minute weekly review that keeps your life in balance",
    metaTitle: "Weekly review: a 10-minute template for life balance",
    description: "A short weekly review for your whole life, not just your task list: re-score 6 areas, note one win and one slip, choose one step. Why weekly, and how it differs from GTD.",
    label: "Guide · Weekly review",
    lede: "Most parts of life don't fall apart in a day. They slide, a little each week, and you notice months later. A weekly review is the smallest habit that catches the slide early: ten minutes, once a week, looking at all of your life instead of only at work.",
    published: "2026-10-22",
    updated: "2026-11-25",
    minutes: 5,
    media: PHOTO("/images/area-home.jpg", "A bright, tidy living room with plants and an orange armchair"),
    sections: [
      {
        h2: "Why once a week",
        blocks: [
          { p: "Every day is too close: each one looks like an exception. Once a month is too far: by then an area has been slipping for weeks. A week is long enough to see a pattern and short enough to fix it with one small step." },
          { p: "There's also some evidence that stopping to reflect is time well spent. In a field study at a large call centre, new employees who spent the last 15 minutes of their day writing about what they had learned did about 23% better on the final test of their training than those who used the time to keep working ([Di Stefano et al., Harvard Business School, 2014](https://www.hbs.edu/faculty/Pages/item.aspx?num=63487)). It's one study about learning a job, not about life balance, but the idea carries: experience turns into change when you stop and look at it." },
        ],
      },
      {
        h2: "The 10-minute template",
        blocks: [
          { steps: [
            { title: "Re-score your 6 areas (1 minute)", text: "Rate [health](/guides/health), [relationships](/guides/relationships), [spirituality](/guides/spirituality), [leisure](/guides/leisure), [personal growth](/guides/personal-growth) and [finance & career](/guides/finance-and-career) from 1 to 10. Don't think long, and compare with last week." },
            { title: "One win (2 minutes)", text: "What went well? Which goal or habit moved? Write it down. Noticing progress is a big part of what keeps people doing this." },
            { title: "One slip (2 minutes)", text: "Which area dropped or stayed low? Finish the sentence “It slipped because…”. Be curious rather than harsh." },
            { title: "One step for next week (3 minutes)", text: "Choose one small action for the area that needs you most and put it in the calendar now, with a day and a time." },
            { title: "Look at the week ahead (2 minutes)", text: "Is there room for that step? If the week is already full, decide now what gives, rather than on Wednesday night." },
          ] },
          { p: "A few questions help when you're stuck: Where did my time go that I didn't choose? Who did I not see that I wanted to? What am I postponing “until after”? You don't need all of them every week. One honest answer is enough." },
          { tip: "Do it at the same time each week, for example Sunday evening with a coffee. A fixed slot is what turns it into a habit you don't have to think about." },
        ],
      },
      {
        h2: "How it differs from the GTD weekly review",
        blocks: [
          { p: "If you know David Allen's Getting Things Done, you know its weekly review: get clear, get current, get creative, with steps like emptying your inboxes and going through your project and someday lists ([Getting Things Done, 2009](https://gettingthingsdone.com/2009/05/the-gtd-weekly-review/)). It's a good system for keeping track of commitments." },
          { p: "This review asks a different question. GTD asks whether your lists are up to date. This one asks whether your life is in the shape you want. You can do both, and some people do them back to back. If you only have ten minutes, this one tells you where the next week should go." },
        ],
      },
      {
        h2: "Why people stop, and how to keep going",
        blocks: [
          { list: [
            "**It grows.** Ten minutes turns into an hour of planning, and an hour is easy to skip. Keep a timer on it.",
            "**It becomes a verdict.** If every review ends with a list of failures, you'll avoid it. Start with the win.",
            "**Too many steps.** Five actions for next week means none get done. One is enough.",
            "**No fixed time.** “Sometime on the weekend” usually means never. Pick a slot.",
          ] },
          { p: "Missed a week? Just do the next one. The scores from two weeks ago are still worth comparing." },
        ],
      },
      {
        h2: "Add a monthly look back",
        blocks: [
          { p: "Once a month, take ten more minutes: look at four weeks of scores, fill in a full [Wheel of Life](/guides/wheel-of-life) and ask whether the area you've been working on actually moved. Keep what works, drop what doesn't, and choose next month's area." },
          { p: "In [Elegix](/about) the weekly check-in takes about a minute and your scores, goals and habits are already in one place, so the review is about deciding, not collecting." },
        ],
      },
    ],
    faq: [
      { q: "How long should a weekly review take?", a: "About ten minutes. A short review you actually do every week is worth more than a long one you skip after a month." },
      { q: "What's the best day for a weekly review?", a: "Whatever day you can keep. Sunday evening and Friday afternoon are common because they sit between one week and the next." },
      { q: "Is this the same as the GTD weekly review?", a: "No. The GTD review keeps your task lists and projects up to date. This one checks how the six areas of your life are doing and picks one step for the week. They work well together." },
    ],
    related: ["wheel-of-life", "decision-fatigue", "signs-of-burnout"],
    changes: [
      { date: "2026-11-25", text: "Rewritten and shortened. The reflection study is now cited from Harvard Business School, with what it does and doesn't show." },
    ],
    cta: CTA,
  },
  {
    slug: "how-to-choose-what-to-focus-on",
    areas: [],
    title: "How to choose what to focus on this week",
    metaTitle: "How to choose what to focus on: a 5-minute weekly method",
    description: "Too many goals and not enough week? A 5-minute Sunday method to choose one area of your life to focus on, one small action for it, and what to let go of.",
    label: "Guide · Weekly focus",
    lede: "Most weeks don't go wrong because you were lazy. They go wrong because you tried to move everything at once, and work, which always arrives with a deadline, took the hours by default. Choosing one focus for the week is a small way to fight that.",
    published: "2026-10-26",
    updated: "2026-11-25",
    minutes: 5,
    media: PHOTO("/images/how-next.jpg", "A notebook, pen and laptop on a wooden desk"),
    sections: [
      {
        h2: "Why one focus works better than a long list",
        blocks: [
          { p: "A to-do list treats every item as equal, and your week doesn't. Work comes with deadlines and other people's urgency, so it wins the fight for your time. Everything without a deadline, like sleep, friends, reading or a hobby, quietly loses." },
          { p: "This isn't a new observation. In a 1954 speech, Dwight D. Eisenhower quoted an unnamed college president: “I have two kinds of problems, the urgent and the important. The urgent are not important, and the important are never urgent” ([Quote Investigator, 2014](https://quoteinvestigator.com/2014/05/09/urgent/)). The four-box Eisenhower matrix came much later. It's useful for sorting tasks, but it doesn't help much with the bigger question of which part of your life needs you this week." },
          { p: "There's also a cost to spreading yourself across too many things. The researcher Sophie Leroy found that people who moved to a new task while the last one was unfinished did worse on the new one, because part of their attention stayed behind. She called it attention residue ([Leroy, Organizational Behavior and Human Decision Processes, 2009](https://doi.org/10.1016/j.obhdp.2009.04.002)). Her study was about work tasks over minutes, not goals over a week, but the lesson carries: four new habits at once each get the leftovers." },
        ],
      },
      {
        h2: "The 5-minute method",
        blocks: [
          { steps: [
            { title: "Score your areas (1 minute)", text: "Rate [health](/guides/health), [relationships](/guides/relationships), [spirituality](/guides/spirituality), [leisure](/guides/leisure), [personal growth](/guides/personal-growth) and [finance & career](/guides/finance-and-career) from 1 to 10. Go with your first answer." },
            { title: "Choose one area (1 minute)", text: "The lowest score, or the area that would lift the others if it moved. Tired and short-tempered? Health usually comes first, because sleep helps everything else." },
            { title: "Choose one action (2 minutes)", text: "Small and specific: “two 30-minute walks, Tuesday and Thursday at 7pm”, not “exercise more”. If you can't really fail at it, it's the right size." },
            { title: "Put it in the calendar (1 minute)", text: "Give it a day and a time, like a meeting. An action without a slot is a wish." },
          ] },
        ],
      },
      {
        h2: "What to let go of",
        blocks: [
          { p: "Choosing a focus also means choosing what you won't push this week. That isn't giving up. It's being honest about what fits into seven days." },
          { list: [
            "**Park, don't delete.** Move other goals to a “next weeks” list so they stop nagging you.",
            "**Keep the basics running.** A focus on relationships doesn't mean you stop sleeping or working. It means one area gets extra attention.",
            "**Say one no.** One meeting, favour or late evening you can decline to make room for your action.",
          ] },
        ],
      },
      {
        h2: "At the end of the week",
        blocks: [
          { p: "Next Sunday, before you choose again, check one thing: did you keep your choice? If you did, notice how that area feels now. If you didn't, ask what got in the way and make next week's action smaller. The [10-minute weekly review](/guides/weekly-review) turns this into a routine." },
          { p: "This is the loop [Elegix](/about) is built around, and where its name comes from: in Valencian, “elegix” means “choose”. Each week you choose the area that needs you, and the app shows whether your week matched the choice." },
        ],
      },
    ],
    faq: [
      { q: "What if two areas are equally low?", a: "Choose the one with the smallest first step, or the one that feeds the other. Better sleep, for example, often lifts both health and leisure. The other one can be next week's focus." },
      { q: "Can work be my weekly focus?", a: "Yes, if finance and career really is the area that's behind, for example money stress or a skill that's stalled. The point is to choose it on purpose, not to let work win by default." },
      { q: "How is this different from setting goals?", a: "Goals describe where you want to be in months or years. A weekly focus is the small step you take this week towards one of them. See [goals for every area of life](/guides/goals-for-every-area-of-life)." },
    ],
    related: ["weekly-review", "how-to-choose-priorities-in-life", "decision-fatigue"],
    changes: [
      { date: "2026-11-25", text: "Rewritten and shortened. The Eisenhower quote and the attention residue study are now cited with what they do and don't show." },
    ],
    cta: CTA,
  },
  {
    slug: "how-to-choose-priorities-in-life",
    areas: [],
    title: "How to choose your priorities in life: a simple method across 6 areas",
    metaTitle: "How to choose priorities in life: a 6-area method",
    description: "How to decide what matters when everything feels important: score 6 areas of life, find your values and choose 2 priorities for the season.",
    label: "Guide · Priorities",
    lede: "When everything feels like a priority, nothing is. Choosing your priorities isn't about ranking your whole life once and forever. It's about choosing what gets your best time and energy for the next few months, and being at peace with what waits.",
    published: "2026-10-26",
    updated: "2026-10-26",
    minutes: 7,
    media: PHOTO("/images/hero.jpg", "A woman in a grey sweater looking out at the sea"),
    sections: [
      {
        h2: "Why choosing priorities feels so hard",
        blocks: [
          { p: "Most people don't lack priorities. They have too many, and they never chose them. Some came from a job description, some from parents, some from social media. When you never choose, the loudest one wins, and the loudest one is usually work." },
          { p: "The method below takes about 20 minutes. You only need a pen and an honest hour of quiet." },
        ],
      },
      {
        h2: "Step 1. See the whole picture",
        blocks: [
          { p: "Before choosing, look at all of your life, not just the part that shouts. Score each of the 6 areas from 1 to 10 for how satisfied you are right now:" },
          { list: [
            "**[Health](/guides/health):** sleep, movement, food and energy.",
            "**[Relationships](/guides/relationships):** family, friends, partner and community.",
            "**[Spirituality](/guides/spirituality):** values, reflection, mindfulness and inner calm.",
            "**[Leisure](/guides/leisure):** rest, play, creativity and fun.",
            "**[Personal growth](/guides/personal-growth):** learning, skills and new challenges.",
            "**[Finance & career](/guides/finance-and-career):** work, income, savings and business.",
          ] },
          { tip: "This is the [Wheel of Life](/guides/wheel-of-life). You can also take the free [Life Balance Check](/#check) and get your scores by email." },
        ],
      },
      {
        h2: "Step 2. Ask what matters, not what's urgent",
        blocks: [
          { p: "For each area, answer two questions in one line each:" },
          { list: [
            "**How important is this area to me right now, from 1 to 10?** Not how important it should be. How important it is to you.",
            "**If nothing changes here for a year, how will I feel?** This one cuts through. Some low scores you can live with. Others hurt to imagine.",
          ] },
          { p: "An area with high importance and a low score is a priority candidate. An area with low importance and a low score can wait, guilt-free." },
        ],
      },
      {
        h2: "Step 3. Choose two priorities for this season",
        blocks: [
          { p: "Pick no more than two areas for the next three months. One is usually the area that's hurting most. The other is often the one you keep postponing because it never feels urgent, such as relationships or growth." },
          { p: "Write each one as a sentence with a reason: “For the next three months I choose health, because I want energy for my kids in the evening.” The reason is what keeps you going when the choice gets hard." },
          { tip: "Two is a real limit. With three or more, you're back to a list where work wins by default." },
        ],
      },
      {
        h2: "Step 4. Turn priorities into weekly steps",
        blocks: [
          { p: "A priority you don't see in your calendar isn't a priority yet. For each one, set one goal for the season and one small habit for every week. Then each Sunday, [choose what to focus on this week](/guides/how-to-choose-what-to-focus-on) and give it a slot." },
          { p: "Check in once a month: are your two areas moving? Did another area pay the price? Adjust and keep going. Our [goals for every area of life](/guides/goals-for-every-area-of-life) guide has examples for each area." },
        ],
      },
    ],
    faq: [
      { q: "Should my priorities stay the same forever?", a: "No. Priorities change with seasons of life: a launch, a new baby, a move. Re-choose them every three months, and check them in a monthly review." },
      { q: "What if my job leaves no time for my priorities?", a: "Start smaller than you think: one 20-minute action a week. If even that doesn't fit for months, that's important information about your job, not about you. The [work-life balance guide](/guides/work-life-balance) can help." },
      { q: "Is there an app for choosing priorities across life areas?", a: "Elegix is a free life balance tracker for iOS and Android. You score 6 life areas, link goals and habits to them and see your balance over time. Join the waitlist for early access." },
    ],
    related: ["how-to-choose-what-to-focus-on", "choosing-between-career-and-family", "decision-fatigue"],
    cta: CTA,
  },
  {
    slug: "choosing-between-career-and-family",
    areas: ["career", "people"],
    title: "Choosing between career and family: a calmer way to decide",
    metaTitle: "Choosing between career and family: how to decide",
    description: "Feel torn between your career and your family? Why it's rarely a one-time choice, how to decide season by season, and small steps that protect both.",
    label: "Guide · Career and family",
    lede: "“Career or family” sounds like one big decision you make once. In real life it's hundreds of small ones: this late meeting, that school play, this weekend trip. The good news is that small choices are easier to make well, and easier to change.",
    published: "2026-10-26",
    updated: "2026-10-26",
    minutes: 6,
    media: PHOTO("/images/how-areas.jpg", "Friends making pizza together at a kitchen counter"),
    sections: [
      {
        h2: "Why it feels like either-or",
        blocks: [
          { p: "Work has clear signals: deadlines, reviews, money, people waiting for you. Family's signals are quieter until they're very loud. So each single day, work looks more urgent, and family gets what's left. After a year of that, it feels like you chose career, even though you never decided anything." },
          { p: "The way out isn't a dramatic choice. It's making the small choices on purpose." },
        ],
      },
      {
        h2: "Decide by season, not forever",
        blocks: [
          { p: "Think in seasons of three to six months. Some seasons lean toward work: a launch, a new role, a busy quarter. Some lean toward family: a new baby, a parent who needs you, a child starting school. Leaning is fine. Leaning without noticing, for years, is the problem." },
          { steps: [
            { title: "Name the season", text: "Finish the sentence: “For the next three months, I lean toward ___, because ___.”" },
            { title: "Set a floor for the other side", text: "Decide the minimum you protect no matter what. For example: dinner at home four nights a week, or no work on Sundays." },
            { title: "Tell the people involved", text: "Share your season with your partner and your manager. Most conflicts come from surprises, not from the choice itself." },
            { title: "Set an end date", text: "Put the end of the season in your calendar. On that day, choose again." },
          ] },
        ],
      },
      {
        h2: "Questions that make the choice clearer",
        blocks: [
          { list: [
            "Ten years from now, which of these two weeks will I remember?",
            "Is this work urgent, or just loud?",
            "What does my family actually need from me now: more hours, or more attention in the hours I have?",
            "If a friend described my week to me, what would I tell them?",
          ] },
        ],
      },
      {
        h2: "Small steps that protect both",
        blocks: [
          { list: [
            "**A hard stop.** End work at a set time on most days and keep your phone away for the first hour at home.",
            "**One fixed family ritual.** A weekly dinner, a Saturday walk, bedtime stories. Fixed rituals survive busy seasons.",
            "**A weekly check.** Score [relationships](/guides/relationships) and [finance & career](/guides/finance-and-career) every Sunday. When one drops two weeks in a row, it's time to rebalance.",
            "**Watch your health.** When you feel torn for months, [burnout](/guides/signs-of-burnout) is often close. Sleep is usually the first thing to protect.",
          ] },
          { p: "[Elegix](/about) shows your career and relationships side by side with the other areas of your life, so you see the trade-off while you can still choose differently." },
        ],
      },
    ],
    faq: [
      { q: "Is it selfish to put my career first?", a: "No. A season focused on work can be the right choice, especially when your family agrees with it and it has an end date. What hurts is when it happens by default and never ends." },
      { q: "How do I talk to my partner about this?", a: "Talk about seasons, not forever. Share what you're leaning toward, for how long, and what you'll protect for them no matter what. Then ask what they need from you." },
    ],
    related: ["work-life-balance", "how-to-choose-priorities-in-life", "signs-of-burnout"],
    cta: CTA,
  },
  {
    slug: "decision-fatigue",
    areas: ["health", "meaning"],
    title: "Decision fatigue: why choosing less makes you feel better",
    metaTitle: "Decision fatigue: what the research says and what helps",
    description: "What decision fatigue is, why the famous research is weaker than it sounds, what still holds up, and simple ways to make fewer decisions so you choose well where it matters.",
    label: "Guide · Decision fatigue",
    lede: "By evening, choosing what to have for dinner can feel harder than a work meeting did at ten in the morning. That heavy, foggy feeling is often called decision fatigue. The research behind the name is shakier than most articles admit, but the practical answer is the same either way: make fewer small choices, so you have something left for the ones that shape your life.",
    published: "2026-10-26",
    updated: "2026-11-25",
    minutes: 6,
    media: PHOTO("/images/about-hero.jpg", "A man in a grey shirt sitting on a cliff, looking out"),
    sections: [
      {
        h2: "What people mean by decision fatigue",
        blocks: [
          { p: "Decision fatigue is the idea that the quality of your choices drops after a long run of decisions. Late in the day, people tend to take the default, put things off, or decide on impulse." },
          { p: "You'll often read that we make 35,000 decisions a day. That number has no reliable source that we could find. The count doesn't matter much anyway. What matters is how many choices you leave open every day that could be made once." },
        ],
      },
      {
        h2: "What the research actually says",
        blocks: [
          { p: "Most articles about decision fatigue rest on two things: a theory called ego depletion and a study about judges. Both are weaker than they sound." },
          { list: [
            "**The theory.** In the late 1990s, psychologists proposed that self-control draws on a limited resource that gets used up, like a battery. Many small lab studies seemed to support it.",
            "**The judges.** A 2011 study of parole hearings found that favourable rulings fell from about 65% to nearly zero within each session and jumped back after a food break ([Danziger et al., PNAS, 2011](https://cris.tau.ac.il/en/publications/extraneous-factors-in-judicial-decisions/)). Other researchers then pointed out that the order of cases wasn't random. For example, prisoners without a lawyer tended to be heard later in a session, which could explain part of the pattern ([Weinshall-Margel and Shapard, PNAS, 2011](https://cris.huji.ac.il/en/publications/overlooked-factors-in-the-analysis-of-parole-decisions/)).",
            "**The replications.** When 23 labs ran the same pre-registered experiment with 2,141 people, the effect was close to zero ([Hagger et al., Perspectives on Psychological Science, 2016](https://mro.massey.ac.nz/items/4a1951d7-6022-4d0e-bbb6-fc336ecd4792/full)). A second attempt with 36 labs and 3,531 people also found the effect very small at best ([Vohs et al., Psychological Science, 2021](https://discovery.dundee.ac.uk/en/publications/a-multisite-preregistered-paradigmatic-test-of-the-ego-depletion-/)).",
          ] },
          { p: "So the strong version, that every decision drains a fixed tank of willpower, isn't well supported. The everyday experience is still real: when you're tired, stressed or overloaded, choosing feels harder and you slip into defaults. You don't need a lab result to act on that. Making fewer, better-timed decisions is cheap, low-risk and helps with tiredness whatever its cause." },
        ],
      },
      {
        h2: "Signs you're running on empty",
        blocks: [
          { list: [
            "You put off simple choices, like replying to a message or booking a doctor.",
            "You say “whatever, you choose” more often than usual.",
            "You buy on impulse late in the evening.",
            "You stick to the default even when you know it's not what you want: another late night at work, another evening scrolling.",
            "Small choices make you irritable.",
          ] },
          { p: "If this has felt like every day for weeks, it may be part of something bigger. The [signs of burnout](/guides/signs-of-burnout) are worth a look." },
        ],
      },
      {
        h2: "How to choose less",
        blocks: [
          { steps: [
            { title: "Decide once, not daily", text: "Turn repeated choices into rules: the same breakfast on weekdays, the gym on Monday and Thursday, no meetings before 10. A rule is a choice you only make once." },
            { title: "Put the important choices where your head is clear", text: "For most people that's earlier in the day. Leave the evening for things that don't need deciding." },
            { title: "Choose one focus for the week", text: "Instead of deciding every day what matters most, decide on Sunday. [Choosing one focus for the week](/guides/how-to-choose-what-to-focus-on) removes a lot of small daily debates." },
            { title: "Cut the options", text: "Two or three good options are enough. Comparing ten rarely makes the choice better, and often makes it slower." },
            { title: "Make the good option the easy one", text: "Shoes by the door, the phone charging outside the bedroom, a calendar block for family time. Defaults decide a lot when you're tired, so set them while you're not." },
          ] },
        ],
      },
      {
        h2: "Choose less, so the big choices are yours",
        blocks: [
          { p: "The point of choosing less isn't to stop caring. It's to keep some energy for the choices that shape your life: which area gets your attention, who you spend your evenings with, when work stops. Those are exactly the ones that drift to the default when you're worn out." },
          { p: "That's what [Elegix](/about) is for: one moment a week to choose which part of your life needs you, so you don't have to have the same argument with yourself every evening." },
        ],
      },
    ],
    faq: [
      { q: "Is decision fatigue real?", a: "The lab research behind it is contested, and large replications found the effect close to zero. But feeling worse at choosing when you're tired and overloaded is a common experience, and cutting small decisions is a low-risk way to feel better." },
      { q: "How many decisions do we make a day?", a: "You'll often see 35,000, but we couldn't find a reliable source for it. How many choices you could make once instead of every day matters more than the total." },
      { q: "What's the fastest way to reduce decision fatigue?", a: "Turn two or three daily choices into fixed rules, such as meals, workout days or meeting-free hours, and make important decisions earlier in the day." },
    ],
    related: ["how-to-choose-what-to-focus-on", "signs-of-burnout", "weekly-review"],
    changes: [
      { date: "2026-11-25", text: "Rewritten and shortened. The research section now says plainly which findings held up and which didn't." },
    ],
    cta: CTA,
  },
  {
    slug: "ai-time-savings-work-life-balance",
    areas: ["career", "hobby"],
    title: "AI saved you hours this week. Where did they go?",
    metaTitle: "AI saves you time at work. Keep it for your life",
    description: "AI saves workers about 3 hours a week, yet most say their workload went up. Why saved time goes back to work, and 4 steps to choose where it goes.",
    label: "Guide · AI and balance",
    lede: "AI drafts your emails, summarises your meetings and writes the first version of the report. You should have hours back. Instead, most weeks feel just as full. The time didn't vanish: work took it, because nobody chose where it should go.",
    published: "2026-10-26",
    updated: "2026-10-26",
    minutes: 6,
    media: PHOTO("/images/ready/career.jpg", "A laptop on a desk next to a small model motorbike"),
    sections: [
      {
        h2: "The numbers: time saved, workload up",
        blocks: [
          { p: "Research by economists at the European Central Bank found that people who use AI at work report saving a median of **three hours a week** ([Cyprus Mail on the ECB study, August 2026](https://cyprus-mail.com/2026/08/28/ai-use-at-work-doubles-in-two-years-ecb-survey-finds)). That's a long evening, every week." },
          { p: "Yet in a survey of 2,500 workers by the Upwork Research Institute, **77% of employees using AI said these tools had added to their workload**, and 71% of full-time employees said they were burned out ([Upwork, July 2024](https://investors.upwork.com/news-releases/news-release-details/upwork-study-finds-employee-workloads-rising-despite-increased-c))." },
          { p: "Both can be true at once. AI makes each task faster, and the freed time is immediately filled with more tasks: more drafts to review, more messages, faster deadlines because “it only takes a minute now”." },
        ],
      },
      {
        h2: "Why saved time goes back to work",
        blocks: [
          { list: [
            "**Work has a queue; your life doesn't.** There is always a next task waiting at work. Nothing in your calendar is waiting to claim a free hour for sleep, friends or a hobby.",
            "**Saved minutes are scattered.** Ten minutes here, twenty there. Small gaps get filled with email, not with a walk.",
            "**Expectations reset.** When a report takes one hour instead of three, people start expecting three reports.",
            "**Nobody decided.** Time you don't assign on purpose gets assigned by default, and the default is work.",
          ] },
          { p: "The result is a quiet trade. You become more productive at work while the rest of your life, your [health](/guides/health), [relationships](/guides/relationships) and [leisure](/guides/leisure), gets nothing from the gain." },
        ],
      },
      {
        h2: "How to keep the hours AI saves you",
        blocks: [
          { steps: [
            { title: "Measure what you saved (5 minutes)", text: "At the end of the week, list the tasks AI helped with and estimate the time saved. Be honest and round down. Most people find two to four hours." },
            { title: "Choose one area of life for that time (2 minutes)", text: "Rate your 6 areas of life from 1 to 10, or use the [Wheel of Life](/guides/wheel-of-life). Pick the lowest one. That area gets the saved hours, not your inbox." },
            { title: "Book it as a block (2 minutes)", text: "Turn the scattered minutes into one or two fixed blocks: Thursday 18:00–20:00 for a run and dinner with a friend. A block in the calendar is protected; loose minutes are not." },
            { title: "Hold the line at work", text: "Keep your old end-of-day time instead of using the extra speed to take on more. If your role really needs more output, agree it with your manager on purpose, not by drift." },
          ] },
          { tip: "Say it once a week: “AI saved me ___ hours. This week they go to ___.” Choosing the area in advance is what turns saved time into a better life instead of a fuller inbox." },
        ],
      },
      {
        h2: "Why it matters",
        blocks: [
          { p: "Longer hours have a real cost. The WHO and ILO found that working 55 hours or more a week is linked to a 35% higher risk of stroke and a 17% higher risk of dying from heart disease, compared with 35–40 hours ([WHO, 2021](https://www.who.int/news/item/17-05-2021-long-working-hours-increasing-deaths-from-heart-disease-and-stroke-who-ilo)). AI could pull hours down. It only does if you decide it should." },
          { p: "If you already feel the cost, read the [12 signs of burnout in high achievers](/guides/signs-of-burnout)." },
        ],
      },
      {
        h2: "How Elegix helps",
        blocks: [
          { p: "[Elegix](/about) shows your 6 life areas side by side, so you see which one is slipping while work speeds up. In the 1-minute weekly check-in you choose the area that gets your time next week. The name says it: in Valencian, “elegix” means “choose”." },
        ],
      },
    ],
    faq: [
      { q: "Does AI reduce workload?", a: "It reduces the time each task takes. Whether your overall workload drops depends on what happens to the saved time. In Upwork's 2024 survey, 77% of employees using AI said their workload went up." },
      { q: "How much time does AI save at work?", a: "In research by ECB economists published in 2026, workers who use AI reported saving a median of three hours a week. Your number depends on your job and how you use the tools." },
      { q: "How do I stop saved time from turning into more work?", a: "Decide in advance where it goes. Choose one area of life each week, book the saved hours as a fixed block in your calendar, and keep your usual end-of-day time." },
    ],
    related: ["four-day-work-week-extra-day", "signs-of-burnout", "work-life-balance"],
    cta: CTA,
  },
  {
    slug: "plan-next-year-by-area-of-life",
    areas: [],
    title: "How to plan 2027 by area of life, not just by work goals",
    metaTitle: "How to plan 2027 by area of life: a yearly plan",
    description: "Plan 2027 across 6 areas of life, not a list of resolutions: review 2026, pick 2 focus areas, set a goal and a micro-habit per area, check in weekly.",
    label: "Guide · Yearly planning",
    lede: "Most yearly plans are work plans with a gym resolution attached. By February the resolution is gone and work has the whole year again. Planning by area of life gives every part of your life a place in 2027, and choosing two focus areas keeps the plan small enough to last.",
    published: "2026-10-26",
    updated: "2026-10-26",
    minutes: 7,
    media: PHOTO("/images/ready/growth.jpg", "A handwritten notebook page with a pen"),
    sections: [
      {
        h2: "Why resolutions fail and area plans don't",
        blocks: [
          { p: "Resolutions are big, vague and all start on the same day: “get fit”, “read more”, “be present”. They compete with work for the same hours, and work has deadlines. A plan by area of life is different in three ways." },
          { list: [
            "**It covers your whole life.** You look at [health](/guides/health), [relationships](/guides/relationships), [spirituality](/guides/spirituality), [leisure](/guides/leisure), [personal growth](/guides/personal-growth) and [finance & career](/guides/finance-and-career), so nothing is forgotten by default.",
            "**It makes you choose.** You pick two focus areas for the year instead of promising to fix everything.",
            "**It runs on small steps.** Each goal is tied to a micro-habit you can keep on a busy week.",
          ] },
        ],
      },
      {
        h2: "The plan in 5 steps (about an hour)",
        blocks: [
          { steps: [
            { title: "Review 2026 (15 minutes)", text: "For each of the 6 areas, write one high point, one low point and a score from 1 to 10 for the year. The [Wheel of Life](/guides/wheel-of-life) makes this visual." },
            { title: "Choose 2 focus areas (5 minutes)", text: "Pick the two areas where change would matter most. Usually that's your lowest score plus the one you care about most. The other four get a maintenance goal: keep them from slipping." },
            { title: "One goal per area (15 minutes)", text: "Write one concrete goal for each area, ambitious for the two focus areas and modest for the rest. Add a one-line why. See [examples of goals for every area of life](/guides/goals-for-every-area-of-life)." },
            { title: "One micro-habit per goal (15 minutes)", text: "A small action you can do even on your worst week: 10 minutes of reading, one call on Sunday, a fixed time to close the laptop. Small habits are what keep a plan alive after January." },
            { title: "Put the check-ins in the calendar (10 minutes)", text: "A 10-minute [weekly review](/guides/weekly-review) every Sunday and a longer review on the last day of each quarter. A plan without check-ins is a wish list." },
          ] },
          { tip: "Write the year in one sentence: “In 2027 I choose ___ and ___.” If a new opportunity doesn't serve those two areas or your basics, it's easier to say no." },
        ],
      },
      {
        h2: "An example plan",
        blocks: [
          { p: "A product manager who scored their 2026 at Health 4, Relationships 5, Spirituality 6, Leisure 3, Personal growth 6 and Finance & career 9 might plan 2027 like this:" },
          { list: [
            "**Focus: Health.** Goal: sleep 7 hours on weeknights. Habit: laptop closed by 22:00.",
            "**Focus: Leisure.** Goal: play in a weekly five-a-side league. Habit: Tuesday evening is blocked.",
            "**Relationships (maintain).** Goal: dinner with close friends once a month. Habit: a standing first-Friday booking.",
            "**Spirituality (maintain).** Goal: keep a short weekly journal. Habit: 10 minutes on Sunday.",
            "**Personal growth (maintain).** Goal: read 12 books. Habit: 20 pages before bed.",
            "**Finance & career (maintain).** Goal: keep performance, no extra hours. Habit: stop work at 18:30.",
          ] },
          { p: "Notice that career, the highest score, gets a maintenance goal. Choosing not to push an area that's already strong is how the others get room to grow." },
        ],
      },
      {
        h2: "Keep it alive after January",
        blocks: [
          { p: "Most plans don't fail in December; they fade in February, when the first busy month arrives. Three things help: re-score your areas every week so a drop is visible early, shrink a habit instead of dropping it when life gets heavy, and choose a [weekly focus](/guides/how-to-choose-what-to-focus-on) from your two focus areas." },
          { p: "[Elegix](/about) is built for exactly this. Your goals and habits live inside your 6 life areas, a 1-minute weekly check-in shows which area is slipping, and a monthly review keeps the year on track." },
        ],
      },
    ],
    faq: [
      { q: "When should I start planning next year?", a: "Late November or December works well: the year is nearly over, so the review is honest, and you have time to set up habits before January." },
      { q: "How many goals should I set for the year?", a: "One per area of life, with only two of them ambitious. Six small, clear goals are easier to keep than one long list of resolutions." },
      { q: "What if I fall behind in March?", a: "Make the habit smaller rather than dropping the goal, and use your next weekly review to choose one step. A plan by area of life is meant to be adjusted, not followed perfectly." },
    ],
    related: ["goals-for-every-area-of-life", "wheel-of-life", "weekly-review"],
    cta: CTA,
  },
  {
    slug: "four-day-work-week-extra-day",
    areas: ["hobby", "career"],
    title: "Four days for work. What is your fifth day for?",
    metaTitle: "4-day work week: what the research found and how to use the extra day",
    description: "What the two largest four-day week studies found, where they fall short, why the extra day fills with errands, and how to decide what yours is for.",
    label: "Guide · Four-day week",
    lede: "Getting a four-day week is the easy part to talk about. The harder part starts the first free Wednesday or Friday: a weekday with nothing in it fills up quickly, first with errands, then with email, and sometimes with a fifth workday from the sofa. This guide covers what the research actually found and how to keep the day for what you want it for.",
    published: "2026-10-27",
    updated: "2026-11-25",
    minutes: 6,
    media: PHOTO("/images/how-score.jpg", "A person walking along a waterfront path at sunset"),
    sections: [
      {
        h2: "What the research found, and what it didn't",
        blocks: [
          { p: "The study most people quote is the UK pilot of 2022. 61 companies and about 2,900 employees cut their hours by a fifth for six months, with no cut in pay. At the end, 71% of employees said their burnout was lower and 39% said they were less stressed. 56 of the 61 companies kept the four-day week, and 18 made it permanent ([Autonomy, 2023](https://autonomy.work/portfolio/uk4dwpilotresults/)). Sick days fell by 65% ([University of Cambridge, 2023](https://www.sociology.cam.ac.uk/news/new-results-worlds-largest-trial-four-day-working-week))." },
          { p: "In 2025 the same research team published a larger analysis: 2,896 employees at 141 companies in six countries, compared with 12 companies that were interested but didn't switch. Burnout went down, and job satisfaction, mental health and physical health went up. The people whose hours fell the most saw the biggest change ([Fan et al., Nature Human Behaviour, 2025](https://doi.org/10.1038/s41562-025-02259-6))." },
          { p: "It's worth reading those numbers with their limits. The companies volunteered, so they were the ones most likely to make it work. The results are what people reported about themselves. Most of the jobs were office jobs in English-speaking countries. The authors say so themselves and call for randomised trials. So the evidence is a strong signal, not a promise that it will work for every team." },
        ],
      },
      {
        h2: "Where the day goes if you don't decide",
        blocks: [
          { p: "In the UK pilot, 54% of employees said it became easier to keep up with household jobs, and 62% said it was easier to combine work with a social life ([Autonomy, 2023](https://autonomy.work/portfolio/uk4dwpilotresults/)). That makes sense. The first thing a free weekday does is take the dentist, the bank and the shopping off your Saturday." },
          { p: "Nothing is wrong with that. The problem is when errands, a quick look at email and an hour of scrolling take the whole day, every week, and the time you got back ends up doing the same job your evenings used to do." },
          { p: "Our team has worked four days a week from the start, with Wednesday off. Edward wrote about why Wednesday and what turned out harder than expected in [Why we work four days a week, with Wednesday off](/blog/four-day-week-wednesday-off). The short version: a day off has to be protected from work on purpose, or it doesn't stay a day off." },
        ],
      },
      {
        h2: "Decide what the day is for",
        blocks: [
          { p: "You don't need a detailed plan. You need one answer, decided before the day starts, to the question “what is this day for?”. A simple way to get it:" },
          { steps: [
            { title: "Look at all six areas of your life", text: "Rate [health](/guides/health), [relationships](/guides/relationships), [spirituality](/guides/spirituality), [leisure](/guides/leisure), [personal growth](/guides/personal-growth) and [finance & career](/guides/finance-and-career) from 1 to 10. It takes a few minutes, and the [Wheel of Life](/guides/wheel-of-life) shows how." },
            { title: "Give the day one area", text: "The lowest one, or the one you miss most. A long run and cooking, an afternoon with a parent, a course, the project you keep putting off." },
            { title: "Put errands in the morning and stop", text: "Admin is a fair use of a free weekday. Give it a block of a couple of hours, so it doesn't spread over the whole day." },
            { title: "Close work for the day", text: "No email and no “just one call”. A day spent half-working gives you neither the rest nor the work." },
            { title: "Choose again each month", text: "Re-score your areas at the end of the month. Over a year, the same day can go to different parts of your life in turn." },
          ] },
        ],
      },
      {
        h2: "Compressed or reduced hours: it changes what's left",
        blocks: [
          { p: "Not every four-day week is the same. In the UK pilot hours went down, with the same pay. A compressed week keeps the same hours and fits them into four longer days. A nine-day fortnight gives one extra day off every two weeks." },
          { p: "This matters for the fifth day. After four ten-hour days, the free day often turns into recovery, and there's not much left for anything else. With fewer total hours, there's usually energy left for something you chose. If you want to see the difference in numbers, the [free hours calculator](/tools#hours-calculator) does the sum for both versions." },
        ],
      },
      {
        h2: "If you want to ask for one",
        blocks: [
          { p: "Ask for a trial, not a permanent change. A manager finds it much easier to say yes to three months with a review date than to “forever”." },
          { list: [
            "Check your contract and your country's rules first. In some places you have a legal right to request flexible working.",
            "Be specific about the model: fewer hours, compressed hours or a nine-day fortnight, and what happens to pay.",
            "Show how your work stays covered, and which day suits the team.",
            "Suggest two or three measures your manager already tracks, and a date to look at them together.",
          ] },
          { p: "If the answer is no, ask what would need to be true for a yes in six months. It turns a refusal into something you can work towards." },
        ],
      },
      {
        h2: "No four-day week? You can still take part of one",
        blocks: [
          { p: "Most people don't have a four-day week, and won't get one soon. You can still borrow the idea: two evenings a week that work doesn't touch, and one weekend morning, add up to roughly a working day. Give those hours one area of life, the same way as above." },
          { p: "[Elegix](/about) is built around this choice: you see your 6 areas side by side, the weekly check-in shows which one is slipping, and you decide where your free time goes next." },
        ],
      },
    ],
    faq: [
      { q: "Does a four-day week reduce burnout?", a: "In the UK pilot of 61 companies, 71% of employees reported lower burnout after six months, and a 2025 study of 141 companies in Nature Human Behaviour found the same direction. Both relied on companies that volunteered and on self-reported results, so the effect may be smaller in a typical workplace." },
      { q: "What should I do with my extra day off?", a: "Keep errands to one block in the morning, then give the rest of the day to one area of life you want more of. Decide it before the day starts, and choose again each month." },
      { q: "Is a four-day week the same as compressed hours?", a: "No. A compressed week fits the same hours into four longer days. A reduced-hours week, like the UK pilot, cuts the total hours, usually with no cut in pay." },
    ],
    related: ["signs-of-burnout", "work-life-balance", "wheel-of-life"],
    changes: [
      { date: "2026-11-25", text: "Rewritten and shortened. Research now cited from the original studies, with their limits. The free hours calculator moved to the Tools page." },
    ],
    cta: CTA,
  },
];


const area = (key: AreaKey, g: Omit<AreaGuide, "area" | "areas" | "slug" | "media" | "published" | "updated" | "cta">): AreaGuide => ({
  area: key,
  areas: [key],
  slug: AREA_SLUGS[key],
  media: { ...AREAS_SECTION.media[key], ratio: "16 / 9" },
  published: "2026-10-22",
  updated: "2026-10-22",
  cta: CTA,
  ...g,
});

const NEXT_STEP = (name: string): Block => ({
  tip: `Not sure where ${name} stands? Rate all 6 areas in the free [Life Balance Check](/#check), or read [how to fill in the Wheel of Life](/guides/wheel-of-life).`,
});

const BASE_AREA_GUIDES: AreaGuide[] = [
  area("health", {
    title: "Health and work-life balance: how to stop trading your body for your career",
    metaTitle: "Health and work-life balance: sleep and energy",
    description: "Why health is the first life area to slip when work gets busy, signs to watch for, and 5 small habits that protect your sleep, movement and energy.",
    label: "Life area · Health",
    lede: `${AREAS.health.description} It's the foundation every other area stands on, and the first one to go when work gets loud.`,
    minutes: 4,
    sections: [
      { h2: "Why health slips first", blocks: [
        { p: "Health pays later. Skipping a workout or staying up late costs nothing today, so it's the easiest trade to make when a deadline is close. A few months of easy trades add up to low energy, poor sleep and a body that complains at every holiday." },
        { p: "Health also lifts everything else. When you sleep well and move regularly, you're more patient with people, better at your job and more likely to have energy left for fun." },
      ] },
      { h2: "Signs your health score is low", blocks: [
        { list: ["You wake up tired after a full night's sleep.", "Exercise has quietly disappeared from your week.", "You eat at your desk, late, or whatever is fastest.", "Coffee is doing the work your sleep used to do.", "You get ill as soon as you slow down."] },
      ] },
      { h2: "5 small habits that protect your health", blocks: [
        { steps: [
          { title: "A fixed shutdown time", text: "Pick a time when work ends and screens dim. Sleep improves more from a consistent bedtime than from any supplement." },
          { title: "Movement you don't have to schedule", text: "Walk to calls, take the stairs, do a 20-minute walk after lunch. Small and daily beats big and rare." },
          { title: "Two workouts in the calendar", text: "Book them like meetings, on the same days every week." },
          { title: "One real meal away from the screen", text: "At least once a day, eat sitting down without your laptop." },
          { title: "A weekly score", text: "Rate your health from 1 to 10 every week in a [weekly review](/guides/weekly-review). A falling number is an early warning." },
        ] },
        NEXT_STEP("your health"),
      ] },
    ],
    faq: [
      { q: "How do I balance health and a demanding job?", a: "Protect sleep first, then add movement that fits into the day you already have, such as walking calls. Track your health score weekly so you notice a slide before it becomes a problem." },
    ],
  }),
  area("people", {
    title: "Balancing work and relationships: keeping the people who matter close",
    metaTitle: "How to balance work and relationships",
    description: "How to balance work with family, friends and a partner: signs the people who matter get your leftovers, and 5 habits that keep you close.",
    label: "Life area · Relationships",
    lede: `${AREAS.people.description} When work gets busy, the people who matter often get whatever energy is left.`,
    minutes: 4,
    sections: [
      { h2: "Why relationships fade quietly", blocks: [
        { p: "Relationships rarely end in one moment. You miss one dinner, then a birthday call, then a friend stops asking. The people closest to you are also the most forgiving, which makes them the easiest to postpone." },
      ] },
      { h2: "Signs your relationships score is low", blocks: [
        { list: ["Friends stopped inviting you because you always say no.", "You're physically home but mentally still at work.", "You can't remember the last long conversation with your partner or parents.", "You feel lonely even though you talk to people all day."] },
      ] },
      { h2: "5 habits that keep you close", blocks: [
        { steps: [
          { title: "One call a week", text: "Pick a regular slot, like Sunday afternoon, to call someone you miss." },
          { title: "Phone-free dinners", text: "Put the phone in another room for one meal a day with the people you live with." },
          { title: "A standing plan", text: "A monthly dinner or walk with close friends, on a fixed day, so nobody has to organise it." },
          { title: "Say what you're busy with", text: "Tell the people close to you about your heavy weeks in advance. It turns absence into a shared plan." },
          { title: "Score it weekly", text: "Rate your relationships from 1 to 10 in your [weekly review](/guides/weekly-review). If it drops two weeks in a row, it gets next week's step." },
        ] },
        NEXT_STEP("your relationships"),
      ] },
    ],
    faq: [
      { q: "How do I balance work and a relationship?", a: "Make time for each other predictable rather than leftover: a fixed evening together, phone-free meals, and telling your partner about heavy weeks before they happen." },
    ],
  }),
  area("meaning", {
    title: "Spirituality and inner calm: making room for meaning in a busy life",
    metaTitle: "Spirituality as a life area: values and inner calm",
    description: "Spirituality as an area of life is about values, reflection and inner calm, religious or not. Signs it's neglected and practices for a busy week.",
    label: "Life area · Spirituality",
    lede: `${AREAS.meaning.description} It doesn't have to be religious. It's the part of life that answers “why am I doing all this?”`,
    minutes: 4,
    sections: [
      { h2: "What spirituality means here", blocks: [
        { p: "For some people it's faith. For others it's meditation, time in nature, or simply knowing their values and living by them. What they share is a pause: time to step back from doing and ask whether it still points where you want to go." },
        { p: "Busy days leave no time for that question, and without it, even success can feel hollow." },
      ] },
      { h2: "Signs your spirituality score is low", blocks: [
        { list: ["You're busy all the time but can't say what it's for.", "Your mind races when you try to be still.", "You make decisions that don't feel like you.", "Success feels flat."] },
      ] },
      { h2: "Practices that fit a busy week", blocks: [
        { steps: [
          { title: "Five quiet minutes a day", text: "Meditation, prayer, or just sitting with a coffee and no phone. Same time each day." },
          { title: "Write your values down", text: "Five words that describe how you want to live. Re-read them when you make a big decision." },
          { title: "A weekly reflection", text: "Ten minutes on Friday or Sunday: what mattered this week, what didn't. A [weekly review](/guides/weekly-review) is a good home for it." },
          { title: "Time outside", text: "A walk without headphones once a week. Nature does a lot of the work." },
        ] },
        NEXT_STEP("your inner calm"),
      ] },
    ],
  }),
  area("hobby", {
    title: "Leisure and hobbies: why fun is not a waste of time",
    metaTitle: "Leisure and hobbies: why rest and fun matter",
    description: "Why leisure, hobbies and play are a real area of life for ambitious people, signs you stopped having fun, and how to bring rest back into your week.",
    label: "Life area · Leisure",
    lede: `${AREAS.hobby.description} When did you last do something just for fun? If you have to think about it, this area needs you.`,
    minutes: 4,
    sections: [
      { h2: "Why leisure matters", blocks: [
        { p: "Ambitious people often treat fun as a reward for when everything is done. Everything is never done. Leisure is how you recover: it's what makes the next week of hard work possible, and often where your best ideas show up." },
        { p: "Rest is also different from numbing. Scrolling and another episode pass the time but rarely refill you. Hobbies, play and creative things usually do." },
      ] },
      { h2: "Signs your leisure score is low", blocks: [
        { list: ["Your hobbies turned into “someday”.", "Free evenings feel empty, so you fill them with work or a screen.", "You feel guilty when you're not being productive.", "Holidays are spent answering email."] },
      ] },
      { h2: "How to bring fun back", blocks: [
        { steps: [
          { title: "Pick one old hobby", text: "Something you loved before work took over. Book one hour for it this week." },
          { title: "Make it social", text: "A weekly game, class or match with friends is harder to cancel than a solo plan." },
          { title: "Guard one evening", text: "One evening a week with no work and no plan to be productive." },
          { title: "Track it", text: "Give leisure a score every week. It's the area most people forget to measure, and the one that drops first after health." },
        ] },
        NEXT_STEP("your leisure time"),
      ] },
    ],
  }),
  area("growth", {
    title: "Personal growth: keep learning when work takes all your time",
    metaTitle: "Personal growth: keep learning when you're busy",
    description: "Personal growth as a life area: learning, skills, reading and new challenges. Signs you stopped growing, and weekly habits that fit a busy job.",
    label: "Life area · Personal growth",
    lede: `${AREAS.growth.description} Learning often stops when a busy season starts, and the season never ends.`,
    minutes: 4,
    sections: [
      { h2: "Growth is more than your job", blocks: [
        { p: "Work teaches you a lot, but only what your role needs. Personal growth is learning you choose: a language, a skill, books outside your field, a challenge that scares you a little. It keeps life interesting and opens doors your job won't." },
      ] },
      { h2: "Signs your growth score is low", blocks: [
        { list: ["You haven't finished a book in months.", "You keep saving courses you never start.", "Every week feels the same as the last.", "You're good at your job but bored."] },
      ] },
      { h2: "Small habits that keep you growing", blocks: [
        { steps: [
          { title: "20 pages a day", text: "Before bed, instead of the phone. That's around a book a month." },
          { title: "One skill per quarter", text: "Choose one thing to learn for three months and drop the rest of the list." },
          { title: "Learn in public", text: "Share what you learn with a friend or online. Teaching makes it stick." },
          { title: "Tie it to a goal", text: "Link the habit to a concrete goal, as in [how to set goals for every area of life](/guides/goals-for-every-area-of-life)." },
        ] },
        NEXT_STEP("your personal growth"),
      ] },
    ],
  }),
  area("career", {
    title: "Finance and career: ambition without losing the rest of your life",
    metaTitle: "Finance and career: ambition with balance",
    description: "Career is often your strongest life area and the one that drains the rest. How to check work takes you where you want, and keep ambition in balance.",
    label: "Life area · Finance & career",
    lede: `${AREAS.career.description} For ambitious people it's often the highest score on the wheel, and the one quietly taking time from all the others.`,
    minutes: 4,
    sections: [
      { h2: "A high score can still be a problem", blocks: [
        { p: "Work gets every hour. The question is whether it's taking you where you want to go. A 9 in career next to a 3 in health and a 3 in relationships isn't success; it's a loan the rest of your life is paying off. Read more on [improving work-life balance when you love your work](/guides/work-life-balance)." },
        { p: "Finance belongs here too. Money stress follows you home, and a little financial safety buys freedom in every other area." },
      ] },
      { h2: "Questions to score this area honestly", blocks: [
        { list: ["Is my work moving me toward something I want in five years?", "Do I feel in control of my money, or does it control me?", "Do I have savings for three months without income?", "Would I choose this job again today?"] },
      ] },
      { h2: "Habits that keep career and money in balance", blocks: [
        { steps: [
          { title: "One career goal a year", text: "A promotion, a skill, a side project. Write why it matters to you, not just to your employer." },
          { title: "Pay yourself first", text: "Move a fixed amount to savings on payday, before you spend." },
          { title: "A hard stop", text: "End work at a set time on most days, so career doesn't absorb every other area." },
          { title: "Watch the other five", text: "If career rises while health or relationships fall for a month, that's your cue to rebalance. A [weekly review](/guides/weekly-review) shows it early, and the [signs of burnout](/guides/signs-of-burnout) are worth knowing." },
        ] },
        NEXT_STEP("your career and finances"),
      ] },
    ],
  }),
];

/** Words in a page's body, for the "min read" label. */
const wordCount = (g: Pick<Guide, "lede" | "sections" | "faq">) => {
  const text = [g.lede, ...g.sections.flatMap((s) => [s.h2, ...s.blocks.map((b) => JSON.stringify(b))]), ...(g.faq ?? []).flatMap((f) => [f.q, f.a])].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
};

/** Merges a page's extra sections and questions in, before the closing section about Elegix. */
function withExtras<T extends Guide | AreaGuide>(g: T, extras: Record<string, GuideExtra> = EXTRAS): T {
  const extra = extras[g.slug];
  if (!extra) return g;
  const last = g.sections.length - 1;
  const closes = last >= 0 && /elegix/i.test(JSON.stringify(g.sections[last]));
  const at = closes ? last : g.sections.length;
  const placed = extra.sections.filter((x) => x.before);
  const rest = extra.sections.filter((x) => !x.before).map(({ h2, blocks }) => ({ h2, blocks }));
  const sections = [...g.sections.slice(0, at), ...rest, ...g.sections.slice(at)];
  for (const { before, h2, blocks } of placed) {
    const i = sections.findIndex((s) => s.h2 === before);
    sections.splice(i < 0 ? at : i, 0, { h2, blocks });
  }
  const faq = [...(g.faq ?? []), ...(extra.faq ?? [])];
  const minutes = Math.max(g.minutes, Math.round(wordCount({ lede: g.lede, sections, faq }) / 230));
  return { ...g, sections, faq, minutes, updated: extra.updated ?? g.updated, ...(extra.changes ? { changes: extra.changes } : {}) };
}

export const GUIDES: Guide[] = BASE_GUIDES.map((g) => withExtras(g));
export const AREA_GUIDES: AreaGuide[] = BASE_AREA_GUIDES.map((g) => withExtras(g));

/** A page in Ukrainian when its translation exists (with the Ukrainian extra sections), otherwise the English page. */
function toUk<T extends Guide | AreaGuide>(g: T): T {
  const t = UK_GUIDES[g.slug];
  if (!t) return withExtras(g);
  const { alt, changes, ...text } = t;
  const base = { ...g, ...text, media: { ...g.media, alt }, ...(changes ? { changes } : {}) } as T;
  return withExtras(base, UK_EXTRAS);
}

const UK_SET = { GUIDES: BASE_GUIDES.map(toUk), AREA_GUIDES: BASE_AREA_GUIDES.map(toUk) };

/** True when the page has a Ukrainian translation. */
export const hasUk = (slug: string) => slug in UK_GUIDES;

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const areaGuideBySlug = (slug: string) => AREA_GUIDES.find((g) => g.slug === slug);
export const areaGuideHref = areaHref;

export const guideHref = (g: Guide | AreaGuide) => ("area" in g ? areaGuideHref(g.area) : `/guides/${g.slug}`);

/** Every outside source a page links to, in reading order, once each: the page's "Sources" list. */
export function sourcesOf(g: Pick<Guide, "sections" | "faq">): { label: string; url: string }[] {
  const text = [...g.sections.flatMap((s) => s.blocks.map((b) => JSON.stringify(b))), ...(g.faq ?? []).map((f) => f.a)].join(" ");
  const seen = new Set<string>();
  const out: { label: string; url: string }[] = [];
  for (const m of text.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)) {
    const key = m[2].replace(/\/$/, "");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ label: m[1], url: m[2] });
  }
  return out;
}

/** "Keep reading" for a guide: up to two hand-picked links, then the closest pages by shared life areas
 *  (other guides and the page of its main area), so every guide also links one page it has no manual link to
 *  and new guides join in without editing older ones. */
export function relatedTo(g: Guide, count = 3): (Guide | AreaGuide)[] {
  const picked = g.related.map(guideBySlug).filter((r): r is Guide => r !== undefined).slice(0, count - 1);
  const score = (o: Guide | AreaGuide) => {
    if (!g.areas.length) return "area" in o ? 0 : o.areas.length ? 1 : 2;
    const shared = o.areas.filter((a) => g.areas.includes(a)).length;
    return shared * 2 + ("area" in o && o.area === g.areas[0] ? 3 : 0);
  };
  const auto = [...GUIDES, ...AREA_GUIDES]
    .filter((o) => o.slug !== g.slug && !picked.includes(o as Guide))
    .map((o, i) => ({ o, s: score(o), i }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.o);
  return [...picked, ...auto].slice(0, count);
}

/** The life areas a guide or life area page is about (empty: all 6). */
export const areasOf = (o: Guide | AreaGuide): AreaKey[] => ("area" in o ? [o.area] : o.areas);
/** "Guide · 12 min read" or "Life area · 8 min read": the line under every card. */
export const cardMeta = (o: Guide | AreaGuide, lang: Lang = "en") => lang === "uk"
  ? `${"area" in o ? "Сфера життя" : "Гайд"} · ${o.minutes} хв читання`
  : `${"area" in o ? "Life area" : "Guide"} · ${o.minutes} min read`;

/** Guides about one life area, for that area's page and the hub filter. */
export const guidesForArea = (key: AreaKey) => GUIDES.filter((g) => g.areas.includes(key));

/** Headline of the waitlist box in the middle of a guide, matched to its main life area. */
const MID_CTA: Record<AreaKey | "all", string> = {
  all: "See all 6 areas of your life in one place",
  health: "Notice when sleep and energy start to slip",
  people: "Keep the people who matter on your radar",
  career: "Keep work from eating the other 5 areas",
  hobby: "Make room for rest, and see if you take it",
  meaning: "Check in with what matters, every week",
  growth: "Track the growth you keep postponing",
};
export const midCtaTitle = (g: { areas: AreaKey[] }) => MID_CTA[g.areas[0] ?? "all"];

/** The guides and life area pages in one language, with the helpers that depend on them. */
export function guidesOf(lang: Lang) {
  const set = lang === "uk" ? UK_SET : { GUIDES, AREA_GUIDES };
  const bySlug = (slug: string) => set.GUIDES.find((g) => g.slug === slug);
  return {
    ...set,
    guideBySlug: bySlug,
    areaGuideBySlug: (slug: string) => set.AREA_GUIDES.find((g) => g.slug === slug),
    guidesForArea: (key: AreaKey) => set.GUIDES.filter((g) => g.areas.includes(key)),
    /** relatedTo() in this language: the same picks, the localized pages */
    relatedTo: (g: Guide, count = 3) => relatedTo(GUIDES.find((e) => e.slug === g.slug) ?? g, count)
      .map((r) => ("area" in r ? set.AREA_GUIDES.find((x) => x.slug === r.slug) : bySlug(r.slug)) ?? r),
    midCtaTitle: (g: { areas: AreaKey[] }) => (lang === "uk" ? MID_CTA_UK : MID_CTA)[g.areas[0] ?? "all"],
  };
}

const MID_CTA_UK: Record<AreaKey | "all", string> = {
  all: "Усі 6 сфер життя в одному місці",
  health: "Помічай, коли сон і енергія починають просідати",
  people: "Тримай найважливіших людей у полі зору",
  career: "Не дай роботі з’їсти решту 5 сфер",
  hobby: "Залиш місце для відпочинку й перевір, чи ти ним користуєшся",
  meaning: "Звіряйся з тим, що важливо, щотижня",
  growth: "Відстежуй розвиток, який постійно відкладаєш",
};
