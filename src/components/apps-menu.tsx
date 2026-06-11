import { LayoutGrid, Pencil } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type App = { name: string; color: string; letter: string; to?: string };

const FAVOURITE_APPS: App[] = [
  { name: "Account", color: "bg-stone-500", letter: "C" },
  { name: "Drive", color: "bg-gradient-to-br from-emerald-400 via-sky-400 to-amber-400", letter: "△", to: "/drive" },
  { name: "Contacts", color: "bg-gradient-to-br from-sky-400 to-blue-600", letter: "C", to: "/contacts" },
  { name: "Tasks", color: "bg-gradient-to-br from-sky-400 to-indigo-500", letter: "✓", to: "/" },
  { name: "Email", color: "bg-gradient-to-br from-rose-500 via-amber-400 to-rose-400", letter: "✉", to: "/email" },
  { name: "YouTube", color: "bg-red-500", letter: "▶" },
  { name: "Gemini", color: "bg-gradient-to-br from-blue-500 via-fuchsia-500 to-amber-400", letter: "✦" },
  { name: "Maps", color: "bg-gradient-to-br from-green-500 via-yellow-400 to-red-500", letter: "◉" },
  { name: "Search", color: "bg-gradient-to-br from-blue-500 via-red-500 to-yellow-500", letter: "G" },
  { name: "Calendar", color: "bg-sky-500", letter: "31", to: "/calendar" },
  { name: "CMS", color: "bg-gradient-to-br from-indigo-500 to-violet-600", letter: "✎", to: "/cms" },
  { name: "Audit", color: "bg-gradient-to-br from-amber-400 to-rose-500", letter: "⛨", to: "/audit" },
  { name: "Company", color: "bg-gradient-to-br from-amber-400 to-orange-600", letter: "B", to: "/company" },
  { name: "Content", color: "bg-gradient-to-br from-violet-500 to-fuchsia-600", letter: "✍", to: "/content" },
];

const MORE_APPS: App[] = [
  { name: "News", color: "bg-blue-500", letter: "N" },
  { name: "Photos", color: "bg-gradient-to-br from-red-400 via-yellow-400 to-green-400", letter: "✿" },
  { name: "Meet", color: "bg-amber-400", letter: "▶" },
  { name: "Translate", color: "bg-gradient-to-br from-blue-500 to-sky-400", letter: "文" },
  { name: "Play", color: "bg-gradient-to-br from-indigo-500 to-violet-500", letter: "▷" },
  { name: "Keep", color: "bg-emerald-500", letter: "+" },
];

export function AppsMenu() {
  const { pathname } = useLocation();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="Apps">
          <LayoutGrid className="h-5 w-5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[360px] rounded-3xl border-none bg-[hsl(220,33%,97%)] p-0 shadow-2xl"
      >
        <div className="m-2 rounded-2xl bg-white/70 p-5 shadow-sm ring-1 ring-black/5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Your favourites</h3>
            <Button variant="ghost" size="icon" className="rounded-full bg-sky-100/70 hover:bg-sky-200/70">
              <Pencil className="h-4 w-4 text-sky-700" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-y-4">
            {FAVOURITE_APPS.filter((app) => app.to !== pathname).map((app) => {
              const content = (
                <>
                  <div
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-full text-white font-semibold shadow-sm",
                      app.color,
                    )}
                  >
                    {app.letter}
                  </div>
                  <span className="text-xs text-foreground/80">{app.name}</span>
                </>
              );
              if (app.to) {
                return (
                  <Link
                    key={app.name}
                    to={app.to}
                    className="flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-sky-50"
                  >
                    {content}
                  </Link>
                );
              }
              return (
                <button
                  key={app.name}
                  className="flex flex-col items-center gap-1.5 rounded-xl p-2 transition hover:bg-sky-50"
                >
                  {content}
                </button>
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
