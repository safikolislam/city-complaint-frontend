import { Activity, FilePenLine, type LucideIcon, Users } from "lucide-react";

export type Step = {
  number: number;
  title: string;
  description: string;
  detail: string;
  Icon: LucideIcon;
};

export const steps: Step[] = [
  {
    number: 1,
    title: "Submit Your Complaint",
    description:
      "Describe the issue, attach a photo, and pin your location on the map. Takes less than 2 minutes from any device.",
    detail:
      "You get a unique complaint ID instantly. Use it to track progress anytime.",
    Icon: FilePenLine,
  },
  {
    number: 2,
    title: "City Assigns a Team",
    description:
      "Your complaint is routed to the right department. A field officer reviews it and assigns a technician.",
    detail:
      "You receive a notification when someone is assigned to your complaint.",
    Icon: Users,
  },
  {
    number: 3,
    title: "Work Begins & You're Updated",
    description:
      "Track real-time status updates as the team works on the fix. Get notified when it's fully resolved.",
    detail:
      "Rate the resolution after it's done — your feedback improves the system.",
    Icon: Activity,
  },
];