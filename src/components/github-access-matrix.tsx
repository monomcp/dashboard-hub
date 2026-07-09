import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bot, Check, KeyRound, Loader2, Minus, User as UserIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ApiError, apiRequest } from "@/lib/api-client";
import type {
  GithubAccessCellMode,
  GithubAccessInstallation,
  GithubAccessMatrix,
  GithubAccessMatrixPrincipal,
  GithubAccessUpsert,
} from "@/lib/github-types";
import type { PrincipalType } from "@/lib/mcp-types";
import { lightPermissionsTheme as theme } from "@/lib/permissions-theme";
import { cn } from "@/lib/utils";

const PRINCIPAL_META: Record<PrincipalType, { label: string; icon: typeof UserIcon }> = {
  user: { label: "User", icon: UserIcon },
  agent: { label: "Agent", icon: Bot },
  service_account: { label: "Service", icon: Bot },
  api_client: { label: "API client", icon: KeyRound },
};

const GITHUB_RESOURCE_ACCESS_QUERY_KEY = ["github-resource-access"] as const;

type DialogState = {
  principal: GithubAccessMatrixPrincipal;
  installation: GithubAccessInstallation;
};

function PrincipalLabel({ principal }: { principal: GithubAccessMatrixPrincipal }) {
  const meta = PRINCIPAL_META[principal.type];
  const Icon = meta.icon;
  return (
    <div className="flex items-center gap-2.5">
      <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-full", theme.avatarBg)}>
        <Icon className={cn("h-4 w-4", theme.principalIcon)} />
      </span>
      <div className="min-w-0">
        <div className={cn("truncate font-medium", theme.principalName)}>{principal.name}</div>
        <div className={cn("mt-0.5 text-xs", theme.principalSub)}>{meta.label}</div>
      </div>
    </div>
  );
}

function modeLabel(mode: GithubAccessCellMode, count: number): string {
  if (mode === "all_repos") return "All repos";
  if (mode === "selected") return count === 1 ? "1 repo" : `${count} repos`;
  return "No access";
}

