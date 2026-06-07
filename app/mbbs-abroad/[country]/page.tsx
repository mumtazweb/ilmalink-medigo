import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CounsellingActionButton from "../../components/CounsellingActionButton";
import Navbar from "../../components/navbar";
import {
  getFmgeCollegeConnectLabel,
  getFmgeCollegeAnchor,
  getFmgeCollegeDetailHref,
  getFmgeCountryBySlug,
  getFmgeCountryDisplayName,
  getFmgeCountryHref,
  getGeneratedFmgeCountryStaticParams,
  whatsappCounsellingUrl,
} from "../../data/exploreLinks";

export const dynamic = "force-static";

const numberFormatter = new Intl.NumberFormat("en-IN");

type CountryPageParams = Promise<{
  country: string;
}>;

export async function generateStaticParams() {
  return getGeneratedFmgeCountryStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: CountryPageParams;
}): Promise<Metadata> {
  const { country: countrySlug } = await params;
  const country = getFmgeCountryBySlug(countrySlug);

  if (!country) {
    return {
      title: "MBBS Abroad Country | ILMALINK MEDIGO",
    };
  }

  const displayName = getFmgeCountryDisplayName(country.country);

  return {
    title: `MBBS in ${displayName} | FMGE Data | ILMALINK MEDIGO`,
    description: `Explore ${displayName} FMGE country and college-wise data with counselling support for MBBS abroad shortlisting.`,
    alternates: {
      canonical: `https://www.mbbs.ilmalink.com${getFmgeCountryHref(country.country)}`,
    },
  };
}

