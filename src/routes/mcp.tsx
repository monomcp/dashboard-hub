import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Blocks, Menu } from "lucide-react";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu } from "@/components/apps-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { PinterestIcon } from "@/components/pinterest-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api-client";
import type { CatalogServer } from "@/lib/mcp-types";

export const Route = createFileRoute("/mcp")({
  head: () => ({
    meta: [
      { title: "Enable MCP tools" },
      {
        name: "description",
        content:
          "Browse the MCP server catalog and enable servers onto your organization's toolkits.",
      },
    ],
    links: [{ rel: "canonical", href: "/mcp" }],
  }),
  component: McpCatalogPage,
});

function McpCatalogPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 60 * 1000,
  });

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 shadow-sm">
              <Blocks className="h-5 w-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-medium tracking-tight">MCP tools</div>
              <div className="text-xs text-muted-foreground">Enable servers for your org</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <AppsMenu />
          <AccountMenu />
        </div>
        <button type="button" className="sr-only" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="mb-6 mt-2">
          <h1 className="text-2xl font-medium tracking-tight">Enable MCP tools</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick a server to expose its tools through your MCP gateway. Enabling adds the server's
            tools to a toolkit you choose (or a new one).
          </p>
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
              </div>
            ))}

          {data?.map((server) => (
            <div
              key={server.slug}
              className="flex flex-col rounded-2xl bg-white p-5 ring-1 ring-black/5"
            >
              <div className="flex items-start justify-between">
                {server.slug === "pinterest" ? (
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-white ring-1 ring-black/5">
                    <PinterestIcon className="h-6 w-6" />
                  </div>
                ) : (
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-sm font-semibold uppercase text-white">
                    {server.name.charAt(0)}
                  </div>
                )}
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
                {server.slug === "pinterest" && (
                  <Link
                    to="/pinterest"
                    className="text-sm font-medium text-[#E60023] hover:underline"
                  >
                    Configure →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
