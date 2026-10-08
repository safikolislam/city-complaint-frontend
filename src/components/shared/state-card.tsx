import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  label: string;
  value: number | string;
  icon: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold">{value}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
      </CardContent>
    </Card>
  );
}
