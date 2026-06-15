import type { AccessCell } from "@/lib/mcp-types";

// Theme tokens for the shared <PermissionsMatrix>. Each module supplies the look
// (Brand DNA = dark, Content = light) while the matrix owns the access logic.

export type PermissionsTheme = {
  card: string;
  headingText: string;
  mutedText: string;
  accentText: string;
  selector: string;
  legendText: string;
  countText: string;
  toggleActive: string;
  toggleInactive: string;
  actionError: string;
  tableWrap: string;
  thead: string;
  headerStickyBg: string;
  bodyStickyBg: string;
  rowBorder: string;
  avatarBg: string;
  principalIcon: string;
  principalName: string;
  principalSub: string;
  emptyText: string;
  emptyIcon: string;
  loader: string;
  skeleton: string;
  access: Record<AccessCell, string>;
  // menus
  menuPanel: string;
  menuHover: string;
  menuActiveBg: string;
  menuCheck: string;
  menuDivider: string;
  menuDanger: string;
  menuIcon: { allow: string; needs: string; deny: string; muted: string };
  // grant pill
  grantHas: string;
  grantNone: string;
  // tool cell trigger
  cellHover: string;
};

export const darkPermissionsTheme: PermissionsTheme = {
  card: "rounded-3xl bg-[#33362a] p-6 ring-1 ring-white/5",
  headingText: "text-white",
  mutedText: "text-sm leading-relaxed text-[#e8eadb]/75",
  accentText: "text-[#cfe09a]",
  selector: "border border-white/10 bg-[#202318] text-[#e8eadb]",
  legendText: "text-[#e8eadb]/70",
  countText: "text-[#e8eadb]/65",
  toggleActive: "bg-[#cfe09a] text-[#1f2118]",
  toggleInactive: "bg-white/5 text-[#e8eadb]/75 hover:bg-white/10",
  actionError: "bg-rose-950/70 text-rose-100 ring-1 ring-rose-300/20",
  tableWrap: "bg-[#33362a] ring-1 ring-white/5",
  thead: "bg-[#2d3024] text-[#c4c8b0]/70",
  headerStickyBg: "bg-[#2d3024]",
  bodyStickyBg: "bg-[#33362a]",
  rowBorder: "border-white/5",
  avatarBg: "bg-white/5",
  principalIcon: "text-[#cfe09a]",
  principalName: "text-white",
  principalSub: "text-[#e8eadb]/55",
  emptyText: "text-[#e8eadb]/60",
  emptyIcon: "text-[#e8eadb]/40",
  loader: "text-[#e8eadb]/50",
  skeleton: "bg-[#c4c8b0]/12",
  access: {
    allowed: "text-emerald-300",
    needs_approval: "text-amber-300",
    blocked: "text-rose-300",
    denied: "text-rose-300",
    no_access: "text-[#e8eadb]/25",
  },
  menuPanel: "w-56 rounded-2xl border border-white/10 bg-[#2d3024] p-1.5 text-[#e8eadb] shadow-xl",
  menuHover: "hover:bg-white/10",
  menuActiveBg: "bg-white/5",
  menuCheck: "text-[#cfe09a]",
  menuDivider: "bg-white/10",
  menuDanger: "text-rose-300",
  menuIcon: {
    allow: "text-emerald-400",
    needs: "text-amber-400",
    deny: "text-rose-400",
    muted: "text-[#e8eadb]/50",
  },
  grantHas: "bg-[#cfe09a]/15 text-[#cfe09a] hover:bg-[#cfe09a]/25",
  grantNone: "bg-white/10 text-[#e8eadb]/85 hover:bg-white/20",
  cellHover: "hover:bg-white/10",
};

export const lightPermissionsTheme: PermissionsTheme = {
  card: "rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5",
  headingText: "text-foreground",
  mutedText: "text-sm leading-relaxed text-muted-foreground",
  accentText: "text-sky-700",
  selector: "border border-black/10 bg-[hsl(220,33%,97%)] text-foreground",
  legendText: "text-muted-foreground",
  countText: "text-muted-foreground",
  toggleActive: "bg-sky-600 text-white",
  toggleInactive: "bg-black/5 text-foreground/70 hover:bg-black/10",
  actionError: "border border-destructive/20 bg-white text-destructive shadow-sm",
  tableWrap: "bg-white ring-1 ring-black/5",
  thead: "bg-[hsl(220,33%,97%)] text-muted-foreground",
  headerStickyBg: "bg-[hsl(220,33%,97%)]",
  bodyStickyBg: "bg-white",
  rowBorder: "border-black/5",
  avatarBg: "bg-black/5",
  principalIcon: "text-sky-700",
  principalName: "text-foreground",
  principalSub: "text-muted-foreground",
  emptyText: "text-muted-foreground",
  emptyIcon: "text-muted-foreground/40",
  loader: "text-muted-foreground",
  skeleton: "",
  access: {
    allowed: "text-emerald-600",
    needs_approval: "text-amber-600",
    blocked: "text-rose-600",
    denied: "text-rose-600",
    no_access: "text-muted-foreground/40",
  },
  menuPanel: "w-56 rounded-2xl border border-black/10 bg-white p-1.5 text-foreground shadow-xl",
  menuHover: "hover:bg-black/5",
  menuActiveBg: "bg-black/5",
  menuCheck: "text-sky-600",
  menuDivider: "bg-black/10",
  menuDanger: "text-rose-600",
  menuIcon: {
    allow: "text-emerald-600",
    needs: "text-amber-600",
    deny: "text-rose-600",
    muted: "text-muted-foreground",
  },
  grantHas: "bg-sky-100 text-sky-900 hover:bg-sky-200",
  grantNone: "bg-black/5 text-foreground/70 hover:bg-black/10",
  cellHover: "hover:bg-black/5",
};
