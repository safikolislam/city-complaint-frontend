import { ComplaintDetailPage } from "@/components/complaints/detail-page";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <ComplaintDetailPage
      params={params}
      mode="citizen"
      backHref="/dashboard/citizen/complaints"
    />
  );
}
