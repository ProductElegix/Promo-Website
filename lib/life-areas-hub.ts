import type { Block } from "@/lib/guides";

/** Long-form copy under the cards on /life-areas: what areas of life are, why 6, and the 8- and 12-area models. */
export const LIFE_AREAS_HUB: { sections: { h2: string; blocks: Block[] }[]; faq: { q: string; a: string }[] } = {
  sections: [
    {
      h2: "What are the areas of life?",
      blocks: [
        { p: "Areas of life are the big parts that, together, make up your whole life: your body, the people you love, your sense of meaning, your rest, your learning and your work and money. Coaches also call them life domains, life categories or the spokes of a [Wheel of Life](/guides/wheel-of-life)." },
        { p: "Splitting life into areas does one simple thing: it turns “I feel off” into “my health is a 4 and everything else is fine”. A vague feeling is hard to act on. A low score in one named area tells you exactly where to put your next hour." },
        { p: "Areas are not goals and not tasks. An area is a place in your life that needs care for as long as you live. Goals and habits live inside areas. “Run a 10K” and “sleep by 11” both belong to Health; “call Mum on Sundays” belongs to Relationships. When every goal sits in an area, you can see at a glance which parts of your life get attention and which get none." },
      ],
    },
    {
      h2: "The 6 areas of life in Elegix",
      blocks: [
        { list: [
          "**[Health](/life-areas/health):** sleep, movement, food, energy and mental health. The base the other five stand on.",
          "**[Relationships](/life-areas/relationships):** partner, family, friends and community. Time and attention for the people who matter.",
          "**[Spirituality](/life-areas/spirituality):** meaning, values, faith or reflection. Knowing why you do what you do, religious or not.",
          "**[Leisure](/life-areas/leisure):** rest, fun, hobbies and play. Time that is not meant to be useful.",
          "**[Personal growth](/life-areas/personal-growth):** learning, skills, reading and new challenges you choose for yourself.",
          "**[Finance & career](/life-areas/finance-and-career):** work, income, savings and the direction of your career.",
        ] },
        { p: "Each area page above explains what the area covers, the signs it's slipping, and small weekly habits that bring it back." },
      ],
    },
    {
      h2: "Why 6 areas and not 8 or 12?",
      blocks: [
        { p: "There is no scientifically “correct” number of life areas. Every model is a way to group the same life. The question is which number you will actually use every week. We chose 6 for three reasons." },
        { steps: [
          { title: "You can score 6 in a minute", text: "A [weekly check-in](/guides/weekly-review) only works if it's fast. Six numbers from 1 to 10 take under a minute. Twelve take long enough that most people stop doing it after a few weeks." },
          { title: "Six areas don't overlap", text: "In bigger models, areas blur: is a dinner with your partner “romance”, “family” or “fun”? Is a course “career” or “personal growth”? With 6 broad areas, almost every goal has one obvious home, so you don't waste energy sorting." },
          { title: "Nothing important is missing", text: "Six areas still cover the body, people, meaning, rest, learning and work. The extra spokes in 8- and 12-area models are mostly splits of these six, not new parts of life." },
        ] },
        { p: "Six is also the number most people can hold in their head. You can name your six areas from memory, which matters on a busy Tuesday when you decide what to do with a free evening." },
      ],
    },
    {
      h2: "The 8-area Wheel of Life compared",
      blocks: [
        { p: "The Wheel of Life is often credited to Paul J. Meyer, founder of the Success Motivation Institute, in the 1960s. The version most coaches use today has 8 spokes. A common set is career, money, health, family and friends, romance, personal growth, fun and recreation, and physical environment (your home)." },
        { p: "Here is how those 8 map onto Elegix's 6:" },
        { list: [
          "**Career + Money** become **Finance & career.** For most people work and income rise and fall together, so one score is enough.",
          "**Family and friends + Romance** become **Relationships.** You still track your partner separately as a goal or habit if you want to.",
          "**Fun and recreation** becomes **Leisure.**",
          "**Health** and **Personal growth** stay as they are.",
          "**Physical environment** is folded into Leisure and Health: a calm home is part of how you rest and how you feel.",
          "**Spirituality** is added. Many 8-area wheels leave out meaning and values, yet a missing “why” is one of the most common reasons people feel empty even when everything else scores well.",
        ] },
      ],
    },
    {
      h2: "The 12-area models compared",
      blocks: [
        { p: "Some programmes split life into 12 areas. The best known is Lifebook by Jon and Missy Butcher, later popularised by Mindvalley. Its 12 categories are health and fitness, intellectual life, emotional life, character, spiritual life, love relationship, parenting, social life, financial life, career, quality of life and life vision." },
        { p: "A 12-area model is great for a one-time deep dive, such as a weekend retreat or [planning the year ahead](/guides/plan-next-year-by-area-of-life). It's harder to use every week, and several areas are about the same thing seen from different angles: intellectual life, character and life vision all overlap with personal growth and spirituality." },
        { p: "In Elegix terms: health and fitness and emotional life sit in **Health**; love relationship, parenting and social life in **Relationships**; spiritual life, character and life vision in **Spirituality**; intellectual life in **Personal growth**; financial life and career in **Finance & career**; and quality of life in **Leisure**." },
        { tip: "**Which model should you use?** Use 12 areas once a year if you enjoy deep planning. Use 6 every week to stay on track. The weekly habit matters far more than the exact number of spokes." },
      ],
    },
    {
      h2: "How to use the 6 areas of life",
      blocks: [
        { steps: [
          { title: "Score each area from 1 to 10", text: "Go with your first answer. The free [Wheel of Life calculator](/guides/wheel-of-life) draws your wheel as you move the sliders." },
          { title: "Pick one area to focus on", text: "Usually the lowest, or the one that would lift the others. Health often comes first, because bad sleep drags every other score down. Our guide on [choosing what to focus on](/guides/how-to-choose-what-to-focus-on) helps when two areas compete." },
          { title: "Set one small goal and one habit", text: "Keep it small enough to do this week. See [goals for every area of life](/guides/goals-for-every-area-of-life) for examples." },
          { title: "Re-score every week", text: "A one-minute check-in shows if things are moving. Balance is not every area at 10; it's no area left at 2 for months." },
        ] },
      ],
    },
  ],
  faq: [
    { q: "What are the 6 areas of life?", a: "In Elegix the 6 areas of life are Health, Relationships, Spirituality, Leisure, Personal growth, and Finance & career. Together they cover your body, the people you love, meaning, rest, learning, and work and money." },
    { q: "What are the 8 areas of life?", a: "A common 8-area Wheel of Life uses career, money, health, family and friends, romance, personal growth, fun and recreation, and physical environment. Exact labels vary between coaches." },
    { q: "What are the 12 areas of life?", a: "The best-known 12-area model, Lifebook, uses health and fitness, intellectual life, emotional life, character, spiritual life, love relationship, parenting, social life, financial life, career, quality of life and life vision." },
    { q: "Which areas of life are most important?", a: "There is no fixed ranking, but health tends to affect all the others: poor sleep or low energy pulls every score down. Beyond that, the most important area right now is usually the one you've neglected longest." },
    { q: "How do I balance all areas of life?", a: "Don't try to fix everything at once. Score your areas weekly, pick one to focus on, set one small goal and one habit in it, and check again next week. Balance means no area is left neglected for months, not every area at 10." },
    { q: "Is spirituality an area of life if I'm not religious?", a: "Yes. In Elegix, spirituality means meaning and values: knowing what matters to you and living by it. Reflection, journaling, time in nature or volunteering all count, with or without faith." },
  ],
};
