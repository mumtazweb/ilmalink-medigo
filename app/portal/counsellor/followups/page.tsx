import type { Metadata } from "next";

import PortalLeadTable from "../../../components/portal/PortalLeadTable";
import { prisma } from "../../../lib/prisma";
import { toPortalLeadRow } from "../../../lib/portal/presentation";
import { requirePortalStaff } from "../../../lib/portal/session";

export const metadata: Metadata = {
  title: "My Follow-ups | ILMALINK MEDIGO",
  robots: { index: false, follow: false },
};

export default async function CounsellorFollowupsPage() {
  const staff = await requirePortalStaff(["counsellor"]);
  const leads = await prisma.studentAccount.findMany({
    where: {
      ...(staff.portalRole === "super_admin"
        ? {}
        : { assignedToId: staff.id }),
      OR: [{ status: "follow-up" }, { followUpDate: { not: null } }],
    },
    orderBy: [{ followUpDate: "asc" }, { createdAt: "desc" }],
  });
  return (
    <PortalLeadTable
      initialLeads={leads.map(toPortalLeadRow)}
      detailBasePath="/portal/counsellor/leads"
    />
  );
}
