import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import Navbar from "../components/navbar";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "NEET Guidance Hub | Admit Card, Result, Counselling | ILMALINK MEDIGO",
  description:
    "Structured NEET hub for official Admit Card, Result and Counselling pathways with direct links for students.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet",
  },
};

const routes = [
  {
    title: "Admit Card",
    href: "/neet/admit-card",
    description: "Check official exam-city, admit card and candidate instructions.",
  },
  {
    title: "Result",
    href: "/neet/result",
    description: "Review official result, scorecard and rank verification sources.",
  },
  {
    title: "Counselling",
    href: "/neet/counselling",
    description: "Follow MCC and state counselling links with notices and schedules.",
  },
] as const;

export default function NeetHubPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navbar />

      <section className="bg-[#061D3F] px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
            Home - NEET
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-normal md:text-6xl">
            NEET Guidance Hub
          </h1>
          <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
            Use this hierarchy page to access official NEET admit card, result and
            counselling pathways from one clean route.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#00C896]/60 hover:shadow-md"
              >
                <h2 className="text-xl font-extrabold text-slate-950">{route.title}</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
                  {route.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-[#047857]">
                  Open page
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1D4ED8]">
              Official source
            </p>
            <a
              href="https://neet.nta.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm font-extrabold text-[#1D4ED8] hover:underline"
            >
              NEET NTA portal
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
