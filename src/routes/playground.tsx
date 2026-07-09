import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileText,
  Globe,
  Hash,
  Image as ImageIcon,
  Images,
  Menu,
  Newspaper,
  Play,
  Plus,
  Search,
  Send,
  Settings2,
  Sliders,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import { InstagramIcon } from "@/components/instagram-icon";
import { PinterestIcon } from "@/components/pinterest-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground — MonoMCP" },
      {
        name: "description",
        content:
          "Test every MCP toolkit — Pinterest, Instagram, GitHub and more — from a single chat composer.",
      },
    ],
  }),
  component: PlaygroundPage,
});

// ── Toolkit / tool catalog ────────────────────────────────────────────────────

type ToolArg =
  | { kind: "text"; name: string; label: string; placeholder?: string; required?: boolean }
  | { kind: "number"; name: string; label: string; placeholder?: string; min?: number; max?: number }
  | { kind: "select"; name: string; label: string; options: string[] };

type Tool = {
  id: string;
  label: string;
  icon: typeof Search;
  args: ToolArg[];
};

type Toolkit = {
  id: string;
  label: string;
  color: string;
  brand: React.ReactNode;
  tools: Tool[];
};

const TOOLKITS: Toolkit[] = [
  {
    id: "pinterest",
    label: "Pinterest",
    color: "#E60023",
    brand: <PinterestIcon className="h-5 w-5" />,
    tools: [
      {
        id: "search_pins",
        label: "Search pins",
        icon: Search,
        args: [
          { kind: "text", name: "query", label: "Query", placeholder: "kitchen ideas", required: true },
          { kind: "select", name: "filter", label: "Filter", options: ["all", "video"] },
          { kind: "number", name: "limit", label: "Limit", placeholder: "25", min: 1, max: 100 },
        ],
      },
      {
        id: "scrape_pin",
        label: "Scrape a pin",
        icon: ImageIcon,
        args: [
          { kind: "text", name: "pin", label: "Pin id or URL", placeholder: "https://pin.it/…", required: true },
        ],
      },
    ],
  },
  {
    id: "instagram",
    label: "Instagram",
    color: "#E1306C",
    brand: <InstagramIcon className="h-5 w-5" />,
    tools: [
      {
        id: "search_posts",
        label: "Search posts",
        icon: Search,
        args: [
          { kind: "text", name: "query", label: "Query", placeholder: "sourdough", required: true },
          { kind: "number", name: "limit", label: "Limit", placeholder: "20" },
        ],
      },
      {
        id: "scrape_post",
        label: "Scrape a post",
        icon: ImageIcon,
        args: [{ kind: "text", name: "url", label: "Post URL", required: true }],
      },
      {
        id: "profile_lookup",
        label: "Profile lookup",
        icon: User,
        args: [{ kind: "text", name: "handle", label: "@handle", placeholder: "@natgeo", required: true }],
      },
      {
        id: "hashtag_feed",
        label: "Hashtag feed",
        icon: Hash,
        args: [
          { kind: "text", name: "tag", label: "Hashtag", placeholder: "travel", required: true },
          { kind: "number", name: "limit", label: "Limit", placeholder: "20" },
        ],
      },
    ],
  },
  {
    id: "github",
    label: "GitHub",
    color: "#111827",
    brand: <span className="text-base">▲</span>,
    tools: [
      {
        id: "search_repos",
        label: "Search repositories",
        icon: Search,
        args: [
          { kind: "text", name: "query", label: "Query", placeholder: "tanstack router", required: true },
          { kind: "select", name: "sort", label: "Sort by", options: ["best-match", "stars", "updated"] },
        ],
      },
      {
        id: "list_issues",
        label: "List issues",
        icon: FileText,
        args: [
          { kind: "text", name: "repo", label: "owner/repo", required: true },
          { kind: "select", name: "state", label: "State", options: ["open", "closed", "all"] },
        ],
      },
      {
        id: "get_release_notes",
        label: "Get release notes",
        icon: Sparkles,
        args: [
          { kind: "text", name: "repo", label: "owner/repo", required: true },
          { kind: "text", name: "tag", label: "Tag", placeholder: "v1.0.0" },
        ],
      },
    ],
  },
  {
    id: "firecrawl",
    label: "Firecrawl",
    color: "#FF6C37",
    brand: <span className="text-base">🔥</span>,
    tools: [
      {
        id: "scrape",
        label: "Scrape URL",
        icon: Globe,
        args: [{ kind: "text", name: "url", label: "URL", placeholder: "https://example.com", required: true }],
      },
      {
        id: "search",
        label: "Search",
        icon: Search,
        args: [
          { kind: "text", name: "query", label: "Query", placeholder: "top restaurants in SF", required: true },
          { kind: "number", name: "limit", label: "Limit", placeholder: "10" },
        ],
      },
      {
        id: "crawl",
        label: "Crawl",
        icon: Globe,
        args: [
          { kind: "text", name: "url", label: "Start URL", required: true },
          { kind: "number", name: "maxDepth", label: "Max depth", placeholder: "2" },
        ],
      },
    ],
  },
];

