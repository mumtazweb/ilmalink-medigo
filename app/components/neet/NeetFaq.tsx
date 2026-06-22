import { HelpCircle, Plus } from "lucide-react";

import { NeetSectionHeading } from "./NeetSubpageUi";

export type NeetFaqItem = {
  question: string;
  answer: string;
};

export default function NeetFaq({ items }: { items: NeetFaqItem[] }) {
  return (
    <section aria-labelledby="neet-faq-title">
      <NeetSectionHeading icon={HelpCircle} title="FAQs" />
      <div className="mt-3 overflow-hidden rounded-2xl border border-[#CAD8E8] bg-white shadow-[0_7px_18px_rgba(8,42,98,.05)]">
        {items.map((item) => (
          <details
            key={item.question}
            className="group border-b border-[#DCE5EF] last:border-b-0"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-4 py-2 text-sm font-bold text-[#17396E] marker:hidden">
              <span>{item.question}</span>
              <Plus className="h-4 w-4 shrink-0 text-[#0B4AA2] transition group-open:rotate-45" />
            </summary>
            <p className="px-4 pb-4 text-sm font-medium leading-6 text-[#526985]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
