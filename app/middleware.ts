import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Routes that should return HTTP 410 (Gone) instead of 404.
 * These are spam/hacked URLs or old template pages that were removed
 * and should not be re-crawled by search engines.
 */
const GONE_ROUTES = [
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
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path matches any gone route (exact match or sub-path)
  if (
    GONE_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    return new NextResponse(null, {
      status: 410,
      statusText: "Gone",
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, jpg, jpeg, gif, webp, pdf, ico)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|ico)$).*)",
  ],
};