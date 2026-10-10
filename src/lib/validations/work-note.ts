import { z } from "zod";

export const workNoteSchema = z.object({
  note: z.string().trim().max(500, "Note must be 500 characters or fewer"),
});

export type WorkNoteValues = z.infer<typeof workNoteSchema>;
