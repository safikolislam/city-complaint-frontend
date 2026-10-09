import { ComplaintOverview } from "@/components/complaints/complaint-overview";
import { StatusBadge } from "@/components/complaints/status-badge";
import { BackLink } from "@/components/shared/back-link";
import { OfficerAssignForm } from "@/components/staff/officer-assign-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { staffHome } from "@/config/routes";
import { getComplaint } from "@/lib/complaint-detail";

export const metadata = { title: "Complaint details" };

export default async function OfficerComplaintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = await getComplaint(id);
  const canAssign = c.status === "PENDING" || c.status === "REOPENED";

  return (
    <div className="space-y-6">
      <BackLink href={staffHome.OFFICER} label="Back to complaints" />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h1 className="text-2xl font-bold">{c.title}</h1>
        <StatusBadge status={c.status} />
      </div>
      {canAssign && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Assign to a technician</CardTitle>
          </CardHeader>
          <CardContent>
            <OfficerAssignForm complaintId={c.id} />
          </CardContent>
        </Card>
      )}
      <ComplaintOverview complaint={c} />
    </div>
  );
}
