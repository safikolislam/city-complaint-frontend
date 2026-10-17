"use client";

import { motion } from "framer-motion";
import { FilePenLine, Users, Activity } from "lucide-react";

type StepColor = "blue" | "violet" | "cyan";

interface Step {
  number: string;
  title: string;
  description: string;
  color: StepColor;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Submit Your Complaint",
    description:
      "Describe the issue, attach a photo, and pin your location on the map. Takes less than 2 minutes.",
    color: "blue",
  },
  {
    number: "02",
    title: "City Assigns a Team",
    description:
      "Your complaint is routed to the right department. A field officer reviews and assigns a technician.",
    color: "violet",
  },
  {
    number: "03",
    title: "Work Begins & You're Updated",
    description:
      "Track real-time status updates as the team works on the fix. Get notified when it's resolved.",
    color: "cyan",
  },
];

const colorMap: Record<
  StepColor,
  {
    card: string;
    border: string;
    icon: string;
    number: string;
    dot: string;
  }
> = {
  blue: {
    card: "bg-blue-50/60 dark:bg-blue-950/20",
    border: "border-blue-100 dark:border-blue-900/40",
    icon: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    number: "text-blue-200 dark:text-blue-900",
    dot: "bg-blue-500",
  },
  violet: {
    card: "bg-violet-50/60 dark:bg-violet-950/20",
    border: "border-violet-100 dark:border-violet-900/40",
    icon: "bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400",
    number: "text-violet-200 dark:text-violet-900",
    dot: "bg-violet-500",
  },
  cyan: {
    card: "bg-cyan-50/60 dark:bg-cyan-950/20",
    border: "border-cyan-100 dark:border-cyan-900/40",
    icon: "bg-cyan-100 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-400",
    number: "text-cyan-200 dark:text-cyan-900",
    dot: "bg-cyan-500",
  },
};

function StepIcon({ color }: { color: StepColor }) {
  if (color === "blue") {
    return <FilePenLine className="w-6 h-6" />;
  }
  if (color === "violet") {
    return <Users className="w-6 h-6" />;
  }
  return <Activity className="w-6 h-6" />;
}

export function HowItWorksSection() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 px-3.5 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            From report to resolution
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto leading-relaxed">
            Three simple steps — and your city gets a little better.
          </p>
        </motion.div>

        {/* Steps Grid with Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((step, i) => {
            const c = colorMap[step.color];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={[
                  "relative flex flex-col rounded-2xl border p-7 overflow-hidden",
                  "hover:-translate-y-1.5 hover:shadow-lg transition-all duration-500",
                  c.card,
                  c.border,
                ].join(" ")}
              >
                {/* Big background number */}
                <span
                  className={`absolute top-4 right-4 text-8xl font-black leading-none select-none pointer-events-none ${c.number}`}
                  aria-hidden="true"
                >
                  {step.number}
                </span>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 ${c.icon}`}>
                  <StepIcon color={step.color} />
                </div>

                {/* Text */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                  {step.description}
                </p>

                {/* Step badge */}
                <div className="mt-5 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                    Step {parseInt(step.number)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}