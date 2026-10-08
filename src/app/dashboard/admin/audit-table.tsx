import { Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDateTime, titleOf } from "@/lib/format";
import { AuditLogItem } from "@/types/admin";

export function AuditTable({ items }: { items: AuditLogItem[] }) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="font-medium">No activity found</p>
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
              <TableHead>Time</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((log) => {
              const details = JSON.stringify(log.metadata ?? {});
              return (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap">
                    {formatDateTime(log.createdAt)}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{log.actor?.name ?? "System"}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.actor?.email}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{titleOf(log.action)}</Badge>
                  </TableCell>
                  <TableCell>{log.entity}</TableCell>
                  <TableCell>
                    <code
                      title={details}
                      className="block max-w-xs truncate text-xs"
                    >
                      {details}
                    </code>
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
