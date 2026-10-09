import type { Metadata } from "next";
import { PaymentResult } from "@/components/payments/payment-result";

export const metadata: Metadata = { title: "Payment not completed" };

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ complaintId?: string }>;
}) {
  const { complaintId } = await searchParams;

  return (
    <PaymentResult
      tone="failed"
      title="Payment not completed"
      message="Your request is saved. You can try the payment again from its details page."
      primaryLabel="Try again"
      complaintId={complaintId}
    />
  );
}