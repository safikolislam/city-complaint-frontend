import {
  Construction,
  Droplets,
  Lightbulb,
  Stethoscope,
  Trash2,
  Zap,
} from "lucide-react";
import type { ServiceItem } from "@/types/public-content";

export const SERVICES: ServiceItem[] = [
  {
    title: "Water Supply",
    description:
      "Report pipe leaks, low pressure or contaminated water, and request new household water connections.",
    icon: Droplets,
  },
  {
    title: "Electricity",
    description:
      "Report power outages, damaged poles and loose wires so the right team can respond quickly.",
    icon: Zap,
  },
  {
    title: "Roads and Drainage",
    description:
      "Report potholes, broken footpaths, blocked drains and waterlogging in your neighbourhood.",
    icon: Construction,
  },
  {
    title: "Waste Management",
    description:
      "Report missed garbage collection, overflowing bins and illegal dumping.",
    icon: Trash2,
  },
  {
    title: "Street Lighting",
    description:
      "Report street lights that are broken, flickering or switched off after dark.",
    icon: Lightbulb,
  },
  {
    title: "Public Health",
    description:
      "Report mosquito breeding spots, unsafe sanitation and other public health hazards.",
    icon: Stethoscope,
  },
];
