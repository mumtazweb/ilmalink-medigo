import type {
  MBBSIndiaFeeRow,
  MBBSIndiaFeeStructure,
} from "../data/mbbsIndiaFeeStructure";

const WBMCC_NOTICE_URL = "https://wbmcc.nic.in/ug-medical-dental-notice-events/";

function statusLabel(row: MBBSIndiaFeeRow) {
  if (row.status === "not-available") return "Not available";
  if (row.status === "expected") return "Expected";
  return "Supplied";
}

function statusClassName(row: MBBSIndiaFeeRow) {
  if (row.status === "not-available") {
    return "bg-slate-100 text-slate-600 ring-slate-200";
  }

  if (row.status === "expected") {
    return "bg-amber-50 text-amber-800 ring-amber-200";
  }

  return "bg-emerald-50 text-emerald-700 ring-emerald-200";
}

export function FeeStructureNotice() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-950">
      2026 values are planning ranges from the supplied 2025 fee data. Verify
      the latest{" "}
      <a
        href={WBMCC_NOTICE_URL}
        target="_blank"
        rel="noreferrer"
        className="font-extrabold underline decoration-amber-700/40 underline-offset-4 hover:text-amber-800"
      >
        WBMCC UG medical notice
      </a>{" "}
      before payment or choice filling.
    </div>
  );
}

export function FeeStructureTable({
  records,
  showCollege = true,
}: {
  records: MBBSIndiaFeeStructure[];
  showCollege?: boolean;
}) {
  const rows = records.flatMap((record) =>
    record.rows.map((row) => ({ record, row })),
  );

  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[1040px] w-full border-collapse text-left text-xs">
          <thead className="bg-[#061D3F] text-white">
            <tr>
              {showCollege ? (
                <th className="px-3 py-3 font-extrabold">College</th>
              ) : null}
              <th className="px-3 py-3 font-extrabold">Academic year</th>
              <th className="px-3 py-3 font-extrabold">Quota</th>
              <th className="px-3 py-3 text-center font-extrabold">
                Semesters
              </th>
              <th className="px-3 py-3 text-right font-extrabold">
                Per semester
              </th>
              <th className="px-3 py-3 text-right font-extrabold">
                Total tuition
              </th>
              <th className="px-3 py-3 font-extrabold">Status</th>
              <th className="px-3 py-3 font-extrabold">Source / note</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ record, row }, index) => (
              <tr
                key={`${record.collegeName}-${row.yearLabel}-${row.quota}-${index}`}
                className="border-t border-slate-200 align-top odd:bg-slate-50/70"
              >
                {showCollege ? (
                  <td className="max-w-80 px-3 py-3 font-extrabold text-slate-950">
                    {record.collegeName}
                    <span className="mt-1 block text-xs font-semibold text-slate-500">
                      {record.seatIntake
                        ? `${record.seatIntake.toLocaleString("en-IN")} seats`
                        : "Seat intake not listed"}
                    </span>
                  </td>
                ) : null}
                <td className="px-3 py-3 font-bold text-slate-800">
                  {row.academicYear}
                </td>
                <td className="px-3 py-3 font-extrabold text-slate-900">
                  {row.quota}
                </td>
                <td className="px-3 py-3 text-center font-semibold text-slate-700">
                  {row.semesters}
                </td>
                <td className="px-3 py-3 text-right font-extrabold text-slate-900">
                  {row.perSemester.display}
                </td>
                <td className="px-3 py-3 text-right font-extrabold text-[#047857]">
                  {row.totalTuition.display}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.12em] ring-1 ${statusClassName(row)}`}
                  >
                    {statusLabel(row)}
                  </span>
                </td>
                <td className="max-w-72 px-3 py-3 font-semibold leading-5 text-slate-600">
                  {row.source}
                  {row.note ? (
                    <span className="mt-1 block text-amber-800">{row.note}</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
