import { OverviewHistory } from "@/components/complaints/overview-history";
import { StatusBadge } from "@/components/complaints/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, titleOf } from "@/lib/format";
import type { ComplaintView } from "@/types/complaint-view";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}

export function ComplaintOverview({ complaint: c }: { complaint: ComplaintView }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle className="text-base">Complaint details</CardTitle>
            <StatusBadge status={c.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm">{c.description}</p>
          <dl className="grid gap-4 sm:grid-cols-2">
            <Detail label="Category" value={c.category.name} />
            <Detail label="Department" value={c.department.name} />
            <Detail label="Priority" value={titleOf(c.priority)} />
            <Detail
              label="Due"
              value={c.dueAt ? formatDate(c.dueAt) : "Not set"}
            />
            <Detail label="Address" value={c.address} />
            <Detail
              label="Reported by"
              value={`${c.citizen.name} (${c.citizen.email})`}
            />
            <Detail label="Submitted" value={formatDate(c.createdAt)} />
          </dl>
        </CardContent>
      </Card>
      <OverviewHistory items={c.statusHistory} />
    </div>
  );
}