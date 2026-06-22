import { randomInt } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import {
  buildCounsellingWhatsAppUrl,
  type CounsellingRequestDetails,
} from "../../lib/counsellingRequest";
import { prisma } from "../../lib/prisma";
import { sendCounsellingRequestAlert } from "../../lib/portal/email";
import {
  isTrustedPortalRequest,
  readJsonObject,
} from "../../lib/portal/request";
import {
  cleanOptionalText,
  cleanText,
  normalizeIndianMobile,
  parseStoredInterests,
} from "../../lib/portal/validation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const COURSES = new Set(["MBBS", "BDS", "Nursing", "AYUSH", "Other"]);
const PREFERENCES = new Set(["India", "Abroad"]);
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 6;

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

type GlobalWithCounsellingRateLimit = typeof globalThis & {
  __counsellingRequestRateLimit?: Map<string, RateLimitRecord>;
};

const globalForRateLimit = globalThis as GlobalWithCounsellingRateLimit;
const counsellingRateLimit =
  globalForRateLimit.__counsellingRequestRateLimit ??
  new Map<string, RateLimitRecord>();

globalForRateLimit.__counsellingRequestRateLimit = counsellingRateLimit;

export async function POST(request: NextRequest) {
  if (!isTrustedPortalRequest(request)) {
    return NextResponse.json(
      { message: "Invalid request origin." },
      { status: 403 }
    );
  }

  if (!consumeRateLimit(request)) {
    return NextResponse.json(
      {
        message:
          "Too many counselling requests were submitted. Please wait a few minutes and try again.",
      },
      { status: 429 }
    );
  }

  const body = await readJsonObject(request);
  if (!body) {
    return NextResponse.json(
      { message: "Invalid counselling request." },
      { status: 400 }
    );
  }

  const name = cleanText(body.name, 120);
  const mobile = normalizeIndianMobile(body.mobile);
  const course = cleanText(body.course, 40);
  const preference = cleanText(body.preference, 20);
  const location = cleanText(body.location, 120);
  const message = cleanOptionalText(body.message, 1200);
  const sourcePage = cleanOptionalText(body.sourcePage, 500);

  if (name.length < 2) {
    return NextResponse.json(
      { message: "Enter your full name." },
      { status: 400 }
    );
  }
  if (!mobile) {
    return NextResponse.json(
      { message: "Enter a valid 10-digit Indian mobile number." },
      { status: 400 }
    );
  }
  if (!COURSES.has(course)) {
    return NextResponse.json(
      { message: "Select the course you are interested in." },
      { status: 400 }
    );
  }
  if (!PREFERENCES.has(preference)) {
    return NextResponse.json(
      { message: "Select India or Abroad as your study preference." },
      { status: 400 }
    );
  }
  if (location.length < 2) {
    return NextResponse.json(
      {
        message:
          preference === "India"
            ? "Enter your preferred state."
            : "Enter your preferred country.",
      },
      { status: 400 }
    );
  }

  const submittedAt = new Date();
  const activityNote = formatActivityNote({
    name,
    mobile,
    course,
    preference,
    location,
    message,
    sourcePage,
  });

  try {
    const existing = await prisma.studentAccount.findUnique({
      where: { mobile },
    });
    const interest =
      preference === "India"
        ? "MBBS India Counselling"
        : "MBBS Abroad Counselling";

    const student = existing
      ? await prisma.studentAccount.update({
          where: { id: existing.id },
          data: {
            name,
            whatsappAvailable: "same",
            whatsappNumber: mobile,
            interests: JSON.stringify([
              ...new Set([...parseStoredInterests(existing.interests), interest]),
            ]),
            preferredCourse: course,
            ...(preference === "India"
              ? { state: location }
              : { preferredCountry: location }),
            activities: {
              create: {
                action: "counselling_request_submitted",
                note: activityNote,
                createdBy: "public-counselling-popup",
              },
            },
          },
        })
      : await prisma.studentAccount.create({
          data: {
            leadCode: await createLeadCode(),
            name,
            mobile,
            mobileVerified: false,
            whatsappAvailable: "same",
            whatsappNumber: mobile,
            interests: JSON.stringify([interest]),
            preferredCourse: course,
            state: preference === "India" ? location : null,
            preferredCountry: preference === "Abroad" ? location : null,
            status: "new",
            category: "Counselling Request",
            activities: {
              create: {
                action: "counselling_request_submitted",
                note: activityNote,
                createdBy: "public-counselling-popup",
              },
            },
          },
        });

    const savedRequest: CounsellingRequestDetails = {
      leadCode: student.leadCode,
      name,
      mobile,
      course,
      preference,
      location,
      message,
    };

    let emailAlertSent = true;
    try {
      await sendCounsellingRequestAlert({
        ...savedRequest,
        sourcePage,
        submittedAt,
      });
    } catch (error) {
      emailAlertSent = false;
      console.error(
        "[CounsellingRequestEmailError]",
        error instanceof Error ? error.message : "Mail provider error"
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Your counselling request has been saved.",
      leadCode: student.leadCode,
      whatsappUrl: buildCounsellingWhatsAppUrl(savedRequest),
      emailAlertSent,
    });
  } catch (error) {
    console.error("[CounsellingRequestSaveError]", error);
    return NextResponse.json(
      {
        message:
          "We could not save your request right now. Please try again in a moment.",
      },
      { status: 503 }
    );
  }
}

async function createLeadCode() {
  const year = new Date().getFullYear();

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = `ILM-${year}-${randomInt(100000, 1000000)}`;
    const exists = await prisma.studentAccount.findUnique({
      where: { leadCode: code },
      select: { id: true },
    });
    if (!exists) return code;
  }

  return `ILM-${year}-${Date.now().toString(36).toUpperCase()}`;
}

function formatActivityNote(input: {
  name: string;
  mobile: string;
  course: string;
  preference: string;
  location: string;
  message: string | null;
  sourcePage: string | null;
}) {
  return [
    "Counselling popup submission",
    `Name: ${input.name}`,
    `Mobile: ${input.mobile}`,
    `Course: ${input.course}`,
    `Study preference: ${input.preference}`,
    `${input.preference === "India" ? "Preferred state" : "Preferred country"}: ${input.location}`,
    `Message: ${input.message || "Not provided"}`,
    `Source page: ${input.sourcePage || "Not provided"}`,
  ].join("\n");
}

function consumeRateLimit(request: NextRequest) {
  const now = Date.now();
  const forwardedFor = request.headers.get("x-forwarded-for");
  const key =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip");

  if (!key) return true;

  for (const [storedKey, record] of counsellingRateLimit) {
    if (record.resetAt <= now) counsellingRateLimit.delete(storedKey);
  }

  const record = counsellingRateLimit.get(key);
  if (!record || record.resetAt <= now) {
    counsellingRateLimit.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  record.count += 1;
  return true;
}
