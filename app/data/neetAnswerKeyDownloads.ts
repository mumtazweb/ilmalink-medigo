export const NEET_ANSWER_KEY_DOWNLOADS = {
  "codes-50-60-70-80": {
    resource: "codes-50-60-70-80",
    fileName: "provisional-answer-key-re-neet-2026.pdf",
    title: "NTA Provisional Official Answer Key Codes 50, 60, 70 & 80",
    description:
      "Official NTA provisional answer-key table for Re-NEET UG 2026 Paper Codes 50, 60, 70 and 80, covering Questions 1 to 180.",
    sizeLabel: "13 KB",
  },

  "questions-answer-key-code-50": {
    resource: "questions-answer-key-code-50",
    fileName: "re NEET_2026_Clean_Questions_Answers_Analysis_Ilmalink_Mumtaz.pdf",
    title: "Questions with Answer Key - Code 50",
    description:
      "Re-NEET UG 2026 question-and-answer PDF with Code 50 answer references, explanations and analysis.",
    sizeLabel: "PDF",
  },
} as const;

export type NeetAnswerKeyDownloadResource =
  keyof typeof NEET_ANSWER_KEY_DOWNLOADS;