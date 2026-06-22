export const SITE_OWNER_ADMIN_EMAIL =
  "injamulhoquemiddya@gmail.com";

export function isSiteOwnerAdminEmail(value: unknown) {
  return (
    typeof value === "string" &&
    value.trim().toLowerCase() === SITE_OWNER_ADMIN_EMAIL
  );
}
