import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  Bot,
  CalendarClock,
  CheckCircle2,
  CheckSquare,
  Gauge,
  HelpCircle,
  KeyRound,
  Menu,
  Plus,
  Search,
  Star,
  UserRound,
} from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu } from "@/components/apps-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import type { CatalogServer } from "@/lib/mcp-types";

type TasksToolPage = "permissions" | "activity" | "uptime";

type TaskListSummary = {
  id: string;
  name: string;
  task_count: number;
};

type Page<T> = {
  items: T[];
};

type TasksToolkitPageShellContext = {
  tasksServer: CatalogServer | undefined;
  catalogReady: boolean;
};

export function TasksToolkitPageShell({
  activePage,
  children,
}: {
  activePage: TasksToolPage;
  children: ReactNode | ((context: TasksToolkitPageShellContext) => ReactNode);
}) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data: catalog, isLoading: catalogLoading } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 60 * 1000,
  });
  const catalogReady = !catalogLoading;
  const tasksServer = catalog?.find((server) => server.slug === "tasks");

  const { data: listsPage, isLoading: listsLoading } = useQuery({
    queryKey: ["tasks-lists-summary"],
    queryFn: () =>
      apiRequest<Page<TaskListSummary>>(
        "/api/v1/tasks/lists?limit=200&sort=sort_order&direction=asc",
      ),
    enabled: sidebarOpen,
    staleTime: 30 * 1000,
  });

  const content = useMemo(
    () => (typeof children === "function" ? children({ tasksServer, catalogReady }) : children),
    [children, tasksServer, catalogReady],
  );

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-medium tracking-tight">Tasks</span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          {tasksServer && (
            <div className="mr-1">
              <EnableMcpServerButton
                serverSlug={tasksServer.slug}
                enabled={tasksServer.enabled}
                toolkitIds={tasksServer.toolkit_ids}
              />
            </div>
          )}
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <Button
              onClick={() => void navigate({ to: "/" })}
              className="mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg"
            >
              <Plus className="mr-1 h-5 w-5" /> Create
            </Button>

            <nav className="space-y-1">
              <TasksSidebarLink
                icon={<CheckCircle2 className="h-5 w-5" />}
                label="All tasks"
                to="/"
              />
              <TasksSidebarLink icon={<UserRound className="h-5 w-5" />} label="My tasks" to="/" />
              <TasksSidebarLink
                icon={<Bot className="h-5 w-5" />}
                label="Assigned to agents"
                to="/"
              />
              <TasksSidebarLink
                icon={<CheckSquare className="h-5 w-5" />}
                label="Needs review"
                to="/"
              />
              <TasksSidebarLink
                icon={<AlertTriangle className="h-5 w-5" />}
                label="Failed"
                to="/"
              />
              <TasksSidebarLink
                icon={<CalendarClock className="h-5 w-5" />}
                label="Scheduled"
                to="/"
              />
              <TasksSidebarLink icon={<Star className="h-5 w-5" />} label="Starred" to="/" />
              <TasksSidebarLink
                icon={<KeyRound className="h-5 w-5" />}
                label="Permissions"
                to="/tasks/permissions"
                active={activePage === "permissions"}
              />
              <TasksSidebarLink
                icon={<Activity className="h-5 w-5" />}
                label="Activity"
                to="/tasks/activity"
                active={activePage === "activity"}
              />
              <TasksSidebarLink
                icon={<Gauge className="h-5 w-5" />}
                label="Uptime"
                to="/tasks/uptime"
                active={activePage === "uptime"}
              />
            </nav>

            <div className="mt-6">
              <div className="rounded-lg px-3 py-2 text-sm text-muted-foreground">Lists</div>
              <div className="mt-1 space-y-1">
                {listsLoading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="flex items-center gap-3 rounded-full px-3 py-2">
                        <Skeleton className="h-5 w-5 rounded-full" />
                        <Skeleton className="h-4 flex-1 rounded-full" />
                        <Skeleton className="h-3 w-5 rounded-full" />
                      </div>
                    ))
                  : (listsPage?.items ?? []).map((list) => (
                      <TasksSidebarLink
                        key={list.id}
                        icon={<CheckSquare className="h-5 w-5" />}
                        label={list.name}
                        count={list.task_count}
                        to="/"
                      />
                    ))}
              </div>
            </div>
          </aside>
        )}

        <main className="flex-1 px-4 pb-16 md:px-6">{content}</main>
      </div>
    </div>
  );
}

function TasksSidebarLink({
  icon,
  label,
  to,
  active,
  count,
}: {
  icon: ReactNode;
  label: string;
  to: "/" | "/tasks/permissions" | "/tasks/activity" | "/tasks/uptime";
  active?: boolean;
  count?: number;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
        active ? "bg-sky-100 text-sky-900" : "hover:bg-white/60",
      )}
    >
      <span className={cn("text-foreground/70", active && "text-sky-900")}>{icon}</span>
      <span className="flex-1 truncate text-left">{label}</span>
      {count != null && <span className="text-xs text-muted-foreground">{count}</span>}
    </Link>
  );
}
