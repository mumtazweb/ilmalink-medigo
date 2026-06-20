"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BadgeIndianRupee,
  BadgeCheck,
  BaggageClaim,
  BarChart3,
  BrainCircuit,
  BookOpen,
  Building2,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Compass,
  FileCheck2,
  FileBadge,
  FolderOpen,
  Globe2,
  GraduationCap,
  Headset,
  Landmark,
  ListChecks,
  MailCheck,
  MapPin,
  PlaneTakeoff,
  Route,
  Search,
  SearchCheck,
  Send,
  ShieldCheck,
  Sparkles,
  Stamp,
  TrendingUp,
  UserRound,
  WalletCards,
  Workflow,
  X,
} from "lucide-react";
import CounsellingPopup from "./CounsellingPopup";
import FMGEExplorerModal from "./FMGEExplorerModal";
import HeroGlobeV2 from "./HeroGlobeV2";
import NeetRankPredictorTool from "./NeetRankPredictorTool";
import NeetDecisionCenter from "./home/NeetDecisionCenter";
import DecisionIntelligenceSection from "./home/DecisionIntelligenceSection";
import ReadyToMoveSection from "./home/ReadyToMoveSection";
import { countryGeoFacts } from "../data/geo";
import { navbarCountryDestinations } from "../data/navbarDestinations";
import {
  getNeetPathway,
  getNeetPathwayEmptyState,
  getNeetPathwayInvalidState,
} from "../data/neetPathwayGuide";
import { mbbsCostInsights } from "../data/mbbsDecisionIntelligence";

const OPEN_FMGE_EVENT = "ilmalink:open-fmge-explorer";
const OPEN_RANK_PREDICTOR_EVENT = "ilmalink:open-rank-predictor";
const PENDING_FMGE_KEY = "ilmalink-pending-fmge-explorer";

type DestinationCardData = {
  href: string;
  label: string;
  flag: string;
  detail: string;
  cta: string;
  fee?: string;
  semesterFee?: string;
  secondaryText?: string;
  universityCount?: number;
  badges: string[];
};

const destinationCardCopy = {
  detail: "Fees and university guidance on the country page",
  cta: "Open country",
};

const countryWdomsCountByHref = new Map(
  countryGeoFacts.map((country) => [
    country.slug === "india" ? "/mbbs-india" : `/mbbs-abroad/${country.slug}`,
    country.wdomsCount,
  ])
);

// TODO: add verified semester fee/university count from country page where missing.
const verifiedDestinationMeta: Partial<
  Record<
    string,
    Pick<
      DestinationCardData,
      "fee" | "semesterFee" | "secondaryText" | "universityCount" | "badges"
    >
  >
> = {
  "/mbbs-india": {
    semesterFee: "₹ 10 L/Semester",
    universityCount: 823,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/kyrgyzstan": {
    semesterFee: "₹ 1.8L/Semester",
    universityCount: 32,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/georgia": {
    fee: "EEU tuition approx Rs. 28L",
    semesterFee: "USD 2,750/Semester",
    universityCount: 39,
    badges: ["EEU", "FMGE", "English"],
  },
  "/mbbs-abroad/russia": {
    fee: "Rs. 28-45 Lakhs Total",
    semesterFee: "₹ 2.5L/Semester",
    universityCount: 102,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/bangladesh": {
    fee: "Rs. 25-40 Lakhs Total",
    semesterFee: "₹ 3L/Semester",
    universityCount: 110,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/nepal": {
    semesterFee: "₹ 5L/Semester",
    universityCount: 21,
    badges: ["PCB 50%", "Limited"],
  },
  "/mbbs-abroad/uzbekistan": {
    fee: "Rs. 20-35 Lakhs Total",
    semesterFee: "₹ 2.0L/Semester",
    universityCount: 39,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/kazakhstan": {
    fee: "Rs. 22-35 Lakhs Total",
    semesterFee: "₹ 2.2L/Semester",
    universityCount: 15,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/tajikistan": {
    fee: "Rs. 18-30 Lakhs Total",
    semesterFee: "₹ 1.8L/Semester",
    universityCount: 5,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/malaysia": {
    semesterFee: "₹ 4.5L/Semester",
    universityCount: 33,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/egypt": {
    fee: "Rs. 18-30 Lakhs Total",
    semesterFee: "₹ 2.4L/Semester",
    universityCount: 57,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/saudi-arabia": {
    fee: "Rs. 60 Lakhs-1.2 Crores+",
    semesterFee: "₹ 10L/Semester",
    universityCount: 40,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/qatar": {
    fee: "Rs. 1.5-3+ Crores",
    semesterFee: "₹ 12L/Semester",
    universityCount: 2,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/uae": {
    fee: "Rs. 60 Lakhs-1.2 Crore+",
    semesterFee: "₹ 7L/Semester",
    universityCount: 12,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/iran": {
    fee: "Rs. 25-55 Lakhs Total",
    semesterFee: "₹ 1.5L/Semester",
    universityCount: 55,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/usa": {
    fee: "Rs. 45-65 Lakhs/year",
    semesterFee: "₹ 25L/Semester",
    universityCount: 160,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/canada": {
    fee: "Rs. 35-55 Lakhs/year",
    semesterFee: "₹ 20L/Semester",
    universityCount: 17,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/australia": {
    fee: "Rs. 40-60 Lakhs/year",
    semesterFee: "₹ 22L/Semester",
    universityCount: 26,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/new-zealand": {
    fee: "Rs. 28-35 Lakhs/year",
    semesterFee: "₹ 18L/Semester",
    universityCount: 2,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/uk": {
    fee: "Rs. 45-60 Lakhs/year",
    semesterFee: "₹ 24L/Semester",
    universityCount: 46,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/germany": {
    semesterFee: "₹ Zero tuition Fees",
    universityCount: 48,
    badges: ["FMGE"],
  },
  "/mbbs-abroad/vietnam": {
    fee: "Rs. 25-30 Lakhs Total",
    semesterFee: "₹ 3.0L/Semester",
    universityCount: 29,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/singapore": {
    fee: "Rs. 1.5-3+ Crores",
    semesterFee: "₹ 20L/Semester",
    universityCount: 3,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/barbados": {
    fee: "Rs. 50-55 Lakhs Total",
    semesterFee: "₹ 4L/Semester",
    universityCount: 9,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/china": {
    fee: "Rs. 25-30 Lakhs Total",
    semesterFee: "₹ 2.0L/Semester",
    universityCount: 179,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/armenia": {
    fee: "Rs. 35-40 Lakhs Total",
    semesterFee: "₹ 2.4L/Semester",
    universityCount: 9,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/oman": {
    fee: "Rs. 1-1.6 Crores Total",
    semesterFee: "₹ 6L/Semester",
    universityCount: 3,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/philippines": {
    fee: "Rs. 25-30 Lakhs Total",
    semesterFee: "₹ 2.0L/Semester",
    universityCount: 58,
    badges: ["WDOMS-listed", "English"],
  },
  "/mbbs-abroad/ukraine": {
    fee: "Rs. 27-32 Lakhs Total",
    semesterFee: "₹ 2.2L/Semester",
    universityCount: 37,
    badges: ["WDOMS-listed", "English"],
  },
};

const localDestinationRoutes = [
  { href: "/mbbs-india", label: "India", flag: "in" },
];

const extraDestinationRoutes = [
  { href: "/mbbs-abroad/armenia", label: "Armenia", flag: "am" },
  { href: "/mbbs-abroad/azerbaijan", label: "Azerbaijan", flag: "az" },
  { href: "/mbbs-abroad/belarus", label: "Belarus", flag: "by" },
  { href: "/mbbs-abroad/belize", label: "Belize", flag: "bz" },
  { href: "/mbbs-abroad/bulgaria", label: "Bulgaria", flag: "bg" },
  { href: "/mbbs-abroad/china", label: "China", flag: "cn" },
  { href: "/mbbs-abroad/curacao", label: "Curacao", flag: "cw" },
  { href: "/mbbs-abroad/czech-republic", label: "Czech Republic", flag: "cz" },
  { href: "/mbbs-abroad/grenada", label: "Grenada", flag: "gd" },
  { href: "/mbbs-abroad/guyana", label: "Guyana", flag: "gy" },
  { href: "/mbbs-abroad/hungary", label: "Hungary", flag: "hu" },
  { href: "/mbbs-abroad/ireland", label: "Ireland", flag: "ie" },
  { href: "/mbbs-abroad/italy", label: "Italy", flag: "it" },
  { href: "/mbbs-abroad/jamaica", label: "Jamaica", flag: "jm" },
  { href: "/mbbs-abroad/latvia", label: "Latvia", flag: "lv" },
  { href: "/mbbs-abroad/lithuania", label: "Lithuania", flag: "lt" },
  { href: "/mbbs-abroad/mauritius", label: "Mauritius", flag: "mu" },
  { href: "/mbbs-abroad/netherlands", label: "Netherlands", flag: "nl" },
  { href: "/mbbs-abroad/oman", label: "Oman", flag: "om" },
  { href: "/mbbs-abroad/pakistan", label: "Pakistan", flag: "pk" },
  { href: "/mbbs-abroad/papua-new-guinea", label: "Papua New Guinea", flag: "pg" },
  { href: "/mbbs-abroad/philippines", label: "Philippines", flag: "ph" },
  { href: "/mbbs-abroad/poland", label: "Poland", flag: "pl" },
  { href: "/mbbs-abroad/republic-of-moldova", label: "Republic of Moldova", flag: "md" },
  { href: "/mbbs-abroad/romania", label: "Romania", flag: "ro" },
  { href: "/mbbs-abroad/saba", label: "Saba", flag: "bq" },
  { href: "/mbbs-abroad/saint-kitts-and-nevis", label: "Saint Kitts and Nevis", flag: "kn" },
  { href: "/mbbs-abroad/saint-lucia", label: "Saint Lucia", flag: "lc" },
  { href: "/mbbs-abroad/serbia", label: "Serbia", flag: "rs" },
  { href: "/mbbs-abroad/ukraine", label: "Ukraine", flag: "ua" },
  { href: "/mbbs-abroad/united-republic-of-tanzania", label: "Tanzania", flag: "tz" },
  { href: "/mbbs-abroad/vietnam", label: "Vietnam", flag: "vn" },
  { href: "/mbbs-abroad/singapore", label: "Singapore", flag: "sg" },
  { href: "/mbbs-abroad/barbados", label: "Barbados", flag: "bb" },
  { href: "/mbbs-abroad/antigua-and-barbuda", label: "Antigua and Barbuda", flag: "ag" },
  { href: "/mbbs-abroad/aruba", label: "Aruba", flag: "aw" },
];

const destinationSourceData: DestinationCardData[] = [
  ...localDestinationRoutes.map((destination) => ({
    ...destination,
    ...(verifiedDestinationMeta[destination.href] ?? { badges: [] }),
    ...destinationCardCopy,
  })),
  ...navbarCountryDestinations.map(({ href, label, flag, insight }) => ({
    href,
    label,
    flag,
    ...(verifiedDestinationMeta[href] ?? { badges: [] }),
    detail: insight,
    cta: destinationCardCopy.cta,
  })),
  ...extraDestinationRoutes.map((destination) => ({
    ...destination,
    ...(verifiedDestinationMeta[destination.href] ?? { badges: ["FMGE"] }),
    ...destinationCardCopy,
  })),
];

