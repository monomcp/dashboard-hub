import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Settings as SettingsIcon,
  Database,
  Plus,
  LayoutGrid,
  Filter,
  ArrowDownUp,
  EyeOff,
  Share2,
  Users,
  Star,
  MoreHorizontal,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AppsMenu } from "@/components/apps-menu";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/database")({
  head: () => ({
    meta: [
      { title: "Database — Airtable-style workspace" },
      {
        name: "description",
        content:
          "A lightweight Airtable-style database with bases, tables, grid view and inline editing.",
      },
      { property: "og:title", content: "Database — Airtable-style workspace" },
      {
        property: "og:description",
        content: "Bases, tables and a grid view for collaborative structured data.",
      },
    ],
    links: [{ rel: "canonical", href: "/database" }],
  }),
  component: DatabasePage,
});

// --------------------------- Types & seed data ---------------------------

type FieldType = "text" | "number" | "select" | "checkbox" | "date";

type Field = {
  id: string;
  name: string;
  type: FieldType;
  options?: { value: string; color: string }[];
};

type Row = { id: string; cells: Record<string, string | number | boolean> };

type TableDef = {
  id: string;
  name: string;
  icon: string;
  fields: Field[];
  rows: Row[];
};

type Base = {
  id: string;
  name: string;
  color: string;
  tables: TableDef[];
};

const STATUS_COLORS = [
  { value: "Todo", color: "bg-stone-200 text-stone-800" },
  { value: "In progress", color: "bg-amber-100 text-amber-800" },
  { value: "Review", color: "bg-violet-100 text-violet-800" },
  { value: "Done", color: "bg-emerald-100 text-emerald-800" },
];

const PRIORITY_COLORS = [
  { value: "Low", color: "bg-sky-100 text-sky-800" },
  { value: "Medium", color: "bg-amber-100 text-amber-800" },
  { value: "High", color: "bg-rose-100 text-rose-800" },
];

const INITIAL_BASES: Base[] = [
  {
    id: "b1",
    name: "Product roadmap",
    color: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
    tables: [
      {
        id: "t1",
        name: "Features",
        icon: "✦",
        fields: [
          { id: "f1", name: "Name", type: "text" },
          { id: "f2", name: "Status", type: "select", options: STATUS_COLORS },
          { id: "f3", name: "Priority", type: "select", options: PRIORITY_COLORS },
          { id: "f4", name: "Owner", type: "text" },
          { id: "f5", name: "Estimate", type: "number" },
          { id: "f6", name: "Shipped", type: "checkbox" },
          { id: "f7", name: "Due", type: "date" },
        ],
        rows: [
          {
            id: "r1",
            cells: {
              f1: "Multi-base sync",
              f2: "In progress",
              f3: "High",
              f4: "Alice",
              f5: 8,
              f6: false,
              f7: "2026-07-02",
            },
          },
          {
            id: "r2",
            cells: {
              f1: "Kanban grouping",
              f2: "Review",
              f3: "Medium",
              f4: "Ben",
              f5: 5,
              f6: false,
              f7: "2026-06-24",
            },
          },
          {
            id: "r3",
            cells: {
              f1: "CSV importer v2",
              f2: "Done",
              f3: "Medium",
              f4: "Casey",
              f5: 3,
              f6: true,
              f7: "2026-05-30",
            },
          },
          {
            id: "r4",
            cells: {
              f1: "Realtime presence",
              f2: "Todo",
              f3: "Low",
              f4: "Dani",
              f5: 13,
              f6: false,
              f7: "2026-08-15",
            },
          },
          {
            id: "r5",
            cells: {
              f1: "Formula fields",
              f2: "In progress",
              f3: "High",
              f4: "Eli",
              f5: 8,
              f6: false,
              f7: "2026-07-18",
            },
          },
        ],
      },
      {
        id: "t2",
        name: "Sprints",
        icon: "⌖",
        fields: [
          { id: "f1", name: "Name", type: "text" },
          { id: "f2", name: "Status", type: "select", options: STATUS_COLORS },
          { id: "f3", name: "Start", type: "date" },
          { id: "f4", name: "End", type: "date" },
        ],
        rows: [
          { id: "r1", cells: { f1: "Sprint 24", f2: "Done", f3: "2026-05-01", f4: "2026-05-14" } },
          {
            id: "r2",
            cells: { f1: "Sprint 25", f2: "In progress", f3: "2026-05-15", f4: "2026-05-28" },
          },
          {
            id: "r3",
            cells: { f1: "Sprint 26", f2: "Todo", f3: "2026-05-29", f4: "2026-06-11" },
          },
        ],
      },
    ],
  },
  {
    id: "b2",
    name: "Content calendar",
    color: "bg-gradient-to-br from-amber-400 to-rose-500",
    tables: [
      {
        id: "t1",
        name: "Posts",
        icon: "✎",
        fields: [
          { id: "f1", name: "Title", type: "text" },
          { id: "f2", name: "Status", type: "select", options: STATUS_COLORS },
          { id: "f3", name: "Author", type: "text" },
          { id: "f4", name: "Publish", type: "date" },
          { id: "f5", name: "Featured", type: "checkbox" },
        ],
        rows: [
          {
            id: "r1",
            cells: {
              f1: "Why we built Database",
              f2: "Done",
              f3: "Alice",
              f4: "2026-06-01",
              f5: true,
            },
          },
          {
            id: "r2",
            cells: {
              f1: "Spring product update",
              f2: "Review",
              f3: "Ben",
              f4: "2026-06-15",
              f5: false,
            },
          },
        ],
      },
    ],
  },
  {
    id: "b3",
    name: "Customers",
    color: "bg-gradient-to-br from-sky-400 to-blue-600",
    tables: [
      {
        id: "t1",
        name: "Accounts",
        icon: "◎",
        fields: [
          { id: "f1", name: "Company", type: "text" },
          { id: "f2", name: "Plan", type: "select", options: PRIORITY_COLORS },
          { id: "f3", name: "MRR", type: "number" },
          { id: "f4", name: "Active", type: "checkbox" },
        ],
        rows: [
          { id: "r1", cells: { f1: "Acme Inc.", f2: "High", f3: 1200, f4: true } },
          { id: "r2", cells: { f1: "Globex", f2: "Medium", f3: 480, f4: true } },
          { id: "r3", cells: { f1: "Initech", f2: "Low", f3: 99, f4: false } },
        ],
      },
    ],
  },
];

