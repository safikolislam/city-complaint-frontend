import { AlertTriangle, FileText, Users } from "lucide-react";
import { BreakdownChart } from "@/components/admin/breakdown-chart";
import { KpiCard } from "@/components/admin/kpi-card";
import { getStats } from "@/lib/admin";
import { titleOf } from "@/lib/format";

export const metadata = { title: "Admin dashboard" };

export default async function AdminPage() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin overview</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <KpiCard
          label="Total complaints"
          value={stats.totalComplaints}
          icon={FileText}
        />
        <KpiCard label="Total users" value={stats.totalUsers} icon={Users} />
        <KpiCard
          label="Overdue"
          value={stats.overdueComplaints}
          icon={AlertTriangle}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <BreakdownChart
          title="Complaints by status"
          data={stats.byStatus.map((s) => ({
            label: titleOf(s.status),
            value: s.count,
          }))}
        />
        <BreakdownChart
          title="Complaints by department"
          data={stats.byDepartment.map((d) => ({
            label: d.department,
            value: d.count,
          }))}
        />
      </div>
    </div>
  );
}
