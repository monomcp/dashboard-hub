import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button, c as cn } from "./button-BXrfXN_b.mjs";
import { I as Input } from "./input-DwaGuH4D.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-DmhbdlCS.mjs";
import { M as Menu, S as ShieldCheck, f as Search, g as CircleQuestionMark, h as Settings, D as Download, d as Activity, as as Wrench, aN as MousePointerClick, a2 as Funnel, i as EllipsisVertical } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "./api-client-CDT_AGSo.mjs";
const NAV = [{
  id: "all",
  label: "All activity",
  icon: Activity
}, {
  id: "mcp",
  label: "MCP tool calls",
  icon: Wrench
}, {
  id: "ui",
  label: "UI changes",
  icon: MousePointerClick
}];
const ENTRIES = [{
  id: "evt_01HZX9A1",
  timestamp: "2026-06-11T09:42:11Z",
  source: "mcp",
  actor: "agent@assistant",
  action: "tools/call",
  target: "linear.create_issue",
  status: "success",
  durationMs: 412,
  request: {
    tool: "linear.create_issue",
    arguments: {
      title: "Fix audit log pagination",
      team: "ENG",
      priority: 2
    }
  },
  response: {
    content: [{
      type: "text",
      text: "Created ENG-482"
    }],
    isError: false
  }
}, {
  id: "evt_01HZX9A2",
  timestamp: "2026-06-11T09:40:02Z",
  source: "ui",
  actor: "carla@acme.com",
  action: "contact.update",
  target: "/contacts/c_8842",
  status: "success",
  durationMs: 88,
  request: {
    method: "PATCH",
    path: "/api/v1/crm/contacts/c_8842",
    body: {
      lifecycle_status: "customer",
      is_starred: true
    }
  },
  response: {
    status: 200,
    body: {
      id: "c_8842",
      lifecycle_status: "customer"
    }
  }
}, {
  id: "evt_01HZX9A3",
  timestamp: "2026-06-11T09:31:55Z",
  source: "mcp",
  actor: "agent@assistant",
  action: "tools/call",
  target: "notion.search",
  status: "error",
  durationMs: 1320,
  request: {
    tool: "notion.search",
    arguments: {
      query: "Q3 roadmap"
    }
  },
  response: {
    error: {
      code: -32001,
      message: "Notion auth expired"
    },
    isError: true
  }
}, {
  id: "evt_01HZX9A4",
  timestamp: "2026-06-11T09:18:09Z",
  source: "ui",
  actor: "ben@acme.com",
  action: "cms.entry.publish",
  target: "/cms/restaurants/r_204",
  status: "success",
  durationMs: 174,
  request: {
    method: "POST",
    path: "/api/v1/cms/entries/r_204/publish",
    body: {
      version: 7
    }
  },
  response: {
    status: 200,
    body: {
      id: "r_204",
      status: "published",
      version: 7
    }
  }
}, {
  id: "evt_01HZX9A5",
  timestamp: "2026-06-11T08:55:24Z",
  source: "mcp",
  actor: "agent@assistant",
  action: "tools/call",
  target: "drive.upload",
  status: "success",
  durationMs: 2104,
  request: {
    tool: "drive.upload",
    arguments: {
      path: "/Reports/2026-Q2.pdf",
      mime: "application/pdf",
      size: 184221
    }
  },
  response: {
    content: [{
      type: "text",
      text: "Uploaded file_91x2"
    }],
    isError: false
  }
}, {
  id: "evt_01HZX9A6",
  timestamp: "2026-06-11T08:31:00Z",
  source: "ui",
  actor: "carla@acme.com",
  action: "calendar.event.create",
  target: "/calendar",
  status: "success",
  durationMs: 142,
  request: {
    method: "POST",
    path: "/api/v1/calendar/events",
    body: {
      title: "Design review",
      start: "2026-06-12T14:00:00Z",
      duration: 60
    }
  },
  response: {
    status: 201,
    body: {
      id: "ev_77a",
      title: "Design review"
    }
  }
}, {
  id: "evt_01HZX9A7",
  timestamp: "2026-06-11T08:02:47Z",
  source: "ui",
  actor: "ben@acme.com",
  action: "contact.delete",
  target: "/contacts/c_1102",
  status: "error",
  durationMs: 61,
  request: {
    method: "DELETE",
    path: "/api/v1/crm/contacts/c_1102"
  },
  response: {
    status: 403,
    body: {
      detail: "Insufficient permissions"
    }
  }
}];
function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function SourceBadge({
  source
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", source === "mcp" ? "bg-violet-100 text-violet-700" : "bg-sky-100 text-sky-700"), children: [
    source === "mcp" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "h-3 w-3" }),
    source === "mcp" ? "MCP" : "UI"
  ] });
}
function StatusDot({
  status
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-block h-2 w-2 rounded-full", status === "success" ? "bg-emerald-500" : "bg-rose-500") });
}
function JsonBlock({
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-auto rounded-xl bg-[hsl(220,33%,97%)] p-3 text-xs leading-relaxed text-foreground/90 ring-1 ring-black/5", children: JSON.stringify(value, null, 2) });
}
function AuditPage() {
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [selectedId, setSelectedId] = reactExports.useState(ENTRIES[0].id);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    return ENTRIES.filter((e) => {
      if (filter !== "all" && e.source !== filter) return false;
      if (!q) return true;
      return e.action.toLowerCase().includes(q) || e.target.toLowerCase().includes(q) || e.actor.toLowerCase().includes(q) || e.id.toLowerCase().includes(q);
    });
  }, [filter, query]);
  const selected = filtered.find((e) => e.id === selectedId) ?? filtered[0];
  const counts = reactExports.useMemo(() => ({
    all: ENTRIES.length,
    mcp: ENTRIES.filter((e) => e.source === "mcp").length,
    ui: ENTRIES.filter((e) => e.source === "ui").length
  }), []);
  const searchField = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 w-full items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search action, target, actor, id", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Audit log" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mb-4 h-14 w-[160px] gap-2 rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg", disabled: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-5 w-5" }),
          " Export"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-1", children: [
          NAV.map((n) => {
            const active = filter === n.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setFilter(n.id), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-5 w-5 text-foreground/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: n.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: counts[n.id] })
            ] }, n.id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Filters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 text-sm text-foreground/75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-foreground/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Last 24 hours" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-w-0 flex-1 px-4 pb-16 md:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight", children: NAV.find((n) => n.id === filter)?.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "More", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1.4fr_1fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Event" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Actor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "When" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              filtered.map((e) => {
                const active = selected?.id === e.id;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { onClick: () => setSelectedId(e.id), className: cn("cursor-pointer border-t border-black/5 transition hover:bg-sky-50/50", active && "bg-sky-50"), children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SourceBadge, { source: e.source }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: e.action })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: e.target })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground/80", children: e.actor }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: timeAgo(e.timestamp) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: e.status }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-foreground/80", children: e.status }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      "· ",
                      e.durationMs,
                      "ms"
                    ] })
                  ] }) })
                ] }, e.id);
              }),
              filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-10 text-center text-muted-foreground", children: "No events match your filters." }) })
            ] })
          ] }) }),
          selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-2xl bg-[hsl(220,33%,98%)] p-4 ring-1 ring-black/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SourceBadge, { source: selected.source }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium", children: selected.action })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 truncate text-xs text-muted-foreground", children: selected.target })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-white px-2 py-0.5 font-mono text-[11px] text-muted-foreground ring-1 ring-black/5", children: selected.id })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mb-4 grid grid-cols-2 gap-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Actor" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground/90", children: selected.actor })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Timestamp" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground/90", children: new Date(selected.timestamp).toLocaleString() })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "flex items-center gap-1.5 text-foreground/90", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: selected.status }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: selected.status })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Duration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "text-foreground/90", children: [
                  selected.durationMs,
                  " ms"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Request" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(JsonBlock, { value: selected.request })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Response" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(JsonBlock, { value: selected.response })
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AuditPage as component
};
