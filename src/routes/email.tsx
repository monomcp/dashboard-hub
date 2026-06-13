import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Settings,
  Mail,
  BarChart3,
  Globe,
  ScrollText,
  MoreVertical,
  Plus,
  Download,
  CheckCircle2,
  ChevronDown,
  Inbox,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  ArrowLeft,
  Tag,
  Users,
  Info,
  RefreshCw,
  Printer,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppsMenu } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Email — Inbox, Metrics, Domains & Logs" },
      {
        name: "description",
        content: "Read your inbox, monitor email deliverability, manage sender domains, and inspect every send log.",
      },
      { property: "og:title", content: "Email — Inbox, Metrics, Domains & Logs" },
      {
        property: "og:description",
        content: "Read your inbox, monitor email deliverability, manage sender domains, and inspect every send log.",
      },
    ],
    links: [{ rel: "canonical", href: "/email" }],
  }),
  component: EmailPage,
});

type View = "inbox" | "metrics" | "domains" | "logs";

const NAV: { id: View; label: string; icon: typeof BarChart3; count?: number }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox, count: 17 },
  { id: "metrics", label: "Metrics", icon: BarChart3 },
  { id: "domains", label: "Domains", icon: Globe },
  { id: "logs", label: "Logs", icon: ScrollText },
];

type Category = "primary" | "promotions" | "social" | "updates";
type Message = {
  id: string;
  sender: string;
  email: string;
  avatarColor: string;
  subject: string;
  snippet: string;
  date: string;
  unread: boolean;
  starred: boolean;
  category: Category;
  body: string;
};

