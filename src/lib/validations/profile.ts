import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(
      /^(?:\+8801|01)[3-9]\d{8}$/,
      "Enter a valid Bangladeshi phone number",
    )
    .or(z.literal("")),
});

export type ProfileValues = z.infer<typeof profileSchema>;
