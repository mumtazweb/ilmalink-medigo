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
  title: "Re-NEET 2026 Answer Key PDF - Codes 50, 60, 70 & 80",
  description:
    "Read the Re-NEET 2026 answer keys for paper Codes 50, 60, 70 and 80, and download the protected code-wise or question-and-answer PDFs.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet/answer-key",
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
              Re-NEET 2026 <span className="text-[#009C95]">Answer Key</span>{" "}
              Downloads
            </>
          }
          subtitle="Choose the earlier question-and-answer booklet or the complete code-wise answer-key tables for Paper Codes 50, 60, 70 and 80."
        />

        <NeetPageFrame>
          <div className="relative z-10 -mt-9 space-y-5 sm:-mt-10 sm:space-y-7">
            <section id="downloads" className="scroll-mt-24 space-y-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[.14em] text-[#1769E8]">
                  Two protected downloads
                </p>
                <h2 className="mt-1 text-2xl font-black text-[#082A62]">
                  Select the answer-key resource you need
                </h2>
                <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-[#526985]">
                  PDF downloads require a verified free student profile. The
                  extracted answer-key tables remain readable in the browser.
                </p>
              </div>

              <NeetDownloadCard
                title="Download Questions with Supplied Answers"
                description="Earlier Re-NEET 2026 booklet containing question text and supplied answer markers. The source does not identify a specific Paper Code."
                actionLabel="Download Questions PDF"
              />

              <NeetDownloadCard
                resource="codes-50-60-70-80"
                title="Download All Question Answer Keys - Codes 50, 60, 70 & 80"
                description="Complete answer-key tables for all four Re-NEET 2026 paper codes, covering Questions 1 to 180. B means Bonus."
                actionLabel="Download All Code Keys"
              />

              <Link
                href="/neet/re-neet-2026-answer-key-codes"
                className="group grid gap-3 rounded-2xl border border-[#9BDCC3] bg-[linear-gradient(110deg,#F6FCFA,#ECF9F5)] p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)] sm:grid-cols-[auto_1fr_auto] sm:items-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#08A776] shadow-sm">
                  <Rows3 className="h-6 w-6" />
                </span>
                <span>
                  <strong className="block text-base text-[#082A62]">
                    Read Codes 50, 60, 70 and 80 Answer Keys Online
                  </strong>
                  <span className="mt-1 block text-xs font-semibold leading-5 text-[#526985]">
                    All 180 answer rows are available as normal browser text,
                    including bonus and multiple-answer entries.
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
                    These are supplied student-reference resources and are not
                    presented as an official NTA answer key. The code-wise PDF
                    contains question numbers and answer keys only, not full
                    question text. Check the latest official notice separately.
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <ResourceLink
                href="/neet/questions"
                icon={Search}
                title="Search Questions"
                text="Find question text, options and supplied answers."
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
                <li>Earlier question-and-answer study booklet</li>
                <li>Code 50 answers for Questions 1-180</li>
                <li>Code 60 and Code 70 answers for Questions 1-180</li>
                <li>Code 80 answers, bonus entries and multiple answers</li>
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
