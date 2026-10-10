import { z } from "zod";

export const assignTechnicianSchema = z.object({
  technicianId: z.string().min(1, "Select a technician"),
});

export type AssignTechnicianValues = z.infer<typeof assignTechnicianSchema>;