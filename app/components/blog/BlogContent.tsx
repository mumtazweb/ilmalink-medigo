import type { ReactNode } from "react";
import Image from "next/image";
import { isImageFile, isVideoFile } from "@/app/lib/blog/imageValidation";

type ContentBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "image"; alt: string; src: string }
  | { type: "list"; ordered: boolean; items: ListItem[] }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "pre"; text: string }
  | { type: "table"; hasHeader: boolean; rows: string[][] };

type ListItem = {
  checked?: boolean;
  marker: string;
  text: string;
  variant: "checkbox" | "ordered" | "unordered";
};

const headingPattern = /^(#{1,4})\s+(.+)$/;
const imagePattern = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const boxDrawingPattern =
  /[\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2500\u2502\u2550\u2551\u2554\u2557\u255A\u255D]/u;
const checkboxSymbols = new Map([
  ["\u2610", false],
  ["\u2611", true],
  ["\u2713", true],
  ["\u2714", true],
]);
function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function renderLink(key: number, linkText: string, linkHref: string) {
  const cleanText = linkText.trim();
  const cleanHref = linkHref.trim();

  return (
    <a
      key={key}
      href={cleanHref}
      className="!font-extrabold !text-[#0F4CFF] !underline !decoration-[#00C896] !decoration-2 !underline-offset-4 transition hover:!text-[#0B2244] hover:!decoration-[#0F4CFF]"
      style={{
        color: "#0F4CFF",
        fontWeight: 800,
        textDecorationLine: "underline",
        textDecorationColor: "#00C896",
        textDecorationThickness: "2px",
        textUnderlineOffset: "4px",
      }}
      target={cleanHref.startsWith("http") ? "_blank" : undefined}
      rel={cleanHref.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {cleanText}
    </a>
  );
}

function renderInline(text: string) {
  const parts = text.split(
    /(\*\*[^*]+\*\*|_[^_]+_|\[\[[^\]|]+\|[^\]]+\]\]|\[[^\]]+\]\([^)]+\))/g
  );

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    const easyLinkMatch = part.match(/^\[\[([^|]+)\|(.+)\]\]$/);

    if (easyLinkMatch) {
      return renderLink(index, easyLinkMatch[1], easyLinkMatch[2]);
    }

    const markdownLinkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (markdownLinkMatch) {
      return renderLink(index, markdownLinkMatch[1], markdownLinkMatch[2]);
    }

    return part;
  });
}

function normalizeContent(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/\u00a0/g, " ")
    .trim();
}

function trimOuterEmptyLines(lines: string[]) {
  let start = 0;
  let end = lines.length;

  while (start < end && !lines[start].trim()) {
    start += 1;
  }

  while (end > start && !lines[end - 1].trim()) {
    end -= 1;
  }

  return lines.slice(start, end);
}

function splitPipeCells(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function splitTabCells(line: string) {
  return line.split("\t").map((cell) => cell.trim());
}

function isMarkdownSeparatorLine(line: string) {
  if (!line.includes("|")) {
    return false;
  }

  const cells = splitPipeCells(line).filter(Boolean);

  return (
    cells.length > 0 &&
    cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()))
  );
}

function isStandaloneEasyLinkLine(line: string) {
  return /^\s*\[\[[^\]|]+\|[^\]]+\]\]\s*$/.test(line);
}

function isPipeTableLine(line: string) {
  return (
    !isStandaloneEasyLinkLine(line) &&
    line.includes("|") &&
    splitPipeCells(line).length >= 2
  );
}

function isTabTableLine(line: string) {
  return line.includes("\t") && splitTabCells(line).length >= 2;
}

function startsPipeTable(lines: string[], index: number) {
  const current = lines[index] ?? "";
  const next = lines[index + 1] ?? "";

  return (
    isPipeTableLine(current) &&
    (isMarkdownSeparatorLine(next) || isPipeTableLine(next))
  );
}

function looksLikeHeader(rows: string[][]) {
  if (rows.length < 2 || rows[0].length !== rows[1].length) {
    return false;
  }

  return rows[0].some((cell) => /[A-Za-z]/.test(cell));
}

