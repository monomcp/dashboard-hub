import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import {
  Menu,
  HelpCircle,
  Settings,
  ShieldCheck,
  Activity,
  Wrench,
  MousePointerClick,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { ActivityLog, type RequestLogSource } from "@/components/activity-log";
import { ApiError, clearAuthTokens } from "@/lib/api-client";
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

// Sidebar nav drives the activity source filter. "all" shows everything;
// "api" is Console (UI) activity, "mcp" is MCP tool calls.
type SourceFilter = "all" | RequestLogSource;

const NAV: {
  id: SourceFilter;
  label: string;
  description: string;
  icon: typeof Activity;
}[] = [
  {
    id: "all",
    label: "All activity",
    description: "Every change made through Console and via MCP tool calls.",
    icon: Activity,
  },
  {
    id: "mcp",
    label: "MCP tool calls",
    description: "Every tool call made by agents against your MCP endpoints.",
    icon: Wrench,
  },
  {
    id: "api",
    label: "UI changes",
    description: "Every change made by people through the Console UI.",
    icon: MousePointerClick,
  },
];

function AuditPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState<SourceFilter>("all");

  const handleApiError = useCallback(
    (err: unknown, fallback = "Could not load activity") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      // Surface non-auth errors to the console; the activity log renders its own
      // empty state when the request fails.
      console.error(fallback, err);
    },
    [navigate],
  );

  const active = NAV.find((n) => n.id === filter) ?? NAV[0];

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
        <div className="flex items-center gap-1">
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
            <Button
              className="mb-4 h-14 w-[160px] gap-2 rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg"
              disabled
            >
              <Download className="h-5 w-5" /> Export
            </Button>

            <nav className="space-y-1">
              {NAV.map((n) => {
                const isActive = filter === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => setFilter(n.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      isActive ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
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
          <ActivityLog
            onApiError={handleApiError}
            source={filter}
            resolvePrincipalNames={false}
            title={active.label}
            description={active.description}
          />
        </main>
      </div>
    </div>
  );
}
