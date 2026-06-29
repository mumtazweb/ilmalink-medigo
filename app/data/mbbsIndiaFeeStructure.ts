import type { MBBSIndiaCollege } from "./mbbsIndiaColleges";

export type MBBSIndiaFeeQuota = "State quota" | "Management quota";
export type MBBSIndiaFeeStatus = "supplied" | "expected" | "not-available";

export type MBBSIndiaFeeAmount = {
  amount: number | null;
  maxAmount?: number | null;
  display: string;
};

export type MBBSIndiaFeeRow = {
  yearLabel: "2025" | "2026 expected";
  academicYear: "2025-26" | "2026-27 expected";
  quota: MBBSIndiaFeeQuota;
  semesters: number;
  perSemester: MBBSIndiaFeeAmount;
  totalTuition: MBBSIndiaFeeAmount;
  status: MBBSIndiaFeeStatus;
  source: string;
  note?: string;
};

export type MBBSIndiaFeeStructure = {
  state: "West Bengal";
  collegeName: string;
  aliases: string[];
  course: "MBBS";
  seatIntake: number | null;
  currency: "INR";
  source: string;
  rows: MBBSIndiaFeeRow[];
};

const SEMESTERS = 9;
const STATE_SOURCE = "Supplied West Bengal private MBBS state quota fee note";
const MANAGEMENT_SOURCE = "Private Medical Colleges WB Fee Structure 2025-26";
const EXPECTED_2026_SOURCE =
  "Supplied 2026 expected estimate based on 2025 fee structure";

const formatLakh = (amount: number) => {
  const lakh = amount / 100000;
  const formatted = Number.isInteger(lakh)
    ? lakh.toFixed(0)
    : lakh.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");

  return `Rs. ${formatted} lakh`;
};

const formatRange = (minAmount: number, maxAmount: number) =>
  `${formatLakh(minAmount)} to ${formatLakh(maxAmount)}`;

const roundINR = (amount: number) => Math.round(amount);

function makeAmount(amount: number | null, display?: string): MBBSIndiaFeeAmount {
  if (amount === null) {
    return {
      amount: null,
      display: display ?? "Not Available",
    };
  }

  return {
    amount,
    display: display ?? formatLakh(amount),
  };
}

function makeRangeAmount(
  amount: number | null,
  maxAmount: number | null,
): MBBSIndiaFeeAmount {
  if (amount === null || maxAmount === null) {
    return {
      amount: null,
      maxAmount: null,
      display: "Not Available",
    };
  }

  return {
    amount,
    maxAmount,
    display: formatRange(amount, maxAmount),
  };
}

function createRows({
  statePerSemester,
  managementTotal,
  managementDisplay,
}: {
  statePerSemester: number;
  managementTotal: number | null;
  managementDisplay?: string;
}): MBBSIndiaFeeRow[] {
  const stateTotal = statePerSemester * SEMESTERS;
  const state2026PerSemesterMax = roundINR(statePerSemester * 1.05);
  const state2026TotalMax = state2026PerSemesterMax * SEMESTERS;
  const managementPerSemester =
    managementTotal === null ? null : roundINR(managementTotal / SEMESTERS);
  const management2026TotalMax =
    managementTotal === null ? null : roundINR(managementTotal * 1.05);
  const management2026PerSemesterMax =
    management2026TotalMax === null
      ? null
      : roundINR(management2026TotalMax / SEMESTERS);

  return [
    {
      yearLabel: "2025",
      academicYear: "2025-26",
      quota: "State quota",
      semesters: SEMESTERS,
      perSemester: makeAmount(statePerSemester),
      totalTuition: makeAmount(stateTotal),
      status: "supplied",
      source: STATE_SOURCE,
    },
    {
      yearLabel: "2025",
      academicYear: "2025-26",
      quota: "Management quota",
      semesters: SEMESTERS,
      perSemester: makeAmount(managementPerSemester),
      totalTuition: makeAmount(managementTotal, managementDisplay),
      status: managementTotal === null ? "not-available" : "supplied",
      source: MANAGEMENT_SOURCE,
    },
    {
      yearLabel: "2026 expected",
      academicYear: "2026-27 expected",
      quota: "State quota",
      semesters: SEMESTERS,
      perSemester: makeRangeAmount(statePerSemester, state2026PerSemesterMax),
      totalTuition: makeRangeAmount(stateTotal, state2026TotalMax),
      status: "expected",
      source: EXPECTED_2026_SOURCE,
      note: "Expected planning range; verify the current WBMCC notice before payment.",
    },
    {
      yearLabel: "2026 expected",
      academicYear: "2026-27 expected",
      quota: "Management quota",
      semesters: SEMESTERS,
      perSemester: makeRangeAmount(
        managementPerSemester,
        management2026PerSemesterMax,
      ),
      totalTuition: makeRangeAmount(managementTotal, management2026TotalMax),
      status: managementTotal === null ? "not-available" : "expected",
      source: EXPECTED_2026_SOURCE,
      note:
        managementTotal === null
          ? "2026 management quota estimate is not available in the supplied management dataset."
          : "Expected planning range; verify the current WBMCC notice before payment.",
    },
  ];
}

