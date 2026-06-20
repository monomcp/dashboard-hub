import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ActivityLog } from "@/components/activity-log";
import { TasksToolkitPageShell } from "@/components/tasks-toolkit-page-shell";
import { ApiError, clearAuthTokens } from "@/lib/api-client";

export const Route = createFileRoute("/tasks/activity")({
  head: () => ({
    meta: [
      { title: "Tasks Activity" },
      { name: "description", content: "Review Tasks Console and MCP tool activity." },
    ],
  }),
  component: TasksActivityPage,
});

function TasksActivityPage() {
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
    <TasksToolkitPageShell activePage="activity">
      {({ tasksServer, catalogReady }) => (
        <>
          {error && (
            <div
              className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
              role="alert"
            >
              {error}
            </div>
          )}
          <ActivityLog
            title="Activity"
            description="Task changes made through Console and via Tasks MCP tool calls."
            onApiError={handleApiError}
            nameServerSlugs={["tasks"]}
            moduleSlug="tasks"
            toolkitIds={tasksServer?.toolkit_ids ?? []}
            enabled={catalogReady}
            logFilter={(log) =>
              log.tool_name
                ? log.tool_name.startsWith("tasks_")
                : Boolean(log.path?.startsWith("/api/v1/tasks"))
            }
          />
        </>
      )}
    </TasksToolkitPageShell>
  );
}
