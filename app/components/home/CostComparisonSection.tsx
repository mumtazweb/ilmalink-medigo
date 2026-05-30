type CostInsight = {
  label: string;
  fee: string;
  hostel: string;
  living: string;
};

type Destination = {
  href: string;
  label: string;
  flag: string;
  fee: string;
  universities: number;
  language: string;
  recognition: string;
};

type CostComparisonSectionProps = {
  costInsights: CostInsight[];
};

export default function CostComparisonSection({ costInsights }: CostComparisonSectionProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-[#f8fafc] p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
            Cost intelligence
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">
            Compare MBBS budgets across major destinations
          </h2>
        </div>
        <span className="rounded-full bg-[#00C896]/10 px-3 py-2 text-sm font-semibold text-[#04653d]">
          Student-tested
        </span>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {costInsights.map((item) => (
          <div
            key={item.label}
            className="rounded-[24px] bg-white p-5 shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
          >
            <p className="text-lg font-semibold text-[#081B35]">{item.label}</p>
            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              <p>
                Tuition: <span className="font-semibold text-[#0B1D39]">{item.fee}</span>
              </p>
              <p>
                Hostel: <span className="font-semibold text-[#0B1D39]">{item.hostel}</span>
              </p>
              <p>
                Living cost: <span className="font-semibold text-[#0B1D39]">{item.living}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
