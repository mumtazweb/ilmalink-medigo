import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  FileText,
  GraduationCap,
  Languages,
  MapPin,
  MessageCircle,
  Microscope,
  ShieldAlert,
  Stethoscope,
  TrendingUp,
  Users,
} from "lucide-react";

import CounsellingActionButton from "../../components/CounsellingActionButton";
import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/navbar";
import {
  georgiaFinalDisclaimer,
  georgiaUniversities,
  type GeorgiaUniversityPageData,
} from "../../data/georgiaUniversities";
import GeorgiaUniversityRail from "./GeorgiaUniversityCards";

const SITE_URL = "https://www.ilmalink.com";
const missingDetails = "latest fee/details to be verified before admission.";

function pagePath(university: GeorgiaUniversityPageData) {
  return `/mbbs-abroad/georgia/${university.slug}/`;
}

function pageUrl(university: GeorgiaUniversityPageData) {
  return `${SITE_URL}${pagePath(university)}`;
}

function universityImage(university: GeorgiaUniversityPageData) {
  return (
    university.heroImage ?? "/georgia/georgia-tbilisi-student-life.jpg"
  );
}

function metadataDescription(university: GeorgiaUniversityPageData) {
  return `${university.name} MBBS in Georgia guide for Indian students with program details, ${university.feeSummary} Review eligibility, documents, FMGE performance, WDOMS listing verification and NMC/FMGL compliance checks.`;
}

export function buildGeorgiaUniversityMetadata(
  university: GeorgiaUniversityPageData,
): Metadata {
  const canonical = pageUrl(university);
  const description = metadataDescription(university);
  const title = `${university.name} MBBS 2026 | Fees, FMGE & Admission`;

  return {
    title,
    description,
    keywords: [
      university.name,
      university.shortName ?? "",
      `${university.name} MBBS`,
      `${university.name} fees 2026`,
      "MBBS in Georgia",
      "Georgia MBBS fees 2026",
      "private medical universities in Georgia",
      "NEET required for Indian students",
      "NMC FMGL compliance check",
      "WDOMS listing verification",
      "FMGE performance",
    ].filter(Boolean),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "ILMALINK MEDIGO",
      images: [
        {
          url: universityImage(university),
          alt: `${university.name} in ${university.city}, Georgia`,
        },
      ],
      locale: "en_IN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [universityImage(university)],
    },
  };
}

function universityFaqs(university: GeorgiaUniversityPageData) {
  const neetRequirement = university.entryRequirements.find((item) =>
    item.toLowerCase().includes("neet"),
  );
  const fmge = university.fmgePerformance?.[0];

  return [
    {
      question: `What details are available for ${university.name}?`,
      answer: university.summary,
    },
    {
      question: `What is the ${university.name} fee structure for 2026?`,
      answer:
        university.feeRows.length > 0
          ? university.feeSummary
          : missingDetails,
    },
    {
      question: `Is NEET required for Indian students applying to ${university.name}?`,
      answer: neetRequirement ?? missingDetails,
    },
    {
      question: `What is the ${university.name} FMGE performance?`,
      answer: fmge
        ? `The matched FMGE 2025 record lists ${fmge.appeared.toLocaleString(
            "en-IN",
          )} appeared, ${fmge.passed.toLocaleString("en-IN")} passed and a ${
            fmge.passRate
          } pass rate. This is reference data and does not decide final admission.`
        : missingDetails,
    },
    {
      question: `What must students verify before admission to ${university.name}?`,
      answer:
        "Students must verify the exact WDOMS listing, NMC/FMGL compliance, medium of instruction, internship, recognition, hostel terms, latest fee invoice and current admission status before final admission.",
    },
  ];
}

function visibleSections(university: GeorgiaUniversityPageData) {
  return [
    ["Quick facts", "#quick-facts"],
    ["Overview", "#overview"],
    ["Program details", "#program"],
    ["Fee structure", "#fee-structure"],
    ["Eligibility", "#eligibility"],
    ["Documents", "#documents"],
    ...(university.paymentTerms.length > 0
      ? ([["Payment terms", "#payment-terms"]] as const)
      : []),
    ...(university.supportServices.length > 0
      ? ([["Student support", "#student-support"]] as const)
      : []),
    ...(university.highlights.length > 0
      ? ([["Academic highlights", "#academic-highlights"]] as const)
      : []),
    ...(university.facilities.length > 0
      ? ([["Facilities", "#facilities"]] as const)
      : []),
    ...(university.clinicalCenters.length > 0
      ? ([["Clinical training", "#clinical-training"]] as const)
      : []),
    ...(university.fmgePerformance?.length
      ? ([["FMGE performance", "#fmge"]] as const)
      : []),
    ["Verification", "#verification"],
    ["FAQ", "#faq"],
  ];
}

