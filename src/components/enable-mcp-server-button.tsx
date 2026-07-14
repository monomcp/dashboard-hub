import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  BadgeCheck,
  Bot,
  Check,
  ChevronDown,
  Globe2,
  Loader2,
  Lock,
  Plus,
  Power,
  Share2,
  Sparkles,
  User,
  X,
} from "lucide-react";
import {
  ConnectionEndpoints,
  HowToConnect,
  Section,
  ToolkitKindBadge,
  ToolkitSelectionIndicator,
  useActiveOrgId,
} from "@/components/mcp-connect";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ApiError, apiRequest } from "@/lib/api-client";
import { brandIcon } from "@/lib/brand-icons";
import {
  gatewayEndpoint,
  isMonoOwnedServer,
  type CatalogBadge,
  type CatalogServer,
  type NewToolkitKind,
  type Page,
  type ServerAuthMethod,
  type ServerConnectionSpec,
  type ServerConnectionType,
  type SetServerToolkitsRequest,
  type Toolkit,
} from "@/lib/mcp-types";
import { cn } from "@/lib/utils";

type Props = {
  /** Catalog server slug, e.g. "brand". */
  serverSlug: string;
  /** Whether this server's tools are already enabled for the org. */
  enabled: boolean;
  /** Toolkit ids that currently contain this server's tools. */
  toolkitIds: string[];
  /** Called after a successful change so the parent can refetch catalog state. */
  onEnabled?: () => void;
  /** Compact card treatment used by the MCP registry. */
  variant?: "default" | "registry";
};

/** Enable flow: overview → configure → toolkits. Manage flow starts at toolkits. */
type Step = "overview" | "configure" | "toolkits";

/** Working copy of the authorization settings edited on the configure step. */
type AuthDraft = {
  method: ServerAuthMethod;
  connectionType: ServerConnectionType;
  headerName: string;
  prefix: string;
  noPrefix: boolean;
  /** Blank keeps whatever shared token the API already stores. */
  token: string;
  /** Blank keeps whatever service-account key the API already stores. */
  saKey: string;
  saScopes: string;
  clientId: string;
  clientSecret: string;
};

const DEFAULT_DRAFT: AuthDraft = {
  method: "oauth",
  connectionType: "per_user",
  headerName: "Authorization",
  prefix: "",
  noPrefix: false,
  token: "",
  saKey: "",
  saScopes: "",
  clientId: "",
  clientSecret: "",
};

const AUTH_METHODS: { id: ServerAuthMethod; label: string; description: string }[] = [
  { id: "oauth", label: "OAuth", description: "Authorize via OAuth flow" },
  { id: "bearer", label: "Bearer Token", description: "Authorize with API key or token" },
  {
    id: "service_account",
    label: "Service Account",
    description: "Authorize with a provider-managed service account",
  },
  {
    id: "none",
    label: "No Authorization",
    description: "Server does not require authorization",
  },
];

const AUTH_METHOD_LABEL: Record<ServerAuthMethod, string> = {
  oauth: "OAuth",
  bearer: "Bearer Token",
  service_account: "Service Account",
  none: "No Authorization",
};

const BADGE_META: Record<CatalogBadge, { label: string; icon: typeof Globe2 }> = {
  official: { label: "Official", icon: BadgeCheck },
  remote: { label: "Remote", icon: Globe2 },
  monomcp: { label: "MonoMCP", icon: Sparkles },
};

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((id) => setB.has(id));
}

function draftFromServer(server: CatalogServer): AuthDraft {
  const connection = server.connection ?? null;
  const config = connection?.config ?? {};
  return {
    ...DEFAULT_DRAFT,
    method: connection?.auth_method ?? "oauth",
    connectionType: connection?.connection_type ?? "per_user",
    headerName:
      typeof config.header_name === "string" && config.header_name
        ? config.header_name
        : "Authorization",
    prefix: typeof config.prefix === "string" ? config.prefix : "",
    noPrefix: Boolean(config.no_prefix),
    saScopes: Array.isArray(config.scopes) ? (config.scopes as string[]).join(", ") : "",
    clientId: typeof config.client_id === "string" ? config.client_id : "",
  };
}

