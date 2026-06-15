import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button, c as cn } from "./button-BXrfXN_b.mjs";
import { I as Input } from "./input-DwaGuH4D.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-BupjB1aY.mjs";
import { L as Label } from "./label-Brw405F4.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Dn_c42EA.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem, d as DropdownMenuSeparator } from "./dropdown-menu-IlWUHGwh.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-C0NsdiGi.mjs";
import { A as ApiError, c as clearAuthTokens, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { M as Menu, ac as Building2, f as Search, g as CircleQuestionMark, h as Settings, z as Plus, G as Globe, K as FileText, u as Archive, i as EllipsisVertical, T as Tag, o as Pencil, $ as RotateCcw, ab as LoaderCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-popover.mjs";
const COMPANY_NAV = [{
  id: "all",
  label: "All companies",
  icon: Building2
}, {
  id: "active",
  label: "Active",
  icon: Globe
}, {
  id: "draft",
  label: "Drafts",
  icon: FileText
}];
const BUSINESS_TYPE_OPTIONS = [{
  value: "local_business",
  label: "Local business"
}, {
  value: "saas",
  label: "SaaS"
}, {
  value: "ecommerce",
  label: "E-commerce"
}, {
  value: "hotel",
  label: "Hotel"
}, {
  value: "agency",
  label: "Agency"
}, {
  value: "creator",
  label: "Creator"
}, {
  value: "marketplace",
  label: "Marketplace"
}, {
  value: "other",
  label: "Other"
}];
const STATUS_OPTIONS = [{
  value: "draft",
  label: "Draft"
}, {
  value: "active",
  label: "Active"
}];
const STATUS_BADGES = {
  active: "bg-emerald-100 text-emerald-700",
  draft: "bg-amber-100 text-amber-700",
  archived: "bg-slate-200 text-slate-600"
};
const AVATAR_COLORS = ["bg-stone-500", "bg-violet-500", "bg-purple-500", "bg-zinc-700", "bg-orange-500", "bg-fuchsia-500", "bg-sky-500", "bg-slate-400", "bg-indigo-500", "bg-rose-400", "bg-amber-700", "bg-teal-500", "bg-pink-600"];
const EMPTY_FORM = {
  name: "",
  legal_name: "",
  category: "",
  industry: "",
  website_url: "",
  short_description: "",
  business_type: "other",
  status: "draft"
};
function initialOf(s) {
  return s.trim().charAt(0).toUpperCase() || "?";
}
function avatarColor(id) {
  const total = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[total % AVATAR_COLORS.length];
}
function businessTypeLabel(type) {
  return BUSINESS_TYPE_OPTIONS.find((option) => option.value === type)?.label ?? "Other";
}
function buildBusinessesPath(filter, query) {
  const params = new URLSearchParams({
    sort: "updated_at",
    direction: "desc",
    limit: "50",
    offset: "0"
  });
  if (query.trim()) params.set("q", query.trim());
  if (filter !== "all") params.set("status", filter);
  return `/api/v1/business?${params.toString()}`;
}
function CompanyPage() {
  const navigate = useNavigate();
  const [query, setQuery] = reactExports.useState("");
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("all");
  const [businesses, setBusinesses] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [mutating, setMutating] = reactExports.useState(false);
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const activeTitle = reactExports.useMemo(() => {
    if (filter === "active") return "Active";
    if (filter === "draft") return "Drafts";
    if (filter === "archived") return "Archived";
    return "All companies";
  }, [filter]);
  const handleApiError = reactExports.useCallback((err, fallback = "Business request failed") => {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      clearAuthTokens();
      void navigate({
        to: "/login",
        replace: true
      });
      return;
    }
    setError(err instanceof Error ? err.message : fallback);
  }, [navigate]);
  const loadBusinesses = reactExports.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const page = await apiRequest(buildBusinessesPath(filter, query));
      setBusinesses(page.items);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [filter, handleApiError, query]);
  reactExports.useEffect(() => {
    void loadBusinesses();
  }, [loadBusinesses]);
  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };
  const openEdit = (business) => {
    setEditing(business);
    setForm({
      name: business.name,
      legal_name: business.legal_name ?? "",
      category: business.category ?? "",
      industry: business.industry ?? "",
      website_url: business.website_url ?? "",
      short_description: business.short_description ?? "",
      business_type: business.business_type,
      status: business.status === "archived" ? "draft" : business.status
    });
    setDialogOpen(true);
  };
  const submitForm = async (event) => {
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
      status: form.status
    };
    try {
      if (editing) {
        await apiRequest(`/api/v1/business/${editing.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload)
        });
      } else {
        await apiRequest("/api/v1/business", {
          method: "POST",
          body: JSON.stringify(payload)
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
  const updateStatus = async (business, status) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest(`/api/v1/business/${business.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status
        })
      });
      await loadBusinesses();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const archiveBusiness = async (business) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest(`/api/v1/business/${business.id}`, {
        method: "DELETE"
      });
      await loadBusinesses();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const emptyText = query ? `No companies match "${query}"` : `No ${activeTitle.toLowerCase()} yet`;
  const searchField = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 w-full items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search companies", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Company" })
        ] })
      ] }),
      searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden min-w-0 max-w-2xl flex-1 md:block", children: searchField }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Search", onClick: () => setSearchOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 md:hidden", children: searchField }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-[260px] shrink-0 px-3 md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mb-4 h-14 w-[180px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg", disabled: mutating, onClick: openCreate, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-5 w-5" }),
          " Create company"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-1", children: [
          COMPANY_NAV.map((n) => {
            const active = filter === n.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(n.id), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-5 w-5 text-foreground/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: n.label })
            ] }, n.id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Manage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter("archived"), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", filter === "archived" ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-5 w-5 text-foreground/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: "Archived" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight", children: activeTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "More", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-col gap-3 rounded-2xl border border-destructive/20 bg-white px-4 py-3 text-sm text-destructive shadow-sm sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "rounded-lg", onClick: () => loadBusinesses(), children: "Retry" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden grid-cols-[1.2fr_1fr_1fr_100px_72px] items-center gap-4 border-b border-black/5 px-2 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Website" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 py-3", children: [1, 2, 3, 4].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" }, item)) }),
        !loading && businesses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: businesses.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group grid grid-cols-[1fr_auto] gap-3 rounded-xl border-b border-black/5 px-2 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)] md:grid-cols-[1.2fr_1fr_1fr_100px_72px] md:items-center md:gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-medium text-white", avatarColor(b.id)), children: initialOf(b.name) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-medium", children: b.name }),
              (b.category || b.industry) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground", children: [b.category, b.industry].filter(Boolean).join(" · ") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex min-w-0 items-center gap-2 text-foreground/80 md:col-span-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: businessTypeLabel(b.business_type) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 flex min-w-0 items-center gap-2 text-muted-foreground md:col-span-1", children: b.website_url ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: b.website_url, target: "_blank", rel: "noreferrer", className: "truncate hover:text-sky-700 hover:underline", children: b.website_url.replace(/^https?:\/\//, "") })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "-" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 md:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", STATUS_BADGES[b.status]), children: b.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-start-1 flex items-center justify-end gap-1 md:row-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", "aria-label": "Edit", disabled: mutating, onClick: () => openEdit(b), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", "aria-label": "More", disabled: mutating, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", className: "w-44 rounded-xl", children: b.status === "archived" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onSelect: () => updateStatus(b, "active"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-2 h-4 w-4" }),
                " Restore"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                b.status === "draft" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onSelect: () => updateStatus(b, "active"), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "mr-2 h-4 w-4" }),
                  " Activate"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onSelect: () => updateStatus(b, "draft"), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-4 w-4" }),
                  " Move to draft"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-destructive", onSelect: () => archiveBusiness(b), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "mr-2 h-4 w-4" }),
                  " Archive"
                ] })
              ] }) })
            ] })
          ] })
        ] }, b.id)) }),
        !loading && businesses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center", children: [
          mutating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mb-3 h-8 w-8 animate-spin text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "mb-3 h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: emptyText }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Try a different keyword or create a company." })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitForm, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editing ? "Edit company" : "Create company" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-name", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "company-name", value: form.name, onChange: (e) => setForm((prev) => ({
            ...prev,
            name: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-legal-name", children: "Legal name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "company-legal-name", value: form.legal_name, onChange: (e) => setForm((prev) => ({
            ...prev,
            legal_name: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-category", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "company-category", value: form.category, onChange: (e) => setForm((prev) => ({
              ...prev,
              category: e.target.value
            })) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-industry", children: "Industry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "company-industry", value: form.industry, onChange: (e) => setForm((prev) => ({
              ...prev,
              industry: e.target.value
            })) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-website", children: "Website" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "company-website", type: "url", placeholder: "https://example.com", value: form.website_url, onChange: (e) => setForm((prev) => ({
            ...prev,
            website_url: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "company-description", children: "Short description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "company-description", value: form.short_description, onChange: (e) => setForm((prev) => ({
            ...prev,
            short_description: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.business_type, onValueChange: (value) => setForm((prev) => ({
              ...prev,
              business_type: value
            })), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BUSINESS_TYPE_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.status, onValueChange: (value) => setForm((prev) => ({
              ...prev,
              status: value
            })), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: STATUS_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setDialogOpen(false), disabled: mutating, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !form.name.trim(), children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          editing ? "Save" : "Create"
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  CompanyPage as component
};
