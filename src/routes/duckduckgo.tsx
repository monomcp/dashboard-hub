import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Settings as SettingsIcon,
  LayoutDashboard,
  Sparkles,
  Download,
  Lock,
  FileCode2,
  ShieldCheck,
  Activity,
  SlidersHorizontal,
  MoreVertical,
  Copy,
  CheckCircle2,
  ExternalLink,
  Mail,
  Bell,
  Send,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { apiRequest } from "@/lib/api-client";
import type { CatalogServer } from "@/lib/mcp-types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/duckduckgo")({
  head: () => ({
    meta: [
      { title: "DuckDuckGo — MCP tool" },
      {
        name: "description",
        content:
          "Inspect the DuckDuckGo MCP tool: keyless web search and readable content fetching, installation, access, schemas, audit and uptime.",
      },
      { property: "og:title", content: "DuckDuckGo — MCP tool" },
      {
        property: "og:description",
        content:
          "Inspect the DuckDuckGo MCP tool: keyless web search and readable content fetching, installation, access, schemas, audit and uptime.",
      },
    ],
    links: [{ rel: "canonical", href: "/duckduckgo" }],
  }),
  component: DuckDuckGoPage,
});

type SectionId =
  | "overview"
  | "features"
  | "installation"
  | "access"
  | "schemas"
  | "audit"
  | "uptime"
  | "settings";

const NAV: { id: SectionId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "features", label: "Features", icon: Sparkles },
  { id: "installation", label: "Installation", icon: Download },
  { id: "access", label: "Access", icon: Lock },
  { id: "schemas", label: "Schemas", icon: FileCode2 },
  { id: "audit", label: "Audit", icon: ShieldCheck },
  { id: "uptime", label: "Uptime", icon: Activity },
  { id: "settings", label: "Settings", icon: SlidersHorizontal },
];

const OVERVIEW_FIELDS: { label: string; value: string; mono?: boolean; pill?: string }[] = [
  { label: "Tool name", value: "duckduckgo.search", mono: true },
  { label: "Namespace", value: "duckduckgo", mono: true },
  { label: "Category", value: "web search" },
  { label: "Owner service", value: "duckduckgo-service", mono: true },
  { label: "Risk level", value: "low", pill: "bg-emerald-100 text-emerald-700" },
  { label: "Auth type", value: "none (keyless)", mono: true },
  { label: "Status", value: "active", pill: "bg-sky-100 text-sky-700" },
  { label: "Version", value: "v1.0.0", mono: true },
  { label: "Created at", value: "2026-03-02 09:15" },
  { label: "Updated at", value: "2026-07-01 10:20" },
];

const FEATURES = [
  {
    title: "Web search",
    desc: "Query DuckDuckGo's HTML search endpoint and get back titles, URLs, and snippets.",
  },
  {
    title: "Content fetching",
    desc: "Fetch any public URL and get back clean, readable text, paginated by character offset.",
  },
  {
    title: "Keyless by design",
    desc: "No credentials to provision or rotate — search and fetch work out of the box.",
  },
  {
    title: "SSRF-safe fetching",
    desc: "Resolves and validates hostnames before every fetch, rejecting private, loopback, and link-local addresses.",
  },
  {
    title: "Built-in rate limiting",
    desc: "Requests are throttled to a minimum 2-second interval to stay within DuckDuckGo's usage limits.",
  },
  {
    title: "Regional results",
    desc: "Pass an optional region code, e.g. us-en, to localize search results.",
  },
];

const UPTIME_BARS: ("up" | "warn" | "slow" | "down")[] = Array.from({ length: 90 }, (_, i) => {
  if ([5, 33, 61].includes(i)) return "down";
  if ([11, 26, 44, 58, 77].includes(i)) return "warn";
  if ([19, 50].includes(i)) return "slow";
  return "up";
});

