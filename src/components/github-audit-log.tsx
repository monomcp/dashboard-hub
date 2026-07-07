import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiRequest } from "@/lib/api-client";
import type { Page } from "@/lib/github-types";

// The audit_logs endpoint filters by a single target_type at a time, so this
// fetches both GitHub target types and merges them client-side.
type AuditLogEntry = {
  id: string;
  actor_user_id: string | null;
  action: string;
  target_type: string | null;
  target_id: string | null;
  meta: Record<string, unknown>;
  created_at: string;
};

type Props = {
  onApiError: (err: unknown, fallback?: string) => void;
};

function entryDetail(entry: AuditLogEntry): string {
  const detail = entry.meta?.full_name ?? entry.meta?.account_login;
  return typeof detail === "string" ? detail : "—";
}

export function GithubAuditLog({ onApiError }: Props) {
  const installations = useQuery({
    queryKey: ["github-audit-log", "github_installation"],
    queryFn: () =>
      apiRequest<Page<AuditLogEntry>>(
        "/api/v1/audit-logs?target_type=github_installation&limit=100",
      ),
    staleTime: 15 * 1000,
  });
  const repositories = useQuery({
    queryKey: ["github-audit-log", "github_repository"],
    queryFn: () =>
      apiRequest<Page<AuditLogEntry>>("/api/v1/audit-logs?target_type=github_repository&limit=100"),
    staleTime: 15 * 1000,
  });

  useEffect(() => {
    if (installations.isError) onApiError(installations.error, "Couldn't load the audit log");
  }, [installations.isError, installations.error, onApiError]);
  useEffect(() => {
    if (repositories.isError) onApiError(repositories.error, "Couldn't load the audit log");
  }, [repositories.isError, repositories.error, onApiError]);

  const entries = useMemo(() => {
    const items = [...(installations.data?.items ?? []), ...(repositories.data?.items ?? [])];
    return items.sort((a, b) => b.created_at.localeCompare(a.created_at));
  }, [installations.data, repositories.data]);

  if (installations.isLoading || repositories.isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <p className="rounded-2xl bg-white px-5 py-10 text-center text-sm text-muted-foreground ring-1 ring-black/5">
        No GitHub activity yet.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Action</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>When</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.action}</TableCell>
              <TableCell className="text-muted-foreground">
                {entry.target_type ?? "—"} · {entryDetail(entry)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
