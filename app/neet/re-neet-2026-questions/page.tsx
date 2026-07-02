import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Atom,
  Beaker,
  BookOpenCheck,
  CheckCircle2,
  Leaf,
  Search,
} from "lucide-react";

import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/navbar";
import {
  NeetBottomCta,
  NeetDownloadCard,
  NeetPageFrame,
  NeetSubpageHero,
} from "../../components/neet/NeetSubpageUi";
import {
  neet2026Questions,
  type NeetQuestionSubject,
} from "../../data/neet2026Questions";
import { buildBreadcrumbSchema } from "../../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Re-NEET 2026 Questions, Answers & Paper Review",
  description:
    "Browse all 180 supplied Re-NEET 2026 Physics, Chemistry and Biology questions with source images and answer markers.",
  alternates: {
    canonical: "https://www.ilmalink.com/neet/re-neet-2026-questions/",
  },
  keywords: [
    "Re-NEET 2026 questions",
    "Re-NEET 2026 answers",
    "NEET 2026 question paper PDF",
    "NEET 2026 Physics Chemistry Biology questions",
  ],
};

const subjectConfig = {
  Physics: {
    icon: Atom,
    tone: "bg-[#EAF3FF] text-[#087AF0]",
    border: "border-[#AED2F9]",
  },
  Chemistry: {
    icon: Beaker,
    tone: "bg-[#F2E9FF] text-[#8038E8]",
    border: "border-[#D8C1F7]",
  },
  Biology: {
    icon: Leaf,
    tone: "bg-[#E5F8EF] text-[#08A776]",
    border: "border-[#9BDCC3]",
  },
} as const;

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Re-NEET 2026 Questions",
  numberOfItems: neet2026Questions.length,
  itemListElement: neet2026Questions.map((question, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Question",
      name: `NEET 2026 ${question.subject} Question ${question.questionNumber}`,
      url: `https://www.ilmalink.com/neet/questions/${question.slug}/`,
      text: question.question,
    },
  })),
};

export default function ReNeet2026QuestionsPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "NEET Hub", url: "/neet" },
            {
              name: "Re-NEET 2026 Questions",
              url: "/neet/re-neet-2026-questions",
            },
          ]),
          itemListSchema,
        ]}
      />

      <main className="overflow-x-hidden">
        <Navbar />
        <NeetSubpageHero
          compact
          breadcrumb={[
            { label: "NEET Hub", href: "/neet" },
            { label: "Re-NEET 2026 Questions" },
          ]}
          title={
            <>
              Re-NEET 2026{" "}
              <span className="text-[#009C95]">Questions & Answers</span>
            </>
          }
          subtitle="Browse the complete supplied Physics, Chemistry and Biology question set with answer markers and source images."
        />

        <NeetPageFrame>
          <div className="relative z-10 -mt-9 space-y-5 sm:-mt-10 sm:space-y-7">
            <section className="grid grid-cols-2 gap-2 rounded-2xl border border-[#D8E4EF] bg-white p-3 shadow-[0_11px_26px_rgba(8,42,98,.09)] sm:grid-cols-4 sm:p-4">
              <Stat value="180" label="Questions" />
              <Stat value="45" label="Physics" />
              <Stat value="45" label="Chemistry" />
              <Stat value="90" label="Biology" />
            </section>

            <section className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/neet/questions"
                className="group flex items-center justify-between rounded-2xl border border-[#BFD7F4] bg-[linear-gradient(110deg,#F8FCFF,#EFF7FF)] p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1769E8]">
                    <Search className="h-5 w-5" />
                  </span>
                  <span>
                    <strong className="block text-sm text-[#082A62]">
                      Search Questions
                    </strong>
                    <span className="text-xs font-medium text-[#60738F]">
                      Search text, options and answers
                    </span>
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 text-[#0B4AA2] transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/neet/discussion-centre"
                className="group flex items-center justify-between rounded-2xl border border-[#BFE5D9] bg-[linear-gradient(110deg,#F7FCFA,#EFFAF6)] p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5F8EF] text-[#08A776]">
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
                <ArrowRight className="h-5 w-5 text-[#087B59] transition group-hover:translate-x-1" />
              </Link>
            </section>

            <NeetDownloadCard />

            {(
              ["Physics", "Chemistry", "Biology"] as NeetQuestionSubject[]
            ).map((subject) => {
              const config = subjectConfig[subject];
              const questions = neet2026Questions.filter(
                (question) => question.subject === subject
              );

              return (
                <section
                  key={subject}
                  aria-labelledby={`${subject.toLowerCase()}-questions-title`}
                  className={`rounded-2xl border bg-white p-4 shadow-[0_8px_22px_rgba(8,42,98,.06)] sm:p-5 ${config.border}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${config.tone}`}
                      >
                        <config.icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h2
                          id={`${subject.toLowerCase()}-questions-title`}
                          className="text-xl font-black text-[#082A62]"
                        >
                          {subject} Questions
                        </h2>
                        <p className="text-xs font-semibold text-[#60738F]">
                          {questions.length} source-linked questions
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-[#08A776]" />
                  </div>
                  <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12">
                    {questions.map((question) => (
                      <Link
                        key={question.slug}
                        href={`/neet/questions/${question.slug}`}
                        title={`NEET 2026 ${subject} Question ${question.questionNumber}`}
                        className="flex min-h-12 flex-col items-center justify-center rounded-xl border border-[#DCE5EF] bg-[#F9FBFD] px-1 py-2 text-center transition hover:border-[#8EB9E8] hover:bg-[#F0F7FF]"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wide text-[#60738F]">
                          Q
                        </span>
                        <span className="text-sm font-black text-[#17396E]">
                          {question.questionNumber}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}

            <NeetBottomCta />
          </div>
        </NeetPageFrame>
      </main>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-[#F5F9FE] px-3 py-3 text-center">
      <strong className="block text-2xl font-black text-[#0B4AA2]">
        {value}
      </strong>
      <span className="text-[11px] font-bold text-[#60738F]">{label}</span>
    </div>
  );
}



