import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bot, Check, Lock, User, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/api-client";
import type { Principal } from "@/lib/mcp-types";

type AccessRole = "viewer" | "editor" | "owner";
type ShareMap = Record<string, AccessRole>;

type Page<T> = { items: T[]; total: number; limit: number; offset: number };

function storageKey(fileId: string) {
  return `file-share:${fileId}`;
}

function loadShares(fileId: string): ShareMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(storageKey(fileId)) ?? "{}");
  } catch {
    return {};
  }
}

function saveShares(fileId: string, map: ShareMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(fileId), JSON.stringify(map));
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
  // Base list resolves the owner and any already-shared identities so the
  // "with access" sections can render names for ids stored in localStorage.
  const { data } = useQuery({
    queryKey: ["identities-share"],
    queryFn: () =>
      apiRequest<Page<Principal>>("/api/v1/identities?limit=200"),
    enabled: open,
    staleTime: 60_000,
  });

  const [shares, setShares] = useState<ShareMap>({});
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query.trim(), 250);

  useEffect(() => {
    if (open) setShares(loadShares(fileId));
  }, [open, fileId]);

  const principals = data?.items ?? [];
  const users = principals.filter((p) => p.type === "user");

  // The active user is always the owner and can't be changed.
  const ownerId = useMemo(() => {
    const owner = users.find((u) => !u.can_delete && u.auth_user_id);
    return owner?.id;
  }, [users]);

  const withAccess = principals.filter(
    (p) => p.id === ownerId || shares[p.id],
  );
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

  const results = (searchData?.items ?? []).filter(
    (p) => !withAccessIds.has(p.id),
  );
  const suggestedUsers = results.filter((p) => p.type === "user");
  const suggestedAgents = results.filter((p) => p.type === "agent");
  const showResults = searchEnabled && !searching;

  const setRole = (id: string, role: AccessRole | null) => {
    setShares((prev) => {
      const next = { ...prev };
      if (role === null) delete next[id];
      else next[id] = role;
      saveShares(fileId, next);
      return next;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-normal">
            Share “{fileName}”
          </DialogTitle>
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

        {showResults && suggestedUsers.length === 0 && suggestedAgents.length === 0 && (
          <p className="mx-6 mt-2 text-xs text-muted-foreground">
            No people or agents match “{debouncedQuery}”.
          </p>
        )}

        {showResults && (suggestedUsers.length > 0 || suggestedAgents.length > 0) && (
          <div className="mx-6 mt-2 max-h-56 overflow-auto rounded-md border">
            {[...suggestedUsers, ...suggestedAgents].slice(0, 8).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setRole(p.id, "viewer");
                  setQuery("");
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-muted"
              >
                <PrincipalAvatar principal={p} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    <span className="capitalize">{p.type}</span>
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
            {withAccess.filter((p) => p.type === "user").map((p) => (
              <AccessRow
                key={p.id}
                principal={p}
                role={p.id === ownerId ? "owner" : shares[p.id]}
                locked={p.id === ownerId}
                onChange={(r) => setRole(p.id, r)}
              />
            ))}
            {withAccess.filter((p) => p.type === "user").length === 0 && (
              <p className="text-xs text-muted-foreground">No users yet.</p>
            )}
          </div>
        </div>

        <div className="mt-4 px-6">
          <h3 className="text-sm font-medium">Agents with access</h3>
          <div className="mt-2 space-y-1">
            {withAccess.filter((p) => p.type === "agent").map((p) => (
              <AccessRow
                key={p.id}
                principal={p}
                role={shares[p.id]}
                onChange={(r) => setRole(p.id, r)}
              />
            ))}
            {withAccess.filter((p) => p.type === "agent").length === 0 && (
              <p className="text-xs text-muted-foreground">
                No agents yet. Search above to add one.
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2 border-t px-6 py-4">
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PrincipalAvatar({ principal }: { principal: Principal }) {
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
  principal: Principal;
  role: AccessRole | undefined;
  locked?: boolean;
  onChange: (role: AccessRole | null) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted/40">
      <PrincipalAvatar principal={principal} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{principal.name}</div>
        <div className="text-xs capitalize text-muted-foreground">
          {principal.type}
        </div>
      </div>
      {locked ? (
        <span className="flex items-center gap-1 pr-2 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" /> Owner
        </span>
      ) : (
        <>
          <Select
            value={role ?? "viewer"}
            onValueChange={(v) => onChange(v as AccessRole)}
          >
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
