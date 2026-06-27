import type { Metadata } from "next";
import {
  BarChart3,
  CalendarClock,
  GraduationCap,
  UsersRound,
} from "lucide-react";

import PortalStatCard from "../../../components/portal/PortalStatCard";
import { getPortalDashboardCounts } from "../../../lib/portal/queries";

export const metadata: Metadata = {
  title: "Management Dashboard | ilmaLink",
  robots: { index: false, follow: false },
};

export default async function ManagementDashboardPage() {
  const counts = await getPortalDashboardCounts();
  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <PortalStatCard label="Total students" value={counts.totalStudents} icon={UsersRound} />
        <PortalStatCard label="New leads" value={counts.newLeads} icon={BarChart3} tone="blue" />
        <PortalStatCard label="Pending follow-ups" value={counts.pendingFollowups} icon={CalendarClock} tone="amber" />
        <PortalStatCard label="Admissions" value={counts.admittedStudents} icon={GraduationCap} tone="teal" />
      </section>
      <section className="rounded-2xl border border-[#D8E4EF] bg-white p-5 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
        <h2 className="text-xl font-black text-[#082A62]">
          Interest summary
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MiniSummary label="MBBS Abroad" value={counts.mbbsAbroad} />
          <MiniSummary label="MBBS India" value={counts.mbbsIndia} />
          <MiniSummary label="NEET Coaching" value={counts.neetCoaching} />
          <MiniSummary label="Scholarships" value={counts.scholarships} />
        </div>
      </section>
    </div>
  );
}

function MiniSummary({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-[#F4F8FC] p-4 text-center">
      <strong className="block text-2xl font-black text-[#0B4AA2]">{value}</strong>
      <span className="text-xs font-bold text-[#60738F]">{label}</span>
    </div>
  );
}
