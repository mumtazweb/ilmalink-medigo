type TrustNoteProps = {
  lastReviewedDate?: string;
  whatThisPageHelpsWith: string[];
};

export default function TrustNote({
  lastReviewedDate = "June 18, 2026",
  whatThisPageHelpsWith,
}: TrustNoteProps) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-[#F8FAFC] p-5 text-slate-700 md:p-6">
      <div className="grid gap-5 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
            Trust Note
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-normal text-[#081B35]">
            Reviewed by: ilmalink Counselling Desk
          </h2>
          <p className="mt-3 text-sm font-bold text-slate-600">
            Last reviewed: {lastReviewedDate}
          </p>
        </div>

        <div>
          <h3 className="text-base font-black text-[#081B35]">
            What this page helps with
          </h3>
          <ul className="mt-3 grid gap-2 text-sm font-semibold leading-7">
            {whatThisPageHelpsWith.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#0F4CFF]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-7 text-slate-600">
            Disclaimer: Final admission depends on eligibility, documents,
            university rules, government regulations, counselling rules and
            visa/licensing requirements.
          </p>
        </div>
      </div>
    </aside>
  );
}
