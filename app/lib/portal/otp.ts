import "server-only";

import { randomInt } from "node:crypto";
import bcrypt from "bcryptjs";

import { prisma } from "../prisma";

export const OTP_LENGTH = Math.min(
  4,
  Math.max(4, Number.parseInt(process.env.OTP_LENGTH ?? "4", 10) || 4)
);
export const OTP_EXPIRY_MINUTES =
  Number.parseInt(process.env.OTP_EXPIRY_MINUTES ?? "5", 10) || 5;
export const OTP_RESEND_SECONDS =
  Number.parseInt(process.env.OTP_RESEND_SECONDS ?? "45", 10) || 45;
export const OTP_MAX_ATTEMPTS =
  Number.parseInt(process.env.OTP_MAX_ATTEMPTS ?? "3", 10) || 3;

export type StudentOtpPurpose = "signup" | "reset_password";

export function generateStudentOtp() {
  const minimum = 10 ** (OTP_LENGTH - 1);
  const maximum = 10 ** OTP_LENGTH;
  return randomInt(minimum, maximum).toString();
}

export async function createStudentOtp(
  mobile: string,
  purpose: StudentOtpPurpose
) {
  const latest = await prisma.studentOtp.findFirst({
    where: { mobile, purpose },
    orderBy: { createdAt: "desc" },
  });

  if (latest) {
    const elapsedSeconds = Math.floor(
      (Date.now() - latest.createdAt.getTime()) / 1000
    );
    if (elapsedSeconds < OTP_RESEND_SECONDS) {
      return {
        ok: false as const,
        retryAfter: OTP_RESEND_SECONDS - elapsedSeconds,
      };
    }
  }

  await prisma.studentOtp.updateMany({
    where: { mobile, purpose, used: false },
    data: { used: true },
  });

  const otp = generateStudentOtp();
  const otpHash = await bcrypt.hash(otp, 10);
  const record = await prisma.studentOtp.create({
    data: {
      mobile,
      purpose,
      otpHash,
      expiresAt: new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
      ),
    },
  });

  return { ok: true as const, otp, record };
}

export async function verifyStudentOtp(
  mobile: string,
  purpose: StudentOtpPurpose,
  otp: string
) {
  const record = await prisma.studentOtp.findFirst({
    where: { mobile, purpose, used: false },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return {
      ok: false as const,
      message: "Request a new verification code.",
    };
  }

  if (record.expiresAt < new Date()) {
    await prisma.studentOtp.update({
      where: { id: record.id },
      data: { used: true },
    });
    return { ok: false as const, message: "The verification code expired." };
  }

  if (record.attempts >= OTP_MAX_ATTEMPTS) {
    return {
      ok: false as const,
      message: "Maximum attempts reached. Request a new code.",
    };
  }

  const matches = await bcrypt.compare(otp, record.otpHash);
  if (!matches) {
    const attempts = record.attempts + 1;
    await prisma.studentOtp.update({
      where: { id: record.id },
      data: {
        attempts,
        used: attempts >= OTP_MAX_ATTEMPTS,
      },
    });
    return {
      ok: false as const,
      message:
        attempts >= OTP_MAX_ATTEMPTS
          ? "Maximum attempts reached. Request a new code."
          : `Incorrect code. ${OTP_MAX_ATTEMPTS - attempts} attempt(s) remaining.`,
    };
  }

  await prisma.studentOtp.update({
    where: { id: record.id },
    data: { used: true },
  });
  return { ok: true as const, record };
}
