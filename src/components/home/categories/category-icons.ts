import {
  CircleHelp,
  Construction,
  Droplet,
  Lightbulb,
  type LucideIcon,
  Trash2,
  Trees,
  Waves,
  Zap,
} from "lucide-react";

const rules: [RegExp, LucideIcon][] = [
  [/light|lamp/i, Lightbulb],
  [/road|pothole|traffic/i, Construction],
  [/water/i, Droplet],
  [/electric|power/i, Zap],
  [/garbage|waste|trash/i, Trash2],
  [/drain|sewer|flood/i, Waves],
  [/park|tree|green/i, Trees],
];

export function pickCategoryIcon(name: string): LucideIcon {
  return rules.find(([pattern]) => pattern.test(name))?.[1] ?? CircleHelp;
}