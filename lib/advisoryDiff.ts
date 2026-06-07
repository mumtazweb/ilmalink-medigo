import type {
  AdvisoryFoundLink,
  FetchAdvisoryResult,
} from "./advisoryFetcher";

export type AdvisorySignal =
  | "No Change"
  | "Page Text Changed"
  | "New Notice Found"
  | "New PDF Link Found"
  | "PDF Link Removed"
  | "Keyword Match"
  | "Fetch Error";

export type ComparableAdvisoryVersion = {
  id: string;
  title: string;
  extractedText: string;
  extractedData:
    | {
        hash?: string;
        foundLinks?: AdvisoryFoundLink[];
        pdfLinks?: AdvisoryFoundLink[];
        keywordMatches?: string[];
      }
    | null;
};

export type AdvisoryChangeComparison = {
  addedItems: unknown[];
  removedItems: unknown[];
  changedItems: unknown[];
  changeSummary: string;
  signals: AdvisorySignal[];
  roundLabel: string | null;
};

const noticePattern =
  /\b(notice|bulletin|schedule|seat matrix|allotment|round|mop-up|stray vacancy|circular|advisory|reporting|document verification)\b/i;

function getMeaningfulLines(text: string) {
  const seen = new Set<string>();

  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => {
      if (line.length < 8) {
        return false;
      }

      const key = line.toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
}

function hrefSet(links: AdvisoryFoundLink[] | undefined) {
  return new Set((links ?? []).map((link) => link.href));
}

function getAddedLinks(
  currentLinks: AdvisoryFoundLink[],
  previousLinks: AdvisoryFoundLink[] | undefined
) {
  const previous = hrefSet(previousLinks);

  return currentLinks.filter((link) => !previous.has(link.href));
}

function getRemovedLinks(
  currentLinks: AdvisoryFoundLink[],
  previousLinks: AdvisoryFoundLink[] | undefined
) {
  const current = hrefSet(currentLinks);

  return (previousLinks ?? []).filter(
    (link) => !current.has(link.href)
  );
}

export function detectRoundLabel(value: string) {
  const text = value.toLowerCase();

  if (/\bspecial\s+stray\b/.test(text)) {
    return "Special Stray Round";
  }

  if (/\bstray\s+vacancy\b/.test(text)) {
    return "Stray Vacancy Round";
  }

  if (/\bmop[-\s]?up\b/.test(text)) {
    return "Mop-Up Round";
  }

  if (/\bround\s*4\b|\b4th\s+round\b/.test(text)) {
    return "Round 4";
  }

  if (/\bround\s*3\b|\b3rd\s+round\b/.test(text)) {
    return "Round 3";
  }

  if (/\bround\s*2\b|\b2nd\s+round\b/.test(text)) {
    return "Round 2";
  }

  if (/\bround\s*1\b|\b1st\s+round\b/.test(text)) {
    return "Round 1";
  }

  if (/\ballotment\b/.test(text)) {
    return "Allotment";
  }

  if (/\bseat\s+matrix\b/.test(text)) {
    return "Seat Matrix";
  }

  return null;
}

export function detectAdvisorySignals(
  fetchResult: FetchAdvisoryResult,
  previousHash?: string | null,
  previousPdfLinks: AdvisoryFoundLink[] = []
): AdvisorySignal[] {
  if (!fetchResult.ok || fetchResult.error) {
    return ["Fetch Error"];
  }

  const signals = new Set<AdvisorySignal>();

  if (previousHash && previousHash === fetchResult.hash) {
    signals.add("No Change");
  }

  if (!previousHash || previousHash !== fetchResult.hash) {
    signals.add("Page Text Changed");
  }

  if (
    fetchResult.keywordMatches.length > 0 ||
    noticePattern.test(fetchResult.title) ||
    noticePattern.test(fetchResult.normalizedText)
  ) {
    signals.add("Keyword Match");
  }

  const addedPdfLinks = getAddedLinks(
    fetchResult.pdfLinks,
    previousPdfLinks
  );
  const removedPdfLinks = getRemovedLinks(
    fetchResult.pdfLinks,
    previousPdfLinks
  );

  if (addedPdfLinks.length > 0) {
    signals.add("New PDF Link Found");
    signals.add("New Notice Found");
  }

  if (removedPdfLinks.length > 0) {
    signals.add("PDF Link Removed");
  }

  const addedNoticeLines = getMeaningfulLines(
    fetchResult.normalizedText
  ).filter((line) => noticePattern.test(line));

  if (addedNoticeLines.length > 0) {
    signals.add("New Notice Found");
  }

  return Array.from(signals);
}

export function compareAdvisoryVersions(
  previousVersion: ComparableAdvisoryVersion | null,
  fetchResult: FetchAdvisoryResult
): AdvisoryChangeComparison {
  const roundLabel = detectRoundLabel(
    `${fetchResult.title}\n${fetchResult.normalizedText}`
  );

  if (!previousVersion) {
    const signals = detectAdvisorySignals(fetchResult, null);

    return {
      addedItems: getMeaningfulLines(fetchResult.normalizedText).slice(
        0,
        80
      ),
      removedItems: [],
      changedItems: [
        {
          field: "initial_version",
          value: "Initial official source snapshot captured.",
        },
        ...(roundLabel
          ? [{ field: "round_label", value: roundLabel }]
          : []),
      ],
      changeSummary:
        "Initial official source snapshot captured for admin review. It will not appear publicly until approved.",
      signals,
      roundLabel,
    };
  }

  const previousLines = getMeaningfulLines(
    previousVersion.extractedText
  );
  const currentLines = getMeaningfulLines(
    fetchResult.normalizedText
  );
  const previousLineSet = new Set(
    previousLines.map((line) => line.toLowerCase())
  );
  const currentLineSet = new Set(
    currentLines.map((line) => line.toLowerCase())
  );
  const addedTextItems = currentLines.filter(
    (line) => !previousLineSet.has(line.toLowerCase())
  );
  const removedTextItems = previousLines.filter(
    (line) => !currentLineSet.has(line.toLowerCase())
  );
  const addedPdfLinks = getAddedLinks(
    fetchResult.pdfLinks,
    previousVersion.extractedData?.pdfLinks
  );
  const removedPdfLinks = getRemovedLinks(
    fetchResult.pdfLinks,
    previousVersion.extractedData?.pdfLinks
  );
  const previousKeywords =
    previousVersion.extractedData?.keywordMatches ?? [];
  const newKeywords = fetchResult.keywordMatches.filter(
    (keyword) => !previousKeywords.includes(keyword)
  );
  const changedItems: unknown[] = [];

  if (previousVersion.title !== fetchResult.title) {
    changedItems.push({
      field: "title",
      before: previousVersion.title,
      after: fetchResult.title,
    });
  }

  if (roundLabel) {
    changedItems.push({
      field: "round_label",
      value: roundLabel,
    });
  }

  if (newKeywords.length > 0) {
    changedItems.push({
      field: "keyword_matches",
      added: newKeywords,
    });
  }

  const signals = detectAdvisorySignals(
    fetchResult,
    previousVersion.extractedData?.hash,
    previousVersion.extractedData?.pdfLinks
  );
  const summaryParts = [
    addedTextItems.length > 0
      ? `${addedTextItems.length} text item(s) added`
      : null,
    removedTextItems.length > 0
      ? `${removedTextItems.length} text item(s) removed`
      : null,
    addedPdfLinks.length > 0
      ? `${addedPdfLinks.length} PDF source reference(s) added`
      : null,
    removedPdfLinks.length > 0
      ? `${removedPdfLinks.length} PDF source reference(s) removed`
      : null,
    changedItems.length > 0
      ? `${changedItems.length} notable field change(s)`
      : null,
  ].filter(Boolean);

  return {
    addedItems: [
      ...addedTextItems.slice(0, 80),
      ...addedPdfLinks.map((link) => ({
        type: "pdf_reference",
        text: link.text,
        href: link.href,
      })),
    ],
    removedItems: [
      ...removedTextItems.slice(0, 80),
      ...removedPdfLinks.map((link) => ({
        type: "pdf_reference",
        text: link.text,
        href: link.href,
      })),
    ],
    changedItems,
    changeSummary:
      summaryParts.length > 0
        ? `${summaryParts.join(
            "; "
          )}. Admin review is required before public publishing.`
        : "Official source hash changed. Admin review is required before public publishing.",
    signals,
    roundLabel,
  };
}
