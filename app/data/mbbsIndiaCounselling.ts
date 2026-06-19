import counselling2025Json from "./mbbsIndiaCounselling2025.json";

export type MBBSIndiaSeatCategory =
  | "ur"
  | "urPwd"
  | "ews"
  | "ewsPwd"
  | "sc"
  | "scPwd"
  | "st"
  | "stPwd"
  | "obcA"
  | "obcAPwd"
  | "obcB"
  | "obcBPwd";

export type MBBSIndiaSeatMatrixRow = {
  state: string;
  collegeName: string;
  year: number;
  instituteType: string;
  quota: string;
  categorySeats: Partial<Record<MBBSIndiaSeatCategory, number | null>>;
  allocatedCategorySeats: number;
  totalSeats: number | null;
  hasSourceMismatch: boolean;
};

export type MBBSIndiaCutoffCategory = {
  category: string;
  round1Score: number | null;
  round1Rank: number | null;
  round2Score: number | null;
  round2Rank: number | null;
  round3Score: number | null;
  round3Rank: number | null;
  strayScore: number | null;
  strayRank: number | null;
};

export type MBBSIndiaCollegeCutoff = {
  state: string;
  collegeName: string;
  year: number;
  categories: MBBSIndiaCutoffCategory[];
};

type MBBSIndiaCounsellingDataset = {
  year: number;
  referenceType: string;
  general: {
    allIndiaCollegeSnapshotCount: number;
    courseDurationYears: number;
    academicStudyYears: number;
    internshipYears: number;
    neet: {
      durationHours: number;
      totalQuestions: number;
      totalMarks: number;
      subjects: Array<{
        subject: string;
        questions: number;
        marks: number;
      }>;
    };
  };
  stateCounselling: Record<
    string,
    {
      governmentStateQuotaPercent: number;
      privateStateQuotaPercent: number;
      managementQuotaOpenToAllIndiaNeetCandidates: boolean;
    }
  >;
  seatMatrix: MBBSIndiaSeatMatrixRow[];
  cutoffs: MBBSIndiaCollegeCutoff[];
};

export const mbbsIndiaCounselling2025 =
  counselling2025Json as MBBSIndiaCounsellingDataset;

const normalizeCollegeKey = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const seatMatrixByCollege = new Map<string, MBBSIndiaSeatMatrixRow[]>();

for (const row of mbbsIndiaCounselling2025.seatMatrix) {
  const key = normalizeCollegeKey(row.collegeName);
  const existing = seatMatrixByCollege.get(key) ?? [];
  existing.push(row);
  seatMatrixByCollege.set(key, existing);
}

const cutoffByCollege = new Map(
  mbbsIndiaCounselling2025.cutoffs.map((record) => [
    normalizeCollegeKey(record.collegeName),
    record,
  ])
);

export function getMBBSIndiaStateCounselling2025(state: string) {
  const stateFacts = mbbsIndiaCounselling2025.stateCounselling[state];
  const seatMatrix = mbbsIndiaCounselling2025.seatMatrix.filter(
    (row) => row.state === state
  );
  const cutoffs = mbbsIndiaCounselling2025.cutoffs.filter(
    (record) => record.state === state
  );

  if (!stateFacts && seatMatrix.length === 0 && cutoffs.length === 0) {
    return null;
  }

  return {
    year: mbbsIndiaCounselling2025.year,
    stateFacts,
    seatMatrix,
    cutoffs,
  };
}

export function getMBBSIndiaCollegeCounselling2025(collegeName: string) {
  const key = normalizeCollegeKey(collegeName);
  const seatMatrix = seatMatrixByCollege.get(key) ?? [];
  const cutoff = cutoffByCollege.get(key) ?? null;

  if (seatMatrix.length === 0 && !cutoff) {
    return null;
  }

  return {
    year: mbbsIndiaCounselling2025.year,
    seatMatrix,
    cutoff,
  };
}

export const mbbsIndiaSeatCategoryLabels: Record<
  MBBSIndiaSeatCategory,
  string
> = {
  ur: "UR",
  urPwd: "UR PwD",
  ews: "EWS",
  ewsPwd: "EWS PwD",
  sc: "SC",
  scPwd: "SC PwD",
  st: "ST",
  stPwd: "ST PwD",
  obcA: "OBC-A",
  obcAPwd: "OBC-A PwD",
  obcB: "OBC-B",
  obcBPwd: "OBC-B PwD",
};

export const mbbsIndiaSeatCategoryOrder = Object.keys(
  mbbsIndiaSeatCategoryLabels
) as MBBSIndiaSeatCategory[];
