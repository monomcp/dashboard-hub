import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery, u as useQueryClient, c as useInfiniteQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { C as Checkbox } from "./checkbox-mmp_duDa.mjs";
import { S as Skeleton } from "./skeleton-CoUJiN10.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogDescription, d as DialogFooter } from "./dialog-CmGvlKcs.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-DmTKMmfc.mjs";
import { A as AlertDialog, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-BqB4vy_S.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-3sxYre98.mjs";
import { E as EnableMcpServerButton } from "./enable-mcp-server-button-DAqYzfXa.mjs";
import { A as ApiError, c as clearAuthTokens, a as apiRequest, b as apiRequestText } from "./api-client-CDT_AGSo.mjs";
import { a as PermissionsMatrix, l as lightPermissionsTheme } from "./permissions-matrix-C4zDV_et.mjs";
import { M as Menu, a3 as Database, a as Search, c as CircleQuestionMark, d as Settings, N as Plus, ag as Layers, V as FileText, ah as GitBranch, O as ChevronDown, ai as Map$1, aj as Bot, h as Sparkles, ak as FileStack, K as KeyRound, i as Activity, ae as LoaderCircle, k as EllipsisVertical, al as PenLine, y as Trash2, w as ArrowLeft, a5 as Funnel, am as Ellipsis, a9 as Check, an as Eye, ao as X, R as RefreshCw, j as SlidersHorizontal, p as Copy, aa as User, ap as Plug, aq as MousePointerClick, ar as Hash, I as Image, as as Link2, at as Type } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
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
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "./popover-ColJhc-i.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "./label-JU3yqRBo.mjs";
import "../_libs/radix-ui__react-label.mjs";
const Table = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
const TableHeader = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props }));
TableBody.displayName = "TableBody";
const TableFooter = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "tfoot",
  {
    ref,
    className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props }));
