"use client";
import { useEffect, useRef, useState } from "react";
import { Languages, Globe2, ChevronUp, Check, X } from "lucide-react";
import { usePathname } from "next/navigation";

const CACHE_KEY = "ilm_translate_cache_v1";
const POSITION_KEY = "ilm_translate_position_v1";
const SUPPORTED = ["bn", "hi"] as const;
type Lang = (typeof SUPPORTED)[number];
type Position = { left: number; top: number };

const PROTECTED_TERMS = [
  "ILMALINK",
  "ILMALINK MEDIGO",
  "ilmaLink",
  "ilmalink.com",
  "NEET",
  "NEET-UG",
  "NMC",
  "MCC",
  "FMGE",
  "NExT",
  "WDOMS",
  "MECEE-BL",
  "MEC",
  "MBBS",
  "BDS",
  "AIQ",
  "UG",
];

function isVisible(node: Node) {
  if (!(node instanceof Text)) return false;
  const text = node.textContent?.trim();
  if (!text) return false;
  const parent = node.parentElement;
  if (!parent) return false;
  const tag = parent.tagName.toLowerCase();
  const excluded = new Set(["script", "style", "noscript", "textarea", "input", "code", "pre", "svg"]);
  if (excluded.has(tag)) return false;
  const style = window.getComputedStyle(parent);
  if (style && (style.display === "none" || style.visibility === "hidden")) return false;
  // don't translate pure URLs, emails, phones
  if (/https?:\/\//.test(text) || /\S+@\S+\.\S+/.test(text) || /\+?\d[\d\s()-]{3,}/.test(text)) return false;
  // ignore short tokens
  if (text.length < 2) return false;
  return true;
}

function makePlaceholderMap(text: string) {
  const map: Record<string, string> = {};
  let i = 0;
  let out = text;
  for (const term of PROTECTED_TERMS) {
    const re = new RegExp(term.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "g");
    if (re.test(out)) {
      const key = `[[__PRT_${i}__]]`;
      out = out.replace(re, key);
      map[key] = term;
      i++;
    }
  }
  return { text: out, map };
}

function restorePlaceholders(text: string, map: Record<string, string>) {
  let out = text;
  for (const k of Object.keys(map)) out = out.replaceAll(k, map[k]);
  return out;
}

function readCache(): Record<string, string> {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function writeCache(cache: Record<string, string>) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch (e) {
    // ignore
  }
}

function readPosition(): Position {
  try {
    const raw = localStorage.getItem(POSITION_KEY);
    return raw ? JSON.parse(raw) : { left: 24, top: window.innerHeight - 180 };
  } catch (e) {
    return { left: 24, top: window.innerHeight - 180 };
  }
}

function writePosition(position: Position) {
  try {
    localStorage.setItem(POSITION_KEY, JSON.stringify(position));
  } catch (e) {
    // ignore
  }
}

export default function UniversalTranslator() {
  const pathname = usePathname();
  const [position, setPosition] = useState<Position | null>(null);
  const [lang, setLang] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const observerRef = useRef<MutationObserver | null>(null);
  const nodeOriginals = useRef(new WeakMap<Node, string>());
  const debounceRef = useRef<number | null>(null);
  const dragRef = useRef(false);
  const pointerOriginRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  // init from localStorage
  useEffect(() => {
    const active = localStorage.getItem("ilm_active_lang");
    if (active && (active === "bn" || active === "hi")) setLang(active);
    setPosition(readPosition());
  }, []);

  // observe route changes and re-run translation if needed
  useEffect(() => {
    if (!lang) return;
    const t = setTimeout(() => {
      runTranslate(lang as Lang);
    }, 220);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!lang) return;
    runTranslate(lang as Lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    // observe DOM mutations to translate dynamic content
    const obs = new MutationObserver((mutations) => {
      if (!lang) return;
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => runTranslate(lang as Lang), 350);
    });
    observerRef.current = obs;
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  async function runTranslate(target: Lang) {
    setError(null);
    setLoading(true);
    try {
      const nodes: Text[] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      let n: Node | null = walker.nextNode();
      while (n) {
        if (isVisible(n)) nodes.push(n as Text);
        n = walker.nextNode();
      }

      // prepare texts and placeholders
      const texts: string[] = [];
      const placeholderMaps: Record<number, Record<string, string>> = {};
      const nodeIndex: Node[] = [];
      nodes.forEach((node, idx) => {
        const original = node.textContent ?? "";
        nodeOriginals.current.set(node, original);
        const { text, map } = makePlaceholderMap(original);
        texts.push(text);
        if (Object.keys(map).length) placeholderMaps[idx] = map;
        nodeIndex.push(node);
      });

      // chunk texts into batches
      const BATCH = 60;
      const cache = readCache();
      const results: (string | null)[] = new Array(texts.length).fill(null);

      for (let i = 0; i < texts.length; i += BATCH) {
        const chunk = texts.slice(i, i + BATCH);
        const chunkIndices = Array.from({ length: chunk.length }, (_, k) => i + k);

        // check cache
        const toFetch: string[] = [];
        const toFetchIdx: number[] = [];
        chunk.forEach((t, k) => {
          const key = `${target}::${t}`;
          if (cache[key]) {
            results[i + k] = cache[key];
          } else {
            toFetch.push(t);
            toFetchIdx.push(i + k);
          }
        });

        if (toFetch.length) {
          const resp = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texts: toFetch, target }),
          });
          if (!resp.ok) {
            const body = await resp.json().catch(() => ({}));
            throw new Error(body?.message || 'Translation provider error');
          }
          const data = await resp.json();
          const { translations } = data;
          translations.forEach((tr: string, j: number) => {
            const idx = toFetchIdx[j];
            results[idx] = tr;
            cache[`${target}::${toFetch[j]}`] = tr;
          });
        }
      }

      writeCache(cache);

      // apply translations
      results.forEach((translated, idx) => {
        if (!translated) return;
        const node = nodeIndex[idx] as Text;
        const map = placeholderMaps[idx] || {};
        const restored = restorePlaceholders(translated, map);
        if (node && node.parentElement) {
          node.nodeValue = restored;
          node.parentElement.setAttribute('data-ilm-translated', target);
        }
      });

      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Translation failed');
    }
  }

  async function handleSelect(t: string | null) {
    setError(null);
    if (!t) return;
    if (t === 'en') {
      // restore originals
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
      let n: Node | null = walker.nextNode();
      while (n) {
        const original = nodeOriginals.current.get(n) as string | undefined;
        if (original && n.parentElement) {
          n.nodeValue = original;
          n.parentElement.removeAttribute('data-ilm-translated');
        }
        n = walker.nextNode();
      }
      localStorage.removeItem('ilm_active_lang');
      setLang(null);
      return;
    }

    if (t !== 'bn' && t !== 'hi') return;
    setLang(t);
    localStorage.setItem('ilm_active_lang', t);
  }

  const showEnglishRestore = !!lang;

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!position) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = true;
    pointerOriginRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: position.left,
      top: position.top,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || !pointerOriginRef.current) return;
    event.preventDefault();
    const origin = pointerOriginRef.current;
    const nextLeft = origin.left + (event.clientX - origin.x);
    const nextTop = origin.top + (event.clientY - origin.y);
    const clampedLeft = Math.max(12, Math.min(nextLeft, window.innerWidth - 320));
    const clampedTop = Math.max(12, Math.min(nextTop, window.innerHeight - 120));
    setPosition({ left: clampedLeft, top: clampedTop });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    dragRef.current = false;
    pointerOriginRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (position) writePosition(position);
  };

  if (!position) return null;
  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        className="fixed left-4 bottom-24 z-[2147483647] rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-slate-800 shadow-2xl ring-1 ring-slate-200 backdrop-blur-sm transition hover:bg-slate-100"
      >
        Open Translator
      </button>
    );
  }

  return (
    <div
      aria-hidden={false}
      className="fixed z-[2147483647] max-w-[calc(100vw-2rem)]"
      style={{ left: position.left, top: position.top }}
    >
      <div className="w-[min(22rem,calc(100vw-2rem))] rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-2xl backdrop-blur-sm">
        <div
          className="mb-3 flex cursor-grab items-center justify-between rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 shadow-inner"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <span>Drag to move</span>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[11px] text-slate-600">Translator</span>
            <button
              type="button"
              aria-label="Close translator"
              onClick={() => setVisible(false)}
              className="rounded-full p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              <X size={14} />
            </button>
          </div>
        </div>
        <div className="grid gap-2">
          {!showEnglishRestore && (
            <button
              aria-label="বাংলায় পড়ুন"
              onClick={() => handleSelect('bn')}
              className="w-full rounded-2xl bg-[#00C896]/10 px-3 py-2 text-sm font-semibold text-[#065f4b] transition hover:bg-[#00C896]/20"
            >
              বাংলা পড়ুন
            </button>
          )}
          {!showEnglishRestore && (
            <button
              aria-label="हिंदी में पढ़ें"
              onClick={() => handleSelect('hi')}
              className="w-full rounded-2xl bg-[#0EA5A4]/10 px-3 py-2 text-sm font-semibold text-[#064e3b] transition hover:bg-[#0EA5A4]/20"
            >
              हिंदी में पढ़ें
            </button>
          )}
          {showEnglishRestore && (
            <button
              aria-label="Read in English"
              onClick={() => handleSelect('en')}
              className="w-full rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-200"
            >
              Read in English
            </button>
          )}
        </div>
        {loading && (
          <div className="mt-3 rounded-2xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">Translating...</div>
        )}
        {error && (
          <div className="mt-3 rounded-2xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">Translation unavailable now</div>
        )}
      </div>
    </div>
  );
}
