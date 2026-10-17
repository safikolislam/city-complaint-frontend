import { ShieldCheck, UserRound, Wrench } from "lucide-react";

export const ROLES = [
  {
    title: "Citizens",
    icon: UserRound,
    accent: "text-blue-500",
    soft: "bg-blue-500/10",
    bar: "bg-blue-500",
    points: [
      "Report problems with location details",
      "Follow progress on a timeline",
      "Pay for paid services with bKash",
      "Edit or cancel a request while it is pending",
    ],
  },
  {
    title: "Department staff",
    icon: Wrench,
    accent: "text-violet-500",
    soft: "bg-violet-500/10",
    bar: "bg-violet-500",
    points: [
      "Officers review department complaints",
      "Officers assign work to technicians",
      "Technicians see their assigned tasks",
      "Technicians start work and mark it resolved",
    ],
  },
  {
    title: "City admins",
    icon: ShieldCheck,
    accent: "text-cyan-500",
    soft: "bg-cyan-500/10",
    bar: "bg-cyan-500",
    points: [
      "See city-wide numbers and charts",
      "Manage users and staff roles",
      "Assign complaints to staff",
      "Review the audit log",
    ],
  },
] as const;