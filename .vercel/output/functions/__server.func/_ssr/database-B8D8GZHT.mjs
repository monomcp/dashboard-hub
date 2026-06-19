import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { A as AlertDialog, h as AlertDialogTrigger, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DteJ2TLP.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-DSoi5KdC.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { M as Menu, a4 as Database, l as Search, d as CircleQuestionMark, e as Settings, P as Plus, x as Star, a5 as EyeOff, a6 as Funnel, a7 as LayoutGrid, a8 as ArrowDownUp, a9 as Share2, T as Trash2, b as Check } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./popover-ColJhc-i.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "./api-client-CDT_AGSo.mjs";
import "../_libs/tailwind-merge.mjs";
const STATUS_COLORS = [{
  value: "Todo",
  color: "bg-stone-200 text-stone-800"
}, {
  value: "In progress",
  color: "bg-amber-100 text-amber-800"
}, {
  value: "Review",
  color: "bg-violet-100 text-violet-800"
}, {
  value: "Done",
  color: "bg-emerald-100 text-emerald-800"
}];
const PRIORITY_COLORS = [{
  value: "Low",
  color: "bg-sky-100 text-sky-800"
}, {
  value: "Medium",
  color: "bg-amber-100 text-amber-800"
}, {
  value: "High",
  color: "bg-rose-100 text-rose-800"
}];
const INITIAL_BASES = [{
  id: "b1",
  name: "Product roadmap",
  color: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
  tables: [{
    id: "t1",
    name: "Features",
    icon: "✦",
    fields: [{
      id: "f1",
      name: "Name",
      type: "text"
    }, {
      id: "f2",
      name: "Status",
      type: "select",
      options: STATUS_COLORS
    }, {
      id: "f3",
      name: "Priority",
      type: "select",
      options: PRIORITY_COLORS
    }, {
      id: "f4",
      name: "Owner",
      type: "text"
    }, {
      id: "f5",
      name: "Estimate",
      type: "number"
    }, {
      id: "f6",
      name: "Shipped",
      type: "checkbox"
    }, {
      id: "f7",
      name: "Due",
      type: "date"
    }],
    rows: [{
      id: "r1",
      cells: {
        f1: "Multi-base sync",
        f2: "In progress",
        f3: "High",
        f4: "Alice",
        f5: 8,
        f6: false,
        f7: "2026-07-02"
      }
    }, {
      id: "r2",
      cells: {
        f1: "Kanban grouping",
        f2: "Review",
        f3: "Medium",
        f4: "Ben",
        f5: 5,
        f6: false,
        f7: "2026-06-24"
      }
    }, {
      id: "r3",
      cells: {
        f1: "CSV importer v2",
        f2: "Done",
        f3: "Medium",
        f4: "Casey",
        f5: 3,
        f6: true,
        f7: "2026-05-30"
      }
    }, {
      id: "r4",
      cells: {
        f1: "Realtime presence",
        f2: "Todo",
        f3: "Low",
        f4: "Dani",
        f5: 13,
        f6: false,
        f7: "2026-08-15"
      }
    }, {
      id: "r5",
      cells: {
        f1: "Formula fields",
        f2: "In progress",
        f3: "High",
        f4: "Eli",
        f5: 8,
        f6: false,
        f7: "2026-07-18"
      }
    }]
  }, {
    id: "t2",
    name: "Sprints",
    icon: "⌖",
    fields: [{
      id: "f1",
      name: "Name",
      type: "text"
    }, {
      id: "f2",
      name: "Status",
      type: "select",
      options: STATUS_COLORS
    }, {
      id: "f3",
      name: "Start",
      type: "date"
    }, {
      id: "f4",
      name: "End",
      type: "date"
    }],
    rows: [{
      id: "r1",
      cells: {
        f1: "Sprint 24",
        f2: "Done",
        f3: "2026-05-01",
        f4: "2026-05-14"
      }
    }, {
      id: "r2",
      cells: {
        f1: "Sprint 25",
        f2: "In progress",
        f3: "2026-05-15",
        f4: "2026-05-28"
      }
    }, {
      id: "r3",
      cells: {
        f1: "Sprint 26",
        f2: "Todo",
        f3: "2026-05-29",
        f4: "2026-06-11"
      }
    }]
  }]
}, {
  id: "b2",
  name: "Content calendar",
  color: "bg-gradient-to-br from-amber-400 to-rose-500",
  tables: [{
    id: "t1",
    name: "Posts",
    icon: "✎",
    fields: [{
      id: "f1",
      name: "Title",
      type: "text"
    }, {
      id: "f2",
      name: "Status",
      type: "select",
      options: STATUS_COLORS
    }, {
      id: "f3",
      name: "Author",
      type: "text"
    }, {
      id: "f4",
      name: "Publish",
      type: "date"
    }, {
      id: "f5",
      name: "Featured",
      type: "checkbox"
    }],
    rows: [{
      id: "r1",
      cells: {
        f1: "Why we built Database",
        f2: "Done",
        f3: "Alice",
        f4: "2026-06-01",
        f5: true
      }
    }, {
      id: "r2",
      cells: {
        f1: "Spring product update",
        f2: "Review",
        f3: "Ben",
        f4: "2026-06-15",
        f5: false
      }
    }]
  }]
}, {
  id: "b3",
  name: "Customers",
  color: "bg-gradient-to-br from-sky-400 to-blue-600",
  tables: [{
    id: "t1",
    name: "Accounts",
    icon: "◎",
    fields: [{
      id: "f1",
      name: "Company",
      type: "text"
    }, {
      id: "f2",
      name: "Plan",
      type: "select",
      options: PRIORITY_COLORS
    }, {
      id: "f3",
      name: "MRR",
      type: "number"
    }, {
      id: "f4",
      name: "Active",
      type: "checkbox"
    }],
    rows: [{
      id: "r1",
      cells: {
        f1: "Acme Inc.",
        f2: "High",
        f3: 1200,
        f4: true
      }
    }, {
      id: "r2",
      cells: {
        f1: "Globex",
        f2: "Medium",
        f3: 480,
        f4: true
      }
    }, {
      id: "r3",
      cells: {
        f1: "Initech",
        f2: "Low",
        f3: 99,
        f4: false
      }
    }]
  }]
}];
function DatabasePage() {
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const [bases, setBases] = reactExports.useState(INITIAL_BASES);
  const [activeBaseId, setActiveBaseId] = reactExports.useState(INITIAL_BASES[0].id);
  const [activeTableId, setActiveTableId] = reactExports.useState(INITIAL_BASES[0].tables[0].id);
  const activeBase = bases.find((b) => b.id === activeBaseId);
  const activeTable = activeBase.tables.find((t) => t.id === activeTableId) ?? activeBase.tables[0];
  const filteredRows = reactExports.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return activeTable.rows;
    return activeTable.rows.filter((r) => Object.values(r.cells).some((v) => String(v).toLowerCase().includes(q)));
  }, [search, activeTable.rows]);
  function mutateTable(fn) {
    setBases((prev) => prev.map((b) => b.id !== activeBaseId ? b : {
      ...b,
      tables: b.tables.map((t) => t.id === activeTable.id ? fn(t) : t)
    }));
  }
  function updateCell(rowId, fieldId, value) {
    mutateTable((t) => ({
      ...t,
      rows: t.rows.map((r) => r.id === rowId ? {
        ...r,
        cells: {
          ...r.cells,
          [fieldId]: value
        }
      } : r)
    }));
  }
  function addRow() {
    const newRow = {
      id: `r${Date.now()}`,
      cells: {}
    };
    mutateTable((t) => ({
      ...t,
      rows: [...t.rows, newRow]
    }));
  }
  function deleteRow(rowId) {
    mutateTable((t) => ({
      ...t,
      rows: t.rows.filter((r) => r.id !== rowId)
    }));
  }
  function addField() {
    const name = prompt("Field name");
    if (!name) return;
    const id = `f${Date.now()}`;
    mutateTable((t) => ({
      ...t,
      fields: [...t.fields, {
        id,
        name,
        type: "text"
      }]
    }));
  }
  function addBase() {
    const name = prompt("Base name");
    if (!name) return;
    const id = `b${Date.now()}`;
    const colors = ["bg-gradient-to-br from-emerald-400 to-sky-500", "bg-gradient-to-br from-pink-500 to-orange-400", "bg-gradient-to-br from-indigo-500 to-violet-600"];
    const newBase = {
      id,
      name,
      color: colors[bases.length % colors.length],
      tables: [{
        id: "t1",
        name: "Table 1",
        icon: "▦",
        fields: [{
          id: "f1",
          name: "Name",
          type: "text"
        }],
        rows: []
      }]
    };
    setBases((prev) => [...prev, newBase]);
    setActiveBaseId(id);
    setActiveTableId("t1");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-blue-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-medium tracking-tight", children: "Database" }) })
        ] })
      ] }),
      searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden min-w-0 max-w-2xl flex-1 md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-9 w-full items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Search this table", className: "h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-4 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Search", onClick: () => setSearchOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-[260px] shrink-0 px-3 md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: addBase, className: "mb-4 h-14 w-[160px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-5 w-5" }),
          " New base"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tables" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addBase, className: "grid h-6 w-6 cursor-pointer place-items-center rounded-full hover:bg-white/60", "aria-label": "Add base", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: bases.map((b) => {
          const baseActive = activeBaseId === b.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setActiveBaseId(b.id);
            setActiveTableId(b.tables[0].id);
          }, className: cn("flex w-full cursor-pointer items-center rounded-full px-3 py-2 text-sm transition", baseActive ? "bg-sky-100 font-medium text-sky-900" : "text-foreground/80 hover:bg-white/60"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-left", children: b.name }) }, b.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-2xl bg-white/70 p-3 ring-1 ring-black/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-medium text-foreground/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 text-amber-500" }),
            " Templates"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Start from a project tracker, CRM, content calendar and more." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-2 text-xs font-medium text-sky-700 hover:underline", children: "Browse templates →" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex flex-wrap items-center gap-1 px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { icon: EyeOff, label: "Hide fields" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { icon: Funnel, label: "Filter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { icon: LayoutGrid, label: "Group" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { icon: ArrowDownUp, label: "Sort" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarBtn, { icon: Share2, label: "Share view" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            filteredRows.length,
            " of ",
            activeTable.rows.length,
            " records"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(GridView, { table: activeTable, rows: filteredRows, onUpdate: updateCell, onDeleteRow: deleteRow, onAddRow: addRow, onAddField: addField }) })
      ] }) })
    ] })
  ] });
}
function ToolbarBtn({
  icon: Icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-foreground/80 transition hover:bg-stone-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-muted-foreground" }),
    label
  ] });
}
function GridView({
  table,
  rows,
  onUpdate,
  onDeleteRow,
  onAddRow,
  onAddField
}) {
  const titleField = table.fields[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-black/5 bg-[hsl(220,33%,95%)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-[hsl(220,33%,95%)] text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "sticky left-0 z-10 w-10 border-b border-r border-black/5 bg-[hsl(220,33%,95%)] px-2 py-2 text-xs font-medium text-muted-foreground", children: "#" }),
      table.fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "min-w-[160px] border-b border-r border-black/5 px-3 py-2 text-xs font-medium text-foreground/80", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: f.name }) }, f.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-12 border-b border-black/5 px-2 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onAddField, className: "grid h-6 w-6 place-items-center rounded text-muted-foreground hover:bg-sky-50 hover:text-sky-700", "aria-label": "Add field", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "bg-white", children: [
      rows.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "group bg-white hover:bg-sky-50/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "sticky left-0 z-10 w-10 border-b border-r border-black/5 bg-white px-2 py-1.5 text-xs text-muted-foreground group-hover:bg-sky-50/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "group-hover:hidden", children: idx + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "hidden text-rose-500 group-hover:inline", "aria-label": "Delete row", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "rounded-2xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Are you sure?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                  "Delete “",
                  String(r.cells[titleField.id] ?? "this record"),
                  "”? This action cannot be undone."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "rounded-full", children: "No" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => onDeleteRow(r.id), className: "rounded-full bg-rose-600 text-white hover:bg-rose-700", children: "Yes" })
              ] })
            ] })
          ] })
        ] }) }),
        table.fields.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-b border-r border-black/5 bg-white px-2 py-1 align-middle group-hover:bg-sky-50/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { field: f, value: r.cells[f.id], onChange: (v) => onUpdate(r.id, f.id, v) }) }, f.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border-b border-black/5" })
      ] }, r.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: table.fields.length + 2, className: "px-2 py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onAddRow, className: "inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-muted-foreground hover:bg-sky-50 hover:text-sky-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
        " Add record"
      ] }) }) })
    ] })
  ] }) }) });
}
function Cell({
  field,
  value,
  onChange
}) {
  const [editing, setEditing] = reactExports.useState(false);
  if (field.type === "checkbox") {
    const v = Boolean(value);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onChange(!v), className: cn("grid h-5 w-5 place-items-center rounded border transition", v ? "border-emerald-500 bg-emerald-500 text-white" : "border-stone-300 bg-white"), "aria-label": "Toggle", children: v ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : null });
  }
  if (field.type === "select") {
    const opt = field.options?.find((o) => o.value === value);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: value ?? "", onChange: (e) => onChange(e.target.value), className: "absolute inset-0 cursor-pointer opacity-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "—" }),
        field.options?.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.value }, o.value))
      ] }),
      opt ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", opt.color), children: opt.value }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" })
    ] });
  }
  if (editing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, type: field.type === "number" ? "number" : field.type === "date" ? "date" : "text", defaultValue: value === void 0 ? "" : String(value), onBlur: (e) => {
      const v = field.type === "number" ? Number(e.target.value) : e.target.value;
      onChange(v);
      setEditing(false);
    }, onKeyDown: (e) => {
      if (e.key === "Enter") e.target.blur();
      if (e.key === "Escape") setEditing(false);
    }, className: "w-full rounded border border-sky-400 bg-white px-1.5 py-0.5 text-sm outline-none ring-2 ring-sky-100" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditing(true), className: "block w-full truncate rounded px-1.5 py-1 text-left text-sm hover:bg-stone-50", children: value === void 0 || value === "" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40", children: "—" }) : String(value) });
}
export {
  DatabasePage as component
};
