import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Plus,
  Settings,
  Database,
  ChevronDown,
  Edit3,
  Trash2,
  Check,
  ArrowLeft,
  Filter,
  MoreHorizontal,
  MoreVertical,
  Type,
  Hash,
  Image as ImageIcon,
  Link2,
  GitBranch,
  Loader2,
  Layers,
  FileText,
  Map as MapIcon,
  Bot,
  Sparkles,
  FileStack,
  KeyRound,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AppsMenu } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import type { CatalogServer } from "@/lib/mcp-types";
import { SitemapView } from "@/components/cms-sitemap-view";
import { LlmsFullView, LlmsView, RobotsView } from "@/components/cms-discovery-views";
import { PermissionsMatrix } from "@/components/permissions-matrix";
import { lightPermissionsTheme } from "@/lib/permissions-theme";
import { ActivityLog } from "@/components/activity-log";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cms")({
  head: () => ({
    meta: [
      { title: "Content Manager — CMS" },
      {
        name: "description",
        content: "Manage collections, single types and components for your content.",
      },
      { property: "og:title", content: "Content Manager — CMS" },
      { property: "og:description", content: "Manage collections, single types and components." },
    ],
    links: [{ rel: "canonical", href: "/cms" }],
  }),
  component: CmsPage,
});

type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

type ContentTypeKind = "collection" | "single";
type EntryStatus = "draft" | "review" | "published" | "archived";
type VersionType = "draft" | "published" | "snapshot" | "rollback";
type FieldType =
  | "short_text"
  | "long_text"
  | "rich_text"
  | "markdown"
  | "number"
  | "boolean"
  | "date"
  | "datetime"
  | "json"
  | "slug"
  | "enum"
  | "email"
  | "url"
  | "media"
  | "relation"
  | "component"
  | "dynamic_zone"
  | "seo"
  | "location"
  | "color"
  | "ai_prompt";

