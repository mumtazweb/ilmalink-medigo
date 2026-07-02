"use client";

import Link from "next/link";
import {
  ArrowRight,
  Compass,
  GraduationCap,
  Headset,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

type ReadyToMoveSectionProps = {
  onCounselling: () => void;
  onCheckScore: () => void;
};

export default function ReadyToMoveSection({
  onCounselling,
  onCheckScore,
}: ReadyToMoveSectionProps) {
  return (
    <section className="relative mt-10 isolate overflow-hidden rounded-[30px] border border-cyan-300/30 bg-[radial-gradient(circle_at_10%_0%,rgba(79,70,229,.4),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(0,200,150,.3),transparent_30%),linear-gradient(145deg,#03102e,#07275a_52%,#042047)] p-4 text-white shadow-[0_32px_80px_rgba(3,18,55,.4),inset_0_1px_0_rgba(255,255,255,.16)] sm:p-7">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.32)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.32)_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full border border-blue-300/25 shadow-[0_0_70px_rgba(15,76,255,.45)]" />
      <Sparkles className="pointer-events-none absolute right-7 top-7 h-5 w-5 animate-pulse text-cyan-200" />

      <div className="relative grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-cyan-100 backdrop-blur-xl">
            <Target className="h-4 w-4" />
            Ready to move faster?
          </p>
          <h2 className="mt-4 max-w-2xl text-[28px] font-black leading-[1.05] tracking-[-0.04em] sm:text-4xl">
            Build your best-fit MBBS plan with{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              transparent guidance.
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-[11px] font-medium leading-6 text-blue-100/82 sm:text-sm">
            Start with your NEET profile, compare India and Abroad budgets,
            review country and college fit, then move through the applicable
            official admission pathway with ilmaLink support.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ["Profile fit", Target],
              ["Country comparison", Compass],
              ["Admission support", GraduationCap],
            ].map(([label, Icon]) => (
              <div
                key={label as string}
                className="rounded-[15px] border border-white/12 bg-white/[0.07] p-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl"
              >
                <Icon className="mx-auto h-4 w-4 text-cyan-300" />
                <p className="mt-1.5 text-[8px] font-bold text-blue-50">
                  {label as string}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-white/15 bg-white/[0.08] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.14),0_18px_45px_rgba(0,0,0,.2)] backdrop-blur-xl sm:p-4">
          <button
            type="button"
            data-open-counselling
            onClick={onCounselling}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-[16px] bg-[linear-gradient(135deg,#00A876,#00C896,#2de6a5)] px-4 py-3.5 text-xs font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45),0_14px_30px_rgba(0,200,150,.3)] transition hover:-translate-y-0.5"
          >
            <Headset className="h-5 w-5" />
            Get Personalised Counselling
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
          <button
            type="button"
            onClick={onCheckScore}
            className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-[16px] border border-cyan-200/30 bg-white/10 px-4 py-3 text-xs font-black text-white transition hover:bg-white/15"
          >
            Check NEET Score Pathway
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Link
              href="/mbbs-india"
              className="inline-flex items-center justify-center rounded-[14px] border border-blue-200/20 bg-blue-500/12 px-3 py-3 text-[10px] font-black text-blue-50 transition hover:bg-blue-500/20"
            >
              Explore MBBS India
            </Link>
            <Link
              href="/mbbs-abroad"
              className="inline-flex items-center justify-center rounded-[14px] border border-emerald-200/20 bg-emerald-500/12 px-3 py-3 text-[10px] font-black text-emerald-50 transition hover:bg-emerald-500/20"
            >
              Compare MBBS Abroad
            </Link>
          </div>
          <Link
            href="/mbbs-decision-intelligence"
            className="mt-3 flex items-start gap-2 rounded-xl border border-white/10 bg-black/10 px-3 py-2.5 text-[9px] font-semibold leading-4 text-blue-100/80"
          >
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
            Read the crawlable MBBS decision intelligence, cost and admission
            support guide.
          </Link>
        </div>
      </div>
    </section>
  );
}

