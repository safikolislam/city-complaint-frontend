"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlParams } from "@/hooks/use-url-params";

const STATUSES = [
  "PENDING_PAYMENT",
  "PENDING",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
  "REOPENED",
  "REJECTED",
  "CANCELLED",
];

export function ComplaintFilters() {
  const { searchParams, setParams } = useUrlParams();
  const urlSearch = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(urlSearch);
  const debounced = useDebounce(search);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run only when the debounced text changes
  useEffect(() => {
    if (debounced === urlSearch) return;
    setParams({ search: debounced || undefined, page: undefined });
  }, [debounced]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title or address"
          aria-label="Search complaints"
          className="pl-9"
        />
      </div>
      <select
        aria-label="Filter by status"
        value={searchParams.get("status") ?? ""}
        onChange={(event) =>
          setParams({
            status: event.target.value || undefined,
            page: undefined,
          })
        }
        className="h-9 rounded-md border bg-background px-3 text-sm sm:w-48"
      >
        <option value="">All statuses</option>
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {status.replaceAll("_", " ").toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
