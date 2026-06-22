import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { OTP_LENGTH, verifyStudentOtp } from "../../../../lib/portal/otp";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../lib/portal/request";
import {
  normalizeIndianMobile,
  validatePassword,
} from "../../../../lib/portal/validation";

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const body = await readJsonObject(request);
  const mobile = normalizeIndianMobile(body?.mobile);
  const otp = String(body?.otp ?? "").replace(/\D/g, "").slice(0, OTP_LENGTH);
  const passwordResult = validatePassword(body?.password);

  if (!mobile || otp.length !== OTP_LENGTH) {
    return NextResponse.json(
      { message: "Enter the complete 4-digit reset code." },
      { status: 400 }
    );
  }
  if (!passwordResult.ok) {
    return NextResponse.json(
      { message: passwordResult.message },
      { status: 400 }
    );
  }
  if (passwordResult.password !== String(body?.confirmPassword ?? "")) {
    return NextResponse.json(
      { message: "Password and confirm password do not match." },
      { status: 400 }
    );
  }

  const verified = await verifyStudentOtp(mobile, "reset_password", otp);
  if (!verified.ok) {
    return NextResponse.json(
      { message: verified.message },
      { status: 400 }
    );
  }

  const student = await prisma.studentAccount.findUnique({
    where: { mobile },
    select: { id: true },
  });
  if (!student) {
    return NextResponse.json(
      { message: "Student profile not found." },
      { status: 404 }
    );
  }

  await prisma.studentAccount.update({
    where: { id: student.id },
    data: {
      password: await bcrypt.hash(passwordResult.password, 12),
      activities: {
        create: {
          action: "password_reset",
          note: "Student reset the portal password using a verified code.",
          createdBy: `student:${student.id}`,
        },
      },
    },
  });

  return NextResponse.json({
    ok: true,
    message: "Password reset successful. You can now log in.",
    redirectTo: "/portal/login?tab=student",
  });
}
