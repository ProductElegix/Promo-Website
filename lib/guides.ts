/**
 * Guides (/guides/…) and life area pages (/life-areas/…): long-form pages written for the searches people
 * actually make ("wheel of life", "signs of burnout", "how to improve work life balance"). Each one ends in
 * the waitlist, so search traffic turns into signups.
 *
 * Inline markup in body text (see components/ui/Inline.tsx):
 *   [words](/path)  a link, internal or external
 *   **words**       bold
 */
import { AREAS, AREAS_SECTION, type AreaKey, type MediaSlot } from "@/lib/content";

export type Block =
  | { p: string }
  | { list: string[] }
  | { steps: { title: string; text: string }[] }
  | { tip: string };

export type Guide = {
  slug: string;
  /** the h1 */
  title: string;
  /** the <title> tag, without the " · Elegix" suffix */
  metaTitle: string;
  description: string;
  label: string;
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
  cta: { title: string; text: string };
};

export type AreaGuide = Omit<Guide, "related"> & { area: AreaKey };

const CTA = {
  title: "See all 6 areas of your life in *one place*",
  text: "Elegix tracks your goals, habits and tasks across 6 life areas and shows which one is slipping, before it turns into burnout. Free app for iOS and Android. Join the waitlist for early access.",
};

const PHOTO = (src: string, alt: string): MediaSlot => ({ src, alt, brief: alt, ratio: "16 / 9" });

