import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import Navbar from "../components/navbar";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Trust Center | Alerts, Links and Advisories | ilmaLink",
  description:
    "Trust Center hub for student safety pages: Alert, Official Links and Official Advisories.",
  alternates: {
    canonical: "https://www.ilmalink.com/trust-center",
  },
};

const trustLinks = [
  {
    label: "Student Alert",
    href: "/alert",
    description: "Fraud-risk awareness and student safety checks.",
  },
  {
    label: "Official Links",
    href: "/official-links",
    description: "Verified brand domains and social profiles.",
  },
  {
    label: "Official Advisories",
    href: "/official-advisories",
    description: "NMC, MCC, NBEMS and state advisory references.",
  },
] as const;

export default function TrustCenterPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navbar />

      <section className="bg-[#061D3F] px-4 pb-12 pt-8 text-white sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
            Home - Trust Center
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-normal md:text-6xl">
            Trust Center
          </h1>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
            Find student-safety alerts, verified official links, organization details and
            important regulatory updates in one place.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 sm:grid-cols-2">
            {trustLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#00C896]/60 hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#047857]" />
                  <h2 className="text-xl font-extrabold text-slate-950">{item.label}</h2>
                </div>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#047857]">
                  Open page
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
