import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Settings,
  ShieldCheck,
  Activity,
  Wrench,
  MousePointerClick,
  Filter,
  Download,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppsMenu } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Audit Log — Activity" },
      {
        name: "description",
        content: "Inspect every MCP tool call and UI change with full request/response payloads.",
      },
      { property: "og:title", content: "Audit Log — Activity" },
      {
        property: "og:description",
        content: "Inspect every MCP tool call and UI change with full request/response payloads.",
      },
    ],
    links: [{ rel: "canonical", href: "/audit" }],
  }),
  component: AuditPage,
});

type AuditSource = "mcp" | "ui";
type AuditStatus = "success" | "error";

type AuditEntry = {
  id: string;
  timestamp: string;
  source: AuditSource;
  actor: string;
  action: string;
  target: string;
  status: AuditStatus;
  durationMs: number;
  request: unknown;
  response: unknown;
};

type FilterKey = "all" | AuditSource;

const NAV: { id: FilterKey; label: string; icon: typeof Activity }[] = [
  { id: "all", label: "All activity", icon: Activity },
  { id: "mcp", label: "MCP tool calls", icon: Wrench },
  { id: "ui", label: "UI changes", icon: MousePointerClick },
];

const ENTRIES: AuditEntry[] = [
  {
    id: "evt_01HZX9A1",
    timestamp: "2026-06-11T09:42:11Z",
    source: "mcp",
    actor: "agent@assistant",
    action: "tools/call",
    target: "linear.create_issue",
    status: "success",
    durationMs: 412,
    request: {
      tool: "linear.create_issue",
      arguments: { title: "Fix audit log pagination", team: "ENG", priority: 2 },
    },
    response: {
      content: [{ type: "text", text: "Created ENG-482" }],
      isError: false,
    },
  },
  {
    id: "evt_01HZX9A2",
    timestamp: "2026-06-11T09:40:02Z",
    source: "ui",
    actor: "carla@acme.com",
    action: "contact.update",
    target: "/contacts/c_8842",
    status: "success",
    durationMs: 88,
    request: {
      method: "PATCH",
      path: "/api/v1/crm/contacts/c_8842",
      body: { lifecycle_status: "customer", is_starred: true },
    },
    response: { status: 200, body: { id: "c_8842", lifecycle_status: "customer" } },
  },
  {
    id: "evt_01HZX9A3",
    timestamp: "2026-06-11T09:31:55Z",
    source: "mcp",
    actor: "agent@assistant",
    action: "tools/call",
    target: "notion.search",
    status: "error",
    durationMs: 1320,
    request: { tool: "notion.search", arguments: { query: "Q3 roadmap" } },
    response: { error: { code: -32001, message: "Notion auth expired" }, isError: true },
  },
  {
    id: "evt_01HZX9A4",
    timestamp: "2026-06-11T09:18:09Z",
    source: "ui",
    actor: "ben@acme.com",
    action: "cms.entry.publish",
    target: "/cms/restaurants/r_204",
    status: "success",
    durationMs: 174,
    request: {
      method: "POST",
      path: "/api/v1/cms/entries/r_204/publish",
      body: { version: 7 },
    },
    response: { status: 200, body: { id: "r_204", status: "published", version: 7 } },
  },
  {
    id: "evt_01HZX9A5",
    timestamp: "2026-06-11T08:55:24Z",
    source: "mcp",
    actor: "agent@assistant",
    action: "tools/call",
    target: "drive.upload",
    status: "success",
    durationMs: 2104,
    request: {
      tool: "drive.upload",
      arguments: { path: "/Reports/2026-Q2.pdf", mime: "application/pdf", size: 184221 },
    },
    response: { content: [{ type: "text", text: "Uploaded file_91x2" }], isError: false },
  },
  {
    id: "evt_01HZX9A6",
    timestamp: "2026-06-11T08:31:00Z",
    source: "ui",
    actor: "carla@acme.com",
    action: "calendar.event.create",
    target: "/calendar",
    status: "success",
    durationMs: 142,
    request: {
      method: "POST",
      path: "/api/v1/calendar/events",
      body: { title: "Design review", start: "2026-06-12T14:00:00Z", duration: 60 },
    },
    response: { status: 201, body: { id: "ev_77a", title: "Design review" } },
  },
  {
    id: "evt_01HZX9A7",
    timestamp: "2026-06-11T08:02:47Z",
    source: "ui",
    actor: "ben@acme.com",
    action: "contact.delete",
    target: "/contacts/c_1102",
    status: "error",
    durationMs: 61,
    request: { method: "DELETE", path: "/api/v1/crm/contacts/c_1102" },
    response: { status: 403, body: { detail: "Insufficient permissions" } },
  },
];

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function SourceBadge({ source }: { source: AuditSource }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        source === "mcp"
          ? "bg-violet-100 text-violet-700"
          : "bg-sky-100 text-sky-700",
      )}
    >
      {source === "mcp" ? <Wrench className="h-3 w-3" /> : <MousePointerClick className="h-3 w-3" />}
      {source === "mcp" ? "MCP" : "UI"}
    </span>
  );
}

