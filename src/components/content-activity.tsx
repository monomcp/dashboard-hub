import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  KeyRound,
  Loader2,
  MousePointerClick,
  Plug,
  SlidersHorizontal,
  User as UserIcon,
  Bot,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import type { CatalogServer, ToolkitAccessMatrix } from "@/lib/mcp-types";

// Content's activity log mirrors Brand DNA's, restyled to the light theme. It
// surfaces every change made through Console (UI) and via MCP tool calls for the
// content + social toolkits.
const card = "rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5";
const mutedText = "text-sm text-muted-foreground";
const ACTIVITY_PAGE_SIZE = 50;

const activityControl =
  "rounded-full border border-black/10 bg-[hsl(220,33%,97%)] px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/60";

type RequestLogSource = "api" | "mcp";

type RequestLogSummary = {
  id: string;
  organization_id: string | null;
  source: RequestLogSource;
  method: string | null;
  path: string | null;
  tool_name: string | null;
  status_code: number | null;
  outcome: string | null;
  duration_ms: number | null;
  actor_user_id: string | null;
  api_key_id: string | null;
  request_truncated: boolean;
  response_truncated: boolean;
  ip: string | null;
  created_at: string;
};

type RequestLogDetail = RequestLogSummary & {
  request_body: unknown;
  response_body: unknown;
  meta: Record<string, unknown>;
};

type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

type SourceFilter = "all" | "api" | "mcp";
type StatusFilter = "all" | "success" | "blocked" | "error";
type ContentActivityMode = "content" | "social";

type ActivityFilters = {
  source: SourceFilter;
  status: StatusFilter;
  principal: string; // "all" or a PrincipalInfo.key
  event: string;
  since: string; // yyyy-mm-dd or ""
  until: string; // yyyy-mm-dd or ""
};

const EMPTY_ACTIVITY_FILTERS: ActivityFilters = {
  source: "all",
  status: "all",
  principal: "all",
  event: "",
  since: "",
  until: "",
};

function activityRequestPath(filters: ActivityFilters, offset: number) {
  const params = new URLSearchParams({
    limit: String(ACTIVITY_PAGE_SIZE),
    offset: String(offset),
  });

  if (filters.source !== "all") params.set("source", filters.source);
  if (filters.status !== "all") params.set("outcome", filters.status);
  if (filters.since) params.set("since", new Date(`${filters.since}T00:00:00`).toISOString());
  if (filters.until) params.set("until", new Date(`${filters.until}T23:59:59.999`).toISOString());

  if (filters.principal.startsWith("user:")) {
    params.set("actor_user_id", filters.principal.slice("user:".length));
  } else if (filters.principal.startsWith("key:")) {
    params.set("api_key_id", filters.principal.slice("key:".length));
  }

  return `/api/v1/request-logs?${params.toString()}`;
}

function sameActivityFilters(a: ActivityFilters, b: ActivityFilters) {
  return (
    a.source === b.source &&
    a.status === b.status &&
    a.principal === b.principal &&
    a.event === b.event &&
    a.since === b.since &&
    a.until === b.until
  );
}

type PrincipalInfo = {
  key: string;
  label: string;
  type: "user" | "api_key" | "system";
};

function shortId(id: string) {
  return id.slice(0, 8);
}

// Identify who made the call. Names for user principals are resolved best-effort
// from the toolkit access matrix (auth_user_id → name); api keys and unmapped
// users fall back to a short id.
function logPrincipal(log: RequestLogSummary, userNames: Map<string, string>): PrincipalInfo {
  if (log.actor_user_id) {
    return {
      key: `user:${log.actor_user_id}`,
      label: userNames.get(log.actor_user_id) ?? `User ${shortId(log.actor_user_id)}`,
      type: "user",
    };
  }
  if (log.api_key_id) {
    return {
      key: `key:${log.api_key_id}`,
      label: `API key ${shortId(log.api_key_id)}`,
      type: "api_key",
    };
  }
  return { key: "system", label: "System", type: "system" };
}

