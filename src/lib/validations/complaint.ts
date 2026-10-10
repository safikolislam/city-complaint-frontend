import { z } from "zod";

export const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;

export const detailsSchema = z.object({
  categoryId: z.string().min(1, "Select a category"),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be 150 characters or fewer"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(PRIORITIES),
});

const coordinate = (min: number, max: number, label: string) =>
  z
    .string()
    .refine(
      (v) =>
        v === "" ||
        (!Number.isNaN(Number(v)) && Number(v) >= min && Number(v) <= max),
      `${label} must be between ${min} and ${max}`,
    );

export const locationSchema = z.object({
  address: z.string().min(3, "Address must be at least 3 characters"),
  latitude: coordinate(-90, 90, "Latitude"),
  longitude: coordinate(-180, 180, "Longitude"),
});

export type DetailsValues = z.infer<typeof detailsSchema>;
export type LocationValues = z.infer<typeof locationSchema>;
