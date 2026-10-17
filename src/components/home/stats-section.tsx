"use client";

import {
  Building2,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { MotionConfig, motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";
import { usePublicStats } from "@/hooks/use-public-stats";
import type { PublicStats } from "@/types/public-stats";

const ITEMS: { key: keyof PublicStats; label: string; icon: LucideIcon }[] = [
  { key: "citizens", label: "Registered citizens", icon: Users },
  { key: "officers", label: "Active officers", icon: ShieldCheck },
  { key: "technicians", label: "Field technicians", icon: Wrench },
  { key: "totalComplaints", label: "Complaints reported", icon: ClipboardList },
  { key: "resolvedComplaints", label: "Complaints resolved", icon: CheckCircle2 },
  { key: "departments", label: "City departments", icon: Building2 },
];

const CARD =
  "relative flex h-36 flex-col justify-between overflow-hidden rounded-xl border bg-card p-5 text-card-foreground";

function StatCard({ icon: Icon, label, target, index }: { icon: LucideIcon; label: string; target: number; index: number }) {
  const { ref, value } = useCountUp(target);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className={`${CARD} group shadow-sm transition-shadow hover:shadow-lg`}
    >
      <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div>
        <p className="text-4xl font-bold tabular-nums">{value.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const { data, isLoading, isError } = usePublicStats();
  const rate = data?.totalComplaints
    ? Math.round((data.resolvedComplaints / data.totalComplaints) * 100)
    : 0;

  return (
    <MotionConfig reducedMotion="user">
      <section className="bg-muted/40 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              Live numbers
            </span>
            <h2 className="mt-4 text-3xl font-bold">CityFix at a glance</h2>
            <p className="mt-2 text-muted-foreground">
              Real figures from our platform, updated as the city grows.
            </p>
          </div>

          {isError ? (
            <p className="text-center text-sm text-muted-foreground">
              Statistics are unavailable right now. Please try again later.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {ITEMS.map(({ key, label, icon }, i) =>
                  isLoading || !data ? (
                    <div key={key} className={`${CARD} animate-pulse`}>
                      <div className="size-10 rounded-lg bg-muted" />
                      <div className="space-y-2">
                        <div className="h-8 w-16 rounded bg-muted" />
                        <div className="h-4 w-28 rounded bg-muted" />
                      </div>
                    </div>
                  ) : (
                    <StatCard key={key} icon={icon} label={label} target={data[key]} index={i} />
                  ),
                )}
              </div>

              {data && (
                <div className="mt-4 rounded-xl border bg-card p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between text-sm font-medium">
                    <span>Resolution rate</span>
                    <span className="tabular-nums text-primary">{rate}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${rate}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
