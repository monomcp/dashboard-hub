import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  Image as ImageIcon,
  KeyRound,
  ListChecks,
  Lock,
  Menu,
  Search,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { ActivityLog, type RequestLogSummary } from "@/components/activity-log";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu } from "@/components/apps-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { PermissionsMatrix } from "@/components/permissions-matrix";
import { PinterestIcon } from "@/components/pinterest-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";
import type { CatalogServer } from "@/lib/mcp-types";
import { lightPermissionsTheme } from "@/lib/permissions-theme";
import {
  RESOURCE_LABELS,
  type PinterestFieldsResponse,
  type PinterestResource,
  type PinterestSettingsUpdate,
} from "@/lib/pinterest-types";
import { cn } from "@/lib/utils";

type PinterestView = "settings" | "permissions" | "activity";

const PINTEREST_VIEWS: PinterestView[] = ["settings", "permissions", "activity"];

function isPinterestView(value: string): value is PinterestView {
  return (PINTEREST_VIEWS as string[]).includes(value);
}

export const Route = createFileRoute("/pinterest/$view")({
  beforeLoad: ({ params }) => {
    if (!isPinterestView(params.view)) {
      throw redirect({ to: "/pinterest/$view", params: { view: "settings" }, replace: true });
    }
  },
  head: ({ params }) => ({
    meta: [
      { title: "Pinterest Toolkit — MCP" },
      {
        name: "description",
        content:
          "Configure the Pinterest MCP tools: search and scrape pins, and choose which fields are exposed in responses.",
      },
    ],
    links: [{ rel: "canonical", href: `/pinterest/${params.view}` }],
  }),
  component: PinterestPage,
});

const PINTEREST_NAV = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "permissions", label: "Permissions", icon: KeyRound },
  { id: "activity", label: "Activity", icon: Activity },
] satisfies { id: PinterestView; label: string; icon: typeof Settings }[];

const RESOURCE_ICONS: Record<PinterestResource, typeof Search> = {
  search: Search,
  pin: ImageIcon,
};

// The toolkit's tools (options). Mirrors the `pinterest` catalog server so the
// page documents every option even before the server is enabled.
const TOOL_OPTIONS = [
  {
    name: "pinterest_search",
    icon: Search,
    title: "Search pins",
    description:
      "Search Pinterest by query. Supports an 'all' or 'video' filter and a result limit (paginated).",
    args: ["query (required)", "filter: all | video", "limit: 1–100", "fields[]"],
  },
  {
    name: "pinterest_scrape_pin",
    icon: ImageIcon,
    title: "Scrape a pin",
    description:
      "Fetch a single pin (image or video) by numeric id or pin URL, with engagement stats and video URL available as optional fields.",
    args: ["pin (required) — id or URL", "fields[]"],
  },
  {
    name: "pinterest_list_fields",
    icon: ListChecks,
    title: "List fields",
    description:
      "Discover every available response field per resource, marking which are required and which are optional.",
    args: [],
  },
] as const;

