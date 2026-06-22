import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, RotateCw } from "lucide-react";
import { redirect } from "next/navigation";

import PortalPublicHeader from "../../components/portal/PortalPublicHeader";
import { PortalResetPasswordForm } from "../../components/portal/PortalResetForms";
import { normalizeIndianMobile } from "../../lib/portal/validation";

export const metadata: Metadata = {
  title: "Reset Student Password | ILMALINK MEDIGO",
  description: "Reset an ILMALINK MEDIGO student portal password.",
  robots: { index: false, follow: false },
};

export default async function PortalResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{
    mobile?: string;
    destination?: string;
    method?: string;
  }>;
}) {
  const params = await searchParams;
  const mobile = normalizeIndianMobile(params.mobile);
  if (!mobile) redirect("/portal/forgot-password");

  return (
    <main className="min-h-screen bg-[#F5F9FD] text-[#082A62]">
      <PortalPublicHeader />
      <section className="mx-auto flex min-h-[calc(100vh-68px)] max-w-md items-center px-4 py-10">
        <div className="w-full rounded-[26px] border border-[#D5E3EF] bg-white p-5 shadow-[0_24px_65px_rgba(8,42,98,.10)] sm:p-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1769E8]">
            <RotateCw className="h-6 w-6" />
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-[-.03em]">
            Reset Password
          </h1>
          <p className="mt-2 text-sm font-medium leading-6 text-[#60738F]">
            Enter the 4-digit code and create a new password.
          </p>
          <div className="mt-6">
            <PortalResetPasswordForm
              mobile={mobile}
              destination={params.destination ?? ""}
              method={params.method ?? ""}
            />
          </div>
          <Link
            href="/portal/forgot-password"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-black text-[#0B4AA2]"
          >
            <ArrowLeft className="h-4 w-4" />
            Request a new code
          </Link>
        </div>
      </section>
    </main>
  );
}
