import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PillTabItem {
  id: string;
  label: string;
  badge?: string;
  disabled?: boolean;
}

type PillTabsProps<T extends PillTabItem> = {
  tabs: T[];
  activeId: string;
  className?: string;
} & (
  | { onSelect: (id: string) => void; renderTab?: never }
  | { renderTab: (tab: T, active: boolean) => ReactNode; onSelect?: never }
);

export function PillTabs<T extends PillTabItem>({
  tabs,
  activeId,
  className,
  onSelect,
  renderTab,
}: PillTabsProps<T>) {
  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeId),
  );

  return (
    <div
      className={cn("relative inline-grid overflow-hidden rounded-full bg-muted/70 p-1", className)}
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 8px) / ${tabs.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {tabs.map((tab) =>
        renderTab ? (
          <div key={tab.id} className="relative z-10">
            {renderTab(tab, tab.id === activeId)}
          </div>
        ) : (
          <button
            key={tab.id}
            type="button"
            onClick={() => !tab.disabled && onSelect(tab.id)}
            aria-disabled={tab.disabled || undefined}
            disabled={tab.disabled}
            className={cn(
              "relative z-10 flex items-center justify-center gap-1.5 rounded-full px-5 py-1.5 text-sm transition-colors duration-200",
              tab.id === activeId ? "text-foreground" : "text-foreground/60 hover:text-foreground",
              tab.disabled && "cursor-not-allowed hover:text-foreground/60",
            )}
          >
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[10px] font-medium leading-none text-foreground/50 shadow-sm">
                {tab.badge}
              </span>
            )}
          </button>
        ),
      )}
    </div>
  );
}
