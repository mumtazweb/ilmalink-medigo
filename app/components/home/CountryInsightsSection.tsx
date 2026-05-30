type Destination = {
  href: string;
  label: string;
  flag: string;
  fee: string;
  universities: number;
  language: string;
  recognition: string;
};

type CountryInsightsSectionProps = {
  destinationData: Destination[];
};

export default function CountryInsightsSection({ destinationData }: CountryInsightsSectionProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
        Country intelligence
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">
        Insights by destination
      </h2>
      <div className="mt-6 grid gap-3">
        {destinationData.slice(0, 4).map((destination) => (
          <div
            key={destination.label}
            className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={`https://flagcdn.com/w40/${destination.flag}.png`}
                  alt={`${destination.label} Flag`}
                  className="h-5 w-6 rounded-sm"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-base font-semibold text-[#081B35]">
                    {destination.label}
                  </h3>
                  <p className="text-sm text-slate-500">{destination.recognition}</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-[#0F4CFF]">
                {destination.language}
              </span>
            </div>
            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              <p>
                Estimated fees: <span className="font-semibold text-[#081B35]">{destination.fee}</span>
              </p>
              <p>{destination.universities} medical universities</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
