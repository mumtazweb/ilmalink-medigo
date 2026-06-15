import Image from "next/image";
import { isImageFile, isVideoFile } from "@/app/lib/blog/imageValidation";

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

// BLOG SYSTEM: Minimal safe markdown renderer for seeded/editor content.
export default function BlogContent({ content }: { content: string }) {
  const blocks = content
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="space-y-7 text-slate-700">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return (
            <div key={index} className="pt-4">
              <h2 className="border-l-4 border-[#00C896] pl-4 text-2xl font-black leading-tight text-[#0B2244] md:text-3xl">
                {renderInline(block.replace("## ", ""))}
              </h2>
            </div>
          );
        }

        const imageMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

        if (imageMatch) {
          const imageSrc = imageMatch[2].trim();

          if (!imageSrc) {
            return null;
          }

          return (
            <div
              key={index}
              className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-[#EFF6FF] shadow-[0_20px_45px_rgba(15,23,42,0.10)]"
            >
              {isVideoFile(imageSrc) ? (
                <video
                  src={imageSrc}
                  className="h-full w-full object-cover"
                  controls
                  preload="metadata"
                />
              ) : isImageFile(imageSrc) ? (
                <Image
                  src={imageSrc}
                  alt={imageMatch[1]}
                  fill
                  sizes="(min-width: 1024px) 860px, 90vw"
                  className="object-cover"
                />
              ) : (
                <a
                  href={imageSrc}
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
                  {imageMatch[1] || "Open media"}
                </a>
              )}
            </div>
          );
        }

        if (block.includes("|") && block.includes("---")) {
          const rows = block
            .split("\n")
            .filter((row) => !row.includes("---"))
            .map((row) =>
              row
                .split("|")
                .map((cell) => cell.trim())
                .filter(Boolean)
            );

          return (
            <div key={index} className="overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-sm">
              <table className="w-full text-left text-sm">
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr
                      key={`${row.join("-")}-${rowIndex}`}
                      className="border-b border-slate-200 last:border-b-0"
                    >
                      {row.map((cell) => (
                        <td key={cell} className="bg-white px-4 py-3 font-semibold text-slate-700 odd:bg-[#F8FAFC]">
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.startsWith("- ")) {
          return (
            <ul key={index} className="space-y-3">
              {block.split("\n").map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-medium leading-7 shadow-sm"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#00C896]" />
                  <span>{renderInline(item.replace("- ", ""))}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-[1rem] font-medium leading-8 text-slate-700 md:text-lg md:leading-9">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}