/** The write-side connection payload for the current draft. Secrets are only
 * included when (re)typed, so the API keeps the stored ones otherwise. */
function connectionSpecFromDraft(draft: AuthDraft): ServerConnectionSpec {
  if (draft.method === "none") {
    return { auth_method: "none", connection_type: "per_user", config: {} };
  }
  if (draft.method === "bearer") {
    const config: Record<string, unknown> = {
      header_name: draft.headerName.trim() || "Authorization",
    };
    if (draft.noPrefix) config.no_prefix = true;
    else if (draft.prefix) config.prefix = draft.prefix;
    const spec: ServerConnectionSpec = {
      auth_method: "bearer",
      connection_type: draft.connectionType,
      config,
    };
    if (draft.connectionType === "shared" && draft.token.trim()) {
      spec.secret = { token: draft.token.trim() };
    }
    return spec;
  }
  if (draft.method === "service_account") {
    const config: Record<string, unknown> = {};
    const scopes = draft.saScopes
      .split(",")
      .map((scope) => scope.trim())
      .filter(Boolean);
    if (scopes.length) config.scopes = scopes;
    const spec: ServerConnectionSpec = {
      auth_method: "service_account",
      // A provider-managed service account is inherently one shared credential.
      connection_type: "shared",
      config,
    };
    if (draft.saKey.trim()) {
      spec.secret = { service_account_key: JSON.parse(draft.saKey) };
    }
    return spec;
  }
  const config: Record<string, unknown> = {};
  if (draft.clientId.trim()) config.client_id = draft.clientId.trim();
  const spec: ServerConnectionSpec = {
    auth_method: "oauth",
    connection_type: draft.connectionType,
    config,
  };
  if (draft.clientSecret.trim()) spec.secret = { client_secret: draft.clientSecret.trim() };
  return spec;
}

