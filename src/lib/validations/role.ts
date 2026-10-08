import { z } from "zod";

export const roleSchema = z
  .object({
    role: z.enum(["CITIZEN", "STAFF", "ADMIN"]),
    staffPosition: z.enum(["", "OFFICER", "TECHNICIAN"]),
    departmentId: z.string(),
  })
  .refine(
    (value) =>
      value.role !== "STAFF" ||
      (value.staffPosition !== "" && value.departmentId !== ""),
    {
      message: "Staff needs a position and a department",
      path: ["departmentId"],
    },
  );

export type RoleValues = z.infer<typeof roleSchema>;
