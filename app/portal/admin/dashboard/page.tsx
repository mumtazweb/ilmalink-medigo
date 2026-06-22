import type { Metadata } from "next";
import {
  BadgeCheck,
  CalendarClock,
  ContactRound,
  GraduationCap,
  HeartHandshake,
  Landmark,
  ShieldX,
  Stethoscope,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

import PortalLeadTable from "../../../components/portal/PortalLeadTable";
import PortalStatCard from "../../../components/portal/PortalStatCard";
import { prisma } from "../../../lib/prisma";
import { toPortalLeadRow } from "../../../lib/portal/presentation";
import {
  getPortalCounsellors,
  getPortalDashboardCounts,
} from "../../../lib/portal/queries";

export const metadata: Metadata = {
  title: "Education Admin Dashboard | ILMALINK MEDIGO",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [counts, recentStudents, counsellors] = await Promise.all([
    getPortalDashboardCounts(),
    prisma.studentAccount.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
    getPortalCounsellors(),
  ]);

  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PortalStatCard label="Total students" value={counts.totalStudents} icon={UsersRound} />
        <PortalStatCard label="New leads" value={counts.newLeads} icon={ContactRound} tone="teal" />
        <PortalStatCard label="Verified students" value={counts.verifiedStudents} icon={BadgeCheck} tone="violet" />
        <PortalStatCard label="Today’s signups" value={counts.todaySignups} icon={UserRoundCheck} tone="amber" />
        <PortalStatCard label="Pending follow-ups" value={counts.pendingFollowups} icon={CalendarClock} tone="amber" />
        <PortalStatCard label="Admitted students" value={counts.admittedStudents} icon={GraduationCap} tone="teal" />
        <PortalStatCard label="Invalid leads" value={counts.invalidLeads} icon={ShieldX} tone="red" />
        <PortalStatCard label="MBBS Abroad interest" value={counts.mbbsAbroad} icon={Stethoscope} tone="violet" />
        <PortalStatCard label="MBBS India interest" value={counts.mbbsIndia} icon={Landmark} />
        <PortalStatCard label="NEET Coaching interest" value={counts.neetCoaching} icon={GraduationCap} tone="amber" />
        <PortalStatCard label="Scholarship interest" value={counts.scholarships} icon={HeartHandshake} tone="teal" />
      </section>

      <div>
        <h2 className="mb-3 text-xl font-black text-[#082A62]">
          Recent student leads
        </h2>
        <PortalLeadTable
          initialLeads={recentStudents.map(toPortalLeadRow)}
          counsellors={counsellors.map(({ id, name }) => ({ id, name }))}
          canAssign
          detailBasePath="/portal/admin/leads"
        />
      </div>
    </div>
  );
}
