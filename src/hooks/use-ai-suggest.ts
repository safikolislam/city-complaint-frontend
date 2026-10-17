import { useMutation } from "@tanstack/react-query";
import type { SuggestInput, SuggestResult } from "@/lib/ai/suggest-schema";

async function requestSuggestion(
  payload: SuggestInput,
): Promise<SuggestResult> {
  const res = await fetch("/api/ai/suggest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = (await res.json()) as { data?: SuggestResult; message?: string };

  if (!res.ok || !json.data) {
    throw new Error(json.message ?? "Could not get a suggestion");
  }
  return json.data;
}

export function useAiSuggest() {
  return useMutation({ mutationFn: requestSuggestion });
}