"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Construction, Droplet, Zap, Trash2,
  Lightbulb, Waves, Trees, CircleHelp,
  type LucideIcon,
} from "lucide-react";

type CatColor =
  | "orange" | "blue" | "yellow" | "green"
  | "amber"  | "teal"  | "emerald" | "slate";

interface CategoryConfig {
  label: string;
  key: string;
  Icon: LucideIcon;
  color: CatColor;
}

const CATEGORY_CONFIG: CategoryConfig[] = [
  { label: "Road & Potholes", key: "ROAD",         Icon: Construction, color: "orange"  },
  { label: "Water Supply",    key: "WATER",        Icon: Droplet,      color: "blue"    },
  { label: "Electricity",     key: "ELECTRICITY",  Icon: Zap,          color: "yellow"  },
  { label: "Garbage",         key: "GARBAGE",      Icon: Trash2,       color: "green"   },
  { label: "Street Lights",   key: "STREET_LIGHT", Icon: Lightbulb,    color: "amber"   },
  { label: "Drainage",        key: "DRAINAGE",     Icon: Waves,        color: "teal"    },
  { label: "Parks & Trees",   key: "PARK",         Icon: Trees,        color: "emerald" },
  { label: "Others",          key: "OTHER",        Icon: CircleHelp,   color: "slate"   },
];

const colorMap: Record<CatColor, {
  pill: string;
  pillHover: string;
  activePill: string;
  iconColor: string;
}> = {
  orange:  { pill: "bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/40",  pillHover: "hover:bg-orange-100 dark:hover:bg-orange-900/30", activePill: "bg-orange-500 text-white border-orange-500",  iconColor: "text-orange-500 dark:text-orange-400" },
  blue:    { pill: "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/40",              pillHover: "hover:bg-blue-100 dark:hover:bg-blue-900/30",   activePill: "bg-blue-500 text-white border-blue-500",      iconColor: "text-blue-500 dark:text-blue-400"   },
  yellow:  { pill: "bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800/40",  pillHover: "hover:bg-yellow-100 dark:hover:bg-yellow-900/30",activePill: "bg-yellow-500 text-white border-yellow-500",  iconColor: "text-yellow-500 dark:text-yellow-400"},
  green:   { pill: "bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800/40",        pillHover: "hover:bg-green-100 dark:hover:bg-green-900/30",  activePill: "bg-green-500 text-white border-green-500",    iconColor: "text-green-500 dark:text-green-400" },
  amber:   { pill: "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40",        pillHover: "hover:bg-amber-100 dark:hover:bg-amber-900/30",  activePill: "bg-amber-500 text-white border-amber-500",    iconColor: "text-amber-500 dark:text-amber-400" },
  teal:    { pill: "bg-teal-50 dark:bg-teal-950/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800/40",              pillHover: "hover:bg-teal-100 dark:hover:bg-teal-900/30",    activePill: "bg-teal-500 text-white border-teal-500",      iconColor: "text-teal-500 dark:text-teal-400"   },
  emerald: { pill: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40", pillHover: "hover:bg-emerald-100 dark:hover:bg-emerald-900/30", activePill: "bg-emerald-500 text-white border-emerald-500", iconColor: "text-emerald-500 dark:text-emerald-400" },
  slate:   { pill: "bg-slate-100 dark:bg-slate-800/30 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/40",       pillHover: "hover:bg-slate-200 dark:hover:bg-slate-700/30",  activePill: "bg-slate-500 text-white border-slate-500",    iconColor: "text-slate-500 dark:text-slate-400" },
};

interface CategoryStat { category: string; count: number; }

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const pillVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    },
  },
};

export function CategoriesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetch("/api/proxy/public/stats/categories");
        if (!res.ok) return;
        const json = (await res.json()) as { data: CategoryStat[] };
        const map: Record<string, number> = {};
        json.data.forEach((item) => { map[item.category] = item.count; });
        setCounts(map);
      } catch { /* fallback */ }
      finally { setLoading(false); }
    }
    void fetchCounts();
  }, []);

  const sorted = [...CATEGORY_CONFIG].sort(
    (a, b) => (counts[b.key] ?? 0) - (counts[a.key] ?? 0)
  );

  const maxCount = Math.max(...CATEGORY_CONFIG.map((cat) => counts[cat.key] ?? 0), 1);

  return (
    <section className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/60 px-3.5 py-1.5 rounded-full mb-5">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-violet-500"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
            What can you report?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto leading-relaxed">
            Anything that affects your daily city life. Tap a category to report.
          </p>
        </motion.div>

        {/* Pill cloud */}
        <motion.div
          ref={ref}
          className="flex flex-wrap justify-center gap-3"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {sorted.map((cat) => {
            const c = colorMap[cat.color];
            const count = counts[cat.key] ?? 0;
            const isHovered = hovered === cat.key;
            const pillScale = count > 0 ? 1 + (count / maxCount) * 0.18 : 1;

            return (
              <motion.div
                key={cat.key}
                variants={pillVariants}
                animate={{ scale: pillScale }}
                whileHover={{ scale: pillScale * 1.08, y: -4 }}
                whileTap={{ scale: pillScale * 0.96 }}
                onHoverStart={() => setHovered(cat.key)}
                onHoverEnd={() => setHovered(null)}
                className={[
                  "relative flex items-center gap-2.5 border rounded-full cursor-pointer",
                  "transition-colors duration-300 select-none shadow-sm hover:shadow-md",
                  isHovered ? c.activePill : `${c.pill} ${c.pillHover}`,
                  count > maxCount * 0.6
                    ? "px-5 py-2.5 text-sm font-semibold"
                    : "px-4 py-2 text-sm font-medium",
                ].join(" ")}
              >
                <motion.span
                  animate={isHovered ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
                  transition={{ duration: 0.4 }}
                  className={isHovered ? "text-white" : c.iconColor}
                >
                  <cat.Icon className="w-4 h-4" />
                </motion.span>

                <span>{cat.label}</span>

                <AnimatePresence>
                  {!loading && count > 0 && (
                    <motion.span
                      key="count"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className={[
                        "text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[22px] text-center",
                        isHovered
                          ? "bg-white/20 text-white"
                          : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 shadow-sm",
                      ].join(" ")}
                    >
                      {formatCount(count)}
                    </motion.span>
                  )}
                  {loading && (
                    <motion.span
                      key="skeleton"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-8 h-4 rounded-full bg-gray-200 dark:bg-gray-700"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Total */}
        <AnimatePresence>
          {!loading && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm text-gray-400 dark:text-gray-500 mt-10"
            >
              {formatCount(Object.values(counts).reduce((a, b) => a + b, 0))}+ total complaints reported across all categories
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}