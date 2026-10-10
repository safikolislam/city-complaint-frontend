import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentsView } from "@/components/payments/payments-view";
import { TableSkeleton } from "@/components/shared/table-skeleton";

export const metadata: Metadata = { title: "Payment history" };

export default function PaymentHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payment history</h1>
        <p className="text-sm text-muted-foreground">
          Pay for service requests and see what you have already paid.
        </p>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <PaymentsView />
      </Suspense>
    </div>
  );
}