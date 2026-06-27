import source from "./reNeet2026CodeAnswerKeys.json";

export const RE_NEET_2026_PAPER_CODES = ["50", "60", "70", "80"] as const;

export type ReNeet2026PaperCode =
  (typeof RE_NEET_2026_PAPER_CODES)[number];

export type ReNeet2026CodeAnswerRow = {
  questionNumber: number;
  answers: Record<ReNeet2026PaperCode, string>;
};

function normalizeAnswer(answer: string) {
  return answer === "B" ? "Drop" : answer;
}

export const reNeet2026CodeAnswerRows: ReNeet2026CodeAnswerRow[] =
  Array.from({ length: source.questionCountPerCode }, (_, index) => ({
    questionNumber: index + 1,
    answers: {
      "50": normalizeAnswer(source.codes["50"][index]),
      "60": normalizeAnswer(source.codes["60"][index]),
      "70": normalizeAnswer(source.codes["70"][index]),
      "80": normalizeAnswer(source.codes["80"][index]),
    },
  }));

export const reNeet2026CodeAnswerSource = {
  title: source.sourceTitle,
  pageCount: source.sourcePageCount,
  questionCountPerCode: source.questionCountPerCode,
};

export function isSpecialCodeAnswer(answer: string) {
  return answer === "Drop" || answer.includes(",");
}