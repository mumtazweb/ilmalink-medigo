import { createHash } from "crypto";

import type { AdvisorySource } from "@/app/data/advisorySources";

export type AdvisoryFoundLink = {
  text: string;
  href: string;
  isPdf: boolean;
};

export type FetchAdvisoryResult = {
  ok: boolean;
  sourceId: string;
  country: string;
  sourceName: string;
  sourceUrl: string;
  checkedAt: string;
  title: string;
  normalizedText: string;
  textPreview: string;
  foundLinks: AdvisoryFoundLink[];
  pdfLinks: AdvisoryFoundLink[];
  keywordMatches: string[];
  hash: string;
  error?: string;
};

const navigationNoise = [
  "skip to main content",
  "screen reader access",
  "font size",
  "increase font",
  "decrease font",
  "high contrast",
  "search",
  "home",
  "sitemap",
  "feedback",
  "copyright",
  "last updated",
  "visitor counter",
];

function stripHtmlTags(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<aside[\s\S]*?<\/aside>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(br|p|div|li|tr|th|td|h[1-6])\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
}

function decodeHtmlEntities(value: string) {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(
    /&(#x?[0-9a-f]+|[a-z]+);/gi,
    (match, entity: string) => {
      const normalized = entity.toLowerCase();

      if (normalized.startsWith("#x")) {
        const codePoint = Number.parseInt(
          normalized.slice(2),
          16
        );

        return Number.isFinite(codePoint)
          ? String.fromCodePoint(codePoint)
          : match;
      }

      if (normalized.startsWith("#")) {
        const codePoint = Number.parseInt(
          normalized.slice(1),
          10
        );

        return Number.isFinite(codePoint)
          ? String.fromCodePoint(codePoint)
          : match;
      }

      return namedEntities[normalized] ?? match;
    }
  );
}

function normalizeReadableText(html: string) {
  const rawText = decodeHtmlEntities(stripHtmlTags(html));
  const seenShortLines = new Map<string, number>();

  return rawText
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => {
      if (line.length < 3) {
        return false;
      }

      const lowerLine = line.toLowerCase();
      const isNoise = navigationNoise.some(
        (noise) => lowerLine === noise || lowerLine.includes(noise)
      );

      if (isNoise && line.length < 90) {
        return false;
      }

      if (line.length < 80) {
        const count = seenShortLines.get(lowerLine) ?? 0;
        seenShortLines.set(lowerLine, count + 1);

        if (count >= 2) {
          return false;
        }
      }

      return true;
    })
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractTitle(html: string) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

  if (!titleMatch) {
    return "Official source update";
  }

  return decodeHtmlEntities(
    titleMatch[1].replace(/\s+/g, " ").trim()
  );
}

function isPdfUrl(href: string) {
  try {
    const url = new URL(href);
    return /\.pdf($|\?)/i.test(url.pathname + url.search);
  } catch {
    return /\.pdf($|\?)/i.test(href);
  }
}

function extractLinks(html: string, sourceUrl: string) {
  const links = new Map<string, AdvisoryFoundLink>();
  const linkPattern =
    /<a\b[^>]*href=(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(html)) !== null) {
    const rawHref = decodeHtmlEntities(match[2]).trim();

    if (
      !rawHref ||
      rawHref.startsWith("#") ||
      rawHref.toLowerCase().startsWith("javascript:")
    ) {
      continue;
    }

    try {
      const href = new URL(rawHref, sourceUrl).toString();
      const text =
        normalizeReadableText(match[3]).replace(/\n+/g, " ") ||
        href;
      const normalizedText =
        text.length > 180 ? `${text.slice(0, 177)}...` : text;

      links.set(href, {
        text: normalizedText,
        href,
        isPdf: isPdfUrl(href),
      });
    } catch {
      continue;
    }
  }

  return Array.from(links.values());
}

function findKeywordMatches(text: string, keywords: string[]) {
  const lowerText = text.toLowerCase();

  return keywords.filter((keyword) =>
    lowerText.includes(keyword.toLowerCase())
  );
}

function createContentHash(
  normalizedText: string,
  foundLinks: AdvisoryFoundLink[],
  keywords: string[]
) {
  const lowerKeywords = keywords.map((keyword) =>
    keyword.toLowerCase()
  );
  const importantLinks = foundLinks
    .filter((link) => {
      const linkText = `${link.text} ${link.href}`.toLowerCase();

      return (
        link.isPdf ||
        lowerKeywords.some((keyword) => linkText.includes(keyword))
      );
    })
    .slice(0, 250)
    .map((link) => `${link.text} ${link.href}`);

  const hashInput = `${normalizedText}\n\nIMPORTANT_LINKS\n${importantLinks.join(
    "\n"
  )}`;

  return createHash("sha256").update(hashInput).digest("hex");
}

function createErrorResult(
  source: AdvisorySource,
  checkedAt: string,
  error: string
): FetchAdvisoryResult {
  return {
    ok: false,
    sourceId: source.id,
    country: source.country,
    sourceName: source.sourceName,
    sourceUrl: source.url,
    checkedAt,
    title: "Fetch Error",
    normalizedText: "",
    textPreview: "",
    foundLinks: [],
    pdfLinks: [],
    keywordMatches: [],
    hash: "",
    error,
  };
}

export async function fetchAdvisorySource(
  source: AdvisorySource
): Promise<FetchAdvisoryResult> {
  const checkedAt = new Date().toISOString();

  if (!/^https?:\/\//i.test(source.url)) {
    return createErrorResult(
      source,
      checkedAt,
      "Source URL is not configured."
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(source.url, {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "User-Agent":
          "ilmaLink-Official-Advisory-Tracker/1.0",
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return createErrorResult(
        source,
        checkedAt,
        `Official source returned HTTP ${response.status}.`
      );
    }

    const html = await response.text();
    const title = extractTitle(html);
    const normalizedText = normalizeReadableText(html);
    const foundLinks = extractLinks(html, source.url);
    const pdfLinks = foundLinks.filter((link) => link.isPdf);
    const keywordMatches = findKeywordMatches(
      `${title}\n${normalizedText}\n${foundLinks
        .map((link) => `${link.text} ${link.href}`)
        .join("\n")}`,
      source.keywords
    );
    const hash = createContentHash(
      normalizedText,
      foundLinks,
      source.keywords
    );

    return {
      ok: true,
      sourceId: source.id,
      country: source.country,
      sourceName: source.sourceName,
      sourceUrl: source.url,
      checkedAt,
      title,
      normalizedText,
      textPreview:
        normalizedText.length > 900
          ? `${normalizedText.slice(0, 897)}...`
          : normalizedText,
      foundLinks,
      pdfLinks,
      keywordMatches,
      hash,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.name === "AbortError"
          ? "Official source fetch timed out."
          : error.message
        : "Official source fetch failed.";

    return createErrorResult(source, checkedAt, message);
  } finally {
    clearTimeout(timeout);
  }
}
