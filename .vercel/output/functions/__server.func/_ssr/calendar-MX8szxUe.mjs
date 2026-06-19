import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CypSg8M2.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-DmTKMmfc.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-DSoi5KdC.mjs";
import { A as ApiError, c as clearAuthTokens, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { M as Menu, as as CalendarDays, at as ChevronLeft, Y as ChevronRight, l as Search, d as CircleQuestionMark, e as Settings, P as Plus, au as SquareCheckBig, av as MapPin } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
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
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./popover-ColJhc-i.mjs";
import "../_libs/radix-ui__react-popover.mjs";
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = reactExports.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props }));
Alert.displayName = "Alert";
const AlertTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h5",
    {
      ref,
      className: cn("mb-1 font-medium leading-none tracking-tight", className),
      ...props
    }
  )
);
AlertTitle.displayName = "AlertTitle";
const AlertDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props }));
AlertDescription.displayName = "AlertDescription";
const VIEW_OPTIONS = [{
  value: "day",
  label: "Day"
}, {
  value: "week",
  label: "Week"
}, {
  value: "month",
  label: "Month"
}, {
  value: "2weeks",
  label: "2 weeks"
}];
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function fmt(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function getMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  const days = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}
function getWeekGrid(cursor) {
  const start = new Date(cursor);
  start.setDate(start.getDate() - start.getDay());
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}
function getTwoWeekGrid(cursor) {
  const start = new Date(cursor);
  start.setDate(start.getDate() - start.getDay());
  const days = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}
