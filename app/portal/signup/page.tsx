import type { Metadata } from "next";
import {
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";
import Link from "next/link";

import PortalPublicHeader from "../../components/portal/PortalPublicHeader";
import PortalSignupForm from "../../components/portal/PortalSignupForm";
import { normalizePortalReturnPath } from "../../lib/portal/validation";

export const metadata: Metadata = {
  title: "Create Your Free Student Profile | ILMALINK MEDIGO",
  description:
    "Create a verified ILMALINK MEDIGO student profile for NEET, MBBS India, MBBS Abroad and scholarship guidance.",
  alternates: { canonical: "https://www.ilmalink.com/portal/signup" },
  robots: { index: true, follow: true },
};

const trustItems = [
  { label: "4-digit SMS OTP", icon: KeyRound },
  { label: "No Google login", icon: CheckCircle2 },
  { label: "Password login after signup", icon: LockKeyhole },
  { label: "Free counselling profile", icon: UserRoundPlus },
  { label: "Secure student dashboard", icon: ShieldCheck },
] as const;

export default async function PortalSignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = normalizePortalReturnPath(params.next);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_12%_12%,rgba(23,105,232,.09),transparent_28%),radial-gradient(circle_at_90%_30%,rgba(0,168,143,.10),transparent_30%),#F5F9FD] text-[#082A62]">
      <PortalPublicHeader />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-start lg:px-8 lg:py-12">
        <div className="lg:sticky lg:top-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#BFD8F3] bg-white px-3 py-1.5 text-xs font-black text-[#0B4AA2] shadow-sm">
            <ShieldCheck className="h-4 w-4 text-[#08A776]" />
            ILMALINK MEDIGO Education Portal
          </span>
          <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-[-.04em] text-[#082A62] sm:text-5xl">
            Create Your Free{" "}
            <span className="text-[#009C95]">Student Profile</span>
          </h1>
          <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-[#46617F]">
            Get NEET, MBBS India, MBBS Abroad and scholarship guidance with
            one verified student profile.
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2.5 rounded-xl border border-white bg-white/80 px-3 py-2.5 text-xs font-bold text-[#31577F] shadow-[0_6px_16px_rgba(8,42,98,.05)]"
              >
                <item.icon className="h-4 w-4 shrink-0 text-[#08A776]" />
                {item.label}
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm font-semibold text-[#60738F]">
            Already registered?{" "}
            <Link
              href={
                nextPath
                  ? `/portal/login?tab=student&next=${encodeURIComponent(nextPath)}`
                  : "/portal/login"
              }
              className="font-black text-[#0B4AA2]"
            >
              Student Login
            </Link>
          </p>
        </div>

        <div className="rounded-[26px] border border-[#D5E3EF] bg-white p-4 shadow-[0_24px_65px_rgba(8,42,98,.12)] sm:p-6">
          <PortalSignupForm nextPath={nextPath} />
        </div>
      </section>
    </main>
  );
}
