import {
  ComplaintList,
  type ListSearchParams,
} from "@/components/complaints/complaint-list";
import { getMyAssigned } from "@/lib/complaints";

export const metadata = { title: "Technician - My tasks" };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<ListSearchParams>;
}) {
  return (
    <ComplaintList
      title="My assigned complaints"
      searchParams={await searchParams}
      fetcher={getMyAssigned}
      hrefBase="/dashboard/staff/technician"
    />
  );
}
