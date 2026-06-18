import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api-client";
import type { CatalogServer } from "@/lib/mcp-types";
import { PermissionsMatrix } from "@/components/permissions-matrix";
import { lightPermissionsTheme } from "@/lib/permissions-theme";

type ContentPermissionsMode = "content" | "social";

const MODE_CONFIG: Record<
  ContentPermissionsMode,
  {
    serverSlug: "content" | "smm";
    toolsNoun: string;
    disabledHint: string;
    connectHint: string;
  }
> = {
  content: {
    serverSlug: "content",
    toolsNoun: "Content",
    disabledHint:
      "Who can use the Content tools, and how. Enable the Content MCP server first to start granting access.",
    connectHint:
      "No Content toolkit is connected yet — enable the Content MCP server from the MCP catalog.",
  },
  social: {
    serverSlug: "smm",
    toolsNoun: "Social content",
    disabledHint:
      "Who can use the Social content tools, and how. Enable the Social (SMM) MCP server first to start granting access.",
    connectHint:
      "No Social content toolkit is connected yet — enable the Social MCP server from the MCP catalog.",
  },
};

export function ContentPermissionsView({
  mode,
  onApiError,
}: {
  mode: ContentPermissionsMode;
  onApiError: (err: unknown, fallback?: string) => void;
}) {
  const config = MODE_CONFIG[mode];
  const { data: catalog } = useQuery({
    queryKey: ["mcp-catalog"],
    queryFn: () => apiRequest<CatalogServer[]>("/api/v1/mcp-catalog"),
    staleTime: 30 * 1000,
  });

  const servers = useMemo(
    () => (catalog ?? []).filter((s) => s.slug === config.serverSlug),
    [catalog, config.serverSlug],
  );
  const anyEnabled = servers.some((s) => s.enabled);
  const toolkitIds = useMemo(() => {
    const ids = new Set<string>();
    for (const server of servers) for (const id of server.toolkit_ids) ids.add(id);
    return Array.from(ids);
  }, [servers]);

  return (
    <PermissionsMatrix
      key={mode}
      toolkitIds={toolkitIds}
      moduleSlugs={[config.serverSlug]}
      enabled={anyEnabled}
      theme={lightPermissionsTheme}
      toolsNoun={config.toolsNoun}
      stripToolPrefix={/^(content|smm)_/}
      disabledHint={config.disabledHint}
      connectHint={config.connectHint}
      onApiError={onApiError}
    />
  );
}
