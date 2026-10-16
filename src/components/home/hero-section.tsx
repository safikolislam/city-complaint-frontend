"use client";


import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import HeroContent from "./hero/hero-content";
import HeroControls from "./hero/hero-controls";
import { heroSlides } from "./hero/hero-slides";
import HeroStats, { type HeroStatsData } from "./hero/hero-stats";

const INTERVAL = 6000;
const total = heroSlides.length;
const ids = heroSlides.map((s) => s.id);

type Props = { stats?: HeroStatsData };

const HeroSection = ({ stats }: Props) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), []);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured services"
      className="relative isolate flex h-[65vh] min-h-[520px] items-center overflow-hidden md:max-h-[70vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((s, i) => (
        <Image
          key={s.id}
          src={s.image}
          alt={s.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`-z-20 object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 text-center text-white">
        <HeroContent key={heroSlides[current].id} slide={heroSlides[current]} />
        <HeroControls
          ids={ids}
          current={current}
          onSelect={setCurrent}
          onPrev={prev}
          onNext={next}
        />
        {stats && (
          <div className="hidden md:block">
            <HeroStats stats={stats} />
          </div>
        )}
      </div>

      <a
        href="#services"
        aria-label="Scroll to next section"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/80 animate-bounce"
      >
        {/* <ChevronDown className="size-6" /> */}
      </a>
    </section>
  );
};

export default HeroSection;
