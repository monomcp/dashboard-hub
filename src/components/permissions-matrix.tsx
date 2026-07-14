import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Ban,
  Bot,
  Check,
  Clock,
  KeyRound,
  Loader2,
  Minus,
  User as UserIcon,
  X,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ApiError, apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import type {
  AccessCell,
  AccessMatrixPrincipal,
  AccessMatrixTool,
  AccessRuleInfo,
  Page,
  PrincipalType,
  Toolkit,
  ToolkitAccessMatrix,
  ToolkitAccessMode,
} from "@/lib/mcp-types";
import { lightPermissionsTheme, type PermissionsTheme } from "@/lib/permissions-theme";

// ─────────────────────────────────────────────────────────────────────────────
// Shared toolkit-permissions matrix.
//
// One component, two looks: Brand DNA (dark) and Content (light) both render this
// with a different `theme` and a different toolkit source. All the access logic —
// grant/revoke, per-tool allow / needs-approval / deny / inherit, the admin (403)
// handling, the "only with access" filter — lives here once.
// ─────────────────────────────────────────────────────────────────────────────

const ThemeContext = createContext<PermissionsTheme>(lightPermissionsTheme);
const useTheme = () => useContext(ThemeContext);

const ACCESS_META: Record<AccessCell, { label: string; icon: typeof Check }> = {
  allowed: { label: "Allowed", icon: Check },
  needs_approval: { label: "Needs approval", icon: Clock },
  blocked: { label: "Blocked", icon: Ban },
  denied: { label: "Denied", icon: X },
  no_access: { label: "No access", icon: Minus },
};

const PRINCIPAL_META: Record<PrincipalType, { label: string; icon: typeof UserIcon }> = {
  user: { label: "User", icon: UserIcon },
  agent: { label: "Agent", icon: Bot },
  service_account: { label: "Service", icon: Bot },
  api_client: { label: "API client", icon: KeyRound },
};

function AccessCellBadge({ value }: { value: AccessCell }) {
  const theme = useTheme();
  const meta = ACCESS_META[value];
  const Icon = meta.icon;
  return (
    <span className="grid place-items-center" title={meta.label} aria-label={meta.label}>
      <Icon className={cn("h-4 w-4", theme.access[value])} />
    </span>
  );
}

function hasAnyAccess(principal: AccessMatrixPrincipal): boolean {
  // A cell is non-"no_access" only when some grant path — the selected toolkit or
  // the identity's personal toolkit — actually admits the tool, so this covers both.
  return Object.values(principal.tools).some((cell) => cell !== "no_access");
}

type ToolRuleChoice = "inherit" | "allow" | "needs_approval" | "deny";
type MatrixOrientation = "principals" | "tools";

function ruleChoice(rule: AccessRuleInfo | undefined): ToolRuleChoice {
  if (!rule) return "inherit";
  if (rule.effect === "deny") return "deny";
  if (rule.permission === "needs_approval") return "needs_approval";
  return "allow";
}

function MenuButton({
  icon: Icon,
  iconClass,
  label,
  hint,
  active,
  danger,
  disabled,
  onClick,
}: {
  icon: typeof Check;
  iconClass?: string;
  label: string;
  hint?: string;
  active?: boolean;
  danger?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  const theme = useTheme();
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm transition",
        disabled
          ? "cursor-not-allowed opacity-50"
          : cn(theme.menuHover, danger && theme.menuDanger),
        active && theme.menuActiveBg,
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", iconClass)} />
      <span className="flex-1">{label}</span>
      {hint && <span className={cn("text-xs", theme.principalSub)}>{hint}</span>}
      {active && <Check className={cn("h-3.5 w-3.5", theme.menuCheck)} />}
    </button>
  );
}

function storedGrant(principal: AccessMatrixPrincipal): {
  hasGrant: boolean;
  mode: ToolkitAccessMode | null;
  enabled: boolean;
  viaPersonal: boolean;
} {
  if (principal.has_toolkit_access) {
    return {
      hasGrant: true,
      mode: principal.access_mode,
      enabled: principal.enabled,
      viaPersonal: false,
    };
  }
  if (principal.personal_access) {
    return {
      hasGrant: true,
      mode: principal.personal_access.access_mode,
      enabled: principal.personal_access.enabled,
      viaPersonal: true,
    };
  }
  return { hasGrant: false, mode: null, enabled: false, viaPersonal: false };
}

