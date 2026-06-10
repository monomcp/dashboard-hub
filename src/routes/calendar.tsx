import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Plus,
  Settings,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  CheckSquare,
  Lightbulb,
  MapPin,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppsMenu } from "@/components/apps-menu";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar" },
      { name: "description", content: "Plan your week and manage events with Calendar." },
      { property: "og:title", content: "Calendar" },
      { property: "og:description", content: "Plan your week and manage events." },
    ],
    links: [{ rel: "canonical", href: "/calendar" }],
  }),
  component: CalendarPage,
});

type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

type CalendarResponse = {
  id: string;
  name: string;
  calendar_type: "user" | "team" | "organization" | "module" | "holiday" | "external";
  color: string | null;
  is_primary: boolean;
  is_visible: boolean;
  is_readonly: boolean;
};

type CalendarEventResponse = {
  id: string;
  calendar_id: string;
  title: string;
  event_type:
    | "event"
    | "task_deadline"
    | "crm_meeting"
    | "crm_follow_up"
    | "cms_publish"
    | "smm_post"
    | "booking"
    | "reminder"
    | "holiday"
    | "availability_block"
    | "focus_time";
  status: "tentative" | "confirmed" | "cancelled" | "completed";
  starts_at: string;
  ends_at: string | null;
  is_all_day: boolean;
  color: string | null;
};

