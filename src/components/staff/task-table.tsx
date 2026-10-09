import { Inbox } from "lucide-react";

import { StatusBadge } from "@/components/complaints/status-badge";
import { TaskActionCell } from "@/components/staff/task-action-cell";
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
import { DueCell } from "../complaints/due-cell";

const stickyAction = "sticky right-0 border-l bg-card text-right";

interface TasksTableProps {
  items: ComplaintItem[];
  hrefBase: string;
}

export function TasksTable({ items, hrefBase }: TasksTableProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="font-medium">No tasks found</p>
          <p className="text-sm text-muted-foreground">
            Tasks assigned to you will appear here.
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
              <TableHead>Task</TableHead>
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
                    {item.address}
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
                  <TaskActionCell item={item} hrefBase={hrefBase} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}