type ContentTypeResponse = {
  id: string;
  organization_id: string;
  uid: string;
  display_name: string;
  plural_name: string | null;
  description: string | null;
  kind: ContentTypeKind;
  draft_publish_enabled: boolean;
  localization_enabled: boolean;
  versioning_enabled: boolean;
  api_enabled: boolean;
  mcp_enabled: boolean;
  settings: Record<string, unknown>;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

type FieldResponse = {
  id: string;
  content_type_id: string;
  key: string;
  label: string;
  field_type: FieldType;
  is_required: boolean;
  is_unique: boolean;
  is_localized: boolean;
  is_private: boolean;
  order_index: number;
  validation: Record<string, unknown>;
  default_value: unknown;
  options: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

type ComponentResponse = {
  id: string;
  organization_id: string;
  uid: string;
  category: string;
  display_name: string;
  description: string | null;
  icon: string | null;
  schema: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

type ComponentFieldResponse = {
  id: string;
  component_id: string;
  key: string;
  label: string;
  field_type: FieldType;
  is_required: boolean;
  is_localized: boolean;
  order_index: number;
  validation: Record<string, unknown>;
  options: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

type EntryResponse = {
  id: string;
  organization_id: string;
  content_type_id: string;
  document_key: string;
  status: EntryStatus;
  first_published_at: string | null;
  last_published_at: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
};

type EntryLocaleResponse = {
  id: string;
  entry_id: string;
  locale: string;
  slug: string | null;
  title: string | null;
  status: EntryStatus;
  current_draft_version_id: string | null;
  current_published_version_id: string | null;
  created_at: string;
  updated_at: string;
};

type EntryVersionResponse = {
  id: string;
  entry_locale_id: string;
  version_number: number;
  version_type: VersionType;
  data: Record<string, unknown>;
  seo: Record<string, unknown>;
  meta: Record<string, unknown>;
  created_by: string | null;
  published_by: string | null;
  created_at: string;
  published_at: string | null;
};

type EntryDetailResponse = {
  entry: EntryResponse;
  locales: EntryLocaleResponse[];
};

type EntryLocaleDetailResponse = {
  locale: EntryLocaleResponse;
  draft_version: EntryVersionResponse | null;
  published_version: EntryVersionResponse | null;
};

type SidebarTarget =
  | { kind: "content-type"; id: string; group: "Collection Types" | "Single Types" }
  | { kind: "component"; id: string; group: "Components" };

type View =
  | { kind: "collection-list" }
  | { kind: "schema"; target: SidebarTarget }
  | { kind: "entries"; contentTypeId: string }
  | { kind: "entry"; contentTypeId: string; entryId: string }
  | { kind: "sitemap" }
  | { kind: "robots" }
  | { kind: "llms" }
  | { kind: "llms-full" }
  | { kind: "permissions" }
  | { kind: "activity" };

type EntryRow = EntryResponse & {
  primaryLocale: EntryLocaleResponse | null;
};

type FieldLike = FieldResponse | ComponentFieldResponse;

const GROUP_LABELS = ["Collection Types", "Single Types", "Components"] as const;
const FIELD_TYPES: FieldType[] = [
  "short_text",
  "long_text",
  "rich_text",
  "markdown",
  "number",
  "boolean",
  "date",
  "datetime",
  "json",
  "slug",
  "enum",
  "email",
  "url",
  "media",
  "relation",
  "component",
  "dynamic_zone",
  "seo",
  "location",
  "color",
  "ai_prompt",
];

function formatFieldType(type: FieldType) {
  const labels: Record<FieldType, string> = {
    short_text: "Short text",
    long_text: "Long text",
    rich_text: "Rich text",
    markdown: "Markdown",
    number: "Number",
    boolean: "Boolean",
    date: "Date",
    datetime: "Date and time",
    json: "JSON",
    slug: "Slug",
    enum: "Enumeration",
    email: "Email",
    url: "URL",
    media: "Media",
    relation: "Relation",
    component: "Component",
    dynamic_zone: "Dynamic zone",
    seo: "SEO",
    location: "Location",
    color: "Color",
    ai_prompt: "AI prompt",
  };
  return labels[type];
}

function fieldIcon(type: FieldType) {
  if (type === "number") return Hash;
  if (type === "media") return ImageIcon;
  if (type === "relation") return Link2;
  if (type === "dynamic_zone" || type === "component") return GitBranch;
  return Type;
}

function formatStatus(status: EntryStatus) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusClass(status: EntryStatus) {
  if (status === "published") return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  if (status === "archived") return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  if (status === "review") return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  return "bg-sky-50 text-sky-700 ring-1 ring-sky-200";
}

function formatDate(value: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

function asString(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value, null, 2);
}

function getEnumValues(options: Record<string, unknown>) {
  const values = options.values;
  return Array.isArray(values) ? values.map(String) : [];
}

function slugify(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled"
  );
}

function keyify(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .replace(/^([0-9])/, "field_$1") || "field"
  );
}

function CmsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "Collection Types": true,
    "Single Types": true,
    Components: true,
  });
  const [collections, setCollections] = useState<ContentTypeResponse[]>([]);
  const [singleTypes, setSingleTypes] = useState<ContentTypeResponse[]>([]);
  const [components, setComponents] = useState<ComponentResponse[]>([]);
  const [view, setView] = useState<View>({ kind: "collection-list" });
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createKind, setCreateKind] = useState<ContentTypeKind | null>(null);
  const [createName, setCreateName] = useState("");
  const [createUid, setCreateUid] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createPlural, setCreatePlural] = useState("");
  const [creatingType, setCreatingType] = useState(false);
  const [componentDialogOpen, setComponentDialogOpen] = useState(false);
  const [componentName, setComponentName] = useState("");
  const [componentUid, setComponentUid] = useState("");
  const [componentCategory, setComponentCategory] = useState("blocks");
  const [componentDescription, setComponentDescription] = useState("");
  const [creatingComponent, setCreatingComponent] = useState(false);

  // CMS tools live under the "cms" catalog server — the header enable button
  // mirrors the one shown on Content/Brand.
  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 30 * 1000,
  });
  const cmsServer = catalog?.find((s) => s.slug === "cms");

  const handleApiError = useCallback(
    (err: unknown, fallback = "CMS request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  const loadCmsRoot = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [collectionPage, singlePage, componentPage] = await Promise.all([
        apiRequest<Page<ContentTypeResponse>>(
          "/api/v1/cms/content-types?kind=collection&limit=200",
        ),
        apiRequest<Page<ContentTypeResponse>>("/api/v1/cms/content-types?kind=single&limit=200"),
        apiRequest<Page<ComponentResponse>>("/api/v1/cms/components?limit=200"),
      ]);
      setCollections(collectionPage.items);
      setSingleTypes(singlePage.items);
      setComponents(componentPage.items);
      setView((current) => {
        if (current.kind !== "collection-list") return current;
        const firstCollection = collectionPage.items[0];
        if (!firstCollection) return current;
        return {
          kind: "schema",
          target: { kind: "content-type", id: firstCollection.id, group: "Collection Types" },
        };
      });
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  const updateContentType = useCallback((next: ContentTypeResponse) => {
    const applyUpdate = (item: ContentTypeResponse) => (item.id === next.id ? next : item);
    setCollections((current) => current.map(applyUpdate));
    setSingleTypes((current) => current.map(applyUpdate));
  }, []);

  const deleteContentType = useCallback(
    async (contentType: ContentTypeResponse) => {
      try {
        await apiRequest<void>(`/api/v1/cms/content-types/${contentType.id}`, {
          method: "DELETE",
        });
        let nextCollections: ContentTypeResponse[] = [];
        setCollections((current) => {
          nextCollections = current.filter((item) => item.id !== contentType.id);
          return nextCollections;
        });
        let nextSingles: ContentTypeResponse[] = [];
        setSingleTypes((current) => {
          nextSingles = current.filter((item) => item.id !== contentType.id);
          return nextSingles;
        });
        setSelected([]);
        const fallback = nextCollections[0] ?? nextSingles[0];
        if (fallback) {
          const group = fallback.kind === "single" ? "Single Types" : "Collection Types";
          setView({
            kind: "schema",
            target: { kind: "content-type", id: fallback.id, group },
          });
        } else {
          setView({ kind: "collection-list" });
        }
      } catch (err) {
        handleApiError(err, "Unable to delete content type");
      }
    },
    [handleApiError],
  );

  const openTypeCreator = (kind: ContentTypeKind) => {
    setCreateKind(kind);
    setCreateName("");
    setCreateUid("");
    setCreateDescription("");
    setCreatePlural("");
  };

  const updateCreateName = (value: string) => {
    setCreateName(value);
    setCreateUid((current) => (current ? current : keyify(value)));
  };

  const createContentType = async () => {
    if (!createKind) return;
    const name = createName.trim();
    const uid = keyify(createUid || name);
    if (!name || !uid) return;
    setCreatingType(true);
    try {
      const next = await apiRequest<ContentTypeResponse>("/api/v1/cms/content-types", {
        method: "POST",
        body: JSON.stringify({
          uid,
          display_name: name,
          plural_name: createPlural.trim() || null,
          description: createDescription.trim() || null,
          kind: createKind,
        }),
      });
      const group = next.kind === "single" ? "Single Types" : "Collection Types";
      if (next.kind === "single") {
        setSingleTypes((current) => [...current, next]);
      } else {
        setCollections((current) => [...current, next]);
      }
      setCreateKind(null);
      setSelected([]);
      setView({
        kind: "schema",
        target: { kind: "content-type", id: next.id, group },
      });
    } catch (err) {
      handleApiError(err, "Unable to create content type");
    } finally {
      setCreatingType(false);
    }
  };

  const openComponentCreator = () => {
    setComponentName("");
    setComponentUid("");
    setComponentCategory("blocks");
    setComponentDescription("");
    setComponentDialogOpen(true);
  };

  const updateComponentName = (value: string) => {
    setComponentName(value);
    setComponentUid((current) => (current ? current : keyify(value)));
  };

  const createComponent = async () => {
    const name = componentName.trim();
    const uid = keyify(componentUid || name);
    const category = keyify(componentCategory) || "blocks";
    if (!name || !uid) return;
    setCreatingComponent(true);
    try {
      const next = await apiRequest<ComponentResponse>("/api/v1/cms/components", {
        method: "POST",
        body: JSON.stringify({
          uid,
          category,
          display_name: name,
          description: componentDescription.trim() || null,
        }),
      });
      setComponents((current) => [...current, next]);
      setComponentDialogOpen(false);
      setSelected([]);
      setView({
        kind: "schema",
        target: { kind: "component", id: next.id, group: "Components" },
      });
    } catch (err) {
      handleApiError(err, "Unable to create component");
    } finally {
      setCreatingComponent(false);
    }
  };

  useEffect(() => {
    void loadCmsRoot();
  }, [loadCmsRoot]);

  const activeId =
    view.kind === "schema"
      ? view.target.id
      : view.kind === "entries" || view.kind === "entry"
        ? view.contentTypeId
        : "";

  const contentTypeById = useMemo(() => {
    return new Map([...collections, ...singleTypes].map((type) => [type.id, type]));
  }, [collections, singleTypes]);

  const componentById = useMemo(() => {
    return new Map(components.map((component) => [component.id, component]));
  }, [components]);

  const currentContentType =
    view.kind === "entries" || view.kind === "entry"
      ? contentTypeById.get(view.contentTypeId)
      : view.kind === "schema" && view.target.kind === "content-type"
        ? contentTypeById.get(view.target.id)
        : undefined;

  const currentComponent =
    view.kind === "schema" && view.target.kind === "component"
      ? componentById.get(view.target.id)
      : undefined;

  const groups = [
    {
      label: "Collection Types",
      items: collections,
      createLabel: "Create new Collection type",
      onCreate: () => openTypeCreator("collection"),
      targetFor: (item: ContentTypeResponse): SidebarTarget => ({
        kind: "content-type",
        id: item.id,
        group: "Collection Types",
      }),
    },
    {
      label: "Single Types",
      items: singleTypes,
      createLabel: "Create new Single type",
      onCreate: () => openTypeCreator("single"),
      targetFor: (item: ContentTypeResponse): SidebarTarget => ({
        kind: "content-type",
        id: item.id,
        group: "Single Types",
      }),
    },
    {
      label: "Components",
      items: components,
      createLabel: "Create new Component",
      onCreate: openComponentCreator,
      targetFor: (item: ComponentResponse): SidebarTarget => ({
        kind: "component",
        id: item.id,
        group: "Components",
      }),
    },
  ] satisfies {
    label: (typeof GROUP_LABELS)[number];
    items: (ContentTypeResponse | ComponentResponse)[];
    createLabel: string;
    onCreate: (() => void) | undefined;
    targetFor: (item: ContentTypeResponse & ComponentResponse) => SidebarTarget;
  }[];

  const selectItem = (target: SidebarTarget) => {
    setView({ kind: "schema", target });
    setSelected([]);
  };

  const searchField = (
    <div className="relative flex h-9 w-full items-center">
      <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
      <Input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search content types"
        className="h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-indigo-200"
      />
    </div>
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
            onClick={() => setSidebarOpen((s) => !s)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm">
              <Database className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Content Manager</span>
          </Link>
        </div>
        {searchOpen && (
          <div className="hidden min-w-0 max-w-2xl flex-1 md:block">{searchField}</div>
        )}
        <div className="flex items-center gap-1">
          {cmsServer && (
            <div className="mr-1">
              <EnableMcpServerButton
                serverSlug={cmsServer.slug}
                enabled={cmsServer.enabled}
                toolkitIds={cmsServer.toolkit_ids}
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
          <aside className="hidden w-[280px] shrink-0 px-3 md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mb-4 h-14 w-[180px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg">
                  <Plus className="mr-1 h-5 w-5" /> Create
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-2xl p-1.5">
                <DropdownMenuItem
                  className="gap-3 rounded-lg py-2.5"
                  onSelect={() => openTypeCreator("collection")}
                >
                  <Layers className="h-4 w-4" /> Collection type
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-3 rounded-lg py-2.5"
                  onSelect={() => openTypeCreator("single")}
                >
                  <FileText className="h-4 w-4" /> Single type
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="gap-3 rounded-lg py-2.5"
                  onSelect={openComponentCreator}
                >
                  <GitBranch className="h-4 w-4" /> Component
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <nav className="space-y-5">
              {loading && (
                <>
                  {[4, 2, 4].map((count, groupIndex) => (
                    <div key={groupIndex}>
                      <div className="flex items-center justify-between px-3 pb-2">
                        <Skeleton className="h-3.5 w-28" />
                        <Skeleton className="h-4 w-6 rounded-md" />
                      </div>
                      <ul className="space-y-1">
                        {Array.from({ length: count }).map((_, itemIndex) => (
                          <li key={itemIndex} className="flex items-center gap-2 px-3 py-1.5">
                            <Skeleton className="h-1.5 w-1.5 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div>
                    <Skeleton className="mx-3 mb-2 h-3.5 w-24" />
                    <ul className="space-y-1">
                      {Array.from({ length: 4 }).map((_, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 px-3 py-1.5">
                          <Skeleton className="h-4 w-4 rounded" />
                          <Skeleton className="h-4 w-24" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              {!loading &&
                groups.map((g) => {
                  const open = openGroups[g.label];
                  const items = g.items.filter((item) =>
                    item.display_name.toLowerCase().includes(query.toLowerCase()),
                  );
                  return (
                    <div key={g.label}>
                      <button
                        onClick={() =>
                          setOpenGroups((prev) => ({ ...prev, [g.label]: !prev[g.label] }))
                        }
                        className="flex w-full items-center justify-between px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                      >
                        <span className="flex items-center gap-1">
                          {g.label}
                          <ChevronDown
                            className={cn("h-3.5 w-3.5 transition", !open && "-rotate-90")}
                          />
                        </span>
                        <span className="rounded-md bg-[hsl(220,20%,92%)] px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {g.items.length}
                        </span>
                      </button>
                      {open && (
                        <ul className="space-y-0.5">
                          {items.map((item) => {
                            const isActive = activeId === item.id;
                            return (
                              <li key={item.id}>
                                <button
                                  onClick={() =>
                                    selectItem(
                                      g.targetFor(item as ContentTypeResponse & ComponentResponse),
                                    )
                                  }
                                  className={cn(
                                    "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition",
                                    isActive
                                      ? "bg-indigo-50 font-semibold text-indigo-700"
                                      : "text-foreground/80 hover:bg-white/60",
                                  )}
                                >
                                  <span
                                    className={cn(
                                      "h-1.5 w-1.5 rounded-full",
                                      isActive ? "bg-indigo-600" : "bg-muted-foreground/50",
                                    )}
                                  />
                                  <span className="truncate text-left">{item.display_name}</span>
                                </button>
                              </li>
                            );
                          })}
                          {items.length === 0 && (
                            <li className="px-3 py-1.5 text-sm text-muted-foreground">No items</li>
                          )}
                          <li>
                            <button
                              disabled={!g.onCreate}
                              onClick={g.onCreate}
                              className={cn(
                                "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-indigo-600 transition hover:bg-white/60",
                                !g.onCreate && "cursor-default opacity-50 hover:bg-transparent",
                              )}
                            >
                              <Plus className="h-4 w-4" />
                              <span className="truncate">{g.createLabel}</span>
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  );
                })}

              {!loading && (
                <div>
                  <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Discovery
                  </div>
                  {(
                    [
                      { kind: "sitemap", label: "Sitemap", Icon: MapIcon },
                      { kind: "robots", label: "Robots.txt", Icon: Bot },
                      { kind: "llms", label: "LLMs.txt", Icon: Sparkles },
                      { kind: "llms-full", label: "LLMs Full", Icon: FileStack },
                    ] as const
                  ).map(({ kind, label, Icon }) => {
                    const isActive = view.kind === kind;
                    return (
                      <button
                        key={kind}
                        onClick={() => {
                          setView({ kind });
                          setSelected([]);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition",
                          isActive
                            ? "bg-indigo-50 font-semibold text-indigo-700"
                            : "text-foreground/80 hover:bg-white/60",
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4 w-4",
                            isActive ? "text-indigo-600" : "text-muted-foreground",
                          )}
                        />
                        <span className="truncate text-left">{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {!loading && (
                <div>
                  <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Access
                  </div>
                  <button
                    onClick={() => {
                      setView({ kind: "permissions" });
                      setSelected([]);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition",
                      view.kind === "permissions"
                        ? "bg-indigo-50 font-semibold text-indigo-700"
                        : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <KeyRound
                      className={cn(
                        "h-4 w-4",
                        view.kind === "permissions" ? "text-indigo-600" : "text-muted-foreground",
                      )}
                    />
                    <span className="truncate text-left">Permissions</span>
                  </button>
                  <button
                    onClick={() => {
                      setView({ kind: "activity" });
                      setSelected([]);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition",
                      view.kind === "activity"
                        ? "bg-indigo-50 font-semibold text-indigo-700"
                        : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <Activity
                      className={cn(
                        "h-4 w-4",
                        view.kind === "activity" ? "text-indigo-600" : "text-muted-foreground",
                      )}
                    />
                    <span className="truncate text-left">Activity</span>
                  </button>
                </div>
              )}
            </nav>
          </aside>
        )}

        <main
          className={cn(
            "min-w-0 flex-1 px-4 pb-16 md:pr-6",
            sidebarOpen ? "md:pl-0" : "md:pl-6",
          )}
        >
          {error && (
            <div
              className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
              role="alert"
            >
              {error}
            </div>
          )}

          {loading && (
            <section className="space-y-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-10 w-64" />
                  <Skeleton className="h-5 w-80" />
                </div>
                <Skeleton className="h-11 w-32 rounded-lg" />
              </div>
              <div className="rounded-3xl bg-white p-2 shadow-sm ring-1 ring-black/5">
                <div className="flex items-center justify-between px-4 py-3">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-t border-black/5 px-4 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-md bg-indigo-50" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                    <Skeleton className="h-5 w-28" />
                  </div>
                ))}
              </div>
            </section>
          )}

          {!loading && view.kind === "collection-list" && (
            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h1 className="text-3xl font-semibold tracking-tight">Content-Type Builder</h1>
              <p className="mt-2 text-muted-foreground">
                No collection types found. Create one in the API to start managing content.
              </p>
            </section>
          )}

          {!loading && view.kind === "schema" && currentContentType && (
            <SchemaView
              contentType={currentContentType}
              onOpenEntries={() =>
                setView({ kind: "entries", contentTypeId: currentContentType.id })
              }
              onContentTypeUpdated={updateContentType}
              onDeleteContentType={deleteContentType}
              onError={handleApiError}
            />
          )}

          {!loading && view.kind === "schema" && currentComponent && (
            <ComponentSchemaView component={currentComponent} onError={handleApiError} />
          )}

          {!loading && view.kind === "entries" && currentContentType && (
            <EntriesView
              contentType={currentContentType}
              selected={selected}
              setSelected={setSelected}
              onBack={() =>
                setView({
                  kind: "schema",
                  target: {
                    kind: "content-type",
                    id: currentContentType.id,
                    group:
                      currentContentType.kind === "single" ? "Single Types" : "Collection Types",
                  },
                })
              }
              onOpenEntry={(entryId) =>
                setView({ kind: "entry", contentTypeId: currentContentType.id, entryId })
              }
              onError={handleApiError}
            />
          )}

          {!loading && view.kind === "entry" && currentContentType && (
            <EntryView
              contentType={currentContentType}
              entryId={view.entryId}
              onBack={() => setView({ kind: "entries", contentTypeId: currentContentType.id })}
              onError={handleApiError}
            />
          )}

          {!loading && view.kind === "sitemap" && (
            <SitemapView
              contentTypes={[...collections, ...singleTypes].map((type) => ({
                id: type.id,
                display_name: type.display_name,
              }))}
              onError={handleApiError}
            />
          )}

          {!loading && view.kind === "robots" && <RobotsView onError={handleApiError} />}

          {!loading && view.kind === "llms" && <LlmsView onError={handleApiError} />}

          {!loading && view.kind === "llms-full" && (
            <LlmsFullView
              contentTypes={[...collections, ...singleTypes].map((type) => ({
                id: type.id,
                display_name: type.display_name,
              }))}
              onError={handleApiError}
            />
          )}

          {!loading && view.kind === "permissions" && (
            <PermissionsMatrix
              toolkitIds={cmsServer?.toolkit_ids ?? []}
              enabled={cmsServer?.enabled ?? false}
              theme={lightPermissionsTheme}
              toolsNoun="CMS"
              stripToolPrefix={/^cms_/}
              disabledHint="Who can use the CMS tools, and how. Enable the Content (CMS) MCP server first to start granting access."
              connectHint="No toolkit is connected yet — enable the Content (CMS) MCP server from the MCP catalog."
              onApiError={handleApiError}
            />
          )}

          {!loading && view.kind === "activity" && (
            <ActivityLog
              onApiError={handleApiError}
              nameServerSlugs={["cms"]}
              logFilter={(log) =>
                log.tool_name
                  ? log.tool_name.startsWith("cms_")
                  : Boolean(log.path?.startsWith("/api/v1/cms"))
              }
              description="Every change made to your content through Console and via CMS tool calls."
            />
          )}
        </main>
      </div>

      <Dialog open={!!createKind} onOpenChange={(open) => !open && setCreateKind(null)}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {createKind === "single" ? "Create new Single type" : "Create new Collection type"}
            </DialogTitle>
            <DialogDescription>
              {createKind === "single"
                ? "A single type holds one unique entry, like global settings."
                : "A collection type holds many entries that share the same fields."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Display name</label>
              <Input
                value={createName}
                onChange={(event) => updateCreateName(event.target.value)}
                className="h-11 rounded-lg"
                placeholder={createKind === "single" ? "Site Settings" : "Blog Post"}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">API UID</label>
              <Input
                value={createUid}
                onChange={(event) => setCreateUid(keyify(event.target.value))}
                className="h-11 rounded-lg font-mono"
                placeholder={createKind === "single" ? "site_settings" : "blog_post"}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Used to reference this type in the API. Lowercase letters, numbers and underscores.
              </p>
            </div>
            {createKind !== "single" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Plural name <span className="text-muted-foreground">(optional)</span>
                </label>
                <Input
                  value={createPlural}
                  onChange={(event) => setCreatePlural(event.target.value)}
                  className="h-11 rounded-lg"
                  placeholder="Blog Posts"
                />
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Description <span className="text-muted-foreground">(optional)</span>
              </label>
              <textarea
                value={createDescription}
                onChange={(event) => setCreateDescription(event.target.value)}
                rows={3}
                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={creatingType}
              onClick={() => setCreateKind(null)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={creatingType || !createName.trim()}
              onClick={createContentType}
            >
              {creatingType ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={componentDialogOpen} onOpenChange={setComponentDialogOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create new Component</DialogTitle>
            <DialogDescription>
              A component is a reusable group of fields you can embed in content types.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Display name</label>
              <Input
                value={componentName}
                onChange={(event) => updateComponentName(event.target.value)}
                className="h-11 rounded-lg"
                placeholder="Hero Section"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">API UID</label>
              <Input
                value={componentUid}
                onChange={(event) => setComponentUid(keyify(event.target.value))}
                className="h-11 rounded-lg font-mono"
                placeholder="hero_section"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Used to reference this component in the API. Lowercase letters, numbers and
                underscores.
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Category</label>
              <Input
                value={componentCategory}
                onChange={(event) => setComponentCategory(event.target.value)}
                className="h-11 rounded-lg"
                placeholder="blocks"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Components are grouped by category in the builder.
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">
                Description <span className="text-muted-foreground">(optional)</span>
              </label>
              <textarea
                value={componentDescription}
                onChange={(event) => setComponentDescription(event.target.value)}
                rows={3}
                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={creatingComponent}
              onClick={() => setComponentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={creatingComponent || !componentName.trim()}
              onClick={createComponent}
            >
              {creatingComponent ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SchemaView({
  contentType,
  onOpenEntries,
  onContentTypeUpdated,
  onDeleteContentType,
  onError,
}: {
  contentType: ContentTypeResponse;
  onOpenEntries: () => void;
  onContentTypeUpdated: (contentType: ContentTypeResponse) => void;
  onDeleteContentType: (contentType: ContentTypeResponse) => Promise<void> | void;
  onError: (err: unknown, fallback?: string) => void;
}) {
  const [fields, setFields] = useState<FieldResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContentType, setEditingContentType] = useState(false);
  const [confirmDeleteType, setConfirmDeleteType] = useState(false);
  const [deletingType, setDeletingType] = useState(false);
  const [contentTypeName, setContentTypeName] = useState(contentType.display_name);
  const [contentTypeDescription, setContentTypeDescription] = useState(
    contentType.description ?? "",
  );
  const [editingField, setEditingField] = useState<FieldResponse | null>(null);
  const [fieldLabel, setFieldLabel] = useState("");
  const [fieldType, setFieldType] = useState<FieldType>("short_text");
  const [fieldRequired, setFieldRequired] = useState(false);
  const [fieldUnique, setFieldUnique] = useState(false);
  const [saving, setSaving] = useState(false);
  const [creatingField, setCreatingField] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldType, setNewFieldType] = useState<FieldType>("short_text");
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [newFieldUnique, setNewFieldUnique] = useState(false);

  const loadFields = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await apiRequest<FieldResponse[]>(
        `/api/v1/cms/content-types/${contentType.id}/fields`,
      );
      setFields(rows);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [contentType.id, onError]);

  useEffect(() => {
    setContentTypeName(contentType.display_name);
    setContentTypeDescription(contentType.description ?? "");
  }, [contentType.description, contentType.display_name]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    apiRequest<FieldResponse[]>(`/api/v1/cms/content-types/${contentType.id}/fields`)
      .then((rows) => {
        if (active) setFields(rows);
      })
      .catch((err) => {
        if (active) onError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [contentType.id, onError]);

  const openFieldEditor = (field: FieldResponse) => {
    setEditingField(field);
    setFieldLabel(field.label);
    setFieldType(field.field_type);
    setFieldRequired(field.is_required);
    setFieldUnique(field.is_unique);
  };

  const openFieldCreator = () => {
    setNewFieldLabel("");
    setNewFieldKey("");
    setNewFieldType("short_text");
    setNewFieldRequired(false);
    setNewFieldUnique(false);
    setCreatingField(true);
  };

  const updateNewFieldLabel = (value: string) => {
    setNewFieldLabel(value);
    setNewFieldKey((current) => (current ? current : keyify(value)));
  };

  const createField = async () => {
    const label = newFieldLabel.trim();
    const key = keyify(newFieldKey || label);
    if (!label || !key) return;
    setSaving(true);
    try {
      const next = await apiRequest<FieldResponse>(
        `/api/v1/cms/content-types/${contentType.id}/fields`,
        {
          method: "POST",
          body: JSON.stringify({
            key,
            label,
            field_type: newFieldType,
            is_required: newFieldRequired,
            is_unique: newFieldUnique,
            order_index: fields.length,
          }),
        },
      );
      setFields((current) => [...current, next]);
      setCreatingField(false);
    } catch (err) {
      onError(err, "Unable to create field");
    } finally {
      setSaving(false);
    }
  };

  const saveContentType = async () => {
    const name = contentTypeName.trim();
    if (!name) return;
    setSaving(true);
    try {
      const next = await apiRequest<ContentTypeResponse>(
        `/api/v1/cms/content-types/${contentType.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            display_name: name,
            description: contentTypeDescription.trim() || null,
          }),
        },
      );
      onContentTypeUpdated(next);
      setEditingContentType(false);
    } catch (err) {
      onError(err, "Unable to update content type");
    } finally {
      setSaving(false);
    }
  };

  const saveField = async () => {
    if (!editingField || !fieldLabel.trim()) return;
    setSaving(true);
    try {
      const next = await apiRequest<FieldResponse>(`/api/v1/cms/fields/${editingField.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          label: fieldLabel.trim(),
          field_type: fieldType,
          is_required: fieldRequired,
          is_unique: fieldUnique,
        }),
      });
      setFields((current) => current.map((field) => (field.id === next.id ? next : field)));
      setEditingField(null);
      await loadFields();
    } catch (err) {
      onError(err, "Unable to update field");
    } finally {
      setSaving(false);
    }
  };

  const deleteField = async (field: FieldLike) => {
    try {
      await apiRequest<void>(`/api/v1/cms/fields/${field.id}`, { method: "DELETE" });
      setFields((current) => current.filter((row) => row.id !== field.id));
    } catch (err) {
      onError(err, "Unable to delete field");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight">{contentType.display_name}</h1>
          </div>
          <p className="mt-1 text-muted-foreground">
            {contentType.description || "Build the data architecture of your content."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="rounded-lg" onClick={onOpenEntries}>
            View entries
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-lg"
                aria-label="More actions"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditingContentType(true)}>
                <Edit3 className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-rose-600 focus:text-rose-600"
                onClick={() => setConfirmDeleteType(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={confirmDeleteType} onOpenChange={setConfirmDeleteType}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{contentType.display_name}”?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this{" "}
              {contentType.kind === "single" ? "single" : "collection"} type and all of its entries.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletingType}>No</AlertDialogCancel>
            <AlertDialogAction
              className="bg-rose-600 hover:bg-rose-700"
              disabled={deletingType}
              onClick={(e) => {
                e.preventDefault();
                setDeletingType(true);
                void Promise.resolve(onDeleteContentType(contentType)).finally(() => {
                  setDeletingType(false);
                  setConfirmDeleteType(false);
                });
              }}
            >
              {deletingType ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <FieldsTable
        fields={fields}
        loading={loading}
        emptyText="No fields found for this content type."
        onEditField={openFieldEditor}
        onDeleteField={deleteField}
        onAddField={openFieldCreator}
        addFieldLabel={
          contentType.kind === "single"
            ? "Add another field to this Single type"
            : "Add another field to this Collection type"
        }
      />

      <Dialog open={editingContentType} onOpenChange={setEditingContentType}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit content type</DialogTitle>
            <DialogDescription>Update the name and description shown in the CMS.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Name</label>
              <Input
                value={contentTypeName}
                onChange={(event) => setContentTypeName(event.target.value)}
                className="h-11 rounded-lg"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Description</label>
              <textarea
                value={contentTypeDescription}
                onChange={(event) => setContentTypeDescription(event.target.value)}
                rows={3}
                className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={saving}
              onClick={() => setEditingContentType(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={saving || !contentTypeName.trim()}
              onClick={saveContentType}
            >
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={creatingField} onOpenChange={setCreatingField}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add new field</DialogTitle>
            <DialogDescription>
              Add a field to the {contentType.display_name} schema.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Label</label>
              <Input
                value={newFieldLabel}
                onChange={(event) => updateNewFieldLabel(event.target.value)}
                className="h-11 rounded-lg"
                placeholder="Title"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Key</label>
              <Input
                value={newFieldKey}
                onChange={(event) => setNewFieldKey(keyify(event.target.value))}
                className="h-11 rounded-lg font-mono"
                placeholder="title"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Used as the field identifier in the API. Lowercase letters, numbers and underscores.
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Type</label>
              <select
                value={newFieldType}
                onChange={(event) => setNewFieldType(event.target.value as FieldType)}
                className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {FIELD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {formatFieldType(type)}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium">
              <Checkbox
                checked={newFieldRequired}
                onCheckedChange={(checked) => setNewFieldRequired(checked === true)}
              />
              Required field
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium">
              <Checkbox
                checked={newFieldUnique}
                onCheckedChange={(checked) => setNewFieldUnique(checked === true)}
              />
              Unique value
            </label>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={saving}
              onClick={() => setCreatingField(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={saving || !newFieldLabel.trim()}
              onClick={createField}
            >
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Add field
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingField} onOpenChange={(open) => !open && setEditingField(null)}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit field</DialogTitle>
            <DialogDescription>Update how this field appears in the schema.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Label</label>
              <Input
                value={fieldLabel}
                onChange={(event) => setFieldLabel(event.target.value)}
                className="h-11 rounded-lg"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Type</label>
              <select
                value={fieldType}
                onChange={(event) => setFieldType(event.target.value as FieldType)}
                className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {FIELD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {formatFieldType(type)}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium">
              <Checkbox
                checked={fieldRequired}
                onCheckedChange={(checked) => setFieldRequired(checked === true)}
              />
              Required field
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium">
              <Checkbox
                checked={fieldUnique}
                onCheckedChange={(checked) => setFieldUnique(checked === true)}
              />
              Unique value
            </label>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={saving}
              onClick={() => setEditingField(null)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={saving || !fieldLabel.trim()}
              onClick={saveField}
            >
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function ComponentSchemaView({
  component,
  onError,
}: {
  component: ComponentResponse;
  onError: (err: unknown, fallback?: string) => void;
}) {
  const [fields, setFields] = useState<ComponentFieldResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingField, setCreatingField] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldType, setNewFieldType] = useState<FieldType>("short_text");
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadFields = async () => {
      setLoading(true);
      try {
        const rows = await apiRequest<ComponentFieldResponse[]>(
          `/api/v1/cms/components/${component.id}/fields`,
        );
        if (!cancelled) setFields(rows);
      } catch (err) {
        if (!cancelled) onError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void loadFields();
    return () => {
      cancelled = true;
    };
  }, [component.id, onError]);

  const openFieldCreator = () => {
    setNewFieldLabel("");
    setNewFieldKey("");
    setNewFieldType("short_text");
    setNewFieldRequired(false);
    setCreatingField(true);
  };

  const updateNewFieldLabel = (value: string) => {
    setNewFieldLabel(value);
    setNewFieldKey((current) => (current ? current : keyify(value)));
  };

  const createField = async () => {
    const label = newFieldLabel.trim();
    const key = keyify(newFieldKey || label);
    if (!label || !key) return;
    setSaving(true);
    try {
      const next = await apiRequest<ComponentFieldResponse>(
        `/api/v1/cms/components/${component.id}/fields`,
        {
          method: "POST",
          body: JSON.stringify({
            key,
            label,
            field_type: newFieldType,
            is_required: newFieldRequired,
            order_index: fields.length,
          }),
        },
      );
      setFields((current) => [...current, next]);
      setCreatingField(false);
    } catch (err) {
      onError(err, "Unable to create field");
    } finally {
      setSaving(false);
    }
  };

  const deleteField = async (field: FieldLike) => {
    try {
      await apiRequest<void>(`/api/v1/cms/component-fields/${field.id}`, { method: "DELETE" });
      setFields((current) => current.filter((row) => row.id !== field.id));
    } catch (err) {
      onError(err, "Unable to delete field");
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight">{component.display_name}</h1>
            <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200">
              {component.category}
            </span>
          </div>
          <p className="mt-1 text-muted-foreground">
            {component.description || "Reusable component schema."}
          </p>
        </div>
        <Button variant="outline" className="rounded-lg text-indigo-600" onClick={openFieldCreator}>
          <Plus className="mr-1.5 h-4 w-4" /> Add new field
        </Button>
      </div>

      <FieldsTable
        fields={fields}
        loading={loading}
        emptyText="No fields found for this component."
        onDeleteField={deleteField}
        onAddField={openFieldCreator}
        addFieldLabel="Add another field to this Component"
      />

      <Dialog open={creatingField} onOpenChange={setCreatingField}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add new field</DialogTitle>
            <DialogDescription>
              Add a field to the {component.display_name} component.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Label</label>
              <Input
                value={newFieldLabel}
                onChange={(event) => updateNewFieldLabel(event.target.value)}
                className="h-11 rounded-lg"
                placeholder="Title"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Key</label>
              <Input
                value={newFieldKey}
                onChange={(event) => setNewFieldKey(keyify(event.target.value))}
                className="h-11 rounded-lg font-mono"
                placeholder="title"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Used as the field identifier in the API. Lowercase letters, numbers and underscores.
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Type</label>
              <select
                value={newFieldType}
                onChange={(event) => setNewFieldType(event.target.value as FieldType)}
                className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                {FIELD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {formatFieldType(type)}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium">
              <Checkbox
                checked={newFieldRequired}
                onCheckedChange={(checked) => setNewFieldRequired(checked === true)}
              />
              Required field
            </label>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={saving}
              onClick={() => setCreatingField(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={saving || !newFieldLabel.trim()}
              onClick={createField}
            >
              {saving ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Add field
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function FieldsTable({
  fields,
  loading,
  emptyText,
  onEditField,
  onDeleteField,
  onAddField,
  addFieldLabel = "Add another field to this Collection type",
}: {
  fields: FieldLike[];
  loading: boolean;
  emptyText: string;
  onEditField?: (field: FieldResponse) => void;
  onDeleteField?: (field: FieldLike) => Promise<void> | void;
  onAddField?: () => void;
  addFieldLabel?: string;
}) {
  const [pendingDelete, setPendingDelete] = useState<FieldLike | null>(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!pendingDelete || !onDeleteField) return;
    setDeleting(true);
    try {
      await onDeleteField(pendingDelete);
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="grid grid-cols-[1fr_2fr_80px] gap-4 border-b border-black/5 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <div>Name</div>
        <div>Type</div>
        <div />
      </div>
      {loading ? (
        <FieldsTableSkeleton />
      ) : fields.length === 0 ? (
        <div className="px-6 py-6 text-sm text-muted-foreground">{emptyText}</div>
      ) : (
        <ul>
          {fields.map((f) => {
            const Icon = fieldIcon(f.field_type);
            const hasActions = Boolean(onEditField || onDeleteField);
            return (
              <li
                key={f.id}
                className="group grid grid-cols-[1fr_2fr_80px] items-center gap-4 border-b border-black/5 px-6 py-4 last:border-b-0 hover:bg-[hsl(220,33%,98%)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-indigo-50 text-indigo-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{f.label}</span>
                </div>
                <div className="text-foreground/80">{formatFieldType(f.field_type)}</div>
                <div className="flex items-center justify-end">
                  {hasActions && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full opacity-0 transition focus-visible:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100"
                          aria-label="Field actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl p-1">
                        {onEditField && (
                          <DropdownMenuItem
                            className="gap-2 rounded-lg"
                            onSelect={() => onEditField(f as FieldResponse)}
                          >
                            <Edit3 className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                        )}
                        {onDeleteField && (
                          <DropdownMenuItem
                            className="gap-2 rounded-lg text-rose-600 focus:bg-rose-50 focus:text-rose-700"
                            onSelect={(event) => {
                              event.preventDefault();
                              setPendingDelete(f);
                            }}
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <button
        disabled={!onAddField}
        onClick={onAddField}
        className={cn(
          "flex w-full items-center gap-3 bg-indigo-50/60 px-6 py-4 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50",
          !onAddField && "cursor-default opacity-50 hover:bg-indigo-50/60",
        )}
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-indigo-100">
          <Plus className="h-3.5 w-3.5" />
        </span>
        {addFieldLabel}
      </button>

      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(open) => !open && !deleting && setPendingDelete(null)}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete field</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete
              {pendingDelete ? ` "${pendingDelete.label}"` : " this field"}? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting} className="rounded-lg">
              No
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting}
              onClick={(event) => {
                event.preventDefault();
                void confirmDelete();
              }}
              className="rounded-lg bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-300"
            >
              {deleting ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function FieldsTableSkeleton() {
  const rows = Array.from({ length: 8 });

  return (
    <ul aria-label="Loading fields">
      {rows.map((_, index) => (
        <li
          key={index}
          className="grid grid-cols-[1fr_2fr_80px] items-center gap-4 border-b border-black/5 px-6 py-4 last:border-b-0"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-md bg-indigo-50" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-5 w-28" />
          <div className="flex items-center justify-end">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function EntriesView({
  contentType,
  selected,
  setSelected,
  onBack,
  onOpenEntry,
  onError,
}: {
  contentType: ContentTypeResponse;
  selected: string[];
  setSelected: (v: string[]) => void;
  onBack: () => void;
  onOpenEntry: (id: string) => void;
  onError: (err: unknown, fallback?: string) => void;
}) {
  const [q, setQ] = useState("");
  const [entries, setEntries] = useState<EntryRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createDocumentKey, setCreateDocumentKey] = useState("");
  const [createLocale, setCreateLocale] = useState("en");
  const [creating, setCreating] = useState(false);

  const loadEntries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        content_type_id: contentType.id,
        limit: "50",
        offset: "0",
      });
      if (q.trim()) params.set("q", q.trim());
      const page = await apiRequest<Page<EntryResponse>>(
        `/api/v1/cms/entries?${params.toString()}`,
      );
      const rows = await Promise.all(
        page.items.map(async (entry) => {
          const detail = await apiRequest<EntryDetailResponse>(`/api/v1/cms/entries/${entry.id}`);
          return { ...entry, primaryLocale: detail.locales[0] ?? null };
        }),
      );
      setEntries(rows);
      setTotal(page.total);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [contentType.id, onError, q]);

  useEffect(() => {
    void loadEntries();
  }, [loadEntries]);

  const allChecked = entries.length > 0 && entries.every((e) => selected.includes(e.id));
  const toggleAll = () => setSelected(allChecked ? [] : entries.map((e) => e.id));
  const toggle = (id: string) =>
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);

  const openCreateDialog = () => {
    setCreateTitle("");
    setCreateDocumentKey("");
    setCreateLocale("en");
    setCreateOpen(true);
  };

  const updateCreateTitle = (value: string) => {
    setCreateTitle(value);
    setCreateDocumentKey((current) => current || slugify(value));
  };

  const createEntry = async () => {
    const title = createTitle.trim();
    if (!title) return;
    setCreating(true);
    try {
      const response = await apiRequest<EntryResponse | EntryDetailResponse>(
        "/api/v1/cms/entries",
        {
          method: "POST",
          body: JSON.stringify({
            content_type_id: contentType.id,
            document_key: createDocumentKey.trim() || slugify(title),
            locale: createLocale.trim() || "en",
            title,
            data: {},
          }),
        },
      );
      const entry = "entry" in response ? response.entry : response;
      setCreateOpen(false);
      setSelected([]);
      onOpenEntry(entry.id);
    } catch (err) {
      onError(err, "Unable to create entry");
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">{contentType.display_name}</h1>
          <p className="mt-1 text-muted-foreground">{total} entries found</p>
        </div>
        <Button className="rounded-lg bg-indigo-600 hover:bg-indigo-700" onClick={openCreateDialog}>
          <Plus className="mr-1.5 h-4 w-4" /> Create new entry
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="h-9 w-48 rounded-lg border-black/10 bg-white pl-9"
            />
          </div>
          <Button disabled variant="outline" size="sm" className="h-9 rounded-lg">
            <Filter className="mr-1.5 h-3.5 w-3.5" /> Filters
          </Button>
        </div>
        <Button
          disabled
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">{selected.length} entries selected</span>
          <Button disabled size="sm" className="h-8 rounded-lg bg-indigo-600 hover:bg-indigo-700">
            Publish
          </Button>
          <Button disabled size="sm" variant="outline" className="h-8 rounded-lg text-rose-600">
            Delete
          </Button>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="grid grid-cols-[40px_80px_1fr_2fr_140px_120px_40px] items-center gap-4 border-b border-black/5 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Checkbox checked={allChecked} onCheckedChange={toggleAll} />
          <div>ID</div>
          <div>Title</div>
          <div>Document key</div>
          <div>Updated</div>
          <div>Status</div>
          <div />
        </div>
        {loading ? (
          <EntriesTableSkeleton />
        ) : entries.length === 0 ? (
          <div className="px-6 py-6 text-sm text-muted-foreground">No entries found.</div>
        ) : (
          <ul>
            {entries.map((e) => {
              const checked = selected.includes(e.id);
              return (
                <li
                  key={e.id}
                  className="grid cursor-pointer grid-cols-[40px_80px_1fr_2fr_140px_120px_40px] items-center gap-4 border-b border-black/5 px-6 py-4 text-sm last:border-b-0 hover:bg-[hsl(220,33%,98%)]"
                  onClick={() => onOpenEntry(e.id)}
                >
                  <div onClick={(ev) => ev.stopPropagation()}>
                    <Checkbox checked={checked} onCheckedChange={() => toggle(e.id)} />
                  </div>
                  <div className="truncate text-muted-foreground" title={e.id}>
                    {e.id.slice(0, 8)}
                  </div>
                  <div className="truncate font-medium">{e.primaryLocale?.title || "Untitled"}</div>
                  <div className="truncate text-foreground/80">{e.document_key}</div>
                  <div className="text-muted-foreground">{formatDate(e.updated_at)}</div>
                  <div>
                    <span
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs font-medium",
                        statusClass(e.primaryLocale?.status ?? e.status),
                      )}
                    >
                      {formatStatus(e.primaryLocale?.status ?? e.status)}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    aria-label="More"
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create new entry</DialogTitle>
            <DialogDescription>
              Start a new {contentType.display_name.toLowerCase()} draft.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Title</label>
              <Input
                value={createTitle}
                onChange={(event) => updateCreateTitle(event.target.value)}
                className="h-11 rounded-lg"
                placeholder="Untitled entry"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Document key</label>
              <Input
                value={createDocumentKey}
                onChange={(event) => setCreateDocumentKey(slugify(event.target.value))}
                className="h-11 rounded-lg"
                placeholder="untitled-entry"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium">Locale</label>
              <Input
                value={createLocale}
                onChange={(event) => setCreateLocale(event.target.value)}
                className="h-11 rounded-lg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={creating}
              onClick={() => setCreateOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={creating || !createTitle.trim()}
              onClick={createEntry}
            >
              {creating ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Create entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function EntriesTableSkeleton() {
  const rows = Array.from({ length: 6 });

  return (
    <ul aria-label="Loading entries">
      {rows.map((_, index) => (
        <li
          key={index}
          className="grid grid-cols-[40px_80px_1fr_2fr_140px_120px_40px] items-center gap-4 border-b border-black/5 px-6 py-4 last:border-b-0"
        >
          <Skeleton className="h-5 w-5 rounded-md" />
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </li>
      ))}
    </ul>
  );
}

function EntryView({
  contentType,
  entryId,
  onBack,
  onError,
}: {
  contentType: ContentTypeResponse;
  entryId: string;
  onBack: () => void;
  onError: (err: unknown, fallback?: string) => void;
}) {
  const [fields, setFields] = useState<FieldResponse[]>([]);
  const [entry, setEntry] = useState<EntryResponse | null>(null);
  const [locale, setLocale] = useState<EntryLocaleResponse | null>(null);
  const [draftVersion, setDraftVersion] = useState<EntryVersionResponse | null>(null);
  const [publishedVersion, setPublishedVersion] = useState<EntryVersionResponse | null>(null);
  const [title, setTitle] = useState("");
  const [data, setData] = useState<Record<string, unknown>>({});
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [message, setMessage] = useState("");

  const loadEntry = useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const [fieldRows, detail] = await Promise.all([
        apiRequest<FieldResponse[]>(`/api/v1/cms/content-types/${contentType.id}/fields`),
        apiRequest<EntryDetailResponse>(`/api/v1/cms/entries/${entryId}`),
      ]);
      const primaryLocale = detail.locales[0];
      if (!primaryLocale) {
        throw new Error("This entry has no locales to edit.");
      }
      const localeDetail = await apiRequest<EntryLocaleDetailResponse>(
        `/api/v1/cms/entry-locales/${primaryLocale.id}`,
      );
      const version = localeDetail.draft_version ?? localeDetail.published_version;
      setFields(fieldRows);
      setEntry(detail.entry);
      setLocale(localeDetail.locale);
      setDraftVersion(localeDetail.draft_version);
      setPublishedVersion(localeDetail.published_version);
      setTitle(localeDetail.locale.title ?? "");
      setData(version?.data ?? {});
      setJsonErrors({});
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [contentType.id, entryId, onError]);

  useEffect(() => {
    void loadEntry();
  }, [loadEntry]);

  const updateField = (key: string, value: unknown) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const updateJsonField = (key: string, value: string) => {
    try {
      updateField(key, value.trim() ? JSON.parse(value) : null);
      setJsonErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    } catch {
      setJsonErrors((current) => ({ ...current, [key]: "Invalid JSON" }));
    }
  };

  const saveDraft = async () => {
    if (!locale || Object.keys(jsonErrors).length > 0) return;
    setMutating(true);
    setMessage("");
    try {
      const detail = await apiRequest<EntryLocaleDetailResponse>(
        `/api/v1/cms/entry-locales/${locale.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ title, data }),
        },
      );
      setLocale(detail.locale);
      setDraftVersion(detail.draft_version);
      setPublishedVersion(detail.published_version);
      setMessage("Draft saved.");
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const publish = async () => {
    if (!locale || Object.keys(jsonErrors).length > 0) return;
    setMutating(true);
    setMessage("");
    try {
      await apiRequest<EntryVersionResponse>(`/api/v1/cms/entry-locales/${locale.id}/publish`, {
        method: "POST",
      });
      setMessage("Entry published.");
      await loadEntry();
    } catch (err) {
      onError(err, "Unable to publish entry");
    } finally {
      setMutating(false);
    }
  };

  const unpublish = async () => {
    if (!locale) return;
    setMutating(true);
    setMessage("");
    try {
      const nextLocale = await apiRequest<EntryLocaleResponse>(
        `/api/v1/cms/entry-locales/${locale.id}/unpublish`,
        {
          method: "POST",
        },
      );
      setLocale(nextLocale);
      setMessage("Entry unpublished.");
      await loadEntry();
    } catch (err) {
      onError(err, "Unable to unpublish entry");
    } finally {
      setMutating(false);
    }
  };

  if (loading) {
    return (
      <section className="flex items-center gap-2 rounded-2xl bg-white p-6 text-muted-foreground shadow-sm ring-1 ring-black/5">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading entry...
      </section>
    );
  }

  if (!entry || !locale) {
    return (
      <section className="rounded-2xl bg-white p-6 text-sm text-muted-foreground shadow-sm ring-1 ring-black/5">
        Entry not found.
      </section>
    );
  }

  const hasJsonErrors = Object.keys(jsonErrors).length > 0;

  return (
    <section className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {contentType.display_name}
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="break-words text-4xl font-semibold tracking-tight">
            {title || "Untitled"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Edit and publish your {contentType.display_name.toLowerCase()} entry.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            className="rounded-lg"
            disabled={mutating || hasJsonErrors}
            onClick={saveDraft}
          >
            {mutating ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
            Save draft
          </Button>
          {locale.status === "published" ? (
            <Button
              variant="outline"
              className="rounded-lg"
              disabled={mutating}
              onClick={unpublish}
            >
              Unpublish
            </Button>
          ) : (
            <Button
              className="rounded-lg bg-indigo-600 hover:bg-indigo-700"
              disabled={mutating || hasJsonErrors}
              onClick={publish}
            >
              <Check className="mr-1.5 h-4 w-4" /> Publish
            </Button>
          )}
        </div>
      </div>

      {message && (
        <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
          {message}
        </p>
      )}
      {hasJsonErrors && (
        <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 ring-1 ring-rose-200">
          Fix invalid JSON fields before saving.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-lg"
            />
          </div>

          {fields.length === 0 ? (
            <p className="text-sm text-muted-foreground">No fields found for this content type.</p>
          ) : (
            fields.map((field) => (
              <FieldEditor
                key={field.id}
                field={field}
                value={data[field.key]}
                jsonError={jsonErrors[field.key]}
                onChange={(value) => updateField(field.key, value)}
                onJsonChange={(value) => updateJsonField(field.key, value)}
              />
            ))
          )}
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Information
            </h3>
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">ID</dt>
                <dd className="truncate font-medium" title={entry.id}>
                  {entry.id.slice(0, 8)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Locale</dt>
                <dd className="font-medium">{locale.locale}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd>
                  <span
                    className={cn(
                      "rounded-md px-2 py-0.5 text-xs font-medium",
                      statusClass(locale.status),
                    )}
                  >
                    {formatStatus(locale.status)}
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Draft</dt>
                <dd className="font-medium">
                  {draftVersion ? `v${draftVersion.version_number}` : "-"}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Published</dt>
                <dd className="font-medium">
                  {publishedVersion ? `v${publishedVersion.version_number}` : "-"}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Updated</dt>
                <dd className="font-medium">{formatDate(locale.updated_at)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FieldEditor({
  field,
  value,
  jsonError,
  onChange,
  onJsonChange,
}: {
  field: FieldResponse;
  value: unknown;
  jsonError?: string;
  onChange: (value: unknown) => void;
  onJsonChange: (value: string) => void;
}) {
  const label = `${field.label}${field.is_required ? " *" : ""}`;
  const commonInputClass = "h-11 rounded-lg";
  const [jsonText, setJsonText] = useState(JSON.stringify(value ?? null, null, 2));

  useEffect(() => {
    setJsonText(JSON.stringify(value ?? null, null, 2));
  }, [value]);

  if (field.field_type === "boolean") {
    return (
      <label className="flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium">
        <Checkbox
          checked={Boolean(value)}
          onCheckedChange={(checked) => onChange(checked === true)}
        />
        {label}
      </label>
    );
  }

  if (
    field.field_type === "long_text" ||
    field.field_type === "rich_text" ||
    field.field_type === "markdown"
  ) {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium">{label}</label>
        <textarea
          value={asString(value)}
          onChange={(e) => onChange(e.target.value)}
          rows={field.field_type === "long_text" ? 4 : 8}
          className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </div>
    );
  }

  if (field.field_type === "number") {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium">{label}</label>
        <Input
          type="number"
          value={asString(value)}
          onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
          className={commonInputClass}
        />
      </div>
    );
  }

  if (field.field_type === "date" || field.field_type === "datetime") {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium">{label}</label>
        <Input
          type={field.field_type === "date" ? "date" : "datetime-local"}
          value={asString(value)}
          onChange={(e) => onChange(e.target.value || null)}
          className={commonInputClass}
        />
      </div>
    );
  }

  if (field.field_type === "enum") {
    const values = getEnumValues(field.options);
    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium">{label}</label>
        <select
          value={asString(value)}
          onChange={(e) => onChange(e.target.value || null)}
          className="h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">Select...</option>
          {values.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.field_type === "json" || isComplexField(field.field_type)) {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium">{label}</label>
        <textarea
          value={jsonText}
          onChange={(e) => {
            setJsonText(e.target.value);
            onJsonChange(e.target.value);
          }}
          rows={6}
          className={cn(
            "w-full rounded-lg border bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2",
            jsonError
              ? "border-rose-300 focus:ring-rose-200"
              : "border-black/10 focus:ring-indigo-200",
          )}
        />
        {jsonError && <p className="mt-1 text-xs font-medium text-rose-600">{jsonError}</p>}
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      <Input
        type={
          field.field_type === "email"
            ? "email"
            : field.field_type === "url"
              ? "url"
              : field.field_type === "color"
                ? "color"
                : "text"
        }
        value={asString(value)}
        onChange={(e) => onChange(e.target.value)}
        className={commonInputClass}
      />
    </div>
  );
}

function isComplexField(type: FieldType) {
  return (
    type === "media" ||
    type === "relation" ||
    type === "component" ||
    type === "dynamic_zone" ||
    type === "seo" ||
    type === "location" ||
    type === "ai_prompt"
  );
}
