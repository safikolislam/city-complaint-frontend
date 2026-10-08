import { ComplaintsTable } from "@/components/complaints/complaints-table";
import { Pagination } from "@/components/shared/pagination";

import type { Meta } from "@/types/api";
import { ComplaintFilters } from "./complaint-filter";
import { ComplaintItem, ComplaintQuery } from "@/types/complaint";

const LIMIT = 10;

export interface ListSearchParams {
  page?: string;
  status?: string;
  search?: string;
}

interface ComplaintListProps {
  title: string;
  searchParams: ListSearchParams;
  fetcher: (
    query: ComplaintQuery,
  ) => Promise<{ items: ComplaintItem[]; meta?: Meta }>;
  hrefBase?: string;
}

export async function ComplaintList({
  title,
  searchParams,
  fetcher,
  hrefBase,
}: ComplaintListProps) {
  const { page, status, search } = searchParams;
  const current = Math.max(Number(page) || 1, 1);
  const { items, meta } = await fetcher({
    page: current,
    limit: LIMIT,
    status,
    search,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">
          {meta ? `${meta.total} in total` : "All items"}
        </p>
      </div>
      <ComplaintFilters />
      <ComplaintsTable
        items={items}
        filtered={Boolean(status || search)}
        hrefBase={hrefBase}
      />
      <Pagination
        page={current}
        limit={LIMIT}
        total={meta?.total ?? items.length}
      />
    </div>
  );
}
