import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, EllipsisVertical, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { ContentBriefDetail } from "@/components/content-brief-detail";
import { ContentDraftEditor } from "@/components/content-draft-editor";
import { CalendarMonthView } from "@/components/calendar-month-view";
import {
  badgeClass,
  CALENDAR_STATUSES,
  statusLabel,
  type BriefResponse,
  type CalendarItemResponse,
  type CalendarStatus,
  type DraftResponse,
  type Page,
} from "@/lib/content-types";

type Props = {
  brandId: string;
  view?: "list" | "calendar";
  onError: (err: unknown) => void;
};

export function ContentCalendarList({ brandId, view = "list", onError }: Props) {
  const [items, setItems] = useState<CalendarItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<CalendarStatus | "all">("all");
  const [selected, setSelected] = useState<CalendarItemResponse | null>(null);
  const [briefs, setBriefs] = useState<BriefResponse[]>([]);
  const [drafts, setDrafts] = useState<DraftResponse[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<CalendarItemResponse | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ brand_id: brandId, limit: "100" });
      if (statusFilter !== "all") params.set("status", statusFilter);
      const page = await apiRequest<Page<CalendarItemResponse>>(
        `/api/v1/content/calendar-items?${params}`,
      );
      setItems(page.items);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [brandId, statusFilter, onError]);

  useEffect(() => {
    void load();
  }, [load]);

  const loadDetail = useCallback(
    async (item: CalendarItemResponse) => {
      setDetailLoading(true);
      try {
        const [briefList, draftList] = await Promise.all([
          apiRequest<BriefResponse[]>(`/api/v1/content/calendar-items/${item.id}/briefs`),
          apiRequest<DraftResponse[]>(`/api/v1/content/calendar-items/${item.id}/drafts`),
        ]);
        setBriefs(briefList);
        setDrafts(draftList);
      } catch (err) {
        onError(err);
      } finally {
        setDetailLoading(false);
      }
    },
    [onError],
  );

  const openDetail = async (item: CalendarItemResponse) => {
    setSelected(item);
    setBriefs([]);
    setDrafts([]);
    await loadDetail(item);
  };

  const updateStatus = async (item: CalendarItemResponse, status: CalendarStatus) => {
    setMutating(true);
    try {
      const updated = await apiRequest<CalendarItemResponse>(
        `/api/v1/content/calendar-items/${item.id}/status`,
        { method: "POST", body: JSON.stringify({ status }) },
      );
      if (selected?.id === item.id) setSelected(updated);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const deleteItem = async (item: CalendarItemResponse) => {
    setMutating(true);
    try {
      await apiRequest<void>(`/api/v1/content/calendar-items/${item.id}`, { method: "DELETE" });
      setItems((current) => current.filter((calendarItem) => calendarItem.id !== item.id));
      if (selected?.id === item.id) closeDetail();
      setPendingDelete(null);
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const closeDetail = () => {
    setSelected(null);
    setBriefs([]);
    setDrafts([]);
    setDetailLoading(false);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Select
          value={statusFilter}
          onValueChange={(value: CalendarStatus | "all") => setStatusFilter(value)}
        >
          <SelectTrigger className="h-9 w-[180px] rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {CALENDAR_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {statusLabel(status)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading && (
        <div className="grid gap-2 py-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-16 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center">
          <FileText className="mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium">Nothing scheduled</p>
          <p className="text-xs text-muted-foreground">
            Approve an idea and plan it to see it here.
          </p>
        </div>
      )}

      {!loading && items.length > 0 && view === "calendar" && (
        <CalendarMonthView
          events={items
            .filter((item) => item.planned_publish_date)
            .map((item) => ({
              id: item.id,
              date: item.planned_publish_date as string,
              title: item.title || "Untitled",
              colorClass: badgeClass(item.status),
            }))}
          onSelect={(id) => {
            const item = items.find((i) => i.id === id);
            if (item) void openDetail(item);
          }}
        />
      )}

      {!loading && items.length > 0 && view === "list" && (
        <ul>
          <li className="hidden grid-cols-[1.4fr_1fr_120px_150px_44px] items-center gap-4 border-b border-black/5 px-2 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
            <div>Title</div>
            <div>Format</div>
            <div>Publish date</div>
            <div>Status</div>
            <div />
          </li>
          {items.map((item) => (
            <li
              key={item.id}
              className="group grid cursor-pointer grid-cols-[1fr_auto] items-center gap-3 rounded-xl border-b border-black/5 px-2 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)] md:grid-cols-[1.4fr_1fr_120px_150px_44px] md:gap-4"
              onClick={() => openDetail(item)}
            >
              <div className="min-w-0">
                <div className="truncate font-medium">{item.title || "Untitled"}</div>
                {item.channel && (
                  <div className="truncate text-xs text-muted-foreground">{item.channel}</div>
                )}
              </div>
              <div className="hidden capitalize text-foreground/80 md:block">
                {statusLabel(item.format)}
              </div>
              <div className="hidden text-muted-foreground md:block">
                {item.planned_publish_date || "—"}
              </div>
              <div>
                <StatusPill status={item.status} />
              </div>
              <div onClick={(e) => e.stopPropagation()} className="hidden justify-end md:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      disabled={mutating}
                      aria-label="Calendar item actions"
                    >
                      <EllipsisVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36 rounded-xl">
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => setPendingDelete(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && !mutating && setPendingDelete(null)}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete calendar item?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete “{pendingDelete?.title || "Untitled"}”? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={mutating} className="rounded-lg">
              No
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={mutating || !pendingDelete}
              onClick={(event) => {
                event.preventDefault();
                if (pendingDelete) void deleteItem(pendingDelete);
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Sheet open={selected !== null} onOpenChange={(open) => !open && closeDetail()}>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl"
        >
          {selected && (
            <>
              <SheetHeader className="border-b px-6 py-5 text-left">
                <div className="flex min-w-0 items-start gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="-ml-2 mt-0.5 h-8 w-8 shrink-0 rounded-full"
                    onClick={closeDetail}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[hsl(220,33%,95%)] text-foreground/70">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <SheetTitle className="truncate text-xl">
                      {selected.title || "Untitled"}
                    </SheetTitle>
                    <SheetDescription className="mt-1 truncate text-base">
                      {[
                        selected.planned_publish_date,
                        statusLabel(selected.format),
                        selected.channel,
                        selected.assigned_agent,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="flex flex-wrap items-center gap-2 border-b px-6 py-4">
                <Select
                  value={selected.status}
                  onValueChange={(value: CalendarStatus) => updateStatus(selected, value)}
                >
                  <SelectTrigger
                    className={cn(
                      "h-9 w-auto min-w-[150px] rounded-lg border-none px-3 text-sm font-medium",
                      badgeClass(selected.status),
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CALENDAR_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {statusLabel(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                {detailLoading ? (
                  <ContentItemDetailSkeleton />
                ) : (
                  <Tabs defaultValue="briefs">
                    <TabsList className="rounded-full">
                      <TabsTrigger value="briefs" className="rounded-full">
                        Briefs ({briefs.length})
                      </TabsTrigger>
                      <TabsTrigger value="drafts" className="rounded-full">
                        Drafts ({drafts.length})
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="briefs" className="mt-4">
                      <ContentBriefDetail
                        calendarItemId={selected.id}
                        briefs={briefs}
                        onChanged={() => loadDetail(selected)}
                        onError={onError}
                      />
                    </TabsContent>
                    <TabsContent value="drafts" className="mt-4">
                      <ContentDraftEditor
                        calendarItemId={selected.id}
                        drafts={drafts}
                        briefs={briefs}
                        onChanged={() => loadDetail(selected)}
                        onError={onError}
                      />
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function StatusPill({ status }: { status: CalendarStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 w-auto items-center rounded-full border-none px-3 text-xs font-medium",
        badgeClass(status),
      )}
    >
      {statusLabel(status)}
    </span>
  );
}

function ContentItemDetailSkeleton() {
  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Skeleton className="h-10 w-32 rounded-full" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>
      <div className="grid gap-3">
        <Skeleton className="h-5 w-24" />
        <div className="rounded-xl border border-black/5 px-3 py-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-64 max-w-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="mt-3 h-4 w-80 max-w-full" />
          <div className="mt-4 grid gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
