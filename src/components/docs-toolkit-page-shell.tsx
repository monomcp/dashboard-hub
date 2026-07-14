import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  Folder,
  HelpCircle,
  KeyRound,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trash2,
} from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api-client";
import type { CatalogServer } from "@/lib/mcp-types";
import { cn } from "@/lib/utils";

type DocsToolkitPage = "permissions" | "activity";

type DocsToolkitPageShellContext = {
  docsServer: CatalogServer | undefined;
  catalogReady: boolean;
};

const DRIVE_LINKS = [
  { label: "My Docs", icon: Folder, search: {} },
  { label: "Starred", icon: Sparkles, search: { view: "starred" as const } },
  { label: "System", icon: Settings, search: { view: "system" as const } },
  { label: "Trash", icon: Trash2, search: { view: "trash" as const } },
];

export function DocsToolkitPageShell({
  activePage,
  children,
}: {
  activePage: DocsToolkitPage;
  children: ReactNode | ((context: DocsToolkitPageShellContext) => ReactNode);
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  const { data: catalog, isLoading: catalogLoading } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 60 * 1000,
  });
  const docsServer = catalog?.find((server) => server.slug === "docs");
  const catalogReady = !catalogLoading;
  const content = useMemo(
    () => (typeof children === "function" ? children({ docsServer, catalogReady }) : children),
    [catalogReady, children, docsServer],
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
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/docs" search={{}} className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400 shadow-sm">
              <span className="text-sm font-bold text-white">△</span>
            </div>
            <span className="text-xl font-medium tracking-tight">Docs</span>
          </Link>
        </div>

        {searchOpen && (
          <div className="hidden min-w-0 max-w-2xl flex-1 md:block">
            <div className="relative flex h-9 w-full items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search in Docs"
                className="h-9 w-full rounded-full border-0 bg-[hsl(220,33%,95%)] pl-12 pr-4 text-base outline-none focus:bg-white focus:ring-1 focus:ring-sky-200"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-1">
          {catalogLoading ? (
            <Skeleton className="mr-1 h-9 w-28 rounded-full" />
          ) : (
            docsServer && (
              <div className="mr-1">
                <EnableMcpServerButton
                  serverSlug="docs"
                  enabled={docsServer.enabled}
                  toolkitIds={docsServer.toolkit_ids}
                />
              </div>
            )
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Search"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <PlaygroundHeaderButton />
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      {searchOpen && (
        <div className="relative mx-4 mb-3 flex h-9 items-center md:hidden">
          <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            placeholder="Search in Docs"
            className="h-9 w-full rounded-full border-0 bg-[hsl(220,33%,95%)] pl-12 pr-4 text-base outline-none focus:bg-white focus:ring-1 focus:ring-sky-200"
          />
        </div>
      )}

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <Button
              disabled
              className="mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white"
            >
              <Plus className="mr-1 h-5 w-5" /> New
            </Button>

            <nav className="space-y-1">
              {DRIVE_LINKS.map((item) => (
                <Link
                  key={item.label}
                  to="/docs"
                  search={item.search}
                  className="flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm text-foreground/80 transition hover:bg-white/60"
                >
                  <item.icon className="h-5 w-5 text-foreground/70" />
                  <span className="flex-1 truncate text-left">{item.label}</span>
                </Link>
              ))}
              <DocsSidebarLink
                to="/docs/permissions"
                icon={<KeyRound className="h-5 w-5" />}
                label="Permissions"
                active={activePage === "permissions"}
              />
              <DocsSidebarLink
                to="/docs/activity"
                icon={<Activity className="h-5 w-5" />}
                label="Activity"
                active={activePage === "activity"}
              />
            </nav>
          </aside>
        )}

        <main
          className={cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6")}
        >
          {content}
        </main>
      </div>
    </div>
  );
}

function DocsSidebarLink({
  to,
  icon,
  label,
  active,
}: {
  to: "/docs/permissions" | "/docs/activity";
  icon: ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
        active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
      )}
    >
      <span className={cn("text-foreground/70", active && "text-sky-900")}>{icon}</span>
      <span className="flex-1 truncate text-left">{label}</span>
    </Link>
  );
}
