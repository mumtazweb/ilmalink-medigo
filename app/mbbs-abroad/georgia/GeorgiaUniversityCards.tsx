import Image from "next/image";
import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";

import type { GeorgiaUniversityPageData } from "../../data/georgiaUniversities";

function universityHref(slug: string) {
  return `/mbbs-abroad/georgia/${slug}/`;
}

function cardImage(university: GeorgiaUniversityPageData) {
  return university.heroImage ?? "/georgia/georgia-tbilisi-student-life.jpg";
}

function feeLine(university: GeorgiaUniversityPageData) {
  if (university.annualTuition) {
    return `${university.annualTuition}/year`;
  }

  if (university.feeRows[0]?.tuitionFee) {
    return `${university.feeRows[0].tuitionFee}/semester`;
  }

  return "Fee requires verification";
}

function statusLine(university: GeorgiaUniversityPageData) {
  if (university.accreditationLabel.includes("NCEQE")) {
    return "NCEQE Accredited";
  }
  if (university.accreditationLabel.includes("NMC-compliant")) {
    return "WHO / WFME Recognized";
  }
  if (university.accreditationLabel.includes("Private university")) {
    return "Recognition Check";
  }
  if (university.accreditationLabel.includes("verification required")) {
    return "Recognition Check";
  }

  return "Verify recognition";
}

export function GeorgiaUniversityCard({
  university,
}: {
  university: GeorgiaUniversityPageData;
}) {
  return (
    <Link
      href={universityHref(university.slug)}
      className="group block h-[360px] w-[calc(100vw-2rem)] min-w-[280px] max-w-[320px] flex-none snap-start"
      aria-label={`View the full ${university.name} profile`}
    >
      <article className="flex h-full w-full flex-col overflow-hidden rounded-[1.4rem] border border-slate-200/90 bg-white shadow-[0_18px_48px_rgba(8,27,53,0.10)] transition duration-300 group-hover:-translate-y-1.5 group-hover:border-emerald-300 group-hover:shadow-[0_26px_60px_rgba(8,27,53,0.16)]">
        <div className="relative h-20 shrink-0 overflow-hidden bg-[#082b54]">
          <Image
            src={cardImage(university)}
            alt={`${university.name} in ${university.city}, Georgia`}
            fill
            sizes="(max-width: 639px) 78vw, 320px"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031b35]/45 via-transparent to-black/5" />
          <span className="absolute right-3 top-2 rounded-full border border-white/25 bg-[#031b35]/85 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md">
            Full profile
          </span>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-[112px_24px_28px] content-between p-5">
          <h3 className="line-clamp-4 h-28 overflow-hidden text-lg font-black leading-6 tracking-tight text-[#071f3f] sm:text-xl sm:leading-7">
            {university.name}
          </h3>

          <div className="flex h-6 min-w-0 flex-nowrap items-center gap-2 overflow-hidden text-[10px] font-bold sm:gap-3 sm:text-xs">
            <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-slate-500">
              <MapPin size={14} className="shrink-0 text-rose-500" />
              <span>{university.city}</span>
            </span>
            <span className="inline-flex min-w-0 items-center gap-1 truncate whitespace-nowrap font-extrabold text-emerald-700">
              <ShieldCheck size={13} className="shrink-0" />
              {statusLine(university)}
            </span>
          </div>

          <p className="h-7 overflow-hidden whitespace-nowrap text-lg font-black leading-7 tracking-tight text-[#00A878] sm:text-xl">
            {feeLine(university)}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default function GeorgiaUniversityRail({
  universities,
  labelledBy,
}: {
  universities: GeorgiaUniversityPageData[];
  labelledBy: string;
  compact?: boolean;
}) {
  return (
    <div
      aria-labelledby={labelledBy}
      className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-7 pt-3 [scrollbar-width:thin] [scrollbar-color:#9fb3c8_transparent] sm:-mx-6 sm:px-6 lg:-mx-2 lg:px-2"
    >
      {universities.map((university) => (
        <GeorgiaUniversityCard
          key={university.slug}
          university={university}
        />
      ))}
    </div>
  );
}
