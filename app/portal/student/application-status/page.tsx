import type { Metadata } from "next";
import { Check, Circle, Clock3 } from "lucide-react";

import { STUDENT_STATUSES, statusLabel } from "../../../lib/portal/constants";
import { requirePortalStudent } from "../../../lib/portal/session";

export const metadata: Metadata = {
  title: "Application Status | ilmaLink",
  robots: { index: false, follow: false },
};

export default async function StudentApplicationStatusPage() {
  const student = await requirePortalStudent();
  const currentIndex = Math.max(
    0,
    STUDENT_STATUSES.indexOf(
      student.status as (typeof STUDENT_STATUSES)[number]
    )
  );
  const visibleStages = STUDENT_STATUSES.filter(
    (status) => !["not-interested", "invalid"].includes(status)
  );

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_.8fr]">
      <section className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)] sm:p-5">
        <h2 className="text-xl font-black text-[#082A62]">
          Application progress
        </h2>
        <p className="mt-1 text-sm font-medium text-[#60738F]">
          Current status:{" "}
          <strong className="text-[#0B4AA2]">
            {statusLabel(student.status)}
          </strong>
        </p>
        <ol className="mt-5 space-y-2">
          {visibleStages.map((stage, index) => {
            const complete = index < currentIndex;
            const current = stage === student.status;
            return (
              <li
                key={stage}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  current
                    ? "border-[#1769E8] bg-[#EEF5FF]"
                    : complete
                      ? "border-[#BFE5D9] bg-[#F1FAF7]"
                      : "border-[#E0E8F0] bg-[#F9FBFD]"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    complete
                      ? "bg-[#08A776] text-white"
                      : current
                        ? "bg-[#1769E8] text-white"
                        : "bg-[#E7EDF3] text-[#71839A]"
                  }`}
                >
                  {complete ? (
                    <Check className="h-4 w-4" />
                  ) : current ? (
                    <Clock3 className="h-4 w-4" />
                  ) : (
                    <Circle className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="text-sm font-black text-[#17396E]">
                  {statusLabel(stage)}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <aside className="space-y-4">
        <article className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
          <h2 className="text-lg font-black text-[#082A62]">Follow-up</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-[#60738F]">
            {student.followUpDate
              ? `Next follow-up: ${student.followUpDate.toLocaleString("en-IN")}`
              : "No follow-up date has been set yet."}
          </p>
        </article>
        <article className="rounded-2xl border border-[#BFE5D9] bg-[#F1FAF7] p-4">
          <h2 className="text-lg font-black text-[#075F45]">
            Assigned counsellor
          </h2>
          <p className="mt-2 text-sm font-semibold text-[#17634F]">
            {student.assignedToName || "Counsellor assignment pending"}
          </p>
        </article>
      </aside>
    </div>
  );
}
