import type { LucideIcon } from "lucide-react";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  FileDown,
  FileQuestion,
  FlaskConical,
  Gauge,
  Hash,
  ImageIcon,
  MessageCircleMore,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "../../../components/JsonLd";
import Navbar from "../../../components/navbar";
import NeetQuestionCard from "../../../components/neet/NeetQuestionCard";
import {
  NeetDownloadCard,
  NeetPageFrame,
  NeetSubpageHero,
} from "../../../components/neet/NeetSubpageUi";
import {
  getNeetQuestionBySlug,
  getRelatedNeetQuestions,
  neet2026Questions,
} from "../../../data/neet2026Questions";
import { buildBreadcrumbSchema } from "../../../lib/schema";

export const dynamic = "force-static";
export const dynamicParams = false;

type QuestionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return neet2026Questions.map((question) => ({
    slug: question.slug,
  }));
}

export async function generateMetadata({
  params,
}: QuestionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const question = getNeetQuestionBySlug(slug);

  if (!question) {
    return {
      title: "NEET 2026 Question Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `NEET 2026 ${question.subject} Question ${question.questionNumber}`;
  const description = `${question.question.slice(0, 145)} Read the NTA provisional answer marker, source image and review note.`;
  const canonical = `https://www.ilmalink.com/neet/questions/${question.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    keywords: question.keywords,
    openGraph: {
      title: `${title} | ilmaLink`,
      description,
      url: canonical,
      type: "article",
      images: [
        {
          url: question.sourceImage,
          alt: `${title} source image`,
        },
      ],
    },
  };
}

export default async function NeetQuestionDetailPage({
  params,
}: QuestionPageProps) {
  const { slug } = await params;
  const question = getNeetQuestionBySlug(slug);

  if (!question) notFound();

  const title = `NEET 2026 ${question.subject} Question ${question.questionNumber}`;
  const relatedQuestions = getRelatedNeetQuestions(question);
  const canonical = `https://www.ilmalink.com/neet/questions/${question.slug}`;
  const questionSchema = {
    "@context": "https://schema.org",
    "@type": "Question",
    name: title,
    text: question.question,
    url: canonical,
    educationalLevel: "NEET UG",
    about: [question.subject, question.chapter, question.topic],
    keywords: question.keywords.join(", "),
    suggestedAnswer: question.options.map((option) => ({
      "@type": "Answer",
      text: `Option ${option.label}: ${option.text}`,
    })),
    acceptedAnswer:
      question.correctOption || question.isBonus
        ? {
            "@type": "Answer",
            text: `NTA provisional answer marker: ${question.correctAnswer}`,
          }
        : undefined,
  };

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "NEET Hub", url: "/neet" },
            { name: "Questions", url: "/neet/questions" },
            { name: title, url: `/neet/questions/${question.slug}` },
          ]),
          questionSchema,
        ]}
      />

      <main className="overflow-x-hidden">
        <Navbar />
        <NeetSubpageHero
          compact
          breadcrumb={[
            { label: "NEET Hub", href: "/neet" },
            { label: "Questions", href: "/neet/questions" },
            { label: `Question ${question.questionNumber}` },
          ]}
          title={
            <>
              NEET 2026 <span className="text-[#009C95]">{question.subject}</span>{" "}
              Question {question.questionNumber}
            </>
          }
          subtitle="Read the question, NTA provisional answer marker, source image and current academic review note."
        />

        <NeetPageFrame>
          <div className="relative z-10 -mt-9 space-y-5 sm:-mt-10 sm:space-y-7">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/neet/questions"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#BFD3E8] bg-white px-3 py-2 text-xs font-black text-[#0B4AA2] shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Question Search
              </Link>
              <Link
                href="/neet"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#BFD3E8] bg-white px-3 py-2 text-xs font-black text-[#0B4AA2] shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to NEET Hub
              </Link>
            </div>

            <article className="rounded-2xl border border-[#D7E3EF] bg-white p-4 shadow-[0_12px_30px_rgba(8,42,98,.08)] sm:p-6">
              <header>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#EAF3FF] px-3 py-1 text-[11px] font-black text-[#1769E8]">
                    Question {question.questionNumber}
                  </span>
                  <span className="rounded-full bg-[#E7F8F2] px-3 py-1 text-[11px] font-black text-[#07875F]">
                    {question.subject}
                  </span>
                  <span className="rounded-full bg-[#F2E9FF] px-3 py-1 text-[11px] font-black text-[#7134C8]">
                    Source page {question.sourcePage}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-.025em] text-[#082A62] sm:text-3xl">
                  {title}
                </h2>
              </header>

              <p className="mt-4 rounded-xl border border-[#C9DDF3] bg-[#F3F8FE] px-3 py-2 text-xs font-semibold leading-5 text-[#46617F]">
                The source image is the exact booklet reference. The text below
                is a searchable transcription and may need final formatting
                review for formulas or symbols.
              </p>

              <section className="mt-5" aria-labelledby="question-text-title">
                <h2
                  id="question-text-title"
                  className="text-sm font-black uppercase tracking-[.12em] text-[#1769E8]"
                >
                  Question
                </h2>
                <p className="mt-2 whitespace-pre-wrap text-base font-semibold leading-8 text-[#1E365D]">
                  {question.question}
                </p>
              </section>

              <section className="mt-5" aria-labelledby="question-options-title">
                <h2
                  id="question-options-title"
                  className="text-sm font-black uppercase tracking-[.12em] text-[#1769E8]"
                >
                  Options
                </h2>
                <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                  {question.options.map((option) => {
                    const acceptedOptions =
  question.correctOption && question.correctOption !== "Drop"
    ? question.correctOption.split(",").map((value) => value.trim())
    : [];

const isAnswer = acceptedOptions.includes(option.label);

                    return (
                      <li
                        key={option.label}
                        className={`rounded-xl border px-3 py-3 text-sm font-semibold leading-6 ${
                          isAnswer
                            ? "border-[#8ED5BD] bg-[#EFFAF6] text-[#17634F]"
                            : "border-[#DDE6EF] bg-[#F9FBFD] text-[#405779]"
                        }`}
                      >
                        <span
                          className={`mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-black ${
                            isAnswer
                              ? "bg-[#08A776] text-white"
                              : "bg-[#EAF0F6] text-[#17396E]"
                          }`}
                        >
                          {option.label}
                        </span>
                        {option.text}
                      </li>
                    );
                  })}
                </ol>
              </section>

              <section className="mt-5 rounded-2xl border border-[#A8DDCB] bg-[linear-gradient(110deg,#EFFAF6,#F7FCFA)] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#08A776]" />
                  <div>
                    <h2 className="font-black text-[#075F45]">
                      NTA provisional answer marker
                    </h2>
                    <p className="mt-1 text-sm font-bold leading-6 text-[#17634F]">
                      {question.correctAnswer}
                    </p>
                  </div>
                </div>
              </section>

              <section className="mt-5" aria-labelledby="explanation-title">
                <h2
                  id="explanation-title"
                  className="text-lg font-black text-[#082A62]"
                >
                  Explanation
                </h2>
                <p className="mt-2 rounded-xl border border-[#E5D8B3] bg-[#FFF9EA] px-4 py-3 text-sm font-semibold leading-6 text-[#755B1D]">
                  {question.explanation}
                </p>
              </section>
            </article>

            <section className="rounded-2xl border border-[#D7E3EF] bg-white p-4 shadow-[0_8px_22px_rgba(8,42,98,.06)] sm:p-5">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-[#1769E8]" />
                <h2 className="text-lg font-black text-[#082A62]">
                  Source question image
                </h2>
              </div>
              <p className="mt-1 text-xs font-semibold leading-5 text-[#60738F]">
                Use the source crop for formulas, diagrams and typography that
                may not be fully represented in the text transcription.
              </p>
              <div className="mt-4 grid gap-3">
                {question.sourceImages.map((sourceImage, index) => (
                  <div
                    key={sourceImage}
                    className="overflow-hidden rounded-xl border border-[#DCE5EF] bg-white"
                  >
                    <Image
                      src={sourceImage}
                      alt={`${title} source crop${
                        index > 0 ? ` continuation ${index}` : ""
                      }`}
                      width={760}
                      height={900}
                      sizes="(max-width: 768px) 100vw, 760px"
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <InfoCard icon={FlaskConical} label="Subject" value={question.subject} />
              <InfoCard icon={BookOpenCheck} label="Chapter" value={question.chapter} />
              <InfoCard icon={FileQuestion} label="Topic" value={question.topic} />
              <InfoCard icon={Gauge} label="Difficulty" value={question.difficulty} />
              <InfoCard icon={Hash} label="Question type" value={question.questionType} />
              <InfoCard icon={Tag} label="Year" value={String(question.year)} />
            </section>

            <section className="rounded-2xl border border-[#D7E3EF] bg-white p-4 shadow-[0_8px_22px_rgba(8,42,98,.06)]">
              <h2 className="text-lg font-black text-[#082A62]">Keywords</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {question.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-[#C9DDF3] bg-[#F3F8FE] px-3 py-1.5 text-xs font-bold text-[#174C8E]"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-semibold leading-5 text-[#60738F]">
                {question.reviewStatus}
              </p>
            </section>

            <NeetDownloadCard />

            <section aria-labelledby="related-questions-title">
              <div className="flex items-center justify-between gap-3">
                <h2
                  id="related-questions-title"
                  className="text-xl font-black text-[#082A62]"
                >
                  Related questions
                </h2>
                <Link
                  href={`/neet/questions?subject=${question.subject}`}
                  className="inline-flex items-center gap-1 text-xs font-black text-[#0B4AA2]"
                >
                  View subject questions
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                {relatedQuestions.map((relatedQuestion) => (
                  <NeetQuestionCard
                    key={relatedQuestion.slug}
                    question={relatedQuestion}
                    compact
                  />
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#D7E3EF] bg-white p-4 shadow-[0_8px_22px_rgba(8,42,98,.06)]">
              <h2 className="text-lg font-black text-[#082A62]">
                Related NEET links
              </h2>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <RelatedLink
                  href="/neet/discussion-centre"
                  label="Discussion Centre"
                  icon={MessageCircleMore}
                />
                <RelatedLink
                  href="/neet/answer-key"
                  label="Answer Key"
                  icon={FileDown}
                />
                <RelatedLink
                  href="/neet/questions?year=2026"
                  label="Previous Year Questions"
                  icon={FileQuestion}
                />
                <RelatedLink
                  href="/neet"
                  label="NEET Hub"
                  icon={BookOpenCheck}
                />
              </div>
            </section>
          </div>
        </NeetPageFrame>
      </main>
    </>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-[#D7E3EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.05)]">
      <Icon className="h-5 w-5 text-[#1769E8]" />
      <h3 className="mt-2 text-xs font-black uppercase tracking-[.12em] text-[#60738F]">
        {label}
      </h3>
      <p className="mt-1 text-sm font-black text-[#17396E]">{value}</p>
    </article>
  );
}

function RelatedLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl border border-[#DCE5EF] bg-[#F9FBFD] px-3 py-3 text-sm font-black text-[#17396E]"
    >
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#1769E8]" />
        {label}
      </span>
      <ArrowRight className="h-4 w-4 text-[#0B4AA2] transition group-hover:translate-x-1" />
    </Link>
  );
}
