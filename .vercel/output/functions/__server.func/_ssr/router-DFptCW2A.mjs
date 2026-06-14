import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useLocation, d as useNavigate, O as Outlet, H as HeadContent, S as Scripts, e as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
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
const appCss = "/assets/styles-c13z9RX6.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$h = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$h.useRouteContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [canRender, setCanRender] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const publicPaths = ["/login", "/auth/magic-link/confirm"];
    const isPublicPage = publicPaths.includes(location.pathname);
    const hasAccessToken = Boolean(localStorage.getItem("access_token"));
    if (!isPublicPage && !hasAccessToken) {
      void navigate({ to: "/login", replace: true });
      setCanRender(false);
      return;
    }
    setCanRender(true);
  }, [location.pathname, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: canRender ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : null });
}
const $$splitComponentImporter$g = () => import("./terms-BZ-EHPz9.mjs");
const Route$g = createFileRoute("/terms")({
  head: () => ({
    meta: [{
      title: "Terms of Service"
    }, {
      name: "description",
      content: "The terms that govern your use of our services."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./privacy-BbAp1Fpf.mjs");
const Route$f = createFileRoute("/privacy")({
  head: () => ({
    meta: [{
      title: "Privacy Policy"
    }, {
      name: "description",
      content: "What information we collect, why we collect it and how you stay in control."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./mcp-C5RfJaWZ.mjs");
const Route$e = createFileRoute("/mcp")({
  head: () => ({
    meta: [{
      title: "Enable MCP tools"
    }, {
      name: "description",
      content: "Browse the MCP server catalog and enable servers onto your organization's toolkits."
    }],
    links: [{
      rel: "canonical",
      href: "/mcp"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./login-TjcPWCok.mjs");
const Route$d = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in"
    }, {
      name: "description",
      content: "Sign in with a magic link or single sign-on."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./firecrawl-COYVaHpl.mjs");
const Route$c = createFileRoute("/firecrawl")({
  head: () => ({
    meta: [{
      title: "Firecrawl — MCP tool"
    }, {
      name: "description",
      content: "Inspect the Firecrawl MCP tool: overview, features, installation, access, schemas, audit and uptime."
    }, {
      property: "og:title",
      content: "Firecrawl — MCP tool"
    }, {
      property: "og:description",
      content: "Inspect the Firecrawl MCP tool: overview, features, installation, access, schemas, audit and uptime."
    }],
    links: [{
      rel: "canonical",
      href: "/firecrawl"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./email-CGFdgsqq.mjs");
const Route$b = createFileRoute("/email")({
  head: () => ({
    meta: [{
      title: "Email — Inbox, Metrics, Domains & Logs"
    }, {
      name: "description",
      content: "Read your inbox, monitor email deliverability, manage sender domains, and inspect every send log."
    }, {
      property: "og:title",
      content: "Email — Inbox, Metrics, Domains & Logs"
    }, {
      property: "og:description",
      content: "Read your inbox, monitor email deliverability, manage sender domains, and inspect every send log."
    }],
    links: [{
      rel: "canonical",
      href: "/email"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./drive-D8XD80tJ.mjs");
const Route$a = createFileRoute("/drive")({
  head: () => ({
    meta: [{
      title: "Drive — Files & folders"
    }, {
      name: "description",
      content: "Browse, search and manage your files and folders."
    }, {
      property: "og:title",
      content: "Drive — Files & folders"
    }, {
      property: "og:description",
      content: "Browse, search and manage your files and folders."
    }],
    links: [{
      rel: "canonical",
      href: "/drive"
    }]
  }),
  validateSearch: (search) => ({
    folder: typeof search.folder === "string" && search.folder ? search.folder : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./database-DLB156kq.mjs");
const Route$9 = createFileRoute("/database")({
  head: () => ({
    meta: [{
      title: "Database — Airtable-style workspace"
    }, {
      name: "description",
      content: "A lightweight Airtable-style database with bases, tables, grid view and inline editing."
    }, {
      property: "og:title",
      content: "Database — Airtable-style workspace"
    }, {
      property: "og:description",
      content: "Bases, tables and a grid view for collaborative structured data."
    }],
    links: [{
      rel: "canonical",
      href: "/database"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./content-DnyZGOpu.mjs");
const Route$8 = createFileRoute("/content")({
  head: () => ({
    meta: [{
      title: "Content — Pipeline"
    }, {
      name: "description",
      content: "Manage content strategy, ideas, editorial calendar, briefs and drafts."
    }, {
      property: "og:title",
      content: "Content — Pipeline"
    }, {
      property: "og:description",
      content: "Manage content strategy, ideas, editorial calendar, briefs and drafts."
    }],
    links: [{
      rel: "canonical",
      href: "/content"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./contacts-BURkv66z.mjs");
const Route$7 = createFileRoute("/contacts")({
  head: () => ({
    meta: [{
      title: "Contacts — CRM"
    }, {
      name: "description",
      content: "Manage your contacts, leads and customer relationships."
    }, {
      property: "og:title",
      content: "Contacts — CRM"
    }, {
      property: "og:description",
      content: "Manage your contacts, leads and customer relationships."
    }],
    links: [{
      rel: "canonical",
      href: "/contacts"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./company-CknnJ0nj.mjs");
const Route$6 = createFileRoute("/company")({
  head: () => ({
    meta: [{
      title: "Company — My Business"
    }, {
      name: "description",
      content: "Manage your business profiles and company details."
    }, {
      property: "og:title",
      content: "Company — My Business"
    }, {
      property: "og:description",
      content: "Manage your business profiles and company details."
    }],
    links: [{
      rel: "canonical",
      href: "/company"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./cms-BAUBan7r.mjs");
const Route$5 = createFileRoute("/cms")({
  head: () => ({
    meta: [{
      title: "Content Manager — CMS"
    }, {
      name: "description",
      content: "Manage collections, single types and components for your content."
    }, {
      property: "og:title",
      content: "Content Manager — CMS"
    }, {
      property: "og:description",
      content: "Manage collections, single types and components."
    }],
    links: [{
      rel: "canonical",
      href: "/cms"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./calendar-B2oDQXdU.mjs");
const Route$4 = createFileRoute("/calendar")({
  head: () => ({
    meta: [{
      title: "Calendar"
    }, {
      name: "description",
      content: "Plan your week and manage events with Calendar."
    }, {
      property: "og:title",
      content: "Calendar"
    }, {
      property: "og:description",
      content: "Plan your week and manage events."
    }],
    links: [{
      rel: "canonical",
      href: "/calendar"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./brand-dna-BdymUehR.mjs");
const Route$3 = createFileRoute("/brand-dna")({
  head: () => ({
    meta: [{
      title: "Brand DNA - My Business"
    }, {
      name: "description",
      content: "Your brand identity: logo, fonts, colors, voice and imagery."
    }, {
      property: "og:title",
      content: "Brand DNA - My Business"
    }, {
      property: "og:description",
      content: "Your brand identity: logo, fonts, colors, voice and imagery."
    }],
    links: [{
      rel: "canonical",
      href: "/brand-dna"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./audit-D9_1-nWY.mjs");
const Route$2 = createFileRoute("/audit")({
  head: () => ({
    meta: [{
      title: "Audit Log — Activity"
    }, {
      name: "description",
      content: "Inspect every MCP tool call and UI change with full request/response payloads."
    }, {
      property: "og:title",
      content: "Audit Log — Activity"
    }, {
      property: "og:description",
      content: "Inspect every MCP tool call and UI change with full request/response payloads."
    }],
    links: [{
      rel: "canonical",
      href: "/audit"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-C0CSpbxx.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Tasks"
    }, {
      name: "description",
      content: "Organize your day with lists and tasks."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./auth.magic-link.confirm-DGt1QpVK.mjs");
const Route = createFileRoute("/auth/magic-link/confirm")({
  head: () => ({
    meta: [{
      title: "Signing in"
    }]
  }),
  validateSearch: (search) => ({
    token: typeof search.token === "string" ? search.token : "",
    email: typeof search.email === "string" ? search.email : ""
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TermsRoute = Route$g.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$h
});
const PrivacyRoute = Route$f.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$h
});
const McpRoute = Route$e.update({
  id: "/mcp",
  path: "/mcp",
  getParentRoute: () => Route$h
});
const LoginRoute = Route$d.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$h
});
const FirecrawlRoute = Route$c.update({
  id: "/firecrawl",
  path: "/firecrawl",
  getParentRoute: () => Route$h
});
const EmailRoute = Route$b.update({
  id: "/email",
  path: "/email",
  getParentRoute: () => Route$h
});
const DriveRoute = Route$a.update({
  id: "/drive",
  path: "/drive",
  getParentRoute: () => Route$h
});
const DatabaseRoute = Route$9.update({
  id: "/database",
  path: "/database",
  getParentRoute: () => Route$h
});
const ContentRoute = Route$8.update({
  id: "/content",
  path: "/content",
  getParentRoute: () => Route$h
});
const ContactsRoute = Route$7.update({
  id: "/contacts",
  path: "/contacts",
  getParentRoute: () => Route$h
});
const CompanyRoute = Route$6.update({
  id: "/company",
  path: "/company",
  getParentRoute: () => Route$h
});
const CmsRoute = Route$5.update({
  id: "/cms",
  path: "/cms",
  getParentRoute: () => Route$h
});
const CalendarRoute = Route$4.update({
  id: "/calendar",
  path: "/calendar",
  getParentRoute: () => Route$h
});
const BrandDnaRoute = Route$3.update({
  id: "/brand-dna",
  path: "/brand-dna",
  getParentRoute: () => Route$h
});
const AuditRoute = Route$2.update({
  id: "/audit",
  path: "/audit",
  getParentRoute: () => Route$h
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$h
});
const AuthMagicLinkConfirmRoute = Route.update({
  id: "/auth/magic-link/confirm",
  path: "/auth/magic-link/confirm",
  getParentRoute: () => Route$h
});
const rootRouteChildren = {
  IndexRoute,
  AuditRoute,
  BrandDnaRoute,
  CalendarRoute,
  CmsRoute,
  CompanyRoute,
  ContactsRoute,
  ContentRoute,
  DatabaseRoute,
  DriveRoute,
  EmailRoute,
  FirecrawlRoute,
  LoginRoute,
  McpRoute,
  PrivacyRoute,
  TermsRoute,
  AuthMagicLinkConfirmRoute
};
const routeTree = Route$h._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$a as R,
  Route as a,
  router as r
};
