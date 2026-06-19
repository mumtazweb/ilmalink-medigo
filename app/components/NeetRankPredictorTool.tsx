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


type NeetRankPredictorToolProps = {
  isOpen: boolean;
  onClose: () => void;
  onBookCounselling: () => void;
};

const rankAnchors = [
  { score: 720, rank: 1 },
  { score: 710, rank: 100 },
  { score: 700, rank: 2250 },
  { score: 650, rank: 26000 },
  { score: 600, rank: 40000 },
  { score: 550, rank: 144000 },
  { score: 500, rank: 209000 },
  { score: 450, rank: 290000 },
  { score: 400, rank: 390000 },
  { score: 350, rank: 540000 },
  { score: 300, rank: 690000 },
  { score: 250, rank: 850000 },
  { score: 200, rank: 1050000 },
  { score: 144, rank: 1200000 },
  { score: 100, rank: 1620000 },
  { score: 50, rank: 2060000 },
  { score: 0, rank: 2200000 },
];

const countrySuggestions = [
  { label: "Kyrgyzstan", href: "/mbbs-abroad/kyrgyzstan" },
  { label: "Georgia", href: "/mbbs-abroad/georgia" },
  { label: "Bangladesh", href: "/mbbs-abroad/bangladesh" },
  { label: "Russia", href: "/mbbs-abroad/russia" },
];

const rankFormatter = new Intl.NumberFormat("en-IN");

function estimateRank(score: number) {
  if (score < 0) return null;
  if (score >= rankAnchors[0].score) return rankAnchors[0].rank;

  const lastAnchor = rankAnchors[rankAnchors.length - 1];
  if (score <= lastAnchor.score) return lastAnchor.rank;

  for (let index = 0; index < rankAnchors.length - 1; index += 1) {
    const upperAnchor = rankAnchors[index];
    const lowerAnchor = rankAnchors[index + 1];

    if (score <= upperAnchor.score && score >= lowerAnchor.score) {
      const scoreProgress =
        (upperAnchor.score - score) / (upperAnchor.score - lowerAnchor.score);
      const rankEstimate =
        upperAnchor.rank + scoreProgress * (lowerAnchor.rank - upperAnchor.rank);

      return Math.round(rankEstimate);
    }
  }

  return lastAnchor.rank;
}

function getRankZone(rank: number, score: number) {
  let percentage = 0.18;
  let minimumSpread = 30000;

  if (score >= 700) {
    percentage = 0.08;
    minimumSpread = 35;
  } else if (score >= 650) {
    percentage = 0.1;
    minimumSpread = 500;
  } else if (score >= 550) {
    percentage = 0.12;
    minimumSpread = 2500;
  } else if (score >= 400) {
    percentage = 0.15;
    minimumSpread = 10000;
  }

  const spread = Math.max(Math.round(rank * percentage), minimumSpread);
  const bestRank = Math.max(1, rank - spread);
  const broadRank = rank + spread;

  return `${rankFormatter.format(bestRank)} - ${rankFormatter.format(broadRank)}`;
}

function getScoreZone(score: number | null) {
  if (score === null || Number.isNaN(score)) return "Enter a valid score";
  if (score > 720) return "Score out of range";
  if (score < 0) return "Beyond 22 lakh";
  if (score >= 600) return "High score zone";
  if (score >= 350) return "Middle score zone";
  return "Lower score zone";
}

function getSuggestedNextStep(score: number | null) {
  if (score === null || Number.isNaN(score)) {
    return "Enter your NEET score to see your likely admission pathway.";
  }

  if (score >= 600 && score <= 720) {
    return "India counselling options may be explored seriously.";
  }

  if (score >= 350 && score <= 720) {
    return "Keep India and MBBS abroad backup options open.";
  }

  return "Check eligibility and explore guided MBBS abroad options.";
}

function formatEstimatedAir(rank: number | null, score: number | null) {
  if (score !== null && score < 0) return "Beyond 22 lakh";
  if (rank === null) return "--";

  return `AIR ${rankFormatter.format(rank)}`;
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

  const parsedScore = useMemo(() => {
    if (!scoreValue.trim()) return null;

    const numericScore = Number(scoreValue);
    return Number.isFinite(numericScore) ? numericScore : null;
  }, [scoreValue]);

  const validationError =
    parsedScore !== null && parsedScore > 720
      ? "NEET score cannot be more than 720."
      : "";

  const estimatedRank = useMemo(() => {
    if (parsedScore === null || validationError) return null;

    return estimateRank(parsedScore);
  }, [parsedScore, validationError]);

  const likelyRankZone = useMemo(() => {
    if (validationError) return "--";
    if (parsedScore !== null && parsedScore < 0) return "Beyond 22 lakh";
    if (estimatedRank === null || parsedScore === null) return "--";

    return getRankZone(estimatedRank, parsedScore);
  }, [estimatedRank, parsedScore, validationError]);

  const sliderScore = Math.min(720, Math.max(0, parsedScore ?? 500));

  if (!isOpen) return null;

  const portalRoot =
    typeof document === "undefined"
      ? null
      : document.getElementById("modal-root") ?? document.body;

  if (!portalRoot) return null;

  return createPortal(
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
        className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_110px_rgba(2,8,23,0.45)]"
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
                Enter one score and see an estimated AIR, score zone, and planning
                direction instantly.
              </p>

              <div className="mt-7 rounded-2xl border border-white/12 bg-white/[0.08] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                  Estimated AIR
                </p>
                <p className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  {formatEstimatedAir(estimatedRank, parsedScore)}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#00C896]/15 px-3 py-1.5 text-xs font-semibold text-[#9EF5DC]">
                  <TrendingUp size={14} />
                  {likelyRankZone}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                  Recommended countries
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
                  value={scoreValue}
                  onChange={(event) => setScoreValue(event.target.value)}
                  placeholder="Enter score out of 720"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-bold text-[#081B35] outline-none transition focus:border-[#00C896] focus:bg-white focus:ring-4 focus:ring-[#00C896]/15"
                />
              </label>

              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  <span>0</span>
                  <span>720</span>
                </div>
                <input
                  id="neet-rank-score-range"
                  name="neetRankScoreRange"
                  type="range"
                  min={0}
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

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Likely Rank Zone
                </p>
                <p className="mt-2 text-lg font-extrabold text-[#081B35]">
                  {likelyRankZone}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Score Zone
                </p>
                <p className="mt-2 text-lg font-extrabold text-[#081B35]">
                  {getScoreZone(parsedScore)}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[#00C896]/20 bg-[#ECFDF7] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#047857]">
                Suggested next step
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-[#064E3B]">
                {getSuggestedNextStep(parsedScore)}
              </p>
            </div>

            <p className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs leading-5 text-slate-500">
              This is only an estimated prediction for guidance; actual NEET rank,
              cutoff, and admission chances may differ.
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
    </div>,
    portalRoot
  );
}
