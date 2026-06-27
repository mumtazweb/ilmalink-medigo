import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileQuestion,
  Rows3,
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
import {
  isSpecialCodeAnswer,
  RE_NEET_2026_PAPER_CODES,
  reNeet2026CodeAnswerRows,
  reNeet2026CodeAnswerSource,
} from "../../data/reNeet2026CodeAnswerKeys";
import { buildBreadcrumbSchema } from "../../lib/schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Re-NEET 2026 NTA Provisional Official Answer Key Codes 50, 60, 70 & 80",
  description:
    "Read the NTA provisional official Re-NEET 2026 answer-key table for Paper Codes 50, 60, 70 and 80, covering Questions 1 to 180 with Drop and multiple-answer entries.",
  alternates: {
    canonical:
      "https://www.ilmalink.com/neet/re-neet-2026-answer-key-codes",
  },
  keywords: [
    "Re-NEET 2026 Code 50 answer key",
    "Re-NEET 2026 Code 60 answer key",
    "Re-NEET 2026 Code 70 answer key",
    "Re-NEET 2026 Code 80 answer key",
    "NEET 2026 all paper code answer key",
    "NTA provisional official answer key",
  ],
  openGraph: {
    title: "NTA Provisional Official Answer Key | Re-NEET 2026 Codes 50, 60, 70 & 80",
    description:
      "Official provisional answer-key tables for Re-NEET 2026 Paper Codes 50, 60, 70 and 80 in browser-readable format.",
    url: "https://www.ilmalink.com/neet/re-neet-2026-answer-key-codes",
    type: "article",
  },
};

const specialAnswers = [
  { code: "50", text: "Question 26: Drop; Question 38: Options 2 and 3" },
  { code: "60", text: "Question 36: Options 1 and 4; Question 43: Drop" },
  { code: "70", text: "Question 22: Options 3 and 4; Question 40: Drop" },
  { code: "80", text: "Question 2: Drop; Question 5: Options 1 and 2" },
] as const;

const datasetSchema = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "NTA Provisional Official Re-NEET 2026 Answer Keys for Paper Codes 50, 60, 70 and 80",
  description:
    "NTA provisional official question-number and answer-key table for 180 questions across Re-NEET 2026 Paper Codes 50, 60, 70 and 80.",
  url: "https://www.ilmalink.com/neet/re-neet-2026-answer-key-codes/",
  creator: {
    "@type": "Organization",
    name: "ilmaLink",
    url: "https://www.ilmalink.com/",
  },
  temporalCoverage: "2026",
  inLanguage: "en-IN",
  variableMeasured: RE_NEET_2026_PAPER_CODES.map((code) => ({
    "@type": "PropertyValue",
    name: `Paper Code ${code} answer`,
    description: `NTA provisional official answer marker for Questions 1 to 180 in Paper Code ${code}.`,
  })),
  isAccessibleForFree: true,
};

