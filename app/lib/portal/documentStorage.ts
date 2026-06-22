import "server-only";

import { randomUUID } from "crypto";
import { createReadStream } from "fs";
import { mkdir, unlink, writeFile } from "fs/promises";
import {
  dirname,
  extname,
  isAbsolute,
  join,
  relative,
  resolve,
} from "path";

const STORAGE_PREFIX = "portal-documents";

const configuredStorageRoot = process.env.PORTAL_DOCUMENT_UPLOAD_DIR?.trim();
const STORAGE_ROOT = configuredStorageRoot
  ? resolve(/* turbopackIgnore: true */ configuredStorageRoot)
  : join(
      /* turbopackIgnore: true */ process.cwd(),
      "private-assets",
      "portal-documents"
    );

const MIME_BY_EXTENSION: Record<string, string> = {
  ".avif": "image/avif",
  ".bmp": "image/bmp",
  ".csv": "text/csv; charset=utf-8",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".gif": "image/gif",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".ico": "image/x-icon",
  ".jfif": "image/jpeg",
  ".jpe": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".odp": "application/vnd.oasis.opendocument.presentation",
  ".ods": "application/vnd.oasis.opendocument.spreadsheet",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".rtf": "application/rtf",
  ".svg": "image/svg+xml",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".zip": "application/zip",
};

export function createPortalDocumentStorageKey(
  studentId: string,
  originalName: string
) {
  const safeName = sanitizeFileName(originalName);
  return `${STORAGE_PREFIX}/${studentId}/${Date.now()}-${randomUUID()}-${safeName}`;
}

export async function writePortalDocumentFile(storageKey: string, file: File) {
  const filePath = resolvePortalDocumentPath(storageKey);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, buffer);
}

export function createPortalDocumentReadStream(storageKey: string) {
  return createReadStream(resolvePortalDocumentPath(storageKey));
}

export async function deletePortalDocumentFile(storageKey: string) {
  try {
    await unlink(resolvePortalDocumentPath(storageKey));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

export function resolvePortalDocumentPath(storageKey: string) {
  const parts = storageKey.split("/");

  if (
    parts.length !== 3 ||
    parts[0] !== STORAGE_PREFIX ||
    parts.some((part) => !part)
  ) {
    throw new Error("Invalid document storage key.");
  }

  const filePath = resolve(STORAGE_ROOT, parts[1], parts[2]);
  const pathFromRoot = relative(STORAGE_ROOT, filePath);

  if (
    !pathFromRoot ||
    pathFromRoot.startsWith("..") ||
    isAbsolute(pathFromRoot)
  ) {
    throw new Error("Invalid document storage path.");
  }

  return filePath;
}

export function isPortalDocumentStorageKey(value: string | null | undefined) {
  return Boolean(value?.startsWith(`${STORAGE_PREFIX}/`));
}

export function portalDocumentMimeType(fileName: string | null | undefined) {
  if (!fileName) return "application/octet-stream";
  return MIME_BY_EXTENSION[extname(fileName).toLowerCase()] || "application/octet-stream";
}

export function portalDownloadContentDisposition(fileName: string | null) {
  const fallbackName = sanitizeFileName(fileName || "student-document");
  const asciiName = fallbackName.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "'");

  return `attachment; filename="${asciiName}"; filename*=UTF-8''${encodeRFC5987ValueChars(fallbackName)}`;
}

function sanitizeFileName(value: string) {
  const safeName = value
    .replace(/[\\/:*?"<>|\x00-\x1F]/g, "-")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);

  return safeName || "student-document";
}

function encodeRFC5987ValueChars(value: string) {
  return encodeURIComponent(value).replace(
    /['()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );
}
