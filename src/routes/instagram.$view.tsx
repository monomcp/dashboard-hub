import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  Hash,
  Image as ImageIcon,
  KeyRound,
  ListChecks,
  Lock,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { ActivityLog, type RequestLogSummary } from "@/components/activity-log";
import { AccountMenu } from "@/components/account-menu";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { InstagramIcon } from "@/components/instagram-icon";
import { PermissionsMatrix } from "@/components/permissions-matrix";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";
import type { CatalogServer } from "@/lib/mcp-types";
import { lightPermissionsTheme } from "@/lib/permissions-theme";
import { cn } from "@/lib/utils";

type InstagramView = "settings" | "permissions" | "activity";
const VIEWS: InstagramView[] = ["settings", "permissions", "activity"];
const isView = (v: string): v is InstagramView => (VIEWS as string[]).includes(v);

export const Route = createFileRoute("/instagram/$view")({
  beforeLoad: ({ params }) => {
    if (!isView(params.view)) {
      throw redirect({ to: "/instagram/$view", params: { view: "settings" }, replace: true });
    }
  },
  head: ({ params }) => ({
    meta: [
      { title: "Instagram Toolkit — MCP" },
      {
        name: "description",
        content:
          "Configure the Instagram MCP tools: search posts, scrape hashtags, and choose which fields are exposed by default.",
      },
    ],
    links: [{ rel: "canonical", href: `/instagram/${params.view}` }],
  }),
  component: InstagramPage,
});

const NAV = [
  { id: "settings", label: "Settings", icon: Settings },
  { id: "permissions", label: "Permissions", icon: KeyRound },
  { id: "activity", label: "Activity", icon: Activity },
] satisfies { id: InstagramView; label: string; icon: typeof Settings }[];

const TOOL_OPTIONS = [
  {
    name: "instagram_search",
    icon: Search,
    title: "Search posts",
    description:
      "Search public Instagram posts by keyword. Supports a media-type filter and a paginated result limit.",
    args: ["query (required)", "filter: all | reel | image", "limit: 1–100", "fields[]"],
  },
  {
    name: "instagram_scrape_post",
    icon: ImageIcon,
    title: "Scrape a post",
    description:
      "Fetch a single post (image, reel, or carousel) by shortcode or URL, with captions and engagement stats.",
    args: ["post (required) — shortcode or URL", "fields[]"],
  },
  {
    name: "instagram_profile",
    icon: User,
    title: "Profile lookup",
    description:
      "Fetch a public profile by username: bio, follower/following counts, and recent post refs.",
    args: ["username (required)", "fields[]"],
  },
  {
    name: "instagram_hashtag",
    icon: Hash,
    title: "Hashtag feed",
    description: "List recent public posts under a hashtag, ordered by recency.",
    args: ["tag (required)", "limit: 1–100"],
  },
  {
    name: "instagram_list_fields",
    icon: ListChecks,
    title: "List fields",
    description:
      "Discover every available response field per resource, marking required vs optional.",
    args: [],
  },
] as const;

type Resource = "search" | "post" | "profile" | "hashtag";

const RESOURCE_LABELS: Record<Resource, string> = {
  search: "Search results",
  post: "Post detail",
  profile: "Profile",
  hashtag: "Hashtag feed",
};

const RESOURCE_ICONS: Record<Resource, typeof Search> = {
  search: Search,
  post: ImageIcon,
  profile: User,
  hashtag: Hash,
};

type FieldInfo = { name: string; required: boolean; default: boolean; description: string };

