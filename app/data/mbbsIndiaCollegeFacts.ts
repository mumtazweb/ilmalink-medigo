import {
  getMBBSIndiaCollegeCounselling2025,
  mbbsIndiaSeatCategoryLabels,
  mbbsIndiaSeatCategoryOrder,
  type MBBSIndiaCollegeCutoff,
  type MBBSIndiaSeatMatrixRow,
} from "./mbbsIndiaCounselling";
import {
  mbbsIndiaColleges,
  type MBBSIndiaCollege,
} from "./mbbsIndiaColleges";
import {
  getMBBSIndiaCollegeHref,
} from "./exploreLinks";
import { getMBBSIndiaFeeStructure } from "./mbbsIndiaFeeStructure";

export type MBBSIndiaCollegeFacts = {
  college: MBBSIndiaCollege;
  counselling: ReturnType<typeof getMBBSIndiaCollegeCounselling2025>;
  href: string;
  feeText: string;
  seatText: string;
  seatMatrixText: string;
  cutoffText: string;
  searchableText: string;
  hasFee: boolean;
  hasSeatMatrix: boolean;
  hasCutoff: boolean;
};

const TO_BE_UPDATED = "To be updated";

const normalizeCollegeKey = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const normalizeFeeText = (value: string) =>
  value
    .replace(/\bnot available\b/gi, TO_BE_UPDATED)
    .replace(/\s+/g, " ")
    .trim();

export function isRealFeeValue(fees?: string): boolean {
  const normalized = normalizeCollegeKey(fees ?? "");

  if (!normalized) return false;

  return ![
    "to be updated",
    "fees to be updated",
    "fee to be updated",
    "not available",
    "not specified",
    "na",
    "n a",
    "nil",
  ].includes(normalized);
}

function feeTextFromStructure(college: MBBSIndiaCollege) {
  const feeStructure = getMBBSIndiaFeeStructure(college);
  if (!feeStructure) return null;

  const totalParts = feeStructure.rows
    .filter((row) => row.yearLabel === "2025")
    .map((row) => {
      const total = normalizeFeeText(row.totalTuition.display);

      return isRealFeeValue(total) ? `${row.quota} total ${total}` : "";
    })
    .filter(Boolean);

  return totalParts.length ? totalParts.join("; ") : null;
}

function getCentralFeeText(college: MBBSIndiaCollege) {
  if (isRealFeeValue(college.fees)) return normalizeFeeText(college.fees);

  return feeTextFromStructure(college) ?? TO_BE_UPDATED;
}

function formatNumber(value: number | null | undefined) {
  return typeof value === "number" ? value.toLocaleString("en-IN") : TO_BE_UPDATED;
}

function formatSeatMatrixRow(row: MBBSIndiaSeatMatrixRow) {
  const categoryText = mbbsIndiaSeatCategoryOrder
    .map((category) => {
      const seats = row.categorySeats[category];

      return typeof seats === "number"
        ? `${mbbsIndiaSeatCategoryLabels[category]} ${seats}`
        : "";
    })
    .filter(Boolean)
    .join(", ");

  return [
    `${row.year} ${row.quota}`,
    row.instituteType,
    `total seats ${formatNumber(row.totalSeats)}`,
    categoryText,
  ]
    .filter(Boolean)
    .join(": ");
}

function buildSeatMatrixText(rows: MBBSIndiaSeatMatrixRow[]) {
  if (!rows.length) return TO_BE_UPDATED;

  return rows.map(formatSeatMatrixRow).join(" | ");
}

const cutoffRounds = [
  ["Round 1", "round1Score", "round1Rank"],
  ["Round 2", "round2Score", "round2Rank"],
  ["Round 3", "round3Score", "round3Rank"],
  ["Stray round", "strayScore", "strayRank"],
] as const;

function buildCutoffText(cutoff: MBBSIndiaCollegeCutoff | null | undefined) {
  if (!cutoff?.categories.length) return TO_BE_UPDATED;

  return cutoff.categories
    .map((category) => {
      const roundText = cutoffRounds
        .map(([label, scoreKey, rankKey]) => {
          const score = category[scoreKey];
          const rank = category[rankKey];

          if (score === null && rank === null) return "";

          return `${label} closing score ${score ?? TO_BE_UPDATED}, closing rank ${formatNumber(rank)}, last rank ${formatNumber(rank)}`;
        })
        .filter(Boolean)
        .join("; ");

      return `${category.category}: ${roundText}`;
    })
    .filter(Boolean)
    .join(" | ");
}

function buildFacts(college: MBBSIndiaCollege): MBBSIndiaCollegeFacts {
  const counselling = getMBBSIndiaCollegeCounselling2025(college.collegeName);
  const feeText = getCentralFeeText(college);
  const seatText = `${college.seatCapacity.toLocaleString("en-IN")} MBBS seats`;
  const seatMatrixText = buildSeatMatrixText(counselling?.seatMatrix ?? []);
  const cutoffText = buildCutoffText(counselling?.cutoff);
  const hasFee = isRealFeeValue(feeText);
  const hasSeatMatrix = Boolean(counselling?.seatMatrix.length);
  const hasCutoff = Boolean(counselling?.cutoff?.categories.length);
  const searchableText = [
    college.collegeName,
    college.state,
    college.category,
    "MBBS India",
    "medical college",
    seatText,
    `seat capacity ${college.seatCapacity}`,
    `establishment year ${college.establishmentYear}`,
    hasFee ? `Fees: ${feeText}` : "Fees to be updated",
    hasSeatMatrix ? seatMatrixText : "seat matrix to be updated",
    hasCutoff ? cutoffText : "cutoff closing rank last rank to be updated",
    "counselling NEET state quota management quota seat matrix cutoff closing rank last rank",
  ].join(" ");

  return {
    college,
    counselling,
    href: getMBBSIndiaCollegeHref(college),
    feeText,
    seatText,
    seatMatrixText,
    cutoffText,
    searchableText,
    hasFee,
    hasSeatMatrix,
    hasCutoff,
  };
}

const factsByCollegeKey = new Map(
  mbbsIndiaColleges.map((college) => [normalizeCollegeKey(college.collegeName), buildFacts(college)])
);

export function getMBBSIndiaCollegeFacts(collegeName: string) {
  return factsByCollegeKey.get(normalizeCollegeKey(collegeName)) ?? null;
}

export function getAllMBBSIndiaCollegeFacts() {
  return Array.from(factsByCollegeKey.values());
}
