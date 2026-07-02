import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  ShieldAlert,
} from "lucide-react";

import Navbar from "../../components/navbar";
import {
  neet2026CurrentStatus,
  neet2026ExamDayDocuments,
  neet2026Helpline,
  neet2026OfficialLinks,
  neet2026PermittedItems,
  neet2026ProhibitedItems,
} from "../../data/neet2026";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "NEET UG 2026 Admit Card | Re-Exam Timing & Exam-Day Checklist",
  description:
    "Official NEET UG 2026 re-examination admit-card status, 21 June timing, reporting window, documents, dress code, permitted items and NTA links.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet/admit-card/",
  },
};

const examStats = [
  {
    icon: Clock3,
    label: "Exam window",
    value: neet2026CurrentStatus.examWindow,
  },
  {
    icon: Clock3,
    label: "Report from",
    value: neet2026CurrentStatus.reportingTime,
  },
  {
    icon: ShieldAlert,
    label: "Last entry",
    value: neet2026CurrentStatus.lastEntry,
  },
  {
    icon: FileCheck2,
    label: "Mode",
    value: neet2026CurrentStatus.mode,
  },
] as const;

export default function NeetAdmitCardPage() {
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
          <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#51E6B3]">
            Released 14 June 2026
          </p>
          <h1 className="mt-2 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">
            NEET UG 2026 Re-Examination Admit Card
          </h1>
          <p className="mt-4 max-w-4xl text-base font-medium leading-8 text-blue-100">
            Download the admit card only through the official NTA portal and
            follow the centre, reporting and candidate instructions printed on
            the latest copy.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={neet2026OfficialLinks.portal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#00B981] px-5 py-3 text-sm font-extrabold !text-white"
            >
              Open official candidate portal
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={neet2026OfficialLinks.admitCardNotice}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-extrabold !text-white"
            >
              Read admit-card notice
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
            <p className="text-sm font-semibold leading-7 text-amber-950">
              The current re-examination admit card may show a different centre
              from the original May examination. Verify the exact address from
              the admit card; NTA warns that map applications may show incorrect
              pins for some centres.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {examStats.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Icon className="h-6 w-6 text-[#047857]" />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                {label}
              </p>
              <p className="mt-1 text-lg font-black text-[#061D3F]">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-xl font-black text-[#061D3F]">
              Documents to carry
            </h2>
            <ul className="mt-4 grid gap-3">
              {neet2026ExamDayDocuments.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#00A878]" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="text-xl font-black text-emerald-950">
              Permitted under current advisory
            </h2>
            <ul className="mt-4 grid gap-3">
              {neet2026PermittedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-semibold leading-6 text-emerald-950"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-red-200 bg-red-50 p-5">
            <h2 className="text-xl font-black text-red-950">
              Do not carry
            </h2>
            <ul className="mt-4 grid gap-3">
              {neet2026ProhibitedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-semibold leading-6 text-red-950"
                >
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-700" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-black text-[#061D3F]">
            Dress and entry guidance
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              "Light clothing is preferred. Full sleeves or woollens may be worn if required, but report early for security checks.",
              "Slippers and low-heeled footwear are preferred. High-heeled footwear may receive additional checks.",
              "Candidates wearing customary or religious attire should report well in advance for frisking.",
              "Mandatory frisking and identity or biometric verification apply. A genuine biometric technical failure should be handled under NTA's exception protocol, not used to deny entry automatically.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-7 text-slate-700 shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-[#061D3F] p-5 text-white">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#51E6B3]">
              NTA helpdesk
            </p>
            <p className="mt-2 font-black">{neet2026Helpline.phone}</p>
            <a
              href={`mailto:${neet2026Helpline.email}`}
              className="mt-1 inline-block text-sm font-bold !text-blue-100 underline"
            >
              {neet2026Helpline.email}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}



