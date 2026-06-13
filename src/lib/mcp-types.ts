// Types + helpers for the MCP catalog ("Enable this MCP server") flow.
// Mirrors api/app/modules/mcp/schemas.py (CatalogServerResponse, ToolkitResponse,
// EnableServerRequest) and the gateway endpoint layout /{org}/{toolkit}/mcp.

export type ToolkitVisibility = "public" | "private";

export type CatalogTool = {
  name: string;
  description: string;
  handler: string;
};

export type CatalogServer = {
  slug: string;
  name: string;
  description: string;
  tools: CatalogTool[];
  // Org-specific state from GET /api/v1/mcp-catalog.
  enabled: boolean;
  toolkit_ids: string[];
};

export type Toolkit = {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  slug: string;
  visibility: ToolkitVisibility;
  tool_ids: string[];
  created_at: string;
  updated_at: string;
};

export type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

export type NewToolkit = {
  name: string;
  slug?: string;
  visibility?: ToolkitVisibility;
};

export type EnableServerRequest = {
  toolkit_id?: string;
  new_toolkit?: NewToolkit;
};

export type EnableServerResponse = Toolkit;

// Base URL of the MCP gateway (separate service from the API). Override per
// environment with VITE_GATEWAY_URL; defaults to the hosted stage gateway.
export const GATEWAY_BASE_URL: string =
  import.meta.env.VITE_GATEWAY_URL || "https://mcp-at97.onrender.com";

export function gatewayEndpoint(orgSlug: string, toolkitSlug: string): string {
  return `${GATEWAY_BASE_URL}/${orgSlug}/${toolkitSlug}/mcp`;
}
