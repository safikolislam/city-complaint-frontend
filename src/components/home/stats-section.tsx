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
  "flex h-36 flex-col justify-between rounded-xl border bg-card p-5 text-card-foreground";

function StatCard({ icon: Icon, label, target }: { icon: LucideIcon; label: string; target: number }) {
  const { ref, value } = useCountUp(target);

  return (
    <div ref={ref} className={CARD}>
      <Icon className="size-5 text-primary" />
      <div>
        <p className="text-3xl font-bold tabular-nums">{value.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function StatsSection() {
  const { data, isLoading, isError } = usePublicStats();

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="rounded-full border bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
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
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {ITEMS.map(({ key, label, icon }) =>
              isLoading || !data ? (
                <div key={key} className={`${CARD} animate-pulse`}>
                  <div className="size-5 rounded bg-muted" />
                  <div className="space-y-2">
                    <div className="h-7 w-16 rounded bg-muted" />
                    <div className="h-4 w-28 rounded bg-muted" />
                  </div>
                </div>
              ) : (
                <StatCard key={key} icon={icon} label={label} target={data[key]} />
              ),
            )}
          </div>
        )}
      </div>
    </section>
  );
}