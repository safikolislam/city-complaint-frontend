import { z } from "zod";

export const officerAssignSchema = z.object({
  technicianId: z.string().min(1, "Select a technician"),
});

export type OfficerAssignValues = z.infer<typeof officerAssignSchema>;