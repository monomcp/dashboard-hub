import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CmGvlKcs.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem, d as DropdownMenuSeparator } from "./dropdown-menu-DmTKMmfc.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-3sxYre98.mjs";
import { A as ApiError, c as clearAuthTokens, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { M as Menu, aa as User, a as Search, c as CircleQuestionMark, d as Settings, N as Plus, T as Tag, ab as Upload, ac as Clock, r as Inbox, ad as Wrench, y as Trash2, k as EllipsisVertical, f as Mail, P as Phone, a2 as RotateCcw, v as Star, ae as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "./popover-ColJhc-i.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/tailwind-merge.mjs";
const CONTACT_NAV = [{
  id: "contacts",
  label: "Contacts",
  icon: User
}, {
  id: "frequent",
  label: "Frequent",
  icon: Clock
}, {
  id: "other",
  label: "Other contacts",
  icon: Inbox
}];
const FIX_NAV = [{
  id: "merge",
  label: "Merge and fix",
  icon: Wrench,
  disabled: true
}, {
  id: "import",
  label: "Import",
  icon: Upload,
  disabled: true
}, {
  id: "bin",
  label: "Bin",
  icon: Trash2
}];
const LIFE_CYCLE_OPTIONS = [{
  value: "contact",
  label: "Contact"
}, {
  value: "lead",
  label: "Lead"
}, {
  value: "customer",
  label: "Customer"
}, {
  value: "partner",
  label: "Partner"
}, {
  value: "other",
  label: "Other"
}];
const AVATAR_COLORS = ["bg-stone-500", "bg-violet-500", "bg-purple-500", "bg-zinc-700", "bg-orange-500", "bg-fuchsia-500", "bg-sky-500", "bg-slate-400", "bg-indigo-500", "bg-rose-400", "bg-amber-700", "bg-teal-500", "bg-pink-600"];
function initialOf(s) {
  return s.trim().charAt(0).toUpperCase() || "?";
}
function avatarColor(id) {
  const total = [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[total % AVATAR_COLORS.length];
}
function contactName(contact) {
  return contact.display_name || contact.primary_email || "Unnamed contact";
}
function buildContactsPath(filter, query) {
  const params = new URLSearchParams({
    sort: "updated_at",
    direction: "desc",
    limit: "50",
    offset: "0"
  });
  if (query.trim()) params.set("q", query.trim());
  if (filter === "frequent") params.set("starred", "true");
  if (filter === "other") params.set("lifecycle_status", "other");
  if (filter === "bin") params.set("deleted", "true");
  return `/api/v1/crm/contacts?${params.toString()}`;
}
function ContactsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = reactExports.useState("");
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("other");
  const [contacts, setContacts] = reactExports.useState([]);
  const [labels, setLabels] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [mutating, setMutating] = reactExports.useState(false);
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    display_name: "",
    email: "",
    phone: "",
    company_name: "",
    lifecycle_status: "contact"
  });
  const activeTitle = reactExports.useMemo(() => {
    if (filter === "contacts") return "Contacts";
    if (filter === "frequent") return "Frequent";
    if (filter === "bin") return "Bin";
    return "Other contacts";
  }, [filter]);
  const handleApiError = reactExports.useCallback((err, fallback = "CRM request failed") => {
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
  const loadContacts = reactExports.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [contactPage, labelRows] = await Promise.all([apiRequest(buildContactsPath(filter, query)), apiRequest("/api/v1/crm/labels")]);
      setContacts(contactPage.items);
      setLabels(labelRows);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [filter, handleApiError, query]);
  reactExports.useEffect(() => {
    void loadContacts();
  }, [loadContacts]);
  const submitCreate = async (event) => {
    event.preventDefault();
    const name = form.display_name.trim();
    const email = form.email.trim();
    if (!name && !email) return;
    setMutating(true);
    setError("");
    try {
      await apiRequest("/api/v1/crm/contacts", {
        method: "POST",
        body: JSON.stringify({
          display_name: name || null,
          email: email || null,
          phone: form.phone.trim() || null,
          company_name: form.company_name.trim() || null,
          lifecycle_status: form.lifecycle_status
        })
      });
      setCreateOpen(false);
      setForm({
        display_name: "",
        email: "",
        phone: "",
        company_name: "",
        lifecycle_status: "contact"
      });
      await loadContacts();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const updateContact = async (contact, payload) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest(`/api/v1/crm/contacts/${contact.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      await loadContacts();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const deleteContact = async (contact) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest(`/api/v1/crm/contacts/${contact.id}`, {
        method: "DELETE"
      });
      await loadContacts();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const restoreContact = async (contact) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest(`/api/v1/crm/contacts/${contact.id}/restore`, {
        method: "POST"
      });
      await loadContacts();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const emptyText = query ? `No contacts match "${query}"` : `No ${activeTitle.toLowerCase()} yet`;
  const searchField = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 w-full items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search contacts", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Contacts" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mb-4 h-14 w-[160px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg", disabled: mutating, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-5 w-5" }),
            " Create contact"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: "w-64 rounded-2xl p-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", onSelect: () => setCreateOpen(true), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
              " Create a contact"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", disabled: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-4 w-4" }),
              " Create multiple contacts"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", disabled: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-emerald-500" }),
              " Import"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-1", children: [
          CONTACT_NAV.map((n) => {
            const active = filter === n.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(n.id), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-5 w-5 text-foreground/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: n.label })
            ] }, n.id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Fix and manage" }),
          FIX_NAV.map((n) => {
            const active = n.id === "bin" && filter === "bin";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: "disabled" in n && n.disabled, onClick: () => n.id === "bin" && setFilter("bin"), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition disabled:opacity-50", active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-5 w-5 text-foreground/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: n.label })
            ] }, n.id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Labels" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: true, className: "grid h-6 w-6 place-items-center rounded-full opacity-50", "aria-label": "Add label", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
          ] }),
          labels.slice(0, 6).map((label) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 text-sm text-foreground/75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full", style: {
              backgroundColor: label.color || "#94a3b8"
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate", children: label.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label.contact_count })
          ] }, label.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight", children: activeTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "More", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-col gap-3 rounded-2xl border border-destructive/20 bg-white px-4 py-3 text-sm text-destructive shadow-sm sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "rounded-lg", onClick: () => loadContacts(), children: "Retry" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden grid-cols-[1fr_1.2fr_1fr_72px] items-center gap-4 border-b border-black/5 px-2 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Phone number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 py-3", children: [1, 2, 3, 4].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" }, item)) }),
        !loading && contacts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: contacts.map((c) => {
          const name = contactName(c);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group grid grid-cols-[1fr_auto] gap-3 rounded-xl border-b border-black/5 px-2 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)] md:grid-cols-[1fr_1.2fr_1fr_72px] md:items-center md:gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-medium text-white", avatarColor(c.id)), children: initialOf(name) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-medium", children: name }),
                c.primary_company && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground", children: c.primary_company.name })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 flex min-w-0 items-center gap-2 text-foreground/80 md:col-span-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.primary_email || "No email" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-2 flex min-w-0 items-center gap-2 text-muted-foreground md:col-span-1", children: c.primary_phone ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.primary_phone })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "-" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "row-start-1 flex items-center justify-end gap-1 md:row-auto", children: [
              filter === "bin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", "aria-label": "Restore", disabled: mutating, onClick: () => restoreContact(c), children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", "aria-label": c.is_starred ? "Unstar" : "Star", disabled: mutating, onClick: () => updateContact(c, {
                is_starred: !c.is_starred
              }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: cn("h-4 w-4", c.is_starred && "fill-amber-400 text-amber-400") }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", "aria-label": "More", disabled: mutating, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", className: "w-44 rounded-xl", children: filter === "bin" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onSelect: () => restoreContact(c), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "mr-2 h-4 w-4" }),
                  " Restore"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onSelect: () => updateContact(c, {
                    is_archived: true
                  }), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "mr-2 h-4 w-4" }),
                    " Archive"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-destructive", onSelect: () => deleteContact(c), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
                    " Move to bin"
                  ] })
                ] }) })
              ] })
            ] })
          ] }, c.id);
        }) }),
        !loading && contacts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center", children: [
          mutating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mb-3 h-8 w-8 animate-spin text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mb-3 h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: emptyText }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Try a different keyword or create a contact." })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitCreate, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create contact" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-name", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "contact-name", value: form.display_name, onChange: (e) => setForm((prev) => ({
            ...prev,
            display_name: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-email", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "contact-email", type: "email", value: form.email, onChange: (e) => setForm((prev) => ({
            ...prev,
            email: e.target.value
          })) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-phone", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "contact-phone", value: form.phone, onChange: (e) => setForm((prev) => ({
              ...prev,
              phone: e.target.value
            })) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contact-company", children: "Company" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "contact-company", value: form.company_name, onChange: (e) => setForm((prev) => ({
              ...prev,
              company_name: e.target.value
            })) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.lifecycle_status, onValueChange: (value) => setForm((prev) => ({
            ...prev,
            lifecycle_status: value
          })), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LIFE_CYCLE_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setCreateOpen(false), disabled: mutating, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: mutating || !form.display_name.trim() && !form.email.trim(), children: [
          mutating && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
          "Create"
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  ContactsPage as component
};
