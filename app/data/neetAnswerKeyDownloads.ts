export const NEET_ANSWER_KEY_DOWNLOADS = {
  "codes-50-60-70-80": {
    resource: "codes-50-60-70-80",
    fileName: "provisional-answer-key-re-neet-2026.pdf",
    title: "NTA Provisional Official Answer Key Codes 50, 60, 70 & 80",
    description:
      "Official NTA provisional answer-key table for Re-NEET UG 2026 Paper Codes 50, 60, 70 and 80, covering Questions 1 to 180.",
    sizeLabel: "13 KB",
  },
} as const;

export type NeetAnswerKeyDownloadResource =
  keyof typeof NEET_ANSWER_KEY_DOWNLOADS;