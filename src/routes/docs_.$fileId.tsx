import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  ListsToggle,
  Separator,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";

type DriveFileResponse = {
  id: string;
  name: string;
  folder_id: string | null;
  updated_at: string;
};

export const Route = createFileRoute("/docs_/$fileId")({
  head: () => ({
    meta: [
      { title: "Document — Docs" },
      { name: "description", content: "Edit your document." },
    ],
  }),
  component: DocumentEditorPage,
});

const contentKey = (id: string) => `docs:content:${id}`;

function DocumentEditorPage() {
  const { fileId } = Route.useParams();
  const navigate = useNavigate();
  const editorRef = useRef<MDXEditorMethods>(null);

  const [file, setFile] = useState<DriveFileResponse | null>(null);
  const [name, setName] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  const handleApiError = useCallback(
    (err: unknown) => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : "Failed to load document");
    },
    [navigate],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const f = await apiRequest<DriveFileResponse>(`/api/v1/drive-files/${fileId}`);
        if (cancelled) return;
        setFile(f);
        setName(f.name);
        const saved = typeof window !== "undefined" ? localStorage.getItem(contentKey(fileId)) : null;
        setMarkdown(saved ?? "");
      } catch (err) {
        if (!cancelled) handleApiError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fileId, handleApiError]);

  // Debounced autosave for markdown content (localStorage) and name (API).
  useEffect(() => {
    if (loading || !file) return;
    setSaveState("saving");
    const t = window.setTimeout(() => {
      try {
        localStorage.setItem(contentKey(fileId), markdown);
        setSaveState("saved");
      } catch {
        setSaveState("idle");
      }
    }, 500);
    return () => window.clearTimeout(t);
  }, [markdown, fileId, loading, file]);

  useEffect(() => {
    if (loading || !file) return;
    const trimmed = name.trim() || "Untitled document";
    if (trimmed === file.name) return;
    setSaveState("saving");
    const t = window.setTimeout(async () => {
      try {
        const updated = await apiRequest<DriveFileResponse>(`/api/v1/drive-files/${fileId}`, {
          method: "PATCH",
          body: JSON.stringify({ name: trimmed }),
        });
        setFile(updated);
        setSaveState("saved");
      } catch (err) {
        handleApiError(err);
        setSaveState("idle");
      }
    }, 800);
    return () => window.clearTimeout(t);
  }, [name, file, fileId, loading, handleApiError]);

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      <header className="flex items-center gap-3 border-b border-black/5 bg-white px-4 py-3 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() =>
            void navigate({
              to: "/docs",
              search: file?.folder_id ? { folder: file.folder_id } : {},
            })
          }
          aria-label="Back to Docs"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Link to="/docs" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400 shadow-sm">
            <span className="text-xs font-bold text-white">△</span>
          </div>
        </Link>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          placeholder="Untitled document"
          className="h-9 max-w-md border-none bg-transparent text-lg font-medium shadow-none focus-visible:bg-[hsl(220,33%,96%)] focus-visible:ring-1 focus-visible:ring-sky-200"
        />
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          {saveState === "saving" && (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…
            </>
          )}
          {saveState === "saved" && (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" /> Saved
            </>
          )}
        </div>
      </header>

      {error && (
        <div className="mx-auto mt-4 max-w-3xl rounded-2xl border border-destructive/20 bg-white px-4 py-3 text-sm text-destructive shadow-sm">
          {error}
        </div>
      )}

      <main className="mx-auto mt-6 max-w-4xl px-4 pb-24">
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
          {loading ? (
            <div className="space-y-3 p-8">
              <div className="h-6 w-1/3 animate-pulse rounded bg-[hsl(220,33%,95%)]" />
              <div className="h-4 w-full animate-pulse rounded bg-[hsl(220,33%,95%)]" />
              <div className="h-4 w-11/12 animate-pulse rounded bg-[hsl(220,33%,95%)]" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-[hsl(220,33%,95%)]" />
              <div className="h-64 animate-pulse rounded bg-[hsl(220,33%,95%)]" />
            </div>
          ) : (
            <MDXEditor
              ref={editorRef}
              markdown={markdown}
              onChange={setMarkdown}
              contentEditableClassName="prose max-w-none min-h-[60vh] px-8 py-6 focus:outline-none"
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      <UndoRedo />
                      <Separator />
                      <BoldItalicUnderlineToggles />
                      <Separator />
                      <BlockTypeSelect />
                      <Separator />
                      <ListsToggle />
                      <Separator />
                      <CreateLink />
                    </>
                  ),
                }),
              ]}
            />
          )}
        </div>
      </main>
    </div>
  );
}
