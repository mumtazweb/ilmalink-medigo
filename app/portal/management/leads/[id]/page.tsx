import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PortalLeadDetail from "../../../../components/portal/PortalLeadDetail";
import { prisma } from "../../../../lib/prisma";

export const metadata: Metadata = {
  title: "Student Details | Management Portal",
  robots: { index: false, follow: false },
};

export default async function ManagementLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lead = await prisma.studentAccount.findUnique({
    where: { id },
    include: {
      documents: { orderBy: { createdAt: "desc" } },
      activities: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!lead) notFound();

  return (
    <PortalLeadDetail lead={lead} backHref="/portal/management/reports" />
  );
}
