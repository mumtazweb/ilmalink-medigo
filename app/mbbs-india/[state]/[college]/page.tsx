import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "../../../components/navbar";
import {
  getMBBSIndiaCollegeCounselling2025,
  getMBBSIndiaStateCounselling2025,
} from "../../../data/mbbsIndiaCounselling";
import {
  mbbsIndiaColleges,
  mbbsIndiaCollegesByState,
  type MBBSIndiaCollege,
} from "../../../data/mbbsIndiaColleges";
import {
  getMBBSIndiaCollegeHref,
  getMBBSIndiaCollegeSlug,
  getMBBSIndiaStateHref,
  getMBBSIndiaStateSlug,
} from "../../../data/exploreLinks";
import {
  CutoffTable,
  PriorYearCounsellingNotice,
  SeatMatrixTable,
} from "../../CounsellingDataTables";

export const dynamic = "force-static";
export const dynamicParams = false;

type CollegePageProps = {
  params: Promise<{ state: string; college: string }>;
};

const SITE_URL = "https://www.ilmalink.com";
const formatNumber = (value: number) => value.toLocaleString("en-IN");

function getCollege(stateSlug: string, collegeSlug: string) {
  return mbbsIndiaColleges.find(
    (college) =>
      getMBBSIndiaStateSlug(college.state) === stateSlug &&
      getMBBSIndiaCollegeSlug(college) === collegeSlug
  );
}

export function generateStaticParams() {
  return mbbsIndiaColleges.map((college) => ({
    state: getMBBSIndiaStateSlug(college.state),
    college: getMBBSIndiaCollegeSlug(college),
  }));
}

export async function generateMetadata({
  params,
}: CollegePageProps): Promise<Metadata> {
  const { state: stateSlug, college: collegeSlug } = await params;
  const college = getCollege(stateSlug, collegeSlug);

  if (!college) {
    return {
      title: "Medical College Not Found | ILMALINK MEDIGO",
    };
  }

  const counselling = getMBBSIndiaCollegeCounselling2025(college.collegeName);
  const counsellingLabel = counselling
    ? " Includes 2025 prior-year seat matrix and cutoff data."
    : "";

  return {
    title: `${college.collegeName}: MBBS Seats & Counselling Data`,
    description: `${college.collegeName} is a ${college.category.toLowerCase()} medical college in ${college.state} with ${formatNumber(college.seatCapacity)} MBBS seats.${counsellingLabel}`,
    alternates: {
      canonical: `${SITE_URL}${getMBBSIndiaCollegeHref(college)}`,
    },
    openGraph: {
      title: college.collegeName,
      description: `${formatNumber(college.seatCapacity)} MBBS seats in ${college.state}.`,
      url: `${SITE_URL}${getMBBSIndiaCollegeHref(college)}`,
      type: "website",
    },
  };
}

function CollegeSummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-extrabold text-slate-950">{value}</p>
    </div>
  );
}