/** The switch is on only when every listed tool is actually reachable, so denying
 *  a single tool (or holding a partial grant) reads as "not all tools enabled". */
function allToolsEnabled(principal: AccessMatrixPrincipal): boolean {
  const cells = Object.values(principal.tools);
  return cells.length > 0 && cells.every((cell) => cell === "allowed" || cell === "needs_approval");
}

function GrantControl({
  principal,
  busy,
  onEnableAll,
  onRevoke,
}: {
  principal: AccessMatrixPrincipal;
  busy: boolean;
  onEnableAll: () => void;
  onRevoke: () => void;
}) {
  const theme = useTheme();
  const grant = storedGrant(principal);
  const allOn = allToolsEnabled(principal);
  return (
    <span
      className="inline-flex items-center gap-1.5"
      title={grant.viaPersonal ? "Access through this identity's personal toolkit" : undefined}
    >
      <span className={cn("text-xs", theme.principalSub)}>Enable all tools</span>
      {busy ? (
        <Loader2 className={cn("h-3.5 w-3.5 animate-spin", theme.loader)} />
      ) : (
        <Switch
          checked={allOn}
          disabled={busy}
          aria-label={`Enable all tools for ${principal.name}`}
          onCheckedChange={(checked) => (checked ? onEnableAll() : onRevoke())}
        />
      )}
    </span>
  );
}

