import type { Metadata } from "next";
import { ListFilters } from "@/components/shared/list-filters";
import { Pagination } from "@/components/shared/pagination";
import { getAuditLogs } from "@/lib/admin";
import { AuditTable } from "../audit-table";

export const metadata: Metadata = { title: "Audit logs" };

const LIMIT = 20;
const ACTIONS = [
  "COMPLAINT_ASSIGNED",
  "COMPLAINT_STATUS_CHANGED",
  "COMPLAINT_CANCELLED",
  "ROLE_CHANGED",
  "PAYMENT_COMPLETED",
].map((value) => ({ value, label: value.replaceAll("_", " ").toLowerCase() }));

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; action?: string }>;
}) {
  const { page, action } = await searchParams;
  const current = Math.max(Number(page) || 1, 1);
  const { items, meta } = await getAuditLogs({
    page: current,
    limit: LIMIT,
    action,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Audit logs</h1>
        <p className="text-sm text-muted-foreground">
          Who changed what, and when.
        </p>
      </div>
      <ListFilters
        selectParam="action"
        selectLabel="All actions"
        options={ACTIONS}
      />
      <AuditTable items={items} />
      <Pagination
        page={current}
        limit={LIMIT}
        total={meta?.total ?? items.length}
      />
    </div>
  );
}