const RESPONSE_POINTS = [
  280, 310, 295, 260, 330, 300, 5200, 340, 290, 310, 260, 300, 320, 290, 2050, 310, 280, 300, 260,
  290, 310, 330, 280, 300, 260, 310, 290, 300, 2100, 280, 310, 260, 300, 330, 290, 310, 280, 300,
  260, 310, 290, 330, 280, 300, 310, 260, 290, 300, 330, 280, 310, 260, 300, 290, 310, 280, 300,
  330, 260, 290, 310, 280, 300, 260, 310, 290, 330, 280, 300, 310,
];

function Field({
  label,
  value,
  mono,
  pill,
}: {
  label: string;
  value: string;
  mono?: boolean;
  pill?: string;
}) {
  return (
    <div className="border-b border-black/5 px-5 py-3 last:border-b-0 sm:grid sm:grid-cols-[200px_1fr] sm:items-center">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 flex items-center gap-2 sm:mt-0">
        {pill ? (
          <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", pill)}>{value}</span>
        ) : (
          <span className={cn("text-sm text-foreground/90", mono && "font-mono text-[13px]")}>
            {value}
          </span>
        )}
      </dd>
    </div>
  );
}

function UptimeBar({ kind }: { kind: "up" | "warn" | "slow" | "down" }) {
  const color =
    kind === "down"
      ? "bg-rose-500"
      : kind === "warn"
        ? "bg-amber-400"
        : kind === "slow"
          ? "bg-emerald-200"
          : "bg-emerald-500";
  return <span className={cn("h-10 w-full rounded-sm", color)} />;
}

