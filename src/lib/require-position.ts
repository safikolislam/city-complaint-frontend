import { redirect } from "next/navigation";
import { staffHome } from "@/config/routes";
import { getProfile } from "@/lib/profile";
import type { StaffPosition } from "@/types/api";

export async function requirePosition(position: StaffPosition) {
  const profile = await getProfile();
  if (profile.staffPosition !== position) {
    redirect(profile.staffPosition ? staffHome[profile.staffPosition] : "/");
  }
}