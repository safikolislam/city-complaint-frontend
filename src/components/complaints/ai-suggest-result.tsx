import { Button } from "@/components/ui/button";
import type { SuggestResult } from "@/lib/ai/suggest-schema";

const priorityStyle: Record<SuggestResult["priority"], string> = {
  LOW: "bg-muted text-muted-foreground",
  MEDIUM: "bg-primary/15 text-primary",
  HIGH: "bg-destructive/15 text-destructive",
};

type Props = {
  result: SuggestResult;
  categoryName: string;
  onApply: () => void;
};

export function AiSuggestResult({ result, categoryName, onApply }: Props) {
  return (
    <div className="mt-3 rounded-lg border bg-card p-3 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold">{categoryName}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyle[result.priority]}`}
        >
          {result.priority} priority
        </span>
      </div>
      <p className="mt-1 text-muted-foreground">{result.reason}</p>
      <Button type="button" size="sm" className="mt-3" onClick={onApply}>
        Apply suggestion
      </Button>
    </div>
  );
}