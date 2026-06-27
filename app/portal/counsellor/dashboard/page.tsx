import type { Metadata } from "next";
import {
  CalendarClock,
  ClipboardList,
  ContactRound,
  FileClock,
} from "lucide-react";

import PortalLeadTable from "../../../components/portal/PortalLeadTable";
import PortalStatCard from "../../../components/portal/PortalStatCard";
import { prisma } from "../../../lib/prisma";
import { toPortalLeadRow } from "../../../lib/portal/presentation";
import { requirePortalStaff } from "../../../lib/portal/session";

export const metadata: Metadata = {
  title: "Counsellor Dashboard | ilmaLink",
  robots: { index: false, follow: false },
};

export default async function CounsellorDashboardPage() {
  const staff = await requirePortalStaff(["counsellor"]);
  const leadScope =
    staff.portalRole === "super_admin" ? {} : { assignedToId: staff.id };
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  const [assigned, todayFollowups, interested, documentPending, applicationStarted] =
    await Promise.all([
      prisma.studentAccount.findMany({
        where: leadScope,
        orderBy: [{ followUpDate: "asc" }, { createdAt: "desc" }],
      }),
      prisma.studentAccount.count({
        where: {
          ...leadScope,
          followUpDate: { lte: endOfToday },
          status: { notIn: ["admitted", "invalid", "not-interested"] },
        },
      }),
      prisma.studentAccount.count({
        where: { ...leadScope, status: "interested" },
      }),
      prisma.studentAccount.count({
        where: { ...leadScope, status: "document-pending" },
      }),
      prisma.studentAccount.count({
        where: { ...leadScope, status: "application-started" },
      }),
    ]);

  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PortalStatCard label="My assigned leads" value={assigned.length} icon={ContactRound} />
        <PortalStatCard label="Today’s follow-ups" value={todayFollowups} icon={CalendarClock} tone="amber" />
        <PortalStatCard label="Interested students" value={interested} icon={ClipboardList} tone="teal" />
        <PortalStatCard label="Document pending" value={documentPending} icon={FileClock} tone="violet" />
        <PortalStatCard label="Application started" value={applicationStarted} icon={ClipboardList} tone="blue" />
      </section>
      <PortalLeadTable
        initialLeads={assigned.slice(0, 12).map(toPortalLeadRow)}
        detailBasePath="/portal/counsellor/leads"
      />
    </div>
  );
}
