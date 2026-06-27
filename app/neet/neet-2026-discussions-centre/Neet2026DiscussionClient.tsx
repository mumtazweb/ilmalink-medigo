"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  Download,
  Filter,
  Lock,
  MessageCircle,
  Search,
  Send,
  ShieldCheck,
} from "lucide-react";

import type { Neet2026DiscussionQuestion } from "../../data/neet2026DiscussionCentre";

type SubjectFilter = "All" | Neet2026DiscussionQuestion["subject"];

type StudentComment = {
  name: string;
  text: string;
  createdAt: string;
};

type LeadResponse = {
  ok?: boolean;
  message?: string;
  previewOtp?: string;
  downloadUrl?: string;
  otpDeliveryConfigured?: boolean;
};

const SUBJECT_FILTERS: SubjectFilter[] = [
  "All",
  "Physics",
  "Chemistry",
  "Biology",
];

const COMMENTS_STORAGE_KEY = "neet-2026-discussion-comments";
const EXPERT_WHATSAPP = "919563910223";

function expertLink(message: string) {
  return (
    "https://wa.me/" + EXPERT_WHATSAPP + "?text=" + encodeURIComponent(message)
  );
}

function createdAtLabel(value: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "Just now";
  }
}

export default function Neet2026DiscussionClient({
  questions,
  pdfSizeLabel,
}: {
  questions: Neet2026DiscussionQuestion[];
  pdfSizeLabel: string;
}) {
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilter>("All");
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [openAnswers, setOpenAnswers] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, StudentComment[]>>(
    {}
  );
  const [commentDrafts, setCommentDrafts] = useState<
    Record<string, { name: string; text: string }>
  >({});
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadWhatsapp, setLeadWhatsapp] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [leadMessage, setLeadMessage] = useState("");
  const [leadError, setLeadError] = useState("");
  const [leadBusy, setLeadBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      try {
        const stored = window.localStorage.getItem(COMMENTS_STORAGE_KEY);

        if (stored) {
          setComments(JSON.parse(stored) as Record<string, StudentComment[]>);
        }
      } catch {
        setComments({});
      } finally {
        setCommentsLoaded(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!commentsLoaded) return;

    window.localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  }, [comments, commentsLoaded]);

  const filteredQuestions = useMemo(() => {
    const search = query.trim().toLowerCase();

    return questions.filter((question) => {
      if (subjectFilter !== "All" && question.subject !== subjectFilter) {
        return false;
      }

      if (!search) return true;

      const haystack = [
        String(question.id),
        question.subject,
        question.questionText,
        question.rawSourceText,
        question.answerLabel,
        question.answerOptionText ?? "",
        ...question.options.map((option) => option.text),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(search);
    });
  }, [query, questions, subjectFilter]);

  function toggleAnswer(questionId: number) {
    const key = String(questionId);

    setOpenAnswers((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function updateCommentDraft(
    questionId: number,
    patch: Partial<{ name: string; text: string }>
  ) {
    const key = String(questionId);

    setCommentDrafts((current) => ({
      ...current,
      [key]: {
        name: current[key]?.name ?? "",
        text: current[key]?.text ?? "",
        ...patch,
      },
    }));
  }

  function addComment(questionId: number) {
    const key = String(questionId);
    const draft = commentDrafts[key];
    const name = draft?.name.trim() || "NEET student";
    const text = draft?.text.trim();

    if (!text) return;

    setComments((current) => ({
      ...current,
      [key]: [
        {
          name,
          text,
          createdAt: new Date().toISOString(),
        },
        ...(current[key] ?? []),
      ].slice(0, 8),
    }));
    setCommentDrafts((current) => ({
      ...current,
      [key]: { name: draft?.name ?? "", text: "" },
    }));
  }

  async function requestOtp() {
    setLeadBusy(true);
    setLeadError("");
    setLeadMessage("");

    try {
      const response = await fetch("/api/neet-2026-discussion-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request-otp",
          name: leadName,
          whatsapp: leadWhatsapp,
        }),
      });
      const data = (await response.json()) as LeadResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to request OTP.");
      }

      setOtpRequested(true);

      if (data.previewOtp) {
        setOtp(data.previewOtp);
        setLeadMessage("Development OTP generated: " + data.previewOtp);
      } else if (data.otpDeliveryConfigured) {
        setLeadMessage("OTP sent. Enter it here to unlock the PDF.");
      } else {
        setLeadMessage(
          "Lead saved. OTP delivery provider is not configured yet; use the WhatsApp expert button for manual verification."
        );
      }
    } catch (error) {
      setLeadError(
        error instanceof Error ? error.message : "Unable to request OTP."
      );
    } finally {
      setLeadBusy(false);
    }
  }

  async function verifyOtp() {
    setLeadBusy(true);
    setLeadError("");
    setLeadMessage("");

    try {
      const response = await fetch("/api/neet-2026-discussion-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "verify-otp",
          name: leadName,
          whatsapp: leadWhatsapp,
          otp,
        }),
      });
      const data = (await response.json()) as LeadResponse;

      if (!response.ok || !data.ok || !data.downloadUrl) {
        throw new Error(data.message || "Unable to verify OTP.");
      }

      setDownloadUrl(data.downloadUrl);
      setLeadMessage("Verified. The protected PDF download is unlocked.");
    } catch (error) {
      setLeadError(
        error instanceof Error ? error.message : "Unable to verify OTP."
      );
    } finally {
      setLeadBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section
        aria-label="NEET 2026 question search"
        className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      >
        <form
          className="grid gap-3 lg:grid-cols-[1fr_auto]"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="relative block">
            <span className="sr-only">Search NEET 2026 questions</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search question keywords, answer text, subject or question number"
              className="h-12 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </label>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#061D3F] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#0B3B5D]"
          >
            <Search className="h-4 w-4" />
            Search Questions
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {SUBJECT_FILTERS.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() => setSubjectFilter(subject)}
                className={[
                  "inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-xs font-black transition",
                  subjectFilter === subject
                    ? "border-[#0F766E] bg-emerald-50 text-[#065F46]"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300",
                ].join(" ")}
              >
                <Filter className="h-3.5 w-3.5" />
                {subject}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAllAnswers((current) => !current)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-xs font-black text-[#065F46] transition hover:bg-emerald-100"
          >
            <BookOpenCheck className="h-4 w-4" />
            {showAllAnswers ? "Hide Source Answers" : "Read All Answers"}
          </button>
        </div>

        <p className="mt-4 text-sm font-semibold text-slate-600">
          Showing {filteredQuestions.length} of {questions.length} crawlable
          NEET 2026 questions.
        </p>
      </section>

      <section
        aria-label="NEET 2026 questions and answers"
        className="mt-6 grid gap-4"
      >
        {filteredQuestions.map((question) => {
          const key = String(question.id);
          const answerOpen = showAllAnswers || Boolean(openAnswers[key]);
          const questionComments = comments[key] ?? [];
          const draft = commentDrafts[key] ?? { name: "", text: "" };

          return (
            <article
              key={question.id}
              id={question.slug}
              className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0F766E]">
                    {question.subject} - Question {question.id}
                  </p>
                  <h2 className="mt-2 text-xl font-black leading-tight text-[#061D3F] sm:text-2xl">
                    NEET 2026 {question.subject} Question {question.id}
                  </h2>
                </div>
                <span className="inline-flex w-fit items-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-700">
                  PDF page {question.sourcePage}
                </span>
              </header>

              <p className="mt-4 whitespace-pre-wrap text-sm font-semibold leading-7 text-slate-800">
                {question.questionText}
              </p>

              {question.options.length > 0 ? (
                <ol className="mt-4 grid gap-2 sm:grid-cols-2">
                  {question.options.map((option) => (
                    <li
                      key={option.number}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold leading-6 text-slate-800"
                    >
                      <span className="font-black text-[#061D3F]">
                        Option {option.number}:
                      </span>{" "}
                      {option.text}
                    </li>
                  ))}
                </ol>
              ) : null}

              <div className="mt-4 border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#047857]">
                  Answer key
                </p>
                <p className="mt-1 text-sm font-black leading-6 text-[#064E3B]">
                  {question.answerLabel}
                </p>
                {question.answerOptionText ? (
                  <p className="mt-1 text-sm font-semibold leading-6 text-[#065F46]">
                    Answer option text: {question.answerOptionText}
                  </p>
                ) : null}
              </div>

              {answerOpen ? (
                <div
                  id={question.slug + "-answer"}
                  className="mt-4 border-t border-slate-200 pt-4"
                >
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                    Source extraction
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {question.answerSourceText || question.rawSourceText}
                  </p>
                </div>
              ) : null}

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => toggleAnswer(question.id)}
                  aria-controls={question.slug + "-answer"}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-black text-slate-800 transition hover:border-[#0F766E] hover:text-[#065F46]"
                >
                  <BookOpenCheck className="h-4 w-4" />
                  {answerOpen ? "Hide Answer Source" : "Read Answer"}
                </button>
                <a
                  href={expertLink(
                    "Please explain NEET 2026 Question " +
                      question.id +
                      " from " +
                      question.subject +
                      ". PDF page " +
                      question.sourcePage +
                      "."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-3 text-xs font-black text-white transition hover:bg-[#115E59]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Request Explanation
                </a>
                <a
                  href="#download-answer-key"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 text-xs font-black text-amber-900 transition hover:bg-amber-100"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
              </div>

              <details className="mt-4 border-t border-slate-200 pt-4">
                <summary className="cursor-pointer text-sm font-black text-[#061D3F]">
                  Student comments ({questionComments.length})
                </summary>
                <div className="mt-4 grid gap-3">
                  <div className="grid gap-2 sm:grid-cols-[0.7fr_1fr_auto]">
                    <input
                      value={draft.name}
                      onChange={(event) =>
                        updateCommentDraft(question.id, {
                          name: event.target.value,
                        })
                      }
                      placeholder="Name"
                      className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0F766E] focus:bg-white"
                    />
                    <input
                      value={draft.text}
                      onChange={(event) =>
                        updateCommentDraft(question.id, {
                          text: event.target.value,
                        })
                      }
                      placeholder="Add your doubt or observation"
                      className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-[#0F766E] focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => addComment(question.id)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#061D3F] px-4 text-xs font-black text-white transition hover:bg-[#0B3B5D]"
                    >
                      <Send className="h-4 w-4" />
                      Comment
                    </button>
                  </div>

                  {questionComments.length > 0 ? (
                    <div className="grid gap-2">
                      {questionComments.map((comment, index) => (
                        <div
                          key={comment.createdAt + index}
                          className="border-l-4 border-slate-200 bg-slate-50 px-3 py-2"
                        >
                          <p className="text-xs font-black text-slate-500">
                            {comment.name} - {createdAtLabel(comment.createdAt)}
                          </p>
                          <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">
                            {comment.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </details>
            </article>
          );
        })}
      </section>

      <section
        id="download-answer-key"
        className="mt-8 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#047857]">
              <Lock className="h-4 w-4" />
              Protected download
            </div>
            <h2 className="mt-4 text-2xl font-black text-[#061D3F]">
              Download the complete NEET 2026 answer key PDF
            </h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">
              File size: {pdfSizeLabel}. Unlock requires name, WhatsApp number
              and OTP verification. Verified lead details can be sent to the
              configured ilmaLink email.
            </p>
            <a
              href={expertLink(
                "I want access to the NEET 2026 Discussions Centre answer key PDF."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#0F766E] px-4 text-sm font-black text-[#065F46] transition hover:bg-emerald-50"
            >
              <MessageCircle className="h-4 w-4" />
              Connect NEET Expert
            </a>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Name
                <input
                  value={leadName}
                  onChange={(event) => setLeadName(event.target.value)}
                  className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold normal-case tracking-normal text-slate-950 outline-none focus:border-[#0F766E] focus:bg-white"
                />
              </label>
              <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                WhatsApp Number
                <input
                  value={leadWhatsapp}
                  onChange={(event) => setLeadWhatsapp(event.target.value)}
                  inputMode="tel"
                  className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold normal-case tracking-normal text-slate-950 outline-none focus:border-[#0F766E] focus:bg-white"
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <label className="grid gap-1 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                OTP
                <input
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  inputMode="numeric"
                  className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold normal-case tracking-normal text-slate-950 outline-none focus:border-[#0F766E] focus:bg-white"
                />
              </label>
              <div className="grid grid-cols-2 gap-2 self-end sm:flex">
                <button
                  type="button"
                  onClick={requestOtp}
                  disabled={leadBusy}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-black text-slate-800 transition hover:border-[#0F766E] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Request OTP
                </button>
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={leadBusy || !otpRequested}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#061D3F] px-3 text-xs font-black text-white transition hover:bg-[#0B3B5D] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Verify
                </button>
              </div>
            </div>

            {leadError ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                {leadError}
              </p>
            ) : null}
            {leadMessage ? (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-[#065F46]">
                {leadMessage}
              </p>
            ) : null}

            {downloadUrl ? (
              <a
                href={downloadUrl}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0F766E] px-5 text-sm font-black text-white transition hover:bg-[#115E59]"
              >
                <Download className="h-5 w-5" />
                Download Answer Key PDF
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
