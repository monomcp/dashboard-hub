import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery, a as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { A as AppsMenu, a as AccountMenu } from "./account-menu-DSoi5KdC.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DteJ2TLP.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./dialog-CypSg8M2.mjs";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-DmTKMmfc.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { S as Sheet, b as SheetContent, c as SheetHeader, d as SheetTitle, e as SheetDescription } from "./sheet-CCXbRTbu.mjs";
import { S as Skeleton } from "./skeleton-CoUJiN10.mjs";
import { A as ApiError, a as apiRequest } from "./api-client-CDT_AGSo.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { M as Menu, K as KeyRound, a as Squircle, P as Plus, L as LoaderCircle, b as Check, c as Copy, E as EllipsisVertical, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tailwind-merge.mjs";
const TYPE_LABEL = {
  user: "User",
  agent: "Agent",
  service_account: "Service account",
  api_client: "API client"
};
function StatusBadge({
  status
}) {
  const styles = {
    active: "bg-emerald-100 text-emerald-700",
    disabled: "bg-amber-100 text-amber-700",
    archived: "bg-stone-200 text-stone-600"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("rounded-full px-2 py-0.5 text-xs font-medium", styles[status]), children: status });
}
function PrincipalsPage() {
  const [keysFor, setKeysFor] = reactExports.useState(null);
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["principals"],
    queryFn: () => apiRequest("/api/v1/principals?limit=200"),
    staleTime: 30 * 1e3
  });
  const principals = reactExports.useMemo(() => data?.items ?? [], [data]);
  const {
    data: keyPage
  } = useQuery({
    queryKey: ["api-keys"],
    queryFn: () => apiRequest("/api/v1/api-keys?limit=200"),
    staleTime: 30 * 1e3
  });
  const keyCounts = reactExports.useMemo(() => {
    const counts = /* @__PURE__ */ new Map();
    for (const k of keyPage?.items ?? []) {
      if (k.revoked_at || !k.principal_id) continue;
      counts.set(k.principal_id, (counts.get(k.principal_id) ?? 0) + 1);
    }
    return counts;
  }, [keyPage]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[hsl(220,33%,98%)] text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between gap-3 px-4 py-3 md:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", "aria-label": "Toggle menu", onClick: () => setSidebarOpen((s) => !s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/permissions", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-medium tracking-tight", children: "Principals" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppsMenu, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccountMenu, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex", children: [
      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden w-[260px] shrink-0 px-3 md:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 px-2 text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/permissions", className: "flex w-full items-center gap-3 rounded-full px-3 py-2 text-sm text-foreground/80 transition hover:bg-white/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Squircle, { className: "h-5 w-5 shrink-0 text-foreground/70" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: "Permissions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex w-full items-center gap-3 rounded-full bg-sky-100 px-3 py-2 text-sm text-sky-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-5 w-5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-left", children: "Principals" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-w-0 flex-1 px-4 pb-16 md:pr-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 mt-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-medium tracking-tight", children: "Principals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "The identities that call your MCP gateway. Issue an API key for any principal to connect an agent (Codex, Claude, …) without OAuth." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "shrink-0 rounded-full", onClick: () => setCreateOpen(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            "New principal"
          ] })
        ] }),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive", children: "Couldn't load principals. Please try again." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl bg-white ring-1 ring-black/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b text-left text-xs uppercase tracking-wide text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-medium", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-medium", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-medium", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 font-medium", children: "API keys" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            isLoading && Array.from({
              length: 4
            }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b last:border-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48 max-w-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-2 h-3 w-24 max-w-full" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 rounded-full" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-8" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "ml-auto h-9 w-32 rounded-full" }) })
            ] }, i)),
            !isLoading && principals.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-8 text-center text-muted-foreground", colSpan: 5, children: "No principals yet." }) }),
            principals.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b last:border-0 hover:bg-muted/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: p.name }),
                p.slug && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
                  "/",
                  p.slug
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-muted-foreground", children: TYPE_LABEL[p.type] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-muted-foreground", children: keyCounts.get(p.id) ?? 0 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "rounded-full", onClick: () => setKeysFor(p), children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3.5 w-3.5" }),
                "Manage keys"
              ] }) })
            ] }, p.id))
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CreatePrincipalDialog, { open: createOpen, onOpenChange: setCreateOpen }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ApiKeysSheet, { principal: keysFor, onClose: () => setKeysFor(null) })
  ] });
}
function CreatePrincipalDialog({
  open,
  onOpenChange
}) {
  const queryClient = useQueryClient();
  const [name, setName] = reactExports.useState("");
  const [slug, setSlug] = reactExports.useState("");
  const [type, setType] = reactExports.useState("api_client");
  const create = useMutation({
    mutationFn: (body) => apiRequest("/api/v1/principals", {
      method: "POST",
      body: JSON.stringify(body)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["principals"]
      });
      setName("");
      setSlug("");
      setType("api_client");
      onOpenChange(false);
    }
  });
  const close = (nextOpen) => {
    if (create.isPending) return;
    if (!nextOpen) {
      create.reset();
      setName("");
      setSlug("");
      setType("api_client");
    }
    onOpenChange(nextOpen);
  };
  const submit = () => {
    if (!name.trim()) return;
    const body = {
      name: name.trim(),
      type
    };
    if (slug.trim()) body.slug = slug.trim();
    create.mutate(body);
  };
  const createError = create.error instanceof ApiError ? create.error.message : create.error ? "Couldn't create principal." : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: close, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create principal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Add a new identity for an agent, service, or API client that will call the MCP gateway." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "principal-name", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "principal-name", value: name, onChange: (e) => setName(e.target.value), onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        }, placeholder: "e.g. Codex production agent", disabled: create.isPending })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "principal-type", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: (value) => setType(value), disabled: create.isPending, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "principal-type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "api_client", children: "API client" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "agent", children: "Agent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "service_account", children: "Service account" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "principal-slug", children: "Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "principal-slug", value: slug, onChange: (e) => setSlug(e.target.value), onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            submit();
          }
        }, placeholder: "Optional", disabled: create.isPending })
      ] }),
      createError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: createError })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => close(false), disabled: create.isPending, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: submit, disabled: !name.trim() || create.isPending, children: [
        create.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        "Create"
      ] })
    ] })
  ] }) });
}
function ApiKeysSheet({
  principal,
  onClose
}) {
  const queryClient = useQueryClient();
  const [name, setName] = reactExports.useState("");
  const [created, setCreated] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [revokeTarget, setRevokeTarget] = reactExports.useState(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["api-keys"],
    queryFn: () => apiRequest("/api/v1/api-keys?limit=200"),
    enabled: principal !== null,
    staleTime: 30 * 1e3
  });
  const keys = reactExports.useMemo(() => (data?.items ?? []).filter((k) => k.principal_id === principal?.id), [data, principal]);
  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ["api-keys"]
    });
    queryClient.invalidateQueries({
      queryKey: ["principals"]
    });
  };
  const create = useMutation({
    mutationFn: (body) => apiRequest("/api/v1/api-keys", {
      method: "POST",
      body: JSON.stringify(body)
    }),
    onSuccess: (key) => {
      setCreated(key);
      setName("");
      invalidate();
    }
  });
  const revoke = useMutation({
    mutationFn: (id) => apiRequest(`/api/v1/api-keys/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        revoked: true
      })
    }),
    onSuccess: () => {
      setRevokeTarget(null);
      invalidate();
    }
  });
  const submit = () => {
    if (!name.trim() || !principal) return;
    create.mutate({
      name: name.trim(),
      principal_id: principal.id
    });
  };
  const copySecret = () => {
    if (!created) return;
    void navigator.clipboard.writeText(created.secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const close = () => {
    setName("");
    setCreated(null);
    create.reset();
    onClose();
  };
  const createError = create.error instanceof ApiError ? create.error.message : create.error ? "Failed." : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: principal !== null, onOpenChange: (o) => !o && close(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "right", className: "flex w-full flex-col gap-0 p-0 sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "border-b px-6 py-5 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-xl", children: "API keys" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetDescription, { children: [
          principal ? `For ${principal.name}. ` : "",
          "A key authenticates the gateway as this principal — it works on every toolkit this principal can access."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-5 overflow-y-auto px-6 py-5", children: [
        created && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 rounded-xl border border-emerald-600/30 bg-emerald-50 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-emerald-800", children: "Copy this key now — you won't see it again." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg border bg-white px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate font-mono text-xs", children: created.secret }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: copySecret, title: "Copy", className: "shrink-0 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground", children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "key-name", className: "text-sm font-medium", children: "New key" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "key-name", value: name, onChange: (e) => setName(e.target.value), onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }, placeholder: "e.g. Codex – production", className: "h-9" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-9 rounded-lg", onClick: submit, disabled: !name.trim() || create.isPending, children: [
              create.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Create"
            ] })
          ] }),
          createError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: createError })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium uppercase tracking-wide text-muted-foreground", children: "Existing keys" }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }) : keys.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No keys yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: keys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-sm font-medium", children: k.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-muted-foreground", children: [
                k.key_prefix,
                "…",
                k.revoked_at && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-destructive", children: "revoked" }),
                !k.revoked_at && k.last_used_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2", children: [
                  "last used ",
                  new Date(k.last_used_at).toLocaleDateString()
                ] })
              ] })
            ] }),
            !k.revoked_at && /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", title: "Actions", className: "shrink-0 rounded-md p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EllipsisVertical, { className: "h-4 w-4" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuContent, { align: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { onClick: () => setRevokeTarget(k), className: "text-destructive focus:text-destructive", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
                "Revoke"
              ] }) })
            ] })
          ] }, k.id)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: revokeTarget !== null, onOpenChange: (o) => !o && setRevokeTarget(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Revoke this API key?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Any client using ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
            revokeTarget?.key_prefix,
            "…"
          ] }),
          " will immediately lose access to the gateway. This can't be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: revoke.isPending, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: (e) => {
          e.preventDefault();
          if (revokeTarget) revoke.mutate(revokeTarget.id);
        }, disabled: revoke.isPending, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: revoke.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Revoke" })
      ] })
    ] }) })
  ] });
}
export {
  PrincipalsPage as component
};
