"use client";

import { PaymentsTable } from "@/components/payments/payments-table";
import { ErrorState } from "@/components/shared/error-state";
import { ListFilters } from "@/components/shared/list-filters";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { usePaymentRows } from "@/hooks/use-payment-rows";
import { useUrlParams } from "@/hooks/use-url-params";
import { PaymentSummary } from "./payment-summery";

const OPTIONS = [
  { value: "UNPAID", label: "Awaiting payment" },
  { value: "PAID", label: "Paid" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function PaymentsView() {
  const { searchParams } = useUrlParams();
  const filter = searchParams.get("payment") ?? "";
  const { rows, requests } = usePaymentRows();
  const visible = filter ? rows.filter((row) => row.state === filter) : rows;

  let body: React.ReactNode;
  if (requests.isPending) {
    body = <TableSkeleton />;
  } else if (requests.isError) {
    body = (
      <ErrorState
        message={requests.error.message}
        onRetry={() => requests.refetch()}
      />
    );
  } else {
    body = (
      <div className="space-y-6">
        <PaymentSummary rows={rows} />
        <PaymentsTable rows={visible} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ListFilters
        selectParam="payment"
        selectLabel="All payments"
        options={OPTIONS}
      />
      {body}
    </div>
  );
}
