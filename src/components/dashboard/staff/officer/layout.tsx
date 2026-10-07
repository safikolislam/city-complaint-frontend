import type { ReactNode } from "react";
import { requirePosition } from "@/lib/require-position";

export default async function OfficerLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requirePosition("OFFICER");
  return children;
}