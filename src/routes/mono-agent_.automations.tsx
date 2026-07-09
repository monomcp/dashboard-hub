import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Settings,
  Bot,
  Plus,
  MessageSquare,
  FilePlus,
  RefreshCw,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Sliders,
  ListChecks,
  Zap,
  CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mono-agent_/automations")({
  head: () => ({
    meta: [
      { title: "Mono Agent — Automations" },
      {
        name: "description",
        content: "Recurring and event-triggered tasks managed by the Mono Agent.",
      },
      { property: "og:title", content: "Mono Agent — Automations" },
      {
        property: "og:description",
        content: "Recurring and event-triggered tasks managed by the Mono Agent.",
      },
    ],
    links: [{ rel: "canonical", href: "/mono-agent/automations" }],
  }),
  component: MonoAgentAutomationsPage,
});

type View = "tasks" | "automations" | "artifacts" | "context";

const NAV: { id: View; label: string; icon: typeof ListChecks }[] = [
  { id: "tasks", label: "Tasks", icon: ListChecks },
  { id: "automations", label: "Automations", icon: Zap },
  { id: "artifacts", label: "Artifacts", icon: Sliders },
  { id: "context", label: "Context files", icon: CalendarClock },
];

type Automation = {
  id: string;
  name: string;
  trigger: string;
  status: "Active" | "Paused" | "Creating" | "Error";
  enabled: boolean;
  lastTriggered: string;
};

const AUTOMATIONS: Automation[] = [
  {
    id: "auto-weekly-cost-report",
    name: "Weekly cost report for CTO",
    trigger: "Schedule",
    status: "Creating",
    enabled: true,
    lastTriggered: "-",
  },
  {
    id: "auto-s3-daily-cost-check",
    name: "Daily S3 cost check",
    trigger: "Daily at 12 PM EST",
    status: "Active",
    enabled: true,
    lastTriggered: "Today, 12:00 PM",
  },
  {
    id: "auto-cost-anomaly-slack",
    name: "Cost anomaly Slack alerts",
    trigger: "Cost Anomaly Detection event",
    status: "Active",
    enabled: true,
    lastTriggered: "Yesterday, 4:18 PM",
  },
  {
    id: "auto-idle-rds-jira",
    name: "Idle RDS Jira ticket",
    trigger: "Weekly on Monday",
    status: "Paused",
    enabled: false,
    lastTriggered: "Jun 29, 2026",
  },
];

function MonoAgentAutomationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [view, setView] = useState<View>("automations");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return AUTOMATIONS;
    return AUTOMATIONS.filter((a) => a.name.toLowerCase().includes(q));
  }, [query]);

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
          <Link to="/mono-agent" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-600 via-indigo-500 to-sky-500 shadow-sm">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Mono Agent</span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Settings">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>
          <PlaygroundHeaderButton /><AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg">
                  <Plus className="mr-1 h-5 w-5" /> New
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 rounded-2xl p-1.5">
                <DropdownMenuItem asChild className="gap-3 rounded-lg py-2.5">
                  <Link to="/mono-agent">
                    <MessageSquare className="h-4 w-4 text-sky-500" /> New Chat
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="gap-3 rounded-lg py-2.5">
                  <Link to="/mono-agent">
                    <ListChecks className="h-4 w-4 text-violet-500" /> New Task
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="gap-3 rounded-lg py-2.5">
                  <Link to="/mono-agent/create">
                    <FilePlus className="h-4 w-4 text-emerald-500" /> New Automation
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <nav className="space-y-1">
              {NAV.map((n) => {
                const active = view === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => setView(n.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-r-full px-4 py-2 text-sm font-medium transition",
                      active
                        ? "bg-violet-100 text-violet-900"
                        : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <n.icon className="h-5 w-5 text-foreground/70" />
                    <span className="flex-1 truncate text-left">{n.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Recent
            </div>
            <ul className="mt-2 space-y-1 px-1">
              {["Cost Optimization Analysis"].map((t) => (
                <li
                  key={t}
                  className="rounded-lg px-3 py-1.5 text-sm text-foreground/75 hover:bg-white/60"
                >
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        )}

        <main
          className={cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6")}
        >
          <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Automations <span className="text-muted-foreground">({filtered.length})</span>
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Recurring and event-triggered tasks managed by the Mono Agent.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Refresh">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full">
                      Actions <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled={selected.size === 0}>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button asChild className="rounded-full bg-violet-600 hover:bg-violet-700">
                  <Link to="/mono-agent/create">Create automation</Link>
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find automations"
                  className="h-10 rounded-lg pl-9"
                />
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Prev">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="min-w-6 text-center">1</span>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Next">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  aria-label="Preferences"
                >
                  <Sliders className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-black/5">
              <div className="grid grid-cols-[40px_2fr_1.5fr_1fr_1fr_1.2fr] items-center gap-3 border-b border-black/5 bg-[hsl(220,33%,98%)] px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <Checkbox aria-label="Select all" />
                <span>Name</span>
                <span>Trigger</span>
                <span>Status</span>
                <span>Enabled</span>
                <span>Last triggered</span>
              </div>

              {loading ? (
                <ul>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[40px_2fr_1.5fr_1fr_1fr_1.2fr] items-center gap-3 border-b border-black/5 px-4 py-3 last:border-b-0"
                    >
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-10" />
                      <Skeleton className="h-4 w-24" />
                    </li>
                  ))}
                </ul>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-violet-100 text-violet-700">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-base font-medium">No automations</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Create an automation to run tasks on a schedule or in response to events.
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-violet-300 text-violet-700 hover:bg-violet-50"
                  >
                    <Link to="/mono-agent/create">Create automation</Link>
                  </Button>
                </div>
              ) : (
                <ul>
                  {filtered.map((a) => {
                    const isSel = selected.has(a.id);
                    return (
                      <li
                        key={a.id}
                        className="grid grid-cols-[40px_2fr_1.5fr_1fr_1fr_1.2fr] items-center gap-3 border-b border-black/5 px-4 py-3 last:border-b-0 hover:bg-[hsl(220,33%,98%)]"
                      >
                        <Checkbox
                          checked={isSel}
                          onCheckedChange={(v) => {
                            setSelected((s) => {
                              const next = new Set(s);
                              if (v) next.add(a.id);
                              else next.delete(a.id);
                              return next;
                            });
                          }}
                          aria-label={`Select ${a.name}`}
                        />
                        <Link
                          to="/mono-agent/create"
                          className="truncate text-sm font-medium text-violet-700 underline-offset-4 hover:underline"
                        >
                          {a.name}
                        </Link>
                        <span className="truncate text-sm text-foreground/80">{a.trigger}</span>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            a.status === "Active" && "text-emerald-700",
                            a.status === "Paused" && "text-muted-foreground",
                            a.status === "Creating" && "text-foreground/70",
                            a.status === "Error" && "text-destructive",
                          )}
                        >
                          {a.status}
                        </span>
                        <span
                          className={cn(
                            "text-sm font-medium",
                            a.enabled ? "text-emerald-700" : "text-muted-foreground",
                          )}
                        >
                          {a.enabled ? "Yes" : "No"}
                        </span>
                        <span className="text-sm text-muted-foreground">{a.lastTriggered}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
