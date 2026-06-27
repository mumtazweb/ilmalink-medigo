import type { Metadata } from "next";
import Link from "next/link";
import CounsellingActionButton from "../components/CounsellingActionButton";
import Navbar from "../components/navbar";
import { mbbsIndiaCounselling2025 } from "../data/mbbsIndiaCounselling";
import { mbbsIndiaColleges, mbbsIndiaCollegesByState, type MBBSIndiaCollege } from "../data/mbbsIndiaColleges";
import { getMBBSIndiaAdmissionAccess, type MBBSIndiaAdmissionAccess } from "../data/mbbsIndiaAdmissionAccess";
import {
  getMBBSIndiaCollegeAnchor,
  getMBBSIndiaCollegeHref,
  getMBBSIndiaStateAnchor,
  getMBBSIndiaStateHref,
} from "../data/exploreLinks";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Study MBBS in India | NMC Medical College List | ilmaLink",
  description:
    "Explore the complete MBBS India medical college list with state-wise government and private colleges, MBBS seats, establishment year, and counselling guidance.",
  alternates: {
    canonical: "https://www.ilmalink.com/mbbs-india",
  },
};

const totalSeats = mbbsIndiaColleges.reduce((sum, college) => sum + college.seatCapacity, 0);
const governmentColleges = mbbsIndiaColleges.filter((college) => college.category === "Government").length;
const privateColleges = mbbsIndiaColleges.filter((college) => college.category === "Private").length;
const priorityStateCards = mbbsIndiaCollegesByState.filter((group) => group.privateCount > 0).slice(0, 6);
const counsellingCutoffRows = mbbsIndiaCounselling2025.cutoffs.reduce(
  (sum, record) => sum + record.categories.length,
  0
);

const formatNumber = (value: number) => value.toLocaleString("en-IN");

const formatCollegeFee = (fee: string) => {
  const normalized = fee.trim().toLowerCase();
  if (!normalized || normalized === "##" || normalized === "na" || normalized === "n/a") {
    return "To be updated";
  }

  return fee;
};

function AdmissionAccessBadge({ access }: { access: MBBSIndiaAdmissionAccess }) {
  const className =
    access.status === "open"
      ? "bg-[#ECFDF5] text-[#047857] ring-[#A7F3D0]"
      : access.status === "state-specific"
        ? "bg-[#FFF7ED] text-[#C2410C] ring-[#FED7AA]"
        : "bg-slate-100 text-slate-500 ring-slate-200";

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.12em] ring-1 ${className}`}>
      {access.label}
    </span>
  );
}

function CollegeList({ title, colleges, tone }: { title: string; colleges: MBBSIndiaCollege[]; tone: "green" | "blue" }) {
  const badgeClass =
    tone === "green"
      ? "bg-[#ECFDF5] text-[#047857] ring-[#A7F3D0]"
      : "bg-[#EFF6FF] text-[#1D4ED8] ring-[#BFDBFE]";

  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-slate-800">{title}</h3>
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${badgeClass}`}>
          {formatNumber(colleges.length)}
        </span>
      </div>
      <div className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-3">
        {colleges.length > 0 ? (
          colleges.map((college) => (
            <article
              key={`${college.state}-${college.collegeName}`}
              id={getMBBSIndiaCollegeAnchor(college)}
              className="scroll-mt-32 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3 transition target:border-[#00C896] target:bg-[#ECFDF5] target:ring-2 target:ring-[#00C896]/25"
            >
              <Link
                href={getMBBSIndiaCollegeHref(college)}
                className="text-sm font-bold leading-5 text-slate-950 transition hover:text-[#047857]"
              >
                {college.collegeName}
              </Link>
              <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                Seats: {formatNumber(college.seatCapacity)} | Established: {college.establishmentYear} | Fees: {formatCollegeFee(college.fees)}
              </p>
            </article>
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-sm font-semibold text-slate-500">
            No colleges listed in this category.
          </p>
        )}
      </div>
    </div>
  );
}

