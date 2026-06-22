export type NeetQualificationStatus =
  | "not-qualified"
  | "borderline"
  | "likely-qualified";

export type NeetRankPrediction = {
  marks: number;
  estimatedRank: number;
  minRank: number;
  maxRank: number;
  rankZoneLabel: string;
  isQualified: boolean;
  qualificationStatus: NeetQualificationStatus;
  qualificationLabel: string;
  qualificationNote: string;
  admissionChanceSummary: string;
  suggestedNextStep: string;
  rankDisclaimer: string;
};

export type NeetRankRangeBand = {
  minScore: number;
  maxScore: number;
  minRank: number;
  maxRank: number;
  label?: string;
};

const rankFormatter = new Intl.NumberFormat("en-IN");

const rankDisclaimer =
  "Hard-paper adjusted estimate only. Final NEET rank, qualifying cut-off and counselling chance depend on official NTA result, category, number of candidates, tie-breaking rules, domicile, counselling round and seat matrix.";

export const neetHardPaperRankGrid: NeetRankRangeBand[] = [
  { minScore: 720, maxScore: 720, minRank: 1, maxRank: 1 },
  { minScore: 700, maxScore: 719, minRank: 1, maxRank: 5 },
  { minScore: 680, maxScore: 699, minRank: 1, maxRank: 10 },
  { minScore: 660, maxScore: 679, minRank: 10, maxRank: 300 },
  { minScore: 640, maxScore: 659, minRank: 300, maxRank: 1000 },
  { minScore: 620, maxScore: 639, minRank: 1000, maxRank: 1500 },
  { minScore: 600, maxScore: 619, minRank: 1500, maxRank: 2000 },
  { minScore: 580, maxScore: 599, minRank: 2000, maxRank: 5000 },
  { minScore: 560, maxScore: 579, minRank: 5000, maxRank: 10000 },
  { minScore: 540, maxScore: 559, minRank: 10000, maxRank: 15000 },
  { minScore: 520, maxScore: 539, minRank: 15000, maxRank: 20000 },
  { minScore: 500, maxScore: 519, minRank: 20000, maxRank: 25000 },
  { minScore: 480, maxScore: 499, minRank: 25000, maxRank: 30000 },
  { minScore: 460, maxScore: 479, minRank: 30000, maxRank: 35000 },
  { minScore: 440, maxScore: 459, minRank: 35000, maxRank: 40000 },
  { minScore: 420, maxScore: 439, minRank: 40000, maxRank: 45000 },
  { minScore: 400, maxScore: 419, minRank: 45000, maxRank: 50000 },
  { minScore: 380, maxScore: 399, minRank: 50000, maxRank: 70000 },
  { minScore: 360, maxScore: 379, minRank: 70000, maxRank: 100000 },
  { minScore: 340, maxScore: 359, minRank: 100000, maxRank: 200000 },
  { minScore: 320, maxScore: 339, minRank: 200000, maxRank: 300000 },
  { minScore: 300, maxScore: 319, minRank: 300000, maxRank: 400000 },
  { minScore: 280, maxScore: 299, minRank: 400000, maxRank: 600000 },
  { minScore: 260, maxScore: 279, minRank: 600000, maxRank: 700000 },
  { minScore: 240, maxScore: 259, minRank: 700000, maxRank: 800000 },
  { minScore: 220, maxScore: 239, minRank: 800000, maxRank: 900000 },
  { minScore: 200, maxScore: 219, minRank: 900000, maxRank: 1000000 },
  { minScore: 180, maxScore: 199, minRank: 1000000, maxRank: 1100000 },
  { minScore: 140, maxScore: 179, minRank: 1000000, maxRank: 1100000 },
  { minScore: 110, maxScore: 139, minRank: 1100000, maxRank: 1500000 },
  {
    minScore: -10,
    maxScore: 109,
    minRank: 1200001,
    maxRank: 2200000,
    label: "Above 12,00,000",
  },
];

