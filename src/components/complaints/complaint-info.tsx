import { StatusBadge } from "@/components/complaints/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { formatDate, titleOf } from "@/lib/format";
import { ComplaintDetail } from "@/types/complaint";

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}

export function ComplaintInfo({
  complaint: c,
}: {
  complaint: ComplaintDetail;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <CardTitle className="text-xl">{c.title}</CardTitle>
          <StatusBadge status={c.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm">{c.description}</p>
        <dl className="grid gap-4 sm:grid-cols-2">
          <Row label="Category" value={c.category.name} />
          <Row label="Department" value={c.department.name} />
          <Row label="Priority" value={titleOf(c.priority)} />
          <Row label="Due" value={c.dueAt ? formatDate(c.dueAt) : "Not set"} />
          <Row label="Address" value={c.address} />
          <Row
            label="Reported by"
            value={`${c.citizen.name} (${c.citizen.email})`}
          />
          <Row label="Submitted" value={formatDate(c.createdAt)} />
        </dl>
      </CardContent>
    </Card>
  );
}
