import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-3sxYre98.mjs";
import { E as EnableMcpServerButton } from "./enable-mcp-server-button-DAqYzfXa.mjs";
import { a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { g as LayoutDashboard, h as Sparkles, D as Download, b as Lock, F as FileCodeCorner, S as ShieldCheck, i as Activity, j as SlidersHorizontal, M as Menu, a as Search, c as CircleQuestionMark, d as Settings, E as ExternalLink, k as EllipsisVertical, f as Mail, l as Bell, m as Send, n as MessageSquare, P as Phone, o as CircleCheck, p as Copy } from "../_libs/lucide-react.mjs";
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
import "./alert-dialog-BqB4vy_S.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "./label-JU3yqRBo.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "./skeleton-CoUJiN10.mjs";
import "../_libs/tailwind-merge.mjs";
const NAV = [{
  id: "overview",
  label: "Overview",
  icon: LayoutDashboard
}, {
  id: "features",
  label: "Features",
  icon: Sparkles
}, {
  id: "installation",
  label: "Installation",
  icon: Download
}, {
  id: "access",
  label: "Access",
  icon: Lock
}, {
  id: "schemas",
  label: "Schemas",
  icon: FileCodeCorner
}, {
  id: "audit",
  label: "Audit",
  icon: ShieldCheck
}, {
  id: "uptime",
  label: "Uptime",
  icon: Activity
}, {
  id: "settings",
  label: "Settings",
  icon: SlidersHorizontal
}];
const OVERVIEW_FIELDS = [{
  label: "Tool name",
  value: "brand.get_tone_of_voice",
  mono: true
}, {
  label: "Namespace",
  value: "brand",
  mono: true
}, {
  label: "Category",
  value: "context"
}, {
  label: "Owner service",
  value: "brand-service",
  mono: true
}, {
  label: "Risk level",
  value: "low",
  pill: "bg-emerald-100 text-emerald-700"
}, {
  label: "Auth type",
  value: "internal_token",
  mono: true
}, {
  label: "Status",
  value: "active",
  pill: "bg-sky-100 text-sky-700"
}, {
  label: "Version",
  value: "v1.0.0",
  mono: true
}, {
  label: "Created at",
  value: "2026-02-12 10:00"
}, {
  label: "Updated at",
  value: "2026-05-22 14:35"
}];
const FEATURES = [{
  title: "Scrape",
  desc: "Extract clean, LLM-ready content from a single URL in markdown, HTML, links, or screenshots."
}, {
  title: "Search",
  desc: "Run a web search and optionally scrape the full content of every result in one call."
}, {
  title: "Map",
  desc: "Quickly discover every URL on a website — fast sitemap generation with filters."
}, {
  title: "Crawl",
  desc: "Recursively scrape an entire site with depth, path, and concurrency controls."
}, {
  title: "Extract",
  desc: "LLM-powered structured JSON extraction from a page using a schema or natural-language prompt."
}, {
  title: "Deep research",
  desc: "Agentic research across the web that returns cited summaries and sources."
}];
const UPTIME_BARS = Array.from({
  length: 90
}, (_, i) => {
  if ([12, 17, 19, 27].includes(i)) return "down";
  if ([8, 22, 38, 55, 71].includes(i)) return "warn";
  if ([15, 24, 49].includes(i)) return "slow";
  return "up";
});
function FirecrawlIcon({
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { fill: "none", viewBox: "0 0 20 20", className, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.7605 6.61389C13.138 6.79867 12.6687 7.21667 12.3251 7.67073C12.2513 7.76819 12.0975 7.69495 12.1268 7.57552C12.7848 4.86978 11.9155 2.6209 9.20582 1.51393C9.06836 1.4576 8.92527 1.58097 8.96132 1.72519C10.1939 6.67417 5.00941 6.25673 5.66459 11.8671C5.67585 11.9634 5.56769 12.0293 5.48882 11.973C5.2432 11.7967 4.96885 11.4288 4.78069 11.1702C4.72548 11.0942 4.60605 11.1156 4.5807 11.2063C4.43085 11.7482 4.35986 12.2586 4.35986 12.7656C4.35986 14.7373 5.37333 16.473 6.90734 17.4791C6.99522 17.5366 7.10789 17.4543 7.07804 17.3535C6.99917 17.0887 6.95466 16.8093 6.95128 16.5203C6.95128 16.3429 6.96255 16.1615 6.99015 15.9925C7.05438 15.5677 7.20197 15.1632 7.44985 14.7948C8.29995 13.5188 10.0041 12.2862 9.73199 10.6125C9.71453 10.5066 9.83959 10.4368 9.91846 10.5094C11.119 11.6063 11.3567 13.0817 11.1595 14.405C11.1426 14.5199 11.2868 14.5813 11.3595 14.4912C11.5432 14.2613 11.7674 14.0596 12.0113 13.9081C12.0722 13.8703 12.1533 13.8991 12.1764 13.9667C12.3121 14.3616 12.5138 14.7323 12.7042 15.1029C12.9318 15.5485 13.0529 16.0573 13.0338 16.5958C13.0242 16.8578 12.9808 17.1113 12.9082 17.3524C12.8772 17.4543 12.9887 17.5394 13.0783 17.4808C14.6134 16.4747 15.6275 14.739 15.6275 12.7662C15.6275 12.0806 15.5075 11.4085 15.2804 10.7787C14.8044 9.45766 13.5966 8.46561 13.9019 6.74403C13.9166 6.66178 13.8405 6.59023 13.7605 6.61389Z", fill: "currentColor" }) });
}
const RESPONSE_POINTS = [300, 340, 320, 360, 310, 305, 6100, 380, 360, 340, 350, 330, 360, 380, 1900, 360, 340, 320, 360, 340, 320, 310, 350, 360, 340, 360, 320, 310, 1100, 340, 360, 320, 340, 380, 340, 350, 340, 320, 360, 340, 320, 340, 360, 340, 360, 380, 340, 360, 340, 360, 340, 360, 380, 340, 360, 340, 360, 340, 360, 340, 360, 340, 360, 340, 360, 340, 380, 360, 340, 360, 340, 360, 340, 360, 340, 360, 340, 360, 340, 360, 340, 380, 360, 1700, 380, 2e3, 380, 360, 340];
function Field({
  label,
  value,
  mono,
  pill
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-black/5 px-5 py-3 last:border-b-0 sm:grid sm:grid-cols-[200px_1fr] sm:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 flex items-center gap-2 sm:mt-0", children: pill ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-2 py-0.5 text-xs font-medium", pill), children: value }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-sm text-foreground/90", mono && "font-mono text-[13px]"), children: value }) })
  ] });
}
function UptimeBar({
  kind
}) {
  const color = kind === "down" ? "bg-rose-500" : kind === "warn" ? "bg-amber-400" : kind === "slow" ? "bg-emerald-200" : "bg-emerald-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-10 w-full rounded-sm", color) });
}
function ResponseChart() {
  const w = 900;
  const h = 200;
  const max = Math.max(...RESPONSE_POINTS);
  const step = w / (RESPONSE_POINTS.length - 1);
  const path = RESPONSE_POINTS.map((v, i) => {
    const x = i * step;
    const y = h - v / max * (h - 20) - 5;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: `0 0 ${w} ${h}`, className: "h-48 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "0", y1: "20", x2: w, y2: "20", stroke: "hsl(0,0%,90%)", strokeDasharray: "3 4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "0", y: "14", fontSize: "11", fill: "hsl(0,0%,55%)", children: "6100ms" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: path, fill: "none", stroke: "hsl(142,71%,45%)", strokeWidth: "1.4" })
  ] });
}
function CodeBlock({
  code
}) {
  const [copied, setCopied] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-auto rounded-xl bg-[hsl(220,33%,97%)] p-4 pr-14 text-xs leading-relaxed text-foreground/90 ring-1 ring-black/5", children: code }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
      navigator.clipboard?.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }, className: "absolute right-2 top-2 inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs text-foreground/70 ring-1 ring-black/5 hover:bg-sky-50", children: [
      copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
      copied ? "Copied" : "Copy"
    ] })
  ] });
}
function Toggle({
  on = false
}) {
  const [state, setState] = reactExports.useState(on);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setState((s) => !s), className: cn("relative h-6 w-11 rounded-full transition", state ? "bg-foreground" : "bg-[hsl(220,15%,85%)]"), "aria-pressed": state, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition", state ? "left-[22px]" : "left-0.5") }) });
}
function SectionCard({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-2xl bg-white p-5 ring-1 ring-black/5 sm:p-6", children });
}
function FirecrawlPage() {
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [section, setSection] = reactExports.useState("overview");
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const filteredNav = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return NAV;
    return NAV.filter((n) => n.label.toLowerCase().includes(q));
  }, [query]);
  const {
    data: catalog
  } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest("/api/v1/mcp-catalog"),
    staleTime: 60 * 1e3
  });
  const server = catalog?.find((s) => s.slug === "firecrawl");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-rose-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FirecrawlIcon, { className: "h-5 w-5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-medium tracking-tight", children: "Firecrawl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "v1.0.0 · active" })
          ] })
        ] })
      ] }),
      searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden min-w-0 max-w-2xl flex-1 md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 w-full items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search sections", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        server && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mr-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EnableMcpServerButton, { serverSlug: "firecrawl", enabled: server.enabled, toolkitIds: server.toolkit_ids }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Search", onClick: () => setSearchOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden w-[240px] shrink-0 px-3 md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: filteredNav.map((n) => {
        const active = section === n.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSection(n.id), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-5 w-5 text-foreground/70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: n.label })
        ] }, n.id);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight", children: NAV.find((n) => n.id === section)?.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://docs.firecrawl.dev/mcp-server", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs text-foreground/80 ring-1 ring-black/5 hover:bg-sky-50", children: [
              "Docs ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "More", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) })
          ] })
        ] }),
        section === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium", children: "Tool details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Metadata exposed by the Firecrawl MCP server." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "rounded-xl bg-[hsl(220,33%,98%)] ring-1 ring-black/5", children: OVERVIEW_FIELDS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { ...f }, f.label)) })
        ] }),
        section === "features" && /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium", children: "What Firecrawl can do" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Turn entire websites into clean, structured data for AI agents." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-[hsl(220,33%,98%)] p-4 ring-1 ring-black/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-orange-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium", children: f.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: f.desc })
          ] }, f.title)) })
        ] }),
        section === "installation" && /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium", children: "Install the Firecrawl MCP server" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add the server to your MCP client config and provide an API key." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-sm font-medium", children: "1. Set your API key" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `export FIRECRAWL_API_KEY="fc-your-key-here"` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-sm font-medium", children: "2. Run with npx" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `npx -y firecrawl-mcp` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-sm font-medium", children: "3. Add to MCP client config" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "fc-your-key-here"
      }
    }
  }
}` })
            ] })
          ] })
        ] }),
        section === "access" && /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium", children: "Access control" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Roles and bundles that can invoke this tool." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "rounded-full", size: "sm", children: "Grant access" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Principal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Scope" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Granted" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [["agents.research", "Role", "scrape, search, map", "2026-03-04"], ["bundle.web-context", "Bundle", "scrape, extract", "2026-04-18"], ["carla@acme.com", "User", "all", "2026-05-22"], ["ci-pipeline", "Service", "crawl", "2026-05-30"]].map(([p, t, s, d]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-black/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: p }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground/80", children: t }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: s }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: d })
            ] }, p)) })
          ] }) })
        ] }),
        section === "schemas" && /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium", children: "Input / output schemas" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "JSON schema for the ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "firecrawl_scrape" }),
              " tool."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Input" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `{
  "type": "object",
  "required": ["url"],
  "properties": {
    "url": { "type": "string", "format": "uri" },
    "formats": {
      "type": "array",
      "items": { "enum": ["markdown","html","links","screenshot"] }
    },
    "onlyMainContent": { "type": "boolean", "default": true },
    "waitFor": { "type": "integer", "minimum": 0 }
  }
}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Output" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: `{
  "success": true,
  "markdown": "# Page title…",
  "html": "<!doctype html>…",
  "links": ["https://example.com/a"],
  "metadata": {
    "title": "string",
    "sourceURL": "string",
    "statusCode": 200
  }
}` })
            ] })
          ] })
        ] }),
        section === "audit" && /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-medium", children: "Recent activity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Latest MCP calls for this tool." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/audit", className: "inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs text-foreground/80 ring-1 ring-black/5 hover:bg-sky-50", children: [
              "Open audit log ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Action" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Actor" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "When" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Status" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: [["firecrawl_scrape", "agent@assistant", "2m ago", "success", "412ms"], ["firecrawl_search", "agent@assistant", "14m ago", "success", "880ms"], ["firecrawl_map", "ci-pipeline", "1h ago", "success", "1.2s"], ["firecrawl_crawl", "agent@assistant", "3h ago", "error", "5.4s"], ["firecrawl_extract", "carla@acme.com", "yesterday", "success", "2.1s"]].map(([a, who, when, st, dur]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-black/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-[13px]", children: a }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground/80", children: who }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: when }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-2 w-2 rounded-full", st === "success" ? "bg-emerald-500" : "bg-rose-500") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: st }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "· ",
                  dur
                ] })
              ] }) })
            ] }, a + when)) })
          ] }) })
        ] }),
        section === "uptime" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Last 90 days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "inline-flex items-center gap-1 text-emerald-600 hover:underline", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4" }),
                " View full history"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-sm font-medium text-emerald-600", children: "99.924%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-[repeat(90,minmax(0,1fr))] items-end gap-[2px]", children: UPTIME_BARS.map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(UptimeBar, { kind: k }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-base font-medium", children: "Overall uptime" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6 sm:grid-cols-4", children: [["100.000%", "Last 24 hours"], ["99.989%", "Last 7 days"], ["99.909%", "Last 30 days"], ["99.924%", "Last 90 days"]].map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-semibold tracking-tight", children: v }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: l })
            ] }, l)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-medium", children: "Response Time" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Last 90 days" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ResponseChart, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-3 gap-4 text-sm", children: [["581ms", "Avg. response time"], ["6163ms", "Max. response time"], ["381ms", "Min. response time"]].map(([v, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold tracking-tight", children: v }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: l })
            ] }, l)) })
          ] })
        ] }),
        section === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-medium", children: "Notifications for firecrawl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Override workspace defaults for this tool only." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { on: true })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-medium", children: "Channels" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Where alerts about this tool get delivered." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-black/5", children: [{
              icon: Mail,
              name: "Email",
              desc: "Sent to admin@monomcp.dev",
              on: true
            }, {
              icon: Bell,
              name: "In-app",
              desc: "Shows in the bell menu.",
              on: true
            }, {
              icon: Send,
              name: "Telegram",
              desc: "Direct message from MonoMCP bot.",
              soon: true
            }, {
              icon: MessageSquare,
              name: "Slack",
              desc: "Posted to a workspace channel.",
              soon: true
            }, {
              icon: Phone,
              name: "WhatsApp",
              desc: "Sent via WhatsApp Business.",
              soon: true
            }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-lg bg-[hsl(220,33%,97%)] text-foreground/70 ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
                  c.name,
                  c.soon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-sky-50 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-700 ring-1 ring-sky-100", children: "Soon" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs text-muted-foreground", children: c.desc })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { on: c.on })
            ] }, c.name)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-medium", children: "Events" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Choose which events trigger a notification." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, {}),
                " Critical only"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-black/5", children: [["Configuration updated", "Any field on this tool is changed."], ["Risk level changed", "Tool moves between risk tiers."], ["New version published", "A new version is released."], ["Access policy changed", "Bundle or role policy affecting this tool changes."], ["Usage quota threshold hit", "Tool reaches 80% / 100% of its limit."]].map(([t, d]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: t }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: d })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-[hsl(220,33%,97%)] px-2 py-1 text-foreground/70 ring-1 ring-black/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3" }),
                  " Email"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-[hsl(220,33%,97%)] px-2 py-1 text-foreground/70 ring-1 ring-black/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3 w-3" }),
                  " In-app"
                ] })
              ] })
            ] }, t)) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  FirecrawlPage as component
};
