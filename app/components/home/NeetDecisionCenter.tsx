"use client";

import type { RefObject } from "react";
import {
  ArrowRight,
  CircleAlert,
  Globe2,
  Headset,
  Landmark,
  LockKeyhole,
  Medal,
  PencilLine,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  WalletCards,
  Workflow,
} from "lucide-react";

import type { NeetPathwayResult } from "../../data/neetPathwayGuide";
import {
  formatNeetEstimatedRank,
  getNeetPathwayEmptyState,
  getNeetPathwayInvalidState,
} from "../../data/neetPathwayGuide";

type NeetDecisionCenterProps = {
  neetScore: string;
  neetPathway: NeetPathwayResult | null;
  isInvalid: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onScoreChange: (value: string) => void;
  onAnalyse: () => void;
  onReset: () => void;
  onCounselling: () => void;
};

const pathwayPreview = [
  { label: "Rank Range", icon: Medal },
  { label: "Admission Chance", icon: Landmark },
  { label: "Next Step", icon: Globe2 },
];

export default function NeetDecisionCenter({
  neetScore,
  neetPathway,
  isInvalid,
  inputRef,
  onScoreChange,
  onAnalyse,
  onReset,
  onCounselling,
}: NeetDecisionCenterProps) {
  return (
    <section
      id="neet-decision-center"
      className="relative isolate overflow-hidden rounded-[30px] border border-cyan-200/60 bg-[radial-gradient(circle_at_14%_0%,rgba(90,75,255,0.38),transparent_30%),radial-gradient(circle_at_92%_10%,rgba(0,200,150,0.28),transparent_28%),linear-gradient(145deg,#030b26_0%,#06245a_50%,#07143a_100%)] p-3.5 text-white shadow-[0_34px_100px_rgba(3,12,45,0.56),0_0_45px_rgba(34,211,238,0.28),inset_0_1px_0_rgba(255,255,255,0.2)] sm:rounded-[36px] sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.28)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-52 w-52 translate-x-1/3 -translate-y-1/3 rounded-full border border-cyan-300/20 bg-blue-400/10 blur-[1px]" />
      <Sparkles className="pointer-events-none absolute right-6 top-7 h-5 w-5 animate-pulse text-cyan-200" />

      <div className="relative">
        <div className="grid gap-4 sm:grid-cols-[1fr_150px] sm:items-center">
          <div className="min-w-0 text-center sm:text-left">
            <p className="mx-auto inline-flex items-center gap-2 rounded-lg border border-cyan-200/60 bg-[linear-gradient(135deg,rgba(79,70,229,.9),rgba(15,76,255,.8)_55%,rgba(0,200,150,.72))] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.32),0_0_28px_rgba(34,211,238,.48),0_12px_26px_rgba(15,76,255,.42)] ring-1 ring-cyan-200/20 sm:mx-0 sm:text-xs">
              <Sparkles className="h-4 w-4" />
              NEET Decision Center
            </p>
            <h2 className="mt-4 whitespace-nowrap text-[15px] font-black leading-[1.08] text-white sm:text-[34px] md:text-[38px]">
              Find Your MBBS Admission{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Pathway
              </span>
            </h2>
            <p className="mt-3 text-[11px] font-medium leading-5 text-blue-100/88 sm:text-xs sm:leading-6">
              Enter your NEET score to compare India MBBS, BDS, AYUSH, MBBS
              Abroad, paramedical and repeat-NEET options.
            </p>
          </div>

          <div className="relative mx-auto hidden h-36 w-36 sm:block">
            <div className="absolute inset-x-2 bottom-0 h-7 rounded-[50%] border border-cyan-300/50 bg-blue-500/30 shadow-[0_0_35px_rgba(34,211,238,.75)]" />
            <div className="absolute left-6 top-1 flex h-28 w-20 -rotate-6 flex-col rounded-[18px] border-2 border-blue-200 bg-[linear-gradient(145deg,#ffffff,#cfe4ff)] p-3 text-[#0F4CFF] shadow-[inset_0_2px_2px_white,0_18px_36px_rgba(15,76,255,.48)]">
              <span className="text-lg font-black italic">NEET</span>
              <span className="mt-3 h-1.5 rounded-full bg-blue-300" />
              <span className="mt-2 h-1.5 w-4/5 rounded-full bg-blue-200" />
              <span className="mt-2 h-1.5 w-3/5 rounded-full bg-blue-200" />
            </div>
            <Stethoscope className="absolute bottom-3 left-0 h-14 w-14 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,.7)]" />
            <div className="absolute bottom-2 right-0 flex h-16 w-14 items-center justify-center rounded-[22px_22px_28px_28px] border-2 border-emerald-200 bg-[linear-gradient(145deg,#22e6c0,#00a876)] text-white shadow-[inset_0_2px_2px_rgba(255,255,255,.5),0_14px_30px_rgba(0,200,150,.45)]">
              <ShieldCheck className="h-9 w-9" />
            </div>
          </div>
        </div>

        <form
          className="mt-4 rounded-[20px] border border-blue-300/35 bg-[#061943]/78 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_14px_35px_rgba(0,0,0,.2)] backdrop-blur-xl"
          onSubmit={(event) => {
            event.preventDefault();
            onAnalyse();
          }}
        >
          <label
            htmlFor="home-hero-neet-score"
            className="text-[10px] font-black uppercase tracking-[0.08em] text-blue-50"
          >
            Your NEET Score
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="relative">
              <PencilLine className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#315aa7]" />
              <input
                ref={inputRef}
                id="home-hero-neet-score"
                name="homeHeroNeetScore"
                type="number"
                min={-10}
                max={720}
                inputMode="numeric"
                value={neetScore}
                onChange={(event) => onScoreChange(event.target.value)}
                placeholder="e.g. 512"
                className="h-9 w-full rounded-[13px] border border-white/70 bg-[linear-gradient(145deg,#ffffff,#edf3ff)] py-1.5 pl-8 pr-10 text-sm font-black text-[#071B44] outline-none shadow-[inset_0_2px_4px_rgba(15,45,91,.08),0_10px_25px_rgba(0,0,0,.18)] [appearance:textfield] placeholder:font-semibold placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/15 sm:h-12 sm:pl-10 sm:pr-14 sm:text-xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 sm:right-3 sm:text-sm">
                / 720
              </span>
            </div>
            <button
              type="submit"
              className="group relative inline-flex h-9 w-full items-center justify-center gap-1.5 overflow-hidden rounded-[13px] border border-cyan-100/80 bg-[linear-gradient(135deg,#08a8ff,#2454f5_48%,#7c3dff)] px-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45),0_10px_22px_rgba(60,61,255,.36),0_0_16px_rgba(34,211,238,.22)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(60,61,255,.52)] sm:h-12 sm:gap-2 sm:px-4"
            >
              <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/30 blur-md transition duration-700 group-hover:left-[115%]" />
              <span className="relative whitespace-nowrap text-[11px] font-black leading-none sm:text-xs">
                Get My Pathway
              </span>
              <ArrowRight className="relative h-3.5 w-3.5 shrink-0 transition group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p
              className={`text-[9px] font-semibold ${
                isInvalid ? "text-amber-300" : "text-blue-200"
              }`}
            >
              {isInvalid
                ? getNeetPathwayInvalidState
                : "Score should be between -10 and 720."}
            </p>
            {neetPathway && (
              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-[0.08em] text-cyan-200"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            )}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[
              ["India Counselling", Landmark, "border-blue-400/35 text-blue-100"],
              ["MBBS Abroad", Globe2, "border-emerald-400/35 text-emerald-100"],
              ["Repeat / Backup", RotateCcw, "border-violet-400/35 text-violet-100"],
            ].map(([label, Icon, color]) => (
              <span
                key={label as string}
                className={`flex min-h-9 items-center justify-center gap-1 rounded-xl border bg-white/[0.04] px-1 text-center text-[8px] font-bold ${color}`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {label as string}
              </span>
            ))}
          </div>
        </form>

        {!neetPathway ? (
          <div className="mt-3 rounded-[20px] border border-blue-300/35 bg-[#061943]/72 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-xl">
            <div className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blue-300/40 bg-[linear-gradient(145deg,#173d8d,#071d50)] text-blue-100 shadow-[inset_0_2px_2px_rgba(255,255,255,.15),0_0_24px_rgba(15,76,255,.4)]">
                <LockKeyhole className="h-6 w-6" />
              </span>
              <p className="mt-3 text-xs font-black text-white">
                Enter your NEET score to unlock your personalised pathway.
              </p>
              <p className="mx-auto mt-1 max-w-sm text-[9px] font-medium leading-4 text-blue-100/72">
                {getNeetPathwayEmptyState} You will also see budget advice,
                next steps and a guidance warning.
              </p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {pathwayPreview.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-[15px] border border-blue-300/25 bg-[#081d4b]/75 p-2 text-center"
                >
                  <Icon className="mx-auto h-5 w-5 text-blue-300/75" />
                  <p className="mt-2 text-[8px] font-bold text-blue-50">
                    {label}
                  </p>
                  <span className="mx-auto mt-2 block h-1.5 w-4/5 rounded-full bg-slate-500/40" />
                  <span className="mx-auto mt-1.5 block h-1.5 w-full rounded-full bg-slate-500/30" />
                  <span className="mx-auto mt-1.5 block h-1.5 w-2/3 rounded-full bg-slate-500/25" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-3 space-y-2.5">
            <div className="relative overflow-hidden rounded-[18px] border border-cyan-300/60 bg-[linear-gradient(135deg,rgba(0,156,255,.22),rgba(15,76,255,.12))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.14),0_0_26px_rgba(0,156,255,.18)]">
              <Medal className="absolute right-1 top-1 h-14 w-14 text-amber-300/35 drop-shadow-[0_0_18px_rgba(251,191,36,.7)]" />
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                <div className="min-h-[72px] rounded-[15px] border border-cyan-200/25 bg-white/[0.06] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.1)] sm:p-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-cyan-300">
                    Marks
                  </p>
                  <p className="mt-1 text-lg font-black leading-tight text-cyan-200 sm:text-xl">
                    {neetPathway.bandLabel}
                  </p>
                </div>
                <div className="min-h-[72px] rounded-[15px] border border-cyan-200/25 bg-white/[0.06] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.1)] sm:p-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-cyan-300">
                    Est. AIR
                  </p>
                  <p className="mt-1 text-sm font-black leading-tight text-white sm:text-base">
                    {formatNeetEstimatedRank(neetPathway.estimatedRank)}
                  </p>
                </div>
                <div className="min-h-[72px] min-w-0 rounded-[15px] border border-cyan-200/25 bg-white/[0.06] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,.1)] sm:p-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-cyan-300">
                    Rank Range
                  </p>
                  <p className="mt-1 break-words text-[10px] font-black leading-3 text-white sm:text-xs sm:leading-4">
                    {neetPathway.rankZoneLabel}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-[10px] font-bold leading-4 text-blue-50/85">
                {neetPathway.headline}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {[
                {
                  label: "Admission Chance Summary",
                  value: neetPathway.admissionChanceSummary,
                  icon: Landmark,
                  style: "border-emerald-400/55 bg-emerald-500/10 text-emerald-200",
                },
                {
                  label: "Abroad / Backup Route",
                  value: neetPathway.abroadBackup,
                  icon: Globe2,
                  style: "border-cyan-400/55 bg-cyan-500/10 text-cyan-200",
                },
                {
                  label: "Budget Advice",
                  value: neetPathway.budgetAdvice,
                  icon: WalletCards,
                  style: "border-violet-400/55 bg-violet-500/10 text-violet-200",
                },
                {
                  label: "Suggested Next Step",
                  value: neetPathway.suggestedNextStep,
                  icon: Workflow,
                  style: "border-teal-400/55 bg-teal-500/10 text-teal-200",
                },
              ].map(({ label, value, icon: Icon, style }) => (
                <div
                  key={label}
                  className={`min-h-[112px] rounded-[16px] border p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.1)] sm:p-3 ${style}`}
                >
                  <p className="flex items-center gap-1.5 text-[8px] font-black uppercase leading-tight tracking-[0.08em] sm:gap-2 sm:text-[9px]">
                    <Icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                    {label}
                  </p>
                  <p className="mt-2 line-clamp-5 text-[8px] font-medium leading-[1.45] text-white/88 sm:text-[9px]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-[16px] border border-amber-400/55 bg-amber-400/10 p-3">
              <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.08em] text-amber-300">
                <CircleAlert className="h-4 w-4" />
                Warning / Disclaimer
              </p>
              <p className="mt-1 text-[9px] font-medium leading-[1.45] text-amber-50/90">
                {neetPathway.warning}
              </p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onCounselling}
          className="group relative mt-3 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[15px] border border-emerald-200/70 bg-[linear-gradient(135deg,#00a6b4,#00C896_52%,#16d67c)] px-3 py-3 text-[11px] font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,.5),0_14px_30px_rgba(0,200,150,.28)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_38px_rgba(0,200,150,.42)] sm:text-xs"
        >
          <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/35 blur-md transition duration-700 group-hover:left-[115%]" />
          <Headset className="relative h-5 w-5" />
          <span className="relative">
            Get Personalised Guidance According to Your Plan
          </span>
          <ArrowRight className="relative h-4 w-4" />
        </button>
        <p className="mt-3 flex items-start justify-center gap-2 text-[8px] font-medium leading-4 text-blue-100/75">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
          Guidance depends on rank, category, domicile, counselling round,
          official seat matrix, documents and updated rules.
        </p>
      </div>
    </section>
  );
}
