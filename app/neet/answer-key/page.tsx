import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileQuestion,
  Rows3,
  Search,
  ShieldAlert,
} from "lucide-react";

import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/navbar";
import {
  NeetBottomCta,
  NeetDownloadCard,
  NeetPageFrame,
  NeetSubpageHero,
} from "../../components/neet/NeetSubpageUi";
import { buildBreadcrumbSchema } from "../../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Re-NEET 2026 NTA Provisional Answer Key - Codes 50, 60, 70 & 80",
  description:
    "Download the official NTA provisional answer key PDF for Re-NEET UG 2026 Paper Codes 50, 60, 70 and 80, download the Code 50 questions-with-answer-key PDF, and read the code-wise answer table online.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet/answer-key/",
  },
};

export default function NeetAnswerKeyPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "NEET Hub", url: "/neet" },
            { name: "Answer Key", url: "/neet/answer-key" },
          ]),
        ]}
      />

      <main className="overflow-x-hidden">
        <Navbar />

        <NeetSubpageHero
          compact
          breadcrumb={[
            { label: "NEET Hub", href: "/neet" },
            { label: "Answer Key" },
          ]}
          title={
            <>
              Re-NEET 2026{" "}
              <span className="text-[#009C95]">NTA Provisional</span> Answer
              Key
            </>
          }
          subtitle="Download the official NTA provisional answer key PDF, download the Code 50 questions-with-answer-key PDF, or read the code-wise online table for Re-NEET UG 2026 Paper Codes 50, 60, 70 and 80."
        />

        <NeetPageFrame>
          <div className="relative z-10 -mt-9 space-y-5 sm:-mt-10 sm:space-y-7">
            <section id="downloads" className="scroll-mt-24 space-y-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[.14em] text-[#1769E8]">
                  Official PDF + questions PDF + online code table
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#082A62]">
                  Download or read the answer key
                </h2>
                <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-[#526985]">
                  PDF download requires a verified free student profile. The
                  online code-wise answer table is available as normal browser
                  text for quick checking.
                </p>
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                <NeetDownloadCard
                  resource="codes-50-60-70-80"
                  title="Download NTA Provisional Official Answer Key PDF"
                  description="Official NTA provisional answer key PDF for Re-NEET UG 2026 Paper Codes 50, 60, 70 and 80."
                  actionLabel="Download PDF"
                />

                <NeetDownloadCard
                  resource="questions-answer-key-code-50"
                  title="Download Questions with Answer Key - Code 50"
                  description="Question-and-answer PDF for Re-NEET UG 2026 with Code 50 answer references, explanations and analysis."
                  actionLabel="Download PDF"
                />
              </div>

              <Link
                href="/neet/re-neet-2026-answer-key-codes"
                className="group grid gap-3 rounded-2xl border border-[#9BDCC3] bg-[linear-gradient(110deg,#F6FCFA,#ECF9F5)] p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)] sm:grid-cols-[auto_1fr_auto] sm:items-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#08A776] shadow-sm">
                  <Rows3 className="h-6 w-6" />
                </span>

                <span>
                  <strong className="block text-base text-[#082A62]">
                    Read Code-wise Answer Key Online
                  </strong>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-[#526985]">
                    View all 180 answer rows for Codes 50, 60, 70 and 80,
                    including Drop entries and multiple accepted options.
                  </span>
                </span>

                <ArrowRight className="h-5 w-5 text-[#087B59] transition group-hover:translate-x-1" />
              </Link>
            </section>

            <section className="rounded-2xl border border-[#E8D69F] bg-[#FFF9EA] p-4 shadow-[0_7px_18px_rgba(8,42,98,.04)]">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-[#C78613]" />
                <div>
                  <h2 className="font-black text-[#6E5319]">
                    Source and verification note
                  </h2>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#755F2A]">
                    This page is based on the NTA Provisional Answer Key for
                    Re-NEET UG 2026. Since it is provisional, students should
                    also check the latest official NTA notice before making any
                    final calculation or objection decision.
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <ResourceLink
                href="/neet/questions"
                icon={Search}
                title="Search Questions"
                text="Find question text, options and answer references."
              />
              <ResourceLink
                href="/neet/re-neet-2026-questions"
                icon={FileQuestion}
                title="Complete Question Index"
                text="Browse all 180 question pages by subject."
              />
              <ResourceLink
                href="/neet/re-neet-2026-answer-key-codes"
                icon={Rows3}
                title="Code-wise Answer Tables"
                text="Read all 180 answers for Codes 50, 60, 70 and 80."
              />
              <ResourceLink
                href="/neet/discussion-centre"
                icon={BookOpenCheck}
                title="Analysis & Discussion"
                text="Open subject analysis and moderated topics."
              />
            </section>

            <section className="rounded-2xl border border-[#BFE5D9] bg-white p-4 shadow-[0_8px_22px_rgba(8,42,98,.06)] sm:p-5">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[#08A776]" />
                <h2 className="text-lg font-black text-[#082A62]">
                  What is included
                </h2>
              </div>

              <ul className="mt-3 grid gap-2 text-sm font-semibold leading-6 text-[#405779] sm:grid-cols-2">
                <li>Official NTA provisional answer key PDF download</li>
                <li>Questions with Answer Key - Code 50 PDF download</li>
                <li>Code 50, 60, 70 and 80 online answer tables</li>
                <li>Drop entries and multiple accepted options</li>
              </ul>
            </section>

            <NeetBottomCta />
          </div>
        </NeetPageFrame>
      </main>
    </>
  );
}

function ResourceLink({
  href,
  icon: Icon,
  title,
  text,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-32 flex-col rounded-2xl border border-[#D7E3EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)]"
    >
      <Icon className="h-6 w-6 text-[#1769E8]" />
      <h2 className="mt-3 text-sm font-black text-[#082A62]">{title}</h2>
      <p className="mt-1 text-xs font-medium leading-5 text-[#60738F]">
        {text}
      </p>
      <ArrowRight className="mt-auto h-4 w-4 self-end text-[#0B4AA2] transition group-hover:translate-x-1" />
    </Link>
  );
}


