import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "../prisma";
import {
  isPortalStaffRole,
  portalRoleHome,
  PORTAL_STAFF_COOKIE,
  PORTAL_STUDENT_COOKIE,
  type PortalStaffRole,
} from "./constants";
import { createPortalToken, verifyPortalToken } from "./token";

const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE,
  priority: "high" as const,
};

export async function setStudentPortalSession(studentId: string) {
  const cookieStore = await cookies();
  cookieStore.set(
    PORTAL_STUDENT_COOKIE,
    createPortalToken(
      { kind: "student", sub: studentId, exp: 0 },
      SESSION_MAX_AGE
    ),
    cookieOptions
  );
  cookieStore.delete(PORTAL_STAFF_COOKIE);
}

export async function setStaffPortalSession(
  userId: string,
  role: PortalStaffRole
) {
  const cookieStore = await cookies();
  cookieStore.set(
    PORTAL_STAFF_COOKIE,
    createPortalToken(
      { kind: "staff", sub: userId, role, exp: 0 },
      SESSION_MAX_AGE
    ),
    cookieOptions
  );
  cookieStore.delete(PORTAL_STUDENT_COOKIE);
}

export async function clearPortalSessions() {
  const cookieStore = await cookies();
  cookieStore.delete(PORTAL_STUDENT_COOKIE);
  cookieStore.delete(PORTAL_STAFF_COOKIE);
}

export async function getCurrentPortalStudent() {
  const cookieStore = await cookies();
  const token = verifyPortalToken(
    cookieStore.get(PORTAL_STUDENT_COOKIE)?.value,
    "student"
  );
  if (!token) return null;

  return prisma.studentAccount.findUnique({
    where: { id: token.sub },
    include: {
      documents: { orderBy: { createdAt: "desc" } },
      activities: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });
}

export async function getCurrentPortalStudentIdentity() {
  const cookieStore = await cookies();
  const token = verifyPortalToken(
    cookieStore.get(PORTAL_STUDENT_COOKIE)?.value,
    "student"
  );
  if (!token) return null;

  return prisma.studentAccount.findUnique({
    where: { id: token.sub },
    select: {
      id: true,
      leadCode: true,
      mobile: true,
    },
  });
}

export async function getCurrentPortalStaff() {
  const cookieStore = await cookies();
  const token = verifyPortalToken(
    cookieStore.get(PORTAL_STAFF_COOKIE)?.value,
    "staff"
  );
  if (!token || !isPortalStaffRole(token.role)) return null;

  const user = await prisma.user.findUnique({
    where: { id: token.sub },
  });

  if (
    !user ||
    !user.portalAccess ||
    !isPortalStaffRole(user.portalRole) ||
    user.portalRole !== token.role
  ) {
    return null;
  }

  return { ...user, portalRole: user.portalRole };
}

export async function requirePortalStudent() {
  const student = await getCurrentPortalStudent();
  if (!student) redirect("/portal/login?tab=student");
  return student;
}

export async function requirePortalStaff(allowedRoles: PortalStaffRole[]) {
  const staff = await getCurrentPortalStaff();
  if (!staff) redirect("/portal/login?tab=staff");
  if (!allowedRoles.includes(staff.portalRole)) {
    redirect(portalRoleHome(staff.portalRole));
  }
  return staff;
}
