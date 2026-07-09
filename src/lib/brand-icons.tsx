// Single source of truth for server / app brand icons, keyed by the backend
// `icon_key` (see api/app/modules/mcp/catalog.py). Both the MCP store catalog
// (`ServerLogo`) and the favourites menu (`AppsMenu`) render from this map so a
// brand glyph is defined exactly once. SVG assets live in /public/mcp-logos.
import type { ReactNode } from "react";
import { InstagramIcon } from "@/components/instagram-icon";
import { PinterestIcon } from "@/components/pinterest-icon";

export const BRAND_ICONS: Record<string, ReactNode> = {
  instagram: <InstagramIcon className="h-6 w-6" />,
  pinterest: <PinterestIcon className="h-6 w-6" />,
  duckduckgo: <img src="/mcp-logos/DuckDuckGo.svg" alt="" className="h-6 w-6" />,
  "brand-dna": <img src="/mcp-logos/brand-dna.svg" alt="" className="h-6 w-6" />,
  github: <img src="/mcp-logos/github.svg" alt="" className="h-6 w-6" />,
};

export function brandIcon(iconKey?: string | null): ReactNode | undefined {
  if (!iconKey) return undefined;
  return BRAND_ICONS[iconKey];
}