export default async function FmgeCountryPage({
  params,
}: {
  params: CountryPageParams;
}) {
  const { country: countrySlug } = await params;
  const country = getFmgeCountryBySlug(countrySlug);

  if (!country) notFound();

  const displayName = getFmgeCountryDisplayName(country.country);
  const whatsappHref = `${whatsappCounsellingUrl}?text=${encodeURIComponent(
    `I want counselling for MBBS in ${displayName}. Please share verified university and admission guidance.`
  )}`;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <Navbar />

      <section className="bg-[#031525] px-4 pb-14 pt-32 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/mbbs-abroad"
            className="inline-flex rounded-lg border border-white/15 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-[#5EEAD4] transition hover:border-[#5EEAD4]"
          >
            MBBS Abroad Countries
          </Link>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-normal md:text-6xl">
            MBBS in {displayName}
          </h1>
          <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-slate-200 md:text-lg md:leading-8">
            Country-wise and institute-wise FMGE data is shown for reference.
            Students should verify university recognition, course duration,
            internship rules, English medium, local licence eligibility, WDOMS
            listing, and NMC/FMGL compliance before admission.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["FMGE appeared", numberFormatter.format(country.appeared)],
              ["FMGE passed", numberFormatter.format(country.passed)],
              ["Pass rate", country.passRate],
              ["College entries", numberFormatter.format(country.colleges.length)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-white/15 bg-white/10 p-4">
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-slate-300">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CounsellingActionButton
              className="inline-flex items-center justify-center rounded-lg bg-[#00C896] px-5 py-3 text-sm font-extrabold text-[#031525] transition hover:bg-[#12dfad]"
            >
              Connect for Counselling
            </CounsellingActionButton>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 px-5 py-3 text-sm font-extrabold text-white transition hover:border-[#00C896]"
            >
              WhatsApp Expert
            </a>
          </div>
        </div>
      </section>

      <section id="fmge-colleges" className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#047857]">
                FMGE college data
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-normal md:text-3xl">
                {displayName} college-wise FMGE performance
              </h2>
              <p className="mt-3 max-w-3xl text-sm font-medium leading-6 text-slate-600">
                If a full college profile is not available yet, use the connect
                option to request verified counselling support.
              </p>
            </div>
            <Link
              href="/?fmge=explorer"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-extrabold text-[#071f3f] transition hover:border-[#00C896] hover:text-[#047857]"
            >
              Open Full FMGE Explorer
            </Link>
          </div>

          <div className="mt-6 hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-[#071f3f] text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">College / Institute</th>
                  <th className="px-4 py-3 font-semibold">Appeared</th>
                  <th className="px-4 py-3 font-semibold">Passed</th>
                  <th className="px-4 py-3 font-semibold">Pass %</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {country.colleges.map((college) => {
                  const detailHref = getFmgeCollegeDetailHref(country.country, college.name);

                  return (
                    <tr
                      key={college.name}
                      id={getFmgeCollegeAnchor(country.country, college.name)}
                      className="scroll-mt-28"
                    >
                      <td className="px-4 py-3 font-extrabold text-[#071f3f]">
                        {detailHref ? (
                          <Link href={detailHref} className="transition hover:text-[#047857]">
                            {college.name}
                          </Link>
                        ) : (
                          college.name
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {numberFormatter.format(college.appeared)}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {numberFormatter.format(college.passed)}
                      </td>
                      <td className="px-4 py-3 font-extrabold text-[#047857]">
                        {college.passRate}
                      </td>
                      <td className="px-4 py-3">
                        {detailHref ? (
                          <Link
                            href={detailHref}
                            className="inline-flex items-center justify-center rounded-lg border border-[#06345a] px-3 py-2 text-xs font-extrabold text-[#06345a] transition hover:border-[#00C896] hover:text-[#047857]"
                          >
                            View College Page
                          </Link>
                        ) : (
                          <div className="flex flex-wrap items-center gap-2">
                            <CounsellingActionButton
                              title={getFmgeCollegeConnectLabel(country.country, college.name)}
                              className="inline-flex items-center justify-center rounded-lg bg-[#00C896] px-3 py-2 text-xs font-extrabold text-[#031525] transition hover:bg-[#12dfad]"
                            >
                              Connect
                            </CounsellingActionButton>
                            <a
                              href={whatsappHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2 text-xs font-extrabold text-slate-700 transition hover:border-[#00C896] hover:text-[#047857]"
                            >
                              WhatsApp
                            </a>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-3 lg:hidden">
            {country.colleges.map((college) => {
              const detailHref = getFmgeCollegeDetailHref(country.country, college.name);

              return (
                <article
                  key={college.name}
                  className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-extrabold leading-5 text-[#071f3f]">
                      {detailHref ? (
                        <Link href={detailHref} className="transition hover:text-[#047857]">
                          {college.name}
                        </Link>
                      ) : (
                        college.name
                      )}
                    </h3>
                    <span className="rounded-full bg-[#ECFDF5] px-2.5 py-1 text-xs font-extrabold text-[#047857]">
                      {college.passRate}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        Appeared
                      </p>
                      <p className="mt-1 font-extrabold text-slate-900">
                        {numberFormatter.format(college.appeared)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                        Passed
                      </p>
                      <p className="mt-1 font-extrabold text-slate-900">
                        {numberFormatter.format(college.passed)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {detailHref ? (
                      <Link
                        href={detailHref}
                        className="inline-flex items-center justify-center rounded-lg border border-[#06345a] px-3 py-2.5 text-xs font-extrabold text-[#06345a] transition hover:border-[#00C896] hover:text-[#047857]"
                      >
                        View College Page
                      </Link>
                    ) : (
                      <>
                        <CounsellingActionButton
                          className="inline-flex items-center justify-center rounded-lg bg-[#00C896] px-3 py-2.5 text-xs font-extrabold text-[#031525] transition hover:bg-[#12dfad]"
                        >
                          Connect
                        </CounsellingActionButton>
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-3 py-2.5 text-xs font-extrabold text-slate-700 transition hover:border-[#00C896] hover:text-[#047857]"
                        >
                          WhatsApp
                        </a>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm font-semibold leading-6 text-amber-950">
          FMGE data shows candidate appearance and performance only. It does not
          indicate NMC approval, university recognition, admission suitability,
          or current compliance status.
        </div>
      </section>
    </main>
  );
}
