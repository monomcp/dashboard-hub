import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Menu,
  Search,
  HelpCircle,
  Plus,
  FolderPlus,
  FileText,
  Image as ImageIcon,
  Film,
  Folder,
  MoreVertical,
  Users,
  ArrowUpDown,
  List,
  Grid3x3,
  Sparkles,
  Trash2,
  RotateCcw,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { AppsMenu } from "@/components/apps-menu";
import { ApiError, apiRequest, clearAuthTokens } from "@/lib/api-client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/drive")({
  head: () => ({
    meta: [
      { title: "Drive — Files & folders" },
      { name: "description", content: "Browse, search and manage your files and folders." },
      { property: "og:title", content: "Drive — Files & folders" },
      { property: "og:description", content: "Browse, search and manage your files and folders." },
    ],
    links: [{ rel: "canonical", href: "/drive" }],
  }),
  validateSearch: (search: Record<string, unknown>): { folder?: string } => ({
    folder: typeof search.folder === "string" && search.folder ? search.folder : undefined,
  }),
  component: DrivePage,
});

type DriveFileKind = "document" | "image" | "video" | "pdf" | "other";
type DriveViewFilter = "my-drive" | "starred" | "trash";

type Page<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};

type DriveFolderResponse = {
  id: string;
  parent_folder_id: string | null;
  owner_name: string;
  name: string;
  starred: boolean;
  is_trashed: boolean;
  created_at: string;
  updated_at: string;
};

type DriveFileResponse = {
  id: string;
  owner_name: string;
  folder_id: string | null;
  name: string;
  kind: DriveFileKind;
  mime_type: string | null;
  size_bytes: number | null;
  storage_status: "pending_upload" | "ready" | "failed";
  starred: boolean;
  is_trashed: boolean;
  created_at: string;
  updated_at: string;
};

const TEMPLATES = [
  { name: "Blank", sub: "Document", color: "from-sky-100 to-sky-50", glyph: "+" },
  { name: "Resume", sub: "Serif", color: "from-stone-100 to-white", glyph: "R" },
  { name: "Project proposal", sub: "Tropic", color: "from-emerald-100 to-amber-50", glyph: "P" },
  { name: "Brochure", sub: "Geometric", color: "from-rose-100 to-orange-50", glyph: "B" },
  { name: "Letter", sub: "Spearmint", color: "from-teal-100 to-emerald-50", glyph: "L" },
  { name: "Notes", sub: "Coral", color: "from-orange-100 to-rose-50", glyph: "N" },
];

const DRIVE_NAV = [
  { id: "my-drive", label: "My Drive", icon: Folder },
  { id: "starred", label: "Starred", icon: Sparkles },
  { id: "trash", label: "Trash", icon: Trash2 },
] satisfies { id: DriveViewFilter; label: string; icon: typeof Folder }[];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