function parsePipeTable(lines: string[]) {
  const hasSeparator = lines.some(isMarkdownSeparatorLine);
  const rows = lines
    .filter((line) => !isMarkdownSeparatorLine(line))
    .map(splitPipeCells)
    .filter((row) => row.length >= 2);

  return {
    hasHeader: hasSeparator || looksLikeHeader(rows),
    rows,
  };
}

function parseTabTable(lines: string[]) {
  const rows = lines.map(splitTabCells).filter((row) => row.length >= 2);

  return {
    hasHeader: looksLikeHeader(rows),
    rows,
  };
}

function getListItem(line: string): ListItem | null {
  const markdownCheckbox = line.match(
    /^\s*(?:[-*+]\s*)?(\[[ xX]\])\s+(.+)$/
  );

  if (markdownCheckbox) {
    const checked = markdownCheckbox[1].toLowerCase() === "[x]";

    return {
      checked,
      marker: checked ? "\u2713" : "\u25A1",
      text: markdownCheckbox[2].trim(),
      variant: "checkbox",
    };
  }

  const symbolCheckbox = line.match(/^\s*([\u2610\u2611\u2713\u2714])\s+(.+)$/u);

  if (symbolCheckbox) {
    const checked = checkboxSymbols.get(symbolCheckbox[1]) ?? false;

    return {
      checked,
      marker: checked ? "\u2713" : "\u25A1",
      text: symbolCheckbox[2].trim(),
      variant: "checkbox",
    };
  }

  const ordered = line.match(
    /^\s*((?:\d+|[A-Za-z]|[ivxlcdmIVXLCDM]+)[.)])\s+(.+)$/
  );

  if (ordered) {
    return {
      marker: ordered[1],
      text: ordered[2].trim(),
      variant: "ordered",
    };
  }

  const unordered = line.match(
    /^\s*([-*+\u2022\u2023\u25E6\u25AA\u25AB\u25CF\u25CB\u25A0\u25A1\u2013\u2014])\s+(.+)$/u
  );

  if (unordered) {
    const marker = ["-", "*", "+"].includes(unordered[1])
      ? "\u2022"
      : unordered[1];

    return {
      marker,
      text: unordered[2].trim(),
      variant: "unordered",
    };
  }

  return null;
}

function isIndentedContinuation(line: string) {
  return /^\s{2,}\S/.test(line);
}

function isPreformattedBlock(lines: string[]) {
  return (
    lines.some((line) => boxDrawingPattern.test(line)) ||
    (lines.length > 0 && lines.every((line) => /^( {4,}|\t)/.test(line)))
  );
}

function pushParagraph(blocks: ContentBlock[], lines: string[]) {
  const cleanLines = trimOuterEmptyLines(lines);

  if (cleanLines.length === 0) {
    return;
  }

  const text = cleanLines.join("\n");

  blocks.push(
    isPreformattedBlock(cleanLines)
      ? { type: "pre", text }
      : { type: "paragraph", text }
  );
}

