// BLOG SYSTEM: Image validation for editorial media system.
// Supports only .webp and .svg formats with 100KB max size.

export const ALLOWED_IMAGE_FORMATS = ["webp", "svg"];
export const MAX_IMAGE_SIZE = 100 * 1024; // 100 KB
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

  // Check file size
  if (file.size > MAX_IMAGE_SIZE) {
    return {
      valid: false,
      error: "FILE_TOO_LARGE",
      message: `File must be smaller than 100 KB (currently ${(file.size / 1024).toFixed(1)} KB)`,
    };
  }

  // Check file format
  const fileName = file.name.toLowerCase();
  const extension = fileName.split(".").pop() || "";

  if (!ALLOWED_IMAGE_FORMATS.includes(extension)) {
    return {
      valid: false,
      error: "INVALID_FORMAT",
      message: `Only .webp and .svg formats allowed. You uploaded .${extension}`,
    };
  }

  return { valid: true };
}

/**
 * Get MIME type from file extension
 */
export function getMimeType(extension: string): string {
  const mimeTypes: Record<string, string> = {
    webp: "image/webp",
    svg: "image/svg+xml",
  };
  return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
}

/**
 * Generate unique filename with timestamp
 */
export function generateFileName(originalName: string): string {
  const extension = originalName.split(".").pop() || "webp";
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
