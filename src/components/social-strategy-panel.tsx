import { useEffect, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { linesToList, listToLines, type Page } from "@/lib/content-types";
import type { SocialStrategyResponse } from "@/lib/social-types";

type Props = {
  brandId: string;
  onError: (err: unknown) => void;
};

const LIST_FIELDS = [
  ["target_audiences", "Target audiences"],
  ["platforms", "Platforms"],
  ["content_mix", "Content mix"],
  ["kpis", "KPIs"],
] as const;

const DICT_FIELDS = [
  ["goals", "Goals"],
  ["posting_frequency", "Posting frequency"],
  ["engagement_strategy", "Engagement strategy"],
  ["growth_strategy", "Growth strategy"],
  ["constraints", "Constraints"],
] as const;

type FormState = Record<string, string>;

type AudienceDetails = {
  name: string;
  description?: string;
  needs: string[];
  painPoints: string[];
  preferredContent: string[];
};

type PlatformDetails = {
  name: string;
  role?: string;
  contentTypes: string[];
};

function dictToText(value: Record<string, unknown> | null | undefined) {
  if (!value || Object.keys(value).length === 0) return "";
  return JSON.stringify(value, null, 2);
}

function textToDict(value: string): Record<string, unknown> {
  const trimmed = value.trim();
  if (!trimmed) return {};
  const parsed = JSON.parse(trimmed) as unknown;
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Expected a JSON object");
  }
  return parsed as Record<string, unknown>;
}

