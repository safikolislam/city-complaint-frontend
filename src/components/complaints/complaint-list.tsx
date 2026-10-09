
import { ComplaintFilters } from "./complaint-filter";
import { AdminComplaintsTable } from "./complaints-table";
import { Pagination } from "@/components/shared/pagination";
import type { Meta } from "@/types/api";
import type { ComplaintItem, ComplaintQuery } from "@/types/complaint";

const LIMIT = 10;

interface ComplaintListProps {
  title: string;
  page?: string;
  status?: string;
  search?: string;
  fetcher: (
    query: ComplaintQuery,
  ) => Promise<{ items: ComplaintItem[]; meta?: Meta }>;
  hrefBase?: string;
}

export async function ComplaintList({
  title,
  page,
  status,
  search,
  fetcher,
}: ComplaintListProps) {
  const current = Math.max(Number(page) || 1, 1);
  const { items = [], meta } = await fetcher({
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
      <AdminComplaintsTable items={items} />
      <Pagination
        page={current}
        limit={LIMIT}
        total={meta?.total ?? items.length}
      />
    </div>
  );
}