export default async function MBBSIndiaCollegePage({
  params,
}: CollegePageProps) {
  const { state: stateSlug, college: collegeSlug } = await params;
  const college = getCollege(stateSlug, collegeSlug);

  if (!college) notFound();

  const counselling = getMBBSIndiaCollegeCounselling2025(college.collegeName);
  const stateCounselling = getMBBSIndiaStateCounselling2025(college.state);
  const stateGroup = mbbsIndiaCollegesByState.find(
    (group) => group.state === college.state
  );
  const relatedColleges = stateGroup
    ? [...stateGroup.governmentColleges, ...stateGroup.privateColleges]
        .filter((item) => item.collegeName !== college.collegeName)
        .slice(0, 6)
    : [];
  const canonicalUrl = `${SITE_URL}${getMBBSIndiaCollegeHref(college)}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: college.collegeName,
      url: canonicalUrl,
      address: {
        "@type": "PostalAddress",
        addressRegion: college.state,
        addressCountry: "IN",
      },
      foundingDate:
        college.establishmentYear === "N/A"
          ? undefined
          : String(college.establishmentYear),
      department: {
        "@type": "EducationalOrganization",
        name: "MBBS programme",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "MBBS India",
          item: `${SITE_URL}/mbbs-india/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: college.state,
          item: `${SITE_URL}${getMBBSIndiaStateHref(college.state)}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: college.collegeName,
          item: canonicalUrl,
        },
      ],
    },
    counselling
      ? {
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: `${college.collegeName} MBBS counselling data 2025`,
          description:
            "Prior-year quota seat distribution and category-wise round closing score and rank data.",
          temporalCoverage: "2025",
          spatialCoverage: college.state,
          url: canonicalUrl,
          isAccessibleForFree: true,
          variableMeasured: [
            "Quota",
            "Category seats",
            "Closing score",
            "Closing rank",
            "Counselling round",
          ],
        }
      : null,
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <section className="bg-[#061D3F] px-4 pb-12 pt-8 text-white sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm font-semibold text-slate-300" aria-label="Breadcrumb">
            <Link href="/mbbs-india/" className="hover:text-white">
              MBBS India
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={getMBBSIndiaStateHref(college.state)}
              className="hover:text-white"
            >
              {college.state}
            </Link>
            <span className="mx-2">/</span>
            <span>{college.collegeName}</span>
          </nav>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
            {college.category} medical college
          </p>
          <h1 className="mt-3 max-w-5xl text-3xl font-extrabold tracking-normal md:text-5xl">
            {college.collegeName}
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-200 md:text-lg">
            MBBS seats, establishment details, state counselling context, and
            available 2025 prior-year seat matrix and cutoff records.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <CollegeSummaryCard label="State" value={college.state} />
            <CollegeSummaryCard label="Ownership" value={college.category} />
            <CollegeSummaryCard
              label="MBBS seats"
              value={formatNumber(college.seatCapacity)}
            />
            <CollegeSummaryCard
              label="Established"
              value={String(college.establishmentYear)}
            />
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-extrabold">Fee status</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
              {college.fees === "To be updated"
                ? "A verified fee figure is not included in this college record."
                : college.fees}
            </p>
          </div>
        </div>
      </section>

      {counselling ? (
        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PriorYearCounsellingNotice />

            {counselling.seatMatrix.length > 0 ? (
              <div className="mt-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
                  2025 seat matrix
                </p>
                <h2 className="mt-2 text-3xl font-extrabold">
                  Quota and category-wise MBBS seats
                </h2>
                <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-slate-600">
                  Blank source cells remain unavailable. A starred total marks a
                  row where the listed total and visible category cells did not
                  fully reconcile.
                </p>
                <div className="mt-5">
                  <SeatMatrixTable rows={counselling.seatMatrix} />
                </div>
              </div>
            ) : null}

            {counselling.cutoff ? (
              <div className="mt-10">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1D4ED8]">
                  2025 cutoff reference
                </p>
                <h2 className="mt-2 text-3xl font-extrabold">
                  Round-wise closing score and rank
                </h2>
                <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-slate-600">
                  Category/quota rows are shown exactly as available for Round
                  1, Round 2, Round 3, and the stray round. A dash means no
                  numeric value was available in the imported record.
                </p>
                <div className="mt-5">
                  <CutoffTable cutoff={counselling.cutoff} />
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : stateCounselling ? (
        <section className="px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PriorYearCounsellingNotice />
            <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-extrabold">
                No college-specific 2025 row
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                The state has imported 2025 counselling data, but this college
                does not have a matched seat-matrix or cutoff row in that
                dataset.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
                Continue comparing
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Other MBBS colleges in {college.state}
              </h2>
            </div>
            <Link
              href={getMBBSIndiaStateHref(college.state)}
              className="rounded-lg border border-[#00C896]/40 bg-white px-4 py-2 text-sm font-extrabold text-[#047857]"
            >
              View the full state directory
            </Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedColleges.map((related: MBBSIndiaCollege) => (
              <Link
                key={related.collegeName}
                href={getMBBSIndiaCollegeHref(related)}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#00C896]/60 hover:shadow-md"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#047857]">
                  {related.category}
                </p>
                <h3 className="mt-2 font-extrabold">{related.collegeName}</h3>
                <p className="mt-3 text-sm font-semibold text-slate-600">
                  {formatNumber(related.seatCapacity)} MBBS seats
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
