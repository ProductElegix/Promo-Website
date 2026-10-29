import type { GuideExtra } from "@/lib/guides";
import aiTimeSavingsWorkLifeBalance from "./ai-time-savings-work-life-balance";
import choosingBetweenCareerAndFamily from "./choosing-between-career-and-family";
import decisionFatigue from "./decision-fatigue";
import financeAndCareer from "./finance-and-career";
import fourDayWorkWeekExtraDay from "./four-day-work-week-extra-day";
import goalsForEveryAreaOfLife from "./goals-for-every-area-of-life";
import health from "./health";
import howToChoosePrioritiesInLife from "./how-to-choose-priorities-in-life";
import howToChooseWhatToFocusOn from "./how-to-choose-what-to-focus-on";
import leisure from "./leisure";
import personalGrowth from "./personal-growth";
import planNextYearByAreaOfLife from "./plan-next-year-by-area-of-life";
import relationships from "./relationships";
import signsOfBurnout from "./signs-of-burnout";
import spirituality from "./spirituality";
import weeklyReview from "./weekly-review";
import wheelOfLife from "./wheel-of-life";
import workLifeBalance from "./work-life-balance";

/** Extra long-form sections per page slug. Add a file per page and register it here. */
export const EXTRAS: Record<string, GuideExtra> = {
  "ai-time-savings-work-life-balance": aiTimeSavingsWorkLifeBalance,
  "choosing-between-career-and-family": choosingBetweenCareerAndFamily,
  "decision-fatigue": decisionFatigue,
  "finance-and-career": financeAndCareer,
  "four-day-work-week-extra-day": fourDayWorkWeekExtraDay,
  "goals-for-every-area-of-life": goalsForEveryAreaOfLife,
  "health": health,
  "how-to-choose-priorities-in-life": howToChoosePrioritiesInLife,
  "how-to-choose-what-to-focus-on": howToChooseWhatToFocusOn,
  "leisure": leisure,
  "personal-growth": personalGrowth,
  "plan-next-year-by-area-of-life": planNextYearByAreaOfLife,
  "relationships": relationships,
  "signs-of-burnout": signsOfBurnout,
  "spirituality": spirituality,
  "weekly-review": weeklyReview,
  "wheel-of-life": wheelOfLife,
  "work-life-balance": workLifeBalance,
};
