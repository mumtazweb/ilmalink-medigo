import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  GraduationCap,
  MapPin,
  MessageCircle,
  ShieldAlert,
} from "lucide-react";

import CounsellingActionButton from "../../components/CounsellingActionButton";
import JsonLd from "../../components/JsonLd";
import Navbar from "../../components/navbar";
import {
  kyrgyzstanUniversityDirectory,
  type KyrgyzUniversityPageData,
} from "../../data/kyrgyzstanUniversities";
import { kyrgyzstanUniversityImage } from "../../data/kyrgyzstanUniversityMedia";
import KyrgyzstanUniversityRail from "./KyrgyzstanUniversityCards";

const SITE_URL = "https://www.ilmalink.com";
const missingDetails = "latest fee/details to be verified before admission.";

function pagePath(university: KyrgyzUniversityPageData) {
  return `/mbbs-abroad/kyrgyzstan/${university.slug}/`;
}

function pageUrl(university: KyrgyzUniversityPageData) {
  return `${SITE_URL}${pagePath(university)}`;
}

function metadataDescription(university: KyrgyzUniversityPageData) {
  return university.overview?.[0]
    ? `${university.overview[0]} Review accreditation, program, fees and admission verification for Indian students.`
    : `${university.name} MBBS in Kyrgyzstan guide for Indian students with accreditation status, fees, eligibility, FMGE performance and admission details. Verify NMC/FMGL compliance and WDOMS listing before admission.`;
}

function hasVerifiedFee(university: KyrgyzUniversityPageData) {
  const fee = university.feeRows[0]?.tuitionFee;
  return Boolean(
    fee &&
      fee !== "To be updated" &&
      fee !== "Not specified in brochure",
  );
}

