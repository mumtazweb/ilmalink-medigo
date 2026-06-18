import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import Navbar from "../../components/navbar";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "NEET Counselling | MCC and State Paths | ILMALINK MEDIGO",
  description:
    "Official NEET counselling links for MCC and state counselling notices and schedules.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet/counselling",
  },
};

const links = [
  {
    label: "MCC UG current events",
    href: "https://mcc.nic.in/current-events-ug/",
  },
  {
    label: "MCC UG schedule",
    href: "https://mcc.nic.in/eservices-schedule-ug/",
  },
  {
    label: "West Bengal UG counselling notices",
    href: "https://wbmcc.nic.in/ug-medical-dental-notice-events/",
  },
] as const;

export default function NeetCounsellingPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1D4ED8]">
          Home - NEET - Counselling
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
          NEET Counselling
        </h1>
        <p className="mt-4 text-base font-medium leading-7 text-slate-700">
          Track official counselling notices, schedules and updates from MCC and state
          counselling portals.
        </p>

        <div className="mt-6 grid gap-3">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#1D4ED8] shadow-sm hover:border-[#1D4ED8]/40"
            >
              <span>{item.label}</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          ))}
        </div>

        <Link
          href="/neet"
          className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#047857] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to NEET hub
        </Link>
      </section>
    </main>
  );
}
