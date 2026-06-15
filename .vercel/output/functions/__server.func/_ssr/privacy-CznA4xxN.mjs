import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-3sxYre98.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { S as ShieldCheck, M as Menu, C as ChevronUp } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./popover-ColJhc-i.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./api-client-CDT_AGSo.mjs";
import "../_libs/class-variance-authority.mjs";
function LegalHeader({
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-normal text-foreground", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
    ] })
  ] });
}
function LegalFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-16 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-5xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-6 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground", children: "Console" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "About" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "hover:text-foreground", children: "Privacy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "hover:text-foreground", children: "Terms" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Transparency Centre" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => window.scrollTo({
      top: 0,
      behavior: "smooth"
    }), className: "ml-auto grid h-10 w-10 place-items-center rounded-full border border-border text-foreground hover:bg-muted", "aria-label": "Back to top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-5 w-5" }) })
  ] }) });
}
function PrivacyPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LegalHeader, { title: "Privacy Policy" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-6 py-12 sm:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-normal leading-snug text-foreground sm:text-3xl", children: "When you use our services, you're trusting us with your information. We understand that this is a big responsibility and we work hard to protect your information and put you in control." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 leading-7 text-muted-foreground", children: "This Privacy Policy is meant to help you understand what information we collect, why we collect it and how you can update, manage, export and delete your information." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-start gap-4 rounded-2xl border border-border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: "Privacy Check-Up" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Looking to change your privacy settings?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-sm text-primary hover:underline", children: "Take the Privacy Check-Up" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-1 border-t border-border pt-6 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Effective 26 May 2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary hover:underline", children: "Archived versions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary hover:underline", children: "Download PDF" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-medium text-foreground", children: "Information we collect" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-7 text-muted-foreground", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "pt-4 text-lg font-medium text-foreground", children: "Why we collect data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-7 text-muted-foreground", children: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "pt-4 text-lg font-medium text-foreground", children: "Your privacy controls" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-7 text-muted-foreground", children: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "pt-4 text-lg font-medium text-foreground", children: "Sharing your information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-7 text-muted-foreground", children: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "pt-4 text-lg font-medium text-foreground", children: "Other useful resources" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-7 text-muted-foreground", children: "The following links highlight useful resources for you to learn more about our practices and privacy settings. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LegalFooter, {})
  ] });
}
export {
  PrivacyPage as component
};
