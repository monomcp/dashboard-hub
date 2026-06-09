import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Plus,
  FolderPlus,
  FileText,
  Image as ImageIcon,
  Film,
  Folder,
  MoreVertical,
  Users,
  ArrowUpDown,
  List,
  Grid3x3,
  Sparkles,
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

export const Route = createFileRoute("/drive")({
  head: () => ({
    meta: [
      { title: "Drive — Files & folders" },
      { name: "description", content: "Browse, search and manage your files and folders." },
      { property: "og:title", content: "Drive — Files & folders" },
      { property: "og:description", content: "Browse, search and manage your files and folders." },
    ],
    links: [{ rel: "canonical", href: "/drive" }],
  }),
  component: DrivePage,
});

type DriveItem = {
  id: string;
  name: string;
  kind: "folder" | "doc" | "image" | "video" | "pdf";
  owner: string;
  modified: string;
  size?: string;
  accent: string;
};

const TEMPLATES = [
  { name: "Blank", sub: "Document", color: "from-sky-100 to-sky-50", glyph: "+" },
  { name: "Resume", sub: "Serif", color: "from-stone-100 to-white", glyph: "R" },
  { name: "Project proposal", sub: "Tropic", color: "from-emerald-100 to-amber-50", glyph: "P" },
  { name: "Brochure", sub: "Geometric", color: "from-rose-100 to-orange-50", glyph: "B" },
  { name: "Letter", sub: "Spearmint", color: "from-teal-100 to-emerald-50", glyph: "L" },
  { name: "Notes", sub: "Coral", color: "from-orange-100 to-rose-50", glyph: "N" },
];

const INITIAL_ITEMS: DriveItem[] = [
  { id: "1", name: "Product roadmap 2026", kind: "doc", owner: "me", modified: "May 24", accent: "bg-blue-500" },
  { id: "2", name: "Design assets", kind: "folder", owner: "me", modified: "May 22", accent: "bg-amber-400" },
  { id: "3", name: "Q2 strategy", kind: "doc", owner: "Anna K.", modified: "May 18", accent: "bg-blue-500" },
  { id: "4", name: "Brand guidelines.pdf", kind: "pdf", owner: "me", modified: "May 12", size: "2.4 MB", accent: "bg-red-500" },
  { id: "5", name: "Team photos", kind: "folder", owner: "me", modified: "May 09", accent: "bg-amber-400" },
  { id: "6", name: "Launch video.mp4", kind: "video", owner: "Sam P.", modified: "May 06", size: "84 MB", accent: "bg-violet-500" },
  { id: "7", name: "Hero render.png", kind: "image", owner: "me", modified: "Apr 30", size: "5.1 MB", accent: "bg-emerald-500" },
  { id: "8", name: "Meeting notes", kind: "doc", owner: "me", modified: "Apr 24", accent: "bg-blue-500" },
];

function KindIcon({ kind, className }: { kind: DriveItem["kind"]; className?: string }) {
  const cls = cn("h-5 w-5 text-white", className);
  if (kind === "folder") return <Folder className={cls} />;
  if (kind === "image") return <ImageIcon className={cls} />;
  if (kind === "video") return <Film className={cls} />;
  return <FileText className={cls} />;
}