const HOURS = Array.from({
  length: 24
}, (_, i) => i);
function formatHour(h) {
  if (h === 0) return "12 AM";
  if (h < 12) return `${h} AM`;
  if (h === 12) return "12 PM";
  return `${h - 12} PM`;
}
function CalendarPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [calendarView, setCalendarView] = reactExports.useState("month");
  const [cursor, setCursor] = reactExports.useState(/* @__PURE__ */ new Date());
  const [calendars, setCalendars] = reactExports.useState([]);
  const [checkedCalendars, setCheckedCalendars] = reactExports.useState(/* @__PURE__ */ new Set());
  const [events, setEvents] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [mutating, setMutating] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    date: fmt(/* @__PURE__ */ new Date()),
    time: "09:00"
  });
  const today = /* @__PURE__ */ new Date();
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const days = reactExports.useMemo(() => getMonthGrid(year, month), [year, month]);
  const eventsByDate = reactExports.useMemo(() => {
    const map = {};
    for (const event of events) {
      if (!checkedCalendars.has(event.calendar_id)) continue;
      const date = event.starts_at.slice(0, 10);
      (map[date] ||= []).push(event);
    }
    return map;
  }, [events, checkedCalendars]);
  const toggleCalendar = (id) => {
    setCheckedCalendars((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const myCalendars = calendars.filter((calendar) => calendar.calendar_type !== "holiday");
  const otherCalendars = calendars.filter((calendar) => calendar.calendar_type === "holiday");
  const writableCalendar = calendars.find((calendar) => calendar.is_primary && !calendar.is_readonly) || calendars.find((calendar) => !calendar.is_readonly);
  const handleApiError = reactExports.useCallback((err, fallback = "Calendar request failed") => {
    if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
      clearAuthTokens();
      void navigate({
        to: "/login",
        replace: true
      });
      return;
    }
    setError(err instanceof Error ? err.message : fallback);
  }, [navigate]);
  const loadCalendarData = reactExports.useCallback(async () => {
    setLoading(true);
    setError("");
    const start = new Date(year, month, 1);
    start.setDate(1 - start.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 42);
    try {
      const [calendarPage, eventPage] = await Promise.all([apiRequest("/api/v1/calendar/calendars?sort=name&direction=asc&limit=200"), apiRequest(`/api/v1/calendar/events?starts_after=${encodeURIComponent(start.toISOString())}&starts_before=${encodeURIComponent(end.toISOString())}&limit=500`)]);
      setCalendars(calendarPage.items);
      setCheckedCalendars((prev) => {
        if (prev.size > 0) return prev;
        return new Set(calendarPage.items.filter((c) => c.is_visible).map((c) => c.id));
      });
      setEvents(eventPage.items);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError, month, year]);
  reactExports.useEffect(() => {
    void loadCalendarData();
  }, [loadCalendarData]);
  function shiftMonth(delta) {
    setCursor(new Date(year, month + delta, 1));
  }
  function shiftView(delta) {
    setCursor((prev) => {
      const d = new Date(prev);
      if (calendarView === "month") {
        d.setMonth(d.getMonth() + delta);
      } else if (calendarView === "week") {
        d.setDate(d.getDate() + 7 * delta);
      } else if (calendarView === "2weeks") {
        d.setDate(d.getDate() + 14 * delta);
      } else {
        d.setDate(d.getDate() + delta);
      }
      return d;
    });
  }
  const headerLabel = reactExports.useMemo(() => {
    if (calendarView === "day") {
      return cursor.toLocaleDateString("en", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    }
    if (calendarView === "week") {
      const weekDays = getWeekGrid(cursor);
      const first = weekDays[0];
      const last = weekDays[6];
      if (first.getMonth() === last.getMonth()) {
        return `${MONTH_NAMES[first.getMonth()]} ${first.getDate()}–${last.getDate()}, ${first.getFullYear()}`;
      }
      return `${MONTH_NAMES[first.getMonth()].slice(0, 3)} ${first.getDate()} – ${MONTH_NAMES[last.getMonth()].slice(0, 3)} ${last.getDate()}, ${last.getFullYear()}`;
    }
    if (calendarView === "2weeks") {
      const weekDays = getTwoWeekGrid(cursor);
      const first = weekDays[0];
      const last = weekDays[13];
      return `${MONTH_NAMES[first.getMonth()].slice(0, 3)} ${first.getDate()} – ${MONTH_NAMES[last.getMonth()].slice(0, 3)} ${last.getDate()}, ${last.getFullYear()}`;
    }
    return `${MONTH_NAMES[month]} ${year}`;
  }, [calendarView, cursor, month, year]);
  async function submitCreate(event) {
    event.preventDefault();
    if (!form.title.trim() || !writableCalendar) return;
    const startsAt = /* @__PURE__ */ new Date(`${form.date}T${form.time || "09:00"}:00`);
    setMutating(true);
    setError("");
    try {
      await apiRequest("/api/v1/calendar/events", {
        method: "POST",
        body: JSON.stringify({
          calendar_id: writableCalendar.id,
          title: form.title.trim(),
          starts_at: startsAt.toISOString(),
          ends_at: new Date(startsAt.getTime() + 60 * 60 * 1e3).toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
        })
      });
      setCreateOpen(false);
      setForm({
        title: "",
        date: fmt(cursor),
        time: "09:00"
      });
      await loadCalendarData();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-9 w-9 place-items-center rounded-md bg-white shadow-sm ring-1 ring-black/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-5 w-5 text-sky-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-0.5 text-[9px] font-bold leading-none text-foreground", children: today.getDate() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Calendar" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "h-9 rounded-full border-black/10 bg-white px-5 text-sm font-medium", onClick: () => setCursor(/* @__PURE__ */ new Date()), children: "Today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", onClick: () => shiftView(-1), "aria-label": "Previous", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", onClick: () => shiftView(1), "aria-label": "Next", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "ml-2 text-xl font-normal tracking-tight", children: headerLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "h-9 rounded-full border-black/10 bg-white px-4 text-sm font-medium", children: [
            VIEW_OPTIONS.find((v) => v.value === calendarView)?.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-1 h-3.5 w-3.5 rotate-90" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", className: "w-40 rounded-xl p-1", children: VIEW_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { className: cn("rounded-lg", calendarView === opt.value && "font-semibold"), onSelect: () => setCalendarView(opt.value), children: opt.label }, opt.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Search", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-[260px] shrink-0 px-3 md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-5 w-5" }),
              " Create"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "start", className: "w-56 rounded-2xl p-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", onSelect: (event) => event.preventDefault(), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4" }),
                " Event"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "h-4 w-4" }),
                " Task"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-3 rounded-lg py-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
                " Appointment schedule"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create event" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: submitCreate, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: form.title, onChange: (event) => setForm((current) => ({
                ...current,
                title: event.target.value
              })), placeholder: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_120px] gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.date, onChange: (event) => setForm((current) => ({
                  ...current,
                  date: event.target.value
                })) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: form.time, onChange: (event) => setForm((current) => ({
                  ...current,
                  time: event.target.value
                })) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", type: "submit", disabled: mutating || !writableCalendar, children: mutating ? "Creating..." : "Create" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
              MONTH_NAMES[month],
              " ",
              year
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => shiftMonth(-1), className: "grid h-7 w-7 place-items-center rounded-full hover:bg-white/60", "aria-label": "Previous", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => shiftMonth(1), className: "grid h-7 w-7 place-items-center rounded-full hover:bg-white/60", "aria-label": "Next", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-y-1 text-center text-[11px] text-muted-foreground", children: [
            ["S", "M", "T", "W", "T", "F", "S"].map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: d }, i)),
            days.map((d) => {
              const inMonth = d.getMonth() === month;
              const isToday = fmt(d) === fmt(today);
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: cn("grid h-6 w-6 place-items-center rounded-full text-[11px]", !inMonth && "text-muted-foreground/40", isToday && "bg-sky-500 text-white font-medium", !isToday && "hover:bg-white/60"), children: d.getDate() }) }, d.toISOString());
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "My calendars" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: myCalendars.map((c) => {
          const checked = checkedCalendars.has(c.id);
          const color = c.color || "#3b82f6";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex cursor-pointer items-center gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-white/60", onClick: () => toggleCalendar(c.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-4 w-4 shrink-0 place-items-center rounded-sm border-2", style: {
              borderColor: color,
              backgroundColor: checked ? color : "transparent"
            }, children: checked && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 12 12", className: "h-2.5 w-2.5 text-white", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 6l3 3 5-5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.name })
          ] }, c.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 pb-2 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Other calendars" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "grid h-6 w-6 place-items-center rounded-full hover:bg-white/60", "aria-label": "Add", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: otherCalendars.map((c) => {
          const checked = checkedCalendars.has(c.id);
          const color = c.color || "#22c55e";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex cursor-pointer items-center gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-white/60", onClick: () => toggleCalendar(c.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-4 w-4 shrink-0 place-items-center rounded-sm border-2", style: {
              borderColor: color,
              backgroundColor: checked ? color : "transparent"
            }, children: checked && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 12 12", className: "h-2.5 w-2.5 text-white", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 6l3 3 5-5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.name })
          ] }, c.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: cn("min-w-0 flex-1 px-4 pb-16 md:pr-6", sidebarOpen ? "md:pl-0" : "md:pl-6"), children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error }) }),
        calendarView === "month" && /* @__PURE__ */ jsxRuntimeExports.jsx(MonthGrid, { days, month, today, eventsByDate, loading }),
        calendarView === "week" && /* @__PURE__ */ jsxRuntimeExports.jsx(TimeGrid, { days: getWeekGrid(cursor), today, eventsByDate, loading }),
        calendarView === "2weeks" && /* @__PURE__ */ jsxRuntimeExports.jsx(TwoWeekGrid, { days: getTwoWeekGrid(cursor), today, eventsByDate, loading }),
        calendarView === "day" && /* @__PURE__ */ jsxRuntimeExports.jsx(DayGrid, { day: cursor, today, eventsByDate, loading })
      ] })
    ] })
  ] });
}
function EventChip({
  event
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("truncate rounded px-2 py-0.5 text-[11px]", event.event_type === "holiday" && "bg-emerald-600 text-white", event.event_type !== "holiday" && "flex items-center gap-1 text-foreground/80"), style: event.event_type === "holiday" && event.color ? {
    backgroundColor: event.color
  } : void 0, children: [
    event.event_type !== "holiday" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 shrink-0 rounded-full border border-sky-500", style: {
      borderColor: event.color || void 0
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: event.title })
  ] });
}
function MonthGrid({
  days,
  month,
  today,
  eventsByDate,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 border-b border-black/5 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: WEEKDAYS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: w }, w)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 grid-rows-6", children: days.map((d, idx) => {
      const inMonth = d.getMonth() === month;
      const isToday = fmt(d) === fmt(today);
      const evs = eventsByDate[fmt(d)] || [];
      const showMonth = d.getDate() === 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("min-h-[120px] border-b border-r border-black/5 p-2", idx % 7 === 6 && "border-r-0", idx >= 35 && "border-b-0", !inMonth && "bg-[hsl(220,33%,99%)]"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs", isToday && "bg-sky-500 font-medium text-white", !isToday && !inMonth && "text-muted-foreground/50", !isToday && inMonth && "text-foreground"), children: showMonth ? `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}` : d.getDate() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          loading && idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-0.5 text-[11px] text-muted-foreground", children: "Loading..." }),
          evs.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventChip, { event: e }, e.id))
        ] })
      ] }, idx);
    }) })
  ] });
}
function TimeGrid({
  days,
  today,
  eventsByDate,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[60px_repeat(7,1fr)] border-b border-black/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
      days.map((d) => {
        const isToday = fmt(d) === fmt(today);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: WEEKDAYS[d.getDay()] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("mt-0.5 inline-grid h-7 w-7 place-items-center rounded-full text-sm", isToday && "bg-sky-500 font-medium text-white"), children: d.getDate() })
        ] }, d.toISOString());
      })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 text-[11px] text-muted-foreground", children: "Loading..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[60px_repeat(7,1fr)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: HOURS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 items-start justify-end pr-2 text-[10px] text-muted-foreground", children: h > 0 ? formatHour(h) : "" }, h)) }),
      days.map((d) => {
        const evs = eventsByDate[fmt(d)] || [];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative border-l border-black/5", children: [
          HOURS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 border-b border-black/5" }, h)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-1 top-0", children: evs.map((e) => {
            const startH = new Date(e.starts_at).getHours();
            const startM = new Date(e.starts_at).getMinutes();
            const top = (startH + startM / 60) * 56;
            const duration = e.ends_at ? (new Date(e.ends_at).getTime() - new Date(e.starts_at).getTime()) / 36e5 : 1;
            const height = Math.max(duration * 56, 20);
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 truncate rounded px-1.5 py-0.5 text-[11px] font-medium text-white", style: {
              top: `${top}px`,
              height: `${height}px`,
              backgroundColor: e.color || "#3b82f6"
            }, children: e.title }, e.id);
          }) })
        ] }, d.toISOString());
      })
    ] })
  ] });
}
function TwoWeekGrid({
  days,
  today,
  eventsByDate,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 border-b border-black/5 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: WEEKDAYS.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2", children: w }, w)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 grid-rows-2", children: days.map((d, idx) => {
      const isToday = fmt(d) === fmt(today);
      const evs = eventsByDate[fmt(d)] || [];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("min-h-[140px] border-b border-r border-black/5 p-2", idx % 7 === 6 && "border-r-0", idx >= 7 && "border-b-0"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs", isToday && "bg-sky-500 font-medium text-white", !isToday && "text-foreground"), children: d.getDate() === 1 ? `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}` : d.getDate() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          loading && idx === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-0.5 text-[11px] text-muted-foreground", children: "Loading..." }),
          evs.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(EventChip, { event: e }, e.id))
        ] })
      ] }, idx);
    }) })
  ] });
}
function DayGrid({
  day,
  today,
  eventsByDate,
  loading
}) {
  const isToday = fmt(day) === fmt(today);
  const evs = eventsByDate[fmt(day)] || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-black/5 px-4 py-3 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium uppercase tracking-wide text-muted-foreground", children: WEEKDAYS[day.getDay()] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("mt-0.5 inline-grid h-10 w-10 place-items-center rounded-full text-lg", isToday && "bg-sky-500 font-medium text-white"), children: day.getDate() })
    ] }),
    loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 text-[11px] text-muted-foreground", children: "Loading..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[60px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: HOURS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 items-start justify-end pr-2 text-[10px] text-muted-foreground", children: h > 0 ? formatHour(h) : "" }, h)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative border-l border-black/5", children: [
        HOURS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 border-b border-black/5" }, h)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-2 top-0", children: evs.map((e) => {
          const startH = new Date(e.starts_at).getHours();
          const startM = new Date(e.starts_at).getMinutes();
          const top = (startH + startM / 60) * 56;
          const duration = e.ends_at ? (new Date(e.ends_at).getTime() - new Date(e.starts_at).getTime()) / 36e5 : 1;
          const height = Math.max(duration * 56, 20);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 truncate rounded px-2 py-1 text-xs font-medium text-white", style: {
            top: `${top}px`,
            height: `${height}px`,
            backgroundColor: e.color || "#3b82f6"
          }, children: e.title }, e.id);
        }) })
      ] })
    ] })
  ] });
}
export {
  CalendarPage as component
};
