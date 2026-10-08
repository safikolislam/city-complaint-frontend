import { ComplaintDetailPage } from "@/components/complaints/detail-page";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <ComplaintDetailPage
      params={params}
      mode="technician"
      backHref="/dashboard/staff/technician"
    />
  );
}
