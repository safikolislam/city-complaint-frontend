import { Inbox } from "lucide-react";
import { StatusBadge } from "@/components/complaints/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ComplaintItem } from "@/lib/complaints";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export function ComplaintsTable({
  items,
  filtered,
}: {
  items: ComplaintItem[];
  filtered: boolean;
}) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="font-medium">No complaints found</p>
          <p className="text-sm text-muted-foreground">
            {filtered
              ? "Try changing your search or filter."
              : "Complaints you submit will appear here."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.category?.name ?? "-"}</TableCell>
                <TableCell>{item.department?.name ?? "-"}</TableCell>
                <TableCell className="capitalize">
                  {item.priority?.toLowerCase() ?? "-"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
