import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  Copy,
  Fingerprint,
  KeyRound,
  Loader2,
  Menu,
  MoreVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ApiError, apiRequest } from "@/lib/api-client";
import { brandIcon } from "@/lib/brand-icons";
import type {
  ApiKey,
  ApiKeyCreate,
  ApiKeyCreated,
  CatalogServer,
  Page,
  Principal,
  PrincipalCreate,
  PrincipalType,
  Toolkit,
  ToolkitAccessMatrix,
} from "@/lib/mcp-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/identities")({
  head: () => ({
    meta: [
      { title: "Identities" },
      {
        name: "description",
        content: "Manage the identities that call your MCP gateway and their API keys.",
      },
    ],
    links: [{ rel: "canonical", href: "/identities" }],
  }),
  component: PrincipalsPage,
});

const TYPE_LABEL: Record<PrincipalType, string> = {
  user: "User",
  agent: "Agent",
  service_account: "Service account",
  api_client: "API client",
};

function StatusBadge({ status }: { status: Principal["status"] }) {
  const styles: Record<Principal["status"], string> = {
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

/** A single toolkit tile — the owning server's brand icon, or its initial. */
function ToolkitChip({ toolkit, server }: { toolkit: Toolkit; server?: CatalogServer }) {
  const icon = server?.logo_url ? (
    <img src={server.logo_url} alt="" className="h-5 w-5 object-contain" loading="lazy" />
  ) : (
    brandIcon(server?.icon_key)
  );

  if (icon) {
    return (
      <div
        title={toolkit.name}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white ring-1 ring-black/5"
      >
        {icon}
      </div>
    );
  }

  return (
    <div
      title={toolkit.name}
      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-[11px] font-semibold uppercase text-white"
    >
      {toolkit.name.charAt(0)}
    </div>
  );
}

/** The MCP toolkits an identity carries — up to 5 brand icons, then a +N overflow. */
function ToolkitCluster({
  toolkits,
  serverFor,
  loading,
}: {
  toolkits: Toolkit[];
  serverFor: (toolkitId: string) => CatalogServer | undefined;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-lg" />
        ))}
      </div>
    );
  }

  if (toolkits.length === 0) {
    return <span className="text-muted-foreground">—</span>;
  }

  const shown = toolkits.slice(0, 5);
  const extra = toolkits.length - shown.length;

  return (
    <div className="flex items-center gap-1.5">
      {shown.map((toolkit) => (
        <ToolkitChip key={toolkit.id} toolkit={toolkit} server={serverFor(toolkit.id)} />
      ))}
      {extra > 0 && (
        <span
          title={`${extra} more`}
          className="grid h-8 min-w-8 shrink-0 place-items-center rounded-lg bg-muted px-1.5 text-xs font-medium text-muted-foreground"
        >
          +{extra}
        </span>
      )}
    </div>
  );
}