function formatSize(bytes: number | null) {
  if (bytes === null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 102.4) / 10} KB`;
  return `${Math.round(bytes / 1024 / 102.4) / 10} MB`;
}

function kindAccent(kind: DriveFileKind) {
  if (kind === "pdf") return "bg-red-500";
  if (kind === "image") return "bg-emerald-500";
  if (kind === "video") return "bg-violet-500";
  if (kind === "other") return "bg-slate-500";
  return "bg-blue-500";
}

function KindIcon({ kind, className }: { kind: DriveFileKind | "folder"; className?: string }) {
  const cls = cn("h-5 w-5 text-white", className);
  if (kind === "folder") return <Folder className={cls} />;
  if (kind === "image") return <ImageIcon className={cls} />;
  if (kind === "video") return <Film className={cls} />;
  return <FileText className={cls} />;
}

function buildListPath(
  base: "/api/v1/drive-folders" | "/api/v1/drive-files",
  filter: DriveViewFilter,
  query: string,
  folderId?: string,
) {
  const params = new URLSearchParams({
    sort: "updated_at",
    direction: "desc",
    limit: "50",
    offset: "0",
  });
  if (query.trim()) params.set("q", query.trim());
  if (filter === "starred") params.set("starred", "true");
  if (filter === "trash") params.set("trashed", "true");
  if (filter === "my-drive" && folderId) {
    params.set(base === "/api/v1/drive-folders" ? "parent_folder_id" : "folder_id", folderId);
  }
  return `${base}?${params.toString()}`;
}

function DrivePage() {
  const navigate = useNavigate();
  const { folder: folderId } = Route.useSearch();
  const [breadcrumbs, setBreadcrumbs] = useState<DriveFolderResponse[]>([]);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<DriveViewFilter>("my-drive");
  const [folders, setFolders] = useState<DriveFolderResponse[]>([]);
  const [files, setFiles] = useState<DriveFileResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [createOpen, setCreateOpen] = useState<"folder" | "document" | null>(null);
  const [createName, setCreateName] = useState("");
  const [mutating, setMutating] = useState(false);

  const handleApiError = useCallback(
    (err: unknown) => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : "Drive request failed");
    },
    [navigate],
  );

  const loadDrive = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [folderPage, filePage] = await Promise.all([
        apiRequest<Page<DriveFolderResponse>>(
          buildListPath("/api/v1/drive-folders", filter, query, folderId),
        ),
        apiRequest<Page<DriveFileResponse>>(
          buildListPath("/api/v1/drive-files", filter, query, folderId),
        ),
      ]);
      setFolders(folderPage.items);
      setFiles(filePage.items);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [filter, folderId, handleApiError, query]);

  useEffect(() => {
    void loadDrive();
  }, [loadDrive]);

  useEffect(() => {
    if (!folderId) {
      setBreadcrumbs([]);
      return;
    }
    let cancelled = false;
    const loadBreadcrumbs = async () => {
      try {
        const chain: DriveFolderResponse[] = [];
        let currentId: string | null = folderId;
        while (currentId && chain.length < 20) {
          const folder: DriveFolderResponse = await apiRequest<DriveFolderResponse>(
            `/api/v1/drive-folders/${currentId}`,
          );
          chain.unshift(folder);
          currentId = folder.parent_folder_id;
        }
        if (!cancelled) setBreadcrumbs(chain);
      } catch (err) {
        if (!cancelled) handleApiError(err);
      }
    };
    void loadBreadcrumbs();
    return () => {
      cancelled = true;
    };
  }, [folderId, handleApiError]);

  const openFolder = (folder: DriveFolderResponse) => {
    setFilter("my-drive");
    void navigate({ to: "/drive", search: { folder: folder.id } });
  };

  const currentTitle = useMemo(() => {
    if (filter === "starred") return "Starred";
    if (filter === "trash") return "Trash";
    return "My Drive";
  }, [filter]);

  const submitCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = createName.trim();
    if (!name || !createOpen) return;

    setMutating(true);
    setError("");
    try {
      if (createOpen === "folder") {
        await apiRequest<DriveFolderResponse>("/api/v1/drive-folders", {
          method: "POST",
          body: JSON.stringify({ name, parent_folder_id: folderId ?? null }),
        });
      } else {
        await apiRequest<DriveFileResponse>("/api/v1/drive-files", {
          method: "POST",
          body: JSON.stringify({
            name,
            folder_id: folderId ?? null,
            kind: "document",
            mime_type: "application/vnd.google-apps.document",
          }),
        });
      }
      setCreateOpen(null);
      setCreateName("");
      await loadDrive();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const updateFolder = async (
    folder: DriveFolderResponse,
    payload: Partial<DriveFolderResponse>,
  ) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<DriveFolderResponse>(`/api/v1/drive-folders/${folder.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      await loadDrive();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const updateFile = async (file: DriveFileResponse, payload: Partial<DriveFileResponse>) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<DriveFileResponse>(`/api/v1/drive-files/${file.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      await loadDrive();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const trashFolder = async (folder: DriveFolderResponse) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<void>(`/api/v1/drive-folders/${folder.id}`, { method: "DELETE" });
      await loadDrive();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const trashFile = async (file: DriveFileResponse) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<void>(`/api/v1/drive-files/${file.id}`, { method: "DELETE" });
      await loadDrive();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const restoreFolder = async (folder: DriveFolderResponse) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<DriveFolderResponse>(`/api/v1/drive-folders/${folder.id}/restore`, {
        method: "POST",
      });
      await loadDrive();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const restoreFile = async (file: DriveFileResponse) => {
    setMutating(true);
    setError("");
    try {
      await apiRequest<DriveFileResponse>(`/api/v1/drive-files/${file.id}/restore`, {
        method: "POST",
      });
      await loadDrive();
    } catch (err) {
      handleApiError(err);
    } finally {
      setMutating(false);
    }
  };

  const isEmpty = !loading && !error && folders.length === 0 && files.length === 0;

  const searchField = (
    <div className="relative flex h-9 w-full items-center">
      <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground" />
      <Input
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search in Drive"
        className="h-9 rounded-full border-none bg-[hsl(220,33%,95%)] pl-12 pr-12 text-base shadow-none focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-sky-200"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[hsl(220,33%,98%)] text-foreground">
      <header className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Toggle menu"
            onClick={() => setSidebarOpen((s) => !s)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400 shadow-sm">
              <span className="text-sm font-bold text-white">△</span>
            </div>
            <span className="text-xl font-medium tracking-tight">Drive</span>
          </Link>
        </div>
        {searchOpen && (
          <div className="hidden min-w-0 max-w-2xl flex-1 md:block">{searchField}</div>
        )}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Help">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </Button>
          <AppsMenu />
          <div className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-stone-500 text-sm font-medium text-white">
            C
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="px-4 pb-3 md:hidden">{searchField}</div>
      )}

      <div className="flex">
        {sidebarOpen && (
          <aside className="hidden w-[260px] shrink-0 px-3 md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="mb-4 h-14 w-[110px] rounded-2xl bg-white text-foreground shadow-md hover:bg-white hover:shadow-lg"
                  disabled={mutating || filter === "trash"}
                >
                  <Plus className="mr-1 h-5 w-5" /> New
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 rounded-2xl p-1.5">
                <DropdownMenuItem
                  className="gap-3 rounded-lg py-2.5"
                  disabled={mutating}
                  onSelect={() => setCreateOpen("folder")}
                >
                  <FolderPlus className="h-4 w-4" /> New folder
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-3 rounded-lg py-2.5"
                  disabled={mutating}
                  onSelect={() => setCreateOpen("document")}
                >
                  <FileText className="h-4 w-4 text-blue-500" /> Document
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 rounded-lg py-2.5" disabled>
                  <ImageIcon className="h-4 w-4 text-emerald-500" /> Upload image
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3 rounded-lg py-2.5" disabled>
                  <Sparkles className="h-4 w-4 text-violet-500" /> AI summary
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <nav className="space-y-1">
              {DRIVE_NAV.map((n) => (
                <button
                  key={n.id}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm transition",
                    filter === n.id
                      ? "bg-sky-100 text-sky-900"
                      : "text-foreground/80 hover:bg-white/60",
                  )}
                  onClick={() => {
                    setFilter(n.id);
                    if (folderId) void navigate({ to: "/drive", search: {} });
                  }}
                >
                  <n.icon className="h-5 w-5 text-foreground/70" />
                  <span className="flex-1 truncate text-left">{n.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 pb-16 md:px-6">
          {!folderId && filter === "my-drive" && (
          <section className="rounded-3xl bg-[hsl(220,33%,96%)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-medium">Start a new document</h2>
              <Button variant="ghost" className="gap-1 text-sm">
                Template gallery
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {TEMPLATES.map((t) => (
                <button key={t.name} className="group flex flex-col items-start gap-2 text-left">
                  <div
                    className={cn(
                      "grid aspect-[3/4] w-full place-items-center rounded-xl border border-black/5 bg-gradient-to-br shadow-sm transition group-hover:shadow-md",
                      t.color,
                    )}
                  >
                    <span className="text-3xl font-light text-foreground/40">{t.glyph}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>
          )}

          <div className="mt-8 flex items-center justify-between">
            {folderId && filter === "my-drive" ? (
              <nav className="flex min-w-0 items-center gap-1 text-lg font-medium">
                <button
                  className="shrink-0 rounded-full px-2 py-0.5 text-muted-foreground transition hover:bg-black/5 hover:text-foreground"
                  onClick={() => void navigate({ to: "/drive", search: {} })}
                >
                  My Drive
                </button>
                {breadcrumbs.map((crumb, index) => (
                  <span key={crumb.id} className="flex min-w-0 items-center gap-1">
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    {index === breadcrumbs.length - 1 ? (
                      <span className="truncate px-2 py-0.5">{crumb.name}</span>
                    ) : (
                      <button
                        className="truncate rounded-full px-2 py-0.5 text-muted-foreground transition hover:bg-black/5 hover:text-foreground"
                        onClick={() =>
                          void navigate({ to: "/drive", search: { folder: crumb.id } })
                        }
                      >
                        {crumb.name}
                      </button>
                    )}
                  </span>
                ))}
              </nav>
            ) : (
              <h2 className="text-lg font-medium">{currentTitle}</h2>
            )}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1 rounded-full text-muted-foreground"
              >
                <ArrowUpDown className="h-4 w-4" /> Last modified
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setView((v) => (v === "grid" ? "list" : "grid"))}
                aria-label="Toggle view"
              >
                {view === "grid" ? <List className="h-4 w-4" /> : <Grid3x3 className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-destructive/20 bg-white px-4 py-3 text-sm text-destructive shadow-sm">
              <span>{error}</span>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                onClick={() => loadDrive()}
              >
                Retry
              </Button>
            </div>
          )}

          {loading && (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-32 animate-pulse rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
                />
              ))}
            </div>
          )}

          {!loading && folders.length > 0 && (
            <>
              <h3 className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Folders
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {folders.map((folder) => (
                  <div
                    key={folder.id}
                    className="group flex cursor-pointer items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (filter !== "trash") openFolder(folder);
                    }}
                    onKeyDown={(event) => {
                      if ((event.key === "Enter" || event.key === " ") && filter !== "trash") {
                        event.preventDefault();
                        openFolder(folder);
                      }
                    }}
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-amber-400">
                      <KindIcon kind="folder" />
                    </div>
                    <span className="flex-1 truncate text-sm font-medium">{folder.name}</span>
                    <span onClick={(event) => event.stopPropagation()}>
                      <DriveActions
                        trashed={filter === "trash"}
                        starred={folder.starred}
                        disabled={mutating}
                        onToggleStar={() => updateFolder(folder, { starred: !folder.starred })}
                        onTrash={() => trashFolder(folder)}
                        onRestore={() => restoreFolder(folder)}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {!loading && files.length > 0 && (
            <>
              <h3 className="mt-8 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Files
              </h3>
              {view === "grid" ? (
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
                    >
                      <div className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-[hsl(220,33%,97%)] to-white">
                        <div
                          className={cn(
                            "grid h-14 w-14 place-items-center rounded-2xl",
                            kindAccent(file.kind),
                          )}
                        >
                          <KindIcon kind={file.kind} className="h-7 w-7" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 border-t border-black/5 px-4 py-3">
                        <KindIcon
                          kind={file.kind}
                          className={cn("h-4 w-4 rounded p-0.5", kindAccent(file.kind))}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{file.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {file.owner_name} · {formatDate(file.updated_at)}
                          </div>
                        </div>
                        <DriveActions
                          trashed={filter === "trash"}
                          starred={file.starred}
                          disabled={mutating}
                          onToggleStar={() => updateFile(file, { starred: !file.starred })}
                          onTrash={() => trashFile(file)}
                          onRestore={() => restoreFile(file)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-3 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                  <div className="grid grid-cols-[1fr_140px_140px_100px_40px] gap-2 px-4 py-2 text-xs font-medium text-muted-foreground">
                    <div>Name</div>
                    <div>Owner</div>
                    <div>Modified</div>
                    <div>Size</div>
                    <div />
                  </div>
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="group grid grid-cols-[1fr_140px_140px_100px_40px] items-center gap-2 border-t border-black/5 px-4 py-2.5 text-sm hover:bg-[hsl(220,33%,98%)]"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={cn(
                            "grid h-8 w-8 place-items-center rounded-lg",
                            kindAccent(file.kind),
                          )}
                        >
                          <KindIcon kind={file.kind} className="h-4 w-4" />
                        </div>
                        <span className="truncate">{file.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-3.5 w-3.5" /> {file.owner_name}
                      </div>
                      <div className="text-muted-foreground">{formatDate(file.updated_at)}</div>
                      <div className="text-muted-foreground">{formatSize(file.size_bytes)}</div>
                      <DriveActions
                        trashed={filter === "trash"}
                        starred={file.starred}
                        disabled={mutating}
                        onToggleStar={() => updateFile(file, { starred: !file.starred })}
                        onTrash={() => trashFile(file)}
                        onRestore={() => restoreFile(file)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {isEmpty && (
            <div className="mt-12 grid place-items-center rounded-2xl border border-dashed border-black/10 py-16 text-center">
              <Search className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                {query
                  ? `No results for "${query}"`
                  : filter === "trash"
                    ? "Trash is empty"
                    : "Drive is empty"}
              </p>
              <p className="text-xs text-muted-foreground">
                {query ? "Try a different keyword." : "Create a folder or document to get started."}
              </p>
            </div>
          )}
        </main>
      </div>

      <Dialog open={createOpen !== null} onOpenChange={(open) => !open && setCreateOpen(null)}>
        <DialogContent className="rounded-2xl">
          <form onSubmit={submitCreate} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{createOpen === "folder" ? "New folder" : "New document"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="drive-create-name">Name</Label>
              <Input
                id="drive-create-name"
                value={createName}
                onChange={(event) => setCreateName(event.target.value)}
                autoFocus
                disabled={mutating}
                className="h-11 rounded-lg"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                className="rounded-lg"
                onClick={() => setCreateOpen(null)}
                disabled={mutating}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-lg"
                disabled={mutating || !createName.trim()}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DriveActions({
  trashed,
  starred,
  disabled,
  onToggleStar,
  onTrash,
  onRestore,
}: {
  trashed: boolean;
  starred: boolean;
  disabled: boolean;
  onToggleStar: () => void;
  onTrash: () => void;
  onRestore: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full opacity-0 transition focus-visible:opacity-100 data-[state=open]:opacity-100 group-hover:opacity-100"
          disabled={disabled}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44 rounded-xl p-1.5">
        {trashed ? (
          <DropdownMenuItem className="gap-2 rounded-lg" onSelect={onRestore}>
            <RotateCcw className="h-4 w-4" /> Restore
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem className="gap-2 rounded-lg" onSelect={onToggleStar}>
              <Star className="h-4 w-4" /> {starred ? "Unstar" : "Star"}
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 rounded-lg text-destructive" onSelect={onTrash}>
              <Trash2 className="h-4 w-4" /> Move to trash
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
