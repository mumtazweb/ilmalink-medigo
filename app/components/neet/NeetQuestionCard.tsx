import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import type { NeetQuestion } from "../../data/neet2026Questions";

export default function NeetQuestionCard({
  question,
  compact = false,
}: {
  question: NeetQuestion;
  compact?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-[#D9E5F1] bg-white p-4 shadow-[0_8px_20px_rgba(8,42,98,.06)] transition hover:-translate-y-0.5 hover:border-[#A9CBEF] hover:shadow-[0_12px_26px_rgba(8,42,98,.10)]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-[#1769E8]">
            Question {question.questionNumber}
          </span>
          <span className="rounded-full bg-[#E7F8F2] px-2.5 py-1 text-[10px] font-black text-[#07875F]">
            {question.subject}
          </span>
        </div>
        <span className="text-[10px] font-bold text-[#60738F]">
          {question.difficulty}
        </span>
      </div>

      <h2
        className={`mt-3 font-black leading-6 text-[#082A62] ${
          compact ? "text-sm" : "text-base"
        }`}
      >
        {question.question}
      </h2>
      <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#536A88]">
        <BookOpen className="h-3.5 w-3.5 text-[#1769E8]" />
        {question.chapter} · {question.topic}
      </p>
      <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#F0FAF6] px-3 py-2.5">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#08A776]" />
        <p className="text-xs font-bold leading-5 text-[#17634F]">
  {question.correctOption ? `Answer: ${question.correctOption} · ` : ""}
  {question.correctAnswer}
</p>
      </div>
      <Link
        href={`/neet/questions/${question.slug}`}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-[#0B4AA2] hover:text-[#009C95]"
      >
        View Explanation
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
