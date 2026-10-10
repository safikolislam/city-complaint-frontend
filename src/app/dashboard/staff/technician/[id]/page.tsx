import { ComplaintOverview } from "@/components/complaints/complaint-overview";
import { BackLink } from "@/components/shared/back-link";
import { WorkActions } from "@/components/staff/work-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { staffHome } from "@/config/routes";
import { getComplaint } from "@/lib/complaints";

export const metadata = { title: "Task details" };

export default async function TechnicianTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = await getComplaint(id);

  return (
    <div className="space-y-6">
      <BackLink href={staffHome.TECHNICIAN} label="Back to my tasks" />
      <h1 className="text-2xl font-bold">{c.title}</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Update progress</CardTitle>
        </CardHeader>
        <CardContent>
          <WorkActions id={c.id} initialStatus={c.status} />
        </CardContent>
      </Card>
      <ComplaintOverview complaint={c} />
    </div>
  );
}
