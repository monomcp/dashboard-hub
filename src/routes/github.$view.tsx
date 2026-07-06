import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  BookOpen,
  Building2,
  CheckCircle2,
  CircleDot,
  Download,
  ExternalLink,
  GitBranch,
  GitPullRequest,
  Github,
  KeyRound,
  Link2,
  ListChecks,
  Menu,
  Plus,
  Search,
  Settings,
  Shield,
  Tag,
  Trash2,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu } from "@/components/apps-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type GithubView =
  | "connect"
  | "accounts"
  | "repositories"
  | "permissions"
  | "activity"
  | "status"
  | "releases";

const GITHUB_VIEWS: GithubView[] = [
  "connect",
  "accounts",
  "repositories",
  "permissions",
  "activity",
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
      { title: "GitHub — MonoMCP Integration" },
      {
        name: "description",
        content:
          "Connect GitHub repositories to MonoMCP, configure tool permissions, and monitor status and audit logs.",
      },
      { property: "og:title", content: "GitHub — MonoMCP Integration" },
      {
        property: "og:description",
        content:
          "Connect GitHub repositories to MonoMCP, configure tool permissions, and monitor status and audit logs.",
      },
    ],
    links: [{ rel: "canonical", href: `/github/${params.view}` }],
  }),
  component: GithubPage,
});

const GITHUB_NAV: { id: GithubView; label: string; icon: typeof Settings }[] = [
  { id: "connect", label: "Connect GitHub", icon: Link2 },
  { id: "accounts", label: "Installed accounts", icon: Building2 },
  { id: "repositories", label: "Repositories", icon: BookOpen },
  { id: "permissions", label: "Permissions", icon: KeyRound },
  { id: "activity", label: "Audit log", icon: Activity },
  { id: "status", label: "Status", icon: CheckCircle2 },
  { id: "releases", label: "Release Notes Tracking", icon: Tag },
];

// Rough mapping of the GitHub MCP toolset — grouped as GitHub itself groups
// them in the official server (repos, issues, pull requests, actions, code).
type ToolGroup = {
  id: string;
  label: string;
  icon: typeof Settings;
  scope: "read" | "write";
  tools: { name: string; description: string }[];
};

const TOOL_GROUPS: ToolGroup[] = [
  {
    id: "repos",
    label: "Repositories",
    icon: BookOpen,
    scope: "read",
    tools: [
      { name: "search_repositories", description: "Search for GitHub repositories." },
      { name: "get_file_contents", description: "Read a file or directory from a repo." },
      { name: "list_commits", description: "List commits on a branch." },
      { name: "list_branches", description: "List branches for a repository." },
      { name: "create_branch", description: "Create a new branch from a base ref." },
      {
        name: "create_or_update_file",
        description: "Create or update a single file in a repository.",
      },
      { name: "push_files", description: "Commit multiple files in a single push." },
    ],
  },
  {
    id: "issues",
    label: "Issues",
    icon: CircleDot,
    scope: "write",
    tools: [
      { name: "list_issues", description: "List issues in a repository, with filters." },
      { name: "get_issue", description: "Fetch a single issue by number." },
      { name: "create_issue", description: "Open a new issue." },
      { name: "update_issue", description: "Edit an existing issue (title, body, state, labels)." },
      { name: "add_issue_comment", description: "Post a comment to an issue." },
      { name: "search_issues", description: "Search issues and pull requests across GitHub." },
    ],
  },
  {
    id: "prs",
    label: "Pull requests",
    icon: GitPullRequest,
    scope: "write",
    tools: [
      { name: "list_pull_requests", description: "List PRs in a repository." },
      { name: "get_pull_request", description: "Fetch a PR with head/base metadata." },
      { name: "create_pull_request", description: "Open a new pull request." },
      { name: "create_pull_request_review", description: "Submit an approving / requesting-changes review." },
      { name: "merge_pull_request", description: "Merge a PR (merge, squash, or rebase)." },
    ],
  },
  {
    id: "actions",
    label: "Actions & workflows",
    icon: Workflow,
    scope: "write",
    tools: [
      { name: "list_workflows", description: "List workflows configured on a repo." },
      { name: "list_workflow_runs", description: "List recent runs for a workflow." },
      { name: "run_workflow", description: "Dispatch a workflow_dispatch event." },
      { name: "cancel_workflow_run", description: "Cancel a running workflow." },
    ],
  },
  {
    id: "code",
    label: "Code search",
    icon: Search,
    scope: "read",
    tools: [
      { name: "search_code", description: "Full-text search across code." },
      { name: "search_users", description: "Search GitHub users." },
    ],
  },
];