// --------------------------- Component ---------------------------

function DatabasePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [bases, setBases] = useState<Base[]>(INITIAL_BASES);
  const [activeBaseId, setActiveBaseId] = useState(INITIAL_BASES[0].id);
  const [activeTableId, setActiveTableId] = useState(INITIAL_BASES[0].tables[0].id);

  const activeBase = bases.find((b) => b.id === activeBaseId)!;
  const activeTable = activeBase.tables.find((t) => t.id === activeTableId) ?? activeBase.tables[0];

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return activeTable.rows;
    return activeTable.rows.filter((r) =>
      Object.values(r.cells).some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [search, activeTable.rows]);

  function mutateTable(fn: (t: TableDef) => TableDef) {
    setBases((prev) =>
      prev.map((b) =>
        b.id !== activeBaseId
          ? b
          : { ...b, tables: b.tables.map((t) => (t.id === activeTable.id ? fn(t) : t)) },
      ),
    );
  }

  function updateCell(rowId: string, fieldId: string, value: string | number | boolean) {
    mutateTable((t) => ({
      ...t,
      rows: t.rows.map((r) =>
        r.id === rowId ? { ...r, cells: { ...r.cells, [fieldId]: value } } : r,
      ),
    }));
  }

  function addRow() {
    const newRow: Row = { id: `r${Date.now()}`, cells: {} };
    mutateTable((t) => ({ ...t, rows: [...t.rows, newRow] }));
  }

  function deleteRow(rowId: string) {
    mutateTable((t) => ({ ...t, rows: t.rows.filter((r) => r.id !== rowId) }));
  }

  function addField() {
    const name = prompt("Field name");
    if (!name) return;
    const id = `f${Date.now()}`;
    mutateTable((t) => ({ ...t, fields: [...t.fields, { id, name, type: "text" }] }));
  }

  function addTable() {
    const name = prompt("Table name");
    if (!name) return;
    const id = `t${Date.now()}`;
    const newTable: TableDef = {
      id,
      name,
      icon: "▦",
      fields: [{ id: "f1", name: "Name", type: "text" }],
      rows: [],
    };
    setBases((prev) =>
      prev.map((b) => (b.id === activeBaseId ? { ...b, tables: [...b.tables, newTable] } : b)),
    );
    setActiveTableId(id);
  }

  function addBase() {
    const name = prompt("Base name");
    if (!name) return;
    const id = `b${Date.now()}`;
    const colors = [
      "bg-gradient-to-br from-emerald-400 to-sky-500",
      "bg-gradient-to-br from-pink-500 to-orange-400",
      "bg-gradient-to-br from-indigo-500 to-violet-600",
    ];
    const newBase: Base = {
      id,
      name,
      color: colors[bases.length % colors.length],
      tables: [
        {
          id: "t1",
          name: "Table 1",
          icon: "▦",
          fields: [{ id: "f1", name: "Name", type: "text" }],
          rows: [],
        },
      ],
    };
    setBases((prev) => [...prev, newBase]);
    setActiveBaseId(id);
    setActiveTableId("t1");
  }

  const tableTabs = (
    <div className="flex items-center rounded-full bg-[hsl(220,33%,95%)] p-1">
      {activeBase.tables.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTableId(t.id)}
          className={cn(
            "rounded-full px-5 py-1.5 text-sm transition",
            t.id === activeTable.id
              ? "bg-white text-foreground shadow-sm"
              : "text-foreground/60 hover:text-foreground",
          )}
        >
          {t.name}
        </button>
      ))}
      <button
        onClick={addTable}
        className="grid h-8 w-9 place-items-center rounded-full text-foreground/60 transition hover:bg-white/60 hover:text-foreground"
        aria-label="Add table"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      {/* Header */}
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
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-blue-600 shadow-sm">
              <Database className="h-4 w-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-medium tracking-tight">Database</div>
            </div>
          </Link>
        </div>

        {searchOpen && (
          <div className="hidden min-w-0 max-w-2xl flex-1 md:block">
            <div className="relative flex h-9 w-full items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
              <Input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search this table"
                className="h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="hidden rounded-full text-foreground/70 md:inline-flex"
          >
            <Users className="h-4 w-4" /> Share
          </Button>
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
            <SettingsIcon className="h-5 w-5 text-muted-foreground" />
          </Button>
          <AppsMenu />
          <div className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-stone-500 text-sm font-medium text-white">
            C
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar: bases / tables */}
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <Button
              onClick={addBase}
              className="mb-4 h-14 w-[160px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg"
            >
              <Plus className="mr-1 h-5 w-5" /> New base
            </Button>

            <div className="flex items-center justify-between px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <span>Tables</span>
              <button
                onClick={addBase}
                className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/60"
                aria-label="Add base"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <nav className="space-y-1">
              {bases.map((b) => {
                const baseActive = activeBaseId === b.id;
                return (
                  <button
                    key={b.id}
                    onClick={() => {
                      setActiveBaseId(b.id);
                      setActiveTableId(b.tables[0].id);
                    }}
                    className={cn(
                      "flex w-full items-center rounded-full px-3 py-2 text-sm transition",
                      baseActive
                        ? "bg-sky-100 font-medium text-sky-900"
                        : "text-foreground/80 hover:bg-white/60",
                    )}
                  >
                    <span className="truncate text-left">{b.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 rounded-2xl bg-white/70 p-3 ring-1 ring-black/5">
              <div className="flex items-center gap-2 text-xs font-medium text-foreground/80">
                <Star className="h-3.5 w-3.5 text-amber-500" /> Templates
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Start from a project tracker, CRM, content calendar and more.
              </p>
              <button className="mt-2 text-xs font-medium text-sky-700 hover:underline">
                Browse templates →
              </button>
            </div>
          </aside>
        )}

        {/* Main */}
        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="min-w-0 overflow-x-auto">{tableTabs}</div>
          </div>

          <section>
            {/* Toolbar */}
            <div className="mb-3 flex flex-wrap items-center gap-1 px-1">
              <ToolbarBtn icon={EyeOff} label="Hide fields" />
              <ToolbarBtn icon={Filter} label="Filter" />
              <ToolbarBtn icon={LayoutGrid} label="Group" />
              <ToolbarBtn icon={ArrowDownUp} label="Sort" />
              <ToolbarBtn icon={Share2} label="Share view" />

              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {filteredRows.length} of {activeTable.rows.length} records
                </span>
              </div>
            </div>

            {/* View body */}
            <div className="bg-white">
              <GridView
                table={activeTable}
                rows={filteredRows}
                onUpdate={updateCell}
                onDeleteRow={deleteRow}
                onAddRow={addRow}
                onAddField={addField}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// --------------------------- Toolbar ---------------------------

function ToolbarBtn({ icon: Icon, label }: { icon: typeof Filter; label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-foreground/80 transition hover:bg-stone-50">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      {label}
    </button>
  );
}

// --------------------------- Grid view ---------------------------

function GridView({
  table,
  rows,
  onUpdate,
  onDeleteRow,
  onAddRow,
  onAddField,
}: {
  table: TableDef;
  rows: Row[];
  onUpdate: (rowId: string, fieldId: string, value: string | number | boolean) => void;
  onDeleteRow: (rowId: string) => void;
  onAddRow: () => void;
  onAddField: () => void;
}) {
  const titleField = table.fields[0];

  return (
    <div className="overflow-auto rounded-xl border border-black/5">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[hsl(220,33%,98%)] text-left">
            <th className="sticky left-0 z-10 w-10 border-b border-r border-black/5 bg-[hsl(220,33%,98%)] px-2 py-2 text-xs font-medium text-muted-foreground">
              #
            </th>
            {table.fields.map((f) => (
              <th
                key={f.id}
                className="min-w-[160px] border-b border-r border-black/5 px-3 py-2 text-xs font-medium text-foreground/80"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">{f.name}</span>
                  <FieldTypeIcon type={f.type} />
                </div>
              </th>
            ))}
            <th className="w-12 border-b border-black/5 px-2 py-2">
              <button
                onClick={onAddField}
                className="grid h-6 w-6 place-items-center rounded text-muted-foreground hover:bg-sky-50 hover:text-sky-700"
                aria-label="Add field"
              >
                <Plus className="h-4 w-4" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.id} className="group hover:bg-sky-50/40">
              <td className="sticky left-0 z-10 w-10 border-b border-r border-black/5 bg-white px-2 py-1.5 text-xs text-muted-foreground group-hover:bg-sky-50/40">
                <div className="flex items-center gap-1">
                  <span className="group-hover:hidden">{idx + 1}</span>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        className="hidden text-rose-500 group-hover:inline"
                        aria-label="Delete row"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-2xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Delete “{String(r.cells[titleField.id] ?? "this record")}”? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-full">No</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDeleteRow(r.id)}
                          className="rounded-full bg-rose-600 text-white hover:bg-rose-700"
                        >
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
              {table.fields.map((f) => (
                <td key={f.id} className="border-b border-r border-black/5 px-2 py-1 align-middle">
                  <Cell field={f} value={r.cells[f.id]} onChange={(v) => onUpdate(r.id, f.id, v)} />
                </td>
              ))}
              <td className="border-b border-black/5" />
            </tr>
          ))}
          <tr>
            <td colSpan={table.fields.length + 2} className="border-b border-black/5 px-2 py-1.5">
              <button
                onClick={onAddRow}
                className="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-sky-50 hover:text-sky-700"
              >
                <Plus className="h-3.5 w-3.5" /> Add record
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function FieldTypeIcon({ type }: { type: FieldType }) {
  const map: Record<FieldType, string> = {
    text: "A",
    number: "#",
    select: "▾",
    checkbox: "☑",
    date: "📅",
  };
  return (
    <span className="grid h-4 w-4 place-items-center rounded text-[10px] text-muted-foreground">
      {map[type]}
    </span>
  );
}

function Cell({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string | number | boolean | undefined;
  onChange: (v: string | number | boolean) => void;
}) {
  const [editing, setEditing] = useState(false);

  if (field.type === "checkbox") {
    const v = Boolean(value);
    return (
      <button
        onClick={() => onChange(!v)}
        className={cn(
          "grid h-5 w-5 place-items-center rounded border transition",
          v ? "border-emerald-500 bg-emerald-500 text-white" : "border-stone-300 bg-white",
        )}
        aria-label="Toggle"
      >
        {v ? <Check className="h-3.5 w-3.5" /> : null}
      </button>
    );
  }

  if (field.type === "select") {
    const opt = field.options?.find((o) => o.value === value);
    return (
      <div className="relative">
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          <option value="">—</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.value}
            </option>
          ))}
        </select>
        {opt ? (
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
              opt.color,
            )}
          >
            {opt.value}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">—</span>
        )}
      </div>
    );
  }

  if (editing) {
    return (
      <input
        autoFocus
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        defaultValue={value === undefined ? "" : String(value)}
        onBlur={(e) => {
          const v = field.type === "number" ? Number(e.target.value) : e.target.value;
          onChange(v);
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          if (e.key === "Escape") setEditing(false);
        }}
        className="w-full rounded border border-sky-400 bg-white px-1.5 py-0.5 text-sm outline-none ring-2 ring-sky-100"
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="block w-full truncate rounded px-1.5 py-1 text-left text-sm hover:bg-stone-50"
    >
      {value === undefined || value === "" ? (
        <span className="text-muted-foreground/40">—</span>
      ) : (
        String(value)
      )}
    </button>
  );
}