type CalendarView = "day" | "week" | "2weeks" | "month";
const VIEW_OPTIONS: { value: CalendarView; label: string }[] = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "2weeks", label: "2 weeks" },
];

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function fmt(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getMonthGrid(year: number, month: number) {
  // 6 weeks * 7 days starting from Sunday
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

function getWeekGrid(cursor: Date) {
  const start = new Date(cursor);
  start.setDate(start.getDate() - start.getDay());
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

function getTwoWeekGrid(cursor: Date) {
  const start = new Date(cursor);
  start.setDate(start.getDate() - start.getDay());
  const days: Date[] = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function formatHour(h: number) {
  if (h === 0) return "12 AM";
  if (h < 12) return `${h} AM`;
  if (h === 12) return "12 PM";
  return `${h - 12} PM`;
}

function CalendarPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [calendarView, setCalendarView] = useState<CalendarView>("month");
  const [cursor, setCursor] = useState(new Date());
  const [calendars, setCalendars] = useState<CalendarResponse[]>([]);
  const [checkedCalendars, setCheckedCalendars] = useState<Set<string>>(new Set());
  const [events, setEvents] = useState<CalendarEventResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [error, setError] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: fmt(new Date()), time: "09:00" });
  const today = new Date();

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const days = useMemo(() => getMonthGrid(year, month), [year, month]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEventResponse[]> = {};
    for (const event of events) {
      if (!checkedCalendars.has(event.calendar_id)) continue;
      const date = event.starts_at.slice(0, 10);
      (map[date] ||= []).push(event);
    }
    return map;
  }, [events, checkedCalendars]);

  const toggleCalendar = (id: string) => {
    setCheckedCalendars((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const myCalendars = calendars.filter((calendar) => calendar.calendar_type !== "holiday");
  const otherCalendars = calendars.filter((calendar) => calendar.calendar_type === "holiday");
  const writableCalendar =
    calendars.find((calendar) => calendar.is_primary && !calendar.is_readonly) ||
    calendars.find((calendar) => !calendar.is_readonly);

  const handleApiError = useCallback(
    (err: unknown, fallback = "Calendar request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  const loadCalendarData = useCallback(async () => {
    setLoading(true);
    setError("");
    const start = new Date(year, month, 1);
    start.setDate(1 - start.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 42);
    try {
      const [calendarPage, eventPage] = await Promise.all([
        apiRequest<Page<CalendarResponse>>(
          "/api/v1/calendar/calendars?sort=name&direction=asc&limit=200",
        ),
        apiRequest<Page<CalendarEventResponse>>(
          `/api/v1/calendar/events?starts_after=${encodeURIComponent(start.toISOString())}&starts_before=${encodeURIComponent(end.toISOString())}&limit=500`,
        ),
      ]);
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

  useEffect(() => {
    void loadCalendarData();
  }, [loadCalendarData]);

  function shiftMonth(delta: number) {
    setCursor(new Date(year, month + delta, 1));
  }

  function shiftView(delta: number) {
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

  const headerLabel = useMemo(() => {
    if (calendarView === "day") {
      return cursor.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
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

  async function submitCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.title.trim() || !writableCalendar) return;
    const startsAt = new Date(`${form.date}T${form.time || "09:00"}:00`);
    setMutating(true);
    setError("");
    try {
      await apiRequest<CalendarEventResponse>("/api/v1/calendar/events", {
        method: "POST",
        body: JSON.stringify({
          calendar_id: writableCalendar.id,
          title: form.title.trim(),
          starts_at: startsAt.toISOString(),
          ends_at: new Date(startsAt.getTime() + 60 * 60 * 1000).toISOString(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        }),
      });
      setCreateOpen(false);
      setForm({ title: "", date: fmt(cursor), time: "09:00" });
      await loadCalendarData();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      {/* Header — reused */}
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
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
            <div className="relative grid h-9 w-9 place-items-center rounded-md bg-white shadow-sm ring-1 ring-black/5">
              <CalendarDays className="h-5 w-5 text-sky-500" />
              <span className="absolute bottom-0.5 text-[9px] font-bold leading-none text-foreground">
                {today.getDate()}
              </span>
            </div>
            <span className="text-xl font-medium tracking-tight">Calendar</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2">
          <Button
            variant="outline"
            className="h-9 rounded-full border-black/10 bg-white px-5 text-sm font-medium"
            onClick={() => setCursor(new Date())}
          >
            Today
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => shiftView(-1)}
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => shiftView(1)}
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-xl font-normal tracking-tight">
            {headerLabel}
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 rounded-full border-black/10 bg-white px-4 text-sm font-medium">
                {VIEW_OPTIONS.find((v) => v.value === calendarView)?.label}
                <ChevronRight className="ml-1 h-3.5 w-3.5 rotate-90" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl p-1">
              {VIEW_OPTIONS.map((opt) => (
                <DropdownMenuItem
                  key={opt.value}
                  className={cn("rounded-lg", calendarView === opt.value && "font-semibold")}
                  onSelect={() => setCalendarView(opt.value)}
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
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

      <div className="flex">
        {/* Sidebar — reused layout */}
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg">
                    <Plus className="mr-1 h-5 w-5" /> Create
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 rounded-2xl p-1.5">
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      className="gap-3 rounded-lg py-2.5"
                      onSelect={(event) => event.preventDefault()}
                    >
                      <CalendarDays className="h-4 w-4" /> Event
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                    <CheckSquare className="h-4 w-4" /> Task
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                    <MapPin className="h-4 w-4" /> Appointment schedule
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create event</DialogTitle>
                </DialogHeader>
                <form className="space-y-3" onSubmit={submitCreate}>
                  <Input
                    autoFocus
                    value={form.title}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, title: event.target.value }))
                    }
                    placeholder="Title"
                  />
                  <div className="grid grid-cols-[1fr_120px] gap-3">
                    <Input
                      type="date"
                      value={form.date}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, date: event.target.value }))
                      }
                    />
                    <Input
                      type="time"
                      value={form.time}
                      onChange={(event) =>
                        setForm((current) => ({ ...current, time: event.target.value }))
                      }
                    />
                  </div>
                  <Button className="w-full" type="submit" disabled={mutating || !writableCalendar}>
                    {mutating ? "Creating..." : "Create"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            {/* Mini month */}
            <div className="mb-4 px-1">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">
                  {MONTH_NAMES[month]} {year}
                </span>
                <div className="flex">
                  <button
                    onClick={() => shiftMonth(-1)}
                    className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/60"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => shiftMonth(1)}
                    className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/60"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] text-muted-foreground">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
                {days.map((d) => {
                  const inMonth = d.getMonth() === month;
                  const isToday = fmt(d) === fmt(today);
                  return (
                    <div key={d.toISOString()} className="grid place-items-center">
                      <button
                        className={cn(
                          "grid h-6 w-6 place-items-center rounded-full text-[11px]",
                          !inMonth && "text-muted-foreground/40",
                          isToday && "bg-sky-500 text-white font-medium",
                          !isToday && "hover:bg-white/60",
                        )}
                      >
                        {d.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-3 pb-2 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              My calendars
            </div>
            <ul className="space-y-1">
              {myCalendars.map((c) => {
                const checked = checkedCalendars.has(c.id);
                const color = c.color || "#3b82f6";
                return (
                  <li
                    key={c.id}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-white/60"
                    onClick={() => toggleCalendar(c.id)}
                  >
                    <span
                      className="grid h-4 w-4 shrink-0 place-items-center rounded-sm border-2"
                      style={{
                        borderColor: color,
                        backgroundColor: checked ? color : "transparent",
                      }}
                    >
                      {checked && (
                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </span>
                    <span className="truncate">{c.name}</span>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between px-3 pb-2 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <span>Other calendars</span>
              <button
                className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/60"
                aria-label="Add"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <ul className="space-y-1">
              {otherCalendars.map((c) => {
                const checked = checkedCalendars.has(c.id);
                const color = c.color || "#22c55e";
                return (
                  <li
                    key={c.id}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-white/60"
                    onClick={() => toggleCalendar(c.id)}
                  >
                    <span
                      className="grid h-4 w-4 shrink-0 place-items-center rounded-sm border-2"
                      style={{
                        borderColor: color,
                        backgroundColor: checked ? color : "transparent",
                      }}
                    >
                      {checked && (
                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </span>
                    <span className="truncate">{c.name}</span>
                  </li>
                );
              })}
            </ul>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
          {error && (
            <Alert variant="destructive" className="mb-3">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {calendarView === "month" && (
            <MonthGrid days={days} month={month} today={today} eventsByDate={eventsByDate} loading={loading} />
          )}

          {calendarView === "week" && (
            <TimeGrid days={getWeekGrid(cursor)} today={today} eventsByDate={eventsByDate} loading={loading} />
          )}

          {calendarView === "2weeks" && (
            <TwoWeekGrid days={getTwoWeekGrid(cursor)} today={today} eventsByDate={eventsByDate} loading={loading} />
          )}

          {calendarView === "day" && (
            <DayGrid day={cursor} today={today} eventsByDate={eventsByDate} loading={loading} />
          )}
        </main>

        {/* Right rail */}
        <aside className="hidden w-12 shrink-0 flex-col items-center gap-3 py-4 lg:flex">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Keep">
            <Lightbulb className="h-5 w-5 text-amber-500" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Tasks">
            <CheckSquare className="h-5 w-5 text-sky-500" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Contacts">
            <User className="h-5 w-5 text-blue-500" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Maps">
            <MapPin className="h-5 w-5 text-emerald-500" />
          </Button>
        </aside>
      </div>
    </div>
  );
}

function EventChip({ event }: { event: CalendarEventResponse }) {
  return (
    <div
      className={cn(
        "truncate rounded px-2 py-0.5 text-[11px]",
        event.event_type === "holiday" && "bg-emerald-600 text-white",
        event.event_type !== "holiday" && "flex items-center gap-1 text-foreground/80",
      )}
      style={
        event.event_type === "holiday" && event.color ? { backgroundColor: event.color } : undefined
      }
    >
      {event.event_type !== "holiday" && (
        <span
          className="h-2 w-2 shrink-0 rounded-full border border-sky-500"
          style={{ borderColor: event.color || undefined }}
        />
      )}
      <span className="truncate">{event.title}</span>
    </div>
  );
}

function MonthGrid({
  days,
  month,
  today,
  eventsByDate,
  loading,
}: {
  days: Date[];
  month: number;
  today: Date;
  eventsByDate: Record<string, CalendarEventResponse[]>;
  loading: boolean;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="grid grid-cols-7 border-b border-black/5 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-2">{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-6">
        {days.map((d, idx) => {
          const inMonth = d.getMonth() === month;
          const isToday = fmt(d) === fmt(today);
          const evs = eventsByDate[fmt(d)] || [];
          const showMonth = d.getDate() === 1;
          return (
            <div
              key={idx}
              className={cn(
                "min-h-[120px] border-b border-r border-black/5 p-2",
                idx % 7 === 6 && "border-r-0",
                idx >= 35 && "border-b-0",
                !inMonth && "bg-[hsl(220,33%,99%)]",
              )}
            >
              <div className="mb-1 flex justify-center">
                <span
                  className={cn(
                    "grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs",
                    isToday && "bg-sky-500 font-medium text-white",
                    !isToday && !inMonth && "text-muted-foreground/50",
                    !isToday && inMonth && "text-foreground",
                  )}
                >
                  {showMonth ? `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}` : d.getDate()}
                </span>
              </div>
              <div className="space-y-1">
                {loading && idx === 0 && (
                  <div className="px-2 py-0.5 text-[11px] text-muted-foreground">Loading...</div>
                )}
                {evs.map((e) => <EventChip key={e.id} event={e} />)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TimeGrid({
  days,
  today,
  eventsByDate,
  loading,
}: {
  days: Date[];
  today: Date;
  eventsByDate: Record<string, CalendarEventResponse[]>;
  loading: boolean;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-black/5">
        <div />
        {days.map((d) => {
          const isToday = fmt(d) === fmt(today);
          return (
            <div key={d.toISOString()} className="py-2 text-center">
              <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {WEEKDAYS[d.getDay()]}
              </div>
              <span
                className={cn(
                  "mt-0.5 inline-grid h-7 w-7 place-items-center rounded-full text-sm",
                  isToday && "bg-sky-500 font-medium text-white",
                )}
              >
                {d.getDate()}
              </span>
            </div>
          );
        })}
      </div>
      {loading && (
        <div className="px-4 py-3 text-[11px] text-muted-foreground">Loading...</div>
      )}
      <div className="grid grid-cols-[60px_repeat(7,1fr)]">
        <div>
          {HOURS.map((h) => (
            <div key={h} className="flex h-14 items-start justify-end pr-2 text-[10px] text-muted-foreground">
              {h > 0 ? formatHour(h) : ""}
            </div>
          ))}
        </div>
        {days.map((d) => {
          const evs = eventsByDate[fmt(d)] || [];
          return (
            <div key={d.toISOString()} className="relative border-l border-black/5">
              {HOURS.map((h) => (
                <div key={h} className="h-14 border-b border-black/5" />
              ))}
              <div className="absolute inset-x-1 top-0">
                {evs.map((e) => {
                  const startH = new Date(e.starts_at).getHours();
                  const startM = new Date(e.starts_at).getMinutes();
                  const top = (startH + startM / 60) * 56;
                  const duration = e.ends_at
                    ? (new Date(e.ends_at).getTime() - new Date(e.starts_at).getTime()) / 3600000
                    : 1;
                  const height = Math.max(duration * 56, 20);
                  return (
                    <div
                      key={e.id}
                      className="absolute inset-x-0 truncate rounded px-1.5 py-0.5 text-[11px] font-medium text-white"
                      style={{
                        top: `${top}px`,
                        height: `${height}px`,
                        backgroundColor: e.color || "#3b82f6",
                      }}
                    >
                      {e.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TwoWeekGrid({
  days,
  today,
  eventsByDate,
  loading,
}: {
  days: Date[];
  today: Date;
  eventsByDate: Record<string, CalendarEventResponse[]>;
  loading: boolean;
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="grid grid-cols-7 border-b border-black/5 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-2">{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-2">
        {days.map((d, idx) => {
          const isToday = fmt(d) === fmt(today);
          const evs = eventsByDate[fmt(d)] || [];
          return (
            <div
              key={idx}
              className={cn(
                "min-h-[140px] border-b border-r border-black/5 p-2",
                idx % 7 === 6 && "border-r-0",
                idx >= 7 && "border-b-0",
              )}
            >
              <div className="mb-1 flex justify-center">
                <span
                  className={cn(
                    "grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs",
                    isToday && "bg-sky-500 font-medium text-white",
                    !isToday && "text-foreground",
                  )}
                >
                  {d.getDate() === 1 ? `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}` : d.getDate()}
                </span>
              </div>
              <div className="space-y-1">
                {loading && idx === 0 && (
                  <div className="px-2 py-0.5 text-[11px] text-muted-foreground">Loading...</div>
                )}
                {evs.map((e) => <EventChip key={e.id} event={e} />)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DayGrid({
  day,
  today,
  eventsByDate,
  loading,
}: {
  day: Date;
  today: Date;
  eventsByDate: Record<string, CalendarEventResponse[]>;
  loading: boolean;
}) {
  const isToday = fmt(day) === fmt(today);
  const evs = eventsByDate[fmt(day)] || [];

  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="border-b border-black/5 px-4 py-3 text-center">
        <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {WEEKDAYS[day.getDay()]}
        </div>
        <span
          className={cn(
            "mt-0.5 inline-grid h-10 w-10 place-items-center rounded-full text-lg",
            isToday && "bg-sky-500 font-medium text-white",
          )}
        >
          {day.getDate()}
        </span>
      </div>
      {loading && (
        <div className="px-4 py-3 text-[11px] text-muted-foreground">Loading...</div>
      )}
      <div className="grid grid-cols-[60px_1fr]">
        <div>
          {HOURS.map((h) => (
            <div key={h} className="flex h-14 items-start justify-end pr-2 text-[10px] text-muted-foreground">
              {h > 0 ? formatHour(h) : ""}
            </div>
          ))}
        </div>
        <div className="relative border-l border-black/5">
          {HOURS.map((h) => (
            <div key={h} className="h-14 border-b border-black/5" />
          ))}
          <div className="absolute inset-x-2 top-0">
            {evs.map((e) => {
              const startH = new Date(e.starts_at).getHours();
              const startM = new Date(e.starts_at).getMinutes();
              const top = (startH + startM / 60) * 56;
              const duration = e.ends_at
                ? (new Date(e.ends_at).getTime() - new Date(e.starts_at).getTime()) / 3600000
                : 1;
              const height = Math.max(duration * 56, 20);
              return (
                <div
                  key={e.id}
                  className="absolute inset-x-0 truncate rounded px-2 py-1 text-xs font-medium text-white"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: e.color || "#3b82f6",
                  }}
                >
                  {e.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
