import { Inbox } from "lucide-react";
import Link from "next/link";
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
import { formatDate, titleOf } from "@/lib/format";
import type { ComplaintItem } from "@/types/complaint";

interface ComplaintsTableProps {
  items: ComplaintItem[];
  filtered?: boolean;
  hrefBase?: string;
}

export function ComplaintsTable({
  items,
  filtered = false,
  hrefBase,
}: ComplaintsTableProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="font-medium">No complaints found</p>
          <p className="text-sm text-muted-foreground">
            {filtered
              ? "Try changing your search or filter."
              : "Nothing here yet."}
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
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">
                  {hrefBase ? (
                    <Link
                      href={`${hrefBase}/${c.id}`}
                      className="hover:underline"
                    >
                      {c.title}
                    </Link>
                  ) : (
                    c.title
                  )}
                </TableCell>
                <TableCell>{c.category?.name ?? "-"}</TableCell>
                <TableCell>{titleOf(c.priority)}</TableCell>
                <TableCell>
                  <StatusBadge status={c.status} />
                </TableCell>
                <TableCell>{formatDate(c.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
