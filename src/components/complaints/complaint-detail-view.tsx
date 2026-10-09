"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CitizenActions } from "@/components/complaints/citizen-actions";
import { ComplaintInfo } from "@/components/complaints/complaint-info";
import { StatusTimeline } from "@/components/complaints/status-timeline";
import { TechnicianActions } from "@/components/complaints/technician-actions";
import { complaintKey } from "@/hooks/use-compliant-mutations";
import { clientApi } from "@/lib/client-api";
import type { ComplaintDetail } from "@/types/complaint";

interface ComplaintDetailViewProps {
  id: string;
  initial: ComplaintDetail;
  mode: "technician" | "citizen" | "view";
  backHref: string;
}

export function ComplaintDetailView({
  id,
  initial,
  mode,
  backHref,
}: ComplaintDetailViewProps) {
  const { data: complaint } = useQuery({
    queryKey: complaintKey(id),
    queryFn: async () =>
      (await clientApi<ComplaintDetail>(`/complaints/${id}`)).data,
    initialData: initial,
  });

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back
      </Link>
      <ComplaintInfo complaint={complaint} />
      {mode === "technician" ? (
        <TechnicianActions id={id} status={complaint.status} />
      ) : null}
      {mode === "citizen" ? <CitizenActions complaint={complaint} /> : null}
      <StatusTimeline items={complaint.statusHistory} />
    </div>
  );
}
