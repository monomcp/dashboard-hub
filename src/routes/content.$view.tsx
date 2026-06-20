import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  CalendarDays,
  Compass,
  Facebook,
  Gauge,
  Globe,
  Hash,
  HelpCircle,
  Instagram,
  KeyRound,
  LayoutGrid,
  Lightbulb,
  Linkedin,
  List,
  Menu,
  PenLine,
  Search,
  Settings,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppsMenu } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { ContentIdeasBoard } from "@/components/content-ideas-board";
import { ContentCalendarList } from "@/components/content-calendar-list";
import { ContentStrategyPanel } from "@/components/content-strategy-panel";
import { SocialIdeasBoard } from "@/components/social-ideas-board";
import { SocialCalendarList } from "@/components/social-calendar-list";
import { SocialStrategyPanel } from "@/components/social-strategy-panel";
import { SocialTemplateGallery } from "@/components/social-template-gallery";
import { ContentPermissionsView } from "@/components/content-permissions";
import { ContentActivityView } from "@/components/content-activity";
import { TasksUptimeView } from "@/components/tasks-uptime-view";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import type { BrandProfileResponse } from "@/lib/brand-types";
import type { CatalogServer } from "@/lib/mcp-types";
import type { SocialPlatform } from "@/lib/social-types";

type ContentSection = "ideas" | "calendar" | "strategy" | "permissions" | "activity" | "uptime";
type SocialSection = ContentSection | "templates";

const CONTENT_SECTIONS: SocialSection[] = [
  "ideas",
  "calendar",
  "strategy",
  "templates",
  "permissions",
  "activity",
  "uptime",
];

function isContentSection(value: string): value is SocialSection {
  return (CONTENT_SECTIONS as string[]).includes(value);
}

export const Route = createFileRoute("/content/$view")({
  beforeLoad: ({ params }) => {
    if (!isContentSection(params.view)) {
      throw redirect({ to: "/content/$view", params: { view: "ideas" }, replace: true });
    }
  },
  validateSearch: (
    search: Record<string, unknown>,
  ): { mode?: ContentMode; calendarItem?: string } => ({
    mode:
      search.mode === "content" || search.mode === "social"
        ? (search.mode as ContentMode)
        : undefined,
    calendarItem:
      typeof search.calendarItem === "string" && search.calendarItem
        ? search.calendarItem
        : undefined,
  }),
  head: ({ params }) => ({
    meta: [
      { title: "Content — Pipeline" },
      {
        name: "description",
        content: "Manage content strategy, ideas, editorial calendar, briefs and drafts.",
      },
      { property: "og:title", content: "Content — Pipeline" },
      {
        property: "og:description",
        content: "Manage content strategy, ideas, editorial calendar, briefs and drafts.",
      },
    ],
    links: [{ rel: "canonical", href: `/content/${params.view}` }],
  }),
  component: ContentPage,
});

type ContentMode = "content" | "social";
type CalendarView = "list" | "calendar";
type ContentModeTab =
  | { id: ContentMode; label: string; disabled?: false; badge?: never }
  | { id: "email"; label: string; disabled: true; badge: string };

const CONTENT_NAV = [
  { id: "ideas", label: "Ideas", icon: Lightbulb },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "strategy", label: "Strategy", icon: Compass },
  { id: "templates", label: "Templates", icon: LayoutGrid, socialOnly: true },
  { id: "permissions", label: "Permissions", icon: KeyRound },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "uptime", label: "Uptime", icon: Gauge },
] satisfies { id: SocialSection; label: string; icon: typeof Lightbulb; socialOnly?: boolean }[];

const MODE_STORAGE_KEY = "content_mode";

const CONTENT_MODE_TABS: ContentModeTab[] = [
  { id: "content", label: "Content" },
  { id: "social", label: "Social" },
  { id: "email", label: "Email", disabled: true, badge: "soon" },
];

