import type { Metadata } from "next";

import Navbar from "../components/navbar";
import OfficialAdvisoryBox from "../components/OfficialAdvisoryBox";
import {
  getApprovedVersions,
  getArchivedVersions,
  getPendingVersions,
  type OfficialTextVersion,
} from "@/lib/advisoryStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Official Advisories | ILMALINK MEDIGO",
  description:
    "Approved official advisory updates tracked from NMC, counselling committees, embassies, NBEMS and other official medical education sources.",
};

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
  let dataError: string | null = null;

  try {
    [approvedVersions, archivedVersions, pendingVersions] =
      await Promise.all([
        getApprovedVersions(),
        getArchivedVersions(),
        getPendingVersions(),
      ]);
  } catch {
    dataError =
      "Official advisory tracker data is temporarily unavailable.";
  }

  const historyBySource = groupHistory(archivedVersions);
  const pendingKeys = new Set(pendingVersions.map(getVersionKey));

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
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

        {dataError && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-medium leading-6 text-amber-900">
            {dataError}
          </div>
        )}

        {!dataError && approvedVersions.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-600 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
            No official advisory update has been approved for public
            display yet.
          </div>
        )}

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
    </main>
  );
}
