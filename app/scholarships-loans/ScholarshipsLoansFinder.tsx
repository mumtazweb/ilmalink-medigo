"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Calculator,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileCheck2,
  Search,
  Sparkles,
} from "lucide-react";

import CounsellingActionButton from "../components/CounsellingActionButton";
import {
  scholarshipLoanSchemes,
  type AdmissionType,
  type CommunityCategory,
  type Gender,
  type IncomeBand,
  type ScholarshipLoanScheme,
  type StudentState,
  type StudyDestination,
} from "../data/scholarshipsLoans";

type StudentCommunity = Exclude<CommunityCategory, "All">;

type FinderProfile = {
  destination: StudyDestination;
  state: StudentState;
  community: StudentCommunity;
  gender: Gender;
  class12Percentage: string;
  neetScore: string;
  neetRank: string;
  incomeBand: IncomeBand;
  admissionType: AdmissionType;
  annualTuitionFee: string;
};

type EligibilityStatus =
  | "Strong match"
  | "Possible match"
  | "May not be eligible"
  | "Check official portal";

type ScoredScheme = {
  scheme: ScholarshipLoanScheme;
  score: number;
  status: EligibilityStatus;
  why: string;
};

const studyDestinationOptions: StudyDestination[] = ["India", "Abroad"];

const stateOptions: StudentState[] = [
  "West Bengal",
  "Bihar",
  "Delhi",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Uttar Pradesh",
  "Other State",
];

const communityOptions: StudentCommunity[] = [
  "General",
  "Muslim Minority",
  "Other Minority",
  "SC",
  "ST",
  "OBC",
  "EWS",
  "PwD",
];

const genderOptions: Gender[] = ["Male", "Female", "Other"];

const incomeOptions: IncomeBand[] = [
  "Below â‚¹1 lakh",
  "â‚¹1-2.5 lakh",
  "â‚¹2.5-4.5 lakh",
  "â‚¹4.5-8 lakh",
  "Above â‚¹8 lakh",
];

const admissionTypeOptions: AdmissionType[] = [
  "Government MBBS India",
  "Private MBBS India",
  "MBBS Abroad",
  "Counselling not completed yet",
];

const defaultProfile: FinderProfile = {
  destination: "Abroad",
  state: "Other State",
  community: "General",
  gender: "Female",
  class12Percentage: "",
  neetScore: "",
  neetRank: "",
  incomeBand: "â‚¹2.5-4.5 lakh",
  admissionType: "MBBS Abroad",
  annualTuitionFee: "500000",
};

export const ilmaLink_SUPPORT_CAP = 300000;

const incomeBandMaximums: Record<IncomeBand, number> = {
  "Below â‚¹1 lakh": 100000,
  "â‚¹1-2.5 lakh": 250000,
  "â‚¹2.5-4.5 lakh": 450000,
  "â‚¹4.5-8 lakh": 800000,
  "Above â‚¹8 lakh": 1200000,
};

