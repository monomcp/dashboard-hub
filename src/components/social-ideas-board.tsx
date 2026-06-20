import { useEffect, useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarPlus,
  Check,
  Loader2,
  MoreVertical,
  Plus,
  Star,
  ThumbsDown,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  statusLabel,
  type Page,
  type PillarResponse,
  type StrategyResponse,
} from "@/lib/content-types";
import {
  SOCIAL_IDEA_FORMATS,
  SOCIAL_SCORE_FIELDS,
  SOCIAL_SOURCE_TYPES,
  socialBadgeClass,
  type SocialIdeaFormat,
  type SocialIdeaResponse,
  type SocialIdeaSourceType,
  type SocialIdeaStatus,
  type SocialPlatform,
} from "@/lib/social-types";

type Props = {
  brandId: string;
  platformId: string;
  platforms: SocialPlatform[];
  query: string;
  onError: (err: unknown) => void;
};

const STATUS_TABS: { id: SocialIdeaStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "idea", label: "New" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "planned", label: "Planned" },
];

const EMPTY_IDEA_FORM = {
  title: "",
  hook: "",
  angle: "",
  format: "single_post" as SocialIdeaFormat,
  source_type: "manual" as SocialIdeaSourceType,
  platform_id: "",
  pillar_id: "",
};

const EMPTY_SCORES = Object.fromEntries(SOCIAL_SCORE_FIELDS.map(([key]) => [key, ""])) as Record<
  string,
  string
>;

