import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Menu,
  Activity,
  Gauge,
  CheckCircle2,
  Plus,
  HelpCircle,
  Star,
  ChevronUp,
  CheckSquare,
  KeyRound,
  MoreVertical,
  Circle,
  CheckCircle,
  Clock,
  AlignLeft,
  ListChecks,
  Check,
  Search,
  Loader2,
  UserRound,
  Bot,
  AlertTriangle,
  CalendarClock,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { EnableMcpServerButton } from "@/components/enable-mcp-server-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AppsMenu, PlaygroundHeaderButton } from "@/components/apps-menu";
import { AccountMenu } from "@/components/account-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/date-picker";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import type { CatalogServer } from "@/lib/mcp-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tasks" },
      { name: "description", content: "Organize your day with lists and tasks." },
    ],
  }),
  component: TasksPage,
});

type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

type TaskStatus =
  | "todo"
  | "claimed"
  | "in_progress"
  | "needs_review"
  | "failed"
  | "blocked"
  | "done"
  | "open"
  | "cancelled";
type TaskAssignmentRole = "assignee" | "reviewer" | "approver" | "watcher";

type TaskListResponse = {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  list_type: string;
  sort_order: number;
  is_default: boolean;
  is_archived: boolean;
  task_count: number;
  created_at: string;
  updated_at: string;
};

