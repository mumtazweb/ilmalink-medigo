export const NEET_ANSWER_KEY_DOWNLOADS = {
  "question-paper-analysis": {
    resource: "question-paper-analysis",
    fileName: "re-neet-2026-questions-with-answers-ilmalink-mumtaz.pdf",
    title: "Re-NEET 2026 Questions with Supplied Answers",
    description:
      "The earlier 2.4 MB study booklet contains the supplied questions and answer markers, but does not identify a paper code.",
    sizeLabel: "2.4 MB",
  },
  "codes-50-60-70-80": {
    resource: "codes-50-60-70-80",
    fileName: "re-neet-2026-answer-key-codes-50-60-70-80.pdf",
    title: "All Re-NEET 2026 Code-wise Answer Keys",
    description:
      "Complete 13-page answer-key tables for Question Paper Codes 50, 60, 70 and 80, covering questions 1 to 180.",
    sizeLabel: "33 KB",
  },
} as const;

export type NeetAnswerKeyDownloadResource =
  keyof typeof NEET_ANSWER_KEY_DOWNLOADS;
