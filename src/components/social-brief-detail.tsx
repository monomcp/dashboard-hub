import { useState, type FormEvent } from "react";
import { Check, History, Loader2, Plus, Undo2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { linesToList, listToLines, statusLabel } from "@/lib/content-types";
import { socialBadgeClass, type SocialBriefResponse, type SocialBriefReviewResponse } from "@/lib/social-types";
import { SocialDraftEditor } from "@/components/social-draft-editor";

type Props = {
  calendarItemId: string;
  briefs: SocialBriefResponse[];
  onChanged: () => Promise<void> | void;
  onError: (err: unknown) => void;
};

const LIST_FIELDS = [
  ["references", "References"],
  ["assets_needed", "Assets needed"],
  ["forbidden_topics", "Forbidden topics"],
] as const;

const EMPTY_FORM = {
  title: "",
  objective: "",
  audience: "",
  hook: "",
  key_message: "",
  caption_direction: "",
  cta: "",
  references: "",
  assets_needed: "",
  forbidden_topics: "",
};

export function SocialBriefDetail({ calendarItemId, briefs, onChanged, onError }: Props) {
  const [mutating, setMutating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SocialBriefResponse | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [revising, setRevising] = useState<SocialBriefResponse | null>(null);
  const [feedback, setFeedback] = useState("");
  const [reviewsFor, setReviewsFor] = useState<SocialBriefResponse | null>(null);
  const [reviews, setReviews] = useState<SocialBriefReviewResponse[]>([]);
  const [expandedBrief, setExpandedBrief] = useState<string | null>(null);

  const openDialog = (brief: SocialBriefResponse | null) => {
    setEditing(brief);
    setForm(
      brief
        ? {
            title: brief.title,
            objective: brief.objective ?? "",
            audience: brief.audience ?? "",
            hook: brief.hook ?? "",
            key_message: brief.key_message ?? "",
            caption_direction: brief.caption_direction ?? "",
            cta: brief.cta ?? "",
            references: listToLines(brief.references),
            assets_needed: listToLines(brief.assets_needed),
            forbidden_topics: listToLines(brief.forbidden_topics),
          }
        : EMPTY_FORM,
    );
    setDialogOpen(true);
  };

  const run = async (fn: () => Promise<unknown>) => {
    setMutating(true);
    try {
      await fn();
      await onChanged();
    } catch (err) {
      onError(err);
    } finally {
      setMutating(false);
    }
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    const payload = {
      title: form.title.trim(),
      objective: form.objective.trim() || null,
      audience: form.audience.trim() || null,
      hook: form.hook.trim() || null,
      key_message: form.key_message.trim() || null,
      caption_direction: form.caption_direction.trim() || null,
      cta: form.cta.trim() || null,
      references: linesToList(form.references),
      assets_needed: linesToList(form.assets_needed),
      forbidden_topics: linesToList(form.forbidden_topics),
    };
    await run(() =>
      editing
        ? apiRequest(`/api/v1/social/briefs/${editing.id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
          })
        : apiRequest(`/api/v1/social/calendar-items/${calendarItemId}/briefs`, {
            method: "POST",
            body: JSON.stringify(payload),
          }),
    );
    setDialogOpen(false);
  };

  const submitRevision = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!revising || !feedback.trim()) return;
    await run(() =>
      apiRequest(`/api/v1/social/briefs/${revising.id}/request-revision`, {
        method: "POST",
        body: JSON.stringify({ feedback: feedback.trim() }),
      }),
    );
    setRevising(null);
    setFeedback("");
  };

  const openReviews = async (brief: SocialBriefResponse) => {
    setReviewsFor(brief);
    setReviews([]);
    try {
      setReviews(
        await apiRequest<SocialBriefReviewResponse[]>(
          `/api/v1/social/briefs/${brief.id}/reviews`,
        ),
      );
    } catch (err) {
      onError(err);
    }
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Briefs
        </h3>
        <Button variant="outline" size="sm" className="rounded-lg" onClick={() => openDialog(null)}>
          <Plus className="mr-1 h-4 w-4" /> New brief
        </Button>
      </div>

      {briefs.length === 0 && (
        <p className="text-sm text-muted-foreground">No briefs for this calendar item yet.</p>
      )}

      <ul className="grid gap-2">
        {briefs.map((brief) => (
          <li key={brief.id} className="rounded-xl border border-black/5 px-3 py-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate font-medium">{brief.title}</span>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                    socialBadgeClass(brief.status),
                  )}
                >
                  {statusLabel(brief.status)}
                </span>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-1">
                {brief.status !== "approved" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-lg text-emerald-700"
                    disabled={mutating}
                    onClick={() =>
                      run(() =>
                        apiRequest(`/api/v1/social/briefs/${brief.id}/approve`, {
                          method: "POST",
                          body: JSON.stringify({}),
                        }),
                      )
                    }
                  >
                    <Check className="mr-1 h-3.5 w-3.5" /> Approve
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg text-orange-700"
                  disabled={mutating}
                  onClick={() => {
                    setRevising(brief);
                    setFeedback("");
                  }}
                >
                  <Undo2 className="mr-1 h-3.5 w-3.5" /> Revision
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg"
                  onClick={() => openReviews(brief)}
                >
                  <History className="mr-1 h-3.5 w-3.5" /> Reviews
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg"
                  disabled={mutating}
                  onClick={() => openDialog(brief)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg"
                  onClick={() =>
                    setExpandedBrief((prev) => (prev === brief.id ? null : brief.id))
                  }
                >
                  {expandedBrief === brief.id ? "Hide drafts" : "Drafts"}
                </Button>
              </div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {[brief.objective, brief.audience].filter(Boolean).join(" · ") ||
                "No objective set"}
            </div>
            {brief.hook && (
              <div className="mt-1 text-xs text-foreground/80">Hook: {brief.hook}</div>
            )}
            {expandedBrief === brief.id && (
              <div className="mt-3 border-t border-black/5 pt-3">
                <SocialDraftEditor briefId={brief.id} onError={onError} />
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Create / edit brief */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit brief" : "New brief"}</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="social-brief-title">Title</Label>
                <Input
                  id="social-brief-title"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social-brief-objective">Objective</Label>
                <Textarea
                  id="social-brief-objective"
                  rows={2}
                  value={form.objective}
                  onChange={(e) => setForm((prev) => ({ ...prev, objective: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social-brief-audience">Audience</Label>
                <Textarea
                  id="social-brief-audience"
                  rows={2}
                  value={form.audience}
                  onChange={(e) => setForm((prev) => ({ ...prev, audience: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social-brief-hook">Hook</Label>
                <Textarea
                  id="social-brief-hook"
                  rows={2}
                  value={form.hook}
                  onChange={(e) => setForm((prev) => ({ ...prev, hook: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social-brief-message">Key message</Label>
                <Textarea
                  id="social-brief-message"
                  rows={2}
                  value={form.key_message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, key_message: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social-brief-caption">Caption direction</Label>
                <Textarea
                  id="social-brief-caption"
                  rows={2}
                  value={form.caption_direction}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, caption_direction: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="social-brief-cta">CTA</Label>
                <Input
                  id="social-brief-cta"
                  value={form.cta}
                  onChange={(e) => setForm((prev) => ({ ...prev, cta: e.target.value }))}
                />
              </div>
              {LIST_FIELDS.map(([key, label]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={`social-brief-${key}`}>{label} (one per line)</Label>
                  <Textarea
                    id={`social-brief-${key}`}
                    rows={3}
                    value={form[key]}
                    onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                </div>
              ))}
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
              <Button type="submit" disabled={mutating || !form.title.trim()}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editing ? "Save" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Request revision */}
      <Dialog open={revising !== null} onOpenChange={(open) => !open && setRevising(null)}>
        <DialogContent className="rounded-2xl">
          <form onSubmit={submitRevision}>
            <DialogHeader>
              <DialogTitle>Request revision</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-2">
              <Label htmlFor="social-brief-feedback">Feedback</Label>
              <Textarea
                id="social-brief-feedback"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRevising(null)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={mutating || !feedback.trim()}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Send
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Review history */}
      <Dialog open={reviewsFor !== null} onOpenChange={(open) => !open && setReviewsFor(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>Review history</DialogTitle>
          </DialogHeader>
          {reviews.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">No reviews yet.</p>
          )}
          <ul className="mt-4 grid gap-2">
            {reviews.map((review) => (
              <li key={review.id} className="rounded-xl border border-black/5 px-3 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                      socialBadgeClass(review.decision),
                    )}
                  >
                    {statusLabel(review.decision)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {review.reviewer} · {new Date(review.created_at).toLocaleString()}
                  </span>
                </div>
                {review.feedback && (
                  <div className="mt-1 text-xs text-foreground/80">{review.feedback}</div>
                )}
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
