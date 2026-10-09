"use client";

import { ErrorState } from "@/components/shared/error-state";
import { ListFilters } from "@/components/shared/list-filters";
import { Pagination } from "@/components/shared/pagination";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { useAdminComplaints } from "@/hooks/use-admin-complaints";
import { useUrlParams } from "@/hooks/use-url-params";
import { AdminComplaintsTable } from "./complaints-table";
import { ComplaintFilters } from "./complaint-filter";

const LIMIT = 10;
const PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;

const PRIORITY_OPTIONS = PRIORITIES.map((value) => ({
  value,
  label: value.toLowerCase(),
}));

export function ComplaintsView() {
  const { searchParams } = useUrlParams();
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const status = searchParams.get("status") ?? "";
  const priority = searchParams.get("priority") ?? "";
  const search = searchParams.get("search") ?? "";
  const query = { page, limit: LIMIT, status, priority, search };
  const complaints = useAdminComplaints(query);

  let body: React.ReactNode;
  if (complaints.isPending) {
    body = <TableSkeleton />;
  } else if (complaints.isError) {
    body = (
      <ErrorState
        message={complaints.error.message}
        onRetry={() => complaints.refetch()}
      />
    );
  } else {
    body = (
      <div className={complaints.isPlaceholderData ? "opacity-60" : undefined}>
        <div className="space-y-6">
          <AdminComplaintsTable items={complaints.data?.items ?? []} />
          <Pagination
            page={page}
            limit={LIMIT}
            total={complaints.data?.meta?.total ?? 0}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <ComplaintFilters />
        <ListFilters
          selectParam="priority"
          selectLabel="All priorities"
          options={PRIORITY_OPTIONS}
        />
      </div>
      {body}
    </div>
  );
}
