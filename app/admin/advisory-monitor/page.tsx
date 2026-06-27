import type { Metadata } from "next";
import { revalidatePath } from "next/cache";

import Navbar from "@/app/components/navbar";
import { requirePortalStaff } from "@/app/lib/portal/session";
import {
  approveTextVersion,
  getApprovedVersions,
  getArchivedVersions,
  getPendingVersions,
  getSources,
  getVersionChangesForVersions,
  rejectTextVersion,
  type AdvisorySourceRecord,
  type OfficialTextVersion,
  type OfficialTextVersionChange,
} from "@/lib/advisoryStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Official Advisory Monitor | ilmaLink Admin",
  description:
    "Admin monitor for official source updates, review queue, approvals and advisory history.",
};

function formatDate(value?: string | null) {
  if (!value) {
    return "Not checked yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function getPreview(version: OfficialTextVersion) {
  return (
    version.extractedData?.textPreview ||
    version.publicSummary ||
    version.extractedText.slice(0, 900)
  );
}

function stringifyItem(item: unknown) {
  if (typeof item === "string") {
    return item;
  }

  return JSON.stringify(item, null, 2);
}

function CompactJsonList({
  title,
  items,
}: {
  title: string;
  items?: unknown[] | null;
}) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500">
        <p className="font-bold text-[#0F172A]">{title}</p>
        <p className="mt-1">No items detected.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-sm font-bold text-[#0F172A]">{title}</p>
      <ul className="mt-2 max-h-52 space-y-2 overflow-auto text-xs leading-5 text-slate-700">
        {items.slice(0, 20).map((item, index) => (
          <li
            key={`${title}-${index}`}
            className="whitespace-pre-wrap rounded-lg bg-white p-2"
          >
            {stringifyItem(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SourceList({
  sources,
}: {
  sources: AdvisorySourceRecord[];
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">
            Official source list
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Placeholder URLs stay inactive until a verified official URL
            is added.
          </p>
        </div>
        <form
          action="/api/advisory-check"
          method="get"
          target="_blank"
        >
          <button className="rounded-full bg-[#0F4CFF] px-4 py-2 text-sm font-bold text-white">
            Check All Active
          </button>
        </form>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-separate border-spacing-y-2 text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Country</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Priority</th>
              <th className="px-3 py-2">Frequency</th>
              <th className="px-3 py-2">Last checked</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((source) => (
              <tr key={source.id} className="bg-slate-50">
                <td className="rounded-l-xl px-3 py-3 font-semibold text-[#0F172A]">
                  {source.country}
                </td>
                <td className="px-3 py-3">
                  <p className="font-semibold text-[#0F172A]">
                    {source.sourceName}
                  </p>
                  {!source.isActive && (
                    <p className="mt-1 text-xs font-semibold text-amber-700">
                      Inactive until official URL is configured.
                    </p>
                  )}
                </td>
                <td className="px-3 py-3 text-slate-700">
                  {source.sourceType}
                </td>
                <td className="px-3 py-3 text-slate-700">
                  {source.category}
                </td>
                <td className="px-3 py-3 text-slate-700">
                  {source.priority}
                </td>
                <td className="px-3 py-3 text-slate-700">
                  {source.monitorFrequency}
                </td>
                <td className="px-3 py-3 text-slate-700">
                  {formatDate(source.lastChecked)}
                </td>
                <td className="rounded-r-xl px-3 py-3">
                  <div className="flex flex-wrap gap-2">
                    {source.isActive ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#0F4CFF]"
                      >
                        Open Source
                      </a>
                    ) : (
                      <span className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-400">
                        URL Pending
                      </span>
                    )}
                    <form
                      action="/api/advisory-check"
                      method="get"
                      target="_blank"
                    >
                      <input
                        type="hidden"
                        name="sourceId"
                        value={source.id}
                      />
                      <button
                        disabled={!source.isActive}
                        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#0F172A] disabled:cursor-not-allowed disabled:text-slate-400"
                      >
                        Check Now
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PendingVersionCard({
  version,
  change,
  approveAction,
  rejectAction,
}: {
  version: OfficialTextVersion;
  change?: OfficialTextVersionChange;
  approveAction: (formData: FormData) => Promise<void>;
  rejectAction: (formData: FormData) => Promise<void>;
}) {
  const keywordMatches = version.extractedData?.keywordMatches ?? [];
  const pdfLinks = version.extractedData?.pdfLinks ?? [];
  const signals = version.extractedData?.signals ?? [];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-[#0F4CFF]">
            <span>{version.country}</span>
            <span>{version.category}</span>
            <span>{version.sourceType}</span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-[#0F172A]">
            {version.sourceName}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Detected {formatDate(version.detectedAt)}
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900">
          Needs Review
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Version
          </p>
          <p className="mt-2 font-bold text-[#0F172A]">
            {version.versionLabel}
          </p>
          {version.roundLabel && (
            <p className="mt-1 text-sm font-semibold text-[#0F4CFF]">
              {version.roundLabel}
            </p>
          )}
          <p className="mt-3 text-sm font-semibold text-slate-700">
            {version.title}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
            Source URL
          </p>
          <a
            href={version.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block break-all text-sm font-semibold text-[#0F4CFF]"
          >
            {version.sourceUrl}
          </a>
          {signals.length > 0 && (
            <p className="mt-3 text-xs font-semibold text-slate-600">
              Signals: {signals.join(", ")}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-bold text-[#0F172A]">
          Text preview
        </p>
        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
          {getPreview(version)}
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <CompactJsonList
          title="Keyword matches"
          items={keywordMatches}
        />
        <CompactJsonList
          title="PDF source references"
          items={pdfLinks.map((link) => ({
            text: link.text,
            href: link.href,
          }))}
        />
        <CompactJsonList
          title="Changed items"
          items={change?.changedItems}
        />
      </div>

      {change && (
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
          <p className="font-bold">Change summary</p>
          <p className="mt-1">{change.changeSummary}</p>
        </div>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <CompactJsonList
          title="Added items"
          items={change?.addedItems}
        />
        <CompactJsonList
          title="Removed items"
          items={change?.removedItems}
        />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <form action={approveAction} className="space-y-3">
          <input type="hidden" name="versionId" value={version.id} />
          <label className="block text-sm font-bold text-[#0F172A]">
            Editable public summary
            <textarea
              name="publicSummary"
              defaultValue={
                version.publicSummary || getPreview(version)
              }
              rows={6}
              className="mt-2 w-full p-3 text-sm leading-6"
            />
          </label>
          <label className="block text-sm font-bold text-[#0F172A]">
            Admin note
            <textarea
              name="adminNote"
              defaultValue={version.adminNote ?? ""}
              rows={4}
              className="mt-2 w-full p-3 text-sm leading-6"
            />
          </label>
          <button className="rounded-full bg-[#15803D] px-5 py-2.5 text-sm font-bold text-white">
            Approve
          </button>
        </form>

        <form action={rejectAction} className="space-y-3">
          <input type="hidden" name="versionId" value={version.id} />
          <label className="block text-sm font-bold text-[#0F172A]">
            Rejection note
            <textarea
              name="adminNote"
              rows={6}
              className="mt-2 w-full p-3 text-sm leading-6"
              placeholder="Why this detected update should not be published"
            />
          </label>
          <button className="rounded-full border border-red-200 bg-white px-5 py-2.5 text-sm font-bold text-red-600">
            Reject
          </button>
        </form>
      </div>
    </article>
  );
}

function VersionList({
  title,
  versions,
}: {
  title: string;
  versions: OfficialTextVersion[];
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
      <h2 className="text-xl font-bold text-[#0F172A]">{title}</h2>
      {versions.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">
          No records available.
        </p>
      ) : (
        <div className="mt-4 grid gap-3">
          {versions.map((version) => (
            <div
              key={version.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-bold text-[#0F172A]">
                    {version.sourceName}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {version.country} - {version.category} -{" "}
                    {version.versionLabel}
                  </p>
                  {version.roundLabel && (
                    <p className="mt-1 text-sm font-semibold text-[#0F4CFF]">
                      {version.roundLabel}
                    </p>
                  )}
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  {formatDate(version.detectedAt)}
                </p>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-700">
                {getPreview(version)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

async function requireAdminUser() {
  return requirePortalStaff(["super_admin", "education_admin"]);
}

export default async function AdvisoryMonitorPage() {
  const user = await requireAdminUser();

  async function approveAction(formData: FormData) {
    "use server";

    const actionUser = await requireAdminUser();
    const versionId = String(formData.get("versionId") ?? "");
    const publicSummary = String(
      formData.get("publicSummary") ?? ""
    );
    const adminNote = String(formData.get("adminNote") ?? "");

    if (versionId) {
      await approveTextVersion(
        versionId,
        publicSummary,
        adminNote,
        actionUser.name || actionUser.email || "Admin"
      );
      revalidatePath("/admin/advisory-monitor");
      revalidatePath("/official-advisories");
    }
  }

  async function rejectAction(formData: FormData) {
    "use server";

    await requireAdminUser();
    const versionId = String(formData.get("versionId") ?? "");
    const adminNote = String(formData.get("adminNote") ?? "");

    if (versionId) {
      await rejectTextVersion(versionId, adminNote);
      revalidatePath("/admin/advisory-monitor");
      revalidatePath("/official-advisories");
    }
  }

  let sources: AdvisorySourceRecord[] = [];
  let pendingVersions: OfficialTextVersion[] = [];
  let approvedVersions: OfficialTextVersion[] = [];
  let archivedVersions: OfficialTextVersion[] = [];
  let changesByVersion = new Map<string, OfficialTextVersionChange>();
  let dataError: string | null = null;

  try {
    [
      sources,
      pendingVersions,
      approvedVersions,
      archivedVersions,
    ] = await Promise.all([
      getSources(),
      getPendingVersions(),
      getApprovedVersions(),
      getArchivedVersions(),
    ]);

    const changes = await getVersionChangesForVersions(
      pendingVersions.map((version) => version.id)
    );
    changesByVersion = new Map(
      changes.map((change) => [change.newVersionId, change])
    );
  } catch {
    dataError =
      "MySQL advisory tracker data is unavailable. Check the MYSQL_* environment variables and table permissions.";
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
          <p className="text-sm font-bold uppercase tracking-widest text-[#0F4CFF]">
            Admin
          </p>
          <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A] md:text-5xl">
                Official Advisory Monitor
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                Review official source changes before any update is
                shown publicly. Logged in as {user.name}.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-2xl font-bold text-[#0F172A]">
                  {pendingVersions.length}
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Pending
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-2xl font-bold text-[#0F172A]">
                  {approvedVersions.length}
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Approved
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-2xl font-bold text-[#0F172A]">
                  {archivedVersions.length}
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  Archived
                </p>
              </div>
            </div>
          </div>
        </div>

        {dataError ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-medium leading-6 text-amber-900">
            {dataError}
          </div>
        ) : (
          <div className="space-y-8">
            <SourceList sources={sources} />

            <section>
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#0F172A]">
                  Pending updates
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Every detected change stays private until approved.
                </p>
              </div>
              {pendingVersions.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
                  No pending official updates.
                </div>
              ) : (
                <div className="grid gap-5">
                  {pendingVersions.map((version) => (
                    <PendingVersionCard
                      key={version.id}
                      version={version}
                      change={changesByVersion.get(version.id)}
                      approveAction={approveAction}
                      rejectAction={rejectAction}
                    />
                  ))}
                </div>
              )}
            </section>

            <VersionList
              title="Approved versions"
              versions={approvedVersions}
            />

            <VersionList
              title="Archived and history"
              versions={archivedVersions}
            />
          </div>
        )}
      </section>
    </main>
  );
}
