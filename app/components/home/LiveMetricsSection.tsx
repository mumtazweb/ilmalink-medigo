type LiveMetric = {
  label: string;
  value: string;
};

type LiveMetricsSectionProps = {
  liveMetrics: LiveMetric[];
};

export default function LiveMetricsSection({ liveMetrics }: LiveMetricsSectionProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
        Live admission dashboard
      </p>
      <div className="mt-6 grid gap-4">
        {liveMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[24px] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
          >
            <p className="text-3xl font-semibold text-[#081B35]">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-500">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
