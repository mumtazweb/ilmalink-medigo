import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { sendStudentResetOtpEmail } from "../../../../lib/portal/email";
import {
  createStudentOtp,
  OTP_RESEND_SECONDS,
} from "../../../../lib/portal/otp";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../lib/portal/request";
import { sendStudentOtp } from "../../../../lib/portal/sms";
import {
  cleanText,
  maskEmail,
  maskMobile,
  normalizeEmail,
  normalizeIndianMobile,
} from "../../../../lib/portal/validation";

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const body = await readJsonObject(request);
  const identifier = cleanText(body?.identifier, 191);
  const mobile = normalizeIndianMobile(identifier);
  const email = normalizeEmail(identifier);

  if (!mobile && !email) {
    return NextResponse.json(
      { message: "Enter your registered mobile number or email." },
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
  if (!student) {
    return NextResponse.json(
      { message: "No student profile was found for this mobile number or email." },
      { status: 404 }
    );
  }

  const result = await createStudentOtp(student.mobile, "reset_password");
  if (!result.ok) {
    return NextResponse.json(
      {
        message: `Please wait ${result.retryAfter} seconds before requesting another code.`,
        retryAfter: result.retryAfter,
      },
      { status: 429 }
    );
  }

  const useEmail = Boolean(email && student.email);
  try {
    if (useEmail && student.email) {
      await sendStudentResetOtpEmail(student.email, result.otp);
    } else {
      const delivery = await sendStudentOtp(student.mobile, result.otp);
      if (!delivery.ok) throw new Error(delivery.message);
    }
  } catch (error) {
    await prisma.studentOtp.update({
      where: { id: result.record.id },
      data: { used: true },
    });
    console.error(
      "Student password reset delivery failed:",
      error instanceof Error ? error.message : "Delivery error"
    );
    return NextResponse.json(
      { message: "Unable to send the reset code right now." },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    resetMobile: student.mobile,
    destination: useEmail && student.email
      ? maskEmail(student.email)
      : maskMobile(student.mobile),
    method: useEmail ? "email" : "SMS",
    resendAfter: OTP_RESEND_SECONDS,
  });
}
