import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, Blocks, Globe2, Menu, Sparkles } from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu } from "@/components/apps-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { PillTabs } from "@/components/pill-tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api-client";
import { brandIcon } from "@/lib/brand-icons";
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
    enabled: view === "registry",
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

        <div
          className={cn(
            "grid gap-4",
            view === "registry" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {isLoading &&
            Array.from({ length: 6 }).map((_, i) =>
              view === "registry" ? (
                <RegistryCardSkeleton key={i} />
              ) : (
                <div key={i} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <Skeleton className="mt-4 h-5 w-32" />
                  <Skeleton className="mt-2 h-4 w-full" />
                  <Skeleton className="mt-1 h-4 w-2/3" />
                  <Skeleton className="mt-4 h-9 w-28 rounded-full" />
                </div>
              ),
            )}

          {!isLoading &&
            servers.map((server) =>
              view === "registry" ? (
                <RegistryServerCard
                  key={server.slug}
                  server={server}
                  toolkits={toolkitPage?.items ?? []}
                />
              ) : (
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
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-medium">{server.name}</h3>
                    <ServerBadges badges={catalogBadges(server)} />
                  </div>
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
              ),
            )}
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
  const primaryToolkit = connectedToolkits[0];
  const badges = catalogBadges(server);
  const modulePath = server.configure_path ?? SERVER_MODULE_PATHS[server.slug];
  const openModule = () => {
    if (modulePath) window.location.assign(modulePath);
  };

  return (
    <article
      className={cn(
        "flex flex-col rounded-2xl bg-white p-5 ring-1 ring-black/5 transition",
        modulePath &&
          "cursor-pointer hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
      )}
      onClick={(event) => {
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
      <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3">
        <ServerLogo server={server} />
        <div className="min-w-0">
          <h3 className="truncate text-base font-medium">{server.name}</h3>
          <p className="mt-1 truncate text-sm text-muted-foreground">{server.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>
              {server.tools.length} {server.tools.length === 1 ? "tool" : "tools"}
            </span>
            {badges.map((badge) => (
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

      <div className="mt-4 flex min-h-8 items-center justify-between gap-3 border-t pt-4 text-xs text-muted-foreground">
        <span className="truncate">
          {server.enabled ? (
            primaryToolkit ? (
              <>
                Connected as{" "}
                <strong className="font-medium text-foreground/70">{primaryToolkit.name}</strong>
              </>
            ) : (
              "Connected"
            )
          ) : (
            "Not connected"
          )}
        </span>
        {server.enabled && server.toolkit_ids[0] && (
          <code className="shrink-0 rounded-md bg-muted/60 px-2 py-1 font-mono text-xs text-foreground">
            {server.toolkit_ids[0].slice(0, 6)}
          </code>
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

const OFFICIAL_SERVER_SLUGS = new Set(["firecrawl", "github"]);
const MONOMCP_SERVER_SLUGS = new Set([
  "content",
  "smm",
  "brand",
  "postman",
  "pinterest",
  "instagram",
  "database",
  "cms",
  "calendar",
  "tasks",
  "drive",
  "contacts",
  "crm",
  "email",
]);

const SERVER_MODULE_PATHS: Record<string, string> = {
  brand: "/brand",
  calendar: "/calendar",
  cms: "/cms",
  contacts: "/contacts",
  content: "/content",
  database: "/database",
  drive: "/drive",
  duckduckgo: "/duckduckgo",
  email: "/email",
  firecrawl: "/firecrawl",
  github: "/github",
  instagram: "/instagram",
  pinterest: "/pinterest",
  postman: "/postman",
  smm: "/content",
  tasks: "/tasks/activity",
};

function catalogBadges(server: CatalogServer): CatalogBadge[] {
  if (server.badges?.length) {
    return server.badges;
  }

  if (OFFICIAL_SERVER_SLUGS.has(server.slug)) {
    return ["remote", "official"];
  }
  if (MONOMCP_SERVER_SLUGS.has(server.slug)) {
    return ["remote", "monomcp"];
  }
  return ["remote"];
}

function ServerBadges({ badges }: { badges: CatalogBadge[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" aria-label="Server badges">
      {badges.map((badge) => {
        const detail = BADGE_DETAILS[badge];
        const Icon = detail.icon;
        return (
          <span
            key={badge}
            className={cn(
              "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium",
              detail.className,
            )}
          >
            <Icon className="h-3 w-3" aria-hidden="true" />
            {detail.label}
          </span>
        );
      })}
    </div>
  );
}

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
  return (
    <PillTabs
      tabs={MCP_CATALOG_TABS}
      activeId={view}
      className="pointer-events-auto text-muted-foreground"
      renderTab={(tab, active) => (
        <Link
          to="/mcp/$view"
          params={{ view: tab.id }}
          className={cn(
            "flex items-center justify-center rounded-full px-5 py-1.5 text-sm font-medium transition-colors duration-200",
            active ? "text-foreground" : "text-foreground/60 hover:text-foreground",
          )}
        >
          {tab.label}
        </Link>
      )}
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
