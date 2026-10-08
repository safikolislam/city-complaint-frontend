"use client";

import { Inbox } from "lucide-react";

import { useMyAssignedComplaints } from "@/hooks/use-my-assigned-complaints";
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

export function AssignedComplaints() {
  const { data, isLoading, isError, error } =
    useMyAssignedComplaints({
      page: 1,
      limit: 10,
    });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-5 w-48 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded bg-muted" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="font-medium text-destructive">
            Failed to load assigned complaints
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong"}
          </p>
        </CardContent>
      </Card>
    );
  }

  const complaints = data?.items ?? [];

  if (complaints.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
          <Inbox className="size-10 text-muted-foreground" />

          <p className="font-medium">
            No assigned complaints
          </p>

          <p className="text-sm text-muted-foreground">
            You currently have no complaints assigned to you.
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
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {complaints.map((complaint) => (
              <TableRow key={complaint.id}>
                <TableCell>
                  <p className="font-medium">
                    {complaint.title}
                  </p>
                </TableCell>

                <TableCell>
                  {complaint.category?.name ?? "-"}
                </TableCell>

                <TableCell className="capitalize">
                  {complaint.priority?.toLowerCase() ?? "-"}
                </TableCell>

                <TableCell>
                  <StatusBadge status={complaint.status} />
                </TableCell>

                <TableCell>
                  <span className="line-clamp-1 max-w-64">
                    {complaint.address ?? "-"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}