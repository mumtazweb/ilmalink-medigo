import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  MapPin,
  MessageCircle,
  Microscope,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";

import CounsellingActionButton from "../../components/CounsellingActionButton";
import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/navbar";
import { whatsappCounsellingUrl } from "../../data/exploreLinks";
import {
  featuredGeorgiaUniversities,
  georgianAmericanUniversity,
  georgiaCountryStats,
  georgiaFinalDisclaimer,
  georgiaUniversities,
} from "../../data/georgiaUniversities";
import GeorgiaUniversityRail from "./GeorgiaUniversityCards";

export const dynamic = "force-static";

const pageUrl = "https://www.ilmalink.com/mbbs-abroad/georgia/";
const georgiaWhatsappUrl = `${whatsappCounsellingUrl}?text=${encodeURIComponent(
  "Hello ilmaLink, I want to talk to a Georgia MBBS admission expert."
)}`;

export const metadata: Metadata = {
  title:
    "MBBS in Georgia 2026 | Georgia Medical Universities, Fees & FMGE",
  description:
    "Compare MBBS in Georgia universities including Georgian American University, ALTE University and East European University. Review Georgia MBBS fees 2026, FMGE performance, NEET, eligibility, documents, WDOMS and NMC/FMGL verification.",
  keywords: [
    "MBBS in Georgia",
    "Georgia MBBS fees 2026",
    "Georgian American University",
    "GAU Georgia",
    "ALTE University",
    "East European University",
    "private medical universities in Georgia",
    "NEET required for Indian students",
    "NMC FMGL compliance check",
    "WDOMS listing verification",
    "Georgia FMGE performance",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "MBBS in Georgia 2026 | Universities, Fees & FMGE",
    description:
      "Compare all Georgia medical universities in the ilmaLink data of ilmalink, including full fee and admission pages for GAU, ALTE and EEU.",
    url: pageUrl,
    siteName: "ilmaLink",
    images: [
      {
        url: "/georgia/georgia-tbilisi-student-life.jpg",
        width: 1800,
        height: 506,
        alt: "Georgia and Tbilisi landscape for MBBS students",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBBS in Georgia 2026 | Universities, Fees & FMGE",
    description:
      "Georgia MBBS university comparison with fees, FMGE data, eligibility, documents and verification guidance.",
    images: ["/georgia/georgia-tbilisi-student-life.jpg"],
  },
};

const mainFaqs = [
  {
    question: "Is NEET required for Indian students planning MBBS in Georgia?",
    answer:
      "The Georgia university data lists NEET qualification in the admission requirements for Indian students. Students must verify the current Indian eligibility and NMC/FMGL requirements before final admission.",
  },
  {
    question: "What should students verify before choosing MBBS in Georgia?",
    answer:
      "Students must verify the exact WDOMS listing, NMC/FMGL compliance, medium of instruction, internship and clerkship structure, recognition, hostel terms, fee invoice, visa rules and latest admission status.",
  },
  {
    question: "What are the listed Georgia MBBS fees for 2026?",
    answer:
      "The current Georgia data lists GAU tuition at USD 3,250 per semester, ALTE annual tuition at USD 5,950 and EEU annual tuition at USD 5,500. Latest fee and payment details must be verified before admission.",
  },
  {
    question: "Does FMGE performance guarantee recognition or admission?",
    answer:
      "FMGE performance is displayed as reference data for comparison. Final admission depends on eligibility, documents, university approval, visa approval and applicable Georgian and Indian regulations.",
  },
];

const quickLinks = [
  { label: "Quick Jump", href: "#overview", icon: SearchCheck },
  { label: "Universities", href: "#universities", icon: Building2 },
  { label: "Fees & Cost", href: "#fees", icon: CircleDollarSign },
  { label: "Eligibility", href: "#eligibility", icon: ClipboardCheck },
  { label: "Documents", href: "#documents", icon: FileText },
  { label: "Why Georgia", href: "#why-georgia", icon: MapPin },
  { label: "FMGE Results", href: "#fmge", icon: TrendingUp },
  { label: "FAQ", href: "#faq", icon: BookOpen },
];

const whyGeorgia = [
  {
    title: "English-medium options",
    body:
      "The Georgia data includes English-medium medical pathways in selected universities, subject to verification of the latest official program document.",
    icon: BookOpen,
    tone: "blue",
  },
  {
    title: "Private university comparison",
    body:
      "GAU, ALTE University and East European University have full data-backed pages for students comparing private medical universities in Georgia.",
    icon: Building2,
    tone: "green",
  },
  {
    title: "Visible fee examples",
    body:
      "The featured university records include semester tuition, first-year hostel terms, additional fees and payment conditions where available.",
    icon: CircleDollarSign,
    tone: "amber",
  },
  {
    title: "Program and internship checks",
    body:
      "Course duration, clinical rotation, clerkship and internship details are shown when they are available in the Georgia data.",
    icon: Stethoscope,
    tone: "blue",
  },
  {
    title: "FMGE comparison",
    body:
      "University-wise FMGE 2025 appeared, passed and pass-rate figures are visible as comparison references.",
    icon: TrendingUp,
    tone: "purple",
  },
  {
    title: "Verification-first guidance",
    body:
      "Every option requires a current check of WDOMS, NMC/FMGL rules, recognition, medium, fees, hostel and admission status.",
    icon: ShieldCheck,
    tone: "green",
  },
] as const;

function buildJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.ilmalink.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "MBBS Abroad",
          item: "https://www.ilmalink.com/mbbs-abroad/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "MBBS in Georgia",
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Georgia medical universities",
      numberOfItems: georgiaUniversities.length,
      itemListElement: georgiaUniversities.map((university, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: university.name,
        url: `${pageUrl}${university.slug}/`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "MBBS in Georgia guide sections",
      itemListElement: quickLinks.map((link, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: link.label,
        url: `${pageUrl}${link.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: mainFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];
}

function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A878]">
        {eyebrow}
      </p>
      <h2
        className={`mt-2 text-2xl font-black tracking-tight text-[#071f3f] sm:text-3xl lg:text-4xl ${
          centered ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 text-sm font-medium leading-7 text-slate-600 sm:text-base ${
            centered ? "mx-auto max-w-3xl" : "max-w-4xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CtaButtons({
  dark = false,
  compact = false,
  primaryLabel = "Check Eligibility",
}: {
  dark?: boolean;
  compact?: boolean;
  primaryLabel?: string;
}) {
  return (
    <div
      className={
        compact
          ? "grid w-full grid-cols-1 gap-1.5 min-[340px]:grid-cols-[1.18fr_1fr]"
          : "flex flex-col gap-3 sm:flex-row sm:flex-wrap"
      }
    >
      <CounsellingActionButton
        className={`inline-flex min-w-0 items-center justify-center rounded-lg bg-[#00B981] font-extrabold text-white shadow-[0_12px_30px_rgba(0,185,129,0.26)] transition hover:bg-[#00A878] ${
          compact
            ? "min-h-8 whitespace-nowrap px-1 py-1 !text-[10px] tracking-[-0.025em] min-[360px]:!text-xs sm:min-h-9 sm:gap-1 sm:px-2 sm:!text-sm"
            : "min-h-11 gap-2 px-5 py-3 text-sm"
        }`}
      >
        {primaryLabel}
        {compact ? null : <ArrowRight size={16} />}
      </CounsellingActionButton>
      <a
        href={georgiaWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Talk to a Georgia admission expert on WhatsApp at 9563910223"
        className={`inline-flex min-w-0 items-center justify-center border font-extrabold transition ${
          dark
            ? "border-white/30 bg-white/10 text-white hover:border-[#51e6b3] hover:text-[#51e6b3]"
            : "border-[#0b4b7a] bg-white text-[#0b3a67] hover:border-[#00A878] hover:text-[#00A878]"
        } ${
          compact
            ? "min-h-8 whitespace-nowrap rounded-lg px-1 py-1 !text-[10px] tracking-[-0.025em] min-[360px]:!text-xs sm:min-h-9 sm:gap-1 sm:px-2 sm:!text-sm"
            : "min-h-11 gap-2 rounded-xl px-5 py-3 text-sm"
        }`}
      >
        Talk to Expert
        {compact ? null : <MessageCircle size={16} />}
      </a>
    </div>
  );
}

function GeorgiaHero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden bg-[#031b35] px-4 py-7 text-white sm:px-6 sm:py-9 lg:px-8 lg:py-10"
    >
      <Image
        src="/georgia/georgia-tbilisi-student-life.jpg"
        alt="Georgia mountain and Tbilisi city landscape"
        fill
        preload
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-75"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,27,53,0.99)_0%,rgba(3,39,72,0.92)_45%,rgba(3,27,53,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(3,27,53,0.42),transparent_45%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(102px,0.36fr)] gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(210px,0.48fr)] sm:gap-6 lg:grid-cols-[1.2fr_0.52fr] lg:items-stretch">
          <div className="min-w-0">
            <div className="inline-block max-w-full">
              <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.94] tracking-tight sm:text-6xl lg:text-7xl">
                MBBS in
                <span className="block text-[#00D39B]">Georgia</span>
              </h1>
              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7ff0ca] sm:text-xs">
                (2026 MBBS Admissions)
              </p>
            </div>
            <p className="mt-3 max-w-2xl text-base font-bold leading-5 text-white sm:text-xl">
              Georgian medical universities,
              <br />
              fees, FMGE performance
              <br />
              and admission guidance
            </p>
            <div className="mt-4 grid w-full max-w-[61vw] grid-cols-3 gap-0.5 sm:max-w-md sm:gap-3">
              {[
                ["NMC & WHO", "Compliant", ShieldCheck],
                ["English", "Medium", BookOpen],
                ["High FMGE", "Pass Rate", TrendingUp],
              ].map(([label, value, Icon]) => {
                const IconComponent = Icon as typeof ShieldCheck;

                return (
                  <div
                    key={label as string}
                    className="flex min-w-0 items-center gap-0 sm:gap-2"
                  >
                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#c7fff0]/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.2),rgba(5,97,112,0.28))] text-white shadow-[0_6px_15px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-5px_10px_rgba(0,55,91,0.28)] min-[360px]:h-7 min-[360px]:w-7 sm:h-9 sm:w-9">
                      <span className="absolute inset-[3px] rounded-full border border-white/20" />
                      <span className="absolute -right-px top-0 h-1.5 w-1.5 rounded-full bg-[#51e6b3] shadow-[0_0_8px_rgba(81,230,179,1)] ring-1 ring-[#07345d]" />
                      <IconComponent
                        size={12}
                        strokeWidth={1.7}
                        className="relative h-3 w-3 drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] min-[360px]:h-[13px] min-[360px]:w-[13px] sm:h-[18px] sm:w-[18px]"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="whitespace-nowrap text-[6px] font-black leading-none tracking-[-0.04em] text-white min-[360px]:text-[8px] sm:text-xs">
                        {label as string}
                      </p>
                      <p className="mt-0.5 whitespace-nowrap text-[6px] font-bold leading-none text-[#b8ffea] min-[360px]:text-[8px] sm:text-xs">
                        {value as string}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <CtaButtons
                dark
                compact
                primaryLabel="Admission Desk"
              />
            </div>
          </div>

          <aside className="flex min-w-0 flex-col self-stretch rounded-xl bg-white px-1.5 py-2.5 text-[#071f3f] shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-4">
            <h2 className="text-[8px] font-black uppercase leading-tight tracking-[0.05em] sm:text-xs sm:tracking-[0.08em]">
              Georgia at a glance
            </h2>
            <div className="mt-1.5 flex flex-1 flex-col justify-center divide-y divide-slate-200 sm:mt-2">
              {georgiaCountryStats.map((stat) => (
                <div
                  key={stat.label}
                  className="py-2 text-center sm:flex sm:items-center sm:justify-between sm:gap-3 sm:py-2.5 sm:text-left"
                >
                  <p className="text-[7px] font-bold leading-3 text-slate-500 sm:max-w-[68%] sm:text-[10px] sm:leading-4">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 shrink-0 text-xs font-black text-[#071f3f] sm:mt-0 sm:text-base">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function QuickNavigation() {
  return (
    <nav
      aria-label="MBBS in Georgia page sections"
      className="border-y border-white/10 bg-[#031b35] px-3 py-1 shadow-[0_8px_24px_rgba(3,27,53,0.16)] sm:px-6 lg:px-8"
      itemScope
      itemType="https://schema.org/SiteNavigationElement"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-2 lg:justify-between">
        {quickLinks.map(({ label, href, icon: Icon }, index) => (
          <a
            key={href}
            href={href}
            itemProp="url"
            aria-label={`Jump to ${label}`}
            className={`inline-flex h-6 shrink-0 items-center justify-center gap-1.5 rounded-full border px-2.5 text-[9px] font-bold leading-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#51e6b3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#031b35] sm:px-3 sm:text-[10px] lg:text-[11px] ${
              index === 0
                ? "border-[#00d39b]/70 bg-[#073b50] !text-[#d9fff2] shadow-[inset_0_0_0_1px_rgba(0,211,155,0.08)] hover:bg-[#0a4a60]"
                : "border-transparent !text-[#edf7ff] hover:border-white/15 hover:bg-white/10 hover:!text-[#62f1c7]"
            }`}
          >
            <Icon
              aria-hidden="true"
              size={11}
              strokeWidth={2}
              className={index === 0 ? "text-[#00d39b]" : "text-[#b9d8ee]"}
            />
            <span itemProp="name">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function AdmissionUpdate() {
  return (
    <section className="px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-2xl border border-red-200 bg-[#fff8f8] p-4 sm:flex-row sm:items-center sm:p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#cf1731] text-white">
          <ShieldAlert size={19} />
        </span>
        <div className="flex-1">
          <h2 className="text-sm font-black uppercase text-[#b8172f]">
            Important admission update
          </h2>
          <p className="mt-1 text-sm font-medium leading-6 text-[#26394d]">
            Georgia admission rules, university intake, fee terms, document
            criteria and visa requirements are dynamic and may change. Contact
            ilmalink for current guidance. Final admission depends on
            eligibility, documents, university approval, visa approval and
            applicable Georgian and Indian regulations.
          </p>
        </div>
        <a
          href="#verification"
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#cf1731] px-4 py-2.5 text-sm font-extrabold text-white hover:bg-[#ad1027]"
        >
          Read verification note
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}

function UniversitiesSection() {
  return (
    <section
      id="universities"
      className="scroll-mt-24 px-4 pb-3 pt-4 sm:px-6 sm:pt-5 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-center">
          <h2
            id="georgia-universities-heading"
            className="inline-flex max-w-full items-center justify-center gap-1.5 rounded-lg border border-[#00A878]/20 bg-white/90 px-2.5 py-2 text-center text-[13px] font-black leading-none tracking-normal text-[#071f3f] shadow-[0_10px_30px_rgba(8,45,67,0.08)] min-[360px]:text-sm min-[420px]:text-base sm:gap-2 sm:px-4 sm:py-3 sm:text-3xl sm:leading-tight lg:text-4xl"
          >
            <Building2 className="hidden h-4 w-4 shrink-0 text-[#00A878] min-[380px]:block sm:h-7 sm:w-7" />
            <span className="whitespace-nowrap">
              Medical (MBBS) Universities in Georgia
            </span>
          </h2>
        </div>
        <div className="mt-2">
          <GeorgiaUniversityRail
            universities={georgiaUniversities}
            labelledBy="georgia-universities-heading"
          />
        </div>
      </div>
    </section>
  );
}

function WhyGeorgiaSection() {
  const toneStyles = {
    blue: "bg-[#f2f7ff] text-[#0F4CFF]",
    green: "bg-[#effbf7] text-[#00A878]",
    amber: "bg-[#fff8ec] text-[#e58a00]",
    purple: "bg-[#f7f3ff] text-[#7254d8]",
  };

  return (
    <section
      id="why-georgia"
      className="scroll-mt-24 bg-white px-4 py-7 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Decision support"
          title="Why compare MBBS in Georgia?"
          description="The Georgia data supports a verification-led comparison of English-medium routes, private university options, listed fee plans, clinical details and FMGE performance."
          centered
        />
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-6">
          {whyGeorgia.map(({ title, body, icon: Icon, tone }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-3.5 text-center shadow-sm sm:p-4"
            >
              <span
                className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${
                  toneStyles[tone]
                }`}
              >
                <Icon size={20} />
              </span>
              <h3 className="mt-3 text-xs font-black leading-5 text-[#071f3f] sm:text-sm">
                {title}
              </h3>
              <p className="mt-2 text-[10px] font-medium leading-5 text-slate-600 sm:text-xs sm:leading-6">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeeEligibilityDocuments() {
  const feeRows = [
    ...georgianAmericanUniversity.feeRows.slice(0, 3),
    georgianAmericanUniversity.feeRows[
      georgianAmericanUniversity.feeRows.length - 1
    ],
  ].filter(Boolean);

  return (
    <section className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-w-0 max-w-7xl gap-5 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
        <article
          id="fees"
          className="min-w-0 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-black text-[#071f3f]">
            Georgia MBBS fees 2026: GAU example
          </h2>
          <p className="mt-2 text-xs font-medium leading-5 text-slate-600">
            Selected rows from the GAU 12-semester data. The complete visible
            table is available on the Georgian American University page.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[520px] border-collapse text-left text-xs">
              <thead className="bg-[#eef4fa] text-[#26394d]">
                <tr>
                  {["Year", "Semester", "Tuition", "Hostel & mess", "Total"].map(
                    (heading) => (
                      <th key={heading} className="px-3 py-3 font-black">
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {feeRows.map((row) => (
                  <tr key={row.semester}>
                    <td className="px-3 py-3 font-bold">{row.year}</td>
                    <td className="px-3 py-3">{row.semester}</td>
                    <td className="px-3 py-3">{row.tuitionFee}</td>
                    <td className="px-3 py-3">{row.hostelAndMess}</td>
                    <td className="px-3 py-3 font-bold text-[#00A878]">
                      {row.semesterTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-4 grid gap-2">
            {georgianAmericanUniversity.feeNotes.slice(0, 3).map((note) => (
              <li
                key={note}
                className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-600"
              >
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-[#00A878]"
                />
                {note}
              </li>
            ))}
          </ul>
          <Link
            href="/mbbs-abroad/georgia/georgian-american-university/#fee-structure"
            className="mt-4 inline-flex items-center gap-2 text-xs font-black text-[#0F4CFF] hover:text-[#00A878]"
          >
            View full GAU fee structure
            <ArrowRight size={14} />
          </Link>
        </article>

        <article
          id="eligibility"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-black text-[#071f3f]">
            Eligibility criteria
          </h2>
          <ul className="mt-4 grid gap-3">
            {georgianAmericanUniversity.entryRequirements.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-xs font-semibold leading-6 text-slate-700"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-[#00A878]"
                />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#verification"
            className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#0F4CFF] hover:text-[#00A878]"
          >
            Check detailed eligibility
            <ArrowRight size={14} />
          </a>
        </article>

        <article
          id="documents"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-black text-[#071f3f]">
            Documents required
          </h2>
          <ul className="mt-4 grid gap-3">
            {georgianAmericanUniversity.documentChecklist.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-xs font-semibold leading-6 text-slate-700"
              >
                <FileCheck2
                  size={17}
                  className="mt-0.5 shrink-0 text-[#0F4CFF]"
                />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/mbbs-abroad/georgia/georgian-american-university/#documents"
            className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#0F4CFF] hover:text-[#00A878]"
          >
            View university details
            <ArrowRight size={14} />
          </Link>
        </article>
      </div>
    </section>
  );
}

function FmgeAndCounselling() {
  const fmgeRows = georgiaUniversities
    .map((university) => ({
      university,
      fmge: university.fmgePerformance?.[0],
    }))
    .filter((item) => item.fmge);

  return (
    <section
      id="fmge"
      className="scroll-mt-24 px-4 pb-7 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[linear-gradient(110deg,#031b35,#063b70)] text-white shadow-[0_24px_70px_rgba(3,27,53,0.2)]">
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {[
            [
              georgiaUniversities.length.toString(),
              "Universities in Georgia data",
              Building2,
            ],
            [georgiaCountryStats[0].value, "FMGE 2025 appeared", Users],
            [georgiaCountryStats[1].value, "FMGE 2025 pass rate", TrendingUp],
            ["6 years", "Featured MD program duration", GraduationCap],
            [fmgeRows.length.toString(), "University FMGE matches", Microscope],
          ].map(([value, label, Icon]) => {
            const IconComponent = Icon as typeof Building2;

            return (
              <div
                key={label as string}
                className="flex items-center gap-3 bg-[#052b54]/85 p-4"
              >
                <IconComponent
                  size={24}
                  className="shrink-0 text-[#51e6b3]"
                />
                <div>
                  <p className="text-xl font-black text-[#51e6b3]">
                    {value as string}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-blue-100">
                    {label as string}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#51e6b3]">
              Need a university comparison?
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Get Georgia admission guidance from ilmalink
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-blue-100">
              Compare fees, eligibility, documents, FMGE references, WDOMS,
              NMC/FMGL checkpoints, hostel terms and current university
              admission status before payment.
            </p>
          </div>
          <CtaButtons dark />
        </div>
      </div>
    </section>
  );
}

function VerificationAndFaq() {
  return (
    <section
      id="verification"
      className="scroll-mt-24 bg-white px-4 py-7 sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A878]">
            Verification disclaimer
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#071f3f]">
            Rules and criteria can change
          </h2>
          <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
            {georgiaFinalDisclaimer}
          </p>
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-950">
            Final admission depends on eligibility, documents, university
            approval, visa approval and applicable Georgian and Indian
            regulations. Contact ilmalink for current guidance before
            making a payment or travel commitment.
          </p>

          <h3 className="mt-5 text-sm font-black uppercase tracking-wide text-[#071f3f]">
            Popular Georgia links
          </h3>
          <div className="mt-3 grid gap-2">
            {featuredGeorgiaUniversities.map((university) => (
              <Link
                key={university.slug}
                href={`/mbbs-abroad/georgia/${university.slug}/`}
                className="inline-flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-[#173452] transition hover:border-[#00A878] hover:text-[#00A878]"
              >
                {university.name}
                <ArrowRight size={15} />
              </Link>
            ))}
          </div>
        </div>

        <div id="faq" className="scroll-mt-24">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A878]">
            Top FAQ
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#071f3f]">
            MBBS in Georgia questions
          </h2>
          <div className="mt-4 grid gap-3">
            {mainFaqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-xl border border-slate-200 bg-[#f8fafc] p-4"
              >
                <h3 className="text-sm font-black leading-6 text-[#071f3f]">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm font-medium leading-7 text-slate-600">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GeorgiaPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-950">
      <JsonLd data={buildJsonLd()} />
      <Navbar />
      <GeorgiaHero />
      <QuickNavigation />
      <UniversitiesSection />
      <AdmissionUpdate />
      <WhyGeorgiaSection />
      <FeeEligibilityDocuments />
      <FmgeAndCounselling />
      <VerificationAndFaq />
    </main>
  );
}





