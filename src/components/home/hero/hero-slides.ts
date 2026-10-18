import { BellRing, FileText, type LucideIcon, MapPinned } from "lucide-react";

export type HeroSlide = {
  id: number;
  image: string;
  alt: string;
  badge: string;
  icon: LucideIcon;
  title: string;
  accent: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/AC-Servicing-Dhaka-geotagged-1-1024x683.webp",
    alt: "A technician repairing a water pump and pipes on a Dhaka rooftop",
    badge: "Report in 2 minutes",
    icon: FileText,
    title: "Report city problems.",
    accent: "Get them fixed faster.",
    description:
      "Submit a complaint with photos and location, and we route it to the right department automatically.",
    primary: { label: "Submit a complaint", href: "/dashboard/citizen/new" },
    secondary: { label: "Explore services", href: "/services" },
  },
  {
    id: 2,
    image: "/city-servicing.jpg",
    alt: "City workers repairing a road with heavy machinery",
    badge: "Live tracking",
    icon: MapPinned,
    title: "Track every step.",
    accent: "From assigned to resolved.",
    description:
      "Follow the status of your request in real time and see which officer is working on it.",
    primary: {
      label: "Track a complaint",
      href: "/dashboard/citizen/complaints",
    },
    secondary: { label: "Read the FAQ", href: "/faq" },
  },
  {
    id: 3,
    image: "/images.jpg",
    alt: "A busy city street with buildings and traffic",
    badge: "Instant updates",
    icon: BellRing,
    title: "Stay informed.",
    accent: "Never chase an update again.",
    description:
      "Get notified whenever your complaint changes status, gets a reply, or is marked as resolved.",
    primary: { label: "Get started", href: "/auth/register" },
    secondary: { label: "Contact us", href: "/contact" },
  },
];