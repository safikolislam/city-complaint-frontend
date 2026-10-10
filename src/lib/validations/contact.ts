import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(3, "Enter a subject").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be 1000 characters or fewer"),
});

export type ContactValues = z.infer<typeof contactSchema>;
