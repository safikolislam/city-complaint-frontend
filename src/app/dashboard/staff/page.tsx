import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { staffHome } from "@/config/routes";
import { getProfile } from "@/lib/profile";

export const metadata = { title: "Staff" };

export default async function StaffIndexPage() {
  const { staffPosition } = await getProfile();
  if (staffPosition) redirect(staffHome[staffPosition]);

  return (
    <Card className="max-w-xl">
      <CardContent className="p-6 text-sm text-muted-foreground">
        Your staff position has not been set yet. Please ask an admin to make
        you an officer or a technician.
      </CardContent>
    </Card>
  );
}
