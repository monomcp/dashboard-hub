import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Loader2, Pencil } from "lucide-react";
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
  const [strategy, setStrategy] = useState<SocialStrategyResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>({});
  const [formError, setFormError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const page = await apiRequest<Page<SocialStrategyResponse>>(
        `/api/v1/social/strategies?brand_id=${brandId}&limit=1`,
      );
      setStrategy(page.items[0] ?? null);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [brandId, onError]);

  useEffect(() => {
    void load();
  }, [load]);

  const openDialog = () => {
    const next: FormState = {};
    for (const [key] of LIST_FIELDS) {
      next[key] = listToLines((strategy?.[key as keyof SocialStrategyResponse] as unknown[]) ?? []);
    }
    for (const [key] of DICT_FIELDS) {
      next[key] = dictToText(
        (strategy?.[key as keyof SocialStrategyResponse] as Record<string, unknown> | null) ??
          null,
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
      setFormError("One of the JSON fields is invalid — use a JSON object like {\"key\": \"value\"}.");
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
      await load();
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
            {LIST_FIELDS.map(([key, label]) => {
              const items = (strategy[key as keyof SocialStrategyResponse] as unknown[]) ?? [];
              return (
                <div key={key}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {label}
                  </dt>
                  <dd>
                    {items.length
                      ? items
                          .map((item) =>
                            typeof item === "string" ? item : JSON.stringify(item),
                          )
                          .join(", ")
                      : "—"}
                  </dd>
                </div>
              );
            })}
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
          <p className="text-sm text-muted-foreground">
            No social strategy yet for this company.
          </p>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>{strategy ? "Edit social strategy" : "Create social strategy"}</DialogTitle>
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
