import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { d as API_BASE_URL } from "./api-client-CDT_AGSo.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { d as Route } from "./router-nw-Yw9tJ.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function MagicLinkConfirmPage() {
  const navigate = useNavigate();
  const {
    token,
    email
  } = Route.useSearch();
  const [status, setStatus] = reactExports.useState("verifying");
  const [message, setMessage] = reactExports.useState("Verifying your sign-in link...");
  const hasRun = reactExports.useRef(false);
  reactExports.useEffect(() => {
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
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            token
          })
        });
        const body = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(body.detail || "This sign-in link is invalid or has expired. Please request a new one.");
        }
        localStorage.setItem("access_token", body.access_token);
        localStorage.setItem("refresh_token", body.refresh_token);
        localStorage.setItem("token_type", body.token_type);
        await navigate({
          to: "/",
          replace: true
        });
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      }
    };
    void confirm();
  }, [token, email, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex min-h-screen items-center justify-center bg-[hsl(220,33%,98%)] px-4 py-8 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[420px] space-y-4 text-center", children: status === "verifying" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: message })
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-medium tracking-tight", children: "Sign-in failed" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", className: "rounded-lg", onClick: () => void navigate({
      to: "/login",
      replace: true
    }), children: "Back to sign in" })
  ] }) }) });
}
export {
  MagicLinkConfirmPage as component
};
