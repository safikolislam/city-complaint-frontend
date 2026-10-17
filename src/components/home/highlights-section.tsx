"use client";

import { MotionConfig, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { HIGHLIGHTS } from "@/data/highlights";

export function HighlightsSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              Highlights
            </span>
          </div>

          <SectionHeading
            title="Everything you need, in one place"
            description="The real features behind CityFix, from the first report to the final fix."
          />

          <ul className="grid md:grid-cols-2 md:gap-x-16">
            {HIGHLIGHTS.map(({ title, description, icon: Icon }, i) => (
              <motion.li
                key={title}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.1 }}
                className="group border-b"
              >
                <div className="flex items-start gap-5 py-6 transition-transform duration-300 group-hover:translate-x-2">
                  <span className="w-12 shrink-0 text-4xl font-bold tabular-nums text-muted-foreground/30 transition-colors duration-300 group-hover:text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold tracking-tight">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                  </div>

                  <ArrowUpRight
                    className="size-5 shrink-0 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}