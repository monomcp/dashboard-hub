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

export type CatalogBadge = "official" | "remote" | "monomcp";

// How the org's callers authorize against the upstream MCP server.
export type ServerAuthMethod = "oauth" | "bearer" | "service_account" | "none";
// per_user ⇒ each caller authenticates individually; shared ⇒ one org credential.
export type ServerConnectionType = "per_user" | "shared";

// Read side: GET /api/v1/mcp-catalog. Secrets never leave the API — only has_secret.
export type ServerConnection = {
  auth_method: ServerAuthMethod;
  connection_type: ServerConnectionType;
  config: Record<string, unknown>;
  has_secret: boolean;
};

// Write side, sent with the enable/reconcile calls. `secret` undefined/null keeps
// whatever the API already stores, so updates don't force re-typing tokens.
export type ServerConnectionSpec = {
  auth_method: ServerAuthMethod;
  connection_type: ServerConnectionType;
  config?: Record<string, unknown>;
  secret?: Record<string, unknown> | null;
};

export type CatalogServer = {
  slug: string;
  name: string;
  description: string;
  configure_path?: string | null;
  icon_key?: string | null;
  logo_url?: string | null;
  // Optional while clients roll out alongside older API deployments.
  badges?: CatalogBadge[];
  tools: CatalogTool[];
  recommended?: boolean;
  is_recommended?: boolean;
  category?: string;
  tags?: string[];
  // Org-specific state from GET /api/v1/mcp-catalog.
  enabled: boolean;
  toolkit_ids: string[];
  connection?: ServerConnection | null;
};

// Derived server-side from the toolkit's owner: `shared` toolkits are hand-curated
// and grantable to many principals, while each `personal_*` toolkit belongs to the
// single identity of that type.
export type ToolkitKind =
  | "shared"
  | "personal_user"
  | "personal_agent"
  | "personal_service_account"
  | "personal_api_client";

export type Toolkit = {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  slug: string;
  visibility: ToolkitVisibility;
  tool_ids: string[];
  kind: ToolkitKind;
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

export type MatrixPersonalAccess = {
  toolkit_id: string;
  access_mode: ToolkitAccessMode;
  enabled: boolean;
};

export type AccessMatrixPrincipal = {
  id: string;
  name: string;
  type: PrincipalType;
  status: PrincipalStatus;
  auth_user_id: string | null;
  has_toolkit_access: boolean;
  // Present when the identity reaches ≥1 of these tools through its own personal
  // toolkit. Editing this grant (full/restricted/revoke) targets its toolkit_id,
  // not the toolkit the matrix is scoped to.
  personal_access: MatrixPersonalAccess | null;
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

// `agent` also creates the agent identity that owns the new toolkit. There is no
// `user`: a personal_user toolkit belongs to a human, and those identities come from
// org memberships, not from naming a toolkit.
export type NewToolkitKind = "shared" | "agent";

export type NewToolkit = {
  name: string;
  slug?: string;
  visibility?: ToolkitVisibility;
  kind?: NewToolkitKind;
};

export type EnableServerRequest = {
  toolkit_id?: string;
  new_toolkit?: NewToolkit;
  connection?: ServerConnectionSpec;
};

export type EnableServerResponse = Toolkit;

// Reconcile the exact set of toolkits exposing a server's tools
// (PUT /api/v1/mcp-catalog/{slug}/toolkits). An empty result disables the server.
export type SetServerToolkitsRequest = {
  toolkit_ids?: string[];
  new_toolkits?: NewToolkit[];
  connection?: ServerConnectionSpec;
};

// ── Identities (GET/POST /api/v1/identities) ─────────────────────────────────
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
  // Reachable MCP servers, present only when fetched with `?include=mcp_servers`.
  mcp_servers?: PrincipalMcpServer[] | null;
  // False for the active user's identity and organization-owner identities.
  can_delete: boolean;
};

export type PrincipalMcpServer = {
  slug: string;
  name: string;
  icon_key: string | null;
  logo_url: string | null;
  tool_count: number;
};

export type PrincipalCreate = {
  type?: PrincipalType;
  name: string;
  slug?: string;
  metadata?: Record<string, unknown>;
};

// PATCH /api/v1/identities/{id}. Every field is optional; only what's sent changes.
export type PrincipalUpdate = {
  name?: string;
  slug?: string;
  status?: PrincipalStatus;
  metadata?: Record<string, unknown>;
};

// ── Toolkit access grants (GET/PUT/DELETE /api/v1/identities/{id}/toolkit-access) ──
// Mirrors api/app/modules/mcp/schemas.py ToolkitAccessResponse.
export type ToolkitAccess = {
  id: string;
  organization_id: string;
  principal_id: string;
  toolkit_id: string;
  access_mode: ToolkitAccessMode;
  enabled: boolean;
  constraints: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type ToolkitAccessUpsert = {
  toolkit_id: string;
  access_mode?: ToolkitAccessMode;
  enabled?: boolean;
  constraints?: Record<string, unknown>;
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
