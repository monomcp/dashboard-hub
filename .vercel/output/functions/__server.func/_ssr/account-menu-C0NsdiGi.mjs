import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { b as useLocation, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button, c as cn } from "./button-BXrfXN_b.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { R as Root2, T as Trigger, P as Portal, C as Content2 } from "../_libs/radix-ui__react-popover.mjs";
import { c as clearAuthTokens, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { a3 as LayoutGrid, o as Pencil, a6 as Check, aR as ChevronsUpDown, z as Plus, h as Settings, aZ as LogOut } from "../_libs/lucide-react.mjs";
const Popover = Root2;
const PopoverTrigger = Trigger;
const PopoverContent = reactExports.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = Content2.displayName;
const FAVOURITE_APPS = [
  { name: "Account", color: "bg-stone-500", letter: "C" },
  { name: "Drive", color: "bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400", letter: "△", to: "/drive" },
  { name: "Contacts", color: "bg-gradient-to-br from-sky-400 to-blue-600", letter: "C", to: "/contacts" },
  { name: "Tasks", color: "bg-gradient-to-br from-sky-400 to-indigo-500", letter: "✓", to: "/" },
  { name: "Email", color: "bg-gradient-to-br from-rose-500 via-amber-400 to-rose-400", letter: "✉", to: "/email" },
  { name: "Gemini", color: "bg-gradient-to-br from-blue-500 via-fuchsia-500 to-amber-400", letter: "✦" },
  { name: "Search", color: "bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500", letter: "G" },
  { name: "Calendar", color: "bg-sky-500", letter: "31", to: "/calendar" },
  { name: "CMS", color: "bg-gradient-to-br from-indigo-500 to-violet-600", letter: "✎", to: "/cms" },
  { name: "Audit", color: "bg-gradient-to-br from-amber-400 to-rose-500", letter: "⛨", to: "/audit" },
  { name: "Company", color: "bg-gradient-to-br from-amber-400 to-orange-600", letter: "B", to: "/company" },
  { name: "Content", color: "bg-gradient-to-br from-violet-500 to-fuchsia-600", letter: "✍", to: "/content" },
  { name: "Firecrawl", color: "bg-gradient-to-br from-orange-500 to-rose-600", letter: "🔥", to: "/firecrawl" },
  { name: "Database", color: "bg-gradient-to-br from-yellow-400 via-pink-500 to-blue-600", letter: "▦", to: "/database" },
  { name: "Brand DNA", color: "bg-gradient-to-br from-lime-300 to-emerald-700", letter: "🧬", to: "/brand" },
  { name: "MCP tools", color: "bg-gradient-to-br from-sky-500 to-indigo-600", letter: "⊞", to: "/mcp" }
];
const MORE_APPS = [
  { name: "News", color: "bg-blue-500", letter: "N" },
  { name: "Photos", color: "bg-gradient-to-br from-red-400 via-yellow-400 to-green-400", letter: "✿" },
  { name: "Translate", color: "bg-gradient-to-br from-blue-500 to-sky-400", letter: "文" }
];
function AppsMenu() {
  const { pathname } = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Apps", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, { className: "h-5 w-5 text-muted-foreground" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      PopoverContent,
      {
        align: "end",
        sideOffset: 8,
        className: "w-[360px] rounded-3xl border-none bg-[hsl(220,33%,97%)] p-0 shadow-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "m-2 rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium", children: "Your favourites" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full bg-sky-100/70 hover:bg-sky-200/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4 text-sky-700" }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-y-4", children: FAVOURITE_APPS.filter((app) => app.to !== pathname).map((app) => {
              const content = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "grid h-11 w-11 place-items-center rounded-full text-white font-semibold shadow-sm",
                      app.color
                    ),
                    children: app.letter
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80", children: app.name })
              ] });
              if (app.to) {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: app.to,
                    className: "flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-sky-50",
                    children: content
                  },
                  app.name
                );
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-sky-50",
                  children: content
                },
                app.name
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-y-4", children: MORE_APPS.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "grid h-11 w-11 place-items-center rounded-lg text-white font-semibold shadow-sm",
                      app.color
                    ),
                    children: app.letter
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80", children: app.name })
              ]
            },
            app.name
          )) }) })
        ]
      }
    )
  ] });
}
const ORG_COLORS = [
  "bg-stone-500",
  "bg-gradient-to-br from-violet-500 to-fuchsia-600",
  "bg-gradient-to-br from-sky-400 to-blue-600",
  "bg-gradient-to-br from-amber-400 to-rose-500",
  "bg-gradient-to-br from-emerald-400 to-teal-600",
  "bg-gradient-to-br from-indigo-500 to-violet-600"
];
function initial(value) {
  return (value?.trim().charAt(0) || "?").toUpperCase();
}
function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function switchOrganization(organizationId) {
  localStorage.setItem("organization_id", organizationId);
  window.location.reload();
}
function signOut() {
  clearAuthTokens();
  localStorage.removeItem("organization_id");
  window.location.href = "/login";
}
function AccountMenu() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiRequest("/api/v1/auth/me"),
    staleTime: 5 * 60 * 1e3
  });
  const displayName = data?.full_name?.trim() || data?.email || "";
  const avatarLetter = initial(data?.full_name || data?.email);
  const memberships = data?.memberships ?? [];
  const storedOrgId = typeof window !== "undefined" ? localStorage.getItem("organization_id") : null;
  const activeOrg = memberships.find((m) => m.organization_id === storedOrgId) ?? memberships[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "ml-1 grid h-9 w-9 place-items-center rounded-full bg-stone-500 text-sm font-medium text-white outline-none transition hover:ring-2 hover:ring-stone-300",
        "aria-label": "Account",
        children: isLoading ? "" : avatarLetter
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PopoverContent,
      {
        align: "end",
        sideOffset: 8,
        className: "w-[360px] rounded-3xl border-none bg-[hsl(220,33%,97%)] p-2 shadow-2xl",
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-10 text-center text-sm text-muted-foreground", children: "Loading…" }) : isError || !data ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-10 text-center text-sm text-muted-foreground", children: "Couldn't load account" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-3 pb-3 pt-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/70", children: data.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto my-3 grid h-16 w-16 place-items-center rounded-full bg-stone-500 text-2xl font-medium text-white", children: avatarLetter }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl", children: [
              "Hi, ",
              displayName,
              "!"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-1.5 text-xs font-medium text-muted-foreground", children: "Organizations" }),
            memberships.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 py-2 text-sm text-muted-foreground", children: "No organizations yet" }) : memberships.map((org, i) => {
              const active = org.organization_id === activeOrg?.organization_id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => !active && switchOrganization(org.organization_id),
                  className: cn(
                    "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-sky-50",
                    active && "bg-sky-50/70"
                  ),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold text-white",
                          ORG_COLORS[i % ORG_COLORS.length]
                        ),
                        children: initial(org.organization_name)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium", children: org.organization_name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-xs text-muted-foreground", children: capitalize(org.role) })
                    ] }),
                    active ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 shrink-0 text-sky-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "h-4 w-4 shrink-0 text-muted-foreground/50" })
                  ]
                },
                org.organization_id
              );
            }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "mt-1 flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-sky-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 text-sky-700" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground/80", children: "Create organization" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 rounded-2xl bg-white p-1 shadow-sm ring-1 ring-black/5", children: [
            activeOrg && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-sky-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4 text-muted-foreground" }),
              "Manage ",
              activeOrg.organization_name
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: signOut,
                className: "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-sky-50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 text-muted-foreground" }),
                  "Sign out"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "px-3 py-3 text-center text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "hover:text-foreground hover:underline", children: "Privacy policy" }),
            " · ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "hover:text-foreground hover:underline", children: "Terms of Service" })
          ] })
        ] })
      }
    )
  ] });
}
export {
  AppsMenu as A,
  Popover as P,
  AccountMenu as a,
  PopoverTrigger as b,
  PopoverContent as c
};
