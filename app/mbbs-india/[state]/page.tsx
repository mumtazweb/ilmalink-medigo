import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "../../components/navbar";
import {
  getMBBSIndiaStateCounselling2025,
  mbbsIndiaCounselling2025,
} from "../../data/mbbsIndiaCounselling";
import { mbbsIndiaCollegesByState } from "../../data/mbbsIndiaColleges";
import { getMBBSIndiaAdmissionAccess } from "../../data/mbbsIndiaAdmissionAccess";
import {
  getMBBSIndiaCollegeHref,
  getMBBSIndiaStateHref,
  getMBBSIndiaStateSlug,
} from "../../data/exploreLinks";
import {
  PriorYearCounsellingNotice,
  SeatMatrixTable,
} from "../CounsellingDataTables";

export const dynamic = "force-static";
export const dynamicParams = false;

type StatePageProps = {
  params: Promise<{ state: string }>;
};

const SITE_URL = "https://www.ilmalink.com";
const formatNumber = (value: number) => value.toLocaleString("en-IN");

function getStateGroup(stateSlug: string) {
  return mbbsIndiaCollegesByState.find(
    (group) => getMBBSIndiaStateSlug(group.state) === stateSlug
  );
}

export function generateStaticParams() {
  return mbbsIndiaCollegesByState.map((group) => ({
    state: getMBBSIndiaStateSlug(group.state),
  }));
}

export async function generateMetadata({
  params,
}: StatePageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const group = getStateGroup(stateSlug);

  if (!group) {
    return {
      title: "MBBS State Not Found | ILMALINK MEDIGO",
    };
  }

  const counselling = getMBBSIndiaStateCounselling2025(group.state);
  const counsellingLabel = counselling
    ? " with 2025 seat matrix and cutoff reference"
    : "";

  return {
    title: `MBBS Colleges in ${group.state}: Seats & Counselling Data`,
    description: `Explore ${group.governmentCount} government and ${group.privateCount} private MBBS colleges in ${group.state}, ${formatNumber(group.totalSeats)} seats${counsellingLabel}.`,
    alternates: {
      canonical: `${SITE_URL}${getMBBSIndiaStateHref(group.state)}`,
    },
    openGraph: {
      title: `MBBS Colleges in ${group.state}`,
      description: `${formatNumber(group.totalSeats)} MBBS seats across ${group.governmentCount + group.privateCount} medical colleges.`,
      url: `${SITE_URL}${getMBBSIndiaStateHref(group.state)}`,
      type: "website",
    },
  };
}

