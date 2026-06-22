"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  AlertTriangle,
  Calculator,
  Calendar,
  Globe,
  MessageCircle,
  TrendingUp,
  X,
} from "lucide-react";
import {
  predictNeetRankRangeFromMarks,
  type NeetRankPrediction,
} from "@/lib/neetRankPredictor";

type NeetRankPredictorToolProps = {
  isOpen: boolean;
  onClose: () => void;
  onBookCounselling: () => void;
};

const countrySuggestions = [
  { label: "Kyrgyzstan", href: "/mbbs-abroad/kyrgyzstan" },
  { label: "Georgia", href: "/mbbs-abroad/georgia" },
  { label: "Bangladesh", href: "/mbbs-abroad/bangladesh" },
  { label: "Russia", href: "/mbbs-abroad/russia" },
];

const rankFormatter = new Intl.NumberFormat("en-IN");

function formatEstimatedAir(prediction: NeetRankPrediction | null) {
  if (!prediction) return "--";

  return `AIR ${rankFormatter.format(prediction.estimatedRank)}`;
}

function getQualificationBadgeClasses(
  status: NeetRankPrediction["qualificationStatus"] | undefined
) {
  if (status === "likely-qualified") {
    return "border-[#00C896]/25 bg-[#ECFDF7] text-[#064E3B]";
  }

  if (status === "borderline") {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  if (status === "not-qualified") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-slate-200 bg-slate-50 text-[#081B35]";
}

function getBulletItems(text: string) {
  return text
    .split(". ")
    .map((item, index, items) => {
      const trimmedItem = item.trim();

      if (!trimmedItem) return "";

      return index < items.length - 1 && !/[.!?]$/.test(trimmedItem)
        ? `${trimmedItem}.`
        : trimmedItem;
    })
    .filter(Boolean);
}

export default function NeetRankPredictorTool({
  isOpen,
  onClose,
  onBookCounselling,
}: NeetRankPredictorToolProps) {
  const [scoreValue, setScoreValue] = useState("500");

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const hasScoreInput = scoreValue.trim().length > 0;

  const parsedScore = useMemo(() => {
    if (!scoreValue.trim()) return null;

    const numericScore = Number(scoreValue);
    return Number.isFinite(numericScore) ? numericScore : null;
  }, [scoreValue]);

  const validationError = useMemo(() => {
    if (!hasScoreInput) return "";

    if (parsedScore === null) {
      return "Enter a valid NEET score between -10 and 720.";
    }

    if (parsedScore < -10 || parsedScore > 720) {
      return "Enter a NEET score between -10 and 720.";
    }

    return "";
  }, [hasScoreInput, parsedScore]);

  const prediction = useMemo(() => {
    if (!hasScoreInput || parsedScore === null || validationError) return null;

    return predictNeetRankRangeFromMarks(parsedScore);
  }, [hasScoreInput, parsedScore, validationError]);

  const sliderScore = Math.min(720, Math.max(-10, parsedScore ?? 500));
  const estimateLabel = formatEstimatedAir(prediction);
  const rankRangeLabel = prediction?.rankZoneLabel ?? "--";
  const showCountryOptions =
    prediction?.qualificationStatus !== "not-qualified";
  const showQualificationStatus = Boolean(prediction && prediction.marks < 160);
  const admissionChanceText =
    prediction?.admissionChanceSummary ??
    "Enter your NEET score to see the likely admission chance summary.";
  const suggestedNextStepText =
    prediction?.suggestedNextStep ??
    "Enter your NEET score to see your likely admission pathway.";
  const admissionChanceBullets = useMemo(
    () => getBulletItems(admissionChanceText),
    [admissionChanceText]
  );

  if (!isOpen) return null;

  const portalRoot =
    typeof document === "undefined"
      ? null
      : document.getElementById("modal-root") ?? document.body;

  if (!portalRoot) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes neetToolEnter {
          from {
            opacity: 0;
            transform: perspective(1100px) rotateX(8deg) translateY(28px) scale(0.96);
            filter: saturate(0.75) blur(8px);
          }
          to {
            opacity: 1;
            transform: perspective(1100px) rotateX(0deg) translateY(0) scale(1);
            filter: saturate(1) blur(0);
          }
        }

        @keyframes neetResultLift {
          from {
            opacity: 0;
            transform: perspective(900px) rotateX(7deg) translateY(18px);
          }
          to {
            opacity: 1;
            transform: perspective(900px) rotateX(0.8deg) translateY(0);
          }
        }

        @keyframes neetSheen {
          0% { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
          18% { opacity: 0.35; }
          54% { opacity: 0.15; }
          100% { transform: translateX(145%) skewX(-18deg); opacity: 0; }
        }

        @keyframes neetCursorBlink {
          0%, 42% { opacity: 1; }
          43%, 100% { opacity: 0; }
        }

        .neet-tool-shell {
          animation: neetToolEnter 460ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
          transform-style: preserve-3d;
        }

        .neet-stat-card {
          animation: neetResultLift 520ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
          transform-style: preserve-3d;
        }

        .neet-plan-window {
          animation: neetResultLift 620ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
          transform-style: preserve-3d;
        }

        .neet-plan-window::before {
          content: "";
          position: absolute;
          inset: -24% auto -24% -34%;
          width: 42%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.78), transparent);
          animation: neetSheen 3.8s ease-in-out 0.45s infinite;
          pointer-events: none;
        }

        .neet-type-cursor {
          animation: neetCursorBlink 720ms steps(1) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .neet-tool-shell,
          .neet-stat-card,
          .neet-plan-window,
          .neet-plan-window::before,
          .neet-type-cursor {
            animation: none;
          }
        }
      `}</style>
      <div
        className="fixed inset-0 isolate flex items-center justify-center overflow-y-auto bg-[#020817]/80 p-3 backdrop-blur-md sm:p-5"
        style={{
          zIndex: 2147483647,
          position: "fixed",
          inset: 0,
          isolation: "isolate",
        }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="neet-rank-predictor-title"
      >
      <div
        className="neet-tool-shell relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_110px_rgba(2,8,23,0.45)]"
        style={{ zIndex: 2147483647 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close NEET rank predictor"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/90 text-slate-700 shadow-lg transition hover:bg-red-50 hover:text-red-500"
        >
          <X size={18} />
        </button>

        <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative overflow-hidden bg-[#071F43] p-5 text-white sm:p-7">
            <div className="pointer-events-none absolute inset-0 opacity-25">
              <div className="absolute -left-12 top-10 h-40 w-40 rounded-full bg-[#00C896]/35 blur-3xl" />
              <div className="absolute bottom-10 right-0 h-48 w-48 rounded-full bg-[#33A6FF]/30 blur-3xl" />
            </div>

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#9EF5DC]">
                <Calculator size={14} />
                Instant tool
              </div>

              <h2
                id="neet-rank-predictor-title"
                className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
              >
                NEET Rank Predictor
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">
                Enter one score and see a hard-paper adjusted AIR, predicted
                rank range, and counselling direction instantly.
              </p>

              <div className="mt-7 rounded-2xl border border-white/12 bg-white/[0.08] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                  Hard-paper adjusted estimate
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  {estimateLabel}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#00C896]/15 px-3 py-1.5 text-xs font-semibold text-[#9EF5DC]">
                  <TrendingUp size={14} />
                  {rankRangeLabel}
                </div>
              </div>

              {showCountryOptions ? (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                    Popular MBBS abroad pages
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {countrySuggestions.map((country) => (
                      <Link
                        key={country.href}
                        href={country.href}
                        onClick={onClose}
                        className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:border-[#00C896]/60 hover:bg-[#00C896]/15"
                      >
                        {country.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-5 sm:p-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_42px_rgba(15,23,42,0.08)] sm:p-5">
              <label className="block">
                <span className="text-sm font-semibold text-[#081B35]">
                  NEET Score
                </span>
                <input
                  id="neet-rank-score-input"
                  name="neetRankScore"
                  type="number"
                  inputMode="numeric"
                  min={-10}
                  max={720}
                  value={scoreValue}
                  onChange={(event) => setScoreValue(event.target.value)}
                  placeholder="Enter score from -10 to 720"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-bold text-[#081B35] outline-none transition focus:border-[#00C896] focus:bg-white focus:ring-4 focus:ring-[#00C896]/15"
                />
              </label>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  <span>-10</span>
                  <span>720</span>
                </div>
                <input
                  id="neet-rank-score-range"
                  name="neetRankScoreRange"
                  type="range"
                  min={-10}
                  max={720}
                  value={sliderScore}
                  onChange={(event) => setScoreValue(event.target.value)}
                  className="h-2 w-full cursor-pointer accent-[#00C896]"
                />
              </div>

              {validationError ? (
                <div className="mt-4 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                  <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
                  {validationError}
                </div>
              ) : null}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div
                className="neet-stat-card min-w-0 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur transition duration-300 hover:-translate-y-0.5"
                style={{ animationDelay: "70ms" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  AIR
                </p>
                <p className="mt-2 truncate text-lg font-black text-[#081B35] sm:text-xl">
                  {estimateLabel}
                </p>
              </div>

              <div
                className="neet-stat-card min-w-0 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur transition duration-300 hover:-translate-y-0.5"
                style={{ animationDelay: "130ms" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Predicted rank range
                </p>
                <p className="mt-2 truncate text-lg font-black text-[#081B35] sm:text-xl">
                  {rankRangeLabel}
                </p>
              </div>
            </div>

            {showQualificationStatus ? (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <span
                  className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-extrabold ${getQualificationBadgeClasses(
                    prediction?.qualificationStatus
                  )}`}
                >
                  {prediction?.qualificationLabel}
                </span>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#334155]">
                  {prediction?.qualificationNote}
                </p>
              </div>
            ) : null}

            <div className="neet-plan-window relative mt-4 overflow-hidden rounded-2xl border border-[#00C896]/20 bg-[linear-gradient(145deg,#ffffff_0%,#ecfdf7_48%,#e8f6ff_100%)] p-4 shadow-[0_24px_58px_rgba(8,27,53,0.16),inset_0_1px_0_rgba(255,255,255,0.9)]">
              <div className="relative grid gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#047857]">
                    Admission chance summary
                  </p>
                  <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-[#064E3B]">
                    {admissionChanceBullets.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#00C896] shadow-[0_0_10px_rgba(0,200,150,0.65)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-[#00C896]/20 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0B2A52]">
                    Suggested next step
                  </p>
                  <TypewriterNextStep
                    key={suggestedNextStepText}
                    text={suggestedNextStepText}
                  />
                </div>
              </div>
            </div>

            <p className="mt-3 overflow-hidden text-ellipsis whitespace-nowrap rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-[11px] font-semibold text-slate-500">
              Estimate only; final rank and cut-off depend on NTA result and
              counselling rules.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={onBookCounselling}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00C896] to-[#0EA5A4] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(0,200,150,0.24)] transition hover:-translate-y-0.5"
              >
                <Calendar size={16} />
                Book Free Counselling
              </button>

              <a
                href="https://wa.me/919563910223?text=I%20want%20expert%20guidance%20for%20my%20NEET%20rank%20and%20MBBS%20options."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-[#081B35] transition hover:border-[#00C896]/50 hover:text-[#047857]"
              >
                <MessageCircle size={16} />
                WhatsApp Expert
              </a>

              <Link
                href="/mbbs-abroad"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#081B35]/10 bg-[#081B35] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0B2A52]"
              >
                <Globe size={16} />
                Compare Countries
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>,
    portalRoot
  );
}

function TypewriterNextStep({ text }: { text: string }) {
  const [typedText, setTypedText] = useState("");
  const typedBullets = useMemo(() => getBulletItems(typedText), [typedText]);

  useEffect(() => {
    let typedLength = 0;
    const charactersPerTick = Math.max(1, Math.ceil(text.length / 130));

    const typewriter = window.setInterval(() => {
      typedLength = Math.min(text.length, typedLength + charactersPerTick);
      setTypedText(text.slice(0, typedLength));

      if (typedLength >= text.length) {
        window.clearInterval(typewriter);
      }
    }, 18);

    return () => window.clearInterval(typewriter);
  }, [text]);

  return (
    <>
      <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-[#081B35]">
        {typedBullets.length > 0 ? (
          typedBullets.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#33A6FF] shadow-[0_0_10px_rgba(51,166,255,0.6)]" />
              <span>{item}</span>
            </li>
          ))
        ) : (
          <li className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#33A6FF] shadow-[0_0_10px_rgba(51,166,255,0.6)]" />
            <span className="neet-type-cursor inline-block h-4 w-2 rounded-sm bg-[#081B35]" />
          </li>
        )}
      </ul>
      {typedText.length < text.length ? (
        <span className="neet-type-cursor mt-1 inline-block h-4 w-2 rounded-sm bg-[#081B35]" />
      ) : null}
    </>
  );
}
