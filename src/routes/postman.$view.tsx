import { useMemo, useState } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import {
  Activity,
  ChevronRight,
  Copy,
  FileCode2,
  FolderOpen,
  Globe2,
  History,
  KeyRound,
  Menu,
  Play,
  Plus,
  Search,
  Send,
  Trash2,
  Workflow,
} from "lucide-react";

import { AccountMenu } from "@/components/account-menu";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type PostmanView =
  | "collections"
  | "environments"
  | "flows"
  | "runs"
  | "variables";

const POSTMAN_VIEWS: PostmanView[] = [
  "collections",
  "environments",
  "flows",
  "runs",
  "variables",
];

function isPostmanView(value: string): value is PostmanView {
  return (POSTMAN_VIEWS as string[]).includes(value);
}

export const Route = createFileRoute("/postman/$view")({
  beforeLoad: ({ params }) => {
    if (!isPostmanView(params.view)) {
      throw redirect({
        to: "/postman/$view",
        params: { view: "collections" },
        replace: true,
      });
    }
  },
  head: ({ params }) => ({
    meta: [
      { title: "Postman — MonoMCP" },
      {
        name: "description",
        content:
          "Design, test, and run API collections, environments, flows and monitors — all in one workspace.",
      },
    ],
    links: [{ rel: "canonical", href: `/postman/${params.view}` }],
  }),
  component: PostmanPage,
});

const POSTMAN_NAV: {
  id: PostmanView;
  label: string;
  icon: typeof FolderOpen;
}[] = [
  { id: "collections", label: "Collections", icon: FolderOpen },
  { id: "environments", label: "Environments", icon: Globe2 },
  { id: "flows", label: "Flows", icon: Workflow },
  { id: "runs", label: "Runs", icon: History },
  { id: "variables", label: "Variables", icon: KeyRound },
];

// Postman brand colors
const PM_ORANGE = "#FF6C37";
const PM_ORANGE_SOFT = "#FFF2ED";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "text-emerald-600",
  POST: "text-amber-600",
  PUT: "text-sky-600",
  PATCH: "text-violet-600",
  DELETE: "text-rose-600",
};

type Request = {
  id: string;
  method: HttpMethod;
  name: string;
  url: string;
};

type Collection = {
  id: string;
  name: string;
  description: string;
  requests: Request[];
};

const COLLECTIONS: Collection[] = [
  {
    id: "c1",
    name: "MonoMCP API",
    description: "Core endpoints for the MonoMCP gateway.",
    requests: [
      { id: "r1", method: "GET", name: "List servers", url: "{{baseUrl}}/api/v1/mcp-catalog" },
      { id: "r2", method: "POST", name: "Enable server", url: "{{baseUrl}}/api/v1/servers/enable" },
      { id: "r3", method: "GET", name: "Audit log", url: "{{baseUrl}}/api/v1/audit" },
      { id: "r4", method: "DELETE", name: "Disconnect account", url: "{{baseUrl}}/api/v1/accounts/{{id}}" },
    ],
  },
  {
    id: "c2",
    name: "GitHub Toolkit",
    description: "Repositories, installations and release notes.",
    requests: [
      { id: "r5", method: "GET", name: "List repositories", url: "{{baseUrl}}/api/v1/github/repositories" },
      { id: "r6", method: "PATCH", name: "Toggle repository", url: "{{baseUrl}}/api/v1/github/repositories/{{id}}" },
      { id: "r7", method: "GET", name: "Installations", url: "{{baseUrl}}/api/v1/github/installations" },
    ],
  },
  {
    id: "c3",
    name: "Pinterest Toolkit",
    description: "Search and scrape pin metadata.",
    requests: [
      { id: "r8", method: "GET", name: "Search pins", url: "{{baseUrl}}/api/v1/pinterest/search" },
      { id: "r9", method: "GET", name: "Get pin", url: "{{baseUrl}}/api/v1/pinterest/pin/{{id}}" },
    ],
  },
];

type EnvVar = { key: string; initial: string; current: string; secret?: boolean };
type Environment = { id: string; name: string; active: boolean; vars: EnvVar[] };