function ResponseChart() {
  const w = 900;
  const h = 200;
  const max = Math.max(...RESPONSE_POINTS);
  const step = w / (RESPONSE_POINTS.length - 1);
  const path = RESPONSE_POINTS.map((v, i) => {
    const x = i * step;
    const y = h - (v / max) * (h - 20) - 5;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full">
      <line x1="0" y1="20" x2={w} y2="20" stroke="hsl(0,0%,90%)" strokeDasharray="3 4" />
      <text x="0" y="14" fontSize="11" fill="hsl(0,0%,55%)">
        5200ms
      </text>
      <path d={path} fill="none" stroke="hsl(142,71%,45%)" strokeWidth="1.4" />
    </svg>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative">
      <pre className="overflow-auto rounded-xl bg-[hsl(220,33%,97%)] p-4 pr-14 text-xs leading-relaxed text-foreground/90 ring-1 ring-black/5">
        {code}
      </pre>
      <button
        onClick={() => {
          navigator.clipboard?.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }}
        className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs text-foreground/70 ring-1 ring-black/5 hover:bg-sky-50"
      >
        {copied ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

function Toggle({ on = false }: { on?: boolean }) {
  const [state, setState] = useState(on);
  return (
    <button
      onClick={() => setState((s) => !s)}
      className={cn(
        "relative h-6 w-11 rounded-full transition",
        state ? "bg-foreground" : "bg-[hsl(220,15%,85%)]",
      )}
      aria-pressed={state}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition",
          state ? "left-[22px]" : "left-0.5",
        )}
      />
    </button>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-white p-5 ring-1 ring-black/5 sm:p-6">{children}</section>
  );
}

function DuckDuckGoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [section, setSection] = useState<SectionId>("overview");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredNav = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV;
    return NAV.filter((n) => n.label.toLowerCase().includes(q));
  }, [query]);

  const needsCatalog = section === "installation" || section === "access" || section === "audit";
  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    enabled: needsCatalog,
    staleTime: 60 * 1000,
  });
  const server = catalog?.find((s) => s.slug === "duckduckgo");

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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
              <img src="/mcp-logos/DuckDuckGo.svg" alt="" className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-medium tracking-tight">DuckDuckGo</div>
              <div className="text-xs text-muted-foreground">v1.0.0 · active</div>
            </div>
          </Link>
        </div>
        {searchOpen && (
          <div className="hidden min-w-0 max-w-2xl flex-1 md:block">
            <div className="relative flex h-9 w-full items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sections"
                className="h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200"
              />
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          {needsCatalog && server && (
            <div className="mr-1">
              <EnableMcpServerButton
                serverSlug="duckduckgo"
                enabled={server.enabled}
                toolkitIds={server.toolkit_ids}
              />
            </div>
          )}
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
            <SettingsIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <PlaygroundHeaderButton /><AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[240px] shrink-0 px-3 md:block">
            <nav className="space-y-1">
              {filteredNav.map((n) => {
                const active = section === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => setSection(n.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <n.icon className="h-5 w-5 text-foreground/70" />
                    <span className="flex-1 truncate text-left">{n.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>
        )}

        <main
          className={cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6")}
        >
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-normal tracking-tight">
              {NAV.find((n) => n.id === section)?.label}
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="More">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {section === "overview" && (
            <SectionCard>
              <div className="mb-5">
                <h2 className="text-base font-medium">Tool details</h2>
                <p className="text-sm text-muted-foreground">
                  Metadata exposed by the DuckDuckGo MCP server.
                </p>
              </div>
              <dl className="rounded-xl bg-[hsl(220,33%,98%)] ring-1 ring-black/5">
                {OVERVIEW_FIELDS.map((f) => (
                  <Field key={f.label} {...f} />
                ))}
              </dl>
            </SectionCard>
          )}

          {section === "features" && (
            <SectionCard>
              <div className="mb-5">
                <h2 className="text-base font-medium">What DuckDuckGo can do</h2>
                <p className="text-sm text-muted-foreground">
                  Keyless web search plus readable content fetching from public URLs.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {FEATURES.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl bg-[hsl(220,33%,98%)] p-4 ring-1 ring-black/5"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-orange-500" />
                      <h3 className="text-sm font-medium">{f.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {section === "installation" && (
            <SectionCard>
              <div className="mb-5">
                <h2 className="text-base font-medium">Install the DuckDuckGo MCP server</h2>
                <p className="text-sm text-muted-foreground">
                  Enable the toolkit and point your MCP client at your gateway endpoint.
                </p>
              </div>
              <div className="space-y-5">
                <div>
                  <h3 className="mb-2 text-sm font-medium">1. No API key needed</h3>
                  <p className="text-sm text-muted-foreground">
                    DuckDuckGo search and page fetching are keyless — there's nothing to
                    provision or rotate before you start.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium">2. Enable the server</h3>
                  <p className="text-sm text-muted-foreground">
                    Use "Enable this MCP server" above to expose{" "}
                    <span className="font-mono">duckduckgo_search</span> and{" "}
                    <span className="font-mono">duckduckgo_fetch_content</span> through one or
                    more toolkits.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-medium">3. Add to your MCP client config</h3>
                  <CodeBlock
                    code={`{
  "mcpServers": {
    "duckduckgo": {
      "url": "https://mcp-at97.onrender.com/{your-org}/{toolkit}/mcp"
    }
  }
}`}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Copy the exact endpoint for your org from the connection panel above once the
                    server is enabled.
                  </p>
                </div>
              </div>
            </SectionCard>
          )}

          {section === "access" && (
            <SectionCard>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-medium">Access control</h2>
                  <p className="text-sm text-muted-foreground">
                    Roles and bundles that can invoke this tool.
                  </p>
                </div>
                <Button className="rounded-full" size="sm">
                  Grant access
                </Button>
              </div>
              <div className="overflow-hidden rounded-xl ring-1 ring-black/5">
                <table className="w-full text-sm">
                  <thead className="bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Identity</th>
                      <th className="px-4 py-2 text-left font-medium">Type</th>
                      <th className="px-4 py-2 text-left font-medium">Scope</th>
                      <th className="px-4 py-2 text-left font-medium">Granted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["agents.research", "Role", "search, fetch_content", "2026-03-11"],
                      ["bundle.web-context", "Bundle", "search", "2026-04-02"],
                      ["carla@acme.com", "User", "all", "2026-05-14"],
                      ["ci-pipeline", "Service", "fetch_content", "2026-06-01"],
                    ].map(([p, t, s, d]) => (
                      <tr key={p} className="border-t border-black/5">
                        <td className="px-4 py-3 font-medium">{p}</td>
                        <td className="px-4 py-3 text-foreground/80">{t}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s}</td>
                        <td className="px-4 py-3 text-muted-foreground">{d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}

          {section === "schemas" && (
            <div className="space-y-4">
              <SectionCard>
                <div className="mb-5">
                  <h2 className="text-base font-medium">Input / output schemas</h2>
                  <p className="text-sm text-muted-foreground">
                    JSON schema for the <span className="font-mono">duckduckgo_search</span> tool.
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Input
                    </h3>
                    <CodeBlock
                      code={`{
  "type": "object",
  "required": ["query"],
  "properties": {
    "query": { "type": "string" },
    "max_results": { "type": "integer", "minimum": 1, "maximum": 25, "default": 10 },
    "region": { "type": "string", "description": "e.g. us-en" }
  }
}`}
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Output
                    </h3>
                    <CodeBlock
                      code={`{
  "query": "string",
  "count": 10,
  "items": [
    { "position": 1, "title": "string", "url": "string", "snippet": "string" }
  ]
}`}
                    />
                  </div>
                </div>
              </SectionCard>

              <SectionCard>
                <div className="mb-5">
                  <h2 className="text-base font-medium">Input / output schemas</h2>
                  <p className="text-sm text-muted-foreground">
                    JSON schema for the <span className="font-mono">duckduckgo_fetch_content</span>{" "}
                    tool.
                  </p>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Input
                    </h3>
                    <CodeBlock
                      code={`{
  "type": "object",
  "required": ["url"],
  "properties": {
    "url": { "type": "string", "description": "Public http(s) URL" },
    "start_index": { "type": "integer", "minimum": 0, "default": 0 },
    "max_length": { "type": "integer", "minimum": 100, "maximum": 50000, "default": 8000 }
  }
}`}
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Output
                    </h3>
                    <CodeBlock
                      code={`{
  "url": "string",
  "title": "string",
  "text": "string",
  "start_index": 0,
  "returned": 8000,
  "total_length": 42531,
  "has_more": true
}`}
                    />
                  </div>
                </div>
              </SectionCard>
            </div>
          )}

          {section === "audit" && (
            <SectionCard>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-medium">Recent activity</h2>
                  <p className="text-sm text-muted-foreground">Latest MCP calls for this tool.</p>
                </div>
                <Link
                  to="/audit"
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs text-foreground/80 ring-1 ring-black/5 hover:bg-sky-50"
                >
                  Open audit log <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
              <div className="overflow-hidden rounded-xl ring-1 ring-black/5">
                <table className="w-full text-sm">
                  <thead className="bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Action</th>
                      <th className="px-4 py-2 text-left font-medium">Actor</th>
                      <th className="px-4 py-2 text-left font-medium">When</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["duckduckgo_search", "agent@assistant", "3m ago", "success", "640ms"],
                      ["duckduckgo_search", "agent@assistant", "9m ago", "success", "512ms"],
                      ["duckduckgo_fetch_content", "ci-pipeline", "42m ago", "success", "980ms"],
                      ["duckduckgo_search", "carla@acme.com", "2h ago", "error", "12.0s"],
                      ["duckduckgo_fetch_content", "agent@assistant", "yesterday", "success", "1.4s"],
                    ].map(([a, who, when, st, dur]) => (
                      <tr key={a + when} className="border-t border-black/5">
                        <td className="px-4 py-3 font-mono text-[13px]">{a}</td>
                        <td className="px-4 py-3 text-foreground/80">{who}</td>
                        <td className="px-4 py-3 text-muted-foreground">{when}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-2">
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full",
                                st === "success" ? "bg-emerald-500" : "bg-rose-500",
                              )}
                            />
                            <span className="capitalize">{st}</span>
                            <span className="text-xs text-muted-foreground">· {dur}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          )}

          {section === "uptime" && (
            <div className="space-y-4">
              <SectionCard>
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last 90 days</span>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-emerald-600 hover:underline"
                  >
                    <Activity className="h-4 w-4" /> View full history
                  </a>
                </div>
                <div className="mb-2 text-sm font-medium text-emerald-600">99.958%</div>
                <div className="grid grid-cols-[repeat(90,minmax(0,1fr))] items-end gap-[2px]">
                  {UPTIME_BARS.map((k, i) => (
                    <UptimeBar key={i} kind={k} />
                  ))}
                </div>
              </SectionCard>

              <SectionCard>
                <h3 className="mb-4 text-base font-medium">Overall uptime</h3>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {[
                    ["100.000%", "Last 24 hours"],
                    ["99.996%", "Last 7 days"],
                    ["99.981%", "Last 30 days"],
                    ["99.958%", "Last 90 days"],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <div className="text-3xl font-semibold tracking-tight">{v}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard>
                <div className="mb-2 flex items-baseline gap-2">
                  <h3 className="text-base font-medium">Response Time</h3>
                  <span className="text-xs text-muted-foreground">Last 90 days</span>
                </div>
                <ResponseChart />
                <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                  {[
                    ["339ms", "Avg. response time"],
                    ["5200ms", "Max. response time"],
                    ["260ms", "Min. response time"],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <div className="text-2xl font-semibold tracking-tight">{v}</div>
                      <div className="text-xs text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {section === "settings" && (
            <div className="space-y-4">
              <SectionCard>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-medium">Notifications for duckduckgo</h3>
                    <p className="text-sm text-muted-foreground">
                      Override workspace defaults for this tool only.
                    </p>
                  </div>
                  <Toggle on />
                </div>
              </SectionCard>

              <SectionCard>
                <div className="mb-2">
                  <h3 className="text-base font-medium">Channels</h3>
                  <p className="text-sm text-muted-foreground">
                    Where alerts about this tool get delivered.
                  </p>
                </div>
                <ul className="divide-y divide-black/5">
                  {[
                    { icon: Mail, name: "Email", desc: "Sent to admin@monomcp.dev", on: true },
                    { icon: Bell, name: "In-app", desc: "Shows in the bell menu.", on: true },
                    {
                      icon: Send,
                      name: "Telegram",
                      desc: "Direct message from MonoMCP bot.",
                      soon: true,
                    },
                    {
                      icon: MessageSquare,
                      name: "Slack",
                      desc: "Posted to a workspace channel.",
                      soon: true,
                    },
                    {
                      icon: Phone,
                      name: "WhatsApp",
                      desc: "Sent via WhatsApp Business.",
                      soon: true,
                    },
                  ].map((c) => (
                    <li key={c.name} className="flex items-center gap-3 py-3">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-[hsl(220,33%,97%)] text-foreground/70 ring-1 ring-black/5">
                        <c.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {c.name}
                          {c.soon && (
                            <span className="rounded-md bg-sky-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-700 ring-1 ring-sky-100">
                              Soon
                            </span>
                          )}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">{c.desc}</div>
                      </div>
                      <Toggle on={c.on} />
                    </li>
                  ))}
                </ul>
              </SectionCard>

              <SectionCard>
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">Events</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose which events trigger a notification.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Toggle /> Critical only
                  </label>
                </div>
                <ul className="divide-y divide-black/5">
                  {[
                    ["Configuration updated", "Any field on this tool is changed."],
                    ["Risk level changed", "Tool moves between risk tiers."],
                    ["New version published", "A new version is released."],
                    ["Access policy changed", "Bundle or role policy affecting this tool changes."],
                    ["Usage quota threshold hit", "Tool reaches 80% / 100% of its limit."],
                  ].map(([t, d]) => (
                    <li key={t} className="flex items-center gap-3 py-3">
                      <CheckCircle2 className="h-5 w-5 text-foreground" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{t}</div>
                        <div className="text-xs text-muted-foreground">{d}</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(220,33%,97%)] px-2 py-1 text-foreground/70 ring-1 ring-black/5">
                          <Mail className="h-3 w-3" /> Email
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(220,33%,97%)] px-2 py-1 text-foreground/70 ring-1 ring-black/5">
                          <Bell className="h-3 w-3" /> In-app
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
