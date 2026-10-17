import {
  LayoutDashboard,
  MapPin,
  MessageCircle,
  ScrollText,
  Sparkles,
  UserCheck,
  Wallet,
  Workflow,
} from "lucide-react";

export const HIGHLIGHTS = [
  {
    title: "Report with location",
    description:
      "Describe the problem, add the address and pick a category in one short form.",
    icon: MapPin,
  },
  {
    title: "Live progress timeline",
    description:
      "Follow every step of your request, from pending to assigned to resolved.",
    icon: Workflow,
  },
  {
    title: "AI category suggestion",
    description:
      "Write your complaint and AI suggests the right category and priority for you.",
    icon: Sparkles,
  },
  {
    title: "AI chat assistant",
    description:
      "Ask the assistant how to report, track or pay and get an answer instantly.",
    icon: MessageCircle,
  },
  {
    title: "Pay with bKash",
    description:
      "Pay for paid services online and keep every payment in your history.",
    icon: Wallet,
  },
  {
    title: "Smart assignment",
    description:
      "Officers review each complaint and assign it to a technician in the department.",
    icon: UserCheck,
  },
  {
    title: "Role-based dashboards",
    description:
      "Citizens, staff and admins each see only the tools and data they need.",
    icon: LayoutDashboard,
  },
  {
    title: "Transparent audit log",
    description:
      "Admins can review who changed what, so every action stays accountable.",
    icon: ScrollText,
  },
] as const;