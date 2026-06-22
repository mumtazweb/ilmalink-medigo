import type { Metadata } from "next";

import PortalLeadTable from "../../../components/portal/PortalLeadTable";
import { prisma } from "../../../lib/prisma";
import { toPortalLeadRow } from "../../../lib/portal/presentation";
import { requirePortalStaff } from "../../../lib/portal/session";

export const metadata: Metadata = {
  title: "My Assigned Leads | ILMALINK MEDIGO",
  robots: { index: false, follow: false },
};

export default async function CounsellorLeadsPage() {
  const staff = await requirePortalStaff(["counsellor"]);
  const leads = await prisma.studentAccount.findMany({
    where: { assignedToId: staff.id },
    orderBy: { createdAt: "desc" },
  });
  return (
    <PortalLeadTable
      initialLeads={leads.map(toPortalLeadRow)}
      detailBasePath="/portal/counsellor/leads"
    />
  );
}
