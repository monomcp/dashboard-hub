import { createFileRoute, Link, Outlet, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HelpCircle, KeyRound, Menu, Settings, Squircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AppsMenu } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { PermissionsMatrixLoading } from "@/components/permissions-matrix";
import { apiRequest } from "@/lib/api-client";
import { lightPermissionsTheme } from "@/lib/permissions-theme";
import { cn } from "@/lib/utils";
import type { Page, Toolkit } from "@/lib/mcp-types";

export const Route = createFileRoute("/permissions")({
  head: () => ({
    meta: [
      { title: "Permissions" },
      {
        name: "description",
        content: "Manage who can use each toolkit's tools and how every call is gated.",
      },
      { property: "og:title", content: "Permissions" },
      {
        property: "og:description",
        content: "Manage who can use each toolkit's tools and how every call is gated.",
      },
    ],
    links: [{ rel: "canonical", href: "/permissions" }],
  }),
  component: PermissionsLayout,
});

function PermissionsLayout() {
  const navigate = useNavigate();
  // strict:false — this layout renders for both /permissions and /permissions/$toolkitId.
  const { toolkitId } = useParams({ strict: false }) as { toolkitId?: string };
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: ["toolkits-list"],
    queryFn: () => apiRequest<Page<Toolkit>>("/api/v1/toolkits?sort=name&direction=asc&limit=200"),
    staleTime: 30 * 1000,
  });
  const toolkits = useMemo(() => data?.items ?? [], [data]);

  // Default to the first toolkit when landing on the bare /permissions path.
  useEffect(() => {
    if (!toolkitId && toolkits.length > 0) {
      void navigate({
        to: "/permissions/$toolkitId",
        params: { toolkitId: toolkits[0].id },
        replace: true,
      });
    }
  }, [toolkitId, toolkits, navigate]);

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3 md:w-[244px] md:shrink-0">
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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 shadow-sm">
              <KeyRound className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Permissions</span>
          </Link>
        </div>
        <div className="hidden flex-1 md:block" />
        <div className="flex items-center gap-1">
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
            <div className="mb-1 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Toolkits
            </div>
            {isLoading ? (
              <div className="space-y-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-9 rounded-full" />
                ))}
              </div>
            ) : toolkits.length === 0 ? (
              <p className="px-3 py-2 text-sm text-muted-foreground">No toolkits yet.</p>
            ) : (
              <nav className="space-y-1">
                {toolkits.map((toolkit) => {
                  const active = toolkitId === toolkit.id;
                  return (
                    <Link
                      key={toolkit.id}
                      to="/permissions/$toolkitId"
                      params={{ toolkitId: toolkit.id }}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                        active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
                      )}
                    >
                      <Squircle className="h-5 w-5 shrink-0 text-foreground/70" />
                      <span className="flex-1 truncate text-left">{toolkit.name}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </aside>
        )}

        <main
          className={cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6")}
        >
          {!isLoading && toolkits.length === 0 ? (
            <div
              className={cn(
                lightPermissionsTheme.card,
                "grid place-items-center gap-2 py-12 text-center",
              )}
            >
              <KeyRound className={cn("h-8 w-8", lightPermissionsTheme.emptyIcon)} />
              <p className={lightPermissionsTheme.mutedText}>
                No toolkit is connected yet — enable an MCP server from the catalog.
              </p>
              <Button asChild size="sm" className="mt-2 rounded-lg">
                <Link to="/mcp">Go to MCP catalog</Link>
              </Button>
            </div>
          ) : toolkitId ? (
            <Outlet />
          ) : (
            <PermissionsMatrixLoading theme={lightPermissionsTheme} />
          )}
        </main>
      </div>
    </div>
  );
}
