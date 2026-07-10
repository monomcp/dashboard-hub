import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bot, Check, Loader2, Plus, Power, Share2, User, X } from "lucide-react";
import {
  ConnectionEndpoints,
  HowToConnect,
  Section,
  ToolkitKindBadge,
  ToolkitSelectionIndicator,
  useActiveOrgSlug,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
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
import {
  gatewayEndpoint,
  type NewToolkitKind,
  type Page,
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

function sameSet(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((id) => setB.has(id));
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
  const orgSlug = useActiveOrgSlug(open);
  const [selected, setSelected] = useState<Set<string>>(() => new Set(toolkitIds));
  const [newName, setNewName] = useState("");
  const [newKind, setNewKind] = useState<NewToolkitKind>("shared");
  const [addingNew, setAddingNew] = useState(false);
  const [confirmDisable, setConfirmDisable] = useState(false);

  // Reset the working selection to the server's truth whenever the panel opens
  // or the enabled set changes underneath us.
  useEffect(() => {
    if (open) {
      setSelected(new Set(toolkitIds));
      setNewName("");
      setNewKind("shared");
      setAddingNew(false);
    }
  }, [open, toolkitIds]);

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
  const isUpdate = selectedCount >= 1 && changed;

  const apply = () =>
    reconcile.mutate({
      toolkit_ids: selectedIds,
      new_toolkits: trimmedNew ? [{ name: trimmedNew, kind: newKind }] : [],
    });

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

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          {variant === "registry" ? (
            <Switch
              checked={enabled}
              aria-label={`${enabled ? "Manage" : "Enable"} ${serverSlug} MCP server`}
            />
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
                <ConnectionEndpoints orgSlug={orgSlug} toolkits={enabledToolkits} />
              </Section>
            )}

            {/* ── How to connect ────────────────────────────────────────────── */}
            {primaryToolkit && orgSlug && (
              <Section
                title="How to connect"
                hint="Pick your MCP client, then add this server with the config below."
                stacked
              >
                <HowToConnect
                  configKey={serverSlug}
                  url={gatewayEndpoint(orgSlug, primaryToolkit.slug)}
                />

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
