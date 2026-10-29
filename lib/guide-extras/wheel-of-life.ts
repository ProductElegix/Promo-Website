import type { GuideExtra } from "@/lib/guides";

const extra: GuideExtra = {
  updated: "2026-10-29",
  sections: [
    {
      h2: "Score your wheel online",
      before: "How to read your wheel",
      blocks: [
        { p: "You can fill in a Wheel of Life online in about two minutes by moving one slider per area and watching the shape draw itself." },
        { p: "Rate each of the six areas from 1 to 10 below. Go with your first number. When you're done, look at the edge of the shape before you look at the average." },
        { tool: "wheel-calculator" },
        { p: "Take a screenshot or write your six numbers down with today's date. A single wheel is a snapshot. The value comes from comparing it with the next one." },
      ],
    },
    {
      h2: "Where did the Wheel of Life come from?",
      blocks: [
        { p: "The Wheel of Life is widely credited to Paul J. Meyer, the American self-improvement author who founded the company SMI in 1960 ([Texas Senate Resolution 1234, 1995](https://capitol.texas.gov/tlodocs/74R/billtext/html/SR01234F.htm)) and used life-area wheels in his goal-setting programmes." },
        { p: "There is no single published original that everyone copies, which is why you'll find so many versions. Coaches adapted it over the decades, and some people link the circle shape to older ideas such as the Buddhist wheel of life, which is a different thing altogether. Treat the tool as a practical coaching exercise, not as a scientific test with fixed rules." },
        { p: "The idea behind it is backed by later research on wellbeing. Gallup's work on wellbeing across career, social, financial, physical and community life found that 66% of people were doing well in at least one of those areas, but just 7% were thriving in all five ([Gallup, 2010](https://gallup.com/workplace/237020/five-essential-elements.aspx)). Doing well in one area is common. Doing well across your whole life takes attention, and that is exactly what the wheel gives you." },
      ],
    },
    {
      h2: "Wheel of Life categories: 6, 8 or 12 areas?",
      blocks: [
        { p: "The best number of Wheel of Life categories is the smallest number that still covers your whole life, which for most people is 6 to 8." },
        { p: "Here is how the common versions compare:" },
        { list: [
          "**6 areas:** health, relationships, spirituality, leisure, personal growth, finance & career. Fast to score, easy to read at a glance, easy to repeat every week. Some areas are broad, so you may need a note to say which part is low.",
          "**8 areas:** the most common coaching version. It usually splits career from money and adds something like physical environment or fun. More detail, still readable, takes a few more minutes.",
          "**10 to 12 areas:** splits relationships into partner, family and friends, and adds areas like home, community or contribution. Very detailed, good for a one-off coaching session, hard to repeat weekly without getting bored.",
        ] },
        { p: "We use six because a wheel only helps if you keep doing it. Six areas take under a minute to rate, and a weekly habit beats a beautiful wheel you fill in once a year. If you want more detail in one area, score the six first, then break your lowest area into its parts. A 4 in relationships might turn out to be a 9 with your partner and a 2 with your friends." },
        { tip: "If you change your categories, keep them the same for at least three months. Changing the slices every time makes your scores impossible to compare." },
      ],
    },
    {
      h2: "What questions should you ask for each area?",
      blocks: [
        { p: "Ask one or two concrete questions per area about the last two weeks, because a specific question gives a more honest score than “How is my health?”." },
        { p: "Pick the questions that fit you, answer them quickly, then give the number:" },
        { list: [
          "**[Health](/life-areas/health):** How many nights did I sleep well in the last two weeks? Do I have energy left after work? When did I last move my body because I wanted to?",
          "**[Relationships](/life-areas/relationships):** Who did I spend real time with, not just message? Is there someone I keep meaning to call? Do the people at home get my attention or my leftovers?",
          "**[Spirituality](/life-areas/spirituality):** Do my days reflect what I say matters to me? When did I last have ten quiet minutes with my own thoughts? Do I feel calm or constantly braced?",
          "**[Leisure](/life-areas/leisure):** What did I do last week just because I enjoy it? Do I rest without feeling guilty? Is my free time spent on purpose or on a phone?",
          "**[Personal growth](/life-areas/personal-growth):** What did I learn recently that I didn't know a month ago? Am I being stretched, or just busy? Is there a skill I keep postponing?",
          "**[Finance & career](/life-areas/finance-and-career):** Do I feel in control of my money? Does my work use what I'm good at? Am I moving towards where I want to be in three years?",
        ] },
        { p: "Score what is true, not what should be true. If your answer starts with “I should…”, the score is probably lower than you'd like to write." },
      ],
    },
    {
      h2: "Wheel of Life examples: how to read different shapes",
      blocks: [
        { p: "The fastest way to read a wheel is to find its lowest score and its biggest gap, then ask which area is taking time or energy from the others." },
        { p: "The four people below are fictional examples, with scores in the order health, relationships, spirituality, leisure, personal growth, finance & career." },
        { steps: [
          { title: "Maya, 34, product manager: 4, 5, 3, 2, 7, 9", text: "Average 5. A classic lopsided wheel. Career is a 9 because work takes everything, and leisure at 2 shows there is nothing left over. Her first step is not a new hobby. It's protecting one evening a week from work, because the high area is what's draining the low ones." },
          { title: "Daniel, 41, father of two: 6, 8, 5, 3, 4, 7", text: "Average 5.5. Most areas are fine, with a dent in leisure and growth. This is the common shape of parents of young children: time for yourself disappears first. A small, fixed slot (Saturday morning swimming while his partner has the kids, then swap) lifts leisure and health together." },
          { title: "Priya, 29, freelancer: 5, 4, 5, 5, 5, 4", text: "Average 4.7. A small, even wheel with no obvious dent. Nothing is on fire, and nothing feels good. Flat low wheels often point at tiredness, loneliness or the edge of burnout rather than one area. She starts with sleep and one standing weekly call with a friend, and reads up on the [signs of burnout](/guides/signs-of-burnout)." },
          { title: "Tom, 52, director: 8, 7, 6, 7, 6, 7", text: "Average 6.8. A fairly round, large wheel. The risk here is complacency, not crisis. Tom picks a maintenance goal for each area and one stretch goal in personal growth, so the wheel doesn't slowly shrink." },
        ] },
        { p: "Notice that Maya's and Daniel's averages are close, but their wheels need different first steps. That's why the shape matters more than the average." },
      ],
    },
    {
      h2: "Printable Wheel of Life template",
      blocks: [
        { p: "A printable Wheel of Life template is a blank circle with six labelled slices and rings from 1 to 10, so you only need a pen to fill it in." },
        { tool: "wheel-template" },
        { p: "Print a few copies and keep them in one folder or notebook. Use a different colour each month, or write the date in the middle. After three months you have a simple record of what changed and what didn't." },
        { p: "Under the wheel, copy this short worksheet:" },
        { list: [
          "Today's date and my six scores: …",
          "My lowest area is … because …",
          "The area that would lift the others most is …",
          "One action I'll take this week, with a day and time: …",
          "What I'll stop or do less of to make room: …",
        ] },
      ],
    },
    {
      h2: "How often should you redo the Wheel of Life?",
      blocks: [
        { p: "Re-score all six areas once a week in about a minute and fill in a full wheel with notes once a month." },
        { p: "Weekly scores are for spotting a slide early. Monthly wheels are for seeing trends and changing your focus. Beyond that, redo a full wheel with fresh eyes at a few key moments:" },
        { list: [
          "**At the start of a year or quarter,** before you set goals. It tells you where a goal will make the biggest difference. Our guide to [planning your next year by area of life](/guides/plan-next-year-by-area-of-life) builds on it.",
          "**After a big change:** a new job, a move, a breakup, a new baby, a health scare. Your old scores no longer describe your life.",
          "**When you feel off but can't say why.** The wheel often names the problem in five minutes.",
        ] },
        { p: "Don't redo it every day. Daily scores swing with your mood and your sleep, and you'll end up tracking how Tuesday felt rather than how your life is going." },
      ],
    },
    {
      h2: "Common Wheel of Life mistakes",
      blocks: [
        { p: "The most common Wheel of Life mistake is filling it in once, feeling bad about it and never acting on the lowest score." },
        { p: "Other mistakes we see often:" },
        { list: [
          "**Scoring for someone else.** Rate your own satisfaction, not what your parents, boss or social media think your life should look like.",
          "**Trying to fix every area at once.** Six new goals in one week is a recipe for dropping all of them. Pick one area, maybe two.",
          "**Chasing tens.** A 7 you're happy with is fine. Balance means you chose the shape, not that every slice is full.",
          "**Overthinking each number.** If you spend a minute on one score, you're negotiating with yourself. Your first number is usually closer to the truth.",
          "**Ignoring the high areas.** A 9 at work can be the cause of a 3 everywhere else. Ask what each high score costs.",
          "**Comparing your wheel with other people's.** Scores are personal. Your 6 and a friend's 6 don't mean the same thing. Compare your wheel only with your own past wheels.",
        ] },
      ],
    },
    {
      h2: "Using the Wheel of Life in different situations",
      blocks: [
        { p: "The wheel works for almost anyone, but the questions and the first step change with your situation." },
        { list: [
          "**Parents:** expect leisure and personal growth to run low for a while. Score them anyway, so “for a while” doesn't quietly become ten years. Consider adding parenting as a seventh slice if it doesn't fit under relationships.",
          "**Managers and team leads:** use a short version in one-to-ones, with the person choosing which areas to share. Never ask people to report their scores. The point is their reflection, not your data.",
          "**Freelancers and founders:** work and money often swing week to week. Score them separately in your notes, because good income can hide a career that feels stuck.",
          "**Students:** swap finance & career for study and future plans, and pay attention to sleep. A wheel before exam season and one after is a useful comparison.",
          "**Couples:** fill in your wheels separately, then compare. The interesting part is not who scores higher but where you see things differently.",
        ] },
        { p: "Whatever your situation, the next step is the same: turn your lowest score into one goal and one weekly habit. Our guide to [goals for every area of life](/guides/goals-for-every-area-of-life) has examples for each area." },
      ],
    },
  ],
  faq: [
    { q: "What are the 8 areas of the Wheel of Life?", a: "A common 8-area version uses health, career, finances, relationships, family and friends, personal growth, fun and recreation, and physical environment. The exact areas vary by coach, and none is the official list." },
    { q: "Who created the Wheel of Life?", a: "It is usually credited to Paul J. Meyer, an American self-improvement author who founded the company SMI in 1960. There is no single original version, and coaches have adapted it many times since." },
    { q: "Can I use the Wheel of Life for work or business?", a: "Yes. You can replace the life areas with parts of your job or business, such as clients, team, product and finances, and score them the same way. Keep it separate from your personal wheel so each stays clear." },
    { q: "What if all my scores are low?", a: "A wheel where every area is low often points at exhaustion rather than at one problem. Start with sleep and rest, and if you've felt this way for weeks, talk to a doctor or a mental health professional." },
    { q: "Is the Wheel of Life scientifically validated?", a: "No. It is a coaching and reflection tool, not a validated psychological test. It is useful for noticing patterns in your own life, not for diagnosing anything." },
  ],
};

export default extra;
