import type { z } from "zod";
import { detailsSchema, locationSchema } from "./complaint";


export const createComplaintSchema = detailsSchema.extend(locationSchema.shape);

export type CreateComplaintValues = z.infer<typeof createComplaintSchema>;

export const createComplaintDefaults: CreateComplaintValues = {
  categoryId: "",
  title: "",
  description: "",
  priority: "MEDIUM",
  address: "",
  latitude: "",
  longitude: "",
};