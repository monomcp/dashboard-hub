// Types + helpers for the MCP catalog ("Enable this MCP server") flow.
// Mirrors api/app/modules/mcp/schemas.py (CatalogServerResponse, ToolkitResponse,
// EnableServerRequest) and the gateway endpoint layout /{org}/{toolkit}/mcp.

export type ToolkitVisibility = "public" | "private";

export type CatalogTool = {
  name: string;
  description: string;
  handler: string;
  input_schema?: Record<string, unknown>;
  version?: number;
};

export type CatalogServer = {
  slug: string;
  name: string;
  description: string;
  configure_path?: string | null;
  icon_key?: string | null;
  logo_url?: string | null;
  tools: CatalogTool[];
  recommended?: boolean;
  is_recommended?: boolean;
  category?: string;
  tags?: string[];
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

// ── Toolkit access matrix (GET /api/v1/toolkits/{id}/access-matrix) ──────────
// Mirrors api/app/modules/mcp/schemas.py ToolkitAccessMatrixResponse.

export type PrincipalType = "user" | "agent" | "service_account" | "api_client";
export type PrincipalStatus = "active" | "disabled" | "archived";
export type ToolkitAccessMode = "full" | "restricted";

// Effective per-(principal, tool) outcome — same resolution the gateway applies.
export type AccessCell = "allowed" | "needs_approval" | "blocked" | "denied" | "no_access";

export type AccessEffect = "allow" | "deny";
export type ToolPermission = "always_allow" | "needs_approval" | "blocked";

export type AccessMatrixTool = {
  id: string;
  name: string;
  description: string | null;
};

export type AccessRuleInfo = {
  effect: AccessEffect;
  permission: ToolPermission | null;
};

export type AccessMatrixPrincipal = {
  id: string;
  name: string;
  type: PrincipalType;
  status: PrincipalStatus;
  auth_user_id: string | null;
  has_toolkit_access: boolean;
  access_mode: ToolkitAccessMode | null;
  enabled: boolean;
  tools: Record<string, AccessCell>;
  // tool_id → the raw rule, present only for tools that have one.
  rules: Record<string, AccessRuleInfo>;
};

export type ToolkitAccessMatrix = {
  toolkit_id: string;
  toolkit_name: string;
  toolkit_slug: string;
  tools: AccessMatrixTool[];
  principals: AccessMatrixPrincipal[];
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

// Reconcile the exact set of toolkits exposing a server's tools
// (PUT /api/v1/mcp-catalog/{slug}/toolkits). An empty result disables the server.
export type SetServerToolkitsRequest = {
  toolkit_ids?: string[];
  new_toolkits?: NewToolkit[];
};

// ── Principals (GET/POST /api/v1/principals) ─────────────────────────────────
// Mirrors api/app/modules/mcp/schemas.py PrincipalResponse.
export type Principal = {
  id: string;
  organization_id: string;
  type: PrincipalType;
  auth_user_id: string | null;
  name: string;
  slug: string | null;
  status: PrincipalStatus;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  // Enabled toolkit grants, present only when fetched with `?include=toolkit_ids`.
  toolkit_ids?: string[] | null;
};

export type PrincipalCreate = {
  type?: PrincipalType;
  name: string;
  slug?: string;
  metadata?: Record<string, unknown>;
};

// ── API keys (GET/POST /api/v1/api-keys) ─────────────────────────────────────
// Mirrors api/app/modules/mcp/schemas.py ApiKeyResponse / ApiKeyCreated.
export type ApiKey = {
  id: string;
  organization_id: string;
  name: string;
  key_prefix: string;
  principal_id: string | null;
  created_by_user_id: string | null;
  last_used_at: string | null;
  expires_at: string | null;
  revoked_at: string | null;
  created_at: string;
  updated_at: string;
};

// The plaintext secret (`mmcp_…`) is present only in the POST response, once.
export type ApiKeyCreated = ApiKey & { secret: string };

export type ApiKeyCreate = {
  name: string;
  principal_id?: string;
  expires_at?: string;
};

// Base URL of the MCP gateway (separate service from the API). Override per
// environment with VITE_GATEWAY_URL; defaults to the hosted stage gateway.
export const GATEWAY_BASE_URL: string =
  import.meta.env.VITE_GATEWAY_URL || "https://mcp-at97.onrender.com";

export function gatewayEndpoint(orgSlug: string, toolkitSlug: string): string {
  return `${GATEWAY_BASE_URL}/${orgSlug}/${toolkitSlug}/mcp`;
}
