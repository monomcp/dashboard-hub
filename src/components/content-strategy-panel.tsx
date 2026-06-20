import { useEffect, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
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
import { apiRequest } from "@/lib/api-client";
import {
  linesToList,
  listToLines,
  type Page,
  type PillarResponse,
  type StrategyResponse,
} from "@/lib/content-types";

type Props = {
  brandId: string;
  onError: (err: unknown) => void;
};

const EMPTY_STRATEGY_FORM = {
  target_personas: "",
  funnel_stages: "",
  seo_clusters: "",
  distribution_channels: "",
  success_metrics: "",
  publishing_frequency: "",
};

const EMPTY_PILLAR_FORM = {
  name: "",
  description: "",
  target_persona: "",
  funnel_stage: "",
  example_topics: "",
  priority: "0",
};

type FunnelStageDetails = {
  stage: string;
  goal?: string;
  contentTypes: string[];
};

type SuccessMetricDetails = {
  metric: string;
  why?: string;
};

type PublishingFrequencyDetails = {
  channel: string;
  cadence: string;
};

export function ContentStrategyPanel({ brandId, onError }: Props) {
  const [mutating, setMutating] = useState(false);
  const [strategyDialog, setStrategyDialog] = useState(false);
  const [strategyForm, setStrategyForm] = useState(EMPTY_STRATEGY_FORM);
  const [channelDeleteIndex, setChannelDeleteIndex] = useState<number | null>(null);
  const [pillarDialog, setPillarDialog] = useState(false);
  const [pillarToDelete, setPillarToDelete] = useState<PillarResponse | null>(null);
  const [editingPillar, setEditingPillar] = useState<PillarResponse | null>(null);
  const [pillarForm, setPillarForm] = useState(EMPTY_PILLAR_FORM);

  const strategyQuery = useQuery({
    queryKey: ["content", "strategy-pillars", brandId],
    queryFn: async () => {
      const page = await apiRequest<Page<StrategyResponse>>(
        `/api/v1/content/strategies?brand_id=${brandId}&limit=1`,
      );
      const current = page.items[0] ?? null;
      const pillars = current
        ? await apiRequest<PillarResponse[]>(`/api/v1/content/strategies/${current.id}/pillars`)
        : [];
      return { strategy: current, pillars };
    },
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (strategyQuery.error) onError(strategyQuery.error);
  }, [strategyQuery.error, onError]);

  const strategy = strategyQuery.data?.strategy ?? null;
  const pillars = strategyQuery.data?.pillars ?? [];
  const loading = strategyQuery.isLoading;

  const openStrategyDialog = () => {
    setStrategyForm(
      strategy
        ? {
            target_personas: listToLines(strategy.target_personas),
            funnel_stages: listToLines(strategy.funnel_stages),
            seo_clusters: listToLines(strategy.seo_clusters),
            distribution_channels: listToLines(strategy.distribution_channels),
            success_metrics: listToLines(strategy.success_metrics),
            publishing_frequency: strategy.publishing_frequency ?? "",
          }
        : EMPTY_STRATEGY_FORM,
    );
    setStrategyDialog(true);
  };

  const submitStrategy = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMutating(true);
    const payload = {
      target_personas: linesToList(strategyForm.target_personas),
      funnel_stages: linesToList(strategyForm.funnel_stages),
      seo_clusters: linesToList(strategyForm.seo_clusters),
      distribution_channels: linesToList(strategyForm.distribution_channels),
      success_metrics: linesToList(strategyForm.success_metrics),
      publishing_frequency: strategyForm.publishing_frequency.trim() || null,
    };
    try {
      if (strategy) {
        await apiRequest(`/api/v1/content/strategies/${strategy.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/api/v1/content/strategies", {
          method: "POST",
          body: JSON.stringify({ ...payload, brand_id: brandId }),
        });
      }
      setStrategyDialog(false);
      await strategyQuery.refetch();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const openPillarDialog = (pillar: PillarResponse | null) => {
    setEditingPillar(pillar);
    setPillarForm(
      pillar
        ? {
            name: pillar.name,
            description: pillar.description ?? "",
            target_persona: pillar.target_persona ?? "",
            funnel_stage: pillar.funnel_stage ?? "",
            example_topics: listToLines(pillar.example_topics),
            priority: String(pillar.priority),
          }
        : EMPTY_PILLAR_FORM,
    );
    setPillarDialog(true);
  };

  const submitPillar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!strategy || !pillarForm.name.trim()) return;
    setMutating(true);
    const payload = {
      name: pillarForm.name.trim(),
      description: pillarForm.description.trim() || null,
      target_persona: pillarForm.target_persona.trim() || null,
      funnel_stage: pillarForm.funnel_stage.trim() || null,
      example_topics: linesToList(pillarForm.example_topics),
      priority: Number(pillarForm.priority) || 0,
    };
    try {
      if (editingPillar) {
        await apiRequest(`/api/v1/content/pillars/${editingPillar.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest(`/api/v1/content/strategies/${strategy.id}/pillars`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      setPillarDialog(false);
      await strategyQuery.refetch();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const deletePillar = async () => {
    if (!pillarToDelete) return;
    setMutating(true);
    try {
      await apiRequest<void>(`/api/v1/content/pillars/${pillarToDelete.id}`, {
        method: "DELETE",
      });
      setPillarToDelete(null);
      await strategyQuery.refetch();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const deleteDistributionChannel = async () => {
    if (!strategy || channelDeleteIndex === null) return;
    setMutating(true);
    try {
      await apiRequest(`/api/v1/content/strategies/${strategy.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          distribution_channels: strategy.distribution_channels.filter(
            (_channel, index) => index !== channelDeleteIndex,
          ),
        }),
      });
      setChannelDeleteIndex(null);
      await strategyQuery.refetch();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-2 py-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-16 animate-pulse rounded-xl bg-[hsl(220,33%,96%)]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-black/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-medium">Strategy</h2>
          <Button variant="outline" size="sm" className="rounded-lg" onClick={openStrategyDialog}>
            <Pencil className="mr-1 h-4 w-4" /> {strategy ? "Edit" : "Create strategy"}
          </Button>
        </div>
        {strategy ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <StrategyList label="Target personas" items={strategy.target_personas} />
            <FunnelStageList items={strategy.funnel_stages} />
            <BadgeList label="SEO clusters" items={strategy.seo_clusters} />
            <DistributionChannelList
              items={strategy.distribution_channels}
              mutating={mutating}
              onDeleteRequest={setChannelDeleteIndex}
            />
            <SuccessMetricList items={strategy.success_metrics} />
            <PublishingFrequencyList value={strategy.publishing_frequency} />
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">No content strategy yet for this brand.</p>
        )}
      </div>

      {strategy && (
        <div className="rounded-2xl border border-black/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-medium">Pillars</h2>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              onClick={() => openPillarDialog(null)}
            >
              <Plus className="mr-1 h-4 w-4" /> Add pillar
            </Button>
          </div>
          {pillars.length === 0 && <p className="text-sm text-muted-foreground">No pillars yet.</p>}
          <ul className="grid gap-2">
            {pillars.map((pillar) => (
              <li
                key={pillar.id}
                className="group flex items-start justify-between gap-3 rounded-xl border border-black/5 px-3 py-2 text-sm"
              >
                <div className="min-w-0">
                  <div className="font-medium">
                    {pillar.name}
                    <span className="ml-2 text-xs text-muted-foreground">
                      priority {pillar.priority}
                    </span>
                  </div>
                  {pillar.description && (
                    <div className="text-muted-foreground">{pillar.description}</div>
                  )}
                  {(pillar.target_persona || pillar.funnel_stage) && (
                    <div className="text-xs text-muted-foreground">
                      {[pillar.target_persona, pillar.funnel_stage].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full opacity-0 transition-opacity hover:bg-black/5 focus:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100"
                      disabled={mutating}
                      aria-label={`Open actions for ${pillar.name}`}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36 rounded-xl">
                    <DropdownMenuItem
                      className="gap-2 rounded-lg"
                      onSelect={() => openPillarDialog(pillar)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-2 rounded-lg text-destructive"
                      onSelect={() => setPillarToDelete(pillar)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Dialog open={strategyDialog} onOpenChange={setStrategyDialog}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
          <form onSubmit={submitStrategy}>
            <DialogHeader>
              <DialogTitle>{strategy ? "Edit strategy" : "Create strategy"}</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              {(
                [
                  ["target_personas", "Target personas"],
                  ["funnel_stages", "Funnel stages"],
                  ["seo_clusters", "SEO clusters"],
                  ["distribution_channels", "Distribution channels"],
                  ["success_metrics", "Success metrics"],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={`strategy-${key}`}>{label} (one per line)</Label>
                  <Textarea
                    id={`strategy-${key}`}
                    rows={3}
                    value={strategyForm[key]}
                    onChange={(e) =>
                      setStrategyForm((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                  />
                </div>
              ))}
              <div className="grid gap-2">
                <Label htmlFor="strategy-frequency">Publishing frequency</Label>
                <Input
                  id="strategy-frequency"
                  placeholder="e.g. 2 posts per week"
                  value={strategyForm.publishing_frequency}
                  onChange={(e) =>
                    setStrategyForm((prev) => ({ ...prev, publishing_frequency: e.target.value }))
                  }
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStrategyDialog(false)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutating}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={pillarDialog} onOpenChange={setPillarDialog}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
          <form onSubmit={submitPillar}>
            <DialogHeader>
              <DialogTitle>{editingPillar ? "Edit pillar" : "Add pillar"}</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="pillar-name">Name</Label>
                <Input
                  id="pillar-name"
                  value={pillarForm.name}
                  onChange={(e) => setPillarForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pillar-description">Description</Label>
                <Textarea
                  id="pillar-description"
                  rows={2}
                  value={pillarForm.description}
                  onChange={(e) =>
                    setPillarForm((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="pillar-persona">Target persona</Label>
                  <Input
                    id="pillar-persona"
                    value={pillarForm.target_persona}
                    onChange={(e) =>
                      setPillarForm((prev) => ({ ...prev, target_persona: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="pillar-funnel">Funnel stage</Label>
                  <Input
                    id="pillar-funnel"
                    placeholder="tofu / mofu / bofu"
                    value={pillarForm.funnel_stage}
                    onChange={(e) =>
                      setPillarForm((prev) => ({ ...prev, funnel_stage: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pillar-topics">Example topics (one per line)</Label>
                <Textarea
                  id="pillar-topics"
                  rows={3}
                  value={pillarForm.example_topics}
                  onChange={(e) =>
                    setPillarForm((prev) => ({ ...prev, example_topics: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pillar-priority">Priority</Label>
                <Input
                  id="pillar-priority"
                  type="number"
                  value={pillarForm.priority}
                  onChange={(e) => setPillarForm((prev) => ({ ...prev, priority: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPillarDialog(false)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutating || !pillarForm.name.trim()}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingPillar ? "Save" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={channelDeleteIndex !== null}
        onOpenChange={(open) => {
          if (!open) setChannelDeleteIndex(null);
        }}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This distribution channel will be removed from the strategy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full" disabled={mutating}>
              No
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={mutating}
              onClick={(event) => {
                event.preventDefault();
                void deleteDistributionChannel();
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={pillarToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPillarToDelete(null);
        }}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This pillar will be deleted from the strategy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full" disabled={mutating}>
              No
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={mutating}
              onClick={(event) => {
                event.preventDefault();
                void deletePillar();
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function StrategyList({ label, items }: { label: string; items: unknown[] }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd>{items.length ? items.map(formatListItem).join(", ") : "—"}</dd>
    </div>
  );
}

function BadgeList({ label, items }: { label: string; items: unknown[] }) {
  return (
    <div className="sm:col-span-2">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-2">
        {items.length ? (
          <div className="flex flex-wrap gap-1.5">
            {items.map((item, index) => {
              const text = formatListItem(item);
              return (
                <Badge
                  key={`${text}-${index}`}
                  variant="secondary"
                  className="border-black/5 bg-[hsl(220,33%,97%)] font-medium text-muted-foreground"
                >
                  {text}
                </Badge>
              );
            })}
          </div>
        ) : (
          "—"
        )}
      </dd>
    </div>
  );
}

function FunnelStageList({ items }: { items: unknown[] }) {
  const stages = funnelStageDetails(items);

  return (
    <div className="sm:col-span-2">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Funnel stages
      </dt>
      <dd className="mt-2">
        {stages.length ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {stages.map((stage, index) => (
              <li
                key={`${stage.stage}-${index}`}
                className="min-h-28 rounded-lg border border-black/5 bg-white px-3 py-2 text-sm shadow-sm"
              >
                <div className="font-medium">{stage.stage}</div>
                {stage.goal && (
                  <div className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {stage.goal}
                  </div>
                )}
                {stage.contentTypes.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {stage.contentTypes.map((contentType) => (
                      <Badge
                        key={contentType}
                        variant="secondary"
                        className="border-black/5 bg-[hsl(220,33%,97%)] font-medium text-muted-foreground"
                      >
                        {contentType}
                      </Badge>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          "—"
        )}
      </dd>
    </div>
  );
}

function SuccessMetricList({ items }: { items: unknown[] }) {
  const metrics = successMetricDetails(items);

  return (
    <div className="sm:col-span-2">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Success metrics
      </dt>
      <dd className="mt-2">
        {metrics.length ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {metrics.map((metric, index) => (
              <li
                key={`${metric.metric}-${index}`}
                className="min-h-24 rounded-lg border border-black/5 bg-white px-3 py-2 text-sm shadow-sm"
              >
                <div className="font-medium">{metric.metric}</div>
                {metric.why && (
                  <div className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {metric.why}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          "—"
        )}
      </dd>
    </div>
  );
}

function PublishingFrequencyList({ value }: { value: unknown }) {
  const frequencies = publishingFrequencyDetails(value);

  return (
    <div className="sm:col-span-2">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Publishing frequency
      </dt>
      <dd className="mt-2">
        {frequencies.length ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {frequencies.map((frequency, index) => (
              <li
                key={`${frequency.channel}-${index}`}
                className="rounded-lg border border-black/5 bg-white px-3 py-2 text-sm shadow-sm"
              >
                <div className="font-medium">{frequency.channel}</div>
                <div className="mt-1 text-xs text-muted-foreground">{frequency.cadence}</div>
              </li>
            ))}
          </ul>
        ) : (
          "—"
        )}
      </dd>
    </div>
  );
}

function DistributionChannelList({
  items,
  mutating,
  onDeleteRequest,
}: {
  items: unknown[];
  mutating: boolean;
  onDeleteRequest: (index: number) => void;
}) {
  return (
    <div className="sm:col-span-2">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Channels
      </dt>
      <dd className="mt-2">
        {items.length ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {items.map((item, index) => {
              const details = channelDetails(item);
              return (
                <li
                  key={`${details.title}-${index}`}
                  className="group flex min-h-20 items-start justify-between gap-3 rounded-lg border border-black/5 bg-white px-3 py-2 text-sm shadow-sm"
                >
                  <div className="min-w-0">
                    <div className="font-medium">{details.title}</div>
                    {details.cadence && (
                      <div className="text-xs text-muted-foreground">{details.cadence}</div>
                    )}
                    {details.role && (
                      <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {details.role}
                      </div>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full opacity-0 transition-opacity hover:bg-black/5 focus:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100"
                        disabled={mutating}
                        aria-label={`Open actions for ${details.title}`}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36 rounded-xl">
                      <DropdownMenuItem
                        className="gap-2 rounded-lg text-destructive"
                        onSelect={() => onDeleteRequest(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              );
            })}
          </ul>
        ) : (
          "—"
        )}
      </dd>
    </div>
  );
}

function funnelStageDetails(items: unknown[]): FunnelStageDetails[] {
  return items.flatMap((item) => {
    const expanded = parseJsonLikeValue(item);
    if (Array.isArray(expanded)) return expanded.flatMap((entry) => funnelStageDetails([entry]));

    if (expanded && typeof expanded === "object") {
      const record = expanded as Record<string, unknown>;
      const stage =
        readText(record.stage) ??
        readText(record.name) ??
        readText(record.title) ??
        readText(record.label) ??
        "Funnel stage";

      return [
        {
          stage,
          goal: readText(record.goal) ?? readText(record.description),
          contentTypes: readTextList(record.content_types ?? record.contentTypes),
        },
      ];
    }

    const text = formatListItem(expanded);
    return text ? [{ stage: text, contentTypes: [] }] : [];
  });
}

function successMetricDetails(items: unknown[]): SuccessMetricDetails[] {
  return items.flatMap((item) => {
    const expanded = parseJsonLikeValue(item);
    if (Array.isArray(expanded)) return expanded.flatMap((entry) => successMetricDetails([entry]));

    if (expanded && typeof expanded === "object") {
      const record = expanded as Record<string, unknown>;
      return [
        {
          metric:
            readText(record.metric) ??
            readText(record.name) ??
            readText(record.title) ??
            readText(record.label) ??
            "Metric",
          why: readText(record.why) ?? readText(record.description),
        },
      ];
    }

    const text = formatListItem(expanded);
    return text ? [{ metric: text }] : [];
  });
}

function publishingFrequencyDetails(value: unknown): PublishingFrequencyDetails[] {
  const parsed = parseJsonLikeValue(value);

  if (Array.isArray(parsed)) {
    return parsed.flatMap((item) => publishingFrequencyDetails(item));
  }

  if (parsed && typeof parsed === "object") {
    const record = parsed as Record<string, unknown>;
    const directChannel =
      readText(record.channel) ?? readText(record.platform) ?? readText(record.name);
    const directCadence =
      readText(record.cadence) ?? readText(record.frequency) ?? readText(record.schedule);

    if (directChannel || directCadence) {
      return [
        {
          channel: directChannel ?? "Publishing",
          cadence: directCadence ?? formatListItem(record),
        },
      ];
    }

    return Object.entries(record)
      .map(([channel, cadence]) => ({
        channel,
        cadence: formatListItem(cadence),
      }))
      .filter((item) => item.channel.trim() && item.cadence.trim());
  }

  if (typeof parsed !== "string") return [];

  return parsed
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const separator = item.indexOf(":");
      if (separator === -1) return { channel: "Publishing", cadence: item };
      return {
        channel: item.slice(0, separator).trim(),
        cadence: item.slice(separator + 1).trim(),
      };
    })
    .filter((item) => item.channel && item.cadence);
}

function parseJsonLikeValue(value: unknown): unknown {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed || (trimmed[0] !== "{" && trimmed[0] !== "[")) return value;
  try {
    return JSON.parse(trimmed) as unknown;
  } catch {
    return value;
  }
}

function channelDetails(item: unknown): { title: string; cadence?: string; role?: string } {
  const parsed = parseJsonLikeValue(item);
  if (typeof parsed === "string") return { title: parsed };
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { title: formatListItem(parsed) };
  }
  const record = parsed as Record<string, unknown>;
  return {
    title: readText(record.channel) ?? readText(record.name) ?? readText(record.slug) ?? "Channel",
    cadence: readText(record.cadence),
    role: readText(record.role) ?? readText(record.description),
  };
}

function readText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function readTextList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item.trim() : formatListItem(item)))
    .filter(Boolean);
}

function formatListItem(item: unknown): string {
  const parsed = parseJsonLikeValue(item);
  if (typeof parsed === "string") return parsed;
  if (parsed && typeof parsed === "object") {
    const record = parsed as Record<string, unknown>;
    return (
      readText(record.name) ??
      readText(record.title) ??
      readText(record.label) ??
      readText(record.channel) ??
      JSON.stringify(parsed)
    );
  }
  return String(parsed);
}