type Account = {
  id: string;
  login: string;
  type: "Organization" | "User";
  installedAt: string;
  repoCount: number;
  avatar: string;
};

const MOCK_ACCOUNTS: Account[] = [
  {
    id: "acc_1",
    login: "monomcp-labs",
    type: "Organization",
    installedAt: "Jun 12, 2026",
    repoCount: 12,
    avatar: "bg-gradient-to-br from-indigo-500 to-violet-600",
  },
  {
    id: "acc_2",
    login: "octocat",
    type: "User",
    installedAt: "Jul 04, 2026",
    repoCount: 3,
    avatar: "bg-gradient-to-br from-emerald-500 to-sky-500",
  },
];

type Repo = {
  id: string;
  account: string;
  name: string;
  visibility: "public" | "private";
  defaultBranch: string;
  language: string;
  lastActivity: string;
  connected: boolean;
  trackReleases: boolean;
};

const MOCK_REPOS: Repo[] = [
  {
    id: "r1",
    account: "monomcp-labs",
    name: "gateway",
    visibility: "private",
    defaultBranch: "main",
    language: "TypeScript",
    lastActivity: "2h ago",
    connected: true,
    trackReleases: true,
  },
  {
    id: "r2",
    account: "monomcp-labs",
    name: "console",
    visibility: "private",
    defaultBranch: "main",
    language: "TypeScript",
    lastActivity: "36m ago",
    connected: true,
    trackReleases: true,
  },
  {
    id: "r3",
    account: "monomcp-labs",
    name: "docs",
    visibility: "public",
    defaultBranch: "main",
    language: "MDX",
    lastActivity: "yesterday",
    connected: false,
    trackReleases: false,
  },
  {
    id: "r4",
    account: "octocat",
    name: "hello-world",
    visibility: "public",
    defaultBranch: "master",
    language: "Ruby",
    lastActivity: "4d ago",
    connected: true,
    trackReleases: false,
  },
];

type Release = {
  id: string;
  repo: string;
  tag: string;
  name: string;
  author: string;
  publishedAt: string;
  summary: string;
};

const MOCK_RELEASES: Release[] = [
  {
    id: "rel_1",
    repo: "monomcp-labs/gateway",
    tag: "v0.14.2",
    name: "Better OAuth token refresh",
    author: "alice",
    publishedAt: "Jul 05, 2026",
    summary: "Refresh loop bugfix + surface upstream 401s clearly to the caller.",
  },
  {
    id: "rel_2",
    repo: "monomcp-labs/console",
    tag: "v1.3.0",
    name: "Audit log improvements",
    author: "ben",
    publishedAt: "Jul 03, 2026",
    summary: "Filter by principal, export CSV, richer diff view for permission changes.",
  },
  {
    id: "rel_3",
    repo: "monomcp-labs/gateway",
    tag: "v0.14.1",
    name: "Rate limit gateway responses",
    author: "chloe",
    publishedAt: "Jun 28, 2026",
    summary: "Per-org and per-toolkit token bucket. New 429 error envelope.",
  },
];

type AuditEntry = {
  id: string;
  when: string;
  actor: string;
  tool: string;
  repo: string;
  status: "ok" | "error" | "denied";
  detail: string;
};

