import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { TasksToolkitPageShell } from "@/components/tasks-toolkit-page-shell";
import { TasksUptimeView } from "@/components/tasks-uptime-view";
import { ApiError, clearAuthTokens } from "@/lib/api-client";

export const Route = createFileRoute("/tasks/uptime")({
  head: () => ({
    meta: [
      { title: "Tasks Uptime" },
      { name: "description", content: "Review Tasks MCP and Console uptime." },
    ],
  }),
  component: TasksUptimePage,
});

function TasksUptimePage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleApiError = useCallback(
    (err: unknown, fallback = "Uptime request failed") => {
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
    <TasksToolkitPageShell activePage="uptime">
      {error && (
        <div
          className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
          role="alert"
        >
          {error}
        </div>
      )}
      <TasksUptimeView
        onApiError={handleApiError}
        onViewHistory={() => void navigate({ to: "/tasks/activity" })}
      />
    </TasksToolkitPageShell>
  );
}
