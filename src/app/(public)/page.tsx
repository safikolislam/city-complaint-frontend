import type { Metadata } from "next";

import { DepartmentsSection } from "@/components/home/departments-section";
import { FaqPreview } from "@/components/home/faq-preview";

import HeroSection from "@/components/home/hero-section";
import HowItWorks from "@/components/home/how-it-works";
import { FeaturesSection } from "@/components/home/feature-section";
import { RolesSection } from "@/components/home/role-section";
import { CtaSection } from "@/components/home/cta-action";


export const metadata: Metadata = {
  title: "Home",
  description:
    "Report city problems, track progress and get them resolved by the right department.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <DepartmentsSection />
      <RolesSection />
      <FaqPreview />
      <CtaSection />
    </>
  );
}
