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
import { ToolkitCluster } from "@/components/toolkit-cluster";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ApiError, apiRequest } from "@/lib/api-client";
import type { Page, Principal, PrincipalCreate, PrincipalType } from "@/lib/mcp-types";
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

/** Row-hover "…" menu with per-identity actions; Agent Setup only appears for agent identities. */
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
        {principal.type === "agent" && (
          <DropdownMenuItem onSelect={() => onOpen("agent-setup")}>
            <Bot className="h-4 w-4" />
            Agent Setup
          </DropdownMenuItem>
        )}
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
    queryFn: () => apiRequest<Page<Principal>>("/api/v1/principals?limit=200&include=toolkit_ids"),
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
                          <ToolkitCluster toolkits={p.toolkits ?? []} />
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
