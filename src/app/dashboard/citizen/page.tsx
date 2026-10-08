import { CheckCircle2, Clock, FileText, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { getComplaints } from "@/lib/complaints";
import { StatCard } from "@/components/shared/state-card";

export const metadata: Metadata = { title: "Overview" };

const OPEN = ["PENDING_PAYMENT", "PENDING"];
const ACTIVE = ["ASSIGNED", "IN_PROGRESS", "REOPENED"];
const DONE = ["RESOLVED", "CLOSED"];

export default async function CitizenOverviewPage() {
  const { items, meta } = await getComplaints({ limit: 100 });
  const count = (list: string[]) =>
    items.filter((c) => list.includes(c.status)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Overview</h1>
          <p className="text-sm text-muted-foreground">
            A quick look at your complaints.
          </p>
        </div>
        <Link href="/dashboard/citizen/new" className={buttonVariants()}>
          New complaint
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total"
          value={meta?.total ?? items.length}
          icon={FileText}
        />
        <StatCard label="Waiting" value={count(OPEN)} icon={Clock} />
        <StatCard label="In progress" value={count(ACTIVE)} icon={Wrench} />
        <StatCard label="Resolved" value={count(DONE)} icon={CheckCircle2} />
      </div>
    </div>
  );
}
