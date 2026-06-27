import type { NextRequest } from "next/server";

import { createNeetDiscussionDownloadToken } from "@/lib/neetDiscussionDownloadToken";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type OtpRecord = {
  name: string;
  whatsapp: string;
  otp: string;
  expiresAt: number;
  attempts: number;
};

type GlobalWithOtpStore = typeof globalThis & {
  __neet2026DiscussionOtpStore?: Map<string, OtpRecord>;
};

const globalForOtp = globalThis as GlobalWithOtpStore;
const otpStore =
  globalForOtp.__neet2026DiscussionOtpStore ??
  new Map<string, OtpRecord>();

globalForOtp.__neet2026DiscussionOtpStore = otpStore;

function normalizeWhatsApp(value: unknown) {
  if (typeof value !== "string") return "";

  const digits = value.replace(/\D/g, "");

  if (digits.length === 10) return "91" + digits;
  if (digits.length >= 11 && digits.length <= 15) return digits;

  return "";
}

function cleanName(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 80) : "";
}

function createOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function cleanupExpiredOtps() {
  const now = Date.now();

  for (const [key, record] of otpStore.entries()) {
    if (record.expiresAt < now) {
      otpStore.delete(key);
    }
  }
}

async function sendOwnerEmail(input: { subject: string; text: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to =
    process.env.NEET_DISCUSSION_LEAD_EMAIL ||
    process.env.CONTACT_TO_EMAIL ||
    process.env.RESEND_TO_EMAIL;

  if (!apiKey || !to) {
    return { configured: false };
  }

  const from =
    process.env.RESEND_FROM_EMAIL ||
    "ilmaLink NEET <onboarding@resend.dev>";

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from,
      to,
      subject: input.subject,
      text: input.text,
    });

    return { configured: true, sent: true };
  } catch (error) {
    console.error("NEET discussion lead email error:", error);

    return { configured: true, sent: false };
  }
}

async function sendOtpWebhook(input: {
  name: string;
  whatsapp: string;
  otp: string;
}) {
  const webhookUrl = process.env.NEET_DISCUSSION_OTP_WEBHOOK_URL;

  if (!webhookUrl) {
    return { configured: false };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.NEET_DISCUSSION_OTP_WEBHOOK_SECRET
          ? {
              Authorization:
                "Bearer " + process.env.NEET_DISCUSSION_OTP_WEBHOOK_SECRET,
            }
          : {}),
      },
      body: JSON.stringify({
        page: "NEET 2026 Discussions Centre",
        name: input.name,
        whatsapp: input.whatsapp,
        otp: input.otp,
      }),
    });

    return { configured: true, sent: response.ok };
  } catch (error) {
    console.error("NEET discussion OTP webhook error:", error);

    return { configured: true, sent: false };
  }
}

export async function POST(request: NextRequest) {
  cleanupExpiredOtps();

  try {
    const body = (await request.json()) as {
      action?: unknown;
      name?: unknown;
      whatsapp?: unknown;
      otp?: unknown;
    };
    const action = typeof body.action === "string" ? body.action : "";
    const name = cleanName(body.name);
    const whatsapp = normalizeWhatsApp(body.whatsapp);

    if (!name || !whatsapp) {
      return Response.json(
        { ok: false, message: "Enter a valid name and WhatsApp number." },
        { status: 400 }
      );
    }

    if (action === "request-otp") {
      const otp = createOtp();
      const record: OtpRecord = {
        name,
        whatsapp,
        otp,
        expiresAt: Date.now() + 10 * 60 * 1000,
        attempts: 0,
      };

      otpStore.set(whatsapp, record);

      const [ownerEmail, otpWebhook] = await Promise.all([
        sendOwnerEmail({
          subject: "NEET 2026 answer key download lead",
          text: [
            "New NEET 2026 Discussions Centre download request.",
            "Name: " + name,
            "WhatsApp: " + whatsapp,
            "OTP: " + otp,
          ].join("\n"),
        }),
        sendOtpWebhook({ name, whatsapp, otp }),
      ]);

      return Response.json({
        ok: true,
        expiresInSeconds: 600,
        ownerEmail,
        otpWebhook,
        otpDeliveryConfigured: otpWebhook.configured,
        previewOtp:
          process.env.NODE_ENV === "production" ? undefined : otp,
      });
    }

    if (action === "verify-otp") {
      const otp = typeof body.otp === "string" ? body.otp.trim() : "";
      const record = otpStore.get(whatsapp);

      if (!record || record.expiresAt < Date.now()) {
        otpStore.delete(whatsapp);

        return Response.json(
          { ok: false, message: "OTP expired. Request a fresh OTP." },
          { status: 400 }
        );
      }

      if (record.attempts >= 5) {
        otpStore.delete(whatsapp);

        return Response.json(
          { ok: false, message: "Too many attempts. Request a fresh OTP." },
          { status: 429 }
        );
      }

      if (record.otp !== otp) {
        record.attempts += 1;

        return Response.json(
          { ok: false, message: "Incorrect OTP." },
          { status: 400 }
        );
      }

      otpStore.delete(whatsapp);

      const token = createNeetDiscussionDownloadToken({
        name: record.name,
        whatsapp: record.whatsapp,
      });

      await sendOwnerEmail({
        subject: "NEET 2026 answer key lead verified",
        text: [
          "A NEET 2026 Discussions Centre lead verified OTP.",
          "Name: " + record.name,
          "WhatsApp: " + record.whatsapp,
        ].join("\n"),
      });

      return Response.json({
        ok: true,
        token,
        downloadUrl:
          "/api/neet-2026-discussion-download/?token=" +
          encodeURIComponent(token),
      });
    }

    return Response.json(
      { ok: false, message: "Unsupported action." },
      { status: 400 }
    );
  } catch (error) {
    console.error("NEET discussion lead API error:", error);

    return Response.json(
      { ok: false, message: "Unable to process this request." },
      { status: 500 }
    );
  }
}