const destinationOrder = [
  "/mbbs-india",
  "/mbbs-abroad/kyrgyzstan",
  "/mbbs-abroad/georgia",
  "/mbbs-abroad/bangladesh",
  "/mbbs-abroad/nepal",
  "/mbbs-abroad/tajikistan",
  "/mbbs-abroad/china",
  "/mbbs-abroad/russia",
  "/mbbs-abroad/uzbekistan",
  "/mbbs-abroad/armenia",
  "/mbbs-abroad/kazakhstan",
  "/mbbs-abroad/malaysia",
  "/mbbs-abroad/egypt",
  "/mbbs-abroad/saudi-arabia",
  "/mbbs-abroad/qatar",
  "/mbbs-abroad/uae",
  "/mbbs-abroad/iran",
  "/mbbs-abroad/usa",
  "/mbbs-abroad/canada",
  "/mbbs-abroad/australia",
  "/mbbs-abroad/new-zealand",
  "/mbbs-abroad/uk",
  "/mbbs-abroad/germany",
  "/mbbs-abroad/vietnam",
  "/mbbs-abroad/singapore",
  "/mbbs-abroad/barbados",
  "/mbbs-abroad/antigua-and-barbuda",
  "/mbbs-abroad/aruba",
  "/mbbs-abroad/azerbaijan",
  "/mbbs-abroad/belarus",
  "/mbbs-abroad/belize",
  "/mbbs-abroad/bulgaria",
  "/mbbs-abroad/curacao",
  "/mbbs-abroad/czech-republic",
  "/mbbs-abroad/grenada",
  "/mbbs-abroad/guyana",
  "/mbbs-abroad/hungary",
  "/mbbs-abroad/ireland",
  "/mbbs-abroad/italy",
  "/mbbs-abroad/jamaica",
  "/mbbs-abroad/latvia",
  "/mbbs-abroad/lithuania",
  "/mbbs-abroad/mauritius",
  "/mbbs-abroad/netherlands",
  "/mbbs-abroad/oman",
  "/mbbs-abroad/pakistan",
  "/mbbs-abroad/papua-new-guinea",
  "/mbbs-abroad/philippines",
  "/mbbs-abroad/poland",
  "/mbbs-abroad/republic-of-moldova",
  "/mbbs-abroad/romania",
  "/mbbs-abroad/saba",
  "/mbbs-abroad/saint-kitts-and-nevis",
  "/mbbs-abroad/saint-lucia",
  "/mbbs-abroad/serbia",
  "/mbbs-abroad/ukraine",
  "/mbbs-abroad/united-republic-of-tanzania",
];

const firstMarketplaceRows = [
  ["/mbbs-india", "/mbbs-abroad/kyrgyzstan", "/mbbs-abroad/georgia"],
  ["/mbbs-abroad/bangladesh", "/mbbs-abroad/tajikistan", "/mbbs-abroad/china"],
];

const destinationData = destinationOrder
  .map((href) => destinationSourceData.find((destination) => destination.href === href))
  .filter((destination): destination is DestinationCardData => Boolean(destination))
  .map((destination) => {
    const wdomsCount = countryWdomsCountByHref.get(destination.href);

    return typeof wdomsCount === "number"
      ? { ...destination, universityCount: wdomsCount }
      : destination;
  });

const buildDestinationRows = (destinations: DestinationCardData[]) => {
  const rows = firstMarketplaceRows.map((row) =>
    row
      .map((href) => destinations.find((destination) => destination.href === href))
      .filter((destination): destination is DestinationCardData => Boolean(destination))
  );
  const pinnedHrefs = new Set(firstMarketplaceRows.flat());

  destinations
    .filter((destination) => !pinnedHrefs.has(destination.href))
    .forEach((destination, index) => rows[index % 2].push(destination));

  return rows;
};

const splitDestinationsIntoRows = (destinations: DestinationCardData[]) =>
  destinations.reduce<[DestinationCardData[], DestinationCardData[]]>(
    (rows, destination, index) => {
      rows[index % 2].push(destination);
      return rows;
    },
    [[], []]
  );

const destinationRows = buildDestinationRows(destinationData);

const heroCountryCards = [
  {
    href: "/mbbs-abroad/kyrgyzstan",
    label: "Kyrgyzstan",
    flag: "kg",
    hint: "View country",
  },
  {
    href: "/mbbs-abroad/georgia",
    label: "Georgia",
    flag: "ge",
    hint: "View country",
  },
  {
    href: "/mbbs-abroad/bangladesh",
    label: "Bangladesh",
    flag: "bd",
    hint: "View country",
  },
  {
    href: "/mbbs-abroad/russia",
    label: "Russia",
    flag: "ru",
    hint: "View country",
  },
  {
    href: "/mbbs-abroad/uzbekistan",
    label: "Uzbekistan",
    flag: "uz",
    hint: "View country",
  },
];

const decisionTools = [
  {
    title: "Find My Supports",
    description: "Find scholarship, loan and support options that fit your profile.",
    href: "/scholarships-loans#finder",
    icon: "support",
    accent: "blue",
  },
  {
    title: "NEET Rank Predictor",
    description: "Predict your NEET rank and explore realistic MBBS pathways.",
    href: "/?rank-predictor=open",
    icon: "rank",
    accent: "teal",
    opensRankPredictor: true,
  },
  {
    title: "Best Available Counselling",
    description: "College-wise guidance and counselling support based on your goals.",
    href: "/best-available-counselling",
    icon: "counselling",
    accent: "violet",
  },
  {
    title: "Country Compare",
    description: "Compare countries on fees, safety, recognition, FMGE data and more.",
    href: "/mbbs-abroad",
    icon: "country",
    accent: "blue",
  },
  {
    title: "MBBS Abroad Eligibility",
    description: "Check eligibility, documents and NMC/FMGL rule requirements.",
    href: "/mbbs-abroad-eligibility",
    icon: "eligibility",
    accent: "teal",
  },
  {
    title: "Document Checklist",
    description: "Get a complete list of documents required for admission and visa.",
    href: "/document-checklist",
    icon: "documents",
    accent: "amber",
  },
  {
    title: "FMGE Explorer",
    description: "Explore FMGE data, country-wise results and pass percentages.",
    href: "/mbbs-abroad/explorer",
    icon: "fmge",
    accent: "violet",
  },
  {
    title: "Official Advisory Check",
    description: "Review official links, notices and trusted regulatory sources.",
    href: "/official-links",
    icon: "advisory",
    accent: "blue",
  },
  {
    title: "Career Planner",
    description: "Plan your MBBS journey with budget, timeline and career roadmap.",
    href: "/career-planner",
    icon: "career",
    accent: "teal",
  },
] as const;

const decisionToolAccents = {
  blue: {
    number: "bg-blue-50 text-blue-700",
    action: "text-[#0F4CFF]",
  },
  teal: {
    number: "bg-teal-50 text-teal-700",
    action: "text-teal-700",
  },
  violet: {
    number: "bg-violet-50 text-violet-700",
    action: "text-violet-700",
  },
  amber: {
    number: "bg-amber-50 text-amber-700",
    action: "text-amber-700",
  },
} as const;

type DecisionToolIcon = (typeof decisionTools)[number]["icon"];
type DecisionToolAccent = (typeof decisionTools)[number]["accent"];

const premiumIconPalettes = {
  blue: {
    shell:
      "border-blue-100 bg-[linear-gradient(145deg,#ffffff_0%,#edf4ff_48%,#c9dcff_100%)] shadow-[inset_0_2px_1px_rgba(255,255,255,0.98),inset_-7px_-9px_17px_rgba(15,76,255,0.16),0_12px_24px_rgba(15,76,255,0.23)]",
    primary: "text-[#0F4CFF]",
    secondary: "text-[#082A72]",
  },
  teal: {
    shell:
      "border-teal-100 bg-[linear-gradient(145deg,#ffffff_0%,#e9fffb_48%,#bcefe4_100%)] shadow-[inset_0_2px_1px_rgba(255,255,255,0.98),inset_-7px_-9px_17px_rgba(13,148,136,0.16),0_12px_24px_rgba(13,148,136,0.22)]",
    primary: "text-[#009F91]",
    secondary: "text-[#075E59]",
  },
  violet: {
    shell:
      "border-violet-100 bg-[linear-gradient(145deg,#ffffff_0%,#f3efff_48%,#d9ceff_100%)] shadow-[inset_0_2px_1px_rgba(255,255,255,0.98),inset_-7px_-9px_17px_rgba(109,40,217,0.16),0_12px_24px_rgba(109,40,217,0.22)]",
    primary: "text-[#6437E8]",
    secondary: "text-[#32148F]",
  },
  amber: {
    shell:
      "border-amber-100 bg-[linear-gradient(145deg,#ffffff_0%,#fff9e9_48%,#ffe3a3_100%)] shadow-[inset_0_2px_1px_rgba(255,255,255,0.98),inset_-7px_-9px_17px_rgba(217,119,6,0.16),0_12px_24px_rgba(217,119,6,0.22)]",
    primary: "text-[#E58A00]",
    secondary: "text-[#9A4E00]",
  },
} as const;

