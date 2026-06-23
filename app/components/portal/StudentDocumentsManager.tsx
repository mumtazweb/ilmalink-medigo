"use client";

import { upload } from "@vercel/blob/client";
import {
  CheckCircle2,
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
  PORTAL_DOCUMENT_MAX_LABEL,
  PORTAL_OTHER_DOCUMENT_LABEL,
  findMatchingPortalDocument,
  getPortalDocumentUploadProgress,
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
  blobUploadsEnabled,
  uploadPathPrefix,
}: {
  documents: StudentDocumentView[];
  preferredPath: string;
  preferredCountry: string | null;
  blobUploadsEnabled: boolean;
  uploadPathPrefix: string;
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
  const [uploadProgress, setUploadProgress] = useState(0);
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
  const documentProgress = useMemo(
    () =>
      getPortalDocumentUploadProgress(
        uploadedDocuments,
        preferredPath,
        preferredCountry
      ),
    [preferredCountry, preferredPath, uploadedDocuments]
  );
  const matchedChecklistDocumentIds = useMemo(
    () =>
      new Set(
        checklistRows
          .map((row) => row.document?.id)
          .filter((id): id is string => Boolean(id))
      ),
    [checklistRows]
  );
  const additionalDocuments = useMemo(
    () =>
      uploadedDocuments.filter(
        (document) => !matchedChecklistDocumentIds.has(document.id)
      ),
    [matchedChecklistDocumentIds, uploadedDocuments]
  );
  const statusText = documentProgress.complete
    ? `Uploaded ${documentProgress.uploaded}/${documentProgress.total}`
    : `${documentProgress.pending}/${documentProgress.total} pending`;

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
      setMessage(`The document must be ${PORTAL_DOCUMENT_MAX_LABEL} or smaller.`);
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
    setUploadProgress(0);
    try {
      const response = blobUploadsEnabled
        ? await uploadDocumentToBlob(selectedFile, {
            documentType,
            customDocumentType,
            note,
            uploadPathPrefix,
            onProgress: setUploadProgress,
          })
        : await uploadDocumentToServer(selectedFile, {
            documentType,
            customDocumentType,
            note,
          });
      const data = await readUploadResponse(response);

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
      setUploadProgress(0);
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
              <h2 className="text-xl font-black text-[#082A62]">
                Upload documents
              </h2>
              <p className="mt-1 text-sm font-medium leading-6 text-[#60738F]">
                Uploaded {documentProgress.uploaded}/{documentProgress.total}
                {" "}documents - {documentProgress.pending}/
                {documentProgress.total} pending
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF3FF] px-3 py-1.5 text-xs font-black text-[#0B4AA2]">
            {documentProgress.complete ? (
              <CheckCircle2 className="h-4 w-4 text-[#08A776]" />
            ) : (
              <Clock3 className="h-4 w-4 text-[#D4840A]" />
            )}
            {statusText}
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
              {checklistRows.map(({ requirement, document }) => (
                <option key={requirement.label} value={requirement.label}>
                  {requirement.label}
                  {document ? " (Uploaded)" : ""}
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
              Images and PDFs up to {PORTAL_DOCUMENT_MAX_LABEL}. Large files
              upload directly and securely.
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
            {busy && uploadProgress > 0
              ? `Uploading ${uploadProgress}%`
              : "Upload"}
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
        id="documents-checklist"
        className="scroll-mt-24 rounded-2xl border border-[#D8E4EF] bg-white p-4 shadow-[0_7px_18px_rgba(8,42,98,.045)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-black text-[#082A62]">
            Documents checklist
          </h2>
          <span className="rounded-full bg-[#F4F8FC] px-3 py-1.5 text-xs font-black text-[#17396E]">
            {statusText}
          </span>
        </div>
        <div className="mt-3 grid gap-2">
          {requiredRows.map(({ requirement, document }) => (
            <ChecklistRow
              key={requirement.label}
              label={requirement.label}
              document={document}
              status={document ? "Uploaded" : "Pending"}
            />
          ))}
        </div>
        {additionalDocuments.length ? (
          <div className="mt-4 border-t border-[#E4EBF2] pt-4">
            <p className="mb-2 text-xs font-black uppercase tracking-[.12em] text-[#71839A]">
              Other documents
            </p>
            <div className="grid gap-2">
              {additionalDocuments.map((document) => (
                <ChecklistRow
                  key={document.id}
                  label={document.documentType}
                  document={document}
                  status="Uploaded"
                />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}

type UploadFields = {
  documentType: string;
  customDocumentType: string;
  note: string;
};

async function uploadDocumentToBlob(
  file: File,
  fields: UploadFields & {
    uploadPathPrefix: string;
    onProgress: (progress: number) => void;
  }
) {
  const blob = await upload(
    createPortalBlobPath(fields.uploadPathPrefix, file.name),
    file,
    {
      access: "private",
      contentType: file.type || undefined,
      handleUploadUrl: "/api/portal/student/documents/upload/",
      multipart: file.size > 5 * 1024 * 1024,
      onUploadProgress(event) {
        fields.onProgress(Math.round(event.percentage));
      },
    }
  );

  return fetch("/api/portal/student/documents/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      documentType: fields.documentType,
      customDocumentType: fields.customDocumentType,
      note: fields.note,
      fileName: file.name,
      fileType: file.type,
      blobUrl: blob.url,
      blobPathname: blob.pathname,
    }),
  });
}

function uploadDocumentToServer(file: File, fields: UploadFields) {
  const formData = new FormData();
  formData.set("documentType", fields.documentType);
  formData.set("customDocumentType", fields.customDocumentType);
  formData.set("note", fields.note);
  formData.set("file", file);

  return fetch("/api/portal/student/documents/", {
    method: "POST",
    body: formData,
  });
}

async function readUploadResponse(response: Response) {
  const rawResponse = await response.text();
  let data: { ok?: boolean; message?: string } = {};

  if (rawResponse) {
    try {
      data = JSON.parse(rawResponse) as typeof data;
    } catch {
      if (
        response.status === 413 ||
        /request entity too large|function_payload_too_large/i.test(rawResponse)
      ) {
        data.message =
          "This file is too large for the upload server. Please try a smaller file.";
      } else {
        data.message = `Document upload failed (server response ${response.status}).`;
      }
    }
  }

  return data;
}

function createPortalBlobPath(prefix: string, fileName: string) {
  const safeFileName =
    fileName
      .replace(/[\\/:*?"<>|\x00-\x1F]/g, "-")
      .replace(/\s+/g, "-")
      .slice(-140) || "student-document";

  return `${prefix}${crypto.randomUUID()}-${safeFileName}`;
}

function ChecklistRow({
  label,
  document,
  status,
}: {
  label: string;
  document?: PortalDocumentListItem;
  status: "Uploaded" | "Pending";
}) {
  const uploaded = status === "Uploaded";

  return (
    <article className="grid gap-3 rounded-xl border border-[#E0E8F0] bg-[#F9FBFD] p-3 text-xs sm:grid-cols-[22px_1fr_auto] sm:items-center">
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
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E7F8F2] px-2 py-1 font-black text-[#087A60]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Uploaded
          </span>
          <a
            href={portalDocumentDownloadHref(document.id)}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-[#BFD3E8] bg-white px-2.5 font-black text-[#0B4AA2]"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
        </div>
      ) : (
        <span className="inline-flex items-center gap-1 font-medium text-[#FF7A00] sm:justify-self-end">
          <Clock3 className="h-3.5 w-3.5" />
          {status}
        </span>
      )}
    </article>
  );
}
