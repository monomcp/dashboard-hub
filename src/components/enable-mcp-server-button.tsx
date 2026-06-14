import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Copy, Loader2, Plus, Power, PowerOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ApiError, apiRequest } from "@/lib/api-client";
import {
  type EnableServerRequest,
  type EnableServerResponse,
  gatewayEndpoint,
  type Page,
  type Toolkit,
} from "@/lib/mcp-types";

type Membership = {
  organization_id: string;
  organization_name: string;
  organization_slug: string;
  role: string;
};
type MeResponse = { memberships: Membership[] };

const NEW_TOOLKIT = "__new__";

type Props = {
  /** Catalog server slug, e.g. "brand". */
  serverSlug: string;
  /** Whether this server's tools are already enabled for the org. */
  enabled: boolean;
  /** Toolkit ids that currently contain this server's tools. */
  toolkitIds: string[];
  /** Called after a successful enable so the parent can refetch catalog state. */
  onEnabled?: () => void;
};

function useActiveOrgSlug(): string | null {
  const { data } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiRequest<MeResponse>("/api/v1/auth/me"),
    staleTime: 5 * 60 * 1000,
  });
  const memberships = data?.memberships ?? [];
  const storedOrgId =
    typeof window !== "undefined" ? localStorage.getItem("organization_id") : null;
  const active = memberships.find((m) => m.organization_id === storedOrgId) ?? memberships[0];
  return active?.organization_slug ?? null;
}

export function EnableMcpServerButton({ serverSlug, enabled, toolkitIds, onEnabled }: Props) {
  const queryClient = useQueryClient();
  const orgSlug = useActiveOrgSlug();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>("default");
  const [newName, setNewName] = useState("");
  const [copied, setCopied] = useState(false);
  const [confirmDisable, setConfirmDisable] = useState(false);

  const { data: toolkitPage } = useQuery({
    queryKey: ["toolkits"],
    queryFn: () => apiRequest<Page<Toolkit>>("/api/v1/toolkits?limit=200"),
    enabled: open || enabled,
    staleTime: 60 * 1000,
  });
  const toolkits = useMemo(() => toolkitPage?.items ?? [], [toolkitPage]);

  // Toolkit(s) that already contain this server — drives the "Enabled" display.
  const enabledToolkit = useMemo(
    () => toolkits.find((t) => toolkitIds.includes(t.id)),
    [toolkits, toolkitIds],
  );

  const enableMutation = useMutation({
    mutationFn: (body: EnableServerRequest) =>
      apiRequest<EnableServerResponse>(`/api/v1/mcp-catalog/${serverSlug}/enable`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mcp-catalog"] });
      queryClient.invalidateQueries({ queryKey: ["toolkits"] });
      setOpen(false);
      setNewName("");
      onEnabled?.();
    },
  });

  const disableMutation = useMutation({
    mutationFn: () =>
      apiRequest<void>(`/api/v1/mcp-catalog/${serverSlug}/disable`, {
        method: "POST",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mcp-catalog"] });
      queryClient.invalidateQueries({ queryKey: ["toolkits"] });
      setConfirmDisable(false);
      onEnabled?.();
    },
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

  const errorMessage =
    enableMutation.error instanceof ApiError
      ? enableMutation.error.message
      : enableMutation.error
        ? "Failed to enable. Please try again."
        : null;

  const picker = (
    <PopoverContent align="end" className="w-80 rounded-2xl p-4">
      <div className="mb-3">
        <h4 className="text-sm font-medium">Add to toolkit</h4>
        <p className="text-xs text-muted-foreground">
          Pick a toolkit to expose these tools, or create a new one.
        </p>
      </div>
      <div className="max-h-56 space-y-1 overflow-y-auto">
        {toolkits.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSelected(t.slug)}
            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted ${
              selected === t.slug ? "bg-muted ring-1 ring-border" : ""
            }`}
          >
            <span className="truncate">
              {t.name}
              <span className="ml-1 text-xs text-muted-foreground">/{t.slug}</span>
            </span>
            {selected === t.slug && <Check className="h-4 w-4 shrink-0" />}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setSelected(NEW_TOOLKIT)}
          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted ${
            selected === NEW_TOOLKIT ? "bg-muted ring-1 ring-border" : ""
          }`}
        >
          <Plus className="h-4 w-4 shrink-0" />
          Create new toolkit
        </button>
      </div>

      {selected === NEW_TOOLKIT && (
        <div className="mt-3 space-y-1.5">
          <Label htmlFor="new-toolkit-name" className="text-xs">
            New toolkit name
          </Label>
          <Input
            id="new-toolkit-name"
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Brand"
            className="h-9"
          />
        </div>
      )}

      {errorMessage && <p className="mt-3 text-xs text-destructive">{errorMessage}</p>}

      <Button
        className="mt-4 w-full rounded-full"
        size="sm"
        onClick={submit}
        disabled={enableMutation.isPending || (selected === NEW_TOOLKIT && !newName.trim())}
      >
        {enableMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enable"}
      </Button>
    </PopoverContent>
  );

  if (enabled) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
          <Check className="h-4 w-4" />
          Enabled
          {enabledToolkit && (
            <span className="font-normal text-emerald-600">· {enabledToolkit.name}</span>
          )}
        </span>
        {orgSlug && enabledToolkit && (
          <button
            type="button"
            onClick={copyEndpoint}
            title="Copy MCP endpoint URL"
            className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-mono text-xs text-muted-foreground transition hover:bg-muted/70"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="max-w-[18rem] truncate">
              {gatewayEndpoint(orgSlug, enabledToolkit.slug)}
            </span>
          </button>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full">
              Add to another toolkit
            </Button>
          </PopoverTrigger>
          {picker}
        </Popover>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full text-destructive hover:text-destructive"
          onClick={() => setConfirmDisable(true)}
        >
          <PowerOff className="h-4 w-4" />
          Disable
        </Button>

        <AlertDialog open={confirmDisable} onOpenChange={setConfirmDisable}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This removes this MCP server's tools from your toolkits. Clients using the gateway
                endpoint will no longer see these tools. You can re-enable it anytime.
              </AlertDialogDescription>
            </AlertDialogHeader>
            {disableMutation.error && (
              <p className="text-xs text-destructive">
                {disableMutation.error instanceof ApiError
                  ? disableMutation.error.message
                  : "Failed to disable. Please try again."}
              </p>
            )}
            <AlertDialogFooter>
              <AlertDialogCancel disabled={disableMutation.isPending}>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  disableMutation.mutate();
                }}
                disabled={disableMutation.isPending}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {disableMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Yes"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="rounded-full bg-blue-600 text-white hover:bg-blue-700" size="sm">
          <Power className="h-4 w-4" />
          Enable this MCP server
        </Button>
      </PopoverTrigger>
      {picker}
    </Popover>
  );
}