function buildUniversityJsonLd(university: GeorgiaUniversityPageData) {
  const canonical = pageUrl(university);
  const faqs = universityFaqs(university);
  const sections = visibleSections(university);

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "MBBS Abroad",
          item: `${SITE_URL}/mbbs-abroad/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "MBBS in Georgia",
          item: `${SITE_URL}/mbbs-abroad/georgia/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: university.name,
          item: canonical,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      "@id": `${canonical}#university`,
      name: university.name,
      alternateName: university.shortName,
      url: canonical,
      description: university.summary,
      address: {
        "@type": "PostalAddress",
        addressLocality: university.city,
        addressCountry: "GE",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `${canonical}#course`,
      name: university.program,
      description: university.summary,
      provider: {
        "@id": `${canonical}#university`,
      },
      courseMode: "On campus",
      inLanguage: university.medium,
      offers:
        university.feeRows.length > 0
          ? {
              "@type": "Offer",
              description: university.feeSummary,
              url: canonical,
            }
          : undefined,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${university.name} page sections`,
      itemListElement: sections.map(([name, href], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${canonical}${href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
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

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 px-4 py-8 sm:px-6 lg:px-8 ${
        dark ? "bg-[#042b52] text-white" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <p
          className={`text-xs font-black uppercase tracking-[0.18em] ${
            dark ? "text-[#51e6b3]" : "text-[#00A878]"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-2 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl ${
            dark ? "text-white" : "text-[#071f3f]"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-3 max-w-4xl text-sm font-medium leading-7 sm:text-base ${
              dark ? "text-blue-100" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        ) : null}
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}

function DataList({
  items,
  dark = false,
  fallback = missingDetails,
}: {
  items: string[];
  dark?: boolean;
  fallback?: string;
}) {
  const visibleItems = items.length > 0 ? items : [fallback];

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {visibleItems.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-xl p-4 text-sm font-semibold leading-7 ${
            dark
              ? "bg-white/10 text-blue-50 ring-1 ring-white/10"
              : "border border-slate-200 bg-white text-slate-700 shadow-sm"
          }`}
        >
          <CheckCircle2
            size={18}
            className={`mt-1 shrink-0 ${
              dark ? "text-[#51e6b3]" : "text-[#00A878]"
            }`}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ProfileCtas({ dark = false }: { dark?: boolean }) {
  const secondaryClass = dark
    ? "border-white/30 bg-white/10 text-white hover:border-[#51e6b3] hover:text-[#51e6b3]"
    : "border-[#0b4b7a] bg-white text-[#0b3a67] hover:border-[#00A878] hover:text-[#00A878]";

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#00B981] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#00A878]">
        Apply for Admission
        <ArrowRight size={16} />
      </CounsellingActionButton>
      <a
        href="#eligibility"
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-extrabold transition ${secondaryClass}`}
      >
        Check Eligibility
        <ClipboardCheck size={16} />
      </a>
      <CounsellingActionButton
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-extrabold transition ${secondaryClass}`}
      >
        Talk to Expert
        <MessageCircle size={16} />
      </CounsellingActionButton>
    </div>
  );
}

function UniversityHero({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  const facts = [
    ["City", university.city, MapPin],
    ["Program", university.program, GraduationCap],
    ["Duration", university.duration, CalendarDays],
    [
      "Fee status",
      university.annualTuition ?? university.feeSummary,
      CircleDollarSign,
    ],
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#031b35] px-4 py-8 text-white sm:px-6 sm:py-9 lg:px-8 lg:py-10">
      <Image
        src={universityImage(university)}
        alt={`${university.name} in ${university.city}, Georgia`}
        fill
        preload
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-[linear-gradient(98deg,rgba(3,27,53,0.99)_0%,rgba(4,50,91,0.91)_52%,rgba(3,27,53,0.45)_100%)]" />

      <div className="relative mx-auto max-w-7xl">
        <Link
          href="/mbbs-abroad/georgia/"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-100 hover:text-white"
        >
          <ArrowLeft size={15} />
          Back to MBBS in Georgia
        </Link>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full bg-[#00B981] px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white sm:text-xs">
              {university.recommendationLabel}
            </span>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#51e6b3]">
              {university.shortName
                ? `${university.shortName} · `
                : ""}
              {university.location}
            </p>
            <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {university.name} MBBS in Georgia
            </h1>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-blue-50 sm:text-lg sm:leading-8">
              {university.name} in {university.city} offers{" "}
              {university.program}. Review the available fee plan, eligibility,
              documents, FMGE data and verification checkpoints before
              admission.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-50 ring-1 ring-white/15">
                {university.accreditationLabel}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-50 ring-1 ring-white/15">
                NMC/FMGL compliance check required
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-50 ring-1 ring-white/15">
                WDOMS listing verification required
              </span>
            </div>
            <div className="mt-5 max-w-3xl">
              <ProfileCtas dark />
            </div>
          </div>

          <aside className="rounded-2xl bg-white p-4 text-[#071f3f] shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-[#00A878]">
              University at a glance
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2.5">
              {facts.map(([label, value, Icon]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 bg-[#f6f8fb] p-3"
                >
                  <Icon size={17} className="text-[#00A878]" />
                  <p className="mt-2 text-[10px] font-black uppercase tracking-wide text-slate-500">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-black leading-6 text-[#071f3f]">
                    {value}
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

function ProfileNavigation({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  const iconByHref = new Map([
    ["#quick-facts", Building2],
    ["#overview", BookOpen],
    ["#program", GraduationCap],
    ["#fee-structure", CircleDollarSign],
    ["#eligibility", ClipboardCheck],
    ["#documents", FileText],
    ["#payment-terms", FileCheck2],
    ["#student-support", Users],
    ["#academic-highlights", Microscope],
    ["#facilities", Building2],
    ["#clinical-training", Stethoscope],
    ["#fmge", TrendingUp],
    ["#verification", ShieldAlert],
    ["#faq", BookOpen],
  ]);

  return (
    <nav
      aria-label={`${university.name} page sections`}
      className="border-b border-slate-200 bg-white px-4 py-2.5 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {visibleSections(university).map(([label, href]) => {
          const Icon = iconByHref.get(href) ?? ArrowRight;

          return (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-lg bg-[#f4f7fa] px-3 py-1.5 text-xs font-extrabold text-[#173452] transition hover:bg-[#062b55] hover:text-white"
            >
              <Icon size={14} />
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function QuickFacts({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  const baseFacts = [
    ["University", university.name],
    ["City", university.city],
    ["Program", university.program],
    ["Intake", university.intake],
    ["Duration", university.duration],
    ["Medium", university.medium],
    ["Fee status", university.feeSummary],
    ["Admission position", university.recommendationLabel],
  ];

  return (
    <Section
      id="quick-facts"
      eyebrow="Quick facts"
      title={`${university.name} at a glance`}
      description="The facts below are taken from the existing ILMALINK MEDIGO Georgia university data."
    >
      <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {baseFacts.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <dt className="text-[10px] font-black uppercase tracking-[0.12em] text-[#00A878]">
              {label}
            </dt>
            <dd className="mt-2 text-sm font-extrabold leading-6 text-[#071f3f]">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function OverviewAndProgram({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  const details = [
    ["Program", university.program, GraduationCap],
    ["Intake", university.intake, CalendarDays],
    ["Duration", university.duration, CalendarDays],
    ["Medium", university.medium, Languages],
    ["City", university.location, MapPin],
    ["Fee overview", university.feeSummary, CircleDollarSign],
  ] as const;

  return (
    <>
      <Section
        id="overview"
        eyebrow="Overview"
        title={`${university.name} overview`}
      >
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <p className="text-base font-medium leading-8 text-slate-700">
              {university.summary}
            </p>
            <p className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold leading-7 text-[#16395d]">
              Students comparing MBBS in Georgia should complete an NMC/FMGL
              compliance check and WDOMS listing verification before relying on
              any university name, fee statement or admission timeline.
            </p>
          </div>
          <div className="relative h-64 overflow-hidden rounded-2xl shadow-sm sm:h-80">
            <Image
              src={university.detailImage ?? universityImage(university)}
              alt={`${university.name} program and student environment`}
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section
        id="program"
        eyebrow="Program details"
        title={`${university.name} medical program details`}
        description="Only the currently available university record is shown. Missing or changeable details require direct verification."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {details.map(([label, value, Icon]) => (
            <article
              key={label}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Icon size={19} className="text-[#00A878]" />
              <h3 className="mt-3 text-xs font-black uppercase tracking-wide text-slate-500">
                {label}
              </h3>
              <p className="mt-2 text-sm font-extrabold leading-7 text-[#071f3f]">
                {value}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function FeeSection({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  return (
    <Section
      id="fee-structure"
      eyebrow="Georgia MBBS fees 2026"
      title={`${university.name} fee structure`}
      description={university.feeSummary}
    >
      {university.feeRows.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <p className="border-b border-slate-200 bg-[#f4f7fa] px-4 py-2 text-xs font-bold text-slate-500 sm:hidden">
            Swipe horizontally to view the complete fee table.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-[#062b55] text-white">
                <tr>
                  {[
                    "Year",
                    "Semester",
                    "Tuition fee",
                    "Hostel & mess",
                    "Semester total",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-4 font-extrabold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {university.feeRows.map((row, index) => (
                  <tr
                    key={`${row.year}-${row.semester}`}
                    className={index % 2 === 0 ? "bg-[#f7fafc]" : "bg-white"}
                  >
                    <td className="px-4 py-3 font-extrabold text-[#071f3f]">
                      {row.year}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {row.semester}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {row.tuitionFee}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {row.hostelAndMess}
                    </td>
                    <td className="px-4 py-3 font-extrabold text-[#00A878]">
                      {row.semesterTotal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-bold leading-7 text-amber-950">
          {missingDetails}
        </p>
      )}

      {university.additionalFees.length > 0 ? (
        <div className="mt-7">
          <h3 className="text-xl font-black text-[#071f3f]">
            Additional fees
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {university.additionalFees.map((fee) => (
              <article
                key={fee.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h4 className="text-xs font-black uppercase leading-5 text-slate-500">
                  {fee.label}
                </h4>
                <p className="mt-2 text-lg font-black text-[#00A878]">
                  {fee.amount}
                </p>
                {fee.note ? (
                  <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                    {fee.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-7">
        <h3 className="text-xl font-black text-[#071f3f]">Fee notes</h3>
        <div className="mt-4">
          <DataList items={university.feeNotes} />
        </div>
      </div>
    </Section>
  );
}

function AdmissionSections({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  return (
    <>
      <Section
        id="eligibility"
        eyebrow="Eligibility"
        title={`Eligibility and whether NEET is required for Indian students`}
        description={`Review the available ${university.name} admission requirements and confirm the latest criteria before applying.`}
        dark
      >
        <DataList items={university.entryRequirements} dark />
      </Section>

      <Section
        id="documents"
        eyebrow="Documents required"
        title={`${university.name} admission document checklist`}
        description="Document and validity rules can change by university, visa process and regulator."
      >
        <DataList items={university.documentChecklist} />
        {university.oneTimeServiceItems.length > 0 ? (
          <div className="mt-7">
            <h3 className="text-xl font-black text-[#071f3f]">
              Arrival and one-time support items
            </h3>
            <div className="mt-4">
              <DataList items={university.oneTimeServiceItems} />
            </div>
          </div>
        ) : null}
      </Section>

      {university.paymentTerms.length > 0 ? (
        <Section
          id="payment-terms"
          eyebrow="Payment terms"
          title={`${university.name} payment conditions`}
          description="Students and parents should compare these listed terms with the latest official invoice and refund policy."
        >
          <DataList items={university.paymentTerms} />
        </Section>
      ) : null}
    </>
  );
}

function AcademicAndSupportSections({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  return (
    <>
      {university.highlights.length > 0 ? (
        <Section
          id="academic-highlights"
          eyebrow="Academic highlights"
          title={`${university.name} academic highlights`}
        >
          <DataList items={university.highlights} />
          {university.facts.length > 0 ? (
            <dl className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {university.facts.map((fact) => (
                <div
                  key={`${fact.label}-${fact.value}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <dd className="text-lg font-black text-[#00A878] sm:text-2xl">
                    {fact.value}
                  </dd>
                  <dt className="mt-1 text-[10px] font-black uppercase leading-5 tracking-wide text-slate-500">
                    {fact.label}
                  </dt>
                </div>
              ))}
            </dl>
          ) : null}
          {university.partnerHighlights.length > 0 ? (
            <div className="mt-7">
              <h3 className="text-xl font-black text-[#071f3f]">
                Partner highlights
              </h3>
              <div className="mt-4">
                <DataList items={university.partnerHighlights} />
              </div>
            </div>
          ) : null}
        </Section>
      ) : null}

      {university.facilities.length > 0 ? (
        <Section
          id="facilities"
          eyebrow="Facilities"
          title={`${university.name} facilities`}
        >
          <DataList items={university.facilities} />
        </Section>
      ) : null}

      {university.supportServices.length > 0 ? (
        <Section
          id="student-support"
          eyebrow="Student support"
          title={`${university.name} student support`}
        >
          <DataList items={university.supportServices} />
        </Section>
      ) : null}

      {university.clinicalCenters.length > 0 ? (
        <Section
          id="clinical-training"
          eyebrow="Clinical training and internship"
          title={`${university.name} clinical exposure`}
          description="The visible items below are the clinical or internship details currently available in the Georgia university data."
          dark
        >
          <DataList items={university.clinicalCenters} dark />
        </Section>
      ) : null}
    </>
  );
}

