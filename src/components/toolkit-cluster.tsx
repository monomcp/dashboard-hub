import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { brandIcon } from "@/lib/brand-icons";
import type { CatalogServer, Toolkit } from "@/lib/mcp-types";

/** A single toolkit tile — the owning server's brand icon, or its initial. Hover for its name. */
export function ToolkitChip({ toolkit, server }: { toolkit: Toolkit; server?: CatalogServer }) {
  const icon = server?.logo_url ? (
    <img src={server.logo_url} alt="" className="h-5 w-5 object-contain" loading="lazy" />
  ) : (
    brandIcon(server?.icon_key)
  );

  const tile = icon ? (
    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white ring-1 ring-black/5">
      {icon}
    </div>
  ) : (
    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 text-[11px] font-semibold uppercase text-white">
      {toolkit.name.charAt(0)}
    </div>
  );

  return (
    <Tooltip>
      <TooltipTrigger asChild>{tile}</TooltipTrigger>
      <TooltipContent side="top">{toolkit.name}</TooltipContent>
    </Tooltip>
  );
}

/**
 * The MCP toolkits an identity carries — up to `max` brand icons, then a +N overflow.
 * Renders nothing when there are none, so it drops out of an inline name row cleanly.
 * Relies on an ancestor TooltipProvider.
 */
export function ToolkitCluster({
  toolkits,
  serverFor,
  loading,
  max = 5,
}: {
  toolkits: Toolkit[];
  serverFor: (toolkitId: string) => CatalogServer | undefined;
  loading?: boolean;
  max?: number;
}) {
  if (loading) {
    return (
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-lg" />
        ))}
      </div>
    );
  }

  if (toolkits.length === 0) return null;

  const shown = toolkits.slice(0, max);
  const overflow = toolkits.slice(max);

  return (
    <div className="flex items-center gap-1.5">
      {shown.map((toolkit) => (
        <ToolkitChip key={toolkit.id} toolkit={toolkit} server={serverFor(toolkit.id)} />
      ))}
      {overflow.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="grid h-8 min-w-8 shrink-0 place-items-center rounded-lg bg-muted px-1.5 text-xs font-medium text-muted-foreground">
              +{overflow.length}
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            {overflow.map((t) => t.name).join(", ")}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}
