import { NextResponse } from "next/server";

type ReqBody = { texts: string[]; target: string; source?: string };

export async function POST(req: Request) {
  try {
    const body: ReqBody = await req.json();
    const { texts, target } = body;
    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ message: "No texts provided" }, { status: 400 });
    }
    if (!["bn", "hi"].includes(target)) {
      return NextResponse.json({ message: "Unsupported target" }, { status: 400 });
    }

    const provider = process.env.TRANSLATION_PROVIDER;
    if (!provider || provider !== "google" || !process.env.GOOGLE_TRANSLATE_API_KEY) {
      return NextResponse.json({ message: "Translation provider is not configured" }, { status: 501 });
    }

    // chunk to avoid giant requests
    const MAX_CHUNK = 100;
    const allTranslations: string[] = [];

    for (let i = 0; i < texts.length; i += MAX_CHUNK) {
      const chunk = texts.slice(i, i + MAX_CHUNK);
      const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_TRANSLATE_API_KEY}`;
      const payload = {
        q: chunk,
        target,
        source: "en",
        format: "text",
      };

      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const bodyText = await resp.text();
        return NextResponse.json({ message: `Provider error: ${bodyText}` }, { status: 502 });
      }

      const data = await resp.json();
      const translations = data?.data?.translations?.map((t: any) => t.translatedText) ?? [];
      allTranslations.push(...translations);
    }

    return NextResponse.json({ translations: allTranslations });
  } catch (err: any) {
    return NextResponse.json({ message: err?.message || "Server error" }, { status: 500 });
  }
}
