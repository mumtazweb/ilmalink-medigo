import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText, MessageCircle } from "lucide-react";

import CounsellingActionButton from "../../../components/CounsellingActionButton";
import {
  georgiaFinalDisclaimer,
  getGeorgiaUniversityBySlug,
  type GeorgiaFeeRow,
  type GeorgiaUniversityPageData,
} from "../../../data/georgiaUniversities";

const eeuData = getGeorgiaUniversityBySlug("east-european-university");

if (!eeuData) {
  throw new Error("East European University Georgia data is missing.");
}

const university: GeorgiaUniversityPageData = eeuData;
const pageUrl =
  "https://www.ilmalink.com/mbbs-abroad/georgia/east-european-university";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "East European University Georgia Fee Structure 2026 | EEU MBBS | ILMALINK MEDIGO",
  description:
    "East European University Georgia MBBS guide with 2025-2026 fee structure, annual tuition USD 5,500, hostel and mess fees, MD program, admission requirements, documents, clinical training, and FMGE data.",
  keywords: [
    "East European University Georgia fee structure",
    "EEU Georgia MBBS fees",
    "East European University Tbilisi MBBS",
    "East European University Medical Doctor program",
    "EEU Georgia hostel fees",
    "MBBS in Georgia East European University",
    "East European University FMGE data",
    "East European University admission requirements",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title:
      "East European University Georgia Fee Structure 2026 | EEU MBBS",
    description:
      "Detailed EEU Georgia fee table, hostel and mess, MD program, clinical rotations, documents, and FMGE 2025 reference data.",
    url: pageUrl,
    siteName: "ILMALINK MEDIGO",
    images: [
      {
        url: "/georgia/east-european-university-hero.jpg",
        width: 1800,
        height: 1044,
        alt: "East European University Georgia medical classroom",
      },
    ],
    locale: "en_IN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "East European University Georgia Fee Structure 2026 | EEU MBBS",
    description:
      "Semester-wise EEU Georgia fee structure, hostel and mess, MD program, and FMGE reference data.",
    images: ["/georgia/east-european-university-hero.jpg"],
  },
  other: {
    "geo.region": "GE-TB",
    "geo.placename": "Tbilisi, Georgia",
    "geo.position": "41.7151;44.8271",
    ICBM: "41.7151, 44.8271",
    "content-language": "en-IN",
  },
};

function JsonLdScript() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: "East European University",
      alternateName: "EEU Georgia",
      url: pageUrl,
      foundingDate: "2012",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tbilisi",
        addressCountry: "GE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 41.7151,
        longitude: 44.8271,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Medical Doctor (MD) Program",
      description: university.summary,
      provider: {
        "@type": "CollegeOrUniversity",
        name: university.name,
        sameAs: pageUrl,
      },
      educationalCredentialAwarded: "Medical Doctor (MD)",
      courseMode: "On campus",
      inLanguage: university.medium,
      timeRequired: "P6Y",
      offers: {
        "@type": "Offer",
        price: "5500",
        priceCurrency: "USD",
        category: "Annual tuition",
        url: pageUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the East European University annual tuition?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The listed annual tuition for East European University's MD program is USD 5,500.",
          },
        },
        {
          "@type": "Question",
          name: "What is the six-year tuition total at East European University Georgia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The semester-wise tuition total is USD 33,100 across the 6-year MD program.",
          },
        },
        {
          "@type": "Question",
          name: "Is hostel and mess mandatory at EEU Georgia?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hostel and mess is mandatory for the first year at USD 1,500 per semester. After the first year it is optional according to the student's accommodation plan and latest university terms.",
          },
        },
      ],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