function PremiumDecisionIcon({
  icon,
  accent,
}: {
  icon: DecisionToolIcon;
  accent: DecisionToolAccent;
}) {
  const palette = premiumIconPalettes[accent];

  return (
    <span
      aria-hidden="true"
      className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-visible rounded-[16px] border sm:h-[68px] sm:w-[68px] sm:rounded-[21px] ${palette.shell}`}
    >
      <span className="pointer-events-none absolute left-2 top-1.5 h-2 w-4 rounded-full bg-white/95 blur-[1px] sm:left-3 sm:top-2 sm:h-2.5 sm:w-5" />
      <span className="pointer-events-none absolute inset-[3px] rounded-[13px] border border-white/70 sm:rounded-[18px]" />

      {icon === "support" && (
        <>
          <BookOpen
            className={`absolute bottom-1.5 h-6 w-8 fill-white/80 drop-shadow-[0_3px_2px_rgba(8,42,114,0.2)] sm:bottom-2 sm:h-8 sm:w-10 ${palette.secondary}`}
            strokeWidth={1.9}
          />
          <GraduationCap
            className={`absolute left-1 top-1 h-7 w-9 fill-blue-200 drop-shadow-[0_4px_3px_rgba(15,76,255,0.28)] sm:left-1.5 sm:top-1.5 sm:h-10 sm:w-12 ${palette.primary}`}
            strokeWidth={1.9}
          />
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[linear-gradient(145deg,#ffd968,#f39b14)] text-[10px] font-black text-white shadow-[0_5px_10px_rgba(217,119,6,0.35)] sm:h-7 sm:w-7 sm:text-sm">
            ₹
          </span>
        </>
      )}

      {icon === "rank" && (
        <>
          <BarChart3
            className={`absolute bottom-2 left-1.5 h-7 w-7 fill-teal-100 drop-shadow-[0_3px_2px_rgba(7,94,89,0.18)] sm:bottom-3 sm:left-2 sm:h-9 sm:w-9 ${palette.secondary}`}
            strokeWidth={1.8}
          />
          <TrendingUp
            className={`absolute right-1.5 top-1.5 h-7 w-7 drop-shadow-[0_4px_3px_rgba(0,159,145,0.24)] sm:right-2 sm:top-2 sm:h-10 sm:w-10 ${palette.primary}`}
            strokeWidth={2.5}
          />
          <span className="absolute -bottom-1 -right-1 rounded-md border border-white bg-[linear-gradient(145deg,#16c7ad,#008f84)] px-1.5 py-0.5 text-[7px] font-black text-white shadow-[0_5px_10px_rgba(0,143,132,0.32)] sm:text-[9px]">
            NEET
          </span>
        </>
      )}

      {icon === "counselling" && (
        <>
          <UserRound
            className={`absolute bottom-1 h-8 w-8 fill-violet-100 drop-shadow-[0_4px_3px_rgba(50,20,143,0.2)] sm:bottom-1.5 sm:h-11 sm:w-11 ${palette.secondary}`}
            strokeWidth={1.8}
          />
          <Headset
            className={`absolute top-1 h-9 w-9 drop-shadow-[0_4px_3px_rgba(100,55,232,0.28)] sm:top-1.5 sm:h-12 sm:w-12 ${palette.primary}`}
            strokeWidth={2.2}
          />
          <span className="absolute -right-1 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 shadow-[0_2px_6px_rgba(16,185,129,0.4)] sm:h-3 sm:w-3" />
        </>
      )}

      {icon === "country" && (
        <>
          <Globe2
            className={`h-9 w-9 drop-shadow-[0_4px_3px_rgba(15,76,255,0.24)] sm:h-12 sm:w-12 ${palette.primary}`}
            strokeWidth={2.2}
          />
          <MapPin
            className="absolute -right-1 top-0 h-6 w-6 fill-[#0F4CFF] text-white drop-shadow-[0_5px_4px_rgba(15,76,255,0.34)] sm:-right-1.5 sm:h-8 sm:w-8"
            strokeWidth={2}
          />
        </>
      )}

      {icon === "eligibility" && (
        <>
          <ClipboardList
            className={`h-9 w-9 fill-white/75 drop-shadow-[0_4px_3px_rgba(7,94,89,0.2)] sm:h-12 sm:w-12 ${palette.secondary}`}
            strokeWidth={1.9}
          />
          <ShieldCheck
            className="absolute -bottom-1 -right-1 h-6 w-6 fill-[#2dd4bf] text-white drop-shadow-[0_5px_4px_rgba(13,148,136,0.34)] sm:h-8 sm:w-8"
            strokeWidth={2}
          />
        </>
      )}

      {icon === "documents" && (
        <>
          <FolderOpen
            className={`h-10 w-10 fill-amber-200 drop-shadow-[0_5px_3px_rgba(154,78,0,0.24)] sm:h-14 sm:w-14 ${palette.primary}`}
            strokeWidth={1.8}
          />
          <FileCheck2
            className="absolute -bottom-1 -right-1 h-6 w-6 rounded-md bg-white fill-white text-[#D97706] drop-shadow-[0_5px_4px_rgba(217,119,6,0.3)] sm:h-8 sm:w-8"
            strokeWidth={2.1}
          />
        </>
      )}

      {icon === "fmge" && (
        <>
          <BarChart3
            className={`absolute left-2 top-1.5 h-7 w-7 fill-violet-100 drop-shadow-[0_3px_2px_rgba(50,20,143,0.2)] sm:left-3 sm:top-2 sm:h-9 sm:w-9 ${palette.secondary}`}
            strokeWidth={2}
          />
          <Search
            className={`absolute bottom-0.5 right-0.5 h-9 w-9 drop-shadow-[0_5px_4px_rgba(100,55,232,0.3)] sm:bottom-1 sm:right-1 sm:h-12 sm:w-12 ${palette.primary}`}
            strokeWidth={2.3}
          />
          <span className="absolute -bottom-1 left-0 rounded-md border border-white bg-[linear-gradient(145deg,#7c5cff,#5430d6)] px-1 py-0.5 text-[6px] font-black text-white shadow-sm sm:text-[8px]">
            FMGE
          </span>
        </>
      )}

      {icon === "advisory" && (
        <>
          <ShieldCheck
            className={`h-10 w-10 fill-blue-200 drop-shadow-[0_5px_4px_rgba(15,76,255,0.3)] sm:h-14 sm:w-14 ${palette.primary}`}
            strokeWidth={1.9}
          />
          <BadgeCheck
            className="absolute -bottom-1 -right-1 h-6 w-6 fill-white text-[#00A876] drop-shadow-[0_4px_4px_rgba(0,168,118,0.28)] sm:h-8 sm:w-8"
            strokeWidth={2.1}
          />
        </>
      )}

      {icon === "career" && (
        <>
          <CalendarDays
            className={`h-9 w-9 fill-white/80 drop-shadow-[0_4px_3px_rgba(7,94,89,0.2)] sm:h-12 sm:w-12 ${palette.primary}`}
            strokeWidth={1.9}
          />
          <Route
            className={`absolute bottom-1 right-0.5 h-6 w-6 drop-shadow-[0_4px_3px_rgba(0,159,145,0.26)] sm:bottom-1.5 sm:right-1 sm:h-8 sm:w-8 ${palette.secondary}`}
            strokeWidth={2.3}
          />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-[linear-gradient(145deg,#35d6be,#009f91)] text-[9px] font-black text-white shadow-[0_4px_8px_rgba(0,159,145,0.3)] sm:h-7 sm:w-7 sm:text-xs">
            ✓
          </span>
        </>
      )}
    </span>
  );
}

const liveMetrics = [
  {
    label: "Applications",
    value: "5000+",
    icon: Send,
    tone: "from-blue-500 to-indigo-600",
  },
  {
    label: "Offer Letters",
    value: "2000+",
    icon: MailCheck,
    tone: "from-violet-500 to-fuchsia-600",
  },
  {
    label: "Visas Approved",
    value: "1900+",
    icon: Stamp,
    tone: "from-cyan-500 to-teal-600",
  },
  {
    label: "Universities",
    value: "480+",
    icon: Building2,
    tone: "from-amber-400 to-orange-500",
  },
];

type JourneyStep = {
  title: string;
  detail: string;
  icon: LucideIcon;
  connect?: boolean;
};

const abroadJourneySteps: JourneyStep[] = [
  {
    title: "Connect ILMALINK",
    detail: "Open personalised counselling and share your goal.",
    icon: Headset,
    connect: true,
  },
  {
    title: "Profile Analysis",
    detail: "NEET score, eligibility, budget and preferences.",
    icon: BrainCircuit,
  },
  {
    title: "Best-fit Discovery",
    detail: "Compare suitable countries, colleges and universities.",
    icon: Compass,
  },
  {
    title: "Application",
    detail: "Application form, document review and submission support.",
    icon: Send,
  },
  {
    title: "Offer Letter",
    detail: "Track university review and official offer-letter process.",
    icon: MailCheck,
  },
  {
    title: "Visa Approval",
    detail: "Visa file preparation, checks and application guidance.",
    icon: Stamp,
  },
  {
    title: "Government Permissions",
    detail: "Required permissions and official compliance support.",
    icon: ShieldCheck,
  },
  {
    title: "Pre-departure",
    detail: "Travel, documents, packing and arrival preparation.",
    icon: BaggageClaim,
  },
  {
    title: "Fly Abroad",
    detail: "Travel coordination for the selected destination.",
    icon: PlaneTakeoff,
  },
  {
    title: "Reach College",
    detail: "Arrival and college-reaching support from the ILMALINK team.",
    icon: GraduationCap,
  },
  {
    title: "Academic Observation",
    detail:
      "Study under ILMALINK team observation with add-on Indian faculty support.",
    icon: UserRound,
  },
  {
    title: "FMGE / NExT-I / NEET PG",
    detail:
      "Preparation support with Indian faculties at no extra cost.",
    icon: BookOpen,
  },
  {
    title: "24×7 Course Support",
    detail:
      "ILMALINK assistance throughout the entire foreign medical course.",
    icon: Headset,
  },
];

const indiaJourneySteps: JourneyStep[] = [
  {
    title: "Connect ILMALINK",
    detail: "Open personalised counselling and share your goal.",
    icon: Headset,
    connect: true,
  },
  {
    title: "Profile Analysis",
    detail: "NEET score, rank, budget, domicile and preferences.",
    icon: BrainCircuit,
  },
  {
    title: "Best-fit Planning",
    detail: "Compare government, private, deemed and BDS pathways.",
    icon: SearchCheck,
  },
  {
    title: "Counselling Registration",
    detail: "Register for MCC central and applicable state counselling.",
    icon: Landmark,
  },
  {
    title: "Choice Filling",
    detail: "Prepare aspirational, realistic and safe college choices.",
    icon: ListChecks,
  },
  {
    title: "Government Allotment",
    detail: "Track rounds and download the official allotment letter.",
    icon: FileBadge,
  },
  {
    title: "Document Verification",
    detail: "Prepare and verify the required originals and certificates.",
    icon: ClipboardCheck,
  },
  {
    title: "Report & Pay Fees",
    detail: "Report to the allotted college and complete official payment.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Admission Support",
    detail: "Complete joining with the ILMALINK support system.",
    icon: CheckCircle2,
  },
  {
    title: "On-campus Support",
    detail: "Continued assistance throughout the complete MBBS course.",
    icon: GraduationCap,
  },
  {
    title: "NEET PG / NExT-I Helpline",
    detail: "Preparation guidance and academic-support helpline.",
    icon: BookOpen,
  },
];

type JourneyFlowLaneProps = {
  eyebrow: string;
  title: string;
  description: string;
  steps: JourneyStep[];
  icon: LucideIcon;
  accent: "abroad" | "india";
  onConnect: () => void;
};

function JourneyFlowLane({
  eyebrow,
  title,
  description,
  steps,
  icon: LaneIcon,
  accent,
  onConnect,
}: JourneyFlowLaneProps) {
  const isAbroad = accent === "abroad";
  const shellClass = isAbroad
    ? "border-cyan-200/70 bg-[radial-gradient(circle_at_96%_0%,rgba(34,211,238,0.2),transparent_28%),linear-gradient(145deg,#effcff_0%,#ffffff_48%,#eef4ff_100%)]"
    : "border-emerald-200/70 bg-[radial-gradient(circle_at_96%_0%,rgba(16,185,129,0.18),transparent_28%),linear-gradient(145deg,#effdf7_0%,#ffffff_48%,#f1f7ff_100%)]";
  const badgeClass = isAbroad
    ? "border-cyan-200 bg-cyan-50 text-cyan-800"
    : "border-emerald-200 bg-emerald-50 text-emerald-800";
  const nodeClass = isAbroad
    ? "border-cyan-200 bg-[linear-gradient(145deg,#ffffff,#e6fbff)] text-cyan-700 shadow-[inset_0_2px_2px_rgba(255,255,255,1),inset_-8px_-10px_18px_rgba(6,182,212,0.1),0_12px_25px_rgba(8,145,178,0.2)]"
    : "border-emerald-200 bg-[linear-gradient(145deg,#ffffff,#e8fff5)] text-emerald-700 shadow-[inset_0_2px_2px_rgba(255,255,255,1),inset_-8px_-10px_18px_rgba(16,185,129,0.1),0_12px_25px_rgba(5,150,105,0.2)]";
  const connectorClass = isAbroad
    ? "border-cyan-400/75"
    : "border-emerald-400/75";
  const connectorBackground = isAbroad
    ? "bg-[repeating-linear-gradient(90deg,#22d3ee_0_7px,transparent_7px_12px)]"
    : "bg-[repeating-linear-gradient(90deg,#34d399_0_7px,transparent_7px_12px)]";
  const activeTextClass = isAbroad
    ? "text-cyan-700"
    : "text-emerald-700";

  const renderMilestone = (
    step: JourneyStep,
    index: number,
    mobile: boolean
  ) => {
    const Icon = step.icon;
    const isLast = index === steps.length - 1;
    const isMobileRowEnd = index % 3 === 2;
    const isMobileRowStart = index > 0 && index % 3 === 0;
    const content = (
      <>
        <span
          className={`journey-node relative z-20 flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border-[3px] sm:h-12 sm:w-12 ${nodeClass} ${
            step.connect ? "cursor-pointer ring-4 ring-blue-100/70" : ""
          }`}
          style={{ animationDelay: `${index * 180}ms` }}
        >
          <span className="pointer-events-none absolute left-1.5 top-1 h-2 w-4 rounded-full bg-white/90 blur-[1px]" />
          <span className="journey-node-shine pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-[-20deg] bg-white/55 blur-[2px]" />
          <Icon className="relative h-[18px] w-[18px] drop-shadow-[0_2px_2px_rgba(15,45,91,0.18)] sm:h-5 sm:w-5" />
        </span>
        <span className="mt-2 block text-center text-[9px] font-black leading-[1.15] text-[#071B44] sm:text-[10px]">
          {step.title}
        </span>
        <span className="mt-0.5 block text-center text-[7px] font-medium leading-[1.3] text-slate-500 sm:text-[8px]">
          {step.detail}
        </span>
        {step.connect && (
          <span
            className={`mt-1.5 inline-flex items-center gap-0.5 text-[8px] font-black uppercase tracking-[0.08em] ${activeTextClass}`}
          >
            Open counselling
            <ArrowUpRight className="h-2.5 w-2.5" />
          </span>
        )}
      </>
    );

    return (
      <div
        key={`${mobile ? "mobile" : "desktop"}-${step.title}`}
        className={`relative flex min-w-0 flex-col items-center ${
          mobile ? "min-h-[112px]" : ""
        }`}
      >
        {!isLast && (!mobile || !isMobileRowEnd) && (
          <span
            className={`journey-connector pointer-events-none absolute left-[calc(50%+22px)] right-[calc(-50%+22px)] top-[21px] z-0 h-[2px] sm:left-[calc(50%+24px)] sm:right-[calc(-50%+24px)] sm:top-[23px] ${connectorBackground}`}
            style={{ animationDelay: `${index * 180}ms` }}
          />
        )}

        {mobile && isMobileRowEnd && !isLast && (
          <span
            className={`journey-turn pointer-events-none absolute -bottom-2 right-1/2 top-[21px] z-0 w-[calc(200%+1rem)] rounded-br-2xl border-b-2 border-r-2 border-dashed ${connectorClass}`}
            style={{ animationDelay: `${index * 180}ms` }}
          />
        )}

        {mobile && isMobileRowStart && (
          <span
            className={`journey-turn pointer-events-none absolute -top-2 left-1/2 z-0 h-[31px] border-l-2 border-dashed ${connectorClass}`}
            style={{ animationDelay: `${index * 180}ms` }}
          />
        )}

        {step.connect ? (
          <button
            type="button"
            data-open-counselling
            onClick={onConnect}
            className="group flex w-full flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
          >
            {content}
          </button>
        ) : (
          content
        )}
      </div>
    );
  };

  return (
    <article
      className={`journey-glass-lane relative isolate overflow-hidden rounded-[25px] border p-2.5 shadow-[0_20px_45px_rgba(15,45,91,0.11),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-xl sm:rounded-[28px] sm:p-4 ${shellClass}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_center,rgba(15,76,255,0.14)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative flex items-start gap-2.5">
        <div
          className={`journey-node flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] sm:h-11 sm:w-11 ${nodeClass}`}
        >
          <LaneIcon className="h-5 w-5 drop-shadow-[0_3px_3px_rgba(0,0,0,0.2)]" />
        </div>
        <div>
          <p
            className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em] ${badgeClass}`}
          >
            {eyebrow}
          </p>
          <h3 className="mt-1.5 text-lg font-black tracking-[-0.03em] text-[#071B44] sm:text-xl">
            {title}
          </h3>
          <p className="mt-0.5 text-[10px] font-medium leading-4 text-slate-600 sm:text-[11px]">
            {description}
          </p>
        </div>
      </div>

      <div className="relative mt-4 lg:hidden">
        <div className="grid grid-cols-3 gap-x-2 gap-y-4">
          {steps.map((step, index) => renderMilestone(step, index, true))}
        </div>
      </div>

      <div
        className="relative mt-4 hidden gap-0 lg:grid"
        style={{
          gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`,
        }}
      >
        {steps.map((step, index) => renderMilestone(step, index, false))}
      </div>
    </article>
  );
}

function UniversityIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 sm:h-6 sm:w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M12 4 3 9l9 5 9-5-9-5Zm0 5 6.16-3.422M6 11.5V15c0 .8 2.4 3 6 3s6-2.2 6-3v-3.5"
      />
    </svg>
  );
}

function CountryIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 sm:h-6 sm:w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M3.055 11H5a2 2 0 0 1 2 2v1a2 2 0 0 0 2 2 2 2 0 0 1 2 2v2.945M8 3.935V5.5A2.5 2.5 0 0 0 10.5 8h.5a2 2 0 0 1 2 2 2 2 0 1 0 4 0 2 2 0 0 1 2-2h1.064M15 20.488V18a2 2 0 0 1 2-2h3.064M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function StudentsIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 sm:h-6 sm:w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-1.5a5 5 0 0 0-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-1.5c0-.64.122-1.26.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 sm:h-6 sm:w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016Z"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function DestinationMarketplaceCard({
  destination,
}: {
  destination: DestinationCardData;
}) {
  const semesterFeeText =
    destination.semesterFee ?? destination.fee ?? "Fees vary by university";
  const institutionType =
    destination.label === "India" || destination.label === "Bangladesh"
      ? "Colleges"
      : "Universities";
  const institutionText =
    destination.secondaryText ??
    (typeof destination.universityCount === "number"
      ? `${destination.universityCount} ${institutionType} (WDOMS entry)`
      : "Country guide");
  return (
    <Link
      href={destination.href}
      aria-label={`Explore MBBS in ${destination.label}`}
      className="group relative isolate h-[116px] w-[calc((100vw-3rem)/2.55)] min-w-[132px] max-w-[152px] shrink-0 overflow-hidden rounded-[18px] border border-cyan-100/90 bg-[linear-gradient(145deg,#ffffff_0%,#f6fdff_48%,#ddfbf8_100%)] p-2.5 text-slate-950 shadow-[0_16px_34px_rgba(8,47,73,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_20px_44px_rgba(8,145,178,0.24)] active:scale-[0.98] sm:h-[132px] sm:w-44 sm:max-w-none sm:p-3 md:w-52"
    >
      <span className="pointer-events-none absolute -right-10 -bottom-10 h-28 w-28 rounded-full border border-cyan-300/20" />
      <span className="pointer-events-none absolute -right-3 bottom-5 h-16 w-16 rounded-full border border-teal-300/20 [transform:rotateX(68deg)_rotateZ(-18deg)]" />
      <span className="pointer-events-none absolute inset-x-3 top-12 h-px bg-[linear-gradient(90deg,rgba(14,116,144,0.08),rgba(14,116,144,0.28),transparent)]" />

      <div className="relative flex min-w-0 items-center gap-1.5">
        <span className="flex h-6 w-7 shrink-0 overflow-hidden rounded-md border border-white bg-white shadow-[0_5px_12px_rgba(8,47,73,0.16)] sm:h-7 sm:w-8">
          <img
            src={`https://flagcdn.com/w80/${destination.flag}.png`}
            alt={`${destination.label} flag`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </span>
        <h3
          className="min-w-0 truncate whitespace-nowrap text-[13px] font-black leading-none text-[#06203f] sm:text-base"
          title={destination.label}
        >
          {destination.label}
        </h3>
      </div>

      <div className="relative mt-2 space-y-0.5 rounded-xl bg-white/70 px-2 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
        <p className="truncate text-[12px] font-black leading-tight text-[#06203f] sm:text-sm">
          {semesterFeeText}
        </p>
        <p
          className="truncate text-[11px] font-extrabold leading-tight text-cyan-800 sm:text-xs"
          title={institutionText}
        >
          {institutionText}
        </p>
      </div>
    </Link>
  );
}

export default function HomeHeroClient() {
  const [showPopup, setShowPopup] = useState(false);
  const [showFMGEExplorer, setShowFMGEExplorer] = useState(false);
  const [showRankPredictor, setShowRankPredictor] = useState(false);
  const [isDestinationSearchOpen, setIsDestinationSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [neetScore, setNeetScore] = useState("");
  const [analysedNeetScore, setAnalysedNeetScore] = useState("");
  const [neetAttempted, setNeetAttempted] = useState(false);
  const topMarketplaceScrollRef = useRef<HTMLDivElement | null>(null);
  const bottomMarketplaceScrollRef = useRef<HTMLDivElement | null>(null);
  const destinationSearchInputRef = useRef<HTMLInputElement | null>(null);
  const neetScoreInputRef = useRef<HTMLInputElement | null>(null);

  const filteredDestinations = useMemo(
    () =>
      destinationData.filter((destination) =>
        destination.label.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );
  const marketplaceRows = searchQuery.trim()
    ? splitDestinationsIntoRows(filteredDestinations)
    : destinationRows;
  const parsedNeetScore = Number(analysedNeetScore);
  const neetPathway = analysedNeetScore
    ? getNeetPathway(parsedNeetScore)
    : null;
  const neetScoreIsInvalid =
    neetAttempted &&
    (!neetScore ||
      !Number.isFinite(Number(neetScore)) ||
      Number(neetScore) < 1 ||
      Number(neetScore) > 720);

  const analyseNeetScore = () => {
    setNeetAttempted(true);
    const score = Number(neetScore);

    if (!Number.isFinite(score) || score < 1 || score > 720) {
      setAnalysedNeetScore("");
      return;
    }

    setAnalysedNeetScore(neetScore);
  };

  const resetNeetScore = () => {
    setNeetScore("");
    setAnalysedNeetScore("");
    setNeetAttempted(false);
    window.requestAnimationFrame(() => neetScoreInputRef.current?.focus());
  };

  const focusNeetDecisionCenter = () => {
    document
      .getElementById("neet-decision-center")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => neetScoreInputRef.current?.focus(), 500);
  };

  const scrollDestinationRow = (rowIndex: 0 | 1, direction: -1 | 1) => {
    const target =
      rowIndex === 0 ? topMarketplaceScrollRef.current : bottomMarketplaceScrollRef.current;

    target?.scrollBy({
      left: direction * Math.max(target.clientWidth * 0.78, 190),
      behavior: "smooth",
    });
  };

  const openDestinationSearch = () => {
    setIsDestinationSearchOpen(true);
    window.requestAnimationFrame(() => {
      destinationSearchInputRef.current?.focus();
    });
  };

  const closeDestinationSearch = () => {
    setSearchQuery("");
    setIsDestinationSearchOpen(false);
    destinationSearchInputRef.current?.blur();
  };

  const toggleDestinationSearch = () => {
    if (isDestinationSearchOpen || searchQuery) {
      closeDestinationSearch();
      return;
    }

    openDestinationSearch();
  };

  useEffect(() => {
    const openExplorer = () => setShowFMGEExplorer(true);
    const consumePendingOpen = () => {
      const params = new URLSearchParams(window.location.search);
      const shouldOpen =
        params.get("fmge") === "explorer" ||
        window.sessionStorage.getItem(PENDING_FMGE_KEY) === "1";

      if (shouldOpen) {
        window.sessionStorage.removeItem(PENDING_FMGE_KEY);
        openExplorer();
      }
    };

    window.addEventListener(OPEN_FMGE_EVENT, openExplorer);
    window.setTimeout(consumePendingOpen, 0);

    return () => window.removeEventListener(OPEN_FMGE_EVENT, openExplorer);
  }, []);
  useEffect(() => {
    const openRankPredictor = () => setShowRankPredictor(true);
    const consumePendingOpen = () => {
      const params = new URLSearchParams(window.location.search);

      if (params.get("rank-predictor") !== "open") return;

      openRankPredictor();
      params.delete("rank-predictor");

      const nextUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      window.history.replaceState({}, "", nextUrl);
    };

    window.addEventListener(OPEN_RANK_PREDICTOR_EVENT, openRankPredictor);
    window.setTimeout(consumePendingOpen, 0);

    return () =>
      window.removeEventListener(OPEN_RANK_PREDICTOR_EVENT, openRankPredictor);
  }, []);

  return (
    <>
      <section className="relative z-[60] left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] border-b border-slate-100/50 bg-white pt-0 shadow-sm overflow-visible">
        <section className="relative z-[60] w-full -mt-1.5 overflow-hidden rounded-t-[32px] border-t border-white/10 bg-[#062a55] bg-gradient-to-br from-[#061D3F] via-[#073B76] to-[#06234D] shadow-[0_35px_120px_rgba(0,18,51,0.45)] md:-mt-2 md:rounded-t-[50px] lg:min-h-[540px] lg:rounded-t-[64px] lg:shadow-[0_38px_130px_rgba(0,18,51,0.52)]">
          <div
            className="pointer-events-none absolute inset-0 rounded-t-[32px] md:rounded-t-[50px] opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="pointer-events-none absolute left-[38%] top-[12%] h-[320px] w-[320px] rounded-full bg-[#33A6FF]/20 blur-[90px]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] rounded-t-[32px] bg-[radial-gradient(circle_at_center,rgba(65,170,255,0.20),transparent_60%)] md:rounded-t-[50px]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 hidden h-px bg-gradient-to-r from-transparent via-white/35 to-transparent lg:block" />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 px-4 pb-6 pt-7 sm:px-6 md:pb-9 md:pt-9 lg:min-h-[540px] lg:grid-cols-[minmax(0,0.98fr)_minmax(360px,0.92fr)_minmax(255px,0.68fr)] lg:gap-5 lg:px-10 lg:py-12 xl:grid-cols-[minmax(420px,1.02fr)_minmax(410px,0.96fr)_minmax(285px,0.72fr)] xl:gap-8 xl:px-12">
            {/* Left content */}
            <div className="relative z-20 min-h-[245px] pr-[30%] text-left md:min-h-0 md:pr-0 md:text-center lg:flex lg:min-h-[420px] lg:flex-col lg:justify-center lg:text-left xl:min-h-[450px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/[0.85] sm:text-xs lg:text-[12px] lg:tracking-[0.48em]">
                Your Gateway To
              </p>

              <h1 className="mt-3 text-[1.9rem] font-extrabold leading-[0.95] tracking-[-0.05em] text-white sm:text-[2.55rem] md:text-[2.8rem] lg:max-w-[560px] lg:text-[3.7rem] lg:leading-[0.94] lg:tracking-[-0.03em] lg:[word-spacing:0.08em] xl:text-[3.95rem]">
                <span className="block lg:whitespace-nowrap">Global Medical</span>
                <span className="block">Education</span>
              </h1>
              <div className="mt-4 space-y-1 text-sm text-white/[0.82] sm:text-[15px] lg:mt-5 lg:max-w-[520px] lg:text-base lg:leading-7">
                <p>Explore 480+ FMGE-2025  Universities in 54+ Countries.</p>
                <p className="hidden md:block">As Per FMGE Screening Test 2025</p>
              </div>

              <div className="mx-auto mt-5 hidden max-w-[520px] grid-cols-2 gap-3 sm:grid-cols-4 md:grid lg:mx-0 lg:mt-7 lg:max-w-[480px] lg:grid-cols-2 lg:gap-2.5 lg:rounded-2xl lg:border lg:border-white/15 lg:bg-white/[0.075] lg:p-3 lg:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_44px_rgba(0,0,0,0.16)] lg:backdrop-blur-xl">
                <div className="flex items-start justify-center gap-2 text-white lg:justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <UniversityIcon />
                  </div>
                  <div>
                    <p className="text-base font-bold lg:text-[15px]">480+</p>
                    <p className="text-[11px] text-white/70 lg:text-[10px] lg:leading-4">Universities</p>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-2 text-white lg:justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <CountryIcon />
                  </div>
                  <div>
                    <p className="text-base font-bold lg:text-[15px]">54+</p>
                    <p className="text-[11px] text-white/70 lg:text-[10px] lg:leading-4">Countries</p>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-2 text-white lg:justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <StudentsIcon />
                  </div>
                  <div>
                    <p className="text-base font-bold lg:text-[15px]">100000+</p>
                    <p className="text-[11px] text-white/70 lg:text-[10px] lg:leading-4">MBBS Abroad</p>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-2 text-white lg:justify-start">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <ShieldIcon />
                  </div>
                  <div>
                    <p className="text-base font-bold lg:text-[15px]">823+ | 1.29L+</p>
                    <p className="text-[11px] text-white/70 lg:text-[10px] lg:leading-4">Indian Colleges | MBBS Seats</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 hidden max-w-[520px] text-[9px] font-medium leading-none tracking-wide text-white/45 md:mx-auto md:block md:text-center md:text-[10px] lg:mx-0 lg:max-w-[480px] lg:text-left">
                Data compiled from official public sources
              </p>

              <div className="mx-0 mt-5 flex w-full max-w-[190px] flex-col items-stretch justify-center gap-2 md:mx-auto md:mt-6 md:max-w-[360px] md:flex-row md:flex-nowrap lg:mx-0 lg:mt-8 lg:max-w-[520px] lg:justify-start lg:gap-3">
                <button
                  type="button"
                  onClick={() => setShowFMGEExplorer(true)}
                  className="group inline-flex min-w-0 flex-none items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#16C784] px-2 py-2 text-[11px] font-bold text-[#001B2E] shadow-[0_18px_45px_rgba(22,199,132,0.32)] transition hover:-translate-y-0.5 hover:bg-[#18d890] sm:px-3 sm:text-xs md:flex-1 lg:min-w-[210px] lg:flex-none lg:gap-2 lg:rounded-[16px] lg:px-6 lg:py-3.5 lg:text-sm"
                >
                  Explore Universities
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowRankPredictor(true)}
                  className="inline-flex min-w-0 flex-none items-center justify-center whitespace-nowrap rounded-xl border border-white/25 bg-white/10 px-2 py-2 text-[11px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white/[0.15] sm:px-3 sm:text-xs md:flex-1 lg:min-w-[190px] lg:flex-none lg:rounded-[16px] lg:px-6 lg:py-3.5 lg:text-sm"
                >
                  NEET Rank Predictor
                </button>
              </div>
            </div>

            {/* Globe */}
            <div className="pointer-events-none absolute right-[-90px] top-8 z-10 flex w-[240px] max-w-none items-center justify-center opacity-90 md:pointer-events-auto md:relative md:right-auto md:top-auto md:mx-auto md:w-auto md:max-w-[300px] md:opacity-100 lg:-ml-10 lg:max-w-none lg:scale-[1.08] xl:-ml-8 xl:scale-[1.12]">
              <div className="relative aspect-square w-full lg:h-[430px] lg:w-[430px] xl:h-[470px] xl:w-[470px]">
                <HeroGlobeV2 />
              </div>
            </div>

            <div className="relative z-20 md:hidden">
              <div className="grid grid-cols-4 gap-1.5 text-white">
                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <UniversityIcon />
                  </div>
                  <p className="text-[10px] font-bold leading-none">480+</p>
                  <p className="text-[8px] leading-tight text-white/70">Universities</p>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <CountryIcon />
                  </div>
                  <p className="text-[10px] font-bold leading-none">54+</p>
                  <p className="text-[8px] leading-tight text-white/70">Countries</p>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <StudentsIcon />
                  </div>
                  <p className="text-[10px] font-bold leading-none">100000+</p>
                  <p className="text-[8px] leading-tight text-white/70">MBBS Abroad</p>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[#7EE1FF]">
                    <ShieldIcon />
                  </div>
                  <p className="text-[10px] font-bold leading-none">823+ | 1.29L+</p>
                  <p className="text-[8px] leading-tight text-white/70">Indian Colleges | MBBS Seats</p>
                </div>
              </div>
              <p className="mb-1 mt-3 text-center text-[9px] font-small leading-none tracking-wide text-white/45">
                These figures are compiled from official sources for student information & guidance.
              </p>
            </div>

            {/* Country card */}
            <div className="relative z-30 mx-auto w-full max-w-[320px] lg:mx-0 lg:self-center">
              <div className="hidden rounded-[20px] border border-white/20 bg-[#143967]/[0.82] p-2.5 shadow-[0_35px_85px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:hidden">
                <div className="grid grid-cols-2 gap-1.5">
                  {heroCountryCards.slice(0, 3).map((country) => (
                    <Link
                      key={country.href}
                      href={country.href}
                      className="group flex min-h-[56px] items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.08] px-1.5 py-1.5 text-[11px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12]"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                        <img
                          src={`https://flagcdn.com/w80/${country.flag}.png`}
                          alt={`${country.label} flag`}
                          className="h-4 w-5 rounded-[3px] object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold leading-tight text-white">
                          {country.label}
                        </p>
                        <p className="mt-0.5 text-[9px] leading-tight text-white/70">
                          {country.hint}
                        </p>
                      </div>
                    </Link>
                  ))}

                  <Link
                    href="/mbbs-abroad"
                    className="group flex min-h-[56px] items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.08] px-1.5 py-1.5 text-[11px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12]"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#7EE1FF]">
                      <span className="text-[10px] font-bold uppercase">All</span>
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold leading-tight text-white">
                        MBBS All Countries
                      </p>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="hidden w-full rounded-[22px] border border-white/20 bg-[#143967]/[0.82] p-3 shadow-[0_35px_85px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:block lg:rounded-[28px] lg:border-white/25 lg:bg-white/[0.11] lg:p-4 lg:shadow-[0_32px_90px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.16)] lg:ring-1 lg:ring-white/10">
                <div className="mb-3 hidden items-center justify-between px-1 lg:flex">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/80">
                    Quick routes
                  </p>
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7EE1FF]">
                    Top choices
                  </span>
                </div>
                <div className="space-y-2">
                  {heroCountryCards.map((country) => (
                    <Link
                      key={country.href}
                      href={country.href}
                      className="group flex items-center gap-3 rounded-[18px] border border-white/[0.12] bg-white/[0.08] px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.12] md:text-xs lg:rounded-2xl lg:px-3.5 lg:py-3 lg:hover:border-[#7EE1FF]/45"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <img
                          src={`https://flagcdn.com/w80/${country.flag}.png`}
                          alt={`${country.label} flag`}
                          className="h-5 w-6 rounded-[4px] object-cover"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold leading-tight text-white">
                          {country.label}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/75">
                          {country.hint}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/mbbs-abroad"
                  className="mt-4 hidden w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.12] px-4 py-2 text-xs font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] transition hover:bg-white/[0.18] md:flex lg:mt-5 lg:h-11 lg:border-white/30 lg:bg-white/[0.14] lg:font-bold"
                >
                  MBBS All Countries
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>

          <style jsx>{`
            @keyframes spin-slow {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            @keyframes orbit {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }

            @keyframes orbit-reverse {
              from {
                transform: rotate(360deg);
              }
              to {
                transform: rotate(0deg);
              }
            }

            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
            }

            @keyframes premium-card-float {
              0%,
              100% {
                transform: perspective(900px) rotateX(0deg) rotateY(0deg)
                  translateY(0);
              }
              50% {
                transform: perspective(900px) rotateX(1.4deg) rotateY(-1.2deg)
                  translateY(-5px);
              }
            }

            @keyframes route-glow {
              0%,
              100% {
                opacity: 0.35;
                transform: scaleX(0.78);
              }
              50% {
                opacity: 0.9;
                transform: scaleX(1);
              }
            }

            @keyframes score-ring {
              0%,
              100% {
                box-shadow:
                  0 0 0 0 rgba(34, 211, 238, 0.18),
                  0 20px 55px rgba(15, 76, 255, 0.26);
              }
              50% {
                box-shadow:
                  0 0 0 12px rgba(34, 211, 238, 0),
                  0 28px 70px rgba(15, 76, 255, 0.38);
              }
            }

            @keyframes journey-node-pulse {
              0%,
              72%,
              100% {
                transform: translateY(0) scale(1);
              }
              80% {
                transform: translateY(-4px) scale(1.06);
              }
              88% {
                transform: translateY(0) scale(1);
              }
            }

            @keyframes journey-line-flow {
              from {
                background-position: 0 0;
              }
              to {
                background-position: 24px 0;
              }
            }

            @keyframes journey-turn-pulse {
              0%,
              100% {
                opacity: 0.38;
              }
              50% {
                opacity: 1;
              }
            }

            @keyframes journey-node-shine {
              0%,
              42% {
                left: -100%;
              }
              62%,
              100% {
                left: 145%;
              }
            }

            @keyframes journey-lane-breathe {
              0%,
              100% {
                box-shadow:
                  inset 0 1px 0 rgba(255, 255, 255, 1),
                  0 20px 45px rgba(15, 45, 91, 0.11);
              }
              50% {
                box-shadow:
                  inset 0 1px 0 rgba(255, 255, 255, 1),
                  0 24px 54px rgba(15, 76, 255, 0.17);
              }
            }

            .animate-spin-slow {
              animation: spin-slow 26s linear infinite;
            }

            .animate-orbit {
              animation: orbit 16s linear infinite;
            }

            .animate-orbit-reverse {
              animation: orbit-reverse 20s linear infinite;
            }

            .animate-float {
              animation: float 3.8s ease-in-out infinite;
            }

            .premium-card-float {
              animation: premium-card-float 5.5s ease-in-out infinite;
              transform-style: preserve-3d;
            }

            .route-glow {
              animation: route-glow 2.8s ease-in-out infinite;
              transform-origin: center;
            }

            .score-ring {
              animation: score-ring 3.2s ease-in-out infinite;
            }

            .journey-node {
              animation: journey-node-pulse 4.6s ease-in-out infinite;
              transform-style: preserve-3d;
            }

            .journey-connector {
              animation: journey-line-flow 1.1s linear infinite;
              background-size: 24px 2px;
            }

            .journey-turn {
              animation: journey-turn-pulse 2.2s ease-in-out infinite;
            }

            .journey-node-shine {
              animation: journey-node-shine 3.8s ease-in-out infinite;
            }

            .journey-glass-lane {
              animation: journey-lane-breathe 5.8s ease-in-out infinite;
            }

            .globe-surface {
              animation: spin-slow 20s linear infinite;
            }

            .globe-grid {
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cpath d='M0 20h200M0 40h200M0 60h200M0 80h200M0 100h200M0 120h200M0 140h200M0 160h200M0 180h200M20 0v200M40 0v200M60 0v200M80 0v200M100 0v200M120 0v200M140 0v200M160 0v200M180 0v200' fill='none' stroke='rgba(255,255,255,0.14)' stroke-width='0.8'/%3E%3C/svg%3E");
              background-size: cover;
            }

            .destination-white-globe {
              border-radius: 9999px;
              border: 1px solid rgba(14, 116, 144, 0.08);
              background:
                radial-gradient(circle at 38% 34%, rgba(255, 255, 255, 0.96), transparent 18%),
                repeating-radial-gradient(circle, transparent 0 23px, rgba(14, 116, 144, 0.10) 24px 25px),
                linear-gradient(90deg, transparent 46%, rgba(14, 116, 144, 0.12) 48%, transparent 51%),
                linear-gradient(0deg, transparent 46%, rgba(20, 184, 166, 0.10) 48%, transparent 51%),
                radial-gradient(circle, rgba(236, 254, 255, 0.96), rgba(255, 255, 255, 0.55) 58%, transparent 72%);
              box-shadow:
                inset -28px -28px 70px rgba(8, 47, 73, 0.08),
                0 0 70px rgba(255, 255, 255, 0.90),
                0 26px 80px rgba(8, 145, 178, 0.16);
              transform: rotate(-12deg);
            }

            .destination-marketplace-scroll {
              -ms-overflow-style: none;
              overscroll-behavior-x: contain;
              scrollbar-width: none;
            }

            .destination-marketplace-scroll::-webkit-scrollbar {
              display: none;
            }

            @media (prefers-reduced-motion: reduce) {
              .premium-card-float,
              .route-glow,
              .score-ring,
              .journey-node,
              .journey-connector,
              .journey-turn,
              .journey-node-shine,
              .journey-glass-lane {
                animation: none;
              }
            }
          `}</style>

          <div className="relative z-[70] mt-2 grid min-w-0 gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="min-w-0 space-y-8">
              <section className="relative -mt-6 min-w-0 overflow-hidden rounded-t-[14px] border border-white bg-white/95 p-1 text-[#06203f] shadow-[0_-12px_45px_rgba(255,255,255,0.48),0_24px_70px_rgba(8,47,73,0.18)] backdrop-blur-xl sm:-mt-6 sm:p-4">
                <div className="destination-white-globe pointer-events-none absolute -right-20 -top-24 h-80 w-80 opacity-80 md:-right-12 md:-top-28 md:h-[420px] md:w-[420px]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0))]" />

                <div className="relative flex w-full flex-col items-center">
                  <div className="flex w-full items-center justify-center px-2">
                    <div className="flex max-w-full items-center justify-center gap-2.5 text-[#06203f]">
                      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-100 bg-[linear-gradient(145deg,#ffffff_0%,#e8fdff_48%,#bdf4ee_100%)] text-cyan-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_-5px_-7px_14px_rgba(8,145,178,0.14),0_10px_22px_rgba(8,145,178,0.20)] [transform:perspective(480px)_rotateX(10deg)_rotateY(-14deg)] sm:h-10 sm:w-10">
                        <span className="pointer-events-none absolute left-2 top-1.5 h-2 w-3 rounded-full bg-white/80 blur-[1px]" />
                        <span className="pointer-events-none absolute inset-1 rounded-full border border-white/70" />
                        <Globe2
                          className="relative h-5 w-5 drop-shadow-[0_2px_2px_rgba(8,47,73,0.22)] sm:h-[22px] sm:w-[22px]"
                          strokeWidth={2.4}
                        />
                      </span>

                      <div className="min-w-0 text-center">
                        <h2 className="truncate text-[18px] font-black tracking-tight text-[#06203f] sm:text-2xl">
                          Top MBBS Destinations
                        </h2>
                        <p className="truncate text-[10px] font-semibold text-cyan-800/75 sm:text-xs">
                          (NMC/FMGL Checks & English-Medium Options)
                        </p>
                      </div>

                      <button
                        type="button"
                        aria-label="Search destinations"
                        aria-expanded={isDestinationSearchOpen}
                        onClick={toggleDestinationSearch}
                        className="group/search relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-100 bg-[linear-gradient(145deg,#ffffff_0%,#eefcff_52%,#c9f7ee_100%)] p-0 text-cyan-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_-5px_-7px_14px_rgba(8,145,178,0.12),0_10px_22px_rgba(8,145,178,0.18)] transition duration-300 [transform:perspective(480px)_rotateX(10deg)_rotateY(14deg)] hover:-translate-y-0.5 hover:text-cyan-950 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.96),inset_-5px_-7px_14px_rgba(8,145,178,0.15),0_14px_28px_rgba(8,145,178,0.26)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 active:translate-y-0 active:scale-95 sm:h-10 sm:w-10"
                      >
                        <span className="pointer-events-none absolute left-2 top-1.5 h-2 w-3 rounded-full bg-white/85 blur-[1px]" />
                        <span className="pointer-events-none absolute inset-1 rounded-full border border-white/70 transition group-hover/search:border-cyan-100" />
                        <Search
                          className="relative h-[18px] w-[18px] drop-shadow-[0_2px_2px_rgba(8,47,73,0.22)] transition duration-300 group-hover/search:scale-110 sm:h-5 sm:w-5"
                          strokeWidth={2.6}
                        />
                      </button>
                    </div>
                  </div>

                  {(isDestinationSearchOpen || searchQuery) ? (
                    <div className="mx-auto mt-3 w-full max-w-sm px-1">
                      <label htmlFor="home-hero-destination-search" className="sr-only">
                        Search countries
                      </label>
                      <div className="relative">
                        <input
                          id="home-hero-destination-search"
                          name="homeHeroDestinationSearch"
                          ref={destinationSearchInputRef}
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search country"
                          className="w-full rounded-2xl border border-cyan-100 bg-white px-3 py-2.5 pr-11 text-sm text-[#06203f] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_rgba(8,47,73,0.08)] transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-200/60"
                        />
                        <button
                          type="button"
                          aria-label="Close destination search"
                          onClick={closeDestinationSearch}
                          className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-100 bg-cyan-50 text-cyan-800 transition hover:border-cyan-300 hover:bg-white hover:text-cyan-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                        >
                          <X className="h-4 w-4" strokeWidth={2.6} />
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-2 w-full space-y-2">
                    <div className="relative">
                      <button
                        type="button"
                        aria-label="Scroll top destination row left"
                        onClick={() => scrollDestinationRow(0, -1)}
                        className="absolute left-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-100 bg-white/95 text-cyan-800 shadow-[0_10px_24px_rgba(8,47,73,0.18)] transition hover:border-cyan-300 hover:bg-cyan-50"
                      >
                        <ChevronLeft className="h-4 w-4" strokeWidth={2.4} />
                      </button>

                      <div
                        ref={topMarketplaceScrollRef}
                        className="destination-marketplace-scroll flex max-w-full snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-1 pt-1 sm:gap-3"
                      >
                        {marketplaceRows[0].map((destination) => (
                          <DestinationMarketplaceCard
                            key={destination.href}
                            destination={destination}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        aria-label="Scroll top destination row right"
                        onClick={() => scrollDestinationRow(0, 1)}
                        className="absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-100 bg-white/95 text-cyan-800 shadow-[0_10px_24px_rgba(8,47,73,0.18)] transition hover:border-cyan-300 hover:bg-cyan-50"
                      >
                        <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
                      </button>
                    </div>

                    <div className="mx-4 h-px bg-[linear-gradient(90deg,transparent,rgba(8,145,178,0.28),transparent)]" />

                    <div className="relative">
                      <button
                        type="button"
                        aria-label="Scroll bottom destination row left"
                        onClick={() => scrollDestinationRow(1, -1)}
                        className="absolute left-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-100 bg-white/95 text-cyan-800 shadow-[0_10px_24px_rgba(8,47,73,0.18)] transition hover:border-cyan-300 hover:bg-cyan-50"
                      >
                        <ChevronLeft className="h-4 w-4" strokeWidth={2.4} />
                      </button>

                      <div
                        ref={bottomMarketplaceScrollRef}
                        className="destination-marketplace-scroll flex max-w-full snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 pt-1 sm:gap-3"
                      >
                        {marketplaceRows[1].map((destination) => (
                          <DestinationMarketplaceCard
                            key={destination.href}
                            destination={destination}
                          />
                        ))}
                      </div>

                      <button
                        type="button"
                        aria-label="Scroll bottom destination row right"
                        onClick={() => scrollDestinationRow(1, 1)}
                        className="absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-100 bg-white/95 text-cyan-800 shadow-[0_10px_24px_rgba(8,47,73,0.18)] transition hover:border-cyan-300 hover:bg-cyan-50"
                      >
                        <ChevronRight className="h-4 w-4" strokeWidth={2.4} />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <section className="relative isolate overflow-hidden rounded-[28px] border border-cyan-300/30 bg-[radial-gradient(circle_at_8%_0%,rgba(79,70,229,.34),transparent_28%),radial-gradient(circle_at_94%_14%,rgba(0,200,150,.24),transparent_28%),linear-gradient(145deg,#030b26_0%,#06245a_52%,#07143a_100%)] p-3 text-white shadow-[0_30px_80px_rgba(3,12,45,0.42),inset_0_1px_0_rgba(255,255,255,0.16)] sm:rounded-[34px] sm:p-6">
                <div className="pointer-events-none absolute -left-20 top-20 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 top-1/3 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.28)_1px,transparent_1px)] [background-size:26px_26px]" />
                <Sparkles className="pointer-events-none absolute right-5 top-5 h-5 w-5 text-amber-400/70 sm:right-8 sm:top-8" />

                <div className="relative text-center">
                  <div className="flex items-center justify-center gap-2 sm:gap-4">
                    <span className="h-px w-6 bg-gradient-to-r from-transparent to-amber-400 sm:w-20" />
                    <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-white/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_10px_24px_rgba(0,0,0,.2)] backdrop-blur-xl sm:px-5 sm:text-xs sm:tracking-[0.22em]">
                      <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                      WHY ILMALINK MEDIGO
                    </p>
                    <span className="h-px w-6 bg-gradient-to-l from-transparent to-amber-400 sm:w-20" />
                  </div>

                  <h2 className="mx-auto mt-4 max-w-3xl text-[27px] font-black leading-[1.06] tracking-[-0.035em] text-white sm:mt-5 sm:text-4xl lg:text-[44px]">
                    Smart tools for safer{" "}
                    <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">MBBS</span> decisions.
                  </h2>
                  <p className="mx-auto mt-3 max-w-3xl text-[11px] font-medium leading-[1.65] text-blue-100/82 sm:mt-4 sm:text-sm sm:leading-6">
                    ILMALINK MEDIGO helps students and parents compare MBBS India and MBBS
                    Abroad options with practical tools, eligibility checks, scholarship
                    support and transparent guidance before taking admission decisions.
                  </p>

                  <div className="mx-auto mt-4 grid max-w-2xl grid-cols-3 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,.13),0_12px_28px_rgba(0,0,0,.18)] backdrop-blur-xl sm:mt-5 sm:rounded-full">
                    {[
                      ["Transparent", ShieldCheck],
                      ["Practical", SearchCheck],
                      ["Student-first", GraduationCap],
                    ].map(([label, Icon], index) => (
                      <div
                        key={label as string}
                        className={`flex min-h-10 items-center justify-center gap-1 px-1 text-[9px] font-extrabold text-blue-50 sm:min-h-12 sm:gap-2 sm:text-sm ${
                          index > 0 ? "border-l border-white/15" : ""
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 text-[#0F4CFF] sm:h-5 sm:w-5" />
                        {label as string}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
                  {decisionTools.map((tool, index) => {
                    const accent = decisionToolAccents[tool.accent];
                    const cardClassName =
                      "group flex min-h-[142px] min-w-0 flex-col rounded-[18px] border border-slate-200/90 bg-white/95 p-2 shadow-[0_10px_25px_rgba(15,45,91,0.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_34px_rgba(15,76,255,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4CFF] sm:min-h-[238px] sm:rounded-[22px] sm:p-4";
                    const cardContent = (
                      <>
                        <div className="flex items-start justify-between gap-1">
                          <PremiumDecisionIcon icon={tool.icon} accent={tool.accent} />
                          <span
                            className={`rounded-full px-1.5 py-1 text-[9px] font-black leading-none sm:px-2.5 sm:text-[10px] ${accent.number}`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <h3 className="mt-2 break-words text-[11px] font-black leading-[1.16] text-[#071B44] sm:mt-4 sm:text-base sm:leading-5">
                          {tool.title}
                        </h3>
                        <p
                          id={`decision-tool-description-${index}`}
                          className="sr-only text-xs font-medium leading-5 text-slate-600 sm:not-sr-only sm:mt-2"
                        >
                          {tool.description}
                        </p>
                        <span
                          className={`mt-auto inline-flex items-center gap-0.5 pt-2 text-[9px] font-black sm:gap-1 sm:text-xs ${accent.action}`}
                        >
                          Open
                          <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-3.5 sm:w-3.5" />
                        </span>
                      </>
                    );

                    if ("opensRankPredictor" in tool && tool.opensRankPredictor) {
                      return (
                        <a
                          key={tool.title}
                          href={tool.href}
                          aria-describedby={`decision-tool-description-${index}`}
                          className={cardClassName}
                          onClick={(event) => {
                            event.preventDefault();
                            setShowRankPredictor(true);
                          }}
                        >
                          {cardContent}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={tool.title}
                        href={tool.href}
                        aria-describedby={`decision-tool-description-${index}`}
                        className={cardClassName}
                      >
                        {cardContent}
                      </Link>
                    );
                  })}
                </div>

                <div className="relative mt-4 rounded-[20px] border border-cyan-200/25 bg-white/[0.08] px-3 py-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl sm:mt-6 sm:px-5 sm:py-4">
                  <p className="text-[11px] font-bold leading-5 text-blue-50 sm:text-sm">
                    Student decisions should be guided by fit, rules and transparency — not
                    only by admission pressure.
                  </p>
                </div>
              </section>
            </div>

            <aside className="space-y-8">
              <NeetDecisionCenter
                neetScore={neetScore}
                neetPathway={neetPathway}
                isInvalid={neetScoreIsInvalid}
                inputRef={neetScoreInputRef}
                onScoreChange={(value) => {
                  setNeetScore(value);
                  setAnalysedNeetScore("");
                  setNeetAttempted(false);
                }}
                onAnalyse={analyseNeetScore}
                onReset={resetNeetScore}
                onCounselling={() => setShowPopup(true)}
              />
              {false && (
              <section className="relative isolate overflow-hidden rounded-[30px] border border-cyan-200/25 bg-[radial-gradient(circle_at_12%_0%,rgba(34,211,238,0.24),transparent_31%),radial-gradient(circle_at_95%_16%,rgba(99,102,241,0.3),transparent_34%),linear-gradient(145deg,#04152f_0%,#082c5c_50%,#071b44_100%)] p-3.5 text-white shadow-[0_30px_75px_rgba(3,20,50,0.38),inset_0_1px_0_rgba(255,255,255,0.16)] sm:rounded-[34px] sm:p-6">
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full border border-cyan-200/20 bg-cyan-300/10 blur-[1px]" />
                <div className="pointer-events-none absolute -right-7 -top-7 h-28 w-28 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl sm:text-xs">
                      <BrainCircuit className="h-4 w-4 text-cyan-300" />
                      NEET Decision Center
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-200">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
                      Live guidance
                    </span>
                  </div>

                  <h3 className="mt-4 max-w-sm text-[25px] font-black leading-[1.04] tracking-[-0.035em] text-white sm:text-[32px]">
                    Turn your score into a{" "}
                    <span className="bg-gradient-to-r from-cyan-300 via-white to-emerald-200 bg-clip-text text-transparent">
                      clear MBBS plan.
                    </span>
                  </h3>
                  <p className="mt-3 text-xs font-medium leading-5 text-blue-100/82 sm:text-sm sm:leading-6">
                    Compare India, Abroad, BDS, AYUSH, paramedical and repeat-NEET
                    pathways from one practical score analysis.
                  </p>

                  <div className="premium-card-float relative mt-5 rounded-[25px] border border-white/75 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(238,248,255,0.94))] p-3 text-[#071B44] shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_-10px_-14px_28px_rgba(15,76,255,0.07),0_26px_55px_rgba(0,9,35,0.36)] sm:p-4">
                    <span className="pointer-events-none absolute left-5 top-2 h-2 w-24 rounded-full bg-white blur-[2px]" />
                    <label
                      htmlFor="home-hero-neet-score"
                      className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.16em] text-[#0F4CFF]"
                    >
                      Enter NEET Score
                      <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] tracking-normal text-slate-500">
                        Valid range 1–720
                      </span>
                    </label>

                    <div className="relative mt-2">
                      <input
                        id="home-hero-neet-score"
                        name="homeHeroNeetScore"
                        type="number"
                        min={1}
                        max={720}
                        inputMode="numeric"
                        value={neetScore}
                        onChange={(event) => setNeetScore(event.target.value)}
                        placeholder="512"
                        className="score-ring w-full rounded-[20px] border border-blue-100 bg-[linear-gradient(145deg,#ffffff,#eef6ff)] px-4 py-3 pr-16 text-4xl font-black tracking-[-0.05em] text-[#071B44] outline-none transition [appearance:textfield] placeholder:text-slate-300 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/15 sm:py-4 sm:text-5xl [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
                        / 720
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100 shadow-inner">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#0F4CFF,#22d3ee,#00C896)] shadow-[0_0_16px_rgba(34,211,238,0.8)] transition-all duration-700"
                        style={{
                          width: neetPathway
                            ? `${Math.max(
                                2,
                                Math.min(100, (parsedNeetScore / 720) * 100)
                              )}%`
                            : "0%",
                        }}
                      />
                    </div>
                    <div className="mt-1.5 flex justify-between text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400">
                      <span>Qualifying zone</span>
                      <span>Top priority zone</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    {!neetScore && (
                      <div className="rounded-[22px] border border-white/15 bg-white/[0.08] p-3 backdrop-blur-xl sm:p-4">
                        <p className="text-xs font-semibold leading-5 text-blue-50">
                          {getNeetPathwayEmptyState}
                        </p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {[
                            ["India routes", Landmark],
                            ["Abroad backup", Globe2],
                            ["Budget fit", WalletCards],
                            ["Next action", Workflow],
                          ].map(([label, Icon]) => (
                            <div
                              key={label as string}
                              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-2.5 py-2 text-[10px] font-bold text-blue-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                            >
                              <Icon className="h-3.5 w-3.5 text-cyan-300" />
                              {label as string}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {neetScoreIsInvalid && (
                      <div className="rounded-[22px] border border-amber-300/45 bg-amber-300/12 p-4 text-xs font-bold leading-5 text-amber-100 backdrop-blur-xl">
                        {getNeetPathwayInvalidState}
                      </div>
                    )}

                    {neetPathway && (
                      <div className="space-y-3">
                        <div className="relative overflow-hidden rounded-[24px] border border-cyan-200/30 bg-[linear-gradient(135deg,rgba(15,76,255,0.34),rgba(34,211,238,0.13))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
                          <div className="pointer-events-none absolute -right-7 -top-7 h-24 w-24 rounded-full bg-cyan-300/15 blur-2xl" />
                          <div className="relative flex items-start gap-3">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[19px] border border-white/20 bg-white/12 text-xl font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_15px_30px_rgba(0,0,0,0.2)]">
                              {neetPathway?.bandLabel}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-200">
                                Your score band
                              </p>
                              <p className="mt-1 text-sm font-black leading-5 text-white">
                                {neetPathway?.headline}
                              </p>
                            </div>
                          </div>
                        </div>

                        {[
                          {
                            label: "Likely India Route",
                            value: neetPathway?.indiaRoute ?? "",
                            icon: Landmark,
                            style:
                              "border-blue-200/25 bg-blue-400/10 text-blue-100",
                            iconStyle: "bg-blue-400/20 text-blue-200",
                          },
                          {
                            label: "Abroad / Backup Route",
                            value: neetPathway?.abroadBackup ?? "",
                            icon: Globe2,
                            style:
                              "border-violet-200/25 bg-violet-400/10 text-violet-100",
                            iconStyle: "bg-violet-400/20 text-violet-200",
                          },
                          {
                            label: "Budget Advice",
                            value: neetPathway?.budgetAdvice ?? "",
                            icon: WalletCards,
                            style:
                              "border-amber-200/25 bg-amber-300/10 text-amber-100",
                            iconStyle: "bg-amber-300/20 text-amber-200",
                          },
                          {
                            label: "Recommended Next Step",
                            value: neetPathway?.nextStep ?? "",
                            icon: Workflow,
                            style:
                              "border-emerald-200/25 bg-emerald-300/10 text-emerald-100",
                            iconStyle: "bg-emerald-300/20 text-emerald-200",
                          },
                        ].map(({ label, value, icon: Icon, style, iconStyle }) => (
                          <div
                            key={label}
                            className={`rounded-[20px] border p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl ${style}`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
                              >
                                <Icon className="h-4 w-4" />
                              </span>
                              <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.14em]">
                                  {label}
                                </p>
                                <p className="mt-1 text-[11px] font-medium leading-[1.55] text-white/88 sm:text-xs">
                                  {value}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="rounded-[20px] border border-amber-300/35 bg-amber-300/12 p-3 text-amber-50">
                          <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.14em] text-amber-200">
                            <ShieldCheck className="h-4 w-4" />
                            Guidance note
                          </p>
                          <p className="mt-1.5 text-[11px] font-medium leading-[1.55] text-amber-50/90">
                            {neetPathway?.warning}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPopup(true)}
                    className="group relative mt-4 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[20px] border border-emerald-200/60 bg-[linear-gradient(135deg,#70f5d4_0%,#00C896_48%,#00a9a8_100%)] px-4 py-3.5 text-center text-xs font-black text-[#04152f] shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_18px_35px_rgba(0,200,150,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_25px_45px_rgba(0,200,150,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 sm:text-sm"
                  >
                    <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/45 blur-md transition duration-700 group-hover:left-[115%]" />
                    <Headset className="relative h-4 w-4" />
                    <span className="relative">
                      Get Personalised Guidance for Your Plan
                    </span>
                    <ArrowUpRight className="relative h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </section>
              )}

              <section className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-[linear-gradient(145deg,#ffffff_0%,#f2f7ff_52%,#ecfeff_100%)] p-3.5 shadow-[0_22px_52px_rgba(15,45,91,0.14),inset_0_1px_0_rgba(255,255,255,1)] sm:rounded-[32px] sm:p-5">
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-200/40 blur-3xl" />
                <div className="relative flex items-center justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#0B1D39] sm:text-xs">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                      Live admission dashboard
                    </p>
                    <p className="mt-1 text-[10px] font-semibold text-slate-500">
                      ILMALINK support activity
                    </p>
                  </div>
                  <BarChart3 className="h-6 w-6 text-[#0F4CFF]" />
                </div>

                <div className="relative mt-3 grid grid-cols-2 gap-2.5 sm:mt-5 sm:gap-3">
                  {liveMetrics.map((metric, index) => {
                    const Icon = metric.icon;

                    return (
                      <div
                        key={metric.label}
                        className={`group relative min-w-0 overflow-hidden rounded-[20px] border border-white/90 bg-white/88 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_13px_26px_rgba(15,45,91,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(15,76,255,0.16)] sm:p-4 ${
                          index % 2 === 0
                            ? "[transform:perspective(600px)_rotateX(2deg)_rotateY(-2deg)]"
                            : "[transform:perspective(600px)_rotateX(2deg)_rotateY(2deg)]"
                        }`}
                      >
                        <span
                          className={`absolute -right-5 -top-5 h-16 w-16 rounded-full bg-gradient-to-br opacity-15 blur-xl ${metric.tone}`}
                        />
                        <div
                          className={`relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_8px_16px_rgba(15,45,91,0.18)] ${metric.tone}`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="relative mt-2 text-xl font-black tracking-[-0.04em] text-[#081B35] sm:text-3xl">
                          {metric.value}
                        </p>
                        <p className="relative mt-0.5 truncate text-[9px] font-bold uppercase tracking-[0.08em] text-slate-500 sm:text-[11px]">
                          {metric.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="relative mt-3 text-[9px] font-medium leading-4 text-slate-500">
                  Compiled from ILMALINK MEDIGO guidance records and official public sources.
                </p>
              </section>
            </aside>
          </div>

          <section className="relative mt-10 overflow-hidden rounded-[28px] border border-blue-100/80 bg-[radial-gradient(circle_at_50%_-20%,rgba(15,76,255,0.15),transparent_38%),linear-gradient(145deg,#f8fbff_0%,#ffffff_45%,#f0fbfa_100%)] p-2.5 shadow-[0_30px_75px_rgba(15,45,91,0.14),inset_0_1px_0_rgba(255,255,255,1)] sm:rounded-[34px] sm:p-5">
            <div className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 top-1/3 h-56 w-56 rounded-full bg-emerald-200/35 blur-3xl" />

            <div className="relative mx-auto max-w-4xl text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#0F4CFF] shadow-[0_10px_25px_rgba(15,76,255,0.1)] sm:text-xs">
                <Workflow className="h-4 w-4" />
                Your admission journey
              </p>
              <h2 className="mx-auto mt-3 max-w-3xl text-[25px] font-black leading-[1.08] tracking-[-0.04em] text-[#071B44] sm:text-4xl">
                One support system.{" "}
                <span className="bg-gradient-to-r from-[#0F4CFF] via-cyan-500 to-[#00A876] bg-clip-text text-transparent">
                  Two smart pathways.
                </span>
              </h2>
              <p className="mx-auto mt-2 max-w-3xl text-[11px] font-medium leading-5 text-slate-600 sm:text-sm">
                ILMALINK MEDIGO helps identify whether India or Abroad is the
                stronger fit, then supports each official step from profile
                analysis to college joining.
              </p>

              <button
                type="button"
                data-open-counselling
                onClick={() => setShowPopup(true)}
                className="group relative mt-3.5 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-blue-400/40 bg-[linear-gradient(135deg,#0F4CFF,#0879e8_48%,#00A876)] px-5 py-2.5 text-xs font-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_18px_36px_rgba(15,76,255,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_45px_rgba(15,76,255,0.36)] sm:px-7 sm:text-sm"
              >
                <span className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-white/35 blur-md transition duration-700 group-hover:left-[115%]" />
                <Headset className="relative h-4 w-4" />
                <span className="relative">Connect ILMALINK</span>
                <ArrowUpRight className="relative h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>

            <div className="relative mt-5 grid gap-3.5">
              <JourneyFlowLane
                eyebrow="MBBS Abroad pathway"
                title="India to international campus"
                description="University discovery, application, visa, permissions, travel and on-arrival support."
                steps={abroadJourneySteps}
                icon={PlaneTakeoff}
                accent="abroad"
                onConnect={() => setShowPopup(true)}
              />
              <JourneyFlowLane
                eyebrow="MBBS India pathway"
                title="NEET counselling to college reporting"
                description="MCC/state registration, choice filling, allotment, verification and joining support."
                steps={indiaJourneySteps}
                icon={Landmark}
                accent="india"
                onConnect={() => setShowPopup(true)}
              />
            </div>

            <div className="relative mx-auto mt-3.5 flex max-w-3xl items-center justify-center gap-2 rounded-[18px] border border-white bg-white/82 px-3 py-2.5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,1),0_12px_28px_rgba(15,45,91,0.08)] backdrop-blur-xl">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#00A876]" />
              <p className="text-[10px] font-bold leading-4 text-[#15315f] sm:text-xs">
                ILMALINK support follows the applicable official counselling,
                university, visa and government processes for the student’s
                selected pathway.
              </p>
            </div>
          </section>

          <DecisionIntelligenceSection />
          {false && (
          <section className="mt-12 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[32px] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                    Cost intelligence
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">
                    Compare MBBS budgets across major destinations
                  </h2>
                </div>
                <span className="rounded-full bg-[#00C896]/10 px-3 py-2 text-sm font-semibold text-[#04653d]">
                  Student-tested
                </span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {mbbsCostInsights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                  >
                    <p className="text-lg font-semibold text-[#081B35]">{item.label}</p>
                    <div className="mt-4 grid gap-2 text-sm text-slate-600">
                      <p>
                        Tuition: <span className="font-semibold text-[#0B1D39]">{item.tuition}</span>
                      </p>
                      <p>
                        Hostel:{" "}
                        <span className="font-semibold text-[#0B1D39]">{item.hostel}</span>
                      </p>
                      <p>
                        Living cost:{" "}
                        <span className="font-semibold text-[#0B1D39]">{item.living}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[10px] font-medium leading-4 text-slate-500">
                Data compiled from ILMALINK MEDIGO student guidance records and official public sources.
              </p>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                Country intelligence
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">
                Insights by destination
              </h2>
              <div className="mt-6 grid gap-3">
                {destinationData.slice(0, 4).map((destination) => (
                  <div
                    key={destination.label}
                    className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://flagcdn.com/w40/${destination.flag}.png`}
                          alt={`${destination.label} Flag`}
                          className="h-5 w-6 rounded-sm"
                          loading="lazy"
                        />
                        <div>
                          <h3 className="text-base font-semibold text-[#081B35]">
                            {destination.label}
                          </h3>
                          <p className="text-sm text-slate-500">{destination.detail}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-[#0F4CFF]">
                        Explore
                      </span>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm text-slate-600">
                      <p>Country-wise guidance, fees and university details are on the destination page.</p>
                      <Link
                        href={destination.href}
                        aria-label={`Explore MBBS in ${destination.label}`}
                        className="inline-flex items-center gap-1 font-semibold text-[#0F4CFF] transition hover:text-[#081B35]"
                      >
                        {destination.cta}
                        <ArrowRightIcon />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          )}

          <ReadyToMoveSection
            onCounselling={() => setShowPopup(true)}
            onCheckScore={focusNeetDecisionCenter}
          />
          {false && (
          <section className="mt-12 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                  Ready to move faster?
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#081B35]">
                  Your global medical career starts here.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <Link
                  href="/about/"
                  className="inline-flex items-center justify-center rounded-full border border-[#0B1D39] px-5 py-3 text-sm font-semibold text-[#0B1D39] transition hover:bg-slate-50"
                >
                  About Us
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-[#0F4CFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3fd6]"
                  onClick={() => setShowPopup(true)}
                >
                  Book Counselling
                </button>
                <Link
                  href="/mbbs-abroad"
                  className="inline-flex items-center justify-center rounded-full bg-[#00C896] px-5 py-3 text-sm font-semibold text-[#081B35] transition hover:bg-[#00b07a]"
                >
                  Compare Countries
                </Link>
              </div>
            </div>
          </section>
          )}

      <NeetRankPredictorTool
        isOpen={showRankPredictor}
        onClose={() => setShowRankPredictor(false)}
        onBookCounselling={() => {
          setShowRankPredictor(false);
          setShowPopup(true);
        }}
      />
      <FMGEExplorerModal
        isOpen={showFMGEExplorer}
        onClose={() => setShowFMGEExplorer(false)}
        onConnect={() => {
          setShowFMGEExplorer(false);
          setShowPopup(true);
        }}
      />
      <CounsellingPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}
