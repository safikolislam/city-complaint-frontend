import type { ReactNode } from "react";
import { requirePosition } from "@/lib/require-position";

export default async function TechnicianLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requirePosition("TECHNICIAN");
  return children;
}