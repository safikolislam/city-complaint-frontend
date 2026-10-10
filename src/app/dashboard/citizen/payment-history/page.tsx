import { PaymentHistoryTable } from "@/components/complaints/payment-history/history-table";
import { ListFilters } from "@/components/shared/list-filters";
import { Pagination } from "@/components/shared/pagination";
import { getPaymentHistory } from "@/lib/payment-history";

export const metadata = { title: "Payment history" };

const LIMIT = 10;
const statusOptions = [
  { value: "PAID", label: "Paid" },
  { value: "PENDING", label: "Pending" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default async function PaymentHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const { page, status } = await searchParams;
  const current = Math.max(Number(page) || 1, 1);
  const { items, meta } = await getPaymentHistory({
    page: current,
    limit: LIMIT,
    status,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payment history</h1>
        <p className="text-sm text-muted-foreground">
          {meta ? `${meta.total} payments in total` : "Your payments"}
        </p>
      </div>
      <ListFilters
        selectParam="status"
        selectLabel="All statuses"
        options={statusOptions}
      />
      <PaymentHistoryTable items={items} />
      <Pagination
        page={current}
        limit={LIMIT}
        total={meta?.total ?? items.length}
      />
    </div>
  );
}
