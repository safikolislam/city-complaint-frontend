"use client";

import { ErrorState } from "@/components/shared/error-state";
import { Pagination } from "@/components/shared/pagination";
import { TableSkeleton } from "@/components/shared/table-skeleton";

import { staffHome } from "@/config/routes";
import { useMyTasks } from "@/hooks/use-my-tasks";
import { useUrlParams } from "@/hooks/use-url-params";
import { ComplaintFilters } from "../complaints/complaint-filter";
import { TasksTable } from "./task-table";

const LIMIT = 10;

export function TasksView() {
  const { searchParams } = useUrlParams();
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const status = searchParams.get("status") ?? "";
  const search = searchParams.get("search") ?? "";
  const tasks = useMyTasks({ page, limit: LIMIT, status, search });

  let body: React.ReactNode;
  if (tasks.isPending) {
    body = <TableSkeleton />;
  } else if (tasks.isError) {
    body = (
      <ErrorState
        message={tasks.error.message}
        onRetry={() => tasks.refetch()}
      />
    );
  } else {
    body = (
      <div className={tasks.isPlaceholderData ? "opacity-60" : undefined}>
        <div className="space-y-6">
          <TasksTable
            items={tasks.data.items}
            hrefBase={staffHome.TECHNICIAN}
          />
          <Pagination
            page={page}
            limit={LIMIT}
            total={tasks.data.meta?.total ?? 0}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ComplaintFilters />
      {body}
    </div>
  );
}
