import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  Copy,
  Loader2,
  MessageCircle,
  PawPrint,
  Plus,
  Power,
  Terminal,
  X,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ApiError, apiRequest } from "@/lib/api-client";
import {
  gatewayEndpoint,
  type Page,
  type SetServerToolkitsRequest,
  type Toolkit,
} from "@/lib/mcp-types";
import { cn } from "@/lib/utils";

type Membership = {
  organization_id: string;
  organization_name: string;
  organization_slug: string;
  role: string;
};
type MeResponse = { memberships: Membership[] };

type Props = {
  /** Catalog server slug, e.g. "brand". */
  serverSlug: string;
  /** Whether this server's tools are already enabled for the org. */
  enabled: boolean;
  /** Toolkit ids that currently contain this server's tools. */
  toolkitIds: string[];
  /** Called after a successful change so the parent can refetch catalog state. */
  onEnabled?: () => void;
};

function useActiveOrgSlug(): string | null {
  const { data } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiRequest<MeResponse>("/api/v1/auth/me"),
    staleTime: 5 * 60 * 1000,
  });
  const memberships = data?.memberships ?? [];
  const storedOrgId =
    typeof window !== "undefined" ? localStorage.getItem("organization_id") : null;
  const active = memberships.find((m) => m.organization_id === storedOrgId) ?? memberships[0];
  return active?.organization_slug ?? null;
}

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((id) => setB.has(id));
}

/** Anthropic / Claude mark. */
function ClaudeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
    </svg>
  );
}

type McpClientId = "claude" | "codex" | "openclaw" | "chatgpt";

const MCP_CLIENTS: {
  id: McpClientId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "claude", label: "Claude", icon: ClaudeIcon },
  { id: "codex", label: "Codex", icon: Terminal },
  { id: "openclaw", label: "Openclaw", icon: PawPrint },
  { id: "chatgpt", label: "ChatGPT", icon: MessageCircle },
];

