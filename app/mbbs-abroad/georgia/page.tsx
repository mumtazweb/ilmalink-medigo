import type { Metadata } from "next";
import Link from "next/link";

import { ArrowRight } from "lucide-react";

import CounsellingActionButton from "../../components/CounsellingActionButton";
import {
  eastEuropeanUniversity,
  featuredGeorgiaUniversities,
  georgiaCountryStats,
  georgiaFinalDisclaimer,
  georgiaUniversities,
} from "../../data/georgiaUniversities";
import GeorgiaUniversityExplorer from "./GeorgiaUniversityExplorer";

export const dynamic = "force-static";

const pageUrl = "https://www.ilmalink.com/mbbs-abroad/georgia";
const eeuUrl =
  "https://www.ilmalink.com/mbbs-abroad/georgia/east-european-university";

export const metadata: Metadata = {
  title:
    "MBBS in Georgia 2026 | ALTE & East European University Fees | ILMALINK MEDIGO",
  description:
    "Study MBBS in Georgia with ALTE University and East European University Tbilisi fee structures, MD program details, hostel cost, FMGE 2025 data, admission requirements, and NMC/FMGL checklist.",
  keywords: [
    "MBBS in Georgia 2026",
    "ALTE University Georgia fees",
    "ALTE University Tbilisi MBBS",
    "East European University Georgia",
    "East European University fee structure",
    "EEU Georgia MBBS fees",
    "MBBS in Tbilisi for Indian students",
    "Georgia medical universities FMGE data",
    "Georgia MBBS fee structure",
    "NMC FMGL checklist Georgia MBBS",
    "Study medicine in Georgia",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title:
      "MBBS in Georgia 2026 | East European University Fee Structure",
    description:
      "Compare Georgia medical universities and review East European University MD program fees, hostel, admission, FMGE data, and student facilities.",
    url: pageUrl,
    siteName: "ILMALINK MEDIGO",
    images: [
      {
        url: "/georgia/east-european-university-hero.jpg",
        width: 1800,
        height: 1044,
        alt: "East European University medical classroom in Tbilisi",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "MBBS in Georgia 2026 | East European University Fee Structure",
    description:
      "EEU Georgia MBBS fees, hostel cost, admission requirements, clinical rotations, and FMGE 2025 reference data.",
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
      "@type": "WebPage",
      name: "MBBS in Georgia 2026 - East European University",
      url: pageUrl,
      description: metadata.description,
      inLanguage: "en-IN",
      about: {
        "@type": "CollegeOrUniversity",
        name: "East European University",
        alternateName: "EEU Georgia",
        url: eeuUrl,
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
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.ilmalink.com/georgia/east-european-university-hero.jpg",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Medical Doctor (MD) Program at East European University",
      description:
        "English-medium 6-year Medical Doctor program in Tbilisi with 360 credits, clinical rotations from the 4th year, and a 12-month clerkship.",
      provider: {
        "@type": "CollegeOrUniversity",
        name: "East European University",
        sameAs: eeuUrl,
      },
      educationalCredentialAwarded: "Medical Doctor (MD)",
      courseMode: "On campus",
      inLanguage: "English",
      offers: {
        "@type": "Offer",
        price: "5500",
        priceCurrency: "USD",
        category: "Annual tuition",
        url: eeuUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the East European University Georgia fee structure for MBBS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The listed annual tuition is USD 5,500. Six-year tuition totals USD 33,100. First-year hostel and mess is mandatory at USD 1,500 per semester, or USD 3,000 for the first year.",
          },
        },
        {
          "@type": "Question",
          name: "Is East European University in Tbilisi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. East European University is located in Tbilisi, Georgia, and has two modern campuses in the city.",
          },
        },
        {
          "@type": "Question",
          name: "What is the course duration for EEU Georgia MD program?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Medical Doctor program is 6 academic years with 360 credits and includes a 12-month clerkship.",
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

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";

  return (
    <div>
      <p
        className={`text-xs font-extrabold uppercase tracking-[0.18em] ${
          isDark ? "text-[#efc36a]" : "text-[#8f2118]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-2 text-3xl font-extrabold tracking-normal md:text-4xl ${
          isDark ? "text-white" : "text-[#24110f]"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-3 max-w-3xl text-sm font-medium leading-7 md:text-base ${
            isDark ? "text-slate-200" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CostSnapshot() {
  const items = [
    ["Annual tuition", eastEuropeanUniversity.annualTuition ?? "Verify"],
    ["Six-year tuition", eastEuropeanUniversity.totalTuition ?? "Verify"],
    [
      "Mandatory first-year hostel/mess",
      eastEuropeanUniversity.mandatoryHostelMess ?? "Verify",
    ],
    ["Living estimate", eastEuropeanUniversity.livingCost ?? "Verify"],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="rounded-lg border border-[#f0d4ce] bg-[#fff9f7] p-4"
        >
          <p className="text-xs font-bold uppercase text-[#8f2118]">
            {label}
          </p>
          <p className="mt-1 text-xl font-extrabold text-[#24110f]">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

const featuredAccents: Record<
  string,
  { ring: string; badge: string; button: string }
> = {
  "alte-university": {
    ring: "hover:border-[#0f766e]/40",
    badge: "bg-[#e6f4f1] text-[#0f766e] ring-[#bfe0da]",
    button: "bg-[#0c3a37] hover:bg-[#12514c]",
  },
  "east-european-university": {
    ring: "hover:border-[#8f2118]/40",
    badge: "bg-[#fff1ed] text-[#8f2118] ring-[#f5c7be]",
    button: "bg-[#8f2118] hover:bg-[#6f1711]",
  },
};

function FeaturedUniversities() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Featured medical universities"
          title="Two dedicated Georgia university pages"
          description="ALTE University and East European University each have a full fee-structure and admission page. Open either for the complete semester-wise plan, hostel terms, clinical exposure, and FMGE data."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {featuredGeorgiaUniversities.map((university) => {
            const accent =
              featuredAccents[university.slug] ??
              featuredAccents["east-european-university"];
            const fmge = university.fmgePerformance?.[0];

            return (
              <article
                key={university.slug}
                className={`flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${accent.ring}`}
              >
                <img
                  src={university.heroImage}
                  alt={`${university.name} medical campus in ${university.city}`}
                  className="h-44 w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-extrabold ring-1 ${accent.badge}`}
                    >
                      {university.recommendationLabel}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-700 ring-1 ring-slate-200">
                      {university.city}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-extrabold leading-7 text-[#24110f]">
                    {university.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    {university.summary}
                  </p>
                  <dl className="mt-4 grid gap-2 text-sm">
                    <div className="rounded-lg bg-slate-50 px-3 py-2">
                      <dt className="text-xs font-bold uppercase text-slate-500">
                        Fee status
                      </dt>
                      <dd className="mt-1 font-extrabold text-[#047857]">
                        {university.feeSummary}
                      </dd>
                    </div>
                    {fmge ? (
                      <div className="rounded-lg bg-slate-50 px-3 py-2">
                        <dt className="text-xs font-bold uppercase text-slate-500">
                          FMGE 2025
                        </dt>
                        <dd className="mt-1 font-semibold text-slate-700">
                          {fmge.appeared.toLocaleString("en-IN")} appeared,{" "}
                          {fmge.passed.toLocaleString("en-IN")} passed,{" "}
                          {fmge.passRate} pass rate
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                  <div className="mt-auto pt-5">
                    <Link
                      href={`/mbbs-abroad/georgia/${university.slug}`}
                      className={`inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold text-white transition ${accent.button}`}
                    >
                      View {university.shortName ?? university.name} details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaRow() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="/mbbs-abroad/georgia/east-european-university"
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#efc36a] px-5 py-3 text-sm font-extrabold text-[#24110f] transition hover:bg-[#ffd782]"
      >
        View EEU Fee Structure
      </Link>
      <CounsellingActionButton className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#efc36a] hover:text-[#efc36a]">
        Get Georgia Counselling
      </CounsellingActionButton>
    </div>
  );
}

export default function GeorgiaPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <JsonLdScript />

      <section className="relative min-h-[88vh] overflow-hidden bg-[#180806] px-4 pb-10 pt-28 text-white sm:px-6 lg:px-8">
        <img
          src={eastEuropeanUniversity.heroImage}
          alt="East European University classroom and medical teaching environment"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,8,6,0.96),rgba(24,8,6,0.76),rgba(24,8,6,0.28))]" />
        <div className="relative mx-auto flex min-h-[calc(88vh-9rem)] max-w-7xl flex-col justify-end">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#efc36a]">
            MBBS in Georgia 2026
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl font-extrabold tracking-normal md:text-6xl">
            East European University Georgia MBBS guide
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-100 md:text-lg md:leading-8">
            A focused Georgia page for Indian students comparing East European
            University in Tbilisi, MD program fees, hostel cost, FMGE 2025
            data, clinical training, admission requirements, and NMC/FMGL
            checks before admission.
          </p>
          <div className="mt-8">
            <CtaRow />
          </div>
        </div>
      </section>

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {georgiaCountryStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-2xl font-extrabold text-[#24110f]">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Tbilisi medicine route"
              title="Why East European University stands out inside Georgia"
              description="EEU gives this Georgia page a dedicated university track: clear MD program structure, English instruction, clinical rotations from the fourth year, affiliated hospital exposure, and a transparent semester-wise fee plan."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {eastEuropeanUniversity.facts.slice(0, 8).map((fact) => (
                <div
                  key={`${fact.label}-${fact.value}`}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <p className="text-xl font-extrabold text-[#8f2118]">
                    {fact.value}
                  </p>
                  <p className="mt-1 text-xs font-bold uppercase leading-5 text-slate-500">
                    {fact.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <img
              src={eastEuropeanUniversity.detailImage}
              alt="East European University practical labs and classroom facilities"
              className="h-64 w-full rounded-lg object-cover sm:h-80"
            />
            <div className="mt-5">
              <h2 className="text-2xl font-extrabold tracking-normal text-[#24110f]">
                EEU cost snapshot
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                This snapshot is summarized from the current listed semester
                plan. Open the dedicated EEU page for the full semester-wise
                structure.
              </p>
              <div className="mt-4">
                <CostSnapshot />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <img
            src="/georgia/georgia-tbilisi-student-life.jpg"
            alt="Georgia and Tbilisi landscape for international students"
            className="h-72 w-full rounded-lg object-cover shadow-sm lg:h-96"
          />
          <div>
            <SectionHeading
              eyebrow="Geo-friendly student context"
              title="Study medicine in Tbilisi, Georgia"
              description="Georgia sits between Europe and Asia and attracts international students for English-medium programs, student-friendly cities, and a lower-cost route compared with many private medical options. Tbilisi is the primary medical-education hub for several universities on this page."
            />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "English-medium MD programs are available in selected Georgian universities.",
                "Students should compare WDOMS listing, local recognition, hospital rotations, internship, and NMC/FMGL rules.",
                "Georgia FMGE 2025 data gives students a useful reference point, but it is not a recognition guarantee.",
                "University-wise fee tables must be verified before payment because tuition, hostel, and visa costs can change.",
              ].map((item) => (
                <p
                  key={item}
                  className="rounded-lg bg-white px-4 py-3 text-sm font-semibold leading-6 text-slate-700 shadow-sm ring-1 ring-slate-200"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FeaturedUniversities />

      <GeorgiaUniversityExplorer universities={georgiaUniversities} />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg bg-[#24110f] p-6 text-white shadow-sm">
          <SectionHeading
            eyebrow="Indian student safety checklist"
            title="NMC/FMGL verification before Georgia MBBS admission"
            description="Use this checklist before confirming any Georgia medical university. It is especially important when comparing East European University with other Tbilisi, Batumi, or Kutaisi options."
            tone="dark"
          />
          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              "NEET qualification and Indian eligibility.",
              "Exact WDOMS school name and listing.",
              "Local recognition and medical registration eligibility in Georgia.",
              "Course duration, credits, internship, and clerkship structure.",
              "English medium across teaching, exams, and clinical training.",
              "University fee account, refund rules, hostel terms, visa, insurance, and TRC costs.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/10 bg-white/10 p-4 text-sm font-semibold leading-6 text-slate-100"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Questions students ask"
            title="Georgia MBBS FAQs"
          />
          <div className="mt-6 grid gap-4">
            {[
              [
                "What is East European University Georgia MBBS fee?",
                "The listed annual tuition is USD 5,500. Six-year tuition totals USD 33,100. First-year hostel and mess is mandatory at USD 1,500 per semester.",
              ],
              [
                "Is the EEU MD program English medium?",
                "Yes, the MD route is listed with English as the language of instruction. Students should still verify the latest official admission letter and program document before payment.",
              ],
              [
                "Is MBBS in Georgia valid in India?",
                "Indian students must verify current NMC/FMGL rules, NEET qualification, WDOMS listing, local licence eligibility, course duration, internship, English medium, and recognition before admission.",
              ],
            ].map(([question, answer]) => (
              <div
                key={question}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-extrabold text-[#24110f]">
                  {question}
                </h3>
                <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                  {answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-normal text-[#24110f]">
              Final guidance
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              {georgiaFinalDisclaimer}
            </p>
          </div>
          <div className="rounded-lg bg-[#8f2118] p-5 text-white shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-normal">
              Need help comparing Georgia universities?
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-red-50">
              ILMALINK counsellors can help compare EEU fees, FMGE data,
              hostel cost, clinical exposure, documents, and NMC/FMGL
              suitability before admission.
            </p>
            <div className="mt-5">
              <CtaRow />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
