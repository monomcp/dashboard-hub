import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Apple, Mail } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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

function GoogleMark() {
  return (
    <span className="grid h-4 w-4 place-items-center rounded-full text-sm font-semibold leading-none">
      <span className="text-blue-600">G</span>
    </span>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "verified" | "error">("idle");
  const [message, setMessage] = useState("");

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

        localStorage.setItem("access_token", tokenBody.access_token);
        localStorage.setItem("refresh_token", tokenBody.refresh_token);
        localStorage.setItem("token_type", tokenBody.token_type);
        setStatus("verified");
        await navigate({ to: "/" });
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
            <Button type="button" variant="outline" className="h-11 w-full rounded-lg bg-card">
              <GoogleMark />
              Continue with Google
            </Button>
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
