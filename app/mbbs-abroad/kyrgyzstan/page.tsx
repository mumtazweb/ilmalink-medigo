import type { Metadata } from "next";

import {
  kyrgyzAccreditationStats,
  kyrgyzEvaluationCriteria,
  kyrgyzFinalDisclaimer,
  kyrgyzstanUniversities,
  type KyrgyzRecommendationLevel,
  type KyrgyzUniversityPageData,
} from "../../data/kyrgyzstanUniversities";

export const metadata: Metadata = {
  title:
    "MBBS in Kyrgyzstan 2026 | Medical University Accreditation Update | ILMALINK MEDIGO",
  description:
    "Study MBBS in Kyrgyzstan with 2026 accreditation guidance, recommendation badges, fee overview, NMC/FMGL compliance checklist, and university-wise counselling support.",
  keywords: [
    "MBBS in Kyrgyzstan 2026",
    "Kyrgyzstan Medical University Accreditation 2026",
    "Recommended Medical Universities in Kyrgyzstan for Indian Students",
    "Kyrgyzstan MBBS Fee Structure",
    "NMC FMGL Compliance Checklist for Kyrgyzstan MBBS",
    "Kyrgyz State Medical Academy Fee Structure 2026",
    "KSMA MBBS Admission for Indian Students",
  ],
  alternates: {
    canonical: "https://www.mbbs.ilmalink.com/mbbs-abroad/kyrgyzstan",
  },
};

type SearchParams = Promise<{
  filter?: string | string[];
  q?: string | string[];
}>;

type FilterValue = "all" | "recommended" | "not-recommended" | "no-admission";

const filterOptions: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Recommended", value: "recommended" },
  { label: "Not Recommended", value: "not-recommended" },
  { label: "No Admission", value: "no-admission" },
];

const counsellingHref = "/mbbs-abroad/kyrgyzstan?counselling=open";

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeFilter(value: string | string[] | undefined): FilterValue {
  const filter = firstValue(value);

  if (
    filter === "recommended" ||
    filter === "not-recommended" ||
    filter === "no-admission"
  ) {
    return filter;
  }

  return "all";
}

function isRecommendedLevel(level: KyrgyzRecommendationLevel) {
  return (
    level === "Recommended" ||
    level === "Recommended — Separate Verification Required"
  );
}

function matchesFilter(university: KyrgyzUniversityPageData, filter: FilterValue) {
  if (filter === "all") return true;
  if (filter === "recommended") return isRecommendedLevel(university.recommendationLevel);
  if (filter === "not-recommended") return university.recommendationLevel === "Not Recommended";
  return university.recommendationLevel === "No Admission";
}

function matchesSearch(university: KyrgyzUniversityPageData, query: string) {
  if (!query) return true;

  const haystack = [
    university.name,
    university.location,
    university.accreditationStatus,
    university.recommendationLevel,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

function filterHref(filter: FilterValue, query: string) {
  const params = new URLSearchParams();

  if (filter !== "all") params.set("filter", filter);
  if (query) params.set("q", query);

  const queryString = params.toString();
  return queryString
    ? `/mbbs-abroad/kyrgyzstan?${queryString}#universities`
    : "/mbbs-abroad/kyrgyzstan#universities";
}

function universityHref(slug: string) {
  return `/mbbs-abroad/kyrgyzstan/${slug}`;
}

function feeSummary(university: KyrgyzUniversityPageData) {
  const firstFee = university.feeRows[0];

  if (!firstFee || firstFee.totalCost === "To be updated") {
    return "Fees: To be updated";
  }

  return `${university.intake}: fee table available; first listed total ${firstFee.totalCost}`;
}

function fmgeSummary(university: KyrgyzUniversityPageData) {
  const firstMatch = university.fmgePerformance?.[0];

  if (!firstMatch) return "FMGE 2025 match: To be updated";

  return `FMGE 2025: ${firstMatch.appeared.toLocaleString("en-IN")} appeared, ${firstMatch.passed.toLocaleString("en-IN")} passed, ${firstMatch.passRate} pass rate`;
}

function recommendationClasses(level: KyrgyzRecommendationLevel) {
  if (level === "Not Recommended") {
    return {
      card: "border-orange-200 bg-orange-50",
      badge: "bg-orange-100 text-orange-800 ring-orange-200",
      soft: "bg-orange-100 text-orange-800",
    };
  }

  if (level === "No Admission") {
    return {
      card: "border-red-200 bg-red-50",
      badge: "bg-red-100 text-red-800 ring-red-200",
      soft: "bg-red-100 text-red-800",
    };
  }

  return {
    card: "border-emerald-200 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-800 ring-emerald-200",
    soft: "bg-emerald-100 text-emerald-800",
  };
}

function LetsConnectButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={counsellingHref}
      data-open-counselling
      className={`inline-flex items-center justify-center rounded-lg bg-[#00C896] px-4 py-2.5 text-sm font-extrabold text-[#042033] transition hover:bg-[#12dda9] ${className}`}
    >
      Let&apos;s Connect
    </a>
  );
}

function CounsellingBridgeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            if (window.__ilmalinkCounsellingBridge) return;
            window.__ilmalinkCounsellingBridge = true;
            document.addEventListener("click", function (event) {
              var target = event.target instanceof Element ? event.target.closest("[data-open-counselling]") : null;
              if (!target) return;
              event.preventDefault();
              window.dispatchEvent(new Event("ilmalink:open-counselling"));
            });
          })();
        `,
      }}
    />
  );
}

function GuidanceCta({
  title = "Need help choosing a suitable Kyrgyzstan MBBS university?",
}: {
  title?: string;
}) {
  return (
    <div className="rounded-lg border border-[#00C896]/30 bg-[#05233d] p-5 text-white shadow-[0_14px_40px_rgba(0,0,0,0.16)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-extrabold tracking-normal">{title}</h3>
          <p className="mt-2 max-w-3xl text-sm font-medium leading-6 text-slate-200">
            Our counsellors can help you compare accreditation status, fees,
            course duration, internship, English medium, WDOMS listing, local
            licence eligibility, and NMC/FMGL compliance before admission.
          </p>
        </div>
        <LetsConnectButton className="shrink-0" />
      </div>
    </div>
  );
}

function AccreditationBadge({ university }: { university: KyrgyzUniversityPageData }) {
  const tone = recommendationClasses(university.recommendationLevel);

  return (
    <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-extrabold ring-1 ${tone.badge}`}>
      {university.accreditationLabel}
    </span>
  );
}

