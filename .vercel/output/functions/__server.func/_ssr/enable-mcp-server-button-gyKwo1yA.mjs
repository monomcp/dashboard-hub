import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { B as Button } from "./button-BXrfXN_b.mjs";
import { I as Input } from "./input-DwaGuH4D.mjs";
import { L as Label } from "./label-Brw405F4.mjs";
import { c as PopoverContent, P as Popover, b as PopoverTrigger } from "./account-menu-DmhbdlCS.mjs";
import { A as ApiError, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { a6 as Check, z as Plus, ak as LoaderCircle, n as Copy, aM as Power } from "../_libs/lucide-react.mjs";
const GATEWAY_BASE_URL = "https://mcp-at97.onrender.com";
function gatewayEndpoint(orgSlug, toolkitSlug) {
  return `${GATEWAY_BASE_URL}/${orgSlug}/${toolkitSlug}/mcp`;
}
const NEW_TOOLKIT = "__new__";
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
function EnableMcpServerButton({
  serverSlug,
  enabled,
  toolkitIds,
  onEnabled
}) {
  const queryClient = useQueryClient();
  const orgSlug = useActiveOrgSlug();
  const [open, setOpen] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState("default");
  const [newName, setNewName] = reactExports.useState("");
  const [copied, setCopied] = reactExports.useState(false);
  const { data: toolkitPage } = useQuery({
    queryKey: ["toolkits"],
    queryFn: () => apiRequest("/api/v1/toolkits?limit=200"),
    enabled: open || enabled,
    staleTime: 60 * 1e3
  });
  const toolkits = reactExports.useMemo(() => toolkitPage?.items ?? [], [toolkitPage]);
  const enabledToolkit = reactExports.useMemo(
    () => toolkits.find((t) => toolkitIds.includes(t.id)),
    [toolkits, toolkitIds]
  );
  const enableMutation = useMutation({
    mutationFn: (body) => apiRequest(`/api/v1/mcp-catalog/${serverSlug}/enable`, {
      method: "POST",
      body: JSON.stringify(body)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mcp-catalog"] });
      queryClient.invalidateQueries({ queryKey: ["toolkits"] });
      setOpen(false);
      setNewName("");
      onEnabled?.();
    }
  });
  const submit = () => {
    if (selected === NEW_TOOLKIT) {
      const name = newName.trim();
      if (!name) return;
      enableMutation.mutate({ new_toolkit: { name } });
    } else {
      const target = toolkits.find((t) => t.slug === selected);
      enableMutation.mutate(target ? { toolkit_id: target.id } : {});
    }
  };
  const copyEndpoint = () => {
    if (!orgSlug || !enabledToolkit) return;
    void navigator.clipboard.writeText(gatewayEndpoint(orgSlug, enabledToolkit.slug));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const errorMessage = enableMutation.error instanceof ApiError ? enableMutation.error.message : enableMutation.error ? "Failed to enable. Please try again." : null;
  const picker = /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { align: "end", className: "w-80 rounded-2xl p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-medium", children: "Add to toolkit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pick a toolkit to expose these tools, or create a new one." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-56 space-y-1 overflow-y-auto", children: [
      toolkits.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setSelected(t.slug),
          className: `flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted ${selected === t.slug ? "bg-muted ring-1 ring-border" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
              t.name,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-xs text-muted-foreground", children: [
                "/",
                t.slug
              ] })
            ] }),
            selected === t.slug && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 shrink-0" })
          ]
        },
        t.id
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setSelected(NEW_TOOLKIT),
          className: `flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted ${selected === NEW_TOOLKIT ? "bg-muted ring-1 ring-border" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 shrink-0" }),
            "Create new toolkit"
          ]
        }
      )
    ] }),
    selected === NEW_TOOLKIT && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "new-toolkit-name", className: "text-xs", children: "New toolkit name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "new-toolkit-name",
          autoFocus: true,
          value: newName,
          onChange: (e) => setNewName(e.target.value),
          placeholder: "e.g. Brand",
          className: "h-9"
        }
      )
    ] }),
    errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-destructive", children: errorMessage }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: "mt-4 w-full rounded-full",
        size: "sm",
        onClick: submit,
        disabled: enableMutation.isPending || selected === NEW_TOOLKIT && !newName.trim(),
        children: enableMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Enable"
      }
    )
  ] });
  if (enabled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
        "Enabled",
        enabledToolkit && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-normal text-emerald-600", children: [
          "· ",
          enabledToolkit.name
        ] })
      ] }),
      orgSlug && enabledToolkit && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: copyEndpoint,
          title: "Copy MCP endpoint URL",
          className: "inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground transition hover:bg-muted/70",
          children: [
            copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[18rem] truncate", children: gatewayEndpoint(orgSlug, enabledToolkit.slug) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "rounded-full", children: "Add to another toolkit" }) }),
        picker
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-full bg-blue-600 text-white hover:bg-blue-700", size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "h-4 w-4" }),
      "Enable this MCP server"
    ] }) }),
    picker
  ] });
}
export {
  EnableMcpServerButton as E
};
