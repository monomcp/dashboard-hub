import type { CatalogServer } from "@/lib/mcp-types";

export function mcpServerPath(server: Pick<CatalogServer, "slug" | "configure_path">): string {
  if (server.slug === "docs") return "/docs";
  return server.configure_path ?? "/mcp/registry";
}
