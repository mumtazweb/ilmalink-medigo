import type { Metadata } from "next";
import { ExternalLink, ShieldCheck } from "lucide-react";

import Navbar from "../components/navbar";
import OfficialAdvisoryBox from "../components/OfficialAdvisoryBox";
import {
  getApprovedVersions,
  getArchivedVersions,
  getPendingVersions,
  type OfficialTextVersion,
} from "@/lib/advisoryStore";

export const revalidate = 3600;
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Official Advisories | ILMALINK MEDIGO",
  description:
    "Official NMC, MCC, NBEMS and state counselling advisory sources with approved ILMALINK MEDIGO summaries for medical students.",
};

const officialSourceDirectory = [
  {
    authority: "National Medical Commission",
    category: "MBBS Abroad",
    title: "Foreign medical education rules and advisories",
    summary:
      "Use the NMC information desk to review requirements and official material for Indian students planning medical education outside India.",
    checks: [
      "Foreign Medical Graduate Licentiate regulations",
      "Course duration, internship and medium requirements",
      "Eligibility and Indian licensing conditions",
    ],
    href: "https://www.nmc.org.in/information-desk/for-students-to-study-in-abroad/",
  },
  {
    authority: "National Medical Commission",
    category: "MBBS India",
    title: "Medical college and course search",
    summary:
      "Check the official NMC directory before relying on a medical college name, course, intake or recognition statement.",
    checks: [
      "College and course details",
      "Annual intake and permission information",
      "Official institution records",
    ],
    href: "https://www.nmc.org.in/information-desk/college-and-course-search/",
  },
  {
    authority: "Medical Counselling Committee",
    category: "NEET-UG Counselling",
    title: "Current UG counselling notices",
    summary:
      "Review current MCC notices for All India counselling, eligibility instructions, results, seat matrices and reporting updates.",
    checks: [
      "Current notices and corrigenda",
      "Seat matrix and allotment results",
      "Eligibility, reporting and document instructions",
    ],
    href: "https://mcc.nic.in/current-events-ug/",
  },
  {
    authority: "Medical Counselling Committee",
    category: "Schedules",
    title: "UG schedules and information bulletins",
    summary:
      "Use the official MCC schedule page for counselling timelines, registration guidance and the applicable information bulletin.",
    checks: [
      "Round-wise counselling schedule",
      "Registration and choice-filling dates",
      "Official information bulletin",
    ],
    href: "https://mcc.nic.in/eservices-schedule-ug/",
  },
  {
    authority: "National Board of Examinations in Medical Sciences",
    category: "FMGE",
    title: "FMGE examination information and notices",
    summary:
      "Check the NBEMS FMGE page for the current information bulletin, application notices, examination updates and results.",
    checks: [
      "Information bulletin and eligibility",
      "Application and examination notices",
      "Results and candidate updates",
    ],
    href: "https://natboard.edu.in/viewnbeexam?exam=fmge",
  },
  {
    authority: "West Bengal Medical Counselling Committee",
    category: "West Bengal Counselling",
    title: "UG medical and dental notices",
    summary:
      "West Bengal candidates should use the WBMCC notice page for state counselling instructions, candidate notices and admission updates.",
    checks: [
      "State counselling notices",
      "Candidate and NRI instructions",
      "Round and admission updates",
    ],
    href: "https://wbmcc.nic.in/ug-medical-dental-notice-events/",
  },
] as const;

function getVersionKey(version: OfficialTextVersion) {
  return `${version.sourceId}:${version.category}`;
}

function getSummary(version: OfficialTextVersion) {
  return (
    version.publicSummary?.trim() ||
    version.extractedData?.textPreview?.trim() ||
    version.extractedText.slice(0, 900).trim() ||
    "Approved official advisory update is available for this source."
  );
}

function getKeyPoints(version: OfficialTextVersion) {
  const keywordPoints =
    version.extractedData?.keywordMatches?.map(
      (keyword) => `Official keyword matched: ${keyword}`
    ) ?? [];

  return keywordPoints.slice(0, 8);
}

