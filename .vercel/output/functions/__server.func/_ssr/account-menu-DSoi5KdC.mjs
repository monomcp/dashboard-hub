import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { b as useLocation, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { P as Popover, a as PopoverTrigger, b as PopoverContent } from "./popover-ColJhc-i.mjs";
import { a as apiRequest, c as clearAuthTokens } from "./api-client-CDT_AGSo.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { a$ as Grip, s as Pencil, an as X, b as Check, aV as ChevronsUpDown, P as Plus, e as Settings, b0 as LogOut } from "../_libs/lucide-react.mjs";
function PinterestIcon({ className, color = "#E60023" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      role: "img",
      "aria-label": "Pinterest",
      className,
      fill: color,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.764-1.379l-.751 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.124.347 2.318.535 3.546.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" })
    }
  );
}
const FAVOURITE_APPS = [
  { name: "Account", color: "bg-stone-500", letter: "C" },
  {
    name: "Drive",
    color: "bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400",
    letter: "△",
    to: "/drive"
  },
  {
    name: "Contacts",
    color: "bg-gradient-to-br from-sky-400 to-blue-600",
    letter: "C",
    to: "/contacts"
  },
  { name: "Tasks", color: "bg-gradient-to-br from-sky-400 to-indigo-500", letter: "✓", to: "/" },
  {
    name: "Email",
    color: "bg-gradient-to-br from-rose-500 via-amber-400 to-rose-400",
    letter: "✉",
    to: "/email"
  },
  {
    name: "Gemini",
    color: "bg-gradient-to-br from-blue-500 via-fuchsia-500 to-amber-400",
    letter: "✦"
  },
  {
    name: "Search",
    color: "bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500",
    letter: "G"
  },
  { name: "Calendar", color: "bg-sky-500", letter: "31", to: "/calendar" },
  {
    name: "CMS",
    color: "bg-gradient-to-br from-indigo-500 to-violet-600",
    letter: "✎",
    to: "/cms"
  },
  {
    name: "Audit",
    color: "bg-gradient-to-br from-amber-400 to-rose-500",
    letter: "⛨",
    to: "/audit"
  },
  {
    name: "Company",
    color: "bg-gradient-to-br from-amber-400 to-orange-600",
    letter: "B",
    to: "/company"
  },
  {
    name: "Content",
    color: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
    letter: "✍",
    to: "/content"
  },
  {
    name: "Firecrawl",
    color: "bg-gradient-to-br from-orange-500 to-rose-600",
    letter: "🔥",
    to: "/firecrawl"
  },
  {
    name: "Database",
    color: "bg-gradient-to-br from-yellow-400 via-pink-500 to-blue-600",
    letter: "▦",
    to: "/database"
  },
  {
    name: "Brand DNA",
    color: "bg-gradient-to-br from-lime-300 to-emerald-700",
    letter: "🧬",
    to: "/brand"
  },
  {
    name: "MCP tools",
    color: "bg-gradient-to-br from-sky-500 to-indigo-600",
    letter: "⊞",
    to: "/mcp"
  },
  {
    name: "Permissions",
    color: "bg-gradient-to-br from-sky-500 to-indigo-600",
    letter: "🔑",
    to: "/permissions"
  },
  {
    name: "Pinterest",
    color: "bg-white ring-1 ring-black/5",
    letter: "P",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PinterestIcon, { className: "h-6 w-6" }),
    to: "/pinterest"
  }
];
const MORE_APPS = [
  { name: "News", color: "bg-blue-500", letter: "N" },
  {
    name: "Photos",
    color: "bg-gradient-to-br from-red-400 via-yellow-400 to-green-400",
    letter: "✿"
  },
  { name: "Translate", color: "bg-gradient-to-br from-blue-500 to-sky-400", letter: "文" }
];
const PINNED_FAVOURITES = /* @__PURE__ */ new Set(["Pinterest"]);
const HIDDEN_FAVOURITES_KEY = ["preferences", "hidden-favourites"];
function AppsMenu() {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const [editing, setEditing] = reactExports.useState(false);
  const { data } = useQuery({
    queryKey: HIDDEN_FAVOURITES_KEY,
    queryFn: () => apiRequest("/api/v1/preferences/hidden-favourites"),
    staleTime: 5 * 60 * 1e3
  });
  const hidden = new Set(data?.app_keys ?? []);
  const hideFavourite = useMutation({
    mutationFn: (appKey) => apiRequest("/api/v1/preferences/hidden-favourites", {
      method: "POST",
      body: JSON.stringify({ app_key: appKey })
    }),
    // Optimistically drop the app so the grid updates instantly.
    onMutate: async (appKey) => {
      await queryClient.cancelQueries({ queryKey: HIDDEN_FAVOURITES_KEY });
      const previous = queryClient.getQueryData(HIDDEN_FAVOURITES_KEY);
      queryClient.setQueryData(HIDDEN_FAVOURITES_KEY, {
        app_keys: [.../* @__PURE__ */ new Set([...previous?.app_keys ?? [], appKey])]
      });
      return { previous };
    },
    onError: (_err, _appKey, context) => {
      if (context?.previous) {
        queryClient.setQueryData(HIDDEN_FAVOURITES_KEY, context.previous);
      }
    },
    onSuccess: (result) => {
      queryClient.setQueryData(HIDDEN_FAVOURITES_KEY, result);
    }
  });
  const favourites = FAVOURITE_APPS.filter(
    (app) => PINNED_FAVOURITES.has(app.name) || !hidden.has(app.name)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { onOpenChange: (open) => !open && setEditing(false), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Apps", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grip, { className: "h-5 w-5 text-muted-foreground", strokeWidth: 2.5 }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      PopoverContent,
      {
        align: "end",
        sideOffset: 8,
        className: "group w-[360px] rounded-3xl border-none bg-[hsl(220,33%,97%)] p-0 shadow-2xl",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "m-2 rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium", children: "Your favourites" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  "aria-label": editing ? "Done editing favourites" : "Edit favourites",
                  "aria-pressed": editing,
                  onClick: () => setEditing((prev) => !prev),
                  className: cn(
                    "rounded-full bg-sky-100/70 transition-opacity hover:bg-sky-200/70 focus-visible:opacity-100 group-hover:opacity-100",
                    editing ? "opacity-100" : "opacity-0"
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4 text-sky-700" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-y-4", children: favourites.map((app) => {
              const icon = /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "grid h-11 w-11 place-items-center rounded-full font-semibold shadow-sm",
                    app.icon ? "" : "text-white",
                    app.color
                  ),
                  children: app.icon ?? app.letter
                }
              );
              const label = /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80", children: app.name });
              const deleteButton = editing && !PINNED_FAVOURITES.has(app.name) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "aria-label": `Remove ${app.name} from favourites`,
                  onClick: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    hideFavourite.mutate(app.name);
                  },
                  className: "absolute right-1 top-1 z-10 grid h-5 w-5 place-items-center rounded-full bg-stone-400/90 text-white shadow-sm transition hover:bg-stone-500",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" })
                }
              ) : null;
              const inner = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                deleteButton,
                icon,
                label
              ] });
              const className = "relative flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-sky-50";
              if (app.to && !editing) {
                return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: app.to, className, children: inner }, app.name);
              }
              return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className, children: inner }, app.name);
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
  PinterestIcon as P,
  AccountMenu as a
};
