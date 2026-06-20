import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Menu,
  Search,
  HelpCircle,
  Plus,
  Settings,
  User,
  Clock,
  Inbox,
  Wrench,
  Upload,
  Trash2,
  Tag,
  MoreVertical,
  Mail,
  Phone,
  Star,
  Loader2,
  RotateCcw,
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

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts — CRM" },
      { name: "description", content: "Manage your contacts, leads and customer relationships." },
      { property: "og:title", content: "Contacts — CRM" },
      {
        property: "og:description",
        content: "Manage your contacts, leads and customer relationships.",
      },
    ],
    links: [{ rel: "canonical", href: "/contacts" }],
  }),
  component: ContactsPage,
});

type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

type LifecycleStatus =
  | "other"
  | "contact"
  | "lead"
  | "customer"
  | "partner"
  | "archived"
  | "blocked";
type ContactFilter = "contacts" | "frequent" | "other" | "bin";

type CrmLabelResponse = {
  id: string;
  name: string;
  slug: string;
  color: string | null;
  contact_count: number;
  created_at: string;
};

type CrmContactResponse = {
  id: string;
  display_name: string | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  lifecycle_status: LifecycleStatus;
  is_starred: boolean;
  is_archived: boolean;
  is_deleted: boolean;
  primary_email: string | null;
  primary_phone: string | null;
  primary_company: {
    id: string;
    name: string;
    domain: string | null;
    website_url: string | null;
  } | null;
  labels: CrmLabelResponse[];
  created_at: string;
  updated_at: string;
};

const CONTACT_NAV = [
  { id: "contacts", label: "Contacts", icon: User },
  { id: "frequent", label: "Frequent", icon: Clock },
  { id: "other", label: "Other contacts", icon: Inbox },
] satisfies { id: ContactFilter; label: string; icon: typeof User }[];

const FIX_NAV = [
  { id: "merge", label: "Merge and fix", icon: Wrench, disabled: true },
  { id: "import", label: "Import", icon: Upload, disabled: true },
  { id: "bin", label: "Bin", icon: Trash2 },
] as const;

const LIFE_CYCLE_OPTIONS: { value: LifecycleStatus; label: string }[] = [
  { value: "contact", label: "Contact" },
  { value: "lead", label: "Lead" },
  { value: "customer", label: "Customer" },
  { value: "partner", label: "Partner" },
  { value: "other", label: "Other" },
];

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

function initialOf(s: string) {
  return s.trim().charAt(0).toUpperCase() || "?";
}

function avatarColor(id: string) {
  const total = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[total % AVATAR_COLORS.length];
}

function contactName(contact: CrmContactResponse) {
  return contact.display_name || contact.primary_email || "Unnamed contact";
}

function buildContactsPath(filter: ContactFilter, query: string) {
  const params = new URLSearchParams({
    sort: "updated_at",
    direction: "desc",
    limit: "50",
    offset: "0",
  });
  if (query.trim()) params.set("q", query.trim());
  if (filter === "frequent") params.set("starred", "true");
  if (filter === "other") params.set("lifecycle_status", "other");
  if (filter === "bin") params.set("deleted", "true");
  return `/api/v1/crm/contacts?${params.toString()}`;
}

function ContactsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filter, setFilter] = useState<ContactFilter>("other");
  const [error, setError] = useState("");
  const [mutating, setMutating] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({
    display_name: "",
    email: "",
    phone: "",
    company_name: "",
    lifecycle_status: "contact" as LifecycleStatus,
  });

  const activeTitle = useMemo(() => {
    if (filter === "contacts") return "Contacts";
    if (filter === "frequent") return "Frequent";
    if (filter === "bin") return "Bin";
    return "Other contacts";
  }, [filter]);

  const handleApiError = useCallback(
    (err: unknown, fallback = "CRM request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), 250);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const contactsQuery = useQuery({
    queryKey: ["crm", "contacts", filter, debouncedQuery.trim()],
    queryFn: () => apiRequest<Page<CrmContactResponse>>(buildContactsPath(filter, debouncedQuery)),
    staleTime: 30 * 1000,
  });
  const labelsQuery = useQuery({
    queryKey: ["crm", "labels"],
    queryFn: () => apiRequest<CrmLabelResponse[]>("/api/v1/crm/labels"),
    enabled: sidebarOpen,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (contactsQuery.error) handleApiError(contactsQuery.error);
  }, [contactsQuery.error, handleApiError]);
  useEffect(() => {
    if (labelsQuery.error) handleApiError(labelsQuery.error);
  }, [labelsQuery.error, handleApiError]);

  const contacts = contactsQuery.data?.items ?? [];
  const labels = labelsQuery.data ?? [];
  const loading = contactsQuery.isLoading;

  const refreshContacts = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["crm", "contacts"] });
  }, [queryClient]);

  const submitCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.display_name.trim();
    const email = form.email.trim();
    if (!name && !email) return;
    setMutating(true);
    setError("");
    try {
      await apiRequest<CrmContactResponse>("/api/v1/crm/contacts", {
        method: "POST",
        body: JSON.stringify({
          display_name: name || null,
          email: email || null,
          phone: form.phone.trim() || null,
          company_name: form.company_name.trim() || null,
          lifecycle_status: form.lifecycle_status,
        }),
      });
      setCreateOpen(false);
      setForm({
        display_name: "",
        email: "",
        phone: "",
        company_name: "",
        lifecycle_status: "contact",
      });
      await refreshContacts();
      await queryClient.invalidateQueries({ queryKey: ["crm", "labels"] });
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const updateContact = async (
    contact: CrmContactResponse,
    payload: Partial<CrmContactResponse>,
  ) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<CrmContactResponse>(`/api/v1/crm/contacts/${contact.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      await refreshContacts();
      await queryClient.invalidateQueries({ queryKey: ["crm", "labels"] });
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const deleteContact = async (contact: CrmContactResponse) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<void>(`/api/v1/crm/contacts/${contact.id}`, { method: "DELETE" });
      await refreshContacts();
      await queryClient.invalidateQueries({ queryKey: ["crm", "labels"] });
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const restoreContact = async (contact: CrmContactResponse) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<CrmContactResponse>(`/api/v1/crm/contacts/${contact.id}/restore`, {
        method: "POST",
      });
      await refreshContacts();
      await queryClient.invalidateQueries({ queryKey: ["crm", "labels"] });
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const emptyText = query ? `No contacts match "${query}"` : `No ${activeTitle.toLowerCase()} yet`;

  const searchField = (
    <div className="relative flex h-9 w-full items-center">
      <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
      <Input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search contacts"
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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-sm">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Contacts</span>
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="mb-4 h-14 w-[160px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg"
                  disabled={mutating}
                >
                  <Plus className="mr-1 h-5 w-5" /> Create contact
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 rounded-2xl p-1.5">
                <DropdownMenuItem
                  className="gap-3 rounded-lg py-2.5"
                  onSelect={() => setCreateOpen(true)}
                >
                  <User className="h-4 w-4" /> Create a contact
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 rounded-lg py-2.5" disabled>
                  <Tag className="h-4 w-4" /> Create multiple contacts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-3 rounded-lg py-2.5" disabled>
                  <Upload className="h-4 w-4 text-emerald-500" /> Import
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <nav className="space-y-1">
              {CONTACT_NAV.map((n) => {
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
                Fix and manage
              </div>
              {FIX_NAV.map((n) => {
                const active = n.id === "bin" && filter === "bin";
                return (
                  <button
                    key={n.id}
                    disabled={"disabled" in n && n.disabled}
                    onClick={() => n.id === "bin" && setFilter("bin")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition disabled:opacity-50",
                      active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <n.icon className="h-5 w-5 text-foreground/70" />
                    <span className="flex-1 truncate text-left">{n.label}</span>
                  </button>
                );
              })}

              <div className="flex items-center justify-between px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <span>Labels</span>
                <button
                  disabled
                  className="grid h-6 w-6 place-items-center rounded-full opacity-50"
                  aria-label="Add label"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              {labels.slice(0, 6).map((label) => (
                <div
                  key={label.id}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground/75"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: label.color || "#94a3b8" }}
                  />
                  <span className="min-w-0 flex-1 truncate">{label.name}</span>
                  <span className="text-xs text-muted-foreground">{label.contact_count}</span>
                </div>
              ))}
            </nav>
          </aside>
        )}

        <main
          className={cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6")}
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
                  onClick={() => {
                    void contactsQuery.refetch();
                    void labelsQuery.refetch();
                  }}
                >
                  Retry
                </Button>
              </div>
            )}

            <div className="hidden grid-cols-[1fr_1.2fr_1fr_72px] items-center gap-4 border-b border-black/5 px-2 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
              <div>Name</div>
              <div>Email</div>
              <div>Phone number</div>
              <div />
            </div>

            {loading && (
              <div className="grid gap-2 py-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="h-16 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" />
                ))}
              </div>
            )}

            {!loading && contacts.length > 0 && (
              <ul>
                {contacts.map((c) => {
                  const name = contactName(c);
                  return (
                    <li
                      key={c.id}
                      className="group grid grid-cols-[1fr_auto] gap-3 rounded-xl border-b border-black/5 px-2 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)] md:grid-cols-[1fr_1.2fr_1fr_72px] md:items-center md:gap-4"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={cn(
                            "grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-medium text-white",
                            avatarColor(c.id),
                          )}
                        >
                          {initialOf(name)}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate font-medium">{name}</div>
                          {c.primary_company && (
                            <div className="truncate text-xs text-muted-foreground">
                              {c.primary_company.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-span-2 flex min-w-0 items-center gap-2 text-foreground/80 md:col-span-1">
                        <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        <span className="truncate">{c.primary_email || "No email"}</span>
                      </div>
                      <div className="col-span-2 flex min-w-0 items-center gap-2 text-muted-foreground md:col-span-1">
                        {c.primary_phone ? (
                          <>
                            <Phone className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{c.primary_phone}</span>
                          </>
                        ) : (
                          <span className="text-muted-foreground/60">-</span>
                        )}
                      </div>
                      <div className="row-start-1 flex items-center justify-end gap-1 md:row-auto">
                        {filter === "bin" ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            aria-label="Restore"
                            disabled={mutating}
                            onClick={() => restoreContact(c)}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            aria-label={c.is_starred ? "Unstar" : "Star"}
                            disabled={mutating}
                            onClick={() => updateContact(c, { is_starred: !c.is_starred })}
                          >
                            <Star
                              className={cn(
                                "h-4 w-4",
                                c.is_starred && "fill-amber-400 text-amber-400",
                              )}
                            />
                          </Button>
                        )}
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
                            {filter === "bin" ? (
                              <DropdownMenuItem onSelect={() => restoreContact(c)}>
                                <RotateCcw className="mr-2 h-4 w-4" /> Restore
                              </DropdownMenuItem>
                            ) : (
                              <>
                                <DropdownMenuItem
                                  onSelect={() => updateContact(c, { is_archived: true })}
                                >
                                  <Inbox className="mr-2 h-4 w-4" /> Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onSelect={() => deleteContact(c)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Move to bin
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}

            {!loading && contacts.length === 0 && (
              <div className="grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center">
                {mutating ? (
                  <Loader2 className="mb-3 h-8 w-8 animate-spin text-muted-foreground" />
                ) : (
                  <Search className="mb-3 h-8 w-8 text-muted-foreground" />
                )}
                <p className="text-sm font-medium">{emptyText}</p>
                <p className="text-xs text-muted-foreground">
                  Try a different keyword or create a contact.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="rounded-2xl">
          <form onSubmit={submitCreate}>
            <DialogHeader>
              <DialogTitle>Create contact</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  value={form.display_name}
                  onChange={(e) => setForm((prev) => ({ ...prev, display_name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="contact-phone">Phone</Label>
                  <Input
                    id="contact-phone"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-company">Company</Label>
                  <Input
                    id="contact-company"
                    value={form.company_name}
                    onChange={(e) => setForm((prev) => ({ ...prev, company_name: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                  value={form.lifecycle_status}
                  onValueChange={(value: LifecycleStatus) =>
                    setForm((prev) => ({ ...prev, lifecycle_status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LIFE_CYCLE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={mutating || (!form.display_name.trim() && !form.email.trim())}
              >
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
