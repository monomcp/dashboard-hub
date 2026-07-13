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

  // The body is persisted only when the editor loses focus, not on every
  // keystroke. Reads the latest markdown straight from the editor so it stays
  // correct even if the onChange state update hasn't flushed yet.
  const commitContent = useCallback(() => {
    if (loading || !file) return;
    const md = editorRef.current?.getMarkdown() ?? markdown;
    if (md === localStorage.getItem(contentKey(fileId))) return;
    setSaveState("saving");
    try {
      localStorage.setItem(contentKey(fileId), md);
      setSaveState("saved");
    } catch {
      setSaveState("idle");
    }
  }, [loading, file, fileId, markdown]);

  // The name is persisted only when the title field loses focus, not on every
  // keystroke. Normalises the empty title back to "Untitled document".
  const commitName = useCallback(async () => {
    if (loading || !file) return;
    const trimmed = name.trim() || "Untitled document";
    if (trimmed !== name) setName(trimmed);
    if (trimmed === file.name) return;
    setSaveState("saving");
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
  }, [name, file, fileId, loading, handleApiError]);

  // The back button and Docs logo are shared by the real header and its loading
  // skeleton, so they read identically before and after the document loads.
  const backButton = (
    <Button
      variant="ghost"
      size="icon"
      className="shrink-0 rounded-full"
      disabled={loading}
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
  );

  const logo = (
    <Link to="/docs" className="flex shrink-0 items-center gap-2">
      <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400 shadow-sm">
        <span className="text-xs font-bold text-white">△</span>
      </div>
    </Link>
  );

  const saveIndicator = (
    <div className="ml-auto flex shrink-0 items-center gap-1.5 pl-2 text-xs text-muted-foreground">
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
  );

  return (
    <div className="doc-editor-page min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      {/* The MDXEditor toolbar is restyled into a full-width sticky header that
          also carries the back button, logo, title field and save indicator, so
          the formatting controls live in the same bar as the document chrome. */}
      <style>{`
        .doc-editor-page .mdxeditor { --toolbar-radius: 0; }
        .doc-editor-page .mdxeditor [role="toolbar"] {
          position: sticky;
          top: 0;
          z-index: 20;
          width: 100%;
          flex-wrap: wrap;
          border-radius: 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          background: #ffffff;
          padding: 0.5rem 0.75rem;
          gap: 0.25rem;
        }
        @media (min-width: 768px) {
          .doc-editor-page .mdxeditor [role="toolbar"] { padding: 0.5rem 1.25rem; }
        }
        /* MDXEditor's link editor is a popover anchored to the current text
           selection. Creating a link from the toolbar should instead behave
           like a dialog, consistently centered in the viewport. */
        .doc-editor-page [data-radix-popper-content-wrapper]:has([class*="linkDialogEditForm"]) {
          position: fixed !important;
          top: 50vh !important;
          left: 50vw !important;
          transform: translate(-50%, -50%) !important;
        }
        .doc-editor-page [data-radix-popper-content-wrapper]:has([class*="linkDialogEditForm"]) [class*="popoverArrow"] {
          display: none;
        }
      `}</style>

      {error && (
        <div className="fixed left-1/2 top-16 z-30 -translate-x-1/2 rounded-2xl border border-destructive/20 bg-white px-4 py-3 text-sm text-destructive shadow-md">
          {error}
        </div>
      )}

      {loading ? (
        <>
          <div className="sticky top-0 z-20 flex items-center gap-2 border-b border-black/5 bg-white px-3 py-2 md:px-5">
            {backButton}
            {logo}
            <div className="h-8 w-48 animate-pulse rounded bg-[hsl(220,33%,95%)]" />
            <div className="ml-2 flex items-center gap-2">
              {[16, 16, 40, 16].map((w, i) => (
                <div
                  key={i}
                  className="h-6 animate-pulse rounded bg-[hsl(220,33%,95%)]"
                  style={{ width: w }}
                />
              ))}
            </div>
          </div>
          <div className="mx-auto my-8 max-w-3xl space-y-3 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5 md:p-10">
            <div className="h-7 w-1/3 animate-pulse rounded bg-[hsl(220,33%,95%)]" />
            <div className="h-4 w-full animate-pulse rounded bg-[hsl(220,33%,95%)]" />
            <div className="h-4 w-11/12 animate-pulse rounded bg-[hsl(220,33%,95%)]" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-[hsl(220,33%,95%)]" />
            <div className="h-64 animate-pulse rounded bg-[hsl(220,33%,95%)]" />
          </div>
        </>
      ) : (
        // onBlur bubbles from the content-editable (React maps it to focusout),
        // so leaving the body — whether to the toolbar, title field, or off the
        // page entirely — commits the latest markdown.
        <div onBlur={commitContent}>
        <MDXEditor
          ref={editorRef}
          markdown={markdown}
          onChange={setMarkdown}
          contentEditableClassName="prose mx-auto my-8 min-h-[70vh] max-w-3xl rounded-2xl bg-white px-6 py-10 shadow-sm ring-1 ring-black/5 focus:outline-none md:px-10"
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
                <div className="flex w-full items-center gap-1">
                  {backButton}
                  {logo}
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => void commitName()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                    }}
                    placeholder="Untitled document"
                    className="h-9 w-32 min-w-0 border-none bg-transparent text-base font-medium shadow-none focus-visible:bg-[hsl(220,33%,96%)] focus-visible:ring-1 focus-visible:ring-sky-200 sm:w-44 md:w-56"
                  />
                  <Separator />
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <BlockTypeSelect />
                  <Separator />
                  <ListsToggle />
                  <Separator />
                  <CreateLink />
                  {saveIndicator}
                </div>
              ),
            }),
          ]}
        />
        </div>
      )}
    </div>
  );
}
