import type { Metadata } from "next";
import { ComplaintOverview } from "@/components/complaints/complaint-overview";
import { PaymentPanel } from "@/components/payments/payment-panel";
import { BackLink } from "@/components/shared/back-link";
import { getComplaint } from "@/lib/complaints";

export const metadata: Metadata = { title: "Complaint details" };

export default async function CitizenComplaintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = await getComplaint(id);

  return (
    <div className="space-y-6">
      <BackLink
        href="/dashboard/citizen/complaints"
        label="Back to my complaints"
      />
      <h1 className="text-2xl font-bold">{c.title}</h1>
      <PaymentPanel
        complaintId={c.id}
        categoryId={c.category.id ?? ""}
        status={c.status}
      />
      <ComplaintOverview complaint={c} />
    </div>
  );
}
