import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Check, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { linesToList, listToLines, statusLabel } from "@/lib/content-types";
import {
  SOCIAL_DRAFT_STATUSES,
  socialBadgeClass,
  type SocialDraftResponse,
  type SocialDraftStatus,
  type SocialVariantResponse,
} from "@/lib/social-types";

type Props = {
  briefId: string;
  onError: (err: unknown) => void;
};

const EMPTY_FORM = {
  caption: "",
  hook: "",
  hashtags: "",
  mentions: "",
  cta: "",
};

export function SocialDraftEditor({ briefId, onError }: Props) {
  const [drafts, setDrafts] = useState<SocialDraftResponse[]>([]);
  const [variants, setVariants] = useState<Record<string, SocialVariantResponse[]>>({});
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SocialDraftResponse | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [variantFor, setVariantFor] = useState<SocialDraftResponse | null>(null);
  const [variantCaption, setVariantCaption] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await apiRequest<SocialDraftResponse[]>(
        `/api/v1/social/briefs/${briefId}/drafts`,
      );
      setDrafts(list);
      const entries = await Promise.all(
        list.map(async (draft) => {
          const draftVariants = await apiRequest<SocialVariantResponse[]>(
            `/api/v1/social/drafts/${draft.id}/variants`,
          );
          return [draft.id, draftVariants] as const;
        }),
      );
      setVariants(Object.fromEntries(entries));
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  }, [briefId, onError]);

  useEffect(() => {
    void load();
  }, [load]);

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

  const openDialog = (draft: SocialDraftResponse | null) => {
    setEditing(draft);
    setForm(
      draft
        ? {
            caption: draft.caption,
            hook: draft.hook ?? "",
            hashtags: listToLines(draft.hashtags),
            mentions: listToLines(draft.mentions),
            cta: draft.cta ?? "",
          }
        : EMPTY_FORM,
    );
    setDialogOpen(true);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.caption.trim()) return;
    const payload = {
      caption: form.caption.trim(),
      hook: form.hook.trim() || null,
      hashtags: linesToList(form.hashtags),
      mentions: linesToList(form.mentions),
      cta: form.cta.trim() || null,
    };
    await run(() =>
      editing
        ? apiRequest(`/api/v1/social/drafts/${editing.id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
          })
        : apiRequest(`/api/v1/social/briefs/${briefId}/drafts`, {
            method: "POST",
            body: JSON.stringify(payload),
          }),
    );
    setDialogOpen(false);
  };

  const submitVariant = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!variantFor || !variantCaption.trim()) return;
    await run(() =>
      apiRequest(`/api/v1/social/drafts/${variantFor.id}/variants`, {
        method: "POST",
        body: JSON.stringify({ variants: [{ caption: variantCaption.trim() }] }),
      }),
    );
    setVariantFor(null);
    setVariantCaption("");
  };

  if (loading) {
    return (
      <div className="grid gap-2 py-2">
        {[1, 2].map((item) => (
          <Skeleton key={item} className="h-14 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Post drafts
        </h4>
        <Button variant="outline" size="sm" className="rounded-lg" onClick={() => openDialog(null)}>
          <Plus className="mr-1 h-4 w-4" /> New draft
        </Button>
      </div>

      {drafts.length === 0 && (
        <p className="text-sm text-muted-foreground">No drafts for this brief yet.</p>
      )}

      <ul className="grid gap-2">
        {drafts.map((draft) => (
          <li key={draft.id} className="rounded-xl border border-black/5 px-3 py-3 text-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                      socialBadgeClass(draft.status),
                    )}
                  >
                    {statusLabel(draft.status)}
                  </span>
                  {draft.hashtags.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {draft.hashtags.join(" ")}
                    </span>
                  )}
                </div>
                <p className="mt-1 whitespace-pre-wrap text-foreground/90">{draft.caption}</p>
                {draft.selected_variant_reason && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Variant choice: {draft.selected_variant_reason}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-1">
                <Select
                  value={draft.status}
                  onValueChange={(value: SocialDraftStatus) =>
                    run(() =>
                      apiRequest(`/api/v1/social/drafts/${draft.id}/status`, {
                        method: "POST",
                        body: JSON.stringify({ status: value }),
                      }),
                    )
                  }
                >
                  <SelectTrigger className="h-8 w-[160px] rounded-lg text-xs capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SOCIAL_DRAFT_STATUSES.map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">
                        {statusLabel(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  disabled={mutating}
                  onClick={() => openDialog(draft)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-destructive"
                  disabled={mutating}
                  onClick={() =>
                    run(() =>
                      apiRequest<void>(`/api/v1/social/drafts/${draft.id}`, {
                        method: "DELETE",
                      }),
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-2 border-t border-black/5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Variants ({variants[draft.id]?.length ?? 0})
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 rounded-lg text-xs"
                  onClick={() => {
                    setVariantFor(draft);
                    setVariantCaption("");
                  }}
                >
                  <Plus className="mr-1 h-3 w-3" /> Add variant
                </Button>
              </div>
              {(variants[draft.id] ?? []).map((variant) => (
                <div
                  key={variant.id}
                  className={cn(
                    "mt-1 flex items-start justify-between gap-2 rounded-lg px-2 py-1.5 text-xs",
                    draft.selected_variant_id === variant.id
                      ? "bg-emerald-50 ring-1 ring-emerald-200"
                      : "bg-[hsl(220,33%,97%)]",
                  )}
                >
                  <span className="whitespace-pre-wrap">{variant.caption}</span>
                  {draft.selected_variant_id === variant.id ? (
                    <span className="inline-flex shrink-0 items-center gap-1 text-emerald-700">
                      <Check className="h-3 w-3" /> Selected
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 shrink-0 rounded-md text-xs"
                      disabled={mutating}
                      onClick={() =>
                        run(() =>
                          apiRequest(`/api/v1/social/drafts/${draft.id}/select-variant`, {
                            method: "POST",
                            body: JSON.stringify({ variant_id: variant.id }),
                          }),
                        )
                      }
                    >
                      Select
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>

      {/* Create / edit draft */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit draft" : "New draft"}</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="social-draft-caption">Caption</Label>
                <Textarea
                  id="social-draft-caption"
                  rows={4}
                  value={form.caption}
                  onChange={(e) => setForm((prev) => ({ ...prev, caption: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social-draft-hook">Hook</Label>
                <Input
                  id="social-draft-hook"
                  value={form.hook}
                  onChange={(e) => setForm((prev) => ({ ...prev, hook: e.target.value }))}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="social-draft-hashtags">Hashtags (one per line)</Label>
                  <Textarea
                    id="social-draft-hashtags"
                    rows={3}
                    value={form.hashtags}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, hashtags: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="social-draft-mentions">Mentions (one per line)</Label>
                  <Textarea
                    id="social-draft-mentions"
                    rows={3}
                    value={form.mentions}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, mentions: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social-draft-cta">CTA</Label>
                <Input
                  id="social-draft-cta"
                  value={form.cta}
                  onChange={(e) => setForm((prev) => ({ ...prev, cta: e.target.value }))}
                />
              </div>
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
              <Button type="submit" disabled={mutating || !form.caption.trim()}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editing ? "Save" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add variant */}
      <Dialog open={variantFor !== null} onOpenChange={(open) => !open && setVariantFor(null)}>
        <DialogContent className="rounded-2xl">
          <form onSubmit={submitVariant}>
            <DialogHeader>
              <DialogTitle>Add variant</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-2">
              <Label htmlFor="social-variant-caption">Caption</Label>
              <Textarea
                id="social-variant-caption"
                rows={4}
                value={variantCaption}
                onChange={(e) => setVariantCaption(e.target.value)}
              />
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setVariantFor(null)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutating || !variantCaption.trim()}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
