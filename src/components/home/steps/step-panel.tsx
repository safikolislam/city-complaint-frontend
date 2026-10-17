import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Step } from "./steps";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

type Props = {
  step: Step;
  steps: Step[];
  active: number;
  onSelect: (index: number) => void;
};

export function StepPanel({ step, steps, active, onSelect }: Props) {
  const Icon = step.Icon;

  return (
    <motion.div
      key={active}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-10"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <motion.div
          className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30"
          initial={{ scale: 0.7, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="size-7" />
        </motion.div>

        <div className="min-w-0 flex-1">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            Step {step.number} of {steps.length}
          </span>
          <h3 className="mb-3 text-2xl font-extrabold leading-tight">
            {step.title}
          </h3>
          <p className="mb-4 text-base leading-relaxed text-muted-foreground">
            {step.description}
          </p>
          <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <ChevronRight className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{step.detail}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <button
              type="button"
              key={s.number}
              aria-label={`Go to step ${s.number}`}
              onClick={() => onSelect(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
        {active < steps.length - 1 && (
          <button
            type="button"
            onClick={() => onSelect(active + 1)}
            className="flex items-center gap-1 text-sm font-medium text-primary transition-all hover:gap-2"
          >
            Next step <ChevronRight className="size-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}