export default function ReNeet2026CodeAnswerKeysPage() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "NEET Hub", url: "/neet" },
            { name: "Answer Key", url: "/neet/answer-key" },
            {
              name: "Codes 50, 60, 70 and 80",
              url: "/neet/re-neet-2026-answer-key-codes",
            },
          ]),
          datasetSchema,
        ]}
      />

      <main className="overflow-x-hidden">
        <Navbar />
        <NeetSubpageHero
          compact
          breadcrumb={[
            { label: "NEET Hub", href: "/neet" },
            { label: "Answer Key", href: "/neet/answer-key" },
            { label: "Codes 50, 60, 70 & 80" },
          ]}
          title={
            <>
              Re-NEET 2026{" "}
              <span className="text-[#009C95]">NTA Provisional Official Answer Key</span>
            </>
          }
          subtitle="Read the NTA provisional official answer entries for Paper Codes 50, 60, 70 and 80 directly in your browser."
        />

        <NeetPageFrame>
          <div className="relative z-10 -mt-9 space-y-5 sm:-mt-10 sm:space-y-7">
            <section className="grid grid-cols-2 gap-2 rounded-2xl border border-[#D8E4EF] bg-white p-3 shadow-[0_11px_26px_rgba(8,42,98,.09)] sm:grid-cols-4 sm:p-4">
              {RE_NEET_2026_PAPER_CODES.map((code) => (
                <a
                  key={code}
                  href={`#code-${code}`}
                  className="rounded-xl bg-[#F4F9FF] px-3 py-3 text-center transition hover:bg-[#EAF3FF]"
                >
                  <strong className="block text-xl font-black text-[#0B4AA2]">
                    Code {code}
                  </strong>
                  <span className="text-[11px] font-bold text-[#60738F]">
                    180 answers
                  </span>
                </a>
              ))}
            </section>

            <section className="rounded-2xl border border-[#E8D69F] bg-[#FFF9EA] p-4 shadow-[0_7px_18px_rgba(8,42,98,.04)]">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-[#C78613]" />
                <div>
                  <h2 className="font-black text-[#6E5319]">
                    What the NTA provisional official PDF contains
                  </h2>
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#755F2A]">
                    The NTA provisional official {reNeet2026CodeAnswerSource.pageCount}-page
                    PDF contains answer-key tables only. It provides question
                    numbers and answer markers for four paper codes, not the
                    full question text. “Drop” means the question is dropped;
                    multiple accepted answers are shown with comma-separated
                    options.
                  </p>
                </div>
              </div>
            </section>

            <NeetDownloadCard
              resource="codes-50-60-70-80"
              title="Download NTA Provisional Official Answer Key"
              description="Official provisional answer key PDF covering Paper Codes 50, 60, 70 and 80 in a single download."
              actionLabel="Download PDF"
            />

            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {specialAnswers.map((item) => (
                <article
                  key={item.code}
                  id={`code-${item.code}`}
                  className="scroll-mt-24 rounded-2xl border border-[#BFE5D9] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)]"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#08A776]" />
                    <h2 className="font-black text-[#082A62]">
                      Code {item.code}
                    </h2>
                  </div>
                  <p className="mt-2 text-xs font-semibold leading-5 text-[#526985]">
                    {item.text}
                  </p>
                </article>
              ))}
            </section>

            <section
              aria-labelledby="complete-answer-table-title"
              className="rounded-2xl border border-[#D8E4EF] bg-white p-3 shadow-[0_8px_22px_rgba(8,42,98,.06)] sm:p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1769E8]">
                  <Rows3 className="h-6 w-6" />
                </span>
                <div>
                  <h2
                    id="complete-answer-table-title"
                    className="text-xl font-black text-[#082A62]"
                  >
                    NTA Provisional Official Questions 1-180 Answer Table
                  </h2>
                  <p className="mt-1 text-xs font-semibold leading-5 text-[#60738F] sm:text-sm">
                    Compare the NTA provisional official answer marker for
                    the same question number across all four paper codes.
                  </p>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto rounded-xl border border-[#DCE5EF]">
                <table className="w-full min-w-[620px] border-collapse text-center text-xs sm:text-sm">
                  <caption className="sr-only">
                    NTA provisional official Re-NEET 2026 answer keys for Paper Codes 50, 60, 70 and 80
                  </caption>
                  <thead>
                    <tr className="bg-[#0B4AA2] text-white">
                      <th scope="col" className="px-3 py-3 font-black">
                        Question
                      </th>
                      {RE_NEET_2026_PAPER_CODES.map((code) => (
                        <th
                          key={code}
                          scope="col"
                          className="px-3 py-3 font-black"
                        >
                          Code {code}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reNeet2026CodeAnswerRows.map((row) => (
                      <tr
                        key={row.questionNumber}
                        id={`question-${row.questionNumber}`}
                        className="border-b border-[#E1E8F0] odd:bg-white even:bg-[#F5F8FC]"
                      >
                        <th
                          scope="row"
                          className="px-3 py-2.5 font-black text-[#17396E]"
                        >
                          {row.questionNumber}
                        </th>
                        {RE_NEET_2026_PAPER_CODES.map((code) => {
                          const answer = row.answers[code];
                          return (
                            <td
                              key={code}
                              className={`px-3 py-2.5 font-black ${
                                isSpecialCodeAnswer(answer)
                                  ? "bg-[#FFF4D8] text-[#9A6207]"
                                  : "text-[#31577F]"
                              }`}
                            >
                              {answer === "B" || answer === "Drop" ? "Drop" : answer}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/neet/re-neet-2026-questions"
                className="group flex items-center justify-between rounded-2xl border border-[#BFD7F4] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)]"
              >
                <span className="flex items-center gap-3">
                  <FileQuestion className="h-6 w-6 text-[#1769E8]" />
                  <span>
                    <strong className="block text-sm text-[#082A62]">
                      Read the Question Set
                    </strong>
                    <span className="text-xs font-medium text-[#60738F]">
                      Open the earlier question-and-answer pages
                    </span>
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 text-[#0B4AA2] transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/neet/discussion-centre"
                className="group flex items-center justify-between rounded-2xl border border-[#BFE5D9] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)]"
              >
                <span className="flex items-center gap-3">
                  <BookOpenCheck className="h-6 w-6 text-[#08A776]" />
                  <span>
                    <strong className="block text-sm text-[#082A62]">
                      Analysis & Discussion
                    </strong>
                    <span className="text-xs font-medium text-[#60738F]">
                      Search questions and review discussion topics
                    </span>
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 text-[#087B59] transition group-hover:translate-x-1" />
              </Link>
            </section>

            <NeetBottomCta />
          </div>
        </NeetPageFrame>
      </main>
    </>
  );
}