export function buildKyrgyzstanUniversityMetadata(
  university: KyrgyzUniversityPageData,
): Metadata {
  const canonical = pageUrl(university);
  const description = metadataDescription(university);
  const title = `${university.name} MBBS 2026 | Kyrgyzstan, Fees & Accreditation`;
  const image = kyrgyzstanUniversityImage(university.slug);

  return {
    title,
    description,
    keywords: [
      university.name,
      `${university.name} MBBS`,
      "MBBS in Kyrgyzstan",
      "Kyrgyzstan MBBS 2026",
      "Kyrgyzstan medical universities",
      "NEET required for Indian students",
      "NMC FMGL compliance check",
      "WDOMS listing verification",
      "FMGE performance",
      university.accreditationStatus,
    ].filter(Boolean),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "ILMALINK MEDIGO",
      locale: "en_IN",
      type: "article",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

function universityFaqs(university: KyrgyzUniversityPageData) {
  const fmge = university.fmgePerformance?.[0];

  return [
    {
      question: `What is ${university.name} accreditation status?`,
      answer: `${university.accreditationLabel}. ${university.recommendationMessage}`,
    },
    {
      question: `What is the ${university.name} fee structure for 2026?`,
      answer:
        hasVerifiedFee(university)
          ? `Tuition fees start from ${university.feeRows[0].tuitionFee}. Please verify the latest fee structure before admission.`
          : "The verified fee structure has not yet been added. Obtain a current university-issued fee schedule before admission or payment.",
    },
    {
      question: `What are the eligibility requirements for ${university.name}?`,
      answer:
        university.entryRequirements.length > 0
          ? university.entryRequirements.join(", ")
          : missingDetails,
    },
    {
      question: `What is the ${university.name} FMGE performance?`,
      answer: fmge
        ? `FMGE 2025: ${fmge.appeared.toLocaleString("en-IN")} appeared, ${fmge.passRate} pass rate. Verify latest data before admission.`
        : missingDetails,
    },
    {
      question: `What must students verify before admission to ${university.name}?`,
      answer:
        "Students must verify NMC/FMGL compliance, WDOMS listing, course duration, English-medium instruction, internship terms, hostel details, latest fee invoice and current admission status.",
    },
  ];
}

function visibleSections(university: KyrgyzUniversityPageData) {
  return [
    ["Quick facts", "#quick-facts"],
    ["Overview", "#overview"],
    ...(university.highlights.length > 0
      ? ([["Academic profile", "#academic-profile"]] as const)
      : []),
    ...(university.facilities.length > 0
      ? ([["Facilities", "#facilities"]] as const)
      : []),
    ["Accreditation", "#accreditation"],
    ["Fee structure", "#fee-structure"],
    ["Eligibility", "#eligibility"],
    ["Documents", "#documents"],
    ...(university.fmgePerformance?.length
      ? ([["FMGE performance", "#fmge"]] as const)
      : []),
    ["Verification", "#verification"],
    ["FAQ", "#faq"],
  ];
}

function buildUniversityJsonLd(university: KyrgyzUniversityPageData) {
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
          name: "MBBS in Kyrgyzstan",
          item: `${SITE_URL}/mbbs-abroad/kyrgyzstan/`,
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
      url: canonical,
      address: {
        "@type": "PostalAddress",
        addressLocality: university.location,
        addressCountry: "KG",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `${canonical}#course`,
      name: university.program,
      provider: {
        "@id": `${canonical}#university`,
      },
      courseMode: "On campus",
      inLanguage: university.program.toLowerCase().includes("english")
        ? "English"
        : undefined,
      offers:
        hasVerifiedFee(university)
          ? {
              "@type": "Offer",
              description: `Starts from ${university.feeRows[0].tuitionFee}`,
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

function ProfileCtas({
  dark = false,
  noAdmission = false,
}: {
  dark?: boolean;
  noAdmission?: boolean;
}) {
  const secondaryClass = dark
    ? "border-white/30 bg-white/10 text-white hover:border-[#51e6b3] hover:text-[#51e6b3]"
    : "border-[#0b4b7a] bg-white text-[#0b3a67] hover:border-[#00A878] hover:text-[#00A878]";

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#00B981] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#00A878]">
        {noAdmission ? "Verify Offer Letter" : "Apply for Admission"}
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
  university: KyrgyzUniversityPageData;
}) {
  const facts = [
    ["Location", university.location, MapPin],
    ["Program", university.program, GraduationCap],
    ["Accreditation", university.accreditationLabel, ShieldAlert],
    [
      "Fee status",
      university.feeRows[0]?.tuitionFee ?? "Contact for details",
      CircleDollarSign,
    ],
  ] as const;

  return (
    <section className="relative overflow-hidden bg-[#031b35] px-4 py-8 text-white sm:px-6 sm:py-9 lg:px-8 lg:py-10">
      <Image
        src={kyrgyzstanUniversityImage(university.slug)}
        alt={`${university.name} in Kyrgyzstan`}
        fill
        preload
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-[linear-gradient(98deg,rgba(3,27,53,0.99)_0%,rgba(4,50,91,0.91)_52%,rgba(3,27,53,0.45)_100%)]" />

      <div className="relative mx-auto max-w-7xl">
        <Link
          href="/mbbs-abroad/kyrgyzstan/"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-100 hover:text-white"
        >
          <ArrowLeft size={15} />
          Back to MBBS in Kyrgyzstan
        </Link>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <div>
            <span
              className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-white sm:text-xs ${
                university.recommendationLevel === "No Admission"
                  ? "bg-red-600"
                  : "bg-[#00B981]"
              }`}
            >
              {university.recommendationLevel}
            </span>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.2em] text-[#51e6b3]">
              {university.location}
            </p>
            <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {university.name}
            </h1>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-7 text-blue-50 sm:text-lg sm:leading-8">
              {university.name} offers {university.program} in Kyrgyzstan.
              Review accreditation, fee details, eligibility, FMGE data and
              verification checkpoints before admission.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-50 ring-1 ring-white/15">
                {university.accreditationLabel}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-50 ring-1 ring-white/15">
                NMC/FMGL compliance check required
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-50 ring-1 ring-white/15">
                Verify latest recognition
              </span>
            </div>
            <div className="mt-5 max-w-3xl">
              <ProfileCtas
                dark
                noAdmission={university.recommendationLevel === "No Admission"}
              />
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

function QuickFacts({ university }: { university: KyrgyzUniversityPageData }) {
  const facts = university.facts.length > 0 ? university.facts : [];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {facts.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-xl border border-slate-200 bg-[#f6f8fb] p-3"
        >
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-lg font-black text-[#071f3f] sm:text-xl">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

function FeeTable({ university }: { university: KyrgyzUniversityPageData }) {
  if (university.feeRows.length === 0) {
    return <DataList items={["Contact university for fee details"]} />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-[#f6f8fb]">
            <th className="px-4 py-3 text-left font-black text-slate-700">
              Year
            </th>
            <th className="px-4 py-3 text-left font-black text-slate-700">
              Semester
            </th>
            <th className="px-4 py-3 text-left font-black text-slate-700">
              Tuition Fee
            </th>
            <th className="px-4 py-3 text-left font-black text-slate-700">
              Hostel
            </th>
            <th className="px-4 py-3 text-left font-black text-slate-700">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {university.feeRows.map((row, index) => (
            <tr
              key={index}
              className="border-b border-slate-200 hover:bg-[#f9fafb]"
            >
              <td className="px-4 py-3 font-semibold text-[#071f3f]">
                {row.year}
              </td>
              <td className="px-4 py-3 text-slate-600">{row.semester}</td>
              <td className="px-4 py-3 font-bold text-[#00A878]">
                {row.tuitionFee}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {row.hostelAccommodation}
              </td>
              <td className="px-4 py-3 font-bold text-[#00A878]">
                {row.totalCost}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OshUniversityIdentityWarning({
  university,
}: {
  university: KyrgyzUniversityPageData;
}) {
  if (university.slug !== "osh-international-medical-university") {
    return null;
  }

  return (
    <section className="border-y border-red-200 bg-red-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start gap-4 rounded-2xl border border-red-300 bg-white p-5 shadow-sm">
          <ShieldAlert
            size={26}
            className="mt-1 shrink-0 text-red-600"
          />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-red-700">
              University identity warning
            </p>
            <h2 className="mt-2 text-xl font-black text-red-950 sm:text-2xl">
              Do not confuse this private university with Osh State University
              Medical Faculty
            </h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-red-950">
              Osh International Medical University is a separate private
              institution, WDOMS school ID F0006391. It did not pass the May
              2026 Kyrgyz state accreditation. The public Osh State University
              Medical Faculty has a different legal identity and accreditation
              record.
            </p>
            <p className="mt-3 text-sm font-black leading-7 text-red-950">
              Verify the exact university name, WDOMS school ID, accreditation
              status and payment recipient on the offer letter and every
              invoice before paying.
            </p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a
                href="https://search.wdoms.org/home/SchoolDetail/F0006391"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-red-700 px-4 py-2 text-xs font-extrabold text-white hover:bg-red-800"
              >
                Check Osh International Medical University in WDOMS
              </a>
              <Link
                href="/mbbs-abroad/kyrgyzstan/osh-state-university/"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-red-300 bg-white px-4 py-2 text-xs font-extrabold text-red-800 hover:border-red-500"
              >
                View Osh State University Medical Faculty
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function KyrgyzstanUniversityProfile({
  university,
}: {
  university: KyrgyzUniversityPageData;
}) {
  const faqs = universityFaqs(university);
  const otherUniversities = kyrgyzstanUniversityDirectory.filter(
    (u) => u.slug !== university.slug,
  );

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={buildUniversityJsonLd(university)} />
      <Navbar />

      <UniversityHero university={university} />
      <OshUniversityIdentityWarning university={university} />

      <Section
        id="quick-facts"
        eyebrow="Key details"
        title="Quick Facts"
      >
        <QuickFacts university={university} />
      </Section>

      <Section
        id="overview"
        eyebrow="Background"
        title="University Overview"
      >
        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="prose prose-sm max-w-none">
            {(university.overview?.length
              ? university.overview
              : [university.recommendationMessage]
            ).map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-7 text-slate-600"
              >
                {paragraph}
              </p>
            ))}
            {university.officialWebsiteName ? (
              <div className="mt-5 rounded-xl border border-slate-200 bg-[#f6f8fb] p-4 not-prose">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  Official website
                </p>
                <p className="mt-2 font-black text-[#071f3f]">
                  {university.officialWebsiteName}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  Shown as plain text for identity verification; not a
                  clickable link.
                </p>
              </div>
            ) : null}
            {university.history.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold text-[#071f3f]">
                  History
                </h3>
                <div className="mt-3 space-y-2">
                  {university.history.map(({ year, text }) => (
                    <p
                      key={`${year}-${text}`}
                      className="text-sm text-slate-600"
                    >
                      <strong>{year}:</strong> {text}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative h-64 overflow-hidden rounded-2xl bg-[#082b54] shadow-sm sm:h-80">
            <Image
              src={kyrgyzstanUniversityImage(university.slug)}
              alt={`${university.name} campus or university setting`}
              fill
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {university.highlights.length > 0 ? (
        <Section
          id="academic-profile"
          eyebrow="Official information"
          title="Academic Profile"
        >
          <DataList items={university.highlights} />
        </Section>
      ) : null}

      {university.facilities.length > 0 ? (
        <Section
          id="facilities"
          eyebrow="Learning environment"
          title="Facilities and Clinical Training"
        >
          <DataList items={university.facilities} />
        </Section>
      ) : null}

      <Section
        id="accreditation"
        eyebrow="Compliance"
        title="Accreditation Status"
      >
        <div className="rounded-xl border-l-4 border-[#00A878] bg-[#f0fdf8] p-4">
          <p className="font-bold text-[#071f3f]">
            {university.accreditationLabel}
          </p>
          <p className="mt-2 text-sm text-slate-600">
            {university.recommendationMessage}
          </p>
        </div>
      </Section>

      <Section
        id="fee-structure"
        eyebrow="Costs"
        title="Fee Structure 2026"
      >
        <FeeTable university={university} />
        {university.feeNotes.length > 0 && (
          <div className="mt-4 space-y-2">
            {university.feeNotes.map((note, index) => (
              <p
                key={index}
                className="text-sm text-slate-600"
              >
                • {note}
              </p>
            ))}
          </div>
        )}
      </Section>

      <Section
        id="eligibility"
        eyebrow="Requirements"
        title="Eligibility Criteria"
      >
        <DataList items={university.entryRequirements} />
      </Section>

      <Section
        id="documents"
        eyebrow="Checklist"
        title="Required Documents"
      >
        <DataList items={university.documentChecklist} />
      </Section>

      {university.fmgePerformance && university.fmgePerformance.length > 0 && (
        <Section
          id="fmge"
          eyebrow="Performance data"
          title="FMGE Results"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {university.fmgePerformance.map((fmge, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h3 className="font-bold text-[#071f3f]">
                  {fmge.sourceName}
                </h3>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500">
                      Appeared
                    </p>
                    <p className="mt-1 text-xl font-black text-[#00A878]">
                      {fmge.appeared.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500">
                      Passed
                    </p>
                    <p className="mt-1 text-xl font-black text-[#0F4CFF]">
                      {fmge.passed.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500">
                      Pass rate
                    </p>
                    <p className="mt-1 text-xl font-black text-[#e58a00]">
                      {fmge.passRate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section
        id="verification"
        eyebrow="Before you apply"
        title="Verification Checklist"
        dark
      >
        <DataList
          dark
          items={[
            "Verify NMC/FMGL compliance status and latest guidelines",
            "Check WDOMS listing and accreditation validity",
            "Confirm English-medium instruction throughout program",
            "Verify internship duration and clinical training arrangement",
            "Review latest fee structure directly from university",
            "Check hostel availability and meal arrangements",
            "Confirm course duration matches NMC guidelines",
            "Verify university's latest official recognition and licenses",
          ]}
        />
      </Section>

      <Section
        id="faq"
        eyebrow="Common questions"
        title="Frequently Asked Questions"
      >
        <div className="space-y-4">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between font-bold text-[#071f3f]">
                {question}
                <span className="transition group-open:rotate-180">
                  <ArrowRight size={18} />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {otherUniversities.length > 0 && (
        <Section
          id="other-universities"
          eyebrow="Explore more"
          title="Other Universities in Kyrgyzstan"
        >
          <KyrgyzstanUniversityRail
            universities={otherUniversities.slice(0, 6)}
            labelledBy="other-universities-heading"
          />
        </Section>
      )}
    </main>
  );
}
