import { Building2, CheckCircle2, Clock, Users } from "lucide-react";

export type HeroStatsData = {
  resolved: number;
  avgHours: number;
  departments: number;
  citizens: number;
};

const HeroStats = ({ stats }: { stats: HeroStatsData }) => {
  const items = [
    {
      icon: CheckCircle2,
      value: stats.resolved.toLocaleString(),
      label: "Resolved",
    },
    { icon: Clock, value: `${stats.avgHours}h`, label: "Avg. response" },
    { icon: Building2, value: String(stats.departments), label: "Departments" },
    { icon: Users, value: stats.citizens.toLocaleString(), label: "Citizens" },
  ];

  return (
    <ul className="grid w-full max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
      {items.map(({ icon: Icon, value, label }) => (
        <li
          key={label}
          className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur"
        >
          <Icon className="size-5 shrink-0 text-white/80" />
          <div className="leading-tight">
            <p className="text-lg font-semibold">{value}</p>
            <p className="text-xs text-white/70">{label}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HeroStats;