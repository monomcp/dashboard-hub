import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { PermissionsMatrix } from "@/components/permissions-matrix";
import { TasksToolkitPageShell } from "@/components/tasks-toolkit-page-shell";
import { ApiError, clearAuthTokens } from "@/lib/api-client";
import { lightPermissionsTheme } from "@/lib/permissions-theme";

export const Route = createFileRoute("/tasks/permissions")({
  head: () => ({
    meta: [
      { title: "Tasks Permissions" },
      { name: "description", content: "Manage access to Tasks MCP tools." },
    ],
  }),
  component: TasksPermissionsPage,
});

function TasksPermissionsPage() {
  const navigate = useNavigate();
  const [pageError, setPageError] = useState("");

  const handleApiError = useCallback(
    (err: unknown, fallback = "Permissions request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      setPageError(err instanceof Error ? err.message : fallback);
    },
    [navigate],
  );

  return (
    <TasksToolkitPageShell activePage="permissions">
      {({ tasksServer }) => (
        <>
          {pageError && (
            <div
              className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
              role="alert"
            >
              {pageError}
            </div>
          )}
          <PermissionsMatrix
            toolkitIds={tasksServer?.toolkit_ids ?? []}
            moduleSlugs={["tasks"]}
            enabled={tasksServer?.enabled ?? false}
            theme={lightPermissionsTheme}
            toolsNoun="Tasks"
            stripToolPrefix={/^tasks_/}
            disabledHint="Who can use the Tasks tools, and how. Enable the Tasks MCP server first to start granting access."
            connectHint="No Tasks toolkit is connected yet - enable Tasks from the MCP catalog."
            onApiError={handleApiError}
          />
        </>
      )}
    </TasksToolkitPageShell>
  );
}
