import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, c as useMutation } from "../_libs/tanstack__react-query.mjs";
import { A as AlertDialog, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction } from "./alert-dialog-DpCH8EKh.mjs";
import { B as Button, c as cn } from "./button-BXrfXN_b.mjs";
import { I as Input } from "./input-DwaGuH4D.mjs";
import { L as Label } from "./label-Brw405F4.mjs";
import { S as Skeleton } from "./skeleton-F-7As_y7.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, b as Close, a as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { A as ApiError, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { a6 as Check, aV as Power, al as X, z as Plus, ab as LoaderCircle, aW as Terminal, aX as PawPrint, aY as MessageCircle, n as Copy } from "../_libs/lucide-react.mjs";
const Sheet = Root;
const SheetTrigger = Trigger;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
const GATEWAY_BASE_URL = "https://mcp-at97.onrender.com";
function gatewayEndpoint(orgSlug, toolkitSlug) {
  return `${GATEWAY_BASE_URL}/${orgSlug}/${toolkitSlug}/mcp`;
}
function useActiveOrgSlug() {
  const { data } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiRequest("/api/v1/auth/me"),
    staleTime: 5 * 60 * 1e3
  });
  const memberships = data?.memberships ?? [];
  const storedOrgId = typeof window !== "undefined" ? localStorage.getItem("organization_id") : null;
  const active = memberships.find((m) => m.organization_id === storedOrgId) ?? memberships[0];
  return active?.organization_slug ?? null;
}
function sameSet(a, b) {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((id) => setB.has(id));
}
function ClaudeIcon({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", className, "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" }) });
}
const MCP_CLIENTS = [
  { id: "claude", label: "Claude", icon: ClaudeIcon },
  { id: "codex", label: "Codex", icon: Terminal },
  { id: "openclaw", label: "Openclaw", icon: PawPrint },
  { id: "chatgpt", label: "ChatGPT", icon: MessageCircle }
];
function CopyRow({
  value,
  copied,
  onCopy
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate font-mono text-xs text-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: onCopy,
        title: "Copy",
        className: "shrink-0 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground",
        children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
      }
    )
  ] });
}
function Section({
  title,
  hint,
  stacked,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("grid gap-3 border-b px-6 py-5", !stacked && "sm:grid-cols-[180px_1fr]"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-foreground", children: title }),
      hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: hint })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0 space-y-2", children })
  ] });
}
function EnableMcpServerButton({ serverSlug, enabled, toolkitIds, onEnabled }) {
  const queryClient = useQueryClient();
  const orgSlug = useActiveOrgSlug();
  const [open, setOpen] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(() => new Set(toolkitIds));
  const [newName, setNewName] = reactExports.useState("");
  const [addingNew, setAddingNew] = reactExports.useState(false);
  const [copiedKey, setCopiedKey] = reactExports.useState(null);
  const [confirmDisable, setConfirmDisable] = reactExports.useState(false);
  const [client, setClient] = reactExports.useState("claude");
  reactExports.useEffect(() => {
    if (open) {
      setSelected(new Set(toolkitIds));
      setNewName("");
      setAddingNew(false);
    }
  }, [open, toolkitIds]);
  const { data: toolkitPage, isLoading: toolkitsLoading } = useQuery({
    queryKey: ["toolkits"],
    queryFn: () => apiRequest("/api/v1/toolkits?limit=200"),
    enabled: open || enabled,
    staleTime: 60 * 1e3
  });
  const toolkits = reactExports.useMemo(() => toolkitPage?.items ?? [], [toolkitPage]);
  const enabledToolkits = reactExports.useMemo(
    () => toolkits.filter((t) => toolkitIds.includes(t.id)),
    [toolkits, toolkitIds]
  );
  const reconcile = useMutation({
    mutationFn: (body) => apiRequest(`/api/v1/mcp-catalog/${serverSlug}/toolkits`, {
      method: "PUT",
      body: JSON.stringify(body)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mcp-catalog"] });
      queryClient.invalidateQueries({ queryKey: ["toolkits"] });
      setOpen(false);
      setConfirmDisable(false);
      setNewName("");
      setAddingNew(false);
      onEnabled?.();
    }
  });
  const toggle = (id) => setSelected((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
  const selectedIds = reactExports.useMemo(() => [...selected], [selected]);
  const trimmedNew = newName.trim();
  const selectedCount = selected.size + (trimmedNew ? 1 : 0);
  const changed = !sameSet(selectedIds, toolkitIds) || trimmedNew !== "";
  const isUpdate = selectedCount >= 1 && changed;
  const apply = () => reconcile.mutate({
    toolkit_ids: selectedIds,
    new_toolkits: trimmedNew ? [{ name: trimmedNew }] : []
  });
  const disableServer = () => reconcile.mutate({ toolkit_ids: [], new_toolkits: [] });
  const saveNew = () => {
    if (!newName.trim()) return;
    setAddingNew(false);
  };
  const cancelNew = () => {
    setNewName("");
    setAddingNew(false);
  };
  let footerLabel;
  let footerAction;
  let footerDisabled = reconcile.isPending;
  let footerDanger = false;
  if (!enabled) {
    footerLabel = "Enable";
    footerAction = apply;
    footerDisabled = footerDisabled || selectedCount < 1;
  } else if (isUpdate) {
    footerLabel = "Update";
    footerAction = apply;
  } else {
    footerLabel = "Disable";
    footerAction = () => setConfirmDisable(true);
    footerDanger = true;
  }
  const errorMessage = reconcile.error instanceof ApiError ? reconcile.error.message : reconcile.error ? "Something went wrong. Please try again." : null;
  const copyText = (key, text) => {
    void navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => k === key ? null : k), 1500);
  };
  const clientSnippet = (clientId, slug) => {
    const url = gatewayEndpoint(orgSlug ?? "", slug);
    if (clientId === "codex") {
      return `# ~/.codex/config.toml
[mcp_servers.${serverSlug}]
url = "${url}"`;
    }
    if (clientId === "chatgpt") {
      return url;
    }
    return JSON.stringify({ mcpServers: { [serverSlug]: { url } } }, null, 2);
  };
  const clientNote = {
    claude: null,
    codex: null,
    openclaw: null,
    chatgpt: "Add this URL as a custom connector in ChatGPT → Settings → Connectors."
  };
  const primaryToolkit = enabledToolkits[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: enabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-200",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
            "Enabled",
            enabledToolkits.length === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-normal text-emerald-600", children: [
              "· ",
              enabledToolkits[0].name
            ] }) : enabledToolkits.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-normal text-emerald-600", children: [
              "· ",
              enabledToolkits.length,
              " toolkits"
            ] }) : null
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-full bg-blue-600 text-white hover:bg-blue-700", size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "h-4 w-4" }),
        "Enable this MCP server"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SheetContent,
        {
          side: "right",
          className: "flex w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "border-b px-6 py-5 text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-xl", children: "Connect to your MCP server" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Choose which toolkits expose these tools, then point your agent at the endpoint." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto [&>div:last-child]:border-b-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Section,
                {
                  title: "Toolkits",
                  hint: "Select one or more toolkits to expose these tools, or create a new one. Click a selected toolkit to remove it.",
                  children: [
                    toolkitsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-full rounded-lg" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      toolkits.map((t) => {
                        const checked = selected.has(t.id);
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "button",
                          {
                            type: "button",
                            onClick: () => toggle(t.id),
                            className: cn(
                              "flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm transition hover:bg-muted",
                              checked ? "border-foreground/30 bg-muted" : "border-border"
                            ),
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 truncate", children: [
                                t.name,
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs text-muted-foreground", children: [
                                  "/",
                                  t.slug
                                ] })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: cn(
                                    "grid h-4 w-4 shrink-0 place-items-center rounded-full border",
                                    checked ? "border-emerald-600 bg-emerald-600 text-white" : "border-muted-foreground/40"
                                  ),
                                  children: checked && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" })
                                }
                              )
                            ]
                          },
                          t.id
                        );
                      }),
                      trimmedNew && !addingNew && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: cancelNew,
                          className: "flex w-full items-center justify-between rounded-lg border border-emerald-600/40 bg-emerald-50 px-3 py-2.5 text-left text-sm transition hover:bg-emerald-100",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 truncate", children: [
                              trimmedNew,
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-xs text-emerald-700", children: "new toolkit" })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-600 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) })
                          ]
                        }
                      )
                    ] }),
                    !toolkitsLoading && (addingNew ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "new-toolkit-name",
                          autoFocus: true,
                          value: newName,
                          onChange: (e) => setNewName(e.target.value),
                          onKeyDown: (e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              saveNew();
                            } else if (e.key === "Escape") {
                              cancelNew();
                            }
                          },
                          placeholder: "New toolkit name",
                          className: "h-9"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          className: "h-9 rounded-lg",
                          onClick: saveNew,
                          disabled: !newName.trim(),
                          children: "Save"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: cancelNew,
                          "aria-label": "Cancel",
                          className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                        }
                      )
                    ] }) : !trimmedNew && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => setAddingNew(true),
                        className: "flex items-center gap-2 rounded-lg px-1 pt-1 text-sm text-muted-foreground transition hover:text-foreground",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-5 w-5 place-items-center rounded-full border border-current", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }) }),
                          "Add toolkit"
                        ]
                      }
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-toolkit-name", className: "sr-only", children: "New toolkit name" }),
                    errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-1 text-xs text-destructive", children: errorMessage }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        className: cn(
                          "mt-2 w-full rounded-full",
                          footerDanger && "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        ),
                        onClick: footerAction,
                        disabled: footerDisabled,
                        children: reconcile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : footerLabel
                      }
                    )
                  ]
                }
              ),
              enabledToolkits.length > 0 && orgSlug && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Section,
                {
                  title: "Connection",
                  hint: "The gateway endpoint for each enabled toolkit. Use this URL in your MCP client.",
                  stacked: true,
                  children: enabledToolkits.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    enabledToolkits.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      CopyRow,
                      {
                        value: gatewayEndpoint(orgSlug, t.slug),
                        copied: copiedKey === `url:${t.slug}`,
                        onCopy: () => copyText(`url:${t.slug}`, gatewayEndpoint(orgSlug, t.slug))
                      }
                    )
                  ] }, t.id))
                }
              ),
              primaryToolkit && orgSlug && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Section,
                {
                  title: "How to connect",
                  hint: "Pick your MCP client, then add this server with the config below.",
                  stacked: true,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-1 rounded-lg border p-1", children: MCP_CLIENTS.map((c) => {
                      const Icon = c.icon;
                      const active = client === c.id;
                      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setClient(c.id),
                          className: cn(
                            "flex flex-col items-center gap-1.5 rounded-md px-2 py-2.5 text-xs font-medium transition",
                            active ? "bg-muted text-foreground ring-1 ring-border" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                          ),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
                            c.label
                          ]
                        },
                        c.id
                      );
                    }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-lg border bg-muted/40", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => copyText("config", clientSnippet(client, primaryToolkit.slug)),
                          title: "Copy config",
                          className: "absolute right-2 top-2 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground",
                          children: copiedKey === "config" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "overflow-x-auto p-3 pr-10 font-mono text-xs leading-relaxed text-foreground", children: clientSnippet(client, primaryToolkit.slug) })
                    ] }),
                    clientNote[client] && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: clientNote[client] }),
                    enabledToolkits.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Shown for ",
                      primaryToolkit.name,
                      "; swap the URL for any endpoint above."
                    ] })
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: confirmDisable, onOpenChange: setConfirmDisable, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Disable this MCP server?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This removes this MCP server's tools from your toolkits. Clients using the gateway endpoint will no longer see these tools. You can re-enable it anytime." })
      ] }),
      errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errorMessage }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: reconcile.isPending, children: "No" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: (e) => {
              e.preventDefault();
              disableServer();
            },
            disabled: reconcile.isPending,
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: reconcile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Yes"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  EnableMcpServerButton as E
};
