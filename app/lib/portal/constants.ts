export const PORTAL_STUDENT_COOKIE = "ilmalink_portal_student";
export const PORTAL_STAFF_COOKIE = "ilmalink_portal_staff";

export const PORTAL_STAFF_ROLES = [
  "super_admin",
  "education_admin",
  "counsellor",
  "management",
] as const;

export type PortalStaffRole = (typeof PORTAL_STAFF_ROLES)[number];

export const STUDENT_STATUSES = [
  "new",
  "called",
  "interested",
  "follow-up",
  "document-pending",
  "application-started",
  "admitted",
  "not-interested",
  "invalid",
] as const;

export type StudentStatus = (typeof STUDENT_STATUSES)[number];

export const STUDENT_INTERESTS = [
  "NEET Coaching",
  "MBBS India Counselling",
  "MBBS Abroad Counselling",
  "Scholarships / Education Support",
] as const;

export const PORTAL_AUDIENCE_TYPES = [
  "Student",
  "Teacher",
  "Parent",
  "NEET Aspirant",
  "Other",
] as const;

export function isPortalStaffRole(value: unknown): value is PortalStaffRole {
  return (
    typeof value === "string" &&
    PORTAL_STAFF_ROLES.includes(value as PortalStaffRole)
  );
}

export function portalRoleHome(role: PortalStaffRole) {
  if (role === "counsellor") return "/portal/counsellor/dashboard";
  if (role === "management") return "/portal/management/dashboard";
  return "/portal/admin/dashboard";
}

export function statusLabel(status: string) {
  return status
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
