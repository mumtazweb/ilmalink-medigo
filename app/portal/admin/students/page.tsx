import type { Metadata } from "next";

import PortalLeadTable from "../../../components/portal/PortalLeadTable";
import { prisma } from "../../../lib/prisma";
import { toPortalLeadRow } from "../../../lib/portal/presentation";
import { getPortalCounsellors } from "../../../lib/portal/queries";

export const metadata: Metadata = {
  title: "Students | Education Portal",
  robots: { index: false, follow: false },
};

export default async function AdminStudentsPage() {
  const [students, counsellors] = await Promise.all([
    prisma.studentAccount.findMany({
      where: { mobileVerified: true },
      orderBy: { createdAt: "desc" },
    }),
    getPortalCounsellors(),
  ]);
  return (
    <PortalLeadTable
      initialLeads={students.map(toPortalLeadRow)}
      counsellors={counsellors.map(({ id, name }) => ({ id, name }))}
      canAssign
      canPreviewStudent
      detailBasePath="/portal/admin/leads"
    />
  );
}
