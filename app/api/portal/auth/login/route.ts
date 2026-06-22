import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import {
  getEffectivePortalStaffRole,
  isPortalStaffRole,
  portalRoleHome,
} from "../../../../lib/portal/constants";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../lib/portal/request";
import {
  setStaffPortalSession,
  setStudentPortalSession,
} from "../../../../lib/portal/session";
import {
  cleanText,
  normalizeEmail,
  normalizeIndianMobile,
} from "../../../../lib/portal/validation";

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const body = await readJsonObject(request);
  const mode = cleanText(body?.mode, 20);
  const password = String(body?.password ?? "");

  if (!password || password.length > 128) {
    return NextResponse.json(
      { message: "Enter your password." },
      { status: 400 }
    );
  }

  if (mode === "student") {
    const identifier = cleanText(body?.identifier, 191);
    const mobile = normalizeIndianMobile(identifier);
    const email = normalizeEmail(identifier);
    if (!mobile && !email) {
      return NextResponse.json(
        { message: "Enter a registered mobile number or email." },
        { status: 400 }
      );
    }

    const student = await prisma.studentAccount.findFirst({
      where: {
        OR: [
          ...(mobile ? [{ mobile }] : []),
          ...(email ? [{ email }] : []),
        ],
      },
    });
    if (
      !student?.password ||
      !(await bcrypt.compare(password, student.password))
    ) {
      return NextResponse.json(
        { message: "Invalid mobile/email or password." },
        { status: 401 }
      );
    }

    await setStudentPortalSession(student.id);
    return NextResponse.json({
      ok: true,
      redirectTo: "/portal/student/dashboard",
    });
  }

  if (mode === "staff") {
    const email = normalizeEmail(body?.identifier);
    if (!email) {
      return NextResponse.json(
        { message: "Enter your staff email address." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }
    const effectiveRole = getEffectivePortalStaffRole(user);
    if (!effectiveRole || !isPortalStaffRole(effectiveRole)) {
      return NextResponse.json(
        {
          message:
            "You do not have Education Portal access. Please contact Super Admin.",
        },
        { status: 403 }
      );
    }

    await setStaffPortalSession(user.id, effectiveRole);
    return NextResponse.json({
      ok: true,
      redirectTo: portalRoleHome(effectiveRole),
    });
  }

  return NextResponse.json(
    { message: "Select Student Login or Staff Login." },
    { status: 400 }
  );
}
