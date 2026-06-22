import type { Metadata } from "next";
import { CheckCircle2, Clock3, FileText, ShieldAlert } from "lucide-react";

import { requirePortalStudent } from "../../../lib/portal/session";

export const metadata: Metadata = {
  title: "My Documents | ILMALINK MEDIGO",
  robots: { index: false, follow: false },
};

const recommendedDocuments = [
  "Class 10 marksheet",
  "Class 12 marksheet",
  "NEET scorecard",
  "Identity proof",
  "Passport (for abroad pathway)",
];

export default async function StudentDocumentsPage() {
  const student = await requirePortalStudent();

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)] sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1769E8]">
            <FileText className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-xl font-black text-[#082A62]">Document status</h2>
            <p className="mt-1 text-sm font-medium leading-6 text-[#60738F]">
              Documents are private to your student profile and authorised
              education portal staff.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          {student.documents.length ? (
            student.documents.map((document) => (
              <article
                key={document.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-[#E0E8F0] bg-[#F9FBFD] p-3"
              >
                <div>
                  <h3 className="text-sm font-black text-[#17396E]">
                    {document.documentType}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#71839A]">
                    {document.fileName || "Document record"}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF3FF] px-2.5 py-1 text-[10px] font-black text-[#0B4AA2]">
                  {document.status === "verified" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#08A776]" />
                  ) : (
                    <Clock3 className="h-3.5 w-3.5" />
                  )}
                  {document.status}
                </span>
              </article>
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-[#BFD3E8] bg-[#F8FBFF] p-5 text-center">
              <ShieldAlert className="mx-auto h-7 w-7 text-[#D4840A]" />
              <p className="mt-2 text-sm font-black text-[#17396E]">
                No documents submitted yet
              </p>
              <p className="mt-1 text-xs font-medium leading-5 text-[#60738F]">
                Your assigned counsellor will confirm which documents are
                needed and the approved upload method.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
        <h2 className="text-lg font-black text-[#082A62]">
          Commonly requested documents
        </h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {recommendedDocuments.map((document) => (
            <li
              key={document}
              className="flex items-center gap-2 rounded-xl bg-[#F4F8FC] px-3 py-2 text-sm font-semibold text-[#46617F]"
            >
              <FileText className="h-4 w-4 text-[#1769E8]" />
              {document}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