function FmgeSection({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  const fmgeRows = university.fmgePerformance ?? [];

  if (fmgeRows.length === 0) return null;

  return (
    <Section
      id="fmge"
      eyebrow="FMGE performance"
      title={`${university.name} FMGE 2025 performance`}
      description="FMGE data is shown as a reference for comparison. It does not guarantee admission, recognition, licensing or future examination outcomes."
    >
      <div className="grid gap-4">
        {fmgeRows.map((fmge) => (
          <article
            key={fmge.sourceName}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-sm font-black leading-6 text-[#071f3f]">
              {fmge.sourceName}
            </h3>
            <dl className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["Appeared", fmge.appeared.toLocaleString("en-IN")],
                ["Passed", fmge.passed.toLocaleString("en-IN")],
                ["Pass rate", fmge.passRate],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl bg-[#f4f7fa] p-3 text-center"
                >
                  <dd className="text-lg font-black text-[#00A878] sm:text-2xl">
                    {value}
                  </dd>
                  <dt className="mt-1 text-[9px] font-black uppercase tracking-wide text-slate-500 sm:text-xs">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </Section>
  );
}

function VerificationFaqAndLinks({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  const faqs = universityFaqs(university);
  const otherUniversities = georgiaUniversities.filter(
    (item) => item.slug !== university.slug,
  );

  return (
    <>
      <Section
        id="verification"
        eyebrow="Verification disclaimer"
        title={`Verify ${university.name} before final admission`}
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-2xl border border-red-200 bg-[#fff8f8] p-5">
            <div className="flex items-start gap-3">
              <ShieldAlert
                size={22}
                className="mt-1 shrink-0 text-[#c51e36]"
              />
              <div>
                <h3 className="text-lg font-black text-[#8c1528]">
                  Rules, fees and criteria are dynamic
                </h3>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
                  {georgiaFinalDisclaimer}
                </p>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-800">
                  Final admission depends on eligibility, documents, university
                  approval, visa approval and applicable Georgian and Indian
                  regulations. Contact ILMALINK MEDIGO for current guidance.
                </p>
                <p className="mt-3 text-sm font-semibold leading-7 text-slate-800">
                  Students must verify WDOMS listing, NMC/FMGL compliance,
                  medium, internship, recognition, hostel terms and latest
                  admission status before final admission.
                </p>
              </div>
            </div>
          </article>
          <div className="rounded-2xl bg-[#062b55] p-5 text-white">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#51e6b3]">
              Admission support
            </p>
            <h3 className="mt-2 text-2xl font-black">
              Ask before you pay or travel
            </h3>
            <p className="mt-3 text-sm font-medium leading-7 text-blue-100">
              Review the current fee invoice, documents, eligibility, hostel,
              visa, WDOMS entry and NMC/FMGL fit with an ILMALINK MEDIGO expert.
            </p>
            <div className="mt-5">
              <ProfileCtas dark />
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="other-universities"
        eyebrow="Internal Georgia links"
        title="Compare other Georgia medical universities"
        description="Every card links to a crawlable university profile built from the existing Georgia data."
      >
        <GeorgiaUniversityRail
          universities={otherUniversities}
          labelledBy="other-georgia-universities"
          compact
        />
        <p
          id="other-georgia-universities"
          className="text-xs font-bold text-slate-500"
        >
          Swipe or scroll manually to compare other university pages.
        </p>
      </Section>

      <Section
        id="faq"
        eyebrow="Frequently asked questions"
        title={`${university.name} FAQs`}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="text-lg font-black leading-7 text-[#071f3f]">
                {faq.question}
              </h3>
              <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

export default function GeorgiaUniversityProfile({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-950">
      <JsonLd data={buildUniversityJsonLd(university)} />
      <Navbar />
      <UniversityHero university={university} />
      <ProfileNavigation university={university} />
      <QuickFacts university={university} />
      <OverviewAndProgram university={university} />
      <FeeSection university={university} />
      <AdmissionSections university={university} />
      <AcademicAndSupportSections university={university} />
      <FmgeSection university={university} />
      <VerificationFaqAndLinks university={university} />
    </main>
  );
}
