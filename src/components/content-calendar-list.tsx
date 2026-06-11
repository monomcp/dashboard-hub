import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  businessId: string;
  onError: (err: unknown) => void;
};

export function ContentCalendarList({ businessId, onError }: Props) {
  const [items, setItems] = useState<CalendarItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<CalendarStatus | "all">("all");
  const [selected, setSelected] = useState<CalendarItemResponse | null>(null);
  const [briefs, setBriefs] = useState<BriefResponse[]>([]);
  const [drafts, setDrafts] = useState<DraftResponse[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ business_id: businessId, limit: "100" });
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
  }, [businessId, statusFilter, onError]);

  useEffect(() => {
    void load();
  }, [load]);

  const loadDetail = useCallback(
    async (item: CalendarItemResponse) => {
      try {
        const [briefList, draftList] = await Promise.all([
          apiRequest<BriefResponse[]>(`/api/v1/content/calendar-items/${item.id}/briefs`),
          apiRequest<DraftResponse[]>(`/api/v1/content/calendar-items/${item.id}/drafts`),
        ]);
        setBriefs(briefList);
        setDrafts(draftList);
      } catch (err) {
        onError(err);
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
      if (selected?.id === item.id) setSelected(null);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  if (selected) {
    return (
      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setSelected(null)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-medium">{selected.title || "Untitled"}</h2>
              <div className="text-xs text-muted-foreground">
                {[
                  statusLabel(selected.format),
                  selected.channel,
                  selected.planned_publish_date,
                  selected.assigned_agent,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </div>
            </div>
          </div>
          <Select
            value={selected.status}
            onValueChange={(value: CalendarStatus) => updateStatus(selected, value)}
          >
            <SelectTrigger className="h-9 w-[180px] rounded-lg capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CALENDAR_STATUSES.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {statusLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Select
          value={statusFilter}
          onValueChange={(value: CalendarStatus | "all") => setStatusFilter(value)}
        >
          <SelectTrigger className="h-9 w-[180px] rounded-lg capitalize">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {CALENDAR_STATUSES.map((status) => (
              <SelectItem key={status} value={status} className="capitalize">
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

      {!loading && items.length > 0 && (
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
              <div onClick={(e) => e.stopPropagation()}>
                <Select
                  value={item.status}
                  onValueChange={(value: CalendarStatus) => updateStatus(item, value)}
                >
                  <SelectTrigger
                    className={cn(
                      "h-7 w-[140px] rounded-full border-none text-xs font-medium capitalize",
                      badgeClass(item.status),
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CALENDAR_STATUSES.map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">
                        {statusLabel(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div onClick={(e) => e.stopPropagation()} className="hidden justify-end md:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-destructive"
                  disabled={mutating}
                  onClick={() => deleteItem(item)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