export function GithubAccessMatrix({
  onApiError,
}: {
  onApiError: (err: unknown, fallback?: string) => void;
}) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: GITHUB_RESOURCE_ACCESS_QUERY_KEY,
    queryFn: () => apiRequest<GithubAccessMatrix>("/api/v1/github/access"),
    staleTime: 30 * 1000,
  });
  const [busyKey, setBusyKey] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState<DialogState | null>(null);
  const [draftRepoIds, setDraftRepoIds] = useState<Set<string>>(new Set());

  const matrix = data ?? { installations: [], principals: [] };
  const anyGranted = useMemo(
    () =>
      matrix.principals.filter((principal) =>
        Object.values(principal.installations).some((cell) => cell.mode !== "none"),
      ).length,
    [matrix.principals],
  );

  useEffect(() => {
    if (error) onApiError(error, "Could not load GitHub resource access");
  }, [error, onApiError]);

  const runAction = useCallback(
    async (key: string, fn: () => Promise<unknown>) => {
      setBusyKey(key);
      setActionError(null);
      try {
        await fn();
        await queryClient.invalidateQueries({ queryKey: GITHUB_RESOURCE_ACCESS_QUERY_KEY });
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          onApiError(err);
          return;
        }
        setActionError(
          err instanceof ApiError && err.status === 403
            ? "You need admin access to change GitHub resource access."
            : err instanceof Error
              ? err.message
              : "Could not update GitHub resource access.",
        );
      } finally {
        setBusyKey(null);
      }
    },
    [onApiError, queryClient],
  );

  const upsertAccess = (
    principal: GithubAccessMatrixPrincipal,
    installation: GithubAccessInstallation,
    payload: GithubAccessUpsert,
  ) =>
    runAction(`gh:${principal.id}:${installation.id}`, () =>
      apiRequest<unknown>(`/api/v1/github/access/${principal.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    );

  const revokeAccess = (
    principal: GithubAccessMatrixPrincipal,
    installation: GithubAccessInstallation,
  ) =>
    runAction(`gh:${principal.id}:${installation.id}`, () =>
      apiRequest<unknown>(`/api/v1/github/access/${principal.id}/${installation.id}`, {
        method: "DELETE",
      }),
    );

  const openSelectedDialog = (
    principal: GithubAccessMatrixPrincipal,
    installation: GithubAccessInstallation,
  ) => {
    const cell = principal.installations[installation.id];
    setDraftRepoIds(new Set(cell?.mode === "selected" ? cell.repository_ids : []));
    setDialogState({ principal, installation });
  };

  const saveSelected = () => {
    if (!dialogState) return;
    const { principal, installation } = dialogState;
    void upsertAccess(principal, installation, {
      installation_id: installation.id,
      mode: "selected",
      repository_ids: [...draftRepoIds],
    });
    setDialogState(null);
  };

  const renderCell = (
    principal: GithubAccessMatrixPrincipal,
    installation: GithubAccessInstallation,
  ) => {
    const cell = principal.installations[installation.id] ?? {
      mode: "none",
      repository_ids: [],
    };
    const key = `gh:${principal.id}:${installation.id}`;
    const busy = busyKey === key;
    return (
      <div className="flex min-w-[150px] items-center justify-center gap-2">
        <Select
          value={cell.mode}
          disabled={busy}
          onValueChange={(value) => {
            const mode = value as GithubAccessCellMode;
            if (mode === "none") {
              void revokeAccess(principal, installation);
            } else if (mode === "all_repos") {
              void upsertAccess(principal, installation, {
                installation_id: installation.id,
                mode: "all_repos",
                repository_ids: [],
              });
            } else {
              openSelectedDialog(principal, installation);
            }
          }}
        >
          <SelectTrigger className="h-8 w-[132px] rounded-lg text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No access</SelectItem>
            <SelectItem value="all_repos">All repos</SelectItem>
            <SelectItem value="selected">Selected...</SelectItem>
          </SelectContent>
        </Select>
        {busy ? (
          <Loader2 className={cn("h-4 w-4 animate-spin", theme.loader)} />
        ) : (
          <Badge variant="outline" className="whitespace-nowrap text-[10px]">
            {modeLabel(cell.mode, cell.repository_ids.length)}
          </Badge>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="grid content-start gap-4">
        <div className={theme.card}>
          <Skeleton className="h-7 w-72 rounded-full" />
        </div>
        <div className={cn("overflow-x-auto rounded-3xl", theme.tableWrap)}>
          <div className="space-y-3 p-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-10 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid content-start gap-4">
      <div className={theme.card}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className={cn("text-2xl font-normal tracking-tight", theme.headingText)}>
            Account & repository access
          </h2>
          <p className={cn("text-sm", theme.countText)}>
            {anyGranted} of {matrix.principals.length} identities have GitHub resources
          </p>
        </div>
      </div>

      {actionError && (
        <div className={cn("rounded-2xl px-4 py-3 text-sm", theme.actionError)}>
          {actionError}
        </div>
      )}

      <div className={cn("overflow-x-auto rounded-3xl", theme.tableWrap)}>
        <table className="w-full border-collapse text-sm">
          <thead className={cn("text-xs uppercase tracking-wide", theme.thead)}>
            <tr>
              <th className={cn("sticky left-0 z-10 px-4 py-3 text-left font-medium", theme.headerStickyBg)}>
                Identity
              </th>
              {matrix.installations.map((installation) => (
                <th key={installation.id} className="min-w-[190px] px-3 py-3 text-left font-medium">
                  <div className="normal-case">
                    <div className="font-medium text-foreground">{installation.account_login}</div>
                    <div className="mt-0.5 text-xs font-normal text-muted-foreground">
                      {installation.repositories.length} connected repos
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.principals.map((principal) => (
              <tr key={principal.id} className={cn("border-t", theme.rowBorder)}>
                <td className={cn("sticky left-0 z-10 px-4 py-3", theme.bodyStickyBg)}>
                  <PrincipalLabel principal={principal} />
                </td>
                {matrix.installations.map((installation) => (
                  <td key={installation.id} className="px-3 py-3">
                    {renderCell(principal, installation)}
                  </td>
                ))}
              </tr>
            ))}
            {(matrix.principals.length === 0 || matrix.installations.length === 0) && (
              <tr>
                <td
                  colSpan={matrix.installations.length + 1}
                  className={cn("px-4 py-10 text-center", theme.emptyText)}
                >
                  {matrix.installations.length === 0
                    ? "No active GitHub accounts are installed."
                    : "No identities in this organization yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={!!dialogState} onOpenChange={(open) => !open && setDialogState(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto rounded-2xl sm:max-w-xl">
          {dialogState && (
            <>
              <DialogHeader>
                <DialogTitle>{dialogState.installation.account_login}</DialogTitle>
              </DialogHeader>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">{dialogState.principal.name}</p>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-lg"
                    onClick={() =>
                      setDraftRepoIds(
                        new Set(dialogState.installation.repositories.map((repo) => repo.id)),
                      )
                    }
                  >
                    <Check className="mr-1.5 h-3.5 w-3.5" />
                    All
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 rounded-lg"
                    onClick={() => setDraftRepoIds(new Set())}
                  >
                    <Minus className="mr-1.5 h-3.5 w-3.5" />
                    None
                  </Button>
                </div>
              </div>
              <div className="mt-4 divide-y divide-black/5 rounded-2xl border border-black/10">
                {dialogState.installation.repositories.map((repo) => (
                  <label
                    key={repo.id}
                    className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm"
                  >
                    <Checkbox
                      checked={draftRepoIds.has(repo.id)}
                      onCheckedChange={(checked) => {
                        setDraftRepoIds((current) => {
                          const next = new Set(current);
                          if (checked) next.add(repo.id);
                          else next.delete(repo.id);
                          return next;
                        });
                      }}
                      aria-label={`Select ${repo.full_name}`}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{repo.full_name}</span>
                      <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                        {repo.private ? "Private" : "Public"}
                        {repo.default_branch ? ` · ${repo.default_branch}` : ""}
                        {repo.language ? ` · ${repo.language}` : ""}
                      </span>
                    </span>
                  </label>
                ))}
                {dialogState.installation.repositories.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No connected repositories.
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-lg"
                  onClick={() => setDialogState(null)}
                >
                  Cancel
                </Button>
                <Button type="button" className="rounded-lg" onClick={saveSelected}>
                  Save selection
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
