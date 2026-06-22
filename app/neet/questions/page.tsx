import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, FileText, Search } from "lucide-react";

import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/navbar";
import NeetQuestionSearch from "../../components/neet/NeetQuestionSearch";
import {
  NeetBottomCta,
  NeetDownloadCard,
  NeetPageFrame,
  NeetSubpageHero,
} from "../../components/neet/NeetSubpageUi";
import { neet2026Questions } from "../../data/neet2026Questions";
import { buildBreadcrumbSchema } from "../../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Search NEET 2026 Questions with Answers & Source Images",
  description:
    "Search NEET 2026 questions by subject, question text, option text, answer marker, topic, keyword or question number.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet/questions",
  },
  keywords: [
    "search NEET 2026 questions",
    "NEET 2026 question answers",
    "Re-NEET 2026 Physics questions",
    "Re-NEET 2026 Chemistry questions",
    "Re-NEET 2026 Biology questions",
  ],
  openGraph: {
    title: "Search NEET 2026 Questions | ILMALINK MEDIGO",
    description:
      "Search the supplied NEET 2026 question set with answer markers, source images and individual question pages.",
    url: "https://www.ilmalink.com/neet/questions",
    type: "website",
  },
};

const questionListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "NEET 2026 questions",
  numberOfItems: neet2026Questions.length,
  itemListElement: neet2026Questions.map((question, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `https://www.ilmalink.com/neet/questions/${question.slug}/`,
    name: `NEET 2026 ${question.subject} Question ${question.questionNumber}`,
  })),
};

export default function NeetQuestionsPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "NEET Hub", url: "/neet" },
            { name: "Search Questions", url: "/neet/questions" },
          ]),
          questionListSchema,
        ]}
      />

      <main className="overflow-x-hidden">
        <Navbar />
        <NeetSubpageHero
          compact
          breadcrumb={[
            { label: "NEET Hub", href: "/neet" },
            { label: "Search Questions" },
          ]}
          title={
            <>
              Search <span className="text-[#009C95]">NEET 2026</span>{" "}
              Questions
            </>
          }
          subtitle="Search topic-wise, subject-wise and keyword-wise NEET questions with answers and explanations."
        />

        <NeetPageFrame>
          <div className="relative z-10 -mt-9 space-y-5 sm:-mt-10 sm:space-y-7">
            <section className="grid gap-3 rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_11px_26px_rgba(8,42,98,.09)] sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1769E8]">
                  <Search className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-black text-[#082A62]">
                    {neet2026Questions.length} NEET 2026 questions available
                  </h2>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#5A708E] sm:text-sm">
                    Search question text, option text, supplied answers,
                    subject, review fields, keywords, number and year. Source
                    images remain the exact reference for formulas and symbols.
                  </p>
                </div>
              </div>
              <Link
                href="/neet/re-neet-2026-questions"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#A9CBEF] bg-[#F4F9FF] px-4 py-2.5 text-xs font-black text-[#0B4AA2]"
              >
                <FileText className="h-4 w-4" />
                Browse complete index
              </Link>
            </section>

            <NeetQuestionSearch questions={neet2026Questions} />

            <NeetDownloadCard />

            <section className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/neet/discussion-centre"
                className="group flex items-center justify-between rounded-2xl border border-[#D9E5F1] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F8F2] text-[#08A776]">
                    <BookOpenCheck className="h-5 w-5" />
                  </span>
                  <span>
                    <strong className="block text-sm text-[#082A62]">
                      Analysis & Discussion
                    </strong>
                    <span className="text-xs font-medium text-[#60738F]">
                      Subject review and discussion topics
                    </span>
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 text-[#0B4AA2] transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/neet/answer-key"
                className="group flex items-center justify-between rounded-2xl border border-[#D9E5F1] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2E9FF] text-[#8038E8]">
                    <FileText className="h-5 w-5" />
                  </span>
                  <span>
                    <strong className="block text-sm text-[#082A62]">
                      Answer Key
                    </strong>
                    <span className="text-xs font-medium text-[#60738F]">
                      Download and source guidance
                    </span>
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 text-[#0B4AA2] transition group-hover:translate-x-1" />
              </Link>
            </section>

            <NeetBottomCta />
          </div>
        </NeetPageFrame>
      </main>
    </>
  );
}
