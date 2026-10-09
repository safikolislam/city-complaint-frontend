"use client";


import { OfficerTable } from "@/components/officer/officer-table";
import { ErrorState } from "@/components/shared/error-state";
import { Pagination } from "@/components/shared/pagination";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { staffHome } from "@/config/routes";
import { useOfficerComplaints } from "@/hooks/use-officer-complaints";
import { useUrlParams } from "@/hooks/use-url-params";
import { ComplaintFilters } from "../complaints/complaint-filter";

const LIMIT = 10;

export function OfficerView() {
  const { searchParams } = useUrlParams();
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const status = searchParams.get("status") ?? "";
  const search = searchParams.get("search") ?? "";
  const list = useOfficerComplaints({ page, limit: LIMIT, status, search });

  let body: React.ReactNode;
  if (list.isPending) {
    body = <TableSkeleton />;
  } else if (list.isError) {
    body = (
      <ErrorState message={list.error.message} onRetry={() => list.refetch()} />
    );
  } else {
    body = (
      <div className={list.isPlaceholderData ? "opacity-60" : undefined}>
        <div className="space-y-6">
          <OfficerTable items={list.data.items} hrefBase={staffHome.OFFICER} />
          <Pagination
            page={page}
            limit={LIMIT}
            total={list.data.meta?.total ?? 0}
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