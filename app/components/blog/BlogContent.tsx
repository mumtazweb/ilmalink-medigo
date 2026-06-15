import Image from "next/image";
import { isImageFile, isVideoFile } from "@/app/lib/blog/imageValidation";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (linkMatch) {
      const linkText = linkMatch[1];
      const linkHref = linkMatch[2];

      return (
        <a
          key={index}
          href={linkHref}
          className="mx-1 inline-flex items-center justify-center rounded-full bg-red-600 px-3 py-1.5 text-sm font-extrabold text-white no-underline shadow-[0_8px_20px_rgba(220,38,38,0.28)] ring-1 ring-red-500/30 transition hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          target={linkHref.startsWith("http") ? "_blank" : undefined}
          rel={linkHref.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {linkText}
        </a>
      );
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
    <div className="space-y-6 text-slate-700">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="pt-3 text-2xl font-bold text-[#0F172A]">
              {renderInline(block.replace("## ", ""))}
            </h2>
          );
        }

        const imageMatch = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

        if (imageMatch) {
          const imageSrc = imageMatch[2].trim();

          if (!imageSrc) {
            return null;
          }

          return (
            <div key={index} className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#EFF6FF]">
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
                  className="flex h-full w-full items-center justify-center px-4 text-center text-sm font-bold text-[#0F4CFF]"
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
            <div key={index} className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <tbody>
                  {rows.map((row, rowIndex) => (
                    <tr key={`${row.join("-")}-${rowIndex}`} className="border-b border-slate-200 last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-4 py-3 font-medium text-slate-700">
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
            <ul key={index} className="space-y-3 pl-5">
              {block.split("\n").map((item) => (
                <li key={item} className="list-disc leading-8">
                  {renderInline(item.replace("- ", ""))}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={index} className="text-base leading-8 md:text-lg">
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}