function StatusDot({ status }: { status: AuditStatus }) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        status === "success" ? "bg-emerald-500" : "bg-rose-500",
      )}
    />
  );
}

function JsonBlock({ value }: { value: unknown }) {
  return (
    <pre className="overflow-auto rounded-xl bg-[hsl(220,33%,97%)] p-3 text-xs leading-relaxed text-foreground/90 ring-1 ring-black/5">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

function AuditPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [selectedId, setSelectedId] = useState<string>(ENTRIES[0].id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ENTRIES.filter((e) => {
      if (filter !== "all" && e.source !== filter) return false;
      if (!q) return true;
      return (
        e.action.toLowerCase().includes(q) ||
        e.target.toLowerCase().includes(q) ||
        e.actor.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  const selected = filtered.find((e) => e.id === selectedId) ?? filtered[0];

  const counts = useMemo(
    () => ({
      all: ENTRIES.length,
      mcp: ENTRIES.filter((e) => e.source === "mcp").length,
      ui: ENTRIES.filter((e) => e.source === "ui").length,
    }),
    [],
  );

  const searchField = (
    <div className="relative flex h-9 w-full items-center">
      <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
      <Input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search action, target, actor, id"
        className="h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200"
      />
    </div>
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
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Audit log</span>
          </Link>
        </div>
        {searchOpen && (
          <div className="hidden min-w-0 max-w-2xl flex-1 md:block">{searchField}</div>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Settings">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      {searchOpen && <div className="px-4 pb-3 md:hidden">{searchField}</div>}

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <Button
              className="mb-4 h-14 w-[160px] gap-2 rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg"
              disabled
            >
              <Download className="h-5 w-5" /> Export
            </Button>

            <nav className="space-y-1">
              {NAV.map((n) => {
                const active = filter === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => setFilter(n.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      active
                        ? "bg-sky-100 text-sky-900"
                        : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <n.icon className="h-5 w-5 text-foreground/70" />
                    <span className="flex-1 truncate text-left">{n.label}</span>
                    <span className="text-xs text-muted-foreground">{counts[n.id]}</span>
                  </button>
                );
              })}

              <div className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Filters
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground/75">
                <Filter className="h-4 w-4 text-foreground/70" />
                <span>Last 24 hours</span>
              </div>
            </nav>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
          <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-2xl font-normal tracking-tight">
                {NAV.find((n) => n.id === filter)?.label}
              </h1>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="More">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
                <table className="w-full text-sm">
                  <thead className="bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Event</th>
                      <th className="px-4 py-2 text-left font-medium">Actor</th>
                      <th className="px-4 py-2 text-left font-medium">When</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((e) => {
                      const active = selected?.id === e.id;
                      return (
                        <tr
                          key={e.id}
                          onClick={() => setSelectedId(e.id)}
                          className={cn(
                            "cursor-pointer border-t border-black/5 transition hover:bg-sky-50/50",
                            active && "bg-sky-50",
                          )}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <SourceBadge source={e.source} />
                              <span className="font-medium">{e.action}</span>
                            </div>
                            <div className="mt-0.5 truncate text-xs text-muted-foreground">
                              {e.target}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-foreground/80">{e.actor}</td>
                          <td className="px-4 py-3 text-muted-foreground">
                            {timeAgo(e.timestamp)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <StatusDot status={e.status} />
                              <span className="capitalize text-foreground/80">{e.status}</span>
                              <span className="text-xs text-muted-foreground">
                                · {e.durationMs}ms
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">
                          No events match your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {selected && (
                <aside className="rounded-2xl bg-[hsl(220,33%,98%)] p-4 ring-1 ring-black/5">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <SourceBadge source={selected.source} />
                        <h2 className="text-base font-medium">{selected.action}</h2>
                      </div>
                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {selected.target}
                      </p>
                    </div>
                    <span className="rounded-md bg-white px-2 py-0.5 font-mono text-[11px] text-muted-foreground ring-1 ring-black/5">
                      {selected.id}
                    </span>
                  </div>

                  <dl className="mb-4 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <dt className="text-muted-foreground">Actor</dt>
                      <dd className="text-foreground/90">{selected.actor}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Timestamp</dt>
                      <dd className="text-foreground/90">
                        {new Date(selected.timestamp).toLocaleString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Status</dt>
                      <dd className="flex items-center gap-1.5 text-foreground/90">
                        <StatusDot status={selected.status} />
                        <span className="capitalize">{selected.status}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Duration</dt>
                      <dd className="text-foreground/90">{selected.durationMs} ms</dd>
                    </div>
                  </dl>

                  <div className="mb-3">
                    <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Request
                    </h3>
                    <JsonBlock value={selected.request} />
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Response
                    </h3>
                    <JsonBlock value={selected.response} />
                  </div>
                </aside>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
