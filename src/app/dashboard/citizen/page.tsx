import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";

import { Pagination } from "@/components/shared/pagination";
import { getComplaints } from "@/lib/complaints";
import { ComplaintFilters } from "@/components/complaints/complaint-filter";

import { Button } from "@/components/ui/button";
import { AdminComplaintsTable } from "@/components/complaints/admin-complaints-table";

export const metadata: Metadata = {
  title: "My Complaints",
};

const LIMIT = 10;

interface Props {
  searchParams: Promise<{
    page?: string;
    status?: string;
    search?: string;
  }>;
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
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Complaints</h1>

          <p className="text-sm text-muted-foreground">
            {meta
              ? `${meta.total} complaints in total`
              : "View and manage your complaints"}
          </p>
        </div>

 
      </div>

      {/* Filters */}
      <Suspense fallback={null}>
        <ComplaintFilters />
      </Suspense>

      {/* Complaints */}
      <AdminComplaintsTable items={items} />

      {/* Pagination */}
      {meta && (
        <Suspense fallback={null}>
          <Pagination page={current} limit={LIMIT} total={meta.total} />
        </Suspense>
      )}
    </div>
  );
}