type TaskResponse = {
  id: string;
  organization_id: string;
  task_list_id: string;
  parent_task_id: string | null;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: string;
  due_date: string | null;
  due_time: string | null;
  due_at: string | null;
  timezone: string | null;
  is_all_day: boolean;
  is_starred: boolean;
  completed_at: string | null;
  claimed_by_principal_id: string | null;
  claimed_at: string | null;
  claim_expires_at: string | null;
  attempt_count: number;
  max_attempts: number;
  last_error: string | null;
  assignments?: TaskAssignmentResponse[];
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type TaskAssignmentResponse = {
  id: string;
  task_id: string;
  principal_id: string;
  role: TaskAssignmentRole;
  created_at: string;
  updated_at: string;
};

type PrincipalResponse = {
  id: string;
  type: "user" | "agent" | "service_account" | "api_client";
  auth_user_id: string | null;
  name: string;
  slug: string | null;
  status: string;
};

type SortBy = "my" | "date" | "deadline" | "starred" | "title";
type SystemView = "all" | "my" | "agents" | "needs_review" | "failed" | "scheduled" | "starred";

const TASK_SYSTEM_VIEWS: SystemView[] = [
  "all",
  "my",
  "agents",
  "needs_review",
  "failed",
  "scheduled",
  "starred",
];

const isDone = (task: TaskResponse) => task.status === "done" || task.status === "cancelled";
const openStatuses = new Set<TaskStatus>([
  "todo",
  "claimed",
  "in_progress",
  "needs_review",
  "failed",
  "blocked",
  "open",
]);
const taskAssignments = (task: TaskResponse) => task.assignments ?? [];

function TasksPage() {
  const navigate = useNavigate();
  const [lists, setLists] = useState<TaskListResponse[]>([]);
  const [tasksByList, setTasksByList] = useState<Record<string, TaskResponse[]>>({});
  const [principals, setPrincipals] = useState<PrincipalResponse[]>([]);
  const [sortByList, setSortByList] = useState<Record<string, SortBy>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState<SystemView | string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [listsExpanded, setListsExpanded] = useState(true);

  const [createListOpen, setCreateListOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [savingList, setSavingList] = useState(false);

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [taskDialogListId, setTaskDialogListId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskAllDay, setTaskAllDay] = useState(false);
  const [taskStatus, setTaskStatus] = useState<TaskStatus>("todo");
  const [taskParentId, setTaskParentId] = useState<string>("none");
  const [taskPrincipalId, setTaskPrincipalId] = useState<string>("none");
  const [taskAssignmentRole, setTaskAssignmentRole] = useState<TaskAssignmentRole>("assignee");
  const [savingTask, setSavingTask] = useState(false);

  const [renameOpen, setRenameOpen] = useState(false);
  const [renameListId, setRenameListId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 60 * 1000,
  });
  const tasksServer = catalog?.find((server) => server.slug === "tasks");

  const handleApiError = useCallback(
    (err: unknown, fallback = "Tasks request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const listPage = await apiRequest<Page<TaskListResponse>>(
        "/api/v1/tasks/lists?limit=200&sort=sort_order&direction=asc",
      );
      const principalPage = await apiRequest<Page<PrincipalResponse>>(
        "/api/v1/principals?limit=200",
      );
      const taskPages = await Promise.all(
        listPage.items.map((list) =>
          apiRequest<Page<TaskResponse>>(
            `/api/v1/tasks?task_list_id=${list.id}&limit=500&sort=sort_order&direction=asc`,
          ),
        ),
      );
      const byList: Record<string, TaskResponse[]> = {};
      listPage.items.forEach((list, index) => {
        byList[list.id] = taskPages[index].items;
      });
      setLists(listPage.items);
      setPrincipals(principalPage.items);
      setTasksByList(byList);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);

  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  const defaultListId = useMemo(() => {
    const def = lists.find((l) => l.is_default);
    return def?.id ?? lists[0]?.id ?? null;
  }, [lists]);

  const visibleLists = useMemo(() => {
    if (TASK_SYSTEM_VIEWS.includes(view as SystemView)) return lists;
    return lists.filter((l) => l.id === view);
  }, [lists, view]);

  const principalById = useMemo(
    () => new Map(principals.map((principal) => [principal.id, principal])),
    [principals],
  );
  const myPrincipal = useMemo(
    () => principals.find((principal) => principal.type === "user") ?? null,
    [principals],
  );
  const allTasks = useMemo(() => Object.values(tasksByList).flat(), [tasksByList]);
  const editingTask = useMemo(
    () => allTasks.find((task) => task.id === editingTaskId) ?? null,
    [allTasks, editingTaskId],
  );
  const editingTaskIsSubtask = editingTask?.parent_task_id !== null && editingTask !== null;

  const sortedTasks = useCallback(
    (list: TaskListResponse) => {
      const tasks = [...(tasksByList[list.id] ?? [])];
      const filtered = tasks.filter((task) => {
        if (view === "starred") return task.is_starred;
        if (view === "my") {
          return (
            !!myPrincipal && taskAssignments(task).some((a) => a.principal_id === myPrincipal.id)
          );
        }
        if (view === "agents") {
          return taskAssignments(task).some(
            (a) => principalById.get(a.principal_id)?.type === "agent",
          );
        }
        if (view === "needs_review") return task.status === "needs_review";
        if (view === "failed") return task.status === "failed";
        if (view === "scheduled") return !!task.due_date;
        return true;
      });
      tasks.splice(0, tasks.length, ...filtered);
      const sortBy = sortByList[list.id] ?? "my";
      switch (sortBy) {
        case "title":
          tasks.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "date":
        case "deadline":
          tasks.sort((a, b) => (a.due_date || "").localeCompare(b.due_date || ""));
          break;
        case "starred":
          tasks.sort((a, b) => Number(b.is_starred) - Number(a.is_starred));
          break;
      }
      return tasks;
    },
    [myPrincipal, principalById, tasksByList, sortByList, view],
  );

  const upsertTask = (task: TaskResponse) => {
    setTasksByList((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((listId) => {
        next[listId] = next[listId].filter((t) => t.id !== task.id);
      });
      next[task.task_list_id] = [task, ...(next[task.task_list_id] ?? [])];
      return next;
    });
  };

  const openNewTask = (listId: string | null, parentTaskId: string | null = null) => {
    if (!listId) return;
    setEditingTaskId(null);
    setTaskDialogListId(listId);
    setTaskTitle("");
    setTaskDesc("");
    const now = new Date();
    setTaskDate(now.toISOString().slice(0, 10));
    setTaskTime("20:00");
    setTaskAllDay(false);
    setTaskStatus("todo");
    setTaskParentId(parentTaskId ?? "none");
    setTaskPrincipalId("none");
    setTaskAssignmentRole("assignee");
    setTaskDialogOpen(true);
  };

  const openNewSubtask = (parentTask: TaskResponse) => {
    openNewTask(parentTask.task_list_id, parentTask.id);
  };

  const openEditTask = (task: TaskResponse) => {
    setEditingTaskId(task.id);
    setTaskDialogListId(task.task_list_id);
    setTaskTitle(task.title);
    setTaskDesc(task.description || "");
    setTaskDate(task.due_date || "");
    setTaskTime(task.due_time ? task.due_time.slice(0, 5) : "");
    setTaskAllDay(task.is_all_day || !task.due_time);
    setTaskStatus(task.status === "open" ? "todo" : task.status);
    setTaskParentId(task.parent_task_id || "none");
    const assignments = taskAssignments(task);
    const assignment = assignments.find((a) => a.role === "assignee") ?? assignments[0];
    setTaskPrincipalId(assignment?.principal_id ?? "none");
    setTaskAssignmentRole(assignment?.role ?? "assignee");
    setTaskDialogOpen(true);
  };

  const saveTask = async () => {
    const title = taskTitle.trim();
    if (!title || !taskDialogListId) return;
    setSavingTask(true);
    try {
      const payload = {
        title,
        description: taskDesc.trim() || null,
        due_date: taskDate || null,
        due_time: taskAllDay ? null : taskTime || null,
        is_all_day: taskAllDay,
        status: taskStatus,
        parent_task_id: taskParentId === "none" ? null : taskParentId,
        assignments:
          taskPrincipalId === "none"
            ? []
            : [{ principal_id: taskPrincipalId, role: taskAssignmentRole }],
      };
      let task: TaskResponse;
      if (editingTaskId) {
        task = await apiRequest<TaskResponse>(`/api/v1/tasks/${editingTaskId}`, {
          method: "PATCH",
          body: JSON.stringify({ ...payload, task_list_id: taskDialogListId }),
        });
      } else {
        task = await apiRequest<TaskResponse>("/api/v1/tasks", {
          method: "POST",
          body: JSON.stringify({ ...payload, task_list_id: taskDialogListId }),
        });
      }
      upsertTask(task);
      setTaskDialogOpen(false);
    } catch (err) {
      handleApiError(err, "Unable to save task");
    } finally {
      setSavingTask(false);
    }
  };

  const toggleDone = async (task: TaskResponse) => {
    const nextStatus: TaskStatus = isDone(task) ? "todo" : "done";
    // Optimistic update.
    setTasksByList((prev) => ({
      ...prev,
      [task.task_list_id]: prev[task.task_list_id].map((t) =>
        t.id === task.id ? { ...t, status: nextStatus } : t,
      ),
    }));
    try {
      const updated = await apiRequest<TaskResponse>(`/api/v1/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus }),
      });
      setTasksByList((prev) => ({
        ...prev,
        [task.task_list_id]: prev[task.task_list_id].map((t) =>
          t.id === updated.id ? updated : t,
        ),
      }));
    } catch (err) {
      void loadTasks();
      handleApiError(err, "Unable to update task");
    }
  };

  const toggleStar = async (task: TaskResponse) => {
    const next = !task.is_starred;
    setTasksByList((prev) => ({
      ...prev,
      [task.task_list_id]: prev[task.task_list_id].map((t) =>
        t.id === task.id ? { ...t, is_starred: next } : t,
      ),
    }));
    try {
      await apiRequest<TaskResponse>(`/api/v1/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({ is_starred: next }),
      });
    } catch (err) {
      void loadTasks();
      handleApiError(err, "Unable to update task");
    }
  };

  const createList = async () => {
    const name = newListName.trim();
    if (!name) return;
    setSavingList(true);
    try {
      const list = await apiRequest<TaskListResponse>("/api/v1/tasks/lists", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      setLists((prev) => [...prev, list]);
      setTasksByList((prev) => ({ ...prev, [list.id]: [] }));
      setNewListName("");
      setCreateListOpen(false);
    } catch (err) {
      handleApiError(err, "Unable to create list");
    } finally {
      setSavingList(false);
    }
  };

  const renameList = async () => {
    const name = renameValue.trim();
    if (!renameListId || !name) return;
    setSavingList(true);
    try {
      const list = await apiRequest<TaskListResponse>(`/api/v1/tasks/lists/${renameListId}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
      });
      setLists((prev) => prev.map((l) => (l.id === list.id ? list : l)));
      setRenameOpen(false);
    } catch (err) {
      handleApiError(err, "Unable to rename list");
    } finally {
      setSavingList(false);
    }
  };

  const deleteList = async (list: TaskListResponse) => {
    if (list.is_default) return;
    try {
      await apiRequest<void>(`/api/v1/tasks/lists/${list.id}`, { method: "DELETE" });
      setLists((prev) => prev.filter((l) => l.id !== list.id));
      setTasksByList((prev) => {
        const next = { ...prev };
        delete next[list.id];
        return next;
      });
      if (view === list.id) setView("all");
    } catch (err) {
      handleApiError(err, "Unable to delete list");
    }
  };

  const deleteCompleted = async (list: TaskListResponse) => {
    const done = (tasksByList[list.id] ?? []).filter(isDone);
    if (done.length === 0) return;
    try {
      await Promise.all(
        done.map((t) => apiRequest<void>(`/api/v1/tasks/${t.id}`, { method: "DELETE" })),
      );
      setTasksByList((prev) => ({
        ...prev,
        [list.id]: prev[list.id].filter((t) => !isDone(t)),
      }));
    } catch (err) {
      handleApiError(err, "Unable to delete completed tasks");
    }
  };

  const setSort = (listId: string, sortBy: SortBy) => {
    setSortByList((prev) => ({ ...prev, [listId]: sortBy }));
  };

  const openTaskListId = lists.some((list) => list.id === view) ? view : defaultListId;

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      {/* Top bar */}
      <header className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-medium tracking-tight">Tasks</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {tasksServer && (
            <div className="mr-1">
              <EnableMcpServerButton
                serverSlug={tasksServer.slug}
                enabled={tasksServer.enabled}
                toolkitIds={tasksServer.toolkit_ids}
              />
            </div>
          )}
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Search">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <PlaygroundHeaderButton /><AppsMenu />
          <AccountMenu />
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <Button
              disabled={loading || !openTaskListId}
              onClick={() => openNewTask(openTaskListId)}
              className="mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg"
            >
              <Plus className="mr-1 h-5 w-5" /> Create
            </Button>

            <nav className="space-y-1">
              <SidebarItem
                icon={<CheckCircle2 className="h-5 w-5" />}
                label="All tasks"
                active={view === "all"}
                onClick={() => setView("all")}
              />
              <SidebarItem
                icon={<UserRound className="h-5 w-5" />}
                label="My tasks"
                active={view === "my"}
                onClick={() => setView("my")}
              />
              <SidebarItem
                icon={<Bot className="h-5 w-5" />}
                label="Assigned to agents"
                active={view === "agents"}
                onClick={() => setView("agents")}
              />
              <SidebarItem
                icon={<CheckSquare className="h-5 w-5" />}
                label="Needs review"
                active={view === "needs_review"}
                onClick={() => setView("needs_review")}
              />
              <SidebarItem
                icon={<AlertTriangle className="h-5 w-5" />}
                label="Failed"
                active={view === "failed"}
                onClick={() => setView("failed")}
              />
              <SidebarItem
                icon={<CalendarClock className="h-5 w-5" />}
                label="Scheduled"
                active={view === "scheduled"}
                onClick={() => setView("scheduled")}
              />
              <SidebarItem
                icon={<Star className="h-5 w-5" />}
                label="Starred"
                active={view === "starred"}
                onClick={() => setView("starred")}
              />
              <SidebarItem
                icon={<KeyRound className="h-5 w-5" />}
                label="Permissions"
                onClick={() => void navigate({ to: "/tasks/permissions" })}
              />
              <SidebarItem
                icon={<Activity className="h-5 w-5" />}
                label="Activity"
                onClick={() => void navigate({ to: "/tasks/activity" })}
              />
              <SidebarItem
                icon={<Gauge className="h-5 w-5" />}
                label="Uptime"
                onClick={() => void navigate({ to: "/tasks/uptime" })}
              />
            </nav>

            <div className="mt-6">
              <button
                onClick={() => setListsExpanded((e) => !e)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/60"
              >
                <span>Lists</span>
                <ChevronUp
                  className={cn("h-4 w-4 transition-transform", !listsExpanded && "rotate-180")}
                />
              </button>
              {listsExpanded && (
                <div className="mt-1 space-y-1">
                  {loading ? (
                    <SidebarListsSkeleton />
                  ) : (
                    lists.map((l) => {
                      const open = (tasksByList[l.id] ?? []).filter((t) =>
                        openStatuses.has(t.status),
                      ).length;
                      return (
                        <button
                          key={l.id}
                          onClick={() => setView(l.id)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                            view === l.id ? "bg-sky-100 text-sky-900" : "hover:bg-white/60",
                          )}
                        >
                          <CheckSquare className="h-5 w-5 text-foreground/70" />
                          <span className="flex-1 truncate text-left">{l.name}</span>
                          <span className="text-xs text-muted-foreground">{open}</span>
                        </button>
                      );
                    })
                  )}
                  <button
                    onClick={() => setCreateListOpen(true)}
                    className="flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm text-foreground/80 transition hover:bg-white/60"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Create new list</span>
                  </button>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 px-4 pb-16 md:px-6">
          {error && (
            <div
              className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
              role="alert"
            >
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex flex-wrap gap-5">
              <TaskListSkeleton />
              <TaskListSkeleton />
            </div>
          ) : (
            <div className="flex flex-wrap gap-5">
              {visibleLists.map((list) => {
                const tasks = sortedTasks(list);
                const taskIds = new Set(tasks.map((task) => task.id));
                const parentTasks = tasks.filter(
                  (task) => !task.parent_task_id || !taskIds.has(task.parent_task_id),
                );
                const showEmpty = view === "starred" && tasks.length === 0;
                const sortBy = sortByList[list.id] ?? "my";
                return (
                  <section
                    key={list.id}
                    className="w-full max-w-[360px] flex-1 basis-[320px] rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)]"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h2 className="text-lg font-medium tracking-tight">{list.name}</h2>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 rounded-xl p-1">
                          <DropdownMenuLabel className="px-3 pt-2 text-xs font-medium text-foreground">
                            Sort by
                          </DropdownMenuLabel>
                          {(
                            [
                              ["my", "My order"],
                              ["date", "Date"],
                              ["deadline", "Deadline"],
                              ["starred", "Starred recently"],
                              ["title", "Title"],
                            ] as const
                          ).map(([key, label]) => (
                            <DropdownMenuItem
                              key={key}
                              onClick={() => setSort(list.id, key)}
                              className="gap-3 rounded-lg pl-8 pr-3"
                            >
                              {sortBy === key && <Check className="absolute left-3 h-4 w-4" />}
                              {label}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setRenameListId(list.id);
                              setRenameValue(list.name);
                              setRenameOpen(true);
                            }}
                            className="rounded-lg"
                          >
                            Rename list
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={list.is_default}
                            onClick={() => deleteList(list)}
                            className="flex-col items-start gap-0 rounded-lg"
                          >
                            <span>Delete list</span>
                            {list.is_default && (
                              <span className="text-xs text-muted-foreground">
                                The default list can't be deleted
                              </span>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => window.print()} className="rounded-lg">
                            Print list
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={!(tasksByList[list.id] ?? []).some(isDone)}
                            onClick={() => deleteCompleted(list)}
                            className="rounded-lg"
                          >
                            Delete all completed tasks
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <button
                      onClick={() => openNewTask(list.id)}
                      className="mb-2 flex w-full items-center gap-3 rounded-lg py-2 text-sky-600 transition hover:bg-sky-50"
                    >
                      <span className="relative">
                        <Circle className="h-5 w-5" />
                        <Plus className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-white" />
                      </span>
                      <span className="font-medium">Add a task</span>
                    </button>

                    {showEmpty ? (
                      <EmptyState />
                    ) : (
                      <ul className="space-y-1">
                        {parentTasks.map((t) => {
                          const done = isDone(t);
                          const assignment = taskAssignments(t)[0];
                          const assignee = assignment
                            ? principalById.get(assignment.principal_id)
                            : null;
                          const subtasks = tasks.filter((task) => task.parent_task_id === t.id);
                          const childCount = subtasks.length;
                          return (
                            <li key={t.id} className="group rounded-lg px-1 py-2 hover:bg-stone-50">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => toggleDone(t)}
                                  className="shrink-0"
                                  aria-label="Toggle complete"
                                >
                                  {done ? (
                                    <CheckCircle className="h-5 w-5 text-sky-600" />
                                  ) : (
                                    <Circle className="h-5 w-5 text-foreground/40 transition hover:text-foreground" />
                                  )}
                                </button>
                                <button
                                  onClick={() => openEditTask(t)}
                                  className="flex-1 text-left"
                                >
                                  <div
                                    className={cn(
                                      "text-sm",
                                      done && "text-muted-foreground line-through",
                                    )}
                                  >
                                    {t.title}
                                  </div>
                                  {(t.due_date || t.description) && (
                                    <div className="text-xs text-muted-foreground">
                                      {t.due_date}
                                      {t.due_time && !t.is_all_day
                                        ? ` · ${t.due_time.slice(0, 5)}`
                                        : ""}
                                      {t.description ? ` · ${t.description}` : ""}
                                    </div>
                                  )}
                                  <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                                    <span className="rounded-full bg-stone-100 px-2 py-0.5">
                                      {t.status.replace("_", " ")}
                                    </span>
                                    {assignee && (
                                      <span className="rounded-full bg-sky-50 px-2 py-0.5 text-sky-700">
                                        {assignment.role}: {assignee.name}
                                      </span>
                                    )}
                                    {t.claimed_by_principal_id && (
                                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-700">
                                        claimed
                                      </span>
                                    )}
                                    {childCount > 0 && (
                                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">
                                        {childCount} subtasks
                                      </span>
                                    )}
                                  </div>
                                </button>
                                <button
                                  onClick={() => toggleStar(t)}
                                  className={cn(
                                    "shrink-0 opacity-0 transition group-hover:opacity-100",
                                    t.is_starred && "opacity-100",
                                  )}
                                  aria-label="Star"
                                >
                                  <Star
                                    className={cn(
                                      "h-4 w-4",
                                      t.is_starred
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-muted-foreground",
                                    )}
                                  />
                                </button>
                              </div>

                              {subtasks.length > 0 && (
                                <ul className="mt-2 space-y-1 border-l border-stone-200 pl-5">
                                  {subtasks.map((subtask) => {
                                    const subtaskDone = isDone(subtask);
                                    return (
                                      <li key={subtask.id} className="flex items-center gap-2">
                                        <button
                                          onClick={() => toggleDone(subtask)}
                                          className="shrink-0"
                                          aria-label="Toggle subtask complete"
                                        >
                                          {subtaskDone ? (
                                            <CheckCircle className="h-4 w-4 text-sky-600" />
                                          ) : (
                                            <Circle className="h-4 w-4 text-foreground/40 transition hover:text-foreground" />
                                          )}
                                        </button>
                                        <button
                                          onClick={() => openEditTask(subtask)}
                                          className={cn(
                                            "min-w-0 flex-1 truncate text-left text-xs",
                                            subtaskDone && "text-muted-foreground line-through",
                                          )}
                                        >
                                          {subtask.title}
                                        </button>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </section>
                );
              })}

              <button
                onClick={() => setCreateListOpen(true)}
                className="grid h-[120px] w-full max-w-[360px] flex-1 basis-[320px] place-items-center rounded-2xl border-2 border-dashed border-stone-200 text-muted-foreground transition hover:border-sky-300 hover:text-sky-600"
              >
                <span className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create new list
                </span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Create list dialog */}
      <Dialog open={createListOpen} onOpenChange={setCreateListOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create new list</DialogTitle>
          </DialogHeader>
          <Input
            autoFocus
            placeholder="Enter name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createList()}
            className="border-0 border-b-2 border-sky-500 rounded-none focus-visible:ring-0 focus-visible:border-sky-500"
          />
          <DialogFooter className="sm:justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setCreateListOpen(false)}
              className="text-sky-600"
            >
              Cancel
            </Button>
            <Button
              onClick={createList}
              disabled={!newListName.trim() || savingList}
              variant="ghost"
              className="text-sky-600 disabled:text-muted-foreground"
            >
              {savingList ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename list dialog */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename list</DialogTitle>
          </DialogHeader>
          <Input
            autoFocus
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && renameList()}
            className="border-0 border-b-2 border-sky-500 rounded-none focus-visible:ring-0 focus-visible:border-sky-500"
          />
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setRenameOpen(false)} className="text-sky-600">
              Cancel
            </Button>
            <Button
              onClick={renameList}
              disabled={!renameValue.trim() || savingList}
              variant="ghost"
              className="text-sky-600"
            >
              {savingList ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="rounded-2xl sm:max-w-xl">
          <Input
            autoFocus
            placeholder="Add title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="border-0 border-b-2 border-sky-500 rounded-none text-xl h-12 px-0 focus-visible:ring-0 focus-visible:border-sky-500"
          />
          <div className="space-y-4 pt-2">
            <div className="flex items-start gap-4">
              <Clock className="mt-2 h-5 w-5 text-muted-foreground" />
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <DatePicker
                    value={taskDate}
                    onChange={setTaskDate}
                    placeholder="Pick a date"
                    className="flex-1"
                  />
                  {!taskAllDay && (
                    <Input
                      type="time"
                      value={taskTime}
                      onChange={(e) => setTaskTime(e.target.value)}
                      className="bg-stone-100 border-0 rounded-lg w-32"
                    />
                  )}
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={taskAllDay} onCheckedChange={(v) => setTaskAllDay(!!v)} />
                  All day
                </label>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <AlignLeft className="mt-2 h-5 w-5 text-muted-foreground" />
              <Textarea
                placeholder="Add description"
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                className="bg-stone-100 border-0 rounded-lg min-h-[90px]"
              />
            </div>
            <div className="flex items-center gap-4">
              <ListChecks className="h-5 w-5 text-muted-foreground" />
              <Select
                value={taskDialogListId || undefined}
                onValueChange={(v) => setTaskDialogListId(v)}
              >
                <SelectTrigger className="bg-stone-100 border-0 rounded-lg w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lists.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Select value={taskStatus} onValueChange={(v) => setTaskStatus(v as TaskStatus)}>
                <SelectTrigger className="bg-stone-100 border-0 rounded-lg">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {(
                    [
                      "todo",
                      "claimed",
                      "in_progress",
                      "needs_review",
                      "failed",
                      "blocked",
                      "done",
                    ] as const
                  ).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={taskParentId} onValueChange={setTaskParentId}>
                <SelectTrigger className="bg-stone-100 border-0 rounded-lg">
                  <SelectValue placeholder="Parent task" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No parent task</SelectItem>
                  {allTasks
                    .filter((task) => task.id !== editingTaskId && task.parent_task_id === null)
                    .map((task) => (
                      <SelectItem key={task.id} value={task.id}>
                        {task.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_150px]">
              <Select value={taskPrincipalId} onValueChange={setTaskPrincipalId}>
                <SelectTrigger className="bg-stone-100 border-0 rounded-lg">
                  <SelectValue placeholder="Assign identity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Unassigned</SelectItem>
                  {principals.map((principal) => (
                    <SelectItem key={principal.id} value={principal.id}>
                      {principal.name} · {principal.type.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={taskAssignmentRole}
                onValueChange={(v) => setTaskAssignmentRole(v as TaskAssignmentRole)}
              >
                <SelectTrigger className="bg-stone-100 border-0 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["assignee", "reviewer", "approver", "watcher"] as const).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {editingTaskId && !editingTaskIsSubtask && (
              <div className="space-y-2 rounded-xl border border-stone-200 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">Subtasks</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 rounded-full text-sky-600"
                    onClick={() => {
                      if (editingTask) openNewSubtask(editingTask);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                    Add task
                  </Button>
                </div>
                {allTasks.filter((task) => task.parent_task_id === editingTaskId).length > 0 ? (
                  <ul className="space-y-1">
                    {allTasks
                      .filter((task) => task.parent_task_id === editingTaskId)
                      .map((subtask) => (
                        <li
                          key={subtask.id}
                          className="flex items-center gap-2 rounded-lg bg-stone-50 px-3 py-2"
                        >
                          <button
                            type="button"
                            onClick={() => toggleDone(subtask)}
                            aria-label="Toggle subtask complete"
                          >
                            {isDone(subtask) ? (
                              <CheckCircle className="h-4 w-4 text-sky-600" />
                            ) : (
                              <Circle className="h-4 w-4 text-foreground/40" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditTask(subtask)}
                            className={cn(
                              "min-w-0 flex-1 truncate text-left text-sm",
                              isDone(subtask) && "text-muted-foreground line-through",
                            )}
                          >
                            {subtask.title}
                          </button>
                          <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-muted-foreground">
                            {subtask.status.replace("_", " ")}
                          </span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-xs text-muted-foreground">No subtasks yet.</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={saveTask}
              disabled={!taskTitle.trim() || savingTask}
              className="rounded-full bg-sky-600 hover:bg-sky-700"
            >
              {savingTask ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition",
        active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60",
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function SidebarListsSkeleton() {
  return (
    <div className="space-y-1" aria-label="Loading lists">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 px-3 py-2">
          <Skeleton className="h-5 w-5 rounded-md" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-4" />
        </div>
      ))}
    </div>
  );
}

function TaskListSkeleton() {
  return (
    <section className="w-full max-w-[360px] flex-1 basis-[320px] rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)]">
      <div className="mb-3 flex items-center justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="mb-3 flex items-center gap-3 py-2">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      <ul className="space-y-1" aria-label="Loading tasks">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className="flex items-center gap-3 px-1 py-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-3 flex items-end gap-1">
        <div className="h-8 w-8 rounded-full bg-rose-100" />
        <div className="h-2 w-12 rounded-full bg-emerald-200" />
      </div>
      <p className="text-sm font-medium text-foreground">No tasks yet</p>
      <p className="mt-1 max-w-[220px] text-xs text-muted-foreground">
        Add your to-dos and keep track of them across your workspace
      </p>
    </div>
  );
}
