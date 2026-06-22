export type PortalDocumentRequirement = {
  label: string;
  keys: readonly string[];
  excludeKeys?: readonly string[];
  optionalFor?: "abroad";
};

export type PortalDocumentListItem = {
  id: string;
  documentType: string;
  fileName: string | null;
  status: string;
  hasFile?: boolean;
  createdAt?: string | Date;
};

export const PORTAL_DOCUMENT_REQUIREMENTS: readonly PortalDocumentRequirement[] = [
  { label: "Class 10 Marksheet", keys: ["class 10", "10th"] },
  { label: "Class 12 Marksheet", keys: ["class 12", "12th"] },
  {
    label: "NEET Admit Card / Scorecard",
    keys: ["neet", "scorecard", "admit"],
  },
  {
    label: "Aadhaar / Passport ID",
    keys: ["aadhaar", "identity", "passport id"],
  },
  {
    label: "Passport (For Abroad)",
    keys: ["passport"],
    excludeKeys: ["passport id", "aadhaar"],
    optionalFor: "abroad",
  },
  { label: "Photo", keys: ["photo", "photograph"] },
  { label: "Signature", keys: ["signature"] },
  { label: "Category Certificate", keys: ["category", "caste"] },
  { label: "Domicile Certificate", keys: ["domicile"] },
] as const;

export const PORTAL_OTHER_DOCUMENT_LABEL = "Other Document";
export const PORTAL_DOCUMENT_ACCEPT = "image/*,application/pdf,.pdf";
export const PORTAL_DOCUMENT_MAX_BYTES = 25 * 1024 * 1024;

const PORTAL_IMAGE_EXTENSIONS = new Set([
  ".arw",
  ".avif",
  ".bmp",
  ".cr2",
  ".dng",
  ".gif",
  ".heic",
  ".heif",
  ".ico",
  ".jfif",
  ".jpe",
  ".jpeg",
  ".jpg",
  ".nef",
  ".png",
  ".raw",
  ".svg",
  ".tif",
  ".tiff",
  ".webp",
]);

export function isAbroadDocumentPath(
  preferredPath: string | null | undefined,
  preferredCountry: string | null | undefined
) {
  return Boolean(
    preferredCountry?.trim() ||
      preferredPath?.toLowerCase().includes("abroad")
  );
}

export function requirementApplies(
  requirement: PortalDocumentRequirement,
  preferredPath: string | null | undefined,
  preferredCountry: string | null | undefined
) {
  if (requirement.optionalFor !== "abroad") return true;
  return isAbroadDocumentPath(preferredPath, preferredCountry);
}

export function getRequiredPortalDocuments(
  preferredPath: string | null | undefined,
  preferredCountry: string | null | undefined
) {
  return PORTAL_DOCUMENT_REQUIREMENTS.filter((requirement) =>
    requirementApplies(requirement, preferredPath, preferredCountry)
  );
}

export function findMatchingPortalDocument<
  T extends Pick<PortalDocumentListItem, "documentType"> &
    Partial<Pick<PortalDocumentListItem, "hasFile">>
>(
  documents: T[],
  keys: readonly string[],
  excludeKeys: readonly string[] = []
) {
  return documents.find((document) => {
    if (document.hasFile === false) return false;

    const type = normalizeDocumentSearchText(document.documentType);
    const excluded = excludeKeys.some((key) =>
      type.includes(normalizeDocumentSearchText(key))
    );

    return (
      !excluded &&
      keys.some((key) => type.includes(normalizeDocumentSearchText(key)))
    );
  });
}

export function allRequiredPortalDocumentsUploaded(
  documents: PortalDocumentListItem[],
  preferredPath: string | null | undefined,
  preferredCountry: string | null | undefined
) {
  const required = getRequiredPortalDocuments(preferredPath, preferredCountry);

  return (
    required.length > 0 &&
    required.every((requirement) =>
      findMatchingPortalDocument(
        documents,
        requirement.keys,
        requirement.excludeKeys
      )
    )
  );
}

export function portalDocumentDownloadHref(documentId: string) {
  return `/api/portal/documents/${documentId}/download/`;
}

export function isSupportedPortalDocumentFile(file: {
  name: string;
  type: string;
}) {
  const mimeType = file.type.trim().toLowerCase();
  const extension = file.name
    .slice(file.name.lastIndexOf("."))
    .trim()
    .toLowerCase();

  return (
    mimeType.startsWith("image/") ||
    mimeType === "application/pdf" ||
    extension === ".pdf" ||
    PORTAL_IMAGE_EXTENSIONS.has(extension)
  );
}

function normalizeDocumentSearchText(value: string) {
  return value.toLowerCase().replace(/[_-]/g, " ").replace(/\s+/g, " ");
}
