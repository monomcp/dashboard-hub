import { type ReactNode, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bot, Github, Grip, Pencil, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { PinterestIcon } from "@/components/pinterest-icon";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { apiRequest } from "@/lib/api-client";
import { cn } from "@/lib/utils";

// `letter` is rendered inside the colored tile; pass `icon` to render a custom
// glyph (e.g. a brand logo) instead.
type App = { name: string; color: string; letter: string; icon?: ReactNode; to?: string };

const FAVOURITE_APPS: App[] = [
  { name: "Account", color: "bg-stone-500", letter: "C" },
  {
    name: "Drive",
    color: "bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400",
    letter: "△",
    to: "/drive",
  },
  {
    name: "Contacts",
    color: "bg-gradient-to-br from-sky-400 to-blue-600",
    letter: "C",
    to: "/contacts",
  },
  { name: "Tasks", color: "bg-gradient-to-br from-sky-400 to-indigo-500", letter: "✓", to: "/" },
  {
    name: "Mono Agent",
    color: "bg-gradient-to-br from-violet-600 via-indigo-500 to-sky-500",
    letter: "M",
    icon: <Bot className="h-6 w-6 text-white" />,
    to: "/mono-agent",
  },
  {
    name: "Email",
    color: "bg-gradient-to-br from-rose-500 via-amber-400 to-rose-400",
    letter: "✉",
    to: "/email",
  },
  {
    name: "Gemini",
    color: "bg-gradient-to-br from-blue-500 via-fuchsia-500 to-amber-400",
    letter: "✦",
  },
  {
    name: "Search",
    color: "bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500",
    letter: "G",
  },
  { name: "Calendar", color: "bg-sky-500", letter: "31", to: "/calendar" },
  {
    name: "CMS",
    color: "bg-gradient-to-br from-indigo-500 to-violet-600",
    letter: "✎",
    to: "/cms",
  },
  {
    name: "Audit",
    color: "bg-gradient-to-br from-amber-400 to-rose-500",
    letter: "⛨",
    to: "/audit",
  },
  {
    name: "Company",
    color: "bg-gradient-to-br from-amber-400 to-orange-600",
    letter: "B",
    to: "/company",
  },
  {
    name: "Content",
    color: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
    letter: "✍",
    to: "/content",
  },
  {
    name: "Firecrawl",
    color: "bg-gradient-to-br from-orange-500 to-rose-600",
    letter: "🔥",
    to: "/firecrawl",
  },
  {
    name: "Database",
    color: "bg-gradient-to-br from-yellow-400 via-pink-500 to-blue-600",
    letter: "▦",
    to: "/database",
  },
  {
    name: "Brand DNA",
    color: "bg-gradient-to-br from-lime-300 to-emerald-700",
    letter: "🧬",
    to: "/brand",
  },
  {
    name: "MCP tools",
    color: "bg-gradient-to-br from-sky-500 to-indigo-600",
    letter: "⊞",
    to: "/mcp",
  },
  {
    name: "Permissions",
    color: "bg-gradient-to-br from-sky-500 to-indigo-600",
    letter: "🔑",
    to: "/permissions",
  },
  {
    name: "Pinterest",
    color: "bg-white ring-1 ring-black/5",
    letter: "P",
    icon: <PinterestIcon className="h-6 w-6" />,
    to: "/pinterest",
  },
  {
    name: "GitHub",
    color: "bg-neutral-900",
    letter: "G",
    icon: <Github className="h-6 w-6 text-white" />,
    to: "/github",
  },
  {
    name: "Postman",
    color: "bg-[#FF6C37]",
    letter: "P",
    to: "/postman",
  },
];

const MORE_APPS: App[] = [
  { name: "News", color: "bg-blue-500", letter: "N" },
  {
    name: "Photos",
    color: "bg-gradient-to-br from-red-400 via-yellow-400 to-green-400",
    letter: "✿",
  },
  { name: "Translate", color: "bg-gradient-to-br from-blue-500 to-sky-400", letter: "文" },
];

const PINNED_FAVOURITES = new Set(["Pinterest"]);

type HiddenFavouritesResponse = { app_keys: string[] };

const HIDDEN_FAVOURITES_KEY = ["preferences", "hidden-favourites"];

export function AppsMenu() {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const { data } = useQuery({
    queryKey: HIDDEN_FAVOURITES_KEY,
    queryFn: () => apiRequest<HiddenFavouritesResponse>("/api/v1/preferences/hidden-favourites"),
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });
  const hidden = new Set(data?.app_keys ?? []);

  const hideFavourite = useMutation({
    mutationFn: (appKey: string) =>
      apiRequest<HiddenFavouritesResponse>("/api/v1/preferences/hidden-favourites", {
        method: "POST",
        body: JSON.stringify({ app_key: appKey }),
      }),
    // Optimistically drop the app so the grid updates instantly.
    onMutate: async (appKey) => {
      await queryClient.cancelQueries({ queryKey: HIDDEN_FAVOURITES_KEY });
      const previous = queryClient.getQueryData<HiddenFavouritesResponse>(HIDDEN_FAVOURITES_KEY);
      queryClient.setQueryData<HiddenFavouritesResponse>(HIDDEN_FAVOURITES_KEY, {
        app_keys: [...new Set([...(previous?.app_keys ?? []), appKey])],
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
    },
  });

  const favourites = FAVOURITE_APPS.filter(
    (app) => PINNED_FAVOURITES.has(app.name) || !hidden.has(app.name),
  );

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setEditing(false);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="Apps">
          <Grip className="h-5 w-5 text-muted-foreground" strokeWidth={2.5} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="group w-[360px] rounded-3xl border-none bg-[hsl(220,33%,97%)] p-0 shadow-2xl"
      >
        <div className="m-2 rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Your favourites</h3>
            <Button
              variant="ghost"
              size="icon"
              aria-label={editing ? "Done editing favourites" : "Edit favourites"}
              aria-pressed={editing}
              onClick={() => setEditing((prev) => !prev)}
              className={cn(
                "rounded-full bg-sky-100/70 transition-opacity hover:bg-sky-200/70 focus-visible:opacity-100 group-hover:opacity-100",
                editing ? "opacity-100" : "opacity-0",
              )}
            >
              <Pencil className="h-4 w-4 text-sky-700" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-y-4">
            {favourites.map((app) => {
              const icon = (
                <div
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-full font-semibold shadow-sm",
                    app.icon ? "" : "text-white",
                    app.color,
                  )}
                >
                  {app.icon ?? app.letter}
                </div>
              );
              const label = <span className="text-xs text-foreground/80">{app.name}</span>;

              const deleteButton =
                editing && !PINNED_FAVOURITES.has(app.name) ? (
                  <button
                    type="button"
                    aria-label={`Remove ${app.name} from favourites`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      hideFavourite.mutate(app.name);
                    }}
                    className="absolute right-1 top-1 z-10 grid h-5 w-5 place-items-center rounded-full bg-stone-400/90 text-white shadow-sm transition hover:bg-stone-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                ) : null;

              const inner = (
                <>
                  {deleteButton}
                  {icon}
                  {label}
                </>
              );

              const className =
                "relative flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-sky-50";

              // While editing, disable navigation so clicks don't leave the menu.
              if (app.to && !editing) {
                return (
                  <Link key={app.name} to={app.to} className={className}>
                    {inner}
                  </Link>
                );
              }
              return (
                <div key={app.name} className={className}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
        <div className="px-5 pb-5 pt-2">
          <div className="grid grid-cols-3 gap-y-4">
            {MORE_APPS.map((app) => (
              <button
                key={app.name}
                className="flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-white"
              >
                <div
                  className={cn(
                    "grid h-11 w-11 place-items-center rounded-lg text-white font-semibold shadow-sm",
                    app.color,
                  )}
                >
                  {app.letter}
                </div>
                <span className="text-xs text-foreground/80">{app.name}</span>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
