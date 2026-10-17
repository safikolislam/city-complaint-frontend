"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { StepPanel } from "./steps/step-panel";
import { StepTabs } from "./steps/step-tabs";
import { steps } from "./steps/steps";

const INTERVAL = 4000;

export function HowItWorksSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  const progress = ((active + 1) / steps.length) * 100;

  return (
    <section className="overflow-hidden bg-background py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <motion.span
              className="size-1.5 rounded-full bg-primary"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            How It Works
          </span>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            From report to resolution
          </h2>
          <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground">
            Three simple steps — and your city gets a little better.
          </p>
        </motion.div>

        <div className="mb-10 h-1 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <StepTabs steps={steps} active={active} onSelect={setActive} />

        <AnimatePresence mode="wait">
          <StepPanel
            key={active}
            step={steps[active]}
            steps={steps}
            active={active}
            onSelect={setActive}
          />
        </AnimatePresence>
      </div>
    </section>
  );
}