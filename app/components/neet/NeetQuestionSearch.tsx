"use client";

import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

import {
  getNeetQuestionSearchText,
  normalizeNeetSearchText,
  type NeetQuestion,
  type NeetQuestionDifficulty,
  type NeetQuestionSubject,
} from "../../data/neet2026Questions";
import NeetQuestionCard from "./NeetQuestionCard";

type SubjectFilter = "All" | NeetQuestionSubject;
type DifficultyFilter = "All" | NeetQuestionDifficulty;
type NeetQuestionSearchProps = {
  questions: NeetQuestion[];
  variant?: "full" | "preview";
};

function getSubjectFilter(value: string | null): SubjectFilter {
  if (value === "Physics" || value === "Chemistry" || value === "Biology") {
    return value;
  }

  return "All";
}

export default function NeetQuestionSearch(props: NeetQuestionSearchProps) {
  return (
    <Suspense fallback={<NeetQuestionSearchFallback variant={props.variant} />}>
      <NeetQuestionSearchClient {...props} />
    </Suspense>
  );
}

function NeetQuestionSearchClient({
  questions,
  variant = "full",
}: NeetQuestionSearchProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams?.get("q") ?? "");
  const [subject, setSubject] = useState<SubjectFilter>(() =>
    getSubjectFilter(searchParams?.get("subject") ?? null)
  );
  const [chapter, setChapter] = useState("All");
  const [topic, setTopic] = useState("All");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const [year, setYear] = useState("All");
  const [questionType, setQuestionType] = useState("All");
  const [visibleCount, setVisibleCount] = useState(24);

  const chapters = useMemo(
    () => ["All", ...new Set(questions.map((question) => question.chapter))],
    [questions]
  );
  const topics = useMemo(
    () => ["All", ...new Set(questions.map((question) => question.topic))],
    [questions]
  );

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = normalizeNeetSearchText(query);

    return questions.filter((question) => {
      if (subject !== "All" && question.subject !== subject) return false;
      if (chapter !== "All" && question.chapter !== chapter) return false;
      if (topic !== "All" && question.topic !== topic) return false;
      if (difficulty !== "All" && question.difficulty !== difficulty) {
        return false;
      }
      if (year !== "All" && String(question.year) !== year) return false;
      if (
        questionType !== "All" &&
        question.questionType !== questionType
      ) {
        return false;
      }
      if (
        normalizedQuery &&
        !getNeetQuestionSearchText(question).includes(normalizedQuery)
      ) {
        return false;
      }

      return true;
    });
  }, [
    chapter,
    difficulty,
    query,
    questionType,
    questions,
    subject,
    topic,
    year,
  ]);

  const previewQuestions = filteredQuestions.slice(0, 3);
  const visibleQuestions = filteredQuestions.slice(0, visibleCount);
  const selectClass =
    "h-10 min-w-0 appearance-none rounded-xl border border-[#D5E1ED] bg-white pl-3 pr-8 text-xs font-bold text-[#17396E] outline-none focus:border-[#1769E8] focus:ring-4 focus:ring-blue-100";

  return (
    <section
      aria-label="Search NEET questions"
      className="rounded-2xl border border-[#C8DDF4] bg-[linear-gradient(120deg,#F8FCFF,#F1F8FF)] p-3 shadow-[0_9px_22px_rgba(8,42,98,.06)] sm:p-4"
    >
      {variant === "full" ? (
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1769E8]">
            <SlidersHorizontal className="h-4 w-4" />
          </span>
          <h2 className="text-lg font-black text-[#082A62]">
            Search and filter questions
          </h2>
        </div>
      ) : null}

      <form
        className="grid gap-2 sm:grid-cols-[1fr_auto]"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="relative block">
          <span className="sr-only">Search NEET questions</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8AA2BF]" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by question, keyword, topic or question ID…"
            className="h-12 w-full rounded-xl border border-[#C7D4E4] bg-white pl-11 pr-4 text-sm font-semibold text-[#082A62] shadow-inner outline-none focus:border-[#1769E8] focus:ring-4 focus:ring-blue-100"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(105deg,#0B4AA2,#07377E)] px-6 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(11,74,162,.22)]"
        >
          <Search className="h-4 w-4" />
          Search
        </button>
      </form>

      {variant === "preview" ? (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {(["Biology", "Physics", "Chemistry"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setSubject((current) => (current === item ? "All" : item))
              }
              className={`inline-flex h-10 items-center justify-center gap-1 rounded-xl border px-2 text-[11px] font-extrabold sm:text-xs ${
                subject === item
                  ? "border-[#1769E8] bg-[#EAF3FF] text-[#0B4AA2]"
                  : "border-[#D5E1ED] bg-white text-[#17396E]"
              }`}
            >
              {item}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          ))}
          <FilterSelect
            label="Difficulty"
            value={difficulty}
            onChange={(value) =>
              setDifficulty(value as DifficultyFilter)
            }
            options={["All", "Easy", "Moderate", "Tough", "Review Pending"]}
            className={selectClass}
          />
          <FilterSelect
            label="Year"
            value={year}
            onChange={setYear}
            options={["All", "2026"]}
            className={selectClass}
          />
          <FilterSelect
            label="Topic"
            value={topic}
            onChange={setTopic}
            options={topics}
            className={selectClass}
          />
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          <FilterSelect
            label="Subject"
            value={subject}
            onChange={(value) => setSubject(value as SubjectFilter)}
            options={["All", "Biology", "Physics", "Chemistry"]}
            className={selectClass}
          />
          <FilterSelect
            label="Chapter"
            value={chapter}
            onChange={setChapter}
            options={chapters}
            className={selectClass}
          />
          <FilterSelect
            label="Topic"
            value={topic}
            onChange={setTopic}
            options={topics}
            className={selectClass}
          />
          <FilterSelect
            label="Difficulty"
            value={difficulty}
            onChange={(value) =>
              setDifficulty(value as DifficultyFilter)
            }
            options={["All", "Easy", "Moderate", "Tough", "Review Pending"]}
            className={selectClass}
          />
          <FilterSelect
            label="Year"
            value={year}
            onChange={setYear}
            options={["All", "2026"]}
            className={selectClass}
          />
          <FilterSelect
            label="Question type"
            value={questionType}
            onChange={setQuestionType}
            options={["All", "Multiple Choice"]}
            className={selectClass}
          />
        </div>
      )}

      {variant === "preview" ? (
        query || subject !== "All" ? (
          <div className="mt-4 grid gap-3">
            <p className="text-xs font-bold text-[#536A88]">
              {filteredQuestions.length} matching questions
            </p>
            {previewQuestions.map((question) => (
              <NeetQuestionCard
                key={question.slug}
                question={question}
                compact
              />
            ))}
            {previewQuestions.length === 0 ? <EmptyResults /> : null}
          </div>
        ) : null
      ) : (
        <>
          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-[#536A88]">
              Showing {Math.min(visibleQuestions.length, filteredQuestions.length)}{" "}
              of {filteredQuestions.length} questions
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSubject("All");
                setChapter("All");
                setTopic("All");
                setDifficulty("All");
                setYear("All");
                setQuestionType("All");
                setVisibleCount(24);
              }}
              className="text-xs font-black text-[#0B4AA2]"
            >
              Clear filters
            </button>
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            {visibleQuestions.map((question) => (
              <NeetQuestionCard key={question.slug} question={question} />
            ))}
          </div>
          {visibleQuestions.length === 0 ? <EmptyResults /> : null}
          {visibleCount < filteredQuestions.length ? (
            <button
              type="button"
              onClick={() => setVisibleCount((current) => current + 24)}
              className="mx-auto mt-5 flex h-11 items-center justify-center rounded-xl border border-[#9FC2EA] bg-white px-6 text-sm font-black text-[#0B4AA2] shadow-sm hover:bg-[#F4F9FF]"
            >
              Show more questions
            </button>
          ) : null}
        </>
      )}
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className: string;
}) {
  return (
    <label className="relative min-w-0">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className={`${className} w-full`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "All" ? label : option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#0B4AA2]" />
    </label>
  );
}

function EmptyResults() {
  return (
    <div className="mt-4 rounded-xl border border-dashed border-[#BFCFE0] bg-white px-4 py-8 text-center">
      <p className="font-black text-[#082A62]">No matching questions found.</p>
      <p className="mt-1 text-sm font-medium text-[#60738F]">
        Try a shorter keyword or clear one of the filters.
      </p>
    </div>
  );
}

function NeetQuestionSearchFallback({
  variant = "full",
}: {
  variant?: "full" | "preview";
}) {
  return (
    <section
      aria-label="Search NEET questions"
      className="rounded-2xl border border-[#C8DDF4] bg-[linear-gradient(120deg,#F8FCFF,#F1F8FF)] p-3 shadow-[0_9px_22px_rgba(8,42,98,.06)] sm:p-4"
    >
      {variant === "full" ? (
        <div className="mb-3 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1769E8]">
            <SlidersHorizontal className="h-4 w-4" />
          </span>
          <h2 className="text-lg font-black text-[#082A62]">
            Search and filter questions
          </h2>
        </div>
      ) : null}
      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <div className="h-12 rounded-xl border border-[#C7D4E4] bg-white" />
        <div className="h-12 rounded-xl bg-[#0B4AA2] sm:w-28" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {Array.from({ length: variant === "preview" ? 6 : 6 }).map((_, index) => (
          <div
            key={index}
            className="h-10 rounded-xl border border-[#D5E1ED] bg-white"
          />
        ))}
      </div>
    </section>
  );
}
