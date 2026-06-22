import {
  neetHardPaperRankGrid,
  predictNeetRankRangeFromMarks,
  type NeetQualificationStatus,
  type NeetRankPrediction,
  type NeetRankRangeBand,
} from "../../lib/neetRankPredictor";

export type NeetPathwayResult = {
  minScore: number;
  maxScore: number | null;
  bandLabel: string;
  rankZoneLabel: string;
  estimatedRank: number;
  qualificationStatus: NeetQualificationStatus;
  qualificationLabel: string;
  qualificationNote: string;
  admissionChanceSummary: string;
  suggestedNextStep: string;
  rankDisclaimer: string;
  headline: string;
  indiaRoute: string;
  abroadBackup: string;
  budgetAdvice: string;
  nextStep: string;
  warning: string;
};

export const getNeetPathwayEmptyState =
  "Enter your NEET score to see the hard-paper adjusted rank range, admission chance, MBBS India, MBBS Abroad, BDS, AYUSH, paramedical and repeat-NEET pathway guidance.";

export const getNeetPathwayInvalidState =
  "Enter a valid NEET score between -10 and 720 to view your pathway.";

const rankFormatter = new Intl.NumberFormat("en-IN");

function getScoreBandLabel(range: NeetRankRangeBand) {
  if (range.minScore < 110) {
    return "Below 110";
  }

  if (range.minScore === range.maxScore) {
    return String(range.minScore);
  }

  return `${range.minScore}-${range.maxScore}`;
}

function getRepresentativeScore(range: NeetRankRangeBand) {
  if (range.minScore < 110) {
    return 0;
  }

  return range.maxScore;
}

function getHeadline(prediction: NeetRankPrediction) {
  if (prediction.qualificationStatus === "not-qualified") {
    return "Below expected qualifying range; focus on repeat NEET or non-MBBS health routes.";
  }

  if (prediction.qualificationStatus === "borderline") {
    return `Borderline qualification watch with ${prediction.rankZoneLabel} hard-paper rank zone.`;
  }

  return `${prediction.rankZoneLabel} hard-paper rank zone for counselling planning.`;
}

function getAbroadBackup(prediction: NeetRankPrediction) {
  if (prediction.qualificationStatus === "not-qualified") {
    return "MBBS Abroad is not recommended for Indian-practice planning unless official NEET qualification is confirmed. Repeat NEET, paramedical, B.Sc Nursing and allied health routes should be checked first.";
  }

  if (prediction.qualificationStatus === "borderline") {
    return "MBBS Abroad and counselling choices should be considered only after official NEET qualification is confirmed. Keep repeat NEET and allied-health backups open until the result is clear.";
  }

  if (prediction.estimatedRank <= 40000) {
    return "MBBS Abroad is not suggested as a backup in this rank zone. Focus on MCC, state counselling and government MBBS/BDS/AYUSH choice filling first.";
  }

  if (prediction.estimatedRank <= 300000) {
    return "MBBS Abroad can be evaluated as a budget-sensitive backup after 40,000+ AIR if NEET qualification is confirmed. A verified abroad plan should be targeted within about 20 lakh, with NMC/FMGL fit and recognition checked.";
  }

  return "MBBS Abroad may be more practical than high-budget Indian private management quota when NEET qualification, NMC/FMGL fit, university recognition and a total plan within about 20 lakh are verified.";
}

function getBudgetAdvice(prediction: NeetRankPrediction) {
  if (prediction.qualificationStatus === "not-qualified") {
    return "Avoid MBBS/BDS/AYUSH payment commitments based on unsafe promises. Spend only on repeat preparation, career counselling or eligible non-NEET health-science routes.";
  }

  if (prediction.estimatedRank <= 40000) {
    return "If a government seat is suggested, plan for near-nil or very low tuition compared with private colleges. Still verify hostel, bond, state charges and documents before choice filling.";
  }

  if (prediction.marks > 400 && prediction.estimatedRank <= 50000) {
    return "Government MBBS/BDS remains the first budget target. In some states, semi-government or state-quota MBBS can be checked around 20-25 lakh, and MBBS Abroad is only a backup after 40,000+ AIR with a target plan within about 20 lakh.";
  }

  if (prediction.marks >= 300 && prediction.marks <= 400) {
    return "For 300-400 marks, explore Bihar and Jharkhand first for lower private MBBS management budgets around 45 lakh course fee where available. Other Indian states often cross 70 lakh course fee plus hostel and other costs; MBBS Abroad can be planned within about 20 lakh after eligibility checks.";
  }

  return "Indian private management MBBS is mainly budget-driven here and many states can cross 70 lakh course fee plus hostel and other costs. Compare MBBS Abroad within about 20 lakh, AYUSH, B.Sc Nursing, paramedical and repeat NEET before paying.";
}

function buildNeetPathwayResult(
  range: NeetRankRangeBand,
  prediction: NeetRankPrediction
): NeetPathwayResult {
  return {
    minScore: range.minScore,
    maxScore: range.maxScore,
    bandLabel: getScoreBandLabel(range),
    rankZoneLabel: prediction.rankZoneLabel,
    estimatedRank: prediction.estimatedRank,
    qualificationStatus: prediction.qualificationStatus,
    qualificationLabel: prediction.qualificationLabel,
    qualificationNote: prediction.qualificationNote,
    admissionChanceSummary: prediction.admissionChanceSummary,
    suggestedNextStep: prediction.suggestedNextStep,
    rankDisclaimer: prediction.rankDisclaimer,
    headline: getHeadline(prediction),
    indiaRoute: prediction.admissionChanceSummary,
    abroadBackup: getAbroadBackup(prediction),
    budgetAdvice: getBudgetAdvice(prediction),
    nextStep: prediction.suggestedNextStep,
    warning: prediction.rankDisclaimer,
  };
}

function getRankGridRange(score: number) {
  const scoreForRange = Math.floor(score);

  return neetHardPaperRankGrid.find(
    (range) => scoreForRange >= range.minScore && scoreForRange <= range.maxScore
  );
}

export const neetPathwayBands: NeetPathwayResult[] = neetHardPaperRankGrid
  .map((range) => {
    const prediction = predictNeetRankRangeFromMarks(
      getRepresentativeScore(range)
    );

    return prediction ? buildNeetPathwayResult(range, prediction) : null;
  })
  .filter((band): band is NeetPathwayResult => Boolean(band));

export function formatNeetEstimatedRank(rank: number) {
  return rankFormatter.format(rank);
}

export function getNeetPathway(score: number): NeetPathwayResult | null {
  if (!Number.isFinite(score) || score < -10 || score > 720) {
    return null;
  }

  const range = getRankGridRange(score);
  const prediction = predictNeetRankRangeFromMarks(score);

  if (!range || !prediction) {
    return null;
  }

  return buildNeetPathwayResult(range, prediction);
}
