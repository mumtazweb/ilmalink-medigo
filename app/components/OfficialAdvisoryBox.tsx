import CounsellingActionButton from "./CounsellingActionButton";

export type AdvisoryHistoryItem = {
  id: string;
  versionLabel: string;
  roundLabel?: string | null;
  detectedAt?: string | null;
  summary?: string | null;
};

export type OfficialAdvisoryBoxProps = {
  country: string;
  sourceName: string;
  category: string;
  versionLabel: string;
  roundLabel?: string | null;
  lastChecked?: string | null;
  summary: string;
  keyPoints?: string[];
  sourceUrl: string;
  updateNote?: string | null;
  history?: AdvisoryHistoryItem[];
  hasPendingUpdate?: boolean;
  disclaimer?: string;
};

const defaultDisclaimer =
  "Official advisory and counselling information may change. Check the latest official source, course duration, internship, English medium instruction, WDOMS listing, local licence eligibility, NMC/FMGL compliance, counselling rules, seat matrix, and reporting instructions before admission.";

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

function isPdfUrl(url: string) {
  return /\.pdf($|\?)/i.test(url);
}

export default function OfficialAdvisoryBox({
  country,
  sourceName,
  category,
  versionLabel,
  roundLabel,
  lastChecked,
  summary,
  keyPoints = [],
  sourceUrl,
  updateNote,
  history = [],
  hasPendingUpdate = false,
  disclaimer = defaultDisclaimer,
}: OfficialAdvisoryBoxProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
      <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#0F4CFF]">
        <span>{country}</span>
        <span className="text-slate-300">/</span>
        <span>{category}</span>
      </div>

      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A]">
            {sourceName}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {versionLabel}
            {roundLabel ? ` - ${roundLabel}` : ""}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
          Last checked: {formatDate(lastChecked)}
        </div>
      </div>

      {hasPendingUpdate && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-900">
          New official update detected. ilmalink, an extension/service line of ilmalink, is reviewing
          the changes. Current information will be updated after admin
          verification.
        </p>
      )}

      <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700">
        {summary}
      </p>

      {keyPoints.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-bold text-[#0F172A]">
            Key points
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            {keyPoints.map((point) => (
              <li key={point}>- {point}</li>
            ))}
          </ul>
        </div>
      )}

      {updateNote && (
        <p className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-950">
          {updateNote}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!isPdfUrl(sourceUrl) ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#0F4CFF] transition hover:border-[#0F4CFF]/30"
          >
            Official source
          </a>
        ) : (
          <span className="text-sm font-semibold text-slate-500">
            Official source reference recorded by ilmalink.
          </span>
        )}
      </div>

      {history.length > 0 && (
        <div className="mt-5 border-t border-slate-200 pt-4">
          <h3 className="text-sm font-bold text-[#0F172A]">
            Update history
          </h3>
          <div className="mt-3 space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
              >
                <p className="font-bold text-[#0F172A]">
                  {item.versionLabel}
                  {item.roundLabel ? ` - ${item.roundLabel}` : ""}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {formatDate(item.detectedAt)}
                </p>
                {item.summary && (
                  <p className="mt-2 leading-6">{item.summary}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 border-t border-slate-200 pt-4">
        <p className="text-xs leading-5 text-slate-500">
          {disclaimer}
        </p>
        <CounsellingActionButton className="mt-3 inline-flex items-center justify-center rounded-full bg-[#00C896] px-4 py-2 text-xs font-extrabold text-white transition hover:bg-[#0EA5A4]">
          Request Advisory Review
        </CounsellingActionButton>
      </div>
    </article>
  );
}
