import type { LucideIcon } from "lucide-react";

export default function PortalStatCard({
  label,
  value,
  note,
  icon: Icon,
  tone = "blue",
}: {
  label: string;
  value: string | number;
  note?: string;
  icon: LucideIcon;
  tone?: "blue" | "teal" | "violet" | "amber" | "red";
}) {
  const tones = {
    blue: "bg-[#EAF3FF] text-[#1769E8]",
    teal: "bg-[#E7F8F2] text-[#08A776]",
    violet: "bg-[#F2E9FF] text-[#8038E8]",
    amber: "bg-[#FFF4DE] text-[#D4840A]",
    red: "bg-[#FFE9ED] text-[#D73750]",
  };

  return (
    <article className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[.1em] text-[#60738F]">
            {label}
          </p>
          <strong className="mt-2 block text-3xl font-black tracking-[-.04em] text-[#082A62]">
            {value}
          </strong>
          {note ? (
            <p className="mt-1 text-xs font-medium leading-5 text-[#71839A]">
              {note}
            </p>
          ) : null}
        </div>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}
