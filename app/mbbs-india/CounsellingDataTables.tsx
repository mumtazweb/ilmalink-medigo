import {
  mbbsIndiaSeatCategoryLabels,
  mbbsIndiaSeatCategoryOrder,
  type MBBSIndiaCollegeCutoff,
  type MBBSIndiaSeatMatrixRow,
} from "../data/mbbsIndiaCounselling";

const formatNumber = (value: number | null | undefined) =>
  typeof value === "number" ? value.toLocaleString("en-IN") : "—";

export function PriorYearCounsellingNotice() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-950">
      These figures are a 2025 prior-year counselling reference. They are not
      the current 2026 seat matrix or cutoff, and should be used for historical
      comparison only.
    </div>
  );
}

export function SeatMatrixTable({
  rows,
  showCollege = false,
}: {
  rows: MBBSIndiaSeatMatrixRow[];
  showCollege?: boolean;
}) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-[1180px] w-full border-collapse text-left text-xs">
          <thead className="bg-[#061D3F] text-white">
            <tr>
              {showCollege ? (
                <th className="px-3 py-3 font-extrabold">College</th>
              ) : null}
              <th className="px-3 py-3 font-extrabold">Institute type</th>
              <th className="px-3 py-3 font-extrabold">Quota</th>
              {mbbsIndiaSeatCategoryOrder.map((category) => (
                <th key={category} className="px-2 py-3 text-center font-extrabold">
                  {mbbsIndiaSeatCategoryLabels[category]}
                </th>
              ))}
              <th className="px-3 py-3 text-center font-extrabold">Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.collegeName}-${row.quota}-${index}`}
                className="border-t border-slate-200 align-top odd:bg-slate-50/70"
              >
                {showCollege ? (
                  <td className="max-w-72 px-3 py-3 font-bold text-slate-950">
                    {row.collegeName}
                  </td>
                ) : null}
                <td className="px-3 py-3 font-semibold text-slate-600">
                  {row.instituteType}
                </td>
                <td className="px-3 py-3 font-bold text-slate-800">{row.quota}</td>
                {mbbsIndiaSeatCategoryOrder.map((category) => (
                  <td
                    key={category}
                    className="px-2 py-3 text-center font-semibold text-slate-700"
                  >
                    {formatNumber(row.categorySeats[category])}
                  </td>
                ))}
                <td className="px-3 py-3 text-center font-extrabold text-[#047857]">
                  {formatNumber(row.totalSeats)}
                  {row.hasSourceMismatch ? (
                    <span
                      className="ml-1 text-amber-600"
                      title="One or more category cells were blank or did not add up to the listed total in the 2025 reference."
                    >
                      *
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.some((row) => row.hasSourceMismatch) ? (
        <p className="border-t border-slate-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">
          * One or more category cells were blank or did not add up to the
          listed total in the 2025 reference; blank cells are preserved as
          unavailable.
        </p>
      ) : null}
    </div>
  );
}

export function CutoffTable({
  cutoff,
}: {
  cutoff: MBBSIndiaCollegeCutoff;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full border-collapse text-left text-xs">
          <thead className="bg-[#061D3F] text-white">
            <tr>
              <th rowSpan={2} className="px-3 py-3 font-extrabold">
                Category / quota
              </th>
              {["Round 1", "Round 2", "Round 3", "Stray round"].map((round) => (
                <th
                  key={round}
                  colSpan={2}
                  className="border-l border-white/15 px-3 py-2 text-center font-extrabold"
                >
                  {round}
                </th>
              ))}
            </tr>
            <tr className="border-t border-white/15">
              {Array.from({ length: 4 }).flatMap((_, index) => [
                <th
                  key={`score-${index}`}
                  className="border-l border-white/15 px-3 py-2 text-center font-bold"
                >
                  Closing score
                </th>,
                <th
                  key={`rank-${index}`}
                  className="px-3 py-2 text-center font-bold"
                >
                  Closing rank
                </th>,
              ])}
            </tr>
          </thead>
          <tbody>
            {cutoff.categories.map((row) => (
              <tr
                key={row.category}
                className="border-t border-slate-200 odd:bg-slate-50/70"
              >
                <td className="px-3 py-3 font-extrabold text-slate-900">
                  {row.category}
                </td>
                {[
                  row.round1Score,
                  row.round1Rank,
                  row.round2Score,
                  row.round2Rank,
                  row.round3Score,
                  row.round3Rank,
                  row.strayScore,
                  row.strayRank,
                ].map((value, index) => (
                  <td
                    key={index}
                    className={`px-3 py-3 text-center font-semibold ${
                      index % 2 === 0 ? "border-l border-slate-200" : ""
                    }`}
                  >
                    {formatNumber(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
