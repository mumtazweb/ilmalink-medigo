type CountryFactTableProps = {
  countryName: string;
  wdomsCount: number;
  duration: string;
  medium: string;
  neetRequirementForIndianStudents: string;
  licensingNote: string;
  eligibilitySummary: string;
  keyAdmissionPoints: string[];
  importantWarning?: string;
};

function formatCount(count: number) {
  return new Intl.NumberFormat("en-IN").format(count);
}

export default function CountryFactTable({
  countryName,
  wdomsCount,
  duration,
  medium,
  neetRequirementForIndianStudents,
  licensingNote,
  eligibilitySummary,
  keyAdmissionPoints,
  importantWarning,
}: CountryFactTableProps) {
  const rows = [
    ["WDOMS entries", `${formatCount(wdomsCount)} listed medical school entries`],
    ["Typical duration", duration],
    ["Medium of instruction", medium],
    ["NEET rule for Indian students", neetRequirementForIndianStudents],
    ["Licensing note", licensingNote],
    ["Eligibility summary", eligibilitySummary],
  ];

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="max-w-4xl">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#047857]">
          Country Fact Table
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-normal text-[#081B35] md:text-3xl">
          MBBS in {countryName}: eligibility, duration and counselling facts
        </h2>
        <p className="mt-3 text-sm font-medium leading-7 text-slate-600 md:text-base">
          These facts keep the core admission points visible for students,
          parents and search systems before any counselling form or CTA.
        </p>
      </div>

      <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
        <table className="min-w-[760px] w-full border-collapse text-left text-sm">
          <tbody className="divide-y divide-slate-200">
            {rows.map(([label, value]) => (
              <tr key={label} className="align-top">
                <th className="w-44 bg-[#F8FAFC] px-4 py-4 text-xs font-black uppercase tracking-[0.12em] text-slate-500 md:w-64">
                  {label}
                </th>
                <td className="px-4 py-4 font-semibold leading-7 text-slate-700">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {importantWarning ? (
        <div className="mt-5 rounded-lg border border-amber-300 bg-amber-50 px-4 py-4 text-sm font-semibold leading-7 text-amber-900">
          {importantWarning}
        </div>
      ) : null}

      <div className="mt-5 rounded-lg border border-[#00C896]/25 bg-[#ECFDF5] p-5">
        <h3 className="text-lg font-black text-[#064E3B]">
          Key counselling points for {countryName}
        </h3>
        <ul className="mt-4 grid gap-3 text-sm font-semibold leading-7 text-[#065F46] md:grid-cols-2">
          {keyAdmissionPoints.map((point) => (
            <li key={point} className="flex gap-3">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#00C896]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
