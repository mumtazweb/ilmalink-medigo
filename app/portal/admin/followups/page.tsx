import type { Metadata } from "next";

import PortalLeadTable from "../../../components/portal/PortalLeadTable";
import { prisma } from "../../../lib/prisma";
import { toPortalLeadRow } from "../../../lib/portal/presentation";
import { getPortalCounsellors } from "../../../lib/portal/queries";

export const metadata: Metadata = {
  title: "Follow-ups | Education Portal",
  robots: { index: false, follow: false },
};

export default async function AdminFollowupsPage() {
  const [leads, counsellors] = await Promise.all([
    prisma.studentAccount.findMany({
      where: {
        OR: [
          { status: "follow-up" },
          { followUpDate: { not: null } },
        ],
      },
      orderBy: [{ followUpDate: "asc" }, { createdAt: "desc" }],
    }),
    getPortalCounsellors(),
  ]);
  return (
    <PortalLeadTable
      initialLeads={leads.map(toPortalLeadRow)}
      counsellors={counsellors.map(({ id, name }) => ({ id, name }))}
      canAssign
    />
  );
}
