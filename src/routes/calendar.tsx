import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppsMenu } from "@/components/apps-menu";
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

type Event = {
  date: string; // YYYY-MM-DD
  title: string;
  variant?: "holiday" | "event" | "task";
};

const EVENTS: Event[] = [
  { date: "2026-05-01", title: "Labor Day (Suspended)", variant: "holiday" },
  { date: "2026-05-07", title: "6pm GF🚀 Як IT-кс", variant: "event" },
  { date: "2026-05-07", title: "6pm Як IT-компан", variant: "task" },
  { date: "2026-05-08", title: "Victory Day (Suspe", variant: "holiday" },
  { date: "2026-05-09", title: "Europe Day", variant: "holiday" },
  { date: "2026-05-10", title: "Mother's Day", variant: "holiday" },
  { date: "2026-05-15", title: "Family Day", variant: "holiday" },
  { date: "2026-05-31", title: "Kyiv Day", variant: "holiday" },
  { date: "2026-05-31", title: "Orthodox Penteco", variant: "holiday" },
  { date: "2026-06-06", title: "Journalists' Day", variant: "holiday" },
];

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
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

function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cursor, setCursor] = useState(new Date(2026, 4, 1)); // May 2026
  const today = new Date(2026, 4, 1);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const days = useMemo(() => getMonthGrid(year, month), [year, month]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, Event[]> = {};
    for (const e of EVENTS) (map[e.date] ||= []).push(e);
    return map;
  }, []);

  const miniNav = [
    { label: "Cooper AI MicroSaas Farm", color: "bg-sky-500" },
    { label: "Birthdays", color: "bg-emerald-500" },
    { label: "Tasks", color: "bg-sky-500" },
  ];
  const otherCals = [{ label: "Holidays in Ukraine", color: "bg-emerald-500" }];

  function shiftMonth(delta: number) {
    setCursor(new Date(year, month + delta, 1));
  }

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      {/* Header — reused */}
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle menu" onClick={() => setSidebarOpen((s) => !s)}>
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="relative grid h-9 w-9 place-items-center rounded-md bg-white shadow-sm ring-1 ring-black/5">
              <CalendarDays className="h-5 w-5 text-sky-500" />
              <span className="absolute bottom-0.5 text-[9px] font-bold leading-none text-foreground">{today.getDate()}</span>
            </div>
            <span className="text-xl font-medium tracking-tight">Calendar</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center gap-2">
          <Button variant="outline" className="h-10 rounded-full border-black/10 bg-white px-5 text-sm font-medium" onClick={() => setCursor(new Date(2026, 4, 1))}>
            Today
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => shiftMonth(-1)} aria-label="Previous">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => shiftMonth(1)} aria-label="Next">
            <ChevronRight className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-xl font-normal tracking-tight">
            {MONTH_NAMES[month]} {year}
          </h1>
        </div>

        <div className="flex items-center gap-1">
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
          <div className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-stone-500 text-sm font-medium text-white">C</div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar — reused layout */}
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg">
                  <Plus className="mr-1 h-5 w-5" /> Create
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-2xl p-1.5">
                <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                  <CalendarDays className="h-4 w-4" /> Event
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                  <CheckSquare className="h-4 w-4" /> Task
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 rounded-lg py-2.5">
                  <MapPin className="h-4 w-4" /> Appointment schedule
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mini month */}
            <div className="mb-4 px-1">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{MONTH_NAMES[month]} {year}</span>
                <div className="flex">
                  <button onClick={() => shiftMonth(-1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/60" aria-label="Previous">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={() => shiftMonth(1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/60" aria-label="Next">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-y-1 text-center text-[11px] text-muted-foreground">
                {["S","M","T","W","T","F","S"].map((d, i) => <div key={i}>{d}</div>)}
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

            <div className="px-3 pb-2 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">My calendars</div>
            <ul className="space-y-1">
              {miniNav.map((c) => (
                <li key={c.label} className="flex items-center gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-white/60">
                  <span className={cn("h-3.5 w-3.5 rounded-sm", c.color)} />
                  <span className="truncate">{c.label}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between px-3 pb-2 pt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <span>Other calendars</span>
              <button className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/60" aria-label="Add"><Plus className="h-3.5 w-3.5" /></button>
            </div>
            <ul className="space-y-1">
              {otherCals.map((c) => (
                <li key={c.label} className="flex items-center gap-3 rounded-md px-3 py-1.5 text-sm hover:bg-white/60">
                  <span className={cn("h-3.5 w-3.5 rounded-sm", c.color)} />
                  <span className="truncate">{c.label}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main — month grid */}
        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
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
                      {evs.map((e, i) => (
                        <div
                          key={i}
                          className={cn(
                            "truncate rounded px-2 py-0.5 text-[11px]",
                            e.variant === "holiday" && "bg-emerald-600 text-white",
                            e.variant === "event" && "flex items-center gap-1 text-foreground/80",
                            e.variant === "task" && "flex items-center gap-1 text-foreground/80",
                          )}
                        >
                          {e.variant === "event" && <span className="h-2 w-2 shrink-0 rounded-full border border-sky-500" />}
                          {e.variant === "task" && <span className="h-2 w-2 shrink-0 rounded-full bg-sky-500" />}
                          <span className="truncate">{e.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>

        {/* Right rail */}
        <aside className="hidden w-12 shrink-0 flex-col items-center gap-3 py-4 lg:flex">
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Keep"><Lightbulb className="h-5 w-5 text-amber-500" /></Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Tasks"><CheckSquare className="h-5 w-5 text-sky-500" /></Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Contacts"><User className="h-5 w-5 text-blue-500" /></Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Maps"><MapPin className="h-5 w-5 text-emerald-500" /></Button>
        </aside>
      </div>
    </div>
  );
}
