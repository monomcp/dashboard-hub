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

type UptimeViewTheme = {
  cardClassName?: string;
  mutedClassName?: string;
  headingClassName?: string;
  linkClassName?: string;
  emptyChartClassName?: string;
  chartGridStroke?: string;
  chartLabelFill?: string;
  chartLineStroke?: string;
  skeletonClassName?: string;
};

const DEFAULT_THEME: Required<UptimeViewTheme> = {
  cardClassName: "rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6",
  mutedClassName: "text-muted-foreground",
  headingClassName: "text-foreground",
  linkClassName: "text-emerald-600 hover:text-emerald-700",
  emptyChartClassName: "bg-[hsl(220,33%,98%)] text-muted-foreground ring-1 ring-black/5",
  chartGridStroke: "hsl(0,0%,90%)",
  chartLabelFill: "hsl(0,0%,55%)",
  chartLineStroke: "hsl(142,71%,45%)",
  skeletonClassName: "",
};

export function TasksUptimeView({
  moduleSlug,
  onApiError,
  onViewHistory,
  theme,
}: {
  moduleSlug: string;
  onApiError: (err: unknown, fallback?: string) => void;
  onViewHistory: () => void;
  theme?: UptimeViewTheme;
}) {
  const viewTheme = { ...DEFAULT_THEME, ...theme };
  const { data, error, isLoading } = useQuery({
    queryKey: ["request-log-uptime", moduleSlug, 90],
    queryFn: () =>
      apiRequest<RequestLogUptimeResponse>(
        `/api/v1/request-logs/uptime?module_slug=${encodeURIComponent(moduleSlug)}&days=90`,
      ),
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (error) onApiError(error, "Could not load uptime");
  }, [error, onApiError]);

  if (isLoading) return <TasksUptimeSkeleton theme={viewTheme} />;
  if (error || !data) return null;

  return (
    <div className="grid content-start gap-4">
      <UptimeCard theme={viewTheme}>
        <div className="mb-3 flex items-center justify-between gap-3 text-sm">
          <span className={viewTheme.mutedClassName}>Last {data.days} days</span>
          <button
            type="button"
            onClick={onViewHistory}
            className={cn("inline-flex items-center gap-1 transition", viewTheme.linkClassName)}
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
          <span className={cn("text-xs", viewTheme.mutedClassName)}>
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

      <UptimeCard theme={viewTheme}>
        <h2 className={cn("mb-4 text-base font-medium", viewTheme.headingClassName)}>
          Overall uptime
        </h2>
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
              <div className={cn("mt-1 text-xs", viewTheme.mutedClassName)}>{window.label}</div>
              <div className={cn("mt-0.5 text-[11px]", viewTheme.mutedClassName)}>
                {formatSampleCount(window.total_count)}
              </div>
            </div>
          ))}
        </div>
      </UptimeCard>

      <UptimeCard theme={viewTheme}>
        <div className="mb-2 flex items-baseline gap-2">
          <h2 className={cn("text-base font-medium", viewTheme.headingClassName)}>Response Time</h2>
          <span className={cn("text-xs", viewTheme.mutedClassName)}>Last {data.days} days</span>
        </div>
        <TasksResponseChart buckets={data.buckets} theme={viewTheme} />
        <div className="mt-3 grid gap-4 text-sm sm:grid-cols-3">
          {[
            [formatMs(data.response_time.avg_response_ms), "Avg. response time"],
            [formatMs(data.response_time.max_response_ms), "Max. response time"],
            [formatMs(data.response_time.min_response_ms), "Min. response time"],
          ].map(([value, label]) => (
            <div key={label}>
              <div
                className={cn("text-2xl font-semibold tracking-tight", viewTheme.headingClassName)}
              >
                {value}
              </div>
              <div className={cn("text-xs", viewTheme.mutedClassName)}>{label}</div>
            </div>
          ))}
        </div>
      </UptimeCard>
    </div>
  );
}

function UptimeCard({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Required<UptimeViewTheme>;
}) {
  return <section className={theme.cardClassName}>{children}</section>;
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

function TasksResponseChart({
  buckets,
  theme,
}: {
  buckets: RequestLogUptimeBucket[];
  theme: Required<UptimeViewTheme>;
}) {
  const values = buckets.map((bucket) => bucket.avg_response_ms);
  const sampled = values.filter((value): value is number => value != null);

  if (sampled.length === 0) {
    return (
      <div
        className={cn("grid h-48 place-items-center rounded-xl text-sm", theme.emptyChartClassName)}
      >
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
      <line
        x1="0"
        y1="20"
        x2={width}
        y2="20"
        stroke={theme.chartGridStroke}
        strokeDasharray="3 4"
      />
      <text x="0" y="14" fontSize="11" fill={theme.chartLabelFill}>
        {max}ms
      </text>
      <path d={path} fill="none" stroke={theme.chartLineStroke} strokeWidth="1.4" />
    </svg>
  );
}

function TasksUptimeSkeleton({ theme }: { theme: Required<UptimeViewTheme> }) {
  return (
    <div className="grid content-start gap-4">
      <UptimeCard theme={theme}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <Skeleton className={cn("h-4 w-24", theme.skeletonClassName)} />
          <Skeleton className={cn("h-4 w-32", theme.skeletonClassName)} />
        </div>
        <div className="mb-2 flex items-baseline gap-2">
          <Skeleton className={cn("h-5 w-20", theme.skeletonClassName)} />
          <Skeleton className={cn("h-3 w-16", theme.skeletonClassName)} />
        </div>
        <div className="grid grid-cols-[repeat(90,minmax(0,1fr))] items-end gap-[2px]">
          {Array.from({ length: 90 }).map((_, index) => (
            <Skeleton
              key={index}
              className={cn("h-10 w-full rounded-sm", theme.skeletonClassName)}
            />
          ))}
        </div>
      </UptimeCard>

      <UptimeCard theme={theme}>
        <Skeleton className={cn("mb-4 h-5 w-36", theme.skeletonClassName)} />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className={cn("h-9 w-28", theme.skeletonClassName)} />
              <Skeleton className={cn("h-3 w-20", theme.skeletonClassName)} />
              <Skeleton className={cn("h-3 w-14", theme.skeletonClassName)} />
            </div>
          ))}
        </div>
      </UptimeCard>

      <UptimeCard theme={theme}>
        <div className="mb-3 flex items-baseline gap-2">
          <Skeleton className={cn("h-5 w-32", theme.skeletonClassName)} />
          <Skeleton className={cn("h-3 w-20", theme.skeletonClassName)} />
        </div>
        <Skeleton className={cn("h-48 w-full rounded-xl", theme.skeletonClassName)} />
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className={cn("h-8 w-24", theme.skeletonClassName)} />
              <Skeleton className={cn("h-3 w-32", theme.skeletonClassName)} />
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
  if (value >= 90) return "text-emerald-600";
  if (failureCount > 0 || value < 75) return "text-rose-600";
  if (value < 90) return "text-amber-600";
  return "text-emerald-600";
}
