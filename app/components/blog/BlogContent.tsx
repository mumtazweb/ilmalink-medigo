import Image from "next/image";

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
      return (
        <a
          key={index}
          href={linkMatch[2]}
          className="font-bold text-[#0F4CFF] underline underline-offset-4"
          target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
          rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {linkMatch[1]}
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
          return (
            <div key={index} className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#EFF6FF]">
              <Image
                src={imageMatch[2]}
                alt={imageMatch[1]}
                fill
                sizes="(min-width: 1024px) 860px, 90vw"
                className="object-cover"
              />
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
