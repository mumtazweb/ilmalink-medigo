import Link from "next/link";

type JourneySectionProps = {
  journeySteps: string[];
};

export default function JourneySection({ journeySteps }: JourneySectionProps) {
  return (
    <section className="mt-12 rounded-[32px] bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
            Admission journey
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#081B35]">
            Your end-to-end MBBS application roadmap
          </h2>
        </div>
        <Link
          href="/portal/signup/"
          className="inline-flex items-center justify-center rounded-full bg-[#0F4CFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3fd6]"
        >
          Start your journey
        </Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {journeySteps.map((step, index) => (
          <div key={step} className="rounded-[24px] border border-slate-200 bg-[#f8fafc] p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0F4CFF]/10 font-semibold text-[#0F4CFF]">
              {index + 1}
            </div>
            <p className="mt-4 text-sm font-semibold text-[#081B35]">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
