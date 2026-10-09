import { redirect } from "next/navigation";
import { getProfile } from "@/lib/profile";

export default async function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  if (profile.staffPosition !== "TECHNICIAN") redirect("/dashboard/staff");
  return <>{children}</>;
}