const MOCK_AUDIT: AuditEntry[] = [
  {
    id: "a1",
    when: "12:04:32",
    actor: "agent · release-notes-bot",
    tool: "list_pull_requests",
    repo: "monomcp-labs/console",
    status: "ok",
    detail: "state=closed base=main → 18 results",
  },
  {
    id: "a2",
    when: "12:04:29",
    actor: "user · alice",
    tool: "create_or_update_file",
    repo: "monomcp-labs/gateway",
    status: "ok",
    detail: "docs/CHANGELOG.md (+42 −0)",
  },
  {
    id: "a3",
    when: "12:03:11",
    actor: "agent · triage-bot",
    tool: "merge_pull_request",
    repo: "monomcp-labs/console",
    status: "denied",
    detail: "Blocked by permission policy (needs approval)",
  },
  {
    id: "a4",
    when: "12:01:52",
    actor: "agent · release-notes-bot",
    tool: "search_code",
    repo: "monomcp-labs/*",
    status: "ok",
    detail: 'q="TODO(sec)" → 4 hits',
  },
  {
    id: "a5",
    when: "11:58:04",
    actor: "user · ben",
    tool: "run_workflow",
    repo: "monomcp-labs/gateway",
    status: "error",
    detail: "workflow=ci.yml — GitHub returned 422 (missing input `env`)",
  },
];

