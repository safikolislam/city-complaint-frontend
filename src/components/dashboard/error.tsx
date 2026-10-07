"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <div className="space-y-3 rounded-lg border p-6 text-center">
      <h2 className="text-lg font-semibold">Something went wrong</h2>
      <p className="text-sm text-muted-foreground">
        We could not load this page. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}