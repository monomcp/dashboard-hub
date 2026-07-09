import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Blocks, Menu } from "lucide-react";
import type { ReactNode } from "react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu } from "@/components/apps-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { InstagramIcon } from "@/components/instagram-icon";
import { PinterestIcon } from "@/components/pinterest-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import type { CatalogServer } from "@/lib/mcp-types";

type McpCatalogView = "registry" | "recommended";

const MCP_CATALOG_VIEWS = ["registry", "recommended"] as const;

function isMcpCatalogView(value: string): value is McpCatalogView {
  return (MCP_CATALOG_VIEWS as readonly string[]).includes(value);
}

const SERVER_ICONS: Record<string, ReactNode> = {
  instagram: <InstagramIcon className="h-6 w-6" />,
  pinterest: <PinterestIcon className="h-6 w-6" />,
};

export const Route = createFileRoute("/mcp/$view")({
  beforeLoad: ({ params }) => {
    if (!isMcpCatalogView(params.view)) {
      throw redirect({ to: "/mcp/$view", params: { view: "registry" }, replace: true });
    }
  },
  head: ({ params }) => ({
    meta: [
      { title: params.view === "recommended" ? "Recommended servers - MCP store" : "MCP store" },
      {
        name: "description",
        content:
          "Browse the MCP server catalog and enable servers onto your organization's toolkits.",
      },
    ],
    links: [{ rel: "canonical", href: `/mcp/${params.view}` }],
  }),
  component: McpCatalogPage,
});

function McpCatalogPage() {
  const view = Route.useParams().view as McpCatalogView;
  const catalogPath =
    view === "recommended"
      ? "/api/v1/mcp-catalog?view=recommended"
      : "/api/v1/mcp-catalog?view=registry";
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mcp-catalog", view],
    queryFn: () => apiRequest<CatalogServer[]>(catalogPath),
    staleTime: 60 * 1000,
  });

  const intro =
    view === "recommended"
      ? "Browse recommended servers and add their tools to a toolkit."
      : "Your enabled MCP servers and the tools currently exposed through your gateway.";
  const servers = data ?? [];

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      <header className="relative flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="relative z-10 flex items-center gap-3">
          <Link to="/mcp/$view" params={{ view: "registry" }} className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 shadow-sm">
              <Blocks className="h-5 w-5 text-white" />
            </div>
            <div className="text-xl font-medium leading-tight tracking-tight">MCP store</div>
          </Link>
        </div>
        <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
          <CatalogTabs view={view} />
        </div>
        <div className="relative z-10 flex items-center gap-1">
          <AppsMenu />
          <AccountMenu />
        </div>
        <button type="button" className="sr-only" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="mb-6 mt-2">
          <div className="mb-5 md:hidden">
            <CatalogTabs view={view} />
          </div>
          <h1 className="text-2xl font-medium tracking-tight">MCP store</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{intro}</p>
        </div>

        {isError && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Couldn't load the catalog. Please try again.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="mt-4 h-5 w-32" />
                <Skeleton className="mt-2 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-2/3" />
                <Skeleton className="mt-4 h-9 w-28 rounded-full" />
              </div>
            ))}

          {!isLoading &&
            servers.map((server) => (
              <div
                key={server.slug}
                className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-black/5"
              >
                <div className="flex items-start justify-between">
                  <ServerLogo server={server} />
                  <span className="text-xs text-muted-foreground">
                    {server.tools.length} {server.tools.length === 1 ? "tool" : "tools"}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-medium">{server.name}</h3>
                <p className="mt-1 line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {server.description}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <EnableMcpServerButton
                    serverSlug={server.slug}
                    enabled={server.enabled}
                    toolkitIds={server.toolkit_ids}
                  />
                  {server.configure_path && (
                    <a
                      href={server.configure_path}
                      className="text-sm font-medium text-sky-700 hover:underline"
                    >
                      Configure →
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>

        {!isLoading && !isError && servers.length === 0 && <EmptyCatalogState view={view} />}
      </main>
    </div>
  );
}

function ServerLogo({ server }: { server: CatalogServer }) {
  if (server.logo_url) {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-black/5">
        <img
          src={server.logo_url}
          alt={`${server.name} logo`}
          className="h-7 w-7 object-contain"
          loading="lazy"
        />
      </div>
    );
  }

  if (server.icon_key && SERVER_ICONS[server.icon_key]) {
    return (
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-black/5">
        {SERVER_ICONS[server.icon_key]}
      </div>
    );
  }

  return (
    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-semibold uppercase text-white">
      {server.name.charAt(0)}
    </div>
  );
}

function CatalogTabs({ view }: { view: McpCatalogView }) {
  return (
    <div className="pointer-events-auto inline-flex rounded-full bg-muted/70 p-1 text-muted-foreground">
      <CatalogTab view="registry" active={view === "registry"}>
        Your registry
      </CatalogTab>
      <CatalogTab view="recommended" active={view === "recommended"}>
        Recommended servers
      </CatalogTab>
    </div>
  );
}

function CatalogTab({
  view,
  active,
  children,
}: {
  view: McpCatalogView;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      to="/mcp/$view"
      params={{ view }}
      className={cn(
        "rounded-full px-5 py-2 text-sm font-medium transition",
        active ? "bg-white text-foreground shadow-sm" : "hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

function EmptyCatalogState({ view }: { view: McpCatalogView }) {
  if (view === "recommended") {
    return (
      <div className="rounded-2xl bg-white p-6 text-sm text-muted-foreground ring-1 ring-black/5">
        No recommended servers yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 text-sm text-muted-foreground ring-1 ring-black/5">
      No enabled MCP servers yet.{" "}
      <Link
        to="/mcp/$view"
        params={{ view: "recommended" }}
        className="font-medium text-sky-700 hover:underline"
      >
        Browse recommended servers
      </Link>
      .
    </div>
  );
}
