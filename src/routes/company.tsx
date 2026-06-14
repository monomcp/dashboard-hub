import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Plus,
  Settings,
  Building2,
  FileText,
  Archive,
  Globe,
  Tag,
  MoreVertical,
  Loader2,
  RotateCcw,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppsMenu } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company — My Business" },
      { name: "description", content: "Manage your business profiles and company details." },
      { property: "og:title", content: "Company — My Business" },
      {
        property: "og:description",
        content: "Manage your business profiles and company details.",
      },
    ],
    links: [{ rel: "canonical", href: "/company" }],
  }),
  component: CompanyPage,
});

type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

type BusinessType =
  | "local_business"
  | "saas"
  | "ecommerce"
  | "hotel"
  | "agency"
  | "creator"
  | "marketplace"
  | "other";
type ProfileStatus = "draft" | "active" | "archived";
type CompanyFilter = "all" | "active" | "draft" | "archived";

type BusinessProfileResponse = {
  id: string;
  organization_id: string;
  name: string;
  legal_name: string | null;
  slug: string | null;
  category: string | null;
  industry: string | null;
  business_type: BusinessType;
  description: string | null;
  short_description: string | null;
  website_url: string | null;
  status: ProfileStatus;
  visibility_status: "private" | "public" | "unlisted";
  created_at: string;
  updated_at: string;
};

const COMPANY_NAV = [
  { id: "all", label: "All companies", icon: Building2 },
  { id: "active", label: "Active", icon: Globe },
  { id: "draft", label: "Drafts", icon: FileText },
] satisfies { id: CompanyFilter; label: string; icon: typeof Building2 }[];

const BUSINESS_TYPE_OPTIONS: { value: BusinessType; label: string }[] = [
  { value: "local_business", label: "Local business" },
  { value: "saas", label: "SaaS" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "hotel", label: "Hotel" },
  { value: "agency", label: "Agency" },
  { value: "creator", label: "Creator" },
  { value: "marketplace", label: "Marketplace" },
  { value: "other", label: "Other" },
];

const STATUS_OPTIONS: { value: ProfileStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
];

const STATUS_BADGES: Record<ProfileStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  draft: "bg-amber-100 text-amber-700",
  archived: "bg-slate-200 text-slate-600",
};

const AVATAR_COLORS = [
  "bg-stone-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-zinc-700",
  "bg-orange-500",
  "bg-fuchsia-500",
  "bg-sky-500",
  "bg-slate-400",
  "bg-indigo-500",
  "bg-rose-400",
  "bg-amber-700",
  "bg-teal-500",
  "bg-pink-600",
];

const EMPTY_FORM = {
  name: "",
  legal_name: "",
  category: "",
  industry: "",
  website_url: "",
  short_description: "",
  business_type: "other" as BusinessType,
  status: "draft" as ProfileStatus,
};

function initialOf(s: string) {
  return s.trim().charAt(0).toUpperCase() || "?";
}

function avatarColor(id: string) {
  const total = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[total % AVATAR_COLORS.length];
}

function businessTypeLabel(type: BusinessType) {
  return BUSINESS_TYPE_OPTIONS.find((option) => option.value === type)?.label ?? "Other";
}

function buildBusinessesPath(filter: CompanyFilter, query: string) {
  const params = new URLSearchParams({
    sort: "updated_at",
    direction: "desc",
    limit: "50",
    offset: "0",
  });
  if (query.trim()) params.set("q", query.trim());
  if (filter !== "all") params.set("status", filter);
  return `/api/v1/business?${params.toString()}`;
}

function CompanyPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState<CompanyFilter>("all");
  const [businesses, setBusinesses] = useState<BusinessProfileResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mutating, setMutating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BusinessProfileResponse | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const activeTitle = useMemo(() => {
    if (filter === "active") return "Active";
    if (filter === "draft") return "Drafts";
    if (filter === "archived") return "Archived";
    return "All companies";
  }, [filter]);

  const handleApiError = useCallback(
    (err: unknown, fallback = "Business request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  const loadBusinesses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const page = await apiRequest<Page<BusinessProfileResponse>>(
        buildBusinessesPath(filter, query),
      );
      setBusinesses(page.items);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [filter, handleApiError, query]);

  useEffect(() => {
    void loadBusinesses();
  }, [loadBusinesses]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (business: BusinessProfileResponse) => {
    setEditing(business);
    setForm({
      name: business.name,
      legal_name: business.legal_name ?? "",
      category: business.category ?? "",
      industry: business.industry ?? "",
      website_url: business.website_url ?? "",
      short_description: business.short_description ?? "",
      business_type: business.business_type,
      status: business.status === "archived" ? "draft" : business.status,
    });
    setDialogOpen(true);
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) return;
    setMutating(true);
    setError("");
    const payload = {
      name,
      legal_name: form.legal_name.trim() || null,
      category: form.category.trim() || null,
      industry: form.industry.trim() || null,
      website_url: form.website_url.trim() || null,
      short_description: form.short_description.trim() || null,
      business_type: form.business_type,
      status: form.status,
    };
    try {
      if (editing) {
        await apiRequest<BusinessProfileResponse>(`/api/v1/business/${editing.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest<BusinessProfileResponse>("/api/v1/business", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setDialogOpen(false);
      setEditing(null);
      setForm(EMPTY_FORM);
      await loadBusinesses();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const updateStatus = async (business: BusinessProfileResponse, status: ProfileStatus) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<BusinessProfileResponse>(`/api/v1/business/${business.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      await loadBusinesses();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const archiveBusiness = async (business: BusinessProfileResponse) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<void>(`/api/v1/business/${business.id}`, { method: "DELETE" });
      await loadBusinesses();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const emptyText = query
    ? `No companies match "${query}"`
    : `No ${activeTitle.toLowerCase()} yet`;

  const searchField = (
    <div className="relative flex h-9 w-full items-center">
      <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
      <Input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search companies"
        className="h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200"
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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 shadow-sm">
              <Building2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Company</span>
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
          <AccountMenu />
        </div>
      </header>

      {searchOpen && <div className="px-4 pb-3 md:hidden">{searchField}</div>}

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <Button
              className="mb-4 h-14 w-[180px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg"
              disabled={mutating}
              onClick={openCreate}
            >
              <Plus className="mr-1 h-5 w-5" /> Create company
            </Button>

            <nav className="space-y-1">
              {COMPANY_NAV.map((n) => {
                const active = filter === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => setFilter(n.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <n.icon className="h-5 w-5 text-foreground/70" />
                    <span className="flex-1 truncate text-left">{n.label}</span>
                  </button>
                );
              })}

              <div className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Manage
              </div>
              <button
                onClick={() => setFilter("archived")}
                className={cn(
                  "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                  filter === "archived"
                    ? "bg-sky-100 text-sky-900"
                    : "text-foreground/80 hover:bg-white/60",
                )}
              >
                <Archive className="h-5 w-5 text-foreground/70" />
                <span className="flex-1 truncate text-left">Archived</span>
              </button>
            </nav>
          </aside>
        )}

        <main
          className={cn(
            "min-w-0 flex-1 px-4 pb-16 md:pr-6",
            sidebarOpen ? "md:pl-0" : "md:pl-6",
          )}
        >
          <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-2xl font-normal tracking-tight">{activeTitle}</h1>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="More">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {error && (
              <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-destructive/20 bg-white px-4 py-3 text-sm text-destructive shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <span>{error}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  onClick={() => loadBusinesses()}
                >
                  Retry
                </Button>
              </div>
            )}

            <div className="hidden grid-cols-[1.2fr_1fr_1fr_100px_72px] items-center gap-4 border-b border-black/5 px-2 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
              <div>Name</div>
              <div>Type</div>
              <div>Website</div>
              <div>Status</div>
              <div />
            </div>

            {loading && (
              <div className="grid gap-2 py-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-16 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" />
                ))}
              </div>
            )}

            {!loading && businesses.length > 0 && (
              <ul>
                {businesses.map((b) => (
                  <li
                    key={b.id}
                    className="group grid grid-cols-[1fr_auto] gap-3 rounded-xl border-b border-black/5 px-2 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)] md:grid-cols-[1.2fr_1fr_1fr_100px_72px] md:items-center md:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-medium text-white",
                          avatarColor(b.id),
                        )}
                      >
                        {initialOf(b.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium">{b.name}</div>
                        {(b.category || b.industry) && (
                          <div className="truncate text-xs text-muted-foreground">
                            {[b.category, b.industry].filter(Boolean).join(" · ")}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-span-2 flex min-w-0 items-center gap-2 text-foreground/80 md:col-span-1">
                      <Tag className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{businessTypeLabel(b.business_type)}</span>
                    </div>
                    <div className="col-span-2 flex min-w-0 items-center gap-2 text-muted-foreground md:col-span-1">
                      {b.website_url ? (
                        <>
                          <Globe className="h-3.5 w-3.5 shrink-0" />
                          <a
                            href={b.website_url}
                            target="_blank"
                            rel="noreferrer"
                            className="truncate hover:text-sky-700 hover:underline"
                          >
                            {b.website_url.replace(/^https?:\/\//, "")}
                          </a>
                        </>
                      ) : (
                        <span className="text-muted-foreground/60">-</span>
                      )}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                          STATUS_BADGES[b.status],
                        )}
                      >
                        {b.status}
                      </span>
                    </div>
                    <div className="row-start-1 flex items-center justify-end gap-1 md:row-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        aria-label="Edit"
                        disabled={mutating}
                        onClick={() => openEdit(b)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            aria-label="More"
                            disabled={mutating}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-xl">
                          {b.status === "archived" ? (
                            <DropdownMenuItem onSelect={() => updateStatus(b, "active")}>
                              <RotateCcw className="mr-2 h-4 w-4" /> Restore
                            </DropdownMenuItem>
                          ) : (
                            <>
                              {b.status === "draft" ? (
                                <DropdownMenuItem onSelect={() => updateStatus(b, "active")}>
                                  <Globe className="mr-2 h-4 w-4" /> Activate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onSelect={() => updateStatus(b, "draft")}>
                                  <FileText className="mr-2 h-4 w-4" /> Move to draft
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onSelect={() => archiveBusiness(b)}
                              >
                                <Archive className="mr-2 h-4 w-4" /> Archive
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {!loading && businesses.length === 0 && (
              <div className="grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center">
                {mutating ? (
                  <Loader2 className="mb-3 h-8 w-8 animate-spin text-muted-foreground" />
                ) : (
                  <Building2 className="mb-3 h-8 w-8 text-muted-foreground" />
                )}
                <p className="text-sm font-medium">{emptyText}</p>
                <p className="text-xs text-muted-foreground">
                  Try a different keyword or create a company.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-2xl">
          <form onSubmit={submitForm}>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit company" : "Create company"}</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company-name">Name</Label>
                <Input
                  id="company-name"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-legal-name">Legal name</Label>
                <Input
                  id="company-legal-name"
                  value={form.legal_name}
                  onChange={(e) => setForm((prev) => ({ ...prev, legal_name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="company-category">Category</Label>
                  <Input
                    id="company-category"
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company-industry">Industry</Label>
                  <Input
                    id="company-industry"
                    value={form.industry}
                    onChange={(e) => setForm((prev) => ({ ...prev, industry: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-website">Website</Label>
                <Input
                  id="company-website"
                  type="url"
                  placeholder="https://example.com"
                  value={form.website_url}
                  onChange={(e) => setForm((prev) => ({ ...prev, website_url: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="company-description">Short description</Label>
                <Input
                  id="company-description"
                  value={form.short_description}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, short_description: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Type</Label>
                  <Select
                    value={form.business_type}
                    onValueChange={(value: BusinessType) =>
                      setForm((prev) => ({ ...prev, business_type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BUSINESS_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(value: ProfileStatus) =>
                      setForm((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutating || !form.name.trim()}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editing ? "Save" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
