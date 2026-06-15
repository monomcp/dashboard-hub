import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";
import type { CatalogServer } from "@/lib/mcp-types";
import { PermissionsMatrix } from "@/components/permissions-matrix";
import { lightPermissionsTheme } from "@/lib/permissions-theme";

// Content spans two catalog servers — "cms" (Content mode) and "smm" (Social
// mode) — so we combine the toolkits from both and let the user switch between
// them with the matrix's toolkit selector.
const CONTENT_SERVER_SLUGS = ["cms", "smm"] as const;

export function ContentPermissionsView({
  onApiError,
}: {
  onApiError: (err: unknown, fallback?: string) => void;
}) {
  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 30 * 1000,
  });

  const servers = useMemo(
    () =>
      (catalog ?? []).filter((s) => (CONTENT_SERVER_SLUGS as readonly string[]).includes(s.slug)),
    [catalog],
  );
  const anyEnabled = servers.some((s) => s.enabled);
  const toolkitIds = useMemo(() => {
    const ids = new Set<string>();
    for (const server of servers) for (const id of server.toolkit_ids) ids.add(id);
    return Array.from(ids);
  }, [servers]);

  return (
    <PermissionsMatrix
      toolkitIds={toolkitIds}
      enabled={anyEnabled}
      theme={lightPermissionsTheme}
      toolsNoun="Content"
      stripToolPrefix={/^(cms|smm)_/}
      disabledHint="Who can use the Content tools, and how. Enable the Content (CMS) or Social (SMM) MCP server first to start granting access."
      connectHint="No toolkit is connected yet — enable a Content MCP server from the MCP catalog."
      onApiError={onApiError}
    />
  );
}
