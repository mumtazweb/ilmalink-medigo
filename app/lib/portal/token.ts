import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

type PortalTokenKind =
  | "student"
  | "staff";

export type PortalTokenPayload = {
  v: 1;
  kind: PortalTokenKind;
  sub: string;
  role?: string;
  iat: number;
  exp: number;
  nonce: string;
};

function getPortalSecret() {
  const secret =
    process.env.PORTAL_SESSION_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "PORTAL_SESSION_SECRET must be configured with at least 32 characters."
    );
  }

  return secret;
}

function encode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function signature(encodedPayload: string) {
  return createHmac("sha256", getPortalSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createPortalToken(
  payload: Omit<PortalTokenPayload, "v" | "iat" | "nonce">,
  maxAgeSeconds: number
) {
  const now = Math.floor(Date.now() / 1000);
  const completePayload: PortalTokenPayload = {
    ...payload,
    v: 1,
    iat: now,
    exp: now + maxAgeSeconds,
    nonce: randomBytes(12).toString("base64url"),
  };
  const encodedPayload = encode(JSON.stringify(completePayload));
  return `${encodedPayload}.${signature(encodedPayload)}`;
}

export function verifyPortalToken(
  token: string | undefined | null,
  expectedKind?: PortalTokenKind
) {
  if (!token) return null;

  try {
    const [encodedPayload, providedSignature] = token.split(".");
    if (!encodedPayload || !providedSignature) return null;

    const expectedSignature = signature(encodedPayload);
    const providedBuffer = Buffer.from(providedSignature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      providedBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(providedBuffer, expectedBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as PortalTokenPayload;

    if (
      payload.v !== 1 ||
      payload.exp <= Math.floor(Date.now() / 1000) ||
      (expectedKind && payload.kind !== expectedKind)
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