const SOURCES = [
  { id: "web", label: "Web", icon: Globe },
  { id: "images", label: "Images", icon: Images },
  { id: "news", label: "News", icon: Newspaper },
];

const FORMATS = [
  { id: "markdown", label: "Markdown", desc: "Clean text" },
  { id: "summary", label: "Summary", desc: "AI summary" },
  { id: "links", label: "Links", desc: "URL list" },
  { id: "html", label: "HTML", desc: "Cleaned · Raw" },
  { id: "screenshot", label: "Screenshot", desc: "Viewport · Full page" },
  { id: "json", label: "JSON", desc: "Structured" },
  { id: "branding", label: "Branding", desc: "Colors · fonts" },
  { id: "images", label: "Images", desc: "All images" },
];

type Run = {
  id: string;
  toolkitId: string;
  toolId: string;
  target: string;
  format: string;
  status: "success" | "failed" | "running";
  startedLabel: string;
};

const INITIAL_RUNS: Run[] = [
  {
    id: "r1",
    toolkitId: "firecrawl",
    toolId: "scrape",
    target: "goto-u.com",
    format: "branding",
    status: "success",
    startedLabel: "Jun 12, 2026 · 10:53 PM",
  },
  {
    id: "r2",
    toolkitId: "firecrawl",
    toolId: "crawl",
    target: "firecrawl.dev",
    format: "markdown",
    status: "success",
    startedLabel: "May 8, 2026 · 11:52 AM",
  },
  {
    id: "r3",
    toolkitId: "pinterest",
    toolId: "search_pins",
    target: "kitchen ideas",
    format: "markdown",
    status: "success",
    startedLabel: "May 1, 2026 · 4:21 PM",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

function PlaygroundPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toolkitId, setToolkitId] = useState<string>(TOOLKITS[0].id);
  const [toolId, setToolId] = useState<string>(TOOLKITS[0].tools[0].id);
  const [values, setValues] = useState<Record<string, string>>({});
  const [sources, setSources] = useState<Set<string>>(new Set(["web"]));
  const [format, setFormat] = useState<string>("markdown");
  const [options, setOptions] = useState({
    mainContentOnly: true,
    parsePdf: true,
    enhancedMode: false,
    wait: "",
    timeout: "",
    maxAge: "2 days",
  });
  const [runs, setRuns] = useState<Run[]>(INITIAL_RUNS);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);

  const toolkit = TOOLKITS.find((t) => t.id === toolkitId) ?? TOOLKITS[0];
  const tool = toolkit.tools.find((t) => t.id === toolId) ?? toolkit.tools[0];

  const primaryValue = useMemo(() => {
    const arg = tool.args[0];
    return arg ? values[arg.name] ?? "" : "";
  }, [tool, values]);

  function pickToolkit(id: string) {
    setToolkitId(id);
    const t = TOOLKITS.find((x) => x.id === id)!;
    setToolId(t.tools[0].id);
    setValues({});
  }

  function pickTool(id: string) {
    setToolId(id);
    setValues({});
  }

  function runTool() {
    if (!primaryValue.trim()) return;
    const newRun: Run = {
      id: `r${Date.now()}`,
      toolkitId,
      toolId,
      target: primaryValue,
      format,
      status: "success",
      startedLabel: new Date().toLocaleString(),
    };
    setRuns((prev) => [newRun, ...prev]);
    setActiveRunId(newRun.id);
  }

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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 text-white shadow-sm">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-medium tracking-tight">Playground</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <PlaygroundHeaderButton />
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[280px] shrink-0 px-3 md:block">
            <div className="mb-3 flex items-center justify-between px-2 pt-1">
              <h2 className="text-sm font-medium">Recent Runs</h2>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" aria-label="New run">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {runs.map((run) => {
                const tk = TOOLKITS.find((t) => t.id === run.toolkitId)!;
                const tl = tk.tools.find((t) => t.id === run.toolId)!;
                const active = run.id === activeRunId;
                return (
                  <button
                    key={run.id}
                    onClick={() => setActiveRunId(run.id)}
                    className={cn(
                      "w-full rounded-2xl bg-white px-3 py-2.5 text-left ring-1 ring-black/5 transition hover:bg-sky-50",
                      active && "ring-2 ring-violet-400",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white"
                        style={{ backgroundColor: tk.color }}
                      >
                        <tl.icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium">{run.target}</div>
                        <div className="truncate text-xs text-muted-foreground">
                          {tk.label} · {tl.label}
                        </div>
                      </div>
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:pr-6">
          {/* Hero */}
          <div className="mx-auto mt-6 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-fuchsia-600">
              Playground
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              Test every MCP tool
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Pick a toolkit, choose a tool, tune options — run against your MonoMCP gateway.
            </p>
          </div>

          {/* Composer */}
          <section className="mx-auto mt-8 max-w-3xl">
            {/* Toolkit picker */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Toolkit</span>
              {TOOLKITS.map((tk) => {
                const active = tk.id === toolkitId;
                return (
                  <button
                    key={tk.id}
                    onClick={() => pickToolkit(tk.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition",
                      active
                        ? "border-transparent bg-white shadow-sm ring-1 ring-black/5"
                        : "border-transparent text-muted-foreground hover:bg-white/60",
                    )}
                    style={active ? { color: tk.color } : undefined}
                  >
                    <span className="grid h-4 w-4 place-items-center">{tk.brand}</span>
                    {tk.label}
                  </button>
                );
              })}
            </div>

            {/* Tool tabs */}
            <div className="mb-3 flex flex-wrap items-center gap-1 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-black/5">
              <span className="ml-2 mr-1 text-xs uppercase tracking-widest text-muted-foreground">
                Tool
              </span>
              {toolkit.tools.map((tl) => {
                const active = tl.id === toolId;
                return (
                  <button
                    key={tl.id}
                    onClick={() => pickTool(tl.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm transition",
                      active
                        ? "bg-neutral-100 font-medium text-foreground"
                        : "text-muted-foreground hover:bg-neutral-50",
                    )}
                  >
                    <tl.icon className="h-4 w-4" style={active ? { color: toolkit.color } : undefined} />
                    {tl.label}
                  </button>
                );
              })}
            </div>

            {/* Composer card */}
            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5">
              {/* Primary input */}
              {tool.args[0] && (
                <div className="px-2 pt-1">
                  <Input
                    value={values[tool.args[0].name] ?? ""}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [tool.args[0].name]: e.target.value }))
                    }
                    placeholder={
                      ("placeholder" in tool.args[0] ? tool.args[0].placeholder : undefined) ??
                      tool.args[0].label
                    }
                    className="h-12 border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
                  />
                </div>
              )}

              {/* Secondary args */}
              {tool.args.length > 1 && (
                <div className="mb-3 mt-1 grid grid-cols-1 gap-2 border-t border-black/5 pt-3 sm:grid-cols-2">
                  {tool.args.slice(1).map((arg) => (
                    <ArgField
                      key={arg.name}
                      arg={arg}
                      value={values[arg.name] ?? ""}
                      onChange={(v) => setValues((prev) => ({ ...prev, [arg.name]: v }))}
                    />
                  ))}
                </div>
              )}

              {/* Toolbar */}
              <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-black/5 pt-3">
                {/* Options */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-black/10 transition hover:bg-neutral-50">
                      <Sliders className="h-4 w-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[380px] rounded-2xl p-0" align="start">
                    <OptionsPanel options={options} setOptions={setOptions} />
                  </PopoverContent>
                </Popover>

                {/* Source */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm ring-1 ring-black/10 transition hover:bg-neutral-50">
                      <Plus className="h-3.5 w-3.5" />
                      Source: {sources.size}
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] rounded-2xl p-2" align="start">
                    {SOURCES.map((s) => {
                      const on = sources.has(s.id);
                      return (
                        <button
                          key={s.id}
                          onClick={() =>
                            setSources((prev) => {
                              const next = new Set(prev);
                              if (next.has(s.id)) next.delete(s.id);
                              else next.add(s.id);
                              return next;
                            })
                          }
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-neutral-50",
                            on && "bg-orange-50/60",
                          )}
                        >
                          <div
                            className={cn(
                              "grid h-5 w-5 place-items-center rounded",
                              on ? "bg-[#FF6C37] text-white" : "ring-1 ring-black/10",
                            )}
                          >
                            {on && <Check className="h-3.5 w-3.5" />}
                          </div>
                          <s.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{s.label}</span>
                        </button>
                      );
                    })}
                  </PopoverContent>
                </Popover>

                {/* Format */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm ring-1 ring-black/10 transition hover:bg-neutral-50">
                      <FileText className="h-3.5 w-3.5" />
                      Format:{" "}
                      <span className="font-medium capitalize">{format}</span>
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[520px] rounded-2xl p-3" align="start">
                    <div className="grid grid-cols-4 gap-2">
                      {FORMATS.map((f) => {
                        const active = format === f.id;
                        return (
                          <button
                            key={f.id}
                            onClick={() => setFormat(f.id)}
                            className={cn(
                              "relative rounded-xl p-3 text-left ring-1 transition",
                              active
                                ? "bg-orange-50/50 ring-[#FF6C37]"
                                : "ring-black/5 hover:bg-neutral-50",
                            )}
                          >
                            {active && (
                              <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-[#FF6C37] text-white">
                                <Check className="h-3 w-3" />
                              </span>
                            )}
                            <div className="mb-8 h-14 rounded-md bg-neutral-100" />
                            <div className="text-sm font-medium">{f.label}</div>
                            <div className="text-xs text-muted-foreground">{f.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>

                <div className="flex-1" />

                <button className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm ring-1 ring-black/10 transition hover:bg-neutral-50">
                  <Code2 className="h-3.5 w-3.5" />
                  Get code
                </button>

                <button
                  onClick={runTool}
                  disabled={!primaryValue.trim()}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#FF6C37] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[#e85d29] disabled:opacity-60"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  Run {tool.label.toLowerCase()}
                </button>
              </div>
            </div>
          </section>

          {/* Recent runs cards */}
          <section className="mx-auto mt-10 max-w-4xl">
            <h2 className="mb-4 text-sm font-medium">Recent Runs</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {runs.map((run) => (
                <RunCard key={run.id} run={run} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ArgField({
  arg,
  value,
  onChange,
}: {
  arg: ToolArg;
  value: string;
  onChange: (v: string) => void;
}) {
  if (arg.kind === "select") {
    return (
      <label className="flex items-center gap-2 rounded-xl bg-neutral-50 px-3 py-2 text-sm">
        <span className="w-24 shrink-0 text-xs uppercase tracking-wide text-muted-foreground">
          {arg.label}
        </span>
        <select
          value={value || arg.options[0]}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none"
        >
          {arg.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
    );
  }
  return (
    <label className="flex items-center gap-2 rounded-xl bg-neutral-50 px-3 py-2 text-sm">
      <span className="w-24 shrink-0 text-xs uppercase tracking-wide text-muted-foreground">
        {arg.label}
      </span>
      <input
        type={arg.kind === "number" ? "number" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={arg.kind === "text" ? arg.placeholder : arg.kind === "number" ? arg.placeholder : undefined}
        className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60"
      />
    </label>
  );
}

function OptionsPanel({
  options,
  setOptions,
}: {
  options: {
    mainContentOnly: boolean;
    parsePdf: boolean;
    enhancedMode: boolean;
    wait: string;
    timeout: string;
    maxAge: string;
  };
  setOptions: React.Dispatch<React.SetStateAction<typeof options>>;
}) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-black/5 px-4 py-3">
        <span className="text-sm text-muted-foreground">Options</span>
        <button className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="divide-y divide-black/5">
        <ToggleRow
          icon={FileText}
          label="Main content only"
          checked={options.mainContentOnly}
          onChange={(v) => setOptions((o) => ({ ...o, mainContentOnly: v }))}
        />
        <ToggleRow
          icon={FileText}
          label="Parse PDF"
          hint="1 Credit / PDF Page"
          checked={options.parsePdf}
          onChange={(v) => setOptions((o) => ({ ...o, parsePdf: v }))}
        />
        <ToggleRow
          icon={Settings2}
          label="Enhanced mode"
          hint="5 Credits / Page"
          checked={options.enhancedMode}
          onChange={(v) => setOptions((o) => ({ ...o, enhancedMode: v }))}
        />
        <InputRow
          icon={Settings2}
          label="Wait"
          suffix="ms"
          placeholder="5 seconds"
          value={options.wait}
          onChange={(v) => setOptions((o) => ({ ...o, wait: v }))}
        />
        <InputRow
          icon={Settings2}
          label="Timeout"
          suffix="ms"
          placeholder="30 seconds"
          value={options.timeout}
          onChange={(v) => setOptions((o) => ({ ...o, timeout: v }))}
        />
        <InputRow
          icon={Settings2}
          label="Max age"
          suffix="ms"
          placeholder="2 days"
          value={options.maxAge}
          onChange={(v) => setOptions((o) => ({ ...o, maxAge: v }))}
        />
      </div>
      <div className="flex justify-end px-4 py-3">
        <button
          onClick={() =>
            setOptions({
              mainContentOnly: true,
              parsePdf: true,
              enhancedMode: false,
              wait: "",
              timeout: "",
              maxAge: "2 days",
            })
          }
          className="rounded-full px-3 py-1.5 text-sm ring-1 ring-black/10 hover:bg-neutral-50"
        >
          Reset settings
        </button>
      </div>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  hint,
  checked,
  onChange,
}: {
  icon: typeof Search;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="flex-1 text-sm">{label}</span>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        className="data-[state=checked]:bg-[#FF6C37]"
      />
    </div>
  );
}

function InputRow({
  icon: Icon,
  label,
  suffix,
  placeholder,
  value,
  onChange,
}: {
  icon: typeof Search;
  label: string;
  suffix?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="flex-1 text-sm">{label}</span>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-8 w-40 rounded-lg bg-neutral-50 px-2 pr-10 text-sm outline-none ring-1 ring-black/5 focus:ring-black/20"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded bg-white px-1.5 py-0.5 text-[10px] ring-1 ring-black/10">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function RunCard({ run }: { run: Run }) {
  const tk = TOOLKITS.find((t) => t.id === run.toolkitId)!;
  const tl = tk.tools.find((t) => t.id === run.toolId)!;
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="grid h-8 w-8 place-items-center rounded-full text-white"
            style={{ backgroundColor: tk.color }}
          >
            {tk.brand}
          </div>
          <div className="font-medium">{run.target}</div>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
      </div>
      <dl className="mt-4 space-y-2 text-sm">
        <Row label="Endpoint">
          <tl.icon className="h-3.5 w-3.5" style={{ color: tk.color }} />
          <span>{tl.label}</span>
        </Row>
        <Row label="Status">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[#FF6C37] text-white">
            <Check className="h-2.5 w-2.5" />
          </span>
          <span className="capitalize">{run.status}</span>
        </Row>
        <Row label="Started">
          <span className="text-muted-foreground">{run.startedLabel}</span>
        </Row>
        <Row label="Format">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-100 px-2 py-0.5 text-xs">
            <FileText className="h-3 w-3" />
            <span className="capitalize">{run.format}</span>
          </span>
        </Row>
      </dl>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="flex items-center gap-2">{children}</dd>
    </div>
  );
}

// unused ensure imports kept (Send is referenced conceptually via composer)
void Send;
