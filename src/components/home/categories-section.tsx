"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useCategoryStats } from "@/hooks/use-category-stats";
import { CategoryCount } from "./categories/category-count";
import { CategoryPill } from "./categories/category-pill";

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function CategoriesSection() {
  const { data, isLoading, isError, refetch } = useCategoryStats();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = data?.find((c) => c.id === selectedId) ?? null;
  const total = data?.reduce((sum, c) => sum + c.count, 0) ?? 0;

  return (
    <section className="overflow-hidden bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-5 inline-block rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Categories
          </span>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            What can you report?
          </h2>
          <p className="mx-auto max-w-md text-base text-muted-foreground">
            Anything that affects your daily city life. Tap a category to see
            how many complaints were reported.
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex flex-wrap justify-center gap-3">
            {SKELETON_KEYS.map((k) => (
              <div
                key={k}
                className="h-10 w-36 animate-pulse rounded-full bg-muted"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-center text-sm text-muted-foreground">
            Could not load categories.{" "}
            <button
              type="button"
              onClick={() => refetch()}
              className="text-primary underline"
            >
              Try again
            </button>
          </p>
        )}

        {data && (
          <>
            <div className="flex flex-wrap justify-center gap-3">
              {data.map((cat) => (
                <CategoryPill
                  key={cat.id}
                  name={cat.name}
                  selected={cat.id === selectedId}
                  onSelect={() =>
                    setSelectedId(cat.id === selectedId ? null : cat.id)
                  }
                />
              ))}
            </div>
            <CategoryCount selected={selected} total={total} />
          </>
        )}
      </div>
    </section>
  );
}