function PrincipalsPage() {
  const [keysFor, setKeysFor] = useState<Principal | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["principals"],
    queryFn: () => apiRequest<Page<Principal>>("/api/v1/principals?limit=200"),
    staleTime: 30 * 1000,
  });
  const principals = useMemo(() => data?.items ?? [], [data]);

  const { data: keyPage } = useQuery({
    queryKey: ["api-keys"],
    queryFn: () => apiRequest<Page<ApiKey>>("/api/v1/api-keys?limit=200"),
    staleTime: 30 * 1000,
  });
  // principal_id → count of live (non-revoked) keys.
  const keyCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const k of keyPage?.items ?? []) {
      if (k.revoked_at || !k.principal_id) continue;
      counts.set(k.principal_id, (counts.get(k.principal_id) ?? 0) + 1);
    }
    return counts;
  }, [keyPage]);

  // The org's MCP toolkits (name + id), shared cache with the permissions page.
  const { data: toolkitPage } = useQuery({
    queryKey: ["toolkits-list"],
    queryFn: () => apiRequest<Page<Toolkit>>("/api/v1/toolkits?sort=name&direction=asc&limit=200"),
    staleTime: 30 * 1000,
  });
  const toolkits = useMemo(() => toolkitPage?.items ?? [], [toolkitPage]);

  // Catalog gives each toolkit its brand icon via the server that owns its tools.
  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog", "all"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
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

  // One access matrix per toolkit tells us which identities can use it.
  const matrices = useQueries({
    queries: toolkits.map((toolkit) => ({
      queryKey: ["toolkit-access-matrix", toolkit.id],
      queryFn: () =>
        apiRequest<ToolkitAccessMatrix>(`/api/v1/toolkits/${toolkit.id}/access-matrix`),
      staleTime: 30 * 1000,
    })),
  });
  const toolkitsLoading = toolkits.length > 0 && matrices.some((m) => m.isLoading);

  // principal_id → the toolkits it has an enabled grant on (in toolkit sort order).
  const toolkitsByPrincipal = useMemo(() => {
    const map = new Map<string, Toolkit[]>();
    matrices.forEach((result, index) => {
      const toolkit = toolkits[index];
      if (!toolkit || !result.data) return;
      for (const row of result.data.principals) {
        if (!row.enabled) continue;
        const list = map.get(row.id) ?? [];
        list.push(toolkit);
        map.set(row.id, list);
      }
    });
    return map;
    // matrices is a fresh array each render; recompute is cheap for a handful of toolkits.
  }, [matrices, toolkits]);

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Toggle menu"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/permissions" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 shadow-sm">
              <Fingerprint className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Identities</span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <PlaygroundHeaderButton />
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <div className="mb-1 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Access
            </div>
            <nav className="space-y-1">
              <Link
                to="/permissions"
                className="flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm text-foreground/80 transition hover:bg-white/60"
              >
                <KeyRound className="h-5 w-5 shrink-0 text-foreground/70" />
                <span className="flex-1 truncate text-left">Permissions</span>
              </Link>
              <span className="flex w-full items-center gap-3 rounded-full bg-sky-100 px-3 py-2 text-sm text-sky-900">
                <Fingerprint className="h-5 w-5 shrink-0" />
                <span className="flex-1 truncate text-left">Identities</span>
              </span>
            </nav>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:pr-6">
          <div className="mb-6 mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-medium tracking-tight">Identities</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                The identities that call your MCP gateway. Issue an API key for any identity to
                connect an agent (Codex, Claude, …) without OAuth.
              </p>
            </div>
            <Button className="shrink-0 rounded-full" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" />
              New identity
            </Button>
          </div>

          {isError && (
            <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              Couldn't load identities. Please try again.
            </p>
          )}

          <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Toolkits</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">API keys</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {isLoading &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="px-5 py-4">
                        <Skeleton className="h-5 w-48 max-w-full" />
                        <Skeleton className="mt-2 h-3 w-24 max-w-full" />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          {Array.from({ length: 3 }).map((_, j) => (
                            <Skeleton key={j} className="h-8 w-8 rounded-lg" />
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Skeleton className="h-5 w-24" />
                      </td>
                      <td className="px-5 py-4">
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </td>
                      <td className="px-5 py-4">
                        <Skeleton className="h-5 w-8" />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Skeleton className="ml-auto h-9 w-32 rounded-full" />
                      </td>
                    </tr>
                  ))}

                {!isLoading && principals.length === 0 && (
                  <tr>
                    <td className="px-5 py-8 text-center text-muted-foreground" colSpan={6}>
                      No identities yet.
                    </td>
                  </tr>
                )}

                {principals.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-muted/40">
                    <td className="px-5 py-4">
                      <div className="font-medium">{p.name}</div>
                      {p.slug && <div className="text-xs text-muted-foreground">/{p.slug}</div>}
                    </td>
                    <td className="px-5 py-4">
                      <ToolkitCluster
                        toolkits={toolkitsByPrincipal.get(p.id) ?? []}
                        serverFor={(id) => serverByToolkit.get(id)}
                        loading={toolkitsLoading}
                      />
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{TYPE_LABEL[p.type]}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{keyCounts.get(p.id) ?? 0}</td>
                    <td className="px-5 py-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => setKeysFor(p)}
                      >
                        <KeyRound className="h-3.5 w-3.5" />
                        Manage keys
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <CreatePrincipalDialog open={createOpen} onOpenChange={setCreateOpen} />
      <ApiKeysSheet principal={keysFor} onClose={() => setKeysFor(null)} />
    </div>
  );
}

function CreatePrincipalDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<PrincipalType>("api_client");

  const create = useMutation({
    mutationFn: (body: PrincipalCreate) =>
      apiRequest<Principal>("/api/v1/principals", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["principals"] });
      setName("");
      setSlug("");
      setType("api_client");
      onOpenChange(false);
    },
  });

  const close = (nextOpen: boolean) => {
    if (create.isPending) return;
    if (!nextOpen) {
      create.reset();
      setName("");
      setSlug("");
      setType("api_client");
    }
    onOpenChange(nextOpen);
  };

  const submit = () => {
    if (!name.trim()) return;
    const body: PrincipalCreate = {
      name: name.trim(),
      type,
    };
    if (slug.trim()) body.slug = slug.trim();
    create.mutate(body);
  };

  const createError =
    create.error instanceof ApiError
      ? create.error.message
      : create.error
        ? "Couldn't create identity."
        : null;

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create identity</DialogTitle>
          <DialogDescription>
            Add a new identity for an agent, service, or API client that will call the MCP gateway.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="principal-name">Name</Label>
            <Input
              id="principal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="e.g. Codex production agent"
              disabled={create.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="principal-type">Type</Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as PrincipalType)}
              disabled={create.isPending}
            >
              <SelectTrigger id="principal-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api_client">API client</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="service_account">Service account</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="principal-slug">Slug</Label>
            <Input
              id="principal-slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submit();
                }
              }}
              placeholder="Optional"
              disabled={create.isPending}
            />
          </div>

          {createError && <p className="text-sm text-destructive">{createError}</p>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => close(false)} disabled={create.isPending}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={!name.trim() || create.isPending}>
            {create.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** Right-hand panel listing a principal's API keys, with create + revoke. */
function ApiKeysSheet({
  principal,
  onClose,
}: {
  principal: Principal | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [created, setCreated] = useState<ApiKeyCreated | null>(null);
  const [copied, setCopied] = useState(false);
  const [revokeTarget, setRevokeTarget] = useState<ApiKey | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["api-keys"],
    queryFn: () => apiRequest<Page<ApiKey>>("/api/v1/api-keys?limit=200"),
    enabled: principal !== null,
    staleTime: 30 * 1000,
  });
  const keys = useMemo(
    () => (data?.items ?? []).filter((k) => k.principal_id === principal?.id),
    [data, principal],
  );

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["api-keys"] });
    queryClient.invalidateQueries({ queryKey: ["principals"] });
  };

  const create = useMutation({
    mutationFn: (body: ApiKeyCreate) =>
      apiRequest<ApiKeyCreated>("/api/v1/api-keys", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: (key) => {
      setCreated(key);
      setName("");
      invalidate();
    },
  });

  const revoke = useMutation({
    mutationFn: (id: string) =>
      apiRequest<ApiKey>(`/api/v1/api-keys/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ revoked: true }),
      }),
    onSuccess: () => {
      setRevokeTarget(null);
      invalidate();
    },
  });

  const submit = () => {
    if (!name.trim() || !principal) return;
    create.mutate({ name: name.trim(), principal_id: principal.id });
  };

  const copySecret = () => {
    if (!created) return;
    void navigator.clipboard.writeText(created.secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const close = () => {
    setName("");
    setCreated(null);
    create.reset();
    onClose();
  };

  const createError =
    create.error instanceof ApiError ? create.error.message : create.error ? "Failed." : null;

  return (
    <>
      <Sheet open={principal !== null} onOpenChange={(o) => !o && close()}>
        <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
          <SheetHeader className="border-b px-6 py-5 text-left">
            <SheetTitle className="text-xl">API keys</SheetTitle>
            <SheetDescription>
              {principal ? `For ${principal.name}. ` : ""}A key authenticates the gateway as this
              identity — it works on every toolkit this identity can access.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
            {/* One-time secret reveal after creation. */}
            {created && (
              <div className="space-y-2 rounded-xl border border-emerald-600/30 bg-emerald-50 p-4">
                <p className="text-sm font-medium text-emerald-800">
                  Copy this key now — you won't see it again.
                </p>
                <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
                  <span className="min-w-0 flex-1 truncate font-mono text-xs">
                    {created.secret}
                  </span>
                  <button
                    type="button"
                    onClick={copySecret}
                    title="Copy"
                    className="shrink-0 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Create form. */}
            <div className="space-y-2">
              <label htmlFor="key-name" className="text-sm font-medium">
                New key
              </label>
              <div className="flex items-center gap-2">
                <Input
                  id="key-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submit();
                    }
                  }}
                  placeholder="e.g. Codex – production"
                  className="h-9"
                />
                <Button
                  size="sm"
                  className="h-9 rounded-lg"
                  onClick={submit}
                  disabled={!name.trim() || create.isPending}
                >
                  {create.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                  Create
                </Button>
              </div>
              {createError && <p className="text-xs text-destructive">{createError}</p>}
            </div>

            {/* Existing keys. */}
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Existing keys
              </p>
              {isLoading ? (
                <Skeleton className="h-12 w-full rounded-lg" />
              ) : keys.length === 0 ? (
                <p className="text-sm text-muted-foreground">No keys yet.</p>
              ) : (
                <ul className="space-y-1.5">
                  {keys.map((k) => (
                    <li
                      key={k.id}
                      className="flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{k.name}</div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {k.key_prefix}…
                          {k.revoked_at && <span className="ml-2 text-destructive">revoked</span>}
                          {!k.revoked_at && k.last_used_at && (
                            <span className="ml-2">
                              last used {new Date(k.last_used_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      {!k.revoked_at && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              title="Actions"
                              className="shrink-0 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => setRevokeTarget(k)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Revoke
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog open={revokeTarget !== null} onOpenChange={(o) => !o && setRevokeTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke this API key?</AlertDialogTitle>
            <AlertDialogDescription>
              Any client using <span className="font-mono">{revokeTarget?.key_prefix}…</span> will
              immediately lose access to the gateway. This can't be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
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
