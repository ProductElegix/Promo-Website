import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Compare } from "@/components/sections/Compare";
import { Intro } from "@/components/sections/Intro";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AreasList } from "@/components/sections/AreasList";
import { AppShowcase } from "@/components/sections/AppShowcase";
import { BalanceCheck } from "@/components/sections/BalanceCheck";
import { Trust } from "@/components/sections/Trust";
import { Join } from "@/components/sections/Join";
import { Faq } from "@/components/sections/Faq";
import { Manifesto } from "@/components/sections/Manifesto";
import { Reveal } from "@/components/ui/Reveal";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Problem />
      <Compare />
      <Intro />
      <HowItWorks />
      <AreasList />
      <AppShowcase />
      <BalanceCheck />
      <Trust />
      <Join />
      <Faq />
      <Manifesto />
      <Reveal />
    </main>
  );
}