// Local field catalog — mirrors the shape of Pinterest's server-provided fields.
const FIELD_CATALOG: { resource: Resource; fields: FieldInfo[] }[] = [
  {
    resource: "search",
    fields: [
      { name: "id", required: true, default: true, description: "Post identifier." },
      { name: "shortcode", required: true, default: true, description: "Short URL slug." },
      { name: "thumbnail", required: false, default: true, description: "Preview image URL." },
      { name: "caption", required: false, default: false, description: "Post caption text." },
      { name: "like_count", required: false, default: false, description: "Number of likes." },
    ],
  },
  {
    resource: "post",
    fields: [
      { name: "id", required: true, default: true, description: "Post identifier." },
      { name: "media_url", required: true, default: true, description: "Primary media URL." },
      { name: "caption", required: false, default: true, description: "Post caption text." },
      { name: "like_count", required: false, default: true, description: "Number of likes." },
      {
        name: "comment_count",
        required: false,
        default: false,
        description: "Number of comments.",
      },
      { name: "video_url", required: false, default: false, description: "Video URL (reels)." },
    ],
  },
  {
    resource: "profile",
    fields: [
      { name: "username", required: true, default: true, description: "Handle." },
      { name: "full_name", required: false, default: true, description: "Display name." },
      { name: "bio", required: false, default: false, description: "Profile bio text." },
      { name: "follower_count", required: false, default: true, description: "Followers." },
      { name: "following_count", required: false, default: false, description: "Following." },
    ],
  },
  {
    resource: "hashtag",
    fields: [
      { name: "tag", required: true, default: true, description: "Hashtag name." },
      { name: "post_count", required: false, default: true, description: "Total public posts." },
      { name: "top_posts", required: false, default: false, description: "Sample of top posts." },
    ],
  },
];

type InstagramFieldsResponse = {
  resources: { resource: Resource; fields: FieldInfo[] }[];
  allow_agent_field_override: boolean;
};

type InstagramSettingsUpdate = {
  search_default_fields: string[];
  post_default_fields: string[];
  profile_default_fields: string[];
  hashtag_default_fields: string[];
  allow_agent_field_override: boolean;
};

function selectionFromResources(
  resources: { resource: Resource; fields: FieldInfo[] }[],
): Record<Resource, Set<string>> {
  const next: Record<Resource, Set<string>> = {
    search: new Set(),
    post: new Set(),
    profile: new Set(),
    hashtag: new Set(),
  };
  for (const res of resources) {
    for (const field of res.fields) {
      if (!field.required && field.default) next[res.resource].add(field.name);
    }
  }
  return next;
}

function InstagramPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const view = Route.useParams().view as InstagramView;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data: catalog, isLoading: catalogLoading } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 60 * 1000,
  });
  const catalogReady = !catalogLoading;
  const server = catalog?.find((s) => s.slug === "instagram");
  const toolkitIds = server?.toolkit_ids ?? [];

  const {
    data: fieldData,
    isLoading: fieldsLoading,
    isError: fieldsError,
  } = useQuery({
    queryKey: ["instagram-fields"],
    queryFn: () => apiRequest<InstagramFieldsResponse>("/api/v1/instagram/fields"),
    staleTime: 60 * 1000,
  });

  const handleApiError = useCallback(
    (err: unknown, fallback = "Instagram request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      toast.error(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  const instagramLogFilter = useCallback((log: RequestLogSummary) => {
    return Boolean(log.tool_name?.startsWith("instagram_") || log.path?.includes("/instagram"));
  }, []);

  const [selected, setSelected] = useState<Record<Resource, Set<string>>>(() =>
    selectionFromResources(FIELD_CATALOG),
  );
  const [allowOverride, setAllowOverride] = useState(true);
  const resources = fieldData?.resources ?? FIELD_CATALOG;

  useEffect(() => {
    if (!fieldData) return;
    setSelected(selectionFromResources(fieldData.resources));
    setAllowOverride(fieldData.allow_agent_field_override);
  }, [fieldData]);

  const originalSelected = useMemo(() => {
    return selectionFromResources(resources);
  }, [resources]);

  const dirty = useMemo(() => {
    if (!fieldData) return false;
    if (allowOverride !== fieldData.allow_agent_field_override) return true;
    for (const res of resources) {
      const orig = originalSelected[res.resource];
      const cur = selected[res.resource];
      if (orig.size !== cur.size) return true;
      for (const n of cur) if (!orig.has(n)) return true;
    }
    return false;
  }, [selected, allowOverride, originalSelected, fieldData, resources]);

  const saveFields = useMutation({
    mutationFn: (payload: InstagramSettingsUpdate) =>
      apiRequest("/api/v1/instagram/settings", {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["instagram-fields"] });
      toast.success("Instagram fields saved");
    },
    onError: (err) => handleApiError(err, "Couldn't save Instagram fields"),
  });

  function toggle(resource: Resource, name: string) {
    setSelected((prev) => {
      const next = new Set(prev[resource]);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return { ...prev, [resource]: next };
    });
  }

  function onSave() {
    saveFields.mutate({
      search_default_fields: [...selected.search],
      post_default_fields: [...selected.post],
      profile_default_fields: [...selected.profile],
      hashtag_default_fields: [...selected.hashtag],
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
              <InstagramIcon className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <div className="text-xl font-medium tracking-tight">Instagram MCP</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {server && (
            <EnableMcpServerButton
              serverSlug="instagram"
              enabled={server.enabled}
              toolkitIds={server.toolkit_ids}
            />
          )}
          <PlaygroundHeaderButton />
          <AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <nav className="space-y-1">
              {NAV.map((item) => {
                const active = view === item.id;
                return (
                  <Link
                    key={item.id}
                    to="/instagram/$view"
                    params={{ view: item.id }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      active
                        ? "bg-fuchsia-50 text-[#C13584]"
                        : "text-foreground/80 hover:bg-white/60",
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
                  Scrape Instagram public posts, profiles, and hashtag feeds. Each tool returns a
                  required minimum field set; below you choose which optional fields are exposed by
                  default, and whether agents may request more per call.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  Tools available
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {TOOL_OPTIONS.map((tool) => (
                    <div key={tool.name} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#FDF497]/40 via-[#FD5949]/30 to-[#285AEB]/30 text-[#C13584]">
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

              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                    Response fields
                  </h2>
                  <Button
                    size="sm"
                    disabled={!dirty || fieldsLoading || saveFields.isPending}
                    onClick={onSave}
                  >
                    {saveFields.isPending ? "Saving..." : "Save changes"}
                  </Button>
                </div>

                {fieldsError && (
                  <p className="mb-3 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    Couldn't load Instagram field settings. Please try again.
                  </p>
                )}

                <div className="space-y-6">
                  {fieldsLoading &&
                    Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="mt-4 h-12 w-full" />
                        <Skeleton className="mt-2 h-12 w-full" />
                        <Skeleton className="mt-2 h-12 w-full" />
                      </div>
                    ))}

                  {!fieldsLoading &&
                    resources.map((res) => {
                      const Icon = RESOURCE_ICONS[res.resource];
                      return (
                        <div
                          key={res.resource}
                          className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5"
                        >
                          <div className="flex items-center gap-2 border-b border-black/5 px-5 py-3">
                            <Icon className="h-4 w-4 text-[#C13584]" />
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

                  <div className="flex items-start justify-between gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-black/5">
                    <div>
                      <div className="text-sm font-medium">Allow agents to request more fields</div>
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
              </section>
            </>
          )}

          {view === "permissions" && (
            <PermissionsMatrix
              toolkitIds={toolkitIds}
              moduleSlugs={["instagram"]}
              enabled={Boolean(server?.enabled)}
              theme={lightPermissionsTheme}
              toolsNoun="Instagram"
              stripToolPrefix={/^instagram_/}
              disabledHint="Who can use the Instagram tools, and how. Enable the Instagram MCP server first to start granting access."
              connectHint="No Instagram toolkit is connected yet — enable Instagram from the MCP catalog."
              onApiError={handleApiError}
            />
          )}

          {view === "activity" && (
            <ActivityLog
              title="Activity"
              description="Instagram settings changes and MCP tool calls."
              onApiError={handleApiError}
              logFilter={instagramLogFilter}
              nameServerSlugs={["instagram"]}
              moduleSlug="instagram"
              toolkitIds={toolkitIds}
              enabled={catalogReady}
            />
          )}
        </main>
      </div>
    </div>
  );
}
