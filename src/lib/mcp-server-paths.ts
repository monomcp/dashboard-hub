import type { CatalogServer } from "@/lib/mcp-types";

export function mcpServerPath(server: Pick<CatalogServer, "slug" | "configure_path">): string {
  return server.configure_path ?? "/mcp/registry";
}
