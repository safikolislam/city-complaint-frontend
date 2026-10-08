import { Skeleton } from "@/components/ui/skeleton";

const ROWS = ["row-1", "row-2", "row-3", "row-4", "row-5", "row-6"];

export default function ComplaintsLoading() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-4 w-40" />
			</div>
			<div className="flex gap-3">
				<Skeleton className="h-9 flex-1" />
				<Skeleton className="h-9 w-48" />
			</div>
			<div className="space-y-3 rounded-xl border p-4">
				{ROWS.map((id) => (
					<Skeleton key={id} className="h-10 w-full" />
				))}
			</div>
		</div>
	);
}
