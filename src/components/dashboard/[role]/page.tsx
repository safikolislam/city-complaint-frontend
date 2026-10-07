import { notFound, redirect } from "next/navigation";
import { Overview } from "@/components/dashboard/overview";
import { staffHome } from "@/config/routes";
import { getProfile } from "@/lib/profile";

const ROLES = ["citizen", "staff", "admin"];

export default async function DashboardHome({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  if (!ROLES.includes(role)) notFound();

  const profile = await getProfile();
  if (role === "staff") {
    redirect(profile.staffPosition ? staffHome[profile.staffPosition] : "/");
  }

  return <Overview profile={profile} />;
}