import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  Landmark,
  MessageCircle,
  Microscope,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import BangladeshGpaCalculator from "../../components/BangladeshGpaCalculator";
import CounsellingActionButton from "../../components/CounsellingActionButton";
import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/navbar";
import { whatsappCounsellingUrl } from "../../data/exploreLinks";
import { fmgeCountries } from "../../data/fmgeData";
import {
  bangladeshCountryStats,
  bangladeshDocumentChecklist,
  bangladeshEligibilityRequirements,
  bangladeshFaqs,
  bangladeshFeaturedUniversities,
  bangladeshFinalDisclaimer,
  bangladeshFraudWarnings,
  bangladeshGapRulePoints,
  bangladeshGovernmentQuotaPoints,
  bangladeshHighlightedFeeRows,
  bangladeshUniversityDirectory,
} from "../../data/bangladeshUniversities";
import BangladeshUniversityRail from "./BangladeshUniversityCards";

export const dynamic = "force-static";

const pageUrl = "https://www.ilmalink.com/mbbs-abroad/bangladesh/";
const bangladeshWhatsappUrl = `${whatsappCounsellingUrl}?text=${encodeURIComponent(
  "Hello ILMALINK MEDIGO, I want Bangladesh MBBS eligibility and college verification support.",
)}`;

const bangladeshCountryFmge =
  fmgeCountries.find((entry) => entry.country === "BANGLADESH") ??
  (() => {
    throw new Error("Bangladesh FMGE country data is missing.");
  })();

const quickLinks = [
  { label: "Quick Jump", href: "#overview", icon: SearchCheck },
  { label: "Colleges", href: "#universities", icon: Building2 },
  { label: "Fees", href: "#fees", icon: CircleDollarSign },
  { label: "Eligibility", href: "#eligibility", icon: ClipboardCheck },
  { label: "Documents", href: "#documents", icon: FileText },
  { label: "Gap Rule", href: "#bangladesh-gap-rule", icon: AlertTriangle },
  { label: "FMGE", href: "#fmge", icon: TrendingUp },
  { label: "FAQ", href: "#faq", icon: BookOpen },
];

const whyBangladesh = [
  {
    title: "Indian curriculum familiarity",
    body:
      "Many students compare Bangladesh because the curriculum flow and classroom structure can feel more familiar for Indian students.",
    icon: GraduationCap,
    tone: "blue",
  },
  {
    title: "SAARC-linked fee advantage",
    body:
      "Bangladesh remains attractive where SAARC-category tuition and living costs are lower than many other private foreign routes.",
    icon: CircleDollarSign,
    tone: "amber",
  },
  {
    title: "Strong private-college pool",
    body:
      "Students can compare multiple private medical colleges across Dhaka and other cities with visible fee ranges.",
    icon: Building2,
    tone: "green",
  },
  {
    title: "Visible FMGE references",
    body:
      "Bangladesh country-level and college-level FMGE 2025 references are available for realistic comparison before admission.",
    icon: TrendingUp,
    tone: "purple",
  },
  {
    title: "Eligibility-first planning",
    body:
      "The GPA rule, Biology GP, passing-year conditions, and NEET requirement should be verified before processing fees or booking money.",
    icon: ClipboardCheck,
    tone: "blue",
  },
  {
    title: "BM&DC and DGME verification",
    body:
      "Students must verify current DGME and BM&DC guidance, route type, and document validity before payment and travel.",
    icon: Landmark,
    tone: "green",
  },
] as const;