export const GUIDES: Guide[] = [
  {
    slug: "wheel-of-life",
    title: "The Wheel of Life: how to fill it in and what to do with your score",
    metaTitle: "Wheel of Life: free template, how to fill it in and what it means",
    description: "What the Wheel of Life is, how to score your 6 life areas in 10 minutes, how to read the shape of your wheel and how to turn your lowest score into one small weekly step.",
    label: "Guide · Wheel of Life",
    lede: "The Wheel of Life is a one-page picture of how satisfied you are with each part of your life. It takes ten minutes, needs nothing but a pen, and shows in one glance what a to-do list never will: which part of your life you have stopped looking at.",
    published: "2026-10-22",
    updated: "2026-10-22",
    minutes: 7,
    media: PHOTO("/images/area-meaning.jpg", "A woman standing at a tall window at dusk, thinking"),
    sections: [
      {
        h2: "What is the Wheel of Life?",
        blocks: [
          { p: "The Wheel of Life is a circle split into slices, one slice for each area of your life. You rate how satisfied you are with each area from 1 to 10 and shade each slice up to that number. The result looks like a wheel with a bumpy edge, and the bumps are the point: they show where your life is out of balance." },
          { p: "The tool is usually credited to Paul J. Meyer, who used it in his coaching programmes in the 1960s. Coaches and therapists still use it today because it is fast, honest and hard to argue with. You don't need an app to do it, though an app helps you repeat it and see the change over time." },
        ],
      },
      {
        h2: "The 6 areas of life to score",
        blocks: [
          { p: "Versions of the wheel use anywhere from 6 to 12 areas. More slices give more detail but make the picture harder to read and the habit harder to keep. Elegix uses six, because six is enough to cover a whole life and few enough to rate in under a minute:" },
          { list: [
            "**[Health](/life-areas/health):** sleep, movement, food and energy.",
            "**[Relationships](/life-areas/relationships):** family, friends, partner and community.",
            "**[Spirituality](/life-areas/spirituality):** values, reflection, mindfulness and inner calm.",
            "**[Leisure](/life-areas/leisure):** rest, play, creativity and things you do for fun.",
            "**[Personal growth](/life-areas/personal-growth):** learning, skills, reading and new challenges.",
            "**[Finance & career](/life-areas/finance-and-career):** work, income, savings and business.",
          ] },
          { p: "If one area matters a lot to you and doesn't fit, such as home or parenting, add it. A wheel you believe in beats a perfect template." },
        ],
      },
      {
        h2: "How to fill in your Wheel of Life in 10 minutes",
        blocks: [
          { steps: [
            { title: "Draw the wheel", text: "Draw a circle and split it into six equal slices. Write one area next to each slice. Mark rings from 1 at the centre to 10 at the edge." },
            { title: "Ask one question per area", text: "“How satisfied am I with this part of my life right now?” Not last year, not after the next promotion. Today." },
            { title: "Score fast", text: "Give each area a number from 1 to 10 in a few seconds. Your first answer is usually the honest one. 10 means you wouldn't change a thing; 1 means it hurts." },
            { title: "Shade each slice", text: "Colour each slice from the centre out to its score. Now look at the edge of the shape you drew." },
            { title: "Write one sentence per low score", text: "For every area under 6, finish the sentence “It's low because…”. This turns a number into something you can act on." },
          ] },
          { tip: "Don't want to draw? Take the free [Life Balance Check](/#check) on our home page: rate the same 6 areas and we email your score and one first step for your lowest area." },
        ],
      },
      {
        h2: "How to read your wheel",
        blocks: [
          { p: "Look at the shape before you look at the numbers. Three patterns come up again and again:" },
          { list: [
            "**One deep dent.** Most areas are fine and one is far behind. This is the easiest wheel to fix: you know exactly where to start.",
            "**A lopsided wheel.** One or two areas are at 8 to 10 and the rest are low. This is the classic shape of people who are crushing it at work and losing the rest. The high area is often feeding on the time and energy of the others.",
            "**A small, even wheel.** Everything sits around 4 or 5. Nothing is on fire, and nothing feels good. This often points at tiredness or burnout rather than at one area. Start with [health](/life-areas/health) and rest.",
          ] },
          { p: "Your average across all areas is your balance score. It's useful to track, but the gaps matter more than the average: a 7 made of 9s and 3s feels very different from a 7 made of 7s." },
        ],
      },
      {
        h2: "What to do after you fill it in",
        blocks: [
          { p: "The wheel is a diagnosis, not a plan. Most people stop at the picture, feel bad for a day and change nothing. Instead:" },
          { steps: [
            { title: "Pick one area", text: "Choose the lowest score, or the one where a small change would lift the others. Better sleep often lifts health, leisure and work at once." },
            { title: "Choose one weekly action", text: "Make it small enough that you can't fail: two evening walks, one call to a friend, one hour of reading on Sunday." },
            { title: "Re-score every week", text: "Rate all six areas again once a week. It takes a minute and catches a slipping area before it turns into a crisis." },
            { title: "Review once a month", text: "Compare four weeks of scores. Did the dent close? Did another area pay the price? Adjust and pick the next area." },
          ] },
          { p: "This weekly loop is exactly what [Elegix](/about) is built around: a 1-minute weekly check-in, goals and habits tied to each area, and a monthly review. Read more in our guide to the [10-minute weekly review](/guides/weekly-review)." },
        ],
      },
    ],
    faq: [
      { q: "How often should I do the Wheel of Life?", a: "A full wheel with notes once a month, and a quick re-score of all areas once a week. Weekly scores catch problems early; the monthly wheel shows the trend." },
      { q: "What is a good Wheel of Life score?", a: "There is no passing grade. Most people land between 5 and 7 on average. What matters is the gap between your highest and lowest area and whether your lowest area is moving up." },
      { q: "Should every area be a 10?", a: "No. Balance doesn't mean equal. A launch month or a new baby will pull your wheel out of shape for a while. The goal is to notice it and choose it, not to let an area slide for a year without looking." },
      { q: "Is there a Wheel of Life app?", a: "Elegix is a life balance tracker built on the Wheel of Life: you rate your 6 areas weekly, link goals and habits to them and see your balance over time. It's free on iOS and Android; join the waitlist for early access." },
    ],
    related: ["goals-for-every-area-of-life", "weekly-review", "signs-of-burnout"],
    cta: CTA,
  },
  {
    slug: "signs-of-burnout",
    title: "12 signs of burnout in high achievers, and what to do first",
    metaTitle: "Signs of burnout in high achievers: 12 early warnings",
    description: "Burnout in ambitious people rarely looks like collapse. 12 early signs in your body, your work and your relationships, and the first small steps that help.",
    label: "Guide · Burnout",
    lede: "High achievers rarely burn out in one dramatic day. They keep delivering, the results stay good, and the cost shows up somewhere else first: sleep, patience, friends, the things they used to enjoy. Here is what to watch for, and what to do when you see it.",
    published: "2026-10-22",
    updated: "2026-10-22",
    minutes: 6,
    media: PHOTO("/images/area-career.jpg", "A woman working late on a laptop at a wooden table"),
    sections: [
      {
        h2: "What burnout is (and isn't)",
        blocks: [
          { p: "The World Health Organization describes burnout as the result of chronic workplace stress that hasn't been managed, with three signs: exhaustion, growing mental distance or cynicism about your work, and a drop in how effective you feel. It's not a weakness and it's not the same as a bad week. It builds over months." },
          { p: "This article is not medical advice. If you feel hopeless, can't function day to day or have thoughts of harming yourself, talk to a doctor or a mental health professional today." },
        ],
      },
      {
        h2: "Early signs in your body",
        blocks: [
          { list: [
            "**You're tired after a full night's sleep.** Rest stops working the way it used to.",
            "**Sleep is the first thing you cut.** Late nights feel like the only time that's yours.",
            "**You get sick at the start of every holiday.** Your body waits for permission to crash.",
            "**Exercise quietly disappeared.** Not a decision, just weeks without it.",
          ] },
        ],
      },
      {
        h2: "Early signs in your work",
        blocks: [
          { list: [
            "**Everything feels urgent and nothing feels important.** You're busy all day and can't say what moved.",
            "**Small tasks feel heavy.** An email you'd have answered in two minutes sits for three days.",
            "**Cynicism creeps in.** You catch yourself thinking “what's the point” about work you used to care about.",
            "**You can't switch off.** Work thoughts follow you into the shower, dinner and bed.",
          ] },
        ],
      },
      {
        h2: "Early signs in the rest of your life",
        blocks: [
          { list: [
            "**Friends stopped asking.** You declined enough times that the invitations dried up.",
            "**Hobbies became “someday”.** You can't remember the last thing you did just for fun.",
            "**You're short with the people closest to you.** Patience is gone by the time you get home.",
            "**You numb instead of rest.** Scrolling, snacks, another episode: things that pass time but don't refill you.",
          ] },
          { p: "Notice the pattern: almost none of these signs show up in your work results at first. That's why high achievers miss them. The areas that slip are the ones you stopped measuring." },
        ],
      },
      {
        h2: "What to do first",
        blocks: [
          { steps: [
            { title: "Make it visible", text: "Score your 6 life areas from 1 to 10 with the [Wheel of Life](/guides/wheel-of-life). Seeing “Health 3, Leisure 2” on paper is harder to ignore than a vague feeling of being tired." },
            { title: "Protect sleep before anything else", text: "Pick a fixed time to stop work in the evening and hold it for two weeks. Most other fixes work better once you're rested." },
            { title: "Add one thing back", text: "Choose one thing that used to refill you, a walk, a call, an instrument, and put it in your calendar this week like a meeting." },
            { title: "Check in weekly", text: "Re-score your areas once a week. A [10-minute weekly review](/guides/weekly-review) catches the slide early, long before it becomes burnout." },
            { title: "Talk to someone", text: "A manager, a partner, a friend or a professional. Burnout grows in silence." },
          ] },
        ],
      },
    ],
    faq: [
      { q: "How long does it take to recover from burnout?", a: "It depends on how deep it goes. Early-stage burnout can ease within weeks once sleep, rest and boundaries come back. Long-term burnout can take months and often needs professional support." },
      { q: "Can you burn out from a job you love?", a: "Yes, and passionate people are often more at risk, because loving the work makes it easy to give it every hour while the rest of life quietly empties." },
      { q: "How can I prevent burnout?", a: "Track more than work. When you regularly check how your health, relationships, rest and growth are doing, you notice the slide early and can correct it with small steps instead of a crash." },
    ],
    related: ["work-life-balance", "wheel-of-life", "weekly-review"],
    cta: CTA,
  },
  {
    slug: "work-life-balance",
    title: "How to improve work-life balance when you love your work",
    metaTitle: "How to improve work-life balance (when you love your work)",
    description: "Practical ways to improve work-life balance for ambitious people: measure all 6 areas of life, set boundaries that hold, plan your week around more than work and review it weekly.",
    label: "Guide · Work-life balance",
    lede: "Most advice on work-life balance assumes you hate your job. If you love it, “just work less” doesn't help. What helps is seeing what the rest of your life is paying for your success, and making small, deliberate trades instead of accidental ones.",
    published: "2026-10-22",
    updated: "2026-10-22",
    minutes: 6,
    media: PHOTO("/images/area-health.jpg", "A man running on a track at sunrise"),
    sections: [
      {
        h2: "Balance isn't equal hours",
        blocks: [
          { p: "Work-life balance doesn't mean eight hours of work, eight hours of life and eight of sleep. Some seasons are heavy: a launch, exams, a new role. Balance means no area of your life is neglected for so long that it breaks. It's measured over months, not days." },
          { p: "That's also why “life” is too vague. Life is your [health](/life-areas/health), your [relationships](/life-areas/relationships), your [rest and fun](/life-areas/leisure), your [growth](/life-areas/personal-growth) and your [sense of meaning](/life-areas/spirituality). Each one can slip on its own." },
        ],
      },
      {
        h2: "7 ways to improve your work-life balance",
        blocks: [
          { steps: [
            { title: "Measure the whole picture", text: "Rate your 6 life areas from 1 to 10 with the [Wheel of Life](/guides/wheel-of-life). You'll usually find one or two areas carrying the cost of your career." },
            { title: "Set one hard stop", text: "Pick an end time for work on most days and tell someone about it. One boundary that holds beats five you ignore." },
            { title: "Plan the week, not just the day", text: "On Sunday, put two or three non-work things in your calendar first: a workout, dinner with a friend, an evening off. Work fills the rest." },
            { title: "Tie goals to areas", text: "Next to every goal, write which area of life it serves. If all your goals sit under [finance & career](/life-areas/finance-and-career), that's your answer. See [how to set goals for every area of life](/guides/goals-for-every-area-of-life)." },
            { title: "Protect your first and last hour", text: "No email in the first hour after waking and the last hour before sleep. These hours shape your mood more than any other two." },
            { title: "Make rest active", text: "Swap some scrolling for things that actually refill you: a walk outside, a hobby with your hands, time with people you like." },
            { title: "Review every week", text: "Spend ten minutes on Sunday with a [weekly review](/guides/weekly-review): what went well, which area slipped, one step for next week." },
          ] },
        ],
      },
      {
        h2: "Signs your balance is off",
        blocks: [
          { p: "You're productive but not happy. You keep promising yourself “after this project”. Your friends stopped asking. Your body sends small signals: tired mornings, a sore back, colds at every holiday. If several of these sound familiar, read the [12 signs of burnout in high achievers](/guides/signs-of-burnout)." },
        ],
      },
    ],
    faq: [
      { q: "What is a good work-life balance?", a: "One where no area of your life is neglected for long. You can work hard for a season as long as your health, relationships and rest are not quietly falling apart while you do." },
      { q: "Is there an app for work-life balance?", a: "Elegix is a life balance tracker: it links your goals, habits and tasks to 6 life areas and shows which one is slipping. It's free on iOS and Android; join the waitlist for early access." },
    ],
    related: ["signs-of-burnout", "goals-for-every-area-of-life", "wheel-of-life"],
    cta: CTA,
  },
  {
    slug: "goals-for-every-area-of-life",
    title: "How to set goals for every area of your life",
    metaTitle: "How to set goals for every area of your life (with examples)",
    description: "A simple way to set goals for health, relationships, spirituality, leisure, personal growth and career: one goal per area, a reason why, and a weekly habit that moves it. With examples.",
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
            "**[Health](/life-areas/health):** sleep 7 hours on weeknights for a month. Habit: screens off at 22:30.",
            "**[Relationships](/life-areas/relationships):** reconnect with three old friends this quarter. Habit: one call every Sunday.",
            "**[Spirituality](/life-areas/spirituality):** write down my top five values. Habit: ten minutes of journaling on Friday evening.",
            "**[Leisure](/life-areas/leisure):** learn three songs on the guitar. Habit: two 20-minute practice sessions a week.",
            "**[Personal growth](/life-areas/personal-growth):** read six books this half-year. Habit: 20 pages before bed.",
            "**[Finance & career](/life-areas/finance-and-career):** build a three-month emergency fund. Habit: move a fixed amount to savings every payday.",
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
    related: ["wheel-of-life", "weekly-review", "work-life-balance"],
    cta: CTA,
  },
  {
    slug: "weekly-review",
    title: "The 10-minute weekly review that keeps your life in balance",
    metaTitle: "Weekly review template: 10 minutes to keep your life in balance",
    description: "A simple 10-minute weekly review: re-score your 6 life areas, note one win and one slip, and choose one step for next week. A template you can use every Sunday.",
    label: "Guide · Weekly review",
    lede: "A weekly review is the smallest habit with the biggest effect on balance. Ten minutes once a week is enough to catch a slipping area of your life before it turns into a problem.",
    published: "2026-10-22",
    updated: "2026-10-22",
    minutes: 5,
    media: PHOTO("/images/area-home.jpg", "A bright, tidy living room with plants and an orange armchair"),
    sections: [
      {
        h2: "Why weekly",
        blocks: [
          { p: "Daily reviews are too close: every day looks like an exception. Monthly reviews are too far: by then an area has been slipping for weeks. A week is long enough to see a pattern and short enough to fix it with one small step." },
        ],
      },
      {
        h2: "The 10-minute template",
        blocks: [
          { steps: [
            { title: "Re-score your 6 areas (1 minute)", text: "Rate [health](/life-areas/health), [relationships](/life-areas/relationships), [spirituality](/life-areas/spirituality), [leisure](/life-areas/leisure), [personal growth](/life-areas/personal-growth) and [finance & career](/life-areas/finance-and-career) from 1 to 10. Don't think long; compare with last week." },
            { title: "One win (2 minutes)", text: "What went well? Which goal or habit moved? Write it down. Noticing progress is what keeps you doing this." },
            { title: "One slip (2 minutes)", text: "Which area dropped or stayed low? Finish the sentence “It slipped because…”. Be curious, not harsh." },
            { title: "One step for next week (3 minutes)", text: "Choose one small action for the area that needs you most and put it in your calendar now, with a day and a time." },
            { title: "Look at the week ahead (2 minutes)", text: "Scan your calendar. Is there room for that step? If the week is already full of work, decide now what gives." },
          ] },
          { tip: "Do it at the same time every week, for example Sunday evening with a coffee. A fixed slot turns it into a habit you don't have to think about." },
        ],
      },
      {
        h2: "Add a monthly review",
        blocks: [
          { p: "Once a month, take ten more minutes: look at four weeks of scores, fill in a full [Wheel of Life](/guides/wheel-of-life), and check your [goals for each area of life](/guides/goals-for-every-area-of-life). Keep what works, drop what doesn't, and pick next month's focus area." },
          { p: "In [Elegix](/about) the weekly check-in takes a minute and the monthly review about ten. Your scores, goals and habits are already in one place, so the review is about deciding, not collecting." },
        ],
      },
    ],
    related: ["wheel-of-life", "goals-for-every-area-of-life", "signs-of-burnout"],
    cta: CTA,
  },
];

