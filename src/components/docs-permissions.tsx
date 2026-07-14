import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";
import type { CatalogServer } from "@/lib/mcp-types";
import { PermissionsMatrix } from "@/components/permissions-matrix";
import { lightPermissionsTheme } from "@/lib/permissions-theme";

export function DocsPermissionsView({
  server,
  onApiError,
}: {
  server?: CatalogServer;
  onApiError: (err: unknown, fallback?: string) => void;
}) {
  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    enabled: !server,
    staleTime: 30 * 1000,
  });

  const docsServer = useMemo(
    () => server ?? (catalog ?? []).find((s) => s.slug === "docs"),
    [catalog, server],
  );

  return (
    <PermissionsMatrix
      toolkitIds={docsServer?.toolkit_ids ?? []}
      moduleSlugs={["docs"]}
      enabled={Boolean(docsServer?.enabled)}
      theme={lightPermissionsTheme}
      toolsNoun="Docs"
      stripToolPrefix={/^docs_/}
      disabledHint="Who can use the Docs tools, and how. Enable the Docs MCP server first to start granting access."
      connectHint="No Docs toolkit is connected yet — enable the Docs MCP server from the MCP catalog."
      onApiError={onApiError}
    />
  );
}
