"use client";

import {
  CheckCircle2,
  CircleHelp,
  Clock3,
  Download,
  FileText,
  Loader2,
  UploadCloud,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  PORTAL_DOCUMENT_REQUIREMENTS,
  PORTAL_DOCUMENT_ACCEPT,
  PORTAL_DOCUMENT_MAX_BYTES,
  PORTAL_OTHER_DOCUMENT_LABEL,
  findMatchingPortalDocument,
  isSupportedPortalDocumentFile,
  portalDocumentDownloadHref,
  requirementApplies,
  type PortalDocumentListItem,
} from "../../lib/portal/documentChecklist";

type StudentDocumentView = PortalDocumentListItem & {
  note: string | null;
  createdAt: string;
};

export default function StudentDocumentsManager({
  documents,
  preferredPath,
  preferredCountry,
}: {
  documents: StudentDocumentView[];
  preferredPath: string;
  preferredCountry: string | null;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [documentType, setDocumentType] = useState(
    PORTAL_DOCUMENT_REQUIREMENTS[0].label
  );
  const [customDocumentType, setCustomDocumentType] = useState("");
  const [note, setNote] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const uploadedDocuments = useMemo(
    () => documents.filter((document) => document.hasFile !== false),
    [documents]
  );

  const checklistRows = useMemo(
    () =>
      PORTAL_DOCUMENT_REQUIREMENTS.map((requirement) => ({
        requirement,
        applies: requirementApplies(
          requirement,
          preferredPath,
          preferredCountry
        ),
        document: findMatchingPortalDocument(
          uploadedDocuments,
          requirement.keys,
          requirement.excludeKeys
        ),
      })),
    [preferredCountry, preferredPath, uploadedDocuments]
  );

  const requiredRows = checklistRows.filter((row) => row.applies);
  const uploadedRequired = requiredRows.filter((row) => row.document).length;
  const heading = uploadedDocuments.length
    ? "View uploads"
    : "Upload documents";

  function selectFile(file: File | null) {
    setMessage("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!isSupportedPortalDocumentFile(file)) {
      setSelectedFile(null);
      setMessage("Upload an image or PDF document.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > PORTAL_DOCUMENT_MAX_BYTES) {
      setSelectedFile(null);
      setMessage("The document must be 25 MB or smaller.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
  }

  async function uploadDocument(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!selectedFile) {
      setMessage("Select a document to upload.");
      return;
    }

    setBusy(true);
    try {
      const formData = new FormData();
      formData.set("documentType", documentType);
      formData.set("customDocumentType", customDocumentType);
      formData.set("note", note);
      formData.set("file", selectedFile);

      const response = await fetch("/api/portal/student/documents", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Document upload failed.");
      }

      setSelectedFile(null);
      setCustomDocumentType("");
      setNote("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setMessage("Document uploaded.");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Document upload failed."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)] sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3FF] text-[#1769E8]">
              <FileText className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-black text-[#082A62]">{heading}</h2>
              <p className="mt-1 text-sm font-medium leading-6 text-[#60738F]">
                {uploadedRequired} of {requiredRows.length} required documents
                uploaded
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF3FF] px-3 py-1.5 text-xs font-black text-[#0B4AA2]">
            {uploadedDocuments.length ? (
              <CheckCircle2 className="h-4 w-4 text-[#08A776]" />
            ) : (
              <Clock3 className="h-4 w-4 text-[#D4840A]" />
            )}
            {uploadedDocuments.length ? "Uploaded" : "Pending"}
          </span>
        </div>

        <form
          onSubmit={uploadDocument}
          className="mt-5 grid gap-3 rounded-xl border border-[#DDE7F1] bg-[#F8FBFF] p-3 sm:grid-cols-[1fr_1fr] sm:p-4 lg:grid-cols-[1fr_1fr_1fr_auto]"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-black text-[#17396E]">
              Document
            </span>
            <select
              value={documentType}
              onChange={(event) => setDocumentType(event.target.value)}
              className="portal-input"
            >
              {PORTAL_DOCUMENT_REQUIREMENTS.map((requirement) => (
                <option key={requirement.label} value={requirement.label}>
                  {requirement.label}
                </option>
              ))}
              <option value={PORTAL_OTHER_DOCUMENT_LABEL}>
                {PORTAL_OTHER_DOCUMENT_LABEL}
              </option>
            </select>
          </label>

          {documentType === PORTAL_OTHER_DOCUMENT_LABEL ? (
            <label className="block">
              <span className="mb-1.5 block text-xs font-black text-[#17396E]">
                Name
              </span>
              <input
                value={customDocumentType}
                onChange={(event) => setCustomDocumentType(event.target.value)}
                className="portal-input"
                placeholder="Document name"
              />
            </label>
          ) : (
            <label className="block">
              <span className="mb-1.5 block text-xs font-black text-[#17396E]">
                Note
              </span>
              <input
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className="portal-input"
                placeholder="Optional"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-xs font-black text-[#17396E]">
              File
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept={PORTAL_DOCUMENT_ACCEPT}
              onChange={(event) =>
                selectFile(event.currentTarget.files?.[0] ?? null)
              }
              className="portal-input pt-3 text-xs"
            />
            <span className="mt-1 block text-[10px] font-semibold text-[#71839A]">
              Any image format or PDF, up to 25 MB
            </span>
          </label>

          <button
            type="submit"
            disabled={busy}
            className="portal-primary-button self-end sm:col-span-2 lg:col-span-1"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="h-4 w-4" />
            )}
            Upload
          </button>
        </form>

        {message ? (
          <p
            aria-live="polite"
            className="mt-3 rounded-xl border border-[#DDE7F1] bg-white px-3 py-2 text-sm font-semibold text-[#17396E]"
          >
            {message}
          </p>
        ) : null}
      </section>

      <section
        id="uploaded-documents"
        className="scroll-mt-24 rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]"
      >
        <h2 className="text-lg font-black text-[#082A62]">
          Documents checklist
        </h2>
        <div className="mt-3 grid gap-2">
          {checklistRows.map(({ requirement, applies, document }) => (
            <ChecklistRow
              key={requirement.label}
              label={requirement.label}
              document={document}
              status={
                document ? "Uploaded" : applies ? "Pending" : "Not required yet"
              }
            />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]">
        <h2 className="text-lg font-black text-[#082A62]">
          Uploaded documents
        </h2>
        <div className="mt-3 grid gap-2">
          {uploadedDocuments.length ? (
            uploadedDocuments.map((document) => (
              <article
                key={document.id}
                className="grid gap-3 rounded-xl border border-[#E0E8F0] bg-[#F9FBFD] p-3 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-black text-[#17396E]">
                      {document.documentType}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F8F2] px-2 py-0.5 text-[10px] font-black text-[#087A60]">
                      <CheckCircle2 className="h-3 w-3" />
                      Uploaded
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs font-medium text-[#71839A]">
                    {document.fileName || "Document record"}
                  </p>
                  <p className="mt-1 text-[10px] font-bold text-[#8190A3]">
                    {new Date(document.createdAt).toLocaleString("en-IN")}
                  </p>
                </div>
                <a
                  href={portalDocumentDownloadHref(document.id)}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#BFD3E8] bg-white px-3 text-xs font-black text-[#0B4AA2]"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </article>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-[#BFD3E8] bg-[#F8FBFF] p-4 text-sm font-medium text-[#60738F]">
              No documents submitted yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function ChecklistRow({
  label,
  document,
  status,
}: {
  label: string;
  document?: PortalDocumentListItem;
  status: "Uploaded" | "Pending" | "Not required yet";
}) {
  const uploaded = status === "Uploaded";
  const pending = status === "Pending";

  return (
    <article className="grid grid-cols-[22px_1fr_auto] items-center gap-2 rounded-xl border border-[#E0E8F0] bg-[#F9FBFD] p-3 text-xs">
      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F0ECFF] text-[#7A51F5]">
        <FileText className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0">
        <h3 className="truncate font-black text-[#17396E]">{label}</h3>
        {document?.fileName ? (
          <p className="mt-0.5 truncate font-medium text-[#71839A]">
            {document.fileName}
          </p>
        ) : null}
      </div>
      {uploaded && document ? (
        <a
          href={portalDocumentDownloadHref(document.id)}
          className="inline-flex items-center gap-1 font-black text-[#00A64F]"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Uploaded
        </a>
      ) : (
        <span
          className={`inline-flex items-center gap-1 font-medium ${
            pending ? "text-[#FF7A00]" : "text-[#8A94A6]"
          }`}
        >
          {pending ? (
            <Clock3 className="h-3.5 w-3.5" />
          ) : (
            <CircleHelp className="h-3.5 w-3.5" />
          )}
          {status}
        </span>
      )}
    </article>
  );
}
