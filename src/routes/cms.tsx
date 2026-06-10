import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
  Check,
  ArrowLeft,
  Filter,
  MoreHorizontal,
  Type,
  Hash,
  Image as ImageIcon,
  Link2,
  GitBranch,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { AppsMenu } from "@/components/apps-menu";
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
  | { kind: "entry"; contentTypeId: string; entryId: string };

type EntryRow = EntryResponse & {
  primaryLocale: EntryLocaleResponse | null;
};

type FieldLike = FieldResponse | ComponentFieldResponse;

const GROUP_LABELS = ["Collection Types", "Single Types", "Components"] as const;

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
          <div className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-stone-500 text-sm font-medium text-white">
            C
          </div>
        </div>
      </header>

      {searchOpen && <div className="px-4 pb-3 md:hidden">{searchField}</div>}

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[280px] shrink-0 px-3 md:block">
            <Button
              disabled
              className="mb-4 h-14 w-[180px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white"
            >
              <Plus className="mr-1 h-5 w-5" /> Create
            </Button>

            <nav className="space-y-5">
              {groups.map((g) => {
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
                            disabled
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-indigo-600 opacity-50"
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
            </nav>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
          {error && (
            <div
              className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
              role="alert"
            >
              {error}
            </div>
          )}

          {loading && (
            <section className="flex items-center gap-2 rounded-2xl bg-white p-6 text-muted-foreground shadow-sm ring-1 ring-black/5">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading CMS...
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
        </main>
      </div>
    </div>
  );
}

function SchemaView({
  contentType,
  onOpenEntries,
  onError,
}: {
  contentType: ContentTypeResponse;
  onOpenEntries: () => void;
  onError: (err: unknown, fallback?: string) => void;
}) {
  const [fields, setFields] = useState<FieldResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const loadFields = async () => {
      setLoading(true);
      try {
        const rows = await apiRequest<FieldResponse[]>(
          `/api/v1/cms/content-types/${contentType.id}/fields`,
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
  }, [contentType.id, onError]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight">{contentType.display_name}</h1>
            <Button disabled variant="outline" size="sm" className="rounded-lg">
              <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Edit
            </Button>
          </div>
          <p className="mt-1 text-muted-foreground">
            {contentType.description || "Build the data architecture of your content."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="rounded-lg" onClick={onOpenEntries}>
            View entries
          </Button>
          <Button disabled variant="outline" className="rounded-lg text-indigo-600">
            <Plus className="mr-1.5 h-4 w-4" /> Add new field
          </Button>
          <Button disabled className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
            <Check className="mr-1.5 h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button disabled variant="outline" size="sm" className="rounded-lg">
          <Filter className="mr-1.5 h-3.5 w-3.5" /> Configure the view
        </Button>
      </div>

      <FieldsTable
        fields={fields}
        loading={loading}
        emptyText="No fields found for this content type."
      />
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
        <Button disabled variant="outline" className="rounded-lg text-indigo-600">
          <Plus className="mr-1.5 h-4 w-4" /> Add new field
        </Button>
      </div>

      <FieldsTable
        fields={fields}
        loading={loading}
        emptyText="No fields found for this component."
      />
    </section>
  );
}

function FieldsTable({
  fields,
  loading,
  emptyText,
}: {
  fields: FieldLike[];
  loading: boolean;
  emptyText: string;
}) {
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
            return (
              <li
                key={f.id}
                className="grid grid-cols-[1fr_2fr_80px] items-center gap-4 border-b border-black/5 px-6 py-4 last:border-b-0 hover:bg-[hsl(220,33%,98%)]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-indigo-50 text-indigo-600">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-medium">{f.label}</span>
                </div>
                <div className="text-foreground/80">{formatFieldType(f.field_type)}</div>
                <div className="flex items-center justify-end gap-1">
                  <Button
                    disabled
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    aria-label="Edit field"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    disabled
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    aria-label="Field actions"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <button
        disabled
        className="flex w-full items-center gap-3 bg-indigo-50/60 px-6 py-4 text-sm font-medium text-indigo-600 opacity-50"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-indigo-100">
          <Plus className="h-3.5 w-3.5" />
        </span>
        Add another field to this Collection type
      </button>
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
          <div className="flex items-center justify-end gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
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
        <Button disabled className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
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
          <div className="flex items-center gap-2 px-6 py-6 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading entries...
          </div>
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
    </section>
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
