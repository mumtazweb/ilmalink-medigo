import { NextRequest, NextResponse } from "next/server";

const oldAuthorUrl = /^\/author(\/|$)/i;

const oldSearchUrl =
  /^\/(ar|bn|hi)?\/?search(\/|$)/i;

const oldSearchQueryLocales =
  /^\/(ar|bn|hi)\/?$/i;

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

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

  const isOldSearchPage =
    oldSearchUrl.test(pathname) ||
    hasOldSearchQuery ||
    (oldSearchQueryLocales.test(pathname) && hasOldSearchQuery);

  if (isOldAuthorPage || isOldSearchPage || hasVideoSpamQuery) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
