import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-DSoi5KdC.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { S as Sheet, a as SheetTrigger, b as SheetContent, c as SheetHeader, d as SheetTitle } from "./sheet-CCXbRTbu.mjs";
import { M as Menu, C as ChevronUp } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
function LegalHeader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "left", className: "w-80 p-0 sm:max-w-80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { className: "border-b border-border px-6 py-5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-xl font-normal", children: "Terms of Service" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "px-3 py-4", "aria-label": "Legal pages", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "block rounded-xl px-3 py-3 text-sm font-medium text-foreground transition hover:bg-muted", children: "Privacy Policy" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/monomcp-logo-transparent.png", alt: "MonoMCP", className: "h-8 w-auto" })
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
function TermsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LegalHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-3xl px-6 py-12 sm:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Effective 12 June 2026" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary hover:underline", children: "Archived versions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary hover:underline", children: "Download PDF" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-medium", children: "What's covered in these terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-normal leading-snug text-foreground sm:text-3xl", children: "We know it's tempting to skip these Terms of Service, but it's important to establish what you can expect from us as you use our services, and what we expect from you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-7 text-muted-foreground", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "pt-4 text-lg font-medium text-foreground", children: "Service provider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-7 text-muted-foreground", children: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "pt-4 text-lg font-medium text-foreground", children: "What you can expect from us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-7 text-muted-foreground", children: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "pt-4 text-lg font-medium text-foreground", children: "What we expect from you" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-7 text-muted-foreground", children: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "pt-4 text-lg font-medium text-foreground", children: "Making changes to these terms" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-7 text-muted-foreground", children: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. If you don't agree to the new terms, you should stop using the services." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LegalFooter, {})
  ] });
}
export {
  TermsPage as component
};
