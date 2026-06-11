import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CalendarEvent = {
  id: string;
  /** ISO date or datetime; only the date part is used for placement. */
  date: string;
  title: string;
  /** Tailwind classes for the chip (e.g. bg + text color). */
  colorClass?: string;
};

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

type Props = {
  events: CalendarEvent[];
  onSelect: (id: string) => void;
  loading?: boolean;
};

export function CalendarMonthView({ events, onSelect, loading }: Props) {
  const [cursor, setCursor] = useState(new Date());
  const today = new Date();
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const days = useMemo(() => getMonthGrid(year, month), [year, month]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const event of events) {
      if (!event.date) continue;
      const key = event.date.slice(0, 10);
      (map[key] ||= []).push(event);
    }
    return map;
  }, [events]);

  const shiftMonth = (delta: number) => setCursor(new Date(year, month + delta, 1));

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
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
          onClick={() => shiftMonth(-1)}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => shiftMonth(1)}
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        <h2 className="ml-1 text-lg font-normal tracking-tight">
          {MONTH_NAMES[month]} {year}
        </h2>
      </div>

      <section className="overflow-hidden rounded-2xl ring-1 ring-black/5">
        <div className="grid grid-cols-7 border-b border-black/5 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {WEEKDAYS.map((w) => (
            <div key={w} className="py-2">
              {w}
            </div>
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
                  "min-h-[110px] border-b border-r border-black/5 p-2",
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
                  {evs.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => onSelect(e.id)}
                      title={e.title}
                      className={cn(
                        "block w-full truncate rounded px-2 py-0.5 text-left text-[11px] font-medium transition hover:opacity-80",
                        e.colorClass || "bg-slate-100 text-slate-700",
                      )}
                    >
                      {e.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
