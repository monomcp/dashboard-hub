import { type ReactNode, useCallback, useMemo, useState } from "react";
import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Building2,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  Link2,
  Menu,
  Plus,
  Search,
  Shield,
  Tag,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { AccountMenu } from "@/components/account-menu";
import { AppsMenu } from "@/components/apps-menu";
import { GithubAuditLog } from "@/components/github-audit-log";
import { GithubIcon } from "@/components/github-icon";
import { PermissionsMatrix, PermissionsMatrixLoading } from "@/components/permissions-matrix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";
import {
  githubManageUrl,
  type GithubInstallation,
  type GithubInstallUrlResponse,
  type GithubRepository,
  type GithubStatusResponse,
  type Page,
} from "@/lib/github-types";
import type { CatalogServer } from "@/lib/mcp-types";
import { lightPermissionsTheme } from "@/lib/permissions-theme";
import { cn } from "@/lib/utils";

type GithubView =
  | "connect"
  | "accounts"
  | "repositories"
  | "permissions"
  | "audit"
  | "status"
  | "releases";

const GITHUB_VIEWS: GithubView[] = [
  "connect",
  "accounts",
  "repositories",
  "permissions",
  "audit",
  "status",
  "releases",
];

function isGithubView(value: string): value is GithubView {
  return (GITHUB_VIEWS as string[]).includes(value);
}

export const Route = createFileRoute("/github/$view")({
  beforeLoad: ({ params }) => {
    if (!isGithubView(params.view)) {
      throw redirect({ to: "/github/$view", params: { view: "connect" }, replace: true });
    }
  },
  head: ({ params }) => ({
    meta: [
      { title: "GitHub Integration — MCP" },
      {
        name: "description",
        content: "Connect GitHub, pick which repositories agents can use, and audit access.",
      },
    ],
    links: [{ rel: "canonical", href: `/github/${params.view}` }],
  }),
  component: GithubPage,
});

const GITHUB_NAV = [
  { id: "connect", label: "Connect GitHub", icon: Link2 },
  { id: "accounts", label: "Installed accounts", icon: Building2 },
  { id: "repositories", label: "Repositories", icon: BookOpen },
  { id: "permissions", label: "Permissions", icon: KeyRound },
  { id: "audit", label: "Audit log", icon: Activity },
  { id: "status", label: "Status", icon: CheckCircle2 },
  { id: "releases", label: "Release Notes Tracking", icon: Tag },
] satisfies { id: GithubView; label: string; icon: typeof Link2 }[];

const REPOSITORIES_LIMIT = 200;

const AVATAR_COLORS = [
  "bg-violet-500",
  "bg-teal-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-emerald-500",
];

