import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bot, Check, Lock, User, X } from "lucide-react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest, ApiError } from "@/lib/api-client";
import type { Principal } from "@/lib/mcp-types";

type AccessRole = "viewer" | "editor" | "owner";
type ShareMap = Record<string, AccessRole>;

// Just enough of a principal to render a row — search results carry the full
// object, but share rows from the API only carry this summary.
type PrincipalLike = Pick<Principal, "id" | "name" | "type" | "slug">;

// Mirrors api/app/modules/drive/schemas.py DriveFileShareResponse.
type FileShare = {
  id: string;
  file_id: string;
  role: Exclude<AccessRole, "owner">;
  principal: PrincipalLike;
  created_at: string;
  updated_at: string;
};

type Page<T> = { items: T[]; total: number; limit: number; offset: number };

function sharesQueryKey(fileId: string) {
  return ["file-shares", fileId] as const;
}

// Server truth (persisted grants) reduced to the id -> role map the UI edits.
function toShareMap(shares: FileShare[]): ShareMap {
  const map: ShareMap = {};
  for (const share of shares) map[share.principal.id] = share.role;
  return map;
}

function shareMapsEqual(a: ShareMap, b: ShareMap): boolean {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

function formatType(type: string): string {
  return type.replace(/_/g, " ");
}

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function FileShareDialog({
  open,
  onOpenChange,
  fileId,
  fileName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileId: string;
  fileName: string;
}) {
  const queryClient = useQueryClient();

  // Base list resolves the owner and any already-shared identities so the
  // "with access" sections can render names for ids stored in localStorage.
  const { data, isLoading } = useQuery({
    queryKey: ["identities-share"],
    queryFn: () => apiRequest<Page<Principal>>("/api/v1/identities?limit=200"),
    enabled: open,
    staleTime: 60_000,
  });

  // Persisted grants for this file, loaded from and saved to the database.
  const { data: sharesData, isLoading: sharesLoading } = useQuery({
    queryKey: sharesQueryKey(fileId),
    queryFn: () => apiRequest<FileShare[]>(`/api/v1/drive-files/${fileId}/shares`),
    enabled: open,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  // `saved` is the last persisted state; `shares` is the working copy the user
  // edits. The Save button is enabled while the two diverge.
  const [saved, setSaved] = useState<ShareMap>({});
  const [shares, setShares] = useState<ShareMap>({});
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query.trim(), 250);
  // Principals discovered via search may fall outside the base list, so keep the
  // full objects for anyone granted access so the rows below can still render.
  const [knownPrincipals, setKnownPrincipals] = useState<Record<string, PrincipalLike>>({});

  useEffect(() => {
    if (open) {
      setQuery("");
    }
  }, [open, fileId]);

  // Seed the working copy from the server whenever fresh grants arrive (initial
  // load and after a save). Edits made against the same server snapshot survive.
  useEffect(() => {
    if (!sharesData) return;
    const map = toShareMap(sharesData);
    setSaved(map);
    setShares(map);
    setKnownPrincipals((prev) => {
      const next = { ...prev };
      for (const share of sharesData) next[share.principal.id] = share.principal;
      return next;
    });
  }, [sharesData]);

  const principals = data?.items ?? [];
  const users = principals.filter((p) => p.type === "user");

  // The active user is always the owner and can't be changed.
  const ownerId = useMemo(() => {
    const owner = users.find((u) => !u.can_delete && u.auth_user_id);
    return owner?.id;
  }, [users]);

  const principalById = useMemo(() => {
    const map = new Map<string, PrincipalLike>();
    for (const p of principals) map.set(p.id, p);
    for (const p of Object.values(knownPrincipals)) map.set(p.id, p);
    return map;
  }, [principals, knownPrincipals]);

  const withAccess = [...principalById.values()].filter((p) => p.id === ownerId || shares[p.id]);
  const withAccessIds = new Set(withAccess.map((p) => p.id));

  // Backend search by name, slug, or email — only fires after 3+ characters.
  const searchEnabled = open && debouncedQuery.length >= 3;
  const { data: searchData, isFetching: searching } = useQuery({
    queryKey: ["identities-search", debouncedQuery],
    queryFn: () =>
      apiRequest<Page<Principal>>(
        `/api/v1/identities?search=${encodeURIComponent(debouncedQuery)}&limit=20`,
      ),
    enabled: searchEnabled,
    staleTime: 30_000,
  });

  const results = (searchData?.items ?? []).filter((p) => !withAccessIds.has(p.id));
  const showResults = searchEnabled && !searching;

  const dirty = !shareMapsEqual(shares, saved);

  const setRole = (id: string, role: AccessRole | null) => {
    setShares((prev) => {
      const next = { ...prev };
      if (role === null) delete next[id];
      else next[id] = role;
      return next;
    });
  };

  const save = useMutation({
    mutationFn: () =>
      apiRequest<FileShare[]>(`/api/v1/drive-files/${fileId}/shares`, {
        method: "PUT",
        body: JSON.stringify({
          shares: Object.entries(shares)
            .filter(([id]) => id !== ownerId)
            .map(([principal_id, role]) => ({ principal_id, role })),
        }),
      }),
    onSuccess: (updated) => {
      queryClient.setQueryData(sharesQueryKey(fileId), updated);
      const map = toShareMap(updated);
      setSaved(map);
      setShares(map);
      toast.success("Sharing updated");
    },
    onError: (error) => {
      const message = error instanceof ApiError ? error.message : "Could not save sharing";
      toast.error(message);
    },
  });

  // Adding a grant surfaces "Save changes"; removing one that was persisted
  // surfaces "Update" — both write through to the database on click.
  const hasRemoval = Object.keys(saved).some((id) => !(id in shares));
  const saveLabel = hasRemoval ? "Update" : "Save changes";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-normal">Share “{fileName}”</DialogTitle>
        </DialogHeader>

        <div className="px-6 pt-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Add people or agents"
            className="h-11"
          />
        </div>

        {query.trim() !== "" && query.trim().length < 3 && (
          <p className="mx-6 mt-2 text-xs text-muted-foreground">
            Type at least 3 characters to search.
          </p>
        )}

        {searchEnabled && searching && (
          <p className="mx-6 mt-2 text-xs text-muted-foreground">Searching…</p>
        )}

        {showResults && results.length === 0 && (
          <p className="mx-6 mt-2 text-xs text-muted-foreground">
            No people or agents match “{debouncedQuery}”.
          </p>
        )}

        {showResults && results.length > 0 && (
          <div className="mx-6 mt-2 max-h-56 overflow-auto rounded-md border">
            {results.slice(0, 8).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setKnownPrincipals((prev) => ({ ...prev, [p.id]: p }));
                  setRole(p.id, "viewer");
                  setQuery("");
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-muted"
              >
                <PrincipalAvatar principal={p} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    <span className="capitalize">{formatType(p.type)}</span>
                    {p.slug ? ` · ${p.slug}` : ""}
                  </div>
                </div>
                <Check className="h-4 w-4 opacity-0" />
              </button>
            ))}
          </div>
        )}

        <div className="mt-4 px-6">
          <h3 className="text-sm font-medium">People with access</h3>
          <div className="mt-2 space-y-1">
            {isLoading || sharesLoading ? (
              <AccessSectionSkeleton />
            ) : (
              withAccess
                .filter((p) => p.type === "user")
                .map((p) => (
                  <AccessRow
                    key={p.id}
                    principal={p}
                    role={p.id === ownerId ? "owner" : shares[p.id]}
                    locked={p.id === ownerId}
                    onChange={(r) => setRole(p.id, r)}
                  />
                ))
            )}
            {!isLoading &&
              !sharesLoading &&
              withAccess.filter((p) => p.type === "user").length === 0 && (
                <p className="text-xs text-muted-foreground">No users yet.</p>
              )}
          </div>
        </div>

        <div className="mt-4 px-6">
          <h3 className="text-sm font-medium">Agents with access</h3>
          <div className="mt-2 space-y-1">
            {isLoading || sharesLoading ? (
              <AccessSectionSkeleton />
            ) : (
              withAccess
                .filter((p) => p.type !== "user")
                .map((p) => (
                  <AccessRow
                    key={p.id}
                    principal={p}
                    role={shares[p.id]}
                    onChange={(r) => setRole(p.id, r)}
                  />
                ))
            )}
            {!isLoading &&
              !sharesLoading &&
              withAccess.filter((p) => p.type !== "user").length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No agents yet. Search above to add one.
                </p>
              )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 border-t px-6 py-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Done
          </Button>
          <Button onClick={() => save.mutate()} disabled={!dirty || save.isPending}>
            {save.isPending ? "Saving…" : saveLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AccessSectionSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-md px-2 py-2">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-4 w-32 max-w-full" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-8 w-20 rounded-md" />
    </div>
  );
}

function PrincipalAvatar({ principal }: { principal: PrincipalLike }) {
  const isAgent = principal.type === "agent";
  const initials = principal.name
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`grid h-9 w-9 place-items-center rounded-full text-xs font-medium text-white ${
        isAgent ? "bg-gradient-to-br from-violet-500 to-sky-500" : "bg-stone-500"
      }`}
    >
      {isAgent ? <Bot className="h-4 w-4" /> : initials || <User className="h-4 w-4" />}
    </div>
  );
}

function AccessRow({
  principal,
  role,
  locked,
  onChange,
}: {
  principal: PrincipalLike;
  role: AccessRole | undefined;
  locked?: boolean;
  onChange: (role: AccessRole | null) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted/40">
      <PrincipalAvatar principal={principal} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{principal.name}</div>
        <div className="text-xs capitalize text-muted-foreground">{formatType(principal.type)}</div>
      </div>
      {locked ? (
        <span className="flex items-center gap-1 pr-2 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> Owner
        </span>
      ) : (
        <>
          <Select value={role ?? "viewer"} onValueChange={(v) => onChange(v as AccessRole)}>
            <SelectTrigger className="h-8 w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="viewer">Viewer</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onChange(null)}
            aria-label={`Remove ${principal.name}`}
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
