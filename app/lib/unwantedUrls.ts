const BLOCKED_ROUTE_PREFIXES = [
  "/russianmarket",
  "/ultimateshop",
  "/blackbet",
  "/courses",
  "/key-function",
  "/area-of-operations",
  "/mode-of-operations",
  "/scholarship-info",
  "/career-roadmap",
  "/author",
  "/ar",
  "/bn",
  "/hi",
  "/login",
  "/create-account",
  "/forgot-password",
  "/reset-password",
  "/dashboard",
  "/wp-admin",
  "/wp-login",
  "/wp-login.php",
  "/xmlrpc.php",
  "/administrator",
  "/admin/login",
  "/user/login",
  "/casino",
  "/gambling",
  "/betting",
  "/adult",
  "/porn",
  "/escort",
] as const;

const UNWANTED_SLUG_SEGMENT_PATTERN =
  /(?:^|[-_])(russianmarket|russian-market|ultimateshop|ultimate-shop|blackbet|black-bet|casino|gambling|betting|adult|porn|escort|viagra|cialis|levitra|fullz|carding|dumps|ccv)(?:$|[-_])/i;

export const GOOGLE_SEARCH_CONSOLE_REMOVAL_URLS = [
  "https://www.ilmalink.com/russianmarket/",
  "https://www.ilmalink.com/ultimateshop/",
  "https://www.ilmalink.com/blackbet/",
  "https://www.ilmalink.com/courses/",
  "https://www.ilmalink.com/key-function/",
  "https://www.ilmalink.com/area-of-operations/",
  "https://www.ilmalink.com/mode-of-operations/",
  "https://www.ilmalink.com/scholarship-info/",
  "https://www.ilmalink.com/career-roadmap/",
  "https://www.ilmalink.com/author/",
  "https://www.ilmalink.com/ar/",
  "https://www.ilmalink.com/ar/search/",
  "https://www.ilmalink.com/bn/",
  "https://www.ilmalink.com/bn/search/",
  "https://www.ilmalink.com/hi/",
  "https://www.ilmalink.com/hi/search/",
  "https://www.ilmalink.com/login/",
  "https://www.ilmalink.com/create-account/",
  "https://www.ilmalink.com/forgot-password/",
  "https://www.ilmalink.com/reset-password/",
  "https://www.ilmalink.com/dashboard/",
] as const;

export function normalizePublicPath(value: string) {
  let pathname = value.trim();

  if (!pathname) {
    return "/";
  }

  if (/^https?:\/\//i.test(pathname)) {
    try {
      pathname = new URL(pathname).pathname;
    } catch {
      return "";
    }
  }

  pathname = pathname.split(/[?#]/, 1)[0] || "/";

  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  pathname = pathname.replace(/\/+$/, "");

  return (pathname || "/").toLowerCase();
}

export function hasUnwantedSlugSegment(value: string) {
  return value
    .split("/")
    .filter(Boolean)
    .some((segment) => UNWANTED_SLUG_SEGMENT_PATTERN.test(segment));
}

export function isBlockedPublicPath(value: string) {
  const pathname = normalizePublicPath(value);

  if (!pathname || pathname === "/") {
    return false;
  }

  if (BLOCKED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )) {
    return true;
  }

  return hasUnwantedSlugSegment(pathname);
}

export function isBlockedBlogSlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase().replace(/^\/+|\/+$/g, "");

  return (
    hasUnwantedSlugSegment(normalizedSlug) ||
    isBlockedPublicPath(`/blogs/${normalizedSlug}`)
  );
}
