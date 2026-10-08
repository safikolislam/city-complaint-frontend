import {
  ComplaintList,
  type ListSearchParams,
} from "@/components/complaints/complaint-list";
import { getComplaints } from "@/lib/complaints";

export const metadata = { title: "Officer - Complaints" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<ListSearchParams>;
}) {
  return (
    <ComplaintList
      title="Complaints"
      searchParams={await searchParams}
      fetcher={getComplaints}
      hrefBase="/dashboard/staff/officer"
    />
  );
}
