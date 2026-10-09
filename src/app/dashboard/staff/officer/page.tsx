import {
  ComplaintList,
  type ListSearchParams,
} from "@/components/complaints/complaint-list";
import { staffHome } from "@/config/routes";
import { getComplaints } from "@/lib/complaints";

export const metadata = { title: "Department complaints" };

export default async function OfficerPage({
  searchParams,
}: {
  searchParams: Promise<ListSearchParams>;
}) {
  return (
    <ComplaintList
      title="Department complaints"
      searchParams={await searchParams}
      fetcher={getComplaints}
      hrefBase={staffHome.OFFICER}
    />
  );
}
