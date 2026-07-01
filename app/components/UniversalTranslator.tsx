"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

const CACHE_KEY = "ilm_translate_cache_v1";
const POSITION_KEY = "ilm_translate_position_v4";
const SUPPORTED = ["bn", "hi"] as const;
type Lang = (typeof SUPPORTED)[number];
type Position = { left: number; top: number };
type TextSegment = { text: string; protected: boolean };
type TranslatorInitialState = {
  position: Position | null;
  hasManualPosition: boolean;
  lang: Lang | null;
};

const PROTECTED_TERMS = [
  "ilmalink service line of ilmalink",
  "ilmaLink",
  "ilmaLink",
  "ilmalink",
  "ilmalink.com",
  "www.ilmalink.com",
  "NEET-UG",
  "NEET UG",
  "MCC",
  "NMC",
  "FMGE/NExT",
  "NExT",
  "FMGE",
  "FMGL",
  "WDOMS",
  "MECEE-BL",
  "NBEMS",
  "NTA",
  "DGME",
  "BM&DC",
  "BMDC",
  "MEC",
  "MBBS",
  "BDS",
  "AYUSH",
  "AIQ",
  "NRI",
  "PCB",
  "GPA",
  "INR",
  "WBMDFC",
  "NMDFC",
  "MILAN",
  "UG",
  "PG",
  "WHO",
];

const PROTECTED_PATTERN = new RegExp(
  [
    ...PROTECTED_TERMS.sort((a, b) => b.length - a.length).map((term) =>
      term.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
    ),
    "\\b[A-Z][A-Z0-9&./+-]{1,}\\b",
  ].join("|"),
  "g"
);

const CONTROL_HEIGHT = 42;
const CONTROL_MARGIN = 6;
const MOBILE_BREAKPOINT = 640;

function isVisible(node: Node) {
  if (!(node instanceof Text)) return false;
  const text = node.textContent?.trim();
  if (!text) return false;
  const parent = node.parentElement;
  if (!parent) return false;
  const tag = parent.tagName.toLowerCase();
  const excluded = new Set(["script", "style", "noscript", "textarea", "input", "code", "pre", "svg"]);
  if (excluded.has(tag)) return false;
  if (
    parent.closest(
      "[data-ilm-translator], [data-no-translate], [translate='no'], .notranslate, [contenteditable='true']"
    )
  ) {
    return false;
  }
  const style = window.getComputedStyle(parent);
  if (style && (style.display === "none" || style.visibility === "hidden")) return false;
  // don't translate pure URLs, emails, phones
  if (/https?:\/\//.test(text) || /\S+@\S+\.\S+/.test(text) || /\+?\d[\d\s()-]{3,}/.test(text)) return false;
  // ignore short tokens
  if (text.length < 2) return false;
  return true;
}

function shouldTranslateSegment(text: string) {
  return /[A-Za-z]/.test(text) && text.trim().length > 1;
}

function isSupportedLang(value: unknown): value is Lang {
  return typeof value === "string" && (SUPPORTED as readonly string[]).includes(value);
}

function splitProtectedText(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIndex = 0;
  PROTECTED_PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = PROTECTED_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), protected: false });
    }

    segments.push({ text: match[0], protected: true });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), protected: false });
  }

  return segments.length ? segments : [{ text, protected: false }];
}

function readCache(): Record<string, string> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeCache(cache: Record<string, string>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore
  }
}

function getControlWidth() {
  if (typeof window === "undefined") return 360;
  return window.innerWidth < 640
    ? window.innerWidth
    : Math.min(360, window.innerWidth - CONTROL_MARGIN * 2);
}

function getDefaultPosition(): Position {
  const width = getControlWidth();
  const sideMargin = window.innerWidth < MOBILE_BREAKPOINT ? 0 : CONTROL_MARGIN;

  return {
    left: Math.max(sideMargin, (window.innerWidth - width) / 2),
    top: window.innerHeight - CONTROL_HEIGHT,
  };
}

function clampPosition(position: Position): Position {
  const width = getControlWidth();
  const sideMargin = window.innerWidth < MOBILE_BREAKPOINT ? 0 : CONTROL_MARGIN;

  return {
    left: Math.max(sideMargin, Math.min(position.left, window.innerWidth - width - sideMargin)),
    top: Math.max(0, Math.min(position.top, window.innerHeight - CONTROL_HEIGHT)),
  };
}

