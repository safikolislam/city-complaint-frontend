import { z } from "zod";

export const editComplaintSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be 150 characters or fewer"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
  address: z.string().trim().min(3, "Address must be at least 3 characters"),
});

export type EditComplaintValues = z.infer<typeof editComplaintSchema>;