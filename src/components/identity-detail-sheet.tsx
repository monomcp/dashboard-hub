import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Bot, Check, KeyRound, Loader2, Plus, Trash2, TriangleAlert } from "lucide-react";
import {
  ConnectionEndpoints,
  CopyRow,
  HowToConnect,
  Section,
  ToolkitSelectionIndicator,
  useActiveOrgSlug,
  useCopy,
} from "@/components/mcp-connect";
import { PillTabs, type PillTabItem } from "@/components/pill-tabs";
import { ToolkitCluster } from "@/components/toolkit-cluster";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ApiError, apiRequest } from "@/lib/api-client";
import {
  gatewayEndpoint,
  type ApiKey,
  type ApiKeyCreated,
  type CatalogServer,
  type Page,
  type Principal,
  type PrincipalStatus,
  type PrincipalType,
  type PrincipalUpdate,
  type Toolkit,
  type ToolkitAccess,
} from "@/lib/mcp-types";
import { cn } from "@/lib/utils";

export type IdentityTab = "general" | "toolkits" | "credentials" | "agent-setup";

const TYPE_LABEL: Record<PrincipalType, string> = {
  user: "User",
  agent: "Agent",
  service_account: "Service account",
  api_client: "API client",
};

/** Agent Setup is only meaningful for agent identities, so the tab list is type-dependent. */
function tabsFor(type: PrincipalType): PillTabItem[] {
  const tabs: PillTabItem[] = [
    { id: "general", label: "General" },
    { id: "toolkits", label: "Toolkits" },
    { id: "credentials", label: "Credentials" },
  ];
  if (type === "agent") tabs.push({ id: "agent-setup", label: "Agent Setup" });
  return tabs;
}

function errorText(error: unknown, fallback: string): string | null {
  if (!error) return null;
  return error instanceof ApiError ? error.message : fallback;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** MCP client config files key servers by name, so fall back to a slugified display name. */
function configKeyFor(principal: Principal): string {
  return (
    principal.slug ||
    principal.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") ||
    "mcp"
  );
}

function StatusBadge({ status }: { status: PrincipalStatus }) {
  const styles: Record<PrincipalStatus, string> = {
    active: "bg-emerald-100 text-emerald-700",
    disabled: "bg-amber-100 text-amber-700",
    archived: "bg-stone-200 text-stone-600",
  };
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", styles[status])}>
      {status}
    </span>
  );
}

