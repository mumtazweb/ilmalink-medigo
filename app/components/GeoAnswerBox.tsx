type GeoAnswerBoxProps = {
  title: string;
  summary: string;
  facts: {
    label: string;
    value: string;
  }[];
  sourceNote?: string;
};

export default function GeoAnswerBox({
  title,
  summary,
  facts,
  sourceNote,
}: GeoAnswerBoxProps) {
  return (
    <section
      aria-labelledby="geo-answer-title"
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_44px_rgba(15,23,42,0.08)] md:p-6"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0F4CFF]">
        Quick Overview
      </p>
      <h2
        id="geo-answer-title"
        className="mt-2 text-2xl font-black leading-tight text-[#081B35] md:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-4 text-base font-medium leading-8 text-slate-700 md:text-lg md:leading-9">
        {summary}
      </p>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3"
          >
            <dt className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm font-extrabold leading-6 text-[#0B2244]">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      {sourceNote ? (
        <p className="mt-4 rounded-lg border border-[#00C896]/25 bg-[#ECFDF5] px-4 py-3 text-sm font-semibold leading-6 text-[#047857]">
          {sourceNote}
        </p>
      ) : null}
    </section>
  );
}
