// BLOG SYSTEM: Upload helpers for editorial media.
// The app does not enforce a file size or type cap; hosting/database limits may still apply.

export const UPLOAD_DIR = "uploads/blogs";

export type ImageValidationError =
  | "NO_FILE"
  | "UNKNOWN_ERROR";

export interface ImageValidationResult {
  valid: boolean;
  error?: ImageValidationError;
  message?: string;
}

/**
 * Validate upload selection on client side.
 */
export function validateImageFile(file: File): ImageValidationResult {
  if (!file) {
    return { valid: false, error: "NO_FILE", message: "No file selected" };
  }

  return { valid: true };
}

export function getFileExtension(fileName: string, mimeType?: string): string {
  const extensionMatch = fileName.toLowerCase().match(/\.([a-z0-9]+)$/);
  const extension = extensionMatch?.[1] ?? "";

  if (extension) {
    return extension;
  }

  return getExtensionFromMimeType(mimeType) ?? (extension || "img");
}

export function getExtensionFromMimeType(mimeType?: string): string | null {
  if (!mimeType?.includes("/")) {
    return null;
  }

  const subtype = mimeType.split("/")[1]?.split("+")[0]?.toLowerCase();

  if (!subtype) {
    return null;
  }

  if (subtype === "jpeg") {
    return "jpg";
  }

  if (subtype === "x-icon" || subtype === "vnd.microsoft.icon") {
    return "ico";
  }

  return subtype;
}

export function isVideoFile(urlOrName: string, mimeType?: string): boolean {
  return (
    mimeType?.startsWith("video/") === true ||
    /\.(mp4|m4v|mov|webm|ogg|ogv|avi|mkv)$/i.test(urlOrName) ||
    urlOrName.startsWith("data:video/")
  );
}

export function isImageFile(urlOrName: string, mimeType?: string): boolean {
  return (
    mimeType?.startsWith("image/") === true ||
    /\.(avif|bmp|gif|heic|heif|ico|jpe?g|png|svg|tiff?|webp)$/i.test(urlOrName) ||
    urlOrName.startsWith("data:image/")
  );
}

/**
 * Get MIME type from file extension
 */
export function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    avif: "image/avif",
    bmp: "image/bmp",
    gif: "image/gif",
    heic: "image/heic",
    heif: "image/heif",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    m4v: "video/mp4",
    mkv: "video/x-matroska",
    mov: "video/quicktime",
    mp4: "video/mp4",
    ogg: "video/ogg",
    ogv: "video/ogg",
    png: "image/png",
    tif: "image/tiff",
    tiff: "image/tiff",
    webm: "video/webm",
    webp: "image/webp",
    svg: "image/svg+xml",
  };
  return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
}

/**
 * Generate unique filename with timestamp
 */
export function generateFileName(originalName: string, mimeType?: string): string {
  const extension = getFileExtension(originalName, mimeType);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}.${extension}`;
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