const ENVIRONMENTS: Environment[] = [
  {
    id: "e1",
    name: "Production",
    active: true,
    vars: [
      { key: "baseUrl", initial: "https://api.monomcp.com", current: "https://api.monomcp.com" },
      { key: "apiKey", initial: "", current: "sk_live_••••••••", secret: true },
      { key: "workspaceId", initial: "ws_1", current: "ws_1" },
    ],
  },
  {
    id: "e2",
    name: "Staging",
    active: false,
    vars: [
      { key: "baseUrl", initial: "https://staging.monomcp.com", current: "https://staging.monomcp.com" },
      { key: "apiKey", initial: "", current: "sk_test_••••••••", secret: true },
    ],
  },
  {
    id: "e3",
    name: "Local",
    active: false,
    vars: [
      { key: "baseUrl", initial: "http://localhost:8080", current: "http://localhost:8080" },
    ],
  },
];

type Flow = {
  id: string;
  name: string;
  description: string;
  steps: number;
  updated: string;
};

const FLOWS: Flow[] = [
  {
    id: "f1",
    name: "Onboard new workspace",
    description: "Create workspace, seed principals, enable default toolkits.",
    steps: 6,
    updated: "2h ago",
  },
  {
    id: "f2",
    name: "Nightly GitHub sync",
    description: "Fetch installations, refresh repository list, snapshot releases.",
    steps: 4,
    updated: "yesterday",
  },
  {
    id: "f3",
    name: "Content pipeline",
    description: "Draft → review → schedule across Pinterest, CMS and Email.",
    steps: 9,
    updated: "3d ago",
  },
];

type Run = {
  id: string;
  target: string;
  environment: string;
  status: "passed" | "failed" | "running";
  duration: string;
  when: string;
  passed: number;
  failed: number;
};

const RUNS: Run[] = [
  { id: "run_912", target: "MonoMCP API", environment: "Production", status: "passed", duration: "4.2s", when: "5 min ago", passed: 18, failed: 0 },
  { id: "run_911", target: "GitHub Toolkit", environment: "Staging", status: "failed", duration: "6.8s", when: "22 min ago", passed: 9, failed: 2 },
  { id: "run_910", target: "Content pipeline", environment: "Production", status: "passed", duration: "12.4s", when: "1h ago", passed: 24, failed: 0 },
  { id: "run_909", target: "Pinterest Toolkit", environment: "Local", status: "running", duration: "—", when: "just now", passed: 0, failed: 0 },
  { id: "run_908", target: "Nightly GitHub sync", environment: "Production", status: "passed", duration: "31.1s", when: "yesterday", passed: 4, failed: 0 },
];

type GlobalVar = { key: string; type: "default" | "secret"; value: string };

const GLOBAL_VARS: GlobalVar[] = [
  { key: "userAgent", type: "default", value: "MonoMCP/1.0" },
  { key: "timeout", type: "default", value: "30000" },
  { key: "adminToken", type: "secret", value: "••••••••••••" },
];

