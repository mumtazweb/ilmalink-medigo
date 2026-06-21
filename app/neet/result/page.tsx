import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../../components/navbar";
import {
  neet2026OfficialLinks,
  neet2026QualifyingPercentiles,
  neet2026ResultProcess,
} from "../../data/neet2026";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "NEET UG 2026 Result | Answer Key, OMR, Rank & Qualifying Rules",
  description:
    "NEET UG 2026 result guide covering official result access, OMR and answer-key challenges, All India Rank and category-wise qualifying percentiles.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet/result",
  },
};

export default function NeetResultPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F4F7FB] text-slate-950">
      <Navbar />

      <section className="bg-[#061D3F] px-4 py-9 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/neet"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#7FF0CA]"
          >
            <ArrowLeft className="h-4 w-4" />
            NEET UG 2026 hub
          </Link>
          <GraduationCap className="mt-6 h-9 w-9 text-[#51E6B3]" />
          <h1 className="mt-3 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">
            NEET UG 2026 Result, OMR and Answer-Key Guide
          </h1>
          <p className="mt-4 max-w-4xl text-base font-medium leading-8 text-blue-100">
            The information bulletin did not assign a fixed result date.
            Monitor the official NTA portal and current public notices after
            completion of the re-examination process.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={neet2026OfficialLinks.portal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#00B981] px-5 py-3 text-sm font-extrabold !text-white"
            >
              Open official result portal
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={neet2026OfficialLinks.publicNotices}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-extrabold !text-white"
            >
              Check current notices
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#047857]">
              Bulletin process
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#061D3F]">
              What happens before result declaration
            </h2>
            <ol className="mt-5 grid gap-3">
              {neet2026ResultProcess.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-[#F4F7FB] p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#061D3F] text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold leading-6 text-slate-700">
                    {item}
                  </p>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0F4CFF]">
              Admission threshold
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#061D3F]">
              Qualifying percentiles
            </h2>
            <div className="mt-5 grid gap-3">
              {neet2026QualifyingPercentiles.map((item) => (
                <div
                  key={item.category}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <p className="text-sm font-bold text-slate-600">
                    {item.category}
                  </p>
                  <p className="mt-1 text-xl font-black text-[#0F4CFF]">
                    {item.percentile}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black text-[#061D3F]">
            Result-day verification checklist
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Use only the official NTA NEET website and your own candidate login.",
              "Verify the candidate name, roll number, application number, category and percentile details.",
              "Download and retain the scorecard and final answer key when released.",
              "Do not treat qualification as a seat guarantee; admission depends on counselling rank, category, domicile, seat matrix and round.",
              "For MCC seats, follow the official MCC schedule and registration instructions.",
              "For state quota and private seats, use the designated state counselling authority.",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-[#F8FAFC] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00A878]" />
                <p className="text-sm font-semibold leading-6 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <p className="text-sm font-semibold leading-6 text-amber-950">
              The bulletin states that there is no re-checking or re-evaluation
              of answer sheets after declaration. Use the notified OMR and
              provisional-answer-key challenge windows when they open.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
