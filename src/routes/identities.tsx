import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Bot,
  Braces,
  BriefcaseBusiness,
  Fingerprint,
  KeyRound,
  Loader2,
  Menu,
  MoreVertical,
  Plus,
  Search,
  Settings,
  Trash2,
  UserRound,
  Wrench,
} from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import {
  DeleteIdentityDialog,
  IdentityDetailSheet,
  type IdentityTab,
} from "@/components/identity-detail-sheet";
import { ToolkitSelectionIndicator } from "@/components/mcp-connect";
import { McpServerCluster } from "@/components/toolkit-cluster";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ApiError, apiRequest } from "@/lib/api-client";
import { brandIcon } from "@/lib/brand-icons";
import type {
  CatalogServer,
  Page,
  Principal,
  PrincipalCreate,
  PrincipalType,
  ToolkitAccessUpsert,
} from "@/lib/mcp-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/identities")({
  head: () => ({
    meta: [
      { title: "Identities" },
      {
        name: "description",
        content: "Manage the identities that call your MCP gateway.",
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

const TYPE_ICON: Record<PrincipalType, typeof UserRound> = {
  user: UserRound,
  agent: Bot,
  service_account: BriefcaseBusiness,
  api_client: Braces,
};

function PrincipalTypeIcon({ type }: { type: PrincipalType }) {
  const Icon = TYPE_ICON[type];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          aria-label={TYPE_LABEL[type]}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </TooltipTrigger>
      <TooltipContent side="top">{TYPE_LABEL[type]}</TooltipContent>
    </Tooltip>
  );
}

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

/** Row-hover "…" menu with per-identity actions. */
function PrincipalRowActions({
  principal,
  onOpen,
  onDelete,
}: {
  principal: Principal;
  onOpen: (tab: IdentityTab) => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg opacity-0 transition group-hover:opacity-100 data-[state=open]:opacity-100"
          aria-label={`Actions for ${principal.name}`}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => onOpen("general")}>
          <Settings className="h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onOpen("toolkits")}>
          <Wrench className="h-4 w-4" />
          Toolkits
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onOpen("credentials")}>
          <KeyRound className="h-4 w-4" />
          Credentials
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onOpen("agent-setup")}>
          <Bot className="h-4 w-4" />
          {principal.type === "agent" ? "Agent Setup" : "Connect"}
        </DropdownMenuItem>
        {principal.can_delete && (
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            onSelect={onDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PrincipalsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [deletePrincipal, setDeletePrincipal] = useState<Principal | null>(null);
  // The identity whose detail sheet is open, plus which tab it landed on.
  const [detail, setDetail] = useState<{ id: string; tab: IdentityTab } | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["principals", "with-toolkits"],
    queryFn: () => apiRequest<Page<Principal>>("/api/v1/identities?limit=200&include=mcp_servers"),
    staleTime: 30 * 1000,
  });
  const principals = useMemo(() => data?.items ?? [], [data]);

  // Resolve from the live list so the sheet reflects renames and status changes.
  const selected = useMemo(
    () => principals.find((p) => p.id === detail?.id) ?? null,
    [principals, detail],
  );

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
                The identities that call your MCP gateway.
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
            <TooltipProvider delayDuration={200}>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Name</th>
                    <th className="px-5 py-3 font-medium">Type</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading &&
                    Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              {Array.from({ length: 2 }).map((_, j) => (
                                <Skeleton key={j} className="h-8 w-8 rounded-lg" />
                              ))}
                            </div>
                            <div>
                              <Skeleton className="h-5 w-48 max-w-full" />
                              <Skeleton className="mt-2 h-3 w-24 max-w-full" />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <Skeleton className="h-5 w-24" />
                        </td>
                        <td className="px-5 py-4">
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </td>
                        <td className="px-5 py-4" />
                      </tr>
                    ))}

                  {!isLoading && principals.length === 0 && (
                    <tr>
                      <td className="px-5 py-8 text-center text-muted-foreground" colSpan={4}>
                        No identities yet.
                      </td>
                    </tr>
                  )}

                  {principals.map((p) => (
                    <tr
                      key={p.id}
                      className="group cursor-pointer border-b last:border-0 hover:bg-muted/40"
                      onClick={() => setDetail({ id: p.id, tab: "general" })}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <McpServerCluster servers={p.mcp_servers ?? []} />
                          <div className="min-w-0">
                            <div className="font-medium">{p.name}</div>
                            {p.slug && (
                              <div className="text-xs text-muted-foreground">/{p.slug}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <PrincipalTypeIcon type={p.type} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={p.status} />
                      </td>
                      {/* The menu opens the same sheet on a chosen tab, so don't also fire the row. */}
                      <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <PrincipalRowActions
                          principal={p}
                          onOpen={(tab) => setDetail({ id: p.id, tab })}
                          onDelete={() => setDeletePrincipal(p)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TooltipProvider>
          </div>
        </main>
      </div>

      <CreatePrincipalDialog open={createOpen} onOpenChange={setCreateOpen} />

      <DeleteIdentityDialog
        principal={deletePrincipal}
        open={deletePrincipal !== null}
        onOpenChange={(open) => !open && setDeletePrincipal(null)}
      />

      <IdentityDetailSheet
        principal={selected}
        initialTab={detail?.tab ?? "general"}
        onOpenChange={(open) => !open && setDetail(null)}
      />
    </div>
  );
}

/** Small square brand/logo mark for a catalog server, matching the catalog rows. */
function ServerMark({ server }: { server: CatalogServer }) {
  const frame = "grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-md";
  if (server.logo_url) {
    return (
      <span className={cn(frame, "border border-slate-200 bg-white")}>
        <img
          src={server.logo_url}
          alt=""
          className="h-5 w-5 object-contain"
          loading="lazy"
          aria-hidden="true"
        />
      </span>
    );
  }
  const icon = brandIcon(server.icon_key);
  if (icon) {
    return <span className={cn(frame, "border border-slate-200 bg-white text-base")}>{icon}</span>;
  }
  return (
    <span
      className={cn(
        frame,
        "bg-gradient-to-br from-sky-500 to-indigo-600 text-xs font-semibold uppercase text-white",
      )}
      aria-hidden="true"
    >
      {server.name.charAt(0)}
    </span>
  );
}

/**
 * Create identity flow, modeled on the "Connect to your MCP server" sheet: name
 * the identity, then pick the MCPs it should reach. Selecting an MCP grants the
 * new identity access to a toolkit that exposes that server's tools — so the
 * runtime can call those tools as soon as the identity exists. Servers that the
 * org hasn't finished configuring (`enabled: false`, no toolkit) can't be
 * selected and are surfaced with a link to complete their setup.
 */
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
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const reset = () => {
    setName("");
    setSlug("");
    setType("api_client");
    setSearch("");
    setSelected(new Set());
  };

  const { data: catalog, isLoading: catalogLoading } = useQuery({
    queryKey: ["mcp-catalog", "all"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    enabled: open,
    staleTime: 60 * 1000,
  });

  // Configurable servers (those exposing at least one toolkit) sort first so the
  // selectable options lead; each keeps its enabled/incomplete state for the row.
  const servers = useMemo(() => {
    const all = catalog ?? [];
    const q = search.trim().toLowerCase();
    const matched = q
      ? all.filter((s) => s.name.toLowerCase().includes(q) || s.slug.toLowerCase().includes(q))
      : all;
    const selectable = (s: CatalogServer) => s.enabled && s.toolkit_ids.length > 0;
    return [...matched].sort((a, b) => Number(selectable(b)) - Number(selectable(a)));
  }, [catalog, search]);

  const toggle = (slug: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const create = useMutation({
    mutationFn: async () => {
      const body: PrincipalCreate = { name: name.trim(), type };
      if (slug.trim()) body.slug = slug.trim();
      const principal = await apiRequest<Principal>("/api/v1/identities", {
        method: "POST",
        body: JSON.stringify(body),
      });

      // Grant the identity access to one toolkit per selected server. One toolkit
      // is enough to reach that server's tools through the gateway.
      const byslug = new Map((catalog ?? []).map((s) => [s.slug, s]));
      const toolkitIds = new Set<string>();
      for (const serverSlug of selected) {
        const server = byslug.get(serverSlug);
        const toolkitId = server?.toolkit_ids[0];
        if (toolkitId) toolkitIds.add(toolkitId);
      }
      for (const toolkitId of toolkitIds) {
        const grant: ToolkitAccessUpsert = {
          toolkit_id: toolkitId,
          access_mode: "full",
          enabled: true,
        };
        await apiRequest<unknown>(`/api/v1/identities/${principal.id}/toolkit-access`, {
          method: "PUT",
          body: JSON.stringify(grant),
        });
      }
      return principal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["principals"] });
      queryClient.invalidateQueries({ queryKey: ["mcp-catalog"] });
      reset();
      onOpenChange(false);
    },
  });

  const close = (nextOpen: boolean) => {
    if (create.isPending) return;
    if (!nextOpen) {
      create.reset();
      reset();
    }
    onOpenChange(nextOpen);
  };

  const submit = () => {
    if (!name.trim() || selected.size === 0) return;
    create.mutate();
  };

  const createError =
    create.error instanceof ApiError
      ? create.error.message
      : create.error
        ? "Couldn't create identity."
        : null;

  const selectedCount = selected.size;

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent
        side="right"
        className="inset-y-2 right-2 flex h-auto w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden rounded-xl p-0 sm:max-w-xl"
      >
        <SheetHeader className="border-b px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Bot className="h-5 w-5 text-muted-foreground" />
            New identity
          </SheetTitle>
          <SheetDescription>
            Add a new identity for an agent, service, or API client, then choose the MCPs it should
            access. Each connector authenticates using credentials tied to the identity, not to
            individual users.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <div className="space-y-2">
            <Label htmlFor="principal-name">Name</Label>
            <Input
              id="principal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Codex production agent"
              disabled={create.isPending}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
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
                placeholder="Optional"
                disabled={create.isPending}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label>Choose your identity's tools</Label>
              <span
                className={cn(
                  "rounded-md px-2 py-1 text-xs font-medium",
                  selectedCount === 0
                    ? "bg-lime-100 text-lime-800"
                    : "bg-emerald-100 text-emerald-700",
                )}
              >
                {selectedCount === 0
                  ? "Select at least 1 MCP"
                  : `${selectedCount} MCP${selectedCount === 1 ? "" : "s"} selected`}
              </span>
            </div>

            <div className="rounded-xl border">
              <div className="border-b p-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search MCPs..."
                    className="pl-9"
                    disabled={create.isPending}
                  />
                </div>
              </div>

              <div className="max-h-[280px] overflow-y-auto p-1.5">
                {catalogLoading ? (
                  <div className="space-y-1.5 p-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 px-2 py-2">
                        <Skeleton className="h-4 w-4 rounded" />
                        <Skeleton className="h-7 w-7 rounded-md" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    ))}
                  </div>
                ) : servers.length === 0 ? (
                  <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                    No MCPs match "{search}".
                  </p>
                ) : (
                  <ul className="space-y-0.5">
                    {servers.map((server) => {
                      const configurable = server.enabled && server.toolkit_ids.length > 0;
                      const checked = selected.has(server.slug);
                      if (!configurable) {
                        return (
                          <li
                            key={server.slug}
                            className="flex items-center gap-3 rounded-lg px-2 py-2 opacity-70"
                          >
                            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border border-muted-foreground/30 bg-muted" />
                            <ServerMark server={server} />
                            <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                              {server.name}
                            </span>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              Incomplete setup
                            </span>
                            <Link
                              to="/mcp/$view"
                              params={{ view: "registry" }}
                              className="shrink-0 rounded-md border px-2 py-1 text-xs font-medium text-foreground transition hover:bg-muted"
                            >
                              Fix
                            </Link>
                          </li>
                        );
                      }
                      return (
                        <li key={server.slug}>
                          <button
                            type="button"
                            onClick={() => toggle(server.slug)}
                            aria-pressed={checked}
                            disabled={create.isPending}
                            className={cn(
                              "group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                              checked ? "bg-emerald-50" : "hover:bg-muted/60",
                            )}
                          >
                            <ToolkitSelectionIndicator
                              checked={checked}
                              className={checked ? undefined : "opacity-100"}
                            />
                            <ServerMark server={server} />
                            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
                              {server.name}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {createError && <p className="text-sm text-destructive">{createError}</p>}
        </div>

        <div className="flex gap-3 border-t px-6 py-4">
          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={() => close(false)}
            disabled={create.isPending}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 rounded-full"
            onClick={submit}
            disabled={!name.trim() || selectedCount === 0 || create.isPending}
          >
            {create.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Create identity
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
