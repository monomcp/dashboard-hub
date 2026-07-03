import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bot,
  CalendarClock,
  Expand,
  FilePlus,
  HelpCircle,
  ListChecks,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Send,
  Settings,
  Sliders,
  Zap,
} from "lucide-react";
import { AppsMenu } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/mono-agent")({
  head: () => ({
    meta: [
      { title: "Mono Agent" },
      {
        name: "description",
        content: "Delegate work to the Mono Agent with chats, tasks, and automations.",
      },
      { property: "og:title", content: "Mono Agent" },
      {
        property: "og:description",
        content: "Delegate work to the Mono Agent with chats, tasks, and automations.",
      },
    ],
    links: [{ rel: "canonical", href: "/mono-agent" }],
  }),
  component: MonoAgentPage,
});

type View = "tasks" | "automations" | "artifacts" | "context";

const NAV: { id: View; label: string; icon: typeof ListChecks; to?: "/mono-agent/automations" }[] =
  [
    { id: "tasks", label: "Tasks", icon: ListChecks },
    { id: "automations", label: "Automations", icon: Zap, to: "/mono-agent/automations" },
    { id: "artifacts", label: "Artifacts", icon: Sliders },
    { id: "context", label: "Context files", icon: CalendarClock },
  ];

const PRESETS = [
  "Find EC2 rightsizing opportunities and create an HTML report.",
  "Check my S3 costs daily at 12 PM EST.",
  "Investigate cost anomalies in the last 7 days. Correlate with CloudTrail to identify the API calls and IAM principals behind them.",
  "Automate Cost Anomaly Detection events for anomalies over $100 and post to Slack #cost-alerts.",
  "What was my cost in May 2026, and how did it change compared to the prior month?",
  "Summarize cost trends and savings opportunities in an executive-ready report in ppt.",
  "Do I have any idle RDS instances? What are the procedures if I want to delete them?",
  "Create a Jira ticket in space ENG summarizing idle RDS findings and recommended actions per instance.",
];

function MonoAgentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [prompt, setPrompt] = useState("");
  const remaining = useMemo(() => Math.max(0, 1000 - prompt.length), [prompt.length]);

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
          <AppsMenu />
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
                const content = (
                  <>
                    <n.icon className="h-5 w-5 text-foreground/70" />
                    <span className="flex-1 truncate text-left">{n.label}</span>
                  </>
                );
                const className =
                  "flex w-full items-center gap-3 rounded-r-full px-4 py-2 text-sm font-medium text-foreground/80 transition hover:bg-white/60";

                return n.to ? (
                  <Link key={n.id} to={n.to} className={className}>
                    {content}
                  </Link>
                ) : (
                  <button key={n.id} className={className}>
                    {content}
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
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Delegate work to FinOps Agent
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Start a chat, launch a task, or choose a common FinOps workflow.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground"
                  aria-label="Expand composer"
                >
                  <Expand className="h-4 w-4" />
                </Button>
              </div>

              <form
                className="mt-8"
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <div className="relative">
                  <Textarea
                    value={prompt}
                    maxLength={1000}
                    onChange={(event) => setPrompt(event.target.value)}
                    placeholder="Fin"
                    className="min-h-40 resize-y rounded-lg bg-background pr-14 text-sm shadow-none placeholder:text-muted-foreground placeholder:italic focus-visible:ring-violet-200"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-3 right-3 rounded-full text-muted-foreground hover:bg-violet-50 hover:text-violet-700"
                    aria-label="Send message"
                    disabled={prompt.trim().length === 0}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <div className="mt-2 text-right text-sm text-muted-foreground">
                  {1000 - remaining}/1000 characters maximum
                </div>
              </form>

              <div className="mt-8">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Get started with a common task:
                </p>
                <div className="mt-3 space-y-3">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setPrompt(preset.slice(0, 1000))}
                      className="w-full rounded-xl border border-black/5 bg-[hsl(220,33%,98%)] px-4 py-3 text-left text-sm font-medium leading-6 text-foreground/80 transition hover:bg-violet-50 hover:text-violet-900"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