function createFeeRecord({
  collegeName,
  aliases = [],
  seatIntake,
  statePerSemester,
  managementTotal,
  managementDisplay,
}: {
  collegeName: string;
  aliases?: string[];
  seatIntake: number | null;
  statePerSemester: number;
  managementTotal: number | null;
  managementDisplay?: string;
}): MBBSIndiaFeeStructure {
  return {
    state: "West Bengal",
    collegeName,
    aliases: [collegeName, ...aliases],
    course: "MBBS",
    seatIntake,
    currency: "INR",
    source: MANAGEMENT_SOURCE,
    rows: createRows({
      statePerSemester,
      managementTotal,
      managementDisplay,
    }),
  };
}

export const mbbsIndiaWestBengalPrivateFeeStructures: MBBSIndiaFeeStructure[] = [
  createFeeRecord({
    collegeName: "KPC Medical College and Hospital",
    aliases: ["KPC Medical College, Jadavpur, Kolkata"],
    seatIntake: 200,
    statePerSemester: 200000,
    managementTotal: 7200000,
    managementDisplay: "Rs. 72 Lakhs",
  }),
  createFeeRecord({
    collegeName: "ICARE Institute of Medical Sciences & Research",
    aliases: [
      "ICARE Institute of Medical Sciences & Research, Haldia, Purba Midanpore",
      "ICARE Institute of Medical Science and Research and Dr. BC Roy Hospital, Haldia",
    ],
    seatIntake: 150,
    statePerSemester: 250000,
    managementTotal: 8550000,
    managementDisplay: "Rs. 85.5 Lakhs",
  }),
  createFeeRecord({
    collegeName: "IQ City Medical College and Hospital",
    aliases: ["IQ-City Medical College, Burdwan", "IQ City Medical College"],
    seatIntake: 250,
    statePerSemester: 274000,
    managementTotal: 9850000,
    managementDisplay: "Rs. 98-99 Lakhs",
  }),
  createFeeRecord({
    collegeName: "Jagannath Gupta Institute of Medical Sciences and Hospital",
    aliases: [
      "Jagannath Gupta Institute of Medical Sciences & Hospital, Kolkata",
    ],
    seatIntake: 250,
    statePerSemester: 274000,
    managementTotal: 9936000,
    managementDisplay: "Rs. 99,36,000",
  }),
  createFeeRecord({
    collegeName: "JIS School of Medical Science & Research",
    aliases: ["JIS School of Medical Science & Research, Howrah"],
    seatIntake: 150,
    statePerSemester: 274000,
    managementTotal: 9900000,
    managementDisplay: "Rs. 99 Lakhs",
  }),
  createFeeRecord({
    collegeName: "JMN Medical College",
    aliases: ["JMN Medical College, Nadia"],
    seatIntake: 150,
    statePerSemester: 250000,
    managementTotal: 8500000,
    managementDisplay: "Rs. 85 Lakhs",
  }),
  createFeeRecord({
    collegeName: "Santiniketan Medical College",
    aliases: ["Santiniketan Medical College, Bolpur, West Bengal"],
    seatIntake: 150,
    statePerSemester: 250000,
    managementTotal: 8700000,
    managementDisplay: "Rs. 87 Lakhs",
  }),
  createFeeRecord({
    collegeName: "Krishnanagar Institute of Medical Sciences",
    aliases: [
      "Krishnanagar Institute of Medical Sciences Pvt. Ltd Krishnanagar, Nadia (WB)",
      "Krishnanagar Institute of Medical Science Private Limited",
    ],
    seatIntake: 150,
    statePerSemester: 375000,
    managementTotal: 9000000,
    managementDisplay: "Rs. 90 Lakhs",
  }),
  createFeeRecord({
    collegeName:
      "Shri Ramkrishna Institute of Medical Sciences & Sanaka Hospitals",
    aliases: [
      "Shri Ramkrishna Institute of Medical Sciences & Sanaka Hospitals, Durgapur",
      "Shri Ramkrishna Institute of Medical Sciences & Sanaka Hospital, Durgapur",
    ],
    seatIntake: 250,
    statePerSemester: 274000,
    managementTotal: 9900000,
    managementDisplay: "Rs. 99 Lakhs",
  }),
  createFeeRecord({
    collegeName: "Gouri Devi Institute of Medical Sciences and Hospital",
    aliases: [
      "Gouri Devi Institute of Medical Sciences and Hospital, Durgapur",
      "Gouridevi Medical College, Durgapur",
    ],
    seatIntake: 150,
    statePerSemester: 274000,
    managementTotal: 9900000,
    managementDisplay: "Rs. 99 Lakhs",
  }),
  createFeeRecord({
    collegeName: "Jakir Hossain Medical College, Jangipur, Murshidabad",
    aliases: [
      "Jakir Hossain Medical College and Research Institute",
      "Jakir Hossain Medical College, Jangipur, Murshidabad",
      "Jakir Hossain Medical College & Research Institute",
    ],
    seatIntake: 100,
    statePerSemester: 400000,
    managementTotal: 9000000,
    managementDisplay: "Rs. 90 Lakhs",
  }),
  createFeeRecord({
    collegeName: "PKG Medical College and Hospital",
    aliases: ["PKG Medical College & Hospital"],
    seatIntake: 50,
    statePerSemester: 400000,
    managementTotal: 9500000,
    managementDisplay: "Rs. 90 Lakhs - Rs. 1 Crore",
  }),
  createFeeRecord({
    collegeName: "Raniganj Institute of Medical Sciences",
    aliases: [
      "RANIGANJ INSTITUTE OF MEDICAL SCIENCE",
      "Raniganj Institute of Medical Science (RIMS)",
    ],
    seatIntake: 100,
    statePerSemester: 375000,
    managementTotal: null,
    managementDisplay: "Not Available",
  }),
  createFeeRecord({
    collegeName:
      "Jagannath Gupta Institute of Medical Sciences & Hospital, North Kolkata",
    aliases: ["Jagannath Gupta Institute of Medical Sciences and Hospital"],
    seatIntake: 100,
    statePerSemester: 375000,
    managementTotal: 9936000,
    managementDisplay: "Rs. 99,36,000",
  }),
  createFeeRecord({
    collegeName: "East West Institute of Medical Sciences and Research",
    aliases: [
      "East West Institute of Medical Sciences and Research, Burdwan",
    ],
    seatIntake: 100,
    statePerSemester: 400000,
    managementTotal: 9000000,
    managementDisplay: "Rs. 90 Lakhs",
  }),
];