const MESSAGES: Message[] = [
  { id: "m1", sender: "Google Search Console", email: "no-reply@google.com", avatarColor: "bg-blue-500", subject: "Congrats on reaching 3K clicks in 28 days!", snippet: "Google Search impact 3K layoff.today Congratulations! Your site rea…", date: "12 Jun", unread: true, starred: false, category: "primary", body: "Congratulations! Your site reached 3,000 clicks in the last 28 days. Keep up the great work — here's a breakdown of your top-performing queries and pages." },
  { id: "m2", sender: "Reddit", email: "noreply@redditmail.com", avatarColor: "bg-orange-500", subject: "u/srch4aheartofgold replied to your post in r/Agentic_SEO", snippet: "what are you using for automation and how • Compl…", date: "12 Jun", unread: true, starred: false, category: "primary", body: "u/srch4aheartofgold replied to your post:\n\n\"What are you using for automation and how complex is your stack?\"\n\nView the full thread on Reddit." },
  { id: "m3", sender: "stanley.ig@stanwith.me", email: "stanley.ig@stanwith.me", avatarColor: "bg-violet-500", subject: "Your Instagram already has the answers — want the plan?", snippet: "A faster way to decide what to post next", date: "12 Jun", unread: false, starred: true, category: "primary", body: "Hi Cooper,\n\nIf you've been meaning to revisit Stanley, here's the simplest way to make it instantly worth it: use it once to turn your recent Instagram performance into an actionable plan for what to post next.\n\n— Stanley" },
  { id: "m4", sender: "Adi from AgentMail", email: "adi@agentmail.io", avatarColor: "bg-emerald-500", subject: "The customers without heartbeats - AgentNews#15", snippet: "Companies are shipping MCP servers before they even ship…", date: "11 Jun", unread: false, starred: false, category: "primary", body: "Companies are shipping MCP servers before they even ship a landing page. Here's why that matters for you — and what AgentMail is doing about it." },
  { id: "m5", sender: "Alex, Pressmaster", email: "alex@pressmaster.ai", avatarColor: "bg-pink-500", subject: "Introducing your Thought Leadership Agent", snippet: "Hi Cooper, Today we're launching the thing we've been building to…", date: "11 Jun", unread: false, starred: false, category: "primary", body: "Hi Cooper,\n\nToday we're launching the thing we've been building toward for months: a Thought Leadership Agent that turns your raw notes into publish-ready articles." },
  { id: "m6", sender: "AI SaaS Launchpad", email: "no-reply@skool.com", avatarColor: "bg-indigo-500", subject: "Willyam launch-SaaS posted \"👋 Introduce yourself, who's building with us?\"", snippet: "AI SaaS Launchpad skool logo Wil…", date: "11 Jun", unread: false, starred: false, category: "social", body: "Willyam launch-SaaS posted in AI SaaS Launchpad. Tap in and introduce yourself to the community." },
  { id: "m7", sender: "Marie at Tally", email: "marie@tally.so", avatarColor: "bg-teal-500", subject: "New formula editor in Tally", snippet: "Plus: submission PDFs in emails and integrations Hi Cooper AI, The updates we're pr…", date: "11 Jun", unread: false, starred: false, category: "updates", body: "Hi Cooper,\n\nThe updates we're proudest of this month: a new formula editor, submission PDFs delivered in your notification emails, and three new integrations." },
  { id: "m8", sender: "Growth.Design", email: "hi@growth.design", avatarColor: "bg-yellow-500", subject: "🚀 UX in 60 seconds", snippet: "#036: Signs it was built with AI…", date: "11 Jun", unread: false, starred: false, category: "promotions", body: "#036: Signs it was built with AI — and the design moves that make it feel handcrafted instead." },
  { id: "m9", sender: "Reddit", email: "noreply@redditmail.com", avatarColor: "bg-orange-500", subject: "\"The UI trap that could cost you $1,000\"", snippet: "r/lovable: The UI trap that could cost you $1000 …", date: "10 Jun", unread: false, starred: false, category: "primary", body: "From r/lovable: The UI trap that could cost you $1,000 — a quick read on the most common pitfalls." },
  { id: "m10", sender: "daily.dev", email: "hello@daily.dev", avatarColor: "bg-slate-700", subject: "Cooper, your personal update from daily.dev is ready", snippet: "Here's what developers in your topics are reading and bo…", date: "10 Jun", unread: false, starred: false, category: "updates", body: "Here's what developers in your topics are reading and bookmarking this week. Top picks tailored to your feed." },
  { id: "m11", sender: "Reddit", email: "noreply@redditmail.com", avatarColor: "bg-orange-500", subject: "\"How my private Lovable App Generated a $4,000 Bill in ~2 Hours\"", snippet: "r/lovable: How my private Lovable App Gen…", date: "9 Jun", unread: false, starred: false, category: "primary", body: "From r/lovable: How my private Lovable App Generated a $4,000 Bill in ~2 Hours — a cautionary tale and a postmortem." },
  { id: "m12", sender: "RareBody", email: "team@rarebody.co", avatarColor: "bg-rose-500", subject: "Now Live! Booked and Busy in App NOW 💪", snippet: "It's live. Booked and Busy is open now, your 4-week shred starts to…", date: "7 Jun", unread: false, starred: false, category: "promotions", body: "It's live. Booked and Busy is open now — your 4-week shred starts today. Join the cohort." },
  { id: "m13", sender: "Supabase", email: "news@supabase.com", avatarColor: "bg-emerald-600", subject: "Supa Update June 2026", snippet: "Everything that happened in the last month at Supabase", date: "6 Jun", unread: false, starred: false, category: "updates", body: "Everything that happened in the last month at Supabase — new launches, deep dives, and community highlights." },
];

const CATEGORIES: { id: Category; label: string; icon: typeof Inbox }[] = [
  { id: "primary", label: "Primary", icon: Inbox },
  { id: "promotions", label: "Promotions", icon: Tag },
  { id: "social", label: "Social", icon: Users },
  { id: "updates", label: "Updates", icon: Info },
];