function groupHistory(versions: OfficialTextVersion[]) {
  const history = new Map<string, OfficialTextVersion[]>();

  for (const version of versions) {
    const key = getVersionKey(version);
    history.set(key, [...(history.get(key) ?? []), version]);
  }

  return history;
}

export default async function OfficialAdvisoriesPage() {
  let approvedVersions: OfficialTextVersion[] = [];
  let archivedVersions: OfficialTextVersion[] = [];
  let pendingVersions: OfficialTextVersion[] = [];

  try {
    [approvedVersions, archivedVersions, pendingVersions] =
      await Promise.all([
        getApprovedVersions(),
        getArchivedVersions(),
        getPendingVersions(),
      ]);
  } catch {
    // The static official-source directory remains available without tracker data.
  }

  const historyBySource = groupHistory(archivedVersions);
  const pendingKeys = new Set(pendingVersions.map(getVersionKey));

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-[#0F4CFF]">
            Official update tracker
          </p>
          <h1 className="mt-3 text-3xl font-bold text-[#0F172A] md:text-5xl">
            Official Advisories
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
            ILMALINK MEDIGO publishes only admin-approved text/data
            summaries from official sources. New detected changes are
            reviewed before public information is updated.
          </p>
        </div>

        {approvedVersions.length > 0 && (
          <section aria-labelledby="approved-advisories-heading">
            <div className="mb-5">
              <h2
                id="approved-advisories-heading"
                className="text-2xl font-bold text-[#0F172A] md:text-3xl"
              >
                Approved advisory summaries
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                These summaries have completed ILMALINK MEDIGO&apos;s
                editorial review. Always open the linked official source
                before acting.
              </p>
            </div>

            <div className="grid gap-5">
              {approvedVersions.map((version) => {
                const key = getVersionKey(version);
                const history =
                  historyBySource.get(key)?.map((item) => ({
                    id: item.id,
                    versionLabel: item.versionLabel,
                    roundLabel: item.roundLabel,
                    detectedAt: item.detectedAt,
                    summary: getSummary(item),
                  })) ?? [];

                return (
                  <OfficialAdvisoryBox
                    key={version.id}
                    country={version.country}
                    sourceName={version.sourceName}
                    category={version.category}
                    versionLabel={version.versionLabel}
                    roundLabel={version.roundLabel}
                    lastChecked={
                      version.lastChecked ?? version.detectedAt
                    }
                    summary={getSummary(version)}
                    keyPoints={getKeyPoints(version)}
                    sourceUrl={version.sourceUrl}
                    updateNote={version.adminNote}
                    history={history}
                    hasPendingUpdate={pendingKeys.has(key)}
                  />
                );
              })}
            </div>
          </section>
        )}

        <section
          aria-labelledby="official-source-directory-heading"
          className={approvedVersions.length > 0 ? "mt-12" : undefined}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#047857]">
                Direct official access
              </p>
              <h2
                id="official-source-directory-heading"
                className="mt-2 text-2xl font-bold text-[#0F172A] md:text-3xl"
              >
                Official advisory and notice sources
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Use these regulator and counselling authority pages for the
              latest notices. Official documents take priority over any
              summary or counselling guidance.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {officialSourceDirectory.map((source) => (
              <article
                key={source.href}
                className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#047857]">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#047857]">
                      {source.category}
                    </p>
                    <h3 className="mt-1 text-lg font-bold leading-7 text-[#0F172A]">
                      {source.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {source.authority}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {source.summary}
                </p>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Check for
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                    {source.checks.map((check) => (
                      <li key={check} className="flex gap-2">
                        <span className="text-[#047857]" aria-hidden="true">
                          -
                        </span>
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 self-start rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-[#0F4CFF] transition hover:border-[#0F4CFF]/30 hover:bg-blue-50"
                >
                  Open official source
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>

          <p className="mt-6 text-xs leading-6 text-slate-500">
            Admission, counselling, examination and licensing information can
            change. Verify the latest dated notice, applicable session and
            candidate category on the official authority website before taking
            action.
          </p>
        </section>
      </section>
    </main>
  );
}
