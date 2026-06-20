import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CounsellingActionButton from "../../components/CounsellingActionButton";
import GeoCountrySection from "../../components/GeoCountrySection";
import Navbar from "../../components/navbar";
import TrustNote from "../../components/TrustNote";
import VerificationCounsellingCard from "../../components/VerificationCounsellingCard";
import {
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
      canonical: `https://www.ilmalink.com${getFmgeCountryHref(country.country)}`,
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
  const countryHref = getFmgeCountryHref(country.country);
  const countryUrl = `https://www.ilmalink.com${countryHref.endsWith("/") ? countryHref : `${countryHref}/`}`;
  const whatsappHref = `${whatsappCounsellingUrl}?text=${encodeURIComponent(
    `I want counselling for MBBS in ${displayName}. Please share verified university and admission guidance.`
  )}`;
  const previewColleges = country.colleges.slice(0, 30);
  const hasMoreColleges = country.colleges.length > previewColleges.length;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.ilmalink.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "MBBS Abroad",
        item: "https://www.ilmalink.com/mbbs-abroad/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `MBBS in ${displayName}`,
        item: countryUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

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
            Use it with a guided eligibility check covering university recognition,
            course duration, internship rules, English medium, local licence
            eligibility, WDOMS listing, and NMC/FMGL compliance before admission.
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
              Check {displayName} MBBS Eligibility
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

      <GeoCountrySection countryName={displayName} showTrustNote={false} />

      <VerificationCounsellingCard
        countryName={`${displayName} MBBS`}
        title={`Check ${displayName} MBBS eligibility with an expert`}
        buttonLabel={`Get ${displayName} Counselling`}
        showTrustNote={false}
      />

      <section className="px-4 pb-2 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <TrustNote
            whatThisPageHelpsWith={[
              `Checking basic MBBS eligibility for ${displayName}.`,
              "Understanding NEET, WDOMS, course duration and medium of instruction.",
              "Shortlisting universities before paying application or booking fees.",
              "Preparing questions for counselling, documents, visa and licensing review.",
            ]}
          />
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
                The table is focused on performance data for clear student comparison.
                Admission guidance actions are grouped into one contact panel.
              </p>
            </div>
            <Link
              href="/mbbs-abroad/explorer"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-extrabold text-[#071f3f] transition hover:border-[#00C896] hover:text-[#047857]"
            >
              Open Full FMGE Explorer
            </Link>
          </div>

          <div className="sticky top-20 z-20 mt-6 rounded-2xl border border-[#00C896]/35 bg-gradient-to-r from-[#031525] via-[#06345a] to-[#0b5f73] p-4 text-white shadow-[0_22px_45px_rgba(3,21,37,0.28)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#99F6E4]">
                  Premium Guidance Desk
                </p>
                <p className="mt-1 text-sm font-semibold leading-6 text-slate-100 md:text-base">
                  Need a verified shortlist for {displayName}? Get one expert review for eligibility,
                  recognition, and counselling risks.
                </p>
              </div>
              <CounsellingActionButton
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#00C896] to-[#2DD4BF] px-5 text-sm font-extrabold text-[#022c22] shadow-[0_14px_30px_rgba(45,212,191,0.35)] transition hover:-translate-y-0.5 hover:from-[#34D399] hover:to-[#5EEAD4]"
              >
                Get Expert Eligibility Review
              </CounsellingActionButton>
            </div>
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
                {previewColleges.map((college) => {
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
                          <span className="inline-flex items-center rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">
                            Profile update pending
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {hasMoreColleges ? (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 shadow-sm">
              <p className="font-semibold">
                Showing top 30 colleges for {displayName}. For the full country dataset,
                open the FMGE Explorer.
              </p>
              <Link
                href="/mbbs-abroad/explorer"
                className="mt-3 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-[#071f3f] transition hover:border-[#00C896] hover:text-[#047857]"
              >
                Open Full FMGE Explorer
              </Link>
            </div>
          ) : null}

          <div className="mt-6 grid gap-3 lg:hidden">
            {previewColleges.map((college) => {
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
                      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-center text-xs font-bold text-amber-900 sm:col-span-2">
                        Profile update pending
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
            {hasMoreColleges ? (
              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700 shadow-sm">
                <p className="font-semibold">
                  Showing top 30 colleges for {displayName}. For the full country dataset,
                  open the FMGE Explorer.
                </p>
                <Link
                  href="/mbbs-abroad/explorer"
                  className="mt-3 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-extrabold text-[#071f3f] transition hover:border-[#00C896] hover:text-[#047857]"
                >
                  Open Full FMGE Explorer
                </Link>
              </div>
            ) : null}
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