function RecommendationBadge({ university }: { university: KyrgyzUniversityPageData }) {
  const tone = recommendationClasses(university.recommendationLevel);

  return (
    <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-extrabold ring-1 ${tone.badge}`}>
      {university.recommendationLevel}
    </span>
  );
}

function UniversityQuickView({ university }: { university: KyrgyzUniversityPageData }) {
  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4 text-slate-800">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-extrabold text-slate-950">Accreditation status</dt>
          <dd className="mt-1 text-slate-600">{university.accreditationStatus}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-950">Recommendation</dt>
          <dd className="mt-1 text-slate-600">{university.recommendationLevel}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-950">Fee summary</dt>
          <dd className="mt-1 text-slate-600">{feeSummary(university)}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-950">FMGE data match</dt>
          <dd className="mt-1 text-slate-600">{fmgeSummary(university)}</dd>
        </div>
        <div>
          <dt className="font-extrabold text-slate-950">Location</dt>
          <dd className="mt-1 text-slate-600">{university.location}</dd>
        </div>
      </dl>

      <p className="mt-4 text-sm font-medium leading-6 text-slate-700">
        {university.recommendationMessage}
      </p>

      {university.recommendationLevel === "Recommended — Separate Verification Required" ? (
        <p className="mt-3 inline-flex rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          Separate official verification required
        </p>
      ) : null}

      {university.fmgePerformance?.length ? (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <h4 className="text-xs font-extrabold uppercase text-slate-500">
            Matched FMGE 2025 college entries
          </h4>
          <div className="mt-2 grid gap-2">
            {university.fmgePerformance.map((item) => (
              <p key={item.sourceName} className="text-sm font-semibold leading-6 text-slate-700">
                {item.sourceName}: {item.appeared.toLocaleString("en-IN")} appeared,{" "}
                {item.passed.toLocaleString("en-IN")} passed, {item.passRate} pass rate.
              </p>
            ))}
          </div>
          <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
            FMGE performance data is for reference only and does not indicate
            approval, recognition, or admission suitability.
          </p>
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-3">
          <h4 className="text-xs font-extrabold uppercase text-slate-500">
            Entry requirements
          </h4>
          <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
            {university.entryRequirements.slice(0, 3).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <h4 className="text-xs font-extrabold uppercase text-slate-500">
            Required documents
          </h4>
          <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
            {university.documentChecklist.slice(0, 4).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <h4 className="text-xs font-extrabold uppercase text-slate-500">
            Key highlights
          </h4>
          <ul className="mt-2 space-y-1 text-sm font-medium text-slate-700">
            {university.highlights.length > 0 ? (
              university.highlights.slice(0, 4).map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>Contact for latest details</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        {university.pageExists ? (
          <a
            href={universityHref(university.slug)}
            className="inline-flex items-center justify-center rounded-lg border border-[#06345a] px-4 py-2.5 text-sm font-extrabold text-[#06345a] transition hover:border-[#00C896] hover:text-[#007e62]"
          >
            View Full Details
          </a>
        ) : null}
        <LetsConnectButton />
      </div>
    </div>
  );
}

function UniversityCard({ university }: { university: KyrgyzUniversityPageData }) {
  const tone = recommendationClasses(university.recommendationLevel);

  return (
    <article className={`rounded-lg border p-4 shadow-sm ${tone.card}`}>
      <div className="flex h-full flex-col">
        <div className="flex flex-wrap gap-2">
          <AccreditationBadge university={university} />
          <RecommendationBadge university={university} />
        </div>

        <h3 className="mt-4 text-lg font-extrabold leading-6 text-slate-950">
          {university.name}
        </h3>
        <p className="mt-2 text-sm font-semibold text-slate-600">
          Location: {university.location}
        </p>
        <p className="mt-1 text-sm font-extrabold text-[#047857]">
          {feeSummary(university)}
        </p>
        <p className="mt-1 text-xs font-bold text-slate-500">
          {fmgeSummary(university)}
        </p>
        <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-700">
          {university.recommendationMessage}
        </p>

        {university.recommendationLevel === "Recommended — Separate Verification Required" ? (
          <p className="mt-3 text-xs font-bold text-slate-500">
            Separate official verification required
          </p>
        ) : null}

        <div className="mt-auto pt-4">
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-center rounded-lg bg-[#06345a] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#074b83]">
              Quick View
            </summary>
            <UniversityQuickView university={university} />
          </details>

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {university.pageExists ? (
              <a
                href={universityHref(university.slug)}
                className="inline-flex items-center justify-center rounded-lg border border-[#06345a] bg-white px-4 py-2.5 text-sm font-extrabold text-[#06345a] transition hover:border-[#00C896] hover:text-[#007e62]"
              >
                View Full Details
              </a>
            ) : null}
            <LetsConnectButton className={university.pageExists ? "" : "sm:col-span-2"} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function KyrgyzstanPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const activeFilter = normalizeFilter(params?.filter);
  const query = firstValue(params?.q)?.trim() ?? "";
  const filteredUniversities = kyrgyzstanUniversities.filter(
    (university) => matchesFilter(university, activeFilter) && matchesSearch(university, query),
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <CounsellingBridgeScript />

      <section className="bg-[#031525] px-4 pb-12 pt-28 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase text-[#00C896]">
            MBBS Abroad Guidance
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-normal md:text-6xl">
            MBBS in Kyrgyzstan 2026
          </h1>
          <p className="mt-5 max-w-4xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
            Kyrgyzstan remains a popular MBBS abroad destination for Indian
            students because of affordable education pathways, English-medium
            options, established student communities, and accessible admission
            processes. The 2026 accreditation update now makes university
            shortlisting more transparent.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <p className="text-xs font-extrabold uppercase text-[#047857]">
              Kyrgyzstan Medical University Accreditation 2026
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-[#031525] md:text-4xl">
              Kyrgyzstan Medical University Accreditation Update 2026
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-700 md:text-base">
              The Kyrgyz Ministry of Health summarized the results of state
              accreditation of medical educational institutions in May 2026,
              conducted in accordance with the presidential decree. This update
              helps students compare universities more transparently by looking
              at accreditation status, clinical facilities, faculty strength,
              infrastructure, and education quality indicators before admission.
            </p>
            <p className="mt-4 text-sm font-medium leading-7 text-slate-700 md:text-base">
              The Kyrgyz Ministry of Health completed state accreditation of
              medical educational institutions in May 2026. ILMALINK MEDIGO uses
              this update to classify universities into clear guidance badges:
              Recommended, Not Recommended, and No Admission. Students should
              choose universities only after checking the latest accreditation
              position, course duration, internship structure, English medium,
              WDOMS listing, local licence eligibility, and NMC/FMGL compliance.
            </p>
            <div className="mt-5 rounded-lg border border-[#00C896]/30 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#031525]">
                Recommended Medical Universities in Kyrgyzstan for Indian Students
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                ILMALINK MEDIGO currently prioritizes universities with stronger
                official standing, long-term accreditation, or special
                government/official status. Universities with only 1-year
                conditional accreditation are not recommended as first-choice
                options. Institutions that did not pass accreditation or did not
                participate within the required deadline should not be considered
                for new admission unless fresh official clarification is issued.
              </p>
            </div>
          </div>

          <div className="grid content-start gap-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#031525]">
                Evaluation criteria
              </h3>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                State accreditation is based on:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {kyrgyzEvaluationCriteria.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-[#ecfdf5] px-3 py-1 text-xs font-extrabold text-[#047857]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <GuidanceCta title="Need help shortlisting Kyrgyzstan universities?" />
          </div>
        </div>

        <div className="mx-auto mt-6 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {kyrgyzAccreditationStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p className="text-3xl font-extrabold text-[#031525]">{stat.value}</p>
              <p className="mt-1 text-xs font-bold uppercase text-slate-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="universities" className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase text-[#047857]">
                Kyrgyzstan MBBS Fee Structure
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-normal text-[#031525] md:text-4xl">
                Kyrgyzstan Medical Universities — Accreditation & Fee Overview
              </h2>
              <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-slate-600">
                Use the badges below as a professional shortlist guide. Fee
                values are shown only where brochure-provided information is
                available; otherwise they remain marked as To be updated.
              </p>
            </div>
            <form
              action="/mbbs-abroad/kyrgyzstan"
              method="get"
              className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-xl"
            >
              {activeFilter !== "all" ? (
                <input type="hidden" name="filter" value={activeFilter} />
              ) : null}
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Search university in Kyrgyzstan..."
                className="min-h-11 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]/20"
              />
              <button
                type="submit"
                className="rounded-lg bg-[#031525] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#073459]"
              >
                Search
              </button>
            </form>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <a
                key={option.value}
                href={filterHref(option.value, query)}
                className={`rounded-lg px-3 py-2 text-sm font-extrabold ring-1 transition ${
                  activeFilter === option.value
                    ? "bg-[#00C896] text-[#031525] ring-[#00C896]"
                    : "bg-white text-slate-700 ring-slate-200 hover:text-[#047857] hover:ring-[#00C896]/50"
                }`}
              >
                {option.label}
              </a>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredUniversities.length > 0 ? (
              filteredUniversities.map((university) => (
                <UniversityCard key={university.slug} university={university} />
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm font-semibold text-slate-600 md:col-span-2 xl:col-span-3">
                No Kyrgyzstan university matches the selected search and filter.
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-emerald-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold tracking-normal text-[#031525] md:text-3xl">
            Why Kyrgyzstan remains a practical MBBS option
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "Affordable MBBS pathways compared with many private medical college routes.",
              "English-medium programs are available in selected universities, subject to verification.",
              "A large Indian student community exists across major university destinations.",
              "FMGE/NExT preparation support may be available depending on the university and partner ecosystem.",
              "Admission is generally straightforward for eligible students with NEET qualification.",
              "Students can compare universities using the 2026 accreditation badge system above.",
            ].map((item) => (
              <p
                key={item}
                className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-700"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold tracking-normal text-[#031525] md:text-3xl">
            Climate, Travel, and Admission Support Planning
          </h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-extrabold text-[#031525]">
                Student comfort note
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                Winters in Kyrgyzstan can be cold for Indian students, and
                travel schedules should be planned in advance. Many campuses and
                hostels are adapted for winter conditions, and hostel or mess
                facilities vary by university.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#031525]">
                Important admission guidance
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                Kyrgyzstan has many medical education options and admission
                support channels. Students should verify university quality,
                hospital exposure, hostel facilities, English-medium delivery,
                fee terms, and post-admission support before confirming
                admission.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-[#031525] p-6 text-white shadow-sm">
          <h2 className="text-2xl font-extrabold tracking-normal md:text-3xl">
            NMC/FMGL Compliance Checklist for Kyrgyzstan MBBS
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Course duration and internship structure",
              "English medium instruction across academic and clinical phases",
              "WDOMS listing",
              "Local licence eligibility in the country of study",
              "Latest accreditation and recognition position",
              "University-wise fee structure and payment terms",
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
          <h2 className="text-3xl font-extrabold tracking-normal text-[#031525]">
            Frequently Asked Questions
          </h2>
          <div className="mt-5 grid gap-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#031525]">
                Is MBBS in Kyrgyzstan valid in India?
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                Indian students should verify the latest NMC/FMGL rules,
                WDOMS listing, English medium, internship, local licence
                eligibility, and university recognition before admission.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#031525]">
                Which Kyrgyzstan medical universities are recommended in 2026?
              </h3>
              <p className="mt-2 text-sm font-medium leading-7 text-slate-700">
                ILMALINK MEDIGO prioritizes 6-year accredited institutions and
                special-status institutions that require separate official
                verification. Conditional or unverified institutions should not
                be first-choice options unless fresh official clarification is
                available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-extrabold tracking-normal text-[#031525]">
              Final student guidance
            </h2>
            <p className="mt-3 text-sm font-medium leading-7 text-slate-700">
              {kyrgyzFinalDisclaimer}
            </p>
          </div>
          <GuidanceCta />
        </div>
      </section>
    </main>
  );
}
