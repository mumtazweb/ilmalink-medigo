"use client";

import Image from "next/image";
import { type ReactNode, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  GraduationCap,
  Globe2,
  Info,
  Landmark,
  PlaneTakeoff,
  ShieldCheck,
  Trophy,
  WalletCards,
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

type Tone = "blue" | "teal";

const trustChips = ["India or Abroad", "Budget-based", "Quick guidance"];

const finderStats = [
  { label: "Countries", value: "20+", icon: Globe2 },
  { label: "Universities", value: "800+", icon: Building2 },
  { label: "Students Guided", value: "1L+", icon: GraduationCap },
  { label: "Years Experience", value: "15+", icon: BadgeCheck },
];

const pathwayCards = [
  {
    pathway: "india" as const,
    title: "MBBS in India",
    bullets: ["NEET score/rank", "Domicile state", "Budget"],
    imageSrc: "/home/mbbs-college-finder/india-campus-premium.webp",
    icon: Landmark,
    tone: "blue" as const,
  },
  {
    pathway: "abroad" as const,
    title: "MBBS Abroad",
    bullets: ["NEET qualified", "Budget"],
    imageSrc: "/home/mbbs-college-finder/abroad-globe-plane-premium.webp",
    icon: Globe2,
    tone: "teal" as const,
  },
];

const toneClasses = {
  blue: {
    border: "border-blue-100",
    icon: "border-blue-100 bg-blue-50 text-[#0F4CFF]",
    text: "text-[#0F4CFF]",
    button: "bg-[#0F4CFF] text-white shadow-[0_10px_22px_rgba(15,76,255,0.24)]",
    soft: "border-blue-100 bg-blue-50 text-[#0F4CFF]",
    card:
      "border-blue-200 bg-[linear-gradient(145deg,#ffffff_0%,#eff6ff_58%,#f8fbff_100%)] text-[#0F4CFF]",
  },
  teal: {
    border: "border-teal-100",
    icon: "border-teal-100 bg-teal-50 text-[#058c83]",
    text: "text-[#058c83]",
    button: "bg-[#058c83] text-white shadow-[0_10px_22px_rgba(5,140,131,0.23)]",
    soft: "border-teal-100 bg-teal-50 text-[#058c83]",
    card:
      "border-teal-200 bg-[linear-gradient(145deg,#ffffff_0%,#ecfffb_58%,#f8fffd_100%)] text-[#058c83]",
  },
};

function getOptionLabel(options: FinderOption[], value: string, fallback: string) {
  return options.find((option) => option.value === value)?.label ?? fallback;
}

function FinderPanel({
  children,
  tone = "blue",
  wide = false,
}: {
  children: ReactNode;
  tone?: Tone;
  wide?: boolean;
}) {
  return (
    <article
      className={`relative mx-auto w-full overflow-hidden rounded-[18px] border bg-white p-3 shadow-[0_18px_45px_rgba(15,45,91,0.11)] sm:p-5 ${
        toneClasses[tone].border
      } ${wide ? "max-w-[430px] sm:max-w-5xl" : "max-w-[430px] sm:max-w-3xl"}`}
    >
      {children}
    </article>
  );
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
      <span className="mb-1.5 block text-[12px] font-black text-[#0B1D39]">
        {label}
      </span>
      {children}
    </label>
  );
}

