import { NextRequest, NextResponse } from "next/server";

import { prisma } from "../../../../../lib/prisma";
import {
  createStudentOtp,
  OTP_RESEND_SECONDS,
} from "../../../../../lib/portal/otp";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../../../../lib/portal/request";
import { sendStudentOtp } from "../../../../../lib/portal/sms";
import { normalizeIndianMobile } from "../../../../../lib/portal/validation";

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });
  }

  const body = await readJsonObject(request);
  const mobile = normalizeIndianMobile(body?.mobile);

  if (!mobile) {
    return NextResponse.json(
      { message: "Enter a valid 10-digit Indian mobile number." },
      { status: 400 }
    );
  }

  const existing = await prisma.studentAccount.findUnique({
    where: { mobile },
    select: { id: true },
  });
  if (existing) {
    return NextResponse.json(
      {
        message:
          "This mobile number already has a student profile. Please log in or reset your password.",
        existingAccount: true,
      },
      { status: 409 }
    );
  }

  const result = await createStudentOtp(mobile, "signup");
  if (!result.ok) {
    return NextResponse.json(
      {
        message: `Please wait ${result.retryAfter} seconds before requesting another code.`,
        retryAfter: result.retryAfter,
      },
      { status: 429 }
    );
  }

  const delivery = await sendStudentOtp(mobile, result.otp);
  if (!delivery.ok) {
    await prisma.studentOtp.update({
      where: { id: result.record.id },
      data: { used: true },
    });
    return NextResponse.json(
      { message: delivery.message },
      { status: 503 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "A 4-digit verification code has been sent.",
    resendAfter: OTP_RESEND_SECONDS,
  });
}
