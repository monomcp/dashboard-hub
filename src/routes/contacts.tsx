import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Plus,
  Settings,
  User,
  Clock,
  Inbox,
  Wrench,
  Upload,
  Trash2,
  Tag,
  MoreVertical,
  Mail,
  Phone,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppsMenu } from "@/components/apps-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contacts — CRM" },
      { name: "description", content: "Manage your contacts, leads and customer relationships." },
      { property: "og:title", content: "Contacts — CRM" },
      { property: "og:description", content: "Manage your contacts, leads and customer relationships." },
    ],
    links: [{ rel: "canonical", href: "/contacts" }],
  }),
  component: ContactsPage,
});

type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  color: string;
  starred?: boolean;
};

const INITIAL_CONTACTS: Contact[] = [
  { id: "1", name: "autionix2@gmail.com", email: "autionix2@gmail.com", color: "bg-stone-500" },
  { id: "2", name: "colin@silverpine.ai", email: "colin@silverpine.ai", company: "Silverpine", color: "bg-violet-500" },
  { id: "3", name: "cruelconnection777@agentmail.to", email: "cruelconnection777@agentmail.to", color: "bg-purple-500" },
  { id: "4", name: "Growth Factory", email: "events@growthfactory.it", company: "Growth Factory", phone: "+39 02 1234 5678", color: "bg-zinc-700", starred: true },
  { id: "5", name: "hello@popsy.ai", email: "hello@popsy.ai", company: "Popsy", color: "bg-orange-500" },
  { id: "6", name: "hi@autosend.ing", email: "hi@autosend.ing", color: "bg-fuchsia-500" },
  { id: "7", name: "hi@epictwin.co", email: "hi@epictwin.co", color: "bg-sky-500" },
  { id: "8", name: "hi@peliayaef.resend.app", email: "hi@peliayaef.resend.app", color: "bg-slate-400" },
  { id: "9", name: "kuprovskiyid@gmail.com", email: "kuprovskiyid@gmail.com", color: "bg-indigo-500" },
  { id: "10", name: "Nataliya", email: "nataliya@growthfactory.it", company: "Growth Factory", phone: "+39 02 9999 0000", color: "bg-rose-400", starred: true },
  { id: "11", name: "nocodetools765@gmail.com", email: "nocodetools765@gmail.com", color: "bg-amber-700" },
  { id: "12", name: "Oleg Kuprovskiy", email: "Oleg.Kuprovskiy@gmail.com", phone: "+1 415 555 0142", color: "bg-teal-500" },
  { id: "13", name: "press@layoff.today", email: "press@layoff.today", color: "bg-pink-600" },
];

function initialOf(s: string) {
  return s.trim().charAt(0).toUpperCase();
}

function ContactsPage() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("Other contacts");
  const [contacts] = useState<Contact[]>(INITIAL_CONTACTS);

  const filtered = useMemo(
    () =>
      contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase()),
      ),
    [contacts, query],
  );

  const nav = [
    { label: "Contacts", icon: User },
    { label: "Frequent", icon: Clock },
    { label: "Other contacts", icon: Inbox, active: true },
  ];
  const fixNav = [
    { label: "Merge and fix", icon: Wrench },
    { label: "Import", icon: Upload },
    { label: "Bin", icon: Trash2 },
  ];

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      {/* Top bar — matches drive/index header */}
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle menu" onClick={() => setSidebarOpen((s) => !s)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-sm">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Contacts</span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Settings">
            <Settings className="h-5 w-5 text-muted-foreground" />
          </Button>
          <AppsMenu />
          <div className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-stone-500 text-sm font-medium text-white">
            C
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="px-4 pb-3 md:px-6">
          <div className="relative mx-auto flex h-12 w-full max-w-2xl items-center">
            <Search className="pointer-events-none absolute left-5 h-5 w-5 text-muted-foreground" />
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search contacts"
              className="h-12 rounded-full border-none bg-[hsl(220,33%,95%)] pl-14 pr-14 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200"
            />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar — reuse drive/index layout */}
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mb-4 h-14 w-[160px] rounded-2xl bg-white text-foreground hover:bg-white hover:shadow-lg">
                  <Plus className="mr-1 h-5 w-5" /> Create contact
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 rounded-2xl p-1.5">
                <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                  <User className="h-4 w-4" /> Create a contact
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                  <Tag className="h-4 w-4" /> Create multiple contacts
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                  <Upload className="h-4 w-4 text-emerald-500" /> Import
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <nav className="space-y-1">
              {nav.map((n) => {
                const active = activeNav === n.label;
                return (
                  <button
                    key={n.label}
                    onClick={() => setActiveNav(n.label)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                      active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <n.icon className="h-5 w-5 text-foreground/70" />
                    <span className="flex-1 truncate text-left">{n.label}</span>
                  </button>
                );
              })}

              <div className="px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Fix and manage
              </div>
              {fixNav.map((n) => (
                <button
                  key={n.label}
                  onClick={() => setActiveNav(n.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                    activeNav === n.label ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
                  )}
                >
                  <n.icon className="h-5 w-5 text-foreground/70" />
                  <span className="flex-1 truncate text-left">{n.label}</span>
                </button>
              ))}

              <div className="flex items-center justify-between px-3 pb-1 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <span>Labels</span>
                <button className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/60" aria-label="Add label">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </nav>
          </aside>
        )}

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-5 flex items-center justify-between">
              <h1 className="text-2xl font-normal tracking-tight">{activeNav}</h1>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="More">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_1.2fr_1fr_40px] items-center gap-4 border-b border-black/5 px-2 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <div>Name</div>
              <div>Email</div>
              <div>Phone number</div>
              <div />
            </div>

            <ul>
              {filtered.map((c) => (
                <li
                  key={c.id}
                  className="group grid grid-cols-[1fr_1.2fr_1fr_40px] items-center gap-4 rounded-xl border-b border-black/5 px-2 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-medium text-white", c.color)}>
                      {initialOf(c.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{c.name}</div>
                      {c.company && (
                        <div className="truncate text-xs text-muted-foreground">{c.company}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 min-w-0 text-foreground/80">
                    <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="truncate">{c.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {c.phone ? (
                      <>
                        <Phone className="h-3.5 w-3.5" />
                        <span className="truncate">{c.phone}</span>
                      </>
                    ) : (
                      <span className="text-muted-foreground/60">—</span>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full opacity-0 transition group-hover:opacity-100"
                      aria-label="Star"
                    >
                      <Star className={cn("h-4 w-4", c.starred && "fill-amber-400 text-amber-400 opacity-100")} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full opacity-0 transition group-hover:opacity-100"
                      aria-label="More"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            {filtered.length === 0 && (
              <div className="grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center">
                <Search className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="text-sm font-medium">No contacts match "{query}"</p>
                <p className="text-xs text-muted-foreground">Try a different keyword.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