function readSavedPosition(): Position | null {
  try {
    const raw = localStorage.getItem(POSITION_KEY);
    return raw ? clampPosition(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

function writePosition(position: Position) {
  try {
    localStorage.setItem(POSITION_KEY, JSON.stringify(position));
  } catch {
    // ignore
  }
}

function readInitialTranslatorState(): TranslatorInitialState {
  if (typeof window === "undefined") {
    return { position: null, hasManualPosition: false, lang: null };
  }

  const active = localStorage.getItem("ilm_active_lang");
  const savedPosition = readSavedPosition();

  return {
    position: savedPosition ?? getDefaultPosition(),
    hasManualPosition: !!savedPosition,
    lang: isSupportedLang(active) ? active : null,
  };
}

const subscribeToHydration = () => () => {};

export default function UniversalTranslator() {
  const pathname = usePathname();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  );
  const [initialTranslatorState] = useState(readInitialTranslatorState);
  const [position, setPosition] = useState<Position | null>(
    initialTranslatorState.position
  );
  const [hasManualPosition, setHasManualPosition] = useState(
    initialTranslatorState.hasManualPosition
  );
  const [lang, setLang] = useState<Lang | null>(initialTranslatorState.lang);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const observerRef = useRef<MutationObserver | null>(null);
  const nodeOriginals = useRef(new WeakMap<Node, string>());
  const debounceRef = useRef<number | null>(null);
  const dragRef = useRef(false);
  const dragMovedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const latestPositionRef = useRef<Position | null>(
    initialTranslatorState.position
  );
  const hasManualPositionRef = useRef(initialTranslatorState.hasManualPosition);
  const pointerOriginRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const isTranslatingRef = useRef(false);

  const runTranslate = useCallback(async (target: Lang) => {
    setError(null);
    setLoading(true);
    isTranslatingRef.current = true;
    try {
      const nodes: Text[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      let n: Node | null = walker.nextNode();
      while (n) {
        if (isVisible(n)) nodes.push(n as Text);
        n = walker.nextNode();
      }

      const nodePlans: { node: Text; segments: TextSegment[]; jobIndexes: (number | null)[] }[] = [];
      const jobs: string[] = [];

      nodes.forEach((node) => {
        if (!nodeOriginals.current.has(node)) {
          nodeOriginals.current.set(node, node.textContent ?? "");
        }

        const original = nodeOriginals.current.get(node) ?? node.textContent ?? "";
        const segments = splitProtectedText(original);
        const jobIndexes = segments.map((segment) => {
          if (segment.protected || !shouldTranslateSegment(segment.text)) return null;

          const jobIndex = jobs.length;
          jobs.push(segment.text);
          return jobIndex;
        });

        if (jobIndexes.some((jobIndex) => jobIndex !== null)) {
          nodePlans.push({ node, segments, jobIndexes });
        }
      });

      // chunk texts into batches
      const BATCH_ITEMS = 60;
      const BATCH_CHARACTERS = 7000;
      const cache = readCache();
      const results: (string | null)[] = new Array(jobs.length).fill(null);

      for (let i = 0; i < jobs.length;) {
        const chunk: string[] = [];
        const chunkIndices: number[] = [];
        let chunkCharacters = 0;

        while (i < jobs.length && chunk.length < BATCH_ITEMS) {
          const next = jobs[i];
          const nextLength = next.length;

          if (chunk.length && chunkCharacters + nextLength > BATCH_CHARACTERS) break;

          chunk.push(next);
          chunkIndices.push(i);
          chunkCharacters += nextLength;
          i++;
        }

        // check cache
        const toFetch: string[] = [];
        const toFetchIdx: number[] = [];
        chunk.forEach((t, k) => {
          const key = `${target}::${t}`;
          const jobIndex = chunkIndices[k];
          if (cache[key]) {
            results[jobIndex] = cache[key];
          } else {
            toFetch.push(t);
            toFetchIdx.push(jobIndex);
          }
        });

        if (toFetch.length) {
          const resp = await fetch("/api/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ texts: toFetch, target }),
          });
          if (!resp.ok) {
            const body = (await resp.json().catch(() => ({}))) as {
              error?: unknown;
              message?: unknown;
            };
            const message =
              typeof body.error === "string"
                ? body.error
                : typeof body.message === "string"
                  ? body.message
                  : "Translation provider error";
            throw new Error(message);
          }
          const data = (await resp.json()) as { translations?: unknown };
          const translations = Array.isArray(data.translations)
            ? data.translations
            : [];
          translations.forEach((translation, j) => {
            if (typeof translation !== "string") return;
            const idx = toFetchIdx[j];
            results[idx] = translation;
            cache[`${target}::${toFetch[j]}`] = translation;
          });
        }
      }

      writeCache(cache);

      // apply translations
      nodePlans.forEach((plan) => {
        const translated = plan.segments
          .map((segment, segmentIndex) => {
            if (segment.protected) return segment.text;
            const jobIndex = plan.jobIndexes[segmentIndex];
            return jobIndex === null ? segment.text : results[jobIndex] ?? segment.text;
          })
          .join("");

        if (plan.node.parentElement) {
          plan.node.nodeValue = translated;
          plan.node.parentElement.setAttribute("data-ilm-translated", target);
        }
      });

      setLoading(false);
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : err);
      setLoading(false);
      setError("Translation unavailable now");
    } finally {
      isTranslatingRef.current = false;
    }
  }, []);

  // keep the floating control responsive after initial localStorage hydration
  useEffect(() => {
    const handleResize = () => {
      setPosition((current) =>
        hasManualPositionRef.current ? clampPosition(current ?? getDefaultPosition()) : getDefaultPosition()
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    latestPositionRef.current = position;
  }, [position]);

  useEffect(() => {
    hasManualPositionRef.current = hasManualPosition;
  }, [hasManualPosition]);

  useEffect(() => {
    if (!lang) return;
    const timeoutId = window.setTimeout(() => {
      void runTranslate(lang);
    }, 220);
    return () => window.clearTimeout(timeoutId);
  }, [pathname, lang, runTranslate]);

  useEffect(() => {
    if (!lang) return;
    const obs = new MutationObserver(() => {
      if (isTranslatingRef.current) return;
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        void runTranslate(lang);
      }, 350);
    });
    observerRef.current = obs;
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => obs.disconnect();
  }, [lang, runTranslate]);

  async function handleSelect(t: string | null) {
    setError(null);
    if (!t) return;
    if (t === "en") {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      localStorage.removeItem("ilm_active_lang");
      localStorage.removeItem(POSITION_KEY);
      isTranslatingRef.current = false;
      setLoading(false);
      setLang(null);
      window.location.reload();
      return;
    }

    if (!isSupportedLang(t)) return;
    setLang(t);
    localStorage.setItem("ilm_active_lang", t);
  }

  const showEnglishRestore = !!lang;
  const leftAction = lang === "hi" ? "en" : "hi";
  const rightAction = lang === "bn" ? "en" : "bn";
  const leftLabel = lang === "hi" ? "Read in English" : "हिन्दी में पढ़ें";
  const rightLabel = lang === "bn" ? "Read in English" : "বাংলায় পড়ুন";

  const consumeSuppressedClick = () => {
    if (!suppressClickRef.current) return false;
    suppressClickRef.current = false;
    return true;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = true;
    dragMovedRef.current = false;
    pointerOriginRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: rect.left,
      top: rect.top,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || !pointerOriginRef.current) return;
    event.preventDefault();
    const origin = pointerOriginRef.current;
    const nextLeft = origin.left + (event.clientX - origin.x);
    const nextTop = origin.top + (event.clientY - origin.y);
    const hasMoved = Math.abs(event.clientX - origin.x) > 4 || Math.abs(event.clientY - origin.y) > 4;
    if (!hasMoved && !dragMovedRef.current) return;
    dragMovedRef.current = true;
    if (!hasManualPositionRef.current) {
      hasManualPositionRef.current = true;
      setHasManualPosition(true);
    }
    setPosition(clampPosition({ left: nextLeft, top: nextTop }));
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const moved = dragMovedRef.current;
    dragRef.current = false;
    dragMovedRef.current = false;
    pointerOriginRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (moved && latestPositionRef.current) writePosition(latestPositionRef.current);
    if (moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 50);
    }
  };

  if (!isHydrated || !position) return null;
  const translatorStyle: CSSProperties = hasManualPosition
    ? { left: position.left, top: position.top, width: getControlWidth() }
    : { bottom: 0, left: "50%", transform: "translateX(-50%)", width: getControlWidth() };

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        translate="no"
        data-ilm-translator
        className="fixed bottom-0 left-1/2 z-[2147483647] origin-bottom -translate-x-1/2 scale-[0.78] rounded-t-full bg-slate-950/90 px-2 py-0.5 text-[9px] font-bold text-white shadow-xl ring-1 ring-white/15 backdrop-blur-sm transition hover:bg-slate-800"
      >
        Translator/অনুবাদক
      </button>
    );
  }

  return (
    <div
      aria-hidden={false}
      translate="no"
      data-ilm-translator
      className="fixed z-[2147483647] touch-none select-none"
      style={translatorStyle}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="grid h-[42px] grid-cols-[2rem_1fr_1fr] overflow-hidden rounded-t-2xl border border-slate-200 bg-white/95 text-xs font-extrabold shadow-2xl backdrop-blur-sm sm:rounded-2xl">
        <button
          type="button"
          aria-label="Close translator"
          onClick={(event) => {
            if (consumeSuppressedClick()) return;
            event.stopPropagation();
            setVisible(false);
          }}
          className="flex h-full items-center justify-center border-r border-slate-200 bg-slate-100 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900"
        >
          <X size={14} />
        </button>
        <button
          type="button"
          aria-label={leftLabel}
          onClick={(event) => {
            if (consumeSuppressedClick()) return;
            event.stopPropagation();
            handleSelect(leftAction);
          }}
          className="h-full min-w-0 truncate border-r border-slate-200 bg-[#0EA5A4]/10 px-2 text-center text-[#064e3b] transition hover:bg-[#0EA5A4]/20 disabled:opacity-60"
          disabled={loading && leftAction !== "en"}
        >
          {leftLabel}
        </button>
        <button
          type="button"
          aria-label={rightLabel}
          onClick={(event) => {
            if (consumeSuppressedClick()) return;
            event.stopPropagation();
            handleSelect(rightAction);
          }}
          className="h-full min-w-0 truncate bg-[#00C896]/10 px-2 text-center text-[#065f4b] transition hover:bg-[#00C896]/20 disabled:opacity-60"
          disabled={loading && rightAction !== "en"}
        >
          {rightLabel}
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        {loading ? "Translating" : error ?? (showEnglishRestore ? "Translation active" : "Translator ready")}
      </span>
    </div>
  );
}
