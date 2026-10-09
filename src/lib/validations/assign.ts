import { z } from "zod";

export const assignSchema = z.object({
  staffId: z.string().min(1, "Select a staff member"),
  technicianId: z.string().min(1, "Select a technician"),
});

export type AssignValues = z.infer<typeof assignSchema>;