function StepProgress({
  total,
  active,
  tone = "blue",
}: {
  total: number;
  active: number;
  tone?: Tone;
}) {
  return (
    <div
      aria-hidden="true"
      className="mx-auto mt-4 flex w-full max-w-[220px] items-center justify-center"
    >
      {Array.from({ length: total }, (_, index) => {
        const step = index + 1;
        const isActive = step === active;
        const isPast = step < active;

        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12px] font-black ${
                isActive || isPast
                  ? `${toneClasses[tone].button} border-transparent`
                  : "border-slate-200 bg-white text-slate-500"
              }`}
            >
              {step}
            </span>
            {step < total && (
              <span
                className={`mx-2 h-px flex-1 ${
                  isPast ? "bg-[#0F4CFF]" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function InfoBox({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <div
      className={`flex gap-2 rounded-[10px] border p-3 text-[12px] font-semibold leading-5 ${toneClasses[tone].soft}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
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
  variant?: Tone | "quiet";
  type?: "button" | "submit";
}) {
  const variantClass =
    variant === "quiet"
      ? "border-slate-200 bg-white text-[#0B1D39] shadow-[0_8px_16px_rgba(15,45,91,0.08)]"
      : `${toneClasses[variant].button} border-transparent`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[10px] border px-4 py-2.5 text-[13px] font-black transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100 ${variantClass}`}
    >
      {children}
    </button>
  );
}

function SummaryChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-[8px] border border-blue-100 bg-white px-2 py-2 text-center shadow-[0_8px_16px_rgba(15,45,91,0.07)]">
      <p className="truncate text-[9px] font-black text-slate-500">{label}</p>
      <p className="mt-0.5 truncate text-[12px] font-black text-[#071B44]">
        {value}
      </p>
    </div>
  );
}

function RoundBackButton({
  onClick,
  label,
  tone = "blue",
}: {
  onClick: () => void;
  label: string;
  tone?: Tone;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100 ${toneClasses[tone].soft}`}
    >
      <ArrowLeft className="h-4 w-4" />
    </button>
  );
}

function FinderHeader({
  title,
  subtitle,
  tone = "blue",
  icon,
  onBack,
}: {
  title: string;
  subtitle?: string;
  tone?: Tone;
  icon: ReactNode;
  onBack?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border shadow-[0_8px_18px_rgba(15,45,91,0.09)] ${toneClasses[tone].icon}`}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className={`text-[20px] font-black leading-6 ${toneClasses[tone].text}`}>
            {title}
          </h3>
          {subtitle && (
            <p className="mt-0.5 text-[11px] font-semibold text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {onBack && (
        <RoundBackButton
          onClick={onBack}
          label="Change pathway"
          tone={tone}
        />
      )}
    </div>
  );
}

function ResultSectionTitle({
  children,
  icon,
}: {
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <p className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-[12px] font-black text-[#0B1D39]">
      {icon}
      {children}
    </p>
  );
}

function BestFitCard({
  label,
  name,
  fit,
  reason,
  imageSrc,
  tone = "blue",
}: {
  label: string;
  name: string;
  fit?: string;
  reason: string;
  imageSrc: string;
  tone?: Tone;
}) {
  return (
    <article className="min-w-0 overflow-hidden rounded-[10px] border border-slate-200 bg-white shadow-[0_10px_20px_rgba(15,45,91,0.08)]">
      <div className="relative h-[70px] sm:h-28">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 50vw, 320px"
          aria-hidden="true"
          className="object-cover"
        />
        <span
          className={`absolute left-0 top-0 rounded-br-[8px] px-2 py-1 text-[9px] font-black text-white ${toneClasses[tone].button}`}
        >
          {label}
        </span>
      </div>
      <div className="p-2 text-center sm:p-3">
        <h4 className="text-[12px] font-black leading-4 text-[#071B44] sm:text-base sm:leading-5">
          {name}
        </h4>
        {fit && (
          <p className="mx-auto mt-1 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black text-emerald-700 sm:text-[11px]">
            {fit}
          </p>
        )}
        <p className="mt-1.5 text-[10px] font-semibold leading-4 text-slate-600 sm:text-[12px] sm:leading-5">
          <span className="font-black text-[#0B1D39]">Why: </span>
          {reason}
        </p>
      </div>
    </article>
  );
}

function BackupFitCard({
  name,
  fit,
  reason,
  imageSrc,
}: {
  name: string;
  fit?: string;
  reason: string;
  imageSrc?: string;
}) {
  return (
    <article className="min-w-0 overflow-hidden rounded-[8px] border border-slate-200 bg-white text-center shadow-[0_8px_16px_rgba(15,45,91,0.07)]">
      {imageSrc && (
        <div className="relative h-11 sm:h-16">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 640px) 33vw, 220px"
            aria-hidden="true"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-2">
        <h4 className="text-[10px] font-black leading-3 text-[#071B44] sm:text-[12px] sm:leading-4">
          {name}
        </h4>
        {fit && (
          <p className="mt-1 text-[9px] font-black text-[#058c83]">{fit}</p>
        )}
        <p className="mt-1 text-[9px] font-semibold leading-3 text-slate-600 sm:text-[11px] sm:leading-4">
          <span className="font-black text-[#0B1D39]">Why: </span>
          {reason}
        </p>
      </div>
    </article>
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

  const selectedCollegeRecommendation = useMemo(
    () => abroadCollegeRecommendations[selectedCountry],
    [selectedCountry],
  );
  const domicileLabel = getOptionLabel(
    domicileStateOptions,
    domicileState,
    "West Bengal",
  );
  const indiaBudgetLabel = getOptionLabel(
    indiaBudgetOptions,
    indiaBudget,
    "Rs. 30-50 lakh",
  );
  const abroadBudgetLabel = getOptionLabel(
    abroadBudgetOptions,
    abroadBudget,
    "Rs. 20-25 lakh",
  );

  const showPathway = (nextPathway: MbbsFinderPathway) => {
    setPathway(nextPathway);
    setView(nextPathway === "india" ? "india-input" : "abroad-input");
  };

  const renderIntro = () => (
    <article className="relative mx-auto flex min-h-[390px] w-full max-w-[430px] overflow-hidden rounded-[18px] border border-white/80 bg-[#061b46] p-3 text-white shadow-[0_24px_58px_rgba(3,27,70,0.32)] sm:max-w-4xl sm:p-5">
      <Image
        src="/home/mbbs-college-finder/india-campus-premium.webp"
        alt=""
        fill
        priority={false}
        sizes="(max-width: 640px) 100vw, 900px"
        aria-hidden="true"
        className="object-cover opacity-58"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,20,55,0.54)_0%,rgba(6,27,70,0.88)_58%,rgba(4,18,45,0.96)_100%)]" />

      <div className="relative flex min-h-full w-full flex-col justify-center py-4">
        <div className="mx-auto max-w-[330px] text-center">
          <h3 className="text-[28px] font-black leading-[1.08] text-white sm:text-4xl">
            Your MBBS Journey Starts Here
          </h3>
          <p className="mt-2 text-[14px] font-semibold leading-5 text-blue-50 sm:text-base">
            Expert guidance to help you find the best MBBS college, in India or
            abroad.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setView("pathway")}
          className="group relative mx-auto mt-6 inline-flex min-h-13 w-full max-w-[340px] items-center justify-center gap-3 overflow-hidden rounded-full border border-cyan-100/80 bg-[linear-gradient(135deg,#12d6e4_0%,#09adc7_42%,#00C896_100%)] px-5 py-3 text-[15px] font-black text-white shadow-[0_15px_30px_rgba(0,200,150,0.32),0_0_28px_rgba(34,211,238,0.32),inset_0_1px_0_rgba(255,255,255,0.5)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100"
        >
          <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/35 blur-md transition duration-700 group-hover:left-[115%]" />
          <GraduationCap className="relative h-5 w-5" />
          <span className="relative">Find My Best MBBS College</span>
          <ArrowRight className="relative h-5 w-5 transition group-hover:translate-x-1" />
        </button>

        <p className="mt-3 text-center text-[12px] font-semibold text-blue-50">
          {trustChips.join("  |  ")}
        </p>

        <div className="mt-7 grid grid-cols-4 overflow-hidden rounded-[14px] border border-white/85 bg-white/94 text-[#071B44] shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
          {finderStats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`min-w-0 px-1.5 py-2.5 text-center ${
                  index > 0 ? "border-l border-slate-200" : ""
                }`}
              >
                <Icon className="mx-auto h-5 w-5 text-[#0F4CFF]" />
                <p className="mt-1 text-[12px] font-black leading-4">
                  {stat.value}
                </p>
                <p className="text-[8px] font-semibold leading-3 text-slate-600 sm:text-[10px]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );

  const renderPathwaySelection = () => (
    <FinderPanel wide>
      <div className="text-center">
        <h3 className="text-[25px] font-black leading-8 text-[#081B35]">
          MBBS College Finder
        </h3>
        <p className="mt-1 text-[13px] font-semibold text-slate-600">
          Choose your pathway
        </p>
        <span className="mx-auto mt-2 block h-0.5 w-14 rounded-full bg-[#058c83]" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
        {pathwayCards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              type="button"
              key={card.pathway}
              onClick={() => showPathway(card.pathway)}
              aria-pressed={pathway === card.pathway}
              className={`group flex min-h-[262px] min-w-0 flex-col overflow-hidden rounded-[14px] border p-2 text-center shadow-[0_12px_24px_rgba(15,45,91,0.09)] transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-100 sm:min-h-[340px] sm:p-3 ${toneClasses[card.tone].card}`}
            >
              <Image
                src={card.imageSrc}
                alt=""
                width={640}
                height={360}
                aria-hidden="true"
                className="h-24 w-full rounded-[10px] object-cover sm:h-36"
              />
              <div className="flex flex-1 flex-col items-center px-1 py-2">
                <h4 className="flex flex-col items-center gap-1 text-[17px] font-black leading-5 sm:text-2xl">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  {card.title}
                </h4>
                <ul className="mt-3 space-y-1 text-[11px] font-bold leading-4 text-[#17396e] sm:text-sm sm:leading-5">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center justify-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-current" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                <span
                  className={`mt-auto flex h-11 w-11 items-center justify-center rounded-full text-white transition group-hover:translate-x-0.5 ${toneClasses[card.tone].button}`}
                >
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] font-semibold text-slate-500">
        <ShieldCheck className="h-4 w-4 text-[#64748b]" />
        Your data is safe and secure with us.
      </p>
    </FinderPanel>
  );

  const renderIndiaInput = () => (
    <FinderPanel tone="blue">
      <FinderHeader
        title="MBBS in India"
        subtitle="Find your best India options"
        icon={<Landmark className="h-6 w-6" />}
        onBack={() => setView("pathway")}
      />
      <StepProgress total={3} active={1} tone="blue" />

      <form
        className="mt-5 grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setView("india-result");
        }}
      >
        <FormField id="mbbs-finder-india-rank" label="NEET Rank / Score">
          <div className="relative">
            <GraduationCap className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="mbbs-finder-india-rank"
              name="mbbsFinderIndiaRank"
              value={indiaRank}
              onChange={(event) => setIndiaRank(event.target.value)}
              placeholder="Enter your NEET rank or score"
              className="h-11 w-full rounded-[8px] border border-slate-200 bg-white px-3 pr-10 text-[13px] font-bold text-[#081B35] shadow-[0_7px_16px_rgba(15,45,91,0.05)] outline-none focus:border-[#0F4CFF] focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </FormField>

        <FormField id="mbbs-finder-domicile" label="Domicile State">
          <select
            id="mbbs-finder-domicile"
            name="mbbsFinderDomicile"
            value={domicileState}
            onChange={(event) => setDomicileState(event.target.value)}
            className="h-11 w-full rounded-[8px] border border-slate-200 bg-white px-3 text-[13px] font-bold text-[#081B35] shadow-[0_7px_16px_rgba(15,45,91,0.05)] outline-none focus:border-[#0F4CFF] focus:ring-4 focus:ring-blue-100"
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
            className="h-11 w-full rounded-[8px] border border-slate-200 bg-white px-3 text-[13px] font-bold text-[#081B35] shadow-[0_7px_16px_rgba(15,45,91,0.05)] outline-none focus:border-[#0F4CFF] focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Select your budget range</option>
            {indiaBudgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <SectionButton type="submit" variant="blue">
          See My Best Options
          <ArrowRight className="h-4 w-4" />
        </SectionButton>

        <InfoBox tone="blue">
          For India, NEET rank/score, domicile state and budget matter.
        </InfoBox>
      </form>
    </FinderPanel>
  );

  const renderAbroadInput = () => (
    <FinderPanel tone="teal">
      <FinderHeader
        title="MBBS Abroad"
        subtitle="Find your best country matches"
        tone="teal"
        icon={<Globe2 className="h-6 w-6" />}
        onBack={() => setView("pathway")}
      />
      <StepProgress total={2} active={1} tone="teal" />

      <form
        className="mt-5 grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setView("abroad-countries");
        }}
      >
        <div>
          <p className="mb-1.5 text-[12px] font-black text-[#0B1D39]">
            NEET Qualified?
          </p>
          <div
            role="group"
            aria-label="NEET qualified status"
            className="rounded-[8px] border border-emerald-200 bg-white p-1 shadow-[0_7px_16px_rgba(15,45,91,0.05)]"
          >
            <span
              aria-label="Qualified selected"
              className="inline-flex h-10 w-full items-center justify-between rounded-[7px] bg-emerald-50 px-3 text-[13px] font-black text-[#075E59]"
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
            className="h-11 w-full rounded-[8px] border border-slate-200 bg-white px-3 text-[13px] font-bold text-[#081B35] shadow-[0_7px_16px_rgba(15,45,91,0.05)] outline-none focus:border-[#058c83] focus:ring-4 focus:ring-teal-100"
          >
            <option value="">Select your budget range</option>
            {abroadBudgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <SectionButton type="submit" variant="teal">
          See My Best Country Matches
          <ArrowRight className="h-4 w-4" />
        </SectionButton>

        <InfoBox tone="teal">
          For MBBS abroad, NEET qualification and budget matter. No domicile
          factor.
        </InfoBox>
      </form>
    </FinderPanel>
  );

  const renderIndiaResult = () => (
    <FinderPanel wide>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[#0F4CFF]">
            <Landmark className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-[20px] font-black leading-6 text-[#071B44]">
              Your Best India Matches
            </h3>
            <p className="text-[11px] font-semibold text-slate-500">
              Based on your NEET rank, domicile and budget
            </p>
          </div>
        </div>
        <RoundBackButton
          onClick={() => setView("india-input")}
          label="Edit India inputs"
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <SummaryChip
          label="NEET Rank / Score"
          value={indiaRank.trim() || "18,450"}
        />
        <SummaryChip label="Domicile State" value={domicileLabel} />
        <SummaryChip label="Budget" value={indiaBudgetLabel} />
      </div>

      <ResultSectionTitle icon={<Trophy className="h-4 w-4 text-amber-500" />}>
        Top Best Fits
      </ResultSectionTitle>

      <div className="mt-2 grid grid-cols-2 gap-3">
        {indiaTopResults.map((result, index) => (
          <BestFitCard
            key={result.title}
            label={`Best Fit ${index + 1}`}
            name={result.title}
            fit={result.fit}
            reason={result.reason}
            imageSrc={result.imageSrc}
          />
        ))}
      </div>

      <ResultSectionTitle icon={<ShieldCheck className="h-4 w-4 text-[#0F4CFF]" />}>
        Backup Options
      </ResultSectionTitle>

      <div className="mt-2 grid grid-cols-3 gap-2">
        {indiaBackupOptions.map((option) => (
          <BackupFitCard
            key={option.title}
            name={option.title}
            fit={option.fit}
            reason={option.reason}
            imageSrc={option.imageSrc}
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <InfoBox>
          These colleges match your NEET rank, domicile state and stay within
          your specified budget.
        </InfoBox>
        <div className="flex gap-2 rounded-[10px] border border-amber-200 bg-amber-50 p-3 text-[11px] font-semibold leading-4 text-amber-900">
          <WalletCards className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{indiaImportantLogicNote}</p>
        </div>
      </div>
    </FinderPanel>
  );

  const renderAbroadCountryResults = () => (
    <FinderPanel tone="teal">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-teal-50 text-[#058c83]">
            <Globe2 className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-[20px] font-black leading-6 text-[#071B44]">
              Your Best Country Matches
            </h3>
            <p className="text-[11px] font-semibold text-slate-500">
              Based on your NEET qualification and budget
            </p>
          </div>
        </div>
        <RoundBackButton
          onClick={() => setView("abroad-input")}
          label="Edit abroad inputs"
          tone="teal"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <SummaryChip label="NEET Qualified" value="Qualified" />
        <SummaryChip label="Budget" value={abroadBudgetLabel} />
      </div>

      <div className="mt-4 grid gap-2.5">
        {abroadCountryMatches.map((match, index) => (
          <article
            key={match.country}
            className="grid grid-cols-[88px_1fr_32px] items-center gap-2 overflow-hidden rounded-[10px] border border-teal-100 bg-white p-2 shadow-[0_10px_20px_rgba(15,45,91,0.08)]"
          >
            <div className="relative h-[70px] overflow-hidden rounded-[8px]">
              <Image
                src={match.imageSrc}
                alt=""
                fill
                sizes="90px"
                aria-hidden="true"
                className="object-cover"
              />
              <span className="absolute left-0 top-0 rounded-br-[7px] bg-[#058c83] px-1.5 py-0.5 text-[8px] font-black text-white">
                Match {index + 1}
              </span>
            </div>
            <div className="min-w-0">
              <h4 className="truncate text-[14px] font-black text-[#071B44]">
                {match.country}
              </h4>
              <p className="mt-1 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-black text-emerald-700">
                Fit Level: {match.fitLevel}
              </p>
              <p className="mt-1 text-[10px] font-semibold leading-4 text-slate-600">
                {match.reason}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCountry(match.country);
                setView("abroad-colleges");
              }}
              aria-label={`View recommended colleges in ${match.country}`}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#058c83] transition hover:bg-teal-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-100"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </article>
        ))}
      </div>

      <div className="mt-3">
        <InfoBox tone="teal">
          Click any country to see recommended colleges.
        </InfoBox>
      </div>
    </FinderPanel>
  );

  const renderAbroadCollegeResults = () => (
    <FinderPanel tone="teal" wide>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-100 bg-teal-50 text-[#058c83]">
            <PlaneTakeoff className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="text-[20px] font-black leading-6 text-[#071B44]">
              {selectedCountry} - Recommended Colleges
            </h3>
            <p className="text-[11px] font-semibold text-slate-500">
              Based on your NEET qualification and budget
            </p>
          </div>
        </div>
        <RoundBackButton
          onClick={() => setView("abroad-countries")}
          label="Back to country matches"
          tone="teal"
        />
      </div>

      <ResultSectionTitle icon={<Trophy className="h-4 w-4 text-amber-500" />}>
        Top Best Fits
      </ResultSectionTitle>

      <div className="mt-2 grid grid-cols-2 gap-3">
        {selectedCollegeRecommendation.bestFit.slice(0, 2).map((college, index) => (
          <BestFitCard
            key={college.name}
            label={`Best Fit College ${index + 1}`}
            name={college.name}
            reason={college.reason}
            imageSrc={college.imageSrc}
            tone="teal"
          />
        ))}
      </div>

      <ResultSectionTitle icon={<ShieldCheck className="h-4 w-4 text-[#058c83]" />}>
        Backup Colleges
      </ResultSectionTitle>

      <div className="mt-2 grid grid-cols-3 gap-2">
        {selectedCollegeRecommendation.backup.map((college) => (
          <BackupFitCard
            key={college.name}
            name={college.name}
            reason={college.reason}
            imageSrc={college.imageSrc}
          />
        ))}
      </div>

      <div className="mt-3">
        <InfoBox tone="teal">
          Top 2 colleges are shown as best fit. Other colleges are shown as
          backup options.
        </InfoBox>
      </div>
    </FinderPanel>
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
      className="relative isolate scroll-mt-32 overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#eff8ff_48%,#f4fffb_100%)] px-3 pb-10 pt-2 sm:px-6 sm:pb-14 lg:px-8"
    >
      <div className="sr-only">
        <h2 id="mbbs-college-finder-title">MBBS College Finder 2026</h2>
        <p>
          Find your best available MBBS admission pathway in India or abroad
          based on NEET score, domicile, budget and eligibility.
        </p>
        <h3>{mbbsCollegeFinderSeoHeading}</h3>
        {mbbsCollegeFinderSeoParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        {renderActiveView()}
      </div>
    </section>
  );
}
