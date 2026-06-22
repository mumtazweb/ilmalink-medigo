import type { Metadata } from "next";
import { LockKeyhole, ShieldCheck } from "lucide-react";

import PortalLoginForm from "../../components/portal/PortalLoginForm";
import PortalPublicHeader from "../../components/portal/PortalPublicHeader";
import { normalizePortalReturnPath } from "../../lib/portal/validation";

export const metadata: Metadata = {
  title: "Education Portal Login | ILMALINK MEDIGO",
  description:
    "Student, education admin, counsellor and management login for the separate ILMALINK MEDIGO Education Portal.",
  alternates: { canonical: "https://www.ilmalink.com/portal/login" },
  robots: { index: true, follow: true },
};

export default async function PortalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; next?: string }>;
}) {
  const { tab, next } = await searchParams;
  const initialTab = tab === "staff" ? "staff" : "student";
  const nextPath = normalizePortalReturnPath(next);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_18%_18%,rgba(23,105,232,.10),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(0,168,143,.10),transparent_30%),#F5F9FD] text-[#082A62]">
      <PortalPublicHeader />
      <section className="mx-auto grid min-h-[calc(100vh-68px)] max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8">
        <div className="hidden lg:block">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#BFD8F3] bg-white px-3 py-1.5 text-xs font-black text-[#0B4AA2]">
            <ShieldCheck className="h-4 w-4 text-[#08A776]" />
            Separate from Blog Publishing Login
          </span>
          <h2 className="mt-5 text-5xl font-black leading-[1.05] tracking-[-.04em] text-[#082A62]">
            Your education journey,{" "}
            <span className="text-[#009C95]">securely organised.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-[#46617F]">
            Students access only their own profile. Staff access is enabled
            separately by education portal role.
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#D4E3EF] bg-white/80 p-4">
            <LockKeyhole className="h-7 w-7 text-[#1769E8]" />
            <p className="text-sm font-semibold leading-6 text-[#46617F]">
              Passwords are stored as secure hashes. Regular student login
              does not require OTP after signup.
            </p>
          </div>
        </div>
        <div className="rounded-[26px] border border-[#D5E3EF] bg-white p-5 shadow-[0_24px_65px_rgba(8,42,98,.12)] sm:p-7">
          <h1 className="text-3xl font-black tracking-[-.03em] text-[#082A62] lg:text-2xl">
            Education Portal Login
          </h1>
          <p className="mt-2 text-sm font-medium leading-6 text-[#60738F]">
            Choose the correct access type below.
          </p>
          <div className="mt-5">
            <PortalLoginForm initialTab={initialTab} nextPath={nextPath} />
          </div>
        </div>
      </section>
    </main>
  );
}
