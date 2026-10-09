import type { Metadata } from "next";

import { ComplaintsTable } from "@/components/complaints/complaints-table";
import { Pagination } from "@/components/shared/pagination";
import { getComplaints } from "@/lib/complaints";
import { ComplaintFilters } from "@/components/complaints/complaint-filter";

export const metadata: Metadata = { title: "My complaints" };

const LIMIT = 10;

interface SearchParams {
  page?: string;
  status?: string;
  search?: string;
}

export default async function MyComplaintsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page, status, search } = await searchParams;
  const current = Math.max(Number(page) || 1, 1);
  const { items, meta } = await getComplaints({
    page: current,
    limit: LIMIT,
    status,
    search,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My complaints</h1>
        <p className="text-sm text-muted-foreground">
          {meta ? `${meta.total} complaints in total` : "Your complaints"}
        </p>
      </div>
      <ComplaintFilters />
      <ComplaintsTable
        items={items}
        filtered={Boolean(status || search)}
        hrefBase="/dashboard/citizen/complaints"
      />
      <Pagination
        page={current}
        limit={LIMIT}
        total={meta?.total ?? items.length}
      />
    </div>
  );
}
