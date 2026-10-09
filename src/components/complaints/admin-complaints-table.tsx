import { Inbox } from "lucide-react";
import Link from "next/link";
import { AssignDialog } from "@/components/complaints/assign-dialog";
import { StatusBadge } from "@/components/complaints/status-badge";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, titleOf } from "@/lib/format";
import type { ComplaintItem } from "@/types/complaint";

const FINISHED = ["RESOLVED", "CLOSED", "CANCELLED", "REJECTED"];

interface AdminComplaintsTableProps {
  items: ComplaintItem[];
  hrefBase?: string;
}

export function AdminComplaintsTable({
  items,
  hrefBase = "/dashboard/citizen/complaints",
}: AdminComplaintsTableProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="font-medium">No complaints found</p>
          <p className="text-sm text-muted-foreground">
            Try changing your search or filter.
          </p>
        </CardContent>
      </Card>
    );
  }

  const now = Date.now();

  return (
    <Card>
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((c) => {
              const overdue =
                c.dueAt &&
                !FINISHED.includes(c.status) &&
                new Date(c.dueAt).getTime() < now;
              return (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell>{c.department?.name ?? "-"}</TableCell>
                  <TableCell>{titleOf(c.priority)}</TableCell>
                  <TableCell>
                    <StatusBadge status={c.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {c.dueAt ? formatDate(c.dueAt) : "-"}
                      {overdue ? (
                        <Badge variant="destructive">Overdue</Badge>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`${hrefBase}/${c.id}`}
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                        })}
                      >
                        View
                      </Link>
                      <AssignDialog complaint={c} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}