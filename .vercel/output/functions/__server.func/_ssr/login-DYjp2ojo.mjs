import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { d as Mail, A as Apple } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const API_BASE_URL = "https://api-1-bxq9.onrender.com";
const GOOGLE_CLIENT_ID = "118505185427-o25l1un5e065ls98l4c4t2nl9kmn2bi4.apps.googleusercontent.com";
const GIS_SCRIPT_SRC = "https://accounts.google.com/gsi/client";
function loadGoogleIdentityScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }
    const existing = document.querySelector(`script[src="${GIS_SCRIPT_SRC}"]`);
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
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("idle");
  const [message, setMessage] = reactExports.useState("");
  const googleButtonRef = reactExports.useRef(null);
  const persistTokens = reactExports.useCallback(async (tokens) => {
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
    localStorage.setItem("token_type", tokens.token_type);
    setStatus("verified");
    await navigate({
      to: "/"
    });
  }, [navigate]);
  const handleGoogleCredential = reactExports.useCallback(async (response) => {
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
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          credential: response.credential
        })
      });
      const body = await result.json().catch(() => ({}));
      if (!result.ok) {
        throw new Error(body.detail || "Unable to sign in with Google. Please try again.");
      }
      await persistTokens(body);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }, [persistTokens]);
  reactExports.useEffect(() => {
    let cancelled = false;
    loadGoogleIdentityScript().then(() => {
      const id = window.google?.accounts?.id;
      if (cancelled || !id || !googleButtonRef.current) return;
      id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential
      });
      id.renderButton(googleButtonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "rectangular",
        logo_alignment: "left",
        width: 396
      });
    }).catch(() => {
      if (!cancelled) setMessage("Google sign-in is unavailable right now.");
    });
    return () => {
      cancelled = true;
    };
  }, [handleGoogleCredential]);
  const submitMagicLink = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/magic-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: normalizedEmail
        })
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(body.detail || "Unable to send magic link. Please try again.");
      }
      if (false) ;
      setStatus("sent");
      setMessage(body.message || "Magic link sent. Check your email to continue.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };
  const isSubmitting = status === "sending";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center bg-[hsl(220,33%,98%)] px-4 py-8 text-foreground sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-[460px] rounded-3xl border-0 bg-card shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-3 px-6 pb-4 pt-8 sm:px-8 sm:pt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5", "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-3xl font-medium tracking-tight sm:text-4xl", children: "Sign in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-base text-foreground", children: "Enter your email and we'll send you a magic link." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-6 pb-8 pt-2 sm:px-8 sm:pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-5", onSubmit: submitMagicLink, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", name: "email", type: "email", autoComplete: "email", placeholder: "you@example.com", value: email, disabled: isSubmitting, required: true, onChange: (event) => setEmail(event.target.value), className: "h-12 rounded-lg bg-background text-base shadow-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "h-11 w-full rounded-lg", disabled: isSubmitting, children: isSubmitting ? "Sending..." : "Login" }),
        message ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: status === "error" ? "text-sm font-medium text-destructive" : "text-sm text-muted-foreground", role: status === "error" ? "alert" : "status", children: message }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "or" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: googleButtonRef, className: "flex min-h-11 w-full justify-center [color-scheme:light]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", className: "h-11 w-full rounded-lg bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "h-4 w-4", "aria-hidden": "true" }),
          "Continue with Apple"
        ] })
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
