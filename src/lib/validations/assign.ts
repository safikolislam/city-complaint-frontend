import { z } from "zod";

export const assignSchema = z.object({
  staffId: z.string().min(1, "Please select a person"),
});

export type AssignValues = z.infer<typeof assignSchema>;
