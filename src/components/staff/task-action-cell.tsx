"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTaskStatus } from "@/hooks/use-task-status";
import type { ComplaintItem } from "@/lib/complaints";

interface TaskActionCellProps {
  item: ComplaintItem;
  hrefBase: string;
}

export function TaskActionCell({ item, hrefBase }: TaskActionCellProps) {
  const mutation = useTaskStatus(item.id);
  const canStart = item.status === "ASSIGNED" || item.status === "REOPENED";
  const canResolve = item.status === "IN_PROGRESS";

  return (
    <div className="flex items-center justify-end gap-2">
      {canStart ? (
        <Button
          size="sm"
          disabled={mutation.isPending}
          onClick={() => mutation.mutate("IN_PROGRESS")}
        >
          Start work
        </Button>
      ) : null}
      {canResolve ? (
        <Button
          size="sm"
          disabled={mutation.isPending}
          onClick={() => mutation.mutate("RESOLVED")}
        >
          Resolve
        </Button>
      ) : null}
      <Link
        href={`${hrefBase}/${item.id}`}
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        Details
      </Link>
    </div>
  );
}