export function SocialStrategyPanel({ brandId, onError }: Props) {
  const [mutating, setMutating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>({});
  const [formError, setFormError] = useState("");

  const strategyQuery = useQuery({
    queryKey: ["social", "strategy", brandId],
    queryFn: async () => {
      const page = await apiRequest<Page<SocialStrategyResponse>>(
        `/api/v1/social/strategies?brand_id=${brandId}&limit=1`,
      );
      return page.items[0] ?? null;
    },
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (strategyQuery.error) onError(strategyQuery.error);
  }, [strategyQuery.error, onError]);

  const strategy = strategyQuery.data ?? null;
  const loading = strategyQuery.isLoading;

  const openDialog = () => {
    const next: FormState = {};
    for (const [key] of LIST_FIELDS) {
      next[key] = listToLines((strategy?.[key as keyof SocialStrategyResponse] as unknown[]) ?? []);
    }
    for (const [key] of DICT_FIELDS) {
      next[key] = dictToText(
        (strategy?.[key as keyof SocialStrategyResponse] as Record<string, unknown> | null) ?? null,
      );
    }
    setForm(next);
    setFormError("");
    setDialogOpen(true);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let payload: Record<string, unknown>;
    try {
      payload = {
        target_audiences: linesToList(form.target_audiences ?? ""),
        platforms: linesToList(form.platforms ?? ""),
        content_mix: linesToList(form.content_mix ?? ""),
        kpis: linesToList(form.kpis ?? ""),
        goals: textToDict(form.goals ?? ""),
        posting_frequency: textToDict(form.posting_frequency ?? ""),
        engagement_strategy: textToDict(form.engagement_strategy ?? ""),
        growth_strategy: textToDict(form.growth_strategy ?? ""),
        constraints: form.constraints?.trim() ? textToDict(form.constraints) : null,
      };
    } catch {
      setFormError('One of the JSON fields is invalid — use a JSON object like {"key": "value"}.');
      return;
    }
    setMutating(true);
    try {
      if (strategy) {
        await apiRequest(`/api/v1/social/strategies/${strategy.id}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        await apiRequest("/api/v1/social/strategies", {
          method: "POST",
          body: JSON.stringify({ ...payload, brand_id: brandId }),
        });
      }
      setDialogOpen(false);
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
          <h2 className="text-lg font-medium">Social strategy</h2>
          <Button variant="outline" size="sm" className="rounded-lg" onClick={openDialog}>
            <Pencil className="mr-1 h-4 w-4" /> {strategy ? "Edit" : "Create strategy"}
          </Button>
        </div>
        {strategy ? (
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <TargetAudienceList items={strategy.target_audiences} />
            <PlatformList items={(strategy.platforms as unknown[]) ?? []} />
            <SimpleList label="Content mix" items={strategy.content_mix} />
            <SimpleList label="KPIs" items={strategy.kpis} />
            {DICT_FIELDS.map(([key, label]) => {
              const value = strategy[key as keyof SocialStrategyResponse] as Record<
                string,
                unknown
              > | null;
              const text = dictToText(value);
              return (
                <div key={key}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {label}
                  </dt>
                  <dd>
                    {text ? (
                      <pre className="mt-1 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-[hsl(220,33%,97%)] p-2 text-xs">
                        {text}
                      </pre>
                    ) : (
                      "—"
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        ) : (
          <p className="text-sm text-muted-foreground">No social strategy yet for this company.</p>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>
                {strategy ? "Edit social strategy" : "Create social strategy"}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              {LIST_FIELDS.map(([key, label]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={`social-strategy-${key}`}>{label} (one per line)</Label>
                  <Textarea
                    id={`social-strategy-${key}`}
                    rows={3}
                    value={form[key] ?? ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </div>
              ))}
              {DICT_FIELDS.map(([key, label]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={`social-strategy-${key}`}>{label} (JSON object)</Label>
                  <Textarea
                    id={`social-strategy-${key}`}
                    rows={3}
                    placeholder='{"key": "value"}'
                    value={form[key] ?? ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </div>
              ))}
              {formError && <p className="text-sm text-destructive">{formError}</p>}
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
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
    </div>
  );
}

function TargetAudienceList({ items }: { items: unknown[] }) {
  const audiences = audienceDetails(items);

  return (
    <div className="sm:col-span-2">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Target audiences
      </dt>
      <dd className="mt-2">
        {audiences.length ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {audiences.map((audience, index) => (
              <li
                key={`${audience.name}-${index}`}
                className="rounded-lg border border-black/5 bg-white px-3 py-2 text-sm shadow-sm"
              >
                <div className="font-medium">{audience.name}</div>
                {audience.description && (
                  <div className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {audience.description}
                  </div>
                )}
                <BadgeGroup items={audience.needs} />
                <BadgeGroup items={audience.painPoints} />
                <BadgeGroup items={audience.preferredContent} />
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

function PlatformList({ items }: { items: unknown[] }) {
  const platforms = platformDetails(items);

  return (
    <div className="sm:col-span-2">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Platforms
      </dt>
      <dd className="mt-2">
        {platforms.length ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {platforms.map((platform, index) => (
              <li
                key={`${platform.name}-${index}`}
                className="rounded-lg border border-black/5 bg-white px-3 py-2 text-sm shadow-sm"
              >
                <div className="font-medium">{platform.name}</div>
                {platform.role && (
                  <div className="mt-1 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                    {platform.role}
                  </div>
                )}
                <BadgeGroup items={platform.contentTypes} />
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

function SimpleList({ label, items }: { label: string; items: unknown[] }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd>{items.length ? items.map(formatListItem).join(", ") : "—"}</dd>
    </div>
  );
}

function BadgeGroup({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Badge
          key={item}
          variant="secondary"
          className="border-black/5 bg-[hsl(220,33%,97%)] font-medium text-muted-foreground"
        >
          {item}
        </Badge>
      ))}
    </div>
  );
}

function audienceDetails(items: unknown[]): AudienceDetails[] {
  return items.flatMap((item) => {
    const expanded = parseJsonLikeValue(item);
    if (Array.isArray(expanded)) return expanded.flatMap((entry) => audienceDetails([entry]));

    if (expanded && typeof expanded === "object") {
      const record = expanded as Record<string, unknown>;
      return [
        {
          name:
            readText(record.name) ?? readText(record.title) ?? readText(record.label) ?? "Audience",
          description: readText(record.description),
          needs: readTextList(record.needs),
          painPoints: readTextList(record.pain_points ?? record.painPoints),
          preferredContent: readTextList(record.preferred_content ?? record.preferredContent),
        },
      ];
    }

    const text = formatListItem(expanded);
    return text ? [{ name: text, needs: [], painPoints: [], preferredContent: [] }] : [];
  });
}

function platformDetails(items: unknown[]): PlatformDetails[] {
  return items.flatMap((item) => {
    const expanded = parseJsonLikeValue(item);
    if (Array.isArray(expanded)) return expanded.flatMap((entry) => platformDetails([entry]));

    if (expanded && typeof expanded === "object") {
      const record = expanded as Record<string, unknown>;
      const metadata = record.metadata as Record<string, unknown> | undefined;
      return [
        {
          name:
            readText(record.name) ??
            readText(record.platform) ??
            readText(record.slug) ??
            "Platform",
          role: readText(record.role) ?? readText(metadata?.role) ?? readText(record.description),
          contentTypes: readTextList(record.content_types ?? metadata?.content_types),
        },
      ];
    }

    const text = formatListItem(expanded);
    return text ? [{ name: text, contentTypes: [] }] : [];
  });
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
      readText(record.slug) ??
      JSON.stringify(parsed)
    );
  }
  return String(parsed);
}
