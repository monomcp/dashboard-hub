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
      className={cn("relative inline-grid rounded-full bg-[#f5f5f5] px-1", className)}
      style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1 rounded-full border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-out motion-reduce:transition-none"
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
            aria-pressed={tab.id === activeId}
            aria-disabled={tab.disabled || undefined}
            disabled={tab.disabled}
            className={cn(
              "relative z-10 flex items-center justify-center gap-1.5 rounded-full px-5 py-2 text-[15px] font-medium leading-5 outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none",
              tab.id === activeId ? "text-[#0d0d0d]" : "text-[#5d5d5d] hover:text-[#0d0d0d]",
              tab.disabled && "cursor-not-allowed text-[#5d5d5d]/50 hover:text-[#5d5d5d]/50",
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