// ───────────────────────── Metrics data ─────────────────────────
const DAYS = [
  "May 28","May 29","May 30","May 31","Jun 01","Jun 02","Jun 03",
  "Jun 04","Jun 05","Jun 06","Jun 07","Jun 08","Jun 09","Jun 10","Jun 11",
];
const SERIES: { name: string; color: string; pct: string; values: number[] }[] = [
  { name: "Delivered", color: "#0ea5e9", pct: "50%",  values: [0,0,0,0,0,0,0,1,3,2,3,2,1,4,2] },
  { name: "Opened",    color: "#10b981", pct: "50%",  values: [0,0,0,0,0,0,0,0,1,3,1,2,0,18,1] },
  { name: "Bounced",   color: "#ef4444", pct: "50%",  values: [0,0,0,0,0,0,0,0,1,4,0,1,0,12,1] },
  { name: "Sent",      color: "#475569", pct: "218%", values: [0,0,0,0,0,0,0,1,2,5,1,2,1,58,2] },
];

// ───────────────────────── Domains data ─────────────────────────
type Domain = {
  id: string;
  name: string;
  status: "verified" | "pending" | "failed";
  region: string;
  flag: string;
  createdAgo: string;
};
const DOMAINS: Domain[] = [
  { id: "d_1", name: "monomcp.com", status: "verified", region: "Ireland (eu-west-1)", flag: "🇮🇪", createdAgo: "10 days ago" },
  { id: "d_2", name: "mail.acme.io", status: "verified", region: "N. Virginia (us-east-1)", flag: "🇺🇸", createdAgo: "32 days ago" },
  { id: "d_3", name: "send.lab.dev", status: "pending",  region: "Frankfurt (eu-central-1)", flag: "🇩🇪", createdAgo: "2 hours ago" },
];

// ───────────────────────── Logs data ─────────────────────────
type LogEntry = {
  id: string;
  endpoint: string;
  method: "POST" | "GET" | "DELETE";
  status: number;
  ago: string;
  apiKey: string;
  userAgent: string;
};
const LOGS: LogEntry[] = [
  { id: "log_1", endpoint: "/emails", method: "POST", status: 200, ago: "about 22 hours ago", apiKey: "key_live_a1b2", userAgent: "node/20" },
  { id: "log_2", endpoint: "/emails", method: "POST", status: 200, ago: "about 22 hours ago", apiKey: "key_live_a1b2", userAgent: "node/20" },
  { id: "log_3", endpoint: "/emails", method: "POST", status: 200, ago: "about 23 hours ago", apiKey: "key_live_a1b2", userAgent: "deno/1.45" },
  { id: "log_4", endpoint: "/emails", method: "POST", status: 200, ago: "about 24 hours ago", apiKey: "key_live_a1b2", userAgent: "node/20" },
  { id: "log_5", endpoint: "/emails", method: "POST", status: 200, ago: "1 day ago", apiKey: "key_live_a1b2", userAgent: "curl/8.4" },
  { id: "log_6", endpoint: "/emails", method: "POST", status: 422, ago: "2 days ago", apiKey: "key_live_a1b2", userAgent: "node/20" },
  { id: "log_7", endpoint: "/domains", method: "GET", status: 200, ago: "2 days ago", apiKey: "key_live_a1b2", userAgent: "browser" },
];

function Chip({ children, active = false, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm transition",
        active ? "bg-foreground text-background" : "bg-[hsl(220,33%,95%)] text-foreground/80 hover:bg-[hsl(220,33%,92%)]",
      )}
    >
      {children}
      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
    </button>
  );
}

function StatusPill({ status }: { status: number }) {
  const ok = status >= 200 && status < 300;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1",
        ok ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-rose-200",
      )}
    >
      {status}
    </span>
  );
}

