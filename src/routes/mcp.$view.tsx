import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Blocks, Globe2, Menu, Sparkles } from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu } from "@/components/apps-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { PillTabs } from "@/components/pill-tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api-client";
import { brandIcon } from "@/lib/brand-icons";
import { mcpServerPath } from "@/lib/mcp-server-paths";
import { cn } from "@/lib/utils";
import type { CatalogBadge, CatalogServer, Page, Toolkit } from "@/lib/mcp-types";

type McpCatalogView = "registry" | "recommended";

const MCP_CATALOG_VIEWS = ["registry", "recommended"] as const;

function isMcpCatalogView(value: string): value is McpCatalogView {
  return (MCP_CATALOG_VIEWS as readonly string[]).includes(value);
}

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
  const { data: toolkitPage } = useQuery({
    queryKey: ["toolkits"],
    queryFn: () => apiRequest<Page<Toolkit>>("/api/v1/toolkits?limit=200"),
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
          <p className="max-w-3xl text-sm text-muted-foreground">{intro}</p>
        </div>

        {isError && (
          <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Couldn't load the catalog. Please try again.
          </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {isLoading && Array.from({ length: 6 }).map((_, i) => <RegistryCardSkeleton key={i} />)}

          {!isLoading &&
            servers.map((server) => (
              <RegistryServerCard
                key={server.slug}
                server={server}
                toolkits={toolkitPage?.items ?? []}
              />
            ))}
        </div>

        {!isLoading && !isError && servers.length === 0 && <EmptyCatalogState view={view} />}
      </main>
    </div>
  );
}

function RegistryServerCard({ server, toolkits }: { server: CatalogServer; toolkits: Toolkit[] }) {
  const connectedToolkits = server.toolkit_ids
    .map((id) => toolkits.find((toolkit) => toolkit.id === id))
    .filter((toolkit): toolkit is Toolkit => Boolean(toolkit));
  const modulePath = mcpServerPath(server);
  const openModule = () => {
    if (modulePath) window.location.assign(modulePath);
  };

  return (
    <article
      className={cn(
        "flex flex-col rounded-2xl bg-white p-5 ring-1 ring-black/5",
        modulePath &&
          "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
      )}
      onClick={(event) => {
        // Dialog content is portalled but still bubbles through React's tree.
        // Ignore it so closing the connection sheet cannot open this card.
        if (!event.currentTarget.contains(event.target as Node)) return;
        if ((event.target as HTMLElement).closest("button, a, input, [role='button']")) return;
        openModule();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModule();
        }
      }}
      role={modulePath ? "link" : undefined}
      tabIndex={modulePath ? 0 : undefined}
      aria-label={modulePath ? `Open ${server.name}` : undefined}
    >
      <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] gap-3">
        <ServerLogo server={server} />
        <div className="min-w-0">
          <h3 className="truncate text-base font-medium">{server.name}</h3>
          <p className="mt-1 truncate text-sm text-muted-foreground">{server.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>
              {server.tools.length} {server.tools.length === 1 ? "tool" : "tools"}
            </span>
            {server.badges.map((badge) => (
              <span key={badge}>{BADGE_DETAILS[badge].label}</span>
            ))}
          </div>
        </div>
        <EnableMcpServerButton
          serverSlug={server.slug}
          enabled={server.enabled}
          toolkitIds={server.toolkit_ids}
          variant="registry"
        />
      </div>

      <div className="mt-4 flex min-h-8 flex-wrap items-center gap-2 border-t pt-4 text-xs text-muted-foreground">
        {server.enabled ? (
          connectedToolkits.length > 0 ? (
            <>
              <span>Connected as</span>
              {connectedToolkits.map((toolkit) => (
                <span
                  key={toolkit.id}
                  className="rounded-md bg-muted/60 px-2 py-1 font-medium text-foreground"
                >
                  {toolkit.name}
                </span>
              ))}
            </>
          ) : (
            "Connected"
          )
        ) : (
          "Not connected"
        )}
      </div>
    </article>
  );
}

function RegistryCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
      <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_2.5rem] items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="min-w-0">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-2 h-4 w-4/5" />
          <Skeleton className="mt-2 h-3 w-36" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-10 rounded-full" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-6 w-14 rounded-md" />
      </div>
    </div>
  );
}

const BADGE_DETAILS: Record<
  CatalogBadge,
  { label: string; className: string; icon: typeof Globe2 }
> = {
  official: {
    label: "Official",
    className: "border-sky-200 bg-sky-50 text-sky-700",
    icon: BadgeCheck,
  },
  remote: {
    label: "Remote",
    className: "border-slate-200 bg-slate-50 text-slate-600",
    icon: Globe2,
  },
  monomcp: {
    label: "MonoMCP",
    className: "border-violet-200 bg-violet-50 text-violet-700",
    icon: Sparkles,
  },
};

function ServerLogo({ server, compact = false }: { server: CatalogServer; compact?: boolean }) {
  const frameClass = compact
    ? "grid h-14 w-14 place-items-center rounded-[1.125rem] border border-slate-200 bg-white sm:h-16 sm:w-16"
    : "grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-black/5";
  if (server.logo_url) {
    return (
      <div className={frameClass}>
        <img
          src={server.logo_url}
          alt={`${server.name} logo`}
          className={cn("object-contain", compact ? "h-9 w-9" : "h-7 w-7")}
          loading="lazy"
        />
      </div>
    );
  }

  const icon = brandIcon(server.icon_key);
  if (icon) {
    return <div className={frameClass}>{icon}</div>;
  }

  return (
    <div
      className={cn(
        frameClass,
        "border-0 bg-gradient-to-br from-sky-500 to-indigo-600 font-semibold uppercase text-white",
        compact ? "text-lg" : "text-sm",
      )}
    >
      {server.name.charAt(0)}
    </div>
  );
}

const MCP_CATALOG_TABS: { id: McpCatalogView; label: string }[] = [
  { id: "registry", label: "Your registry" },
  { id: "recommended", label: "Recommended servers" },
];

function CatalogTabs({ view }: { view: McpCatalogView }) {
  const navigate = useNavigate();

  return (
    <PillTabs
      tabs={MCP_CATALOG_TABS}
      activeId={view}
      onSelect={(id) => void navigate({ to: "/mcp/$view", params: { view: id as McpCatalogView } })}
      variant="raised"
      ariaLabel="Select MCP catalog view"
      className="pointer-events-auto w-[390px] text-muted-foreground"
    />
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