const normalizeFeeLookupKey = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const feeStructureByCollegeKey = new Map<string, MBBSIndiaFeeStructure>();

for (const record of mbbsIndiaWestBengalPrivateFeeStructures) {
  for (const alias of record.aliases) {
    feeStructureByCollegeKey.set(normalizeFeeLookupKey(alias), record);
  }
}

export function getMBBSIndiaFeeStructure(
  college: Pick<MBBSIndiaCollege, "collegeName" | "state"> | string,
) {
  const collegeName = typeof college === "string" ? college : college.collegeName;

  return feeStructureByCollegeKey.get(normalizeFeeLookupKey(collegeName)) ?? null;
}

export function getMBBSIndiaFeeStructuresForState(state: string) {
  return state === "West Bengal" ? mbbsIndiaWestBengalPrivateFeeStructures : [];
}

export function getMBBSIndiaFeeSummary(
  college: Pick<MBBSIndiaCollege, "collegeName" | "state"> | string,
) {
  const feeStructure = getMBBSIndiaFeeStructure(college);

  if (!feeStructure) return null;

  const state2025 = feeStructure.rows.find(
    (row) => row.yearLabel === "2025" && row.quota === "State quota",
  );
  const management2025 = feeStructure.rows.find(
    (row) => row.yearLabel === "2025" && row.quota === "Management quota",
  );

  return {
    state2025,
    management2025,
    label:
      state2025
        ? [
            `State quota total ${state2025.totalTuition.display}`,
            management2025?.totalTuition.display &&
            management2025.totalTuition.display !== "Not Available"
              ? `Management quota total ${management2025.totalTuition.display}`
              : "Management quota total To be updated",
          ].join("; ")
        : null,
  };
}
