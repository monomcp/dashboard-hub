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
  BRIEF_STATUSES,
  linesToList,
  listToLines,
  statusLabel,
  type BriefResponse,
  type BriefStatus,
} from "@/lib/content-types";

type Props = {
  calendarItemId: string;
  briefs: BriefResponse[];
  onChanged: () => Promise<void> | void;
  onError: (err: unknown) => void;
};

const LIST_FIELDS = [
  ["outline", "Outline"],
  ["external_references", "External references"],
  ["product_mentions", "Product mentions"],
  ["required_sections", "Required sections"],
  ["forbidden_topics", "Forbidden topics"],
] as const;

const EMPTY_FORM = {
  title: "",
  target_keyword: "",
  search_intent: "",
  audience: "",
  angle: "",
  cta: "",
  language: "",
  outline: "",
  external_references: "",
  product_mentions: "",
  required_sections: "",
  forbidden_topics: "",
};

export function ContentBriefDetail({ calendarItemId, briefs, onChanged, onError }: Props) {
  const [mutating, setMutating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<BriefResponse | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const openDialog = (brief: BriefResponse | null) => {
    setEditing(brief);
    setForm(
      brief
        ? {
            title: brief.title,
            target_keyword: brief.target_keyword ?? "",
            search_intent: brief.search_intent ?? "",
            audience: brief.audience ?? "",
            angle: brief.angle ?? "",
            cta: brief.cta ?? "",
            language: brief.language ?? "",
            outline: listToLines(brief.outline),
            external_references: listToLines(brief.external_references),
            product_mentions: listToLines(brief.product_mentions),
            required_sections: listToLines(brief.required_sections),
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
      target_keyword: form.target_keyword.trim() || null,
      search_intent: form.search_intent.trim() || null,
      audience: form.audience.trim() || null,
      angle: form.angle.trim() || null,
      cta: form.cta.trim() || null,
      language: form.language.trim() || null,
      outline: linesToList(form.outline),
      external_references: linesToList(form.external_references),
      product_mentions: linesToList(form.product_mentions),
      required_sections: linesToList(form.required_sections),
      forbidden_topics: linesToList(form.forbidden_topics),
    };
    await run(() =>
      editing
        ? apiRequest(`/api/v1/content/briefs/${editing.id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
          })
        : apiRequest(`/api/v1/content/calendar-items/${calendarItemId}/briefs`, {
            method: "POST",
            body: JSON.stringify(payload),
          }),
    );
    setDialogOpen(false);
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
                    badgeClass(brief.status),
                  )}
                >
                  {statusLabel(brief.status)}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Select
                  value={brief.status}
                  onValueChange={(value: BriefStatus) =>
                    run(() =>
                      apiRequest(`/api/v1/content/briefs/${brief.id}/status`, {
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
                    {BRIEF_STATUSES.map((status) => (
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
                  onClick={() => openDialog(brief)}
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {[brief.target_keyword, brief.search_intent, brief.language]
                .filter(Boolean)
                .join(" · ") || "No SEO targeting set"}
            </div>
            {brief.outline.length > 0 && (
              <ol className="mt-2 list-inside list-decimal text-xs text-foreground/80">
                {brief.outline.map((item, index) => (
                  <li key={index}>{typeof item === "string" ? item : JSON.stringify(item)}</li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ul>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl">
          <form onSubmit={submit}>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit brief" : "New brief"}</DialogTitle>
            </DialogHeader>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="brief-title">Title</Label>
                <Input
                  id="brief-title"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="brief-keyword">Target keyword</Label>
                  <Input
                    id="brief-keyword"
                    value={form.target_keyword}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, target_keyword: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brief-intent">Search intent</Label>
                  <Input
                    id="brief-intent"
                    value={form.search_intent}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, search_intent: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="brief-language">Language</Label>
                  <Input
                    id="brief-language"
                    placeholder="en"
                    value={form.language}
                    onChange={(e) => setForm((prev) => ({ ...prev, language: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brief-audience">Audience</Label>
                <Textarea
                  id="brief-audience"
                  rows={2}
                  value={form.audience}
                  onChange={(e) => setForm((prev) => ({ ...prev, audience: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brief-angle">Angle</Label>
                <Textarea
                  id="brief-angle"
                  rows={2}
                  value={form.angle}
                  onChange={(e) => setForm((prev) => ({ ...prev, angle: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brief-cta">CTA</Label>
                <Input
                  id="brief-cta"
                  value={form.cta}
                  onChange={(e) => setForm((prev) => ({ ...prev, cta: e.target.value }))}
                />
              </div>
              {LIST_FIELDS.map(([key, label]) => (
                <div key={key} className="grid gap-2">
                  <Label htmlFor={`brief-${key}`}>{label} (one per line)</Label>
                  <Textarea
                    id={`brief-${key}`}
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
    </div>
  );
}
