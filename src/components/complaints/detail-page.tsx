import { ComplaintDetailView } from "@/components/complaints/complaint-detail-view";
import { getComplaint } from "@/lib/complaints";

interface DetailPageProps {
  params: Promise<{ id: string }>;
  mode: "technician" | "citizen" | "view";
  backHref: string;
}

export async function ComplaintDetailPage(props: DetailPageProps) {
  const { id } = await props.params;
  const initial = await getComplaint(id);

  return (
    <ComplaintDetailView
      id={id}
      initial={initial}
      mode={props.mode}
      backHref={props.backHref}
    />
  );
}
