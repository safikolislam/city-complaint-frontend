import type { Metadata } from "next";
import { ComplaintDetailView } from "@/components/complaints/complaint-detail-view";
import { getComplaint } from "@/lib/complaints";

export const metadata: Metadata = { title: "Task details" };

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const complaint = await getComplaint(id);

  return (
    <ComplaintDetailView
      id={id}
      initial={complaint}
      mode="technician"
      backHref="/dashboard/staff/tasks"
    />
  );
}
