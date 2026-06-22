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
  title: "Counsellor Dashboard | ILMALINK MEDIGO",
  robots: { index: false, follow: false },
};

export default async function CounsellorDashboardPage() {
  const staff = await requirePortalStaff(["counsellor"]);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  const [assigned, todayFollowups, interested, documentPending, applicationStarted] =
    await Promise.all([
      prisma.studentAccount.findMany({
        where: { assignedToId: staff.id },
        orderBy: [{ followUpDate: "asc" }, { createdAt: "desc" }],
      }),
      prisma.studentAccount.count({
        where: {
          assignedToId: staff.id,
          followUpDate: { lte: endOfToday },
          status: { notIn: ["admitted", "invalid", "not-interested"] },
        },
      }),
      prisma.studentAccount.count({
        where: { assignedToId: staff.id, status: "interested" },
      }),
      prisma.studentAccount.count({
        where: { assignedToId: staff.id, status: "document-pending" },
      }),
      prisma.studentAccount.count({
        where: { assignedToId: staff.id, status: "application-started" },
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
