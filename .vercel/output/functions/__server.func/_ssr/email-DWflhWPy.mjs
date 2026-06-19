import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-DSoi5KdC.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { M as Menu, f as Mail, l as Search, d as CircleQuestionMark, e as Settings, s as Pencil, I as Inbox, t as ChartColumn, G as Globe, u as ScrollText, R as RefreshCw, E as EllipsisVertical, v as Tag, U as Users, w as Info, x as Star, y as ArrowLeft, z as Archive, T as Trash2, H as Printer, J as Reply, N as Forward, P as Plus, D as Download, r as CircleCheck, O as ChevronDown } from "../_libs/lucide-react.mjs";
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
import "./api-client-CDT_AGSo.mjs";
import "../_libs/tailwind-merge.mjs";
const NAV = [{
  id: "inbox",
  label: "Inbox",
  icon: Inbox,
  count: 17
}, {
  id: "metrics",
  label: "Metrics",
  icon: ChartColumn
}, {
  id: "domains",
  label: "Domains",
  icon: Globe
}, {
  id: "logs",
  label: "Logs",
  icon: ScrollText
}];
const MESSAGES = [{
  id: "m1",
  sender: "Google Search Console",
  email: "no-reply@google.com",
  avatarColor: "bg-blue-500",
  subject: "Congrats on reaching 3K clicks in 28 days!",
  snippet: "Google Search impact 3K layoff.today Congratulations! Your site rea…",
  date: "12 Jun",
  unread: true,
  starred: false,
  category: "primary",
  body: "Congratulations! Your site reached 3,000 clicks in the last 28 days. Keep up the great work — here's a breakdown of your top-performing queries and pages."
}, {
  id: "m2",
  sender: "Reddit",
  email: "noreply@redditmail.com",
  avatarColor: "bg-orange-500",
  subject: "u/srch4aheartofgold replied to your post in r/Agentic_SEO",
  snippet: "what are you using for automation and how • Compl…",
  date: "12 Jun",
  unread: true,
  starred: false,
  category: "primary",
  body: 'u/srch4aheartofgold replied to your post:\n\n"What are you using for automation and how complex is your stack?"\n\nView the full thread on Reddit.'
}, {
  id: "m3",
  sender: "stanley.ig@stanwith.me",
  email: "stanley.ig@stanwith.me",
  avatarColor: "bg-violet-500",
  subject: "Your Instagram already has the answers — want the plan?",
  snippet: "A faster way to decide what to post next",
  date: "12 Jun",
  unread: false,
  starred: true,
  category: "primary",
  body: "Hi Cooper,\n\nIf you've been meaning to revisit Stanley, here's the simplest way to make it instantly worth it: use it once to turn your recent Instagram performance into an actionable plan for what to post next.\n\n— Stanley"
}, {
  id: "m4",
  sender: "Adi from AgentMail",
  email: "adi@agentmail.io",
  avatarColor: "bg-emerald-500",
  subject: "The customers without heartbeats - AgentNews#15",
  snippet: "Companies are shipping MCP servers before they even ship…",
  date: "11 Jun",
  unread: false,
  starred: false,
  category: "primary",
  body: "Companies are shipping MCP servers before they even ship a landing page. Here's why that matters for you — and what AgentMail is doing about it."
}, {
  id: "m5",
  sender: "Alex, Pressmaster",
  email: "alex@pressmaster.ai",
  avatarColor: "bg-pink-500",
  subject: "Introducing your Thought Leadership Agent",
  snippet: "Hi Cooper, Today we're launching the thing we've been building to…",
  date: "11 Jun",
  unread: false,
  starred: false,
  category: "primary",
  body: "Hi Cooper,\n\nToday we're launching the thing we've been building toward for months: a Thought Leadership Agent that turns your raw notes into publish-ready articles."
}, {
  id: "m6",
  sender: "AI SaaS Launchpad",
  email: "no-reply@skool.com",
  avatarColor: "bg-indigo-500",
  subject: `Willyam launch-SaaS posted "👋 Introduce yourself, who's building with us?"`,
  snippet: "AI SaaS Launchpad skool logo Wil…",
  date: "11 Jun",
  unread: false,
  starred: false,
  category: "social",
  body: "Willyam launch-SaaS posted in AI SaaS Launchpad. Tap in and introduce yourself to the community."
}, {
  id: "m7",
  sender: "Marie at Tally",
  email: "marie@tally.so",
  avatarColor: "bg-teal-500",
  subject: "New formula editor in Tally",
  snippet: "Plus: submission PDFs in emails and integrations Hi Cooper AI, The updates we're pr…",
  date: "11 Jun",
  unread: false,
  starred: false,
  category: "updates",
  body: "Hi Cooper,\n\nThe updates we're proudest of this month: a new formula editor, submission PDFs delivered in your notification emails, and three new integrations."
}, {
  id: "m8",
  sender: "Growth.Design",
  email: "hi@growth.design",
  avatarColor: "bg-yellow-500",
  subject: "🚀 UX in 60 seconds",
  snippet: "#036: Signs it was built with AI…",
  date: "11 Jun",
  unread: false,
  starred: false,
  category: "promotions",
  body: "#036: Signs it was built with AI — and the design moves that make it feel handcrafted instead."
}, {
  id: "m9",
  sender: "Reddit",
  email: "noreply@redditmail.com",
  avatarColor: "bg-orange-500",
  subject: '"The UI trap that could cost you $1,000"',
  snippet: "r/lovable: The UI trap that could cost you $1000 …",
  date: "10 Jun",
  unread: false,
  starred: false,
  category: "primary",
  body: "From r/lovable: The UI trap that could cost you $1,000 — a quick read on the most common pitfalls."
}, {
  id: "m10",
  sender: "daily.dev",
  email: "hello@daily.dev",
  avatarColor: "bg-slate-700",
  subject: "Cooper, your personal update from daily.dev is ready",
  snippet: "Here's what developers in your topics are reading and bo…",
  date: "10 Jun",
  unread: false,
  starred: false,
  category: "updates",
  body: "Here's what developers in your topics are reading and bookmarking this week. Top picks tailored to your feed."
}, {
  id: "m11",
  sender: "Reddit",
  email: "noreply@redditmail.com",
  avatarColor: "bg-orange-500",
  subject: '"How my private Lovable App Generated a $4,000 Bill in ~2 Hours"',
  snippet: "r/lovable: How my private Lovable App Gen…",
  date: "9 Jun",
  unread: false,
  starred: false,
  category: "primary",
  body: "From r/lovable: How my private Lovable App Generated a $4,000 Bill in ~2 Hours — a cautionary tale and a postmortem."
}, {
  id: "m12",
  sender: "RareBody",
  email: "team@rarebody.co",
  avatarColor: "bg-rose-500",
  subject: "Now Live! Booked and Busy in App NOW 💪",
  snippet: "It's live. Booked and Busy is open now, your 4-week shred starts to…",
  date: "7 Jun",
  unread: false,
  starred: false,
  category: "promotions",
  body: "It's live. Booked and Busy is open now — your 4-week shred starts today. Join the cohort."
}, {
  id: "m13",
  sender: "Supabase",
  email: "news@supabase.com",
  avatarColor: "bg-emerald-600",
  subject: "Supa Update June 2026",
  snippet: "Everything that happened in the last month at Supabase",
  date: "6 Jun",
  unread: false,
  starred: false,
  category: "updates",
  body: "Everything that happened in the last month at Supabase — new launches, deep dives, and community highlights."
}];
const CATEGORIES = [{
  id: "primary",
  label: "Primary",
  icon: Inbox
}, {
  id: "promotions",
  label: "Promotions",
  icon: Tag
}, {
  id: "social",
  label: "Social",
  icon: Users
}, {
  id: "updates",
  label: "Updates",
  icon: Info
}];
const DAYS = ["May 28", "May 29", "May 30", "May 31", "Jun 01", "Jun 02", "Jun 03", "Jun 04", "Jun 05", "Jun 06", "Jun 07", "Jun 08", "Jun 09", "Jun 10", "Jun 11"];
const SERIES = [{
  name: "Delivered",
  color: "#0ea5e9",
  pct: "50%",
  values: [0, 0, 0, 0, 0, 0, 0, 1, 3, 2, 3, 2, 1, 4, 2]
}, {
  name: "Opened",
  color: "#10b981",
  pct: "50%",
  values: [0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 2, 0, 18, 1]
}, {
  name: "Bounced",
  color: "#ef4444",
  pct: "50%",
  values: [0, 0, 0, 0, 0, 0, 0, 0, 1, 4, 0, 1, 0, 12, 1]
}, {
  name: "Sent",
  color: "#475569",
  pct: "218%",
  values: [0, 0, 0, 0, 0, 0, 0, 1, 2, 5, 1, 2, 1, 58, 2]
}];
const DOMAINS = [{
  id: "d_1",
  name: "monomcp.com",
  status: "verified",
  region: "Ireland (eu-west-1)",
  flag: "🇮🇪",
  createdAgo: "10 days ago"
}, {
  id: "d_2",
  name: "mail.acme.io",
  status: "verified",
  region: "N. Virginia (us-east-1)",
  flag: "🇺🇸",
  createdAgo: "32 days ago"
}, {
  id: "d_3",
  name: "send.lab.dev",
  status: "pending",
  region: "Frankfurt (eu-central-1)",
  flag: "🇩🇪",
  createdAgo: "2 hours ago"
}];
const LOGS = [{
  id: "log_1",
  endpoint: "/emails",
  method: "POST",
  status: 200,
  ago: "about 22 hours ago",
  apiKey: "key_live_a1b2",
  userAgent: "node/20"
}, {
  id: "log_2",
  endpoint: "/emails",
  method: "POST",
  status: 200,
  ago: "about 22 hours ago",
  apiKey: "key_live_a1b2",
  userAgent: "node/20"
}, {
  id: "log_3",
  endpoint: "/emails",
  method: "POST",
  status: 200,
  ago: "about 23 hours ago",
  apiKey: "key_live_a1b2",
  userAgent: "deno/1.45"
}, {
  id: "log_4",
  endpoint: "/emails",
  method: "POST",
  status: 200,
  ago: "about 24 hours ago",
  apiKey: "key_live_a1b2",
  userAgent: "node/20"
}, {
  id: "log_5",
  endpoint: "/emails",
  method: "POST",
  status: 200,
  ago: "1 day ago",
  apiKey: "key_live_a1b2",
  userAgent: "curl/8.4"
}, {
  id: "log_6",
  endpoint: "/emails",
  method: "POST",
  status: 422,
  ago: "2 days ago",
  apiKey: "key_live_a1b2",
  userAgent: "node/20"
}, {
  id: "log_7",
  endpoint: "/domains",
  method: "GET",
  status: 200,
  ago: "2 days ago",
  apiKey: "key_live_a1b2",
  userAgent: "browser"
}];
function Chip({
  children,
  active = false,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: cn("inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm transition", active ? "bg-foreground text-background" : "bg-[hsl(220,33%,95%)] text-foreground/80 hover:bg-[hsl(220,33%,92%)]"), children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
  ] });
}
function StatusPill({
  status
}) {
  const ok = status >= 200 && status < 300;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1", ok ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-rose-200"), children: status });
}
function LineChart() {
  const W = 880;
  const H = 320;
  const PAD = {
    l: 24,
    r: 56,
    t: 16,
    b: 28
  };
  const max = Math.max(...SERIES.flatMap((s) => s.values), 60);
  const stepX = (W - PAD.l - PAD.r) / (DAYS.length - 1);
  const y = (v) => PAD.t + (H - PAD.t - PAD.b) * (1 - v / max);
  const ticks = [0, 15, 30, 45, 60];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: `0 0 ${W} ${H}`, className: "w-full", children: [
    ticks.map((t) => {
      const yy = y(t);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: PAD.l, x2: W - PAD.r, y1: yy, y2: yy, stroke: "hsl(220 14% 92%)", strokeDasharray: "3 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: W - PAD.r + 8, y: yy + 4, className: "fill-muted-foreground", fontSize: 10, children: t })
      ] }, t);
    }),
    DAYS.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: PAD.l + i * stepX, y: H - 8, textAnchor: "middle", fontSize: 10, className: "fill-muted-foreground", children: d }, d)),
    SERIES.map((s) => {
      const path = s.values.map((v, i) => `${i === 0 ? "M" : "L"} ${PAD.l + i * stepX} ${y(v)}`).join(" ");
      const area = `M ${PAD.l} ${y(0)} ` + s.values.map((v, i) => `L ${PAD.l + i * stepX} ${y(v)}`).join(" ") + ` L ${PAD.l + (s.values.length - 1) * stepX} ${y(0)} Z`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: area, fill: s.color, opacity: 0.08 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: path, fill: "none", stroke: s.color, strokeWidth: 1.75 })
      ] }, s.name);
    })
  ] });
}
function MiniBars({
  values,
  color
}) {
  const max = Math.max(...values, 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-32 items-end gap-1", children: values.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 rounded-sm", style: {
    height: `${v / max * 100}%`,
    backgroundColor: color,
    opacity: v ? 1 : 0.15
  } }, i)) });
}
function EmailPage() {
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [view, setView] = reactExports.useState("inbox");
  const [query, setQuery] = reactExports.useState("");
  const [domainQuery, setDomainQuery] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("primary");
  const [openMsgId, setOpenMsgId] = reactExports.useState(null);
  const [starred, setStarred] = reactExports.useState(() => Object.fromEntries(MESSAGES.map((m) => [m.id, m.starred])));
  const [readIds, setReadIds] = reactExports.useState(() => new Set(MESSAGES.filter((m) => !m.unread).map((m) => m.id)));
  const visibleMessages = reactExports.useMemo(() => MESSAGES.filter((m) => m.category === category), [category]);
  const openMsg = openMsgId ? MESSAGES.find((m) => m.id === openMsgId) ?? null : null;
  const toggleStar = (id) => setStarred((s) => ({
    ...s,
    [id]: !s[id]
  }));
  const openMessage = (id) => {
    setOpenMsgId(id);
    setReadIds((r) => new Set(r).add(id));
  };
  const filteredLogs = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOGS;
    return LOGS.filter((l) => l.endpoint.toLowerCase().includes(q) || l.method.toLowerCase().includes(q) || String(l.status).includes(q) || l.apiKey.toLowerCase().includes(q));
  }, [query]);
  const filteredDomains = reactExports.useMemo(() => {
    const q = domainQuery.trim().toLowerCase();
    if (!q) return DOMAINS;
    return DOMAINS.filter((d) => d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q));
  }, [domainQuery]);
  const searchField = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 w-full items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, placeholder: "Search emails, domains, logs", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-rose-500 via-amber-400 to-rose-400 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Email" })
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mb-4 h-14 w-[160px] gap-2 rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg", onClick: () => setView("inbox"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-5 w-5" }),
          " Compose"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: NAV.map((n) => {
          const active = view === n.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setView(n.id);
            setOpenMsgId(null);
          }, className: cn("flex w-full items-center gap-3 rounded-r-full px-4 py-2 text-sm font-medium transition", active ? "bg-rose-100 text-rose-900" : "text-foreground/80 hover:bg-white/60"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-5 w-5 text-foreground/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: n.label }),
            n.count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/70", children: n.count })
          ] }, n.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Recent sends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1 px-1", children: ["Welcome email", "Password reset", "Weekly digest"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "rounded-lg px-3 py-1.5 text-sm text-foreground/75 hover:bg-white/60", children: t }, t)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6", children: [
        view === "inbox" && !openMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-1 border-b border-black/5 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Refresh", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "More", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-xs text-muted-foreground", children: [
              "1–",
              visibleMessages.length,
              " of ",
              visibleMessages.length
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 flex border-b border-black/5", children: CATEGORIES.map((c) => {
            const active = c.id === category;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setCategory(c.id), className: cn("flex flex-1 items-center justify-center gap-2 border-b-2 px-3 py-3 text-sm transition", active ? "border-sky-600 text-sky-700" : "border-transparent text-foreground/70 hover:bg-[hsl(220,33%,97%)]"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: cn("h-4 w-4", active ? "text-sky-700" : "text-foreground/60") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: c.label })
            ] }, c.id);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "divide-y divide-black/5", children: [
            visibleMessages.map((m) => {
              const isUnread = !readIds.has(m.id);
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { onClick: () => openMessage(m.id), className: cn("group flex cursor-pointer items-center gap-3 px-2 py-2.5 hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] hover:bg-white", isUnread ? "bg-white" : "bg-[hsl(220,33%,98%)]"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
                  e.stopPropagation();
                  toggleStar(m.id);
                }, className: "shrink-0 rounded-full p-1 text-muted-foreground hover:text-amber-500", "aria-label": "Star", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: cn("h-4 w-4", starred[m.id] && "fill-amber-400 text-amber-500") }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white", m.avatarColor), children: m.sender[0] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-[180px] shrink-0 truncate text-sm", isUnread ? "font-semibold text-foreground" : "text-foreground/80"), children: m.sender }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 truncate text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(isUnread ? "font-semibold text-foreground" : "text-foreground/80"), children: m.subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                    " - ",
                    m.snippet
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-16 shrink-0 text-right text-xs", isUnread ? "font-semibold text-foreground" : "text-muted-foreground"), children: m.date })
              ] }, m.id);
            }),
            visibleMessages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "px-4 py-12 text-center text-muted-foreground", children: [
              "No messages in ",
              category,
              "."
            ] })
          ] })
        ] }),
        view === "inbox" && openMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-1 border-b border-black/5 pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Back", onClick: () => setOpenMsgId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Archive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Print", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-xs text-muted-foreground", children: [
              MESSAGES.findIndex((x) => x.id === openMsg.id) + 1,
              " of ",
              MESSAGES.length
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "flex-1 text-2xl font-normal tracking-tight", children: openMsg.subject }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-[hsl(220,33%,95%)] px-2 py-0.5 text-xs text-foreground/70", children: "Inbox" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white", openMsg.avatarColor), children: openMsg.sender[0] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: openMsg.sender }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "<",
                  openMsg.email,
                  ">"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "to me" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: openMsg.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleStar(openMsg.id), className: "rounded-full p-1 hover:text-amber-500", "aria-label": "Star", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: cn("h-4 w-4", starred[openMsg.id] && "fill-amber-400 text-amber-500") }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Reply", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 whitespace-pre-line text-sm leading-7 text-foreground/90", children: openMsg.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2 rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, { className: "h-4 w-4" }),
              " Reply"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2 rounded-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Forward, { className: "h-4 w-4" }),
              " Forward"
            ] })
          ] })
        ] }),
        view === "metrics" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight", children: "Metrics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "All domains" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Last 15 days" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-black/5 p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-end justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Emails" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-light", children: "56" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Deliverability rate" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-light", children: "66.67%" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "All Events" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(LineChart, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground/80", children: [
                "monomcp.com ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(42)" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 text-xs", children: SERIES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: {
                  backgroundColor: s.color
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: s.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: s.pct })
              ] }, s.name)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 md:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-black/5 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Bounce rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-4 w-4 text-muted-foreground" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-3xl font-light", children: "33.33%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MiniBars, { values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 0], color: "#ef4444" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-1 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-rose-500" }),
                    "Transient"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "6 · 42.86%" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-rose-500" }),
                    "Permanent"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "8 · 57.14%" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-amber-500" }),
                    "Undetermined"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "0 · 0%" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ring-1 ring-black/5 p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: "Complain rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-4 w-4 text-muted-foreground" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-3xl font-light", children: "0%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MiniBars, { values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], color: "#f59e0b" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-amber-500" }),
                  "Complained"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "0 · 0%" })
              ] }) })
            ] })
          ] })
        ] }),
        view === "domains" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight", children: "Domains" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "h-9 gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                " Add domain"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "API", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 min-w-[260px] flex-1 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: domainQuery, onChange: (e) => setDomainQuery(e.target.value), placeholder: "Search...", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-9 text-sm shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "All statuses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "All regions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Export", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-10 px-4 py-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Domain" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Region" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-medium", children: "Created" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-10 px-4 py-2" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filteredDomains.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-black/5 hover:bg-rose-50/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 ring-1 ring-emerald-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-4 w-4 text-emerald-700" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium underline-offset-2 hover:underline", children: d.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", d.status === "verified" && "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", d.status === "pending" && "bg-amber-50 text-amber-700 ring-1 ring-amber-200", d.status === "failed" && "bg-rose-50 text-rose-700 ring-1 ring-rose-200"), children: [
                d.status === "verified" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3 w-3" }),
                d.status[0].toUpperCase() + d.status.slice(1)
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-foreground/80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2", children: d.flag }),
                d.region
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground", children: d.createdAgo }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "More", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) })
            ] }, d.id)) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
            "Page 1 – 1 of 1 domains – ",
            filteredDomains.length,
            " items"
          ] })
        ] }),
        view === "logs" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal tracking-tight", children: "Logs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/audit", className: "text-sm text-sky-700 hover:underline", children: "Open full audit log →" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 min-w-[260px] flex-1 items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search...", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-9 text-sm shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "Last 15 days" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "All statuses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "All user agents" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { children: "All API keys" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Export", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-10 px-4 py-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Endpoint" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-left font-medium", children: "Method" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2 text-right font-medium", children: "Created" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
              filteredLogs.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-black/5 hover:bg-rose-50/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 ring-1 ring-emerald-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-emerald-700" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium", children: l.endpoint }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { status: l.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground/80", children: l.method }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground", children: l.ago })
              ] }, l.id)),
              filteredLogs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-10 text-center text-muted-foreground", children: "No logs match your search." }) })
            ] })
          ] }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  EmailPage as component
};
