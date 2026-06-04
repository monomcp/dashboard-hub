import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Menu,
  CheckCircle2,
  Plus,
  HelpCircle,
  LayoutGrid,
  Star,
  ChevronUp,
  Square,
  CheckSquare,
  MoreVertical,
  Circle,
  CheckCircle,
  X,
  Clock,
  AlignLeft,
  ListChecks,
  Check,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tasks" },
      { name: "description", content: "Organize your day with lists and tasks." },
    ],
  }),
  component: TasksPage,
});

type Task = {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  starred?: boolean;
  dueDate?: string;
  dueTime?: string;
  createdAt: number;
};

type TaskList = {
  id: string;
  name: string;
  tasks: Task[];
  sortBy: "my" | "date" | "deadline" | "starred" | "title";
};

const STORAGE_KEY = "tasks-app-v1";

const defaultLists: TaskList[] = [
  { id: "default", name: "My Tasks", tasks: [], sortBy: "my" },
];

const uid = () => Math.random().toString(36).slice(2, 10);

function loadLists(): TaskList[] {
  if (typeof window === "undefined") return defaultLists;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultLists;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) return parsed;
    return defaultLists;
  } catch {
    return defaultLists;
  }
}

const FAVOURITE_APPS = [
  { name: "Account", color: "bg-stone-500", letter: "C" },
  { name: "Drive", color: "bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400", letter: "△" },
  { name: "Business", color: "bg-gradient-to-br from-blue-400 to-blue-600", letter: "B" },
  { name: "Gmail", color: "bg-gradient-to-br from-red-500 via-yellow-400 to-red-400", letter: "M" },
  { name: "YouTube", color: "bg-red-500", letter: "▶" },
  { name: "Gemini", color: "bg-gradient-to-br from-blue-500 via-fuchsia-500 to-amber-400", letter: "✦" },
  { name: "Maps", color: "bg-gradient-to-br from-green-500 via-yellow-400 to-red-500", letter: "◉" },
  { name: "Search", color: "bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500", letter: "G" },
  { name: "Calendar", color: "bg-sky-500", letter: "31" },
];

const MORE_APPS = [
  { name: "News", color: "bg-blue-500", letter: "N" },
  { name: "Photos", color: "bg-gradient-to-br from-red-400 via-yellow-400 to-green-400", letter: "✿" },
  { name: "Meet", color: "bg-amber-400", letter: "▶" },
  { name: "Translate", color: "bg-gradient-to-br from-blue-500 to-sky-400", letter: "文" },
  { name: "Play", color: "bg-gradient-to-br from-indigo-500 to-violet-500", letter: "▷" },
  { name: "Keep", color: "bg-emerald-500", letter: "+" },
];

