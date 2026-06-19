import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ActivityLog } from "./activity-log-B5l1oEBM.mjs";
import { P as PinterestIcon, A as AppsMenu, a as AccountMenu } from "./account-menu-DSoi5KdC.mjs";
import { E as EnableMcpServerButton } from "./enable-mcp-server-button-Cbu9jR_I.mjs";
import { a as PermissionsMatrix, l as lightPermissionsTheme } from "./permissions-matrix-4w0Eu5YN.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { S as Skeleton } from "./skeleton-CoUJiN10.mjs";
import { S as Switch$1, a as SwitchThumb } from "../_libs/radix-ui__react-switch.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { A as ApiError, c as clearAuthTokens, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { a as Route$4 } from "./router-Dn9BFNaf.mjs";
import { M as Menu, e as Settings, K as KeyRound, j as Activity, l as Search, W as Image, aD as ListChecks, i as Lock } from "../_libs/lucide-react.mjs";
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
import "./dialog-CypSg8M2.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
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
import "./popover-ColJhc-i.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "./alert-dialog-DteJ2TLP.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "./input-C0QjszdI.mjs";
import "./label-JU3yqRBo.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./sheet-CCXbRTbu.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/tailwind-merge.mjs";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Switch$1,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwitchThumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Switch$1.displayName;
const RESOURCE_LABELS = {
  search: "Search results",
  pin: "Pin detail"
};
const PINTEREST_NAV = [{
  id: "settings",
  label: "Settings",
  icon: Settings
}, {
  id: "permissions",
  label: "Permissions",
  icon: KeyRound
}, {
  id: "activity",
  label: "Activity",
  icon: Activity
}];
const RESOURCE_ICONS = {
  search: Search,
  pin: Image
};
const TOOL_OPTIONS = [{
  name: "pinterest_search",
  icon: Search,
  title: "Search pins",
  description: "Search Pinterest by query. Supports an 'all' or 'video' filter and a result limit (paginated).",
  args: ["query (required)", "filter: all | video", "limit: 1–100", "fields[]"]
}, {
  name: "pinterest_scrape_pin",
  icon: Image,
  title: "Scrape a pin",
  description: "Fetch a single pin (image or video) by numeric id or pin URL, with engagement stats and video URL available as optional fields.",
  args: ["pin (required) — id or URL", "fields[]"]
}, {
  name: "pinterest_list_fields",
  icon: ListChecks,
  title: "List fields",
  description: "Discover every available response field per resource, marking which are required and which are optional.",
  args: []
}];
function PinterestPage() {
  const navigate = useNavigate();
  const view = Route$4.useParams().view;
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const {
    data: fields,
    isLoading: fieldsLoading
  } = useQuery({
    queryKey: ["pinterest-fields"],
    queryFn: () => apiRequest("/api/v1/pinterest/fields"),
    staleTime: 30 * 1e3
  });
  const {
    data: catalog
  } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest("/api/v1/mcp-catalog"),
    staleTime: 60 * 1e3
  });
  const server = catalog?.find((s) => s.slug === "pinterest");
  const toolkitIds = server?.toolkit_ids ?? [];
  const handleApiError = reactExports.useCallback((err, fallback = "Pinterest request failed") => {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      clearAuthTokens();
      void navigate({
        to: "/login",
        replace: true
      });
      return;
    }
    toast.error(err instanceof Error ? err.message : fallback);
  }, [navigate]);
  const pinterestLogFilter = reactExports.useCallback((log) => {
    return Boolean(log.tool_name?.startsWith("pinterest_") || log.path?.includes("/pinterest"));
  }, []);
  const [selected, setSelected] = reactExports.useState({
    search: /* @__PURE__ */ new Set(),
    pin: /* @__PURE__ */ new Set()
  });
  const [allowOverride, setAllowOverride] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!fields) return;
    const next = {
      search: /* @__PURE__ */ new Set(),
      pin: /* @__PURE__ */ new Set()
    };
    for (const res of fields.resources) {
      for (const f of res.fields) {
        if (!f.required && f.default) next[res.resource].add(f.name);
      }
    }
    setSelected(next);
    setAllowOverride(fields.allow_agent_field_override);
  }, [fields]);
  const save = useMutation({
    mutationFn: (body) => apiRequest("/api/v1/pinterest/settings", {
      method: "PUT",
      body: JSON.stringify(body)
    }),
    onSuccess: () => {
      toast.success("Pinterest fields saved");
      queryClient.invalidateQueries({
        queryKey: ["pinterest-fields"]
      });
    },
    onError: () => toast.error("Couldn't save Pinterest fields")
  });
  const dirty = reactExports.useMemo(() => {
    if (!fields) return false;
    if (allowOverride !== fields.allow_agent_field_override) return true;
    for (const res of fields.resources) {
      const original = new Set(res.fields.filter((f) => !f.required && f.default).map((f) => f.name));
      const current = selected[res.resource];
      if (original.size !== current.size) return true;
      for (const name of current) if (!original.has(name)) return true;
    }
    return false;
  }, [fields, selected, allowOverride]);
  function toggle(resource, name) {
    setSelected((prev) => {
      const next = new Set(prev[resource]);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return {
        ...prev,
        [resource]: next
      };
    });
  }
  function onSave() {
    save.mutate({
      search_default_fields: [...selected.search],
      pin_default_fields: [...selected.pin],
      allow_agent_field_override: allowOverride
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/mcp", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PinterestIcon, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-medium tracking-tight", children: "Pinterest MCP" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        server && /* @__PURE__ */ jsxRuntimeExports.jsx(EnableMcpServerButton, { serverSlug: "pinterest", enabled: server.enabled, toolkitIds: server.toolkit_ids }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden w-[260px] shrink-0 px-3 md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: PINTEREST_NAV.map((item) => {
        const active = view === item.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pinterest/$view", params: {
          view: item.id
        }, className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", active ? "bg-red-50 text-[#B6001C]" : "text-foreground/80 hover:bg-white/60"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-5 w-5 text-current/75" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: item.label })
        ] }, item.id);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-w-0 flex-1 px-4 pb-16 md:pr-6", children: [
        view === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl text-sm text-muted-foreground", children: "Scrape Pinterest public search results and individual pins. Each tool returns a required minimum field set; below you choose which optional fields are also exposed by default, and whether agents may request more per call." }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-medium uppercase tracking-wide text-muted-foreground", children: "Tools available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: TOOL_OPTIONS.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white p-5 ring-1 ring-black/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-[#E60023]/10 text-[#E60023]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(tool.icon, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-base font-medium", children: tool.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs text-muted-foreground", children: tool.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: tool.description }),
              tool.args.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1", children: tool.args.map((arg) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-muted px-1 py-0.5", children: arg }) }, arg)) })
            ] }, tool.name)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-medium uppercase tracking-wide text-muted-foreground", children: "Response fields" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", disabled: !dirty || save.isPending, onClick: onSave, children: save.isPending ? "Saving…" : "Save changes" })
            ] }),
            fieldsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsSkeleton, {}),
            fields && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              fields.resources.map((res) => {
                const Icon = RESOURCE_ICONS[res.resource];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl bg-white ring-1 ring-black/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-black/5 px-5 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-[#E60023]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: RESOURCE_LABELS[res.resource] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      res.fields.filter((f) => f.required).length,
                      " required ·",
                      " ",
                      res.fields.filter((f) => !f.required).length,
                      " optional"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-black/5", children: res.fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-4 px-5 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-sm font-medium", children: f.name }),
                        f.required ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "gap-1 text-[10px] uppercase", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
                          " Required"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-[10px] uppercase", children: "Optional" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: f.description })
                    ] }),
                    f.required ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Always" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: selected[res.resource].has(f.name), onCheckedChange: () => toggle(res.resource, f.name), "aria-label": `Include ${f.name} by default` })
                  ] }, f.name)) })
                ] }, res.resource);
              }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 rounded-2xl bg-white px-5 py-4 ring-1 ring-black/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: "Allow agents to request more fields" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 max-w-2xl text-xs text-muted-foreground", children: [
                    "When on, an agent's per-call ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "fields" }),
                    " request can add optional fields beyond the defaults above. When off, responses are limited to the required minimum plus your defaults."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: allowOverride, onCheckedChange: setAllowOverride, "aria-label": "Allow agents to request more fields" })
              ] })
            ] })
          ] })
        ] }),
        view === "permissions" && /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionsMatrix, { toolkitIds, moduleSlugs: ["pinterest"], enabled: Boolean(server?.enabled), theme: lightPermissionsTheme, toolsNoun: "Pinterest", stripToolPrefix: /^pinterest_/, disabledHint: "Who can use the Pinterest tools, and how. Enable the Pinterest MCP server first to start granting access.", connectHint: "No Pinterest toolkit is connected yet — enable Pinterest from the MCP catalog.", onApiError: handleApiError }),
        view === "activity" && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityLog, { title: "Activity", description: "Pinterest settings changes and MCP tool calls.", onApiError: handleApiError, logFilter: pinterestLogFilter, nameServerSlugs: ["pinterest"] })
      ] })
    ] })
  ] });
}
function FieldsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: [0, 1].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-2xl bg-white ring-1 ring-black/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-black/5 px-5 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-black/5", children: Array.from({
      length: 5
    }).map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-56" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-9 rounded-full" })
    ] }, j)) })
  ] }, i)) });
}
export {
  PinterestPage as component
};
