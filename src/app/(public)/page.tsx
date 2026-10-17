import type { Metadata } from "next";
import { CtaSection } from "@/components/home/cta-action";

import { FaqPreview } from "@/components/home/faq-preview";

import HeroSection from "@/components/home/hero-section";

import { RolesSection } from "@/components/home/role-section";
import { StatsSection } from "@/components/home/stats-section";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Report city problems, track progress and get them resolved by the right department.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
       <RolesSection />
       <StatsSection></StatsSection>
      <FaqPreview />
      <CtaSection />
    </>
  );
}