function TasksPage() {
  const [lists, setLists] = useState<TaskList[]>(defaultLists);
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<"all" | "starred" | string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [listsExpanded, setListsExpanded] = useState(true);

  const [createListOpen, setCreateListOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [taskDialogListId, setTaskDialogListId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskAllDay, setTaskAllDay] = useState(false);

  const [renameOpen, setRenameOpen] = useState(false);
  const [renameListId, setRenameListId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    setLists(loadLists());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists, hydrated]);

  const visibleLists = useMemo(() => {
    if (view === "all" || view === "starred") return lists;
    return lists.filter((l) => l.id === view);
  }, [lists, view]);

  const sortedTasks = (list: TaskList) => {
    const tasks = [...list.tasks];
    if (view === "starred") {
      return tasks.filter((t) => t.starred);
    }
    switch (list.sortBy) {
      case "title":
        tasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "date":
      case "deadline":
        tasks.sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""));
        break;
      case "starred":
        tasks.sort((a, b) => Number(!!b.starred) - Number(!!a.starred));
        break;
    }
    return tasks;
  };

  const openNewTask = (listId: string) => {
    setEditingTaskId(null);
    setTaskDialogListId(listId);
    setTaskTitle("");
    setTaskDesc("");
    const now = new Date();
    setTaskDate(now.toISOString().slice(0, 10));
    setTaskTime("20:00");
    setTaskAllDay(false);
    setTaskDialogOpen(true);
  };

  const openEditTask = (listId: string, task: Task) => {
    setEditingTaskId(task.id);
    setTaskDialogListId(listId);
    setTaskTitle(task.title);
    setTaskDesc(task.description || "");
    setTaskDate(task.dueDate || "");
    setTaskTime(task.dueTime || "");
    setTaskAllDay(!task.dueTime);
    setTaskDialogOpen(true);
  };

  const saveTask = () => {
    if (!taskTitle.trim() || !taskDialogListId) return;
    setLists((prev) =>
      prev.map((l) => {
        if (l.id !== taskDialogListId) return l;
        if (editingTaskId) {
          return {
            ...l,
            tasks: l.tasks.map((t) =>
              t.id === editingTaskId
                ? {
                    ...t,
                    title: taskTitle.trim(),
                    description: taskDesc.trim() || undefined,
                    dueDate: taskDate || undefined,
                    dueTime: taskAllDay ? undefined : taskTime || undefined,
                  }
                : t,
            ),
          };
        }
        return {
          ...l,
          tasks: [
            {
              id: uid(),
              title: taskTitle.trim(),
              description: taskDesc.trim() || undefined,
              done: false,
              dueDate: taskDate || undefined,
              dueTime: taskAllDay ? undefined : taskTime || undefined,
              createdAt: Date.now(),
            },
            ...l.tasks,
          ],
        };
      }),
    );
    setTaskDialogOpen(false);
  };

  const toggleDone = (listId: string, taskId: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, tasks: l.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
          : l,
      ),
    );
  };

  const toggleStar = (listId: string, taskId: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, tasks: l.tasks.map((t) => (t.id === taskId ? { ...t, starred: !t.starred } : t)) }
          : l,
      ),
    );
  };

  const createList = () => {
    const name = newListName.trim();
    if (!name) return;
    const newList: TaskList = { id: uid(), name, tasks: [], sortBy: "my" };
    setLists((prev) => [...prev, newList]);
    setNewListName("");
    setCreateListOpen(false);
  };

  const renameList = () => {
    if (!renameListId) return;
    const name = renameValue.trim();
    if (!name) return;
    setLists((prev) => prev.map((l) => (l.id === renameListId ? { ...l, name } : l)));
    setRenameOpen(false);
  };

  const deleteList = (id: string) => {
    if (id === "default") return;
    setLists((prev) => prev.filter((l) => l.id !== id));
    if (view === id) setView("all");
  };

  const deleteCompleted = (id: string) => {
    setLists((prev) =>
      prev.map((l) => (l.id === id ? { ...l, tasks: l.tasks.filter((t) => !t.done) } : l)),
    );
  };

  const setSort = (id: string, sortBy: TaskList["sortBy"]) => {
    setLists((prev) => prev.map((l) => (l.id === id ? { ...l, sortBy } : l)));
  };

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
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Apps">
                <LayoutGrid className="h-5 w-5 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-[340px] rounded-3xl border-none bg-[hsl(220,33%,97%)] p-5 shadow-2xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-medium">Your favourites</h3>
                <Button variant="ghost" size="icon" className="rounded-full bg-sky-100/70">
                  <Pencil className="h-4 w-4 text-sky-700" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-y-4">
                {APPS.map((app) => (
                  <button
                    key={app.name}
                    className="flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-white"
                  >
                    <div
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-full text-white font-semibold shadow-sm",
                        app.color,
                      )}
                    >
                      {app.letter}
                    </div>
                    <span className="text-xs text-foreground/80">{app.name}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <div className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-stone-500 text-sm font-medium text-white">
            C
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <Button
              onClick={() => openNewTask(view === "all" || view === "starred" ? lists[0].id : view)}
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
                icon={<Star className="h-5 w-5" />}
                label="Starred"
                active={view === "starred"}
                onClick={() => setView("starred")}
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
                  {lists.map((l) => (
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
                      <span className="text-xs text-muted-foreground">{l.tasks.length}</span>
                    </button>
                  ))}
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
          <div className="flex flex-wrap gap-5">
            {visibleLists.map((list) => {
              const tasks = sortedTasks(list);
              const showEmpty = view === "starred" && tasks.length === 0;
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
                            {list.sortBy === key && (
                              <Check className="absolute left-3 h-4 w-4" />
                            )}
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
                          disabled={list.id === "default"}
                          onClick={() => deleteList(list.id)}
                          className="flex-col items-start gap-0 rounded-lg"
                        >
                          <span>Delete list</span>
                          {list.id === "default" && (
                            <span className="text-xs text-muted-foreground">
                              The default list can't be deleted
                            </span>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => window.print()}
                          className="rounded-lg"
                        >
                          Print list
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={!list.tasks.some((t) => t.done)}
                          onClick={() => deleteCompleted(list.id)}
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
                      {tasks.map((t) => (
                        <li
                          key={t.id}
                          className="group flex items-center gap-3 rounded-lg px-1 py-2 hover:bg-stone-50"
                        >
                          <button
                            onClick={() => toggleDone(list.id, t.id)}
                            className="shrink-0"
                            aria-label="Toggle complete"
                          >
                            {t.done ? (
                              <CheckCircle className="h-5 w-5 text-sky-600" />
                            ) : (
                              <Circle className="h-5 w-5 text-foreground/40 transition hover:text-foreground" />
                            )}
                          </button>
                          <button
                            onClick={() => openEditTask(list.id, t)}
                            className="flex-1 text-left"
                          >
                            <div
                              className={cn(
                                "text-sm",
                                t.done && "text-muted-foreground line-through",
                              )}
                            >
                              {t.title}
                            </div>
                            {(t.dueDate || t.description) && (
                              <div className="text-xs text-muted-foreground">
                                {t.dueDate}
                                {t.dueTime ? ` · ${t.dueTime}` : ""}
                                {t.description ? ` · ${t.description}` : ""}
                              </div>
                            )}
                          </button>
                          <button
                            onClick={() => toggleStar(list.id, t.id)}
                            className={cn(
                              "shrink-0 opacity-0 transition group-hover:opacity-100",
                              t.starred && "opacity-100",
                            )}
                            aria-label="Star"
                          >
                            <Star
                              className={cn(
                                "h-4 w-4",
                                t.starred
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-muted-foreground",
                              )}
                            />
                          </button>
                        </li>
                      ))}
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
            <Button variant="ghost" onClick={() => setCreateListOpen(false)} className="text-sky-600">
              Cancel
            </Button>
            <Button
              onClick={createList}
              disabled={!newListName.trim()}
              variant="ghost"
              className="text-sky-600 disabled:text-muted-foreground"
            >
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
            <Button onClick={renameList} variant="ghost" className="text-sky-600">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Task dialog */}
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="rounded-2xl sm:max-w-xl">
          <button
            onClick={() => setTaskDialogOpen(false)}
            className="absolute right-4 top-4 rounded-full p-1 hover:bg-stone-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
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
                  <Input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    className="bg-stone-100 border-0 rounded-lg"
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
                  <Checkbox
                    checked={taskAllDay}
                    onCheckedChange={(v) => setTaskAllDay(!!v)}
                  />
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
          </div>
          <DialogFooter>
            <Button
              onClick={saveTask}
              disabled={!taskTitle.trim()}
              className="rounded-full bg-sky-600 hover:bg-sky-700"
            >
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
