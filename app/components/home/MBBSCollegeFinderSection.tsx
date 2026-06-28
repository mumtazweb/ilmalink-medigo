"use client";

import Link from "next/link";
import Image from "next/image";
import { type ReactNode, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Compass,
  GraduationCap,
  Globe2,
  Info,
  Landmark,
  PlaneTakeoff,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trophy,
} from "lucide-react";

import type {
  FinderOption,
  MbbsFinderCountry,
  MbbsFinderPathway,
} from "../../data/mbbsCollegeFinderPlaceholderLogic";
import {
  abroadBudgetOptions,
  abroadCollegeRecommendations,
  abroadCountryMatches,
  domicileStateOptions,
  indiaBackupOptions,
  indiaBudgetOptions,
  indiaImportantLogicNote,
  indiaTopResults,
} from "../../data/mbbsCollegeFinderPlaceholderLogic";
import {
  mbbsCollegeFinderSeoHeading,
  mbbsCollegeFinderSeoParagraphs,
} from "../../data/mbbsCollegeFinderSeo";

type FinderView =
  | "intro"
  | "pathway"
  | "india-input"
  | "india-result"
  | "abroad-input"
  | "abroad-countries"
  | "abroad-colleges";

const stepByView: Record<FinderView, number> = {
  intro: 0,
  pathway: 1,
  "india-input": 2,
  "india-result": 3,
  "abroad-input": 2,
  "abroad-countries": 3,
  "abroad-colleges": 4,
};

const finderSteps = [
  "Start",
  "Pathway",
  "Inputs",
  "Matches",
  "Colleges",
];

const trustChips = ["India or Abroad", "Budget-based", "Quick guidance"];

const pathwayCards = [
  {
    pathway: "india" as const,
    title: "MBBS in India",
    description:
      "For India, NEET rank/score, domicile state and budget matter.",
    bullets: ["NEET score/rank", "Domicile state", "Budget"],
    buttonLabel: "Start India Finder",
    imageSrc: "/home/mbbs-college-finder/india-campus-premium.webp",
    icon: Landmark,
    tone:
      "border-blue-200 bg-[linear-gradient(145deg,#ffffff_0%,#eef5ff_55%,#f8fbff_100%)] text-[#0F4CFF]",
  },
  {
    pathway: "abroad" as const,
    title: "MBBS Abroad",
    description:
      "For abroad, NEET qualification and budget are the main starting points. No domicile factor.",
    bullets: ["NEET qualified", "Budget"],
    buttonLabel: "Start Abroad Finder",
    imageSrc: "/home/mbbs-college-finder/abroad-globe-plane-premium.webp",
    icon: Globe2,
    tone:
      "border-teal-200 bg-[linear-gradient(145deg,#ffffff_0%,#ecfffb_55%,#f7fffc_100%)] text-[#058c83]",
  },
];

function getOptionLabel(options: FinderOption[], value: string, fallback: string) {
  return options.find((option) => option.value === value)?.label ?? fallback;
}

function openCounsellingPopup() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("ilmalink:open-counselling"));
}

function FormField({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-sm font-black text-[#0B1D39]">
        {label}
      </span>
      {children}
    </label>
  );
}

function InfoBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-[18px] border border-cyan-200 bg-cyan-50/80 p-3 text-sm font-semibold leading-6 text-[#10526a] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#0F4CFF]" />
      <p>{children}</p>
    </div>
  );
}

