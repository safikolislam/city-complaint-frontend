import { NextResponse } from "next/server";
import { askGeminiJson } from "@/lib/ai/gemini";
import { buildSuggestPrompt } from "@/lib/ai/suggest-prompt";
import {
  suggestRequestSchema,
  suggestResultSchema,
} from "@/lib/ai/suggest-schema";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = suggestRequestSchema.safeParse(body);

  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid request";
    return NextResponse.json({ message }, { status: 400 });
  }

  const input = parsed.data;

  try {
    const raw = await askGeminiJson(buildSuggestPrompt(input));
    const result = suggestResultSchema.parse(raw);

    if (!input.categories.some((c) => c.id === result.categoryId)) {
      throw new Error("Unknown category returned");
    }
    return NextResponse.json({ data: result });
  } catch {
    return NextResponse.json(
      {
        message:
          "AI suggestion is unavailable right now. Please choose manually.",
      },
      { status: 502 },
    );
  }
}
