"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUrlParams } from "@/hooks/use-url-params";

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
}

export function Pagination({ page, limit, total }: PaginationProps) {
  const { setParams } = useUrlParams();
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  if (totalPages <= 1) return null;

  const go = (next: number) =>
    setParams({ page: next > 1 ? String(next) : undefined });

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-3"
    >
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => go(page - 1)}
        >
          <ChevronLeft className="size-4" /> Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => go(page + 1)}
        >
          Next <ChevronRight className="size-4" />
        </Button>
      </div>
    </nav>
  );
}
