import type { UkGuidePage } from "@/lib/uk/guides";
import aiTimeSavingsWorkLifeBalance from "./ai-time-savings-work-life-balance";
import choosingBetweenCareerAndFamily from "./choosing-between-career-and-family";
import decisionFatigue from "./decision-fatigue";
import fourDayWorkWeekExtraDay from "./four-day-work-week-extra-day";
import goalsForEveryAreaOfLife from "./goals-for-every-area-of-life";
import howToChoosePrioritiesInLife from "./how-to-choose-priorities-in-life";
import howToChooseWhatToFocusOn from "./how-to-choose-what-to-focus-on";
import planNextYearByAreaOfLife from "./plan-next-year-by-area-of-life";
import signsOfBurnout from "./signs-of-burnout";
import weeklyReview from "./weekly-review";
import wheelOfLife from "./wheel-of-life";
import workLifeBalance from "./work-life-balance";

/** Every translated guide and life area page, by slug. Add a file per page and register it here. */
export const UK_PAGES: Record<string, UkGuidePage> = {
  "ai-time-savings-work-life-balance": aiTimeSavingsWorkLifeBalance,
  "choosing-between-career-and-family": choosingBetweenCareerAndFamily,
  "decision-fatigue": decisionFatigue,
  "four-day-work-week-extra-day": fourDayWorkWeekExtraDay,
  "goals-for-every-area-of-life": goalsForEveryAreaOfLife,
  "how-to-choose-priorities-in-life": howToChoosePrioritiesInLife,
  "how-to-choose-what-to-focus-on": howToChooseWhatToFocusOn,
  "plan-next-year-by-area-of-life": planNextYearByAreaOfLife,
  "signs-of-burnout": signsOfBurnout,
  "weekly-review": weeklyReview,
  "wheel-of-life": wheelOfLife,
  "work-life-balance": workLifeBalance,
};
