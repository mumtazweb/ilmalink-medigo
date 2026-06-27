import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";

import PortalPublicHeader from "../../components/portal/PortalPublicHeader";
import { PortalForgotPasswordForm } from "../../components/portal/PortalResetForms";

export const metadata: Metadata = {
  title: "Student Forgot Password | ilmaLink",
  description: "Request a student portal password reset code by mobile or email.",
  robots: { index: false, follow: true },
};

export default function PortalForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-[#F5F9FD] text-[#082A62]">
      <PortalPublicHeader />
      <section className="mx-auto flex min-h-[calc(100vh-68px)] max-w-md items-center px-4 py-10">
        <div className="w-full rounded-[26px] border border-[#D5E3EF] bg-white p-5 shadow-[0_24px_65px_rgba(8,42,98,.10)] sm:p-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1769E8]">
            <KeyRound className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-[-.03em]">
            Forgot Password?
          </h1>
          <p className="mt-2 text-sm font-medium leading-6 text-[#60738F]">
            Use your registered mobile number for SMS reset, or registered
            email for email reset.
          </p>
          <div className="mt-6">
            <PortalForgotPasswordForm />
          </div>
          <Link
            href="/portal/login?tab=student"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-black text-[#0B4AA2]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Student Login
          </Link>
        </div>
      </section>
    </main>
  );
}
