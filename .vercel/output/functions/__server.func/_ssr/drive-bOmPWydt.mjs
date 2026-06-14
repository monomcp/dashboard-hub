import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button, c as cn } from "./button-BXrfXN_b.mjs";
import { I as Input } from "./input-DwaGuH4D.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CUtVLkR1.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem, d as DropdownMenuSeparator } from "./dropdown-menu-IlWUHGwh.mjs";
import { L as Label } from "./label-Brw405F4.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-DmhbdlCS.mjs";
import { A as ApiError, c as clearAuthTokens, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { R as Route$a } from "./router-DkSMsB2r.mjs";
import { M as Menu, f as Search, g as CircleQuestionMark, z as Plus, J as FolderPlus, K as FileText, N as Image, b as Sparkles, O as Folder, h as Settings, v as Trash2, Q as ChevronRight, V as ArrowUpDown, W as ArrowUp, X as ArrowDown, Y as List, Z as Grid3x3, U as Users, _ as Film, i as EllipsisVertical, $ as RotateCcw, s as Star } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-popover.mjs";
const TEMPLATES = [{
  name: "Blank",
  sub: "Document",
  color: "from-sky-100 to-sky-50",
  glyph: "+"
}, {
  name: "Resume",
  sub: "Serif",
  color: "from-stone-100 to-white",
  glyph: "R"
}, {
  name: "Project proposal",
  sub: "Tropic",
  color: "from-emerald-100 to-amber-50",
  glyph: "P"
}, {
  name: "Brochure",
  sub: "Geometric",
  color: "from-rose-100 to-orange-50",
  glyph: "B"
}, {
  name: "Letter",
  sub: "Spearmint",
  color: "from-teal-100 to-emerald-50",
  glyph: "L"
}, {
  name: "Notes",
  sub: "Coral",
  color: "from-orange-100 to-rose-50",
  glyph: "N"
}];
const DRIVE_NAV = [{
  id: "my-drive",
  label: "My Drive",
  icon: Folder
}, {
  id: "starred",
  label: "Starred",
  icon: Sparkles
}, {
  id: "system",
  label: "System",
  icon: Settings
}, {
  id: "trash",
  label: "Trash",
  icon: Trash2
}];
function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}
function formatSize(bytes) {
  if (bytes === null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 102.4) / 10} KB`;
  return `${Math.round(bytes / 1024 / 102.4) / 10} MB`;
}
function kindAccent(kind) {
  if (kind === "pdf") return "bg-red-500";
  if (kind === "image") return "bg-emerald-500";
  if (kind === "video") return "bg-violet-500";
  if (kind === "other") return "bg-slate-500";
  return "bg-blue-500";
}
function KindIcon({
  kind,
  className
}) {
  const cls = cn("h-5 w-5 text-white", className);
  if (kind === "folder") return /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: cls });
  if (kind === "image") return /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: cls });
  if (kind === "video") return /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: cls });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: cls });
}
const PAGE_LIMIT = 50;
const SORT_OPTIONS = [{
  field: "name",
  label: "Name"
}, {
  field: "updated_at",
  label: "Last modified"
}, {
  field: "created_at",
  label: "Date created"
}, {
  field: "size_bytes",
  label: "Size"
}];
function compareItems(field, direction) {
  const effective = field;
  return (a, b) => {
    const pick = (item) => {
      if (effective === "size_bytes") {
        return "size_bytes" in item ? item.size_bytes ?? -1 : -1;
      }
      return item[effective];
    };
    const av = pick(a);
    const bv = pick(b);
    let cmp;
    if (typeof av === "string" && typeof bv === "string") {
      cmp = av.localeCompare(bv, void 0, {
        sensitivity: "base"
      });
    } else {
      cmp = av < bv ? -1 : av > bv ? 1 : 0;
    }
    return direction === "asc" ? cmp : -cmp;
  };
}
function buildListPath(base, filter, query, sortField, sortDirection, folderId) {
  const sort = base === "/api/v1/drive-folders" && sortField === "size_bytes" ? "name" : sortField;
  const params = new URLSearchParams({
    sort,
    direction: sortDirection,
    limit: String(PAGE_LIMIT),
    offset: "0"
  });
  if (query.trim()) params.set("q", query.trim());
  if (filter === "starred") params.set("starred", "true");
  if (filter === "trash") params.set("trashed", "true");
  if (filter === "system" && base === "/api/v1/drive-folders" && !folderId) {
    params.set("system", "true");
  }
  if ((filter === "my-drive" || filter === "system") && folderId) {
    params.set(base === "/api/v1/drive-folders" ? "parent_folder_id" : "folder_id", folderId);
  }
  return `${base}?${params.toString()}`;
}
function DrivePage() {
  const navigate = useNavigate();
  const {
    folder: folderId
  } = Route$a.useSearch();
  const [breadcrumbs, setBreadcrumbs] = reactExports.useState([]);
  const [query, setQuery] = reactExports.useState("");
  const [view, setView] = reactExports.useState("grid");
  const [filter, setFilter] = reactExports.useState("my-drive");
  const [folders, setFolders] = reactExports.useState([]);
  const [files, setFiles] = reactExports.useState([]);
  const [foldersTotal, setFoldersTotal] = reactExports.useState(0);
  const [filesTotal, setFilesTotal] = reactExports.useState(0);
  const [sortField, setSortField] = reactExports.useState("updated_at");
  const [sortDirection, setSortDirection] = reactExports.useState("desc");
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [createOpen, setCreateOpen] = reactExports.useState(null);
  const [createName, setCreateName] = reactExports.useState("");
  const [mutating, setMutating] = reactExports.useState(false);
  const handleApiError = reactExports.useCallback((err) => {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      clearAuthTokens();
      void navigate({
        to: "/login",
        replace: true
      });
      return;
    }
    setError(err instanceof Error ? err.message : "Drive request failed");
  }, [navigate]);
  const sortRef = reactExports.useRef({
    field: sortField,
    direction: sortDirection
  });
  sortRef.current = {
    field: sortField,
    direction: sortDirection
  };
  const loadDrive = reactExports.useCallback(async () => {
    setLoading(true);
    setError("");
    const {
      field,
      direction
    } = sortRef.current;
    try {
      const [folderPage, filePage] = await Promise.all([apiRequest(buildListPath("/api/v1/drive-folders", filter, query, field, direction, folderId)), apiRequest(buildListPath("/api/v1/drive-files", filter, query, field, direction, folderId))]);
      setFolders(folderPage.items);
      setFiles(filePage.items);
      setFoldersTotal(folderPage.total);
      setFilesTotal(filePage.total);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [filter, folderId, handleApiError, query]);
  reactExports.useEffect(() => {
    void loadDrive();
  }, [loadDrive]);
  reactExports.useEffect(() => {
    if (!folderId) {
      setBreadcrumbs([]);
      return;
    }
    let cancelled = false;
    const loadBreadcrumbs = async () => {
      try {
        const chain = [];
        let currentId = folderId;
        while (currentId && chain.length < 20) {
          const folder = await apiRequest(`/api/v1/drive-folders/${currentId}`);
          chain.unshift(folder);
          currentId = folder.parent_folder_id;
        }
        if (!cancelled) setBreadcrumbs(chain);
      } catch (err) {
        if (!cancelled) handleApiError(err);
      }
    };
    void loadBreadcrumbs();
    return () => {
      cancelled = true;
    };
  }, [folderId, handleApiError]);
  const openFolder = (folder) => {
    setFilter("my-drive");
    void navigate({
      to: "/drive",
      search: {
        folder: folder.id
      }
    });
  };
  const currentTitle = reactExports.useMemo(() => {
    if (filter === "starred") return "Starred";
    if (filter === "system") return "System";
    if (filter === "trash") return "Trash";
    return "My Drive";
  }, [filter]);
  const foldersMultiPage = foldersTotal > PAGE_LIMIT;
  const filesMultiPage = filesTotal > PAGE_LIMIT;
  const displayFolders = reactExports.useMemo(() => foldersMultiPage ? folders : [...folders].sort(compareItems(sortField, sortDirection)), [folders, foldersMultiPage, sortField, sortDirection]);
  const displayFiles = reactExports.useMemo(() => filesMultiPage ? files : [...files].sort(compareItems(sortField, sortDirection)), [files, filesMultiPage, sortField, sortDirection]);
  const changeSort = (field) => {
    const direction = field === sortField ? sortDirection === "asc" ? "desc" : "asc" : field === "name" ? "asc" : "desc";
    setSortField(field);
    setSortDirection(direction);
    sortRef.current = {
      field,
      direction
    };
    if (foldersMultiPage || filesMultiPage) void loadDrive();
  };
  const sortLabel = SORT_OPTIONS.find((o) => o.field === sortField)?.label ?? "Sort";
  const submitCreate = async (event) => {
    event.preventDefault();
    const name = createName.trim();
    if (!name || !createOpen) return;
    setMutating(true);
    setError("");
    try {
      setCreateOpen(null);
      setCreateName("");
      if (createOpen === "folder") {
        const created = await apiRequest("/api/v1/drive-folders", {
          method: "POST",
          body: JSON.stringify({
            name,
            parent_folder_id: folderId ?? null
          })
        });
        if (filter === "my-drive") setFolders((prev) => [created, ...prev]);
      } else {
        const created = await apiRequest("/api/v1/drive-files", {
          method: "POST",
          body: JSON.stringify({
            name,
            folder_id: folderId ?? null,
            kind: "document",
            mime_type: "application/vnd.google-apps.document"
          })
        });
        if (filter === "my-drive") setFiles((prev) => [created, ...prev]);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const leavesView = (starred) => filter === "starred" && !starred;
  const updateFolder = async (folder, payload) => {
    setMutating(true);
    setError("");
    try {
      const updated = await apiRequest(`/api/v1/drive-folders/${folder.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      setFolders((prev) => leavesView(updated.starred) ? prev.filter((f) => f.id !== updated.id) : prev.map((f) => f.id === updated.id ? updated : f));
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const updateFile = async (file, payload) => {
    setMutating(true);
    setError("");
    try {
      const updated = await apiRequest(`/api/v1/drive-files/${file.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
      });
      setFiles((prev) => leavesView(updated.starred) ? prev.filter((f) => f.id !== updated.id) : prev.map((f) => f.id === updated.id ? updated : f));
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const trashFolder = async (folder) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest(`/api/v1/drive-folders/${folder.id}`, {
        method: "DELETE"
      });
      setFolders((prev) => prev.filter((f) => f.id !== folder.id));
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const trashFile = async (file) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest(`/api/v1/drive-files/${file.id}`, {
        method: "DELETE"
      });
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const restoreFolder = async (folder) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest(`/api/v1/drive-folders/${folder.id}/restore`, {
        method: "POST"
      });
      setFolders((prev) => prev.filter((f) => f.id !== folder.id));
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const restoreFile = async (file) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest(`/api/v1/drive-files/${file.id}/restore`, {
        method: "POST"
      });
      setFiles((prev) => prev.filter((f) => f.id !== file.id));
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };
  const isEmpty = !loading && !error && folders.length === 0 && files.length === 0;
  const searchField = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 w-full items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search in Drive", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-white", children: "△" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Drive" })
        ] })
      ] }),
      searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden min-w-0 max-w-2xl flex-1 md:block", children: searchField }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Search", onClick: () => setSearchOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 md:hidden", children: searchField }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-[260px] shrink-0 px-3 md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg", disabled: mutating || filter === "trash" || filter === "system", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-5 w-5" }),
            " New"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: "w-64 rounded-2xl p-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", disabled: mutating, onSelect: () => setCreateOpen("folder"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "h-4 w-4" }),
              " New folder"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", disabled: mutating, onSelect: () => setCreateOpen("document"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 text-blue-500" }),
              " Document"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", disabled: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4 text-emerald-500" }),
              " Upload image"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", disabled: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-violet-500" }),
              " AI summary"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: DRIVE_NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", filter === n.id ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60"), onClick: () => {
          setFilter(n.id);
          if (folderId) void navigate({
            to: "/drive",
            search: {}
          });
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-5 w-5 text-foreground/70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: n.label })
        ] }, n.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-w-0 flex-1 px-4 pb-16 md:px-6", children: [
        !folderId && filter === "my-drive" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-[hsl(220,33%,96%)] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium", children: "Start a new document" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", className: "gap-1 text-sm", children: "Template gallery" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6", children: TEMPLATES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "group flex flex-col items-start gap-2 text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid aspect-[3/4] w-full place-items-center rounded-xl border border-black/5 bg-gradient-to-br shadow-sm transition group-hover:shadow-md", t.color), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-light text-foreground/40", children: t.glyph }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: t.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t.sub })
            ] })
          ] }, t.name)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-between", children: [
          folderId && filter === "my-drive" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex min-w-0 items-center gap-1 text-lg font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "shrink-0 rounded-full px-2 py-0.5 text-muted-foreground transition hover:bg-black/5 hover:text-foreground", onClick: () => void navigate({
              to: "/drive",
              search: {}
            }), children: "My Drive" }),
            breadcrumbs.map((crumb, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 shrink-0 text-muted-foreground" }),
              index === breadcrumbs.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate px-2 py-0.5", children: crumb.name }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "truncate rounded-full px-2 py-0.5 text-muted-foreground transition hover:bg-black/5 hover:text-foreground", onClick: () => void navigate({
                to: "/drive",
                search: {
                  folder: crumb.id
                }
              }), children: crumb.name })
            ] }, crumb.id))
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium", children: currentTitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "gap-1 rounded-full text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "h-4 w-4" }),
                " ",
                sortLabel,
                sortDirection === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3.5 w-3.5" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", className: "w-52 rounded-xl p-1.5", children: SORT_OPTIONS.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-2 rounded-lg", onSelect: () => changeSort(option.field), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: option.label }),
                sortField === option.field && (sortDirection === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-4 w-4" }))
              ] }, option.field)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", onClick: () => setView((v) => v === "grid" ? "list" : "grid"), "aria-label": "Toggle view", children: view === "grid" ? /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "h-4 w-4" }) })
          ] })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between rounded-2xl border border-destructive/20 bg-white px-4 py-3 text-sm text-destructive shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: error }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "rounded-lg", onClick: () => loadDrive(), children: "Retry" })
        ] }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [1, 2, 3].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 animate-pulse rounded-2xl bg-white shadow-sm ring-1 ring-black/5" }, item)) }),
        !loading && folders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Folders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: displayFolders.map((folder) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 transition hover:shadow-md", role: "button", tabIndex: 0, onClick: () => {
            if (filter !== "trash") openFolder(folder);
          }, onKeyDown: (event) => {
            if ((event.key === "Enter" || event.key === " ") && filter !== "trash") {
              event.preventDefault();
              openFolder(folder);
            }
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-lg bg-amber-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KindIcon, { kind: "folder" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-sm font-medium", children: folder.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { onClick: (event) => event.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DriveActions, { trashed: filter === "trash", starred: folder.starred, system: folder.is_system, disabled: mutating, onToggleStar: () => updateFolder(folder, {
              starred: !folder.starred
            }), onTrash: () => trashFolder(folder), onRestore: () => restoreFolder(folder) }) })
          ] }, folder.id)) })
        ] }),
        !loading && files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-8 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Files" }),
          view === "grid" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6", children: displayFiles.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid aspect-[4/3] place-items-center bg-gradient-to-br from-[hsl(220,33%,97%)] to-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-14 w-14 place-items-center rounded-2xl", kindAccent(file.kind)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(KindIcon, { kind: file.kind, className: "h-7 w-7" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-t border-black/5 px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KindIcon, { kind: file.kind, className: cn("h-4 w-4 rounded p-0.5", kindAccent(file.kind)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium", children: file.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  file.owner_name,
                  " · ",
                  formatDate(file.updated_at)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DriveActions, { trashed: filter === "trash", starred: file.starred, system: file.is_system, disabled: mutating, onToggleStar: () => updateFile(file, {
                starred: !file.starred
              }), onTrash: () => trashFile(file), onRestore: () => restoreFile(file) })
            ] })
          ] }, file.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_140px_140px_100px_40px] gap-2 px-4 py-2 text-xs font-medium text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Owner" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Modified" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Size" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
            ] }),
            displayFiles.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group grid grid-cols-[1fr_140px_140px_100px_40px] items-center gap-2 border-t border-black/5 px-4 py-2.5 text-sm hover:bg-[hsl(220,33%,98%)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-8 w-8 place-items-center rounded-lg", kindAccent(file.kind)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(KindIcon, { kind: file.kind, className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: file.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5" }),
                " ",
                file.owner_name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: formatDate(file.updated_at) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: formatSize(file.size_bytes) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DriveActions, { trashed: filter === "trash", starred: file.starred, system: file.is_system, disabled: mutating, onToggleStar: () => updateFile(file, {
                starred: !file.starred
              }), onTrash: () => trashFile(file), onRestore: () => restoreFile(file) })
            ] }, file.id))
          ] })
        ] }),
        isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mb-3 h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: query ? `No results for "${query}"` : filter === "trash" ? "Trash is empty" : filter === "system" ? "No system files yet" : "Drive is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: query ? "Try a different keyword." : "Create a folder or document to get started." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: createOpen !== null, onOpenChange: (open) => !open && setCreateOpen(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "rounded-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submitCreate, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: createOpen === "folder" ? "New folder" : "New document" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "drive-create-name", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "drive-create-name", value: createName, onChange: (event) => setCreateName(event.target.value), autoFocus: true, disabled: mutating, className: "h-11 rounded-lg" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", className: "rounded-lg", onClick: () => setCreateOpen(null), disabled: mutating, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "rounded-lg", disabled: mutating || !createName.trim(), children: "Create" })
      ] })
    ] }) }) })
  ] });
}
function DriveActions({
  trashed,
  starred,
  system = false,
  disabled,
  onToggleStar,
  onTrash,
  onRestore
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full opacity-0 transition focus-visible:opacity-100 data-[state=open]:opacity-100 group-hover:opacity-100", disabled, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", className: "w-44 rounded-xl p-1.5", children: trashed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-2 rounded-lg", onSelect: onRestore, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
      " Restore"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-2 rounded-lg", onSelect: onToggleStar, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-4 w-4 ${starred ? "fill-yellow-400 text-yellow-400" : ""}` }),
        " ",
        starred ? "Unstar" : "Star"
      ] }),
      !system && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-2 rounded-lg text-destructive", onSelect: onTrash, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
        " Move to trash"
      ] })
    ] }) })
  ] });
}
export {
  DrivePage as component
};
