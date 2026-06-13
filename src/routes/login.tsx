import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Apple, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID ||
  "118505185427-o25l1un5e065ls98l4c4t2nl9kmn2bi4.apps.googleusercontent.com";
const GIS_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

type GoogleCredentialResponse = { credential?: string };

type GoogleAccountsId = {
  initialize: (config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }) => void;
  prompt: () => void;
  renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    google?: { accounts?: { id?: GoogleAccountsId } };
  }
}

function loadGoogleIdentityScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GIS_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Google sign-in")));
      return;
    }
    const script = document.createElement("script");
    script.src = GIS_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google sign-in"));
    document.head.appendChild(script);
  });
}

type MagicLinkResponse = {
  message: string;
  otp_token?: string;
};

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in" },
      { name: "description", content: "Sign in with a magic link or single sign-on." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "verified" | "error">("idle");
  const [message, setMessage] = useState("");
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const persistTokens = useCallback(
    async (tokens: TokenResponse) => {
      localStorage.setItem("access_token", tokens.access_token);
      localStorage.setItem("refresh_token", tokens.refresh_token);
      localStorage.setItem("token_type", tokens.token_type);
      setStatus("verified");
      await navigate({ to: "/" });
    },
    [navigate],
  );

  const handleGoogleCredential = useCallback(
    async (response: GoogleCredentialResponse) => {
      if (!response.credential) {
        setStatus("error");
        setMessage("Google sign-in was cancelled. Please try again.");
        return;
      }
      setStatus("sending");
      setMessage("");
      try {
        const result = await fetch(`${API_BASE_URL}/api/v1/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });
        const body = (await result.json().catch(() => ({}))) as TokenResponse & {
          detail?: string;
        };
        if (!result.ok) {
          throw new Error(body.detail || "Unable to sign in with Google. Please try again.");
        }
        await persistTokens(body);
      } catch (error) {
        setStatus("error");
        setMessage(
          error instanceof Error ? error.message : "Something went wrong. Please try again.",
        );
      }
    },
    [persistTokens],
  );

  useEffect(() => {
    let cancelled = false;
    loadGoogleIdentityScript()
      .then(() => {
        const id = window.google?.accounts?.id;
        if (cancelled || !id || !googleButtonRef.current) return;
        id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: handleGoogleCredential });
        id.renderButton(googleButtonRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          logo_alignment: "left",
          width: 396,
        });
      })
      .catch(() => {
        if (!cancelled) setMessage("Google sign-in is unavailable right now.");
      });
    return () => {
      cancelled = true;
    };
  }, [handleGoogleCredential]);

  const submitMagicLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/magic-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const body = (await response.json().catch(() => ({}))) as MagicLinkResponse & {
        detail?: string;
      };

      if (!response.ok) {
        throw new Error(body.detail || "Unable to send magic link. Please try again.");
      }

      if (import.meta.env.DEV && body.otp_token) {
        const confirmResponse = await fetch(`${API_BASE_URL}/api/v1/auth/magic-link/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: normalizedEmail, token: body.otp_token }),
        });

        const tokenBody = (await confirmResponse.json().catch(() => ({}))) as TokenResponse & {
          detail?: string;
        };

        if (!confirmResponse.ok) {
          throw new Error(tokenBody.detail || "Unable to verify magic link. Please try again.");
        }

        await persistTokens(tokenBody);
        return;
      }

      setStatus("sent");
      setMessage(body.message || "Magic link sent. Check your email to continue.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  const isSubmitting = status === "sending";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[hsl(220,33%,98%)] px-4 py-8 text-foreground sm:px-6">
      <Card className="w-full max-w-[460px] rounded-3xl border-0 bg-card shadow-sm">
        <CardHeader className="space-y-3 px-6 pb-4 pt-8 sm:px-8 sm:pt-10">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-medium tracking-tight sm:text-4xl">
              Sign in
            </CardTitle>
            <CardDescription className="text-base text-foreground">
              Enter your email and we&apos;ll send you a magic link.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-8 pt-2 sm:px-8 sm:pb-10">
          <form className="space-y-5" onSubmit={submitMagicLink}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                disabled={isSubmitting}
                required
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 rounded-lg bg-background text-base shadow-none"
              />
            </div>

            <Button type="submit" className="h-11 w-full rounded-lg" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Login"}
            </Button>

            {message ? (
              <p
                className={
                  status === "error"
                    ? "text-sm font-medium text-destructive"
                    : "text-sm text-muted-foreground"
                }
                role={status === "error" ? "alert" : "status"}
              >
                {message}
              </p>
            ) : null}
          </form>

          <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="space-y-3">
            <div
              ref={googleButtonRef}
              className="flex min-h-11 w-full justify-center [color-scheme:light]"
            />
            <Button type="button" variant="outline" className="h-11 w-full rounded-lg bg-card">
              <Apple className="h-4 w-4" aria-hidden="true" />
              Continue with Apple
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
