import { useCallback, useEffect, useState, type FormEvent } from "react";
import { CalendarPlus, Check, Loader2, Plus, Star, ThumbsDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  badgeClass,
  CALENDAR_FORMATS,
  linesToList,
  SCORE_FIELDS,
  statusLabel,
  type CalendarFormat,
  type IdeaResponse,
  type IdeaStatus,
  type Page,
  type PillarResponse,
  type StrategyResponse,
} from "@/lib/content-types";

type Props = {
  businessId: string;
  query: string;
  onError: (err: unknown) => void;
};

const STATUS_TABS: { id: IdeaStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "idea", label: "New" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "planned", label: "Planned" },
  { id: "drafting", label: "Drafting" },
];

const EMPTY_IDEA_FORM = {
  title: "",
  angle: "",
  target_keyword: "",
  secondary_keywords: "",
  funnel_stage: "",
  intent: "",
  pillar_id: "",
};

const EMPTY_SCORES = Object.fromEntries(SCORE_FIELDS.map(([key]) => [key, ""])) as Record<
  string,
  string
>;

export function ContentIdeasBoard({ businessId, query, onError }: Props) {
  const [ideas, setIdeas] = useState<IdeaResponse[]>([]);
  const [pillars, setPillars] = useState<PillarResponse[]>([]);
  const [tab, setTab] = useState<IdeaStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [ideaForm, setIdeaForm] = useState(EMPTY_IDEA_FORM);

  const [scoring, setScoring] = useState<IdeaResponse | null>(null);
  const [scoreForm, setScoreForm] = useState(EMPTY_SCORES);
  const [scoreRecommendation, setScoreRecommendation] = useState("");
  const [autoApprove, setAutoApprove] = useState(true);

  const [rejecting, setRejecting] = useState<IdeaResponse | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [planning, setPlanning] = useState<IdeaResponse | null>(null);
  const [planForm, setPlanForm] = useState({
    format: "blog_post" as CalendarFormat,
    channel: "",
    planned_publish_date: "",
    assigned_agent: "",
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        business_id: businessId,
        sort: "created_at",
        direction: "desc",
        limit: "100",
      });
      if (tab !== "all") params.set("status", tab);
      if (query.trim()) params.set("q", query.trim());
      const page = await apiRequest<Page<IdeaResponse>>(`/api/v1/content/ideas?${params}`);
      setIdeas(page.items);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [businessId, tab, query, onError]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    void (async () => {
      try {
        const page = await apiRequest<Page<StrategyResponse>>(
          `/api/v1/content/strategies?business_id=${businessId}&limit=1`,
        );
        const strategy = page.items[0];
        setPillars(
          strategy
            ? await apiRequest<PillarResponse[]>(
                `/api/v1/content/strategies/${strategy.id}/pillars`,
              )
            : [],
        );
      } catch {
        setPillars([]);
      }
    })();
  }, [businessId]);

  const run = async (fn: () => Promise<unknown>) => {
    setMutating(true);
    try {
      await fn();
      await load();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const submitCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ideaForm.title.trim()) return;
    await run(() =>
      apiRequest("/api/v1/content/ideas", {
        method: "POST",
        body: JSON.stringify({
          business_id: businessId,
          pillar_id: ideaForm.pillar_id || null,
          title: ideaForm.title.trim(),
          angle: ideaForm.angle.trim() || null,
          target_keyword: ideaForm.target_keyword.trim() || null,
          secondary_keywords: linesToList(ideaForm.secondary_keywords),
          funnel_stage: ideaForm.funnel_stage.trim() || null,
          intent: ideaForm.intent.trim() || null,
        }),
      }),
    );
    setCreateOpen(false);
    setIdeaForm(EMPTY_IDEA_FORM);
  };

  const openScore = (idea: IdeaResponse) => {
    setScoring(idea);
    setScoreForm(
      Object.fromEntries(
        SCORE_FIELDS.map(([key]) => [key, idea[key as keyof IdeaResponse]?.toString() ?? ""]),
      ) as Record<string, string>,
    );
    setScoreRecommendation(idea.recommendation ?? "");
    setAutoApprove(true);
  };

  const submitScore = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!scoring) return;
    const payload: Record<string, unknown> = {
      recommendation: scoreRecommendation.trim() || null,
    };
    for (const [key] of SCORE_FIELDS) {
      if (scoreForm[key] !== "") payload[key] = Number(scoreForm[key]);
    }
    await run(() =>
      apiRequest(`/api/v1/content/ideas/${scoring.id}/score?auto_approve=${autoApprove}`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    );
    setScoring(null);
  };

  const submitReject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rejecting || !rejectReason.trim()) return;
    await run(() =>
      apiRequest(`/api/v1/content/ideas/${rejecting.id}/reject`, {
        method: "POST",
        body: JSON.stringify({ rejection_reason: rejectReason.trim() }),
      }),
    );
    setRejecting(null);
    setRejectReason("");
  };

  const submitPlan = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!planning) return;
    await run(() =>
      apiRequest("/api/v1/content/calendar-items", {
        method: "POST",
        body: JSON.stringify({
          content_idea_id: planning.id,
          format: planForm.format,
          channel: planForm.channel.trim() || null,
          planned_publish_date: planForm.planned_publish_date || null,
          assigned_agent: planForm.assigned_agent.trim() || null,
        }),
      }),
    );
    setPlanning(null);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1">
          {STATUS_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition",
                tab === t.id ? "bg-sky-100 text-sky-900" : "text-foreground/70 hover:bg-white/60",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <Button size="sm" className="rounded-lg" onClick={() => setCreateOpen(true)}>
          <Plus className="mr-1 h-4 w-4" /> New idea
        </Button>
      </div>

      {loading && (
        <div className="grid gap-2 py-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-20 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" />
          ))}
        </div>
      )}

      {!loading && ideas.length === 0 && (
        <div className="grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center">
          <p className="text-sm font-medium">No ideas here yet</p>
          <p className="text-xs text-muted-foreground">Create one or change the filter.</p>
        </div>
      )}

      {!loading && (
        <ul className="grid gap-2">
          {ideas.map((idea) => (
            <li
              key={idea.id}
              className="rounded-xl border border-black/5 px-3 py-3 text-sm transition hover:bg-[hsl(220,33%,97%)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{idea.title}</span>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        badgeClass(idea.status),
                      )}
                    >
                      {statusLabel(idea.status)}
                    </span>
                    {idea.total_score != null && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">
                        <Star className="h-3 w-3" /> {Number(idea.total_score)}
                      </span>
                    )}
                  </div>
                  {(idea.target_keyword || idea.funnel_stage || idea.intent) && (
                    <div className="text-xs text-muted-foreground">
                      {[idea.target_keyword, idea.funnel_stage, idea.intent]
                        .filter(Boolean)
                        .join(" · ")}
                    </div>
                  )}
                  {idea.rejection_reason && (
                    <div className="text-xs text-rose-600">Rejected: {idea.rejection_reason}</div>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-lg"
                    disabled={mutating}
                    onClick={() => openScore(idea)}
                  >
                    <Star className="mr-1 h-3.5 w-3.5" /> Score
                  </Button>
                  {idea.status !== "approved" &&
                    idea.status !== "planned" &&
                    idea.status !== "drafting" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 rounded-lg text-emerald-700"
                        disabled={mutating}
                        onClick={() =>
                          run(() =>
                            apiRequest(`/api/v1/content/ideas/${idea.id}/approve`, {
                              method: "POST",
                            }),
                          )
                        }
                      >
                        <Check className="mr-1 h-3.5 w-3.5" /> Approve
                      </Button>
                    )}
                  {idea.status !== "rejected" && idea.status !== "planned" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg text-rose-700"
                      disabled={mutating}
                      onClick={() => {
                        setRejecting(idea);
                        setRejectReason("");
                      }}
                    >
                      <ThumbsDown className="mr-1 h-3.5 w-3.5" /> Reject
                    </Button>
                  )}
                  {idea.status === "approved" && (
                    <Button
                      size="sm"
                      className="h-8 rounded-lg"
                      disabled={mutating}
                      onClick={() => setPlanning(idea)}
                    >
                      <CalendarPlus className="mr-1 h-3.5 w-3.5" /> Plan
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-destructive"
                    disabled={mutating}
                    onClick={() =>
                      run(() =>
                        apiRequest<void>(`/api/v1/content/ideas/${idea.id}`, {
                          method: "DELETE",
                        }),
                      )
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {SCORE_FIELDS.some(([key]) => idea[key as keyof IdeaResponse] != null) && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SCORE_FIELDS.map(([key, label]) => {
                    const value = idea[key as keyof IdeaResponse];
                    if (value == null) return null;
                    return (
                      <span
                        key={key}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                      >
                        {label} {Number(value)}
                      </span>
                    );
                  })}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Create idea */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
          <form onSubmit={submitCreate}>
            <DialogHeader>
              <DialogTitle>New content idea</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="idea-title">Title</Label>
                <Input
                  id="idea-title"
                  value={ideaForm.title}
                  onChange={(e) => setIdeaForm((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idea-angle">Angle</Label>
                <Textarea
                  id="idea-angle"
                  rows={2}
                  value={ideaForm.angle}
                  onChange={(e) => setIdeaForm((prev) => ({ ...prev, angle: e.target.value }))}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="idea-keyword">Target keyword</Label>
                  <Input
                    id="idea-keyword"
                    value={ideaForm.target_keyword}
                    onChange={(e) =>
                      setIdeaForm((prev) => ({ ...prev, target_keyword: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Pillar</Label>
                  <Select
                    value={ideaForm.pillar_id || "none"}
                    onValueChange={(value) =>
                      setIdeaForm((prev) => ({
                        ...prev,
                        pillar_id: value === "none" ? "" : value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No pillar</SelectItem>
                      {pillars.map((pillar) => (
                        <SelectItem key={pillar.id} value={pillar.id}>
                          {pillar.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idea-secondary">Secondary keywords (one per line)</Label>
                <Textarea
                  id="idea-secondary"
                  rows={2}
                  value={ideaForm.secondary_keywords}
                  onChange={(e) =>
                    setIdeaForm((prev) => ({ ...prev, secondary_keywords: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="idea-funnel">Funnel stage</Label>
                  <Input
                    id="idea-funnel"
                    placeholder="tofu / mofu / bofu"
                    value={ideaForm.funnel_stage}
                    onChange={(e) =>
                      setIdeaForm((prev) => ({ ...prev, funnel_stage: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="idea-intent">Intent</Label>
                  <Input
                    id="idea-intent"
                    placeholder="informational / commercial"
                    value={ideaForm.intent}
                    onChange={(e) => setIdeaForm((prev) => ({ ...prev, intent: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutating || !ideaForm.title.trim()}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Score idea */}
      <Dialog open={scoring !== null} onOpenChange={(open) => !open && setScoring(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
          <form onSubmit={submitScore}>
            <DialogHeader>
              <DialogTitle>Score idea</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {SCORE_FIELDS.map(([key, label]) => (
                  <div key={key} className="grid gap-2">
                    <Label htmlFor={`score-${key}`}>{label}</Label>
                    <Input
                      id={`score-${key}`}
                      type="number"
                      min={0}
                      max={100}
                      value={scoreForm[key]}
                      onChange={(e) =>
                        setScoreForm((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="score-recommendation">Recommendation</Label>
                <Textarea
                  id="score-recommendation"
                  rows={2}
                  value={scoreRecommendation}
                  onChange={(e) => setScoreRecommendation(e.target.value)}
                />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={autoApprove}
                  onCheckedChange={(checked) => setAutoApprove(checked === true)}
                />
                Auto-approve when total score is 75 or higher
              </label>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setScoring(null)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutating}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save scores
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reject idea */}
      <Dialog open={rejecting !== null} onOpenChange={(open) => !open && setRejecting(null)}>
        <DialogContent className="rounded-2xl">
          <form onSubmit={submitReject}>
            <DialogHeader>
              <DialogTitle>Reject idea</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-2">
              <Label htmlFor="reject-reason">Reason</Label>
              <Textarea
                id="reject-reason"
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRejecting(null)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={mutating || !rejectReason.trim()}
              >
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reject
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Plan idea -> calendar item */}
      <Dialog open={planning !== null} onOpenChange={(open) => !open && setPlanning(null)}>
        <DialogContent className="rounded-2xl">
          <form onSubmit={submitPlan}>
            <DialogHeader>
              <DialogTitle>Schedule on calendar</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label>Format</Label>
                <Select
                  value={planForm.format}
                  onValueChange={(value: CalendarFormat) =>
                    setPlanForm((prev) => ({ ...prev, format: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CALENDAR_FORMATS.map((format) => (
                      <SelectItem key={format} value={format} className="capitalize">
                        {statusLabel(format)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="plan-date">Publish date</Label>
                  <Input
                    id="plan-date"
                    type="date"
                    value={planForm.planned_publish_date}
                    onChange={(e) =>
                      setPlanForm((prev) => ({ ...prev, planned_publish_date: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="plan-channel">Channel</Label>
                  <Input
                    id="plan-channel"
                    placeholder="blog"
                    value={planForm.channel}
                    onChange={(e) =>
                      setPlanForm((prev) => ({ ...prev, channel: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan-agent">Assigned agent</Label>
                <Input
                  id="plan-agent"
                  value={planForm.assigned_agent}
                  onChange={(e) =>
                    setPlanForm((prev) => ({ ...prev, assigned_agent: e.target.value }))
                  }
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPlanning(null)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutating}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Schedule
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
