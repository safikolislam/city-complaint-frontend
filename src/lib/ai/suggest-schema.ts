import { z } from "zod";

export const PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;

export const suggestRequestSchema = z.object({
  title: z.string().trim().max(150).default(""),
  description: z
    .string()
    .trim()
    .min(15, "Write at least 15 characters first")
    .max(1500),
  categories: z
    .array(z.object({ id: z.string(), name: z.string() }))
    .min(1)
    .max(50),
});

export const suggestResultSchema = z.object({
  categoryId: z.string(),
  priority: z.enum(PRIORITIES),
  reason: z.string().max(300),
});

export type SuggestInput = z.input<typeof suggestRequestSchema>;
export type SuggestRequest = z.output<typeof suggestRequestSchema>;
export type SuggestResult = z.infer<typeof suggestResultSchema>;