function getRankLabel(minRank: number, maxRank: number, label?: string) {
  if (label) {
    return label;
  }

  if (minRank === maxRank) {
    return rankFormatter.format(minRank);
  }

  return `${rankFormatter.format(minRank)} - ${rankFormatter.format(maxRank)}`;
}

function getEstimatedRank(minRank: number, maxRank: number) {
  return Math.round((minRank + maxRank) / 2);
}

function getRankRangeFromScore(score: number) {
  const scoreForRange = Math.floor(score);

  return neetHardPaperRankGrid.find(
    (range) => scoreForRange >= range.minScore && scoreForRange <= range.maxScore
  );
}

function getQualificationStatus(marks: number) {
  if (marks < 110) {
    return {
      isQualified: false,
      qualificationStatus: "not-qualified" as const,
      qualificationLabel: "Not qualified",
      qualificationNote:
        "Below the expected qualifying range. Repeat NEET, paramedical, B.Sc Nursing or allied health options should be considered.",
    };
  }

  if (marks < 140) {
    return {
      isQualified: false,
      qualificationStatus: "borderline" as const,
      qualificationLabel: "Borderline qualifying range",
      qualificationNote:
        "Minimum qualifying marks may range around 110-140 depending on category and official NTA cut-off. Do not assume qualification until the official result is declared.",
    };
  }

  return {
    isQualified: true,
    qualificationStatus: "likely-qualified" as const,
    qualificationLabel: "Above expected qualifying range",
    qualificationNote:
      "Likely above the expected qualifying range, but final qualification still depends on official NTA cut-off and category.",
  };
}

function getAdmissionChancePlan(estimatedRank: number) {
  if (estimatedRank <= 20000) {
    return {
      admissionChanceSummary:
        "Premium government medical colleges, including AIIMS-level options, may be possible depending on category, quota, domicile and counselling round.",
      suggestedNextStep:
        "Participate carefully in MCC All India counselling and your State counselling. Prepare a strong choice-filling list for AIIMS, central universities, top government medical colleges and state government MBBS seats.",
    };
  }

  if (estimatedRank <= 40000) {
    return {
      admissionChanceSummary:
        "Government MBBS is nearly confirmed in many counselling routes, depending on category, domicile, state quota and seat matrix.",
      suggestedNextStep:
        "Participate in MCC counselling and your State counselling. Focus on government MBBS choice filling and keep state quota options active.",
    };
  }

  if (estimatedRank <= 50000) {
    return {
      admissionChanceSummary:
        "Government MBBS may be possible. This is also the zone where 400+ marks students can check semi-government or state-quota MBBS in applicable states. Government BDS and AYUSH are also strong possibilities.",
      suggestedNextStep:
        "Apply in MCC and State counselling carefully. Take expert guidance for choice filling because the difference between MBBS, BDS, AYUSH and eligible semi-government options may depend on round, quota, state rules and budget.",
    };
  }

  if (estimatedRank <= 70000) {
    return {
      admissionChanceSummary:
        "Government MBBS chance is lower. Government BDS and AYUSH chances are high. India private management and MBBS Abroad backups should be compared by budget.",
      suggestedNextStep:
        "Participate in State counselling seriously. Keep BDS, AYUSH, private management and MBBS Abroad backup options ready, and evaluate budget early.",
    };
  }

  if (estimatedRank <= 100000) {
    return {
      admissionChanceSummary:
        "Government MBBS or BDS chance is very low. AYUSH may have a higher chance. Private management MBBS and MBBS Abroad should be evaluated by budget and eligibility.",
      suggestedNextStep:
        "Apply for State counselling and AYUSH counselling. Keep MBBS Abroad as a backup if NEET qualification is confirmed and the student wants an MBBS degree with budget-friendly medical education.",
    };
  }

  if (estimatedRank <= 200000) {
    return {
      admissionChanceSummary:
        "Government MBBS is not expected. Government BDS is unlikely. AYUSH may be possible. Abroad and private management quota options should be evaluated.",
      suggestedNextStep:
        "Consider AYUSH, MBBS Abroad and private management quota options. In the 300-400 marks planning zone, lower-fee private management possibilities may exist in Bihar and Jharkhand around 45 lakh course fee, depending on current counselling rules, college and seat availability.",
    };
  }

  if (estimatedRank <= 300000) {
    return {
      admissionChanceSummary:
        "Government MBBS/BDS seats are not expected. AYUSH may still be possible in some cases. Private management quota MBBS in India may require a high budget.",
      suggestedNextStep:
        "If the budget is 70 lakh or above plus hostel and other costs, evaluate Indian private management quota MBBS. For a more budget-friendly MBBS route, evaluate MBBS Abroad only if NEET qualification is confirmed for Indian-practice planning. Also consider AYUSH, B.Sc Nursing, paramedical and allied health sciences.",
    };
  }

  return {
    admissionChanceSummary:
      "MBBS/BDS in India is mainly possible through private management quota if budget allows. Budget-friendly MBBS Abroad, AYUSH or allied health options may be more practical.",
    suggestedNextStep:
      "Compare Indian private management quota budget, MBBS Abroad, AYUSH, B.Sc Nursing, paramedical and allied health options. Take counselling before final decision.",
  };
}

