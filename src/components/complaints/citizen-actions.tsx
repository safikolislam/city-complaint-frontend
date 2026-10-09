"use client";

import { useState } from "react";
import { EditComplaintDialog } from "@/components/complaints/edit-complaint-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useCancelComplaint,
  useDeleteComplaint,
} from "@/hooks/use-citizen-complaints";
import { useChangeStatus } from "@/hooks/use-compliant-mutations";
import type { ComplaintDetail } from "@/types/complaint";

const EDITABLE: string[] = ["PENDING_PAYMENT", "PENDING"];
const CANCELLABLE: string[] = ["PENDING_PAYMENT", "PENDING", "ASSIGNED"];

export function CitizenActions({ complaint }: { complaint: ComplaintDetail }) {
  const [editing, setEditing] = useState(false);
  const cancel = useCancelComplaint(complaint.id);
  const remove = useDeleteComplaint(complaint.id);
  const change = useChangeStatus(complaint.id);

  const editable = EDITABLE.includes(complaint.status);
  const cancellable = CANCELLABLE.includes(complaint.status);
  const resolved = complaint.status === "RESOLVED";
  const busy = cancel.isPending || remove.isPending || change.isPending;

  if (!editable && !cancellable && !resolved) return null;

  const reopen = () => {
    const note = window.prompt("Why do you want to reopen this complaint?");
    if (note === null) return;
    change.mutate({ status: "REOPENED", note: note.trim() || undefined });
  };

  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        {complaint.status === "PENDING_PAYMENT" ? (
          <p className="text-sm text-muted-foreground">
            This is a paid service. It will be processed after payment.
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {editable ? (
            <Button variant="outline" disabled={busy} onClick={() => setEditing(true)}>
              Edit
            </Button>
          ) : null}
          {cancellable ? (
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => window.confirm("Cancel this complaint?") && cancel.mutate()}
            >
              Cancel complaint
            </Button>
          ) : null}
          {editable ? (
            <Button
              variant="destructive"
              disabled={busy}
              onClick={() => window.confirm("Delete this complaint?") && remove.mutate()}
            >
              Delete
            </Button>
          ) : null}
          {resolved ? (
            <>
              <Button disabled={busy} onClick={() => change.mutate({ status: "CLOSED" })}>
                Confirm and close
              </Button>
              <Button variant="outline" disabled={busy} onClick={reopen}>
                Reopen
              </Button>
            </>
          ) : null}
        </div>
      </CardContent>
      <EditComplaintDialog
        complaint={complaint}
        open={editing}
        onClose={() => setEditing(false)}
      />
    </Card>
  );
}