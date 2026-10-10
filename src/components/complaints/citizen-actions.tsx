"use client";

import { useState } from "react";
import { EditComplaintDialog } from "@/components/complaints/edit-complaint-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useCancelComplaint,
  useDeleteComplaint,
} from "@/hooks/use-complaint-action";
import { useChangeStatus } from "@/hooks/use-compliant-mutations";
import { confirmAlert, promptAlert } from "@/lib/alert";
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

  const askCancel = async () => {
    const ok = await confirmAlert({
      title: "Cancel this complaint?",
      text: "This cannot be undone.",
      confirmText: "Yes, cancel it",
    });
    if (ok) cancel.mutate();
  };

  const askDelete = async () => {
    const ok = await confirmAlert({
      title: "Delete this complaint?",
      text: "You will not be able to recover it.",
      confirmText: "Yes, delete it",
    });
    if (ok) remove.mutate();
  };

  const askReopen = async () => {
    const note = await promptAlert({
      title: "Reopen complaint",
      placeholder: "Why do you want to reopen it?",
    });
    if (note === null) return;
    change.mutate({ status: "REOPENED", note: note || undefined });
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
            <Button
              variant="outline"
              disabled={busy}
              onClick={() => setEditing(true)}
            >
              Edit
            </Button>
          ) : null}
          {cancellable ? (
            <Button variant="outline" disabled={busy} onClick={askCancel}>
              Cancel complaint
            </Button>
          ) : null}
          {editable ? (
            <Button variant="destructive" disabled={busy} onClick={askDelete}>
              Delete
            </Button>
          ) : null}
          {resolved ? (
            <>
              <Button
                disabled={busy}
                onClick={() => change.mutate({ status: "CLOSED" })}
              >
                Confirm and close
              </Button>
              <Button variant="outline" disabled={busy} onClick={askReopen}>
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
