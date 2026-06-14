import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { API_BASE_URL } from "@/lib/api-client";
import { Button } from "@/components/ui/button";

type ConfirmSearch = {
  token: string;
  email: string;
};

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export const Route = createFileRoute("/auth/magic-link/confirm")({
  head: () => ({
    meta: [{ title: "Signing in" }],
  }),
  validateSearch: (search: Record<string, unknown>): ConfirmSearch => ({
    token: typeof search.token === "string" ? search.token : "",
    email: typeof search.email === "string" ? search.email : "",
  }),
  component: MagicLinkConfirmPage,
});

function MagicLinkConfirmPage() {
  const navigate = useNavigate();
  const { token, email } = Route.useSearch();
  const [status, setStatus] = useState<"verifying" | "error">("verifying");
  const [message, setMessage] = useState("Verifying your sign-in link...");
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const confirm = async () => {
      if (!token || !email) {
        setStatus("error");
        setMessage("This sign-in link is missing required information.");
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/auth/magic-link/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token }),
        });

        const body = (await response.json().catch(() => ({}))) as TokenResponse & {
          detail?: string;
        };

        if (!response.ok) {
          throw new Error(
            body.detail || "This sign-in link is invalid or has expired. Please request a new one.",
          );
        }

        localStorage.setItem("access_token", body.access_token);
        localStorage.setItem("refresh_token", body.refresh_token);
        localStorage.setItem("token_type", body.token_type);

        await navigate({ to: "/", replace: true });
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error ? error.message : "Something went wrong. Please try again.",
        );
      }
    };

    void confirm();
  }, [token, email, navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[hsl(220,33%,98%)] px-4 py-8 text-foreground">
      <div className="w-full max-w-[420px] space-y-4 text-center">
        {status === "verifying" ? (
          <>
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />
            <p className="text-sm text-muted-foreground">{message}</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-medium tracking-tight">Sign-in failed</h1>
            <p className="text-sm text-destructive">{message}</p>
            <Button
              type="button"
              className="rounded-lg"
              onClick={() => void navigate({ to: "/login", replace: true })}
            >
              Back to sign in
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