// --------------------------- Kanban view ---------------------------

function KanbanView({ table, rows }: { table: TableDef; rows: Row[] }) {
  const statusField =
    table.fields.find((f) => f.type === "select" && f.name.toLowerCase() === "status") ??
    table.fields.find((f) => f.type === "select");

  if (!statusField) {
    return (
      <EmptyState
        title="No select field"
        message="Add a single-select field (e.g. Status) to use the Kanban view."
      />
    );
  }

  const groups = statusField.options ?? [];
  const titleField = table.fields[0];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {groups.map((g) => {
        const items = rows.filter((r) => r.cells[statusField.id] === g.value);
        return (
          <div
            key={g.value}
            className="w-72 shrink-0 rounded-xl bg-[hsl(220,33%,97%)] p-3 ring-1 ring-black/5"
          >
            <div className="mb-2 flex items-center justify-between">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                  g.color,
                )}
              >
                {g.value}
              </span>
              <span className="text-xs text-muted-foreground">{items.length}</span>
            </div>
            <div className="space-y-2">
              {items.map((r) => (
                <div
                  key={r.id}
                  className="rounded-lg border border-black/5 bg-white p-3 text-sm shadow-sm transition hover:shadow-md"
                >
                  <div className="font-medium">{String(r.cells[titleField.id] ?? "Untitled")}</div>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-muted-foreground">
                    {table.fields
                      .filter((f) => f.id !== titleField.id && f.id !== statusField.id)
                      .slice(0, 3)
                      .map((f) => (
                        <span
                          key={f.id}
                          className="rounded bg-stone-50 px-1.5 py-0.5 ring-1 ring-black/5"
                        >
                          {f.name}: {String(r.cells[f.id] ?? "—")}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
              <button className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-stone-50">
                <Plus className="h-3.5 w-3.5" /> Add card
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --------------------------- Calendar view ---------------------------

function CalendarView({ table, rows }: { table: TableDef; rows: Row[] }) {
  const dateField = table.fields.find((f) => f.type === "date");
  const titleField = table.fields[0];
  if (!dateField) {
    return (
      <EmptyState
        title="No date field"
        message="Add a date field to display records on a calendar."
      />
    );
  }

  // Build a current-month grid
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: startOffset }, () => null as number | null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const byDay = new Map<string, Row[]>();
  rows.forEach((r) => {
    const v = r.cells[dateField.id];
    if (typeof v === "string" && v) {
      const arr = byDay.get(v) ?? [];
      arr.push(r);
      byDay.set(v, arr);
    }
  });

  function key(d: number) {
    const m = String(month + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    return `${year}-${m}-${dd}`;
  }

  return (
    <div className="rounded-xl border border-black/5 p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium">
          {now.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </h3>
        <span className="text-xs text-muted-foreground">grouped by {dateField.name}</span>
      </div>
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-lg bg-black/5 text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="bg-[hsl(220,33%,98%)] px-2 py-1.5 text-xs font-medium text-muted-foreground"
          >
            {d}
          </div>
        ))}
        {cells.map((c, i) => (
          <div key={i} className="min-h-[88px] bg-white p-1.5">
            {c && (
              <>
                <div className="mb-1 text-xs text-muted-foreground">{c}</div>
                <div className="space-y-1">
                  {(byDay.get(key(c)) ?? []).map((r) => (
                    <div
                      key={r.id}
                      className="truncate rounded bg-sky-100 px-1.5 py-0.5 text-xs text-sky-900"
                    >
                      {String(r.cells[titleField.id] ?? "Untitled")}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --------------------------- Gallery view ---------------------------

function GalleryView({ table, rows }: { table: TableDef; rows: Row[] }) {
  const titleField = table.fields[0];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {rows.map((r) => (
        <div
          key={r.id}
          className="rounded-xl bg-[hsl(220,33%,98%)] p-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
        >
          <div className="mb-3 flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 via-violet-100 to-rose-100 text-2xl text-foreground/40">
            {table.icon}
          </div>
          <div className="text-sm font-medium">{String(r.cells[titleField.id] ?? "Untitled")}</div>
          <dl className="mt-2 space-y-1 text-xs text-muted-foreground">
            {table.fields.slice(1, 4).map((f) => (
              <div key={f.id} className="flex justify-between gap-2">
                <dt className="truncate">{f.name}</dt>
                <dd className="truncate text-foreground/80">{String(r.cells[f.id] ?? "—")}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-black/10 py-12 text-center">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[hsl(220,33%,97%)]">
        <X className="h-5 w-5 text-muted-foreground" />
      </div>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-1 text-xs text-muted-foreground">{message}</p>
    </div>
  );
}

// Avoid unused-import warning for icons exported but not yet wired
export const _unused = MoreHorizontal;
