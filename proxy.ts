import { NextRequest, NextResponse } from "next/server";

const canonicalSiteUrl = "https://www.ilmalink.com";

const oldAuthorUrl = /^\/author(\/|$)/i;

const oldLegacyUrls = /^\/(russianmarket|courses|key-function|area-of-operations)(\/|$)/i;

const oldLocalizedSearchUrl = /^\/(ar|bn|hi)\/search(\/|$)/i;

const oldSearchQueryLocales = /^\/(ar|bn|hi)\/?$/i;

const publicFileUrl = /((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/;

function needsTrailingSlash(pathname: string) {
  return !pathname.endsWith("/") && !publicFileUrl.test(pathname);
}

export function proxy(request: NextRequest) {
  const requestHost = request.headers.get("host") ?? request.nextUrl.host;

  if (requestHost.toLowerCase().includes("vercel.app")) {
    const redirectUrl = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      canonicalSiteUrl
    );

    return NextResponse.redirect(redirectUrl, 308);
  }

  const { pathname, searchParams } = request.nextUrl;

  if (needsTrailingSlash(pathname)) {
    const redirectUrl = new URL(request.url);
    redirectUrl.pathname = `${pathname}/`;

    return NextResponse.redirect(redirectUrl, 308);
  }

  const hasOldSearchQuery =
    searchParams.get("s") === "search_term_string" ||
    searchParams.get("s") === "{search_term_string}";

  const hasVideoSpamQuery =
    searchParams.has("playlist") ||
    searchParams.has("mute") ||
    searchParams.has("autoplay") ||
    searchParams.has("loop") ||
    searchParams.has("controls") ||
    searchParams.has("start") ||
    searchParams.has("end");

  const isOldAuthorPage = oldAuthorUrl.test(pathname);

  const isOldLegacyPage = oldLegacyUrls.test(pathname);

  const isOldSearchPage =
    hasOldSearchQuery ||
    oldLocalizedSearchUrl.test(pathname) ||
    (oldSearchQueryLocales.test(pathname) && hasOldSearchQuery);

  if (isOldAuthorPage || isOldSearchPage || isOldLegacyPage) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  if (hasVideoSpamQuery) {
    const cleanUrl = request.nextUrl.clone();
    cleanUrl.search = "";

    return NextResponse.redirect(cleanUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image).*)",
  ],
};
