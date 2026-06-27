import "server-only";

function smsMessage(otp: string) {
  const domain =
    process.env.NEXT_PUBLIC_SITE_HOST?.trim() ||
    (process.env.NODE_ENV === "production" ? "www.ilmalink.com" : "");
  const base = `Your ilmaLink verification code is ${otp}.`;
  return domain ? `${base}\n\n@${domain} #${otp}` : base;
}

export async function sendStudentOtp(mobile: string, otp: string) {
  const provider = process.env.SMS_PROVIDER?.trim().toLowerCase();
  const apiKey = process.env.SMS_API_KEY?.trim();
  const senderId = process.env.SMS_SENDER_ID?.trim();
  const templateId = process.env.SMS_TEMPLATE_ID?.trim();

  if (!provider || !apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[DEV ONLY] ilmaLink student OTP for ${mobile}: ${otp}`);
      return { ok: true as const, development: true as const };
    }
    return {
      ok: false as const,
      message: "SMS delivery is not configured.",
    };
  }

  try {
    if (provider === "msg91") {
      const mobileDigits = mobile.replace(/\D/g, "");
      const response = await fetch(
        `https://control.msg91.com/api/v5/otp?template_id=${encodeURIComponent(
          templateId ?? ""
        )}&mobile=${encodeURIComponent(mobileDigits)}&otp=${otp}`,
        {
          method: "POST",
          headers: {
            authkey: apiKey,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`MSG91 returned ${response.status}`);
      }
      return { ok: true as const };
    }

    if (provider === "fast2sms") {
      const response = await fetch(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          method: "POST",
          headers: {
            authorization: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            route: templateId ? "dlt" : "q",
            sender_id: senderId,
            message: templateId || smsMessage(otp),
            variables_values: templateId ? otp : undefined,
            numbers: mobile.replace(/^\+91/, ""),
          }),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Fast2SMS returned ${response.status}`);
      }
      return { ok: true as const };
    }

    const customUrl = process.env.SMS_API_URL?.trim();
    if (provider === "custom" && customUrl) {
      const response = await fetch(customUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile,
          message: smsMessage(otp),
          senderId,
          templateId,
          otp,
        }),
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Custom SMS provider returned ${response.status}`);
      }
      return { ok: true as const };
    }

    return {
      ok: false as const,
      message: "Unsupported SMS provider.",
    };
  } catch (error) {
    console.error(
      "Student OTP SMS delivery failed:",
      error instanceof Error ? error.message : "Unknown provider error"
    );
    return {
      ok: false as const,
      message: "Unable to send the verification code right now.",
    };
  }
}
