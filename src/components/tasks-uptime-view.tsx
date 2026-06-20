import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";

type RequestLogUptimeStatus = "up" | "warn" | "slow" | "down" | "no_data";

type RequestLogUptimeBucket = {
  date: string;
  total_count: number;
  success_count: number;
  degraded_count: number;
  failure_count: number;
  uptime_percent: number | null;
  avg_response_ms: number | null;
  min_response_ms: number | null;
  max_response_ms: number | null;
  status: RequestLogUptimeStatus;
};

type RequestLogUptimeWindow = {
  label: string;
  hours: number;
  total_count: number;
  failure_count: number;
  uptime_percent: number | null;
};

type RequestLogUptimeResponse = {
  module_slugs: string[];
  days: number;
  generated_at: string;
  total_count: number;
  success_count: number;
  degraded_count: number;
  failure_count: number;
  uptime_percent: number | null;
  windows: RequestLogUptimeWindow[];
  response_time: {
    avg_response_ms: number | null;
    min_response_ms: number | null;
    max_response_ms: number | null;
  };
  buckets: RequestLogUptimeBucket[];
};

export function TasksUptimeView({
  onApiError,
  onViewHistory,
}: {
  onApiError: (err: unknown, fallback?: string) => void;
  onViewHistory: () => void;
}) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["request-log-uptime", "tasks", 90],
    queryFn: () =>
      apiRequest<RequestLogUptimeResponse>("/api/v1/request-logs/uptime?module_slug=tasks&days=90"),
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (error) onApiError(error, "Could not load uptime");
  }, [error, onApiError]);

  if (isLoading) return <TasksUptimeSkeleton />;
  if (error || !data) return null;

  return (
    <div className="grid content-start gap-4">
      <UptimeCard>
        <div className="mb-3 flex items-center justify-between gap-3 text-sm">
          <span className="text-muted-foreground">Last {data.days} days</span>
          <button
            type="button"
            onClick={onViewHistory}
            className="inline-flex items-center gap-1 text-emerald-600 transition hover:text-emerald-700"
          >
            <Activity className="h-4 w-4" /> View full history
          </button>
        </div>
        <div className="mb-2 flex items-baseline gap-2">
          <span
            className={cn(
              "text-sm font-medium",
              uptimeTextClass(data.uptime_percent, data.failure_count),
            )}
          >
            {formatPercent(data.uptime_percent)}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatSampleCount(data.total_count)}
          </span>
        </div>
        <div
          className="grid items-end gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${data.buckets.length}, minmax(0, 1fr))` }}
        >
          {data.buckets.map((bucket) => (
            <TasksUptimeBar key={bucket.date} bucket={bucket} />
          ))}
        </div>
      </UptimeCard>

      <UptimeCard>
        <h2 className="mb-4 text-base font-medium">Overall uptime</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {data.windows.map((window) => (
            <div key={window.label}>
              <div
                className={cn(
                  "text-3xl font-semibold tracking-tight",
                  uptimeTextClass(window.uptime_percent, window.failure_count),
                )}
              >
                {formatPercent(window.uptime_percent)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{window.label}</div>
              <div className="mt-0.5 text-[11px] text-muted-foreground/80">
                {formatSampleCount(window.total_count)}
              </div>
            </div>
          ))}
        </div>
      </UptimeCard>

      <UptimeCard>
        <div className="mb-2 flex items-baseline gap-2">
          <h2 className="text-base font-medium">Response Time</h2>
          <span className="text-xs text-muted-foreground">Last {data.days} days</span>
        </div>
        <TasksResponseChart buckets={data.buckets} />
        <div className="mt-3 grid gap-4 text-sm sm:grid-cols-3">
          {[
            [formatMs(data.response_time.avg_response_ms), "Avg. response time"],
            [formatMs(data.response_time.max_response_ms), "Max. response time"],
            [formatMs(data.response_time.min_response_ms), "Min. response time"],
          ].map(([value, label]) => (
            <div key={label}>
              <div className="text-2xl font-semibold tracking-tight">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </UptimeCard>
    </div>
  );
}

function UptimeCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
      {children}
    </section>
  );
}

function TasksUptimeBar({ bucket }: { bucket: RequestLogUptimeBucket }) {
  const color =
    bucket.status === "down"
      ? "bg-rose-500"
      : bucket.status === "warn"
        ? "bg-amber-400"
        : bucket.status === "slow"
          ? "bg-emerald-200"
          : bucket.status === "no_data"
            ? "bg-stone-200"
            : "bg-emerald-500";
  const label = `${formatBucketDate(bucket.date)}: ${formatPercent(bucket.uptime_percent)} uptime, ${formatSampleCount(bucket.total_count)}`;

  return <span className={cn("h-10 w-full rounded-sm", color)} title={label} />;
}

function TasksResponseChart({ buckets }: { buckets: RequestLogUptimeBucket[] }) {
  const values = buckets.map((bucket) => bucket.avg_response_ms);
  const sampled = values.filter((value): value is number => value != null);

  if (sampled.length === 0) {
    return (
      <div className="grid h-48 place-items-center rounded-xl bg-[hsl(220,33%,98%)] text-sm text-muted-foreground ring-1 ring-black/5">
        No response samples yet
      </div>
    );
  }

  const width = 900;
  const height = 200;
  const max = Math.max(...sampled, 1);
  const step = buckets.length > 1 ? width / (buckets.length - 1) : width;
  const path = values
    .map((value, index) => {
      const x = buckets.length > 1 ? index * step : width / 2;
      const y = height - ((value ?? 0) / max) * (height - 28) - 8;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-48 w-full" role="img">
      <line x1="0" y1="20" x2={width} y2="20" stroke="hsl(0,0%,90%)" strokeDasharray="3 4" />
      <text x="0" y="14" fontSize="11" fill="hsl(0,0%,55%)">
        {max}ms
      </text>
      <path d={path} fill="none" stroke="hsl(142,71%,45%)" strokeWidth="1.4" />
    </svg>
  );
}

function TasksUptimeSkeleton() {
  return (
    <div className="grid content-start gap-4">
      <UptimeCard>
        <div className="mb-3 flex items-center justify-between gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="mb-2 flex items-baseline gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="grid grid-cols-[repeat(90,minmax(0,1fr))] items-end gap-[2px]">
          {Array.from({ length: 90 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full rounded-sm" />
          ))}
        </div>
      </UptimeCard>

      <UptimeCard>
        <Skeleton className="mb-4 h-5 w-36" />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-14" />
            </div>
          ))}
        </div>
      </UptimeCard>

      <UptimeCard>
        <div className="mb-3 flex items-baseline gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-48 w-full rounded-xl" />
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </UptimeCard>
    </div>
  );
}

function formatPercent(value: number | null) {
  return value == null ? "No data" : `${value.toFixed(3)}%`;
}

function formatMs(value: number | null) {
  return value == null ? "No data" : `${value}ms`;
}

function formatSampleCount(count: number) {
  return count === 1 ? "1 sample" : `${count} samples`;
}

function formatBucketDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function uptimeTextClass(value: number | null, failureCount: number) {
  if (value == null) return "text-muted-foreground";
  if (failureCount > 0 || value < 99) return "text-rose-600";
  if (value < 99.9) return "text-amber-600";
  return "text-emerald-600";
}