function DrivePage() {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [items] = useState<DriveItem[]>(INITIAL_ITEMS);

  const filtered = useMemo(
    () => items.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );
  const folders = filtered.filter((i) => i.kind === "folder");
  const files = filtered.filter((i) => i.kind !== "folder");

  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      {/* Top bar — matches index header */}
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle menu" onClick={() => setSidebarOpen((s) => !s)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400 shadow-sm">
              <span className="text-sm font-bold text-white">△</span>
            </div>
            <span className="text-xl font-medium tracking-tight">Drive</span>
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
              placeholder="Search in Drive"
              className="h-12 rounded-full border-none bg-[hsl(220,33%,95%)] pl-14 pr-14 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200"
            />
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar — matches index layout */}
        <aside className="hidden w-[260px] shrink-0 px-3 md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg">
                <Plus className="mr-1 h-5 w-5" /> New
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 rounded-2xl p-1.5">
              <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                <FolderPlus className="h-4 w-4" /> New folder
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                <FileText className="h-4 w-4 text-blue-500" /> Document
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                <ImageIcon className="h-4 w-4 text-emerald-500" /> Upload image
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                <Sparkles className="h-4 w-4 text-violet-500" /> AI summary
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="space-y-1">
            {[
              { label: "My Drive", icon: Folder, active: true },
              { label: "Shared with me", icon: Users },
              { label: "Recent", icon: FileText },
              { label: "Starred", icon: Sparkles },
              { label: "Trash", icon: MoreVertical },
            ].map((n) => (
              <button
                key={n.label}
                className={cn(
                  "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                  n.active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
                )}
              >
                <n.icon className="h-5 w-5 text-foreground/70" />
                <span className="flex-1 truncate text-left">{n.label}</span>
              </button>
            ))}
          </nav>
        </aside>


        {/* Main */}
        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
          {/* Templates strip */}
          <section className="rounded-3xl bg-[hsl(220,33%,96%)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-medium">Start a new document</h2>
              <Button variant="ghost" className="gap-1 text-sm">
                Template gallery
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {TEMPLATES.map((t) => (
                <button
                  key={t.name}
                  className="group flex flex-col items-start gap-2 text-left"
                >
                  <div
                    className={cn(
                      "grid aspect-[3/4] w-full place-items-center rounded-xl border border-black/5 bg-gradient-to-br shadow-sm transition group-hover:shadow-md",
                      t.color,
                    )}
                  >
                    <span className="text-3xl font-light text-foreground/40">{t.glyph}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Toolbar */}
          <div className="mt-8 flex items-center justify-between">
            <h2 className="text-lg font-medium">My Drive</h2>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="gap-1 rounded-full text-muted-foreground">
                <ArrowUpDown className="h-4 w-4" /> Last modified
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setView((v) => (v === "grid" ? "list" : "grid"))}
                aria-label="Toggle view"
              >
                {view === "grid" ? <List className="h-4 w-4" /> : <Grid3x3 className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Folders */}
          {folders.length > 0 && (
            <>
              <h3 className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Folders
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {folders.map((f) => (
                  <div
                    key={f.id}
                    className="group flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
                  >
                    <div className={cn("grid h-9 w-9 place-items-center rounded-lg", f.accent)}>
                      <KindIcon kind={f.kind} />
                    </div>
                    <span className="flex-1 truncate text-sm font-medium">{f.name}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 transition group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Files */}
          <h3 className="mt-8 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Files
          </h3>
          {view === "grid" ? (
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
                >
                  <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-[hsl(220,33%,97%)] to-white">
                    <div className={cn("grid h-14 w-14 place-items-center rounded-2xl", f.accent)}>
                      <KindIcon kind={f.kind} className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-t border-black/5 px-4 py-3">
                    <KindIcon kind={f.kind} className={cn("h-4 w-4", f.accent, "rounded p-0.5")} />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{f.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {f.owner} · {f.modified}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 transition group-hover:opacity-100">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
              <div className="grid grid-cols-[1fr_140px_140px_100px_40px] gap-2 px-4 py-2 text-xs font-medium text-muted-foreground">
                <div>Name</div>
                <div>Owner</div>
                <div>Modified</div>
                <div>Size</div>
                <div />
              </div>
              {files.map((f) => (
                <div
                  key={f.id}
                  className="grid grid-cols-[1fr_140px_140px_100px_40px] items-center gap-2 border-t border-black/5 px-4 py-2.5 text-sm hover:bg-[hsl(220,33%,98%)]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn("grid h-8 w-8 place-items-center rounded-lg", f.accent)}>
                      <KindIcon kind={f.kind} className="h-4 w-4" />
                    </div>
                    <span className="truncate">{f.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> {f.owner}
                  </div>
                  <div className="text-muted-foreground">{f.modified}</div>
                  <div className="text-muted-foreground">{f.size ?? "—"}</div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="mt-12 grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center">
              <Search className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">No results for "{query}"</p>
              <p className="text-xs text-muted-foreground">Try a different keyword.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
