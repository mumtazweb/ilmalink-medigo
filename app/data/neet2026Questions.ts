import questionData from "./neet2026Questions.json";

export type NeetQuestionSubject = "Physics" | "Chemistry" | "Biology";
export type NeetQuestionDifficulty =
  | "Easy"
  | "Moderate"
  | "Tough"
  | "Review Pending";

export type NeetQuestionOption = {
  label: string;
  text: string;
};

export type NeetQuestion = {
  id: string;
  slug: string;
  year: number;
  questionNumber: number;
  subject: NeetQuestionSubject;
  chapter: string;
  topic: string;
  difficulty: NeetQuestionDifficulty;
  questionType: "Multiple Choice";
  question: string;
  options: NeetQuestionOption[];
  correctAnswer: string;
  correctOption: string | null;
  explanation: string;
  keywords: string[];
  sourcePage: number;
  sourceImage: string;
  sourceImages: string[];
  sourceText: string;
  isBonus: boolean;
  reviewStatus: string;
};

export const neet2026Questions = questionData as NeetQuestion[];

export const neetQuestionSubjects: Array<"All" | NeetQuestionSubject> = [
  "All",
  "Biology",
  "Physics",
  "Chemistry",
];

export const neetQuestionDifficulties: Array<
  "All" | NeetQuestionDifficulty
> = ["All", "Easy", "Moderate", "Tough", "Review Pending"];

export function getNeetQuestionBySlug(slug: string) {
  return neet2026Questions.find((question) => question.slug === slug);
}

export function getRelatedNeetQuestions(
  question: NeetQuestion,
  limit = 4
) {
  return neet2026Questions
    .filter(
      (candidate) =>
        candidate.slug !== question.slug &&
        candidate.subject === question.subject
    )
    .sort(
      (first, second) =>
        Math.abs(first.questionNumber - question.questionNumber) -
        Math.abs(second.questionNumber - question.questionNumber)
    )
    .slice(0, limit);
}

export function normalizeNeetSearchText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();
}

export function getNeetQuestionSearchText(question: NeetQuestion) {
  return normalizeNeetSearchText(
    [
      question.id,
      question.slug,
      question.year,
      question.questionNumber,
      question.subject,
      question.chapter,
      question.topic,
      question.difficulty,
      question.questionType,
      question.question,
      ...question.options.map((option) => option.text),
      question.correctAnswer,
      question.explanation,
      question.sourceText,
      ...question.keywords,
    ].join(" ")
  );
}