function getAdjustedAdmissionPlan(marks: number, estimatedRank: number) {
  const plan = getAdmissionChancePlan(estimatedRank);

  if (marks < 110) {
    return {
      ...plan,
      suggestedNextStep:
        "Repeat NEET, paramedical, B.Sc Nursing, allied health sciences or career counselling should be considered. MBBS Abroad is not recommended for Indian-practice planning unless NEET qualification is confirmed.",
    };
  }

  if (marks < 140) {
    return {
      ...plan,
      suggestedNextStep: `${plan.suggestedNextStep} MBBS Abroad and counselling choices should be considered only after official NEET qualification is confirmed.`,
    };
  }

  return plan;
}

export function estimateRank(score: number) {
  if (!Number.isFinite(score) || score < -10 || score > 720) {
    return null;
  }

  const range = getRankRangeFromScore(score);

  if (!range) {
    return null;
  }

  return getEstimatedRank(range.minRank, range.maxRank);
}

export function getRankZoneRange(rank: number, score: number) {
  const range = getRankRangeFromScore(score);

  if (!range) {
    return {
      minRank: rank,
      maxRank: rank,
      label: rankFormatter.format(rank),
    };
  }

  return {
    minRank: range.minRank,
    maxRank: range.maxRank,
    label: getRankLabel(range.minRank, range.maxRank, range.label),
  };
}

export function predictNeetRankRangeFromMarks(
  marks: number
): NeetRankPrediction | null {
  if (!Number.isFinite(marks) || marks < -10 || marks > 720) {
    return null;
  }

  const range = getRankRangeFromScore(marks);

  if (!range) {
    return null;
  }

  const estimatedRank = getEstimatedRank(range.minRank, range.maxRank);
  const qualification = getQualificationStatus(marks);
  const admissionPlan = getAdjustedAdmissionPlan(marks, estimatedRank);

  return {
    marks,
    estimatedRank,
    minRank: range.minRank,
    maxRank: range.maxRank,
    rankZoneLabel: getRankLabel(range.minRank, range.maxRank, range.label),
    isQualified: qualification.isQualified,
    qualificationStatus: qualification.qualificationStatus,
    qualificationLabel: qualification.qualificationLabel,
    qualificationNote: qualification.qualificationNote,
    admissionChanceSummary: admissionPlan.admissionChanceSummary,
    suggestedNextStep: admissionPlan.suggestedNextStep,
    rankDisclaimer,
  };
}