export function SocialIdeasBoard({ brandId, platformId, platforms, query, onError }: Props) {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<SocialIdeaStatus | "all">("all");
  const [mutating, setMutating] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [ideaForm, setIdeaForm] = useState(EMPTY_IDEA_FORM);

  const [scoring, setScoring] = useState<SocialIdeaResponse | null>(null);
  const [scoreForm, setScoreForm] = useState(EMPTY_SCORES);

  const [rejecting, setRejecting] = useState<SocialIdeaResponse | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [planning, setPlanning] = useState<SocialIdeaResponse | null>(null);
  const [planForm, setPlanForm] = useState({
    planned_publish_at: "",
    timezone: "",
    assigned_agent: "",
    campaign_id: "",
  });

  const platformName = (id: string) => platforms.find((p) => p.id === id)?.name ?? "Unknown";

  const ideasQueryKey = ["social", "ideas", brandId, platformId, tab, query] as const;
  const ideasQuery = useQuery({
    queryKey: ideasQueryKey,
    queryFn: async () => {
      const params = new URLSearchParams({
        brand_id: brandId,
        sort: "created_at",
        direction: "desc",
        limit: "100",
      });
      if (platformId) params.set("platform_id", platformId);
      if (tab !== "all") params.set("status", tab);
      if (query.trim()) params.set("q", query.trim());
      const page = await apiRequest<Page<SocialIdeaResponse>>(`/api/v1/social/ideas?${params}`);
      return page.items;
    },
    staleTime: 15 * 1000,
  });

  useEffect(() => {
    if (ideasQuery.error) onError(ideasQuery.error);
  }, [ideasQuery.error, onError]);

  const pillarsQuery = useQuery({
    queryKey: ["content", "strategy-pillars", brandId],
    queryFn: async () => {
      const page = await apiRequest<Page<StrategyResponse>>(
        `/api/v1/content/strategies?brand_id=${brandId}&limit=1`,
      );
      const strategy = page.items[0];
      return strategy
        ? apiRequest<PillarResponse[]>(`/api/v1/content/strategies/${strategy.id}/pillars`)
        : [];
    },
    staleTime: 30 * 1000,
  });

  const ideas = ideasQuery.data ?? [];
  const pillars = pillarsQuery.data ?? [];
  const loading = ideasQuery.isLoading;

  const run = async (fn: () => Promise<unknown>) => {
    setMutating(true);
    try {
      await fn();
      await ideasQuery.refetch();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const patchIdea = (ideaId: string, patch: Partial<SocialIdeaResponse>) => {
    queryClient.setQueryData<SocialIdeaResponse[]>(ideasQueryKey, (current = []) => {
      if (patch.status && tab !== "all" && patch.status !== tab) {
        return current.filter((idea) => idea.id !== ideaId);
      }
      return current.map((idea) => (idea.id === ideaId ? { ...idea, ...patch } : idea));
    });
  };

  const approveIdea = async (ideaId: string) => {
    setMutating(true);
    try {
      await apiRequest(`/api/v1/social/ideas/${ideaId}/approve`, {
        method: "POST",
      });
      patchIdea(ideaId, { status: "approved", rejection_reason: null });
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const deleteIdea = async (ideaId: string) => {
    setMutating(true);
    try {
      await apiRequest<void>(`/api/v1/social/ideas/${ideaId}`, {
        method: "DELETE",
      });
      queryClient.setQueryData<SocialIdeaResponse[]>(ideasQueryKey, (current = []) =>
        current.filter((idea) => idea.id !== ideaId),
      );
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const openCreate = () => {
    setIdeaForm({
      ...EMPTY_IDEA_FORM,
      platform_id: platformId || platforms[0]?.id || "",
    });
    setCreateOpen(true);
  };

  const submitCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ideaForm.title.trim() || !ideaForm.platform_id) return;
    await run(() =>
      apiRequest("/api/v1/social/ideas", {
        method: "POST",
        body: JSON.stringify({
          brand_id: brandId,
          platform_id: ideaForm.platform_id,
          pillar_id: ideaForm.pillar_id || null,
          format: ideaForm.format,
          title: ideaForm.title.trim(),
          hook: ideaForm.hook.trim() || null,
          angle: ideaForm.angle.trim() || null,
          source_type: ideaForm.source_type,
        }),
      }),
    );
    setCreateOpen(false);
    setIdeaForm(EMPTY_IDEA_FORM);
  };

  const openScore = (idea: SocialIdeaResponse) => {
    setScoring(idea);
    setScoreForm(
      Object.fromEntries(
        SOCIAL_SCORE_FIELDS.map(([key]) => [
          key,
          idea[key as keyof SocialIdeaResponse]?.toString() ?? "",
        ]),
      ) as Record<string, string>,
    );
  };

  const submitScore = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!scoring) return;
    const payload: Record<string, unknown> = {};
    const scorePatch: Partial<SocialIdeaResponse> = {};
    for (const [key] of SOCIAL_SCORE_FIELDS) {
      if (scoreForm[key] !== "") {
        payload[key] = Number(scoreForm[key]);
        scorePatch[key] = scoreForm[key];
      }
    }
    setMutating(true);
    try {
      await apiRequest(`/api/v1/social/ideas/${scoring.id}/score`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      patchIdea(scoring.id, scorePatch);
      setScoring(null);
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const submitReject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rejecting || !rejectReason.trim()) return;
    const rejection_reason = rejectReason.trim();
    setMutating(true);
    try {
      await apiRequest(`/api/v1/social/ideas/${rejecting.id}/reject`, {
        method: "POST",
        body: JSON.stringify({ rejection_reason }),
      });
      patchIdea(rejecting.id, { status: "rejected", rejection_reason });
      setRejecting(null);
      setRejectReason("");
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const submitPlan = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!planning) return;
    await run(() =>
      apiRequest("/api/v1/social/calendar-items", {
        method: "POST",
        body: JSON.stringify({
          social_idea_id: planning.id,
          planned_publish_at: planForm.planned_publish_at
            ? new Date(planForm.planned_publish_at).toISOString()
            : null,
          timezone: planForm.timezone.trim() || null,
          assigned_agent: planForm.assigned_agent.trim() || null,
          campaign_id: planForm.campaign_id.trim() || null,
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
        <Button size="sm" className="rounded-lg" onClick={openCreate}>
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
          <p className="text-sm font-medium">No social ideas here yet</p>
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
              <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(13rem,max-content)] sm:items-start">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{idea.title}</span>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        socialBadgeClass(idea.status),
                      )}
                    >
                      {statusLabel(idea.status)}
                    </span>
                    <span className="inline-flex rounded-full bg-fuchsia-100 px-2 py-0.5 text-xs font-medium text-fuchsia-700">
                      {platformName(idea.platform_id)}
                    </span>
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600">
                      {statusLabel(idea.format)}
                    </span>
                  </div>
                  {idea.hook && (
                    <div className="truncate text-xs text-muted-foreground">{idea.hook}</div>
                  )}
                  {idea.rejection_reason && (
                    <div className="text-xs text-rose-600">Rejected: {idea.rejection_reason}</div>
                  )}
                </div>
                <div className="flex min-w-52 shrink-0 justify-end gap-1">
                  {idea.status !== "approved" && idea.status !== "planned" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-lg text-emerald-700"
                      disabled={mutating}
                      onClick={() => approveIdea(idea.id)}
                    >
                      <Check className="mr-1 h-3.5 w-3.5" /> Approve
                    </Button>
                  )}
                  {idea.status === "approved" && (
                    <Button
                      size="sm"
                      className="h-8 rounded-lg"
                      disabled={mutating}
                      onClick={() => {
                        setPlanning(idea);
                        setPlanForm({
                          planned_publish_at: "",
                          timezone: "",
                          assigned_agent: "",
                          campaign_id: "",
                        });
                      }}
                    >
                      <CalendarPlus className="mr-1 h-3.5 w-3.5" /> Plan
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        disabled={mutating}
                        aria-label={`Open actions for ${idea.title}`}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      <DropdownMenuItem onClick={() => openScore(idea)}>
                        <Star className="h-4 w-4" /> Score
                      </DropdownMenuItem>
                      {idea.status !== "rejected" && idea.status !== "planned" && (
                        <DropdownMenuItem
                          className="text-rose-700 focus:text-rose-700"
                          onClick={() => {
                            setRejecting(idea);
                            setRejectReason("");
                          }}
                        >
                          <ThumbsDown className="h-4 w-4" /> Reject
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => deleteIdea(idea.id)}
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {SOCIAL_SCORE_FIELDS.some(
                ([key]) => idea[key as keyof SocialIdeaResponse] != null,
              ) && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {SOCIAL_SCORE_FIELDS.map(([key, label]) => {
                    const value = idea[key as keyof SocialIdeaResponse];
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
              <DialogTitle>New social idea</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="social-idea-title">Title</Label>
                <Input
                  id="social-idea-title"
                  value={ideaForm.title}
                  onChange={(e) => setIdeaForm((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Platform</Label>
                  <Select
                    value={ideaForm.platform_id || undefined}
                    onValueChange={(value) =>
                      setIdeaForm((prev) => ({ ...prev, platform_id: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pick a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((platform) => (
                        <SelectItem key={platform.id} value={platform.id}>
                          {platform.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Format</Label>
                  <Select
                    value={ideaForm.format}
                    onValueChange={(value: SocialIdeaFormat) =>
                      setIdeaForm((prev) => ({ ...prev, format: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SOCIAL_IDEA_FORMATS.map((format) => (
                        <SelectItem key={format} value={format} className="capitalize">
                          {statusLabel(format)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social-idea-hook">Hook</Label>
                <Textarea
                  id="social-idea-hook"
                  rows={2}
                  value={ideaForm.hook}
                  onChange={(e) => setIdeaForm((prev) => ({ ...prev, hook: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social-idea-angle">Angle</Label>
                <Textarea
                  id="social-idea-angle"
                  rows={2}
                  value={ideaForm.angle}
                  onChange={(e) => setIdeaForm((prev) => ({ ...prev, angle: e.target.value }))}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Source</Label>
                  <Select
                    value={ideaForm.source_type}
                    onValueChange={(value: SocialIdeaSourceType) =>
                      setIdeaForm((prev) => ({ ...prev, source_type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SOCIAL_SOURCE_TYPES.map((source) => (
                        <SelectItem key={source} value={source} className="capitalize">
                          {statusLabel(source)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              <Button
                type="submit"
                disabled={mutating || !ideaForm.title.trim() || !ideaForm.platform_id}
              >
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Score idea */}
      <Dialog open={scoring !== null} onOpenChange={(open) => !open && setScoring(null)}>
        <DialogContent className="rounded-2xl">
          <form onSubmit={submitScore}>
            <DialogHeader>
              <DialogTitle>Score idea</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {SOCIAL_SCORE_FIELDS.map(([key, label]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={`social-score-${key}`}>{label}</Label>
                  <Input
                    id={`social-score-${key}`}
                    type="number"
                    min={0}
                    max={100}
                    value={scoreForm[key]}
                    onChange={(e) => setScoreForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </div>
              ))}
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
              <Label htmlFor="social-reject-reason">Reason</Label>
              <Textarea
                id="social-reject-reason"
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
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="social-plan-date">Publish at</Label>
                  <Input
                    id="social-plan-date"
                    type="datetime-local"
                    value={planForm.planned_publish_at}
                    onChange={(e) =>
                      setPlanForm((prev) => ({ ...prev, planned_publish_at: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="social-plan-timezone">Timezone</Label>
                  <Input
                    id="social-plan-timezone"
                    placeholder="Europe/Kyiv"
                    value={planForm.timezone}
                    onChange={(e) => setPlanForm((prev) => ({ ...prev, timezone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="social-plan-agent">Assigned agent</Label>
                  <Input
                    id="social-plan-agent"
                    value={planForm.assigned_agent}
                    onChange={(e) =>
                      setPlanForm((prev) => ({ ...prev, assigned_agent: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="social-plan-campaign">Campaign</Label>
                  <Input
                    id="social-plan-campaign"
                    value={planForm.campaign_id}
                    onChange={(e) =>
                      setPlanForm((prev) => ({ ...prev, campaign_id: e.target.value }))
                    }
                  />
                </div>
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
