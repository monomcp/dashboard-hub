import { useEffect, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
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

export function ContentStrategyPanel({ brandId, onError }: Props) {
  const [mutating, setMutating] = useState(false);
  const [strategyDialog, setStrategyDialog] = useState(false);
  const [strategyForm, setStrategyForm] = useState(EMPTY_STRATEGY_FORM);
  const [pillarDialog, setPillarDialog] = useState(false);
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

  const deletePillar = async (pillar: PillarResponse) => {
    setMutating(true);
    try {
      await apiRequest<void>(`/api/v1/content/pillars/${pillar.id}`, { method: "DELETE" });
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
            <StrategyList label="Funnel stages" items={strategy.funnel_stages} />
            <StrategyList label="SEO clusters" items={strategy.seo_clusters} />
            <StrategyList label="Channels" items={strategy.distribution_channels} />
            <StrategyList label="Success metrics" items={strategy.success_metrics} />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Publishing frequency
              </dt>
              <dd>{strategy.publishing_frequency || "—"}</dd>
            </div>
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
                className="flex items-start justify-between gap-3 rounded-xl border border-black/5 px-3 py-2 text-sm"
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
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    disabled={mutating}
                    onClick={() => openPillarDialog(pillar)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-destructive"
                    disabled={mutating}
                    onClick={() => deletePillar(pillar)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
    </div>
  );
}

function StrategyList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd>{items.length ? items.join(", ") : "—"}</dd>
    </div>
  );
}
