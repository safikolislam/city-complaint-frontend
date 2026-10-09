import type { Metadata } from "next";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { TasksView } from "@/components/staff/tasks-view";

export const metadata: Metadata = { title: "My tasks" };

export default function TechnicianTasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My tasks</h1>
        <p className="text-sm text-muted-foreground">
          Complaints assigned to you. Start the work, then resolve it.
        </p>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <TasksView />
      </Suspense>
    </div>
  );
}
