import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { HeroSlide } from "./hero-slides";

const outlineClass =
  "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white";

const HeroContent = ({ slide }: { slide: HeroSlide }) => {
  const Icon = slide.icon;

  return (
    <div className="flex flex-col items-center gap-5">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur animate-slide-down">
        <Icon className="size-3.5" /> {slide.badge}
      </span>
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight md:text-6xl animate-slide-up">
        {slide.title} <br />
        <span className="text-white/80">{slide.accent}</span>
      </h1>
      <p className="max-w-2xl text-base text-white/80 md:text-lg animate-fade-in">
        {slide.description}
      </p>
      <div className="flex flex-wrap justify-center gap-3 animate-fade-in">
        <Link
          href={slide.primary.href}
          className={buttonVariants({ size: "lg" })}
        >
          {slide.primary.label}
          <ArrowRight className="ml-2 size-4" />
        </Link>
        <Link
          href={slide.secondary.href}
          className={`${buttonVariants({ variant: "outline", size: "lg" })} ${outlineClass}`}
        >
          {slide.secondary.label}
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;