import type { Metadata } from "next";
import { Suspense } from "react";

import { Pagination } from "@/components/shared/pagination";
import { getComplaints } from "@/lib/complaints";
import { ComplaintFilters } from "@/components/complaints/complaint-filter";
import { AdminComplaintsTable } from "@/components/complaints/complaints-table";

export const metadata: Metadata = { title: "My complaints" };

const LIMIT = 10;

interface Props {
  searchParams: Promise<{ page?: string; status?: string; search?: string }>;
}

export default async function MyComplaintsPage({ searchParams }: Props) {
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

      <Suspense fallback={null}>
        <ComplaintFilters />
      </Suspense>

      <AdminComplaintsTable
        items={items}
        filtered={Boolean(status || search)}
      />

      {meta && (
        <Suspense fallback={null}>
          <Pagination page={current} limit={LIMIT} total={meta.total} />
        </Suspense>
      )}
    </div>
  );
}
