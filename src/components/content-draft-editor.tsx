import { useState, type FormEvent } from "react";
import { Loader2, Plus } from "lucide-react";
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
import {
  badgeClass,
  DRAFT_STATUSES,
  statusLabel,
  type BriefResponse,
  type DraftResponse,
  type DraftStatus,
} from "@/lib/content-types";

type Props = {
  calendarItemId: string;
  drafts: DraftResponse[];
  briefs: BriefResponse[];
  onChanged: () => Promise<void> | void;
  onError: (err: unknown) => void;
};

const EMPTY_FORM = {
  brief_id: "",
  title: "",
  slug: "",
  meta_title: "",
  meta_description: "",
  body_markdown: "",
  excerpt: "",
  featured_image_prompt: "",
  author: "",
};

export function ContentDraftEditor({
  calendarItemId,
  drafts,
  briefs,
  onChanged,
  onError,
}: Props) {
  const [mutating, setMutating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<DraftResponse | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [expanded, setExpanded] = useState<string | null>(null);

  const openDialog = (draft: DraftResponse | null) => {
    setEditing(draft);
    setForm(
      draft
        ? {
            brief_id: draft.brief_id ?? "",
            title: draft.title,
            slug: draft.slug ?? "",
            meta_title: draft.meta_title ?? "",
            meta_description: draft.meta_description ?? "",
            body_markdown: draft.body_markdown ?? "",
            excerpt: draft.excerpt ?? "",
            featured_image_prompt: draft.featured_image_prompt ?? "",
            author: draft.author ?? "",
          }
        : { ...EMPTY_FORM, brief_id: briefs[0]?.id ?? "" },
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
      slug: form.slug.trim() || null,
      meta_title: form.meta_title.trim() || null,
      meta_description: form.meta_description.trim() || null,
      body_markdown: form.body_markdown || null,
      excerpt: form.excerpt.trim() || null,
      featured_image_prompt: form.featured_image_prompt.trim() || null,
      author: form.author.trim() || null,
    };
    await run(() =>
      editing
        ? apiRequest(`/api/v1/content/drafts/${editing.id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
          })
        : apiRequest(`/api/v1/content/calendar-items/${calendarItemId}/drafts`, {
            method: "POST",
            body: JSON.stringify({ ...payload, brief_id: form.brief_id || null }),
          }),
    );
    setDialogOpen(false);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Drafts
        </h3>
        <Button variant="outline" size="sm" className="rounded-lg" onClick={() => openDialog(null)}>
          <Plus className="mr-1 h-4 w-4" /> New draft
        </Button>
      </div>

      {drafts.length === 0 && (
        <p className="text-sm text-muted-foreground">No drafts for this calendar item yet.</p>
      )}

      <ul className="grid gap-2">
        {drafts.map((draft) => (
          <li key={draft.id} className="rounded-xl border border-black/5 px-3 py-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                className="flex min-w-0 items-center gap-2 text-left"
                onClick={() => setExpanded(expanded === draft.id ? null : draft.id)}
              >
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                  v{draft.version}
                </span>
                <span className="truncate font-medium">{draft.title}</span>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                    badgeClass(draft.status),
                  )}
                >
                  {statusLabel(draft.status)}
                </span>
              </button>
              <div className="flex shrink-0 items-center gap-2">
                <Select
                  value={draft.status}
                  onValueChange={(value: DraftStatus) =>
                    run(() =>
                      apiRequest(`/api/v1/content/drafts/${draft.id}/status`, {
                        method: "POST",
                        body: JSON.stringify({ status: value }),
                      }),
                    )
                  }
                >
                  <SelectTrigger className="h-8 w-[170px] rounded-lg text-xs capitalize">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DRAFT_STATUSES.map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">
                        {statusLabel(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg"
                  disabled={mutating}
                  onClick={() => openDialog(draft)}
                >
                  Edit
                </Button>
              </div>
            </div>
            {expanded === draft.id && (
              <div className="mt-3 grid gap-2 border-t border-black/5 pt-3">
                <div className="text-xs text-muted-foreground">
                  {[draft.slug && `/${draft.slug}`, draft.author, draft.meta_title]
                    .filter(Boolean)
                    .join(" · ") || "No metadata"}
                </div>
                {draft.excerpt && <p className="text-xs italic">{draft.excerpt}</p>}
                <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-[hsl(220,33%,97%)] p-3 font-mono text-xs">
                  {draft.body_markdown || "(empty body)"}
                </pre>
              </div>
            )}
          </li>
        ))}
      </ul>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl sm:max-w-2xl">
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>
                {editing ? `Edit draft v${editing.version}` : "New draft"}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              {!editing && briefs.length > 0 && (
                <div className="grid gap-2">
                  <Label>Brief</Label>
                  <Select
                    value={form.brief_id || "none"}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, brief_id: value === "none" ? "" : value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No brief</SelectItem>
                      {briefs.map((brief) => (
                        <SelectItem key={brief.id} value={brief.id}>
                          {brief.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="draft-title">Title</Label>
                <Input
                  id="draft-title"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="draft-slug">Slug</Label>
                  <Input
                    id="draft-slug"
                    value={form.slug}
                    onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="draft-author">Author</Label>
                  <Input
                    id="draft-author"
                    value={form.author}
                    onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="draft-meta-title">Meta title</Label>
                <Input
                  id="draft-meta-title"
                  value={form.meta_title}
                  onChange={(e) => setForm((prev) => ({ ...prev, meta_title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="draft-meta-description">Meta description</Label>
                <Textarea
                  id="draft-meta-description"
                  rows={2}
                  value={form.meta_description}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, meta_description: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="draft-body">Body (markdown)</Label>
                <Textarea
                  id="draft-body"
                  rows={12}
                  className="font-mono text-xs"
                  value={form.body_markdown}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, body_markdown: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="draft-excerpt">Excerpt</Label>
                <Textarea
                  id="draft-excerpt"
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="draft-image-prompt">Featured image prompt</Label>
                <Textarea
                  id="draft-image-prompt"
                  rows={2}
                  value={form.featured_image_prompt}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, featured_image_prompt: e.target.value }))
                  }
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
              <Button type="submit" disabled={mutating || !form.title.trim()}>
                {mutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editing ? "Save" : "Create draft"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