function logIsSuccess(log: RequestLogSummary) {
  if (log.outcome != null) return log.outcome === "success" || log.outcome === "ok";
  if (log.status_code != null) return log.status_code < 400;
  return true;
}

function logIsBlocked(log: RequestLogSummary) {
  return log.outcome === "blocked";
}

// UI calls hit /api/v1/content|social, MCP calls use the cms_* / smm_* tools.
function isContentLog(log: RequestLogSummary, mode: ContentActivityMode) {
  if (mode === "social") {
    if (log.tool_name) return log.tool_name.startsWith("smm_");
    return Boolean(log.path?.startsWith("/api/v1/social"));
  }

  if (log.tool_name) return log.tool_name.startsWith("cms_");
  return Boolean(log.path?.startsWith("/api/v1/content"));
}

function eventLabel(log: RequestLogSummary) {
  if (log.tool_name) return log.tool_name;
  if (log.method && log.path) return `${log.method} ${log.path}`;
  return log.path ?? log.method ?? "request";
}

function statusLabel(statusCode: number | null) {
  if (statusCode == null) return "unknown";
  return statusCode < 400 ? "success" : "error";
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function PrincipalBadge({ principal }: { principal: PrincipalInfo }) {
  const Icon = principal.type === "user" ? UserIcon : principal.type === "api_key" ? KeyRound : Bot;
  return (
    <span className="inline-flex items-center gap-1.5 text-foreground/80">
      <Icon className="h-3.5 w-3.5 shrink-0 text-sky-600" />
      <span className="truncate">{principal.label}</span>
    </span>
  );
}

function SourceBadge({ source }: { source: RequestLogSource }) {
  const mcp = source === "mcp";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        mcp ? "bg-violet-100 text-violet-700" : "bg-sky-100 text-sky-700",
      )}
    >
      {mcp ? <Plug className="h-3 w-3" /> : <MousePointerClick className="h-3 w-3" />}
      {mcp ? "MCP" : "Console"}
    </span>
  );
}

function StatusDot({ outcome }: { outcome: string | null }) {
  const ok = outcome == null || outcome === "success" || outcome === "ok";
  const blocked = outcome === "blocked";
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        ok ? "bg-emerald-500" : blocked ? "bg-amber-500" : "bg-rose-500",
      )}
    />
  );
}

