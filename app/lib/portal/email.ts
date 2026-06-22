import "server-only";

import nodemailer from "nodemailer";
import { Resend } from "resend";

type MailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

function mailFrom() {
  return (
    process.env.MAIL_FROM?.trim() ||
    "ILMALINK MEDIGO <middya@ilmalink.com>"
  );
}

async function sendMail(message: MailMessage) {
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();

  if (smtpHost && smtpUser && smtpPass) {
    const port = Number.parseInt(process.env.SMTP_PORT ?? "465", 10);
    const secure =
      (process.env.SMTP_SECURE ?? "true").toLowerCase() === "true";
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure,
      auth: { user: smtpUser, pass: smtpPass },
    });
    await transporter.sendMail({ from: mailFrom(), ...message });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: mailFrom(),
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
    return;
  }

  throw new Error("No SMTP or Resend mail provider is configured.");
}

export async function sendStudentResetOtpEmail(
  email: string,
  otp: string
) {
  await sendMail({
    to: email,
    subject: "ILMALINK MEDIGO Student Password Reset Code",
    text: `Your ILMALINK MEDIGO password reset code is ${otp}. It expires in 5 minutes.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:24px;color:#082a62">
        <h2>Reset your student password</h2>
        <p>Your 4-digit verification code is:</p>
        <p style="font-size:32px;font-weight:800;letter-spacing:10px;color:#0b4aa2">${otp}</p>
        <p>This code expires in 5 minutes. Do not share it with anyone.</p>
      </div>
    `,
  });
}

type LeadAlertStudent = {
  leadCode: string;
  name: string | null;
  mobile: string;
  email: string | null;
  whatsappAvailable: string | null;
  whatsappNumber: string | null;
  interests: string | null;
  className: string | null;
  neetYear: string | null;
  state: string | null;
  city: string | null;
  district: string | null;
  category: string | null;
  neetScore: string | null;
  neetRank: string | null;
  preferredCourse: string | null;
  preferredCountry: string | null;
  createdAt: Date;
};

function escapeHtml(value: unknown) {
  return String(value ?? "Not provided")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendNewStudentAlert(student: LeadAlertStudent) {
  const to =
    process.env.LEAD_ALERT_TO?.trim() ||
    "injamulhoquemiddya@gmail.com";
  const fields = [
    ["Lead ID", student.leadCode],
    ["Name", student.name],
    ["Mobile", student.mobile],
    ["Email", student.email],
    [
      "WhatsApp",
      `${student.whatsappAvailable ?? "Not selected"}${
        student.whatsappNumber ? ` - ${student.whatsappNumber}` : ""
      }`,
    ],
    ["Interest", student.interests],
    ["Class / NEET Year", `${student.className ?? ""} ${student.neetYear ?? ""}`],
    ["State", student.state],
    ["City / District", `${student.city ?? ""} ${student.district ?? ""}`],
    ["You are", student.category],
    ["NEET Score", student.neetScore],
    ["NEET Rank", student.neetRank],
    ["Preferred Course", student.preferredCourse],
    ["Preferred Country", student.preferredCountry],
    ["Created", student.createdAt.toLocaleString("en-IN")],
  ] as const;
  const text = fields
    .map(([label, value]) => `${label}: ${value || "Not provided"}`)
    .join("\n");

  await sendMail({
    to,
    subject: "New Student Signup - ILMALINK MEDIGO",
    text: `${text}\nDashboard: https://www.ilmalink.com/portal/admin/leads`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;padding:24px;color:#082a62">
        <h2>New Student Signup - ILMALINK MEDIGO</h2>
        <table style="width:100%;border-collapse:collapse">
          ${fields
            .map(
              ([label, value]) =>
                `<tr><td style="padding:8px;border:1px solid #dbe7f3;font-weight:700">${escapeHtml(
                  label
                )}</td><td style="padding:8px;border:1px solid #dbe7f3">${escapeHtml(
                  value || "Not provided"
                )}</td></tr>`
            )
            .join("")}
        </table>
        <p style="margin-top:20px"><a href="https://www.ilmalink.com/portal/admin/leads">Open Education Portal Leads</a></p>
      </div>
    `,
  });
}
