"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Globe2, Search, X } from "lucide-react";
import CounsellingPopup from "./CounsellingPopup";
import FMGEExplorerModal from "./FMGEExplorerModal";
import HeroGlobeV2 from "./HeroGlobeV2";
import NeetRankPredictorTool from "./NeetRankPredictorTool";
import { countryGeoFacts } from "../data/geo";
import { navbarCountryDestinations } from "../data/navbarDestinations";

const OPEN_FMGE_EVENT = "ilmalink:open-fmge-explorer";
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

const featureBlocks = [
  {
  title: "Verified University Options",
  desc: "Compare medical university options with recognition, fee and NMC/FMGL rule checks.",
},
  {
  title: "Application Follow-up Support",
  desc: "Get step-by-step application, offer letter and document follow-up support.",
},
  {
    title: "NEET Intelligence Center",
    desc: "Get score-based pathways and scholarship recommendations for MBBS admissions.",
  },
  {
    title: "Global Student Support",
    desc: "Dedicated mentors, document guidance, and 24/7 admissions assistance.",
  },
];

const liveMetrics = [
  { label: "Applications Submitted", value: "5000+" },
  { label: "Offer Letters Issued", value: "2000+" },
  { label: "Visas Approved", value: "1900+" },
  { label: "Universities Active", value: "480+" },
];

const costInsights = [
  { label: "India Private Management", fee: "70L+", hostel: "₹5L", living: "₹5L" },
  { label: "Georgia", fee: "₹28L", hostel: "₹2.6L", living: "₹10L-15L" },
  { label: "Kyrgyzstan", fee: "₹16L", hostel: "₹4L", living: "₹4L" },
  { label: "Bangladesh", fee: "₹30L", hostel: "₹3.5L", living: "₹3.5L" },
  { label: "Russia", fee: "₹18L", hostel: "₹5L", living: "₹5L" },
  { label: "Uzbekistan", fee: "₹16L", hostel: "₹4L", living: "₹4L" },
];

const journeySteps = [
  "NEET Score Analysis",
  "University Discovery",
  "Application Submission",
  "Offer Letter",
  "Visa Support",
  "Pre-Departure Prep",
];

const computeOutcome = (score: number) => {
  if (!score || score < 1) return "Enter a valid NEET score to see tailored pathways.";
  if (score >= 560) return "Top government MBBS, premium abroad universities, and scholarship pathways.";
  if (score >= 480) return "Strong private MBBS and high-consideration abroad options with mentoring.";
  if (score >= 420) return "Private MBBS and cost-efficient MBBS abroad destinations available.";
  return "AYUSH, supportive NEET coaching, and strong guidance for future medical admissions.";
};

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
  const universityText =
    destination.secondaryText ??
    (typeof destination.universityCount === "number"
      ? `${destination.universityCount} WDOMS entries`
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
        <p className="truncate text-[11px] font-extrabold leading-tight text-cyan-800 sm:text-xs">
          {universityText}
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
  const topMarketplaceScrollRef = useRef<HTMLDivElement | null>(null);
  const bottomMarketplaceScrollRef = useRef<HTMLDivElement | null>(null);
  const destinationSearchInputRef = useRef<HTMLInputElement | null>(null);

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
              <section className="rounded-[32px] border border-slate-200 bg-[#0B1D39] p-6 text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-[#7DD3FC]">
                      Why ILMALINK MEDIGO
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      Premium student-first admission support.
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                      ILMALINK MEDIGO is the official medical education and MBBS admission
                      guidance platform of ilmaLink, helping Indian students compare MBBS
                      Abroad, MBBS India, NEET updates, scholarships, university options
                      and counselling routes.
                    </p>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                    Trusted globally
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {featureBlocks.map((feature) => (
                    <div key={feature.title} className="rounded-[24px] bg-slate-950/10 p-5">
                      <p className="text-lg font-semibold text-white">{feature.title}</p>
                      <p className="mt-2 text-sm text-slate-300">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-8">
              <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                  NEET decision center
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#081B35]">
                  Score-based pathway guidance
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Enter your NEET score to see the most likely admission pathway across
                  India and Abroad.
                </p>
                <div className="mt-6 space-y-4">
                  <label className="space-y-2 text-sm text-slate-600">
                    NEET Score
                    <input
                      id="home-hero-neet-score"
                      name="homeHeroNeetScore"
                      type="number"
                      min={1}
                      max={720}
                      value={neetScore}
                      onChange={(event) => setNeetScore(event.target.value)}
                      placeholder="e.g. 512"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0F4CFF] focus:ring-2 focus:ring-[#0F4CFF]/15"
                    />
                  </label>
                  <div className="rounded-[24px] bg-[#eff6ff] p-4 text-sm text-slate-700">
                    {computeOutcome(Number(neetScore))}
                  </div>
                </div>
              </section>

              <section className="rounded-[32px] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                  Live admission dashboard
                </p>
                <div className="mt-6 grid gap-4">
                  {liveMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[24px] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                    >
                      <p className="text-3xl font-semibold text-[#081B35]">
                        {metric.value}
                      </p>
                      <p className="mt-2 text-sm text-slate-500">{metric.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[10px] font-medium leading-4 text-slate-500">
                  Data compiled from ILMALINK MEDIGO student guidance records and official public sources.
                </p>
              </section>
            </aside>
          </div>

          <section className="mt-12 rounded-[32px] bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
                  Admission journey
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-[#081B35]">
                  Your end-to-end MBBS application roadmap
                </h2>
              </div>
              <Link
                href="/create-account"
                className="inline-flex items-center justify-center rounded-full bg-[#0F4CFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3fd6]"
              >
                Start your journey
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {journeySteps.map((step, index) => (
                <div key={step} className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F4CFF]/10 font-semibold text-[#0F4CFF]">
                    {index + 1}
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#081B35]">{step}</p>
                </div>
              ))}
            </div>
          </section>

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
                {costInsights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[24px] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                  >
                    <p className="text-lg font-semibold text-[#081B35]">{item.label}</p>
                    <div className="mt-4 grid gap-2 text-sm text-slate-600">
                      <p>
                        Tuition: <span className="font-semibold text-[#0B1D39]">{item.fee}</span>
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
