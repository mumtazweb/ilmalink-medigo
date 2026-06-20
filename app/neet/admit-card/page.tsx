import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import Navbar from "../../components/navbar";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "NEET Admit Card | Official Access Path | ILMALINK MEDIGO",
  description:
    "Official NEET admit card access path with exam-city and candidate instruction links.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet/admit-card",
  },
};

export default function NeetAdmitCardPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1D4ED8]">
          Home - NEET - Admit Card
        </p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-normal text-slate-950 md:text-5xl">
          NEET Admit Card
        </h1>
        <p className="mt-4 text-base font-medium leading-7 text-slate-700">
          Use only official NEET pages for exam-city intimation, admit card download and
          exam-day instructions.
        </p>

        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <a
            href="https://neet.nta.nic.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#1D4ED8] hover:underline"
          >
            Open official NEET portal
            <ExternalLink className="h-4 w-4" />
          </a>
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
