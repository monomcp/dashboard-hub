import { useState } from "react";
import { Check, ChevronsUpDown, LogOut, Plus, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Organization = { id: string; name: string; role: string; color: string };

const ORGANIZATIONS: Organization[] = [
  { id: "o1", name: "Microsaas Farm", role: "Owner", color: "bg-stone-500" },
  { id: "o2", name: "Acme Inc.", role: "Admin", color: "bg-gradient-to-br from-violet-500 to-fuchsia-600" },
  { id: "o3", name: "Globex Labs", role: "Member", color: "bg-gradient-to-br from-sky-400 to-blue-600" },
];

const USER = { name: "Cooper AI", email: "microsaas.farm@gmail.com", letter: "C" };

export function AccountMenu() {
  const [activeOrgId, setActiveOrgId] = useState(ORGANIZATIONS[0].id);
  const activeOrg = ORGANIZATIONS.find((o) => o.id === activeOrgId) ?? ORGANIZATIONS[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-stone-500 text-sm font-medium text-white outline-none transition hover:ring-2 hover:ring-stone-300"
          aria-label="Account"
        >
          {USER.letter}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[360px] rounded-3xl border-none bg-[hsl(220,33%,97%)] p-2 shadow-2xl"
      >
        {/* Identity */}
        <div className="px-3 pb-3 pt-2 text-center">
          <p className="text-sm text-foreground/70">{USER.email}</p>
          <div className="mx-auto my-3 grid h-16 w-16 place-items-center rounded-full bg-stone-500 text-2xl font-medium text-white">
            {USER.letter}
          </div>
          <p className="text-xl">Hi, {USER.name}!</p>
        </div>

        {/* Organizations */}
        <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5">
          <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
            Organizations
          </p>
          {ORGANIZATIONS.map((org) => {
            const active = org.id === activeOrgId;
            return (
              <button
                key={org.id}
                onClick={() => setActiveOrgId(org.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-sky-50",
                  active && "bg-sky-50/70",
                )}
              >
                <div
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold text-white",
                    org.color,
                  )}
                >
                  {org.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{org.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{org.role}</p>
                </div>
                {active ? (
                  <Check className="h-4 w-4 shrink-0 text-sky-600" />
                ) : (
                  <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                )}
              </button>
            );
          })}
          <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-sky-50">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-100">
              <Plus className="h-4 w-4 text-sky-700" />
            </div>
            <span className="text-sm text-foreground/80">Create organization</span>
          </button>
        </div>

        {/* Actions */}
        <div className="mt-2 rounded-2xl bg-white p-1 shadow-sm ring-1 ring-black/5">
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-sky-50">
            <SettingsIcon className="h-4 w-4 text-muted-foreground" />
            Manage {activeOrg.name}
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-sky-50">
            <LogOut className="h-4 w-4 text-muted-foreground" />
            Sign out
          </button>
        </div>

        <p className="px-3 py-3 text-center text-xs text-muted-foreground">
          Privacy policy · Terms of Service
        </p>
      </PopoverContent>
    </Popover>
  );
}
