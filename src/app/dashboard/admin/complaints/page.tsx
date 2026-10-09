import type { Metadata } from "next";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { ComplaintsView } from "@/components/complaints/complaints-view";

export const metadata: Metadata = { title: "Complaints | Admin" };

export default function AdminComplaintsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Complaints</h1>
        <p className="text-sm text-muted-foreground">
          Review every complaint and assign it to staff.
        </p>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <ComplaintsView />
      </Suspense>
    </div>
  );
}
