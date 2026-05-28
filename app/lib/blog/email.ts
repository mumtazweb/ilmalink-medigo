import { Resend } from "resend";

export const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendOtpEmail(
  email: string,
  otp: string
) {
  try {
    await resend.emails.send({
      from:
        "ILMALINK MEDIGO <onboarding@resend.dev>",

      to: email,

      subject:
        "ILMALINK MEDIGO Password Reset OTP",

      html: `
        <div style="font-family:Arial,sans-serif;padding:24px;">
          <h2>Reset Your Password</h2>

          <p>
            Your OTP code is:
          </p>

          <div style="font-size:32px;font-weight:bold;letter-spacing:8px;margin:24px 0;color:#0F4CFF;">
            ${otp}
          </div>

          <p>
            This OTP expires in 10 minutes.
          </p>
        </div>
      `,
    });

    return {
        
      ok: true,
    };
  } catch (error) {
    console.log(
      "Send OTP email error:",
      error
    );

    return {
      ok: false,
    };
  }
}