function parseContent(content: string): ContentBlock[] {
  const normalizedContent = normalizeContent(content);

  if (!normalizedContent) {
    return [];
  }

  const lines = normalizedContent.split("\n");
  const blocks: ContentBlock[] = [];
  let paragraphLines: string[] = [];
  let index = 0;

  const flushParagraph = () => {
    pushParagraph(blocks, paragraphLines);
    paragraphLines = [];
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      index += 1;
      continue;
    }

    const headingMatch = trimmedLine.match(headingPattern);

    if (headingMatch) {
      flushParagraph();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      index += 1;
      continue;
    }

    const imageMatch = trimmedLine.match(imagePattern);

    if (imageMatch) {
      flushParagraph();
      blocks.push({
        type: "image",
        alt: imageMatch[1],
        src: imageMatch[2].trim(),
      });
      index += 1;
      continue;
    }

    if (trimmedLine.startsWith(">")) {
      const quoteLines: string[] = [];

      flushParagraph();

      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push({
        type: "quote",
        text: quoteLines.join("\n"),
      });
      continue;
    }

    if (trimmedLine.startsWith("```")) {
      const preLines: string[] = [];

      flushParagraph();
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        preLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({
        type: "pre",
        text: preLines.join("\n"),
      });
      continue;
    }

    if (startsPipeTable(lines, index)) {
      const tableLines: string[] = [];

      flushParagraph();

      while (
        index < lines.length &&
        (isPipeTableLine(lines[index]) || isMarkdownSeparatorLine(lines[index]))
      ) {
        tableLines.push(lines[index]);
        index += 1;
      }

      const table = parsePipeTable(tableLines);

      if (table.rows.length > 0) {
        blocks.push({
          type: "table",
          ...table,
        });
      }
      continue;
    }

    if (isTabTableLine(line)) {
      const tableLines: string[] = [];

      flushParagraph();

      while (index < lines.length && isTabTableLine(lines[index])) {
        tableLines.push(lines[index]);
        index += 1;
      }

      const table = parseTabTable(tableLines);

      if (table.rows.length > 0) {
        blocks.push({
          type: "table",
          ...table,
        });
      }
      continue;
    }

    const firstListItem = getListItem(line);

    if (firstListItem) {
      const items: ListItem[] = [];

      flushParagraph();

      while (index < lines.length) {
        const listItem = getListItem(lines[index]);

        if (listItem) {
          items.push(listItem);
          index += 1;
          continue;
        }

        if (items.length > 0 && isIndentedContinuation(lines[index])) {
          const previousItem = items[items.length - 1];
          previousItem.text = `${previousItem.text}\n${lines[index].trim()}`;
          index += 1;
          continue;
        }

        break;
      }

      blocks.push({
        type: "list",
        ordered: items.every((item) => item.variant === "ordered"),
        items,
      });
      continue;
    }

    paragraphLines.push(line);
    index += 1;
  }

  flushParagraph();

  return blocks;
}

function renderMediaBlock(block: Extract<ContentBlock, { type: "image" }>) {
  if (!block.src) {
    return null;
  }

  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 bg-[#EFF6FF] shadow-[0_20px_45px_rgba(15,23,42,0.10)]">
      {isVideoFile(block.src) ? (
        <video
          src={block.src}
          className="h-full w-full object-cover"
          controls
          preload="metadata"
        />
      ) : isImageFile(block.src) ? (
        <Image
          src={block.src}
          alt={block.alt}
          fill
          sizes="(min-width: 1024px) 860px, 90vw"
          className="object-cover"
        />
      ) : (
        <a
          href={block.src}
          className="flex h-full w-full items-center justify-center px-4 text-center text-sm font-bold text-[#0F4CFF] underline decoration-[#00C896] decoration-2 underline-offset-4"
          style={{
            color: "#0F4CFF",
            fontWeight: 800,
            textDecorationLine: "underline",
            textDecorationColor: "#00C896",
            textDecorationThickness: "2px",
            textUnderlineOffset: "4px",
          }}
        >
          {block.alt || "Open media"}
        </a>
      )}
    </div>
  );
}

function renderHeading(block: Extract<ContentBlock, { type: "heading" }>, index: number) {
  const headingId = `${slugifyHeading(block.text)}-${index}`;
  if (block.level <= 2) {
    return (
      <div className="pt-3">
        <h2 id={headingId} className="scroll-mt-28 border-l-4 border-[#00C896] pl-4 text-2xl font-black leading-tight text-[#0B2244] md:text-3xl">
          {renderInline(block.text)}
        </h2>
      </div>
    );
  }

  if (block.level === 3) {
    return (
      <h3 id={headingId} className="scroll-mt-28 pt-2 text-xl font-black leading-snug text-[#0B2244] md:text-2xl">
        {renderInline(block.text)}
      </h3>
    );
  }

  return (
    <h4 id={headingId} className="scroll-mt-28 text-lg font-black leading-snug text-[#0B2244] md:text-xl">
      {renderInline(block.text)}
    </h4>
  );
}