TableCaption.displayName = "TableCaption";
const CHANGEFREQS = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never"
];
const LASTMOD_SOURCES = [
  { value: "last_published_at", label: "Last published" },
  { value: "updated_at", label: "Last updated" },
  { value: "none", label: "None" }
];
const inputClass$1 = "h-11 rounded-lg";
const selectClass$1 = "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200";
const cardClass$1 = "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5";
function normalizePath(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}
function SitemapView({
  contentTypes,
  onError
}) {
  const [settings, setSettings] = reactExports.useState(null);
  const [configs, setConfigs] = reactExports.useState([]);
  const [customUrls, setCustomUrls] = reactExports.useState([]);
  const [exclusions, setExclusions] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  const [baseUrl, setBaseUrl] = reactExports.useState("");
  const [enabled, setEnabled] = reactExports.useState(true);
  const [defaultChangefreq, setDefaultChangefreq] = reactExports.useState("weekly");
  const [defaultPriority, setDefaultPriority] = reactExports.useState("0.5");
  const [configDialogOpen, setConfigDialogOpen] = reactExports.useState(false);
  const [editingConfig, setEditingConfig] = reactExports.useState(null);
  const [configContentTypeId, setConfigContentTypeId] = reactExports.useState("");
  const [configPattern, setConfigPattern] = reactExports.useState("");
  const [configChangefreq, setConfigChangefreq] = reactExports.useState("");
  const [configPriority, setConfigPriority] = reactExports.useState("");
  const [configLastmod, setConfigLastmod] = reactExports.useState("last_published_at");
  const [configEnabled, setConfigEnabled] = reactExports.useState(true);
  const [urlDialogOpen, setUrlDialogOpen] = reactExports.useState(false);
  const [editingUrl, setEditingUrl] = reactExports.useState(null);
  const [urlValue, setUrlValue] = reactExports.useState("");
  const [urlChangefreq, setUrlChangefreq] = reactExports.useState("");
  const [urlPriority, setUrlPriority] = reactExports.useState("");
  const [exclusionDialogOpen, setExclusionDialogOpen] = reactExports.useState(false);
  const [exclusionPath, setExclusionPath] = reactExports.useState("");
  const [previewXml, setPreviewXml] = reactExports.useState(null);
  const [previewLoading, setPreviewLoading] = reactExports.useState(false);
  const contentTypeName = reactExports.useCallback(
    (id) => contentTypes.find((type) => type.id === id)?.display_name ?? "Unknown",
    [contentTypes]
  );
  const loadAll = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const [settingsRow, configRows, urlRows, exclusionRows] = await Promise.all([
        apiRequest("/api/v1/cms/sitemap/settings"),
        apiRequest("/api/v1/cms/sitemap/content-type-configs"),
        apiRequest("/api/v1/cms/sitemap/custom-urls"),
        apiRequest("/api/v1/cms/sitemap/exclusions")
      ]);
      setSettings(settingsRow);
      setBaseUrl(settingsRow.base_url);
      setEnabled(settingsRow.enabled);
      setDefaultChangefreq(settingsRow.default_changefreq);
      setDefaultPriority(String(settingsRow.default_priority));
      setConfigs(configRows);
      setCustomUrls(urlRows);
      setExclusions(exclusionRows);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [onError]);
  reactExports.useEffect(() => {
    void loadAll();
  }, [loadAll]);
  const saveSettings = async () => {
    const priority = Number(defaultPriority);
    if (Number.isNaN(priority) || priority < 0 || priority > 1) return;
    setSaving(true);
    setMessage("");
    try {
      const next = await apiRequest("/api/v1/cms/sitemap/settings", {
        method: "PATCH",
        body: JSON.stringify({
          base_url: baseUrl.trim(),
          enabled,
          default_changefreq: defaultChangefreq,
          default_priority: priority
        })
      });
      setSettings(next);
      setMessage("Sitemap settings saved.");
    } catch (err) {
      onError(err, "Unable to save sitemap settings");
    } finally {
      setSaving(false);
    }
  };
  const openConfigDialog = (config) => {
    setEditingConfig(config);
    setConfigContentTypeId(config?.content_type_id ?? contentTypes[0]?.id ?? "");
    setConfigPattern(config?.url_pattern ?? "/[slug]");
    setConfigChangefreq(config?.changefreq ?? "");
    setConfigPriority(config?.priority != null ? String(config.priority) : "");
    setConfigLastmod(config?.lastmod_source ?? "last_published_at");
    setConfigEnabled(config?.enabled ?? true);
    setConfigDialogOpen(true);
  };
  const saveConfig = async () => {
    const pattern = normalizePath(configPattern);
    if (!pattern || !editingConfig && !configContentTypeId) return;
    const priority = configPriority.trim() === "" ? null : Number(configPriority);
    if (priority !== null && (Number.isNaN(priority) || priority < 0 || priority > 1)) return;
    setSaving(true);
    try {
      const payload = {
        url_pattern: pattern,
        changefreq: configChangefreq || null,
        priority,
        lastmod_source: configLastmod,
        enabled: configEnabled
      };
      if (editingConfig) {
        const next = await apiRequest(
          `/api/v1/cms/sitemap/content-type-configs/${editingConfig.id}`,
          { method: "PATCH", body: JSON.stringify(payload) }
        );
        setConfigs((current) => current.map((row) => row.id === next.id ? next : row));
      } else {
        const next = await apiRequest(
          "/api/v1/cms/sitemap/content-type-configs",
          {
            method: "POST",
            body: JSON.stringify({ ...payload, content_type_id: configContentTypeId })
          }
        );
        setConfigs((current) => [...current, next]);
      }
      setConfigDialogOpen(false);
    } catch (err) {
      onError(err, "Unable to save sitemap config");
    } finally {
      setSaving(false);
    }
  };
  const deleteConfig = async (id) => {
    try {
      await apiRequest(`/api/v1/cms/sitemap/content-type-configs/${id}`, {
        method: "DELETE"
      });
      setConfigs((current) => current.filter((row) => row.id !== id));
    } catch (err) {
      onError(err, "Unable to delete sitemap config");
    }
  };
  const openUrlDialog = (row) => {
    setEditingUrl(row);
    setUrlValue(row?.url ?? "/");
    setUrlChangefreq(row?.changefreq ?? "");
    setUrlPriority(row?.priority != null ? String(row.priority) : "");
    setUrlDialogOpen(true);
  };
  const saveCustomUrl = async () => {
    const url = normalizePath(urlValue);
    if (!url) return;
    const priority = urlPriority.trim() === "" ? null : Number(urlPriority);
    if (priority !== null && (Number.isNaN(priority) || priority < 0 || priority > 1)) return;
    setSaving(true);
    try {
      const payload = { url, changefreq: urlChangefreq || null, priority };
      if (editingUrl) {
        const next = await apiRequest(
          `/api/v1/cms/sitemap/custom-urls/${editingUrl.id}`,
          { method: "PATCH", body: JSON.stringify(payload) }
        );
        setCustomUrls((current) => current.map((row) => row.id === next.id ? next : row));
      } else {
        const next = await apiRequest("/api/v1/cms/sitemap/custom-urls", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        setCustomUrls((current) => [...current, next]);
      }
      setUrlDialogOpen(false);
    } catch (err) {
      onError(err, "Unable to save custom URL");
    } finally {
      setSaving(false);
    }
  };
  const deleteCustomUrl = async (id) => {
    try {
      await apiRequest(`/api/v1/cms/sitemap/custom-urls/${id}`, { method: "DELETE" });
      setCustomUrls((current) => current.filter((row) => row.id !== id));
    } catch (err) {
      onError(err, "Unable to delete custom URL");
    }
  };
  const addExclusion = async () => {
    const path = normalizePath(exclusionPath);
    if (!path) return;
    setSaving(true);
    try {
      const next = await apiRequest("/api/v1/cms/sitemap/exclusions", {
        method: "POST",
        body: JSON.stringify({ path })
      });
      setExclusions((current) => [...current, next]);
      setExclusionDialogOpen(false);
    } catch (err) {
      onError(err, "Unable to add exclusion");
    } finally {
      setSaving(false);
    }
  };
  const deleteExclusion = async (id) => {
    try {
      await apiRequest(`/api/v1/cms/sitemap/exclusions/${id}`, { method: "DELETE" });
      setExclusions((current) => current.filter((row) => row.id !== id));
    } catch (err) {
      onError(err, "Unable to delete exclusion");
    }
  };
  const loadPreview = async () => {
    setPreviewLoading(true);
    try {
      const xml = await apiRequestText("/api/v1/cms/sitemap/sitemap.xml");
      setPreviewXml(xml);
    } catch (err) {
      onError(err, "Unable to load sitemap preview");
    } finally {
      setPreviewLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex items-center gap-2 rounded-2xl bg-white p-6 text-muted-foreground shadow-sm ring-1 ring-black/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Loading sitemap..."
    ] });
  }
  const previewUrlCount = previewXml ? (previewXml.match(/<loc>/g) ?? []).length : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold tracking-tight", children: "Sitemap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "Configure how your sitemap.xml is generated from published content." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-lg", onClick: loadPreview, children: [
        previewLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-1.5 h-4 w-4" }),
        "Preview sitemap.xml"
      ] })
    ] }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200", children: message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass$1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-semibold", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Base URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: baseUrl,
              onChange: (event) => setBaseUrl(event.target.value),
              placeholder: "https://example.com",
              className: inputClass$1
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Default change frequency" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: defaultChangefreq,
              onChange: (event) => setDefaultChangefreq(event.target.value),
              className: selectClass$1,
              children: CHANGEFREQS.map((freq) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: freq, children: freq }, freq))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Default priority (0.0–1.0)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "number",
              min: "0",
              max: "1",
              step: "0.1",
              value: defaultPriority,
              onChange: (event) => setDefaultPriority(event.target.value),
              className: inputClass$1
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: enabled,
              onCheckedChange: (checked) => setEnabled(checked === true)
            }
          ),
          "Sitemap enabled"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "rounded-lg bg-indigo-600 hover:bg-indigo-700",
          disabled: saving || !settings,
          onClick: saveSettings,
          children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
            "Save settings"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass$1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Content types" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Published entries of these types are included using the URL pattern. Tokens:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-indigo-50 px-1 font-mono text-xs text-indigo-700", children: "[slug] [locale] [document_key] [id]" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "rounded-lg text-indigo-600",
            onClick: () => openConfigDialog(null),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
              " Add content type"
            ]
          }
        )
      ] }),
      configs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No content types configured." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-black/5", children: configs.map((config) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: contentTypeName(config.content_type_id) }),
            !config.enabled && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600", children: "Disabled" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-mono text-sm text-muted-foreground", children: config.url_pattern })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden text-sm text-muted-foreground md:block", children: [
          config.changefreq ?? "default",
          " · ",
          config.priority ?? "default"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-8 w-8 rounded-full",
            "aria-label": "Edit config",
            onClick: () => openConfigDialog(config),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-8 w-8 rounded-full text-rose-600",
            "aria-label": "Delete config",
            onClick: () => void deleteConfig(config.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
          }
        )
      ] }, config.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass$1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Custom URLs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manually added paths included in the sitemap." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "rounded-lg text-indigo-600",
            onClick: () => openUrlDialog(null),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
              " Add custom URL"
            ]
          }
        )
      ] }),
      customUrls.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No custom URLs." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-black/5", children: customUrls.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1 truncate font-mono text-sm", children: row.url }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden text-sm text-muted-foreground md:block", children: [
          row.changefreq ?? "default",
          " · ",
          row.priority ?? "default"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-8 w-8 rounded-full",
            "aria-label": "Edit custom URL",
            onClick: () => openUrlDialog(row),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3.5 w-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-8 w-8 rounded-full text-rose-600",
            "aria-label": "Delete custom URL",
            onClick: () => void deleteCustomUrl(row.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
          }
        )
      ] }, row.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass$1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Exclusions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Paths excluded from the sitemap. Globs are supported, e.g.",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-indigo-50 px-1 font-mono text-xs text-indigo-700", children: "/private/*" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "rounded-lg text-indigo-600",
            onClick: () => {
              setExclusionPath("/");
              setExclusionDialogOpen(true);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
              " Add exclusion"
            ]
          }
        )
      ] }),
      exclusions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No exclusions." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-black/5", children: exclusions.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 flex-1 truncate font-mono text-sm", children: row.path }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "icon",
            className: "h-8 w-8 rounded-full text-rose-600",
            "aria-label": "Delete exclusion",
            onClick: () => void deleteExclusion(row.id),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
          }
        )
      ] }, row.id)) })
    ] }),
    previewXml !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass$1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: "Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          previewUrlCount,
          " URLs"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "max-h-96 overflow-auto rounded-lg bg-slate-50 p-4 text-xs leading-relaxed ring-1 ring-black/5", children: previewXml })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: configDialogOpen, onOpenChange: setConfigDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingConfig ? "Edit content type" : "Add content type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Include published entries of a content type in the sitemap." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        !editingConfig && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Content type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: configContentTypeId,
              onChange: (event) => setConfigContentTypeId(event.target.value),
              className: selectClass$1,
              children: contentTypes.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: type.id, children: type.display_name }, type.id))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "URL pattern" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: configPattern,
              onChange: (event) => setConfigPattern(event.target.value),
              placeholder: "/blog/[slug]",
              className: `${inputClass$1} font-mono`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Tokens: [slug], [locale], [document_key], [id]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Change frequency" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: configChangefreq,
                onChange: (event) => setConfigChangefreq(event.target.value),
                className: selectClass$1,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Default" }),
                  CHANGEFREQS.map((freq) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: freq, children: freq }, freq))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0",
                max: "1",
                step: "0.1",
                value: configPriority,
                onChange: (event) => setConfigPriority(event.target.value),
                placeholder: "Default",
                className: inputClass$1
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Last modified source" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: configLastmod,
              onChange: (event) => setConfigLastmod(event.target.value),
              className: selectClass$1,
              children: LASTMOD_SOURCES.map((source) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: source.value, children: source.label }, source.value))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: configEnabled,
              onCheckedChange: (checked) => setConfigEnabled(checked === true)
            }
          ),
          "Enabled"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "rounded-lg",
            disabled: saving,
            onClick: () => setConfigDialogOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "rounded-lg bg-indigo-600 hover:bg-indigo-700",
            disabled: saving || !configPattern.trim() || !editingConfig && !configContentTypeId,
            onClick: saveConfig,
            children: [
              saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
              editingConfig ? "Save changes" : "Add content type"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: urlDialogOpen, onOpenChange: setUrlDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: editingUrl ? "Edit custom URL" : "Add custom URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "A manually curated path for the sitemap." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Path" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: urlValue,
              onChange: (event) => setUrlValue(event.target.value),
              placeholder: "/about",
              className: `${inputClass$1} font-mono`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Change frequency" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: urlChangefreq,
                onChange: (event) => setUrlChangefreq(event.target.value),
                className: selectClass$1,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Default" }),
                  CHANGEFREQS.map((freq) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: freq, children: freq }, freq))
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Priority" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "0",
                max: "1",
                step: "0.1",
                value: urlPriority,
                onChange: (event) => setUrlPriority(event.target.value),
                placeholder: "Default",
                className: inputClass$1
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "rounded-lg",
            disabled: saving,
            onClick: () => setUrlDialogOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "rounded-lg bg-indigo-600 hover:bg-indigo-700",
            disabled: saving || !urlValue.trim(),
            onClick: saveCustomUrl,
            children: [
              saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
              editingUrl ? "Save changes" : "Add URL"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: exclusionDialogOpen, onOpenChange: setExclusionDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add exclusion" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Paths matching this pattern are removed from the sitemap." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Path or glob" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: exclusionPath,
            onChange: (event) => setExclusionPath(event.target.value),
            placeholder: "/private/*",
            className: `${inputClass$1} font-mono`
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "rounded-lg",
            disabled: saving,
            onClick: () => setExclusionDialogOpen(false),
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "rounded-lg bg-indigo-600 hover:bg-indigo-700",
            disabled: saving || !exclusionPath.trim(),
            onClick: addExclusion,
            children: [
              saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
              "Add exclusion"
            ]
          }
        )
      ] })
    ] }) })
  ] });
}
const inputClass = "h-11 rounded-lg";
const selectClass = "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200";
const cardClass = "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5";
const textareaClass = "w-full rounded-lg border border-black/10 bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200";
const checkboxRowClass = "flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium";
function useDiscoverySettings(onError) {
  const [settings, setSettings] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [saving, setSaving] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  reactExports.useEffect(() => {
    let cancelled = false;
    apiRequest("/api/v1/cms/discovery/settings").then((row) => {
      if (!cancelled) setSettings(row);
    }).catch((err) => {
      if (!cancelled) onError(err);
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [onError]);
  const save = reactExports.useCallback(
    async (patch, successMessage) => {
      setSaving(true);
      setMessage("");
      try {
        const next = await apiRequest("/api/v1/cms/discovery/settings", {
          method: "PATCH",
          body: JSON.stringify(patch)
        });
        setSettings(next);
        setMessage(successMessage);
      } catch (err) {
        onError(err, "Unable to save settings");
      } finally {
        setSaving(false);
      }
    },
    [onError]
  );
  return { settings, setSettings, loading, saving, save, message };
}
function usePreview(path, onError) {
  const [content, setContent] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const load = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      setContent(await apiRequestText(path));
    } catch (err) {
      onError(err, "Unable to load preview");
    } finally {
      setLoading(false);
    }
  }, [onError, path]);
  return { content, loading, load };
}
function LoadingCard({ rows = 4 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-56" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-80" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-44 rounded-lg" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: Array.from({ length: rows }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-32 rounded-lg" }) })
    ] })
  ] });
}
function PageHeader({
  title,
  description,
  onPreview,
  previewLoading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold tracking-tight", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-lg", onClick: onPreview, children: [
      previewLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-1.5 h-4 w-4" }),
      "Preview ",
      title.toLowerCase()
    ] })
  ] });
}
function PreviewCard({ content }) {
  if (content === null) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-semibold", children: "Preview" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "max-h-96 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-xs leading-relaxed ring-1 ring-black/5", children: content || "(empty)" })
  ] });
}
function SuccessMessage({ message }) {
  if (!message) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200", children: message });
}
function RobotsView({ onError }) {
  const { settings, loading, saving, save, message } = useDiscoverySettings(onError);
  const preview = usePreview("/api/v1/cms/discovery/robots.txt", onError);
  const [enabled, setEnabled] = reactExports.useState(true);
  const [allowAi, setAllowAi] = reactExports.useState(true);
  const [blockedAgents, setBlockedAgents] = reactExports.useState([]);
  const [agentInput, setAgentInput] = reactExports.useState("");
  const [sitemapUrl, setSitemapUrl] = reactExports.useState("");
  const [manualContent, setManualContent] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!settings) return;
    setEnabled(settings.robots_enabled);
    setAllowAi(settings.allow_ai_crawlers);
    setBlockedAgents(settings.blocked_user_agents);
    setSitemapUrl(settings.robots_sitemap_url);
    setManualContent(settings.robots_content);
  }, [settings]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingCard, {});
  const addAgent = () => {
    const agent = agentInput.trim();
    if (!agent || blockedAgents.includes(agent)) return;
    setBlockedAgents((current) => [...current, agent]);
    setAgentInput("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Robots.txt",
        description: "Control how search engines and AI crawlers access your site.",
        onPreview: () => void preview.load(),
        previewLoading: preview.loading
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessMessage, { message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: checkboxRowClass, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: enabled,
              onCheckedChange: (checked) => setEnabled(checked === true)
            }
          ),
          "Robots.txt enabled (disabled blocks all crawlers)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: checkboxRowClass, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: allowAi,
              onCheckedChange: (checked) => setAllowAi(checked === true)
            }
          ),
          "Allow AI crawlers (GPTBot, ClaudeBot, PerplexityBot, ...)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Blocked user agents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: agentInput,
                onChange: (event) => setAgentInput(event.target.value),
                onKeyDown: (event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addAgent();
                  }
                },
                placeholder: "BadBot",
                className: inputClass
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "h-11 rounded-lg", onClick: addAgent, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) })
          ] }),
          blockedAgents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: blockedAgents.map((agent) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200",
              children: [
                agent,
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    "aria-label": `Remove ${agent}`,
                    onClick: () => setBlockedAgents((current) => current.filter((a) => a !== agent)),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                  }
                )
              ]
            },
            agent
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Sitemap URL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: sitemapUrl,
              onChange: (event) => setSitemapUrl(event.target.value),
              placeholder: "Derived from sitemap base URL when empty",
              className: inputClass
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 block text-sm font-medium", children: [
            "Manual content ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: manualContent,
              onChange: (event) => setManualContent(event.target.value),
              rows: 6,
              placeholder: "Leave empty to auto-generate.\nUser-agent: *\nDisallow: /admin",
              className: textareaClass
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "rounded-lg bg-indigo-600 hover:bg-indigo-700",
          disabled: saving,
          onClick: () => void save(
            {
              robots_enabled: enabled,
              allow_ai_crawlers: allowAi,
              blocked_user_agents: blockedAgents,
              robots_sitemap_url: sitemapUrl.trim(),
              robots_content: manualContent
            },
            "Robots.txt settings saved."
          ),
          children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
            "Save settings"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCard, { content: preview.content })
  ] });
}
function LlmsView({ onError }) {
  const { settings, loading, saving, save, message } = useDiscoverySettings(onError);
  const preview = usePreview("/api/v1/cms/discovery/llms.txt", onError);
  const [enabled, setEnabled] = reactExports.useState(true);
  const [autoGenerate, setAutoGenerate] = reactExports.useState(true);
  const [includeBusiness, setIncludeBusiness] = reactExports.useState(true);
  const [includeContentTypes, setIncludeContentTypes] = reactExports.useState(true);
  const [includeCustomUrls, setIncludeCustomUrls] = reactExports.useState(true);
  const [manualContent, setManualContent] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!settings) return;
    setEnabled(settings.llms_enabled);
    setAutoGenerate(settings.llms_auto_generate);
    setIncludeBusiness(settings.llms_include_business_profile);
    setIncludeContentTypes(settings.llms_include_content_types);
    setIncludeCustomUrls(settings.llms_include_custom_urls);
    setManualContent(settings.llms_manual_content);
  }, [settings]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingCard, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "LLMs.txt",
        description: "A short agent-readable summary of your site for AI systems.",
        onPreview: () => void preview.load(),
        previewLoading: preview.loading
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessMessage, { message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: checkboxRowClass, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: enabled,
              onCheckedChange: (checked) => setEnabled(checked === true)
            }
          ),
          "LLMs.txt enabled"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: checkboxRowClass, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: autoGenerate,
              onCheckedChange: (checked) => setAutoGenerate(checked === true)
            }
          ),
          "Auto-generate from published content"
        ] }),
        autoGenerate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-lg border border-black/10 bg-slate-50/50 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Include sections" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: includeBusiness,
                onCheckedChange: (checked) => setIncludeBusiness(checked === true)
              }
            ),
            "Business profile (name and description)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: includeCustomUrls,
                onCheckedChange: (checked) => setIncludeCustomUrls(checked === true)
              }
            ),
            "Important pages (sitemap custom URLs)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: includeContentTypes,
                onCheckedChange: (checked) => setIncludeContentTypes(checked === true)
              }
            ),
            "Content types (published entries)"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: autoGenerate ? "Extra content (appended)" : "Manual content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: manualContent,
              onChange: (event) => setManualContent(event.target.value),
              rows: 8,
              placeholder: "# My Site\n\n> What this site is about.\n\n## Important Pages\n- ...",
              className: textareaClass
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "rounded-lg bg-indigo-600 hover:bg-indigo-700",
          disabled: saving,
          onClick: () => void save(
            {
              llms_enabled: enabled,
              llms_auto_generate: autoGenerate,
              llms_include_business_profile: includeBusiness,
              llms_include_content_types: includeContentTypes,
              llms_include_custom_urls: includeCustomUrls,
              llms_manual_content: manualContent
            },
            "LLMs.txt settings saved."
          ),
          children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
            "Save settings"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCard, { content: preview.content })
  ] });
}
function LlmsFullView({
  contentTypes,
  onError
}) {
  const { settings, setSettings, loading, saving, save, message } = useDiscoverySettings(onError);
  const preview = usePreview("/api/v1/cms/discovery/llms-full.txt", onError);
  const [regenerating, setRegenerating] = reactExports.useState(false);
  const [enabled, setEnabled] = reactExports.useState(true);
  const [mode, setMode] = reactExports.useState("auto");
  const [includedTypeIds, setIncludedTypeIds] = reactExports.useState([]);
  const [maxItems, setMaxItems] = reactExports.useState("200");
  const [includeFullBody, setIncludeFullBody] = reactExports.useState(true);
  const [includeMetadata, setIncludeMetadata] = reactExports.useState(true);
  const [manualContent, setManualContent] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!settings) return;
    setEnabled(settings.llms_full_enabled);
    setMode(settings.llms_full_generation_mode);
    setIncludedTypeIds(settings.llms_full_included_content_type_ids);
    setMaxItems(String(settings.llms_full_max_items));
    setIncludeFullBody(settings.llms_full_include_full_body);
    setIncludeMetadata(settings.llms_full_include_metadata);
    setManualContent(settings.llms_full_content);
  }, [settings]);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingCard, { rows: 6 });
  const toggleType = (id) => {
    setIncludedTypeIds(
      (current) => current.includes(id) ? current.filter((t) => t !== id) : [...current, id]
    );
  };
  const saveAll = () => {
    const items = Number(maxItems);
    if (Number.isNaN(items) || items < 1 || items > 5e3) return;
    void save(
      {
        llms_full_enabled: enabled,
        llms_full_generation_mode: mode,
        llms_full_included_content_type_ids: includedTypeIds,
        llms_full_max_items: items,
        llms_full_include_full_body: includeFullBody,
        llms_full_include_metadata: includeMetadata,
        ...mode === "manual" ? { llms_full_content: manualContent } : {}
      },
      "LLMs Full settings saved."
    );
  };
  const regenerate = async () => {
    setRegenerating(true);
    try {
      const next = await apiRequest(
        "/api/v1/cms/discovery/llms-full/regenerate",
        { method: "POST" }
      );
      setSettings(next);
      await preview.load();
    } catch (err) {
      onError(err, "Unable to regenerate llms-full.txt");
    } finally {
      setRegenerating(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold tracking-tight", children: "LLMs Full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "Full machine-readable export of your published content (llms-full.txt)." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-lg", onClick: () => void preview.load(), children: [
          preview.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "mr-1.5 h-4 w-4" }),
          "Preview"
        ] }),
        mode !== "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            className: "rounded-lg bg-indigo-600 hover:bg-indigo-700",
            disabled: regenerating,
            onClick: () => void regenerate(),
            children: [
              regenerating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-1.5 h-4 w-4" }),
              "Regenerate"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SuccessMessage, { message }),
    settings?.llms_full_generated_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
      "Last generated: ",
      new Date(settings.llms_full_generated_at).toLocaleString()
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cardClass, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: checkboxRowClass, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              checked: enabled,
              onCheckedChange: (checked) => setEnabled(checked === true)
            }
          ),
          "LLMs-full.txt enabled"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Generation mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: mode,
                onChange: (event) => setMode(event.target.value),
                className: selectClass,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "auto", children: "Auto (generated from content)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "hybrid", children: "Hybrid" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "manual", children: "Manual (hand-written)" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Max items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "number",
                min: "1",
                max: "5000",
                value: maxItems,
                onChange: (event) => setMaxItems(event.target.value),
                className: inputClass
              }
            )
          ] })
        ] }),
        mode !== "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: checkboxRowClass, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: includeFullBody,
                onCheckedChange: (checked) => setIncludeFullBody(checked === true)
              }
            ),
            "Include full page body"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: checkboxRowClass, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                checked: includeMetadata,
                onCheckedChange: (checked) => setIncludeMetadata(checked === true)
              }
            ),
            "Include metadata (locale, publish date)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-2 text-sm font-medium", children: [
              "Content types",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(none selected = all configured in the sitemap)" })
            ] }),
            contentTypes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No content types found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 rounded-lg border border-black/10 bg-slate-50/50 p-3", children: contentTypes.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: includedTypeIds.includes(type.id),
                  onCheckedChange: () => toggleType(type.id)
                }
              ),
              type.display_name
            ] }, type.id)) })
          ] })
        ] }),
        mode === "manual" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Content" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              value: manualContent,
              onChange: (event) => setManualContent(event.target.value),
              rows: 12,
              className: textareaClass
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "rounded-lg bg-indigo-600 hover:bg-indigo-700",
          disabled: saving,
          onClick: saveAll,
          children: [
            saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
            "Save settings"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCard, { content: preview.content })
  ] });
}
const card = "rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5";
const mutedText = "text-sm text-muted-foreground";
const ACTIVITY_PAGE_SIZE = 50;
const activityControl = "rounded-full border border-black/10 bg-[hsl(220,33%,97%)] px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/60";
const EMPTY_ACTIVITY_FILTERS = {
  source: "all",
  status: "all",
  principal: "all",
  event: "",
  since: "",
  until: ""
};
function activityRequestPath(filters, offset) {
  const params = new URLSearchParams({
    limit: String(ACTIVITY_PAGE_SIZE),
    offset: String(offset)
  });
  if (filters.source !== "all") params.set("source", filters.source);
  if (filters.status !== "all") params.set("outcome", filters.status);
  if (filters.since) params.set("since", (/* @__PURE__ */ new Date(`${filters.since}T00:00:00`)).toISOString());
  if (filters.until) params.set("until", (/* @__PURE__ */ new Date(`${filters.until}T23:59:59.999`)).toISOString());
  if (filters.principal.startsWith("user:")) {
    params.set("actor_user_id", filters.principal.slice("user:".length));
  } else if (filters.principal.startsWith("key:")) {
    params.set("api_key_id", filters.principal.slice("key:".length));
  }
  return `/api/v1/request-logs?${params.toString()}`;
}
function sameActivityFilters(a, b) {
  return a.source === b.source && a.status === b.status && a.principal === b.principal && a.event === b.event && a.since === b.since && a.until === b.until;
}
function shortId(id) {
  return id.slice(0, 8);
}
function logPrincipal(log, userNames) {
  if (log.actor_user_id) {
    return {
      key: `user:${log.actor_user_id}`,
      label: userNames.get(log.actor_user_id) ?? `User ${shortId(log.actor_user_id)}`,
      type: "user"
    };
  }
  if (log.api_key_id) {
    return {
      key: `key:${log.api_key_id}`,
      label: `API key ${shortId(log.api_key_id)}`,
      type: "api_key"
    };
  }
  return { key: "system", label: "System", type: "system" };
}
function logIsSuccess(log) {
  if (log.outcome != null) return log.outcome === "success" || log.outcome === "ok";
  if (log.status_code != null) return log.status_code < 400;
  return true;
}
function logIsBlocked(log) {
  return log.outcome === "blocked";
}
function eventLabel(log) {
  if (log.tool_name) return log.tool_name;
  if (log.method && log.path) return `${log.method} ${log.path}`;
  return log.path ?? log.method ?? "request";
}
function statusLabel(statusCode) {
  if (statusCode == null) return "unknown";
  return statusCode < 400 ? "success" : "error";
}
function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function PrincipalBadge({ principal }) {
  const Icon = principal.type === "user" ? User : principal.type === "api_key" ? KeyRound : Bot;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-foreground/80", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 shrink-0 text-sky-600" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: principal.label })
  ] });
}
function SourceBadge({ source }) {
  const mcp = source === "mcp";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        mcp ? "bg-violet-100 text-violet-700" : "bg-sky-100 text-sky-700"
      ),
      children: [
        mcp ? /* @__PURE__ */ jsxRuntimeExports.jsx(Plug, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "h-3 w-3" }),
        mcp ? "MCP" : "Console"
      ]
    }
  );
}
function StatusDot({ outcome }) {
  const ok = outcome == null || outcome === "success" || outcome === "ok";
  const blocked = outcome === "blocked";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-block h-2 w-2 rounded-full",
        ok ? "bg-emerald-500" : blocked ? "bg-amber-500" : "bg-rose-500"
      )
    }
  );
}
function ActivityLog({
  onApiError,
  logFilter,
  nameServerSlugs,
  source: controlledSource,
  title = "Activity",
  description = "Every change made through Console and via MCP tool calls."
}) {
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [filters, setFilters] = reactExports.useState(
    () => controlledSource ? { ...EMPTY_ACTIVITY_FILTERS, source: controlledSource } : EMPTY_ACTIVITY_FILTERS
  );
  const [eventInput, setEventInput] = reactExports.useState("");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [filtering, setFiltering] = reactExports.useState(false);
  const loadMoreRef = reactExports.useRef(null);
  const queryClient = useQueryClient();
  reactExports.useEffect(() => {
    if (controlledSource === void 0) return;
    setFilters((f) => f.source === controlledSource ? f : { ...f, source: controlledSource });
  }, [controlledSource]);
  const { data, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, error } = useInfiniteQuery({
    queryKey: ["activity-logs", filters],
    queryFn: ({ pageParam, signal }) => apiRequest(activityRequestPath(filters, pageParam), { signal }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.items.length;
      return nextOffset < lastPage.total ? nextOffset : void 0;
    },
    staleTime: 30 * 1e3
  });
  reactExports.useEffect(() => {
    if (error) onApiError(error, "Could not load activity");
  }, [error, onApiError]);
  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest("/api/v1/mcp-catalog"),
    staleTime: 60 * 1e3
  });
  const firstToolkitId = reactExports.useMemo(() => {
    for (const server of catalog ?? []) {
      if (nameServerSlugs && !nameServerSlugs.includes(server.slug)) continue;
      if (server.enabled && server.toolkit_ids[0]) return server.toolkit_ids[0];
    }
    return void 0;
  }, [catalog, nameServerSlugs]);
  const { data: matrix } = useQuery({
    queryKey: ["toolkit-access-matrix", firstToolkitId],
    queryFn: () => apiRequest(`/api/v1/toolkits/${firstToolkitId}/access-matrix`),
    enabled: Boolean(firstToolkitId),
    staleTime: 60 * 1e3,
    retry: false
  });
  const userNames = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const p of matrix?.principals ?? []) {
      if (p.auth_user_id) map.set(p.auth_user_id, p.name);
    }
    return map;
  }, [matrix]);
  const allLogs = reactExports.useMemo(() => {
    const items = data?.pages.flatMap((page) => page.items) ?? [];
    return (logFilter ? items.filter(logFilter) : items).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [data, logFilter]);
  const principalOptions = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Map();
    for (const log of allLogs) {
      const p = logPrincipal(log, userNames);
      if (!seen.has(p.key)) seen.set(p.key, p);
    }
    return Array.from(seen.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [allLogs, userNames]);
  const sinceMs = filters.since ? (/* @__PURE__ */ new Date(`${filters.since}T00:00:00`)).getTime() : null;
  const untilMs = filters.until ? (/* @__PURE__ */ new Date(`${filters.until}T23:59:59.999`)).getTime() : null;
  const eventQuery = filters.event.trim().toLowerCase();
  const logs = reactExports.useMemo(
    () => allLogs.filter((log) => {
      if (filters.source !== "all" && log.source !== filters.source) return false;
      if (filters.status === "success" && !logIsSuccess(log)) return false;
      if (filters.status === "blocked" && !logIsBlocked(log)) return false;
      if (filters.status === "error" && (logIsSuccess(log) || logIsBlocked(log))) return false;
      if (filters.principal !== "all" && logPrincipal(log, userNames).key !== filters.principal)
        return false;
      if (eventQuery) {
        const haystack = `${eventLabel(log)} ${log.path ?? ""} ${log.tool_name ?? ""}`.toLowerCase();
        if (!haystack.includes(eventQuery)) return false;
      }
      const ts = new Date(log.created_at).getTime();
      if (sinceMs != null && ts < sinceMs) return false;
      if (untilMs != null && ts > untilMs) return false;
      return true;
    }),
    [allLogs, filters, eventQuery, sinceMs, untilMs, userNames]
  );
  const filtersActive = controlledSource === void 0 && filters.source !== "all" || filters.status !== "all" || filters.principal !== "all" || filters.event.trim() !== "" || filters.since !== "" || filters.until !== "";
  const updateFilters = reactExports.useCallback(
    (updater) => {
      const next = updater(filters);
      void queryClient.cancelQueries({ queryKey: ["activity-logs"] });
      setFilters(next);
      setFiltering(true);
      if (sameActivityFilters(filters, next)) {
        void queryClient.refetchQueries({ queryKey: ["activity-logs", next], type: "active" });
      }
    },
    [filters, queryClient]
  );
  const clearFilters = () => updateFilters(
    () => controlledSource ? { ...EMPTY_ACTIVITY_FILTERS, source: controlledSource } : EMPTY_ACTIVITY_FILTERS
  );
  const updateEventInput = reactExports.useCallback(
    (value) => {
      setEventInput(value);
      const query = value.trim();
      if (query.length > 0 && query.length < 3) return;
      updateFilters((f) => ({ ...f, event: value }));
    },
    [updateFilters]
  );
  reactExports.useEffect(() => {
    if (!isFetching) setFiltering(false);
  }, [isFetching]);
  reactExports.useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "240px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(card, "flex min-h-28 items-end justify-between gap-4"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-normal tracking-tight", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-2", mutedText), children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowFilters((open) => !open),
          "aria-label": showFilters ? "Hide activity filters" : "Show activity filters",
          className: cn(
            "relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition",
            filtersActive ? "bg-sky-600 text-white shadow-sm" : showFilters ? "bg-black/10 text-foreground" : "bg-black/5 text-muted-foreground hover:bg-black/10 hover:text-foreground"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-5 w-5" }),
            filtersActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" })
          ]
        }
      )
    ] }),
    showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(card, "flex flex-wrap items-end gap-3"), children: [
      controlledSource === void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Source", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SegmentedFilter,
        {
          value: filters.source,
          onChange: (source) => updateFilters((f) => ({ ...f, source })),
          options: [
            { value: "all", label: "All" },
            { value: "api", label: "Console" },
            { value: "mcp", label: "MCP" }
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SegmentedFilter,
        {
          value: filters.status,
          onChange: (status) => updateFilters((f) => ({ ...f, status })),
          options: [
            { value: "all", label: "All" },
            { value: "success", label: "Success" },
            { value: "blocked", label: "Blocked" },
            { value: "error", label: "Error" }
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Principal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filters.principal,
          onChange: (e) => updateFilters((f) => ({ ...f, principal: e.target.value })),
          className: activityControl,
          "aria-label": "Filter by principal",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All principals" }),
            principalOptions.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.key, children: p.label }, p.key))
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Event", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: eventInput,
          onChange: (e) => updateEventInput(e.target.value),
          placeholder: "Search tool or path",
          className: cn(activityControl, "w-48"),
          "aria-label": "Filter by event"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "From", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: filters.since,
          max: filters.until || void 0,
          onChange: (e) => updateFilters((f) => ({ ...f, since: e.target.value })),
          className: activityControl,
          "aria-label": "From date"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "To", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: filters.until,
          min: filters.since || void 0,
          onChange: (e) => updateFilters((f) => ({ ...f, until: e.target.value })),
          className: activityControl,
          "aria-label": "To date"
        }
      ) }),
      filtersActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setEventInput("");
            clearFilters();
          },
          className: "inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1.5 text-sm text-foreground/70 transition hover:bg-black/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
            " Clear"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl bg-white ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Principal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        (isLoading || filtering && isFetching && !isFetchingNextPage) && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTableSkeletonRows, {}),
        !isLoading && !(filtering && isFetching && !isFetchingNextPage) && logs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            onClick: () => setSelectedId(log.id),
            className: "cursor-pointer border-t border-black/5 transition hover:bg-black/[0.03]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: eventLabel(log) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: log.tool_name ? log.path ?? log.method : log.path })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrincipalBadge, { principal: logPrincipal(log, userNames) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SourceBadge, { source: log.source }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: timeAgo(log.created_at) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { outcome: log.outcome }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-foreground/80", children: log.outcome ?? statusLabel(log.status_code) }),
                log.duration_ms != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "· ",
                  log.duration_ms,
                  "ms"
                ] })
              ] }) })
            ]
          },
          log.id
        )),
        !isLoading && !(filtering && isFetching && !isFetchingNextPage) && logs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-10 text-center text-muted-foreground", children: filtersActive ? "No activity matches these filters." : "No activity recorded yet." }) }),
        !isLoading && !(filtering && isFetching && !isFetchingNextPage) && isFetchingNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTableSkeletonRows, {})
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: loadMoreRef,
        className: "grid min-h-8 place-items-center text-sm text-muted-foreground",
        children: !isFetchingNextPage && hasNextPage && "Loading more activity..."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActivityDetailDialog,
      {
        logId: selectedId,
        userNames,
        onOpenChange: (open) => !open && setSelectedId(null),
        onApiError
      }
    )
  ] });
}
function FilterField({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: label }),
    children
  ] });
}
function SegmentedFilter({
  value,
  onChange,
  options
}) {
  const activeIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative grid overflow-hidden rounded-full border border-black/10 bg-[hsl(220,33%,97%)] p-0.5",
      style: { gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "aria-hidden": "true",
            className: "absolute inset-y-0.5 left-0.5 rounded-full bg-sky-600 transition-transform duration-300 ease-out",
            style: {
              width: `calc((100% - 4px) / ${options.length})`,
              transform: `translateX(${activeIndex * 100}%)`
            }
          }
        ),
        options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange(opt.value),
            className: cn(
              "relative z-10 min-w-20 rounded-full px-3 py-1 text-sm transition-colors duration-200",
              value === opt.value ? "text-white" : "text-foreground/70 hover:text-foreground"
            ),
            children: opt.label
          },
          opt.value
        ))
      ]
    }
  );
}
function ActivityTableSkeletonRows() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { "aria-hidden": "true", className: "border-t border-black/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40 max-w-full rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-56 max-w-full rounded-full" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28 rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-2.5 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 rounded-full" }),
      index % 2 === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-10 rounded-full" })
    ] }) })
  ] }, index)) });
}
function ActivityDetailDialog({
  logId,
  userNames,
  onOpenChange,
  onApiError
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["activity-log-detail", logId],
    queryFn: () => apiRequest(`/api/v1/request-logs/${logId}`),
    enabled: Boolean(logId)
  });
  reactExports.useEffect(() => {
    if (error) onApiError(error, "Could not load activity detail");
  }, [error, onApiError]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: Boolean(logId), onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl sm:max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      data && /* @__PURE__ */ jsxRuntimeExports.jsx(SourceBadge, { source: data.source }),
      data ? eventLabel(data) : "Activity detail"
    ] }) }),
    isLoading || !data ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Source", value: data.source === "mcp" ? "MCP" : "Console" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Principal", value: logPrincipal(data, userNames).label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Status", value: data.outcome ?? statusLabel(data.status_code) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "When", value: new Date(data.created_at).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Detail,
          {
            label: "Duration",
            value: data.duration_ms != null ? `${data.duration_ms} ms` : "—"
          }
        ),
        data.method && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Method", value: data.method }),
        data.status_code != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Status code", value: String(data.status_code) }),
        data.tool_name && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Tool", value: data.tool_name }),
        data.path && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Path", value: data.path })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(JsonBlock, { value: data.request_body, truncated: data.request_truncated })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Response" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(JsonBlock, { value: data.response_body, truncated: data.response_truncated })
      ] })
    ] })
  ] }) });
}
function Detail({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 break-words text-foreground", children: value })
  ] });
}
function JsonBlock({ value, truncated }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-auto rounded-xl bg-[hsl(220,33%,97%)] p-3 text-xs leading-relaxed text-foreground/90 ring-1 ring-black/5", children: value == null ? "—" : JSON.stringify(value, null, 2) }),
    truncated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Payload truncated." })
  ] });
}
const FIELD_TYPES = ["short_text", "long_text", "rich_text", "markdown", "number", "boolean", "date", "datetime", "json", "slug", "enum", "email", "url", "media", "relation", "component", "dynamic_zone", "seo", "location", "color", "ai_prompt"];
function formatFieldType(type) {
  const labels = {
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
    ai_prompt: "AI prompt"
  };
  return labels[type];
}
function fieldIcon(type) {
  if (type === "number") return Hash;
  if (type === "media") return Image;
  if (type === "relation") return Link2;
  if (type === "dynamic_zone" || type === "component") return GitBranch;
  return Type;
}
function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
function statusClass(status) {
  if (status === "published") return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  if (status === "archived") return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  if (status === "review") return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  return "bg-sky-50 text-sky-700 ring-1 ring-sky-200";
}
function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}
function formatDateTime(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
function formatTokenType(type) {
  if (type === "full_access") return "Full access";
  return "Read only";
}
function asString(value) {
  if (value === null || value === void 0) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value, null, 2);
}
function getEnumValues(options) {
  const values = options.values;
  return Array.isArray(values) ? values.map(String) : [];
}
function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "untitled";
}
function keyify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").replace(/^([0-9])/, "field_$1") || "field";
}
function CmsPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const [openGroups, setOpenGroups] = reactExports.useState({
    "Collection Types": true,
    "Single Types": true,
    Components: true
  });
  const [collections, setCollections] = reactExports.useState([]);
  const [singleTypes, setSingleTypes] = reactExports.useState([]);
  const [components, setComponents] = reactExports.useState([]);
  const [view, setView] = reactExports.useState({
    kind: "collection-list"
  });
  const [selected, setSelected] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [createKind, setCreateKind] = reactExports.useState(null);
  const [createName, setCreateName] = reactExports.useState("");
  const [createUid, setCreateUid] = reactExports.useState("");
  const [createDescription, setCreateDescription] = reactExports.useState("");
  const [createPlural, setCreatePlural] = reactExports.useState("");
  const [creatingType, setCreatingType] = reactExports.useState(false);
  const [componentDialogOpen, setComponentDialogOpen] = reactExports.useState(false);
  const [componentName, setComponentName] = reactExports.useState("");
  const [componentUid, setComponentUid] = reactExports.useState("");
  const [componentCategory, setComponentCategory] = reactExports.useState("blocks");
  const [componentDescription, setComponentDescription] = reactExports.useState("");
  const [creatingComponent, setCreatingComponent] = reactExports.useState(false);
  const {
    data: catalog
  } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest("/api/v1/mcp-catalog"),
    staleTime: 30 * 1e3
  });
  const cmsServer = catalog?.find((s) => s.slug === "cms");
  const handleApiError = reactExports.useCallback((err, fallback = "CMS request failed") => {
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
  const loadCmsRoot = reactExports.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [collectionPage, singlePage, componentPage] = await Promise.all([apiRequest("/api/v1/cms/content-types?kind=collection&limit=200"), apiRequest("/api/v1/cms/content-types?kind=single&limit=200"), apiRequest("/api/v1/cms/components?limit=200")]);
      setCollections(collectionPage.items);
      setSingleTypes(singlePage.items);
      setComponents(componentPage.items);
      setView((current) => {
        if (current.kind !== "collection-list") return current;
        const firstCollection = collectionPage.items[0];
        if (!firstCollection) return current;
        return {
          kind: "schema",
          target: {
            kind: "content-type",
            id: firstCollection.id,
            group: "Collection Types"
          }
        };
      });
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);
  const updateContentType = reactExports.useCallback((next) => {
    const applyUpdate = (item) => item.id === next.id ? next : item;
    setCollections((current) => current.map(applyUpdate));
    setSingleTypes((current) => current.map(applyUpdate));
  }, []);
  const deleteContentType = reactExports.useCallback(async (contentType) => {
    try {
      await apiRequest(`/api/v1/cms/content-types/${contentType.id}`, {
        method: "DELETE"
      });
      let nextCollections = [];
      setCollections((current) => {
        nextCollections = current.filter((item) => item.id !== contentType.id);
        return nextCollections;
      });
      let nextSingles = [];
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
          target: {
            kind: "content-type",
            id: fallback.id,
            group
          }
        });
      } else {
        setView({
          kind: "collection-list"
        });
      }
    } catch (err) {
      handleApiError(err, "Unable to delete content type");
    }
  }, [handleApiError]);
  const openTypeCreator = (kind) => {
    setCreateKind(kind);
    setCreateName("");
    setCreateUid("");
    setCreateDescription("");
    setCreatePlural("");
  };
  const updateCreateName = (value) => {
    setCreateName(value);
    setCreateUid((current) => current ? current : keyify(value));
  };
  const createContentType = async () => {
    if (!createKind) return;
    const name = createName.trim();
    const uid = keyify(createUid || name);
    if (!name || !uid) return;
    setCreatingType(true);
    try {
      const next = await apiRequest("/api/v1/cms/content-types", {
        method: "POST",
        body: JSON.stringify({
          uid,
          display_name: name,
          plural_name: createPlural.trim() || null,
          description: createDescription.trim() || null,
          kind: createKind
        })
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
        target: {
          kind: "content-type",
          id: next.id,
          group
        }
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
  const updateComponentName = (value) => {
    setComponentName(value);
    setComponentUid((current) => current ? current : keyify(value));
  };
  const createComponent = async () => {
    const name = componentName.trim();
    const uid = keyify(componentUid || name);
    const category = keyify(componentCategory);
    if (!name || !uid) return;
    setCreatingComponent(true);
    try {
      const next = await apiRequest("/api/v1/cms/components", {
        method: "POST",
        body: JSON.stringify({
          uid,
          category,
          display_name: name,
          description: componentDescription.trim() || null
        })
      });
      setComponents((current) => [...current, next]);
      setComponentDialogOpen(false);
      setSelected([]);
      setView({
        kind: "schema",
        target: {
          kind: "component",
          id: next.id,
          group: "Components"
        }
      });
    } catch (err) {
      handleApiError(err, "Unable to create component");
    } finally {
      setCreatingComponent(false);
    }
  };
  reactExports.useEffect(() => {
    void loadCmsRoot();
  }, [loadCmsRoot]);
  const activeId = view.kind === "schema" ? view.target.id : view.kind === "entries" || view.kind === "entry" ? view.contentTypeId : "";
  const contentTypeById = reactExports.useMemo(() => {
    return new Map([...collections, ...singleTypes].map((type) => [type.id, type]));
  }, [collections, singleTypes]);
  const componentById = reactExports.useMemo(() => {
    return new Map(components.map((component) => [component.id, component]));
  }, [components]);
  const currentContentType = view.kind === "entries" || view.kind === "entry" ? contentTypeById.get(view.contentTypeId) : view.kind === "schema" && view.target.kind === "content-type" ? contentTypeById.get(view.target.id) : void 0;
  const currentComponent = view.kind === "schema" && view.target.kind === "component" ? componentById.get(view.target.id) : void 0;
  const groups = [{
    label: "Collection Types",
    items: collections,
    createLabel: "Create new Collection type",
    onCreate: () => openTypeCreator("collection"),
    targetFor: (item) => ({
      kind: "content-type",
      id: item.id,
      group: "Collection Types"
    })
  }, {
    label: "Single Types",
    items: singleTypes,
    createLabel: "Create new Single type",
    onCreate: () => openTypeCreator("single"),
    targetFor: (item) => ({
      kind: "content-type",
      id: item.id,
      group: "Single Types"
    })
  }, {
    label: "Components",
    items: components,
    createLabel: "Create new Component",
    onCreate: openComponentCreator,
    targetFor: (item) => ({
      kind: "component",
      id: item.id,
      group: "Components"
    })
  }];
  const selectItem = (target) => {
    setView({
      kind: "schema",
      target
    });
    setSelected([]);
  };
  const searchField = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 w-full items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search content types", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-indigo-200" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Content Manager" })
        ] })
      ] }),
      searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden min-w-0 max-w-2xl flex-1 md:block", children: searchField }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        cmsServer && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EnableMcpServerButton, { serverSlug: cmsServer.slug, enabled: cmsServer.enabled, toolkitIds: cmsServer.toolkit_ids }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Search", onClick: () => setSearchOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 md:hidden", children: searchField }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-[280px] shrink-0 px-3 md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mb-4 h-14 w-[180px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-5 w-5" }),
            " Create"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: "w-56 rounded-2xl p-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", onSelect: () => openTypeCreator("collection"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
              " Collection type"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", onSelect: () => openTypeCreator("single"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
              " Single type"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", onSelect: openComponentCreator, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-4 w-4" }),
              " Component"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-5", children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            [4, 2, 4].map((count, groupIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-28" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-6 rounded-md" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: Array.from({
                length: count
              }).map((_, itemIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 px-3 py-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-1.5 w-1.5 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" })
              ] }, itemIndex)) })
            ] }, groupIndex)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mx-3 mb-2 h-3.5 w-24" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: Array.from({
                length: 4
              }).map((_, itemIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 px-3 py-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4 rounded" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
              ] }, itemIndex)) })
            ] })
          ] }),
          !loading && groups.map((g) => {
            const open = openGroups[g.label];
            const items = g.items.filter((item) => item.display_name.toLowerCase().includes(query.toLowerCase()));
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpenGroups((prev) => ({
                ...prev,
                [g.label]: !prev[g.label]
              })), className: "flex w-full items-center justify-between px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  g.label,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("h-3.5 w-3.5 transition", !open && "-rotate-90") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-[hsl(220,20%,92%)] px-2 py-0.5 text-[10px] font-medium text-muted-foreground", children: g.items.length })
              ] }),
              open && /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-0.5", children: [
                items.map((item) => {
                  const isActive = activeId === item.id;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => selectItem(g.targetFor(item)), className: cn("flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition", isActive ? "bg-indigo-50 font-semibold text-indigo-700" : "text-foreground/80 hover:bg-white/60"), children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-1.5 w-1.5 rounded-full", isActive ? "bg-indigo-600" : "bg-muted-foreground/50") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-left", children: item.display_name })
                  ] }) }, item.id);
                }),
                items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-3 py-1.5 text-sm text-muted-foreground", children: "No items" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: !g.onCreate, onClick: g.onCreate, className: cn("flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-indigo-600 transition hover:bg-white/60", !g.onCreate && "cursor-default opacity-50 hover:bg-transparent"), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: g.createLabel })
                ] }) })
              ] })
            ] }, g.label);
          }),
          !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Discovery" }),
            [{
              kind: "sitemap",
              label: "Sitemap",
              Icon: Map$1
            }, {
              kind: "robots",
              label: "Robots.txt",
              Icon: Bot
            }, {
              kind: "llms",
              label: "LLMs.txt",
              Icon: Sparkles
            }, {
              kind: "llms-full",
              label: "LLMs Full",
              Icon: FileStack
            }].map(({
              kind,
              label,
              Icon
            }) => {
              const isActive = view.kind === kind;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                setView({
                  kind
                });
                setSelected([]);
              }, className: cn("flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition", isActive ? "bg-indigo-50 font-semibold text-indigo-700" : "text-foreground/80 hover:bg-white/60"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-4 w-4", isActive ? "text-indigo-600" : "text-muted-foreground") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-left", children: label })
              ] }, kind);
            })
          ] }),
          !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Access" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              setView({
                kind: "permissions"
              });
              setSelected([]);
            }, className: cn("flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition", view.kind === "permissions" ? "bg-indigo-50 font-semibold text-indigo-700" : "text-foreground/80 hover:bg-white/60"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: cn("h-4 w-4", view.kind === "permissions" ? "text-indigo-600" : "text-muted-foreground") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-left", children: "Permissions" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              setView({
                kind: "activity"
              });
              setSelected([]);
            }, className: cn("flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition", view.kind === "activity" ? "bg-indigo-50 font-semibold text-indigo-700" : "text-foreground/80 hover:bg-white/60"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: cn("h-4 w-4", view.kind === "activity" ? "text-indigo-600" : "text-muted-foreground") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-left", children: "Activity" })
            ] })
          ] }),
          !loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Settings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              setView({
                kind: "api-tokens"
              });
              setSelected([]);
            }, className: cn("flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition", view.kind === "api-tokens" ? "bg-indigo-50 font-semibold text-indigo-700" : "text-foreground/80 hover:bg-white/60"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: cn("h-4 w-4", view.kind === "api-tokens" ? "text-indigo-600" : "text-muted-foreground") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-left", children: "API Tokens" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6"), children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700", role: "alert", children: error }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-64" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-80" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-32 rounded-lg" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-white p-2 shadow-sm ring-1 ring-black/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
            ] }),
            Array.from({
              length: 4
            }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-black/5 px-4 py-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-md bg-indigo-50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28" })
            ] }, index))
          ] })
        ] }),
        !loading && view.kind === "collection-list" && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: "Content-Type Builder" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "No collection types found. Create one in the API to start managing content." })
        ] }),
        !loading && view.kind === "schema" && currentContentType && /* @__PURE__ */ jsxRuntimeExports.jsx(SchemaView, { contentType: currentContentType, onOpenEntries: () => setView({
          kind: "entries",
          contentTypeId: currentContentType.id
        }), onContentTypeUpdated: updateContentType, onDeleteContentType: deleteContentType, onError: handleApiError }),
        !loading && view.kind === "schema" && currentComponent && /* @__PURE__ */ jsxRuntimeExports.jsx(ComponentSchemaView, { component: currentComponent, onError: handleApiError }),
        !loading && view.kind === "entries" && currentContentType && /* @__PURE__ */ jsxRuntimeExports.jsx(EntriesView, { contentType: currentContentType, selected, setSelected, onBack: () => setView({
          kind: "schema",
          target: {
            kind: "content-type",
            id: currentContentType.id,
            group: currentContentType.kind === "single" ? "Single Types" : "Collection Types"
          }
        }), onOpenEntry: (entryId) => setView({
          kind: "entry",
          contentTypeId: currentContentType.id,
          entryId
        }), onError: handleApiError }),
        !loading && view.kind === "entry" && currentContentType && /* @__PURE__ */ jsxRuntimeExports.jsx(EntryView, { contentType: currentContentType, entryId: view.entryId, onBack: () => setView({
          kind: "entries",
          contentTypeId: currentContentType.id
        }), onError: handleApiError }),
        !loading && view.kind === "sitemap" && /* @__PURE__ */ jsxRuntimeExports.jsx(SitemapView, { contentTypes: [...collections, ...singleTypes].map((type) => ({
          id: type.id,
          display_name: type.display_name
        })), onError: handleApiError }),
        !loading && view.kind === "robots" && /* @__PURE__ */ jsxRuntimeExports.jsx(RobotsView, { onError: handleApiError }),
        !loading && view.kind === "llms" && /* @__PURE__ */ jsxRuntimeExports.jsx(LlmsView, { onError: handleApiError }),
        !loading && view.kind === "llms-full" && /* @__PURE__ */ jsxRuntimeExports.jsx(LlmsFullView, { contentTypes: [...collections, ...singleTypes].map((type) => ({
          id: type.id,
          display_name: type.display_name
        })), onError: handleApiError }),
        !loading && view.kind === "permissions" && /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionsMatrix, { toolkitIds: cmsServer?.toolkit_ids ?? [], enabled: cmsServer?.enabled ?? false, theme: lightPermissionsTheme, toolsNoun: "CMS", stripToolPrefix: /^cms_/, disabledHint: "Who can use the CMS tools, and how. Enable the Content (CMS) MCP server first to start granting access.", connectHint: "No toolkit is connected yet — enable the Content (CMS) MCP server from the MCP catalog.", onApiError: handleApiError }),
        !loading && view.kind === "activity" && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityLog, { onApiError: handleApiError, nameServerSlugs: ["cms"], logFilter: (log) => log.tool_name ? log.tool_name.startsWith("cms_") : Boolean(log.path?.startsWith("/api/v1/cms")), description: "Every change made to your content through Console and via CMS tool calls." }),
        !loading && view.kind === "api-tokens" && /* @__PURE__ */ jsxRuntimeExports.jsx(ApiTokensView, { onError: handleApiError })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!createKind, onOpenChange: (open) => !open && setCreateKind(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: createKind === "single" ? "Create new Single type" : "Create new Collection type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: createKind === "single" ? "A single type holds one unique entry, like global settings." : "A collection type holds many entries that share the same fields." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Display name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createName, onChange: (event) => updateCreateName(event.target.value), className: "h-11 rounded-lg", placeholder: createKind === "single" ? "Site Settings" : "Blog Post" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "API UID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createUid, onChange: (event) => setCreateUid(keyify(event.target.value)), className: "h-11 rounded-lg font-mono", placeholder: createKind === "single" ? "site_settings" : "blog_post" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Used to reference this type in the API. Lowercase letters, numbers and underscores." })
        ] }),
        createKind !== "single" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 block text-sm font-medium", children: [
            "Plural name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createPlural, onChange: (event) => setCreatePlural(event.target.value), className: "h-11 rounded-lg", placeholder: "Blog Posts" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 block text-sm font-medium", children: [
            "Description ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: createDescription, onChange: (event) => setCreateDescription(event.target.value), rows: 3, className: "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-lg", disabled: creatingType, onClick: () => setCreateKind(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", disabled: creatingType || !createName.trim(), onClick: createContentType, children: [
          creatingType ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Create"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: componentDialogOpen, onOpenChange: setComponentDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create new Component" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "A component is a reusable group of fields you can embed in content types." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Display name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: componentName, onChange: (event) => updateComponentName(event.target.value), className: "h-11 rounded-lg", placeholder: "Hero Section" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "API UID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: componentUid, onChange: (event) => setComponentUid(keyify(event.target.value)), className: "h-11 rounded-lg font-mono", placeholder: "hero_section" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Used to reference this component in the API. Lowercase letters, numbers and underscores." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: componentCategory, onChange: (event) => setComponentCategory(event.target.value), className: "h-11 rounded-lg", placeholder: "blocks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Components are grouped by category in the builder." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 block text-sm font-medium", children: [
            "Description ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: componentDescription, onChange: (event) => setComponentDescription(event.target.value), rows: 3, className: "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-lg", disabled: creatingComponent, onClick: () => setComponentDialogOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", disabled: creatingComponent || !componentName.trim(), onClick: createComponent, children: [
          creatingComponent ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Create"
        ] })
      ] })
    ] }) })
  ] });
}
function ApiTokensView({
  onError
}) {
  const [tokens, setTokens] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [tokenType, setTokenType] = reactExports.useState("read_only");
  const [creating, setCreating] = reactExports.useState(false);
  const [createdSecret, setCreatedSecret] = reactExports.useState("");
  const [copied, setCopied] = reactExports.useState(false);
  const [pendingDelete, setPendingDelete] = reactExports.useState(null);
  const [deleting, setDeleting] = reactExports.useState(false);
  const loadTokens = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const page = await apiRequest("/api/v1/cms-api/tokens?limit=200");
      setTokens(page.items);
    } catch (err) {
      onError(err, "Unable to load API tokens");
    } finally {
      setLoading(false);
    }
  }, [onError]);
  reactExports.useEffect(() => {
    void loadTokens();
  }, [loadTokens]);
  const openCreateDialog = () => {
    setName("");
    setDescription("");
    setTokenType("read_only");
    setCreateOpen(true);
  };
  const createToken = async () => {
    const trimmedName = name.trim();
    if (!trimmedName || tokenType !== "read_only") return;
    setCreating(true);
    try {
      const next = await apiRequest("/api/v1/cms-api/tokens", {
        method: "POST",
        body: JSON.stringify({
          name: trimmedName,
          description: description.trim() || null,
          token_type: tokenType
        })
      });
      setTokens((current) => [next, ...current]);
      setCreatedSecret(next.secret);
      setCopied(false);
      setCreateOpen(false);
    } catch (err) {
      onError(err, "Unable to create API token");
    } finally {
      setCreating(false);
    }
  };
  const copySecret = async () => {
    if (!createdSecret) return;
    await navigator.clipboard.writeText(createdSecret);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  const deleteToken = async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await apiRequest(`/api/v1/cms-api/tokens/${pendingDelete.id}`, {
        method: "DELETE"
      });
      setTokens((current) => current.filter((token) => token.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (err) {
      onError(err, "Unable to delete API token");
    } finally {
      setDeleting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold tracking-tight", children: "API Tokens" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "List of generated tokens to consume the API" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", onClick: openCreateDialog, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
        " Create new API Token"
      ] })
    ] }),
    createdSecret && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm ring-1 ring-black/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Copy your API token" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "This token is shown once. Store it somewhere secure before leaving this page." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-lg", onClick: copySecret, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "mr-1.5 h-4 w-4" }),
          copied ? "Copied" : "Copy"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { readOnly: true, value: createdSecret, className: "mt-4 h-11 rounded-lg bg-[hsl(220,33%,98%)] font-mono text-sm", onFocus: (event) => event.currentTarget.select() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wide", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wide", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wide", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wide", children: "Created at" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "px-6 py-4 text-xs font-semibold uppercase tracking-wide", children: "Last used" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: loading ? Array.from({
        length: 3
      }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-md" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full" }) }) })
      ] }, index)) : tokens.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 6, className: "px-6 py-8 text-sm text-muted-foreground", children: "No API tokens created yet." }) }) : tokens.map((token) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4 font-semibold", children: token.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-[360px] truncate px-6 py-4 text-muted-foreground", children: token.description || "-" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "border-indigo-200 bg-indigo-50 text-indigo-700", children: formatTokenType(token.token_type) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4 text-muted-foreground", children: formatDateTime(token.created_at) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4 text-muted-foreground", children: formatDateTime(token.last_used_at) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full text-muted-foreground hover:text-rose-600", "aria-label": `Delete ${token.name}`, onClick: () => setPendingDelete(token), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }) }) })
      ] }, token.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create new API Token" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Generate a token for external clients that read published CMS content." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (event) => setName(event.target.value), className: "h-11 rounded-lg", placeholder: "Website" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 block text-sm font-medium", children: [
            "Description ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: description, onChange: (event) => setDescription(event.target.value), className: "min-h-24 rounded-lg", placeholder: "Used by the public website" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Token type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setTokenType("read_only"), className: cn("rounded-xl border px-4 py-3 text-left transition", tokenType === "read_only" ? "border-indigo-300 bg-indigo-50 ring-2 ring-indigo-100" : "border-black/10 bg-white hover:bg-[hsl(220,33%,98%)]"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-semibold", children: "Read only" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs text-muted-foreground", children: "Access published content with GET requests." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: true, className: "cursor-not-allowed rounded-xl border border-black/10 bg-[hsl(220,20%,96%)] px-4 py-3 text-left opacity-80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm font-semibold", children: [
                "Full access",
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "bg-amber-100 text-amber-800", children: "Soon" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs text-muted-foreground", children: "Write, edit, and delete APIs are not enabled yet." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-lg", disabled: creating, onClick: () => setCreateOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", disabled: creating || !name.trim() || tokenType !== "read_only", onClick: createToken, children: [
          creating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Create token"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!pendingDelete, onOpenChange: (open) => !open && !deleting && setPendingDelete(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete API token?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: pendingDelete ? `The token "${pendingDelete.name}" will stop working immediately.` : "This token will stop working immediately." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleting, className: "rounded-lg", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogAction, { disabled: deleting, className: "rounded-lg bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-300", onClick: (event) => {
          event.preventDefault();
          void deleteToken();
        }, children: [
          deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Delete"
        ] })
      ] })
    ] }) })
  ] });
}
function SchemaView({
  contentType,
  onOpenEntries,
  onContentTypeUpdated,
  onDeleteContentType,
  onError
}) {
  const [fields, setFields] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [editingContentType, setEditingContentType] = reactExports.useState(false);
  const [confirmDeleteType, setConfirmDeleteType] = reactExports.useState(false);
  const [deletingType, setDeletingType] = reactExports.useState(false);
  const [contentTypeName, setContentTypeName] = reactExports.useState(contentType.display_name);
  const [contentTypeDescription, setContentTypeDescription] = reactExports.useState(contentType.description ?? "");
  const [editingField, setEditingField] = reactExports.useState(null);
  const [fieldLabel, setFieldLabel] = reactExports.useState("");
  const [fieldType, setFieldType] = reactExports.useState("short_text");
  const [fieldRequired, setFieldRequired] = reactExports.useState(false);
  const [fieldUnique, setFieldUnique] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [creatingField, setCreatingField] = reactExports.useState(false);
  const [newFieldLabel, setNewFieldLabel] = reactExports.useState("");
  const [newFieldKey, setNewFieldKey] = reactExports.useState("");
  const [newFieldType, setNewFieldType] = reactExports.useState("short_text");
  const [newFieldRequired, setNewFieldRequired] = reactExports.useState(false);
  const [newFieldUnique, setNewFieldUnique] = reactExports.useState(false);
  const loadFields = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const rows = await apiRequest(`/api/v1/cms/content-types/${contentType.id}/fields`);
      setFields(rows);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [contentType.id, onError]);
  reactExports.useEffect(() => {
    setContentTypeName(contentType.display_name);
    setContentTypeDescription(contentType.description ?? "");
  }, [contentType.description, contentType.display_name]);
  reactExports.useEffect(() => {
    let active = true;
    setLoading(true);
    apiRequest(`/api/v1/cms/content-types/${contentType.id}/fields`).then((rows) => {
      if (active) setFields(rows);
    }).catch((err) => {
      if (active) onError(err);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [contentType.id, onError]);
  const openFieldEditor = (field) => {
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
  const updateNewFieldLabel = (value) => {
    setNewFieldLabel(value);
    setNewFieldKey((current) => current ? current : keyify(value));
  };
  const createField = async () => {
    const label = newFieldLabel.trim();
    const key = keyify(newFieldKey || label);
    if (!label || !key) return;
    setSaving(true);
    try {
      const next = await apiRequest(`/api/v1/cms/content-types/${contentType.id}/fields`, {
        method: "POST",
        body: JSON.stringify({
          key,
          label,
          field_type: newFieldType,
          is_required: newFieldRequired,
          is_unique: newFieldUnique,
          order_index: fields.length
        })
      });
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
      const next = await apiRequest(`/api/v1/cms/content-types/${contentType.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          display_name: name,
          description: contentTypeDescription.trim() || null
        })
      });
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
      const next = await apiRequest(`/api/v1/cms/fields/${editingField.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          label: fieldLabel.trim(),
          field_type: fieldType,
          is_required: fieldRequired,
          is_unique: fieldUnique
        })
      });
      setFields((current) => current.map((field) => field.id === next.id ? next : field));
      setEditingField(null);
      await loadFields();
    } catch (err) {
      onError(err, "Unable to update field");
    } finally {
      setSaving(false);
    }
  };
  const deleteField = async (field) => {
    try {
      await apiRequest(`/api/v1/cms/fields/${field.id}`, {
        method: "DELETE"
      });
      setFields((current) => current.filter((row) => row.id !== field.id));
    } catch (err) {
      onError(err, "Unable to delete field");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold tracking-tight", children: contentType.display_name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: contentType.description || "Build the data architecture of your content." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-lg", onClick: onOpenEntries, children: "View entries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", className: "rounded-lg", "aria-label": "More actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => setEditingContentType(true), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "mr-2 h-4 w-4" }),
              " Edit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-rose-600 focus:text-rose-600", onClick: () => setConfirmDeleteType(true), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "mr-2 h-4 w-4" }),
              " Delete"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirmDeleteType, onOpenChange: setConfirmDeleteType, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
          "Delete “",
          contentType.display_name,
          "”?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "This will permanently delete this",
          " ",
          contentType.kind === "single" ? "single" : "collection",
          " type and all of its entries. This action cannot be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deletingType, children: "No" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogAction, { className: "bg-rose-600 hover:bg-rose-700", disabled: deletingType, onClick: (e) => {
          e.preventDefault();
          setDeletingType(true);
          void Promise.resolve(onDeleteContentType(contentType)).finally(() => {
            setDeletingType(false);
            setConfirmDeleteType(false);
          });
        }, children: [
          deletingType ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : null,
          "Yes"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsTable, { fields, loading, emptyText: "No fields found for this content type.", onEditField: openFieldEditor, onDeleteField: deleteField, onAddField: openFieldCreator, addFieldLabel: contentType.kind === "single" ? "Add another field to this Single type" : "Add another field to this Collection type" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editingContentType, onOpenChange: setEditingContentType, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit content type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the name and description shown in the CMS." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: contentTypeName, onChange: (event) => setContentTypeName(event.target.value), className: "h-11 rounded-lg" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: contentTypeDescription, onChange: (event) => setContentTypeDescription(event.target.value), rows: 3, className: "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-lg", disabled: saving, onClick: () => setEditingContentType(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", disabled: saving || !contentTypeName.trim(), onClick: saveContentType, children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Save changes"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: creatingField, onOpenChange: setCreatingField, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add new field" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Add a field to the ",
          contentType.display_name,
          " schema."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newFieldLabel, onChange: (event) => updateNewFieldLabel(event.target.value), className: "h-11 rounded-lg", placeholder: "Title" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newFieldKey, onChange: (event) => setNewFieldKey(keyify(event.target.value)), className: "h-11 rounded-lg font-mono", placeholder: "title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Used as the field identifier in the API. Lowercase letters, numbers and underscores." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: newFieldType, onChange: (event) => setNewFieldType(event.target.value), className: "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200", children: FIELD_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: type, children: formatFieldType(type) }, type)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: newFieldRequired, onCheckedChange: (checked) => setNewFieldRequired(checked === true) }),
          "Required field"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: newFieldUnique, onCheckedChange: (checked) => setNewFieldUnique(checked === true) }),
          "Unique value"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-lg", disabled: saving, onClick: () => setCreatingField(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", disabled: saving || !newFieldLabel.trim(), onClick: createField, children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Add field"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!editingField, onOpenChange: (open) => !open && setEditingField(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit field" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update how this field appears in the schema." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: fieldLabel, onChange: (event) => setFieldLabel(event.target.value), className: "h-11 rounded-lg" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: fieldType, onChange: (event) => setFieldType(event.target.value), className: "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200", children: FIELD_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: type, children: formatFieldType(type) }, type)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: fieldRequired, onCheckedChange: (checked) => setFieldRequired(checked === true) }),
          "Required field"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: fieldUnique, onCheckedChange: (checked) => setFieldUnique(checked === true) }),
          "Unique value"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-lg", disabled: saving, onClick: () => setEditingField(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", disabled: saving || !fieldLabel.trim(), onClick: saveField, children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Save changes"
        ] })
      ] })
    ] }) })
  ] });
}
function ComponentSchemaView({
  component,
  onError
}) {
  const [fields, setFields] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [creatingField, setCreatingField] = reactExports.useState(false);
  const [newFieldLabel, setNewFieldLabel] = reactExports.useState("");
  const [newFieldKey, setNewFieldKey] = reactExports.useState("");
  const [newFieldType, setNewFieldType] = reactExports.useState("short_text");
  const [newFieldRequired, setNewFieldRequired] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  reactExports.useEffect(() => {
    let cancelled = false;
    const loadFields = async () => {
      setLoading(true);
      try {
        const rows = await apiRequest(`/api/v1/cms/components/${component.id}/fields`);
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
  const updateNewFieldLabel = (value) => {
    setNewFieldLabel(value);
    setNewFieldKey((current) => current ? current : keyify(value));
  };
  const createField = async () => {
    const label = newFieldLabel.trim();
    const key = keyify(newFieldKey || label);
    if (!label || !key) return;
    setSaving(true);
    try {
      const next = await apiRequest(`/api/v1/cms/components/${component.id}/fields`, {
        method: "POST",
        body: JSON.stringify({
          key,
          label,
          field_type: newFieldType,
          is_required: newFieldRequired,
          order_index: fields.length
        })
      });
      setFields((current) => [...current, next]);
      setCreatingField(false);
    } catch (err) {
      onError(err, "Unable to create field");
    } finally {
      setSaving(false);
    }
  };
  const deleteField = async (field) => {
    try {
      await apiRequest(`/api/v1/cms/component-fields/${field.id}`, {
        method: "DELETE"
      });
      setFields((current) => current.filter((row) => row.id !== field.id));
    } catch (err) {
      onError(err, "Unable to delete field");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold tracking-tight", children: component.display_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-200", children: component.category })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: component.description || "Reusable component schema." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-lg text-indigo-600", onClick: openFieldCreator, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
        " Add new field"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsTable, { fields, loading, emptyText: "No fields found for this component.", onDeleteField: deleteField, onAddField: openFieldCreator, addFieldLabel: "Add another field to this Component" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: creatingField, onOpenChange: setCreatingField, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add new field" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Add a field to the ",
          component.display_name,
          " component."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Label" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newFieldLabel, onChange: (event) => updateNewFieldLabel(event.target.value), className: "h-11 rounded-lg", placeholder: "Title" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newFieldKey, onChange: (event) => setNewFieldKey(keyify(event.target.value)), className: "h-11 rounded-lg font-mono", placeholder: "title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Used as the field identifier in the API. Lowercase letters, numbers and underscores." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: newFieldType, onChange: (event) => setNewFieldType(event.target.value), className: "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200", children: FIELD_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: type, children: formatFieldType(type) }, type)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: newFieldRequired, onCheckedChange: (checked) => setNewFieldRequired(checked === true) }),
          "Required field"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-lg", disabled: saving, onClick: () => setCreatingField(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", disabled: saving || !newFieldLabel.trim(), onClick: createField, children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Add field"
        ] })
      ] })
    ] }) })
  ] });
}
function FieldsTable({
  fields,
  loading,
  emptyText,
  onEditField,
  onDeleteField,
  onAddField,
  addFieldLabel = "Add another field to this Collection type"
}) {
  const [pendingDelete, setPendingDelete] = reactExports.useState(null);
  const [deleting, setDeleting] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_2fr_80px] gap-4 border-b border-black/5 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsTableSkeleton, {}) : fields.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-6 text-sm text-muted-foreground", children: emptyText }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: fields.map((f) => {
      const Icon = fieldIcon(f.field_type);
      const hasActions = Boolean(onEditField || onDeleteField);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group grid grid-cols-[1fr_2fr_80px] items-center gap-4 border-b border-black/5 px-6 py-4 last:border-b-0 hover:bg-[hsl(220,33%,98%)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-md bg-indigo-50 text-indigo-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: f.label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground/80", children: formatFieldType(f.field_type) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end", children: hasActions && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full opacity-0 transition focus-visible:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100", "aria-label": "Field actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-40 rounded-xl p-1", children: [
            onEditField && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-2 rounded-lg", onSelect: () => onEditField(f), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-4 w-4" }),
              " Edit"
            ] }),
            onDeleteField && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-2 rounded-lg text-rose-600 focus:bg-rose-50 focus:text-rose-700", onSelect: (event) => {
              event.preventDefault();
              setPendingDelete(f);
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
              " Delete"
            ] })
          ] })
        ] }) })
      ] }, f.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: !onAddField, onClick: onAddField, className: cn("flex w-full items-center gap-3 bg-indigo-50/60 px-6 py-4 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50", !onAddField && "cursor-default opacity-50 hover:bg-indigo-50/60"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-6 w-6 place-items-center rounded-full bg-indigo-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) }),
      addFieldLabel
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!pendingDelete, onOpenChange: (open) => !open && !deleting && setPendingDelete(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete field" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Are you sure you want to delete",
          pendingDelete ? ` "${pendingDelete.label}"` : " this field",
          "? This action cannot be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: deleting, className: "rounded-lg", children: "No" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogAction, { disabled: deleting, onClick: (event) => {
          event.preventDefault();
          void confirmDelete();
        }, className: "rounded-lg bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-300", children: [
          deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Yes"
        ] })
      ] })
    ] }) })
  ] });
}
function FieldsTableSkeleton() {
  const rows = Array.from({
    length: 8
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { "aria-label": "Loading fields", children: rows.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-[1fr_2fr_80px] items-center gap-4 border-b border-black/5 px-6 py-4 last:border-b-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-md bg-indigo-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full" }) })
  ] }, index)) });
}
function EntriesView({
  contentType,
  selected,
  setSelected,
  onBack,
  onOpenEntry,
  onError
}) {
  const [q, setQ] = reactExports.useState("");
  const [entries, setEntries] = reactExports.useState([]);
  const [total, setTotal] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(true);
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [createTitle, setCreateTitle] = reactExports.useState("");
  const [createDocumentKey, setCreateDocumentKey] = reactExports.useState("");
  const [createLocale, setCreateLocale] = reactExports.useState("en");
  const [creating, setCreating] = reactExports.useState(false);
  const loadEntries = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        content_type_id: contentType.id,
        limit: "50",
        offset: "0"
      });
      if (q.trim()) params.set("q", q.trim());
      const page = await apiRequest(`/api/v1/cms/entries?${params.toString()}`);
      const rows = await Promise.all(page.items.map(async (entry) => {
        const detail = await apiRequest(`/api/v1/cms/entries/${entry.id}`);
        return {
          ...entry,
          primaryLocale: detail.locales[0] ?? null
        };
      }));
      setEntries(rows);
      setTotal(page.total);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [contentType.id, onError, q]);
  reactExports.useEffect(() => {
    void loadEntries();
  }, [loadEntries]);
  const allChecked = entries.length > 0 && entries.every((e) => selected.includes(e.id));
  const toggleAll = () => setSelected(allChecked ? [] : entries.map((e) => e.id));
  const toggle = (id) => setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  const openCreateDialog = () => {
    setCreateTitle("");
    setCreateDocumentKey("");
    setCreateLocale("en");
    setCreateOpen(true);
  };
  const updateCreateTitle = (value) => {
    setCreateTitle(value);
    setCreateDocumentKey((current) => current || slugify(value));
  };
  const createEntry = async () => {
    const title = createTitle.trim();
    if (!title) return;
    setCreating(true);
    try {
      const response = await apiRequest("/api/v1/cms/entries", {
        method: "POST",
        body: JSON.stringify({
          content_type_id: contentType.id,
          document_key: createDocumentKey.trim() || slugify(title),
          locale: createLocale.trim() || "en",
          title,
          data: {}
        })
      });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onBack, className: "flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold tracking-tight", children: contentType.display_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-muted-foreground", children: [
          total,
          " entries found"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", onClick: openCreateDialog, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
        " Create new entry"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search", className: "h-9 w-48 rounded-lg border-black/10 bg-white pl-9" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: true, variant: "outline", size: "sm", className: "h-9 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "mr-1.5 h-3.5 w-3.5" }),
          " Filters"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, variant: "ghost", size: "icon", className: "h-9 w-9 rounded-full", "aria-label": "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }) })
    ] }),
    selected.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
        selected.length,
        " entries selected"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, size: "sm", className: "h-8 rounded-lg bg-indigo-600 hover:bg-indigo-700", children: "Publish" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, size: "sm", variant: "outline", className: "h-8 rounded-lg text-rose-600", children: "Delete" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[40px_80px_1fr_2fr_140px_120px_40px] items-center gap-4 border-b border-black/5 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: allChecked, onCheckedChange: toggleAll }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Document key" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Updated" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(EntriesTableSkeleton, {}) : entries.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-6 text-sm text-muted-foreground", children: "No entries found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: entries.map((e) => {
        const checked = selected.includes(e.id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid cursor-pointer grid-cols-[40px_80px_1fr_2fr_140px_120px_40px] items-center gap-4 border-b border-black/5 px-6 py-4 text-sm last:border-b-0 hover:bg-[hsl(220,33%,98%)]", onClick: () => onOpenEntry(e.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onClick: (ev) => ev.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked, onCheckedChange: () => toggle(e.id) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-muted-foreground", title: e.id, children: e.id.slice(0, 8) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-medium", children: e.primaryLocale?.title || "Untitled" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-foreground/80", children: e.document_key }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground", children: formatDate(e.updated_at) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-md px-2.5 py-1 text-xs font-medium", statusClass(e.primaryLocale?.status ?? e.status)), children: formatStatus(e.primaryLocale?.status ?? e.status) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", "aria-label": "More", onClick: (ev) => ev.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) })
        ] }, e.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create new entry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          "Start a new ",
          contentType.display_name.toLowerCase(),
          " draft."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createTitle, onChange: (event) => updateCreateTitle(event.target.value), className: "h-11 rounded-lg", placeholder: "Untitled entry" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Document key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createDocumentKey, onChange: (event) => setCreateDocumentKey(slugify(event.target.value)), className: "h-11 rounded-lg", placeholder: "untitled-entry" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Locale" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: createLocale, onChange: (event) => setCreateLocale(event.target.value), className: "h-11 rounded-lg" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-lg", disabled: creating, onClick: () => setCreateOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", disabled: creating || !createTitle.trim(), onClick: createEntry, children: [
          creating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Create entry"
        ] })
      ] })
    ] }) })
  ] });
}
function EntriesTableSkeleton() {
  const rows = Array.from({
    length: 6
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { "aria-label": "Loading entries", children: rows.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-[40px_80px_1fr_2fr_140px_120px_40px] items-center gap-4 border-b border-black/5 px-6 py-4 last:border-b-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-5 rounded-md" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-52" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-20 rounded-md" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full" })
  ] }, index)) });
}
function EntryView({
  contentType,
  entryId,
  onBack,
  onError
}) {
  const [fields, setFields] = reactExports.useState([]);
  const [entry, setEntry] = reactExports.useState(null);
  const [locale, setLocale] = reactExports.useState(null);
  const [draftVersion, setDraftVersion] = reactExports.useState(null);
  const [publishedVersion, setPublishedVersion] = reactExports.useState(null);
  const [title, setTitle] = reactExports.useState("");
  const [data, setData] = reactExports.useState({});
  const [jsonErrors, setJsonErrors] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  const [mutating, setMutating] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  const loadEntry = reactExports.useCallback(async () => {
    setLoading(true);
    setMessage("");
    try {
      const [fieldRows, detail] = await Promise.all([apiRequest(`/api/v1/cms/content-types/${contentType.id}/fields`), apiRequest(`/api/v1/cms/entries/${entryId}`)]);
      const primaryLocale = detail.locales[0];
      if (!primaryLocale) {
        throw new Error("This entry has no locales to edit.");
      }
      const localeDetail = await apiRequest(`/api/v1/cms/entry-locales/${primaryLocale.id}`);
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
  reactExports.useEffect(() => {
    void loadEntry();
  }, [loadEntry]);
  const updateField = (key, value) => {
    setData((current) => ({
      ...current,
      [key]: value
    }));
  };
  const updateJsonField = (key, value) => {
    try {
      updateField(key, value.trim() ? JSON.parse(value) : null);
      setJsonErrors((current) => {
        const next = {
          ...current
        };
        delete next[key];
        return next;
      });
    } catch {
      setJsonErrors((current) => ({
        ...current,
        [key]: "Invalid JSON"
      }));
    }
  };
  const saveDraft = async () => {
    if (!locale || Object.keys(jsonErrors).length > 0) return;
    setMutating(true);
    setMessage("");
    try {
      const detail = await apiRequest(`/api/v1/cms/entry-locales/${locale.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title,
          data
        })
      });
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
      await apiRequest(`/api/v1/cms/entry-locales/${locale.id}/publish`, {
        method: "POST"
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
      const nextLocale = await apiRequest(`/api/v1/cms/entry-locales/${locale.id}/unpublish`, {
        method: "POST"
      });
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
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex items-center gap-2 rounded-2xl bg-white p-6 text-muted-foreground shadow-sm ring-1 ring-black/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Loading entry..."
    ] });
  }
  if (!entry || !locale) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-2xl bg-white p-6 text-sm text-muted-foreground shadow-sm ring-1 ring-black/5", children: "Entry not found." });
  }
  const hasJsonErrors = Object.keys(jsonErrors).length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onBack, className: "flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to ",
      contentType.display_name
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "break-words text-4xl font-semibold tracking-tight", children: title || "Untitled" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-muted-foreground", children: [
          "Edit and publish your ",
          contentType.display_name.toLowerCase(),
          " entry."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-lg", disabled: mutating || hasJsonErrors, onClick: saveDraft, children: [
          mutating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Save draft"
        ] }),
        locale.status === "published" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-lg", disabled: mutating, onClick: unpublish, children: "Unpublish" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-lg bg-indigo-600 hover:bg-indigo-700", disabled: mutating || hasJsonErrors, onClick: publish, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mr-1.5 h-4 w-4" }),
          " Publish"
        ] })
      ] })
    ] }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200", children: message }),
    hasJsonErrors && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 ring-1 ring-rose-200", children: "Fix invalid JSON fields before saving." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), className: "h-11 rounded-lg" })
        ] }),
        fields.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No fields found for this content type." }) : fields.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsx(FieldEditor, { field, value: data[field.key], jsonError: jsonErrors[field.key], onChange: (value) => updateField(field.key, value), onJsonChange: (value) => updateJsonField(field.key, value) }, field.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "truncate font-medium", title: entry.id, children: entry.id.slice(0, 8) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Locale" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: locale.locale })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-md px-2 py-0.5 text-xs font-medium", statusClass(locale.status)), children: formatStatus(locale.status) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Draft" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: draftVersion ? `v${draftVersion.version_number}` : "-" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Published" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: publishedVersion ? `v${publishedVersion.version_number}` : "-" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Updated" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: formatDate(locale.updated_at) })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function FieldEditor({
  field,
  value,
  jsonError,
  onChange,
  onJsonChange
}) {
  const label = `${field.label}${field.is_required ? " *" : ""}`;
  const commonInputClass = "h-11 rounded-lg";
  const [jsonText, setJsonText] = reactExports.useState(JSON.stringify(value ?? null, null, 2));
  reactExports.useEffect(() => {
    setJsonText(JSON.stringify(value ?? null, null, 2));
  }, [value]);
  if (field.field_type === "boolean") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-lg border border-black/10 bg-white px-3 py-3 text-sm font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: Boolean(value), onCheckedChange: (checked) => onChange(checked === true) }),
      label
    ] });
  }
  if (field.field_type === "long_text" || field.field_type === "rich_text" || field.field_type === "markdown") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: asString(value), onChange: (e) => onChange(e.target.value), rows: field.field_type === "long_text" ? 4 : 8, className: "w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" })
    ] });
  }
  if (field.field_type === "number") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: asString(value), onChange: (e) => onChange(e.target.value === "" ? null : Number(e.target.value)), className: commonInputClass })
    ] });
  }
  if (field.field_type === "date" || field.field_type === "datetime") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: field.field_type === "date" ? "date" : "datetime-local", value: asString(value), onChange: (e) => onChange(e.target.value || null), className: commonInputClass })
    ] });
  }
  if (field.field_type === "enum") {
    const values = getEnumValues(field.options);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: asString(value), onChange: (e) => onChange(e.target.value || null), className: "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select..." }),
        values.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option, children: option }, option))
      ] })
    ] });
  }
  if (field.field_type === "json" || isComplexField(field.field_type)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: jsonText, onChange: (e) => {
        setJsonText(e.target.value);
        onJsonChange(e.target.value);
      }, rows: 6, className: cn("w-full rounded-lg border bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2", jsonError ? "border-rose-300 focus:ring-rose-200" : "border-black/10 focus:ring-indigo-200") }),
      jsonError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-medium text-rose-600", children: jsonError })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: field.field_type === "email" ? "email" : field.field_type === "url" ? "url" : field.field_type === "color" ? "color" : "text", value: asString(value), onChange: (e) => onChange(e.target.value), className: commonInputClass })
  ] });
}
function isComplexField(type) {
  return type === "media" || type === "relation" || type === "component" || type === "dynamic_zone" || type === "seo" || type === "location" || type === "ai_prompt";
}
export {
  CmsPage as component
};
