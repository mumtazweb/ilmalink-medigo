export type NeetRankPrediction = {
  marks: number;
  estimatedRank: number;
  minRank: number;
  maxRank: number;
  rankZoneLabel: string;
};

const rankAnchors = [
  { score: 720, rank: 1 },
  { score: 710, rank: 100 },
  { score: 700, rank: 2250 },
  { score: 650, rank: 26000 },
  { score: 600, rank: 40000 },
  { score: 550, rank: 144000 },
  { score: 500, rank: 209000 },
  { score: 450, rank: 290000 },
  { score: 400, rank: 390000 },
  { score: 350, rank: 540000 },
  { score: 300, rank: 690000 },
  { score: 250, rank: 850000 },
  { score: 200, rank: 1050000 },
  { score: 144, rank: 1200000 },
  { score: 100, rank: 1620000 },
  { score: 50, rank: 2060000 },
  { score: 0, rank: 2200000 },
];

const rankFormatter = new Intl.NumberFormat("en-IN");

export function estimateRank(score: number) {
  if (score < 0) return null;
  if (score >= rankAnchors[0].score) return rankAnchors[0].rank;

  const lastAnchor = rankAnchors[rankAnchors.length - 1];
  if (score <= lastAnchor.score) return lastAnchor.rank;

  for (let index = 0; index < rankAnchors.length - 1; index += 1) {
    const upperAnchor = rankAnchors[index];
    const lowerAnchor = rankAnchors[index + 1];

    if (score <= upperAnchor.score && score >= lowerAnchor.score) {
      const scoreProgress =
        (upperAnchor.score - score) / (upperAnchor.score - lowerAnchor.score);

      const rankEstimate =
        upperAnchor.rank + scoreProgress * (lowerAnchor.rank - upperAnchor.rank);

      return Math.round(rankEstimate);
    }
  }

  return lastAnchor.rank;
}

export function getRankZoneRange(rank: number, score: number) {
  let percentage = 0.18;
  let minimumSpread = 30000;

  if (score >= 700) {
    percentage = 0.08;
    minimumSpread = 35;
  } else if (score >= 650) {
    percentage = 0.1;
    minimumSpread = 500;
  } else if (score >= 550) {
    percentage = 0.12;
    minimumSpread = 2500;
  } else if (score >= 400) {
    percentage = 0.15;
    minimumSpread = 10000;
  }

  const spread = Math.max(Math.round(rank * percentage), minimumSpread);
  const bestRank = Math.max(1, rank - spread);
  const broadRank = rank + spread;

  return {
    minRank: bestRank,
    maxRank: broadRank,
    label: `${rankFormatter.format(bestRank)} - ${rankFormatter.format(broadRank)}`,
  };
}

export function predictNeetRankRangeFromMarks(
  marks: number
): NeetRankPrediction | null {
  if (!Number.isFinite(marks) || marks < 0 || marks > 720) {
    return null;
  }

  const estimatedRank = estimateRank(marks);

  if (estimatedRank === null) {
    return null;
  }

  const zone = getRankZoneRange(estimatedRank, marks);

  return {
    marks,
    estimatedRank,
    minRank: zone.minRank,
    maxRank: zone.maxRank,
    rankZoneLabel: zone.label,
  };
}