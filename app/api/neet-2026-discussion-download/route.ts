import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const protectedDownload = new URL(
    "/api/neet-answer-key-download",
    request.url
  );
  protectedDownload.searchParams.set("resource", "all-codes-key");

  return Response.redirect(protectedDownload, 307);
}