function toNumber(value: string) {
  const parsed = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatCurrencyINR(amount: number) {
  if (!amount || amount <= 0) return "â‚¹0";

  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(Math.round(amount));
}

export function calculateilmaLinkSupport(
  destination: StudyDestination,
  annualTuitionFee: number
) {
  if (!annualTuitionFee || annualTuitionFee <= 0) return 0;

  const profileRate = destination === "Abroad" ? 0.15 : 0.1;
  return Math.min(
    ilmaLink_SUPPORT_CAP,
    Math.round(annualTuitionFee * profileRate)
  );
}

export function getIncomeBandValue(incomeBand: IncomeBand) {
  return incomeBandMaximums[incomeBand];
}

function destinationMatches(profile: FinderProfile, scheme: ScholarshipLoanScheme) {
  return scheme.destinationEligibility.includes(profile.destination);
}

function stateMatches(profile: FinderProfile, scheme: ScholarshipLoanScheme) {
  return (
    scheme.eligibleStates.includes("All India") ||
    scheme.eligibleStates.includes(profile.state)
  );
}

function communityMatches(profile: FinderProfile, scheme: ScholarshipLoanScheme) {
  return (
    scheme.eligibleCommunities.includes("All") ||
    scheme.eligibleCommunities.includes(profile.community)
  );
}

function incomeAboveLimit(profile: FinderProfile, scheme: ScholarshipLoanScheme) {
  const limit = scheme.incomeLimit.maxAnnualIncome;
  return limit !== null && getIncomeBandValue(profile.incomeBand) > limit;
}

function admissionMatches(profile: FinderProfile, scheme: ScholarshipLoanScheme) {
  return (
    profile.admissionType === "Counselling not completed yet" ||
    scheme.admissionTypeEligibility.includes(profile.admissionType)
  );
}

function marksMatch(profile: FinderProfile, scheme: ScholarshipLoanScheme) {
  if (!scheme.marksRequirement.minimumPercentage || !profile.class12Percentage) {
    return true;
  }

  return toNumber(profile.class12Percentage) >= scheme.marksRequirement.minimumPercentage;
}

function hasRestrictedState(scheme: ScholarshipLoanScheme) {
  return !scheme.eligibleStates.includes("All India");
}

function hasRestrictedCommunity(scheme: ScholarshipLoanScheme) {
  return !scheme.eligibleCommunities.includes("All");
}

export function scoreScheme(profile: FinderProfile, scheme: ScholarshipLoanScheme) {
  let score = scheme.priorityScore;
  const tuitionFee = toNumber(profile.annualTuitionFee);

  score += destinationMatches(profile, scheme) ? 30 : -80;
  score += stateMatches(profile, scheme)
    ? hasRestrictedState(scheme)
      ? 25
      : 8
    : -24;
  score += communityMatches(profile, scheme)
    ? hasRestrictedCommunity(scheme)
      ? 32
      : 8
    : -46;
  score += incomeAboveLimit(profile, scheme) ? -45 : 18;
  score += admissionMatches(profile, scheme) ? 12 : -14;
  score += marksMatch(profile, scheme) ? 8 : -16;

  if (
    profile.gender === "Female" &&
    scheme.genderEligibility === "Female concession may apply"
  ) {
    score += 6;
  }

  if (
    tuitionFee >= 400000 &&
    ["bank loan", "student credit card", "minority finance", "loan"].includes(scheme.type)
  ) {
    score += 8;
  }

  if (
    profile.state === "West Bengal" &&
    profile.community === "Muslim Minority" &&
    scheme.id === "wbmdfc-nmdfc-minority-education-loan"
  ) {
    score += 30;
  }

  if (
    profile.state === "West Bengal" &&
    !["Muslim Minority", "Other Minority"].includes(profile.community) &&
    scheme.id === "west-bengal-student-credit-card"
  ) {
    score += 95;
  }

  if (profile.community === "SC") {
    if (scheme.id === "nsp-post-matric-sc") score += 95;
    if (scheme.id === "top-class-sc") score += 82;
    if (scheme.id === "oasis-west-bengal") score += 38;
  }

  if (profile.community === "ST") {
    if (scheme.id === "nsp-post-matric-st") score += 95;
    if (scheme.id === "top-class-st") score += 82;
    if (scheme.id === "oasis-west-bengal") score += 38;
  }

  if (profile.community === "OBC") {
    if (scheme.id === "pm-yasasvi-obc-ebc-dnt") score += 82;
    if (scheme.id === "oasis-west-bengal") score += 48;
  }

  if (profile.community === "PwD" && scheme.id === "pwd-scholarships") {
    score += 110;
  }

  if (profile.destination === "Abroad") {
    if (scheme.id === "west-bengal-student-credit-card") score += 24;
    if (scheme.id === "wbmdfc-nmdfc-minority-education-loan") score += 24;
    if (scheme.id === "rd-sethna-loan-scholarship") score += 18;
    if (scheme.id === "bank-education-loan-options") score += 18;
    if (scheme.id === "isdb-scholarship" && profile.community === "Muslim Minority") {
      score += 12;
    }
  }

  return score;
}

function getEligibilityStatus(
  profile: FinderProfile,
  scheme: ScholarshipLoanScheme
): EligibilityStatus {
  if (incomeAboveLimit(profile, scheme)) return "May not be eligible";
  if (!destinationMatches(profile, scheme)) return "Check official portal";
  if (!stateMatches(profile, scheme)) return "Check official portal";
  if (!communityMatches(profile, scheme)) return "Check official portal";
  if (!marksMatch(profile, scheme)) return "May not be eligible";
  if (scheme.sourceType === "needs-check") return "Check official portal";

  const exactState = hasRestrictedState(scheme);
  const exactCommunity = hasRestrictedCommunity(scheme);
  return exactState || exactCommunity ? "Strong match" : "Possible match";
}

function getWhyText(profile: FinderProfile, scheme: ScholarshipLoanScheme) {
  if (
    scheme.id === "wbmdfc-nmdfc-minority-education-loan" &&
    profile.state === "West Bengal" &&
    profile.community === "Muslim Minority"
  ) {
    return "WBMDFC / NMDFC Minority Education Loan is often a relevant external support route for eligible West Bengal minority students. Final eligibility depends on income, documents, course and official verification.";
  }

  if (
    scheme.id === "west-bengal-student-credit-card" &&
    profile.state === "West Bengal" &&
    !["Muslim Minority", "Other Minority"].includes(profile.community)
  ) {
    return "West Bengal Student Credit Card may be one of the most practical education-loan routes because it supports higher education within India and outside India for eligible West Bengal students.";
  }

  if (profile.community === "SC" && scheme.tags.includes("SC")) {
    return "Category-based government scholarships through NSP or state portals may be relevant. Final eligibility depends on income, institution, course, category certificate and official portal rules.";
  }

  if (getIncomeBandValue(profile.incomeBand) > 800000) {
    return "Some income-based scholarships may not be available based on your selected income band. Bank education loan options and ilmaLink support may still be checked.";
  }

  const matchedReasons = [
    destinationMatches(profile, scheme) ? `${profile.destination} route` : "check destination rules",
    stateMatches(profile, scheme) ? `${profile.state} fit` : "state rules need checking",
    communityMatches(profile, scheme) ? `${profile.community} fit` : "community rules need checking",
  ];

  return `${scheme.shortTitle} may be useful because it has a ${matchedReasons.join(", ")}. Final eligibility is subject to official verification.`;
}

function toScoredScheme(profile: FinderProfile, scheme: ScholarshipLoanScheme): ScoredScheme {
  return {
    scheme,
    score: scoreScheme(profile, scheme),
    status: getEligibilityStatus(profile, scheme),
    why: getWhyText(profile, scheme),
  };
}

export function getBestExternalSupport(
  profile: FinderProfile,
  schemes: ScholarshipLoanScheme[]
) {
  return schemes
    .filter((scheme) => !scheme.isInternalilmaLinkSupport)
    .map((scheme) => toScoredScheme(profile, scheme))
    .sort((a, b) => b.score - a.score)[0];
}

export function getOtherMatches(
  profile: FinderProfile,
  schemes: ScholarshipLoanScheme[],
  bestExternalId: string
) {
  return schemes
    .filter(
      (scheme) =>
        !scheme.isInternalilmaLinkSupport && scheme.id !== bestExternalId
    )
    .map((scheme) => toScoredScheme(profile, scheme))
    .sort((a, b) => b.score - a.score);
}

function Badge({
  children,
  tone = "slate",
}: {
  children: React.ReactNode;
  tone?: "blue" | "emerald" | "amber" | "rose" | "slate" | "violet";
}) {
  const toneClass = {
    amber: "bg-amber-50 text-amber-800 ring-amber-200",
    blue: "bg-blue-50 text-blue-800 ring-blue-200",
    emerald: "bg-emerald-50 text-emerald-800 ring-emerald-200",
    rose: "bg-rose-50 text-rose-800 ring-rose-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    violet: "bg-violet-50 text-violet-800 ring-violet-200",
  }[tone];

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ${toneClass}`}>
      {children}
    </span>
  );
}

function StatusBadge({ status }: { status: EligibilityStatus }) {
  const tone =
    status === "Strong match"
      ? "emerald"
      : status === "Possible match"
        ? "blue"
        : status === "May not be eligible"
          ? "rose"
          : "amber";

  return <Badge tone={tone}>{status}</Badge>;
}

function FieldShell({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="text-xs font-extrabold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
}) {
  return (
    <FieldShell id={id} label={label}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 shadow-sm outline-none transition focus:border-[#00C896] focus:ring-3 focus:ring-[#00C896]/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function NumberField({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <FieldShell id={id} label={label}>
      <input
        id={id}
        type="number"
        min="0"
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="min-h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#00C896] focus:ring-3 focus:ring-[#00C896]/10"
      />
    </FieldShell>
  );
}

function SchemeBadges({ scheme }: { scheme: ScholarshipLoanScheme }) {
  const destinationTone = scheme.applicableFor === "Both" ? "emerald" : "blue";

  return (
    <div className="flex flex-wrap gap-2">
      <Badge tone={destinationTone}>{scheme.applicableFor}</Badge>
      <Badge tone={scheme.type.includes("loan") || scheme.type === "student credit card" ? "amber" : "blue"}>
        {scheme.type}
      </Badge>
      {scheme.eligibleStates.includes("West Bengal") ? (
        <Badge tone="violet">West Bengal</Badge>
      ) : null}
      {scheme.eligibleCommunities.includes("Muslim Minority") ||
      scheme.eligibleCommunities.includes("Other Minority") ? (
        <Badge tone="emerald">Minority</Badge>
      ) : null}
      <Badge tone={scheme.sourceType === "official" ? "emerald" : "amber"}>
        {scheme.sourceType === "official" ? "Official route" : "Check eligibility"}
      </Badge>
    </div>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold leading-6 text-slate-800">
        {value}
      </dd>
    </div>
  );
}

function ExternalSupportCard({
  scored,
  featured = false,
}: {
  scored: ScoredScheme;
  featured?: boolean;
}) {
  const { scheme, status, why } = scored;
  const visibleDocuments = scheme.documents.slice(0, featured ? 5 : 3);

  return (
    <article
      className={`min-w-0 rounded-lg border bg-white p-4 shadow-sm ${
        featured
          ? "border-blue-200 shadow-[0_14px_34px_rgba(37,99,235,0.1)]"
          : "border-slate-200"
      }`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#047857]">
            {featured ? "Best External Match" : "Matched Option"}
          </p>
          <h3 className="mt-1 text-lg font-extrabold leading-6 text-slate-950">
            {scheme.title}
          </h3>
          {featured ? (
            <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-amber-700">
              Subject to approval
            </p>
          ) : null}
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="mt-3">
        <SchemeBadges scheme={scheme} />
      </div>

      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
        {why}
      </p>

      <dl className="mt-4 grid gap-2 sm:grid-cols-3">
        <FactRow label="Maximum support" value={scheme.maxAmount} />
        <FactRow label="Interest rate" value={scheme.interestRate} />
        <FactRow label="Income criteria" value={scheme.incomeLimit.label} />
      </dl>

      <details className="group mt-3 rounded-lg border border-slate-200 bg-slate-50">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 text-sm font-extrabold text-slate-900">
          <span className="flex items-center gap-2">
            <FileCheck2 size={15} className="text-[#047857]" />
            Documents & terms
          </span>
          <ChevronRight size={15} className="transition group-open:rotate-90" />
        </summary>
        <div className="border-t border-slate-200 px-3 py-3">
          <dl className="grid gap-2 sm:grid-cols-3">
            <FactRow
              label="Community"
              value={
                scheme.eligibleCommunities.includes("All")
                  ? "All communities"
                  : scheme.eligibleCommunities.join(", ")
              }
            />
            <FactRow
              label="State"
              value={
                scheme.eligibleStates.includes("All India")
                  ? "All India"
                  : scheme.eligibleStates.join(", ")
              }
            />
            <FactRow label="Repayment" value={scheme.repayment} />
          </dl>
          <h4 className="mt-3 flex items-center gap-2 text-sm font-extrabold text-slate-950">
            <FileCheck2 size={16} className="text-[#047857]" />
            Documents usually needed
          </h4>
          <ul className="mt-2 grid gap-1.5 text-sm font-medium leading-5 text-slate-600 sm:grid-cols-2">
            {visibleDocuments.map((document) => (
              <li key={document} className="flex gap-2">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#00A876]" />
                <span>{document}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <a
          href={scheme.applyRoute || scheme.officialWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#061D3F] px-4 py-2 text-sm font-extrabold !text-white transition hover:bg-[#0B315F]"
          aria-label={`Check official eligibility for ${scheme.title}`}
        >
          Official Link
          <ExternalLink size={16} />
        </a>
        <CounsellingActionButton className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#00C896]/45 bg-[#ECFDF5] px-4 py-2 text-sm font-extrabold text-[#047857] transition hover:bg-[#D1FAE5]">
          Review With ilmaLink
          <ChevronRight size={16} />
        </CounsellingActionButton>
      </div>

      {featured ? (
        <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
          Last checked against official or verified source on {scheme.lastVerifiedDate}.
          Final eligibility remains subject to official verification.
        </p>
      ) : null}
    </article>
  );
}

export default function ScholarshipsLoansFinder() {
  const [profile, setProfile] = useState<FinderProfile>(defaultProfile);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === "#finder") {
        setIsProfileOpen(true);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const annualTuitionFee = toNumber(profile.annualTuitionFee);
  const supportAmount = calculateilmaLinkSupport(
    profile.destination,
    annualTuitionFee
  );

  const externalSchemes = scholarshipLoanSchemes.filter(
    (scheme) => !scheme.isInternalilmaLinkSupport
  );

  const bestExternalCandidate = getBestExternalSupport(profile, externalSchemes);
  const bankFallback = externalSchemes.find(
    (scheme) => scheme.id === "bank-education-loan-options"
  );
  const bestExternal =
    bestExternalCandidate &&
    ["Strong match", "Possible match"].includes(bestExternalCandidate.status)
      ? bestExternalCandidate
      : bankFallback
        ? toScoredScheme(profile, bankFallback)
        : bestExternalCandidate;

  const updateProfile = <K extends keyof FinderProfile>(
    key: K,
    value: FinderProfile[K]
  ) => {
    setProfile((current) => {
      const next = { ...current, [key]: value };

      if (key === "destination") {
        next.admissionType =
          value === "Abroad" ? "MBBS Abroad" : "Private MBBS India";
      }

      return next;
    });
  };

  const runSearch = () => {
    setIsProfileOpen(true);
    setHasSearched(true);
  };

  return (
    <section id="finder" className="scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#047857]">
              Profile Match
            </p>
            <h2 className="mt-1 text-xl font-extrabold tracking-normal text-slate-950 md:text-2xl">
              Find the best support route
            </h2>
          </div>
          <p className="max-w-xl text-xs font-semibold leading-5 text-slate-500">
            Fill the profile, press Find, and ilmaLink will help compare the
            strongest official route.
          </p>
        </div>

        {!isProfileOpen ? (
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h3 className="text-lg font-extrabold text-slate-950">
                  Start with your student profile
                </h3>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-600">
                  Enter the details once and compare ilmaLink support with the
                  strongest official route.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 lg:min-w-[420px]">
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(true)}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#061D3F,#0B315F)] px-4 py-2.5 text-sm font-extrabold !text-white shadow-[0_14px_28px_rgba(6,29,63,0.22)] transition hover:-translate-y-0.5"
                >
                  Find My Support
                  <ChevronRight size={16} />
                </button>
                <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#00C896]/45 bg-[#ECFDF5] px-4 py-2.5 text-sm font-extrabold text-[#047857] transition hover:-translate-y-0.5">
                  Request Guidance
                  <ChevronRight size={16} />
                </CounsellingActionButton>
              </div>
            </div>
          </div>
        ) : (
          <>
            <form
              className="rounded-lg border border-slate-200 bg-white/95 p-3 shadow-[0_14px_34px_rgba(15,23,42,0.07)] sm:p-4"
              onSubmit={(event) => {
                event.preventDefault();
                runSearch();
              }}
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#061D3F] text-white">
                  <Search size={18} />
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-950">
                  Student Profile
                </h3>
                <p className="text-[11px] font-semibold text-slate-500">
                  Enter details and find matching support.
                </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <SelectField
                  id="study-destination"
                  label="Study destination"
                  value={profile.destination}
                  options={studyDestinationOptions}
                  onChange={(value) => updateProfile("destination", value)}
                />
                <SelectField
                  id="student-state"
                  label="Student state"
                  value={profile.state}
                  options={stateOptions}
                  onChange={(value) => updateProfile("state", value)}
                />
                <SelectField
                  id="community-category"
                  label="Community/category"
                  value={profile.community}
                  options={communityOptions}
                  onChange={(value) => updateProfile("community", value)}
                />
                <SelectField
                  id="student-gender"
                  label="Gender"
                  value={profile.gender}
                  options={genderOptions}
                  onChange={(value) => updateProfile("gender", value)}
                />
                <NumberField
                  id="class-12-percentage"
                  label="Class 12 percentage"
                  value={profile.class12Percentage}
                  placeholder="Optional"
                  onChange={(value) => updateProfile("class12Percentage", value)}
                />
                <NumberField
                  id="neet-score"
                  label="NEET score"
                  value={profile.neetScore}
                  placeholder="Optional"
                  onChange={(value) => updateProfile("neetScore", value)}
                />
                <NumberField
                  id="neet-rank"
                  label="NEET rank"
                  value={profile.neetRank}
                  placeholder="Optional"
                  onChange={(value) => updateProfile("neetRank", value)}
                />
                <SelectField
                  id="family-income"
                  label="Family annual income"
                  value={profile.incomeBand}
                  options={incomeOptions}
                  onChange={(value) => updateProfile("incomeBand", value)}
                />
                <SelectField
                  id="admission-type"
                  label="Admission type"
                  value={profile.admissionType}
                  options={admissionTypeOptions}
                  onChange={(value) => updateProfile("admissionType", value)}
                />
                <NumberField
                  id="annual-tuition-fee"
                  label="Annual tuition fee"
                  value={profile.annualTuitionFee}
                  placeholder="Example: 500000"
                  required
                  onChange={(value) => updateProfile("annualTuitionFee", value)}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:max-w-xl">
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#061D3F,#0B315F)] px-4 py-2.5 text-sm font-extrabold !text-white shadow-[0_14px_28px_rgba(6,29,63,0.22)] transition hover:-translate-y-0.5"
                >
                  Find Results
                  <ChevronRight size={16} />
                </button>
                <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#00C896]/45 bg-[#ECFDF5] px-4 py-2.5 text-sm font-extrabold text-[#047857] transition hover:-translate-y-0.5">
                  Request Guidance
                  <ChevronRight size={16} />
                </CounsellingActionButton>
              </div>
            </form>

            <div className="min-w-0" aria-live="polite">
              {hasSearched ? (
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <article className="min-w-0 rounded-lg border border-emerald-200 bg-white p-4 shadow-[0_14px_34px_rgba(0,200,150,0.1)]">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#047857]">
                          ilmaLink Support
                        </p>
                        <h3 className="mt-1 text-lg font-extrabold leading-6 text-slate-950">
                          Scholarship & Fee Support
                        </h3>
                        <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#047857]">
                          ilmaLink end-to-end assisted
                        </p>
                      </div>
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#047857] ring-1 ring-emerald-200">
                        <Calculator size={18} />
                      </span>
                    </div>

                    <div className="mt-4 rounded-lg bg-gradient-to-br from-[#ECFDF5] via-white to-blue-50 p-4 ring-1 ring-emerald-100">
                      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-600">
                        Possible maximum
                      </p>
                      <p className="mt-1 text-3xl font-black text-[#061D3F]">
                        Up to INR 3,00,000
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">
                        Current profile indication:{" "}
                        <span className="font-extrabold text-slate-950">
                          {formatCurrencyINR(supportAmount)}
                        </span>
                      </p>
                    </div>

                    <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                      ilmaLink will assist end-to-end to secure eligible
                      admission-linked support for students processed through
                      ilmaLink.
                    </p>

                    <div className="mt-3 grid gap-2 text-xs font-bold text-emerald-900 sm:grid-cols-3">
                      <span className="rounded-lg bg-emerald-50 px-3 py-2 ring-1 ring-emerald-200">
                        End-to-end help
                      </span>
                      <span className="rounded-lg bg-emerald-50 px-3 py-2 ring-1 ring-emerald-200">
                        Document support
                      </span>
                      <span className="rounded-lg bg-emerald-50 px-3 py-2 ring-1 ring-emerald-200">
                        Fee support review
                      </span>
                    </div>

                    <CounsellingActionButton className="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#00C896] to-[#0EA5A4] px-4 py-2 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(0,200,150,0.2)] transition hover:-translate-y-0.5">
                      Request Support Review
                      <ChevronRight size={16} />
                    </CounsellingActionButton>
                  </article>

                  {bestExternal ? (
                    <ExternalSupportCard scored={bestExternal} featured />
                  ) : null}
                </div>
              ) : (
                <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm font-semibold leading-6 text-slate-600">
                  Fill the profile and click{" "}
                  <span className="font-extrabold text-slate-950">
                    Find Results
                  </span>{" "}
                  to show your best two support cards: ilmaLink support and one
                  official route subject to approval.
                </div>
              )}
            </div>
          </>
        )}

        <section className="mt-6 overflow-hidden rounded-lg border border-[#00C896]/30 bg-[#061D3F] text-white shadow-[0_18px_44px_rgba(6,29,63,0.16)]">
          <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#5EEAD4]">
                <Sparkles size={16} />
                Need help choosing?
              </p>
              <h2 className="mt-2 text-xl font-extrabold md:text-2xl">
                Let ilmaLink review your route before you commit fees.
              </h2>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">
                Profile review, official-route shortlist, document checklist and
                admission-linked support check.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[520px]">
              <CounsellingActionButton className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#00C896] px-4 py-2 text-sm font-extrabold text-[#061D3F] transition hover:bg-[#12dfad]">
                Request Scholarship Review
                <ChevronRight size={16} />
              </CounsellingActionButton>
              <CounsellingActionButton className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-extrabold text-white transition hover:bg-white/15">
                Talk to Counsellor
                <ChevronRight size={16} />
              </CounsellingActionButton>
              <Link
                href="/mbbs-abroad"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white px-4 py-2 text-sm font-extrabold text-[#061D3F] transition hover:bg-slate-100"
              >
                Check MBBS Countries
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

