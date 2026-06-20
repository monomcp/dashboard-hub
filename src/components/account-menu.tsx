import { Check, ChevronsUpDown, LogOut, Plus, Settings as SettingsIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { apiRequest, clearAuthTokens } from "@/lib/api-client";
import { cn } from "@/lib/utils";

type Membership = {
  organization_id: string;
  organization_name: string;
  organization_slug: string;
  role: string;
};

type MeResponse = {
  id: string;
  email: string;
  full_name: string | null;
  is_active: boolean;
  email_verified: boolean;
  memberships: Membership[];
};

const ORG_COLORS = [
  "bg-stone-500",
  "bg-gradient-to-br from-violet-500 to-fuchsia-600",
  "bg-gradient-to-br from-sky-400 to-blue-600",
  "bg-gradient-to-br from-amber-400 to-rose-500",
  "bg-gradient-to-br from-emerald-400 to-teal-600",
  "bg-gradient-to-br from-indigo-500 to-violet-600",
];

function initial(value: string | null | undefined): string {
  return (value?.trim().charAt(0) || "?").toUpperCase();
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function switchOrganization(organizationId: string) {
  localStorage.setItem("organization_id", organizationId);
  window.location.reload();
}

function signOut() {
  clearAuthTokens();
  localStorage.removeItem("organization_id");
  window.location.href = "/login";
}

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => apiRequest<MeResponse>("/api/v1/auth/me"),
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });

  const displayName = data?.full_name?.trim() || data?.email || "";
  const avatarLetter = initial(data?.full_name || data?.email);

  const memberships = data?.memberships ?? [];
  const storedOrgId =
    typeof window !== "undefined" ? localStorage.getItem("organization_id") : null;
  const activeOrg = memberships.find((m) => m.organization_id === storedOrgId) ?? memberships[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="ml-1 grid h-9 w-9 place-items-center rounded-full bg-stone-500 text-sm font-medium text-white outline-none transition hover:ring-2 hover:ring-stone-300"
          aria-label="Account"
        >
          {isLoading || !data ? "" : avatarLetter}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[360px] rounded-3xl border-none bg-[hsl(220,33%,97%)] p-2 shadow-2xl"
      >
        {isLoading ? (
          <div className="px-3 py-10 text-center text-sm text-muted-foreground">Loading…</div>
        ) : isError || !data ? (
          <div className="px-3 py-10 text-center text-sm text-muted-foreground">
            Couldn't load account
          </div>
        ) : (
          <>
            {/* Identity */}
            <div className="px-3 pb-3 pt-2 text-center">
              <p className="text-sm text-foreground/70">{data.email}</p>
              <div className="mx-auto my-3 grid h-16 w-16 place-items-center rounded-full bg-stone-500 text-2xl font-medium text-white">
                {avatarLetter}
              </div>
              <p className="text-xl">Hi, {displayName}!</p>
            </div>

            {/* Organizations */}
            <div className="rounded-2xl bg-white p-2 shadow-sm ring-1 ring-black/5">
              <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Organizations</p>
              {memberships.length === 0 ? (
                <p className="px-2 py-2 text-sm text-muted-foreground">No organizations yet</p>
              ) : (
                memberships.map((org, i) => {
                  const active = org.organization_id === activeOrg?.organization_id;
                  return (
                    <button
                      key={org.organization_id}
                      onClick={() => !active && switchOrganization(org.organization_id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-sky-50",
                        active && "bg-sky-50/70",
                      )}
                    >
                      <div
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold text-white",
                          ORG_COLORS[i % ORG_COLORS.length],
                        )}
                      >
                        {initial(org.organization_name)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{org.organization_name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {capitalize(org.role)}
                        </p>
                      </div>
                      {active ? (
                        <Check className="h-4 w-4 shrink-0 text-sky-600" />
                      ) : (
                        <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                      )}
                    </button>
                  );
                })
              )}
              <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-sky-50">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-100">
                  <Plus className="h-4 w-4 text-sky-700" />
                </div>
                <span className="text-sm text-foreground/80">Create organization</span>
              </button>
            </div>

            {/* Actions */}
            <div className="mt-2 rounded-2xl bg-white p-1 shadow-sm ring-1 ring-black/5">
              {activeOrg && (
                <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-sky-50">
                  <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                  Manage {activeOrg.organization_name}
                </button>
              )}
              <button
                onClick={signOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-sky-50"
              >
                <LogOut className="h-4 w-4 text-muted-foreground" />
                Sign out
              </button>
            </div>

            <p className="px-3 py-3 text-center text-xs text-muted-foreground">
              <Link to="/privacy" className="hover:text-foreground hover:underline">
                Privacy policy
              </Link>
              {" · "}
              <Link to="/terms" className="hover:text-foreground hover:underline">
                Terms of Service
              </Link>
            </p>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
