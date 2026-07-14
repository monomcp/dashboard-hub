import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ActivityLog } from "@/components/activity-log";
import { DocsToolkitPageShell } from "@/components/docs-toolkit-page-shell";
import { ApiError, clearAuthTokens } from "@/lib/api-client";

export const Route = createFileRoute("/docs_/activity")({
  head: () => ({
    meta: [
      { title: "Docs Activity" },
      { name: "description", content: "Review Docs Console and MCP tool activity." },
    ],
    links: [{ rel: "canonical", href: "/docs/activity" }],
  }),
  component: DocsActivityPage,
});

function DocsActivityPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleApiError = useCallback(
    (err: unknown, fallback = "Activity request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setError(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  return (
    <DocsToolkitPageShell activePage="activity">
      {({ docsServer, catalogReady }) => (
        <div className="mt-6">
          {error && (
            <div
              className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
              role="alert"
            >
              {error}
            </div>
          )}
          <ActivityLog
            onApiError={handleApiError}
            nameServerSlugs={["docs"]}
            moduleSlug="docs"
            toolkitIds={docsServer?.toolkit_ids ?? []}
            enabled={catalogReady}
            logFilter={(log) =>
              log.tool_name
                ? log.tool_name.startsWith("docs_")
                : Boolean(
                    log.path?.startsWith("/api/v1/drive-files") ||
                    log.path?.startsWith("/api/v1/drive-folders"),
                  )
            }
            description="Every change made to your files and folders through Console and via Docs tool calls."
          />
        </div>
      )}
    </DocsToolkitPageShell>
  );
}
