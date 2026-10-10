"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useChangeStatus } from "@/hooks/use-compliant-mutations";
import type { ComplaintStatus } from "@/types/complaint";
import { FieldShell, nativeFieldClass } from "../shared/field-shell";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const noteSchema = z.object({
  note: z.string().max(500, "Note must be 500 characters or fewer"),
});
type NoteValues = z.infer<typeof noteSchema>;

export function TechnicianActions({
  id,
  status,
}: {
  id: string;
  status: ComplaintStatus;
}) {
  const mutation = useChangeStatus(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: { note: "" },
  });

  const canStart = status === "ASSIGNED" || status === "REOPENED";
  const canResolve = status === "IN_PROGRESS";

  if (!canStart && !canResolve) {
    return (
      <p className="text-sm text-muted-foreground">
        No actions available for this status.
      </p>
    );
  }

  const resolve = handleSubmit(({ note }) =>
    mutation.mutate(
      { status: "RESOLVED", note: note.trim() || undefined },
      { onSuccess: () => reset() },
    ),
  );

  return (
    <Card>
      <CardContent className="pt-6">
        {canStart ? (
          <Button
            disabled={mutation.isPending}
            onClick={() => mutation.mutate({ status: "IN_PROGRESS" })}
          >
            Start work
          </Button>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}
