import { z } from "zod";

export const PRIORITY_OPTIONS = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

export const createComplaintSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title must be 120 characters or fewer"),
  description: z
    .string()
    .trim()
    .min(10, "Describe the problem in at least 10 characters")
    .max(1000, "Description must be 1000 characters or fewer"),
  address: z.string().trim().min(5, "Enter the full address"),
  categoryId: z.string().min(1, "Select a category"),
  priority: z.enum(PRIORITY_OPTIONS),
});
export type CreateComplaintValues = z.infer<typeof createComplaintSchema>;

export const editComplaintSchema = createComplaintSchema.pick({
  title: true,
  description: true,
  address: true,
});
export type EditComplaintValues = z.infer<typeof editComplaintSchema>;