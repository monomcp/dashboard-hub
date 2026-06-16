import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as Button, b as buttonVariants } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { S as Skeleton } from "./skeleton-CoUJiN10.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-CmGvlKcs.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-3sxYre98.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, e as DropdownMenuLabel, c as DropdownMenuItem, d as DropdownMenuSeparator } from "./dropdown-menu-DmTKMmfc.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { C as Checkbox } from "./checkbox-mmp_duDa.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-ColJhc-i.mjs";
import { A as ApiError, c as clearAuthTokens, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { M as Menu, o as CircleCheck, a as Search, c as CircleQuestionMark, N as Plus, v as Star, C as ChevronUp, aw as SquareCheckBig, k as EllipsisVertical, a9 as Check, ay as Circle, az as CircleCheckBig, ae as LoaderCircle, ac as Clock, aA as TextAlignStart, L as ListChecks, au as CalendarDays, av as ChevronLeft, X as ChevronRight, O as ChevronDown } from "../_libs/lucide-react.mjs";
import { f as format, H as parse, I as isValid } from "../_libs/date-fns.mjs";
import { g as getDefaultClassNames, D as DayPicker } from "../_libs/react-day-picker.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/date-fns__tz.mjs";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-slot": "calendar", ref: rootRef, className: cn(className2), ...props2 });
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: cn("size-4", className2), ...props2 });
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { ...props2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
function toDate(value) {
  if (!value) return void 0;
  const parsed = parse(value, "yyyy-MM-dd", /* @__PURE__ */ new Date());
  return isValid(parsed) ? parsed : void 0;
}
function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className
}) {
  const [open, setOpen] = reactExports.useState(false);
  const selected = toDate(value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        className: cn(
          "h-10 w-full justify-start gap-2 rounded-lg bg-stone-100 px-3 font-normal hover:bg-stone-200/70",
          !selected && "text-muted-foreground",
          className
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-muted-foreground" }),
          selected ? format(selected, "EEE, MMM d, yyyy") : placeholder
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { align: "start", className: "w-auto rounded-2xl p-2 shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Calendar,
        {
          mode: "single",
          selected,
          defaultMonth: selected,
          onSelect: (date) => {
            if (date) onChange(format(date, "yyyy-MM-dd"));
            setOpen(false);
          },
          autoFocus: true,
          classNames: {
            today: "rounded-md font-medium text-sky-600"
          },
          className: "[--cell-size:2.25rem] [&_[data-selected-single=true]]:bg-sky-600 [&_[data-selected-single=true]]:text-white [&_[data-selected-single=true]]:hover:bg-sky-700"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1 pb-1 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-8 rounded-full px-3 text-sm text-sky-600 hover:bg-sky-50 hover:text-sky-700",
            onClick: () => {
              onChange("");
              setOpen(false);
            },
            children: "Clear"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-8 rounded-full px-3 text-sm text-sky-600 hover:bg-sky-50 hover:text-sky-700",
            onClick: () => {
              onChange(format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"));
              setOpen(false);
            },
            children: "Today"
          }
        )
      ] })
    ] })
  ] });
}
const isDone = (task) => task.status === "done" || task.status === "cancelled";
function TasksPage() {
  const navigate = useNavigate();
  const [lists, setLists] = reactExports.useState([]);
  const [tasksByList, setTasksByList] = reactExports.useState({});
  const [sortByList, setSortByList] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState("");
  const [view, setView] = reactExports.useState("all");
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [listsExpanded, setListsExpanded] = reactExports.useState(true);
  const [createListOpen, setCreateListOpen] = reactExports.useState(false);
  const [newListName, setNewListName] = reactExports.useState("");
  const [savingList, setSavingList] = reactExports.useState(false);
  const [taskDialogOpen, setTaskDialogOpen] = reactExports.useState(false);
  const [taskDialogListId, setTaskDialogListId] = reactExports.useState(null);
  const [editingTaskId, setEditingTaskId] = reactExports.useState(null);
  const [taskTitle, setTaskTitle] = reactExports.useState("");
  const [taskDesc, setTaskDesc] = reactExports.useState("");
  const [taskDate, setTaskDate] = reactExports.useState("");
  const [taskTime, setTaskTime] = reactExports.useState("");
  const [taskAllDay, setTaskAllDay] = reactExports.useState(false);
  const [savingTask, setSavingTask] = reactExports.useState(false);
  const [renameOpen, setRenameOpen] = reactExports.useState(false);
  const [renameListId, setRenameListId] = reactExports.useState(null);
  const [renameValue, setRenameValue] = reactExports.useState("");
  const handleApiError = reactExports.useCallback((err, fallback = "Tasks request failed") => {
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
  const loadTasks = reactExports.useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const listPage = await apiRequest("/api/v1/tasks/lists?limit=200&sort=sort_order&direction=asc");
      const taskPages = await Promise.all(listPage.items.map((list) => apiRequest(`/api/v1/tasks?task_list_id=${list.id}&limit=500&sort=sort_order&direction=asc`)));
      const byList = {};
      listPage.items.forEach((list, index) => {
        byList[list.id] = taskPages[index].items;
      });
      setLists(listPage.items);
      setTasksByList(byList);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [handleApiError]);
  reactExports.useEffect(() => {
    void loadTasks();
  }, [loadTasks]);
  const defaultListId = reactExports.useMemo(() => {
    const def = lists.find((l) => l.is_default);
    return def?.id ?? lists[0]?.id ?? null;
  }, [lists]);
  const visibleLists = reactExports.useMemo(() => {
    if (view === "all" || view === "starred") return lists;
    return lists.filter((l) => l.id === view);
  }, [lists, view]);
  const sortedTasks = reactExports.useCallback((list) => {
    const tasks = [...tasksByList[list.id] ?? []];
    if (view === "starred") {
      return tasks.filter((t) => t.is_starred);
    }
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
  }, [tasksByList, sortByList, view]);
  const upsertTask = (task) => {
    setTasksByList((prev) => {
      const next = {
        ...prev
      };
      Object.keys(next).forEach((listId) => {
        next[listId] = next[listId].filter((t) => t.id !== task.id);
      });
      next[task.task_list_id] = [task, ...next[task.task_list_id] ?? []];
      return next;
    });
  };
  const openNewTask = (listId) => {
    if (!listId) return;
    setEditingTaskId(null);
    setTaskDialogListId(listId);
    setTaskTitle("");
    setTaskDesc("");
    const now = /* @__PURE__ */ new Date();
    setTaskDate(now.toISOString().slice(0, 10));
    setTaskTime("20:00");
    setTaskAllDay(false);
    setTaskDialogOpen(true);
  };
  const openEditTask = (task) => {
    setEditingTaskId(task.id);
    setTaskDialogListId(task.task_list_id);
    setTaskTitle(task.title);
    setTaskDesc(task.description || "");
    setTaskDate(task.due_date || "");
    setTaskTime(task.due_time ? task.due_time.slice(0, 5) : "");
    setTaskAllDay(task.is_all_day || !task.due_time);
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
        is_all_day: taskAllDay
      };
      let task;
      if (editingTaskId) {
        task = await apiRequest(`/api/v1/tasks/${editingTaskId}`, {
          method: "PATCH",
          body: JSON.stringify({
            ...payload,
            task_list_id: taskDialogListId
          })
        });
      } else {
        task = await apiRequest("/api/v1/tasks", {
          method: "POST",
          body: JSON.stringify({
            ...payload,
            task_list_id: taskDialogListId
          })
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
  const toggleDone = async (task) => {
    const nextStatus = isDone(task) ? "open" : "done";
    setTasksByList((prev) => ({
      ...prev,
      [task.task_list_id]: prev[task.task_list_id].map((t) => t.id === task.id ? {
        ...t,
        status: nextStatus
      } : t)
    }));
    try {
      const updated = await apiRequest(`/api/v1/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: nextStatus
        })
      });
      setTasksByList((prev) => ({
        ...prev,
        [task.task_list_id]: prev[task.task_list_id].map((t) => t.id === updated.id ? updated : t)
      }));
    } catch (err) {
      void loadTasks();
      handleApiError(err, "Unable to update task");
    }
  };
  const toggleStar = async (task) => {
    const next = !task.is_starred;
    setTasksByList((prev) => ({
      ...prev,
      [task.task_list_id]: prev[task.task_list_id].map((t) => t.id === task.id ? {
        ...t,
        is_starred: next
      } : t)
    }));
    try {
      await apiRequest(`/api/v1/tasks/${task.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          is_starred: next
        })
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
      const list = await apiRequest("/api/v1/tasks/lists", {
        method: "POST",
        body: JSON.stringify({
          name
        })
      });
      setLists((prev) => [...prev, list]);
      setTasksByList((prev) => ({
        ...prev,
        [list.id]: []
      }));
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
      const list = await apiRequest(`/api/v1/tasks/lists/${renameListId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name
        })
      });
      setLists((prev) => prev.map((l) => l.id === list.id ? list : l));
      setRenameOpen(false);
    } catch (err) {
      handleApiError(err, "Unable to rename list");
    } finally {
      setSavingList(false);
    }
  };
  const deleteList = async (list) => {
    if (list.is_default) return;
    try {
      await apiRequest(`/api/v1/tasks/lists/${list.id}`, {
        method: "DELETE"
      });
      setLists((prev) => prev.filter((l) => l.id !== list.id));
      setTasksByList((prev) => {
        const next = {
          ...prev
        };
        delete next[list.id];
        return next;
      });
      if (view === list.id) setView("all");
    } catch (err) {
      handleApiError(err, "Unable to delete list");
    }
  };
  const deleteCompleted = async (list) => {
    const done = (tasksByList[list.id] ?? []).filter(isDone);
    if (done.length === 0) return;
    try {
      await Promise.all(done.map((t) => apiRequest(`/api/v1/tasks/${t.id}`, {
        method: "DELETE"
      })));
      setTasksByList((prev) => ({
        ...prev,
        [list.id]: prev[list.id].filter((t) => !isDone(t))
      }));
    } catch (err) {
      handleApiError(err, "Unable to delete completed tasks");
    }
  };
  const setSort = (listId, sortBy) => {
    setSortByList((prev) => ({
      ...prev,
      [listId]: sortBy
    }));
  };
  const openTaskListId = view === "all" || view === "starred" ? defaultListId : view;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", onClick: () => setSidebarOpen((s) => !s), "aria-label": "Toggle menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-white", strokeWidth: 2.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Tasks" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Search", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Help", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-5 w-5 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-[260px] shrink-0 px-3 md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: loading || !openTaskListId, onClick: () => openNewTask(openTaskListId), className: "mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1 h-5 w-5" }),
          " Create"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5" }), label: "All tasks", active: view === "all", onClick: () => setView("all") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-5 w-5" }), label: "Starred", active: view === "starred", onClick: () => setView("starred") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setListsExpanded((e) => !e), className: "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Lists" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: cn("h-4 w-4 transition-transform", !listsExpanded && "rotate-180") })
          ] }),
          listsExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 space-y-1", children: [
            loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarListsSkeleton, {}) : lists.map((l) => {
              const open = (tasksByList[l.id] ?? []).filter((t) => !isDone(t)).length;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setView(l.id), className: cn("flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition", view === l.id ? "bg-sky-100 text-sky-900" : "hover:bg-white/60"), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SquareCheckBig, { className: "h-5 w-5 text-foreground/70" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: l.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: open })
              ] }, l.id);
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setCreateListOpen(true), className: "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm text-foreground/80 transition hover:bg-white/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Create new list" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 px-4 pb-16 md:px-6", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700", role: "alert", children: error }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TaskListSkeleton, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TaskListSkeleton, {})
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-5", children: [
          visibleLists.map((list) => {
            const tasks = sortedTasks(list);
            const showEmpty = view === "starred" && tasks.length === 0;
            const sortBy = sortByList[list.id] ?? "my";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "w-full max-w-[360px] flex-1 basis-[320px] rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium tracking-tight", children: list.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-64 rounded-xl p-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "px-3 pt-2 text-xs font-medium text-foreground", children: "Sort by" }),
                    [["my", "My order"], ["date", "Date"], ["deadline", "Deadline"], ["starred", "Starred recently"], ["title", "Title"]].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => setSort(list.id, key), className: "gap-3 rounded-lg pl-8 pr-3", children: [
                      sortBy === key && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "absolute left-3 h-4 w-4" }),
                      label
                    ] }, key)),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onClick: () => {
                      setRenameListId(list.id);
                      setRenameValue(list.name);
                      setRenameOpen(true);
                    }, className: "rounded-lg", children: "Rename list" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { disabled: list.is_default, onClick: () => deleteList(list), className: "flex-col items-start gap-0 rounded-lg", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Delete list" }),
                      list.is_default && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "The default list can't be deleted" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { onClick: () => window.print(), className: "rounded-lg", children: "Print list" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { disabled: !(tasksByList[list.id] ?? []).some(isDone), onClick: () => deleteCompleted(list), className: "rounded-lg", children: "Delete all completed tasks" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => openNewTask(list.id), className: "mb-2 flex w-full items-center gap-3 rounded-lg py-2 text-sky-600 transition hover:bg-sky-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-5 w-5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "absolute -right-1 -top-1 h-3 w-3 rounded-full bg-white" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Add a task" })
              ] }),
              showEmpty ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: tasks.map((t) => {
                const done = isDone(t);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group flex items-center gap-3 rounded-lg px-1 py-2 hover:bg-stone-50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleDone(t), className: "shrink-0", "aria-label": "Toggle complete", children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-5 w-5 text-sky-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-5 w-5 text-foreground/40 transition hover:text-foreground" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => openEditTask(t), className: "flex-1 text-left", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-sm", done && "text-muted-foreground line-through"), children: t.title }),
                    (t.due_date || t.description) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                      t.due_date,
                      t.due_time && !t.is_all_day ? ` · ${t.due_time.slice(0, 5)}` : "",
                      t.description ? ` · ${t.description}` : ""
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleStar(t), className: cn("shrink-0 opacity-0 transition group-hover:opacity-100", t.is_starred && "opacity-100"), "aria-label": "Star", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: cn("h-4 w-4", t.is_starred ? "fill-amber-400 text-amber-400" : "text-muted-foreground") }) })
                ] }, t.id);
              }) })
            ] }, list.id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCreateListOpen(true), className: "grid h-[120px] w-full max-w-[360px] flex-1 basis-[320px] place-items-center rounded-2xl border-2 border-dashed border-stone-200 text-muted-foreground transition hover:border-sky-300 hover:text-sky-600", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5" }),
            "Create new list"
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: createListOpen, onOpenChange: setCreateListOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create new list" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, placeholder: "Enter name", value: newListName, onChange: (e) => setNewListName(e.target.value), onKeyDown: (e) => e.key === "Enter" && createList(), className: "border-0 border-b-2 border-sky-500 rounded-none focus-visible:ring-0 focus-visible:border-sky-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "sm:justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setCreateListOpen(false), className: "text-sky-600", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: createList, disabled: !newListName.trim() || savingList, variant: "ghost", className: "text-sky-600 disabled:text-muted-foreground", children: [
          savingList ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Done"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: renameOpen, onOpenChange: setRenameOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Rename list" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, value: renameValue, onChange: (e) => setRenameValue(e.target.value), onKeyDown: (e) => e.key === "Enter" && renameList(), className: "border-0 border-b-2 border-sky-500 rounded-none focus-visible:ring-0 focus-visible:border-sky-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setRenameOpen(false), className: "text-sky-600", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: renameList, disabled: !renameValue.trim() || savingList, variant: "ghost", className: "text-sky-600", children: [
          savingList ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
          "Done"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: taskDialogOpen, onOpenChange: setTaskDialogOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "rounded-2xl sm:max-w-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoFocus: true, placeholder: "Add title", value: taskTitle, onChange: (e) => setTaskTitle(e.target.value), className: "border-0 border-b-2 border-sky-500 rounded-none text-xl h-12 px-0 focus-visible:ring-0 focus-visible:border-sky-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "mt-2 h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { value: taskDate, onChange: setTaskDate, placeholder: "Pick a date", className: "flex-1" }),
              !taskAllDay && /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "time", value: taskTime, onChange: (e) => setTaskTime(e.target.value), className: "bg-stone-100 border-0 rounded-lg w-32" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: taskAllDay, onCheckedChange: (v) => setTaskAllDay(!!v) }),
              "All day"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignStart, { className: "mt-2 h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Add description", value: taskDesc, onChange: (e) => setTaskDesc(e.target.value), className: "bg-stone-100 border-0 rounded-lg min-h-[90px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-5 w-5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: taskDialogListId || void 0, onValueChange: (v) => setTaskDialogListId(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-stone-100 border-0 rounded-lg w-[220px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: lists.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l.id, children: l.name }, l.id)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: saveTask, disabled: !taskTitle.trim() || savingTask, className: "rounded-full bg-sky-600 hover:bg-sky-700", children: [
        savingTask ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : null,
        "Save"
      ] }) })
    ] }) })
  ] });
}
function SidebarItem({
  icon,
  label,
  active,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: cn("flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition", active ? "bg-sky-100 text-sky-900" : "text-foreground/80 hover:bg-white/60"), children: [
    icon,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label })
  ] });
}
function SidebarListsSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", "aria-label": "Loading lists", children: Array.from({
    length: 3
  }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-5 rounded-md" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 flex-1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4" })
  ] }, index)) });
}
function TaskListSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "w-full max-w-[360px] flex-1 basis-[320px] rounded-2xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_1px_3px_rgba(16,24,40,0.06)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-8 rounded-full" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center gap-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-5 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", "aria-label": "Loading tasks", children: Array.from({
      length: 4
    }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 px-1 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-5 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
      ] })
    ] }, index)) })
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-10 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-end gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-rose-100" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-12 rounded-full bg-emerald-200" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No tasks yet" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-[220px] text-xs text-muted-foreground", children: "Add your to-dos and keep track of them across your workspace" })
  ] });
}
export {
  TasksPage as component
};
