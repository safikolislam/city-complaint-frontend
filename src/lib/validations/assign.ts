import { z } from "zod";

export const assignSchema = z
  .object({ staffId: z.string(), technicianId: z.string() })
  .refine((value) => value.staffId !== "" || value.technicianId !== "", {
    message: "Select an officer or a technician",
    path: ["technicianId"],
  });

export type AssignValues = z.infer<typeof assignSchema>;