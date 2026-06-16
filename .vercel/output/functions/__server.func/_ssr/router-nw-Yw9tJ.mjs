import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useLocation, d as useNavigate, O as Outlet, H as HeadContent, S as Scripts, e as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-C2kyjKPj.css";
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
const Route$m = createRootRouteWithContext()({
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
  const { queryClient } = Route$m.useRouteContext();
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
const $$splitComponentImporter$j = () => import("./terms-CaZVG7wB.mjs");
const Route$l = createFileRoute("/terms")({
  head: () => ({
    meta: [{
      title: "Terms of Service"
    }, {
      name: "description",
      content: "The terms that govern your use of our services."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./privacy-CznA4xxN.mjs");
const Route$k = createFileRoute("/privacy")({
  head: () => ({
    meta: [{
      title: "Privacy Policy"
    }, {
      name: "description",
      content: "What information we collect, why we collect it and how you stay in control."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./pinterest-pPtFyZVK.mjs");
const Route$j = createFileRoute("/pinterest")({
  head: () => ({
    meta: [{
      title: "Pinterest Toolkit — MCP"
    }, {
      name: "description",
      content: "Configure the Pinterest MCP tools: search and scrape pins, and choose which fields are exposed in responses."
    }],
    links: [{
      rel: "canonical",
      href: "/pinterest"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./permissions-tZQ0j0mY.mjs");
const Route$i = createFileRoute("/permissions")({
  head: () => ({
    meta: [{
      title: "Permissions"
    }, {
      name: "description",
      content: "Manage who can use each toolkit's tools and how every call is gated."
    }, {
      property: "og:title",
      content: "Permissions"
    }, {
      property: "og:description",
      content: "Manage who can use each toolkit's tools and how every call is gated."
    }],
    links: [{
      rel: "canonical",
      href: "/permissions"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./mcp-C7yH0sxo.mjs");
const Route$h = createFileRoute("/mcp")({
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
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./login-DYjp2ojo.mjs");
const Route$g = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in"
    }, {
      name: "description",
      content: "Sign in with a magic link or single sign-on."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./firecrawl-Cz3Nmf29.mjs");
const Route$f = createFileRoute("/firecrawl")({
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
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./email-C1rhOOvl.mjs");
const Route$e = createFileRoute("/email")({
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
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./drive-C_DXTqsG.mjs");
const Route$d = createFileRoute("/drive")({
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
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./database-5M3DbFjX.mjs");
const Route$c = createFileRoute("/database")({
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
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const Route$b = createFileRoute("/content")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/content" || location.pathname === "/content/") {
      throw redirect({ to: "/content/$view", params: { view: "ideas" }, replace: true });
    }
  }
});
const $$splitComponentImporter$9 = () => import("./contacts-Cdjk6ca6.mjs");
const Route$a = createFileRoute("/contacts")({
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
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./company-DLlEfrHg.mjs");
const Route$9 = createFileRoute("/company")({
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
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./cms-D0J9UKTz.mjs");
const Route$8 = createFileRoute("/cms")({
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
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./calendar-DgHxXnet.mjs");
const Route$7 = createFileRoute("/calendar")({
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
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./audit-B_Ehx4xb.mjs");
const Route$6 = createFileRoute("/audit")({
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
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-TWr9dcSG.mjs");
const Route$5 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Tasks"
    }, {
      name: "description",
      content: "Organize your day with lists and tasks."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const Route$4 = createFileRoute("/brand/")({
  beforeLoad: () => {
    throw redirect({ to: "/brand/$view", params: { view: "dna" }, replace: true });
  }
});
const $$splitComponentImporter$3 = () => import("./permissions._toolkitId-CwGdFQlQ.mjs");
const Route$3 = createFileRoute("/permissions/$toolkitId")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./content._view-B4Ho7Zof.mjs");
const CONTENT_SECTIONS = ["ideas", "calendar", "strategy", "permissions", "activity"];
function isContentSection(value) {
  return CONTENT_SECTIONS.includes(value);
}
const Route$2 = createFileRoute("/content/$view")({
  beforeLoad: ({
    params
  }) => {
    if (!isContentSection(params.view)) {
      throw redirect({
        to: "/content/$view",
        params: {
          view: "ideas"
        },
        replace: true
      });
    }
  },
  head: ({
    params
  }) => ({
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
      href: `/content/${params.view}`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./brand._view-Mwa2SUSF.mjs");
const BRAND_VIEWS = ["dna", "tov", "competitors", "permissions", "activity"];
function isBrandView(value) {
  return BRAND_VIEWS.includes(value);
}
const Route$1 = createFileRoute("/brand/$view")({
  beforeLoad: ({
    params
  }) => {
    if (!isBrandView(params.view)) {
      throw redirect({
        to: "/brand/$view",
        params: {
          view: "dna"
        },
        replace: true
      });
    }
  },
  head: ({
    params
  }) => ({
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
      href: `/brand/${params.view}`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./auth.magic-link.confirm-NGKqGn75.mjs");
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
const TermsRoute = Route$l.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => Route$m
});
const PrivacyRoute = Route$k.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => Route$m
});
const PinterestRoute = Route$j.update({
  id: "/pinterest",
  path: "/pinterest",
  getParentRoute: () => Route$m
});
const PermissionsRoute = Route$i.update({
  id: "/permissions",
  path: "/permissions",
  getParentRoute: () => Route$m
});
const McpRoute = Route$h.update({
  id: "/mcp",
  path: "/mcp",
  getParentRoute: () => Route$m
});
const LoginRoute = Route$g.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$m
});
const FirecrawlRoute = Route$f.update({
  id: "/firecrawl",
  path: "/firecrawl",
  getParentRoute: () => Route$m
});
const EmailRoute = Route$e.update({
  id: "/email",
  path: "/email",
  getParentRoute: () => Route$m
});
const DriveRoute = Route$d.update({
  id: "/drive",
  path: "/drive",
  getParentRoute: () => Route$m
});
const DatabaseRoute = Route$c.update({
  id: "/database",
  path: "/database",
  getParentRoute: () => Route$m
});
const ContentRoute = Route$b.update({
  id: "/content",
  path: "/content",
  getParentRoute: () => Route$m
});
const ContactsRoute = Route$a.update({
  id: "/contacts",
  path: "/contacts",
  getParentRoute: () => Route$m
});
const CompanyRoute = Route$9.update({
  id: "/company",
  path: "/company",
  getParentRoute: () => Route$m
});
const CmsRoute = Route$8.update({
  id: "/cms",
  path: "/cms",
  getParentRoute: () => Route$m
});
const CalendarRoute = Route$7.update({
  id: "/calendar",
  path: "/calendar",
  getParentRoute: () => Route$m
});
const AuditRoute = Route$6.update({
  id: "/audit",
  path: "/audit",
  getParentRoute: () => Route$m
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$m
});
const BrandIndexRoute = Route$4.update({
  id: "/brand/",
  path: "/brand/",
  getParentRoute: () => Route$m
});
const PermissionsToolkitIdRoute = Route$3.update({
  id: "/$toolkitId",
  path: "/$toolkitId",
  getParentRoute: () => PermissionsRoute
});
const ContentViewRoute = Route$2.update({
  id: "/$view",
  path: "/$view",
  getParentRoute: () => ContentRoute
});
const BrandViewRoute = Route$1.update({
  id: "/brand/$view",
  path: "/brand/$view",
  getParentRoute: () => Route$m
});
const AuthMagicLinkConfirmRoute = Route.update({
  id: "/auth/magic-link/confirm",
  path: "/auth/magic-link/confirm",
  getParentRoute: () => Route$m
});
const ContentRouteChildren = {
  ContentViewRoute
};
const ContentRouteWithChildren = ContentRoute._addFileChildren(ContentRouteChildren);
const PermissionsRouteChildren = {
  PermissionsToolkitIdRoute
};
const PermissionsRouteWithChildren = PermissionsRoute._addFileChildren(
  PermissionsRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AuditRoute,
  CalendarRoute,
  CmsRoute,
  CompanyRoute,
  ContactsRoute,
  ContentRoute: ContentRouteWithChildren,
  DatabaseRoute,
  DriveRoute,
  EmailRoute,
  FirecrawlRoute,
  LoginRoute,
  McpRoute,
  PermissionsRoute: PermissionsRouteWithChildren,
  PinterestRoute,
  PrivacyRoute,
  TermsRoute,
  BrandViewRoute,
  BrandIndexRoute,
  AuthMagicLinkConfirmRoute
};
const routeTree = Route$m._addFileChildren(rootRouteChildren)._addFileTypes();
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
  Route$d as R,
  Route$3 as a,
  Route$2 as b,
  Route$1 as c,
  Route as d,
  router as r
};
