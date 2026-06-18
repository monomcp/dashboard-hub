import { useCallback, useEffect, useState, type FormEvent } from "react";
import { CalendarClock, ChevronLeft, FileText, History, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { statusLabel, type Page } from "@/lib/content-types";
import { SocialBriefDetail } from "@/components/social-brief-detail";
import { CalendarMonthView } from "@/components/calendar-month-view";
import {
  SOCIAL_CALENDAR_STATUSES,
  socialBadgeClass,
  type SocialBriefResponse,
  type SocialCalendarItemResponse,
  type SocialCalendarRescheduleResponse,
  type SocialCalendarStatus,
} from "@/lib/social-types";

type Props = {
  brandId: string;
  platformId: string;
  view?: "list" | "calendar";
  onError: (err: unknown) => void;
};

function formatDateTime(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function SocialCalendarList({ brandId, platformId, view = "list", onError }: Props) {
  const [items, setItems] = useState<SocialCalendarItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [statusFilter, setStatusFilter] = useState<SocialCalendarStatus | "all">("all");
  const [selected, setSelected] = useState<SocialCalendarItemResponse | null>(null);
  const [briefs, setBriefs] = useState<SocialBriefResponse[]>([]);
  const [rescheduling, setRescheduling] = useState<SocialCalendarItemResponse | null>(null);
  const [rescheduleForm, setRescheduleForm] = useState({ planned_publish_at: "", reason: "" });
  const [historyFor, setHistoryFor] = useState<SocialCalendarItemResponse | null>(null);
  const [history, setHistory] = useState<SocialCalendarRescheduleResponse[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ brand_id: brandId, limit: "100" });
      if (platformId) params.set("platform_id", platformId);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const page = await apiRequest<Page<SocialCalendarItemResponse>>(
        `/api/v1/social/calendar-items?${params}`,
      );
      setItems(page.items);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [brandId, platformId, statusFilter, onError]);

  useEffect(() => {
    void load();
  }, [load]);

  const loadBriefs = useCallback(
    async (item: SocialCalendarItemResponse) => {
      try {
        setBriefs(
          await apiRequest<SocialBriefResponse[]>(
            `/api/v1/social/calendar-items/${item.id}/briefs`,
          ),
        );
      } catch (err) {
        onError(err);
      }
    },
    [onError],
  );

  const openDetail = async (item: SocialCalendarItemResponse) => {
    setSelected(item);
    setBriefs([]);
    await loadBriefs(item);
  };

  const updateStatus = async (
    item: SocialCalendarItemResponse,
    status: SocialCalendarStatus,
  ) => {
    setMutating(true);
    try {
      const updated = await apiRequest<SocialCalendarItemResponse>(
        `/api/v1/social/calendar-items/${item.id}/status`,
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

  const deleteItem = async (item: SocialCalendarItemResponse) => {
    setMutating(true);
    try {
      await apiRequest<void>(`/api/v1/social/calendar-items/${item.id}`, { method: "DELETE" });
      if (selected?.id === item.id) setSelected(null);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const submitReschedule = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rescheduling || !rescheduleForm.planned_publish_at) return;
    setMutating(true);
    try {
      const updated = await apiRequest<SocialCalendarItemResponse>(
        `/api/v1/social/calendar-items/${rescheduling.id}/reschedule`,
        {
          method: "POST",
          body: JSON.stringify({
            planned_publish_at: new Date(rescheduleForm.planned_publish_at).toISOString(),
            reason: rescheduleForm.reason.trim() || null,
          }),
        },
      );
      if (selected?.id === rescheduling.id) setSelected(updated);
      setRescheduling(null);
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const openHistory = async (item: SocialCalendarItemResponse) => {
    setHistoryFor(item);
    setHistory([]);
    try {
      setHistory(
        await apiRequest<SocialCalendarRescheduleResponse[]>(
          `/api/v1/social/calendar-items/${item.id}/reschedules`,
        ),
      );
    } catch (err) {
      onError(err);
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
                  formatDateTime(selected.planned_publish_at),
                  selected.timezone,
                  selected.assigned_agent,
                  selected.campaign_id,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-lg"
              onClick={() => {
                setRescheduling(selected);
                setRescheduleForm({ planned_publish_at: "", reason: "" });
              }}
            >
              <CalendarClock className="mr-1 h-4 w-4" /> Reschedule
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-lg"
              onClick={() => openHistory(selected)}
            >
              <History className="mr-1 h-4 w-4" /> History
            </Button>
            <Select
              value={selected.status}
              onValueChange={(value: SocialCalendarStatus) => updateStatus(selected, value)}
            >
              <SelectTrigger className="h-9 w-[180px] rounded-lg capitalize">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SOCIAL_CALENDAR_STATUSES.map((status) => (
                  <SelectItem key={status} value={status} className="capitalize">
                    {statusLabel(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <SocialBriefDetail
          calendarItemId={selected.id}
          briefs={briefs}
          onChanged={() => loadBriefs(selected)}
          onError={onError}
        />

        <RescheduleDialog
          rescheduling={rescheduling}
          form={rescheduleForm}
          setForm={setRescheduleForm}
          mutating={mutating}
          onClose={() => setRescheduling(null)}
          onSubmit={submitReschedule}
        />
        <HistoryDialog
          historyFor={historyFor}
          history={history}
          onClose={() => setHistoryFor(null)}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Select
          value={statusFilter}
          onValueChange={(value: SocialCalendarStatus | "all") => setStatusFilter(value)}
        >
          <SelectTrigger className="h-9 w-[180px] rounded-lg capitalize">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {SOCIAL_CALENDAR_STATUSES.map((status) => (
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
            Approve a social idea and plan it to see it here.
          </p>
        </div>
      )}

      {!loading && items.length > 0 && view === "calendar" && (
        <CalendarMonthView
          events={items
            .filter((item) => item.planned_publish_at)
            .map((item) => ({
              id: item.id,
              date: item.planned_publish_at as string,
              title: item.title || "Untitled",
              colorClass: socialBadgeClass(item.status),
            }))}
          onSelect={(id) => {
            const item = items.find((i) => i.id === id);
            if (item) void openDetail(item);
          }}
        />
      )}

      {!loading && items.length > 0 && view === "list" && (
        <ul>
          <li className="hidden grid-cols-[1.4fr_180px_150px_44px_44px] items-center gap-4 border-b border-black/5 px-2 pb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
            <div>Title</div>
            <div>Publish at</div>
            <div>Status</div>
            <div />
            <div />
          </li>
          {items.map((item) => (
            <li
              key={item.id}
              className="group grid cursor-pointer grid-cols-[1fr_auto] items-center gap-3 rounded-xl border-b border-black/5 px-2 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)] md:grid-cols-[1.4fr_180px_150px_44px_44px] md:gap-4"
              onClick={() => openDetail(item)}
            >
              <div className="min-w-0">
                <div className="truncate font-medium">{item.title || "Untitled"}</div>
                {(item.assigned_agent || item.campaign_id) && (
                  <div className="truncate text-xs text-muted-foreground">
                    {[item.assigned_agent, item.campaign_id].filter(Boolean).join(" · ")}
                  </div>
                )}
              </div>
              <div className="hidden text-muted-foreground md:block">
                {formatDateTime(item.planned_publish_at)}
              </div>
              <div onClick={(e) => e.stopPropagation()}>
                <Select
                  value={item.status}
                  onValueChange={(value: SocialCalendarStatus) => updateStatus(item, value)}
                >
                  <SelectTrigger
                    className={cn(
                      "h-7 w-[140px] rounded-full border-none text-xs font-medium capitalize",
                      socialBadgeClass(item.status),
                    )}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SOCIAL_CALENDAR_STATUSES.map((status) => (
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
                  className="h-8 w-8 rounded-full"
                  disabled={mutating}
                  onClick={() => {
                    setRescheduling(item);
                    setRescheduleForm({ planned_publish_at: "", reason: "" });
                  }}
                >
                  <CalendarClock className="h-4 w-4" />
                </Button>
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

      <RescheduleDialog
        rescheduling={rescheduling}
        form={rescheduleForm}
        setForm={setRescheduleForm}
        mutating={mutating}
        onClose={() => setRescheduling(null)}
        onSubmit={submitReschedule}
      />
      <HistoryDialog
        historyFor={historyFor}
        history={history}
        onClose={() => setHistoryFor(null)}
      />
    </div>
  );
}

function RescheduleDialog({
  rescheduling,
  form,
  setForm,
  mutating,
  onClose,
  onSubmit,
}: {
  rescheduling: SocialCalendarItemResponse | null;
  form: { planned_publish_at: string; reason: string };
  setForm: React.Dispatch<React.SetStateAction<{ planned_publish_at: string; reason: string }>>;
  mutating: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <Dialog open={rescheduling !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="rounded-2xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Reschedule</DialogTitle>
          </DialogHeader>
          <div className="mt-5 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="social-reschedule-date">New publish time</Label>
              <Input
                id="social-reschedule-date"
                type="datetime-local"
                value={form.planned_publish_at}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, planned_publish_at: e.target.value }))
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="social-reschedule-reason">Reason</Label>
              <Textarea
                id="social-reschedule-reason"
                rows={2}
                value={form.reason}
                onChange={(e) => setForm((prev) => ({ ...prev, reason: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose} disabled={mutating}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutating || !form.planned_publish_at}>
              {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reschedule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function HistoryDialog({
  historyFor,
  history,
  onClose,
}: {
  historyFor: SocialCalendarItemResponse | null;
  history: SocialCalendarRescheduleResponse[];
  onClose: () => void;
}) {
  return (
    <Dialog open={historyFor !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Reschedule history</DialogTitle>
        </DialogHeader>
        {history.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">No reschedules yet.</p>
        )}
        <ul className="mt-4 grid gap-2">
          {history.map((entry) => (
            <li key={entry.id} className="rounded-xl border border-black/5 px-3 py-2 text-sm">
              <div className="text-xs text-muted-foreground">
                {formatDateTime(entry.previous_planned_publish_at)} →{" "}
                {formatDateTime(entry.planned_publish_at)}
              </div>
              {entry.reason && <div className="mt-1 text-xs">{entry.reason}</div>}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
