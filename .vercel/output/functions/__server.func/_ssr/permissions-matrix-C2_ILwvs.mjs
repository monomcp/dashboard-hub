import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery, a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { P as Popover, b as PopoverTrigger, c as PopoverContent } from "./account-menu-C0NsdiGi.mjs";
import { S as Skeleton } from "./skeleton-F-7As_y7.mjs";
import { A as ApiError, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { c as cn } from "./button-BXrfXN_b.mjs";
import { aA as KeyRound, aT as Minus, al as X, aU as Ban, a9 as Clock, a6 as Check, ag as Bot, a7 as User, ab as LoaderCircle, H as ChevronDown } from "../_libs/lucide-react.mjs";
const darkPermissionsTheme = {
  card: "rounded-3xl bg-[#33362a] p-6 ring-1 ring-white/5",
  headingText: "text-white",
  mutedText: "text-sm leading-relaxed text-[#e8eadb]/75",
  accentText: "text-[#cfe09a]",
  selector: "border border-white/10 bg-[#202318] text-[#e8eadb]",
  legendText: "text-[#e8eadb]/70",
  countText: "text-[#e8eadb]/65",
  toggleActive: "bg-[#cfe09a] text-[#1f2118]",
  toggleInactive: "bg-white/5 text-[#e8eadb]/75 hover:bg-white/10",
  actionError: "bg-rose-950/70 text-rose-100 ring-1 ring-rose-300/20",
  tableWrap: "bg-[#33362a] ring-1 ring-white/5",
  thead: "bg-[#2d3024] text-[#c4c8b0]/70",
  headerStickyBg: "bg-[#2d3024]",
  bodyStickyBg: "bg-[#33362a]",
  rowBorder: "border-white/5",
  avatarBg: "bg-white/5",
  principalIcon: "text-[#cfe09a]",
  principalName: "text-white",
  principalSub: "text-[#e8eadb]/55",
  emptyText: "text-[#e8eadb]/60",
  emptyIcon: "text-[#e8eadb]/40",
  loader: "text-[#e8eadb]/50",
  skeleton: "bg-[#c4c8b0]/12",
  access: {
    allowed: "text-emerald-300",
    needs_approval: "text-amber-300",
    blocked: "text-rose-300",
    denied: "text-rose-300",
    no_access: "text-[#e8eadb]/25"
  },
  menuPanel: "w-56 rounded-2xl border border-white/10 bg-[#2d3024] p-1.5 text-[#e8eadb] shadow-xl",
  menuHover: "hover:bg-white/10",
  menuActiveBg: "bg-white/5",
  menuCheck: "text-[#cfe09a]",
  menuDivider: "bg-white/10",
  menuDanger: "text-rose-300",
  menuIcon: {
    allow: "text-emerald-400",
    needs: "text-amber-400",
    deny: "text-rose-400",
    muted: "text-[#e8eadb]/50"
  },
  grantHas: "bg-[#cfe09a]/15 text-[#cfe09a] hover:bg-[#cfe09a]/25",
  grantNone: "bg-white/10 text-[#e8eadb]/85 hover:bg-white/20",
  cellHover: "hover:bg-white/10"
};
const lightPermissionsTheme = {
  card: "rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5",
  headingText: "text-foreground",
  mutedText: "text-sm leading-relaxed text-muted-foreground",
  accentText: "text-sky-700",
  selector: "border border-black/10 bg-[hsl(220,33%,97%)] text-foreground",
  legendText: "text-muted-foreground",
  countText: "text-muted-foreground",
  toggleActive: "bg-sky-600 text-white",
  toggleInactive: "bg-black/5 text-foreground/70 hover:bg-black/10",
  actionError: "border border-destructive/20 bg-white text-destructive shadow-sm",
  tableWrap: "bg-white ring-1 ring-black/5",
  thead: "bg-[hsl(220,33%,97%)] text-muted-foreground",
  headerStickyBg: "bg-[hsl(220,33%,97%)]",
  bodyStickyBg: "bg-white",
  rowBorder: "border-black/5",
  avatarBg: "bg-black/5",
  principalIcon: "text-sky-700",
  principalName: "text-foreground",
  principalSub: "text-muted-foreground",
  emptyText: "text-muted-foreground",
  emptyIcon: "text-muted-foreground/40",
  loader: "text-muted-foreground",
  skeleton: "",
  access: {
    allowed: "text-emerald-600",
    needs_approval: "text-amber-600",
    blocked: "text-rose-600",
    denied: "text-rose-600",
    no_access: "text-muted-foreground/40"
  },
  menuPanel: "w-56 rounded-2xl border border-black/10 bg-white p-1.5 text-foreground shadow-xl",
  menuHover: "hover:bg-black/5",
  menuActiveBg: "bg-black/5",
  menuCheck: "text-sky-600",
  menuDivider: "bg-black/10",
  menuDanger: "text-rose-600",
  menuIcon: {
    allow: "text-emerald-600",
    needs: "text-amber-600",
    deny: "text-rose-600",
    muted: "text-muted-foreground"
  },
  grantHas: "bg-sky-100 text-sky-900 hover:bg-sky-200",
  grantNone: "bg-black/5 text-foreground/70 hover:bg-black/10",
  cellHover: "hover:bg-black/5"
};
const ThemeContext = reactExports.createContext(lightPermissionsTheme);
const useTheme = () => reactExports.useContext(ThemeContext);
const ACCESS_META = {
  allowed: { label: "Allowed", icon: Check },
  needs_approval: { label: "Needs approval", icon: Clock },
  blocked: { label: "Blocked", icon: Ban },
  denied: { label: "Denied", icon: X },
  no_access: { label: "No access", icon: Minus }
};
const PRINCIPAL_META = {
  user: { label: "User", icon: User },
  agent: { label: "Agent", icon: Bot },
  service_account: { label: "Service", icon: Bot },
  api_client: { label: "API client", icon: KeyRound }
};
function AccessCellBadge({ value }) {
  const theme = useTheme();
  const meta = ACCESS_META[value];
  const Icon = meta.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid place-items-center", title: meta.label, "aria-label": meta.label, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-4 w-4", theme.access[value]) }) });
}
function hasAnyAccess(principal) {
  return principal.has_toolkit_access && Object.values(principal.tools).some((cell) => cell !== "no_access");
}
function ruleChoice(rule) {
  if (!rule) return "inherit";
  if (rule.effect === "deny") return "deny";
  if (rule.permission === "needs_approval") return "needs_approval";
  return "allow";
}
function MenuButton({
  icon: Icon,
  iconClass,
  label,
  hint,
  active,
  danger,
  onClick
}) {
  const theme = useTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      className: cn(
        "flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-sm transition",
        theme.menuHover,
        active && theme.menuActiveBg,
        danger && theme.menuDanger
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-4 w-4 shrink-0", iconClass) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: label }),
        hint && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-xs", theme.principalSub), children: hint }),
        active && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: cn("h-3.5 w-3.5", theme.menuCheck) })
      ]
    }
  );
}
function GrantControl({
  principal,
  busy,
  onSet,
  onRevoke
}) {
  const theme = useTheme();
  const [open, setOpen] = reactExports.useState(false);
  const pick = (fn) => {
    setOpen(false);
    fn();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: busy,
        className: cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs capitalize transition disabled:opacity-50",
          principal.has_toolkit_access ? theme.grantHas : theme.grantNone
        ),
        children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          principal.has_toolkit_access ? `${principal.access_mode}${principal.enabled ? "" : " · off"}` : "Grant access",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" })
        ] })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { align: "start", className: theme.menuPanel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn("px-2.5 pb-1 pt-1.5 text-xs uppercase tracking-wide", theme.principalSub),
          children: "Toolkit access"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuButton,
        {
          icon: Check,
          iconClass: theme.menuIcon.allow,
          label: "Full access",
          hint: "all tools",
          active: principal.has_toolkit_access && principal.access_mode === "full",
          onClick: () => pick(() => onSet("full"))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuButton,
        {
          icon: KeyRound,
          iconClass: theme.menuIcon.needs,
          label: "Restricted",
          hint: "allowed only",
          active: principal.has_toolkit_access && principal.access_mode === "restricted",
          onClick: () => pick(() => onSet("restricted"))
        }
      ),
      principal.has_toolkit_access && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("my-1 h-px", theme.menuDivider) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuButton, { icon: X, label: "Revoke access", danger: true, onClick: () => pick(onRevoke) })
      ] })
    ] })
  ] });
}
function ToolAccessCell({
  rule,
  value,
  busy,
  editable,
  onChoose
}) {
  const theme = useTheme();
  const [open, setOpen] = reactExports.useState(false);
  if (!editable) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { title: "Grant toolkit access first", className: "opacity-60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccessCellBadge, { value }) });
  }
  const current = ruleChoice(rule);
  const pick = (choice) => {
    setOpen(false);
    onChoose(choice);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: busy,
        className: cn(
          "grid h-7 w-7 place-items-center rounded-lg transition disabled:opacity-50",
          theme.cellHover
        ),
        children: busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: cn("h-4 w-4 animate-spin", theme.loader) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AccessCellBadge, { value })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { align: "center", className: theme.menuPanel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuButton,
        {
          icon: Check,
          iconClass: theme.menuIcon.allow,
          label: "Allow",
          active: current === "allow",
          onClick: () => pick("allow")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuButton,
        {
          icon: Clock,
          iconClass: theme.menuIcon.needs,
          label: "Needs approval",
          active: current === "needs_approval",
          onClick: () => pick("needs_approval")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuButton,
        {
          icon: X,
          iconClass: theme.menuIcon.deny,
          label: "Deny",
          active: current === "deny",
          onClick: () => pick("deny")
        }
      ),
      rule && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("my-1 h-px", theme.menuDivider) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MenuButton,
          {
            icon: Minus,
            iconClass: theme.menuIcon.muted,
            label: "Inherit default",
            onClick: () => pick("inherit")
          }
        )
      ] })
    ] })
  ] });
}
function PermissionsMatrix({
  toolkitIds,
  enabled,
  theme,
  toolsNoun,
  stripToolPrefix,
  disabledHint,
  connectHint,
  onApiError
}) {
  const [toolkitId, setToolkitId] = reactExports.useState(null);
  const [onlyWithAccess, setOnlyWithAccess] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (toolkitIds.length > 0 && (!toolkitId || !toolkitIds.includes(toolkitId))) {
      setToolkitId(toolkitIds[0]);
    }
  }, [toolkitIds, toolkitId]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["toolkit-access-matrix", toolkitId],
    queryFn: () => apiRequest(`/api/v1/toolkits/${toolkitId}/access-matrix`),
    enabled: Boolean(toolkitId),
    staleTime: 30 * 1e3
  });
  reactExports.useEffect(() => {
    if (error) onApiError(error, "Could not load permissions");
  }, [error, onApiError]);
  const tools = data?.tools ?? [];
  const principals = reactExports.useMemo(() => {
    const list = data?.principals ?? [];
    return onlyWithAccess ? list.filter(hasAnyAccess) : list;
  }, [data, onlyWithAccess]);
  const withAccessCount = reactExports.useMemo(
    () => (data?.principals ?? []).filter(hasAnyAccess).length,
    [data]
  );
  const queryClient = useQueryClient();
  const [busyKey, setBusyKey] = reactExports.useState(null);
  const [actionError, setActionError] = reactExports.useState(null);
  const runAction = reactExports.useCallback(
    async (key, fn) => {
      setBusyKey(key);
      setActionError(null);
      try {
        await fn();
        await queryClient.invalidateQueries({ queryKey: ["toolkit-access-matrix", toolkitId] });
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          onApiError(err);
          return;
        }
        setActionError(
          err instanceof ApiError && err.status === 403 ? "You need admin access to change permissions." : err instanceof Error ? err.message : "Could not update access."
        );
      } finally {
        setBusyKey(null);
      }
    },
    [queryClient, toolkitId, onApiError]
  );
  const setToolkitGrant = (principalId, mode) => runAction(
    `tk:${principalId}`,
    () => apiRequest(`/api/v1/principals/${principalId}/toolkit-access`, {
      method: "PUT",
      body: JSON.stringify({ toolkit_id: toolkitId, access_mode: mode, enabled: true })
    })
  );
  const revokeToolkitGrant = (principalId) => runAction(
    `tk:${principalId}`,
    () => apiRequest(`/api/v1/principals/${principalId}/toolkit-access/${toolkitId}`, {
      method: "DELETE"
    })
  );
  const setToolRule = (principalId, toolId, choice) => runAction(`tr:${principalId}:${toolId}`, () => {
    if (choice === "inherit") {
      return apiRequest(`/api/v1/principals/${principalId}/tool-rules/${toolId}`, {
        method: "DELETE"
      });
    }
    const body = choice === "deny" ? { mcp_tool_id: toolId, effect: "deny" } : {
      mcp_tool_id: toolId,
      effect: "allow",
      permission: choice === "needs_approval" ? "needs_approval" : "always_allow"
    };
    return apiRequest(`/api/v1/principals/${principalId}/tool-rules`, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  });
  if (!enabled || toolkitIds.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: theme, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: theme.card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: cn("text-2xl font-normal tracking-tight", theme.headingText), children: "Permissions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-2", theme.mutedText), children: disabledHint })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(theme.card, "grid place-items-center gap-2 py-12 text-center"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: cn("h-8 w-8", theme.emptyIcon) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: theme.mutedText, children: connectHint })
      ] })
    ] }) });
  }
  if (!toolkitId || isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PermissionsMatrixLoading, { theme });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: theme, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: theme.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: cn("text-2xl font-normal tracking-tight", theme.headingText), children: "Permissions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: cn("mt-2", theme.mutedText), children: [
            "Who can use the ",
            toolsNoun,
            " tools inside",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: theme.accentText, children: data?.toolkit_name ?? "this toolkit" }),
            ", and how each call is gated."
          ] })
        ] }),
        toolkitIds.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            value: toolkitId ?? "",
            onChange: (e) => setToolkitId(e.target.value),
            className: cn("rounded-full px-3 py-1.5 text-sm outline-none", theme.selector),
            "aria-label": "Select toolkit",
            children: toolkitIds.map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: id, children: data && data.toolkit_id === id ? data.toolkit_name : id.slice(0, 8) }, id))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs",
            theme.legendText
          ),
          children: Object.keys(ACCESS_META).map((key) => {
            const meta = ACCESS_META[key];
            const Icon = meta.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-3.5 w-3.5", theme.access[key]) }),
              meta.label
            ] }, key);
          })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: cn("text-sm", theme.countText), children: [
        withAccessCount,
        " of ",
        data?.principals.length ?? 0,
        " principals have access"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setOnlyWithAccess((v) => !v),
          className: cn(
            "rounded-full px-3 py-1.5 text-xs transition",
            onlyWithAccess ? theme.toggleActive : theme.toggleInactive
          ),
          children: onlyWithAccess ? "Showing with access" : "Showing everyone"
        }
      )
    ] }),
    actionError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("rounded-2xl px-4 py-3 text-sm", theme.actionError), children: actionError }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("overflow-x-auto rounded-3xl", theme.tableWrap), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: cn("text-xs uppercase tracking-wide", theme.thead), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: cn(
              "sticky left-0 z-10 px-4 py-3 text-left font-medium",
              theme.headerStickyBg
            ),
            children: "Principal"
          }
        ),
        tools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-3 py-3 text-center font-medium",
            title: tool.description ?? tool.name,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block max-w-[120px] truncate normal-case", children: tool.name.replace(stripToolPrefix, "") })
          },
          tool.id
        ))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        principals.map((principal) => {
          const meta = PRINCIPAL_META[principal.type];
          const PIcon = meta.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: cn("border-t", theme.rowBorder), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: cn("sticky left-0 z-10 px-4 py-3", theme.bodyStickyBg), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                    theme.avatarBg
                  ),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(PIcon, { className: cn("h-4 w-4", theme.principalIcon) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("truncate font-medium", theme.principalName), children: principal.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: cn(
                      "mt-0.5 flex items-center gap-1.5 text-xs",
                      theme.principalSub
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: meta.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        GrantControl,
                        {
                          principal,
                          busy: busyKey === `tk:${principal.id}`,
                          onSet: (mode) => setToolkitGrant(principal.id, mode),
                          onRevoke: () => revokeToolkitGrant(principal.id)
                        }
                      )
                    ]
                  }
                )
              ] })
            ] }) }),
            tools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ToolAccessCell,
              {
                rule: principal.rules[tool.id],
                value: principal.tools[tool.id] ?? "no_access",
                busy: busyKey === `tr:${principal.id}:${tool.id}`,
                editable: principal.has_toolkit_access,
                onChoose: (choice) => setToolRule(principal.id, tool.id, choice)
              }
            ) }) }, tool.id))
          ] }, principal.id);
        }),
        principals.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: tools.length + 1,
            className: cn("px-4 py-10 text-center", theme.emptyText),
            children: onlyWithAccess ? "No principal has access to these tools yet." : "No principals in this organization yet."
          }
        ) })
      ] })
    ] }) })
  ] }) });
}
function PermissionsMatrixLoading({ theme }) {
  const sk = (className) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: cn(theme.skeleton, className) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid content-start gap-4", "aria-label": "Loading permissions", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: theme.card, children: [
      sk("h-7 w-44 rounded-full"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: sk("h-4 w-96 max-w-full rounded-full") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      sk("h-4 w-40 rounded-full"),
      sk("h-8 w-36 rounded-full")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("overflow-x-auto rounded-3xl", theme.tableWrap), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: cn("text-xs uppercase tracking-wide", theme.thead), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left font-medium", children: "Principal" }),
        Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-3 text-center font-medium", children: sk("mx-auto h-4 w-20 rounded-full") }, index))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: Array.from({ length: 4 }).map((_, rowIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: cn("border-t", theme.rowBorder), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          sk("h-8 w-8 rounded-full"),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            sk("h-4 w-36 rounded-full"),
            sk("h-3 w-24 rounded-full")
          ] })
        ] }) }),
        Array.from({ length: 5 }).map((_2, cellIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-3", children: sk("mx-auto h-4 w-4 rounded-full") }, cellIndex))
      ] }, rowIndex)) })
    ] }) })
  ] });
}
export {
  PermissionsMatrix as P,
  PermissionsMatrixLoading as a,
  darkPermissionsTheme as d,
  lightPermissionsTheme as l
};
