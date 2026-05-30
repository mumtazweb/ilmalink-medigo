import Link from "next/link";

type Destination = {
  href: string;
  label: string;
  flag: string;
  fee: string;
  universities: number;
  language: string;
  recognition: string;
};

type DestinationsSectionProps = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  filteredDestinations: Destination[];
};

export default function DestinationsSection({
  searchQuery,
  onSearchQueryChange,
  filteredDestinations,
}: DestinationsSectionProps) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
            Top destinations
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#081B35]">
            Marketplace for premier MBBS countries
          </h2>
        </div>
        <Link
          href="/mbbs-abroad"
          className="text-sm font-semibold text-[#0F4CFF] transition hover:text-[#0B1D39]"
        >
          View all countries →
        </Link>
      </div>

      <div className="mt-6">
        <label className="block">
          <span className="sr-only">Search countries</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search destination..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#0F4CFF] focus:ring-2 focus:ring-[#0F4CFF]/15"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filteredDestinations.map((destination) => (
          <Link
            key={destination.href}
            href={destination.href}
            className="group rounded-[24px] border border-slate-200 bg-[#f8fafc] p-5 transition hover:-translate-y-1 hover:border-[#0F4CFF]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={`https://flagcdn.com/w40/${destination.flag}.png`}
                  alt={`${destination.label} Flag`}
                  className="h-5 w-6 rounded-sm"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[#081B35]">{destination.label}</h3>
                  <p className="text-sm text-slate-500">{destination.recognition}</p>
                </div>
              </div>
              <span className="rounded-full bg-[#0F4CFF]/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0F4CFF]">
                {destination.language}
              </span>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-600">
              <p>
                Starting from <span className="font-semibold text-[#081B35]">{destination.fee}</span>
              </p>
              <p>{destination.universities} universities</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
