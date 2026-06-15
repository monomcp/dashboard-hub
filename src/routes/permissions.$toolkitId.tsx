import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { PermissionsMatrix } from "@/components/permissions-matrix";
import { ApiError, clearAuthTokens } from "@/lib/api-client";
import { lightPermissionsTheme } from "@/lib/permissions-theme";

export const Route = createFileRoute("/permissions/$toolkitId")({
  component: PermissionsToolkitPage,
});

function PermissionsToolkitPage() {
  const { toolkitId } = Route.useParams();
  const navigate = useNavigate();

  const handleApiError = useCallback(
    (err: unknown, fallback = "Permissions request failed") => {
      if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
        clearAuthTokens();
        void navigate({ to: "/login", replace: true });
        return;
      }
      // Non-auth errors surface inline inside the matrix; nothing else to do here.
      void fallback;
    },
    [navigate],
  );

  return (
    <PermissionsMatrix
      key={toolkitId}
      toolkitIds={[toolkitId]}
      enabled
      theme={lightPermissionsTheme}
      onApiError={handleApiError}
    />
  );
}
