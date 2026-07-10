import type { CatalogServer } from "@/lib/mcp-types";

const SERVER_MODULE_PATHS: Record<string, string> = {
  brand: "/brand",
  calendar: "/calendar",
  cms: "/cms",
  contacts: "/contacts",
  content: "/content",
  database: "/database",
  drive: "/drive",
  duckduckgo: "/duckduckgo",
  email: "/email",
  firecrawl: "/firecrawl",
  github: "/github",
  instagram: "/instagram",
  pinterest: "/pinterest",
  postman: "/postman",
  smm: "/content",
  tasks: "/tasks/activity",
};

export function mcpServerPath(server: Pick<CatalogServer, "slug" | "configure_path">): string {
  return server.configure_path ?? SERVER_MODULE_PATHS[server.slug] ?? "/mcp/registry";
}
