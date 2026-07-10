import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bot,
  Check,
  ExternalLink,
  KeyRound,
  Loader2,
  Plus,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import {
  ConnectionEndpoints,
  CopyRow,
  HowToConnect,
  Section,
  useActiveOrgSlug,
  useCopy,
} from "@/components/mcp-connect";
import { PillTabs, type PillTabItem } from "@/components/pill-tabs";
import { McpServerCluster } from "@/components/toolkit-cluster";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ApiError, apiRequest } from "@/lib/api-client";
import { brandIcon } from "@/lib/brand-icons";
import { mcpServerPath } from "@/lib/mcp-server-paths";
import {
  gatewayEndpoint,
  type ApiKey,
  type ApiKeyCreated,
  type CatalogServer,
  type AccessCell,
  type AccessMatrixPrincipal,
  type Page,
  type Principal,
  type PrincipalStatus,
  type PrincipalType,
  type PrincipalUpdate,
  type Toolkit,
  type ToolkitAccess,
  type ToolkitAccessMatrix,
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
    { id: "toolkits", label: "Tools" },
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

export function DeleteIdentityDialog({
  principal,
  open,
  onOpenChange,
  onDeleted,
}: {
  principal: Principal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted?: () => void;
}) {
  const queryClient = useQueryClient();
  const remove = useMutation({
    mutationFn: () => {
      if (!principal) throw new Error("No identity selected");
      return apiRequest<void>(`/api/v1/identities/${principal.id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["principals"] });
      queryClient.invalidateQueries({ queryKey: ["toolkits"] });
      queryClient.invalidateQueries({ queryKey: ["toolkits-list"] });
      queryClient.invalidateQueries({ queryKey: ["toolkit-access-matrix"] });
      queryClient.invalidateQueries({ queryKey: ["api-keys"] });
      onOpenChange(false);
      onDeleted?.();
    },
  });
  const deleteError = errorText(remove.error, "Couldn't delete this identity.");

  const setOpen = (nextOpen: boolean) => {
    if (remove.isPending) return;
    if (!nextOpen) remove.reset();
    onOpenChange(nextOpen);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {principal?.name ?? "identity"}?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes the identity, its personal toolkit, permissions, and API keys.
            Anything calling the gateway as this identity will stop working.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {deleteError && <p className="text-xs text-destructive">{deleteError}</p>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={remove.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              remove.mutate();
            }}
            disabled={!principal || remove.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {remove.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
      apiRequest<Principal>(`/api/v1/identities/${principal.id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    onSuccess: invalidate,
  });

  const deletable = principal.can_delete;
  const updateError = errorText(update.error, "Couldn't save changes.");

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
            ? "Deleting an identity removes its personal toolkit, permissions, and API keys."
            : "This identity is protected and cannot be deleted."
        }
      >
        <Button
          variant="outline"
          className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive sm:w-auto"
          disabled={!deletable}
          onClick={() => setConfirmDelete(true)}
        >
          <Trash2 className="h-4 w-4" />
          Delete identity
        </Button>
      </Section>

      <DeleteIdentityDialog
        principal={principal}
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        onDeleted={onDeleted}
      />
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
  catalog,
  catalogLoading,
}: {
  principal: Principal;
  toolkits: Toolkit[];
  toolkitsLoading: boolean;
  grants: ToolkitAccess[];
  grantsLoading: boolean;
  catalog: CatalogServer[];
  catalogLoading: boolean;
}) {
  const loading = toolkitsLoading || grantsLoading;
  const accessibleToolkitIds = useMemo(
    () => new Set(grants.filter((grant) => grant.enabled).map((grant) => grant.toolkit_id)),
    [grants],
  );
  const accessibleServers = useMemo(
    () =>
      catalog.filter((server) =>
        server.toolkit_ids.some((toolkitId) => accessibleToolkitIds.has(toolkitId)),
      ),
    [accessibleToolkitIds, catalog],
  );

  return (
    <Section
      title="Tools"
      hint="MCP tools this identity can call through its granted toolkits."
      stacked
    >
      {catalogLoading || loading ? (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-lg" />
          ))}
        </div>
      ) : accessibleServers.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground">
          This identity does not currently have access to any MCP tools.
        </p>
      ) : (
        <div className="space-y-7">
          {accessibleServers.map((server) => (
            <McpServerTools
              key={server.slug}
              principal={principal}
              server={server}
              toolkits={toolkits.filter(
                (toolkit) =>
                  accessibleToolkitIds.has(toolkit.id) && server.toolkit_ids.includes(toolkit.id),
              )}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

type IdentityTool = {
  id: string;
  name: string;
  description: string;
  value: AccessCell;
  principal: AccessMatrixPrincipal;
};

function McpServerTools({
  principal,
  server,
  toolkits,
}: {
  principal: Principal;
  server: CatalogServer;
  toolkits: Toolkit[];
}) {
  const queryClient = useQueryClient();
  const [busyToolId, setBusyToolId] = useState<string | null>(null);
  const matrices = useQueries({
    queries: toolkits.map((toolkit) => ({
      queryKey: ["identity-tool-access", principal.id, toolkit.id, server.slug],
      queryFn: () =>
        apiRequest<ToolkitAccessMatrix>(
          `/api/v1/toolkits/${toolkit.id}/access-matrix?module_slug=${encodeURIComponent(server.slug)}`,
        ),
      staleTime: 30 * 1000,
    })),
  });

  const tools = useMemo(() => {
    const catalogByName = new Map(server.tools.map((tool) => [tool.name, tool]));
    const merged = new Map<string, IdentityTool>();
    for (const query of matrices) {
      if (!query.data) continue;
      const matrixPrincipal = query.data.principals.find((item) => item.id === principal.id);
      if (!matrixPrincipal) continue;
      for (const tool of query.data.tools) {
        if (merged.has(tool.id)) continue;
        const catalogTool = catalogByName.get(tool.name);
        merged.set(tool.id, {
          id: tool.id,
          name: tool.name,
          description: tool.description ?? catalogTool?.description ?? "",
          value: matrixPrincipal.tools[tool.id] ?? "no_access",
          principal: matrixPrincipal,
        });
      }
    }
    return [...merged.values()];
  }, [matrices, principal.id, server.tools]);

  const updateRule = useMutation({
    mutationFn: ({ toolId, enabled }: { toolId: string; enabled: boolean }) =>
      apiRequest<unknown>(`/api/v1/identities/${principal.id}/tool-rules`, {
        method: "PUT",
        body: JSON.stringify(
          enabled
            ? { mcp_tool_id: toolId, effect: "allow", permission: "always_allow" }
            : { mcp_tool_id: toolId, effect: "deny" },
        ),
      }),
    onMutate: ({ toolId }) => setBusyToolId(toolId),
    onSettled: async () => {
      setBusyToolId(null);
      await queryClient.invalidateQueries({ queryKey: ["identity-tool-access", principal.id] });
      await queryClient.invalidateQueries({ queryKey: ["toolkit-access-matrix"] });
    },
  });

  const loading = matrices.some((query) => query.isLoading);
  const icon = server.logo_url ? (
    <img src={server.logo_url} alt="" className="h-7 w-7 object-contain" loading="lazy" />
  ) : (
    brandIcon(server.icon_key)
  );

  return (
    <section aria-labelledby={`mcp-server-${server.slug}`}>
      <div className="mb-3 flex items-center gap-3">
        <a
          href={mcpServerPath(server)}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border bg-white transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Open ${server.name} in a new tab`}
        >
          {icon ?? (
            <span className="text-sm font-semibold uppercase text-muted-foreground">
              {server.name.charAt(0)}
            </span>
          )}
        </a>
        <div className="min-w-0">
          <h3 id={`mcp-server-${server.slug}`} className="truncate text-base font-semibold">
            <a
              href={mcpServerPath(server)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {server.name}
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </h3>
          <p className="text-xs text-muted-foreground">
            {toolkits.map((toolkit) => toolkit.name).join(", ")}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: Math.min(3, Math.max(server.tools.length, 1)) }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
      ) : tools.length === 0 ? (
        <p className="rounded-lg border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
          No actions are available from this MCP server.
        </p>
      ) : (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const enabled = tool.value === "allowed" || tool.value === "needs_approval";
            const busy = busyToolId === tool.id;
            return (
              <div
                key={tool.id}
                className="flex min-h-28 flex-col rounded-lg border bg-background p-3"
              >
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-medium">{tool.name}</h4>
                    <p className="mt-1 line-clamp-3 text-xs text-muted-foreground">
                      {tool.description || "No description provided."}
                    </p>
                  </div>
                  <Switch
                    checked={enabled}
                    disabled={busy || updateRule.isPending || !tool.principal.has_toolkit_access}
                    onCheckedChange={(checked) =>
                      updateRule.mutate({ toolId: tool.id, enabled: checked })
                    }
                    aria-label={`${enabled ? "Disable" : "Enable"} ${tool.name}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {updateRule.error && (
        <p className="mt-2 text-xs text-destructive">
          {errorText(updateRule.error, "Couldn't update tool access.")}
        </p>
      )}
    </section>
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
            className="w-fit max-w-full"
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
            className="w-full sm:w-96"
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
    queryFn: () => apiRequest<ToolkitAccess[]>(`/api/v1/identities/${shown!.id}/toolkit-access`),
    enabled: open && shown !== null,
    staleTime: 30 * 1000,
  });
  const grants = useMemo(() => grantData ?? [], [grantData]);

  const { data: catalog, isLoading: catalogLoading } = useQuery({
    queryKey: ["mcp-catalog", "all"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });
  // Agent setup still needs the granted toolkit endpoints and names.
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
              <McpServerCluster servers={shown.mcp_servers ?? []} max={7} />
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
                catalog={catalog ?? []}
                catalogLoading={catalogLoading}
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
