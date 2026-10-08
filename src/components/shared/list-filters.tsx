"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlParams } from "@/hooks/use-url-params";

interface ListFiltersProps {
  searchPlaceholder?: string;
  selectParam?: string;
  selectLabel?: string;
  options?: { value: string; label: string }[];
}

export function ListFilters(props: ListFiltersProps) {
  const { searchPlaceholder, selectParam, selectLabel, options } = props;
  const { searchParams, setParams } = useUrlParams();
  const urlSearch = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(urlSearch);
  const debounced = useDebounce(search);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run only when the debounced text changes
  useEffect(() => {
    if (!searchPlaceholder || debounced === urlSearch) return;
    setParams({ search: debounced || undefined, page: undefined });
  }, [debounced]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {searchPlaceholder ? (
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="pl-9"
          />
        </div>
      ) : null}
      {selectParam && options ? (
        <select
          aria-label={selectLabel}
          value={searchParams.get(selectParam) ?? ""}
          onChange={(event) =>
            setParams({
              [selectParam]: event.target.value || undefined,
              page: undefined,
            })
          }
          className="h-9 rounded-md border bg-background px-3 text-sm sm:w-56"
        >
          <option value="">{selectLabel}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
}