// ───────────────────────── Metrics chart (SVG) ─────────────────────────
function LineChart() {
  const W = 880;
  const H = 320;
  const PAD = { l: 24, r: 56, t: 16, b: 28 };
  const max = Math.max(...SERIES.flatMap((s) => s.values), 60);
  const stepX = (W - PAD.l - PAD.r) / (DAYS.length - 1);
  const y = (v: number) => PAD.t + (H - PAD.t - PAD.b) * (1 - v / max);
  const ticks = [0, 15, 30, 45, 60];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {ticks.map((t) => {
        const yy = y(t);
        return (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={yy} y2={yy} stroke="hsl(220 14% 92%)" strokeDasharray="3 3" />
            <text x={W - PAD.r + 8} y={yy + 4} className="fill-muted-foreground" fontSize={10}>
              {t}
            </text>
          </g>
        );
      })}
      {DAYS.map((d, i) => (
        <text key={d} x={PAD.l + i * stepX} y={H - 8} textAnchor="middle" fontSize={10} className="fill-muted-foreground">
          {d}
        </text>
      ))}
      {SERIES.map((s) => {
        const path = s.values
          .map((v, i) => `${i === 0 ? "M" : "L"} ${PAD.l + i * stepX} ${y(v)}`)
          .join(" ");
        const area =
          `M ${PAD.l} ${y(0)} ` +
          s.values.map((v, i) => `L ${PAD.l + i * stepX} ${y(v)}`).join(" ") +
          ` L ${PAD.l + (s.values.length - 1) * stepX} ${y(0)} Z`;
        return (
          <g key={s.name}>
            <path d={area} fill={s.color} opacity={0.08} />
            <path d={path} fill="none" stroke={s.color} strokeWidth={1.75} />
          </g>
        );
      })}
    </svg>
  );
}

function MiniBars({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-32 items-end gap-1">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm"
          style={{ height: `${(v / max) * 100}%`, backgroundColor: color, opacity: v ? 1 : 0.15 }}
        />
      ))}
    </div>
  );
}

