import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { BreakdownChart } from "@/components/admin/breakdown-chart";
import { KpiCard } from "@/components/admin/kpi-card";

import { buttonVariants } from "@/components/ui/button";
import { buildCitizenStats } from "@/lib/citizen-stats";
import { getComplaints } from "@/lib/complaints";
import { getPaymentHistory } from "@/lib/payment-history";
import { getProfile } from "@/lib/profile";
import { StatusPieChart } from "@/components/citizen/status-pie-chart";
import { MonthlyChart } from "@/components/citizen/monthly-chart";
import { CitizenPaymentCard } from "@/components/citizen/cityzen-payment-card";
import { RecentComplaints } from "@/components/citizen/recent-complaint";

export const metadata = { title: "My dashboard" };

export default async function CitizenOverviewPage() {
  const [complaints, payments, profile] = await Promise.all([
    getComplaints({ limit: 100 }),
    getPaymentHistory({ limit: 100, status: "PAID" }).catch(() => null),
    getProfile(),
  ]);
  const stats = buildCitizenStats(
    complaints.items,
    complaints.meta?.total ?? complaints.items.length,
  );
  const paid = payments?.items ?? [];
  const totalPaid = payments
    ? paid.reduce((sum, p) => sum + Number(p.amount), 0)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {profile.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            A summary of your complaints and payments.
          </p>
        </div>
        <Link href="/dashboard/citizen/new" className={buttonVariants()}>
          <Plus className="mr-1 size-4" />
          New complaint
        </Link>
      </div>

      {stats.overdue > 0 ? (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertTriangle className="size-4" />
          {stats.overdue} of your complaints are past their due date.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total complaints" value={stats.total} icon={FileText} />
        <KpiCard label="Active" value={stats.active} icon={Clock} />
        <KpiCard label="Resolved" value={stats.resolved} icon={CheckCircle2} />
        <KpiCard
          label="Awaiting payment"
          value={stats.awaitingPayment.length}
          icon={CreditCard}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <StatusPieChart title="Complaints by status" data={stats.byStatus} />
        <MonthlyChart title="Last 6 months" data={stats.byMonth} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <BreakdownChart title="Complaints by category" data={stats.byCategory} />
        <CitizenPaymentCard
          totalPaid={totalPaid}
          currency={paid[0]?.currency ?? "BDT"}
          paidCount={paid.length}
          awaiting={stats.awaitingPayment}
        />
      </div>

      <RecentComplaints items={complaints.items.slice(0, 5)} />
    </div>
  );
}