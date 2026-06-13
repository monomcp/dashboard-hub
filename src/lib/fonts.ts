// Brand font catalog + on-demand Google Fonts loading.
//
// The catalog itself lives in the backend (`brand_fonts` table, served from
// GET /api/v1/brand/fonts). To render each option in its own typeface we inject
// a Google Fonts <link> at runtime, subset to just the glyphs the picker shows
// so pulling ~80 families stays cheap.

import { useEffect } from "react";
import { apiRequest } from "@/lib/api-client";

export type BrandFont = {
  id: string;
  family: string;
  category: string;
  variants: string[];
  popularity: number;
};

type Page<T> = { items: T[]; total: number; limit: number; offset: number };

export async function listFonts(
  params: { q?: string; category?: string; limit?: number; offset?: number } = {},
): Promise<Page<BrandFont>> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.category) search.set("category", params.category);
  search.set("limit", String(params.limit ?? 200));
  if (params.offset) search.set("offset", String(params.offset));
  return apiRequest<Page<BrandFont>>(`/api/v1/brand/fonts?${search.toString()}`);
}

// Module-level cache so every picker and preview shares a single fetch.
let catalogPromise: Promise<BrandFont[]> | null = null;

export function loadFontCatalog(): Promise<BrandFont[]> {
  if (!catalogPromise) {
    catalogPromise = listFonts({ limit: 300 })
      .then((page) => page.items)
      .catch((err) => {
        catalogPromise = null; // let the next open retry
        throw err;
      });
  }
  return catalogPromise;
}

// Glyphs needed to render "Aa" plus every family name shown in the picker.
const PREVIEW_SUBSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";

// A safe CSS font stack so the label stays legible before the webfont loads
// (or if it fails entirely).
export function fontStack(family: string): string {
  return `'${family.replace(/'/g, "")}', system-ui, sans-serif`;
}

export function googleFontsHref(families: string[], text?: string): string {
  const unique = [...new Set(families.map((f) => f.trim()).filter(Boolean))];
  if (!unique.length) return "";
  const family = unique
    .map((f) => `family=${encodeURIComponent(f).replace(/%20/g, "+")}`)
    .join("&");
  const textParam = text ? `&text=${encodeURIComponent(text)}` : "";
  return `https://fonts.googleapis.com/css2?${family}${textParam}&display=swap`;
}

// Injects (or updates) a single <link> pulling the given families from Google
// Fonts. Keyed so independent callers don't clobber one another; subset to the
// preview glyphs by default to keep the download tiny.
export function ensureGoogleFonts(
  families: string[],
  key: string,
  text: string | null = PREVIEW_SUBSET,
): void {
  if (typeof document === "undefined") return;
  const id = `gf-${key}`;
  const href = googleFontsHref(families, text ?? undefined);
  let link = document.getElementById(id) as HTMLLinkElement | null;
  if (!href) {
    link?.remove();
    return;
  }
  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  if (link.href !== href) link.href = href;
}

// React convenience wrapper around ensureGoogleFonts.
export function useGoogleFonts(
  families: string[],
  key: string,
  text: string | null = PREVIEW_SUBSET,
): void {
  const signature = families.join("|");
  useEffect(() => {
    ensureGoogleFonts(families, key, text);
    // families is derived from `signature`; tracking it separately is noise.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, key, text]);
}
