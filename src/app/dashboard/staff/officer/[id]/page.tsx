import { ComplaintOverview } from "@/components/complaints/complaint-overview";
import { OfficerAssignDialog } from "@/components/officer/officer-assign-dialogue";
import { BackLink } from "@/components/shared/back-link";
import { staffHome } from "@/config/routes";
import { getComplaint } from "@/lib/complaints";

export const metadata = { title: "Complaint details" };

export default async function OfficerComplaintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = await getComplaint(id);

  return (
    <div className="space-y-6">
      <BackLink href={staffHome.OFFICER} label="Back to complaints" />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{c.title}</h1>
        <OfficerAssignDialog
          complaint={{ id: c.id, title: c.title, status: c.status }}
        />
      </div>
      <ComplaintOverview complaint={c} />
    </div>
  );
}