function PinterestPage() {
  const navigate = useNavigate();
  const view = Route.useParams().view as PinterestView;
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data: fields, isLoading: fieldsLoading } = useQuery({
    queryKey: ["pinterest-fields"],
    queryFn: () => apiRequest<PinterestFieldsResponse>("/api/v1/pinterest/fields"),
    staleTime: 30 * 1000,
  });

  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 60 * 1000,
  });
  const server = catalog?.find((s) => s.slug === "pinterest");
  const toolkitIds = server?.toolkit_ids ?? [];

  const handleApiError = useCallback(
    (err: unknown, fallback = "Pinterest request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      toast.error(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  const pinterestLogFilter = useCallback((log: RequestLogSummary) => {
    return Boolean(log.tool_name?.startsWith("pinterest_") || log.path?.includes("/pinterest"));
  }, []);

  // Local draft of which optional fields are on, plus the agent-override toggle.
  const [selected, setSelected] = useState<Record<PinterestResource, Set<string>>>({
    search: new Set(),
    pin: new Set(),
  });
  const [allowOverride, setAllowOverride] = useState(true);

  // Seed the draft from the server once loaded.
  useEffect(() => {
    if (!fields) return;
    const next: Record<PinterestResource, Set<string>> = {
      search: new Set(),
      pin: new Set(),
    };
    for (const res of fields.resources) {
      for (const f of res.fields) {
        if (!f.required && f.default) next[res.resource].add(f.name);
      }
    }
    setSelected(next);
    setAllowOverride(fields.allow_agent_field_override);
  }, [fields]);

  const save = useMutation({
    mutationFn: (body: PinterestSettingsUpdate) =>
      apiRequest("/api/v1/pinterest/settings", {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      toast.success("Pinterest fields saved");
      queryClient.invalidateQueries({ queryKey: ["pinterest-fields"] });
    },
    onError: () => toast.error("Couldn't save Pinterest fields"),
  });

  const dirty = useMemo(() => {
    if (!fields) return false;
    if (allowOverride !== fields.allow_agent_field_override) return true;
    for (const res of fields.resources) {
      const original = new Set(
        res.fields.filter((f) => !f.required && f.default).map((f) => f.name),
      );
      const current = selected[res.resource];
      if (original.size !== current.size) return true;
      for (const name of current) if (!original.has(name)) return true;
    }
    return false;
  }, [fields, selected, allowOverride]);

  function toggle(resource: PinterestResource, name: string) {
    setSelected((prev) => {
      const next = new Set(prev[resource]);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return { ...prev, [resource]: next };
    });
  }

  function onSave() {
    save.mutate({
      search_default_fields: [...selected.search],
      pin_default_fields: [...selected.pin],
      allow_agent_field_override: allowOverride,
    });
  }

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
          <Link to="/mcp" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
              <PinterestIcon className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-medium tracking-tight">Pinterest MCP</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {server && (
            <EnableMcpServerButton
              serverSlug="pinterest"
              enabled={server.enabled}
              toolkitIds={server.toolkit_ids}
            />
          )}
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <nav className="space-y-1">
              {PINTEREST_NAV.map((item) => {
                const active = view === item.id;
                return (
                  <Link
                    key={item.id}
                    to="/pinterest/$view"
                    params={{ view: item.id }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      active ? "bg-red-50 text-[#B6001C]" : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <item.icon className="h-5 w-5 text-current/75" />
                    <span className="flex-1 truncate text-left">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:pr-6">
          {view === "settings" && (
            <>
              <div className="mb-6 mt-2">
                <p className="max-w-2xl text-sm text-muted-foreground">
                  Scrape Pinterest public search results and individual pins. Each tool returns a
                  required minimum field set; below you choose which optional fields are also
                  exposed by default, and whether agents may request more per call.
                </p>
              </div>

              {/* Tools / options available */}
              <section className="mb-8">
                <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Tools available
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {TOOL_OPTIONS.map((tool) => (
                    <div key={tool.name} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#E60023]/10 text-[#E60023]">
                        <tool.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 text-base font-medium">{tool.title}</h3>
                      <code className="text-xs text-muted-foreground">{tool.name}</code>
                      <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
                      {tool.args.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {tool.args.map((arg) => (
                            <li key={arg} className="text-xs text-muted-foreground">
                              <code className="rounded bg-muted px-1 py-0.5">{arg}</code>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Response fields */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Response fields
                  </h2>
                  <Button size="sm" disabled={!dirty || save.isPending} onClick={onSave}>
                    {save.isPending ? "Saving…" : "Save changes"}
                  </Button>
                </div>

                {fieldsLoading && <FieldsSkeleton />}

                {fields && (
                  <div className="space-y-6">
                    {fields.resources.map((res) => {
                      const Icon = RESOURCE_ICONS[res.resource];
                      return (
                        <div
                          key={res.resource}
                          className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5"
                        >
                          <div className="flex items-center gap-2 border-b border-black/5 px-5 py-3">
                            <Icon className="h-4 w-4 text-[#E60023]" />
                            <span className="text-sm font-medium">
                              {RESOURCE_LABELS[res.resource]}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {res.fields.filter((f) => f.required).length} required ·{" "}
                              {res.fields.filter((f) => !f.required).length} optional
                            </span>
                          </div>
                          <ul className="divide-y divide-black/5">
                            {res.fields.map((f) => (
                              <li
                                key={f.name}
                                className="flex items-center justify-between gap-4 px-5 py-3"
                              >
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <code className="text-sm font-medium">{f.name}</code>
                                    {f.required ? (
                                      <Badge
                                        variant="secondary"
                                        className="gap-1 text-[10px] uppercase"
                                      >
                                        <Lock className="h-3 w-3" /> Required
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-[10px] uppercase">
                                        Optional
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                                    {f.description}
                                  </p>
                                </div>
                                {f.required ? (
                                  <span className="text-xs text-muted-foreground">Always</span>
                                ) : (
                                  <Switch
                                    checked={selected[res.resource].has(f.name)}
                                    onCheckedChange={() => toggle(res.resource, f.name)}
                                    aria-label={`Include ${f.name} by default`}
                                  />
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}

                    {/* Agent override toggle */}
                    <div className="flex items-start justify-between gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-black/5">
                      <div>
                        <div className="text-sm font-medium">
                          Allow agents to request more fields
                        </div>
                        <p className="mt-0.5 max-w-2xl text-xs text-muted-foreground">
                          When on, an agent's per-call <code>fields</code> request can add optional
                          fields beyond the defaults above. When off, responses are limited to the
                          required minimum plus your defaults.
                        </p>
                      </div>
                      <Switch
                        checked={allowOverride}
                        onCheckedChange={setAllowOverride}
                        aria-label="Allow agents to request more fields"
                      />
                    </div>
                  </div>
                )}
              </section>
            </>
          )}

          {view === "permissions" && (
            <PermissionsMatrix
              toolkitIds={toolkitIds}
              moduleSlugs={["pinterest"]}
              enabled={Boolean(server?.enabled)}
              theme={lightPermissionsTheme}
              toolsNoun="Pinterest"
              stripToolPrefix={/^pinterest_/}
              disabledHint="Who can use the Pinterest tools, and how. Enable the Pinterest MCP server first to start granting access."
              connectHint="No Pinterest toolkit is connected yet — enable Pinterest from the MCP catalog."
              onApiError={handleApiError}
            />
          )}

          {view === "activity" && (
            <ActivityLog
              title="Activity"
              description="Pinterest settings changes and MCP tool calls."
              onApiError={handleApiError}
              logFilter={pinterestLogFilter}
              nameServerSlugs={["pinterest"]}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function FieldsSkeleton() {
  return (
    <div className="space-y-6">
      {[0, 1].map((i) => (
        <div key={i} className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
          <div className="flex items-center gap-2 border-b border-black/5 px-5 py-3">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="divide-y divide-black/5">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="flex items-center justify-between px-5 py-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-56" />
                </div>
                <Skeleton className="h-5 w-9 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
