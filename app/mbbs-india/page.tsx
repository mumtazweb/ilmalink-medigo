import type { Metadata } from "next";
import Navbar from "../components/navbar";
import { mbbsIndiaColleges, mbbsIndiaCollegesByState, type MBBSIndiaCollege } from "../data/mbbsIndiaColleges";
import { getMBBSIndiaAdmissionAccess, type MBBSIndiaAdmissionAccess } from "../data/mbbsIndiaAdmissionAccess";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Study MBBS in India | NMC Medical College List | ILMALINK MEDIGO",
  description:
    "Explore the complete MBBS India medical college list with state-wise government and private colleges, MBBS seats, establishment year, and counselling guidance.",
  alternates: {
    canonical: "https://www.mbbs.ilmalink.com/mbbs-india",
  },
};

const totalSeats = mbbsIndiaColleges.reduce((sum, college) => sum + college.seatCapacity, 0);
const governmentColleges = mbbsIndiaColleges.filter((college) => college.category === "Government").length;
const privateColleges = mbbsIndiaColleges.filter((college) => college.category === "Private").length;
const priorityStateCards = mbbsIndiaCollegesByState.filter((group) => group.privateCount > 0).slice(0, 6);

const formatNumber = (value: number) => value.toLocaleString("en-IN");

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

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
            <article key={`${college.state}-${college.collegeName}`} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">
              <h4 className="text-sm font-bold leading-5 text-slate-950">{college.collegeName}</h4>
              <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                Seats: {formatNumber(college.seatCapacity)} | Established: {college.establishmentYear} | Fees: {college.fees}
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

      <section className="bg-[#061D3F] px-4 pb-12 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#5EEAD4]">MBBS India Directory</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-normal md:text-6xl">
              Study MBBS in India: Complete NMC Medical College List
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
              Explore state-wise government and private medical colleges, MBBS seat intake, establishment year, and fee placeholders from the provided NMC list.
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

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#047857]">Private access first</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal text-slate-950 md:text-3xl">
                Open private MBBS states to review first
              </h2>
            </div>
            <p className="max-w-2xl text-sm font-medium leading-6 text-slate-600">
              West Bengal, Karnataka, and Jharkhand stay first, followed by states with private MBBS routes listed for all-India applicants.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {priorityStateCards.map((group) => {
              const access = getMBBSIndiaAdmissionAccess(group.state, group.privateCount);

              return (
                <a
                  key={group.state}
                  href={`#${slugify(group.state)}`}
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
                </a>
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
            <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-slate-600">
              Private colleges are shown first for counselling review. Access labels are guidance for private/state quota discovery; always verify the latest state bulletin before choice filling.
            </p>
          </div>

          <div className="grid gap-5">
            {mbbsIndiaCollegesByState.map((group) => {
              const access = getMBBSIndiaAdmissionAccess(group.state, group.privateCount);

              return (
                <section key={group.state} id={slugify(group.state)} className="scroll-mt-28 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 bg-[#F1F5F9] px-4 py-4 sm:px-5">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-extrabold text-slate-950">{group.state}</h3>
                          <AdmissionAccessBadge access={access} />
                        </div>
                        <p className="mt-2 text-sm font-semibold text-slate-600">
                          Study MBBS in {group.state} with private colleges listed first, then government colleges.
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
