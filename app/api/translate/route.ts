import { NextResponse } from "next/server";

type ReqBody = { texts: unknown; target: unknown; source?: unknown };
type AzureLanguage = "bn" | "hi";
const SUPPORTED_TARGETS: AzureLanguage[] = ["bn", "hi"];
const MAX_TEXT_ITEMS = 80;
const MAX_TOTAL_CHARACTERS = 8000;

function isAzureLanguage(value: unknown): value is AzureLanguage {
  return typeof value === "string" && SUPPORTED_TARGETS.includes(value as AzureLanguage);
}

async function translateWithAzure(texts: string[], target: AzureLanguage, source = "en") {
  const key = process.env.AZURE_TRANSLATOR_KEY;
  const region = process.env.AZURE_TRANSLATOR_REGION;
  const endpoint = (process.env.AZURE_TRANSLATOR_ENDPOINT || "https://api.cognitive.microsofttranslator.com").replace(/\/+$/, "");

  if (!key || !region) {
    throw new Error("Translation provider is not configured");
  }

  const url = `${endpoint}/translate?api-version=3.0&from=${encodeURIComponent(source)}&to=${encodeURIComponent(target)}`;
  const body = texts.map((text) => ({ text }));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key,
      "Ocp-Apim-Subscription-Region": region,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const statusText = response.statusText || String(response.status);
    // Do not forward or log subscription key or Azure response bodies to clients.
    // Log a minimal server-side message for debugging (no secrets).
    console.error(`Azure Translator request failed: ${statusText}`);
    throw new Error("Azure translation failed");
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Azure Translator returned an unexpected response");
  }

  return data.map((item: any) => {
    const translation = item?.translations?.[0]?.text;
    return typeof translation === "string" ? translation : "";
  });
}

export async function POST(req: Request) {
  try {
    const body: ReqBody = await req.json();
    const { texts, target, source } = body;

    if (!Array.isArray(texts) || texts.length === 0 || !texts.every((item) => typeof item === "string")) {
      return NextResponse.json({ error: "texts must be an array of strings" }, { status: 400 });
    }

    if (!isAzureLanguage(target)) {
      return NextResponse.json({ error: "Unsupported target language" }, { status: 400 });
    }

    if (texts.length > MAX_TEXT_ITEMS) {
      return NextResponse.json({ error: `Request too large: max ${MAX_TEXT_ITEMS} text items` }, { status: 400 });
    }

    const totalCharacters = texts.reduce((sum, item) => sum + item.length, 0);
    if (totalCharacters > MAX_TOTAL_CHARACTERS) {
      return NextResponse.json({ error: `Request too large: max ${MAX_TOTAL_CHARACTERS} total characters` }, { status: 400 });
    }

    const provider = typeof process.env.TRANSLATION_PROVIDER === "string" ? process.env.TRANSLATION_PROVIDER.toLowerCase() : "azure";
    const selectedSource = typeof source === "string" ? source : "en";

    if (provider === "azure") {
      const translations = await translateWithAzure(texts, target, selectedSource);
      return NextResponse.json({ translations });
    }

    return NextResponse.json({ error: "Translation provider is not configured" }, { status: 503 });
  } catch (error: any) {
    const message = error?.message || "Server error";
    if (message.includes("Translation provider is not configured")) {
      return NextResponse.json({ error: message }, { status: 503 });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
