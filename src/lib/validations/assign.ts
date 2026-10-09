import { z } from "zod";

export const assignSchema = z.object({
  staffId: z.string().min(1, "Select an officer"),
});

export type AssignValues = z.infer<typeof assignSchema>;