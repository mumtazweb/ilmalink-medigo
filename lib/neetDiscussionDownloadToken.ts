import { createHmac, timingSafeEqual } from "node:crypto";

type DownloadTokenPayload = {
  name: string;
  whatsapp: string;
  expiresAt: number;
};

const DEFAULT_LOCAL_SECRET =
  "local-neet-2026-discussion-download-secret-change-in-production";

function getSecret() {
  return (
    process.env.NEET_DISCUSSION_DOWNLOAD_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    DEFAULT_LOCAL_SECRET
  );
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function signaturesMatch(actual: string, expected: string) {
  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);

  return (
    actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer)
  );
}

export function createNeetDiscussionDownloadToken(input: {
  name: string;
  whatsapp: string;
  ttlMs?: number;
}) {
  const payload: DownloadTokenPayload = {
    name: input.name,
    whatsapp: input.whatsapp,
    expiresAt: Date.now() + (input.ttlMs ?? 30 * 60 * 1000),
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));

  return encodedPayload + "." + sign(encodedPayload);
}

export function verifyNeetDiscussionDownloadToken(token: string) {
  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  if (!signaturesMatch(signature, sign(encodedPayload))) {
    return null;
  }

  try {
    const payload = JSON.parse(
      decodeBase64Url(encodedPayload)
    ) as DownloadTokenPayload;

    if (!payload.name || !payload.whatsapp || payload.expiresAt < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