const PLATFORM_ICONS: Record<string, typeof Instagram> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  x: Twitter,
  linkedin: Linkedin,
  website: Globe,
  blog: Globe,
};

function ContentPage() {
  const navigate = useNavigate();
  const section = Route.useParams().view as SocialSection;
  const { mode: searchMode, calendarItem } = Route.useSearch();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [calendarView, setCalendarView] = useState<CalendarView>("list");
  const [mode, setMode] = useState<ContentMode>(
    () =>
      searchMode ?? (localStorage.getItem(MODE_STORAGE_KEY) === "social" ? "social" : "content"),
  );
  const [platformId, setPlatformId] = useState<string>("");
  const [error, setError] = useState("");

  // Content spans two catalog servers — "content" (Content mode) and "smm" (Social
  // mode). The header enable button reflects the server for the active mode.
  const { data: catalog, isLoading: catalogLoading } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 30 * 1000,
  });
  const catalogReady = !catalogLoading;
  const activeServerSlug = mode === "social" ? "smm" : "content";
  const activeServer = catalog?.find((s) => s.slug === activeServerSlug);

  // Permissions and Activity bypass the scoped planner views.
  const isToolkitSection =
    section === "permissions" || section === "activity" || section === "uptime";
  const isTemplatesSection = section === "templates";
  const showModeToggle = true;

  const handleApiError = useCallback(
    (err: unknown, fallback = "Content request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  const needsBrandProfile = !isToolkitSection && !isTemplatesSection;
  const brandQuery = useQuery({
    queryKey: ["brand", "profile"],
    queryFn: () =>
      apiRequest<BrandProfileResponse>("/api/v1/brand/profile").catch((err) => {
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
      }),
    enabled: needsBrandProfile,
    staleTime: 30 * 1000,
  });
  const needsSocialPlatforms =
    mode === "social" &&
    !isToolkitSection &&
    !isTemplatesSection &&
    (section === "ideas" || section === "calendar");
  const platformsQuery = useQuery({
    queryKey: ["social", "platforms"],
    queryFn: () => apiRequest<SocialPlatform[]>("/api/v1/social/platforms"),
    enabled: needsSocialPlatforms,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (brandQuery.error) handleApiError(brandQuery.error);
  }, [brandQuery.error, handleApiError]);
  useEffect(() => {
    if (platformsQuery.error) handleApiError(platformsQuery.error);
  }, [platformsQuery.error, handleApiError]);

  const brandId = brandQuery.data?.id ?? "";
  const platforms = platformsQuery.data ?? [];
  const loadingBusinesses = needsBrandProfile && brandQuery.isLoading;

  useEffect(() => {
    if (!searchMode || searchMode === mode) return;
    setMode(searchMode);
    localStorage.setItem(MODE_STORAGE_KEY, searchMode);
  }, [mode, searchMode]);

  const selectMode = (next: ContentMode) => {
    setMode(next);
    localStorage.setItem(MODE_STORAGE_KEY, next);
    setError("");
    void navigate({
      to: "/content/$view",
      params: { view: section },
      search: (prev) => ({ ...prev, mode: next, calendarItem: undefined }),
      replace: true,
    });
  };

  const setSelectedSocialCalendarItem = useCallback(
    (itemId: string | null) => {
      void navigate({
        to: "/content/$view",
        params: { view: "calendar" },
        search: (prev) => ({
          ...prev,
          mode: "social",
          calendarItem: itemId || undefined,
        }),
      });
    },
    [navigate],
  );

  const activeTitle = useMemo(() => {
    const label = CONTENT_NAV.find((n) => n.id === section)?.label ?? "Content";
    if (section === "activity") return label;
    if (section === "templates") return "Social templates";
    return mode === "social" ? `Social ${label.toLowerCase()}` : label;
  }, [section, mode]);

  const modeToggle = (
    <div
      className="relative grid overflow-hidden rounded-full bg-[hsl(220,33%,95%)] p-1"
      style={{ gridTemplateColumns: `repeat(${CONTENT_MODE_TABS.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 8px) / ${CONTENT_MODE_TABS.length})`,
          transform: `translateX(${
            Math.max(
              0,
              CONTENT_MODE_TABS.findIndex((tab) => tab.id === mode),
            ) * 100
          }%)`,
        }}
      />
      {CONTENT_MODE_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => {
            if (!tab.disabled) selectMode(tab.id);
          }}
          aria-disabled={tab.disabled || undefined}
          disabled={tab.disabled}
          className={cn(
            "relative z-10 flex items-center justify-center gap-1.5 rounded-full px-5 py-1.5 text-sm transition-colors duration-200",
            mode === tab.id ? "text-foreground" : "text-foreground/60 hover:text-foreground",
            tab.disabled && "cursor-not-allowed hover:text-foreground/60",
          )}
        >
          <span>{tab.label}</span>
          {tab.badge && (
            <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[10px] font-medium leading-none text-foreground/50 shadow-sm">
              {tab.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  const viewToggle = (
    <div className="flex items-center rounded-full bg-[hsl(220,33%,95%)] p-1">
      {(
        [
          { id: "list", label: "List", icon: List },
          { id: "calendar", label: "Calendar", icon: LayoutGrid },
        ] as const
      ).map((v) => (
        <button
          key={v.id}
          onClick={() => setCalendarView(v.id)}
          aria-label={v.label}
          title={v.label}
          className={cn(
            "grid h-7 w-9 place-items-center rounded-full transition",
            calendarView === v.id
              ? "bg-white text-foreground shadow-sm"
              : "text-foreground/60 hover:text-foreground",
          )}
        >
          <v.icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );

  const searchField = (
    <div className="relative flex h-9 w-full items-center">
      <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
      <Input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search ideas"
        className="h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200"
      />
    </div>
  );

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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-sm">
              <PenLine className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Content</span>
          </Link>
        </div>
        <div className="hidden flex-1 items-center gap-3 md:flex">
          {showModeToggle && modeToggle}
          {section === "calendar" && viewToggle}
          {!isToolkitSection && searchOpen && (
            <div className="min-w-0 max-w-2xl flex-1">{searchField}</div>
          )}
        </div>
        <div className="flex items-center gap-1">
          {activeServer && (
            <div className="mr-1">
              <EnableMcpServerButton
                serverSlug={activeServer.slug}
                enabled={activeServer.enabled}
                toolkitIds={activeServer.toolkit_ids}
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
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

      {searchOpen && <div className="px-4 pb-3 md:hidden">{searchField}</div>}

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <nav className="space-y-1">
              {CONTENT_NAV.filter((n) => mode === "social" || !n.socialOnly).map((n) => {
                const active = section === n.id;
                return (
                  <Link
                    key={n.id}
                    to="/content/$view"
                    params={{ view: n.id }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <n.icon className="h-5 w-5 text-foreground/70" />
                    <span className="flex-1 truncate text-left">{n.label}</span>
                  </Link>
                );
              })}
            </nav>

            {mode === "social" && (
              <div className="mt-6">
                <div className="mb-1 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Platforms
                </div>
                <nav className="space-y-1">
                  <button
                    onClick={() => setPlatformId("")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      platformId === ""
                        ? "bg-fuchsia-100 text-fuchsia-900"
                        : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <Hash className="h-5 w-5 text-foreground/70" />
                    <span className="flex-1 truncate text-left">All platforms</span>
                  </button>
                  {platforms.map((platform) => {
                    const Icon = PLATFORM_ICONS[platform.slug] ?? Hash;
                    const active = platformId === platform.id;
                    return (
                      <button
                        key={platform.id}
                        onClick={() => setPlatformId(platform.id)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                          active
                            ? "bg-fuchsia-100 text-fuchsia-900"
                            : "text-foreground/80 hover:bg-white/60",
                        )}
                      >
                        <Icon className="h-5 w-5 text-foreground/70" />
                        <span className="flex-1 truncate text-left">{platform.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            )}
          </aside>
        )}

        <main
          className={cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6")}
        >
          {error && (
            <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-destructive/20 bg-white px-4 py-3 text-sm text-destructive shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <span>{error}</span>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => setError("")}
              >
                Dismiss
              </Button>
            </div>
          )}

          {section === "permissions" && (
            <ContentPermissionsView mode={mode} server={activeServer} onApiError={handleApiError} />
          )}
          {section === "activity" && (
            <ContentActivityView
              mode={mode}
              server={activeServer}
              catalogReady={catalogReady}
              onApiError={handleApiError}
            />
          )}
          {section === "uptime" && (
            <TasksUptimeView
              moduleSlug={activeServerSlug}
              onApiError={handleApiError}
              onViewHistory={() =>
                void navigate({
                  to: "/content/$view",
                  params: { view: "activity" },
                  search: (prev) => ({ ...prev, mode }),
                })
              }
            />
          )}

          {!isToolkitSection && (
            <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h1 className="text-2xl font-normal capitalize tracking-tight">{activeTitle}</h1>
              </div>

              {needsBrandProfile && !loadingBusinesses && mode === "content" && !brandId && (
                <div className="grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center">
                  <p className="text-sm font-medium">No brand profile yet</p>
                  <p className="text-xs text-muted-foreground">
                    Create a brand profile first, then plan its content here.
                  </p>
                  <Button asChild size="sm" className="mt-3 rounded-lg">
                    <Link to="/brand">Go to Brand</Link>
                  </Button>
                </div>
              )}

              {needsBrandProfile && !loadingBusinesses && mode === "social" && !brandId && (
                <div className="grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center">
                  <p className="text-sm font-medium">No brand profile yet</p>
                  <p className="text-xs text-muted-foreground">
                    Create a brand profile first, then plan its social content here.
                  </p>
                  <Button asChild size="sm" className="mt-3 rounded-lg">
                    <Link to="/brand">Go to Brand</Link>
                  </Button>
                </div>
              )}

              {isTemplatesSection && <SocialTemplateGallery />}

              {!loadingBusinesses && brandId && mode === "content" && section === "ideas" && (
                <ContentIdeasBoard
                  key={brandId}
                  brandId={brandId}
                  query={query}
                  onError={handleApiError}
                />
              )}
              {!loadingBusinesses && brandId && mode === "content" && section === "calendar" && (
                <ContentCalendarList
                  key={brandId}
                  brandId={brandId}
                  view={calendarView}
                  onError={handleApiError}
                />
              )}
              {!loadingBusinesses && brandId && mode === "content" && section === "strategy" && (
                <ContentStrategyPanel key={brandId} brandId={brandId} onError={handleApiError} />
              )}

              {!loadingBusinesses &&
                brandId &&
                mode === "social" &&
                !isTemplatesSection &&
                section === "ideas" && (
                  <SocialIdeasBoard
                    key={`${brandId}:${platformId}`}
                    brandId={brandId}
                    platformId={platformId}
                    platforms={platforms}
                    query={query}
                    onError={handleApiError}
                  />
                )}
              {!loadingBusinesses &&
                brandId &&
                mode === "social" &&
                !isTemplatesSection &&
                section === "calendar" && (
                  <SocialCalendarList
                    key={`${brandId}:${platformId}`}
                    brandId={brandId}
                    platformId={platformId}
                    platforms={platforms}
                    view={calendarView}
                    selectedItemId={calendarItem}
                    onSelectedItemChange={setSelectedSocialCalendarItem}
                    onError={handleApiError}
                  />
                )}
              {!loadingBusinesses &&
                brandId &&
                mode === "social" &&
                !isTemplatesSection &&
                section === "strategy" && (
                  <SocialStrategyPanel key={brandId} brandId={brandId} onError={handleApiError} />
                )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
