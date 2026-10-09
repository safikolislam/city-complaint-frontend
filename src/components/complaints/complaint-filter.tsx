"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useUrlParams } from "@/hooks/use-url-params";

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
		<div className="relative">
			<Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
			<Input
				value={search}
				onChange={(event) => setSearch(event.target.value)}
				placeholder="Search by title or address"
				aria-label="Search complaints"
				className="pl-9"
			/>
		</div>
	);
}