function renderTable(block: Extract<ContentBlock, { type: "table" }>) {
  const headerRows = block.hasHeader ? block.rows.slice(0, 1) : [];
  const bodyRows = block.hasHeader ? block.rows.slice(1) : block.rows;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.08)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          {headerRows.length > 0 && (
            <thead className="bg-[#081B35] text-white">
              {headerRows.map((row, rowIndex) => (
                <tr key={`head-${rowIndex}`}>
                  {row.map((cell, cellIndex) => (
                    <th
                      key={`head-${rowIndex}-${cellIndex}`}
                      className="border-r border-white/10 px-4 py-3 font-black leading-6 last:border-r-0"
                    >
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
          )}

          <tbody>
            {bodyRows.map((row, rowIndex) => (
              <tr
                key={`body-${rowIndex}`}
                className="border-t border-slate-200 odd:bg-white even:bg-[#F8FAFC]"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`body-${rowIndex}-${cellIndex}`}
                    className="border-r border-slate-200 px-4 py-3 align-top font-semibold leading-6 text-slate-700 last:border-r-0"
                  >
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderListItems(items: ListItem[]) {
  return items.map((item, index) => {
    const markerClass = item.checked
      ? "border-[#00C896]/30 bg-[#00C896]/12 text-[#047857]"
      : item.variant === "checkbox"
        ? "border-slate-300 bg-white text-slate-500"
        : item.variant === "ordered"
          ? "border-[#0F4CFF]/20 bg-[#EFF6FF] text-[#0F4CFF]"
          : "border-[#00C896]/20 bg-[#ECFDF5] text-[#047857]";

    return (
      <li
        key={`${item.marker}-${index}-${item.text}`}
        className="grid grid-cols-[auto_1fr] gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
      >
        <span
          className={`mt-0.5 flex min-h-7 min-w-7 items-center justify-center rounded-lg border px-2 text-sm font-black leading-none ${markerClass}`}
        >
          {item.marker}
        </span>
        <span className="min-w-0 whitespace-pre-line text-base font-medium leading-7 text-slate-700 md:text-[1.05rem]">
          {renderInline(item.text)}
        </span>
      </li>
    );
  });
}

function renderBlock(block: ContentBlock, index: number): ReactNode {
  if (block.type === "heading") {
   return <div key={index}>{renderHeading(block, index)}</div>;
  }

  if (block.type === "image") {
    return <div key={index}>{renderMediaBlock(block)}</div>;
  }

  if (block.type === "table") {
    return <div key={index}>{renderTable(block)}</div>;
  }

  if (block.type === "list") {
    const className = "list-none space-y-3";

    return block.ordered ? (
      <ol key={index} className={className}>
        {renderListItems(block.items)}
      </ol>
    ) : (
      <ul key={index} className={className}>
        {renderListItems(block.items)}
      </ul>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        key={index}
        className="rounded-xl border border-[#0F4CFF]/15 border-l-4 border-l-[#0F4CFF] bg-[#EFF6FF] px-5 py-4 text-base font-semibold leading-8 text-[#0B2244] shadow-sm md:text-lg"
      >
        <span className="block whitespace-pre-line">{renderInline(block.text)}</span>
      </blockquote>
    );
  }

  if (block.type === "pre") {
    return (
      <pre
        key={index}
        className="overflow-x-auto rounded-xl border border-slate-200 bg-[#0B1220] px-4 py-4 text-sm font-semibold leading-6 text-slate-100 shadow-[0_14px_34px_rgba(15,23,42,0.10)]"
      >
        <code className="whitespace-pre-wrap break-words">{block.text}</code>
      </pre>
    );
  }

  return (
    <p
      key={index}
      className="whitespace-pre-line break-words text-[1rem] font-medium leading-8 text-slate-700 md:text-lg md:leading-9"
    >
      {renderInline(block.text)}
    </p>
  );
}

// BLOG SYSTEM: Safe line-aware blog renderer for seeded/editor content.
export default function BlogContent({ content }: { content: string }) {
  const blocks = parseContent(content);

  return (
    <div className="space-y-7 text-slate-700">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}
