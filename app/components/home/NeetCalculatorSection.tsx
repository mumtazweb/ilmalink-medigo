type NeetCalculatorSectionProps = {
  neetScore: string;
  onNeetScoreChange: (value: string) => void;
  computeOutcome: (score: number) => string;
};

export default function NeetCalculatorSection({
  neetScore,
  onNeetScoreChange,
  computeOutcome,
}: NeetCalculatorSectionProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
        NEET decision center
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-[#081B35]">
        Score-based pathway guidance
      </h3>
      <p className="mt-4 text-sm leading-7 text-slate-600">
        Enter your NEET score to see the most likely admission pathway across
        India and Abroad.
      </p>
      <div className="mt-6 space-y-4">
        <label className="space-y-2 text-sm text-slate-600">
          NEET Score
          <input
            type="number"
            min={1}
            max={720}
            value={neetScore}
            onChange={(event) => onNeetScoreChange(event.target.value)}
            placeholder="e.g. 512"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0F4CFF] focus:ring-2 focus:ring-[#0F4CFF]/15"
          />
        </label>
        <div className="rounded-[24px] bg-[#eff6ff] p-4 text-sm text-slate-700">
          {computeOutcome(Number(neetScore))}
        </div>
      </div>
    </section>
  );
}
