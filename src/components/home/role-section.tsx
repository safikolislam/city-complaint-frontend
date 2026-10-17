"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";

import { cn } from "@/lib/utils";
import { ROLES } from "@/data/role";

const DURATION = 5;

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
};

export function RolesSection() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);
  const paused = hovered || !inView || !!reduce;

  useEffect(() => {
    if (paused) return;
    const controls = animate(progress, 1, {
      duration: DURATION * (1 - progress.get()),
      ease: "linear",
      onComplete: () => {
        progress.set(0);
        setActive((a) => (a + 1) % ROLES.length);
      },
    });
    return () => controls.stop();
  }, [active, paused, progress]);

  const select = (i: number) => {
    if (i === active) return;
    progress.set(0);
    setActive(i);
  };

  const role = ROLES[active];
  const Icon = role.icon;

  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-muted/40 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-500">
              <span className="size-1.5 animate-pulse rounded-full bg-blue-500" />
              Roles & Access
            </span>
          </div>

          <SectionHeading
            title="Built for everyone involved"
            description="Each role gets its own dashboard with only the tools it needs."
          />

          <div
            ref={ref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="grid gap-8 md:grid-cols-[260px_1fr] md:gap-12"
          >
            <div role="tablist" className="flex gap-2 overflow-x-auto md:flex-col">
              {ROLES.map((r, i) => (
                <button
                  key={r.title}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => select(i)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                    i === active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {i === active && (
                    <motion.span
                      layoutId="role-tab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 overflow-hidden rounded-lg border bg-background shadow-sm"
                    >
                      <motion.span
                        style={{ scaleX: progress }}
                        className={cn("absolute inset-x-0 bottom-0 h-0.5 origin-left", r.bar)}
                      />
                    </motion.span>
                  )}
                  <r.icon className={cn("relative size-5", r.accent)} aria-hidden="true" />
                  <span className="relative">{r.title}</span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={role.title}
                role="tabpanel"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0.6, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0, y: [0, -5, 0] }}
                    transition={{
                      scale: { type: "spring", stiffness: 300, damping: 16 },
                      rotate: { type: "spring", stiffness: 300, damping: 16 },
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className={cn("flex size-14 items-center justify-center rounded-xl", role.soft)}
                  >
                    <Icon className={cn("size-6", role.accent)} aria-hidden="true" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold tracking-tight">{role.title}</h3>
                </div>

                <motion.ul
                  variants={list}
                  initial="hidden"
                  animate="show"
                  className="grid gap-x-8 gap-y-4 border-t pt-6 text-sm sm:grid-cols-2"
                >
                  {role.points.map((point) => (
                    <motion.li key={point} variants={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                        <Check className="size-2.5 text-emerald-500" aria-hidden="true" />
                      </span>
                      <span className="text-muted-foreground">{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}