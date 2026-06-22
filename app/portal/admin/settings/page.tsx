import type { Metadata } from "next";
import { CheckCircle2, CircleAlert, Database, KeyRound, Mail, MessageSquareText } from "lucide-react";

import { requirePortalStaff } from "../../../lib/portal/session";

export const metadata: Metadata = {
  title: "Education Portal Settings | ILMALINK MEDIGO",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const staff = await requirePortalStaff(["super_admin", "education_admin"]);
  const settings = [
    { label: "Database", configured: Boolean(process.env.DATABASE_URL), icon: Database },
    { label: "Portal session secret", configured: Boolean(process.env.PORTAL_SESSION_SECRET || process.env.AUTH_SECRET), icon: KeyRound },
    { label: "Email provider", configured: Boolean((process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) || process.env.RESEND_API_KEY), icon: Mail },
    { label: "SMS provider", configured: Boolean(process.env.SMS_PROVIDER && process.env.SMS_API_KEY), icon: MessageSquareText },
  ];

  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2">
        {settings.map((setting) => (
          <article
            key={setting.label}
            className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]"
          >
            <setting.icon className="h-6 w-6 text-[#1769E8]" />
            <h2 className="mt-3 font-black text-[#082A62]">{setting.label}</h2>
            <p className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-black ${
              setting.configured ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"
            }`}>
              {setting.configured ? <CheckCircle2 className="h-3.5 w-3.5" /> : <CircleAlert className="h-3.5 w-3.5" />}
              {setting.configured ? "Configured" : "Configuration required"}
            </p>
          </article>
        ))}
      </section>
      <section className="rounded-2xl border border-[#D8E4EF] bg-white p-5">
        <h2 className="text-lg font-black text-[#082A62]">Security note</h2>
        <p className="mt-2 text-sm font-medium leading-6 text-[#60738F]">
          Signed in as {staff.email}. Secret values are never displayed in this
          dashboard. Add or rotate them only in Vercel and the local environment.
        </p>
      </section>
    </div>
  );
}
