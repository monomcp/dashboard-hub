// Shared building blocks for the MCP connection surfaces — the catalog's
// "Connect to your MCP server" panel and the identity detail sheet.

import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bot,
  Check,
  Cog,
  Copy,
  KeyRound,
  type LucideIcon,
  MessageCircle,
  PawPrint,
  Terminal,
  User,
  Users,
} from "lucide-react";
import { apiRequest } from "@/lib/api-client";
import { gatewayEndpoint, type ToolkitKind } from "@/lib/mcp-types";
import { cn } from "@/lib/utils";

type Membership = {
  organization_id: string;
  organization_name: string;
  organization_slug: string;
  role: string;
};
type MeResponse = { memberships: Membership[] };

/**
 * The immutable id of the org whose gateway endpoints we render. Only fetches
 * while `enabled`. We key connection URLs on the id (not the slug) so they don't
 * break when the org is renamed. Returns null until the membership is known.
 */
export function useActiveOrgId(enabled: boolean): string | null {
  const { data } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiRequest<MeResponse>("/api/v1/auth/me"),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
  const memberships = data?.memberships ?? [];
  const storedOrgId =
    typeof window !== "undefined" ? localStorage.getItem("organization_id") : null;
  const active = memberships.find((m) => m.organization_id === storedOrgId) ?? memberships[0];
  return active?.organization_id ?? null;
}

/** Copy-to-clipboard with a per-key "copied" flash that resets itself. */
export function useCopy() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copy = useCallback((key: string, text: string) => {
    void navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  }, []);
  return { copiedKey, copy };
}

/** Anthropic / Claude mark. */
export function ClaudeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z" />
    </svg>
  );
}

export type McpClientId = "claude" | "codex" | "openclaw" | "chatgpt";

export const MCP_CLIENTS: {
  id: McpClientId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "claude", label: "Claude", icon: ClaudeIcon },
  { id: "codex", label: "Codex", icon: Terminal },
  { id: "openclaw", label: "Openclaw", icon: PawPrint },
  { id: "chatgpt", label: "ChatGPT", icon: MessageCircle },
];

const CLIENT_NOTE: Record<McpClientId, string | null> = {
  claude: null,
  codex: null,
  openclaw: null,
  chatgpt: "Add this URL as a custom connector in ChatGPT → Settings → Connectors.",
};

/** The config a given MCP client needs to reach `url`, keyed in its file under `configKey`. */
export function clientSnippet(client: McpClientId, configKey: string, url: string): string {
  if (client === "codex") {
    return `# ~/.codex/config.toml\n[mcp_servers.${configKey}]\nurl = "${url}"`;
  }
  if (client === "chatgpt") {
    return url;
  }
  // Claude / Openclaw and other JSON-config MCP clients.
  return JSON.stringify({ mcpServers: { [configKey]: { url } } }, null, 2);
}

/** A monospace value row with a copy-to-clipboard button (Supabase-style). */
export function CopyRow({
  value,
  copied,
  onCopy,
  className,
}: {
  value: string;
  copied: boolean;
  onCopy: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2", className)}>
      <span className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">{value}</span>
      <button
        type="button"
        onClick={onCopy}
        title="Copy"
        className="shrink-0 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

/** Left-label / right-content row used for each panel section. */
export function Section({
  title,
  hint,
  stacked,
  className,
  children,
}: {
  title: string;
  hint?: string;
  /** Render the label full width above the content instead of side-by-side. */
  stacked?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid gap-3 border-b px-6 py-5",
        !stacked && "sm:grid-cols-[180px_1fr]",
        className,
      )}
    >
      <div>
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="min-w-0 space-y-2">{children}</div>
    </div>
  );
}

export function ToolkitSelectionIndicator({
  checked,
  className,
}: {
  checked: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border transition-all duration-200",
        checked
          ? "border-emerald-600 bg-emerald-600 text-white opacity-100"
          : "border-muted-foreground/40 bg-background opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
        className,
      )}
      aria-hidden="true"
    >
      {checked && <Check className="h-3 w-3" />}
    </span>
  );
}

const TOOLKIT_KIND_BADGES: Record<
  ToolkitKind,
  { icon: LucideIcon; label: string; title: string }
> = {
  shared: { icon: Users, label: "Shared", title: "Curated toolkit, grantable to any identity" },
  personal_user: { icon: User, label: "Personal", title: "Private toolkit of a person" },
  personal_agent: { icon: Bot, label: "Agent", title: "Private toolkit of an agent" },
  personal_service_account: {
    icon: Cog,
    label: "Service",
    title: "Private toolkit of a service account",
  },
  personal_api_client: { icon: KeyRound, label: "API", title: "Private toolkit of an API client" },
};

/** Icon + label for a toolkit's owner: shared, or the identity type that owns it. */
export function ToolkitKindBadge({
  kind,
  className,
}: {
  kind: ToolkitKind;
  className?: string;
}) {
  // Fall back to the "shared" treatment for an unknown/missing kind so an older API
  // deployment (or a toolkit without a derived kind) degrades instead of crashing
  // the whole surface — same resilience the catalog badges already assume.
  const { icon: Icon, label, title } = TOOLKIT_KIND_BADGES[kind] ?? TOOLKIT_KIND_BADGES.shared;
  return (
    <span
      title={title}
      className={cn(
        "inline-flex items-center gap-1 text-xs text-muted-foreground",
        className,
      )}
    >
      <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
      {label}
    </span>
  );
}

/**
 * Client picker + the copy-able config snippet for `url`.
 * Callers own the surrounding <Section>, so the heading copy can differ per surface.
 */
export function HowToConnect({ configKey, url }: { configKey: string; url: string }) {
  const [client, setClient] = useState<McpClientId>("claude");
  const { copiedKey, copy } = useCopy();
  const snippet = clientSnippet(client, configKey, url);

  return (
    <>
      <div className="grid grid-cols-4 gap-1 rounded-lg border p-1">
        {MCP_CLIENTS.map((c) => {
          const Icon = c.icon;
          const active = client === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setClient(c.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-md px-2 py-2.5 text-xs font-medium transition",
                active
                  ? "bg-muted text-foreground ring-1 ring-border"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {c.label}
            </button>
          );
        })}
      </div>

      <div className="relative rounded-lg border bg-muted/40">
        <button
          type="button"
          onClick={() => copy("config", snippet)}
          title="Copy config"
          className="absolute right-2 top-2 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          {copiedKey === "config" ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
        <pre className="overflow-x-auto p-3 pr-10 font-mono text-xs leading-relaxed text-foreground">
          {snippet}
        </pre>
      </div>

      {CLIENT_NOTE[client] && (
        <p className="text-xs text-muted-foreground">{CLIENT_NOTE[client]}</p>
      )}
    </>
  );
}

/** The gateway URL rows for a set of toolkits, one CopyRow each. Keyed on the
 * immutable org/toolkit ids so a rename doesn't break the copied connection. */
export function ConnectionEndpoints({
  orgId,
  toolkits,
}: {
  orgId: string;
  toolkits: { id: string; name: string; slug: string }[];
}) {
  const { copiedKey, copy } = useCopy();
  return (
    <>
      {toolkits.map((t) => {
        const url = gatewayEndpoint(orgId, t.id);
        return (
          <div key={t.id} className="space-y-1">
            {toolkits.length > 1 && <p className="text-xs text-muted-foreground">{t.name}</p>}
            <CopyRow
              value={url}
              copied={copiedKey === `url:${t.id}`}
              onCopy={() => copy(`url:${t.id}`, url)}
            />
          </div>
        );
      })}
    </>
  );
}
