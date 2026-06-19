import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-DSoi5KdC.mjs";
import { A as ActivityLog } from "./activity-log-B5l1oEBM.mjs";
import { A as ApiError, c as clearAuthTokens } from "./api-client-CDT_AGSo.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { j as Activity, ad as Wrench, aw as MousePointerClick, M as Menu, S as ShieldCheck, d as CircleQuestionMark, e as Settings, D as Download } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./popover-ColJhc-i.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./dialog-CypSg8M2.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "./skeleton-CoUJiN10.mjs";
import "../_libs/tailwind-merge.mjs";
const NAV = [{
  id: "all",
  label: "All activity",
  description: "Every change made through Console and via MCP tool calls.",
  icon: Activity
}, {
  id: "mcp",
  label: "MCP tool calls",
  description: "Every tool call made by agents against your MCP endpoints.",
  icon: Wrench
}, {
  id: "api",
  label: "UI changes",
  description: "Every change made by people through the Console UI.",
  icon: MousePointerClick
}];
function AuditPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [filter, setFilter] = reactExports.useState("all");
  const handleApiError = reactExports.useCallback((err, fallback = "Could not load activity") => {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      clearAuthTokens();
      void navigate({
        to: "/login",
        replace: true
      });
      return;
    }
    console.error(fallback, err);
  }, [navigate]);
  const active = NAV.find((n) => n.id === filter) ?? NAV[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Audit log" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-[260px] shrink-0 px-3 md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mb-4 h-14 w-[160px] gap-2 rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg", disabled: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-5 w-5" }),
          " Export"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: NAV.map((n) => {
          const isActive = filter === n.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(n.id), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", isActive ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-5 w-5 text-foreground/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: n.label })
          ] }, n.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityLog, { onApiError: handleApiError, source: filter, title: active.label, description: active.description }) })
    ] })
  ] });
}
export {
  AuditPage as component
};
