import "server-only";

import { prisma } from "../prisma";

export async function getPortalDashboardCounts() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const [
    totalStudents,
    newLeads,
    verifiedStudents,
    todaySignups,
    pendingFollowups,
    admittedStudents,
    invalidLeads,
    mbbsAbroad,
    mbbsIndia,
    neetCoaching,
    scholarships,
  ] = await Promise.all([
    prisma.studentAccount.count(),
    prisma.studentAccount.count({ where: { status: "new" } }),
    prisma.studentAccount.count({ where: { mobileVerified: true } }),
    prisma.studentAccount.count({
      where: { createdAt: { gte: startOfToday, lte: endOfToday } },
    }),
    prisma.studentAccount.count({
      where: {
        followUpDate: { lte: endOfToday },
        status: { notIn: ["admitted", "invalid", "not-interested"] },
      },
    }),
    prisma.studentAccount.count({ where: { status: "admitted" } }),
    prisma.studentAccount.count({ where: { status: "invalid" } }),
    prisma.studentAccount.count({
      where: { interests: { contains: "MBBS Abroad Counselling" } },
    }),
    prisma.studentAccount.count({
      where: { interests: { contains: "MBBS India Counselling" } },
    }),
    prisma.studentAccount.count({
      where: { interests: { contains: "NEET Coaching" } },
    }),
    prisma.studentAccount.count({
      where: {
        interests: { contains: "Scholarships / Education Support" },
      },
    }),
  ]);

  return {
    totalStudents,
    newLeads,
    verifiedStudents,
    todaySignups,
    pendingFollowups,
    admittedStudents,
    invalidLeads,
    mbbsAbroad,
    mbbsIndia,
    neetCoaching,
    scholarships,
  };
}

export async function getPortalCounsellors() {
  return prisma.user.findMany({
    where: { portalAccess: true, portalRole: "counsellor" },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true },
  });
}

export async function getMonthlySignupSummary(months = 6) {
  const start = new Date();
  start.setMonth(start.getMonth() - (months - 1), 1);
  start.setHours(0, 0, 0, 0);
  const students = await prisma.studentAccount.findMany({
    where: { createdAt: { gte: start } },
    select: { createdAt: true },
  });
  const formatter = new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  });
  const result = new Map<string, number>();

  for (let offset = months - 1; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setMonth(date.getMonth() - offset, 1);
    result.set(formatter.format(date), 0);
  }
  for (const student of students) {
    const key = formatter.format(student.createdAt);
    if (result.has(key)) result.set(key, (result.get(key) ?? 0) + 1);
  }
  return [...result.entries()].map(([label, value]) => ({ label, value }));
}
