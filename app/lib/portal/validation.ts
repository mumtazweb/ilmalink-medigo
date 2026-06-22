import {
  STUDENT_INTERESTS,
  STUDENT_STATUSES,
  type StudentStatus,
} from "./constants";

export function normalizeIndianMobile(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, "");

  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `+91${digits}`;
  }

  if (
    digits.length === 12 &&
    digits.startsWith("91") &&
    /^[6-9]/.test(digits.slice(2))
  ) {
    return `+${digits}`;
  }

  return null;
}

export function normalizeEmail(value: unknown) {
  const email = String(value ?? "").trim().toLowerCase();

  if (!email) return null;
  if (email.length > 191) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  return email;
}

export function cleanText(value: unknown, maxLength = 191) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function cleanOptionalText(value: unknown, maxLength = 191) {
  const text = cleanText(value, maxLength);
  return text || null;
}

export function validatePassword(value: unknown) {
  const password = String(value ?? "");

  if (password.length < 8 || password.length > 128) {
    return {
      ok: false as const,
      message: "Password must contain 8 to 128 characters.",
    };
  }

  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return {
      ok: false as const,
      message: "Password must include at least one letter and one number.",
    };
  }

  return { ok: true as const, password };
}

export function normalizeInterests(value: unknown) {
  const requested = Array.isArray(value)
    ? value
    : String(value ?? "")
        .split(",")
        .map((item) => item.trim());

  return requested.filter((item): item is (typeof STUDENT_INTERESTS)[number] =>
    STUDENT_INTERESTS.includes(item as (typeof STUDENT_INTERESTS)[number])
  );
}

export function parseStoredInterests(value: string | null) {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as unknown;
    return normalizeInterests(parsed);
  } catch {
    return normalizeInterests(value);
  }
}

export function normalizeStudentStatus(value: unknown): StudentStatus | null {
  const status = cleanText(value, 40).toLowerCase();
  return STUDENT_STATUSES.includes(status as StudentStatus)
    ? (status as StudentStatus)
    : null;
}

export function maskMobile(value: string) {
  return `${value.slice(0, 3)}******${value.slice(-3)}`;
}

export function maskEmail(value: string) {
  const [name, domain] = value.split("@");
  if (!domain) return value;
  return `${name.slice(0, 2)}***@${domain}`;
}

export function normalizePortalReturnPath(value: unknown) {
  const returnPath = String(value ?? "").trim();

  if (
    !returnPath.startsWith("/neet") ||
    returnPath.startsWith("//") ||
    returnPath.includes("\\")
  ) {
    return "";
  }

  try {
    const url = new URL(returnPath, "https://www.ilmalink.com");
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "";
  }
}
