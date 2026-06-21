import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";

import type { KyrgyzUniversityPageData } from "../../data/kyrgyzstanUniversities";
import { kyrgyzstanUniversityImage } from "../../data/kyrgyzstanUniversityMedia";

const cardDetails: Record<
  string,
  { name?: string; city?: string; fee?: string; accreditation?: string }
> = {
  "kyrgyz-state-medical-academy": {
    name: "Kyrgyz State Medical Academy",
    city: "Bishkek",
    fee: "$2,100/semester",
    accreditation: "Accreditation Authority",
  },
  "international-higher-school-of-medicine-central": {
    name: "International Higher School of Medicine — Central Campus",
    city: "Bishkek",
    fee: "$2,750/semester",
    accreditation: "Accredited 6Y",
  },
  "international-higher-school-of-medicine-elite": {
    name: "International Higher School of Medicine — Elite Campus",
    city: "Issyk-Kul",
    fee: "$1,900/semester",
    accreditation: "Accredited 6Y",
  },
  "osh-state-university": {
    name: "Osh State University Medical Faculty",
    city: "Osh",
    fee: "$1,700/semester*",
    accreditation: "Accredited 6Y",
  },
};

function universityHref(slug: string) {
  return `/mbbs-abroad/kyrgyzstan/${slug}/`;
}

function conciseAccreditation(university: KyrgyzUniversityPageData) {
  const custom = cardDetails[university.slug]?.accreditation;
  if (custom) return custom;

  if (university.accreditationStatus.includes("6-Year")) {
    return "Accredited 6Y";
  }
  if (university.accreditationStatus.includes("1-Year")) {
    return "Accredited 1Y";
  }
  if (university.accreditationStatus.includes("Did Not Pass")) {
    return "Accreditation Failed";
  }
  if (university.accreditationStatus.includes("Not Subject")) {
    return "Accreditation Exempt";
  }

  return "Verify Accreditation";
}

function displayCity(university: KyrgyzUniversityPageData) {
  const custom = cardDetails[university.slug]?.city;
  if (custom) return custom;

  const city = university.location.split(/[;,]/)[0]?.trim();
  return city && city !== "To be updated" ? city : "Location to verify";
}

function displayFee(university: KyrgyzUniversityPageData) {
  const custom = cardDetails[university.slug]?.fee;
  if (custom) return custom;

  const fee = university.feeRows.find(
    (row) =>
      row.tuitionFee &&
      row.tuitionFee !== "To be updated" &&
      row.tuitionFee !== "Not specified in brochure",
  )?.tuitionFee;

  return fee ? `${fee}/semester` : "Fee requires verification";
}

export function KyrgyzstanUniversityCard({
  university,
  motionIndex = 0,
}: {
  university: KyrgyzUniversityPageData;
  motionIndex?: number;
}) {
  const displayName = cardDetails[university.slug]?.name ?? university.name;
  const liquidStyle = {
    "--liquid-delay": `${-(motionIndex % 7) * 0.8}s`,
  } as CSSProperties;

  return (
    <Link
      href={universityHref(university.slug)}
      className="group block h-[212px] w-[calc(100vw-2rem)] min-w-[280px] max-w-[320px] flex-none snap-start sm:h-[360px]"
      aria-label={`View the full ${displayName} profile`}
    >
      <article
        style={liquidStyle}
        className="kyrgyz-liquid-university-card flex h-full w-full flex-col overflow-hidden rounded-[1.4rem] transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_68px_rgba(8,45,67,0.22)]"
      >
        <div className="relative h-16 shrink-0 overflow-hidden bg-[#082b54] sm:h-20">
          <Image
            src={kyrgyzstanUniversityImage(university.slug)}
            alt={`${displayName} campus`}
            fill
            sizes="(max-width: 639px) 78vw, 320px"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#031b35]/45 via-transparent to-black/5" />
          <span className="absolute right-2 top-2 rounded-full border border-white/25 bg-[#031b35]/85 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.12em] text-white shadow-lg backdrop-blur-md sm:right-3 sm:px-2.5 sm:py-1 sm:text-[9px]">
            Full profile
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-3.5 sm:grid sm:grid-rows-[112px_24px_28px] sm:content-between sm:gap-0 sm:p-5">
          <h3 className="line-clamp-2 overflow-hidden text-[15px] font-black leading-5 tracking-normal text-[#071f3f] sm:line-clamp-4 sm:h-28 sm:text-xl sm:leading-7">
            {displayName}
          </h3>

          <div className="flex h-5 min-w-0 flex-nowrap items-center gap-1.5 overflow-hidden text-[9px] font-bold min-[360px]:text-[10px] sm:h-6 sm:gap-3 sm:text-xs">
            <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-slate-500">
              <MapPin size={14} className="shrink-0 text-rose-500" />
              <span>{displayCity(university)}</span>
            </span>
            <span
              className={`inline-flex min-w-0 items-center gap-1 truncate whitespace-nowrap font-extrabold ${
                university.accreditationStatus.includes("Did Not Pass")
                  ? "text-red-600"
                  : university.accreditationStatus.includes("1-Year")
                    ? "text-amber-700"
                    : "text-emerald-700"
              }`}
            >
              <ShieldCheck size={13} className="shrink-0" />
              {conciseAccreditation(university)}
            </span>
          </div>

          <p className="h-6 overflow-hidden whitespace-nowrap text-base font-black leading-6 tracking-normal text-[#00A878] sm:h-7 sm:text-xl sm:leading-7">
            {displayFee(university)}
          </p>
        </div>
      </article>
    </Link>
  );
}

export default function KyrgyzstanUniversityRail({
  universities,
  labelledBy,
}: {
  universities: KyrgyzUniversityPageData[];
  labelledBy: string;
  compact?: boolean;
}) {
  return (
    <div
      aria-labelledby={labelledBy}
      className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-7 pt-3 [scrollbar-width:thin] [scrollbar-color:#9fb3c8_transparent] sm:-mx-6 sm:px-6 lg:-mx-2 lg:px-2"
    >
      {universities.map((university, index) => (
        <KyrgyzstanUniversityCard
          key={university.slug}
          university={university}
          motionIndex={index}
        />
      ))}
    </div>
  );
}