export const metadata: Metadata = {
  title:
    "MBBS in Bangladesh 2026 | Fees, Eligibility, FMGE & College Comparison",
  description:
    "Study MBBS in Bangladesh with private-route eligibility checks, GPA and gap-rule guidance, FMGE references, fee ranges, and verification support for Indian students.",
  keywords: [
    "MBBS in Bangladesh 2026",
    "Bangladesh MBBS eligibility for Indian students",
    "Bangladesh MBBS gap rule",
    "Bangladesh BMDC and DGME admission guidance",
    "Bangladesh medical colleges for Indian students",
    "Bangladesh FMGE 2025",
    "Sylhet Women's Medical College fee 2026",
    "Anwer Khan Modern Medical College fee 2026",
    "Green Life Medical College fee 2026",
    "Tairunnessa Memorial Medical College fee 2026",
    "Ad-din Akij Medical College fee 2026",
    "Ad-din Momin Medical College fee 2026",
    "Ad-din Sakina Women's Medical College fee 2026",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "MBBS in Bangladesh 2026 | Fees, Eligibility & FMGE",
    description:
      "Bangladesh MBBS guidance with private-route eligibility, GPA and gap-rule checks, FMGE references, and college comparison.",
    url: pageUrl,
    siteName: "ILMALINK MEDIGO",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MBBS in Bangladesh 2026 | Fees, Eligibility & FMGE",
    description:
      "Bangladesh MBBS shortlisting with eligibility, gap-rule, and FMGE guidance.",
  },
};

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
          name: "MBBS in Bangladesh",
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Featured Bangladesh medical colleges",
      numberOfItems: bangladeshUniversityDirectory.length,
      itemListElement: bangladeshUniversityDirectory.map((college, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: college.name,
        url: `${pageUrl}${college.slug}/`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "MBBS in Bangladesh guide sections",
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
      mainEntity: bangladeshFaqs.map((faq) => ({
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
        href={bangladeshWhatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Talk to a Bangladesh MBBS expert on WhatsApp"
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

function BangladeshHero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden bg-[#031b35] px-4 py-7 text-white sm:px-6 sm:py-9 lg:px-8 lg:py-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(25,122,184,0.28),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(0,211,155,0.16),transparent_28%),linear-gradient(110deg,#031b35,#0a3d68_56%,#0b3558)]" />
      <div className="absolute right-[-84px] top-12 h-52 w-52 rounded-full bg-[#00d39b]/12 blur-3xl" />
      <div className="absolute left-[-70px] bottom-0 h-44 w-44 rounded-full bg-[#0f4cff]/14 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(112px,0.42fr)] gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(210px,0.48fr)] sm:gap-6 lg:grid-cols-[1.2fr_0.52fr] lg:items-stretch">
          <div className="min-w-0">
            <div className="inline-block max-w-full">
              <h1 className="max-w-4xl text-4xl font-black uppercase leading-[0.94] tracking-tight sm:text-6xl lg:text-7xl">
                MBBS in
                <span className="block text-[#00D39B]">Bangladesh</span>
              </h1>
              <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7ff0ca] sm:text-xs">
                (2026 eligibility and admissions)
              </p>
            </div>
            <p className="mt-3 max-w-2xl text-base font-bold leading-5 text-white sm:text-xl">
              Bangladesh medical college comparison,
              <br />
              private-route eligibility, FMGE references
              <br />
              and admission guidance
            </p>
            <div className="mt-4 grid w-full max-w-[60vw] grid-cols-3 gap-1 sm:max-w-md sm:gap-3">
              {[
                ["NEET", "Required", ShieldCheck],
                ["GPA", "Rule", ClipboardCheck],
                ["FMGE", "Visible", TrendingUp],
              ].map(([label, value, Icon]) => {
                const IconComponent = Icon as typeof ShieldCheck;

                return (
                  <div
                    key={label as string}
                    className="flex min-w-0 items-center gap-0.5 sm:gap-2"
                  >
                    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c7fff0]/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.2),rgba(5,97,112,0.28))] text-white shadow-[0_6px_15px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-5px_10px_rgba(0,55,91,0.28)] min-[360px]:h-[30px] min-[360px]:w-[30px] sm:h-9 sm:w-9">
                      <span className="absolute inset-[3px] rounded-full border border-white/20" />
                      <span className="absolute -right-px top-0 h-1.5 w-1.5 rounded-full bg-[#51e6b3] shadow-[0_0_8px_rgba(81,230,179,1)] ring-1 ring-[#07345d]" />
                      <IconComponent
                        size={14}
                        strokeWidth={1.7}
                        className="relative drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] min-[360px]:h-4 min-[360px]:w-4 sm:h-[18px] sm:w-[18px]"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="whitespace-nowrap text-[7px] font-black leading-none tracking-[-0.025em] text-white min-[360px]:text-[9px] sm:text-xs">
                        {label as string}
                      </p>
                      <p className="mt-1 whitespace-nowrap text-[7px] font-bold leading-none text-[#b8ffea] min-[360px]:text-[9px] sm:text-xs">
                        {value as string}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <CtaButtons dark compact primaryLabel="Check Eligibility" />
            </div>
          </div>

          <aside className="flex min-w-0 flex-col self-stretch rounded-xl bg-white p-2.5 text-[#071f3f] shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-4">
            <h2 className="text-[8px] font-black uppercase leading-tight tracking-[0.05em] sm:text-xs sm:tracking-[0.08em]">
              Bangladesh at a glance
            </h2>
            <div className="mt-1.5 flex flex-1 flex-col justify-center divide-y divide-slate-200 sm:mt-2">
              {bangladeshCountryStats.slice(0, 4).map((stat) => (
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
      aria-label="MBBS in Bangladesh page sections"
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

function CollegesSection() {
  return (
    <section
      id="universities"
      className="kyrgyz-liquid-card-stage scroll-mt-24 overflow-hidden px-4 pb-3 pt-4 sm:px-6 sm:pt-5 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex justify-center">
          <h2
            id="bangladesh-universities-heading"
            className="inline-flex max-w-full items-center justify-center gap-1.5 rounded-lg border border-[#00A878]/20 bg-white/90 px-2.5 py-2 text-center text-[13px] font-black leading-none tracking-normal text-[#071f3f] shadow-[0_10px_30px_rgba(8,45,67,0.08)] min-[360px]:text-sm min-[420px]:text-base sm:gap-2 sm:px-4 sm:py-3 sm:text-3xl sm:leading-tight lg:text-4xl"
          >
            <Building2 className="hidden h-4 w-4 shrink-0 text-[#00A878] min-[380px]:block sm:h-7 sm:w-7" />
            <span className="whitespace-nowrap">
              Medical (MBBS) Colleges in Bangladesh
            </span>
          </h2>
        </div>
        <div className="mt-2">
          <BangladeshUniversityRail
            universities={bangladeshUniversityDirectory}
            labelledBy="bangladesh-universities-heading"
          />
        </div>
      </div>
    </section>
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
            Important regional and admission alert
          </h2>
          <p className="mt-1 text-sm font-medium leading-6 text-[#26394d]">
            Bangladesh remains a popular MBBS destination, but political climate, admission rules, visa timelines, and eligibility circulars can change. Students should verify current embassy, DGME, BM&DC, and college-level guidance before payment.
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

function WhyBangladeshSection() {
  const toneStyles = {
    blue: "bg-[#f2f7ff] text-[#0F4CFF]",
    green: "bg-[#effbf7] text-[#00A878]",
    amber: "bg-[#fff8ec] text-[#e58a00]",
    purple: "bg-[#f7f3ff] text-[#7254d8]",
  };

  return (
    <section className="scroll-mt-24 bg-white px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Decision support"
          title="Why compare MBBS in Bangladesh carefully?"
          description="Bangladesh should be shortlisted through route-specific eligibility checks, fee verification, and document validation before any payment."
          centered
        />
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-6">
          {whyBangladesh.map(({ title, body, icon: Icon, tone }) => (
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
  return (
    <section className="px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-w-0 max-w-7xl gap-5 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
        <article
          id="fees"
          className="min-w-0 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-black text-[#071f3f]">
            Bangladesh MBBS fee ranges 2026
          </h2>
          <p className="mt-2 text-xs font-medium leading-5 text-slate-600">
            Comparative total-fee estimates from uploaded 2026-2027 private-college fee letters for early budgeting.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[580px] border-collapse text-left text-xs">
              <thead className="bg-[#eef4fa] text-[#26394d]">
                <tr>
                  {[
                    "College",
                    "Fee view",
                    "Tuition / course range",
                    "Hostel & mess",
                    "Total note",
                  ].map((heading) => (
                    <th key={heading} className="px-3 py-3 font-black">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bangladeshHighlightedFeeRows.map((row) => (
                  <tr key={row.year}>
                    <td className="px-3 py-3 font-bold">{row.year}</td>
                    <td className="px-3 py-3">{row.semester}</td>
                    <td className="px-3 py-3">{row.tuition}</td>
                    <td className="px-3 py-3">{row.hostel}</td>
                    <td className="px-3 py-3 font-bold text-[#00A878]">
                      {row.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-4 grid gap-2">
            <li className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-600">
              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#00A878]" />
              These are college-letter based figures; exact payable structure varies by session, seat type, hostel, payment schedule and exchange route.
            </li>
            <li className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-600">
              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#00A878]" />
              Students should collect written fee breakups, refund policy, bank details, and payment route details before transfer.
            </li>
            <li className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-600">
              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#00A878]" />
              Never rely on unofficial verbal commitments regarding fee waivers, management quota, or gap-rule bypass.
            </li>
          </ul>
        </article>

        <article
          id="eligibility"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-black text-[#071f3f]">
            Eligibility criteria
          </h2>
          <ul className="mt-4 grid gap-3">
            {bangladeshEligibilityRequirements.map((item) => (
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

          <div
            id="bangladesh-gap-rule"
            className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3"
          >
            <p className="text-xs font-black uppercase tracking-wide text-amber-900">
              Gap rule warning
            </p>
            <ul className="mt-2 grid gap-2">
              {bangladeshGapRulePoints.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs font-semibold leading-5 text-amber-900"
                >
                  <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article
          id="documents"
          className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-black text-[#071f3f]">
            Documents required
          </h2>
          <ul className="mt-4 grid gap-3">
            {bangladeshDocumentChecklist.map((item) => (
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

          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3">
            <p className="text-xs font-black uppercase tracking-wide text-red-800">
              Fraud and fake-document warning
            </p>
            <ul className="mt-2 grid gap-2">
              {bangladeshFraudWarnings.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs font-semibold leading-5 text-red-900"
                >
                  <ShieldAlert size={14} className="mt-0.5 shrink-0 text-red-700" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <div className="mx-auto mt-5 max-w-7xl rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
        <h3 className="text-sm font-black uppercase tracking-wide text-cyan-900">
          Bangladesh MBBS GPA eligibility calculator
        </h3>
        <p className="mt-1 text-sm font-medium leading-6 text-cyan-900/90">
          Use this to check private-route eligibility using Class 10 top-five marks, Class 12 PCB marks, Biology GP 3.50, combined GPA 7.00, and NEET qualification.
        </p>
        <div className="mt-4">
          <BangladeshGpaCalculator />
        </div>
      </div>
    </section>
  );
}

function FmgeAndCounselling() {
  return (
    <section id="fmge" className="scroll-mt-24 px-4 pb-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[linear-gradient(110deg,#031b35,#063b70)] text-white shadow-[0_24px_70px_rgba(3,27,53,0.2)]">
        <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {[
            [bangladeshFeaturedUniversities.length.toString(), "Featured colleges", Building2],
            [bangladeshCountryFmge.appeared.toLocaleString("en-IN"), "FMGE 2025 appeared", Users],
            [bangladeshCountryFmge.passRate, "FMGE 2025 pass rate", TrendingUp],
            [
              bangladeshUniversityDirectory.length.toString(),
              "College profiles mapped",
              Microscope,
            ],
            ["Private route", "Main admission pathway", GraduationCap],
          ].map(([value, label, Icon]) => {
            const IconComponent = Icon as typeof Building2;

            return (
              <div
                key={label as string}
                className="flex items-center gap-3 bg-[#052b54]/85 p-4"
              >
                <IconComponent size={24} className="shrink-0 text-[#51e6b3]" />
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
              Need route verification?
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Get Bangladesh MBBS eligibility guidance from ILMALINK MEDIGO
            </h2>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-blue-100">
              Compare GPA and passing-year eligibility, college fee range, FMGE references, route-specific documentation, and payment safety checkpoints before processing admission.
            </p>
          </div>
          <CtaButtons dark />
        </div>
      </div>

      <div className="mx-auto mt-5 max-w-7xl rounded-2xl border border-blue-200 bg-blue-50 p-4">
        <h3 className="text-sm font-black uppercase tracking-wide text-blue-900">
          Bangladesh government medical foreign quota note
        </h3>
        <ul className="mt-2 grid gap-2">
          {bangladeshGovernmentQuotaPoints.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm font-semibold leading-6 text-blue-900"
            >
              <Landmark size={15} className="mt-1 shrink-0 text-blue-700" />
              {item}
            </li>
          ))}
        </ul>
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
            Rules, route criteria, and fees can change
          </h2>
          <p className="mt-4 text-sm font-medium leading-7 text-slate-700">
            {bangladeshFinalDisclaimer}
          </p>
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-7 text-amber-950">
            Final admission depends on route-eligible documents, university acceptance, visa approval, and applicable Bangladesh and India-facing regulations. Students should verify every claim in writing before payment.
          </p>

          <h3 className="mt-5 text-sm font-black uppercase tracking-wide text-[#071f3f]">
            Featured Bangladesh college references
          </h3>
          <div className="mt-3 grid gap-2">
            {bangladeshUniversityDirectory.slice(0, 4).map((college) => (
              <a
                key={college.name}
                href={`/mbbs-abroad/bangladesh/${college.slug}/`}
                className="inline-flex items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-[#173452] transition hover:border-[#00A878] hover:text-[#00A878]"
              >
                {college.name}
                <span className="text-xs font-black text-[#00A878]">{college.fees}</span>
              </a>
            ))}
          </div>
        </div>

        <div id="faq" className="scroll-mt-24">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00A878]">
            Top FAQ
          </p>
          <h2 className="mt-2 text-2xl font-black text-[#071f3f]">
            MBBS in Bangladesh questions
          </h2>
          <div className="mt-4 grid gap-3">
            {bangladeshFaqs.map((faq) => (
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

export default function BangladeshPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-950">
      <JsonLd data={buildJsonLd()} />
      <Navbar />
      <BangladeshHero />
      <QuickNavigation />
      <CollegesSection />
      <AdmissionUpdate />
      <WhyBangladeshSection />
      <FeeEligibilityDocuments />
      <FmgeAndCounselling />
      <VerificationAndFaq />
    </main>
  );
}
