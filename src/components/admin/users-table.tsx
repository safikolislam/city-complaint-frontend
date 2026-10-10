import { Inbox } from "lucide-react";
import { RoleDialog } from "@/components/admin/role-dialog";
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

import { formatDate, titleOf } from "@/lib/format";
import type { AdminUser } from "@/types/admin";

interface UsersTableProps {
  items: AdminUser[];
  currentUserId?: string;
}

export function UsersTable({ items, currentUserId }: UsersTableProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />
          <p className="font-medium">No users found</p>
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
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{titleOf(user.role)}</Badge>
                </TableCell>
                <TableCell>
                  {user.staffPosition ? titleOf(user.staffPosition) : "-"}
                </TableCell>
                <TableCell>{user.department?.name ?? "-"}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <RoleDialog
                    user={user}
                    disabled={user.id === currentUserId}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