// ───────────────────────── Page ─────────────────────────
function EmailPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [view, setView] = useState<View>("inbox");
  const [query, setQuery] = useState("");
  const [domainQuery, setDomainQuery] = useState("");
  const [category, setCategory] = useState<Category>("primary");
  const [openMsgId, setOpenMsgId] = useState<string | null>(null);
  const [starred, setStarred] = useState<Record<string, boolean>>(
    () => Object.fromEntries(MESSAGES.map((m) => [m.id, m.starred])),
  );
  const [readIds, setReadIds] = useState<Set<string>>(
    () => new Set(MESSAGES.filter((m) => !m.unread).map((m) => m.id)),
  );

  const visibleMessages = useMemo(
    () => MESSAGES.filter((m) => m.category === category),
    [category],
  );
  const openMsg = openMsgId ? MESSAGES.find((m) => m.id === openMsgId) ?? null : null;
  const toggleStar = (id: string) => setStarred((s) => ({ ...s, [id]: !s[id] }));
  const openMessage = (id: string) => {
    setOpenMsgId(id);
    setReadIds((r) => new Set(r).add(id));
  };

  const filteredLogs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LOGS;
    return LOGS.filter(
      (l) =>
        l.endpoint.toLowerCase().includes(q) ||
        l.method.toLowerCase().includes(q) ||
        String(l.status).includes(q) ||
        l.apiKey.toLowerCase().includes(q),
    );
  }, [query]);

  const filteredDomains = useMemo(() => {
    const q = domainQuery.trim().toLowerCase();
    if (!q) return DOMAINS;
    return DOMAINS.filter((d) => d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q));
  }, [domainQuery]);

  const searchField = (
    <div className="relative flex h-9 w-full items-center">
      <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
      <Input
        autoFocus
        placeholder="Search emails, domains, logs"
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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-rose-500 via-amber-400 to-rose-400 shadow-sm">
              <Mail className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Email</span>
          </Link>
        </div>
        {searchOpen && <div className="hidden min-w-0 max-w-2xl flex-1 md:block">{searchField}</div>}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search" onClick={() => setSearchOpen((s) => !s)}>
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
            <Button
              className="mb-4 h-14 w-[160px] gap-2 rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg"
              onClick={() => setView("inbox")}
            >
              <Pencil className="h-5 w-5" /> Compose
            </Button>

            <nav className="space-y-1">
              {NAV.map((n) => {
                const active = view === n.id;
                return (
                  <button
                    key={n.id}
                    onClick={() => { setView(n.id); setOpenMsgId(null); }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-r-full px-4 py-2 text-sm font-medium transition",
                      active ? "bg-rose-100 text-rose-900" : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <n.icon className="h-5 w-5 text-foreground/70" />
                    <span className="flex-1 truncate text-left">{n.label}</span>
                    {n.count !== undefined && (
                      <span className="text-xs text-foreground/70">{n.count}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Recent sends
            </div>
            <ul className="mt-2 space-y-1 px-1">
              {["Welcome email", "Password reset", "Weekly digest"].map((t) => (
                <li key={t} className="rounded-lg px-3 py-1.5 text-sm text-foreground/75 hover:bg-white/60">
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
          <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
            {view === "inbox" && !openMsg && (
              <>
                <div className="mb-3 flex items-center gap-1 border-b border-black/5 pb-2">
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Refresh">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="More">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <div className="ml-auto text-xs text-muted-foreground">
                    1–{visibleMessages.length} of {visibleMessages.length}
                  </div>
                </div>

                <div className="mb-1 flex border-b border-black/5">
                  {CATEGORIES.map((c) => {
                    const active = c.id === category;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setCategory(c.id)}
                        className={cn(
                          "flex flex-1 items-center justify-center gap-2 border-b-2 px-3 py-3 text-sm transition",
                          active
                            ? "border-sky-600 text-sky-700"
                            : "border-transparent text-foreground/70 hover:bg-[hsl(220,33%,97%)]",
                        )}
                      >
                        <c.icon className={cn("h-4 w-4", active ? "text-sky-700" : "text-foreground/60")} />
                        <span className="font-medium">{c.label}</span>
                      </button>
                    );
                  })}
                </div>

                <ul className="divide-y divide-black/5">
                  {visibleMessages.map((m) => {
                    const isUnread = !readIds.has(m.id);
                    return (
                      <li
                        key={m.id}
                        onClick={() => openMessage(m.id)}
                        className={cn(
                          "group flex cursor-pointer items-center gap-3 px-2 py-2.5 hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] hover:bg-white",
                          isUnread ? "bg-white" : "bg-[hsl(220,33%,98%)]",
                        )}
                      >
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleStar(m.id); }}
                          className="shrink-0 rounded-full p-1 text-muted-foreground hover:text-amber-500"
                          aria-label="Star"
                        >
                          <Star
                            className={cn("h-4 w-4", starred[m.id] && "fill-amber-400 text-amber-500")}
                          />
                        </button>
                        <div
                          className={cn(
                            "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white",
                            m.avatarColor,
                          )}
                        >
                          {m.sender[0]}
                        </div>
                        <div
                          className={cn(
                            "w-[180px] shrink-0 truncate text-sm",
                            isUnread ? "font-semibold text-foreground" : "text-foreground/80",
                          )}
                        >
                          {m.sender}
                        </div>
                        <div className="min-w-0 flex-1 truncate text-sm">
                          <span className={cn(isUnread ? "font-semibold text-foreground" : "text-foreground/80")}>
                            {m.subject}
                          </span>
                          <span className="text-muted-foreground"> - {m.snippet}</span>
                        </div>
                        <div
                          className={cn(
                            "w-16 shrink-0 text-right text-xs",
                            isUnread ? "font-semibold text-foreground" : "text-muted-foreground",
                          )}
                        >
                          {m.date}
                        </div>
                      </li>
                    );
                  })}
                  {visibleMessages.length === 0 && (
                    <li className="px-4 py-12 text-center text-muted-foreground">
                      No messages in {category}.
                    </li>
                  )}
                </ul>
              </>
            )}

            {view === "inbox" && openMsg && (
              <>
                <div className="mb-2 flex items-center gap-1 border-b border-black/5 pb-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    aria-label="Back"
                    onClick={() => setOpenMsgId(null)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Archive">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Print">
                    <Printer className="h-4 w-4" />
                  </Button>
                  <div className="ml-auto text-xs text-muted-foreground">
                    {MESSAGES.findIndex((x) => x.id === openMsg.id) + 1} of {MESSAGES.length}
                  </div>
                </div>

                <div className="mb-4 flex items-start gap-3">
                  <h1 className="flex-1 text-2xl font-normal tracking-tight">{openMsg.subject}</h1>
                  <span className="rounded-md bg-[hsl(220,33%,95%)] px-2 py-0.5 text-xs text-foreground/70">
                    Inbox
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white",
                      openMsg.avatarColor,
                    )}
                  >
                    {openMsg.sender[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="font-medium">{openMsg.sender}</span>
                      <span className="text-xs text-muted-foreground">&lt;{openMsg.email}&gt;</span>
                    </div>
                    <div className="text-xs text-muted-foreground">to me</div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span>{openMsg.date}</span>
                    <button
                      onClick={() => toggleStar(openMsg.id)}
                      className="rounded-full p-1 hover:text-amber-500"
                      aria-label="Star"
                    >
                      <Star className={cn("h-4 w-4", starred[openMsg.id] && "fill-amber-400 text-amber-500")} />
                    </button>
                    <Button variant="ghost" size="icon" className="rounded-full" aria-label="Reply">
                      <Reply className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-6 whitespace-pre-line text-sm leading-7 text-foreground/90">
                  {openMsg.body}
                </div>

                <div className="mt-8 flex gap-2">
                  <Button variant="outline" className="gap-2 rounded-full">
                    <Reply className="h-4 w-4" /> Reply
                  </Button>
                  <Button variant="outline" className="gap-2 rounded-full">
                    <Forward className="h-4 w-4" /> Forward
                  </Button>
                </div>
              </>
            )}

            {view === "metrics" && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h1 className="text-2xl font-normal tracking-tight">Metrics</h1>
                  <div className="flex items-center gap-2">
                    <Chip>All domains</Chip>
                    <Chip>Last 15 days</Chip>
                  </div>
                </div>

                <div className="rounded-2xl ring-1 ring-black/5 p-5">
                  <div className="mb-4 flex items-end justify-between">
                    <div className="flex gap-10">
                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">Emails</div>
                        <div className="text-3xl font-light">56</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wide text-muted-foreground">Deliverability rate</div>
                        <div className="text-3xl font-light">66.67%</div>
                      </div>
                    </div>
                    <Chip>All Events</Chip>
                  </div>
                  <LineChart />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-foreground/80">
                      monomcp.com <span className="text-muted-foreground">(42)</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      {SERIES.map((s) => (
                        <span key={s.name} className="inline-flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                          <span className="text-foreground/70">{s.name}</span>
                          <span className="text-muted-foreground">{s.pct}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl ring-1 ring-black/5 p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Bounce rate</div>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="mt-1 text-3xl font-light">33.33%</div>
                    <MiniBars values={[0,0,0,0,0,0,0,0,0,0,0,0,8,9,0]} color="#ef4444" />
                    <ul className="mt-3 space-y-1 text-sm">
                      <li className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-500" />Transient</span>
                        <span className="text-muted-foreground">6 · 42.86%</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-500" />Permanent</span>
                        <span className="text-muted-foreground">8 · 57.14%</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" />Undetermined</span>
                        <span className="text-muted-foreground">0 · 0%</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl ring-1 ring-black/5 p-5">
                    <div className="flex items-center justify-between">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">Complain rate</div>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="mt-1 text-3xl font-light">0%</div>
                    <MiniBars values={[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]} color="#f59e0b" />
                    <ul className="mt-3 space-y-1 text-sm">
                      <li className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" />Complained</span>
                        <span className="text-muted-foreground">0 · 0%</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            {view === "domains" && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h1 className="text-2xl font-normal tracking-tight">Domains</h1>
                  <div className="flex items-center gap-2">
                    <Button className="h-9 gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90">
                      <Plus className="h-4 w-4" /> Add domain
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full" aria-label="API">
                      <ScrollText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <div className="relative flex h-9 min-w-[260px] flex-1 items-center">
                    <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={domainQuery}
                      onChange={(e) => setDomainQuery(e.target.value)}
                      placeholder="Search..."
                      className="h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-9 text-sm shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200"
                    />
                  </div>
                  <Chip>All statuses</Chip>
                  <Chip>All regions</Chip>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Export">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
                  <table className="w-full text-sm">
                    <thead className="bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="w-10 px-4 py-2"></th>
                        <th className="px-4 py-2 text-left font-medium">Domain</th>
                        <th className="px-4 py-2 text-left font-medium">Status</th>
                        <th className="px-4 py-2 text-left font-medium">Region</th>
                        <th className="px-4 py-2 text-right font-medium">Created</th>
                        <th className="w-10 px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDomains.map((d) => (
                        <tr key={d.id} className="border-t border-black/5 hover:bg-rose-50/30">
                          <td className="px-4 py-3">
                            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 ring-1 ring-emerald-200">
                              <Globe className="h-4 w-4 text-emerald-700" />
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium underline-offset-2 hover:underline">{d.name}</td>
                          <td className="px-4 py-3">
                            <span className={cn(
                              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                              d.status === "verified" && "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
                              d.status === "pending" && "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
                              d.status === "failed" && "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
                            )}>
                              {d.status === "verified" && <CheckCircle2 className="h-3 w-3" />}
                              {d.status[0].toUpperCase() + d.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-foreground/80">
                            <span className="mr-2">{d.flag}</span>{d.region}
                          </td>
                          <td className="px-4 py-3 text-right text-muted-foreground">{d.createdAgo}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="icon" className="rounded-full" aria-label="More">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Page 1 – 1 of 1 domains – {filteredDomains.length} items
                </p>
              </>
            )}

            {view === "logs" && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h1 className="text-2xl font-normal tracking-tight">Logs</h1>
                  <Link to="/audit" className="text-sm text-sky-700 hover:underline">
                    Open full audit log →
                  </Link>
                </div>

                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <div className="relative flex h-9 min-w-[260px] flex-1 items-center">
                    <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search..."
                      className="h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-9 text-sm shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200"
                    />
                  </div>
                  <Chip>Last 15 days</Chip>
                  <Chip>All statuses</Chip>
                  <Chip>All user agents</Chip>
                  <Chip>All API keys</Chip>
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Export">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
                  <table className="w-full text-sm">
                    <thead className="bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="w-10 px-4 py-2"></th>
                        <th className="px-4 py-2 text-left font-medium">Endpoint</th>
                        <th className="px-4 py-2 text-left font-medium">Status</th>
                        <th className="px-4 py-2 text-left font-medium">Method</th>
                        <th className="px-4 py-2 text-right font-medium">Created</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((l) => (
                        <tr key={l.id} className="border-t border-black/5 hover:bg-rose-50/30">
                          <td className="px-4 py-3">
                            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-50 ring-1 ring-emerald-200">
                              <Mail className="h-4 w-4 text-emerald-700" />
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium">{l.endpoint}</td>
                          <td className="px-4 py-3"><StatusPill status={l.status} /></td>
                          <td className="px-4 py-3 text-foreground/80">{l.method}</td>
                          <td className="px-4 py-3 text-right text-muted-foreground">{l.ago}</td>
                        </tr>
                      ))}
                      {filteredLogs.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                            No logs match your search.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
