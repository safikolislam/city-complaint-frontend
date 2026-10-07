import type { Metadata } from "next";

import HowItWorks from "@/components/home/how-it-works";
import HeroSection from "@/components/home/hero-section";

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
    </>
  );
}
