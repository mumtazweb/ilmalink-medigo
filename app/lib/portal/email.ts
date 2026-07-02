import "server-only";

import nodemailer from "nodemailer";
import { Resend } from "resend";

type MailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

function mailFrom(provider: "smtp" | "resend") {
  return (
    process.env.MAIL_FROM?.trim() ||
    (provider === "smtp"
      ? "ilmaLink <middya@ilmalink.com>"
      : "ilmaLink <onboarding@resend.dev>")
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
    await transporter.sendMail({ from: mailFrom("smtp"), ...message });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: mailFrom("resend"),
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
    subject: "ilmaLink Student Password Reset Code",
    text: `Your ilmaLink password reset code is ${otp}. It expires in 5 minutes.`,
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
    subject: "New Student Signup - ilmaLink",
    text: `${text}\nDashboard: https://www.ilmalink.com/portal/admin/leads/`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;padding:24px;color:#082a62">
        <h2>New Student Signup - ilmaLink</h2>
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
        <p style="margin-top:20px"><a href="https://www.ilmalink.com/portal/admin/leads/">Open Education Portal Leads</a></p>
      </div>
    `,
  });
}

type CounsellingRequestAlert = {
  leadCode: string;
  name: string;
  mobile: string;
  course: string;
  preference: string;
  location: string;
  message: string | null;
  sourcePage: string | null;
  submittedAt: Date;
};

export async function sendCounsellingRequestAlert(
  request: CounsellingRequestAlert
) {
  const to =
    process.env.LEAD_ALERT_TO?.trim() ||
    "injamulhoquemiddya@gmail.com";
  const fields = [
    ["Lead ID", request.leadCode],
    ["Name", request.name],
    ["Mobile / WhatsApp", request.mobile],
    ["Course", request.course],
    ["Study Preference", request.preference],
    [
      request.preference === "India"
        ? "Preferred State"
        : "Preferred Country",
      request.location,
    ],
    ["Message", request.message],
    ["Source Page", request.sourcePage],
    ["Submitted", request.submittedAt.toLocaleString("en-IN")],
  ] as const;
  const text = fields
    .map(([label, value]) => `${label}: ${value || "Not provided"}`)
    .join("\n");

  await sendMail({
    to,
    subject: `New Counselling Request - ${request.name} - ${request.leadCode}`,
    text: `${text}\n\nOpen lead: https://www.ilmalink.com/portal/admin/leads/`,
    html: `
      <div style="background:#f3f8fc;padding:28px 12px;font-family:Arial,sans-serif;color:#17396e">
        <div style="max-width:700px;margin:auto;overflow:hidden;border:1px solid #d8e4ef;border-radius:18px;background:#ffffff;box-shadow:0 12px 32px rgba(8,42,98,.08)">
          <div style="padding:24px;background:linear-gradient(135deg,#087a60,#0b4aa2);color:#ffffff">
            <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">ilmaLink</p>
            <h2 style="margin:0;font-size:24px">New counselling request</h2>
            <p style="margin:8px 0 0;color:#dff7f0">The request was saved in the Education Portal before this alert was sent.</p>
          </div>
          <div style="padding:24px">
            <table style="width:100%;border-collapse:collapse">
              ${fields
                .map(
                  ([label, value]) =>
                    `<tr><td style="width:34%;padding:10px;border:1px solid #dbe7f3;background:#f7faff;font-weight:700">${escapeHtml(
                      label
                    )}</td><td style="padding:10px;border:1px solid #dbe7f3">${escapeHtml(
                      value || "Not provided"
                    )}</td></tr>`
                )
                .join("")}
            </table>
            <p style="margin:22px 0 0">
              <a href="https://www.ilmalink.com/portal/admin/leads/" style="display:inline-block;border-radius:10px;background:#0b4aa2;padding:12px 18px;color:#ffffff;font-weight:700;text-decoration:none">Open Education Portal Leads</a>
            </p>
          </div>
        </div>
      </div>
    `,
  });
}



