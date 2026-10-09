import { redirect } from "next/navigation";
import { getProfile } from "@/lib/profile";

export default async function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  if (profile.staffPosition !== "OFFICER") redirect("/dashboard/staff");
  return <>{children}</>;
}