function GithubPage() {
  const view = Route.useParams().view as GithubView;
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <Link to="/github/$view" params={{ view: "connect" }} className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-neutral-900 shadow-sm">
              <Github className="h-4 w-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-medium tracking-tight">GitHub</div>
              <div className="text-[11px] text-muted-foreground">
                Settings › Integrations › GitHub
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <nav className="space-y-1">
              {GITHUB_NAV.map((item) => {
                const active = view === item.id;
                return (
                  <Link
                    key={item.id}
                    to="/github/$view"
                    params={{ view: item.id }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      active
                        ? "bg-neutral-900 text-white"
                        : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1 truncate text-left">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        <main
          className={cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6")}
        >
          {view === "connect" && <ConnectView />}
          {view === "accounts" && <AccountsView />}
          {view === "repositories" && <RepositoriesView />}
          {view === "permissions" && <PermissionsView />}
          {view === "activity" && <AuditView />}
          {view === "status" && <StatusView />}
          {view === "releases" && <ReleasesView />}
        </main>
      </div>
    </div>
  );
}

// ── Step 1 · Connect ─────────────────────────────────────────────────────────
function ConnectView() {
  const installed = MOCK_ACCOUNTS.length > 0;

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-neutral-900">
            <Github className="h-7 w-7 text-white" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Step 1
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Connect GitHub</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Install the MonoMCP GitHub App on the accounts and repositories you want to expose.
              MonoMCP uses GitHub's app permissions — you pick the repos, we never see anything
              else. You can revoke access any time from GitHub or from this page.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            asChild
            className="h-11 gap-2 rounded-full bg-neutral-900 px-5 text-white hover:bg-neutral-800"
          >
            <a
              href="https://github.com/apps/monomcp/installations/new"
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" /> Install MonoMCP GitHub App
              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </a>
          </Button>
          <Button asChild variant="outline" className="h-11 gap-2 rounded-full">
            <Link to="/github/$view" params={{ view: "accounts" }}>
              <Building2 className="h-4 w-4" /> View installed accounts
            </Link>
          </Button>
        </div>

        {installed && (
          <div className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900 ring-1 ring-emerald-200">
            <CheckCircle2 className="h-4 w-4" />
            {MOCK_ACCOUNTS.length} account{MOCK_ACCOUNTS.length === 1 ? "" : "s"} already
            connected. Add more, or head over to{" "}
            <Link
              to="/github/$view"
              params={{ view: "repositories" }}
              className="font-medium underline underline-offset-2"
            >
              Repositories
            </Link>{" "}
            to pick which ones agents can use.
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Fine-grained access",
              body: "Choose repos per install. Rotate at any time from github.com/settings.",
            },
            {
              icon: Users,
              title: "Per-principal permissions",
              body: "Decide which agents & teammates can call each GitHub tool.",
            },
            {
              icon: Activity,
              title: "Full audit trail",
              body: "Every MCP call is logged with actor, tool, repo and outcome.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl bg-neutral-50 p-4 ring-1 ring-black/5">
              <f.icon className="h-5 w-5 text-neutral-900" />
              <div className="mt-3 text-sm font-medium">{f.title}</div>
              <p className="mt-1 text-xs text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Installed accounts ───────────────────────────────────────────────────────
function AccountsView() {
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);

  return (
    <section>
      <PageHeader
        title="Installed accounts"
        description="GitHub organizations and users where the MonoMCP app is installed."
        action={
          <Button asChild className="gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800">
            <a
              href="https://github.com/apps/monomcp/installations/new"
              target="_blank"
              rel="noreferrer"
            >
              <Plus className="h-4 w-4" /> Add account
            </a>
          </Button>
        }
      />
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
        <ul className="divide-y divide-black/5">
          {accounts.map((a) => (
            <li key={a.id} className="flex items-center gap-4 px-5 py-4">
              <div
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full text-sm font-semibold text-white shadow-sm",
                  a.avatar,
                )}
              >
                {a.login.slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{a.login}</span>
                  <Badge variant="secondary" className="text-[10px] uppercase">
                    {a.type}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {a.repoCount} repositories · installed {a.installedAt}
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild className="gap-1 text-muted-foreground">
                <a
                  href={`https://github.com/organizations/${a.login}/settings/installations`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Manage on GitHub <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-destructive"
                aria-label={`Remove ${a.login}`}
                onClick={() => setAccounts((prev) => prev.filter((acc) => acc.id !== a.id))}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
          {accounts.length === 0 && (
            <li className="px-5 py-12 text-center text-sm text-muted-foreground">
              No accounts connected yet. Install the MonoMCP GitHub App to get started.
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

// ── Repositories ─────────────────────────────────────────────────────────────
function RepositoriesView() {
  const [repos, setRepos] = useState(MOCK_REPOS);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return repos;
    return repos.filter((r) => `${r.account}/${r.name}`.toLowerCase().includes(needle));
  }, [q, repos]);

  return (
    <section>
      <PageHeader
        title="Repositories"
        description="Pick which repositories are exposed to MCP tools. Only connected repos are readable and writable by agents."
        action={
          <Button asChild variant="outline" className="gap-2 rounded-full">
            <a
              href="https://github.com/apps/monomcp/installations/new"
              target="_blank"
              rel="noreferrer"
            >
              <Plus className="h-4 w-4" /> Add repositories
            </a>
          </Button>
        }
      />

      <div className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by owner/repo…"
            className="rounded-full bg-white pl-9"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
        <div className="grid grid-cols-[minmax(0,1fr)_120px_120px_120px] items-center gap-4 border-b border-black/5 bg-neutral-50/60 px-5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          <span>Repository</span>
          <span>Visibility</span>
          <span>Last activity</span>
          <span className="text-right">Connected</span>
        </div>
        <ul className="divide-y divide-black/5">
          {filtered.map((r) => (
            <li
              key={r.id}
              className="grid grid-cols-[minmax(0,1fr)_120px_120px_120px] items-center gap-4 px-5 py-3"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">
                  {r.account}
                  <span className="text-muted-foreground">/</span>
                  {r.name}
                </div>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <GitBranch className="h-3 w-3" /> {r.defaultBranch}
                  </span>
                  <span>{r.language}</span>
                </div>
              </div>
              <Badge
                variant={r.visibility === "private" ? "secondary" : "outline"}
                className="w-fit text-[10px] uppercase"
              >
                {r.visibility}
              </Badge>
              <span className="text-xs text-muted-foreground">{r.lastActivity}</span>
              <div className="flex justify-end">
                <Switch
                  checked={r.connected}
                  onCheckedChange={(v) =>
                    setRepos((prev) =>
                      prev.map((row) => (row.id === r.id ? { ...row, connected: v } : row)),
                    )
                  }
                  aria-label={`Connect ${r.account}/${r.name}`}
                />
              </div>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-5 py-12 text-center text-sm text-muted-foreground">
              No repositories match "{q}".
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

// ── Permissions ──────────────────────────────────────────────────────────────
type Principal = { id: string; name: string; kind: "user" | "agent" };
const PRINCIPALS: Principal[] = [
  { id: "u1", name: "alice", kind: "user" },
  { id: "u2", name: "ben", kind: "user" },
  { id: "a1", name: "release-notes-bot", kind: "agent" },
  { id: "a2", name: "triage-bot", kind: "agent" },
];

type Perm = "allow" | "approval" | "block";
const PERM_LABEL: Record<Perm, string> = {
  allow: "Allow",
  approval: "Needs approval",
  block: "Block",
};
const PERM_CLASS: Record<Perm, string> = {
  allow: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
  approval: "bg-amber-100 text-amber-900 hover:bg-amber-200",
  block: "bg-rose-100 text-rose-800 hover:bg-rose-200",
};

function PermissionsView() {
  const [matrix, setMatrix] = useState<Record<string, Record<string, Perm>>>(() => {
    const init: Record<string, Record<string, Perm>> = {};
    for (const p of PRINCIPALS) {
      init[p.id] = {};
      for (const g of TOOL_GROUPS) {
        // Default: agents get read, users get everything, writes need approval
        // for agents.
        init[p.id][g.id] =
          g.scope === "read" ? "allow" : p.kind === "user" ? "allow" : "approval";
      }
    }
    return init;
  });

  function cycle(pid: string, gid: string) {
    setMatrix((prev) => {
      const cur = prev[pid][gid];
      const next: Perm = cur === "allow" ? "approval" : cur === "approval" ? "block" : "allow";
      return { ...prev, [pid]: { ...prev[pid], [gid]: next } };
    });
  }

  return (
    <section>
      <PageHeader
        title="Permissions"
        description="Who can call which GitHub tools, and how. Clicking a cell cycles Allow → Needs approval → Block."
      />

      <div className="overflow-x-auto rounded-2xl bg-white ring-1 ring-black/5">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-neutral-50/60 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="sticky left-0 z-10 border-b border-black/5 bg-neutral-50/60 px-5 py-3 font-medium">
                Principal
              </th>
              {TOOL_GROUPS.map((g) => (
                <th key={g.id} className="border-b border-black/5 px-4 py-3 font-medium">
                  <div className="flex items-center gap-1.5">
                    <g.icon className="h-3.5 w-3.5" />
                    <span>{g.label}</span>
                  </div>
                  <div className="mt-0.5 font-normal normal-case tracking-normal text-[11px] text-muted-foreground">
                    {g.tools.length} tools · {g.scope}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRINCIPALS.map((p) => (
              <tr key={p.id}>
                <td className="sticky left-0 z-10 border-b border-black/5 bg-white px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold text-white",
                        p.kind === "user"
                          ? "bg-gradient-to-br from-sky-500 to-indigo-600"
                          : "bg-gradient-to-br from-violet-500 to-fuchsia-600",
                      )}
                    >
                      {p.name.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="leading-tight">
                      <div className="text-sm font-medium">{p.name}</div>
                      <div className="text-[11px] uppercase text-muted-foreground">{p.kind}</div>
                    </div>
                  </div>
                </td>
                {TOOL_GROUPS.map((g) => {
                  const val = matrix[p.id][g.id];
                  return (
                    <td key={g.id} className="border-b border-black/5 px-4 py-3">
                      <button
                        type="button"
                        onClick={() => cycle(p.id, g.id)}
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-medium transition",
                          PERM_CLASS[val],
                        )}
                      >
                        {PERM_LABEL[val]}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Tool inventory
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_GROUPS.map((g) => (
            <div key={g.id} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-900/5">
                  <g.icon className="h-4 w-4 text-neutral-900" />
                </div>
                <div>
                  <div className="text-sm font-medium">{g.label}</div>
                  <div className="text-[11px] uppercase text-muted-foreground">{g.scope}</div>
                </div>
              </div>
              <ul className="mt-3 space-y-1.5">
                {g.tools.map((t) => (
                  <li key={t.name} className="text-xs">
                    <code className="rounded bg-muted px-1 py-0.5 text-[11px]">{t.name}</code>
                    <div className="mt-0.5 text-muted-foreground">{t.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Audit log ────────────────────────────────────────────────────────────────
function AuditView() {
  return (
    <section>
      <PageHeader
        title="Audit log"
        description="Every GitHub MCP tool call: who ran it, on which repo, and how it resolved."
        action={
          <Button variant="outline" className="gap-2 rounded-full">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        }
      />
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
        <ul className="divide-y divide-black/5">
          {MOCK_AUDIT.map((row) => (
            <li key={row.id} className="grid grid-cols-[80px_1fr_auto] items-start gap-4 px-5 py-3">
              <span className="pt-0.5 font-mono text-xs text-muted-foreground">{row.when}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-medium">{row.actor}</span>
                  <span className="text-muted-foreground">called</span>
                  <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">{row.tool}</code>
                  <span className="text-muted-foreground">on</span>
                  <span className="font-medium">{row.repo}</span>
                </div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">{row.detail}</div>
              </div>
              <StatusPill status={row.status} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StatusPill({ status }: { status: "ok" | "error" | "denied" }) {
  const map = {
    ok: "bg-emerald-100 text-emerald-800",
    error: "bg-rose-100 text-rose-800",
    denied: "bg-amber-100 text-amber-900",
  } as const;
  const label = { ok: "success", error: "error", denied: "denied" }[status];
  return (
    <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase", map[status])}>
      {label}
    </span>
  );
}

// ── Status ───────────────────────────────────────────────────────────────────
function StatusView() {
  const checks = [
    { label: "GitHub App installation", ok: true, note: "2 accounts" },
    { label: "API rate limit", ok: true, note: "4,821 / 5,000 remaining" },
    { label: "Webhook delivery", ok: true, note: "0 failures in 24h" },
    { label: "Workflow dispatch", ok: false, note: "1 failing repo — see audit log" },
  ];
  return (
    <section>
      <PageHeader
        title="Status"
        description="Live health of the GitHub integration and its dependencies."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {checks.map((c) => (
          <div key={c.label} className="flex items-start gap-3 rounded-2xl bg-white p-5 ring-1 ring-black/5">
            <div
              className={cn(
                "mt-0.5 grid h-8 w-8 place-items-center rounded-full",
                c.ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
              )}
            >
              {c.ok ? <CheckCircle2 className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
            </div>
            <div>
              <div className="text-sm font-medium">{c.label}</div>
              <div className="text-xs text-muted-foreground">{c.note}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-white p-5 ring-1 ring-black/5">
        <h3 className="text-sm font-medium">Connected repositories</h3>
        <p className="text-xs text-muted-foreground">
          {MOCK_REPOS.filter((r) => r.connected).length} of {MOCK_REPOS.length} repositories are
          exposed to MCP tools.
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {MOCK_REPOS.filter((r) => r.connected).map((r) => (
            <li
              key={r.id}
              className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-800"
            >
              {r.account}/{r.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── Release notes tracking ───────────────────────────────────────────────────
function ReleasesView() {
  const [repos, setRepos] = useState(MOCK_REPOS);
  return (
    <section>
      <PageHeader
        title="Release Notes Tracking"
        description="MonoMCP polls tracked repos for new tags and releases, and can hand them off to a release-notes agent."
      />

      <div className="mb-6 overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
        <div className="flex items-center gap-2 border-b border-black/5 px-5 py-3 text-sm font-medium">
          <ListChecks className="h-4 w-4 text-neutral-900" /> Tracked repositories
        </div>
        <ul className="divide-y divide-black/5">
          {repos
            .filter((r) => r.connected)
            .map((r) => (
              <li key={r.id} className="flex items-center gap-4 px-5 py-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {r.account}/{r.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Watching tags on <code>{r.defaultBranch}</code>
                  </div>
                </div>
                <Switch
                  checked={r.trackReleases}
                  onCheckedChange={(v) =>
                    setRepos((prev) =>
                      prev.map((row) => (row.id === r.id ? { ...row, trackReleases: v } : row)),
                    )
                  }
                  aria-label={`Track releases for ${r.name}`}
                />
              </li>
            ))}
        </ul>
      </div>

      <h3 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Recent releases
      </h3>
      <ul className="space-y-3">
        {MOCK_RELEASES.map((r) => (
          <li
            key={r.id}
            className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-black/5"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-neutral-900/5">
              <Tag className="h-4 w-4 text-neutral-900" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-sm font-medium">{r.name}</span>
                <code className="rounded bg-muted px-1.5 py-0.5 text-[11px]">{r.tag}</code>
                <span className="text-xs text-muted-foreground">{r.repo}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{r.summary}</p>
              <div className="mt-2 text-xs text-muted-foreground">
                Published {r.publishedAt} · by {r.author}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ── Small helpers ────────────────────────────────────────────────────────────
function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 mt-2 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}