export default async function MBBSIndiaStatePage({ params }: StatePageProps) {
  const { state: stateSlug } = await params;
  const group = getStateGroup(stateSlug);

  if (!group) notFound();

  const access = getMBBSIndiaAdmissionAccess(group.state, group.privateCount);
  const counselling = getMBBSIndiaStateCounselling2025(group.state);
  const colleges = [...group.governmentColleges, ...group.privateColleges];
  const canonicalUrl = `${SITE_URL}${getMBBSIndiaStateHref(group.state)}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `MBBS colleges in ${group.state}`,
      url: canonicalUrl,
      inLanguage: "en-IN",
      about: {
        "@type": "EducationalOccupationalProgram",
        name: `MBBS in ${group.state}`,
        occupationalCategory: "Medical education",
        timeToComplete: "P5Y6M",
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: colleges.length,
        itemListElement: colleges.map((college, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: college.collegeName,
          url: `${SITE_URL}${getMBBSIndiaCollegeHref(college)}`,
        })),
      },
    },
    counselling
      ? {
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: `${group.state} MBBS counselling data 2025`,
          description:
            "Prior-year MBBS seat matrix and category-wise round cutoff reference.",
          temporalCoverage: "2025",
          spatialCoverage: group.state,
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
            <span>{group.state}</span>
          </nav>
          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.22em] text-[#5EEAD4]">
            State MBBS directory
          </p>
          <h1 className="mt-3 max-w-5xl text-4xl font-extrabold tracking-normal md:text-6xl">
            MBBS Colleges in {group.state}
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-200 md:text-lg">
            Government and private medical colleges, MBBS seats, counselling
            access, and available 2025 prior-year counselling records for{" "}
            {group.state}.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Total colleges", formatNumber(colleges.length)],
              ["MBBS seats", formatNumber(group.totalSeats)],
              ["Government", formatNumber(group.governmentCount)],
              ["Private", formatNumber(group.privateCount)],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-white/15 bg-white/10 p-4"
              >
                <p className="text-2xl font-extrabold">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-300">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
              Counselling access
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">{access.label}</h2>
            <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
              {access.detail}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1D4ED8]">
              National reference
            </p>
            <p className="mt-2 text-3xl font-extrabold">
              {formatNumber(
                mbbsIndiaCounselling2025.general.allIndiaCollegeSnapshotCount
              )}
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
              MBBS colleges appeared in the imported 2025 all-India snapshot.
              The live directory may include later additions.
            </p>
          </div>
        </div>
      </section>

      {counselling ? (
        <section className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <PriorYearCounsellingNotice />

            {counselling.stateFacts ? (
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-3xl font-extrabold text-[#047857]">
                    {counselling.stateFacts.governmentStateQuotaPercent}%
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-800">
                    Government-college state quota reference
                  </p>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                  <p className="text-3xl font-extrabold text-[#1D4ED8]">
                    {counselling.stateFacts.privateStateQuotaPercent}%
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-800">
                    Private-college state quota reference
                  </p>
                </div>
                <div className="rounded-xl border border-violet-200 bg-violet-50 p-5">
                  <p className="text-lg font-extrabold text-violet-800">
                    All-India access
                  </p>
                  <p className="mt-2 text-sm font-bold text-slate-800">
                    Management quota was listed for NEET-qualified candidates
                    from across India.
                  </p>
                </div>
              </div>
            ) : null}

            <div className="mt-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
                2025 seat matrix
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                College and quota-wise MBBS seats
              </h2>
              <p className="mt-3 max-w-4xl text-sm font-medium leading-6 text-slate-600">
                Category cells that were blank in the 2025 reference remain
                blank here. Open a college page for its complete seat and cutoff
                tables.
              </p>
              <div className="mt-5">
                <SeatMatrixTable rows={counselling.seatMatrix} showCollege />
              </div>
            </div>

            <div className="mt-10">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#1D4ED8]">
                2025 closing data
              </p>
              <h2 className="mt-2 text-3xl font-extrabold">
                Colleges with round-wise cutoff records
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {counselling.cutoffs.map((record) => {
                  const college = colleges.find(
                    (item) => item.collegeName === record.collegeName
                  );
                  if (!college) return null;

                  return (
                    <Link
                      key={record.collegeName}
                      href={getMBBSIndiaCollegeHref(college)}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#00C896]/60 hover:shadow-md"
                    >
                      <h3 className="font-extrabold text-slate-950">
                        {record.collegeName}
                      </h3>
                      <p className="mt-2 text-xs font-semibold text-slate-500">
                        {record.categories.length} category/quota rows · Round
                        1, 2, 3 and stray-round fields
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#047857]">
            Medical college directory
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">
            All MBBS colleges in {group.state}
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {colleges.map((college) => (
              <Link
                key={college.collegeName}
                href={getMBBSIndiaCollegeHref(college)}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#00C896]/60 hover:shadow-md"
              >
                <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#047857]">
                  {college.category}
                </p>
                <h3 className="mt-2 font-extrabold text-slate-950">
                  {college.collegeName}
                </h3>
                <p className="mt-3 text-sm font-semibold text-slate-600">
                  {formatNumber(college.seatCapacity)} MBBS seats · Established{" "}
                  {college.establishmentYear}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
