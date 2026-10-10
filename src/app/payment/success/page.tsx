import type { Metadata } from "next";
import { PaymentResult } from "@/components/payments/payment-result";
import { getComplaint } from "@/lib/complaint-detail";

export const metadata: Metadata = { title: "Payment result" };

async function isPaid(complaintId?: string) {
  if (!complaintId) return false;
  try {
    const complaint = await getComplaint(complaintId);
    return complaint.status !== "PENDING_PAYMENT";
  } catch {
    return false;
  }
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ complaintId?: string }>;
}) {
  const { complaintId } = await searchParams;

  if (!(await isPaid(complaintId))) {
    return (
      <PaymentResult
        tone="pending"
        title="We could not confirm your payment"
        message="Open the request to check its latest status. If the money was taken, it will update shortly."
        primaryLabel="Check request"
        complaintId={complaintId}
      />
    );
  }

  return (
    <PaymentResult
      tone="success"
      title="Payment successful"
      message="Your request is now with the department and its timer has started."
      primaryLabel="View request"
      complaintId={complaintId}
    />
  );
}
