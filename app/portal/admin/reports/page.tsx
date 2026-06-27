import type { Metadata } from "next";
import { BarChart3, CalendarDays, PieChart } from "lucide-react";

import PortalStatCard from "../../../components/portal/PortalStatCard";
import { prisma } from "../../../lib/prisma";
import {
  getMonthlySignupSummary,
  getPortalDashboardCounts,
} from "../../../lib/portal/queries";

export const metadata: Metadata = {
  title: "Education Portal Reports | ilmaLink",
  robots: { index: false, follow: false },
};

export default async function AdminReportsPage() {
  const [counts, months, students] = await Promise.all([
    getPortalDashboardCounts(),
    getMonthlySignupSummary(),
    prisma.studentAccount.findMany({
      select: {
        preferredCountry: true,
        preferredCourse: true,
        status: true,
      },
    }),
  ]);
  const courseSummary = summarize(students.map((student) => student.preferredCourse));
  const countrySummary = summarize(students.map((student) => student.preferredCountry));

  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-3">
        <PortalStatCard label="Total students" value={counts.totalStudents} icon={BarChart3} />
        <PortalStatCard label="Admitted" value={counts.admittedStudents} icon={PieChart} tone="teal" />
        <PortalStatCard label="Pending follow-ups" value={counts.pendingFollowups} icon={CalendarDays} tone="amber" />
      </section>
      <section className="grid gap-4 xl:grid-cols-3">
        <SummaryTable title="Monthly signups" rows={months} />
        <SummaryTable title="Course-wise interest" rows={courseSummary} />
        <SummaryTable title="Country-wise interest" rows={countrySummary} />
      </section>
    </div>
  );
}

function summarize(values: Array<string | null>) {
  const counts = new Map<string, number>();
  for (const value of values) {
    const label = value?.trim() || "Not selected";
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

function SummaryTable({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; value: number }>;
}) {
  const max = Math.max(1, ...rows.map((row) => row.value));
  return (
    <article className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
      <h2 className="text-lg font-black text-[#082A62]">{title}</h2>
      <div className="mt-4 space-y-3">
        {rows.length ? rows.map((row) => (
          <div key={row.label}>
            <div className="flex justify-between gap-3 text-xs font-bold text-[#46617F]">
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
            <div className="mt-1 h-2 rounded-full bg-[#E8EEF4]">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#1769E8,#00A88F)]"
                style={{ width: `${(row.value / max) * 100}%` }}
              />
            </div>
          </div>
        )) : (
          <p className="text-sm font-medium text-[#71839A]">No data yet.</p>
        )}
      </div>
    </article>
  );
}
