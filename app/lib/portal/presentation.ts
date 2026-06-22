import type { StudentAccount } from "@prisma/client";

import type { PortalLeadRow } from "../../components/portal/PortalLeadTable";
import { parseStoredInterests } from "./validation";

export function toPortalLeadRow(student: StudentAccount): PortalLeadRow {
  return {
    id: student.id,
    leadCode: student.leadCode,
    name: student.name || "Student name pending",
    mobile: student.mobile,
    whatsapp:
      student.whatsappAvailable === "none"
        ? "Not used"
        : student.whatsappNumber || "Not provided",
    interest: parseStoredInterests(student.interests).join(", ") || "Not selected",
    state: student.state || "",
    neetYear: student.neetYear || "",
    neetScore: student.neetScore || "",
    status: student.status,
    assignedToId: student.assignedToId || "",
    assignedToName: student.assignedToName || "",
    followUpDate: student.followUpDate?.toISOString() || "",
    createdAt: student.createdAt.toISOString(),
  };
}

export function profileCompletion(student: StudentAccount) {
  const values = [
    student.name,
    student.email,
    student.mobileVerified,
    student.whatsappAvailable,
    student.interests,
    student.className,
    student.neetYear,
    student.state,
    student.city || student.district,
    student.preferredCourse,
  ];
  return Math.round(
    (values.filter((value) => Boolean(value)).length / values.length) * 100
  );
}