export function ContentActivityView({
  mode,
  onApiError,
}: {
  mode: ContentActivityMode;
  onApiError: (err: unknown, fallback?: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filters, setFilters] = useState<ActivityFilters>(EMPTY_ACTIVITY_FILTERS);
  const [eventInput, setEventInput] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, error } =
    useInfiniteQuery({
      queryKey: ["content-activity", filters],
      queryFn: ({ pageParam, signal }) =>
        apiRequest<Page<RequestLogSummary>>(activityRequestPath(filters, pageParam), { signal }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const nextOffset = lastPage.offset + lastPage.items.length;
        return nextOffset < lastPage.total ? nextOffset : undefined;
      },
      staleTime: 30 * 1000,
    });

  useEffect(() => {
    if (error) onApiError(error, "Could not load activity");
  }, [error, onApiError]);

  // Best-effort name lookup for user principals, drawn from the first content
  // toolkit's access matrix. Admin-gated, so a 403/empty result simply leaves
  // principals labelled by short id.
  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 60 * 1000,
  });

  const firstToolkitId = useMemo(() => {
    const activeSlug = mode === "social" ? "smm" : "cms";
    for (const server of catalog ?? []) {
      if (server.slug !== activeSlug) continue;
      if (server.enabled && server.toolkit_ids[0]) return server.toolkit_ids[0];
    }
    return undefined;
  }, [catalog, mode]);

  const { data: matrix } = useQuery({
    queryKey: ["toolkit-access-matrix", firstToolkitId],
    queryFn: () =>
      apiRequest<ToolkitAccessMatrix>(`/api/v1/toolkits/${firstToolkitId}/access-matrix`),
    enabled: Boolean(firstToolkitId),
    staleTime: 60 * 1000,
    retry: false,
  });

  const userNames = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of matrix?.principals ?? []) {
      if (p.auth_user_id) map.set(p.auth_user_id, p.name);
    }
    return map;
  }, [matrix]);

  const allLogs = useMemo(
    () =>
      (data?.pages.flatMap((page) => page.items) ?? [])
        .filter((log) => isContentLog(log, mode))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [data, mode],
  );

  // Distinct principals seen in the loaded logs, for the principal filter.
  const principalOptions = useMemo(() => {
    const seen = new Map<string, PrincipalInfo>();
    for (const log of allLogs) {
      const p = logPrincipal(log, userNames);
      if (!seen.has(p.key)) seen.set(p.key, p);
    }
    return Array.from(seen.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [allLogs, userNames]);

  const sinceMs = filters.since ? new Date(`${filters.since}T00:00:00`).getTime() : null;
  const untilMs = filters.until ? new Date(`${filters.until}T23:59:59.999`).getTime() : null;
  const eventQuery = filters.event.trim().toLowerCase();

  const logs = useMemo(
    () =>
      allLogs.filter((log) => {
        if (filters.source !== "all" && log.source !== filters.source) return false;
        if (filters.status === "success" && !logIsSuccess(log)) return false;
        if (filters.status === "blocked" && !logIsBlocked(log)) return false;
        if (filters.status === "error" && (logIsSuccess(log) || logIsBlocked(log))) return false;
        if (filters.principal !== "all" && logPrincipal(log, userNames).key !== filters.principal)
          return false;
        if (eventQuery) {
          const haystack =
            `${eventLabel(log)} ${log.path ?? ""} ${log.tool_name ?? ""}`.toLowerCase();
          if (!haystack.includes(eventQuery)) return false;
        }
        const ts = new Date(log.created_at).getTime();
        if (sinceMs != null && ts < sinceMs) return false;
        if (untilMs != null && ts > untilMs) return false;
        return true;
      }),
    [allLogs, filters, eventQuery, sinceMs, untilMs, userNames],
  );

  const filtersActive =
    filters.source !== "all" ||
    filters.status !== "all" ||
    filters.principal !== "all" ||
    filters.event.trim() !== "" ||
    filters.since !== "" ||
    filters.until !== "";

  const updateFilters = useCallback(
    (updater: (filters: ActivityFilters) => ActivityFilters) => {
      const next = updater(filters);
      void queryClient.cancelQueries({ queryKey: ["content-activity"] });
      setFilters(next);
      setFiltering(true);
      if (sameActivityFilters(filters, next)) {
        void queryClient.refetchQueries({ queryKey: ["content-activity", next], type: "active" });
      }
    },
    [filters, queryClient],
  );

  const updateEventInput = useCallback(
    (value: string) => {
      setEventInput(value);
      const query = value.trim();
      if (query.length > 0 && query.length < 3) return;
      updateFilters((f) => ({ ...f, event: value }));
    },
    [updateFilters],
  );

  useEffect(() => {
    if (!isFetching) setFiltering(false);
  }, [isFetching]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="grid content-start gap-4">
      <div className={cn(card, "flex min-h-28 items-end justify-between gap-4")}>
        <div className="self-center">
          <h2 className="text-xl font-normal tracking-tight">Activity</h2>
          <p className={cn("mt-2", mutedText)}>
            Every {mode === "social" ? "social" : "content"} change made through Console and via
            MCP tool calls.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowFilters((open) => !open)}
          aria-label={showFilters ? "Hide activity filters" : "Show activity filters"}
          className={cn(
            "relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition",
            filtersActive
              ? "bg-sky-600 text-white shadow-sm"
              : showFilters
                ? "bg-black/10 text-foreground"
                : "bg-black/5 text-muted-foreground hover:bg-black/10 hover:text-foreground",
          )}
        >
          <SlidersHorizontal className="h-5 w-5" />
          {filtersActive && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          )}
        </button>
      </div>

      {showFilters && (
        <div className={cn(card, "flex flex-wrap items-end gap-3")}>
          <FilterField label="Source">
            <SegmentedFilter
              value={filters.source}
              onChange={(source) => updateFilters((f) => ({ ...f, source }))}
              options={[
                { value: "all", label: "All" },
                { value: "api", label: "Console" },
                { value: "mcp", label: "MCP" },
              ]}
            />
          </FilterField>
          <FilterField label="Status">
            <SegmentedFilter
              value={filters.status}
              onChange={(status) => updateFilters((f) => ({ ...f, status }))}
              options={[
                { value: "all", label: "All" },
                { value: "success", label: "Success" },
                { value: "blocked", label: "Blocked" },
                { value: "error", label: "Error" },
              ]}
            />
          </FilterField>
          <FilterField label="Principal">
            <select
              value={filters.principal}
              onChange={(e) => updateFilters((f) => ({ ...f, principal: e.target.value }))}
              className={activityControl}
              aria-label="Filter by principal"
            >
              <option value="all">All principals</option>
              {principalOptions.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </FilterField>
          <FilterField label="Event">
            <input
              type="text"
              value={eventInput}
              onChange={(e) => updateEventInput(e.target.value)}
              placeholder="Search tool or path"
              className={cn(activityControl, "w-48")}
              aria-label="Filter by event"
            />
          </FilterField>
          <FilterField label="From">
            <input
              type="date"
              value={filters.since}
              max={filters.until || undefined}
              onChange={(e) => updateFilters((f) => ({ ...f, since: e.target.value }))}
              className={activityControl}
              aria-label="From date"
            />
          </FilterField>
          <FilterField label="To">
            <input
              type="date"
              value={filters.until}
              min={filters.since || undefined}
              onChange={(e) => updateFilters((f) => ({ ...f, until: e.target.value }))}
              className={activityControl}
              aria-label="To date"
            />
          </FilterField>
          {filtersActive && (
            <button
              type="button"
              onClick={() => {
                setEventInput("");
                updateFilters(() => EMPTY_ACTIVITY_FILTERS);
              }}
              className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1.5 text-sm text-foreground/70 transition hover:bg-black/10"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-black/5">
        <table className="w-full text-sm">
          <thead className="bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Event</th>
              <th className="px-4 py-3 text-left font-medium">Principal</th>
              <th className="px-4 py-3 text-left font-medium">Source</th>
              <th className="px-4 py-3 text-left font-medium">When</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || (filtering && isFetching && !isFetchingNextPage)) && (
              <ActivityTableSkeletonRows />
            )}
            {!isLoading &&
              !(filtering && isFetching && !isFetchingNextPage) &&
              logs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedId(log.id)}
                  className="cursor-pointer border-t border-black/5 transition hover:bg-black/[0.03]"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{eventLabel(log)}</div>
                    <div className="mt-0.5 truncate text-xs text-muted-foreground">
                      {log.tool_name ? (log.path ?? log.method) : log.path}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <PrincipalBadge principal={logPrincipal(log, userNames)} />
                  </td>
                  <td className="px-4 py-3">
                    <SourceBadge source={log.source} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{timeAgo(log.created_at)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <StatusDot outcome={log.outcome} />
                      <span className="capitalize text-foreground/80">
                        {log.outcome ?? statusLabel(log.status_code)}
                      </span>
                      {log.duration_ms != null && (
                        <span className="text-xs text-muted-foreground">· {log.duration_ms}ms</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            {!isLoading &&
              !(filtering && isFetching && !isFetchingNextPage) &&
              logs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                    {filtersActive
                      ? "No activity matches these filters."
                      : "No activity recorded yet."}
                  </td>
                </tr>
              )}
            {!isLoading &&
              !(filtering && isFetching && !isFetchingNextPage) &&
              isFetchingNextPage && <ActivityTableSkeletonRows />}
          </tbody>
        </table>
      </div>

      <div
        ref={loadMoreRef}
        className="grid min-h-8 place-items-center text-sm text-muted-foreground"
      >
        {!isFetchingNextPage && hasNextPage && "Loading more activity..."}
      </div>

      <ActivityDetailDialog
        logId={selectedId}
        userNames={userNames}
        onOpenChange={(open) => !open && setSelectedId(null)}
        onApiError={onApiError}
      />
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function SegmentedFilter<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  const activeIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value),
  );

  return (
    <div
      className="relative grid overflow-hidden rounded-full border border-black/10 bg-[hsl(220,33%,97%)] p-0.5"
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0.5 left-0.5 rounded-full bg-sky-600 transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 4px) / ${options.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "relative z-10 min-w-20 rounded-full px-3 py-1 text-sm transition-colors duration-200",
            value === opt.value ? "text-white" : "text-foreground/70 hover:text-foreground",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function ActivityTableSkeletonRows() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <tr key={index} aria-hidden="true" className="border-t border-black/5">
          <td className="px-4 py-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40 max-w-full rounded-full" />
              <Skeleton className="h-3 w-56 max-w-full rounded-full" />
            </div>
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-28 rounded-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-6 w-20 rounded-full" />
          </td>
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-24 rounded-full" />
          </td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-4 w-24 rounded-full" />
              {index % 2 === 0 && <Skeleton className="h-3 w-10 rounded-full" />}
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

function ActivityDetailDialog({
  logId,
  userNames,
  onOpenChange,
  onApiError,
}: {
  logId: string | null;
  userNames: Map<string, string>;
  onOpenChange: (open: boolean) => void;
  onApiError: (err: unknown, fallback?: string) => void;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["content-activity", logId],
    queryFn: () => apiRequest<RequestLogDetail>(`/api/v1/request-logs/${logId}`),
    enabled: Boolean(logId),
  });

  useEffect(() => {
    if (error) onApiError(error, "Could not load activity detail");
  }, [error, onApiError]);

  return (
    <Dialog open={Boolean(logId)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {data && <SourceBadge source={data.source} />}
            {data ? eventLabel(data) : "Activity detail"}
          </DialogTitle>
        </DialogHeader>
        {isLoading || !data ? (
          <div className="grid place-items-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="mt-4 grid gap-4">
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <Detail label="Source" value={data.source === "mcp" ? "MCP" : "Console"} />
              <Detail label="Principal" value={logPrincipal(data, userNames).label} />
              <Detail label="Status" value={data.outcome ?? statusLabel(data.status_code)} />
              <Detail label="When" value={new Date(data.created_at).toLocaleString()} />
              <Detail
                label="Duration"
                value={data.duration_ms != null ? `${data.duration_ms} ms` : "—"}
              />
              {data.method && <Detail label="Method" value={data.method} />}
              {data.status_code != null && (
                <Detail label="Status code" value={String(data.status_code)} />
              )}
              {data.tool_name && <Detail label="Tool" value={data.tool_name} />}
              {data.path && <Detail label="Path" value={data.path} />}
            </dl>
            <div>
              <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Request
              </h3>
              <JsonBlock value={data.request_body} truncated={data.request_truncated} />
            </div>
            <div>
              <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Response
              </h3>
              <JsonBlock value={data.response_body} truncated={data.response_truncated} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words text-foreground">{value}</dd>
    </div>
  );
}

function JsonBlock({ value, truncated }: { value: unknown; truncated?: boolean }) {
  return (
    <div>
      <pre className="overflow-auto rounded-xl bg-[hsl(220,33%,97%)] p-3 text-xs leading-relaxed text-foreground/90 ring-1 ring-black/5">
        {value == null ? "—" : JSON.stringify(value, null, 2)}
      </pre>
      {truncated && <p className="mt-1 text-xs text-muted-foreground">Payload truncated.</p>}
    </div>
  );
}