/** A save affordance that only lights up once the field differs from what's stored. */
function SaveFieldButton({
  dirty,
  pending,
  onClick,
  label,
}: {
  dirty: boolean;
  pending: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <Button
      type="button"
      size="icon"
      variant="secondary"
      aria-label={label}
      disabled={!dirty || pending}
      onClick={onClick}
      className={cn(
        "h-10 w-10 shrink-0 transition",
        dirty && "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      )}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
    </Button>
  );
}

// ── General ──────────────────────────────────────────────────────────────────

function GeneralTab({ principal, onDeleted }: { principal: Principal; onDeleted: () => void }) {
  const queryClient = useQueryClient();
  const storedDescription =
    typeof principal.metadata?.description === "string" ? principal.metadata.description : "";

  // Seeded once — the sheet remounts this tab per identity, and a successful save
  // makes the draft match the refetched value, which is what clears the dirty state.
  const [name, setName] = useState(principal.name);
  const [description, setDescription] = useState(storedDescription);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["principals"] });

  const update = useMutation({
    mutationFn: (body: PrincipalUpdate) =>
      apiRequest<Principal>(`/api/v1/principals/${principal.id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: () => apiRequest<void>(`/api/v1/principals/${principal.id}`, { method: "DELETE" }),
    onSuccess: () => {
      invalidate();
      setConfirmDelete(false);
      onDeleted();
    },
  });

  // `user` principals are tied to an org membership; the API rejects deleting them directly.
  const deletable = principal.type !== "user";
  const updateError = errorText(update.error, "Couldn't save changes.");
  const deleteError = errorText(remove.error, "Couldn't delete this identity.");

  const savingName = update.isPending && update.variables?.name !== undefined;
  const savingDescription = update.isPending && update.variables?.metadata !== undefined;
  const savingStatus = update.isPending && update.variables?.status !== undefined;

  return (
    <>
      <Section title="General settings" hint="How this identity appears across the console.">
        <div className="space-y-2">
          <Label htmlFor="identity-name">Display name</Label>
          <div className="flex items-start gap-2">
            <Input
              id="identity-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={update.isPending}
            />
            <SaveFieldButton
              label="Save display name"
              dirty={name.trim() !== "" && name !== principal.name}
              pending={savingName}
              onClick={() => update.mutate({ name: name.trim() })}
            />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Label htmlFor="identity-description">Custom description</Label>
          <div className="flex items-start gap-2">
            <Textarea
              id="identity-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What this identity is for"
              rows={4}
              disabled={update.isPending}
            />
            <SaveFieldButton
              label="Save description"
              dirty={description !== storedDescription}
              pending={savingDescription}
              onClick={() => update.mutate({ metadata: { ...principal.metadata, description } })}
            />
          </div>
        </div>

        {updateError && <p className="text-xs text-destructive">{updateError}</p>}
      </Section>

      <Section title="Type" hint="Set when the identity was created and fixed afterwards.">
        <p className="text-sm text-foreground">{TYPE_LABEL[principal.type]}</p>
        {principal.slug && (
          <p className="font-mono text-xs text-muted-foreground">/{principal.slug}</p>
        )}
      </Section>

      <Section title="Status" hint="Disabled identities are rejected at the gateway.">
        <Select
          value={principal.status}
          onValueChange={(value) => update.mutate({ status: value as PrincipalStatus })}
          disabled={update.isPending}
        >
          <SelectTrigger className="sm:max-w-xs" id="identity-status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        {savingStatus && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      </Section>

      <Section
        title="Danger zone"
        hint={
          deletable
            ? "Deleting an identity revokes its toolkit access and API keys."
            : "User identities are removed by removing the org membership."
        }
      >
        <Button
          variant="outline"
          className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive sm:w-auto"
          disabled={!deletable || remove.isPending}
          onClick={() => setConfirmDelete(true)}
        >
          <Trash2 className="h-4 w-4" />
          Delete identity
        </Button>
        {deleteError && <p className="text-xs text-destructive">{deleteError}</p>}
      </Section>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {principal.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the identity, its toolkit grants, and its API keys. Anything
              calling the gateway as this identity will stop working.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {deleteError && <p className="text-xs text-destructive">{deleteError}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={remove.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                remove.mutate();
              }}
              disabled={remove.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {remove.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// ── Toolkits ─────────────────────────────────────────────────────────────────

function ToolkitsTab({
  principal,
  toolkits,
  toolkitsLoading,
  grants,
  grantsLoading,
}: {
  principal: Principal;
  toolkits: Toolkit[];
  toolkitsLoading: boolean;
  grants: ToolkitAccess[];
  grantsLoading: boolean;
}) {
  const queryClient = useQueryClient();
  const [busyId, setBusyId] = useState<string | null>(null);

  const grantByToolkit = useMemo(() => {
    const map = new Map<string, ToolkitAccess>();
    for (const g of grants) map.set(g.toolkit_id, g);
    return map;
  }, [grants]);

  const toggle = useMutation({
    mutationFn: async ({ toolkitId, granted }: { toolkitId: string; granted: boolean }) => {
      if (granted) {
        return apiRequest<void>(`/api/v1/principals/${principal.id}/toolkit-access/${toolkitId}`, {
          method: "DELETE",
        });
      }
      return apiRequest<ToolkitAccess>(`/api/v1/principals/${principal.id}/toolkit-access`, {
        method: "PUT",
        body: JSON.stringify({ toolkit_id: toolkitId, access_mode: "full", enabled: true }),
      });
    },
    onMutate: ({ toolkitId }) => setBusyId(toolkitId),
    onSettled: () => {
      setBusyId(null);
      queryClient.invalidateQueries({ queryKey: ["principal-toolkit-access", principal.id] });
      queryClient.invalidateQueries({ queryKey: ["principals"] });
      queryClient.invalidateQueries({ queryKey: ["toolkit-access-matrix"] });
    },
  });

  const toggleError = errorText(toggle.error, "Couldn't update toolkit access.");
  const loading = toolkitsLoading || grantsLoading;

  return (
    <Section
      title="Toolkits"
      hint="Select the toolkits this identity can call through the gateway. Click a selected toolkit to revoke it."
      stacked
    >
      {loading ? (
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      ) : toolkits.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
          No toolkits yet. Enable an MCP server to create one.
        </p>
      ) : (
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {toolkits.map((t) => {
            const grant = grantByToolkit.get(t.id);
            const checked = Boolean(grant?.enabled);
            const busy = busyId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => toggle.mutate({ toolkitId: t.id, granted: checked })}
                aria-pressed={checked}
                disabled={busy}
                className={cn(
                  "group relative flex min-h-20 w-full flex-col items-start justify-between rounded-lg border p-3 pr-9 text-left text-sm transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-70",
                  checked
                    ? "border-foreground/30 bg-muted hover:bg-muted"
                    : "border-border bg-background hover:bg-muted/60",
                )}
              >
                <span className="min-w-0 max-w-full">
                  <span className="block truncate font-medium text-foreground">{t.name}</span>
                  <span className="mt-1 block truncate text-xs text-muted-foreground">
                    /{t.slug}
                  </span>
                </span>
                {checked && grant?.access_mode === "restricted" && (
                  <span className="mt-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                    restricted
                  </span>
                )}
                {busy ? (
                  <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                  <ToolkitSelectionIndicator checked={checked} className="absolute right-3 top-3" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {toggleError && <p className="pt-1 text-xs text-destructive">{toggleError}</p>}

      <p className="pt-2 text-xs text-muted-foreground">
        Access here grants the whole toolkit. To allow or block individual tools, open{" "}
        <Link
          to="/permissions"
          className="font-medium text-foreground underline underline-offset-2"
        >
          Permissions
        </Link>
        .
      </p>
    </Section>
  );
}

// ── Credentials ──────────────────────────────────────────────────────────────

function CredentialsTab({ principal }: { principal: Principal }) {
  const queryClient = useQueryClient();
  const { copiedKey, copy } = useCopy();
  const [newName, setNewName] = useState("");
  const [revealed, setRevealed] = useState<ApiKeyCreated | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<ApiKey | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["api-keys"],
    queryFn: () => apiRequest<Page<ApiKey>>("/api/v1/api-keys?limit=200"),
    staleTime: 30 * 1000,
  });

  // The list endpoint is org-wide, so narrow it to this identity's keys here.
  const keys = useMemo(
    () => (data?.items ?? []).filter((k) => k.principal_id === principal.id),
    [data, principal.id],
  );

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["api-keys"] });

  const create = useMutation({
    mutationFn: (name: string) =>
      apiRequest<ApiKeyCreated>("/api/v1/api-keys", {
        method: "POST",
        body: JSON.stringify({ name, principal_id: principal.id }),
      }),
    onSuccess: (key) => {
      setRevealed(key);
      setNewName("");
      invalidate();
    },
  });

  const revoke = useMutation({
    mutationFn: (id: string) => apiRequest<void>(`/api/v1/api-keys/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      setRevokeTarget(null);
      invalidate();
    },
  });

  const createError = errorText(create.error, "Couldn't create an API key.");
  const revokeError = errorText(revoke.error, "Couldn't revoke this key.");

  return (
    <>
      {revealed && (
        <Section
          title="New API key"
          hint="Copy it now — the secret is shown once and never again."
          stacked
          className="bg-amber-50/60"
        >
          <div className="flex items-start gap-2 text-xs text-amber-800">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Store <span className="font-medium">{revealed.name}</span> somewhere safe. Closing
              this panel hides the secret permanently.
            </p>
          </div>
          <CopyRow
            value={revealed.secret}
            copied={copiedKey === "secret"}
            onCopy={() => copy("secret", revealed.secret)}
          />
          <Button variant="outline" size="sm" onClick={() => setRevealed(null)}>
            I've saved it
          </Button>
        </Section>
      )}

      <Section title="Create API key" hint="Keys authenticate this identity against the gateway.">
        <div className="flex items-start gap-2">
          <Input
            id="api-key-name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newName.trim()) {
                e.preventDefault();
                create.mutate(newName.trim());
              }
            }}
            placeholder="e.g. production"
            disabled={create.isPending}
          />
          <Button
            className="shrink-0"
            onClick={() => create.mutate(newName.trim())}
            disabled={!newName.trim() || create.isPending}
          >
            {create.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Create key
          </Button>
        </div>
        <Label htmlFor="api-key-name" className="sr-only">
          API key name
        </Label>
        {createError && <p className="text-xs text-destructive">{createError}</p>}
      </Section>

      <Section title="API keys" hint="Existing credentials for this identity." stacked>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border px-4 py-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-28" />
                <Skeleton className="ml-auto h-8 w-20 rounded-md" />
              </div>
            ))}
          </div>
        ) : keys.length === 0 ? (
          <p className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
            No API keys for this identity yet.
          </p>
        ) : (
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Name</th>
                  <th className="px-4 py-2.5 font-medium">Prefix</th>
                  <th className="px-4 py-2.5 font-medium">Created</th>
                  <th className="px-4 py-2.5 font-medium">Last used</th>
                  <th className="px-4 py-2.5 font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {keys.map((k) => (
                  <tr key={k.id} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="font-medium">{k.name}</span>
                        {k.revoked_at && (
                          <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[10px] font-medium text-stone-600">
                            revoked
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {k.key_prefix}…
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(k.created_at)}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(k.last_used_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {!k.revoked_at && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setRevokeTarget(k)}
                        >
                          Revoke
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <AlertDialog
        open={revokeTarget !== null}
        onOpenChange={(open) => !open && setRevokeTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke {revokeTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              Any client using this key will immediately lose access to the gateway. This can't be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {revokeError && <p className="text-xs text-destructive">{revokeError}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={revoke.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                if (revokeTarget) revoke.mutate(revokeTarget.id);
              }}
              disabled={revoke.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {revoke.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Revoke"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// ── Agent setup ──────────────────────────────────────────────────────────────

function AgentSetupTab({
  principal,
  grantedToolkits,
  loading,
  onGoToToolkits,
}: {
  principal: Principal;
  grantedToolkits: Toolkit[];
  loading: boolean;
  onGoToToolkits: () => void;
}) {
  const orgSlug = useActiveOrgSlug(true);
  const primaryToolkit = grantedToolkits[0];

  if (loading || !orgSlug) {
    return (
      <Section title="Connection" hint="The gateway endpoints this agent can call." stacked>
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </Section>
    );
  }

  if (!primaryToolkit) {
    return (
      <Section title="Connection" hint="The gateway endpoints this agent can call." stacked>
        <div className="rounded-lg border border-dashed px-4 py-8 text-center">
          <Bot className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            This agent has no toolkits yet, so there's nothing to connect to.
          </p>
          <Button variant="outline" size="sm" className="mt-3" onClick={onGoToToolkits}>
            Grant a toolkit
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section
        title="Connection"
        hint="The gateway endpoint for each granted toolkit. Use this URL in your MCP client."
        stacked
      >
        <ConnectionEndpoints orgSlug={orgSlug} toolkits={grantedToolkits} />
      </Section>

      <Section
        title="How to connect"
        hint="Pick your MCP client, then add this server with the config below."
        stacked
      >
        <HowToConnect
          configKey={configKeyFor(principal)}
          url={gatewayEndpoint(orgSlug, primaryToolkit.slug)}
        />
        {grantedToolkits.length > 1 && (
          <p className="text-xs text-muted-foreground">
            Shown for {primaryToolkit.name}; swap the URL for any endpoint above.
          </p>
        )}
      </Section>
    </>
  );
}

// ── Sheet ────────────────────────────────────────────────────────────────────

export function IdentityDetailSheet({
  principal,
  initialTab = "general",
  onOpenChange,
}: {
  /** The identity to show; `null` closes the sheet. */
  principal: Principal | null;
  initialTab?: IdentityTab;
  onOpenChange: (open: boolean) => void;
}) {
  const open = principal !== null;
  const [tab, setTab] = useState<IdentityTab>(initialTab);

  // Radix animates the sheet out, so keep rendering the identity we were showing
  // until the exit transition finishes instead of blanking the panel on close.
  const [lastPrincipal, setLastPrincipal] = useState<Principal | null>(principal);
  useEffect(() => {
    if (principal) setLastPrincipal(principal);
  }, [principal]);
  const shown = principal ?? lastPrincipal;

  // Each open (or each row-action that names a tab) re-seeds the active tab.
  useEffect(() => {
    if (open) setTab(initialTab);
  }, [open, initialTab, principal?.id]);

  const { data: toolkitPage, isLoading: toolkitsLoading } = useQuery({
    queryKey: ["toolkits-list"],
    queryFn: () => apiRequest<Page<Toolkit>>("/api/v1/toolkits?sort=name&direction=asc&limit=200"),
    enabled: open,
    staleTime: 30 * 1000,
  });
  const toolkits = useMemo(() => toolkitPage?.items ?? [], [toolkitPage]);

  const { data: grantData, isLoading: grantsLoading } = useQuery({
    queryKey: ["principal-toolkit-access", shown?.id],
    queryFn: () => apiRequest<ToolkitAccess[]>(`/api/v1/principals/${shown!.id}/toolkit-access`),
    enabled: open && shown !== null,
    staleTime: 30 * 1000,
  });
  const grants = useMemo(() => grantData ?? [], [grantData]);

  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog", "all"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });
  const serverByToolkit = useMemo(() => {
    const map = new Map<string, CatalogServer>();
    for (const server of catalog ?? []) {
      for (const id of server.toolkit_ids) {
        if (!map.has(id)) map.set(id, server);
      }
    }
    return map;
  }, [catalog]);

  // Keep the name-sorted order from the toolkits query so the header icons stay stable.
  const grantedToolkits = useMemo(() => {
    const ids = new Set(grants.filter((g) => g.enabled).map((g) => g.toolkit_id));
    return toolkits.filter((t) => ids.has(t.id));
  }, [grants, toolkits]);

  if (!shown) return null;

  const tabs = tabsFor(shown.type);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="inset-y-2 right-2 flex h-auto w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden rounded-xl p-0 sm:max-w-2xl lg:max-w-[72rem]"
      >
        <TooltipProvider delayDuration={200}>
          <SheetHeader className="border-b px-6 py-5 text-left">
            <div className="flex items-center gap-3 pr-10">
              <ToolkitCluster
                toolkits={grantedToolkits}
                serverFor={(id) => serverByToolkit.get(id)}
                loading={toolkitsLoading || grantsLoading}
                max={4}
              />
              <div className="min-w-0">
                <SheetTitle className="truncate text-xl">{shown.name}</SheetTitle>
                <SheetDescription className="flex items-center gap-2">
                  <span>{TYPE_LABEL[shown.type]}</span>
                  {shown.slug && <span className="font-mono text-xs">/{shown.slug}</span>}
                </SheetDescription>
              </div>
              <div className="ml-auto shrink-0">
                <StatusBadge status={shown.status} />
              </div>
            </div>

            <PillTabs
              tabs={tabs}
              activeId={tab}
              onSelect={(id) => setTab(id as IdentityTab)}
              className="mt-4 w-full sm:max-w-xl"
            />
          </SheetHeader>

          <div className="flex-1 overflow-y-auto [&>div:last-child]:border-b-0">
            {tab === "general" && (
              <GeneralTab key={shown.id} principal={shown} onDeleted={() => onOpenChange(false)} />
            )}
            {tab === "toolkits" && (
              <ToolkitsTab
                principal={shown}
                toolkits={toolkits}
                toolkitsLoading={toolkitsLoading}
                grants={grants}
                grantsLoading={grantsLoading}
              />
            )}
            {tab === "credentials" && <CredentialsTab principal={shown} />}
            {tab === "agent-setup" && (
              <AgentSetupTab
                principal={shown}
                grantedToolkits={grantedToolkits}
                loading={toolkitsLoading || grantsLoading}
                onGoToToolkits={() => setTab("toolkits")}
              />
            )}
          </div>
        </TooltipProvider>
      </SheetContent>
    </Sheet>
  );
}
