"use client";

import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { Check, ShieldCheck, UserRound, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";
import { cn } from "@/lib/utils";

interface RoleInfo {
  title: string;
  icon: LucideIcon;
  points: string[];
  accent: string;
  glow: string;
  bar: string;
}

const ROLES: RoleInfo[] = [
  {
    title: "Citizens",
    icon: UserRound,
    accent: "text-blue-500",
    glow: "from-blue-500/10",
    bar: "bg-blue-500",
    points: [
      "Report problems with location details",
      "Follow progress on a timeline",
      "Pay for paid services with bKash",
      "Edit or cancel a request while it is pending",
    ],
  },
  {
    title: "Department staff",
    icon: Wrench,
    accent: "text-violet-500",
    glow: "from-violet-500/10",
    bar: "bg-violet-500",
    points: [
      "Officers review department complaints",
      "Officers assign work to technicians",
      "Technicians see their assigned tasks",
      "Technicians start work and mark it resolved",
    ],
  },
  {
    title: "City admins",
    icon: ShieldCheck,
    accent: "text-cyan-500",
    glow: "from-cyan-500/10",
    bar: "bg-cyan-500",
    points: [
      "See city-wide numbers and charts",
      "Manage users and staff roles",
      "Assign complaints to staff",
      "Review the audit log",
    ],
  },
];

export function RolesSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.classList.remove("opacity-0", "translate-y-8");
              card.classList.add("opacity-100", "translate-y-0");
            }, i * 110);
            obs.unobserve(card);
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(card);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="bg-muted/40 px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
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

        <div className="grid gap-5 md:grid-cols-3">
          {ROLES.map(({ title, icon: Icon, points, accent, glow, bar }, i) => (
            <div
              key={title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-card p-7 shadow-sm",
                "opacity-0 translate-y-8",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-1.5 hover:shadow-xl"
              )}
            >
              {/* Top accent bar */}
              <div
                className={cn(
                  "absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-500 group-hover:scale-x-100",
                  bar
                )}
              />

              {/* Glow blob */}
              <div
                className={cn(
                  "pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gradient-radial opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  glow,
                  "to-transparent"
                )}
              />

              {/* Icon */}
              <div
                className={cn(
                  "mb-5 flex size-14 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110",
                  `border-current/20 bg-current/10`,
                  accent
                )}
              >
                <Icon className={cn("size-6", accent)} aria-hidden="true" />
              </div>

              <h3 className="mb-4 font-semibold text-lg tracking-tight">{title}</h3>

              <ul className="space-y-2.5 text-sm">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                      <Check className="size-2.5 text-emerald-500" aria-hidden="true" />
                    </span>
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}