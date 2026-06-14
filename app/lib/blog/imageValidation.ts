// BLOG SYSTEM: Image validation for editorial media system.
// Accepts browser-recognized image files with a practical upload size limit.

export const COMMON_IMAGE_FORMATS = [
  "avif",
  "bmp",
  "gif",
  "heic",
  "heif",
  "ico",
  "jpeg",
  "jpg",
  "png",
  "svg",
  "tif",
  "tiff",
  "webp",
];
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
export const MAX_IMAGE_SIZE_LABEL = "5 MB";
export const UPLOAD_DIR = "uploads/blogs";

export type ImageValidationError =
  | "INVALID_FORMAT"
  | "FILE_TOO_LARGE"
  | "NO_FILE"
  | "UNKNOWN_ERROR";

export interface ImageValidationResult {
  valid: boolean;
  error?: ImageValidationError;
  message?: string;
}

/**
 * Validate image file on client side
 */
export function validateImageFile(file: File): ImageValidationResult {
  if (!file) {
    return { valid: false, error: "NO_FILE", message: "No file selected" };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return {
      valid: false,
      error: "FILE_TOO_LARGE",
      message: `File must be smaller than ${MAX_IMAGE_SIZE_LABEL} (currently ${formatFileSize(file.size)})`,
    };
  }

  if (!isImageFile(file.name, file.type)) {
    return {
      valid: false,
      error: "INVALID_FORMAT",
      message: "Please upload an image file.",
    };
  }

  return { valid: true };
}

export function getFileExtension(fileName: string, mimeType?: string): string {
  const extensionMatch = fileName.toLowerCase().match(/\.([a-z0-9]+)$/);
  const extension = extensionMatch?.[1] ?? "";

  if (COMMON_IMAGE_FORMATS.includes(extension)) {
    return extension;
  }

  return getExtensionFromMimeType(mimeType) ?? (extension || "img");
}

export function getExtensionFromMimeType(mimeType?: string): string | null {
  if (!mimeType?.startsWith("image/")) {
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

export function isImageFile(fileName: string, mimeType?: string): boolean {
  if (mimeType?.startsWith("image/")) {
    return true;
  }

  const extension = getFileExtension(fileName);
  return COMMON_IMAGE_FORMATS.includes(extension);
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
    png: "image/png",
    tif: "image/tiff",
    tiff: "image/tiff",
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
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
