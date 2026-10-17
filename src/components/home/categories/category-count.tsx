"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CategoryStat } from "@/hooks/use-category-stats";

type Props = { selected: CategoryStat | null; total: number };

export function CategoryCount({ selected, total }: Props) {
  const value = selected ? selected.count : total;
  const caption = selected
    ? `complaints reported in ${selected.name}`
    : "complaints reported in total. Tap a category to see its count.";

  return (
    <div className="mt-10 min-h-24 text-center" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={selected?.id ?? "total"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <p className="text-5xl font-extrabold text-primary">
            {value.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{caption}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}