function PostmanPage() {
  const view = Route.useParams().view as PostmanView;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const active = POSTMAN_NAV.find((n) => n.id === view) ?? POSTMAN_NAV[0];

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
            <div
              className="grid h-9 w-9 place-items-center rounded-full"
              style={{ backgroundColor: PM_ORANGE }}
            >
              <Send className="h-4 w-4 -rotate-45 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Postman</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <PlaygroundHeaderButton /><AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <nav className="space-y-1">
              {POSTMAN_NAV.map((item) => {
                const isActive = view === item.id;
                return (
                  <Link
                    key={item.id}
                    to="/postman/$view"
                    params={{ view: item.id }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      isActive
                        ? "text-white"
                        : "text-foreground/80 hover:bg-white/60",
                    )}
                    style={isActive ? { backgroundColor: PM_ORANGE } : undefined}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="flex-1 truncate text-left">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:pr-6">
          {view === "collections" && <CollectionsView />}
          {view === "environments" && <EnvironmentsView />}
          {view === "flows" && <FlowsView />}
          {view === "runs" && <RunsView />}
          {view === "variables" && <VariablesView />}
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
  action?: React.ReactNode;
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

function PrimaryButton({ children, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      className={cn("gap-2 text-white hover:opacity-90", props.className)}
      style={{ backgroundColor: PM_ORANGE, ...props.style }}
    >
      {children}
    </Button>
  );
}

function CollectionsView() {
  const [selected, setSelected] = useState<string>(COLLECTIONS[0].requests[0].id);
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState<string>(COLLECTIONS[0].requests[0].url);
  const [query, setQuery] = useState("");

  const activeRequest = useMemo(() => {
    for (const c of COLLECTIONS) {
      const r = c.requests.find((r) => r.id === selected);
      if (r) return r;
    }
    return COLLECTIONS[0].requests[0];
  }, [selected]);

  return (
    <div>
      <ViewHeader
        title="Collections"
        description="Group related requests, share them with your team, and run them anywhere."
        action={
          <PrimaryButton>
            <Plus className="h-4 w-4" /> New collection
          </PrimaryButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter requests"
              className="pl-9"
            />
          </div>
          <div className="space-y-3">
            {COLLECTIONS.map((c) => {
              const filtered = c.requests.filter((r) =>
                r.name.toLowerCase().includes(query.toLowerCase()),
              );
              if (query && filtered.length === 0) return null;
              return (
                <div key={c.id}>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <FolderOpen className="h-4 w-4" style={{ color: PM_ORANGE }} />
                    <span className="truncate">{c.name}</span>
                    <Badge variant="secondary" className="ml-auto text-[10px]">
                      {c.requests.length}
                    </Badge>
                  </div>
                  <div className="ml-6 space-y-0.5">
                    {filtered.map((r) => {
                      const isActive = selected === r.id;
                      return (
                        <button
                          key={r.id}
                          onClick={() => {
                            setSelected(r.id);
                            setMethod(r.method);
                            setUrl(r.url);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition",
                            isActive ? "bg-[color:var(--pm-soft)]" : "hover:bg-muted/60",
                          )}
                          style={
                            {
                              ["--pm-soft" as string]: PM_ORANGE_SOFT,
                            } as React.CSSProperties
                          }
                        >
                          <span
                            className={cn(
                              "w-12 shrink-0 text-[11px] font-bold tracking-wider",
                              METHOD_COLORS[r.method],
                            )}
                          >
                            {r.method}
                          </span>
                          <span className="truncate">{r.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="mb-3 text-sm text-muted-foreground">{activeRequest.name}</div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Select value={method} onValueChange={(v) => setMethod(v as HttpMethod)}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(METHOD_COLORS) as HttpMethod[]).map((m) => (
                  <SelectItem key={m} value={m}>
                    <span className={cn("font-bold", METHOD_COLORS[m])}>{m}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 font-mono text-sm"
            />
            <PrimaryButton>
              <Send className="h-4 w-4" /> Send
            </PrimaryButton>
          </div>

          <div className="mt-6 border-b text-sm">
            <div className="flex gap-6">
              {["Params", "Authorization", "Headers", "Body", "Tests"].map((t, i) => (
                <button
                  key={t}
                  className={cn(
                    "border-b-2 pb-2 pt-1 transition",
                    i === 3 ? "border-current" : "border-transparent text-muted-foreground",
                  )}
                  style={i === 3 ? { color: PM_ORANGE, borderColor: PM_ORANGE } : undefined}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <Textarea
            className="mt-3 h-40 font-mono text-xs"
            defaultValue={`{\n  "workspace_id": "{{workspaceId}}",\n  "server": "github"\n}`}
          />

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-medium">Response</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">
                  200 OK
                </span>
                <span>142 ms</span>
                <span>2.4 KB</span>
              </div>
            </div>
            <pre className="max-h-64 overflow-auto rounded-xl bg-neutral-950 p-4 font-mono text-xs text-emerald-300">
{`{
  "ok": true,
  "server": "github",
  "enabled": true,
  "toolkits": ["repos", "issues", "pulls"]
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnvironmentsView() {
  const [activeId, setActiveId] = useState(ENVIRONMENTS[0].id);
  const env = ENVIRONMENTS.find((e) => e.id === activeId) ?? ENVIRONMENTS[0];

  return (
    <div>
      <ViewHeader
        title="Environments"
        description="Swap variable sets per stage — production, staging, local, or per teammate."
        action={
          <PrimaryButton>
            <Plus className="h-4 w-4" /> New environment
          </PrimaryButton>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5">
          {ENVIRONMENTS.map((e) => {
            const isActive = e.id === activeId;
            return (
              <button
                key={e.id}
                onClick={() => setActiveId(e.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                  isActive ? "bg-[color:var(--pm-soft)]" : "hover:bg-muted/60",
                )}
                style={{ ["--pm-soft" as string]: PM_ORANGE_SOFT } as React.CSSProperties}
              >
                <Globe2 className="h-4 w-4" style={{ color: PM_ORANGE }} />
                <span className="flex-1 truncate">{e.name}</span>
                {e.active && (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
                    style={{ backgroundColor: PM_ORANGE }}
                  >
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-medium">{env.name}</div>
              <div className="text-xs text-muted-foreground">{env.vars.length} variables</div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Add variable
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Variable</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Initial value</TableHead>
                <TableHead>Current value</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {env.vars.map((v) => (
                <TableRow key={v.key}>
                  <TableCell className="font-mono text-sm">{v.key}</TableCell>
                  <TableCell>
                    <Badge variant={v.secret ? "destructive" : "secondary"}>
                      {v.secret ? "secret" : "default"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {v.initial || "—"}
                  </TableCell>
                  <TableCell className="font-mono text-xs">{v.current || "—"}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function FlowsView() {
  return (
    <div>
      <ViewHeader
        title="Flows"
        description="Chain requests visually — pipe responses into the next step, branch on results, schedule the whole thing."
        action={
          <PrimaryButton>
            <Plus className="h-4 w-4" /> New flow
          </PrimaryButton>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {FLOWS.map((f) => (
          <div
            key={f.id}
            className="group rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div
                className="grid h-10 w-10 place-items-center rounded-xl"
                style={{ backgroundColor: PM_ORANGE_SOFT }}
              >
                <Workflow className="h-5 w-5" style={{ color: PM_ORANGE }} />
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                <Play className="h-4 w-4" style={{ color: PM_ORANGE }} />
              </Button>
            </div>
            <div className="mt-3 text-base font-medium">{f.name}</div>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{f.description}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <FileCode2 className="h-3.5 w-3.5" /> {f.steps} steps
              </span>
              <span>Updated {f.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Run["status"] }) {
  if (status === "passed")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Passed
      </span>
    );
  if (status === "failed")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Failed
      </span>
    );
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: PM_ORANGE_SOFT, color: PM_ORANGE }}
    >
      <span
        className="h-1.5 w-1.5 animate-pulse rounded-full"
        style={{ backgroundColor: PM_ORANGE }}
      />{" "}
      Running
    </span>
  );
}

function RunsView() {
  return (
    <div>
      <ViewHeader
        title="Runs"
        description="Every collection and flow execution — who ran it, in which environment, and what came back."
        action={
          <PrimaryButton>
            <Play className="h-4 w-4" /> Run now
          </PrimaryButton>
        }
      />

      <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Run</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Results</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RUNS.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{r.id}</TableCell>
                <TableCell className="font-medium">{r.target}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{r.environment}</Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge status={r.status} />
                </TableCell>
                <TableCell className="text-sm">
                  <span className="text-emerald-600">{r.passed} passed</span>
                  {r.failed > 0 && (
                    <>
                      <span className="mx-1 text-muted-foreground">·</span>
                      <span className="text-rose-600">{r.failed} failed</span>
                    </>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.duration}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{r.when}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function VariablesView() {
  return (
    <div>
      <ViewHeader
        title="Variables"
        description="Globals available across every collection, environment, and flow in this workspace."
        action={
          <PrimaryButton>
            <Plus className="h-4 w-4" /> New variable
          </PrimaryButton>
        }
      />

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-dashed border-[color:var(--pm)] bg-[color:var(--pm-soft)] p-3 text-sm"
          style={{
            ["--pm" as string]: PM_ORANGE,
            ["--pm-soft" as string]: PM_ORANGE_SOFT,
          } as React.CSSProperties}
        >
          <Activity className="h-4 w-4" style={{ color: PM_ORANGE }} />
          <span>
            Reference these anywhere with <code className="rounded bg-white px-1 py-0.5 font-mono text-xs">{"{{variable}}"}</code>.
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variable</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead className="w-24" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {GLOBAL_VARS.map((v) => (
              <TableRow key={v.key}>
                <TableCell className="font-mono text-sm">{v.key}</TableCell>
                <TableCell>
                  <Badge variant={v.type === "secret" ? "destructive" : "secondary"}>
                    {v.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">{v.value}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