function Section({
  eyebrow,
  title,
  description,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={`px-4 py-10 sm:px-6 lg:px-8 ${
        dark ? "bg-[#24110f] text-white" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <p
          className={`text-xs font-extrabold uppercase tracking-[0.18em] ${
            dark ? "text-[#efc36a]" : "text-[#8f2118]"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`mt-2 text-3xl font-extrabold tracking-normal md:text-4xl ${
            dark ? "text-white" : "text-[#24110f]"
          }`}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={`mt-3 max-w-3xl text-sm font-medium leading-7 md:text-base ${
              dark ? "text-slate-200" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        ) : null}
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function CompactList({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-lg px-4 py-3 text-sm font-semibold leading-6 ${
            dark
              ? "bg-white/10 text-slate-100 ring-1 ring-white/10"
              : "bg-white text-slate-700 shadow-sm ring-1 ring-slate-200"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function FeeMobileCard({ row }: { row: GeorgiaFeeRow }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-extrabold text-[#24110f]">{row.year}</h3>
        <span className="rounded-lg bg-[#fff1ed] px-2.5 py-1 text-xs font-bold text-[#8f2118]">
          {row.semester}
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-xs font-bold uppercase text-slate-500">
            Tuition
          </dt>
          <dd className="font-semibold text-slate-800">{row.tuitionFee}</dd>
        </div>
        <div>
          <dt className="text-xs font-bold uppercase text-slate-500">
            Hostel/Mess
          </dt>
          <dd className="font-semibold text-slate-800">{row.hostelAndMess}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs font-bold uppercase text-slate-500">
            Estimated due
          </dt>
          <dd className="font-extrabold text-[#047857]">
            {row.semesterTotal}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function FeeTable() {
  return (
    <div>
      <div className="hidden overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm md:block">
        <table className="w-full min-w-[840px] border-collapse text-left text-sm">
          <thead className="bg-[#24110f] text-white">
            <tr>
              {[
                "Year",
                "Semester",
                "Tuition fees",
                "Hostel accommodation and mess",
                "Estimated semester due",
              ].map((heading) => (
                <th key={heading} className="px-4 py-3 font-extrabold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {university.feeRows.map((row, index) => (
              <tr
                key={`${row.year}-${row.semester}`}
                className={index % 2 === 0 ? "bg-[#fff9f7]" : "bg-white"}
              >
                <td className="px-4 py-3 font-extrabold text-[#24110f]">
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
                <td className="px-4 py-3 font-extrabold text-[#047857]">
                  {row.semesterTotal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {university.feeRows.map((row) => (
          <FeeMobileCard key={`${row.year}-${row.semester}`} row={row} />
        ))}
      </div>
    </div>
  );
}

function CounsellingCta() {
  return (
    <div className="rounded-lg bg-[#8f2118] p-5 text-white shadow-sm">
      <h2 className="text-2xl font-extrabold tracking-normal">
        Verify EEU Georgia before admission
      </h2>
      <p className="mt-3 text-sm font-medium leading-7 text-red-50">
        Compare the latest official fee invoice, hostel term, eligibility,
        clinical exposure, WDOMS entry, NMC/FMGL rule fit, and document plan
        before payment.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#efc36a] px-5 py-3 text-sm font-extrabold text-[#24110f] transition hover:bg-[#ffd782]">
          <MessageCircle size={16} />
          Connect ILMALINK
        </CounsellingActionButton>
        <Link
          href="/mbbs-abroad/georgia"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#efc36a] hover:text-[#efc36a]"
        >
          Georgia overview
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function EastEuropeanUniversityPage() {
  const fmge = university.fmgePerformance?.[0];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <JsonLdScript />

      <section className="relative overflow-hidden bg-[#180806] px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8">
        <img
          src={university.heroImage}
          alt="East European University Georgia classroom"
          className="absolute inset-0 h-full w-full object-cover opacity-38"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,8,6,0.98),rgba(24,8,6,0.78),rgba(24,8,6,0.32))]" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/mbbs-abroad/georgia"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-extrabold text-slate-100 transition hover:border-[#efc36a] hover:text-[#efc36a]"
          >
            <ArrowLeft size={15} />
            Back to Georgia
          </Link>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#efc36a]">
                East European University Georgia
              </p>
              <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-normal md:text-6xl">
                EEU Georgia fee structure and MD admission guide
              </h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-100 md:text-lg md:leading-8">
                {university.summary}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#fee-structure"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#efc36a] px-5 py-3 text-sm font-extrabold text-[#24110f] transition hover:bg-[#ffd782]"
                >
                  <FileText size={16} />
                  See Fee Table
                </a>
                <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#efc36a] hover:text-[#efc36a]">
                  <MessageCircle size={16} />
                  Verify Admission
                </CounsellingActionButton>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Annual tuition", university.annualTuition ?? "Verify"],
                ["Six-year tuition", university.totalTuition ?? "Verify"],
                [
                  "First-year hostel/mess",
                  university.mandatoryHostelMess ?? "Verify",
                ],
                ["Program duration", "6 years / 360 credits"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/10 bg-white/10 p-4"
                >
                  <p className="text-xs font-bold uppercase text-[#efc36a]">
                    {label}
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-white">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Fee structure 2025-2026"
        title="East European University fee structure"
        description="The MD program fee plan below separates tuition from hostel and mess. Hostel and mess is mandatory in the first year and optional after that according to the latest university terms."
      >
        <div id="fee-structure">
          <FeeTable />
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {university.additionalFees.map((fee) => (
            <div
              key={fee.label}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-xs font-extrabold uppercase text-slate-500">
                {fee.label}
              </p>
              <p className="mt-1 text-xl font-extrabold text-[#24110f]">
                {fee.amount}
              </p>
              {fee.note ? (
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                  {fee.note}
                </p>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-extrabold text-[#24110f]">
              Fee notes
            </h3>
            <div className="mt-3">
              <CompactList items={university.feeNotes} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#24110f]">
              Payment terms
            </h3>
            <div className="mt-3">
              <CompactList items={university.paymentTerms} />
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Program details"
        title="Medical Doctor program for Indian students"
        description="The EEU MD route is structured as a long-form medical education pathway in English with classroom, laboratory, clinical, and clerkship components."
      >
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Qualification", "Medical Doctor (MD)"],
              ["Duration", university.duration],
              ["Medium", university.medium],
              ["Clinical rotations", "From the 4th year"],
              ["Annual tuition", university.annualTuition ?? "Verify"],
              ["FMGE 2025 reference", fmge ? fmge.passRate : "To be updated"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-bold uppercase text-slate-500">
                  {label}
                </p>
                <p className="mt-1 text-lg font-extrabold text-[#24110f]">
                  {value}
                </p>
              </div>
            ))}
          </div>
          <img
            src={university.detailImage}
            alt="East European University labs and practical training"
            className="h-80 w-full rounded-lg object-cover shadow-sm"
          />
        </div>
      </Section>

      <Section
        eyebrow="Eligibility and documents"
        title="Admission requirements and documents"
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-extrabold text-[#24110f]">
              Entry requirements
            </h3>
            <div className="mt-3">
              <CompactList items={university.entryRequirements} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#24110f]">
              Required documents
            </h3>
            <div className="mt-3">
              <CompactList items={university.documentChecklist} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#24110f]">
              Arrival support items
            </h3>
            <div className="mt-3">
              <CompactList items={university.oneTimeServiceItems} />
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Clinical exposure"
        title="Clinical training and hospital network"
        description="The MD route lists clinical rotations from the 4th year and a 12-month clerkship in the final phase. The university works with 17 affiliated hospitals in Georgia; examples include the hospitals below."
        dark
      >
        <CompactList items={university.clinicalCenters} dark />
      </Section>

      <Section
        eyebrow="Campus and support"
        title="Facilities, hostel, and student services"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-xl font-extrabold text-[#24110f]">
              Campus facilities
            </h3>
            <div className="mt-3">
              <CompactList items={university.facilities} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-[#24110f]">
              Student support
            </h3>
            <div className="mt-3">
              <CompactList items={university.supportServices} />
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="International profile"
        title="Global partnerships and academic strengths"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {university.facts.map((fact) => (
            <div
              key={`${fact.label}-${fact.value}`}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-2xl font-extrabold text-[#8f2118]">
                {fact.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase leading-5 text-slate-500">
                {fact.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <CompactList items={university.partnerHighlights} />
        </div>
      </Section>

      <Section
        eyebrow="FMGE reference data"
        title="East European University FMGE 2025 match"
        description="FMGE data is useful for comparison, but it does not guarantee recognition, approval, admission suitability, or future exam outcomes."
      >
        {fmge ? (
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["Appeared", fmge.appeared.toLocaleString("en-IN")],
              ["Passed", fmge.passed.toLocaleString("en-IN")],
              ["Pass rate", fmge.passRate],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase text-slate-500">
                  {label}
                </p>
                <p className="mt-2 text-3xl font-extrabold text-[#24110f]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600">
            FMGE match is being updated.
          </p>
        )}
      </Section>

      <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-normal text-[#24110f]">
              Final verification note
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              {georgiaFinalDisclaimer}
            </p>
          </div>
          <CounsellingCta />
        </div>
      </section>
    </main>
  );
}