function ToolAccessCell({
  rule,
  value,
  busy,
  editable,
  onChoose,
}: {
  rule: AccessRuleInfo | undefined;
  value: AccessCell;
  busy: boolean;
  editable: boolean;
  onChoose: (choice: ToolRuleChoice) => void;
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  if (!editable) {
    return (
      <span title="Grant toolkit access first" className="opacity-60">
        <AccessCellBadge value={value} />
      </span>
    );
  }
  const current = ruleChoice(rule);
  const pick = (choice: ToolRuleChoice) => {
    setOpen(false);
    onChoose(choice);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={busy}
          className={cn(
            "grid h-7 w-7 place-items-center rounded-lg transition disabled:opacity-50",
            theme.cellHover,
          )}
        >
          {busy ? (
            <Loader2 className={cn("h-4 w-4 animate-spin", theme.loader)} />
          ) : (
            <AccessCellBadge value={value} />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="center" className={theme.menuPanel}>
        <MenuButton
          icon={Check}
          iconClass={theme.menuIcon.allow}
          label="Allow"
          active={current === "allow"}
          onClick={() => pick("allow")}
        />
        <MenuButton
          icon={Clock}
          iconClass={theme.menuIcon.needs}
          label="Needs approval"
          hint="Soon"
          disabled
          active={current === "needs_approval"}
          onClick={() => pick("needs_approval")}
        />
        <MenuButton
          icon={X}
          iconClass={theme.menuIcon.deny}
          label="Deny"
          active={current === "deny"}
          onClick={() => pick("deny")}
        />
        {rule && (
          <>
            <div className={cn("my-1 h-px", theme.menuDivider)} />
            <MenuButton
              icon={Minus}
              iconClass={theme.menuIcon.muted}
              label="Inherit default"
              onClick={() => pick("inherit")}
            />
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

// Principal identity + its toolkit-grant pill. Shown as a row label in the
// "principals" orientation and as a column header in the "tools" orientation.
function PrincipalLabel({
  principal,
  busy,
  onEnableAll,
  onRevoke,
}: {
  principal: AccessMatrixPrincipal;
  busy: boolean;
  onEnableAll: () => void;
  onRevoke: () => void;
}) {
  const theme = useTheme();
  const meta = PRINCIPAL_META[principal.type];
  const PIcon = meta.icon;
  return (
    <div className="flex items-center gap-2.5">
      <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full", theme.avatarBg)}>
        <PIcon className={cn("h-4 w-4", theme.principalIcon)} />
      </span>
      <div className="min-w-0">
        <div className={cn("truncate font-medium", theme.principalName)}>{principal.name}</div>
        <div className={cn("mt-0.5 flex items-center gap-1.5 text-xs", theme.principalSub)}>
          <span>{meta.label}</span>
          <GrantControl
            principal={principal}
            busy={busy}
            onEnableAll={onEnableAll}
            onRevoke={onRevoke}
          />
        </div>
      </div>
    </div>
  );
}

export type PermissionsMatrixProps = {
  /** Toolkits whose access this matrix manages. Union of one or more servers. */
  toolkitIds: string[];
  /** Optional catalog/module slugs to show inside the selected toolkit. Omit for all tools. */
  moduleSlugs?: string[];
  /** Whether at least one backing MCP server is enabled. */
  enabled: boolean;
  theme: PermissionsTheme;
  /** Noun for the intro copy, e.g. "Brand DNA" or "Content". Omit for a generic toolkit page. */
  toolsNoun?: string;
  /** Stripped from tool headers, e.g. /^brand_/ or /^(cms|smm)_/. Omit to keep full names. */
  stripToolPrefix?: RegExp;
  /** Paragraph shown under the heading when nothing is enabled/connected. */
  disabledHint?: string;
  /** Centered text in the empty-state card. */
  connectHint?: string;
  onApiError: (err: unknown, fallback?: string) => void;
};

export function PermissionsMatrix({
  toolkitIds,
  moduleSlugs,
  enabled,
  theme,
  toolsNoun,
  stripToolPrefix,
  disabledHint = "No tools are available for this toolkit yet.",
  connectHint = "No toolkit is connected yet — enable an MCP server from the catalog.",
  onApiError,
}: PermissionsMatrixProps) {
  const [toolkitId, setToolkitId] = useState<string | null>(null);
  const [onlyWithAccess, setOnlyWithAccess] = useState(true);
  // "principals" → principals as rows, tools as columns (default).
  // "tools" → transposed: tools as rows, principals as columns.
  const [orientation, setOrientation] = useState<MatrixOrientation>("principals");
  const moduleScope = useMemo(
    () => [...new Set(moduleSlugs ?? [])].filter(Boolean).sort(),
    [moduleSlugs],
  );
  // This page shows one server's actions inside a toolkit that may hold several, so
  // grants and revokes here must speak only for the actions on screen.
  const scoped = moduleScope.length > 0;
  const toolkitMatrixQueryKey = useMemo(
    () => ["toolkit-access-matrix", toolkitId] as const,
    [toolkitId],
  );
  const matrixQueryKey = useMemo(
    () => [...toolkitMatrixQueryKey, moduleScope.join(",")] as const,
    [toolkitMatrixQueryKey, moduleScope],
  );
  const matrixPath = useMemo(() => {
    if (!toolkitId) return "";
    const params = new URLSearchParams();
    for (const slug of moduleScope) params.append("module_slug", slug);
    const query = params.toString();
    return `/api/v1/toolkits/${toolkitId}/access-matrix${query ? `?${query}` : ""}`;
  }, [toolkitId, moduleScope]);
  const { data: toolkitPage } = useQuery({
    queryKey: ["toolkits-list"],
    queryFn: () => apiRequest<Page<Toolkit>>("/api/v1/toolkits?sort=name&direction=asc&limit=200"),
    enabled: enabled && toolkitIds.length > 1,
    staleTime: 30 * 1000,
  });

  // Default to the first toolkit and keep the selection valid as data loads.
  useEffect(() => {
    if (toolkitIds.length > 0 && (!toolkitId || !toolkitIds.includes(toolkitId))) {
      setToolkitId(toolkitIds[0]);
    }
  }, [toolkitIds, toolkitId]);

  const { data, isLoading, error } = useQuery({
    queryKey: matrixQueryKey,
    queryFn: () => apiRequest<ToolkitAccessMatrix>(matrixPath),
    enabled: Boolean(toolkitId),
    staleTime: 30 * 1000,
  });
  const toolkitNameById = useMemo(() => {
    const names = new Map<string, string>();
    for (const toolkit of toolkitPage?.items ?? []) names.set(toolkit.id, toolkit.name);
    if (data) names.set(data.toolkit_id, data.toolkit_name);
    return names;
  }, [data, toolkitPage]);

  useEffect(() => {
    if (error) onApiError(error, "Could not load permissions");
  }, [error, onApiError]);

  const tools = data?.tools ?? [];
  const principals = useMemo(() => {
    const list = data?.principals ?? [];
    return onlyWithAccess ? list.filter(hasAnyAccess) : list;
  }, [data, onlyWithAccess]);

  const withAccessCount = useMemo(
    () => (data?.principals ?? []).filter(hasAnyAccess).length,
    [data],
  );

  const queryClient = useQueryClient();
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Run a grant/revoke call, then refetch the matrix. A 403 means the caller
  // isn't an admin — surface it inline rather than logging them out (only a
  // genuinely invalid token, 401, triggers the logout path).
  const runAction = useCallback(
    async (key: string, fn: () => Promise<unknown>) => {
      setBusyKey(key);
      setActionError(null);
      try {
        await fn();
        await queryClient.invalidateQueries({ queryKey: toolkitMatrixQueryKey });
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          onApiError(err);
          return;
        }
        setActionError(
          err instanceof ApiError && err.status === 403
            ? "You need admin access to change permissions."
            : err instanceof Error
              ? err.message
              : "Could not update access.",
        );
      } finally {
        setBusyKey(null);
      }
    },
    [queryClient, toolkitMatrixQueryKey, onApiError],
  );

  const bulkToolkitId = (principal: AccessMatrixPrincipal) =>
    principal.has_toolkit_access ? toolkitId : (principal.personal_access?.toolkit_id ?? toolkitId);

  // Any enabled grant keeps its tools individually editable, so a single tool can be
  // switched off after "Enable all tools" — which flips the header switch back off.
  const canEditIndividualTools = (principal: AccessMatrixPrincipal) => {
    const grant = storedGrant(principal);
    return grant.hasGrant && grant.enabled;
  };

  const setAccessMode = (principal: AccessMatrixPrincipal, accessMode: ToolkitAccessMode) => {
    const targetToolkitId = bulkToolkitId(principal);
    if (!targetToolkitId) return Promise.resolve();
    return runAction(`bulk:${principal.id}`, () =>
      apiRequest<unknown>(
        `/api/v1/identities/${principal.id}/toolkits/${targetToolkitId}/tool-rules`,
        {
          method: "PUT",
          body: JSON.stringify({
            enabled: true,
            module_slugs: moduleScope,
            access_mode: accessMode,
          }),
        },
      ),
    );
  };

  const revokeAccess = (principal: AccessMatrixPrincipal) => {
    const targetToolkitId = bulkToolkitId(principal);
    if (!targetToolkitId) return Promise.resolve();
    return runAction(`bulk:${principal.id}`, async () => {
      await apiRequest<unknown>(
        `/api/v1/identities/${principal.id}/toolkits/${targetToolkitId}/tool-rules`,
        {
          method: "PUT",
          body: JSON.stringify({ enabled: false, module_slugs: moduleScope }),
        },
      );
      // Dropping the grant would take every server in the toolkit with it, and a scoped
      // page only speaks for the one it lists. The API retires the grant itself once
      // nothing outside the scope is left to reach.
      if (!scoped) {
        await apiRequest<unknown>(
          `/api/v1/identities/${principal.id}/toolkit-access/${targetToolkitId}`,
          { method: "DELETE" },
        );
      }
    });
  };

  const setToolRule = (principalId: string, toolId: string, choice: ToolRuleChoice) =>
    runAction(`tr:${principalId}:${toolId}`, () => {
      if (choice === "inherit") {
        return apiRequest<unknown>(`/api/v1/identities/${principalId}/tool-rules/${toolId}`, {
          method: "DELETE",
        });
      }
      const body =
        choice === "deny"
          ? { mcp_tool_id: toolId, effect: "deny" }
          : {
              mcp_tool_id: toolId,
              effect: "allow",
              permission: choice === "needs_approval" ? "needs_approval" : "always_allow",
            };
      return apiRequest<unknown>(`/api/v1/identities/${principalId}/tool-rules`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
    });

  const toolLabel = (tool: AccessMatrixTool) =>
    stripToolPrefix ? tool.name.replace(stripToolPrefix, "") : tool.name;

  // One (principal, tool) access cell — identical in both orientations.
  const renderToolCell = (principal: AccessMatrixPrincipal, tool: AccessMatrixTool) => (
    <div className="flex justify-center">
      <ToolAccessCell
        rule={principal.rules[tool.id]}
        value={principal.tools[tool.id] ?? "no_access"}
        busy={busyKey === `tr:${principal.id}:${tool.id}`}
        editable={canEditIndividualTools(principal) && busyKey !== `bulk:${principal.id}`}
        onChoose={(choice) => setToolRule(principal.id, tool.id, choice)}
      />
    </div>
  );

  if (!enabled || toolkitIds.length === 0) {
    return (
      <ThemeContext.Provider value={theme}>
        <div className="grid content-start gap-4">
          <div className={theme.card}>
            <h1 className={cn("text-2xl font-normal tracking-tight", theme.headingText)}>
              Permissions
            </h1>
            <p className={cn("mt-2", theme.mutedText)}>{disabledHint}</p>
          </div>
          <div className={cn(theme.card, "grid place-items-center gap-2 py-12 text-center")}>
            <KeyRound className={cn("h-8 w-8", theme.emptyIcon)} />
            <p className={theme.mutedText}>{connectHint}</p>
          </div>
        </div>
      </ThemeContext.Provider>
    );
  }

  if (!toolkitId || isLoading) {
    return <PermissionsMatrixLoading theme={theme} />;
  }

  return (
    <ThemeContext.Provider value={theme}>
      <div className="grid content-start gap-4">
        <div className={theme.card}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className={cn("text-2xl font-normal tracking-tight", theme.headingText)}>
                Permissions
              </h1>
              <p className={cn("mt-2", theme.mutedText)}>
                Who can use the {toolsNoun} tools inside{" "}
                <span className={theme.accentText}>{data?.toolkit_name ?? "this toolkit"}</span>,
                and how each call is gated.
              </p>
            </div>
            {toolkitIds.length > 1 && (
              <select
                value={toolkitId ?? ""}
                onChange={(e) => setToolkitId(e.target.value)}
                className={cn("rounded-full px-3 py-1.5 text-sm outline-none", theme.selector)}
                aria-label="Select toolkit"
              >
                {toolkitIds.map((id) => (
                  <option key={id} value={id}>
                    {toolkitNameById.get(id) ?? id.slice(0, 8)}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div
            className={cn(
              "mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs",
              theme.legendText,
            )}
          >
            {(Object.keys(ACCESS_META) as AccessCell[]).map((key) => {
              const meta = ACCESS_META[key];
              const Icon = meta.icon;
              return (
                <span key={key} className="inline-flex items-center gap-1.5">
                  <Icon className={cn("h-3.5 w-3.5", theme.access[key])} />
                  {meta.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={cn("text-sm", theme.countText)}>
            {withAccessCount} of {data?.principals.length ?? 0} identities have access
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {(
                [
                  { id: "principals", label: "By identity" },
                  { id: "tools", label: "By tool" },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setOrientation(opt.id)}
                  title={
                    opt.id === "principals"
                      ? "Identities as rows, tools as columns"
                      : "Tools as rows, identities as columns"
                  }
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs transition",
                    orientation === opt.id ? theme.toggleActive : theme.toggleInactive,
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setOnlyWithAccess((v) => !v)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs transition",
                onlyWithAccess ? theme.toggleActive : theme.toggleInactive,
              )}
            >
              {onlyWithAccess ? "Showing with access" : "Showing everyone"}
            </button>
          </div>
        </div>

        {actionError && (
          <div className={cn("rounded-2xl px-4 py-3 text-sm", theme.actionError)}>
            {actionError}
          </div>
        )}

        <TooltipProvider delayDuration={200}>
          <div className={cn("overflow-x-auto rounded-3xl", theme.tableWrap)}>
            <table className="w-full border-collapse text-sm">
              {orientation === "principals" ? (
                <>
                  <thead className={cn("text-xs uppercase tracking-wide", theme.thead)}>
                    <tr>
                      <th
                        className={cn(
                          "sticky left-0 z-10 px-4 py-3 text-left font-medium",
                          theme.headerStickyBg,
                        )}
                      >
                        Identity
                      </th>
                      {tools.map((tool) => (
                        <th key={tool.id} className="px-3 py-3 text-center font-medium">
                          {tool.description ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="mx-auto block max-w-[120px] cursor-help truncate normal-case">
                                  {toolLabel(tool)}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                {tool.description}
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <span className="mx-auto block max-w-[120px] truncate normal-case">
                              {toolLabel(tool)}
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {principals.map((principal) => (
                      <tr key={principal.id} className={cn("border-t", theme.rowBorder)}>
                        <td className={cn("sticky left-0 z-10 px-4 py-3", theme.bodyStickyBg)}>
                          <PrincipalLabel
                            principal={principal}
                            busy={busyKey === `bulk:${principal.id}`}
                            onEnableAll={() => setAccessMode(principal, "full")}
                            onRevoke={() => revokeAccess(principal)}
                          />
                        </td>
                        {tools.map((tool) => (
                          <td key={tool.id} className="px-3 py-3 text-center">
                            {renderToolCell(principal, tool)}
                          </td>
                        ))}
                      </tr>
                    ))}
                    {principals.length === 0 && (
                      <tr>
                        <td
                          colSpan={tools.length + 1}
                          className={cn("px-4 py-10 text-center", theme.emptyText)}
                        >
                          {onlyWithAccess
                            ? "No identity has access to these tools yet."
                            : "No identities in this organization yet."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </>
              ) : (
                <>
                  <thead className={cn("text-xs uppercase tracking-wide", theme.thead)}>
                    <tr>
                      <th
                        className={cn(
                          "sticky left-0 z-10 px-4 py-3 text-left font-medium",
                          theme.headerStickyBg,
                        )}
                      >
                        Tool
                      </th>
                      {principals.map((principal) => (
                        <th
                          key={principal.id}
                          className="min-w-[180px] px-3 py-3 text-left font-medium normal-case"
                        >
                          <PrincipalLabel
                            principal={principal}
                            busy={busyKey === `bulk:${principal.id}`}
                            onEnableAll={() => setAccessMode(principal, "full")}
                            onRevoke={() => revokeAccess(principal)}
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {principals.length > 0 &&
                      tools.map((tool) => (
                        <tr key={tool.id} className={cn("border-t", theme.rowBorder)}>
                          <td
                            className={cn("sticky left-0 z-10 px-4 py-3", theme.bodyStickyBg)}
                            title={tool.description ?? tool.name}
                          >
                            <span
                              className={cn(
                                "block max-w-[260px] truncate font-medium",
                                theme.principalName,
                              )}
                            >
                              {toolLabel(tool)}
                            </span>
                            {tool.description && (
                              <span
                                className={cn(
                                  "mt-1 block max-w-[360px] whitespace-normal text-xs leading-snug",
                                  theme.principalSub,
                                )}
                              >
                                {tool.description}
                              </span>
                            )}
                          </td>
                          {principals.map((principal) => (
                            <td key={principal.id} className="px-3 py-3 text-center">
                              {renderToolCell(principal, tool)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    {(principals.length === 0 || tools.length === 0) && (
                      <tr>
                        <td
                          colSpan={principals.length + 1}
                          className={cn("px-4 py-10 text-center", theme.emptyText)}
                        >
                          {principals.length === 0
                            ? onlyWithAccess
                              ? "No identity has access to these tools yet."
                              : "No identities in this organization yet."
                            : "No tools in this toolkit yet."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </TooltipProvider>
      </div>
    </ThemeContext.Provider>
  );
}

export function PermissionsMatrixLoading({ theme }: { theme: PermissionsTheme }) {
  const sk = (className: string) => <Skeleton className={cn(theme.skeleton, className)} />;
  return (
    <div className="grid content-start gap-4" aria-label="Loading permissions">
      <div className={theme.card}>
        {sk("h-7 w-44 rounded-full")}
        <div className="mt-3">{sk("h-4 w-96 max-w-full rounded-full")}</div>
      </div>
      <div className="flex items-center justify-between gap-3">
        {sk("h-4 w-40 rounded-full")}
        {sk("h-8 w-36 rounded-full")}
      </div>
      <div className={cn("overflow-x-auto rounded-3xl", theme.tableWrap)}>
        <table className="w-full border-collapse text-sm">
          <thead className={cn("text-xs uppercase tracking-wide", theme.thead)}>
            <tr>
              <th className="px-4 py-3 text-left font-medium">Identity</th>
              {Array.from({ length: 5 }).map((_, index) => (
                <th key={index} className="px-3 py-3 text-center font-medium">
                  {sk("mx-auto h-4 w-20 rounded-full")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, rowIndex) => (
              <tr key={rowIndex} className={cn("border-t", theme.rowBorder)}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    {sk("h-8 w-8 rounded-full")}
                    <div className="space-y-2">
                      {sk("h-4 w-36 rounded-full")}
                      {sk("h-3 w-24 rounded-full")}
                    </div>
                  </div>
                </td>
                {Array.from({ length: 5 }).map((_, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-3">
                    {sk("mx-auto h-4 w-4 rounded-full")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
