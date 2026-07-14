import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { DocsPermissionsView } from "@/components/docs-permissions";
import { DocsToolkitPageShell } from "@/components/docs-toolkit-page-shell";
import { PermissionsMatrixLoading } from "@/components/permissions-matrix";
import { ApiError, clearAuthTokens } from "@/lib/api-client";
import { lightPermissionsTheme } from "@/lib/permissions-theme";

export const Route = createFileRoute("/docs_/permissions")({
  head: () => ({
    meta: [
      { title: "Docs Permissions" },
      { name: "description", content: "Manage access to Docs MCP tools." },
    ],
    links: [{ rel: "canonical", href: "/docs/permissions" }],
  }),
  component: DocsPermissionsPage,
});

function DocsPermissionsPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleApiError = useCallback(
    (err: unknown, fallback = "Permissions request failed") => {
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
    <DocsToolkitPageShell activePage="permissions">
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
          {catalogReady ? (
            <DocsPermissionsView server={docsServer} onApiError={handleApiError} />
          ) : (
            <PermissionsMatrixLoading theme={lightPermissionsTheme} />
          )}
        </div>
      )}
    </DocsToolkitPageShell>
  );
}