export default function MBBSIndiaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-950">
      <Navbar />

      <section className="bg-[#061D3F] px-4 pb-12 pt-8 text-white sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#5EEAD4]">MBBS India Directory</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-normal md:text-6xl">
              Study MBBS in India: Complete NMC Medical College List
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
              Explore state-wise government and private medical colleges, MBBS seat intake, establishment year, and counselling guidance for India admissions.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Total colleges", formatNumber(mbbsIndiaColleges.length)],
              ["MBBS seats", formatNumber(totalSeats)],
              ["Government colleges", formatNumber(governmentColleges)],
              ["Private colleges", formatNumber(privateColleges)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#047857]">
                2025 prior-year counselling reference
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950 md:text-3xl">
                Seat matrix and cutoff data linked to college pages
              </h2>
            </div>
            <Link
              href={getMBBSIndiaStateHref("West Bengal")}
              className="inline-flex items-center justify-center rounded-lg bg-[#061D3F] px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#0B2B56]"
            >
              Explore West Bengal 2025 Data
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "All-India snapshot",
                formatNumber(
                  mbbsIndiaCounselling2025.general.allIndiaCollegeSnapshotCount
                ),
                "MBBS colleges listed in the 2025 reference",
              ],
              [
                "Seat-matrix rows",
                formatNumber(mbbsIndiaCounselling2025.seatMatrix.length),
                "College and quota combinations",
              ],
              [
                "Cutoff colleges",
                formatNumber(mbbsIndiaCounselling2025.cutoffs.length),
                "Colleges with round-wise closing data",
              ],
              [
                "Category rows",
                formatNumber(counsellingCutoffRows),
                "GEN, EWS, OBC, SC, ST and management records",
              ],
            ].map(([label, value, detail]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="text-2xl font-extrabold text-slate-950">{value}</p>
                <p className="mt-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#047857]">
                  {label}
                </p>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#047857]">
                MBBS course structure
              </p>
              <p className="mt-2 text-3xl font-extrabold text-slate-950">
                {mbbsIndiaCounselling2025.general.courseDurationYears} years
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {mbbsIndiaCounselling2025.general.academicStudyYears} years of
                academic study plus{" "}
                {mbbsIndiaCounselling2025.general.internshipYears} year of
                internship in the 2025 reference.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#1D4ED8]">
                  NEET-UG exam structure in the 2025 reference
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-600">
                  {mbbsIndiaCounselling2025.general.neet.totalQuestions}{" "}
                  questions · {mbbsIndiaCounselling2025.general.neet.totalMarks}{" "}
                  marks · {mbbsIndiaCounselling2025.general.neet.durationHours}{" "}
                  hours
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-white text-slate-500">
                    <tr>
                      <th className="px-4 py-2 font-extrabold">Subject</th>
                      <th className="px-4 py-2 text-center font-extrabold">
                        Questions
                      </th>
                      <th className="px-4 py-2 text-center font-extrabold">
                        Marks
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mbbsIndiaCounselling2025.general.neet.subjects.map(
                      (subject) => (
                        <tr
                          key={subject.subject}
                          className="border-t border-slate-100"
                        >
                          <td className="px-4 py-2 font-bold text-slate-800">
                            {subject.subject}
                          </td>
                          <td className="px-4 py-2 text-center font-semibold text-slate-600">
                            {subject.questions}
                          </td>
                          <td className="px-4 py-2 text-center font-semibold text-slate-600">
                            {subject.marks}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs font-semibold leading-5 text-amber-800">
            Historical 2025 figures are provided for comparison and are not the
            current 2026 seat matrix or cutoff.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#047857]">Private MBBS planning</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950 md:text-3xl">
                States to compare for private MBBS options
              </h2>
            </div>
            <div className="max-w-2xl">
              <p className="text-sm font-medium leading-6 text-slate-600">
                Compare states with private medical college options, seat intake, fee notes, and counselling route indicators before building your preference list.
              </p>
              <CounsellingActionButton className="mt-3 inline-flex items-center justify-center rounded-lg bg-[#00C896] px-4 py-2.5 text-sm font-extrabold text-[#061D3F] shadow-sm transition hover:bg-[#12dfad]">
                Discuss Private MBBS Options
              </CounsellingActionButton>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {priorityStateCards.map((group) => {
              const access = getMBBSIndiaAdmissionAccess(group.state, group.privateCount);

              return (
                <Link
                  key={group.state}
                  href={getMBBSIndiaStateHref(group.state)}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-[#00C896]/60 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-extrabold text-slate-950">{group.state}</h3>
                    <AdmissionAccessBadge access={access} />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-600">
                    Govt: {formatNumber(group.governmentCount)} | Private: {formatNumber(group.privateCount)}
                  </p>
                  <p className="mt-1 text-sm font-extrabold text-[#047857]">{formatNumber(group.totalSeats)} MBBS seats</p>
                  <p className="mt-3 line-clamp-2 text-xs font-semibold leading-5 text-slate-500">{access.detail}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1D4ED8]">Full state-wise list</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950 md:text-3xl">
              All MBBS India colleges by state
            </h2>
            <div className="mt-3 flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium leading-6 text-slate-600">
                Use this state-wise list to compare government/private college availability, seats, and counselling route indicators. For current quota, document, seat matrix, and reporting guidance, connect with ilmaLink.
              </p>
              <CounsellingActionButton className="inline-flex flex-shrink-0 items-center justify-center rounded-lg border border-[#00C896]/40 bg-white px-4 py-2.5 text-sm font-extrabold text-[#047857] shadow-sm transition hover:bg-[#ECFDF5]">
                Check State Counselling Fit
              </CounsellingActionButton>
            </div>
          </div>

          <div className="grid gap-5">
            {mbbsIndiaCollegesByState.map((group) => {
              const access = getMBBSIndiaAdmissionAccess(group.state, group.privateCount);

              return (
                <section key={group.state} id={getMBBSIndiaStateAnchor(group.state)} className="scroll-mt-28 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 bg-[#F1F5F9] px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            href={getMBBSIndiaStateHref(group.state)}
                            className="text-xl font-extrabold text-slate-950 transition hover:text-[#047857]"
                          >
                            {group.state}
                          </Link>
                          <AdmissionAccessBadge access={access} />
                        </div>
                        <p className="mt-2 text-sm font-semibold text-slate-600">
                          Review government and private MBBS colleges in {group.state}.
                        </p>
                        <p className="mt-1 max-w-3xl text-xs font-semibold leading-5 text-slate-500">{access.detail}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold sm:min-w-[24rem]">
                        <span className="rounded-lg bg-white px-2 py-2 text-slate-700 ring-1 ring-slate-200">Private {formatNumber(group.privateCount)}</span>
                        <span className="rounded-lg bg-white px-2 py-2 text-slate-700 ring-1 ring-slate-200">Govt {formatNumber(group.governmentCount)}</span>
                        <span className="rounded-lg bg-[#ECFDF5] px-2 py-2 text-[#047857] ring-1 ring-[#A7F3D0]">{formatNumber(group.totalSeats)} seats</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 p-3 sm:p-4">
                    <CollegeList title="Private Colleges" colleges={group.privateColleges} tone="blue" />
                    <CollegeList title="Government Colleges" colleges={group.governmentColleges} tone="green" />
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