function avatarColor(login: string): string {
  let hash = 0;
  for (const char of login) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function repositoryMatchesSearch(repository: GithubRepository, search: string): boolean {
  const query = search.toLowerCase();
  return [
    repository.full_name,
    repository.name,
    repository.default_branch,
    repository.language,
  ].some((value) => value?.toLowerCase().includes(query));
}

function GithubPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const view = Route.useParams().view as GithubView;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");

  const handleApiError = useCallback(
    (err: unknown, fallback = "GitHub request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      toast.error(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  const installations = useQuery({
    queryKey: ["github-installations"],
    queryFn: () => apiRequest<Page<GithubInstallation>>("/api/v1/github/installations?limit=200"),
    staleTime: 15 * 1000,
  });

  const repositories = useQuery({
    queryKey: ["github-repositories"],
    queryFn: () =>
      apiRequest<Page<GithubRepository>>(`/api/v1/github/repositories?limit=${REPOSITORIES_LIMIT}`),
    enabled: view === "repositories",
    staleTime: 15 * 1000,
  });

  const trimmedRepositorySearch = search.trim();
  const repositoriesSpanMultiplePages = Boolean(
    repositories.data && repositories.data.total > repositories.data.limit,
  );
  const shouldSearchRepositoriesOnServer =
    view === "repositories" && trimmedRepositorySearch.length > 0 && repositoriesSpanMultiplePages;

  const searchedRepositories = useQuery({
    queryKey: ["github-repositories", "search", trimmedRepositorySearch],
    queryFn: () =>
      apiRequest<Page<GithubRepository>>(
        `/api/v1/github/repositories?limit=${REPOSITORIES_LIMIT}&q=${encodeURIComponent(trimmedRepositorySearch)}`,
      ),
    enabled: shouldSearchRepositoriesOnServer,
    staleTime: 15 * 1000,
  });

  const visibleRepositories = useMemo(() => {
    const items = repositories.data?.items ?? [];
    if (!trimmedRepositorySearch || repositoriesSpanMultiplePages) return items;
    return items.filter((repository) =>
      repositoryMatchesSearch(repository, trimmedRepositorySearch),
    );
  }, [repositories.data, repositoriesSpanMultiplePages, trimmedRepositorySearch]);

  const repositoryItems = shouldSearchRepositoriesOnServer
    ? (searchedRepositories.data?.items ?? [])
    : visibleRepositories;
  const repositoriesLoading =
    repositories.isLoading || (shouldSearchRepositoriesOnServer && searchedRepositories.isLoading);
  const repositoriesError =
    repositories.isError || (shouldSearchRepositoriesOnServer && searchedRepositories.isError);

  const { data: catalog, isLoading: catalogLoading } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    enabled: view === "permissions",
    staleTime: 60 * 1000,
  });
  const githubServer = catalog?.find((server) => server.slug === "github");

  const status = useQuery({
    queryKey: ["github-status"],
    queryFn: () => apiRequest<GithubStatusResponse>("/api/v1/github/status"),
    enabled: view === "status",
    staleTime: 15 * 1000,
  });

  const install = useMutation({
    mutationFn: () => apiRequest<GithubInstallUrlResponse>("/api/v1/github/install-url"),
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (err) => handleApiError(err, "Couldn't start the GitHub install flow"),
  });

  const disconnectInstallation = useMutation({
    mutationFn: (installationId: string) =>
      apiRequest(`/api/v1/github/installations/${installationId}`, { method: "DELETE" }),
    onSuccess: () => {
      toast.success("Account disconnected");
      void queryClient.invalidateQueries({ queryKey: ["github-installations"] });
    },
    onError: (err) => handleApiError(err, "Couldn't disconnect that account"),
  });

  const toggleRepository = useMutation({
    mutationFn: ({ repositoryId, connected }: { repositoryId: string; connected: boolean }) =>
      apiRequest<GithubRepository>(`/api/v1/github/repositories/${repositoryId}`, {
        method: "PATCH",
        body: JSON.stringify({ connected }),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["github-repositories"] });
    },
    onError: (err) => handleApiError(err, "Couldn't update that repository"),
  });

  const connectedCount = installations.data?.items.length ?? 0;
  const active = GITHUB_NAV.find((n) => n.id === view) ?? GITHUB_NAV[0];

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
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#181717]">
              <GithubIcon className="h-5 w-5" color="#ffffff" />
            </div>
            <span className="text-xl font-medium tracking-tight">GitHub</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <nav className="space-y-1">
              {GITHUB_NAV.map((item) => {
                const isActive = view === item.id;
                return (
                  <Link
                    key={item.id}
                    to="/github/$view"
                    params={{ view: item.id }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0 text-current/75" />
                    <span className="flex-1 truncate text-left">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:pr-6">
          {view === "connect" && (
            <ConnectView
              connectedCount={connectedCount}
              installing={install.isPending}
              onInstall={() => install.mutate()}
            />
          )}

          {view === "accounts" && (
            <AccountsView
              installations={installations.data?.items ?? []}
              isLoading={installations.isLoading}
              isError={installations.isError}
              onInstall={() => install.mutate()}
              installing={install.isPending}
              onDisconnect={(id) => disconnectInstallation.mutate(id)}
              disconnectingId={
                disconnectInstallation.isPending ? String(disconnectInstallation.variables) : null
              }
            />
          )}

          {view === "repositories" && (
            <RepositoriesView
              repositories={repositoryItems}
              isLoading={repositoriesLoading}
              isError={repositoriesError}
              search={search}
              onSearchChange={setSearch}
              onInstall={() => install.mutate()}
              installing={install.isPending}
              onToggle={(repositoryId, connected) =>
                toggleRepository.mutate({ repositoryId, connected })
              }
            />
          )}

          {view === "permissions" && (
            <PermissionsView
              server={githubServer}
              catalogLoading={catalogLoading}
              onApiError={handleApiError}
            />
          )}

          {view === "audit" && (
            <div className="mt-2">
              <div className="mb-6">
                <h1 className="text-2xl font-medium tracking-tight">{active.label}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Every connect, disconnect, and repository toggle — who did it and when.
                </p>
              </div>
              <GithubAuditLog onApiError={handleApiError} />
            </div>
          )}

          {view === "status" && (
            <StatusView data={status.data} isLoading={status.isLoading} isError={status.isError} />
          )}

          {view === "releases" && <ReleasesView />}
        </main>
      </div>
    </div>
  );
}

function ViewHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

function ConnectView({
  connectedCount,
  installing,
  onInstall,
}: {
  connectedCount: number;
  installing: boolean;
  onInstall: () => void;
}) {
  return (
    <div className="mt-2 max-w-3xl">
      <div className="mb-6 flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#181717]">
          <GithubIcon className="h-8 w-8" color="#ffffff" />
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Step 1
          </div>
          <h1 className="text-2xl font-medium tracking-tight">Connect GitHub</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Install the MonoMCP GitHub App on the accounts and repositories you want to expose.
            MonoMCP uses GitHub&apos;s app permissions — you pick the repos, we never see anything
            else. You can revoke access any time from GitHub or from this page.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button
          className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
          disabled={installing}
          onClick={onInstall}
        >
          <GithubIcon className="h-4 w-4" color="#ffffff" />
          {installing ? "Redirecting…" : "Install MonoMCP GitHub App"}
          <ExternalLink className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="rounded-full" asChild>
          <Link to="/github/$view" params={{ view: "accounts" }}>
            <Building2 className="h-4 w-4" />
            View installed accounts
          </Link>
        </Button>
      </div>

      {connectedCount > 0 && (
        <div className="mb-8 rounded-2xl border border-emerald-600/30 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-800">
            {connectedCount} {connectedCount === 1 ? "account" : "accounts"} already connected. Add
            more, or head over to{" "}
            <Link
              to="/github/$view"
              params={{ view: "repositories" }}
              className="font-semibold underline underline-offset-2"
            >
              Repositories
            </Link>{" "}
            to pick which ones agents can use.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <FeatureCard
          icon={Shield}
          title="Fine-grained access"
          description="Choose repos per install. Rotate at any time from github.com/settings."
        />
        <FeatureCard
          icon={Users}
          title="Per-principal permissions"
          description="Decide which agents & teammates can call each GitHub tool."
        />
        <FeatureCard
          icon={Activity}
          title="Full audit trail"
          description="Every action is logged with actor, tool, repo and outcome."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Shield;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-900/5 text-neutral-900">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 text-base font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function AccountsView({
  installations,
  isLoading,
  isError,
  onInstall,
  installing,
  onDisconnect,
  disconnectingId,
}: {
  installations: GithubInstallation[];
  isLoading: boolean;
  isError: boolean;
  onInstall: () => void;
  installing: boolean;
  onDisconnect: (id: string) => void;
  disconnectingId: string | null;
}) {
  return (
    <>
      <ViewHeader
        title="Installed accounts"
        description="GitHub organizations and users where the MonoMCP app is installed."
        action={
          <Button className="rounded-full" disabled={installing} onClick={onInstall}>
            <Plus className="h-4 w-4" />
            Add account
          </Button>
        }
      />

      {isError && (
        <p className="mb-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Couldn&apos;t load installed accounts. Please try again.
        </p>
      )}

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-2xl" />
          ))}
        </div>
      )}

      {!isLoading && installations.length === 0 && !isError && (
        <p className="rounded-2xl bg-white px-5 py-10 text-center text-sm text-muted-foreground ring-1 ring-black/5">
          No accounts connected yet.
        </p>
      )}

      <div className="space-y-3">
        {installations.map((installation) => {
          const isSuspended = installation.status === "suspended";
          return (
            <div
              key={installation.id}
              className={cn(
                "rounded-2xl bg-white p-4 ring-1",
                isSuspended ? "ring-amber-500/30" : "ring-black/5",
              )}
            >
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-semibold text-white",
                    avatarColor(installation.account_login),
                  )}
                >
                  {installation.account_login.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">{installation.account_login}</span>
                    <Badge variant="secondary" className="text-[10px] uppercase">
                      {installation.account_type}
                    </Badge>
                    {isSuspended && (
                      <Badge className="bg-amber-500 text-[10px] uppercase text-white hover:bg-amber-500">
                        Suspended
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {installation.repository_count}{" "}
                    {installation.repository_count === 1 ? "repository" : "repositories"} ·
                    installed {new Date(installation.installed_at).toLocaleDateString()}
                  </p>
                </div>
                <a
                  href={githubManageUrl(installation)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex shrink-0 items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground"
                >
                  Manage on GitHub
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 rounded-full text-muted-foreground hover:text-destructive"
                  aria-label={`Disconnect ${installation.account_login}`}
                  disabled={disconnectingId === installation.id}
                  onClick={() => onDisconnect(installation.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {isSuspended && (
                <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    GitHub access is suspended. MonoMCP cannot read or write repositories until this
                    app is reactivated.
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function RepositoriesView({
  repositories,
  isLoading,
  isError,
  search,
  onSearchChange,
  onInstall,
  installing,
  onToggle,
}: {
  repositories: GithubRepository[];
  isLoading: boolean;
  isError: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  onInstall: () => void;
  installing: boolean;
  onToggle: (repositoryId: string, connected: boolean) => void;
}) {
  return (
    <>
      <ViewHeader
        title="Repositories"
        description="Pick which repositories are exposed to MCP tools. Only connected repos are readable and writable by agents."
        action={
          <Button className="rounded-full" disabled={installing} onClick={onInstall}>
            <Plus className="h-4 w-4" />
            Add repositories
          </Button>
        }
      />

      <div className="relative mb-4 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by owner/repo…"
          className="rounded-full pl-9"
        />
      </div>

      {isError && (
        <p className="mb-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Couldn&apos;t load repositories. Please try again.
        </p>
      )}

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      ) : repositories.length === 0 && !isError ? (
        <p className="rounded-2xl bg-white px-5 py-10 text-center text-sm text-muted-foreground ring-1 ring-black/5">
          No repositories match yet.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repository</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Last activity</TableHead>
                <TableHead className="text-right">Connected</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repositories.map((repo) => (
                <TableRow key={repo.id}>
                  <TableCell>
                    <div className="font-medium">{repo.full_name}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      {repo.default_branch && <span>⑂ {repo.default_branch}</span>}
                      {repo.language && <span>{repo.language}</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px] uppercase">
                      {repo.private ? "Private" : "Public"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {repo.github_updated_at
                      ? formatDistanceToNow(new Date(repo.github_updated_at), { addSuffix: true })
                      : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={repo.connected}
                      onCheckedChange={(checked) => onToggle(repo.id, checked)}
                      aria-label={`${repo.connected ? "Disconnect" : "Connect"} ${repo.full_name}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

function PermissionsView({
  server,
  catalogLoading,
  onApiError,
}: {
  server: CatalogServer | undefined;
  catalogLoading: boolean;
  onApiError: (err: unknown, fallback?: string) => void;
}) {
  const toolkitIds = useMemo(() => server?.toolkit_ids ?? [], [server]);

  if (catalogLoading && !server) {
    return <PermissionsMatrixLoading theme={lightPermissionsTheme} />;
  }

  return (
    <PermissionsMatrix
      toolkitIds={toolkitIds}
      moduleSlugs={["github"]}
      enabled={Boolean(server?.enabled)}
      theme={lightPermissionsTheme}
      toolsNoun="GitHub"
      stripToolPrefix={/^github_/}
      disabledHint="Who can use the GitHub tools, and how. Enable the GitHub MCP server first to start granting access."
      connectHint="No GitHub toolkit is connected yet — enable GitHub from the MCP catalog."
      onApiError={onApiError}
    />
  );
}

function StatusView({
  data,
  isLoading,
  isError,
}: {
  data: GithubStatusResponse | undefined;
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <>
      <ViewHeader title="Status" description="Connection health for the GitHub integration." />

      {isError && (
        <p className="mb-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Couldn&apos;t load status. Please try again.
        </p>
      )}

      {isLoading || !data ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <>
          {!data.app_configured && (
            <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-800">
                The GitHub App isn&apos;t configured on this server yet (missing app id/private key)
                — installs and syncs will fail until it is.
              </p>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Installed accounts" value={data.installation_count} />
            <StatCard label="Total repositories" value={data.repository_count} />
            <StatCard label="Connected repositories" value={data.connected_repository_count} />
            <StatCard
              label="Last synced"
              value={
                data.last_synced_at
                  ? formatDistanceToNow(new Date(data.last_synced_at), { addSuffix: true })
                  : "Never"
              }
            />
          </div>
        </>
      )}
    </>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
      <div className="text-2xl font-medium tracking-tight">{value}</div>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ReleasesView() {
  return (
    <>
      <ViewHeader
        title="Release Notes Tracking"
        description="Automatically track GitHub releases across connected repos."
      />
      <div className="rounded-2xl bg-white px-5 py-10 text-center ring-1 ring-black/5">
        <Tag className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 text-sm font-medium">Coming soon</p>
        <p className="mt-1 text-sm text-muted-foreground">
          This will watch connected repos&apos; releases and feed them into your content pipeline.
        </p>
      </div>
    </>
  );
}
