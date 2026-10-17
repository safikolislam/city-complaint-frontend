"use client";

import { motion } from "framer-motion";
import { pickCategoryIcon } from "./category-icons";

type Props = { name: string; selected: boolean; onSelect: () => void };

export function CategoryPill({ name, selected, onSelect }: Props) {
  const Icon = pickCategoryIcon(name);

  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      className={`flex cursor-pointer select-none items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-300 hover:shadow-md ${
        selected
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/10"
      }`}
    >
      <Icon className="size-4" aria-hidden="true" />
      {name}
    </motion.button>
  );
}