function SectionButton({
  children,
  onClick,
  variant = "blue",
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "blue" | "teal" | "quiet";
  type?: "button" | "submit";
}) {
  const variants = {
    blue:
      "border-blue-300/50 bg-[linear-gradient(135deg,#0F4CFF,#075ee8_54%,#00A876)] text-white shadow-[0_18px_36px_rgba(15,76,255,0.26)] hover:shadow-[0_24px_44px_rgba(15,76,255,0.34)]",
    teal:
      "border-teal-300/50 bg-[linear-gradient(135deg,#009d9a,#00C896_58%,#35df9b)] text-[#031f2c] shadow-[0_18px_36px_rgba(0,168,118,0.24)] hover:shadow-[0_24px_44px_rgba(0,168,118,0.32)]",
    quiet:
      "border-slate-200 bg-white text-[#0B1D39] shadow-[0_12px_26px_rgba(15,45,91,0.08)] hover:border-blue-200 hover:text-[#0F4CFF]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-[18px] border px-4 py-3 text-sm font-black transition duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200/70 sm:w-auto ${variants[variant]}`}
    >
      {variant !== "quiet" && (
        <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/35 blur-md transition duration-700 group-hover:left-[115%]" />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

function SummaryChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[16px] border border-blue-100 bg-white/90 px-3 py-2 text-center shadow-[0_10px_20px_rgba(15,45,91,0.08)]">
      <p className="truncate text-[11px] font-black text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-black text-[#071B44]">{value}</p>
    </div>
  );
}

export default function MBBSCollegeFinderSection() {
  const [view, setView] = useState<FinderView>("intro");
  const [pathway, setPathway] = useState<MbbsFinderPathway | null>(null);
  const [indiaRank, setIndiaRank] = useState("");
  const [domicileState, setDomicileState] = useState("");
  const [indiaBudget, setIndiaBudget] = useState("");
  const [abroadBudget, setAbroadBudget] = useState("");
  const [selectedCountry, setSelectedCountry] =
    useState<MbbsFinderCountry>("Kyrgyzstan");

  const activeStep = stepByView[view];
  const selectedCollegeRecommendation = useMemo(
    () => abroadCollegeRecommendations[selectedCountry],
    [selectedCountry],
  );
  const domicileLabel = getOptionLabel(
    domicileStateOptions,
    domicileState,
    "Not selected",
  );
  const indiaBudgetLabel = getOptionLabel(
    indiaBudgetOptions,
    indiaBudget,
    "Not selected",
  );
  const abroadBudgetLabel = getOptionLabel(
    abroadBudgetOptions,
    abroadBudget,
    "Not selected",
  );

  const showPathway = (nextPathway: MbbsFinderPathway) => {
    setPathway(nextPathway);
    setView(nextPathway === "india" ? "india-input" : "abroad-input");
  };

  const resetFlow = () => {
    setView("intro");
    setPathway(null);
    setSelectedCountry("Kyrgyzstan");
  };

  const renderIntro = () => (
    <article className="relative overflow-hidden rounded-[28px] border border-white/80 bg-[radial-gradient(circle_at_12%_0%,rgba(85,210,255,0.32),transparent_32%),linear-gradient(145deg,#061b46_0%,#0b3a83_54%,#087b7a_100%)] p-4 text-white shadow-[0_28px_70px_rgba(3,27,70,0.34),inset_0_1px_0_rgba(255,255,255,0.24)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.32)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.32)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative grid gap-5 lg:grid-cols-[1fr_260px] lg:items-center">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/50 bg-white/10 px-3 py-1.5 text-xs font-black text-cyan-100">
            <Sparkles className="h-4 w-4" />
            New experimental ILMALINK tool
          </p>
          <h3 className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl">
            MBBS College Finder 2026
          </h3>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-blue-50 sm:text-base">
            Find your best available MBBS admission pathway in India or abroad
            based on NEET score, domicile, budget and eligibility.
          </p>

          <div className="mt-5">
            <button
              type="button"
              onClick={() => setView("pathway")}
              className="group relative inline-flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-[20px] border border-cyan-100/70 bg-[linear-gradient(135deg,#0F4CFF,#008bcc_48%,#00C896)] px-5 py-4 text-base font-black text-white shadow-[0_20px_44px_rgba(0,200,150,0.34),0_0_35px_rgba(34,211,238,0.32),inset_0_1px_0_rgba(255,255,255,0.42)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_58px_rgba(0,200,150,0.42),0_0_45px_rgba(34,211,238,0.42)] focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200/80 sm:w-auto"
            >
              <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/35 blur-md transition duration-700 group-hover:left-[115%]" />
              <GraduationCap className="relative h-5 w-5" />
              <span className="relative">Find My Best MBBS College</span>
              <ArrowRight className="relative h-5 w-5 transition group-hover:translate-x-1" />
            </button>
            <p className="mt-3 text-center text-xs font-semibold text-cyan-50/90 sm:text-left">
              India or Abroad <span aria-hidden="true">&bull;</span> 3-click
              pathway guidance <span aria-hidden="true">&bull;</span>{" "}
              Budget-based
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-xs font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
          {pathwayCards.map((card) => (
            <div
              key={card.pathway}
              className="overflow-hidden rounded-[18px] border border-white/24 bg-white/12 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur"
            >
              <Image
                src={card.imageSrc}
                alt=""
                width={640}
                height={360}
                aria-hidden="true"
                className="h-24 w-full rounded-[14px] object-cover"
              />
              <p className="mt-2 text-center text-xs font-black text-white">
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );

  const renderPathwaySelection = () => (
    <article className="rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_26px_64px_rgba(15,45,91,0.12)] sm:p-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-black text-[#0F4CFF]">
          Pathway selection after click
        </p>
        <h3 className="mt-2 text-3xl font-black text-[#081B35]">
          MBBS College Finder
        </h3>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          Choose your pathway
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {pathwayCards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              type="button"
              key={card.pathway}
              onClick={() => showPathway(card.pathway)}
              aria-pressed={pathway === card.pathway}
              className={`group flex h-full min-h-[360px] flex-col overflow-hidden rounded-[22px] border p-3 text-left shadow-[0_18px_40px_rgba(15,45,91,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_rgba(15,76,255,0.16)] focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200 ${card.tone}`}
            >
              <Image
                src={card.imageSrc}
                alt=""
                width={640}
                height={360}
                aria-hidden="true"
                className="h-32 w-full rounded-[18px] object-cover"
              />
              <div className="flex flex-1 flex-col p-2">
                <h4 className="mt-2 flex items-center gap-2 text-2xl font-black">
                  <Icon className="h-6 w-6" />
                  {card.title}
                </h4>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  {card.description}
                </p>
                <ul className="mt-3 space-y-2 text-sm font-bold text-[#17396e]">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#00A876]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-[16px] bg-[#0F4CFF] px-4 text-sm font-black text-white shadow-[0_14px_28px_rgba(15,76,255,0.24)] transition group-hover:bg-[#083fcf]">
                  {card.buttonLabel}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-center text-xs font-semibold text-slate-500">
        <ShieldCheck className="h-4 w-4 text-[#64748b]" />
        Your data is safe and secure with us.
      </p>
    </article>
  );

  const renderIndiaInput = () => (
    <article className="rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_26px_64px_rgba(15,45,91,0.12)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[#0F4CFF]">
            <Landmark className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-black text-[#0F4CFF]">MBBS in India</p>
            <h3 className="text-2xl font-black text-[#081B35]">
              Prefilled input view
            </h3>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setView("pathway")}
          className="inline-flex items-center gap-2 text-sm font-black text-[#0F4CFF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Change pathway
        </button>
      </div>

      <form
        className="mt-5 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setView("india-result");
        }}
      >
        <FormField id="mbbs-finder-india-rank" label="NEET Rank / Score">
          <div className="relative">
            <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="mbbs-finder-india-rank"
              name="mbbsFinderIndiaRank"
              value={indiaRank}
              onChange={(event) => setIndiaRank(event.target.value)}
              placeholder="Enter your NEET rank or score"
              className="h-12 w-full rounded-[16px] border border-slate-200 bg-white py-2 pl-11 pr-3 text-sm font-bold text-[#081B35] shadow-[inset_0_1px_0_rgba(255,255,255,1),0_10px_22px_rgba(15,45,91,0.06)] outline-none focus:border-[#0F4CFF] focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </FormField>

        <FormField id="mbbs-finder-domicile" label="Domicile State">
          <select
            id="mbbs-finder-domicile"
            name="mbbsFinderDomicile"
            value={domicileState}
            onChange={(event) => setDomicileState(event.target.value)}
            className="h-12 w-full rounded-[16px] border border-slate-200 bg-white px-3 text-sm font-bold text-[#081B35] shadow-[0_10px_22px_rgba(15,45,91,0.06)] outline-none focus:border-[#0F4CFF] focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Select your domicile state</option>
            {domicileStateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="mbbs-finder-india-budget" label="Budget">
          <select
            id="mbbs-finder-india-budget"
            name="mbbsFinderIndiaBudget"
            value={indiaBudget}
            onChange={(event) => setIndiaBudget(event.target.value)}
            className="h-12 w-full rounded-[16px] border border-slate-200 bg-white px-3 text-sm font-bold text-[#081B35] shadow-[0_10px_22px_rgba(15,45,91,0.06)] outline-none focus:border-[#0F4CFF] focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Select your budget range</option>
            {indiaBudgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <InfoBox>
          For MBBS in India, NEET rank/score, domicile state and budget decide
          the practical admission pathway. If rank is within 30,000, government
          MBBS is usually the first route, so budget becomes less important than
          counselling strategy.
        </InfoBox>

        <SectionButton type="submit" variant="blue">
          See My Best India Options
          <ArrowRight className="h-4 w-4" />
        </SectionButton>
      </form>
    </article>
  );

  const renderAbroadInput = () => (
    <article className="rounded-[28px] border border-teal-100 bg-white p-4 shadow-[0_26px_64px_rgba(15,45,91,0.12)] sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-teal-100 bg-teal-50 text-[#058c83]">
            <Globe2 className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-black text-[#058c83]">MBBS Abroad</p>
            <h3 className="text-2xl font-black text-[#081B35]">
              Prefilled input view
            </h3>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setView("pathway")}
          className="inline-flex items-center gap-2 text-sm font-black text-[#058c83]"
        >
          <ArrowLeft className="h-4 w-4" />
          Change pathway
        </button>
      </div>

      <form
        className="mt-5 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setView("abroad-countries");
        }}
      >
        <div>
          <p className="mb-2 text-sm font-black text-[#0B1D39]">
            NEET Qualified?
          </p>
          <div
            role="group"
            aria-label="NEET qualified status"
            className="flex rounded-[16px] border border-emerald-200 bg-emerald-50 p-2"
          >
            <span
              aria-label="Qualified selected"
              className="inline-flex h-10 w-full items-center justify-between rounded-[12px] bg-white px-3 text-sm font-black text-[#075E59] shadow-[0_8px_18px_rgba(0,168,118,0.1)]"
            >
              Qualified
              <CheckCircle2 className="h-5 w-5 text-[#00A876]" />
            </span>
          </div>
        </div>

        <FormField id="mbbs-finder-abroad-budget" label="Budget">
          <select
            id="mbbs-finder-abroad-budget"
            name="mbbsFinderAbroadBudget"
            value={abroadBudget}
            onChange={(event) => setAbroadBudget(event.target.value)}
            className="h-12 w-full rounded-[16px] border border-slate-200 bg-white px-3 text-sm font-bold text-[#081B35] shadow-[0_10px_22px_rgba(15,45,91,0.06)] outline-none focus:border-[#058c83] focus:ring-4 focus:ring-teal-100"
          >
            <option value="">Select your total budget</option>
            {abroadBudgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <InfoBox>
          For MBBS abroad, NEET qualification will be automatically marked and
          budget is the main starting point. Domicile state is not required.
        </InfoBox>

        <SectionButton type="submit" variant="teal">
          See My Best Country Matches
          <ArrowRight className="h-4 w-4" />
        </SectionButton>
      </form>
    </article>
  );

  const renderIndiaResult = () => (
    <article className="rounded-[28px] border border-blue-100 bg-[linear-gradient(145deg,#ffffff_0%,#f5fbff_100%)] p-4 shadow-[0_26px_64px_rgba(15,45,91,0.12)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-black text-[#0F4CFF]">
            <Trophy className="h-5 w-5 text-amber-500" />
            Post-filled India result view
          </p>
          <h3 className="mt-2 text-2xl font-black text-[#081B35]">
            Your Best India Matches
          </h3>
        </div>
        <SectionButton onClick={() => setView("india-input")} variant="quiet">
          Edit Inputs
        </SectionButton>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <SummaryChip
          label="NEET Rank / Score"
          value={indiaRank.trim() || "Not entered"}
        />
        <SummaryChip label="Domicile State" value={domicileLabel} />
        <SummaryChip label="Budget" value={indiaBudgetLabel} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {indiaTopResults.map((result, index) => (
          <div
            key={result.title}
            className="overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_18px_38px_rgba(15,45,91,0.1)]"
          >
            <div className="bg-[linear-gradient(135deg,#0F4CFF,#08a5ca)] px-4 py-2 text-xs font-black text-white">
              Best Fit {index + 1}
            </div>
            <div className="p-4">
              <Building2 className="h-8 w-8 text-[#0F4CFF]" />
              <h4 className="mt-3 text-xl font-black text-[#081B35]">
                {result.title}
              </h4>
              <p className="mt-2 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                {result.fit}
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                <span className="font-black text-[#0B1D39]">Why: </span>
                {result.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-sm font-black text-[#0B1D39]">Backup options</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {indiaBackupOptions.map((option) => (
            <div
              key={option}
              className="rounded-[18px] border border-slate-200 bg-white p-3 text-sm font-black text-[#17396e] shadow-[0_12px_24px_rgba(15,45,91,0.08)]"
            >
              <BadgeCheck className="mb-2 h-5 w-5 text-[#00A876]" />
              {option}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-[18px] border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
        {indiaImportantLogicNote}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <SectionButton onClick={openCounsellingPopup} variant="blue">
          Talk to ILMALINK Counsellor
          <ArrowRight className="h-4 w-4" />
        </SectionButton>
        <Link
          href="/portal/signup"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[18px] border border-emerald-200 bg-white px-4 py-3 text-sm font-black text-[#075E59] shadow-[0_12px_26px_rgba(15,45,91,0.08)] transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-[#047857] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
        >
          Create Free Profile
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );

  const renderAbroadCountryResults = () => (
    <article className="rounded-[28px] border border-teal-100 bg-[linear-gradient(145deg,#ffffff_0%,#f2fffb_100%)] p-4 shadow-[0_26px_64px_rgba(15,45,91,0.12)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-black text-[#058c83]">
            <Globe2 className="h-5 w-5" />
            Post-filled abroad result view
          </p>
          <h3 className="mt-2 text-2xl font-black text-[#081B35]">
            Your Best Country Matches
          </h3>
          <p className="mt-1 text-sm font-semibold text-slate-600">
            Based on your NEET qualification and budget
          </p>
        </div>
        <SectionButton onClick={() => setView("abroad-input")} variant="quiet">
          Edit Inputs
        </SectionButton>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <SummaryChip label="NEET Qualified" value="Qualified" />
        <SummaryChip label="Budget" value={abroadBudgetLabel} />
      </div>

      <div className="mt-5 grid gap-4">
        {abroadCountryMatches.map((match, index) => (
          <article
            key={match.country}
            className="grid gap-3 overflow-hidden rounded-[22px] border border-teal-100 bg-white p-3 shadow-[0_18px_38px_rgba(15,45,91,0.1)] sm:grid-cols-[160px_1fr_auto] sm:items-center"
          >
            <Image
              src={match.imageSrc}
              alt=""
              width={640}
              height={360}
              aria-hidden="true"
              className="h-28 w-full rounded-[16px] object-cover sm:h-24"
            />
            <div className="min-w-0">
              <p className="inline-flex rounded-full bg-[#058c83] px-3 py-1 text-xs font-black text-white">
                Match {index + 1}
              </p>
              <h4 className="mt-2 text-xl font-black text-[#081B35]">
                {match.country}
              </h4>
              <div className="mt-2 flex flex-wrap gap-2 text-xs font-black">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                  Fit Level: {match.fitLevel}
                </span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                  {match.neetStatus}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                {match.reason}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCountry(match.country);
                setView("abroad-colleges");
              }}
              aria-pressed={selectedCountry === match.country}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[16px] border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-black text-[#075E59] transition hover:-translate-y-0.5 hover:border-teal-300 hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-100 sm:w-auto"
            >
              View Recommended Colleges
              <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>

      <div className="mt-5">
        <InfoBox>
          Click any country to see recommended colleges. Top 2 colleges are
          shown as best fit. Other colleges are shown as backup options.
        </InfoBox>
      </div>
    </article>
  );

  const renderAbroadCollegeResults = () => (
    <article className="rounded-[28px] border border-teal-100 bg-[linear-gradient(145deg,#ffffff_0%,#f4fffd_100%)] p-4 shadow-[0_26px_64px_rgba(15,45,91,0.12)] sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-black text-[#058c83]">
            <PlaneTakeoff className="h-5 w-5" />
            Clicked country college result view
          </p>
          <h3 className="mt-2 text-2xl font-black text-[#081B35]">
            {selectedCountry} - Recommended Colleges
          </h3>
        </div>
        <SectionButton
          onClick={() => setView("abroad-countries")}
          variant="quiet"
        >
          <ArrowLeft className="h-4 w-4" />
          Country Matches
        </SectionButton>
      </div>

      <div className="mt-5">
        <p className="text-sm font-black text-[#0B1D39]">Top best fits</p>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          {selectedCollegeRecommendation.bestFit.slice(0, 2).map((college, index) => (
            <article
              key={college.name}
              className="overflow-hidden rounded-[22px] border border-teal-100 bg-white shadow-[0_18px_38px_rgba(15,45,91,0.1)]"
            >
              <Image
                src={college.imageSrc}
                alt=""
                width={640}
                height={360}
                aria-hidden="true"
                className="h-28 w-full object-cover"
              />
              <div className="p-4">
                <p className="inline-flex rounded-full bg-[#058c83] px-3 py-1 text-xs font-black text-white">
                  Best Fit College {index + 1}
                </p>
                <h4 className="mt-3 text-lg font-black text-[#081B35]">
                  {college.name}
                </h4>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  <span className="font-black text-[#0B1D39]">Why: </span>
                  {college.reason}
                </p>
                <button
                  type="button"
                  onClick={openCounsellingPopup}
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-[14px] bg-teal-50 px-4 text-sm font-black text-[#075E59] transition hover:bg-teal-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-100"
                >
                  Verify Fit
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm font-black text-[#0B1D39]">Backup colleges</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {selectedCollegeRecommendation.backup.map((college) => (
            <article
              key={college.name}
              className="rounded-[18px] border border-slate-200 bg-white p-3 shadow-[0_12px_24px_rgba(15,45,91,0.08)]"
            >
              <h4 className="text-sm font-black text-[#081B35]">
                {college.name}
              </h4>
              <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                <span className="font-black text-[#0B1D39]">Why: </span>
                {college.reason}
              </p>
              <button
                type="button"
                onClick={openCounsellingPopup}
                className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-[12px] border border-slate-200 text-xs font-black text-[#0F4CFF] transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-100"
              >
                Verify Fit
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <SectionButton onClick={openCounsellingPopup} variant="teal">
          Verify My Admission Possibility
        </SectionButton>
        <SectionButton onClick={openCounsellingPopup} variant="blue">
          Talk to ILMALINK Counsellor
        </SectionButton>
        <Link
          href="/portal/signup"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-[18px] border border-emerald-200 bg-white px-4 py-3 text-sm font-black text-[#075E59] shadow-[0_12px_26px_rgba(15,45,91,0.08)] transition hover:-translate-y-0.5 hover:border-emerald-300 hover:text-[#047857] focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
        >
          Create Free Profile
        </Link>
      </div>

      <p className="mt-5 rounded-[18px] border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
        This tool gives pathway guidance only. Final admission depends on NEET
        qualification, eligibility, documents, budget, seat availability,
        counselling rules, university approval and official norms.
      </p>
    </article>
  );

  const renderActiveView = () => {
    if (view === "intro") return renderIntro();
    if (view === "pathway") return renderPathwaySelection();
    if (view === "india-input") return renderIndiaInput();
    if (view === "india-result") return renderIndiaResult();
    if (view === "abroad-input") return renderAbroadInput();
    if (view === "abroad-countries") return renderAbroadCountryResults();
    return renderAbroadCollegeResults();
  };

  return (
    <section
      id="mbbs-college-finder-2026"
      aria-labelledby="mbbs-college-finder-title"
      className="relative isolate scroll-mt-32 overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eff8ff_48%,#f4fffb_100%)] px-3 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:radial-gradient(circle_at_center,rgba(15,76,255,0.11)_1px,transparent_1.4px)] [background-size:24px_24px]" />
      <div className="sr-only" aria-label={mbbsCollegeFinderSeoHeading}>
        <h2>{mbbsCollegeFinderSeoHeading}</h2>
        {mbbsCollegeFinderSeoParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-black text-[#0F4CFF] shadow-[0_10px_22px_rgba(15,76,255,0.08)]">
              <Compass className="h-4 w-4" />
              Experimental guidance section
            </p>
            <h2
              id="mbbs-college-finder-title"
              className="mt-4 text-3xl font-black leading-tight text-[#081B35] sm:text-4xl lg:text-5xl"
            >
              MBBS College Finder 2026
            </h2>
            <p className="mt-3 text-base font-semibold leading-7 text-slate-600 sm:text-lg">
              Find your best available MBBS admission pathway in India or abroad
              based on NEET score, domicile, budget and eligibility.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {finderSteps.map((step, index) => (
              <span
                key={step}
                aria-current={activeStep === index ? "step" : undefined}
                className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-black ${
                  activeStep >= index
                    ? "border-blue-200 bg-white text-[#0F4CFF] shadow-[0_10px_20px_rgba(15,76,255,0.08)]"
                    : "border-slate-200 bg-white/70 text-slate-400"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                    activeStep >= index
                      ? "bg-[#0F4CFF] text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="hidden sm:inline">{step}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[0.86fr_1.14fr] xl:items-start">
          <aside className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/86 p-4 shadow-[0_26px_64px_rgba(15,45,91,0.12),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur sm:p-5">
            <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-cyan-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-emerald-200/45 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#0F4CFF,#00C896)] text-white shadow-[0_14px_28px_rgba(15,76,255,0.24)]">
                  <Stethoscope className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-black text-[#0F4CFF]">
                    Main button on homepage hero
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    Placeholder flow, final logic later
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {pathwayCards.map((card) => (
                  <div
                    key={card.pathway}
                    className={`rounded-[20px] border p-3 ${
                      pathway === card.pathway
                        ? "border-[#0F4CFF] bg-blue-50/70"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={card.imageSrc}
                        alt=""
                        width={640}
                        height={360}
                        aria-hidden="true"
                        className="h-16 w-20 rounded-[14px] object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-[#081B35]">
                          {card.title}
                        </p>
                        <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">
                          {card.bullets.join(" + ")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  ["20+", "Countries"],
                  ["800+", "Universities"],
                  ["15+", "Years Experience"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-[16px] border border-slate-200 bg-white p-3 text-center shadow-[0_10px_20px_rgba(15,45,91,0.08)]"
                  >
                    <p className="text-lg font-black text-[#0F4CFF]">{value}</p>
                    <p className="mt-1 text-[11px] font-bold text-slate-500">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row xl:flex-col">
                {view === "intro" ? (
                  <SectionButton onClick={() => setView("pathway")} variant="blue">
                    Find My Best MBBS College
                    <ArrowRight className="h-4 w-4" />
                  </SectionButton>
                ) : (
                  <SectionButton onClick={resetFlow} variant="quiet">
                    Restart Finder
                  </SectionButton>
                )}
                <button
                  type="button"
                  onClick={openCounsellingPopup}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[18px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-black text-[#075E59] transition hover:bg-white focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-100"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Talk to counsellor
                </button>
              </div>
            </div>
          </aside>

          <div className="min-w-0">{renderActiveView()}</div>
        </div>
      </div>
    </section>
  );
}
