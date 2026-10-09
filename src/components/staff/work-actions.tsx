"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StatusBadge } from "@/components/complaints/status-badge";
import { FieldShell, nativeFieldClass } from "@/components/shared/field-shell";
import { Button } from "@/components/ui/button";
import { useWorkStatus } from "@/hooks/use-work-status";
import type { ComplaintStatus } from "@/lib/complaints";
import {
  type WorkNoteValues,
  workNoteSchema,
} from "@/lib/validations/work-note";

interface WorkActionsProps {
  id: string;
  initialStatus: ComplaintStatus;
}

export function WorkActions({ id, initialStatus }: WorkActionsProps) {
  const { status, mutation } = useWorkStatus(id, initialStatus);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkNoteValues>({
    resolver: zodResolver(workNoteSchema),
    defaultValues: { note: "" },
  });

  const canStart = status === "ASSIGNED" || status === "REOPENED";
  const canResolve = status === "IN_PROGRESS";

  const resolve = handleSubmit(({ note }) =>
    mutation.mutate(
      { status: "RESOLVED", note: note || undefined },
      { onSuccess: () => reset() },
    ),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Current status:</span>
        <StatusBadge status={status} />
      </div>

      {canStart ? (
        <Button
          disabled={mutation.isPending}
          onClick={() => mutation.mutate({ status: "IN_PROGRESS" })}
        >
          {mutation.isPending ? "Starting..." : "Start work"}
        </Button>
      ) : null}

      {canResolve ? (
        <form onSubmit={resolve} className="space-y-3" noValidate>
          <FieldShell
            id="note"
            label="Work note (optional)"
            error={errors.note?.message}
          >
            <textarea
              id="note"
              rows={3}
              className={nativeFieldClass}
              placeholder="What was done to fix the problem?"
              {...register("note")}
            />
          </FieldShell>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Mark as resolved"}
          </Button>
        </form>
      ) : null}

      {!canStart && !canResolve ? (
        <p className="text-sm text-muted-foreground">
          No actions are available for this status.
        </p>
      ) : null}
    </div>
  );
}