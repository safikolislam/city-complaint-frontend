"use client";

import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAiSuggest } from "@/hooks/use-ai-suggest";
import type { SuggestResult } from "@/lib/ai/suggest-schema";
import { AiSuggestResult } from "./ai-suggest-result";

type Category = { id: string; name: string };

type Props = {
  title: string;
  description: string;
  categories: Category[];
  onApply: (result: SuggestResult) => void;
};

const MIN_LENGTH = 15;

export function AiSuggestCard({ title, description, categories, onApply }: Props) {
  const { mutate, data, error, isPending } = useAiSuggest();
  const ready = description.trim().length >= MIN_LENGTH && categories.length > 0;
  const suggested = data && categories.find((c) => c.id === data.categoryId);

  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          <span className="font-medium">Not sure which category fits?</span>
        </div>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={!ready || isPending}
          onClick={() => mutate({ title, description, categories })}
        >
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isPending ? "Thinking..." : "Suggest with AI"}
        </Button>
      </div>

      {!ready && (
        <p className="mt-2 text-xs text-muted-foreground">
          Describe the problem in at least {MIN_LENGTH} characters to get a suggestion.
        </p>
      )}
      {error && (
        <p role="alert" className="mt-2 text-sm text-destructive">
          {error.message}
        </p>
      )}
      {data && suggested && (
        <AiSuggestResult
          result={data}
          categoryName={suggested.name}
          onApply={() => onApply(data)}
        />
      )}
    </div>
  );
}