import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, c as useInfiniteQuery, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CypSg8M2.mjs";
import { S as Skeleton } from "./skeleton-CoUJiN10.mjs";
import { a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { k as SlidersHorizontal, an as X, aa as User, K as KeyRound, ai as Bot, aE as Plug, aw as MousePointerClick, L as LoaderCircle } from "../_libs/lucide-react.mjs";
const card = "rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5";
const mutedText = "text-sm text-muted-foreground";
const ACTIVITY_PAGE_SIZE = 50;
const activityControl = "rounded-full border border-black/10 bg-[hsl(220,33%,97%)] px-3 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground/60";
const EMPTY_ACTIVITY_FILTERS = {
  source: "all",
  status: "all",
  principal: "all",
  event: "",
  since: "",
  until: ""
};
function activityRequestPath(filters, offset) {
  const params = new URLSearchParams({
    limit: String(ACTIVITY_PAGE_SIZE),
    offset: String(offset)
  });
  if (filters.source !== "all") params.set("source", filters.source);
  if (filters.status !== "all") params.set("outcome", filters.status);
  if (filters.since) params.set("since", (/* @__PURE__ */ new Date(`${filters.since}T00:00:00`)).toISOString());
  if (filters.until) params.set("until", (/* @__PURE__ */ new Date(`${filters.until}T23:59:59.999`)).toISOString());
  if (filters.principal.startsWith("user:")) {
    params.set("actor_user_id", filters.principal.slice("user:".length));
  } else if (filters.principal.startsWith("key:")) {
    params.set("api_key_id", filters.principal.slice("key:".length));
  }
  return `/api/v1/request-logs?${params.toString()}`;
}
function sameActivityFilters(a, b) {
  return a.source === b.source && a.status === b.status && a.principal === b.principal && a.event === b.event && a.since === b.since && a.until === b.until;
}
function shortId(id) {
  return id.slice(0, 8);
}
function logPrincipal(log, userNames) {
  if (log.actor_user_id) {
    return {
      key: `user:${log.actor_user_id}`,
      label: userNames.get(log.actor_user_id) ?? `User ${shortId(log.actor_user_id)}`,
      type: "user"
    };
  }
  if (log.api_key_id) {
    return {
      key: `key:${log.api_key_id}`,
      label: `API key ${shortId(log.api_key_id)}`,
      type: "api_key"
    };
  }
  return { key: "system", label: "System", type: "system" };
}
function logIsSuccess(log) {
  if (log.outcome != null) return log.outcome === "success" || log.outcome === "ok";
  if (log.status_code != null) return log.status_code < 400;
  return true;
}
function logIsBlocked(log) {
  return log.outcome === "blocked";
}
function eventLabel(log) {
  if (log.tool_name) return log.tool_name;
  if (log.method && log.path) return `${log.method} ${log.path}`;
  return log.path ?? log.method ?? "request";
}
function statusLabel(statusCode) {
  if (statusCode == null) return "unknown";
  return statusCode < 400 ? "success" : "error";
}
function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function PrincipalBadge({ principal }) {
  const Icon = principal.type === "user" ? User : principal.type === "api_key" ? KeyRound : Bot;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-foreground/80", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 shrink-0 text-sky-600" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: principal.label })
  ] });
}
function SourceBadge({ source }) {
  const mcp = source === "mcp";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        mcp ? "bg-violet-100 text-violet-700" : "bg-sky-100 text-sky-700"
      ),
      children: [
        mcp ? /* @__PURE__ */ jsxRuntimeExports.jsx(Plug, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "h-3 w-3" }),
        mcp ? "MCP" : "Console"
      ]
    }
  );
}
function StatusDot({ outcome }) {
  const ok = outcome == null || outcome === "success" || outcome === "ok";
  const blocked = outcome === "blocked";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-block h-2 w-2 rounded-full",
        ok ? "bg-emerald-500" : blocked ? "bg-amber-500" : "bg-rose-500"
      )
    }
  );
}
function ActivityLog({
  onApiError,
  logFilter,
  nameServerSlugs,
  source: controlledSource,
  title = "Activity",
  description = "Every change made through Console and via MCP tool calls."
}) {
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [filters, setFilters] = reactExports.useState(
    () => controlledSource ? { ...EMPTY_ACTIVITY_FILTERS, source: controlledSource } : EMPTY_ACTIVITY_FILTERS
  );
  const [eventInput, setEventInput] = reactExports.useState("");
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const [filtering, setFiltering] = reactExports.useState(false);
  const loadMoreRef = reactExports.useRef(null);
  const queryClient = useQueryClient();
  reactExports.useEffect(() => {
    if (controlledSource === void 0) return;
    setFilters((f) => f.source === controlledSource ? f : { ...f, source: controlledSource });
  }, [controlledSource]);
  const { data, isLoading, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, error } = useInfiniteQuery({
    queryKey: ["activity-logs", filters],
    queryFn: ({ pageParam, signal }) => apiRequest(activityRequestPath(filters, pageParam), { signal }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.items.length;
      return nextOffset < lastPage.total ? nextOffset : void 0;
    },
    staleTime: 30 * 1e3
  });
  reactExports.useEffect(() => {
    if (error) onApiError(error, "Could not load activity");
  }, [error, onApiError]);
  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest("/api/v1/mcp-catalog"),
    staleTime: 60 * 1e3
  });
  const firstToolkitId = reactExports.useMemo(() => {
    for (const server of catalog ?? []) {
      if (nameServerSlugs && !nameServerSlugs.includes(server.slug)) continue;
      if (server.enabled && server.toolkit_ids[0]) return server.toolkit_ids[0];
    }
    return void 0;
  }, [catalog, nameServerSlugs]);
  const { data: matrix } = useQuery({
    queryKey: ["toolkit-access-matrix", firstToolkitId],
    queryFn: () => apiRequest(`/api/v1/toolkits/${firstToolkitId}/access-matrix`),
    enabled: Boolean(firstToolkitId),
    staleTime: 60 * 1e3,
    retry: false
  });
  const userNames = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const p of matrix?.principals ?? []) {
      if (p.auth_user_id) map.set(p.auth_user_id, p.name);
    }
    return map;
  }, [matrix]);
  const allLogs = reactExports.useMemo(() => {
    const items = data?.pages.flatMap((page) => page.items) ?? [];
    return (logFilter ? items.filter(logFilter) : items).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }, [data, logFilter]);
  const principalOptions = reactExports.useMemo(() => {
    const seen = /* @__PURE__ */ new Map();
    for (const log of allLogs) {
      const p = logPrincipal(log, userNames);
      if (!seen.has(p.key)) seen.set(p.key, p);
    }
    return Array.from(seen.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [allLogs, userNames]);
  const sinceMs = filters.since ? (/* @__PURE__ */ new Date(`${filters.since}T00:00:00`)).getTime() : null;
  const untilMs = filters.until ? (/* @__PURE__ */ new Date(`${filters.until}T23:59:59.999`)).getTime() : null;
  const eventQuery = filters.event.trim().toLowerCase();
  const logs = reactExports.useMemo(
    () => allLogs.filter((log) => {
      if (filters.source !== "all" && log.source !== filters.source) return false;
      if (filters.status === "success" && !logIsSuccess(log)) return false;
      if (filters.status === "blocked" && !logIsBlocked(log)) return false;
      if (filters.status === "error" && (logIsSuccess(log) || logIsBlocked(log))) return false;
      if (filters.principal !== "all" && logPrincipal(log, userNames).key !== filters.principal)
        return false;
      if (eventQuery) {
        const haystack = `${eventLabel(log)} ${log.path ?? ""} ${log.tool_name ?? ""}`.toLowerCase();
        if (!haystack.includes(eventQuery)) return false;
      }
      const ts = new Date(log.created_at).getTime();
      if (sinceMs != null && ts < sinceMs) return false;
      if (untilMs != null && ts > untilMs) return false;
      return true;
    }),
    [allLogs, filters, eventQuery, sinceMs, untilMs, userNames]
  );
  const filtersActive = controlledSource === void 0 && filters.source !== "all" || filters.status !== "all" || filters.principal !== "all" || filters.event.trim() !== "" || filters.since !== "" || filters.until !== "";
  const updateFilters = reactExports.useCallback(
    (updater) => {
      const next = updater(filters);
      void queryClient.cancelQueries({ queryKey: ["activity-logs"] });
      setFilters(next);
      setFiltering(true);
      if (sameActivityFilters(filters, next)) {
        void queryClient.refetchQueries({ queryKey: ["activity-logs", next], type: "active" });
      }
    },
    [filters, queryClient]
  );
  const clearFilters = () => updateFilters(
    () => controlledSource ? { ...EMPTY_ACTIVITY_FILTERS, source: controlledSource } : EMPTY_ACTIVITY_FILTERS
  );
  const updateEventInput = reactExports.useCallback(
    (value) => {
      setEventInput(value);
      const query = value.trim();
      if (query.length > 0 && query.length < 3) return;
      updateFilters((f) => ({ ...f, event: value }));
    },
    [updateFilters]
  );
  reactExports.useEffect(() => {
    if (!isFetching) setFiltering(false);
  }, [isFetching]);
  reactExports.useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "240px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(card, "flex min-h-28 items-end justify-between gap-4"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "self-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-normal tracking-tight", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-2", mutedText), children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setShowFilters((open) => !open),
          "aria-label": showFilters ? "Hide activity filters" : "Show activity filters",
          className: cn(
            "relative grid h-10 w-10 shrink-0 place-items-center rounded-full transition",
            filtersActive ? "bg-sky-600 text-white shadow-sm" : showFilters ? "bg-black/10 text-foreground" : "bg-black/5 text-muted-foreground hover:bg-black/10 hover:text-foreground"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-5 w-5" }),
            filtersActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" })
          ]
        }
      )
    ] }),
    showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(card, "flex flex-wrap items-end gap-3"), children: [
      controlledSource === void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Source", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SegmentedFilter,
        {
          value: filters.source,
          onChange: (source) => updateFilters((f) => ({ ...f, source })),
          options: [
            { value: "all", label: "All" },
            { value: "api", label: "Console" },
            { value: "mcp", label: "MCP" }
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        SegmentedFilter,
        {
          value: filters.status,
          onChange: (status) => updateFilters((f) => ({ ...f, status })),
          options: [
            { value: "all", label: "All" },
            { value: "success", label: "Success" },
            { value: "blocked", label: "Blocked" },
            { value: "error", label: "Error" }
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Principal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: filters.principal,
          onChange: (e) => updateFilters((f) => ({ ...f, principal: e.target.value })),
          className: activityControl,
          "aria-label": "Filter by principal",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All principals" }),
            principalOptions.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: p.key, children: p.label }, p.key))
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "Event", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: eventInput,
          onChange: (e) => updateEventInput(e.target.value),
          placeholder: "Search tool or path",
          className: cn(activityControl, "w-48"),
          "aria-label": "Filter by event"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "From", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: filters.since,
          max: filters.until || void 0,
          onChange: (e) => updateFilters((f) => ({ ...f, since: e.target.value })),
          className: activityControl,
          "aria-label": "From date"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterField, { label: "To", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "date",
          value: filters.until,
          min: filters.since || void 0,
          onChange: (e) => updateFilters((f) => ({ ...f, until: e.target.value })),
          className: activityControl,
          "aria-label": "To date"
        }
      ) }),
      filtersActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => {
            setEventInput("");
            clearFilters();
          },
          className: "inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1.5 text-sm text-foreground/70 transition hover:bg-black/10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
            " Clear"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-3xl bg-white ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[hsl(220,33%,97%)] text-xs uppercase tracking-wide text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Event" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Principal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Source" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        (isLoading || filtering && isFetching && !isFetchingNextPage) && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTableSkeletonRows, {}),
        !isLoading && !(filtering && isFetching && !isFetchingNextPage) && logs.map((log) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            onClick: () => setSelectedId(log.id),
            className: "cursor-pointer border-t border-black/5 transition hover:bg-black/[0.03]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: eventLabel(log) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate text-xs text-muted-foreground", children: log.tool_name ? log.path ?? log.method : log.path })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PrincipalBadge, { principal: logPrincipal(log, userNames) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SourceBadge, { source: log.source }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: timeAgo(log.created_at) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { outcome: log.outcome }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize text-foreground/80", children: log.outcome ?? statusLabel(log.status_code) }),
                log.duration_ms != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "· ",
                  log.duration_ms,
                  "ms"
                ] })
              ] }) })
            ]
          },
          log.id
        )),
        !isLoading && !(filtering && isFetching && !isFetchingNextPage) && logs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-10 text-center text-muted-foreground", children: filtersActive ? "No activity matches these filters." : "No activity recorded yet." }) }),
        !isLoading && !(filtering && isFetching && !isFetchingNextPage) && isFetchingNextPage && /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityTableSkeletonRows, {})
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: loadMoreRef,
        className: "grid min-h-8 place-items-center text-sm text-muted-foreground",
        children: !isFetchingNextPage && hasNextPage && "Loading more activity..."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActivityDetailDialog,
      {
        logId: selectedId,
        userNames,
        onOpenChange: (open) => !open && setSelectedId(null),
        onApiError
      }
    )
  ] });
}
function FilterField({ label, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: label }),
    children
  ] });
}
function SegmentedFilter({
  value,
  onChange,
  options
}) {
  const activeIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === value)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative grid overflow-hidden rounded-full border border-black/10 bg-[hsl(220,33%,97%)] p-0.5",
      style: { gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "aria-hidden": "true",
            className: "absolute inset-y-0.5 left-0.5 rounded-full bg-sky-600 transition-transform duration-300 ease-out",
            style: {
              width: `calc((100% - 4px) / ${options.length})`,
              transform: `translateX(${activeIndex * 100}%)`
            }
          }
        ),
        options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange(opt.value),
            className: cn(
              "relative z-10 min-w-20 rounded-full px-3 py-1 text-sm transition-colors duration-200",
              value === opt.value ? "text-white" : "text-foreground/70 hover:text-foreground"
            ),
            children: opt.label
          },
          opt.value
        ))
      ]
    }
  );
}
function ActivityTableSkeletonRows() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Array.from({ length: 4 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { "aria-hidden": "true", className: "border-t border-black/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40 max-w-full rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-56 max-w-full rounded-full" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28 rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 rounded-full" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-2.5 w-2.5 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 rounded-full" }),
      index % 2 === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-10 rounded-full" })
    ] }) })
  ] }, index)) });
}
function ActivityDetailDialog({
  logId,
  userNames,
  onOpenChange,
  onApiError
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["activity-log-detail", logId],
    queryFn: () => apiRequest(`/api/v1/request-logs/${logId}`),
    enabled: Boolean(logId)
  });
  reactExports.useEffect(() => {
    if (error) onApiError(error, "Could not load activity detail");
  }, [error, onApiError]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: Boolean(logId), onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[85vh] overflow-y-auto rounded-2xl sm:max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2", children: [
      data && /* @__PURE__ */ jsxRuntimeExports.jsx(SourceBadge, { source: data.source }),
      data ? eventLabel(data) : "Activity detail"
    ] }) }),
    isLoading || !data ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid place-items-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-muted-foreground" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Source", value: data.source === "mcp" ? "MCP" : "Console" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Principal", value: logPrincipal(data, userNames).label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Status", value: data.outcome ?? statusLabel(data.status_code) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "When", value: new Date(data.created_at).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Detail,
          {
            label: "Duration",
            value: data.duration_ms != null ? `${data.duration_ms} ms` : "—"
          }
        ),
        data.method && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Method", value: data.method }),
        data.status_code != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Status code", value: String(data.status_code) }),
        data.tool_name && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Tool", value: data.tool_name }),
        data.path && /* @__PURE__ */ jsxRuntimeExports.jsx(Detail, { label: "Path", value: data.path })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(JsonBlock, { value: data.request_body, truncated: data.request_truncated })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: "Response" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(JsonBlock, { value: data.response_body, truncated: data.response_truncated })
      ] })
    ] })
  ] }) });
}
function Detail({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs uppercase text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 break-words text-foreground", children: value })
  ] });
}
function JsonBlock({ value, truncated }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-auto rounded-xl bg-[hsl(220,33%,97%)] p-3 text-xs leading-relaxed text-foreground/90 ring-1 ring-black/5", children: value == null ? "—" : JSON.stringify(value, null, 2) }),
    truncated && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Payload truncated." })
  ] });
}
export {
  ActivityLog as A
};
