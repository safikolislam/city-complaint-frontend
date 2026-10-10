import type { Metadata } from "next";
import { Suspense } from "react";
import { OfficerView } from "@/components/officer/officer-view";
import { TableSkeleton } from "@/components/shared/table-skeleton";

export const metadata: Metadata = { title: "Department complaints" };

export default function OfficerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Department complaints</h1>
        <p className="text-sm text-muted-foreground">
          Review complaints in your department and assign them to a technician.
        </p>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <OfficerView />
      </Suspense>
    </div>
  );
}
