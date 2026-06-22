import type { Metadata } from "next";

import PortalLeadTable from "../../../components/portal/PortalLeadTable";
import { prisma } from "../../../lib/prisma";
import { toPortalLeadRow } from "../../../lib/portal/presentation";
import { getPortalCounsellors } from "../../../lib/portal/queries";

export const metadata: Metadata = {
  title: "Student Leads | Education Portal",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  const [leads, counsellors] = await Promise.all([
    prisma.studentAccount.findMany({ orderBy: { createdAt: "desc" } }),
    getPortalCounsellors(),
  ]);
  return (
    <PortalLeadTable
      initialLeads={leads.map(toPortalLeadRow)}
      counsellors={counsellors.map(({ id, name }) => ({ id, name }))}
      canAssign
      canPreviewStudent
      detailBasePath="/portal/admin/leads"
    />
  );
}
