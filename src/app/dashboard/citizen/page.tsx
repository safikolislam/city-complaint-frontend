import type { Metadata } from "next";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { CitizenComplaintsView } from "@/components/complaints/citizen-complaints-view";

export const metadata: Metadata = { title: "My Complaints | Citizen" };

export default function CitizenDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Complaints</h1>
        <p className="text-sm text-muted-foreground">
          View and track the live status of your submitted complaints.
        </p>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <CitizenComplaintsView />
      </Suspense>
    </div>
  );
}