const AREA_SLUGS: Record<AreaKey, string> = {
  health: "health",
  people: "relationships",
  meaning: "spirituality",
  hobby: "leisure",
  growth: "personal-growth",
  career: "finance-and-career",
};

const area = (key: AreaKey, g: Omit<AreaGuide, "area" | "slug" | "media" | "published" | "updated" | "cta">): AreaGuide => ({
  area: key,
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

export const AREA_GUIDES: AreaGuide[] = [
  area("health", {
    title: "Health and work-life balance: how to stop trading your body for your career",
    metaTitle: "Health and work-life balance: sleep, movement and energy",
    description: "Why health is the first life area to slip when work gets busy, the signs to watch for, and 5 small habits that protect your sleep, movement, food and energy.",
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
    description: "How to balance work and relationships with family, friends and a partner: signs the people who matter are getting your leftovers, and 5 habits that keep you close.",
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
    metaTitle: "Spirituality as a life area: values, reflection and inner calm",
    description: "Spirituality as an area of life is about values, reflection and inner calm, religious or not. Signs it's neglected and simple practices that fit a busy week.",
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
    metaTitle: "Leisure and hobbies: why rest and fun matter for life balance",
    description: "Why leisure, hobbies and play are a real area of life for ambitious people, signs you stopped having fun, and how to bring rest and play back into a full week.",
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
    metaTitle: "Personal growth: how to keep learning when you're busy",
    description: "Personal growth as a life area: learning, skills, reading and new challenges. Signs you stopped growing, and small weekly habits that keep you learning in a busy job.",
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
    metaTitle: "Finance and career as a life area: ambition with balance",
    description: "Finance and career is often the strongest area of life and the one that drains the others. How to tell if work is taking you where you want, and how to keep money and ambition in balance.",
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

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const areaGuideBySlug = (slug: string) => AREA_GUIDES.find((g) => g.slug === slug);
export const areaGuideHref = (key: AreaKey) => `/life-areas/${AREA_SLUGS[key]}`;
