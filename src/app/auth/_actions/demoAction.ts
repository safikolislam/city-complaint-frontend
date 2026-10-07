"use server";

import { type ActionResult, loginAction } from "./authAction";

const DEMO_ROLES = ["CITIZEN", "OFFICER", "TECHNICIAN", "ADMIN"];

export type DemoRole = "CITIZEN" | "OFFICER" | "TECHNICIAN" | "ADMIN";

export async function demoLoginAction(role: DemoRole): Promise<ActionResult> {
  if (!DEMO_ROLES.includes(role)) {
    return { success: false, message: "Invalid demo role." };
  }

  const email = process.env[`DEMO_${role}_EMAIL`];
  const password = process.env[`DEMO_${role}_PASSWORD`];
  if (!email || !password) {
    return { success: false, message: "Demo account is not configured." };
  }

  return loginAction({ email, password });
}