/** A monospace value row with a copy-to-clipboard button (Supabase-style). */
function CopyRow({
  value,
  copied,
  onCopy,
}: {
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
      <span className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">{value}</span>
      <button
        type="button"
        onClick={onCopy}
        title="Copy"
        className="shrink-0 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

/** Left-label / right-content row used for each panel section. */
function Section({
  title,
  hint,
  stacked,
  children,
}: {
  title: string;
  hint?: string;
  /** Render the label full width above the content instead of side-by-side. */
  stacked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid gap-3 border-b px-6 py-5", !stacked && "sm:grid-cols-[180px_1fr]")}>
      <div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="min-w-0 space-y-2">{children}</div>
    </div>
  );
}

export function EnableMcpServerButton({ serverSlug, enabled, toolkitIds, onEnabled }: Props) {
  const queryClient = useQueryClient();
  const orgSlug = useActiveOrgSlug();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(() => new Set(toolkitIds));
  const [newName, setNewName] = useState("");
  const [addingNew, setAddingNew] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [confirmDisable, setConfirmDisable] = useState(false);
  const [client, setClient] = useState<McpClientId>("claude");

  // Reset the working selection to the server's truth whenever the panel opens
  // or the enabled set changes underneath us.
  useEffect(() => {
    if (open) {
      setSelected(new Set(toolkitIds));
      setNewName("");
      setAddingNew(false);
    }
  }, [open, toolkitIds]);

  const { data: toolkitPage, isLoading: toolkitsLoading } = useQuery({
    queryKey: ["toolkits"],
    queryFn: () => apiRequest<Page<Toolkit>>("/api/v1/toolkits?limit=200"),
    enabled: open || enabled,
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
  const isUpdate = selectedCount >= 1 && changed;

  const apply = () =>
    reconcile.mutate({
      toolkit_ids: selectedIds,
      new_toolkits: trimmedNew ? [{ name: trimmedNew }] : [],
    });

  const disableServer = () => reconcile.mutate({ toolkit_ids: [], new_toolkits: [] });

  // Stage the typed new-toolkit name (created on apply) and collapse the input.
  const saveNew = () => {
    if (!newName.trim()) return;
    setAddingNew(false);
  };

  const cancelNew = () => {
    setNewName("");
    setAddingNew(false);
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

  const copyText = (key: string, text: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  };

  // Per-client connection snippet for the "How to connect" tabs.
  const clientSnippet = (clientId: McpClientId, slug: string): string => {
    const url = gatewayEndpoint(orgSlug ?? "", slug);
    if (clientId === "codex") {
      return `# ~/.codex/config.toml\n[mcp_servers.${serverSlug}]\nurl = "${url}"`;
    }
    if (clientId === "chatgpt") {
      return url;
    }
    // Claude / Openclaw and other JSON-config MCP clients.
    return JSON.stringify({ mcpServers: { [serverSlug]: { url } } }, null, 2);
  };

  const clientNote: Record<McpClientId, string | null> = {
    claude: null,
    codex: null,
    openclaw: null,
    chatgpt: "Add this URL as a custom connector in ChatGPT → Settings → Connectors.",
  };

  // The toolkit whose endpoint anchors the "How to connect" snippet.
  const primaryToolkit = enabledToolkits[0];

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {enabled ? (
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-200"
            >
              <Check className="h-4 w-4" />
              Enabled
              {enabledToolkits.length === 1 ? (
                <span className="font-normal text-emerald-600">· {enabledToolkits[0].name}</span>
              ) : enabledToolkits.length > 1 ? (
                <span className="font-normal text-emerald-600">
                  · {enabledToolkits.length} toolkits
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
          className="flex w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-xl"
        >
          <SheetHeader className="border-b px-6 py-5 text-left">
            <SheetTitle className="text-xl">Connect to your MCP server</SheetTitle>
            <SheetDescription>
              Choose which toolkits expose these tools, then point your agent at the endpoint.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto [&>div:last-child]:border-b-0">
            {/* ── Toolkit selection ─────────────────────────────────────────── */}
            <Section
              title="Toolkits"
              hint="Select one or more toolkits to expose these tools, or create a new one. Click a selected toolkit to remove it."
            >
              {toolkitsLoading ? (
                <div className="space-y-1.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-11 w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-1.5">
                  {toolkits.map((t) => {
                    const checked = selected.has(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggle(t.id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition hover:bg-muted",
                          checked ? "border-foreground/30 bg-muted" : "border-border",
                        )}
                      >
                        <span className="min-w-0 truncate">
                          {t.name}
                          <span className="ml-1.5 text-xs text-muted-foreground">/{t.slug}</span>
                        </span>
                        <span
                          className={cn(
                            "grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                            checked
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-muted-foreground/40",
                          )}
                        >
                          {checked && <Check className="h-3 w-3" />}
                        </span>
                      </button>
                    );
                  })}

                  {/* Staged new toolkit (created on apply) — click to remove. */}
                  {trimmedNew && !addingNew && (
                    <button
                      type="button"
                      onClick={cancelNew}
                      className="flex w-full items-center justify-between rounded-lg border border-emerald-600/40 bg-emerald-50 px-3 py-2.5 text-left text-sm transition hover:bg-emerald-100"
                    >
                      <span className="min-w-0 truncate">
                        {trimmedNew}
                        <span className="ml-1.5 text-xs text-emerald-700">new toolkit</span>
                      </span>
                      <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    </button>
                  )}
                </div>
              )}

              {!toolkitsLoading &&
                (addingNew ? (
                  <div className="flex items-center gap-2 pt-1">
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
                    <Button
                      size="sm"
                      className="h-9 rounded-lg"
                      onClick={saveNew}
                      disabled={!newName.trim()}
                    >
                      Save
                    </Button>
                    <button
                      type="button"
                      onClick={cancelNew}
                      aria-label="Cancel"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  !trimmedNew && (
                    <button
                      type="button"
                      onClick={() => setAddingNew(true)}
                      className="flex items-center gap-2 rounded-lg px-1 pt-1 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      <span className="grid h-5 w-5 place-items-center rounded-full border border-current">
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                      Add toolkit
                    </button>
                  )
                ))}
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
                {reconcile.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : footerLabel}
              </Button>
            </Section>

            {/* ── Connection ────────────────────────────────────────────────── */}
            {enabledToolkits.length > 0 && orgSlug && (
              <Section
                title="Connection"
                hint="The gateway endpoint for each enabled toolkit. Use this URL in your MCP client."
                stacked
              >
                {enabledToolkits.map((t) => (
                  <div key={t.id} className="space-y-1">
                    {enabledToolkits.length > 1 && (
                      <p className="text-xs text-muted-foreground">{t.name}</p>
                    )}
                    <CopyRow
                      value={gatewayEndpoint(orgSlug, t.slug)}
                      copied={copiedKey === `url:${t.slug}`}
                      onCopy={() => copyText(`url:${t.slug}`, gatewayEndpoint(orgSlug, t.slug))}
                    />
                  </div>
                ))}
              </Section>
            )}

            {/* ── How to connect ────────────────────────────────────────────── */}
            {primaryToolkit && orgSlug && (
              <Section
                title="How to connect"
                hint="Pick your MCP client, then add this server with the config below."
                stacked
              >
                <div className="grid grid-cols-4 gap-1 rounded-lg border p-1">
                  {MCP_CLIENTS.map((c) => {
                    const Icon = c.icon;
                    const active = client === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setClient(c.id)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 rounded-md px-2 py-2.5 text-xs font-medium transition",
                          active
                            ? "bg-muted text-foreground ring-1 ring-border"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {c.label}
                      </button>
                    );
                  })}
                </div>

                <div className="relative rounded-lg border bg-muted/40">
                  <button
                    type="button"
                    onClick={() => copyText("config", clientSnippet(client, primaryToolkit.slug))}
                    title="Copy config"
                    className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    {copiedKey === "config" ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <pre className="overflow-x-auto p-3 pr-10 font-mono text-xs leading-relaxed text-foreground">
                    {clientSnippet(client, primaryToolkit.slug)}
                  </pre>
                </div>

                {clientNote[client] && (
                  <p className="text-xs text-muted-foreground">{clientNote[client]}</p>
                )}
                {enabledToolkits.length > 1 && (
                  <p className="text-xs text-muted-foreground">
                    Shown for {primaryToolkit.name}; swap the URL for any endpoint above.
                  </p>
                )}
              </Section>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={confirmDisable} onOpenChange={setConfirmDisable}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Disable this MCP server?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes this MCP server's tools from your toolkits. Clients using the gateway
              endpoint will no longer see these tools. You can re-enable it anytime.
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
