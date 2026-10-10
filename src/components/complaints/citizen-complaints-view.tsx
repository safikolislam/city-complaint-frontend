"use client";

import { ErrorState } from "@/components/shared/error-state";
import { Pagination } from "@/components/shared/pagination";
import { TableSkeleton } from "@/components/shared/table-skeleton";

import { useUrlParams } from "@/hooks/use-url-params";

import { ComplaintFilters } from "./complaint-filter";
import { AdminComplaintsTable } from "./admin-complaints-table";
import { useCitizenComplaints } from "@/hooks/use-citizen-complaints";

const LIMIT = 10;

export function CitizenComplaintsView() {
  const { searchParams } = useUrlParams();
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const status = searchParams.get("status") ?? "";
  const search = searchParams.get("search") ?? "";

  const query = { page, limit: LIMIT, status, search };
  const { data, isPending, isError, error, refetch } =
    useCitizenComplaints(query);

  if (isPending) return <TableSkeleton />;
  if (isError) {
    return (
      <ErrorState
        message={error?.message || "Failed to load complaints"}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ComplaintFilters />
      <AdminComplaintsTable items={data?.items ?? []} />
      <Pagination page={page} limit={LIMIT} total={data?.meta?.total ?? 0} />
    </div>
  );
}
