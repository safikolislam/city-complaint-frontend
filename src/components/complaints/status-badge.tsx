import { Badge } from "@/components/ui/badge";
import { ComplaintStatus } from "@/types/complaint";

type Variant = "default" | "secondary" | "destructive" | "outline";

const variants: Record<ComplaintStatus, Variant> = {
  PENDING_PAYMENT: "secondary",
  PENDING: "secondary",
  ASSIGNED: "default",
  IN_PROGRESS: "default",
  RESOLVED: "outline",
  CLOSED: "outline",
  REOPENED: "default",
  REJECTED: "destructive",
  CANCELLED: "destructive",
};

export function StatusBadge({ status }: { status: ComplaintStatus }) {
  return (
    <Badge variant={variants[status] ?? "secondary"} className="capitalize">
      {status.replaceAll("_", " ").toLowerCase()}
    </Badge>
  );
}
