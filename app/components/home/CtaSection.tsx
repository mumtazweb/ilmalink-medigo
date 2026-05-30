import Link from "next/link";

type CtaSectionProps = {
  onOpenPopup: () => void;
};

export default function CtaSection({ onOpenPopup }: CtaSectionProps) {
  return (
    <section className="mt-12 rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_44px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#0B1D39]">
            Ready to move faster?
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#081B35]">
            Your global medical career starts here.
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/about/"
            className="inline-flex items-center justify-center rounded-full border border-[#0B1D39] px-5 py-3 text-sm font-semibold text-[#0B1D39] transition hover:bg-slate-50"
          >
            About Us
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-[#0F4CFF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b3fd6]"
            onClick={onOpenPopup}
          >
            Book Counselling
          </button>
          <Link
            href="/mbbs-abroad"
            className="inline-flex items-center justify-center rounded-full bg-[#00C896] px-5 py-3 text-sm font-semibold text-[#081B35] transition hover:bg-[#00b07a]"
          >
            Compare Countries
          </Link>
        </div>
      </div>
    </section>
  );
}
