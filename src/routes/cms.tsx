import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Plus,
  Settings,
  Database,
  ChevronDown,
  Edit3,
  Check,
  ArrowLeft,
  Filter,
  MoreHorizontal,
  Type,
  Hash,
  Image as ImageIcon,
  Link2,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AppsMenu } from "@/components/apps-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cms")({
  head: () => ({
    meta: [
      { title: "Content Manager — CMS" },
      { name: "description", content: "Manage collections, single types and components for your content." },
      { property: "og:title", content: "Content Manager — CMS" },
      { property: "og:description", content: "Manage collections, single types and components." },
    ],
    links: [{ rel: "canonical", href: "/cms" }],
  }),
  component: CmsPage,
});

type SidebarGroup = {
  label: string;
  items: string[];
  createLabel: string;
};

const GROUPS: SidebarGroup[] = [
  {
    label: "Collection Types",
    items: ["Like", "Permission", "Restaurants", "Label ID", "Article", "Category"],
    createLabel: "Create new Collection type",
  },
  {
    label: "Single Types",
    items: ["Categories", "Homepage", "About us", "Global", "Settings", "Footer"],
    createLabel: "Create new Single type",
  },
  {
    label: "Components",
    items: ["Default", "Hero", "Review", "Contact form", "Pop up", "Footer link"],
    createLabel: "Create new Component",
  },
];

type FieldRow = { name: string; type: string; icon: typeof Type };

const COLLECTION_FIELDS: Record<string, FieldRow[]> = {
  Restaurants: [
    { name: "Label", type: "Text", icon: Type },
    { name: "Number", type: "Numbers", icon: Hash },
    { name: "Media", type: "Text", icon: ImageIcon },
    { name: "Category", type: "Relation with Category", icon: Link2 },
    { name: "Dynamic", type: "Dynamic Zone", icon: GitBranch },
  ],
  Article: [
    { name: "Title", type: "Text", icon: Type },
    { name: "Description", type: "Text", icon: Type },
    { name: "Cover", type: "Media", icon: ImageIcon },
    { name: "Author", type: "Relation with User", icon: Link2 },
  ],
};

type Entry = {
  id: number;
  title: string;
  description: string;
  status: "Draft" | "Published";
  releasedIn?: string;
};

const ENTRIES: Record<string, Entry[]> = {
  Article: [
    { id: 3, title: "A bug is becoming a meme on the internet", description: "How a bug on MySQL is becoming a meme o…", status: "Draft" },
    { id: 4, title: "Beautiful picture", description: "Description of a beautiful picture", status: "Draft" },
    { id: 1, title: "The internet's Own boy", description: "Follow the story of Aaron Swartz, the boy wh…", status: "Draft" },
    { id: 2, title: "This shrimp is awesome", description: "Mantis shrimps, or stomatopods, are marine …", status: "Draft" },
    { id: 5, title: "What's inside a Black Hole", description: "Maybe the answer is in this article, or not…", status: "Draft" },
  ],
  Restaurants: [
    { id: 1, title: "Trattoria Romano", description: "Authentic Italian cuisine in central Milan", status: "Published" },
    { id: 2, title: "Sushi Ono", description: "Top-rated omakase experience", status: "Published" },
    { id: 3, title: "Le Petit Bistrot", description: "French bistro with a modern twist", status: "Draft" },
  ],
};

type View =
  | { kind: "collection-list" }
  | { kind: "schema"; name: string }
  | { kind: "entries"; name: string }
  | { kind: "entry"; name: string; id: number };

function CmsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    "Collection Types": true,
    "Single Types": true,
    Components: true,
  });
  const [active, setActive] = useState<string>("Restaurants");
  const [view, setView] = useState<View>({ kind: "schema", name: "Restaurants" });
  const [selected, setSelected] = useState<number[]>([]);

  const selectItem = (groupLabel: string, item: string) => {
    setActive(item);
    if (groupLabel === "Collection Types") {
      // Article shows entries by default; others show schema
      setView(item === "Article" ? { kind: "entries", name: item } : { kind: "schema", name: item });
    } else {
      setView({ kind: "schema", name: item });
    }
    setSelected([]);
  };

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle menu" onClick={() => setSidebarOpen((s) => !s)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm">
              <Database className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Content Manager</span>
          </Link>
        </div>
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
          <div className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-stone-500 text-sm font-medium text-white">C</div>
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
              placeholder="Search content types"
              className="h-12 rounded-full border-none bg-[hsl(220,33%,95%)] pl-14 pr-14 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-indigo-200"
            />
          </div>
        </div>
      )}

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[280px] shrink-0 px-3 md:block">
            <Button className="mb-4 h-14 w-[180px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg">
              <Plus className="mr-1 h-5 w-5" /> Create
            </Button>

            <nav className="space-y-5">
              {GROUPS.map((g) => {
                const open = openGroups[g.label];
                const items = g.items.filter((i) => i.toLowerCase().includes(query.toLowerCase()));
                return (
                  <div key={g.label}>
                    <button
                      onClick={() => setOpenGroups((prev) => ({ ...prev, [g.label]: !prev[g.label] }))}
                      className="flex w-full items-center justify-between px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      <span className="flex items-center gap-1">
                        {g.label}
                        <ChevronDown className={cn("h-3.5 w-3.5 transition", !open && "-rotate-90")} />
                      </span>
                      <span className="rounded-md bg-[hsl(220,20%,92%)] px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {g.items.length}
                      </span>
                    </button>
                    {open && (
                      <ul className="space-y-0.5">
                        {items.map((item) => {
                          const isActive = active === item;
                          return (
                            <li key={item}>
                              <button
                                onClick={() => selectItem(g.label, item)}
                                className={cn(
                                  "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition",
                                  isActive
                                    ? "bg-indigo-50 font-semibold text-indigo-700"
                                    : "text-foreground/80 hover:bg-white/60",
                                )}
                              >
                                <span className={cn("h-1.5 w-1.5 rounded-full", isActive ? "bg-indigo-600" : "bg-muted-foreground/50")} />
                                <span className="truncate text-left">{item}</span>
                              </button>
                            </li>
                          );
                        })}
                        <li>
                          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50">
                            <Plus className="h-4 w-4" />
                            <span className="truncate">{g.createLabel}</span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
          {view.kind === "collection-list" && (
            <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h1 className="text-3xl font-semibold tracking-tight">Content-Type Builder</h1>
              <p className="mt-2 text-muted-foreground">Select a collection type from the sidebar to view or edit its data architecture.</p>
            </section>
          )}

          {view.kind === "schema" && (
            <SchemaView
              name={view.name}
              fields={COLLECTION_FIELDS[view.name] ?? COLLECTION_FIELDS.Restaurants}
              onOpenEntries={() => setView({ kind: "entries", name: view.name })}
            />
          )}

          {view.kind === "entries" && (
            <EntriesView
              name={view.name}
              entries={ENTRIES[view.name] ?? []}
              selected={selected}
              setSelected={setSelected}
              onBack={() => setView({ kind: "schema", name: view.name })}
              onOpenEntry={(id) => setView({ kind: "entry", name: view.name, id })}
            />
          )}

          {view.kind === "entry" && (
            <EntryView
              name={view.name}
              entry={(ENTRIES[view.name] ?? []).find((e) => e.id === view.id)!}
              onBack={() => setView({ kind: "entries", name: view.name })}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function SchemaView({ name, fields, onOpenEntries }: { name: string; fields: FieldRow[]; onOpenEntries: () => void }) {
  return (
    <section className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-semibold tracking-tight">{name}</h1>
            <Button variant="outline" size="sm" className="rounded-lg">
              <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Edit
            </Button>
          </div>
          <p className="mt-1 text-muted-foreground">Build the data architecture of your content.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-lg" onClick={onOpenEntries}>
            View entries
          </Button>
          <Button variant="outline" className="rounded-lg text-indigo-600">
            <Plus className="mr-1.5 h-4 w-4" /> Add new field
          </Button>
          <Button className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
            <Check className="mr-1.5 h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" size="sm" className="rounded-lg">
          <Filter className="mr-1.5 h-3.5 w-3.5" /> Configure the view
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="grid grid-cols-[1fr_2fr_80px] gap-4 border-b border-black/5 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <div>Name</div>
          <div>Type</div>
          <div />
        </div>
        <ul>
          {fields.map((f) => (
            <li key={f.name} className="grid grid-cols-[1fr_2fr_80px] items-center gap-4 border-b border-black/5 px-6 py-4 last:border-b-0 hover:bg-[hsl(220,33%,98%)]">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-indigo-50 text-indigo-600">
                  <f.icon className="h-4 w-4" />
                </span>
                <span className="font-medium">{f.name}</span>
              </div>
              <div className="text-foreground/80">{f.type}</div>
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Edit field">
                  <Edit3 className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Delete field">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <button className="flex w-full items-center gap-3 bg-indigo-50/60 px-6 py-4 text-sm font-medium text-indigo-600 hover:bg-indigo-50">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-indigo-100">
            <Plus className="h-3.5 w-3.5" />
          </span>
          Add another field to this Collection type
        </button>
      </div>
    </section>
  );
}

function EntriesView({
  name,
  entries,
  selected,
  setSelected,
  onBack,
  onOpenEntry,
}: {
  name: string;
  entries: Entry[];
  selected: number[];
  setSelected: (v: number[]) => void;
  onBack: () => void;
  onOpenEntry: (id: number) => void;
}) {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => entries.filter((e) => e.title.toLowerCase().includes(q.toLowerCase())),
    [entries, q],
  );
  const allChecked = filtered.length > 0 && filtered.every((e) => selected.includes(e.id));
  const toggleAll = () => setSelected(allChecked ? [] : filtered.map((e) => e.id));
  const toggle = (id: number) =>
    setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);

  return (
    <section className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">{name}</h1>
          <p className="mt-1 text-muted-foreground">{entries.length} entries found</p>
        </div>
        <Button className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
          <Plus className="mr-1.5 h-4 w-4" /> Create new entry
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="h-9 w-48 rounded-lg border-black/10 bg-white pl-9"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 rounded-lg">
            <Filter className="mr-1.5 h-3.5 w-3.5" /> Filters
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full" aria-label="Settings">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">{selected.length} entries selected</span>
          <Button size="sm" className="h-8 rounded-lg bg-indigo-600 hover:bg-indigo-700">
            Publish
          </Button>
          <Button size="sm" variant="outline" className="h-8 rounded-lg text-rose-600">
            Delete
          </Button>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="grid grid-cols-[40px_60px_1fr_2fr_140px_120px_40px] items-center gap-4 border-b border-black/5 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Checkbox checked={allChecked} onCheckedChange={toggleAll} />
          <div>ID</div>
          <div>Title</div>
          <div>Description</div>
          <div>To be released in</div>
          <div>Status</div>
          <div />
        </div>
        <ul>
          {filtered.map((e) => {
            const checked = selected.includes(e.id);
            return (
              <li
                key={e.id}
                className="grid cursor-pointer grid-cols-[40px_60px_1fr_2fr_140px_120px_40px] items-center gap-4 border-b border-black/5 px-6 py-4 text-sm last:border-b-0 hover:bg-[hsl(220,33%,98%)]"
                onClick={() => onOpenEntry(e.id)}
              >
                <div onClick={(ev) => ev.stopPropagation()}>
                  <Checkbox checked={checked} onCheckedChange={() => toggle(e.id)} />
                </div>
                <div className="text-muted-foreground">{e.id}</div>
                <div className="truncate font-medium">{e.title}</div>
                <div className="truncate text-foreground/80">{e.description}</div>
                <div className="text-muted-foreground">-</div>
                <div>
                  <span className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-medium",
                    e.status === "Draft" ? "bg-sky-50 text-sky-700 ring-1 ring-sky-200" : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
                  )}>
                    {e.status}
                  </span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="More" onClick={(ev) => ev.stopPropagation()}>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function EntryView({ name, entry, onBack }: { name: string; entry: Entry; onBack: () => void }) {
  const [title, setTitle] = useState(entry.title);
  const [description, setDescription] = useState(entry.description);

  return (
    <section className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to {name}
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">{title || "Untitled"}</h1>
          <p className="mt-1 text-muted-foreground">Edit and publish your {name.toLowerCase()} entry.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-lg">Save draft</Button>
          <Button className="rounded-lg bg-indigo-600 hover:bg-indigo-700">
            <Check className="mr-1.5 h-4 w-4" /> Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-11 rounded-lg" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Body</label>
            <textarea
              rows={10}
              placeholder="Write your content..."
              className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Information</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">ID</dt>
                <dd className="font-medium">{entry.id}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Status</dt>
                <dd>
                  <span className="rounded-md bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700 ring-1 ring-sky-200">
                    {entry.status}
                  </span>
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Created</dt>
                <dd className="font-medium">Just now</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </section>
  );
}
