import { Inbox } from "lucide-react";
import Link from "next/link";

import { StatusBadge } from "@/components/complaints/status-badge";

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
import type { ComplaintItem } from "@/lib/complaints";
import { OfficerAssignDialog } from "./officer-assign-dialogue";
import { DueCell } from "../complaints/due-cell";

const stickyAction = "sticky right-0 border-l bg-card text-right";

interface OfficerTableProps {
  items: ComplaintItem[];
  hrefBase: string;
}

export function OfficerTable({ items, hrefBase }: OfficerTableProps) {
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

  return (
    <Card>
      <CardContent className="overflow-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Complaint</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due</TableHead>
              <TableHead className={stickyAction}>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.category?.name}
                  </p>
                </TableCell>
                <TableCell className="capitalize">
                  {item.priority?.toLowerCase() ?? "-"}
                </TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell>
                  <DueCell item={item} />
                </TableCell>
                <TableCell className={stickyAction}>
                  <div className="flex items-center justify-end gap-2">
                    <OfficerAssignDialog complaint={item} />
                    <Link
                      href={`${hrefBase}/${item.id}`}
                      className={buttonVariants({
                        variant: "outline",
                        size: "sm",
                      })}
                    >
                      Details
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}