"use client";

import { useEffect, useRef, useState } from "react";
import { 
  Construction, 
  Droplet, 
  Zap, 
  Trash2, 
  Lightbulb, 
  Waves, 
  Trees, 
  CircleHelp 
} from "lucide-react";

const categories = [
  {
    label: "Road & Potholes",
    icon: <Construction className="w-5 h-5" />,
    count: "2.4k reports",
    color: "orange" as const,
  },
  {
    label: "Water Supply",
    icon: <Droplet className="w-5 h-5" />,
    count: "1.8k reports",
    color: "blue" as const,
  },
  {
    label: "Electricity",
    icon: <Zap className="w-5 h-5" />,
    count: "1.2k reports",
    color: "yellow" as const,
  },
  {
    label: "Garbage",
    icon: <Trash2 className="w-5 h-5" />,
    count: "980 reports",
    color: "green" as const,
  },
  {
    label: "Street Lights",
    icon: <Lightbulb className="w-5 h-5" />,
    count: "760 reports",
    color: "amber" as const,
  },
  {
    label: "Drainage",
    icon: <Waves className="w-5 h-5" />,
    count: "640 reports",
    color: "teal" as const,
  },
  {
    label: "Parks & Trees",
    icon: <Trees className="w-5 h-5" />,
    count: "420 reports",
    color: "emerald" as const,
  },
  {
    label: "Others",
    icon: <CircleHelp className="w-5 h-5" />,
    count: "310 reports",
    color: "slate" as const,
  },
];

type CatColor = "orange" | "blue" | "yellow" | "green" | "amber" | "teal" | "emerald" | "slate";

const colorMap: Record<CatColor, { bg: string; icon: string; ring: string; dot: string }> = {
  orange:  { bg: "bg-orange-50 dark:bg-orange-950/20",  icon: "text-orange-500 dark:text-orange-400",  ring: "hover:ring-orange-300 dark:hover:ring-orange-700/50",  dot: "bg-orange-400" },
  blue:    { bg: "bg-blue-50 dark:bg-blue-950/20",       icon: "text-blue-500 dark:text-blue-400",       ring: "hover:ring-blue-300 dark:hover:ring-blue-700/50",      dot: "bg-blue-400" },
  yellow:  { bg: "bg-yellow-50 dark:bg-yellow-950/20",  icon: "text-yellow-600 dark:text-yellow-400",  ring: "hover:ring-yellow-300 dark:hover:ring-yellow-700/50",  dot: "bg-yellow-400" },
  green:   { bg: "bg-green-50 dark:bg-green-950/20",    icon: "text-green-600 dark:text-green-400",    ring: "hover:ring-green-300 dark:hover:ring-green-700/50",    dot: "bg-green-400" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-950/20",    icon: "text-amber-600 dark:text-amber-400",    ring: "hover:ring-amber-300 dark:hover:ring-amber-700/50",    dot: "bg-amber-400" },
  teal:    { bg: "bg-teal-50 dark:bg-teal-950/20",      icon: "text-teal-600 dark:text-teal-400",      ring: "hover:ring-teal-300 dark:hover:ring-teal-700/50",      dot: "bg-teal-400" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/20",icon: "text-emerald-600 dark:text-emerald-400",ring: "hover:ring-emerald-300 dark:hover:ring-emerald-700/50",dot: "bg-emerald-400" },
  slate:   { bg: "bg-slate-100 dark:bg-slate-800/30",   icon: "text-slate-500 dark:text-slate-400",    ring: "hover:ring-slate-300 dark:hover:ring-slate-600/50",    dot: "bg-slate-400" },
};

export function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800/60 px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            What can you report?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto leading-relaxed">
            Anything that affects your daily city life — roads to parks, power to pipes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((cat, i) => {
            const c = colorMap[cat.color];
            return (
              <div
                key={cat.label}
                className={[
                  "flex flex-col items-center text-center gap-3 rounded-2xl p-5 cursor-default",
                  "ring-2 ring-transparent transition-all duration-300",
                  "hover:-translate-y-1",
                  c.bg,
                  c.ring,
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                ].join(" ")}
                style={{ transitionDelay: visible ? `${i * 55}ms` : "0ms" }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-gray-900 shadow-sm transition-transform duration-300 hover:scale-110 ${c.icon}`}>
                  {cat.icon}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 flex items-center justify-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                    {cat.count}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}