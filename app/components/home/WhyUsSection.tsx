type FeatureBlock = {
  title: string;
  desc: string;
};

type WhyUsSectionProps = {
  featureBlocks: FeatureBlock[];
};

export default function WhyUsSection({ featureBlocks }: WhyUsSectionProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-[#0B1D39] p-6 text-white shadow-[0_18px_44px_rgba(15,23,42,0.18)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#7DD3FC]">
            Why ilmaLink
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Premium student-first admission support.
          </h2>
        </div>
        <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
          Trusted globally
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {featureBlocks.map((feature) => (
          <div key={feature.title} className="rounded-[24px] bg-slate-950/10 p-5">
            <p className="text-lg font-semibold text-white">{feature.title}</p>
            <p className="mt-2 text-sm text-slate-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