export function EnableMcpServerButton({
  serverSlug,
  enabled,
  toolkitIds,
  onEnabled,
  variant = "default",
}: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const orgId = useActiveOrgId(open);
  const [step, setStep] = useState<Step>("toolkits");
  const [selected, setSelected] = useState<Set<string>>(() => new Set(toolkitIds));
  const [newName, setNewName] = useState("");
  const [newKind, setNewKind] = useState<NewToolkitKind>("shared");
  const [addingNew, setAddingNew] = useState(false);
  const [confirmDisable, setConfirmDisable] = useState(false);
  const [draft, setDraft] = useState<AuthDraft>(DEFAULT_DRAFT);
  // Whether the user has been through the configure step this session — only
  // then is a connection payload sent, so legacy servers aren't silently
  // stamped with defaults by a toolkit-only update.
  const [configTouched, setConfigTouched] = useState(false);
  const [configError, setConfigError] = useState<string | null>(null);
  const prefilled = useRef(false);

  // Reset the working state to the server's truth whenever the panel opens
  // or the enabled set changes underneath us.
  useEffect(() => {
    if (open) {
      setStep(enabled ? "toolkits" : "overview");
      setSelected(new Set(toolkitIds));
      setNewName("");
      setNewKind("shared");
      setAddingNew(false);
      setConfigTouched(false);
      setConfigError(null);
    }
  }, [open, enabled, toolkitIds]);

  // Full catalog entry: overview metadata (logo, badges, tools) + the org's
  // stored authorization settings for prefill.
  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog", "all"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    enabled: open,
    staleTime: 60 * 1000,
  });
  const server = useMemo(
    () => catalog?.find((s) => s.slug === serverSlug) ?? null,
    [catalog, serverSlug],
  );
  const hasStoredSecret = server?.connection?.has_secret ?? false;
  // MonoMCP's own servers manage authorization internally, so the "Configure"
  // step (and its authorization summary) is hidden for them.
  const isMonoOwnServer = server ? isMonoOwnedServer(server) : false;

  // Prefill the auth draft once per open, as soon as the catalog entry arrives.
  useEffect(() => {
    if (!open) {
      prefilled.current = false;
      return;
    }
    if (server && !prefilled.current) {
      prefilled.current = true;
      setDraft(draftFromServer(server));
    }
  }, [open, server]);

  const { data: toolkitPage, isLoading: toolkitsLoading } = useQuery({
    queryKey: ["toolkits"],
    queryFn: () => apiRequest<Page<Toolkit>>("/api/v1/toolkits?limit=200"),
    enabled: open,
    staleTime: 60 * 1000,
  });
  const toolkits = useMemo(() => toolkitPage?.items ?? [], [toolkitPage]);

  // Toolkits that currently expose this server — drive the Connection section.
  const enabledToolkits = useMemo(
    () => toolkits.filter((t) => toolkitIds.includes(t.id)),
    [toolkits, toolkitIds],
  );

  const reconcile = useMutation({
    mutationFn: (body: SetServerToolkitsRequest) =>
      apiRequest<unknown>(`/api/v1/mcp-catalog/${serverSlug}/toolkits`, {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mcp-catalog"] });
      queryClient.invalidateQueries({ queryKey: ["toolkits"] });
      setOpen(false);
      setConfirmDisable(false);
      setNewName("");
      setNewKind("shared");
      setAddingNew(false);
      onEnabled?.();
    },
  });

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const selectedIds = useMemo(() => [...selected], [selected]);
  const trimmedNew = newName.trim();
  const selectedCount = selected.size + (trimmedNew ? 1 : 0);
  const changed = !sameSet(selectedIds, toolkitIds) || trimmedNew !== "";
  const isUpdate = selectedCount >= 1 && (changed || configTouched);

  const apply = () => {
    const body: SetServerToolkitsRequest = {
      toolkit_ids: selectedIds,
      new_toolkits: trimmedNew ? [{ name: trimmedNew, kind: newKind }] : [],
    };
    if (configTouched) {
      try {
        body.connection = connectionSpecFromDraft(draft);
      } catch {
        // Malformed service-account JSON slipped past (back-arrow skips
        // validation) — send the user back to fix it instead of throwing.
        setConfigError("The service account key must be valid JSON.");
        setStep("configure");
        return;
      }
    }
    reconcile.mutate(body);
  };

  const disableServer = () => reconcile.mutate({ toolkit_ids: [], new_toolkits: [] });

  // Stage the typed new-toolkit name (created on apply) and collapse the input.
  const saveNew = () => {
    if (!newName.trim()) return;
    setAddingNew(false);
  };

  const cancelNew = () => {
    setNewName("");
    setNewKind("shared");
    setAddingNew(false);
  };

  const goConfigure = () => {
    setConfigTouched(true);
    setConfigError(null);
    setStep("configure");
  };

  // Install from overview: MonoMCP's own servers skip the configure step (and
  // never stamp a connection payload) and go straight to toolkit selection.
  const goInstall = () => {
    if (isMonoOwnServer) setStep("toolkits");
    else goConfigure();
  };

  /** Gate leaving the configure step on a coherent draft. */
  const validateConfigure = (): boolean => {
    if (draft.method === "service_account") {
      if (draft.saKey.trim()) {
        try {
          JSON.parse(draft.saKey);
        } catch {
          setConfigError("The service account key must be valid JSON.");
          return false;
        }
      } else if (!hasStoredSecret) {
        setConfigError("Paste the service account key JSON.");
        return false;
      }
    }
    if (
      draft.method === "bearer" &&
      draft.connectionType === "shared" &&
      !draft.token.trim() &&
      !hasStoredSecret
    ) {
      setConfigError("Enter the shared token.");
      return false;
    }
    setConfigError(null);
    return true;
  };

  const finishConfigure = () => {
    if (validateConfigure()) setStep("toolkits");
  };

  // Footer button: Enable (when off) / Update (changed, ≥1 selected) / Disable.
  let footerLabel: string;
  let footerAction: () => void;
  let footerDisabled = reconcile.isPending;
  let footerDanger = false;
  if (!enabled) {
    footerLabel = "Enable";
    footerAction = apply;
    footerDisabled = footerDisabled || selectedCount < 1;
  } else if (isUpdate) {
    footerLabel = "Update";
    footerAction = apply;
  } else {
    footerLabel = "Disable";
    footerAction = () => setConfirmDisable(true);
    footerDanger = true;
  }

  const errorMessage =
    reconcile.error instanceof ApiError
      ? reconcile.error.message
      : reconcile.error
        ? "Something went wrong. Please try again."
        : null;

  // The toolkit whose endpoint anchors the "How to connect" snippet.
  const primaryToolkit = enabledToolkits[0];

  // Fresh installs walk overview → configure → toolkits; manage mode starts at
  // toolkits and only dips into configure on demand.
  const freshFlow = !enabled;
  const totalSteps = isMonoOwnServer ? 2 : 3;
  const stepIndex = step === "overview" ? 1 : step === "configure" ? 2 : totalSteps;
  const backTarget: Step | null =
    step === "configure"
      ? freshFlow
        ? "overview"
        : "toolkits"
      : step === "toolkits" && freshFlow
        ? isMonoOwnServer
          ? "overview"
          : "configure"
        : null;

  const serverName = server?.name ?? serverSlug;

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {variant === "registry" ? (
            <button
              type="button"
              className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              aria-label={`${enabled ? "Manage" : "Enable"} ${serverSlug} MCP server`}
            >
              <span
                className={cn(
                  "relative block h-6 w-10 rounded-full transition-colors",
                  enabled ? "bg-emerald-500" : "bg-slate-200 group-hover:bg-slate-300",
                )}
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-[left,right]",
                    enabled ? "right-1" : "left-1",
                  )}
                />
              </span>
            </button>
          ) : enabled ? (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-200"
            >
              <Check className="h-4 w-4" />
              Enabled
              {enabledToolkits.length === 1 ? (
                <span className="font-normal text-emerald-600">· {enabledToolkits[0].name}</span>
              ) : toolkitIds.length > 0 ? (
                <span className="font-normal text-emerald-600">
                  · {toolkitIds.length} {toolkitIds.length === 1 ? "toolkit" : "toolkits"}
                </span>
              ) : null}
            </button>
          ) : (
            <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700" size="sm">
              <Power className="h-4 w-4" />
              Enable this MCP server
            </Button>
          )}
        </SheetTrigger>

        <SheetContent
          side="right"
          className="inset-y-2 right-2 flex h-auto w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden rounded-xl p-0 sm:max-w-xl"
        >
          {/* ── Header (per step) ─────────────────────────────────────────── */}
          {step === "overview" ? (
            <SheetHeader className="px-6 pb-0 pt-5 text-left">
              <SheetTitle className="sr-only">Enable {serverName}</SheetTitle>
              <SheetDescription className="sr-only">
                Review this MCP server, configure authorization, then choose toolkits.
              </SheetDescription>
            </SheetHeader>
          ) : (
            <SheetHeader className="border-b px-6 py-5 text-left">
              {backTarget && (
                <button
                  type="button"
                  onClick={() => setStep(backTarget)}
                  aria-label="Back"
                  className="-ml-1 mb-1 grid h-7 w-7 place-items-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              {step === "configure" ? (
                <>
                  <SheetTitle className="text-xl">Configure {serverName}</SheetTitle>
                  <SheetDescription>
                    Choose how users in your organization will connect to this MCP server.
                  </SheetDescription>
                </>
              ) : (
                <>
                  <SheetTitle className="text-xl">Connect to your MCP server</SheetTitle>
                  <SheetDescription>
                    Choose which toolkits expose these tools, then point your agent at the endpoint.
                  </SheetDescription>
                </>
              )}
              {freshFlow && (
                <p className="text-xs text-muted-foreground">
                  Step {stepIndex} of {totalSteps}
                </p>
              )}
            </SheetHeader>
          )}

          <div className="flex-1 overflow-y-auto [&>div:last-child]:border-b-0">
            {step === "overview" && <OverviewStep server={server} serverSlug={serverSlug} />}

            {step === "configure" && (
              <ConfigureStep
                draft={draft}
                setDraft={setDraft}
                hasStoredSecret={hasStoredSecret}
                error={configError}
              />
            )}

            {step === "toolkits" && (
              <>
                {/* ── Toolkit selection ─────────────────────────────────────── */}
                <Section
                  title="Toolkits"
                  hint="Select one or more toolkits to expose these tools, or create a new one. Click a selected toolkit to remove it."
                  stacked
                >
                  {toolkitsLoading ? (
                    <div className="grid gap-2 sm:grid-cols-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full rounded-lg" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-2 sm:grid-cols-3">
                      {toolkits.map((t) => {
                        const checked = selected.has(t.id);
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => toggle(t.id)}
                            aria-pressed={checked}
                            className={cn(
                              "group relative flex min-h-20 w-full flex-col items-start justify-between rounded-lg border p-3 pr-9 text-left text-sm transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                              checked
                                ? "border-foreground/30 bg-muted hover:bg-muted"
                                : "border-border bg-background hover:bg-muted/60",
                            )}
                          >
                            <span className="min-w-0 max-w-full">
                              <span className="block truncate font-medium text-foreground">
                                {t.name}
                              </span>
                              <span className="mt-1 block truncate text-xs text-muted-foreground">
                                /{t.slug}
                              </span>
                            </span>
                            <ToolkitKindBadge kind={t.kind} className="mt-2" />
                            <ToolkitSelectionIndicator
                              checked={checked}
                              className="absolute right-3 top-3"
                            />
                          </button>
                        );
                      })}

                      {/* Staged new toolkit (created on apply) — click to remove. */}
                      {trimmedNew && !addingNew && (
                        <button
                          type="button"
                          onClick={cancelNew}
                          aria-pressed="true"
                          className="relative flex min-h-20 w-full flex-col items-start justify-between rounded-lg border border-emerald-600/40 bg-emerald-50 p-3 pr-9 text-left text-sm transition hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          <span className="min-w-0 max-w-full">
                            <span className="block truncate font-medium text-foreground">
                              {trimmedNew}
                            </span>
                            <span className="mt-1 block text-xs text-emerald-700">
                              new {newKind === "agent" ? "agent" : "shared"} toolkit
                            </span>
                          </span>
                          <ToolkitKindBadge
                            kind={newKind === "agent" ? "personal_agent" : "shared"}
                            className="mt-2"
                          />
                          <ToolkitSelectionIndicator checked className="absolute right-3 top-3" />
                        </button>
                      )}

                      {addingNew ? (
                        <div className="flex min-h-20 w-full flex-col justify-center rounded-lg border bg-background p-3">
                          <Input
                            id="new-toolkit-name"
                            autoFocus
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                saveNew();
                              } else if (e.key === "Escape") {
                                cancelNew();
                              }
                            }}
                            placeholder="New toolkit name"
                            className="h-9"
                          />
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex h-9 overflow-hidden rounded-lg">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    type="button"
                                    size="sm"
                                    className="h-9 rounded-r-none border-r border-primary-foreground/30 px-2.5"
                                    aria-label="Choose toolkit type"
                                  >
                                    {newKind === "agent" ? (
                                      <Bot className="h-4 w-4" />
                                    ) : (
                                      <Share2 className="h-4 w-4" />
                                    )}
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  <DropdownMenuItem onSelect={() => setNewKind("shared")}>
                                    <Share2 />
                                    Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onSelect={() => setNewKind("agent")}>
                                    <Bot />
                                    Agent
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    disabled
                                    title="User toolkits are created from organization memberships"
                                  >
                                    <User />
                                    User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                              <Button
                                type="button"
                                size="sm"
                                className="h-9 rounded-l-none"
                                onClick={saveNew}
                                disabled={!newName.trim()}
                              >
                                Save
                              </Button>
                            </div>
                            <button
                              type="button"
                              onClick={cancelNew}
                              aria-label="Cancel"
                              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        !trimmedNew && (
                          <button
                            type="button"
                            onClick={() => setAddingNew(true)}
                            className="flex min-h-20 w-full items-center justify-center gap-2 rounded-lg border border-dashed bg-background p-3 text-sm text-muted-foreground transition hover:border-foreground/30 hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            <span className="grid h-5 w-5 place-items-center rounded-full border border-current">
                              <Plus className="h-3.5 w-3.5" />
                            </span>
                            <span className="font-medium">Add toolkit</span>
                          </button>
                        )
                      )}
                    </div>
                  )}
                  <Label htmlFor="new-toolkit-name" className="sr-only">
                    New toolkit name
                  </Label>

                  {errorMessage && <p className="pt-1 text-xs text-destructive">{errorMessage}</p>}
                  <Button
                    className={cn(
                      "mt-2 w-full rounded-full",
                      footerDanger &&
                        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    )}
                    onClick={footerAction}
                    disabled={footerDisabled}
                  >
                    {reconcile.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      footerLabel
                    )}
                  </Button>
                </Section>

                {/* ── Authorization summary ─────────────────────────────────── */}
                {!isMonoOwnServer && (
                  <Section
                    title="Authorization"
                    hint="How callers authorize against this server."
                    stacked
                  >
                    <div className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5">
                      <div className="flex min-w-0 items-center gap-2 text-sm">
                        <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate font-medium text-foreground">
                          {AUTH_METHOD_LABEL[draft.method]}
                        </span>
                        {draft.method !== "none" && (
                          <span className="truncate text-muted-foreground">
                            ·{" "}
                            {draft.connectionType === "shared"
                              ? "Shared credentials"
                              : "Per-user credentials"}
                          </span>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        onClick={goConfigure}
                      >
                        Edit
                      </Button>
                    </div>
                  </Section>
                )}

                {/* ── Connection ────────────────────────────────────────────── */}
                {enabledToolkits.length > 0 && orgId && (
                  <Section
                    title="Connection"
                    hint="The gateway endpoint for each enabled toolkit. Use this URL in your MCP client."
                    stacked
                  >
                    <ConnectionEndpoints orgId={orgId} toolkits={enabledToolkits} />
                  </Section>
                )}

                {/* ── How to connect ────────────────────────────────────────── */}
                {primaryToolkit && orgId && (
                  <Section
                    title="How to connect"
                    hint="Pick your MCP client, then add this server with the config below."
                    stacked
                  >
                    <HowToConnect
                      configKey={serverSlug}
                      url={gatewayEndpoint(orgId, primaryToolkit.id)}
                    />

                    {enabledToolkits.length > 1 && (
                      <p className="text-xs text-muted-foreground">
                        Shown for {primaryToolkit.name}; swap the URL for any endpoint above.
                      </p>
                    )}
                  </Section>
                )}
              </>
            )}
          </div>

          {/* ── Step footer (overview / configure) ─────────────────────────── */}
          {step === "overview" && (
            <div className="border-t px-6 py-4">
              <Button className="w-full rounded-full" onClick={goInstall} disabled={!server}>
                Enable
              </Button>
            </div>
          )}
          {step === "configure" && (
            <div className="flex gap-3 border-t px-6 py-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" className="flex-1 rounded-full" onClick={finishConfigure}>
                Continue
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirmDisable} onOpenChange={setConfirmDisable}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable this MCP server?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes this MCP server's tools from your toolkits and deletes its stored
              credentials. Clients using the gateway endpoint will no longer see these tools. You
              can re-enable it anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {errorMessage && <p className="text-xs text-destructive">{errorMessage}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={reconcile.isPending}>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                disableServer();
              }}
              disabled={reconcile.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {reconcile.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Yes"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/* ── Overview step ──────────────────────────────────────────────────────────── */

function OverviewLogo({ server }: { server: CatalogServer }) {
  const frameClass =
    "grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white";
  if (server.logo_url) {
    return (
      <div className={frameClass}>
        <img
          src={server.logo_url}
          alt={`${server.name} logo`}
          className="h-9 w-9 object-contain"
          loading="lazy"
        />
      </div>
    );
  }
  const icon = brandIcon(server.icon_key);
  if (icon) return <div className={frameClass}>{icon}</div>;
  return (
    <div
      className={cn(
        frameClass,
        "border-0 bg-gradient-to-br from-sky-500 to-indigo-600 text-lg font-semibold uppercase text-white",
      )}
    >
      {server.name.charAt(0)}
    </div>
  );
}

function OverviewStep({
  server,
  serverSlug,
}: {
  server: CatalogServer | null;
  serverSlug: string;
}) {
  if (!server) {
    return (
      <div className="space-y-4 px-6 py-5">
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-2xl" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <span className="sr-only">Loading {serverSlug}</span>
      </div>
    );
  }

  const badges = server.badges;

  return (
    <div className="px-6 py-5">
      <div className="flex flex-wrap items-center gap-3">
        <OverviewLogo server={server} />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">{server.name}</h3>
            {badges.map((badge) => {
              const { label, icon: Icon } = BADGE_META[badge];
              return (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  <Icon className="h-3 w-3" aria-hidden="true" />
                  {label}
                </span>
              );
            })}
            {server.connection && (
              <span className="inline-flex items-center gap-1 rounded-md border border-violet-200 bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700">
                <Lock className="h-3 w-3" aria-hidden="true" />
                {AUTH_METHOD_LABEL[server.connection.auth_method]}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{server.description}</p>

      <Collapsible className="mt-5">
        <CollapsibleTrigger className="group flex w-full items-center gap-2 rounded-md py-1 text-sm font-medium text-foreground transition hover:text-foreground/80">
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-data-[state=closed]:-rotate-90" />
          Additional details
          <span className="font-normal text-muted-foreground">
            · {server.tools.length} {server.tools.length === 1 ? "tool" : "tools"}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="mt-2 space-y-2 rounded-lg border bg-muted/30 p-3">
            {server.tools.map((tool) => (
              <li key={tool.name} className="text-xs">
                <span className="font-mono font-medium text-foreground">{tool.name}</span>
                <span className="ml-2 text-muted-foreground">{tool.description}</span>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

/* ── Configure step ─────────────────────────────────────────────────────────── */

function RadioRow({
  value,
  title,
  description,
}: {
  value: string;
  title: string;
  description: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <RadioGroupItem value={value} className="mt-0.5" />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-foreground">{title}</span>
        <span className="block text-sm text-muted-foreground">{description}</span>
      </span>
    </label>
  );
}

function ConfigureStep({
  draft,
  setDraft,
  hasStoredSecret,
  error,
}: {
  draft: AuthDraft;
  setDraft: React.Dispatch<React.SetStateAction<AuthDraft>>;
  hasStoredSecret: boolean;
  error: string | null;
}) {
  const patch = (partial: Partial<AuthDraft>) => setDraft((prev) => ({ ...prev, ...partial }));
  // Connection type is meaningless without credentials, and a provider-managed
  // service account is inherently one shared credential.
  const showConnectionType = draft.method === "oauth" || draft.method === "bearer";

  return (
    <>
      <Section title="Authorization Method" stacked>
        <RadioGroup
          value={draft.method}
          onValueChange={(value) =>
            patch({
              method: value as ServerAuthMethod,
              ...(value === "service_account" ? { connectionType: "shared" as const } : {}),
            })
          }
          className="gap-4"
        >
          {AUTH_METHODS.map((method) => (
            <RadioRow
              key={method.id}
              value={method.id}
              title={method.label}
              description={method.description}
            />
          ))}
        </RadioGroup>
      </Section>

      {showConnectionType && (
        <Section title="Connection Type" stacked>
          <RadioGroup
            value={draft.connectionType}
            onValueChange={(value) => patch({ connectionType: value as ServerConnectionType })}
            className="gap-4"
          >
            <RadioRow
              value="per_user"
              title="Per-user credentials"
              description="Each user authenticates individually"
            />
            <RadioRow
              value="shared"
              title="Shared credentials"
              description="One credential shared by every caller"
            />
          </RadioGroup>
        </Section>
      )}

      {draft.method === "bearer" && (
        <Section title="Bearer Token" stacked>
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="group flex items-center gap-1.5 rounded-md text-sm font-medium text-foreground">
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=closed]:-rotate-90" />
              Token header &amp; prefix
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="bearer-header-name" className="text-xs">
                    Header name
                  </Label>
                  <Input
                    id="bearer-header-name"
                    value={draft.headerName}
                    onChange={(e) => patch({ headerName: e.target.value })}
                    placeholder="Authorization"
                    className="h-9 font-mono text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bearer-prefix" className="text-xs">
                    Prefix
                  </Label>
                  <Input
                    id="bearer-prefix"
                    value={draft.prefix}
                    onChange={(e) => patch({ prefix: e.target.value })}
                    placeholder="Bearer "
                    disabled={draft.noPrefix}
                    className="h-9 font-mono text-xs"
                  />
                </div>
              </div>
              <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <Checkbox
                  checked={draft.noPrefix}
                  onCheckedChange={(checked) => patch({ noPrefix: checked === true })}
                />
                No prefix
              </label>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Prepended to your token. Include a trailing space if needed. Defaults to{" "}
                <code className="rounded bg-muted px-1">Bearer&nbsp;</code> when empty.
              </p>
            </CollapsibleContent>
          </Collapsible>

          {draft.connectionType === "shared" ? (
            <div className="space-y-1.5 pt-2">
              <Label htmlFor="bearer-token" className="text-xs">
                Value
              </Label>
              <Input
                id="bearer-token"
                type="password"
                autoComplete="off"
                value={draft.token}
                onChange={(e) => patch({ token: e.target.value })}
                placeholder={hasStoredSecret ? "•••••• (a token is stored)" : "Paste the token"}
                className="h-9 font-mono text-xs"
              />
              {hasStoredSecret && (
                <p className="text-xs text-muted-foreground">
                  Leave empty to keep the stored token.
                </p>
              )}
            </div>
          ) : (
            <p className="pt-2 text-sm italic text-muted-foreground">
              Each user provides their own token.
            </p>
          )}
        </Section>
      )}

      {draft.method === "service_account" && (
        <Section
          title="Service Account Key"
          hint="Keys are stored server-side and never returned to the browser. Scope this service account tightly to what this MCP should access."
          stacked
        >
          <Textarea
            value={draft.saKey}
            onChange={(e) => setDraft((prev) => ({ ...prev, saKey: e.target.value }))}
            placeholder='{"type":"service_account","project_id":"..."}'
            rows={6}
            className="font-mono text-xs"
          />
          {hasStoredSecret && !draft.saKey && (
            <p className="text-xs text-muted-foreground">
              A key is already stored; leave empty to keep it.
            </p>
          )}
          <div className="space-y-1.5 pt-2">
            <Label htmlFor="sa-scopes" className="text-xs">
              Scopes
            </Label>
            <Input
              id="sa-scopes"
              value={draft.saScopes}
              onChange={(e) => patch({ saScopes: e.target.value })}
              placeholder="Comma-separated scopes, e.g. https://www.googleapis.com/auth/drive.readonly"
              className="h-9 text-xs"
            />
          </div>
        </Section>
      )}

      {draft.method === "oauth" && (
        <Section title="OAuth Client" stacked>
          <Collapsible>
            <CollapsibleTrigger className="group flex items-center gap-1.5 rounded-md text-sm font-medium text-foreground">
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=closed]:-rotate-90" />
              OAuth Client Advanced Settings
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-3 space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="oauth-client-id" className="text-xs">
                    Client ID
                  </Label>
                  <Input
                    id="oauth-client-id"
                    value={draft.clientId}
                    onChange={(e) => patch({ clientId: e.target.value })}
                    placeholder="Optional — pre-registered OAuth client id"
                    className="h-9 font-mono text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="oauth-client-secret" className="text-xs">
                    Client secret
                  </Label>
                  <Input
                    id="oauth-client-secret"
                    type="password"
                    autoComplete="off"
                    value={draft.clientSecret}
                    onChange={(e) => patch({ clientSecret: e.target.value })}
                    placeholder={
                      hasStoredSecret ? "•••••• (a secret is stored)" : "Optional client secret"
                    }
                    className="h-9 font-mono text-xs"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Section>
      )}

      {error && <p className="px-6 pb-4 text-xs text-destructive">{error}</p>}
    </>
  );
}
