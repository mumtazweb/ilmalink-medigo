import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PortalLeadDetail from "../../../../components/portal/PortalLeadDetail";
import { prisma } from "../../../../lib/prisma";
import { requirePortalStaff } from "../../../../lib/portal/session";

export const metadata: Metadata = {
  title: "Assigned Lead Details | Education Portal",
  robots: { index: false, follow: false },
};

export default async function CounsellorLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, staff] = await Promise.all([
    params,
    requirePortalStaff(["counsellor"]),
  ]);
  const lead = await prisma.studentAccount.findFirst({
    where: {
      id,
      ...(staff.portalRole === "super_admin"
        ? {}
        : { assignedToId: staff.id }),
    },
    include: {
      documents: { orderBy: { createdAt: "desc" } },
      activities: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!lead) notFound();

  return <PortalLeadDetail lead={lead} backHref="/portal/counsellor/leads" />;
}
